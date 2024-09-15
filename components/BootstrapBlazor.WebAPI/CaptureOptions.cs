// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************


using Microsoft.AspNetCore.Components;
using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 截屏
/// </summary>
public class CaptureOptions
{

    /// <summary>
    /// 持续获取截图
    /// </summary>
    /// <returns></returns>
    [DisplayName("持续获取截图")]
    public bool Continuous { get; set; }

    /// <summary>
    /// 使用摄像头,否则使用屏幕. 默认为 true
    /// </summary>
    /// <returns></returns>
    [DisplayName("使用摄像头")]
    public bool Camera { get; set; } = true;

    /// <summary>
    /// 显示log
    /// </summary>
    [DisplayName("显示log")]
    public bool Debug { get; set; }

    /// <summary>
    /// 图像质量,默认为 0.8
    /// </summary>
    [DisplayName("图像质量")]
    public double Quality { get; set; } = 0.9d;

    /// <summary>
    /// 图像宽度
    /// </summary>
    [DisplayName("图像宽度")]
    public int? Width { get; set; }

    /// <summary>
    /// 图像高度
    /// </summary>
    [DisplayName("图像高度")]
    public int? Height { get; set; }

    /// <summary>
    /// 指定摄像头设备ID
    /// </summary>
    [DisplayName("指定摄像头设备ID")]
    public string? DeviceID { get; set; }

    /// <summary>
    /// 图像效果预览
    /// </summary>
    [DisplayName("图像效果预览")]
    public bool EffectPreview { get; set; }

    /// <summary>
    /// 图像效果
    /// </summary>
    [DisplayName("图像效果")]
    public EnmuCaptureEffect Effect { get; set; }= EnmuCaptureEffect.无;

}

public enum EnmuCaptureType
{
    /// <summary>
    // 摄像头
    /// </summary>
    Camera,
    /// <summary>
    /// 屏幕
    /// </summary>
    Screen
}

public enum EnmuCaptureEffect
{
    //https://juejin.cn/post/7119893640264024071

    无,

    反色,

    灰度,

    反色_灰度,

    黑白,

    调亮,

    调暗,

    透明度,

    模糊,

    RGB蒙版,

    老照片滤镜,

    马赛克,

    RGB通道_红,

    RGB通道_绿,

    RGB通道_蓝,

    反色_黑白,
}
