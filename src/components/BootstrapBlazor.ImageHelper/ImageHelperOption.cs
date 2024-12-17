// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.ComponentModel;
using System.Text.Json.Serialization;
 
namespace BootstrapBlazor.Components;

/// <summary>
/// 图像助手选项
/// </summary>
public class ImageHelperOption : ImageHelperOptionBase
{

    /// <summary>
    /// 功能
    /// </summary>
    [DisplayName("功能")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public EnumImageHelperFunc Type { get; set; }

    public string CanvasOutputDom { get; set; } = "canvasOutput";
    public string StatusDom { get; set; } = "status";

}
