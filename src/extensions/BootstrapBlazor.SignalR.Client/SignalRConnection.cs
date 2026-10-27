// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.Net;
using System.Net.WebSockets;
using System.Text.Json;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">消息分发与连接服务共用的 SignalR Hub 连接</para>
/// <para lang="en">SignalR Hub connection shared by dispatch and connection services</para>
/// </summary>
sealed class SignalRConnection : IAsyncDisposable
{
    private readonly HubConnection _connection;
    private readonly ILogger<SignalRConnection> _logger;
    private readonly ConcurrentDictionary<string, Func<JsonElement, Task>> _subscriptions = new(StringComparer.Ordinal);
    private readonly HashSet<string> _pendingSubscriptions = new(StringComparer.Ordinal);
    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly CancellationTokenSource _lifetime = new();
    private readonly IDisposable _receiver;
    private int _connectionUsers;

    /// <summary>
    /// <para lang="zh">获得 当前连接是否正在重连</para>
    /// <para lang="en">Gets whether the connection is reconnecting</para>
    /// </summary>
    public bool IsReconnecting => _connection.State == HubConnectionState.Reconnecting;

    /// <summary>
    /// <para lang="zh">判断异常是否属于可重试的暂时性连接故障</para>
    /// <para lang="en">Determine whether an exception represents a transient connection failure that can be retried</para>
    /// </summary>
    /// <param name="exception"><para lang="zh">待判断的异常</para><para lang="en">The exception to check</para></param>
    /// <returns><para lang="zh">暂时性故障返回 true，否则返回 false</para><para lang="en">True for a transient failure; otherwise, false</para></returns>
    internal static bool IsTransientFailure(Exception exception) => exception switch
    {
        HttpRequestException ex => ex.StatusCode is null or HttpStatusCode.RequestTimeout or
            HttpStatusCode.TooManyRequests or HttpStatusCode.InternalServerError or
            HttpStatusCode.BadGateway or HttpStatusCode.ServiceUnavailable or HttpStatusCode.GatewayTimeout,
        IOException or WebSocketException or TimeoutException or OperationCanceledException => true,
        _ => false
    };

    /// <summary>
    /// <para lang="zh">初始化共享连接，配置自动重连与消息接收回调</para>
    /// <para lang="en">Initialize the shared connection with automatic reconnection and a message receiver</para>
    /// </summary>
    /// <param name="navigation"><para lang="zh">导航管理器，用于解析 Hub 的绝对地址</para><para lang="en">The navigation manager used to resolve the absolute Hub URL</para></param>
    /// <param name="logger"><para lang="zh">日志记录器</para><para lang="en">The logger</para></param>
    public SignalRConnection(NavigationManager navigation, ILogger<SignalRConnection> logger)
    {
        _logger = logger;
        _connection = new HubConnectionBuilder()
            .WithUrl(navigation.ToAbsoluteUri("bb.hub"))
            .WithAutomaticReconnect(new ConnectionRetryPolicy())
            .Build();
        _receiver = _connection.On<string, JsonElement>("Receive", ReceiveAsync);
        _connection.Reconnected += RestoreSubscriptionsAsync;
    }

