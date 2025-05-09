// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components.Data;

/// <summary>
/// 节点组件配置
/// </summary>
public abstract record WidgetOptions
{
    // public string? On { get; set; }
    // public string? Off { get; set; }

    /// <summary>
    /// 是否只读
    /// </summary>
    public bool? ReadOnly { get; set; }

    // public int? Y { get; set; }
    // public bool? Multiline { get; set; }

    // TODO: 待测试
    public string? Property { get; set; }

    /// <summary>
    /// 不显示可编辑组件
    /// </summary>
    public bool? Socketless { get; set; }

    // TODO: Combo中使用
    // public TValue[]? Values { get; set; }
}

/// <summary>
/// 布尔组件配置
/// </summary>
public record BooleanWidgetOptions : WidgetOptions
{
}

/// <summary>
/// 数字组件配置
/// </summary>
public record NumberWidgetOptions : WidgetOptions
{
    /// <summary>
    /// 最小值
    /// </summary>
    public double? Min { get; set; }

    /// <summary>
    /// 最大值
    /// </summary>
    public double? Max { get; set; }

    // step 已经废弃
    /// <summary>
    /// 步长
    /// </summary>
    [JsonPropertyName("step2")]
    public double? Step { get; set; }

    /// <summary>
    /// 精度
    /// </summary>
    public int? Precision { get; set; }
}

/// <summary>
/// 滑动条组件配置
/// </summary>
public record SliderWidgetOptions : WidgetOptions
{
    /// <summary>
    /// 最小值
    /// </summary>
    public double Min { get; set; }

    /// <summary>
    /// 最大值
    /// </summary>
    public double Max { get; set; }

    // step 已经废弃
    /// <summary>
    /// 步长
    /// </summary>
    [JsonPropertyName("step2")]
    public double? Step { get; set; }

    /// <summary>
    /// 精度
    /// </summary>
    public int? Precision { get; set; }

    // TODO: CanvasColour
    // public object? SliderColor { get; set; } // TODO: Replace with actual type for CanvasColour
    // public object? MarkerColor { get; set; } // TODO: Replace with actual type for CanvasColour
}

/// <summary>
/// 旋钮组件配置
/// </summary>
public record KnobWidgetOptions : WidgetOptions
{
    /// <summary>
    /// 最小值
    /// </summary>
    public double Min { get; set; }

    /// <summary>
    /// 最大值
    /// </summary>
    public double Max { get; set; }

    // step 已经废弃
    /// <summary>
    /// 步长
    /// </summary>
    [JsonPropertyName("step2")]
    public double? Step { get; set; }

    /// <summary>
    /// 精度
    /// </summary>
    public int? Precision { get; set; }

    // TODO: CanvasColour
    // public object? SliderColor { get; set; } // TODO: Replace with actual type for CanvasColour
    // public object? MarkerColor { get; set; } // TODO: Replace with actual type for CanvasColour

    // public string? GradientStops { get; set; }
}

/// <summary>
/// 文本组件配置
/// </summary>
public record StringWidgetOptions : WidgetOptions
{
}

/// <summary>
/// 按钮组件配置
/// </summary>
public record ButtonWidgetOptions : WidgetOptions
{
}
