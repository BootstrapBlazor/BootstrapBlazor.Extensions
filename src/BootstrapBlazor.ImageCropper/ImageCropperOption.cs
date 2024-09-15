// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// 播放器选项
/// </summary>
public class CropperOption
{

    /// <summary>
    /// 定义自动裁剪区域大小（百分比）,默认值：（0.8图像的 80%）
    /// </summary>
    public float AutoCropArea { get; set; } = 0.8f;

    /// <summary>
    /// 启用初始化时自动裁剪图像
    /// </summary>
    public bool AutoCrop { get; set; } = true;

    /// <summary>
    /// 定义裁剪框的固定纵横比。默认情况下，裁剪框具有自由比例。 设置为1, 裁剪区默认正方形
    /// </summary>
    public int? AspectRatio { get; set; }

    /// <summary>
    /// 显示容器的网格背景, 默认 false 关闭
    /// </summary>
    public bool Background { get; set; }

    /// <summary>
    /// 在裁剪框上方显示中心指示器
    /// </summary>
    public bool Center { get; set; } = true;

    /// <summary>
    /// 检查当前图片是否为跨域图片, 默认 true 。crossOrigin则会在克隆的图像元素中添加一个属性，并在该属性中添加一个时间戳参数，src以重新加载源图像，以避免浏览器缓存错误。向图像元素添加crossOrigin属性将停止向图像 URL 添加时间戳并停止重新加载图像。但是读取图像数据以进行方向检查的请求（XMLHttpRequest）将需要时间戳来破坏缓存以避免浏览器缓存错误。您可以将checkOrientation选项设置false为取消此请求。如果图像crossOrigin属性的值为"use-credentials"，则当通过 XMLHttpRequest 读取图像数据时，该withCredentials属性将设置为。true
    /// </summary>
    public bool CheckCrossOrigin { get; set; } = true;

    /// <summary>
    /// 检查当前图像的 Exif 方向信息, 默认 true 。请注意，只有 JPEG 图像可能包含 Exif 方向信息。
    /// </summary>
    public bool CheckOrientation { get; set; } = true;

    public string? Crop { get; set; }

    /// <summary>
    /// 启用/禁止裁剪区移动, 默认 true, 可移动
    /// </summary>
    public bool CropBoxMovable { get; set; } = true;

    /// <summary>
    /// 启用/禁止裁剪区缩放, 默认 true, 可缩放
    /// </summary>
    public bool CropBoxResizable { get; set; } = true;

    public object? Cropend { get; set; }
    public object? Cropmove { get; set; }
    public object? Cropstart { get; set; }

    /// <summary>
    /// 数据, 您存储的先前裁剪的数据将setData在初始化时自动传递给该方法, 仅当该autoCrop选项设置为 时才可用true
    /// </summary>
    public object? Data { get; set; }

    /// <summary>
    /// 拖动模式, 默认 move 画布和图片都可以移动, 'none'，'crop'，'move'
    /// </summary>
    public string DragMode => cropperDragMode.ToString();

    /// <summary>
    /// 拖动模式, 默认 move 画布和图片都可以移动, 'none'，'crop'，'move'
    /// </summary>
    [JsonIgnore]
    public CropperDragMode cropperDragMode { get; set; } = CropperDragMode.move;

    /// <summary>
    /// 显示裁剪框上方的虚线
    /// </summary>
    public bool Guides { get; set; } = true;

    /// <summary>
    /// 在裁剪框上方显示白色模态（突出显示裁剪框）
    /// </summary>
    public bool Highlight { get; set; } = true;

    /// <summary>
    /// 裁剪框的最小高度
    /// </summary>
    public int MinCanvasHeight { get; set; } = 0;

    /// <summary>
    /// 裁剪框的最小宽度
    /// </summary>
    public int MinCanvasWidth { get; set; } = 0;

    /// <summary>
    /// 容器的最小宽度
    /// </summary>
    public int MinContainerHeight { get; set; } = 100;

    /// <summary>
    /// 容器的最小宽度
    /// </summary>
    public int MinContainerWidth { get; set; } = 200;

    /// <summary>
    /// 画布的最小高度
    /// </summary>
    public int MinCropBoxHeight { get; set; } = 0;

    /// <summary>
    /// 画布的最小宽度
    /// </summary>
    public int MinCropBoxWidth { get; set; } = 0;

    /// <summary>
    /// 在图像上方和裁剪框下方显示黑色模态框
    /// </summary>
    public bool Modal { get; set; } = true;

    /// <summary>
    /// 可移动图像
    /// </summary>
    public bool Movable { get; set; } = true;

    /// <summary>
    /// 预览 , 默认：'' , 类型：Element、Array（元素）NodeList或String（选择器）
    /// </summary>
    public string Preview { get; set; } = "";

    /// <summary>
    /// 调整窗口大小时重新渲染裁剪器
    /// </summary>
    public bool Responsive { get; set; } = true;

    /// <summary>
    /// 调整窗口大小后恢复裁剪区域
    /// </summary>

    public bool Restore { get; set; } = true;

    /// <summary>
    /// 可旋转
    /// </summary>
    public bool Rotatable { get; set; } = true;

    /// <summary>
    /// 可旋转
    /// </summary>
    public bool Scalable { get; set; } = true;

    /// <summary>
    /// 启用在裁剪器上单击两次时在"crop"和之间切换拖动模式。"move"
    /// </summary>
    public bool ToggleDragModeOnDblclick { get; set; } = true;

    /// <summary>
    /// 1.只能在裁剪的图片范围内移动
    /// </summary>
    public int ViewMode => (int)ViewModes;

    /// <summary>
    /// 1.只能在裁剪的图片范围内移动
    /// </summary>
    [JsonIgnore]
    public CropperViewMode ViewModes { get; set; } = CropperViewMode.crop_box_not_to_exceed_the_size_canvas;

    public float WheelZoomRatio { get; set; } = 0.1f;
    public int? Zoom { get; set; }

    /// <summary>
    /// 通过拖动触摸来缩放图像
    /// </summary>
    public bool ZoomOnTouch { get; set; } = true;

    /// <summary>
    /// 鼠标滚轮缩放
    /// </summary>
    public bool ZoomOnWheel { get; set; } = true;

    /// <summary>
    /// 可缩放
    /// </summary>
    public bool Zoomable { get; set; } = true;

}

/// <summary>
/// 拖动模式
/// </summary>
public enum CropperDragMode
{
    /// <summary>
    ///  创建一个新的裁剪框/create a new crop box
    /// </summary>
    crop,

    /// <summary>
    /// 画布和图片都可以移动/move the canvas
    /// </summary>
    move,

    none
}

public enum CropperViewMode
{
    /// <summary>
    /// 无限制,裁剪框可以延伸到画布之外
    /// </summary>
    no_restrictions,

    /// <summary>
    /// 限制裁剪框不超过画布的大小
    /// </summary>
    crop_box_not_to_exceed_the_size_canvas,

    /// <summary>
    /// 限制最小画布尺寸以适合容器。如果画布和容器的比例不同，则最小画布将被其中一个维度的额外空间包围,裁剪框限制为画布的大小
    /// </summary>
    fit_container,

    /// <summary>
    /// 限制最小画布尺寸以填充容器。如果画布和容器的比例不同，则容器将无法以某一维度容纳整个画布
    /// </summary>
    fit_container_width,

}
