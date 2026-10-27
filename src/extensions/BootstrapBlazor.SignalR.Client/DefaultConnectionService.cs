// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using Microsoft.Extensions.Logging;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">基于 SignalR 的客户端连接服务，通过心跳上报连接信息并轮询服务端连接快照</para>
/// <para lang="en">SignalR client connection service that reports connection information through heartbeats and polls server connection snapshots</para>
/// </summary>
sealed class DefaultConnectionService : IConnectionService, IAsyncDisposable
{
    private readonly SignalRConnection _connection;
    private readonly ILogger<DefaultConnectionService> _logger;
    private readonly CancellationTokenSource _lifetime = new();
    private readonly Task _pollingTask;
    private ConnectionSnapshot _snapshot = new();
    private int _disposed;

    /// <summary>
    /// <para lang="zh">初始化客户端连接服务并启动连接快照轮询</para>
    /// <para lang="en">Initialize the client connection service and start connection snapshot polling</para>
    /// </summary>
    /// <param name="connection"><para lang="zh">共享的 SignalR 连接</para><para lang="en">The shared SignalR connection</para></param>
    /// <param name="logger"><para lang="zh">日志记录器</para><para lang="en">The logger</para></param>
    public DefaultConnectionService(SignalRConnection connection, ILogger<DefaultConnectionService> logger)
    {
        _connection = connection;
        _logger = logger;
        _connection.Retain();
        _pollingTask = PollAsync(_lifetime.Token);
    }

    /// <summary>
    /// <para lang="zh">获得 最近一次服务端快照中的连接数量</para>
    /// <para lang="en">Gets the connection count from the latest server snapshot</para>
    /// </summary>
    public long Count => _snapshot.Count;

    /// <summary>
    /// <para lang="zh">获得 最近一次服务端快照中的连接集合</para>
    /// <para lang="en">Gets the connection collection from the latest server snapshot</para>
    /// </summary>
    public ICollection<ConnectionItem> Connections => _snapshot.Connections;

    /// <summary>
    /// <para lang="zh">根据连接标识从本地快照中获取连接信息</para>
    /// <para lang="en">Try to get connection information from the local snapshot by connection identifier</para>
    /// </summary>
    /// <param name="key"><para lang="zh">连接标识</para><para lang="en">The connection identifier</para></param>
    /// <param name="value"><para lang="zh">匹配的连接信息，未找到时为 null</para><para lang="en">The matching connection information, or null if not found</para></param>
    /// <returns><para lang="zh">找到连接时返回 true，否则返回 false</para><para lang="en">True if the connection is found; otherwise, false</para></returns>
    public bool TryGetValue(string key, [NotNullWhen(true)] out ConnectionItem? value)
    {
        value = _snapshot.Connections.FirstOrDefault(item => item.Id == key);
        return value != null;
    }

    /// <summary>
    /// <para lang="zh">向服务端发送心跳以添加或更新客户端连接信息</para>
    /// <para lang="en">Send a heartbeat to the server to add or update client connection information</para>
    /// </summary>
    /// <param name="client"><para lang="zh">客户端信息</para><para lang="en">The client information</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示异步操作的任务</para><para lang="en">A task representing the asynchronous operation</para></returns>
    public async Task AddOrUpdateAsync(ClientInfo client, CancellationToken cancellationToken = default)
    {
        using var cancellation = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, _lifetime.Token);
        if (!await _connection.InvokeAsync<bool>("Heartbeat", client, cancellation.Token))
        {
            _logger.LogWarning("Connection heartbeats are disabled on the server.");
        }
    }

    /// <summary>
    /// <para lang="zh">定期刷新连接快照，查询被禁用、未获授权或请求被拒绝时停止轮询</para>
    /// <para lang="en">Periodically refresh the connection snapshot, stopping when queries are disabled, unauthorized, or rejected</para>
    /// </summary>
    /// <param name="cancellationToken"><para lang="zh">取消令牌</para><para lang="en">The cancellation token</para></param>
    /// <returns><para lang="zh">表示轮询操作的任务</para><para lang="en">A task representing the polling operation</para></returns>
    private async Task PollAsync(CancellationToken cancellationToken)
    {
        try
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                try
                {
                    var snapshot = await _connection.InvokeAsync<ConnectionSnapshot?>("GetConnectionSnapshot", null, cancellationToken);
                    if (snapshot == null)
                    {
                        _snapshot = new();
                        _logger.LogInformation("Connection snapshot polling stopped because queries are disabled or not authorized.");
                        return;
                    }
                    _snapshot = snapshot;
                }
                catch (HttpRequestException ex) when (!cancellationToken.IsCancellationRequested && !SignalRConnection.IsTransientFailure(ex))
                {
                    _snapshot = new();
                    _logger.LogWarning(ex, "Connection snapshot polling stopped because the Hub request was rejected.");
                    return;
                }
                catch (Exception ex) when (!cancellationToken.IsCancellationRequested)
                {
                    _logger.LogError(ex, "Unable to refresh the connection snapshot.");
                }
                await Task.Delay(TimeSpan.FromSeconds(3), cancellationToken);
            }
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
        }
    }

    /// <summary>
    /// <para lang="zh">停止连接快照轮询并释放共享连接的使用引用</para>
    /// <para lang="en">Stop connection snapshot polling and release the usage reference to the shared connection</para>
    /// </summary>
    /// <returns><para lang="zh">表示异步释放操作的任务</para><para lang="en">A task representing the asynchronous disposal operation</para></returns>
    public async ValueTask DisposeAsync()
    {
        if (Interlocked.Exchange(ref _disposed, 1) != 0)
        {
            return;
        }

        _lifetime.Cancel();
        try
        {
            await _pollingTask;
        }
        finally
        {
            try
            {
                await _connection.ReleaseAsync();
            }
            finally
            {
                _lifetime.Dispose();
            }
        }
    }
}
