// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// 状态栏设置
/// </summary>
public class ToolbarSettings
{
    /// <summary>
    /// 主题，light 、dark（默认值）
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Theme { get; set; }

    /// <summary>
    /// 自定义工具栏按钮，null则为默认工具栏，false则不显示工具栏
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? Toolbar { get; set; }

    /// <summary>
    /// 选中后的悬浮菜单，null为默认悬浮菜单，false则不显示悬浮菜单
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? Bubble { get; set; }

    /// <summary>
    /// 新行的悬浮菜单，null为默认悬浮菜单，false则不显示悬浮菜单
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public object? Float { get; set; }
}
