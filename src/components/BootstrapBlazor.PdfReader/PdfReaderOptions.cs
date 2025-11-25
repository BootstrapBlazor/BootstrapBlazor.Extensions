// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// PdfReader 组件配置类
/// </summary>
public class PdfReaderOptions
{
    /// <summary>
    /// 获得/设置 是否显示工具栏 默认 true 显示
    /// </summary>
    public bool ShowToolbar { get; set; } = true;

    /// <summary>
    /// 获得/设置 PDF 文档路径
    /// </summary>
    public string? Url { get; set; }

    /// <summary>
    /// 获得/设置 PDF 组件高度 默认 600px
    /// </summary>
    public string? ViewHeight { get; set; }

    /// <summary>
    /// 获得/设置 当前页码
    /// </summary>
    public uint CurrentPage { get; set; }

    /// <summary>
    /// 获得/设置 是否适配当前页面宽度 默认 false
    /// </summary>
    public bool IsFitToPage { get; set; }

    /// <summary>
    /// 页面初始化回调方法
    /// </summary>
    public Func<int, Task>? OnInitAsync { get; set; }

    /// <summary>
    /// 页面初始化回调方法
    /// </summary>
    public Func<uint, Task>? OnPageChangedAsync { get; set; }
}
