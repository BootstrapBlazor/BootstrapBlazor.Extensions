// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components.Data;
using BootstrapBlazor.Components.Interfaces;
using System.ComponentModel;

namespace BootstrapBlazor.Components;
#pragma warning disable CS1591
/// <summary>
/// 组件类型
/// </summary>
public enum NodeWidgetType
{
    [Description("toggle")]
    Boolean,

    [Description("number")]
    Number,

    [Description("slider")]
    Slider,

    [Description("knob")]
    Knob,

    [Description("string")]
    String,

    [Description("button")]
    Button,
}
#pragma warning restore CS1591

/// <summary>
/// 节点组件
/// </summary>
public abstract class NodeWidget : INodeWidget
{
    /// <inheritdoc />
    public string WidgetId { get; set; } = string.Empty;

    /// <inheritdoc />
    public abstract NodeWidgetType WidgetType { get; }

    /// <inheritdoc />
    public string DisplayName { get; set; } = "";

    /// <inheritdoc />
    public object? Value { get; set; }

    /// <inheritdoc />
    public WidgetOptions? WidgetOptions { get; set; }

    /// <inheritdoc />
    public Func<object?, GraphNode, Task>? Callback { get; set; }
}

/// <inheritdoc cref="NodeWidget" />
public abstract class NodeWidget<TValue, TOption> : NodeWidget, INodeWidget<TValue, TOption>
    where TOption : WidgetOptions
{
    /// <inheritdoc />
    public new TValue? Value { get => (TValue?)base.Value; set => base.Value = value!; }

    /// <inheritdoc />
    public new TOption? WidgetOptions
    {
        get => base.WidgetOptions as TOption;
        set => base.WidgetOptions = value;
    }

    /// <inheritdoc />
    public new Func<TValue?, GraphNode, Task>? Callback
    {
        get
        {
            if (base.Callback == null)
            {
                return null;
            }

            return (v, node) => base.Callback.Invoke(v, node);
        }
        set
        {
            if (value == null)
            {
                base.Callback = null;
            }
            else
            {
                base.Callback = (v, node) => value((TValue?)v, node);
            }
        }
    }
}

/// <summary>
/// 布尔值节点组件
/// </summary>
public class BooleanWidget : NodeWidget<bool, BooleanWidgetOptions>
{
    /// <inheritdoc />
    public override NodeWidgetType WidgetType => NodeWidgetType.Boolean;
}

/// <summary>
/// 数字节点组件
/// </summary>
public class NumberWidget : NodeWidget<double, NumberWidgetOptions>
{
    /// <inheritdoc />
    public override NodeWidgetType WidgetType => NodeWidgetType.Number;
}

/// <summary>
/// 滑动条节点组件
/// </summary>
public class SliderWidget : NodeWidget<double, SliderWidgetOptions>
{
    /// <inheritdoc />
    public override NodeWidgetType WidgetType => NodeWidgetType.Slider;
}

/// <summary>
/// 旋钮节点组件
/// </summary>
public class KnobWidget : NodeWidget<double, KnobWidgetOptions>
{
    /// <inheritdoc />
    public override NodeWidgetType WidgetType => NodeWidgetType.Knob;
}

/// <summary>
/// 字符串节点组件
/// </summary>
public class StringWidget : NodeWidget<string, WidgetOptions>
{
    /// <inheritdoc />
    public override NodeWidgetType WidgetType => NodeWidgetType.String;
}

/// <summary>
/// 按钮节点组件
/// </summary>
public class ButtonWidget : NodeWidget<string, WidgetOptions>
{
    /// <inheritdoc />
    public override NodeWidgetType WidgetType => NodeWidgetType.Button;
}
