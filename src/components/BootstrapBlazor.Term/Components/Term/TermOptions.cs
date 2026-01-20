// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// Term Options
/// </summary>
public class TermOptions
{
    /// <summary>
    /// 获得/设置 终端字体大小 默认 14
    /// </summary>
    public int FontSize { get; set; } = 14;

    /// <summary>
    /// 获得/设置 终端字体
    /// </summary>
    public string FontFamily { get; set; } = "Consolas, 'Courier New', monospace";

    /// <summary>
    /// 获得/设置 终端主题 默认 null 使用默认主题
    /// </summary>
    public TermTheme? Theme { get; set; }

    /// <summary>
    /// 获得/设置 光标闪烁 默认 true
    /// </summary>
    public bool CursorBlink { get; set; } = true;

    /// <summary>
    /// 获得/设置 行高 默认 1.0
    /// </summary>
    public double LineHeight { get; set; } = 1.0;

    /// <summary>
    /// 获得/设置 是否将 \n 转换为 \r\n 默认 false
    /// </summary>
    public bool ConvertEol { get; set; }
}

/// <summary>
/// Term Theme
/// </summary>
public class TermTheme
{
    /// <summary>
    /// Background color
    /// </summary>
    public string? Background { get; set; }

    /// <summary>
    /// Foreground color
    /// </summary>
    public string? Foreground { get; set; }

    /// <summary>
    /// Cursor color
    /// </summary>
    public string? Cursor { get; set; }

    /// <summary>
    /// Selection color
    /// </summary>
    public string? Selection { get; set; }
}
