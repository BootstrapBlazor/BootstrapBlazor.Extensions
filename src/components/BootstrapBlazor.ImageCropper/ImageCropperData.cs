// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 裁切数据实体类
/// </summary>
public struct ImageCropperData
{
    /// <summary>
    /// 获得/设置 裁剪框高度值
    /// </summary>
    public float Height { get; set; }

    /// <summary>
    /// 获得/设置 裁剪框宽度值
    /// </summary>
    public float Width { get; set; }

    /// <summary>
    /// 获得/设置 裁剪框 X 值
    /// </summary>
    public float X { get; set; }

    /// <summary>
    /// 获得/设置 裁剪框 Y 值
    /// </summary>
    public float Y { get; set; }

    /// <summary>
    /// 获得/设置 裁剪框旋转角度值
    /// </summary>
    public float Rotate { get; set; }

    /// <summary>
    /// 获得/设置 裁剪框 X 轴缩放值
    /// </summary>
    public float ScaleX { get; set; }

    /// <summary>
    /// 获得/设置 裁剪框 Y 轴缩放值
    /// </summary>
    public float ScaleY { get; set; }
}
