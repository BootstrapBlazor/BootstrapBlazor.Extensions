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
    /// 键的线粗细，默认值 0.6
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? BondThickness { get; set; }

    /// <summary>
    /// Bond length，默认值 15
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? BondLength { get; set; }

    /// <summary>
    /// Short bond length (e.g. double bonds) in percent of bond length deafult value is 0.85
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? ShortBondLength { get; set; }

    /// <summary>
    /// Bond spacing (e.g. space between double bonds) default value 0.85 * 15
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? BondSpacing { get; set; }

    /// <summary>
    /// Atom Visualization default value 'default'
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? AtomVisualization { get; set; }

    /// <summary>
    /// Large Font Size (in pt for elements) default value 6
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? FontSizeLarge { get; set; }

    /// <summary>
    /// Small Font Size (in pt for numbers) default value 4
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? FontSizeSmall { get; set; }

    /// <summary>
    /// Padding default value 20.0
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? Padding { get; set; }

    /// <summary>
    /// Use experimental features default value false
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Experimental { get; set; }

    /// <summary>
    /// Show Terminal Carbons (CH3) default value false
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? TerminalCarbons { get; set; }

    /// <summary>
    /// Show explicit hydrogens default value false
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? ExplicitHydrogens { get; set; }

    /// <summary>
    /// Overlap sensitivity default value 0.42
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? OverlapSensitivity { get; set; }

    /// <summary>
    /// # of overlap resolution iterations default value 1
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? OverlapResolutionIterations { get; set; }

    /// <summary>
    /// 是否开启紧凑绘图，默认为 false 不开启
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? CompactDrawing { get; set; }

    /// <summary>
    /// Draw isometric SMILES if available default value true
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Isometric { get; set; }

    /// <summary>
    /// 获得/设置 主题 默认 null 使用 light 主题
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Theme { get; set; }
}
