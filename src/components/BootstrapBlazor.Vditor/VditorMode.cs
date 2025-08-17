// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 编辑器渲染模式
/// </summary>
public enum VditorMode
{
    /// <summary>
    /// 所见即所得
    /// </summary>
    WYSIWYG,

    /// <summary>
    /// 即使渲染
    /// </summary>
    IR,

    /// <summary>
    /// 左右分屏
    /// </summary>
    SV
}
