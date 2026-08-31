// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <para lang="zh">OpcDa 浏览过滤器类型枚举</para>
/// <para lang="en">OpcDa browse filter type</para>
/// </summary>
public enum OpcBrowseFilterType
{
    /// <summary>
    /// <para lang="zh">全部</para>
    /// <para lang="en">All nodes</para>
    /// </summary>
    All,

    /// <summary>
    /// <para lang="zh">分支</para>
    /// <para lang="en">Branches</para>
    /// </summary>
    Branch,

    /// <summary>
    /// <para lang="zh">数据项</para>
    /// <para lang="en">Items</para>
    /// </summary>
    Item
}
