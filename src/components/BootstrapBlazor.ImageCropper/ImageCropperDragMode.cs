// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 拖动模式
/// </summary>
public enum ImageCropperDragMode
{
    /// <summary>
    ///  创建一个新的裁剪框
    /// </summary>
    Crop,

    /// <summary>
    /// 画布和图片都可以移动
    /// </summary>
    Move,

    /// <summary>
    /// 未设置
    /// </summary>
    None
}
