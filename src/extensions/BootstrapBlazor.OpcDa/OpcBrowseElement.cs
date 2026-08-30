// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc.Da;

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <para lang="zh">OpcDataServer BrowseElement 封装类</para>
/// <para lang="en">Wrapper for OpcDataServer BrowseElement</para>
/// </summary>
public class OpcBrowseElement
{
    /// <summary>
    /// <para lang="zh">获得/设置 节点名称</para>
    /// <para lang="en">Gets or sets the node name</para>
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 Item 名称</para>
    /// <para lang="en">Gets or sets the item name</para>
    /// </summary>
    public string ItemName { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否是数据项</para>
    /// <para lang="en">Gets or sets whether the node is an item</para>
    /// </summary>
    public bool IsItem { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否有子节点</para>
    /// <para lang="en">Gets or sets whether the node has children</para>
    /// </summary>
    public bool HasChildren { get; set; }

    /// <summary>
    /// <para lang="zh">创建 OpcBrowseElement 实例</para>
    /// <para lang="en">Creates an OpcBrowseElement instance</para>
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
