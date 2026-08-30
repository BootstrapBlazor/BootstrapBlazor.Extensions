// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// 编辑器设置
/// </summary>
public class EditorSettings
{
    /// <summary>
    /// CodeMirror主题，默认为 default
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Theme { get; set; }

    /// <summary>
    /// 编辑器高度，默认为100%
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Height { get; set; }

    /// <summary>
    /// 编辑器显示模式
    /// edit&amp;preview: 双栏编辑预览模式，默认值
    /// editOnly: 只显示编辑器
    /// previewOnly: 预览模式
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DefaultModel { get; set; }

    /// <summary>
    /// 粘贴 Html 时自动转换为 Markdown 格式
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? ConvertWhenPaste { get; set; }
}
