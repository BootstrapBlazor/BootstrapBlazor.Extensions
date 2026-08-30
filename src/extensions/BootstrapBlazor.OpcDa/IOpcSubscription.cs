// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <para lang="zh">OpcDa 订阅接口</para>
/// <para lang="en">OpcDa subscription interface</para>
/// </summary>
public interface IOpcSubscription
{
    /// <summary>
    /// <para lang="zh">获得 订阅名称</para>
    /// <para lang="en">Gets the subscription name</para>
    /// </summary>
    public string Name { get; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否保留最后一个值</para>
    /// <para lang="en">Gets or sets whether to retain the previous value</para>
    /// </summary>
    public bool KeepLastValue { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 数据变更回调</para>
    /// <para lang="en">Gets or sets the data change callback</para>
    /// </summary>
    Action<List<OpcReadItem>>? DataChanged { get; set; }

    /// <summary>
    /// <para lang="zh">增加数据项</para>
    /// <para lang="en">Adds monitored items</para>
    /// </summary>
    /// <param name="items"></param>
    void AddItems(IEnumerable<string> items);
}
