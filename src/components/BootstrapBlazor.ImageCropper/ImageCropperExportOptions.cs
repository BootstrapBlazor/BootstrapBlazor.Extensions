// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 图片裁剪导出选项
/// </summary>
public class ImageCropperExportOptions
{
    /// <summary>
    /// 获取/设置 导出宽度，单位为像素；保持裁剪区域比例
    /// </summary>
    public int? Width { get; set; }

    /// <summary>
    /// 获取/设置 导出高度，单位为像素；同时设置宽高时按指定尺寸等比缩放
    /// </summary>
    public int? Height { get; set; }

    /// <summary>
    /// 获取/设置 导出格式，支持 image/png、image/jpeg、image/webp，默认 image/png
    /// </summary>
    public string MimeType { get; set; } = "image/png";

    /// <summary>
    /// 获取/设置 JPEG/WebP 导出质量，范围 0 到 1，默认 0.92
    /// </summary>
    public double Quality { get; set; } = 0.92;

    /// <summary>
    /// 获取/设置 背景填充颜色，支持 CSS 颜色；JPEG 默认白色，其他格式默认透明
    /// </summary>
    public string? FillColor { get; set; }

    /// <summary>
    /// 获取/设置 是否启用图像平滑处理，默认 true
    /// </summary>
    public bool ImageSmoothingEnabled { get; set; } = true;

    internal void Validate()
    {
        if (Width <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(Width));
        }
        if (Height <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(Height));
        }
        if (!double.IsFinite(Quality) || Quality < 0 || Quality > 1)
        {
            throw new ArgumentOutOfRangeException(nameof(Quality));
        }
        if (MimeType is not ("image/png" or "image/jpeg" or "image/webp"))
        {
            throw new ArgumentException("Use image/png, image/jpeg or image/webp.", nameof(MimeType));
        }
    }
}
