// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// 条码生成器选项
/// </summary>
public class BarcodeGeneratorOption
{
    /// <summary>
    /// 获得/设置 条码类型 默认 "auto" (CODE128)
    /// </summary>
    [JsonConverter(typeof(JsonDescriptionEnumConverter<EnumBarcodeFormat>))]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public EnumBarcodeFormat? Format { get; set; }

    /// <summary>
    /// 获得/设置 单个条形的宽度 默认值：2
    /// </summary>
    [Range(1, 6)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Width { get; set; }

    /// <summary>
    /// 获得/设置 条形码的高度 默认值 100
    /// </summary>
    [Range(10, 300)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Height { get; set; }

    /// <summary>
    /// 获得/设置 显示条码文字,默认 true
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? DisplayValue { get; set; }

    /// <summary>
    /// 获得/设置 覆盖显示的文本
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Text { get; set; }

    /// <summary>
    /// 获得/设置 字体式样
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonEnumConverter(true)]
    public EnumBarcodeTextFontOption? FontOptions { get; set; }

    /// <summary>
    /// 获得/设置 字体,默认值："monospace" 等宽
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonEnumConverter(true)]
    public EnumBarcodeTextFont? Font { get; set; }

    /// <summary>
    /// 获得/设置 文字对齐 默认值 center
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonEnumConverter(true)]
    public EnumBarcodeTextAlign? TextAlign { get; set; }

    /// <summary>
    /// 获得/设置 文字位置,默认值 bottom
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonEnumConverter(true)]
    public EnumBarcodeTextPosition? TextPosition { get; set; }

    /// <summary>
    /// 获得/设置 文本边距 默认值：2
    /// </summary>
    [Range(-30, 100)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? TextMargin { get; set; }

    /// <summary>
    /// 获得/设置 字体大小,默认值：20
    /// </summary>
    [Range(8, 52)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? FontSize { get; set; }

    /// <summary>
    /// 获得/设置 背景色 默认值 #FFFFFF
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Background { get; set; }

    /// <summary>
    /// 获得/设置 线条颜色 默认值 #000000
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? LineColor { get; set; }

    /// <summary>
    /// 获得/设置 间距 默认值 10
    /// </summary>
    [Range(-30, 100)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Margin { get; set; }

    /// <summary>
    /// 获得/设置 顶部间距 默认 null 未设置
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? MarginTop { get; set; }

    /// <summary>
    /// 获得/设置 底部间距 默认 null 未设置
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? MarginBottom { get; set; }

    /// <summary>
    /// 获得/设置 左侧间距 默认 null 未设置
    /// </summary>
    [Range(-30, 100)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? MarginLeft { get; set; }

    /// <summary>
    /// 获得/设置 右侧间距 默认 null 未设置
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? MarginRight { get; set; }

    /// <summary>
    /// 获得/设置 底线平整 默认 false (仅EAN8/EAN13) 有效
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Flat { get; set; }
}