    /// <summary>
    /// <para lang="zh">注册指定消息类型的接收回调并订阅服务端消息</para>
    /// <para lang="en">Register a receiver for the specified entry type and subscribe to server messages</para>
    /// </summary>
    /// <param name="entryType"><para lang="zh">消息类型标识</para><para lang="en">The entry type identifier</para></param>
    /// <param name="callback"><para lang="zh">消息接收回调委托</para><para lang="en">The message receiver callback</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    public async Task SubscribeAsync(string entryType, Func<JsonElement, Task> callback, CancellationToken cancellationToken)
    {
        using var cancellation = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, _lifetime.Token);
        var token = cancellation.Token;
        await _gate.WaitAsync(token);
        try
        {
            _subscriptions[entryType] = callback;
            await EnsureConnectedAsync(token);
            await SubscribeCoreAsync(entryType, token);
            _pendingSubscriptions.Remove(entryType);
        }
        catch
        {
            _subscriptions.TryRemove(entryType, out _);
            _pendingSubscriptions.Remove(entryType);
            throw;
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>
    /// <para lang="zh">取消指定消息类型的订阅，并在无订阅和使用引用时停止连接</para>
    /// <para lang="en">Unsubscribe from the specified entry type and stop the connection when no subscriptions or usage references remain</para>
    /// </summary>
    /// <param name="entryType"><para lang="zh">消息类型标识</para><para lang="en">The entry type identifier</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    public async Task UnsubscribeAsync(string entryType, CancellationToken cancellationToken)
    {
        using var cancellation = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, _lifetime.Token);
        var token = cancellation.Token;
        await _gate.WaitAsync(token);
        try
        {
            _subscriptions.TryRemove(entryType, out _);
            _pendingSubscriptions.Remove(entryType);
            if (_connection.State == HubConnectionState.Connected)
            {
                await _connection.InvokeAsync("Unsubscribe", entryType, token);
            }
            if (_subscriptions.IsEmpty && Volatile.Read(ref _connectionUsers) == 0)
            {
                await _connection.StopAsync(token);
            }
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>
    /// <para lang="zh">增加共享连接的使用引用，防止取消消息订阅时停止仍在使用的连接</para>
    /// <para lang="en">Add a usage reference to prevent unsubscription from stopping a connection still in use</para>
    /// </summary>
    public void Retain() => Interlocked.Increment(ref _connectionUsers);

    /// <summary>
    /// <para lang="zh">释放共享连接的使用引用，并在无使用引用和订阅时停止连接</para>
    /// <para lang="en">Release a usage reference and stop the connection when no usage references or subscriptions remain</para>
    /// </summary>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    public async Task ReleaseAsync()
    {
        await _gate.WaitAsync(_lifetime.Token);
        try
        {
            if (Interlocked.Decrement(ref _connectionUsers) == 0 && _subscriptions.IsEmpty)
            {
                await _connection.StopAsync(_lifetime.Token);
            }
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>
    /// <para lang="zh">调用服务端 Hub 方法并返回结果，操作超时时间为 30 秒</para>
    /// <para lang="en">Invoke a server Hub method and return its result with a 30-second operation timeout</para>
    /// </summary>
    /// <typeparam name="TResult"><para lang="zh">返回结果类型</para><para lang="en">The result type</para></typeparam>
    /// <param name="method"><para lang="zh">Hub 方法名称</para><para lang="en">The Hub method name</para></param>
    /// <param name="argument"><para lang="zh">方法参数，为 null 时不传递参数</para><para lang="en">The method argument; null invokes the method without arguments</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">服务端返回的结果</para><para lang="en">The result returned by the server</para></returns>
    public async Task<TResult> InvokeAsync<TResult>(string method, object? argument, CancellationToken cancellationToken)
    {
        using var cancellation = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, _lifetime.Token);
        cancellation.CancelAfter(TimeSpan.FromSeconds(30));
        var token = cancellation.Token;
        await _gate.WaitAsync(token);
        try
        {
            await EnsureConnectedAsync(token);
            return await _connection.InvokeCoreAsync<TResult>(method, argument == null ? [] : [argument], token);
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>
    /// <para lang="zh">通过共享 Hub 连接向服务端分发消息</para>
    /// <para lang="en">Dispatch an entry to the server through the shared Hub connection</para>
    /// </summary>
    /// <typeparam name="TEntry"><para lang="zh">消息数据类型</para><para lang="en">The entry data type</para></typeparam>
    /// <param name="entryType"><para lang="zh">消息类型标识</para><para lang="en">The entry type identifier</para></param>
    /// <param name="entry"><para lang="zh">消息分发项</para><para lang="en">The dispatch entry</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    public async Task DispatchAsync<TEntry>(string entryType, DispatchEntry<TEntry> entry, CancellationToken cancellationToken)
    {
        using var cancellation = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, _lifetime.Token);
        var token = cancellation.Token;
        await _gate.WaitAsync(token);
        try
        {
            await EnsureConnectedAsync(token);
            await _connection.InvokeAsync("Dispatch", entryType, entry, token);
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>
    /// <para lang="zh">在连接断开时尝试建立连接并恢复订阅，连接尚未就绪时抛出异常</para>
    /// <para lang="en">Attempt to start a disconnected connection and restore subscriptions, throwing if the connection is not ready</para>
    /// </summary>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    private async Task EnsureConnectedAsync(CancellationToken cancellationToken)
    {
        if (_connection.State == HubConnectionState.Disconnected)
        {
            for (var attempt = 0; ; attempt++)
            {
                try
                {
                    await _connection.StartAsync(cancellationToken);
                    break;
                }
                catch (Exception ex) when (attempt < 2 && !cancellationToken.IsCancellationRequested && IsTransientFailure(ex))
                {
                    _logger.LogWarning(ex, "Unable to connect to the BootstrapBlazor Hub; retrying.");
                    await Task.Delay(TimeSpan.FromSeconds(3), cancellationToken);
                }
            }

            _pendingSubscriptions.UnionWith(_subscriptions.Keys);
        }

        if (_connection.State != HubConnectionState.Connected)
        {
            throw new InvalidOperationException("The BootstrapBlazor connection is reconnecting. Retry when it is connected.");
        }

        await RestoreSubscriptionsCoreAsync(cancellationToken);
    }

    /// <summary>
    /// <para lang="zh">自动重连成功后逐项恢复消息订阅，并重试暂时性故障</para>
    /// <para lang="en">Restore message subscriptions individually after automatic reconnection and retry transient failures</para>
    /// </summary>
    /// <param name="connectionId"><para lang="zh">重连后的连接标识</para><para lang="en">The connection identifier after reconnection</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    private async Task RestoreSubscriptionsAsync(string? connectionId)
    {
        var token = _lifetime.Token;
        try
        {
            var initialize = true;
            while (true)
            {
                await _gate.WaitAsync(token);
                try
                {
                    if (initialize)
                    {
                        _pendingSubscriptions.UnionWith(_subscriptions.Keys);
                        initialize = false;
                    }
                    if (_connection.State != HubConnectionState.Connected)
                    {
                        return;
                    }

                    await RestoreSubscriptionsCoreAsync(token);
                    if (_pendingSubscriptions.Count == 0)
                    {
                        return;
                    }
                }
                finally
                {
                    _gate.Release();
                }

                await Task.Delay(TimeSpan.FromSeconds(3), token);
            }
        }
        catch (OperationCanceledException) when (token.IsCancellationRequested)
        {
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unable to restore dispatch subscriptions after reconnecting.");
        }
    }

    /// <summary>
    /// <para lang="zh">在持有连接锁时恢复待处理订阅，隔离单项失败；服务端明确拒绝时停止重试，执行失败时保留待重试项</para>
    /// <para lang="en">Restore pending subscriptions while holding the connection gate, isolating individual failures; stop retrying explicit server rejections and retain server execution failures for retry</para>
    /// </summary>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    private async Task RestoreSubscriptionsCoreAsync(CancellationToken cancellationToken)
    {
        foreach (var entryType in _pendingSubscriptions.ToArray())
        {
            cancellationToken.ThrowIfCancellationRequested();
            try
            {
                await SubscribeCoreAsync(entryType, cancellationToken);
                _pendingSubscriptions.Remove(entryType);
            }
            catch (Exception ex) when (!cancellationToken.IsCancellationRequested)
            {
                if (!IsTransientFailure(ex) && _connection.State == HubConnectionState.Connected)
                {
                    _pendingSubscriptions.Remove(entryType);
                }
                _logger.LogError(ex, "Unable to restore the dispatch subscription for entry type {EntryType}.", entryType);
            }
        }
    }

    /// <summary>
    /// <para lang="zh">请求服务端订阅，区分明确拒绝与可重试的服务端执行失败</para>
    /// <para lang="en">Request a server subscription, distinguishing explicit rejection from retryable server execution failures</para>
    /// </summary>
    /// <param name="entryType"><para lang="zh">消息类型标识</para><para lang="en">The entry type identifier</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    private async Task SubscribeCoreAsync(string entryType, CancellationToken cancellationToken)
    {
        try
        {
            if (!await _connection.InvokeAsync<bool>("Subscribe", entryType, cancellationToken))
            {
                throw new UnauthorizedAccessException("Dispatch subscriptions are not allowed for this type.");
            }
        }
        catch (HubException ex)
        {
            throw new IOException("The server could not complete the dispatch subscription.", ex);
        }
    }

    /// <summary>
    /// <para lang="zh">将服务端消息传递给对应消息类型的接收回调</para>
    /// <para lang="en">Forward a server message to the receiver registered for its entry type</para>
    /// </summary>
    /// <param name="entryType"><para lang="zh">消息类型标识</para><para lang="en">The entry type identifier</para></param>
    /// <param name="entry"><para lang="zh">消息的 JSON 数据</para><para lang="en">The message JSON data</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    private async Task ReceiveAsync(string entryType, JsonElement entry)
    {
        if (_subscriptions.TryGetValue(entryType, out var callback))
        {
            try
            {
                await callback(entry);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unable to receive a dispatch for entry type {EntryType}.", entryType);
            }
        }
    }

    /// <summary>
    /// <para lang="zh">取消连接操作，注销消息接收回调并释放 Hub 连接</para>
    /// <para lang="en">Cancel connection operations, unregister the message receiver, and dispose of the Hub connection</para>
    /// </summary>
    /// <returns><para lang="zh">表示异步释放操作的任务</para><para lang="en">A task representing the asynchronous disposal operation</para></returns>
    public async ValueTask DisposeAsync()
    {
        _lifetime.Cancel();
        _connection.Reconnected -= RestoreSubscriptionsAsync;
        _receiver.Dispose();
        await _connection.DisposeAsync();
        _lifetime.Dispose();
    }

    /// <summary>
    /// <para lang="zh">自动重连策略，首次立即重试，后续间隔递增至最多 30 秒</para>
    /// <para lang="en">Automatic reconnection policy that retries immediately at first, then increases the delay up to 30 seconds</para>
    /// </summary>
    private sealed class ConnectionRetryPolicy : IRetryPolicy
    {
        /// <summary>
        /// <para lang="zh">根据已重试次数计算下次重连的等待时间</para>
        /// <para lang="en">Calculate the delay before the next reconnection attempt based on the previous retry count</para>
        /// </summary>
        /// <param name="retryContext"><para lang="zh">重试上下文</para><para lang="en">The retry context</para></param>
        /// <returns><para lang="zh">下次重连前的等待时间</para><para lang="en">The delay before the next reconnection attempt</para></returns>
        public TimeSpan? NextRetryDelay(RetryContext retryContext)
            => TimeSpan.FromSeconds(Math.Min(30, retryContext.PreviousRetryCount * 3));
    }
}
