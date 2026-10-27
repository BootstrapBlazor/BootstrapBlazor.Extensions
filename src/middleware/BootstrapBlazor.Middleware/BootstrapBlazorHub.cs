// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0.

using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">消息分发和在线连接共用的 SignalR Hub</para>
/// <para lang="en">Shared SignalR Hub for dispatch and online connections.</para>
/// <para><version>11.0.0</version></para>
/// </summary>
/// <remarks>
/// <para lang="zh">重连后需恢复订阅。宿主可对映射端点配置认证和授权。</para>
/// <para lang="en">Subscriptions must be restored after reconnecting. Hosts can configure authentication and authorization on the mapped endpoint.</para>
/// </remarks>
public sealed class BootstrapBlazorHub(BootstrapBlazorHubOptions options, IServiceProvider services) : Hub
{
    /// <summary>
    /// <para lang="zh">尝试将当前连接加入消息类型分组，区分订阅拒绝与服务端执行失败</para>
    /// <para lang="en">Attempts to join an entry type group, distinguishing subscription rejection from server execution failures.</para>
    /// </summary>
    /// <param name="entryType"><para lang="zh">消息类型标识</para><para lang="en">The entry type identifier.</para></param>
    /// <returns><para lang="zh">订阅成功时返回 true，类型未被允许时返回 false；加入分组失败时抛出异常</para><para lang="en">True when subscribed, or false when the type is disallowed. Group membership failures throw an exception.</para></returns>
    public Task<bool> Subscribe(string entryType)
        => DispatchHandler.SubscribeAsync(Context, Groups, entryType, options);

    /// <summary>
    /// <para lang="zh">取消当前连接对指定消息类型的订阅</para>
    /// <para lang="en">Unsubscribes the current connection from the specified entry type.</para>
    /// </summary>
    public Task Unsubscribe(string entryType)
        => DispatchHandler.UnsubscribeAsync(Context, Groups, entryType);

    /// <summary>
    /// <para lang="zh">将消息分发给服务端本地订阅者和其他已订阅连接，发送端在调用成功后自行显示消息</para>
    /// <para lang="en">Dispatches a message locally and to other subscribed connections. The sender displays its own message after the invocation succeeds.</para>
    /// </summary>
    public Task Dispatch(string entryType, JsonElement entry)
        => DispatchHandler.DispatchAsync(Context, entryType, entry, options, services);

    /// <summary>
    /// <para lang="zh">上报客户端业务心跳，服务端禁用心跳时返回 false，传输层保活不能代替业务心跳</para>
    /// <para lang="en">Reports an application heartbeat, returning false when heartbeats are disabled. Transport keepalive messages do not replace application heartbeats.</para>
    /// </summary>
    public Task<bool> Heartbeat(ClientInfo client)
        => ConnectionHandler.ReportHeartbeatAsync(Context, client, services);

    /// <summary>
    /// <para lang="zh">查询在线连接列表，仅返回给调用方，不向消息订阅者广播；查询被禁用或调用方未获授权时返回 null</para>
    /// <para lang="en">Queries the online connections for the caller only, without broadcasting them to dispatch subscribers. Returns null when queries are disabled or the caller is not authorized.</para>
    /// </summary>
    public Task<ICollection<ConnectionItem>?> GetConnectionSnapshot()
        => ConnectionHandler.GetSnapshotAsync(Context, options, services);
}
