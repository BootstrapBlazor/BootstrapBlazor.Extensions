// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Core.Converter;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// 裁剪选项
/// </summary>
public class ImageCropperOption
{
    /// <summary>
    /// Define the view mode of the cropper
    /// </summary>
    public ImageCropperViewMode ViewMode { get; set; } = ImageCropperViewMode.CropBoxNotToExceedTheSizeCanvas;

    /// <summary>
    /// Define the dragging mode of the cropper
    /// </summary>
    [JsonEnumConverter(true)]
    public ImageCropperDragMode DragMode { get; set; } = ImageCropperDragMode.Crop;

    /// <summary>
    /// Define the initial aspect ratio of the crop box
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? InitialAspectRatio { get; set; }

    /// <summary>
    /// Define the fixed aspect ratio of the crop box 定义裁剪框的固定纵横比
    /// </summary>
    /// <remarks>默认情况下，裁剪框具有自由比例。 设置为1, 裁剪区默认正方形</remarks>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? AspectRatio { get; set; }

    /// <summary>
    /// Re-render the cropper when resizing the window
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Responsive { get; set; } = true;

    /// <summary>
    /// Restore the cropped area after resizing the window
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Restore { get; set; } = true;

    /// <summary>
    /// Check if the current image is a cross-origin image
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool CheckCrossOrigin { get; set; } = true;

    /// <summary>
    /// Check the current image's Exif Orientation information. Note that only a JPEG image may contain Exif Orientation information
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool CheckOrientation { get; set; } = true;

    /// <summary>
    /// 在图像上方和裁剪框下方显示黑色模态框
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Modal { get; set; } = true;

    /// <summary>
    /// 显示裁剪框上方的虚线
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Guides { get; set; } = true;

    /// <summary>
    /// 在裁剪框上方显示中心指示器
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Center { get; set; } = true;

    /// <summary>
    /// 在裁剪框上方显示白色模态（突出显示裁剪框）
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Highlight { get; set; } = true;

    /// <summary>
    /// 显示容器的网格背景, 默认 true 关闭
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Background { get; set; } = true;

    /// <summary>
    /// Enable to crop the image automatically when initialized
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool AutoCrop { get; set; } = true;

    /// <summary>
    /// It should be a number between 0 and 1. Define the automatic cropping area size (percentage)
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public float AutoCropArea { get; set; } = 0.8f;

    /// <summary>
    /// Enable to move the image
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Movable { get; set; } = true;

    /// <summary>
    /// Enable to rotate the image
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Rotatable { get; set; } = true;

    /// <summary>
    /// Enable to scale the image
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Scalable { get; set; } = true;

    /// <summary>
    /// Enable to zoom the image
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Zoomable { get; set; } = true;

    /// <summary>
    /// Enable to zoom the image by dragging touch
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool ZoomOnTouch { get; set; } = true;

    /// <summary>
    /// Enable to zoom the image by mouse wheeling
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool ZoomOnWheel { get; set; } = true;

    /// <summary>
    /// Define zoom ratio when zooming the image by mouse wheeling
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public float WheelZoomRatio { get; set; } = 0.1f;

    /// <summary>
    /// Enable to move the crop box by dragging
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool CropBoxMovable { get; set; } = true;

    /// <summary>
    /// Enable to resize the crop box by dragging
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool CropBoxResizable { get; set; } = true;

    /// <summary>
    /// Enable to toggle drag mode between "crop" and "move" when clicking twice on the cropper
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool ToggleDragModeOnDblclick { get; set; } = true;

    /// <summary>
    /// 裁剪框的最小高度
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int MinCanvasHeight { get; set; } = 0;

    /// <summary>
    /// 裁剪框的最小宽度
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int MinCanvasWidth { get; set; } = 0;

    /// <summary>
    /// 容器的最小宽度
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int MinContainerHeight { get; set; } = 100;

    /// <summary>
    /// 容器的最小宽度
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int MinContainerWidth { get; set; } = 200;

    /// <summary>
    /// 画布的最小高度
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int MinCropBoxHeight { get; set; } = 0;

    /// <summary>
    /// 画布的最小宽度
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int MinCropBoxWidth { get; set; } = 0;
}
