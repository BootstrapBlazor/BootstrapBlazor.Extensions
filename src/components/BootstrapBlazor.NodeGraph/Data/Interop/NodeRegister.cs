// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components.Data.Interop;

/// <summary>
/// 节点插槽
/// </summary>
public class NodeSlot
{
    /// <summary>
    /// 插槽名称
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// 插槽类型 TypeName
    /// </summary>
    public string Type { get; set; } = string.Empty;
}

/// <summary>
/// 节点配置
/// </summary>
public class GraphNodeConfig
{
    /// <summary>
    /// 节点唯一类型路径，形如 groupA/groupB/NodeName
    /// </summary>
    public string TypePath { get; set; } = null!;

    /// <summary>
    /// 节点名称
    /// </summary>
    public string DisplayName { get; set; } = string.Empty;

    /// <summary>
    /// 输入插槽
    /// </summary>
    public List<NodeSlot> Inputs { get; set; } = new();

    /// <summary>
    /// 输出插槽
    /// </summary>
    public List<NodeSlot> Outputs { get; set; } = new();

    /// <summary>
    /// 节点组件
    /// </summary>
    public List<NodeWidget> Widgets { get; set; } = new();

    /// <summary>
    /// 是否有执行方法
    /// </summary>
    public bool HasAction { get; set; }
}
