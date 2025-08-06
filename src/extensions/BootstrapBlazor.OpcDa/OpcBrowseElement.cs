// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc.Da;

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// 对 OpcDataServer BrowseElement 的封装类
/// </summary>
public class OpcBrowseElement
{
    /// <summary>
    /// 获得/设置 节点名称
    /// </summary>
    public string Name => _element.Name;

    /// <summary>
    /// 获得/设置 是否是数据项
    /// </summary>
    public bool IsItem => _element.IsItem;

    /// <summary>
    /// 获得/设置 是否有子节点
    /// </summary>
    public bool HasChildren => _element.HasChildren;

    internal OpcBrowseElement(BrowseElement element)
    {
        _element = element;
    }

    private readonly BrowseElement _element;
}
