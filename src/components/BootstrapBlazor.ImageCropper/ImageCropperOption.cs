// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

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
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ImageCropperViewMode? ViewMode { get; set; }

    /// <summary>
    /// Define the dragging mode of the cropper
    /// </summary>
    [JsonEnumConverter(true)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ImageCropperDragMode? DragMode { get; set; }

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
    public float? AspectRatio { get; set; }

    /// <summary>
    /// Re-render the cropper when resizing the window. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Responsive { get; set; }

    /// <summary>
    /// Restore the cropped area after resizing the window. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Restore { get; set; }

    /// <summary>
    /// Check if the current image is a cross-origin image. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? CheckCrossOrigin { get; set; }

    /// <summary>
    /// Check the current image's Exif Orientation information. Note that only a JPEG image may contain Exif Orientation information. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? CheckOrientation { get; set; }

    /// <summary>
    /// 在图像上方和裁剪框下方显示黑色模态框. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Modal { get; set; }

    /// <summary>
    /// 显示裁剪框上方的虚线. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Guides { get; set; }

    /// <summary>
    /// 在裁剪框上方显示中心指示器. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Center { get; set; }

    /// <summary>
    /// 在裁剪框上方显示白色模态（突出显示裁剪框）. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Highlight { get; set; }

    /// <summary>
    /// 显示容器的网格背景, 默认 true 关闭
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Background { get; set; }

    /// <summary>
    /// Enable to crop the image automatically when initialized. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? AutoCrop { get; set; }

    /// <summary>
    /// It should be a number between 0 and 1. Define the automatic cropping area size (percentage) default is 0.8f
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? AutoCropArea { get; set; }

    /// <summary>
    /// Enable to move the image. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Movable { get; set; }

    /// <summary>
    /// Enable to rotate the image. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Rotatable { get; set; }

    /// <summary>
    /// Enable to scale the image. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Scalable { get; set; }

    /// <summary>
    /// Enable to zoom the image. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Zoomable { get; set; }

    /// <summary>
    /// Enable to zoom the image by dragging touch. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? ZoomOnTouch { get; set; }

    /// <summary>
    /// Enable to zoom the image by mouse wheeling. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? ZoomOnWheel { get; set; }

    /// <summary>
    /// Define zoom ratio when zooming the image by mouse wheeling
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? WheelZoomRatio { get; set; }

    /// <summary>
    /// Enable to move the crop box by dragging. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? CropBoxMovable { get; set; }

    /// <summary>
    /// Enable to resize the crop box by dragging. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? CropBoxResizable { get; set; }

    /// <summary>
    /// Enable to toggle drag mode between "crop" and "move" when clicking twice on the cropper. default tue
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? ToggleDragModeOnDblclick { get; set; }

    /// <summary>
    /// 裁剪框的最小高度 默认值 0
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? MinCanvasHeight { get; set; }

    /// <summary>
    /// 裁剪框的最小宽度 默认值 0
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? MinCanvasWidth { get; set; }

    /// <summary>
    /// 容器的最小宽度 默认值 100
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? MinContainerHeight { get; set; }

    /// <summary>
    /// 容器的最小宽度 默认值 200
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? MinContainerWidth { get; set; }

    /// <summary>
    /// 画布的最小高度 默认值 0
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? MinCropBoxHeight { get; set; }

    /// <summary>
    /// 画布的最小宽度 默认值 0
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? MinCropBoxWidth { get; set; }

    /// <summary>
    /// 是否圆角处理 默认 false
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IsRound { get; set; }

    /// <summary>
    /// 获得/设置 圆角 radius 值 
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Radius { get; set; }
}
