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
    /// 获得/设置 裁剪框高度值，单位为原始图片像素
    /// </summary>
    public float Height { get; set; }

    /// <summary>
    /// 获得/设置 裁剪框宽度值，单位为原始图片像素
    /// </summary>
    public float Width { get; set; }

    /// <summary>
    /// 获得/设置 裁剪框 X 值，相对于变换后图片边界，单位为原始图片像素
    /// </summary>
    public float X { get; set; }

    /// <summary>
    /// 获得/设置 裁剪框 Y 值，相对于变换后图片边界，单位为原始图片像素
    /// </summary>
    public float Y { get; set; }

    /// <summary>
    /// 获得/设置 图片旋转角度值，单位为度
    /// </summary>
    public float Rotate { get; set; }

    /// <summary>
    /// 获得/设置 图片 X 轴翻转值，1 为未翻转，-1 为翻转
    /// </summary>
    public float ScaleX { get; set; }

    /// <summary>
    /// 获得/设置 图片 Y 轴翻转值，1 为未翻转，-1 为翻转
    /// </summary>
    public float ScaleY { get; set; }
}
