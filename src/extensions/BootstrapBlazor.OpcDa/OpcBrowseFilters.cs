// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <para lang="zh">OpcDataServer BrowseFilters 封装类</para>
/// <para lang="en">Wrapper for OpcDataServer BrowseFilters</para>
/// </summary>
public class OpcBrowseFilters
{
    /// <summary>
    /// <para lang="zh">获得/设置 最大返回节点数量</para>
    /// <para lang="en">Gets or sets the maximum number of returned nodes</para>
    /// </summary>
    public int MaxElementsReturned { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 元素名称过滤器</para>
    /// <para lang="en">Gets or sets the element name filter</para>
    /// </summary>
    public string? ElementNameFilter { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否返回所有属性</para>
    /// <para lang="en">Gets or sets whether all properties are returned</para>
    /// </summary>
    public bool ReturnAllProperties { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否返回属性值</para>
    /// <para lang="en">Gets or sets whether property values are returned</para>
    /// </summary>
    public bool ReturnPropertyValues { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 浏览过滤器类型</para>
    /// <para lang="en">Gets or sets the browse filter type</para>
    /// </summary>
    public OpcBrowseFilterType BrowseFilter { get; set; }
}
