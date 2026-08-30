// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <para lang="zh">OpcDa 客户端接口</para>
/// <para lang="en">OpcDa client interface</para>
/// </summary>
public interface IOpcDaClient : IDisposable
{
    /// <summary>
    /// <para lang="zh">获得 OPC Server 是否已连接</para>
    /// <para lang="en">Gets whether the client is connected to the OPC Server</para>
    /// </summary>
    bool IsConnected { get; }

    /// <summary>
    /// <para lang="zh">获得 OPC Server 名称</para>
    /// <para lang="en">Gets the OPC Server name</para>
    /// </summary>
    string? ServerName { get; }

    /// <summary>
    /// <para lang="zh">连接到 OPC Server</para>
    /// <para lang="en">Connects to an OPC Server</para>
    /// </summary>
    /// <param name="serverName"></param>
    /// <returns></returns>
    bool Connect(string serverName);

    /// <summary>
    /// <para lang="zh">断开当前连接</para>
    /// <para lang="en">Disconnects the current connection</para>
    /// </summary>
    void Disconnect();

    /// <summary>
    /// <para lang="zh">取消订阅</para>
    /// <para lang="en">Cancels a subscription</para>
    /// </summary>
    /// <param name="subscription"></param>
    void CancelSubscription(IOpcSubscription subscription);

    /// <summary>
    /// <para lang="zh">创建订阅</para>
    /// <para lang="en">Creates a subscription</para>
    /// </summary>
    /// <param name="name">订阅名称</param>
    /// <param name="updateRate">更新频率 默认 1000 毫秒</param>
    /// <param name="active">是否激活 默认 true</param>
    /// <returns></returns>
    IOpcSubscription CreateSubscription(string name, int updateRate = 1000, bool active = true);

    /// <summary>
    /// <para lang="zh">读取 Item 值</para>
    /// <para lang="en">Reads item values</para>
    /// </summary>
    /// <param name="items"></param>
    /// <returns></returns>
    HashSet<OpcReadItem> Read(params HashSet<string> items);

    /// <summary>
    /// <para lang="zh">写入 Item 值</para>
    /// <para lang="en">Writes item values</para>
    /// </summary>
    /// <param name="items"></param>
    /// <returns></returns>
    HashSet<OpcWriteItem> Write(params HashSet<OpcWriteItem> items);

    /// <summary>
    /// <para lang="zh">浏览 OPC Server 中的位号（即数据项或者标签）</para>
    /// <para lang="en">Browses tags in the OPC Server</para>
    /// </summary>
    /// <param name="name"></param>
    /// <param name="filters"></param>
    /// <param name="position"></param>
    /// <returns></returns>
    OpcBrowseElement[] Browse(string name, OpcBrowseFilters filters, out OpcBrowsePosition? position);

    /// <summary>
    /// <para lang="zh">继续浏览 OPC Server 中的位号（即数据项或者标签）</para>
    /// <para lang="en">Continues browsing tags in the OPC Server</para>
    /// </summary>
    /// <param name="position"></param>
    /// <returns></returns>
    OpcBrowseElement[] BrowseNext(OpcBrowsePosition position);
}
