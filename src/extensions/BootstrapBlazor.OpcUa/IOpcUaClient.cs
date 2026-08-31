// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcUa;

/// <summary>
/// <para lang="zh">OPC UA 客户端接口</para>
/// <para lang="en">OPC UA client interface</para>
/// </summary>
public interface IOpcUaClient : IAsyncDisposable
{
    /// <summary>
    /// <para lang="zh">获得当前是否已连接</para>
    /// <para lang="en">Gets whether the client is connected</para>
    /// </summary>
    bool IsConnected { get; }

    /// <summary>
    /// <para lang="zh">获得当前端点地址</para>
    /// <para lang="en">Gets the current endpoint URL</para>
    /// </summary>
    string? EndpointUrl { get; }

    /// <summary>
    /// <para lang="zh">连接 OPC UA 服务器</para>
    /// <para lang="en">Connects to an OPC UA server</para>
    /// </summary>
    Task<bool> ConnectAsync(string endpointUrl, OpcUaConnectionOptions? options = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// <para lang="zh">断开当前连接</para>
    /// <para lang="en">Disconnects the current session</para>
    /// </summary>
    Task DisconnectAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// <para lang="zh">读取节点值</para>
    /// <para lang="en">Reads node values</para>
    /// </summary>
    Task<IReadOnlyList<OpcUaReadItem>> ReadAsync(IEnumerable<string> nodeIds, CancellationToken cancellationToken = default);

    /// <summary>
    /// <para lang="zh">写入节点值</para>
    /// <para lang="en">Writes node values</para>
    /// </summary>
    Task<IReadOnlyList<OpcUaWriteItem>> WriteAsync(IEnumerable<OpcUaWriteItem> items, CancellationToken cancellationToken = default);

    /// <summary>
    /// <para lang="zh">浏览节点</para>
    /// <para lang="en">Browses a node</para>
    /// </summary>
    Task<IReadOnlyList<OpcUaBrowseElement>> BrowseAsync(string nodeId, OpcUaBrowseOptions? options = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// <para lang="zh">创建订阅</para>
    /// <para lang="en">Creates a subscription</para>
    /// </summary>
    Task<IOpcUaSubscription> CreateSubscriptionAsync(string name, int publishingInterval = 1000, bool active = true, CancellationToken cancellationToken = default);

    /// <summary>
    /// <para lang="zh">取消订阅</para>
    /// <para lang="en">Cancels a subscription</para>
    /// </summary>
    Task CancelSubscriptionAsync(IOpcUaSubscription subscription, CancellationToken cancellationToken = default);
}
