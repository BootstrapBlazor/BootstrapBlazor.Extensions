// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// ImageCropperViewMode 枚举值
/// </summary>
public enum ImageCropperViewMode
{
    /// <summary>
    /// 无限制,裁剪框可以延伸到画布之外
    /// </summary>
    NoRestrictions,

    /// <summary>
    /// 限制裁剪框不超过画布的大小
    /// </summary>
    CropBoxNotToExceedTheSizeCanvas,

    /// <summary>
    /// 限制最小画布尺寸以适合容器。如果画布和容器的比例不同，则最小画布将被其中一个维度的额外空间包围,裁剪框限制为画布的大小
    /// </summary>
    FitContainer,

    /// <summary>
    /// 限制最小画布尺寸以填充容器。如果画布和容器的比例不同，则容器将无法以某一维度容纳整个画布
    /// </summary>
    FitContainerWidth,
}
