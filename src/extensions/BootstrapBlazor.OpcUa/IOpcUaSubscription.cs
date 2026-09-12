// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcUa;

/// <summary>
/// <para lang="zh">OPC UA 订阅接口</para>
/// <para lang="en">OPC UA subscription interface</para>
/// </summary>
public interface IOpcUaSubscription
{
    /// <summary>
    /// <para lang="zh">获得 订阅名称</para>
    /// <para lang="en">Gets the subscription name</para>
    /// </summary>
    string Name { get; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否保留上一次的值</para>
    /// <para lang="en">Gets or sets whether to retain the previous value</para>
    /// </summary>
    bool KeepLastValue { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 数据变化回调</para>
    /// <para lang="en">Gets or sets the data change callback</para>
    /// </summary>
    Action<IReadOnlyList<OpcUaReadItem>>? DataChanged { get; set; }

    /// <summary>
    /// <para lang="zh">增加监控节点</para>
    /// <para lang="en">Adds monitored nodes</para>
    /// </summary>
    Task AddItemsAsync(IEnumerable<string> nodeIds, int samplingInterval = -1, CancellationToken cancellationToken = default);
}
