// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components.Data;

namespace BootstrapBlazor.Components.Interfaces;

/// <summary>
/// 节点组件接口
/// </summary>
public interface INodeWidget
{
    /// <summary>
    /// 组件ID，需要在当前节点下唯一
    /// </summary>
    public string WidgetId { get; set; }
    /// <summary>
    /// 节点组件类型
    /// </summary>
    public NodeWidgetType WidgetType { get; }

    /// <summary>
    /// 节点组件名称
    /// </summary>
    public string DisplayName { get; set; }

    /// <summary>
    /// 默认值
    /// </summary>
    public object? Value { get; set; }

    /// <summary>
    /// 节点组件配置
    /// </summary>
    public WidgetOptions? WidgetOptions { get; set; }

    /// <summary>
    /// 回调函数
    /// </summary>
    public Func<object?, GraphNode, Task>? Callback { get; set; }
}

/// <inheritdoc />
public interface INodeWidget<TValue, TOption> : INodeWidget where TOption : WidgetOptions
{
    /// <summary>
    /// 默认值
    /// </summary>
    public new TValue? Value { get; set; }

    /// <summary>
    /// 节点组件配置
    /// </summary>
    public new TOption? WidgetOptions { get; set; }

    /// <summary>
    /// 回调函数
    /// </summary>
    public new Func<TValue?, GraphNode, Task>? Callback { get; set; }
}
