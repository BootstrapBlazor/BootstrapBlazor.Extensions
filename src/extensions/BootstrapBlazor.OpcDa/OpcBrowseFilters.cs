// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// 对 OpcDataServer BrowseFilters 的封装类
/// </summary>
public class OpcBrowseFilters
{
    /// <summary>
    /// 获得/设置 最大返回节点数量
    /// </summary>
    public int MaxElementsReturned { get; set; }

    /// <summary>
    /// 获得/设置 元素名称过滤器
    /// </summary>
    public string? ElementNameFilter { get; set; }

    /// <summary>
    /// 获得/设置 是否返回所有属性
    /// </summary>
    public bool ReturnAllProperties { get; set; }

    /// <summary>
    /// 获得/设置 是否返回属性值
    /// </summary>
    public bool ReturnPropertyValues { get; set; }
}
