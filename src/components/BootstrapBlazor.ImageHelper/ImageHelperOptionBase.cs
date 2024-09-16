// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 选项
/// </summary>
public class ImageHelperOptionBase
{

    public string OpenCvUrl { get; set; } = "/_content/BootstrapBlazor.ImageHelper/opencv.js";

    public string CaptureDom { get; set; } = "captureInput";

    public string FileInputDom { get; set; } = "fileInput";

    public string ImageDataDom { get; set; } = "imageSrc";

    public string VideoInputDom { get; set; } = "videoInput";
    public string StartAndStopDom { get; set; } = "startAndStop";
    public string ErrorOutputDom { get; set; } = "errorMessage";
    public string SourceSelectDom { get; set; } = "sourceSelect";
    public string SourceSelectPanelDom { get; set; } = "sourceSelectPanel";

    /// <summary>
    /// 选择设备按钮文本/Select device button title
    /// </summary>
    public string SelectDeviceBtnTitle { get; set; } = "选择设备";

    /// <summary>
    /// 指定摄像头设备ID
    /// </summary>
    public string? DeviceID { get; set; }

    /// <summary>
    /// 保存最后使用设备ID下次自动调用
    /// </summary>
    public bool SaveDeviceID { get; set; } = true;

    /// <summary>
    /// 图像质量,默认为 0.9
    /// </summary>
    [DisplayName("图像质量")]
    public double Quality { get; set; } = 0.9d;

    /// <summary>
    /// 图像宽度,默认为 640
    /// </summary>
    [DisplayName("图像宽度")]
    public int Width { get; set; }= 640;

    /// <summary>
    /// 图像高度,默认为 480
    /// </summary>
    [DisplayName("图像高度")]
    public int Height { get; set; } = 480;

    /// <summary>
    /// 单次解码
    /// </summary>
    [DisplayName("单次解码")]
    public bool DecodeOnce { get; set; } = true;

    /// <summary>
    /// 自动裁剪图像,只要居中区域
    /// </summary>
    [DisplayName("显示log")]
    public bool AutoCaputeCrop { get; set; } = true;

    /// <summary>
    /// 二次剪裁
    /// </summary>
    [DisplayName("二次剪裁")]
    public bool Retry { get; set; } = true;

    /// <summary>
    /// 显示log
    /// </summary>
    [DisplayName("显示log")]
    public bool Debug { get; set; }

}
