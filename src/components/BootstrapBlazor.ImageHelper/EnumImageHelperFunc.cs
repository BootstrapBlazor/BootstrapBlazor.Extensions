// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.ComponentModel;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// ImageHelper 图像助手功能枚举
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EnumImageHelperFunc
{
    [Description("请选择")]
    None,

    /// <summary>
    /// 灰度化
    /// </summary>
    [Description("灰度化")]
    Grayscale,

    /// <summary>
    /// 边缘检测,Canny
    /// </summary>
    [Description("边缘检测")]
    EdgeDetection,

    /// <summary>
    /// 特征点检测,AKAZE
    /// </summary>
    [Description("特征点检测")]
    FeaturePointDetection,

    /// <summary>
    /// 伪彩色, 在一幅影像中使用与真实色彩不同的颜色描述一项物体
    /// </summary>
    [Description("伪彩色")]
    PseudoColor,

    /// <summary>
    /// 图像阈值化
    /// </summary>
    [Description("图像阈值化")]
    Threshold,

    /// <summary>
    /// 人脸检测
    /// </summary>
    [Description("人脸检测")]
    FaceDetection,

    /// <summary>
    /// 人脸检测(1)
    /// </summary>
    [Description("人脸检测(1)")]
    FaceDetection1st,

    /// <summary>
    /// 摄像头人脸检测
    /// </summary>
    [Description("摄像头人脸检测")]
    FaceDetectionInCamera,

    /// <summary>
    /// 摄像头人脸检测dnn
    /// </summary>
    [Description("摄像头人脸检测dnn")]
    FaceDnnCamera,

    /// <summary>
    /// 运动估计
    /// </summary>
    [Description("运动估计")]
    MotionEstimation,

    /// <summary>
    /// 目标识别
    /// </summary>
    [Description("目标识别")]
    TargetRecognition,

    /// <summary>
    /// 图像分割
    /// </summary>
    [Description("图像分割")]
    ImageSegmentation,

    /// <summary>
    /// 运动跟踪
    /// </summary>
    [Description("运动跟踪")]
    ExerciseTracking,

    /// <summary>
    /// 增强现实
    /// </summary>
    [Description("增强现实")]
    AugmentedReality,

    ///// <summary>
    ///// 微信扫码
    ///// </summary>
    //[Description("微信扫码")]
    //WechatQrcode,
}

