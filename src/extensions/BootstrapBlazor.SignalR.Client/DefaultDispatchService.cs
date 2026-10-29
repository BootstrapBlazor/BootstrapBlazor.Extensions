// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">基于 SignalR 的客户端消息分发服务</para>
/// <para lang="en">SignalR client dispatch service</para>
/// </summary>
/// <typeparam name="TEntry"><para lang="zh">消息数据类型</para><para lang="en">The entry data type</para></typeparam>
/// <param name="connection"><para lang="zh">共享的 SignalR 连接</para><para lang="en">The shared SignalR connection</para></param>
/// <param name="logger"><para lang="zh">日志记录器</para><para lang="en">The logger</para></param>
sealed class DefaultDispatchService<TEntry>(
    SignalRConnection connection,
    ILogger<DefaultDispatchService<TEntry>> logger) : IDispatchService<TEntry>, IAsyncDisposable
{
    private static readonly string _entryType = typeof(TEntry).FullName ?? typeof(TEntry).Name;
    private static readonly JsonSerializerOptions _serializerOptions = new(JsonSerializerDefaults.Web);
    private readonly List<Subscription> _callbacks = [];
    private readonly object _locker = new();
    private readonly SemaphoreSlim _subscriptions = new(1, 1);
    private readonly CancellationTokenSource _lifetime = new();
    private bool _requiresUnsubscribe;

    /// <summary>
    /// <para lang="zh">向服务端分发消息，成功后通知本地订阅者</para>
    /// <para lang="en">Dispatch an entry to the server and notify local subscribers after a successful send</para>
    /// </summary>
    /// <param name="entry"><para lang="zh">消息分发项</para><para lang="en">The dispatch entry</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    public async Task DispatchAsync(DispatchEntry<TEntry> entry, CancellationToken cancellationToken = default)
    {
        await connection.DispatchAsync(_entryType, entry, cancellationToken);
        await DispatchCoreAsync(entry, cancellationToken);
    }

    /// <summary>
    /// <para lang="zh">注册消息回调，并在添加首个本地订阅者时订阅服务端消息</para>
    /// <para lang="en">Register a message callback and subscribe to server messages when adding the first local subscriber</para>
    /// </summary>
    /// <param name="callback"><para lang="zh">消息回调委托</para><para lang="en">The message callback</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    public async Task SubscribeAsync(Func<DispatchEntry<TEntry>, Task> callback, CancellationToken cancellationToken = default)
    {
        using var cancellation = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, _lifetime.Token);
        var token = cancellation.Token;
        // 串行处理订阅与退订，避免后续订阅者在首个远程订阅尚未就绪时返回成功。
        // Serialize subscription changes so later subscribers cannot succeed before the first remote subscription is ready.
        await _subscriptions.WaitAsync(token);
        try
        {
            var subscription = new Subscription(callback);
            // first 表示本次添加前没有本地订阅者，而非服务生命周期内第一次订阅。
            // 同一消息类型仅在本地订阅数从 0 变为 1 时请求远程订阅，后续回调共用该订阅。
            // first means there were no local subscribers before this addition, not the first subscription in the service lifetime.
            // Request a remote subscription only when the local count changes from 0 to 1; later callbacks share it.
            bool first;
            lock (_locker)
            {
                first = _callbacks.Count == 0;
                _callbacks.Add(subscription);
            }
            if (first)
            {
                try
                {
                    while (true)
                    {
                        // 这里不能写 while(!token.IsCancellationRequested) 因为取消时仍需清理远程订阅。
                        // Do not write while(!token.IsCancellationRequested) here because remote subscription still needs to be cleaned up when canceled.
                        token.ThrowIfCancellationRequested();
                        try
                        {
                            // 远程调用失败或取消时，服务端仍可能已完成订阅，因此提前标记需要清理。
                            // The server may have subscribed even if the call fails or is canceled, so mark cleanup as required beforehand.
                            _requiresUnsubscribe = true;
                            await connection.SubscribeAsync(_entryType, ReceiveAsync, token);
                            break;
                        }
                        catch (Exception ex) when (!token.IsCancellationRequested &&
                            (SignalRConnection.IsTransientFailure(ex) ||
                             ex is InvalidOperationException && connection.IsReconnecting))
                        {
                            logger.LogWarning(ex, "Unable to subscribe to dispatch entry type {EntryType}; retrying.", _entryType);
                            await Task.Delay(TimeSpan.FromSeconds(3), token);
                        }
                    }
                }
                catch
                {
                    // 订阅未就绪时撤销本次本地注册，使后续订阅者仍能走 first 分支重新尝试。
                    // Roll back this registration if subscribing fails so the next subscriber can retry through the first branch.
                    lock (_locker)
                    {
                        _callbacks.Remove(subscription);
                    }
                    throw;
                }
            }
        }
        finally
        {
            _subscriptions.Release();
        }
    }

    /// <summary>
    /// <para lang="zh">移除消息回调，并在移除最后一个本地订阅者时取消服务端订阅</para>
    /// <para lang="en">Remove a message callback and unsubscribe from the server when removing the last local subscriber</para>
    /// </summary>
    /// <param name="callback"><para lang="zh">消息回调委托</para><para lang="en">The message callback</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    /// <remarks>
    /// <para lang="zh">传输层退订取消或失败时保留待清理状态，再次退订或释放服务时继续清理</para>
    /// <para lang="en">If transport unsubscription is canceled or fails, retain the pending cleanup state for a subsequent unsubscription or service disposal</para>
    /// </remarks>
    public async Task UnSubscribeAsync(Func<DispatchEntry<TEntry>, Task> callback, CancellationToken cancellationToken = default)
    {
        await _subscriptions.WaitAsync(cancellationToken);
        try
        {
            bool empty;
            lock (_locker)
            {
                var index = _callbacks.FindIndex(subscription => subscription.Callback == callback);
                if (index >= 0)
                {
                    _callbacks.RemoveAt(index);
                }

                // 集合中仍可能存在相同回调的其他订阅记录，因此仅在集合为空时才退订服务端。
                // There may still be other subscription records with the same callback in the collection, so unsubscribe from the server only when the collection is empty.
                empty = _callbacks.Count == 0;
            }
            if (empty && _requiresUnsubscribe)
            {
                await connection.UnsubscribeAsync(_entryType, cancellationToken);
                _requiresUnsubscribe = false;
            }
        }
        finally
        {
            _subscriptions.Release();
        }
    }

    /// <summary>
    /// <para lang="zh">反序列化服务端消息并通知本地订阅者</para>
    /// <para lang="en">Deserialize a server message and notify local subscribers</para>
    /// </summary>
    /// <param name="json"><para lang="zh">消息的 JSON 数据</para><para lang="en">The message JSON data</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    private Task ReceiveAsync(JsonElement json)
        => DispatchCoreAsync(json.Deserialize<DispatchEntry<TEntry>>(_serializerOptions)
            ?? throw new JsonException("The dispatch entry must not be null."));

    /// <summary>
    /// <para lang="zh">依次调用本地消息回调，记录单个回调的异常并继续通知其他订阅者</para>
    /// <para lang="en">Invoke local message callbacks in order, logging individual callback failures and continuing to notify other subscribers</para>
    /// </summary>
    /// <param name="entry"><para lang="zh">消息分发项</para><para lang="en">The dispatch entry</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    private async Task DispatchCoreAsync(DispatchEntry<TEntry> entry, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        Subscription[] callbacks;
        lock (_locker)
        {
            callbacks = _callbacks.ToArray();
        }
        foreach (var subscription in callbacks)
        {
            cancellationToken.ThrowIfCancellationRequested();
            try
            {
                Task callbackTask;
                lock (_locker)
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    if (!_callbacks.Contains(subscription))
                    {
                        continue;
                    }

                    callbackTask = subscription.Callback(entry);
                }

                await callbackTask.WaitAsync(cancellationToken);
                cancellationToken.ThrowIfCancellationRequested();
            }
            catch (Exception ex) when (!cancellationToken.IsCancellationRequested)
            {
                logger.LogError(ex, "A dispatch subscriber failed for entry type {EntryType}.", _entryType);
            }
        }
    }

    /// <summary>
    /// <para lang="zh">取消正在进行的订阅操作，清空本地回调并清理传输层订阅，包括之前未完成的退订</para>
    /// <para lang="en">Cancel pending subscription operations, clear local callbacks, and clean up transport subscriptions, including previously incomplete unsubscriptions</para>
    /// </summary>
    /// <returns><para lang="zh">表示异步释放操作的任务</para><para lang="en">A task representing the asynchronous disposal operation</para></returns>
    public async ValueTask DisposeAsync()
    {
        _lifetime.Cancel();
        await _subscriptions.WaitAsync();
        try
        {
            lock (_locker)
            {
                _callbacks.Clear();
            }
            if (_requiresUnsubscribe)
            {
                await connection.UnsubscribeAsync(_entryType, CancellationToken.None);
                _requiresUnsubscribe = false;
            }
        }
        finally
        {
            _subscriptions.Release();
        }
    }

    /// <summary>
    /// <para lang="zh">独立的消息订阅记录，用于区分同一回调的多次订阅</para>
    /// <para lang="en">An individual message subscription that distinguishes separate registrations of the same callback</para>
    /// </summary>
    /// <param name="callback"><para lang="zh">消息回调委托</para><para lang="en">The message callback</para></param>
    private sealed class Subscription(Func<DispatchEntry<TEntry>, Task> callback)
    {
        /// <summary>
        /// <para lang="zh">获得 消息回调委托</para>
        /// <para lang="en">Gets the message callback</para>
        /// </summary>
        public Func<DispatchEntry<TEntry>, Task> Callback { get; } = callback;
    }
}
