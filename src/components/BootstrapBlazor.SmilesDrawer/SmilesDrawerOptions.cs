// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// SmilesDrawerOptions 配置类
/// </summary>
public record SmilesDrawerOptions
{
    /// <summary>
    /// 是否开启紧凑绘图，默认为 false 不开启
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? CompactDrawing { get; set; }

    /// <summary>
    /// 键的线粗细，默认值 0.6
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? BondThickness { get; set; }

    /// <summary>
    /// 键的平行线间距，默认值 2.7
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? BondSpacing { get; set; }

    /// <summary>
    /// 是否显示末端碳 (CH3)，默认为 false 不显示
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? TerminalCarbons { get; set; }

    /// <summary>
    /// 获得/设置 分子图宽度单位 px
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? Width { get; set; }

    /// <summary>
    /// 获得/设置 分子图高度单位 px
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? Height { get; set; }

    /// <summary>
    /// 获得/设置 主题 默认 null 使用 light 主题
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Theme { get; set; }
}
