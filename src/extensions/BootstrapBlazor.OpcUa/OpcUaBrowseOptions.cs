// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc.Ua;

namespace BootstrapBlazor.OpcUa;

/// <summary>
/// <para lang="zh">OPC UA 节点浏览配置</para>
/// <para lang="en">OPC UA node browse options</para>
/// </summary>
public sealed class OpcUaBrowseOptions
{
    /// <summary>
    /// <para lang="zh">获得/设置 每个节点最多返回的引用数量，零表示由服务器决定</para>
    /// <para lang="en">Gets or sets the maximum references returned per node; zero lets the server decide</para>
    /// </summary>
    public uint MaxReferencesReturned { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 浏览方向</para>
    /// <para lang="en">Gets or sets the browse direction</para>
    /// </summary>
    public BrowseDirection BrowseDirection { get; set; } = BrowseDirection.Forward;

    /// <summary>
    /// <para lang="zh">获得/设置 引用类型</para>
    /// <para lang="en">Gets or sets the reference type</para>
    /// </summary>
    public NodeId ReferenceTypeId { get; set; } = ReferenceTypeIds.HierarchicalReferences;

    /// <summary>
    /// <para lang="zh">获得/设置 是否包含引用类型的子类型</para>
    /// <para lang="en">Gets or sets whether reference subtypes are included</para>
    /// </summary>
    public bool IncludeSubtypes { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 节点类型掩码</para>
    /// <para lang="en">Gets or sets the node class mask</para>
    /// </summary>
    public uint NodeClassMask { get; set; } = (uint)(NodeClass.Object | NodeClass.Variable | NodeClass.Method);
}
