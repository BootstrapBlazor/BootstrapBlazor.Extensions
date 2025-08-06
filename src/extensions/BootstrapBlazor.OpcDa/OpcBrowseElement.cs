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
    public string Name { get; set; }

    /// <summary>
    /// 获得/设置 Item 名称
    /// </summary>
    public string ItemName { get; set; }

    /// <summary>
    /// 获得/设置 是否是数据项
    /// </summary>
    public bool IsItem { get; set; }

    /// <summary>
    /// 获得/设置 是否有子节点
    /// </summary>
    public bool HasChildren { get; set; }

    /// <summary>
    /// 构造函数
    /// </summary>
    public OpcBrowseElement()
    {
        Name = "";
        ItemName = "";
    }

    internal OpcBrowseElement(BrowseElement element)
    {
        Name = element.Name;
        ItemName = element.ItemName;
        IsItem = element.IsItem;
        HasChildren = element.HasChildren;
    }
}
