// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************


using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

public class SpeechRecognitionOption
{
    /// <summary>
    /// 持续识别,需手动停止。默认为单次识别 false
    /// </summary>
    /// <returns></returns>
    [DisplayName("持续识别,需手动停止")]
    public bool Continuous { get; set; }

    /// <summary>
    /// 返回临时结果(打字机效果)。默认为 false
    /// </summary>
    /// <returns></returns>
    [DisplayName("返回临时结果,打字机效果")]
    public bool InterimResults { get; set; }

    /// <summary>
    /// 返回结果数量。默认值为 1
    /// </summary>
    /// <returns></returns>
    [DisplayName("返回结果数量")]
    public int MaxAlternatives { get; set; } = 1;

}

public class SpeechSynthesisOption
{
    /// <summary>
    /// 速率, 范围可以在 0.1（最低）和 10（最高）之间
    /// </summary>
    /// <returns></returns>
    [DisplayName("速率")]
    public double Rate { get; set; } = 1;

    /// <summary>
    /// 音高,范围可以在 0（最低）和 2（最高）之间
    /// </summary>
    /// <returns></returns>
    [DisplayName("音高")]
    public double Picth { get; set; } = 1;

    /// <summary>
    /// 音量, 浮点数，介于 0（最低）和 1（最高）之间
    /// </summary>
    /// <returns></returns>
    [DisplayName("音量")]
    public double Volume { get; set; } = 1;

}

/// <summary>
/// Voice
/// </summary>
public class WebVoice
{
    /// <summary>
    /// 声音
    /// </summary>
    /// <returns></returns>
    [DisplayName("声音")]
    public string? Name { get; set; }

    /// <summary>
    /// 默认
    /// </summary>
    /// <returns></returns>
    [DisplayName("默认")]
    [JsonPropertyName("default")]
    public bool IsDefault { get; set; }

    /// <summary>
    /// 语言
    /// </summary>
    /// <returns></returns>
    [DisplayName("语言")]
    public string? Lang { get; set; }

    /// <summary>
    /// 语言URI
    /// </summary>
    /// <returns></returns>
    [DisplayName("语言URI")]
    public string? VoiceURI { get; set; }

    /// <summary>
    /// 本地服务
    /// </summary>
    /// <returns></returns>
    [DisplayName("本地服务")]
    public bool LocalService { get; set; }


}

public enum EnumWebVoiceLanguage
{
    /// <summary>
    ///普通话
    /// </summary>
    [Display(Name = "普通话")]
    zh_CN,

    /// <summary>
    ///粤语
    /// </summary>
    [Display(Name = "粤语")]
    zh_HK,

    /// <summary>
    ///英文
    /// </summary>
    [Display(Name = "英文")]
    en_US,

    /// <summary>
    ///西文
    /// </summary>
    [Display(Name = "西文")]
    es_ES,

}
