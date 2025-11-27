// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// PdfReader 文档适配模式
/// </summary>
public enum PdfReaderFitMode
{
    /// <summary>
    /// 页面宽度
    /// </summary>
    [Description("page-width")]
    PageWidth,

    /// <summary>
    /// 实际大小
    /// </summary>
    [Description("page-actual")]
    PageActual,

    /// <summary>
    /// 页面高度
    /// </summary>
    [Description("page-height")]
    PageHeight,

    /// <summary>
    /// 自适应宽高
    /// </summary>
    [Description("page-fit")]
    PageFit,

    /// <summary>
    /// 自动
    /// </summary>
    [Description("auto")]
    Auto
}
