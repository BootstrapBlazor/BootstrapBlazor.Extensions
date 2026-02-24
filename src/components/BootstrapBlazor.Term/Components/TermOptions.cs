// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">Term 选项类</para>
/// <para lang="en">Term Options</para>
/// </summary>
public class TermOptions
{
    /// <summary>
    /// <para lang="zh">获得/设置 终端字体大小 默认 14</para>
    /// <para lang="en">Gets or sets the font size of the terminal. Default is 14.</para>
    /// </summary>
    public int FontSize { get; set; } = 14;

    /// <summary>
    /// <para lang="zh">获得/设置 终端字体</para>
    /// <para lang="en">Gets or sets the font family of the terminal.</para>
    /// </summary>
    public string FontFamily { get; set; } = "Consolas, 'Courier New', monospace";

    /// <summary>
    /// <para lang="zh">获得/设置 终端主题 默认 null 使用默认主题</para>
    /// <para lang="en">Gets or sets the theme of the terminal. Default is null (uses default theme).</para>
    /// </summary>
    public TermTheme? Theme { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 光标闪烁 默认 true</para>
    /// <para lang="en">Gets or sets whether the cursor blinks. Default is true.</para>
    /// </summary>
    public bool CursorBlink { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 行高 默认 1.0</para>
    /// <para lang="en">Gets or sets the line height. Default is 1.0.</para>
    /// </summary>
    public double LineHeight { get; set; } = 1.0;

    /// <summary>
    /// <para lang="zh">获得/设置 是否将 \n 转换为 \r\n 默认 false</para>
    /// <para lang="en">Gets or sets whether to convert \n to \r\n. Default is false.</para>
    /// </summary>
    public bool ConvertEol { get; set; }
}

/// <summary>
/// <para lang="zh">Term 主题类</para>
/// <para lang="en">Term Theme</para>
/// </summary>
public class TermTheme
{
    /// <summary>
    /// <para lang="zh">背景色</para>
    /// <para lang="en">Background color</para>
    /// </summary>
    public string? Background { get; set; }

    /// <summary>
    /// <para lang="zh">前景色</para>
    /// <para lang="en">Foreground color</para>
    /// </summary>
    public string? Foreground { get; set; }

    /// <summary>
    /// <para lang="zh">光标颜色</para>
    /// <para lang="en">Cursor color</para>
    /// </summary>
    public string? Cursor { get; set; }

    /// <summary>
    /// <para lang="zh">选中颜色</para>
    /// <para lang="en">Selection color</para>
    /// </summary>
    public string? Selection { get; set; }
}
