// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.ComponentModel;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// 条码类型
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EnumBarcodeType
{
    CODE128,
    CODE128A,
    CODE128B,
    CODE128C,
    EAN13,
    EAN8,
    EAN5,
    EAN2,
    UPC,
    CODE39,
    ITF14,
    ITF,
    MSI,
    MSI10,
    MSI11,
    MSI1010,
    MSI1110,
    pharmacode,
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EnumBarcodeTextAlign
{
    [Description("左对齐")]
    left,

    [Description("居中")]
    center,

    [Description("右对齐")]
    right,
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EnumTextPosition
{
    [Description("底部")]
    bottom,

    [Description("顶部")]
    top, 
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EnumBarcodeFont
{
    Monospace,
    SansSerif,
    Serif,
    Fantasy,
    Cursive,
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EnumBarcodeFontOption
{
    [Description("一般")]
    [EnumMember(Value = "")]
    normal,

    [Description("加粗")]
    bold,

    [Description("斜体")]
    italic,

    [Description("加粗斜体")]
    [EnumMember(Value = "bold italic")]
    bold_italic,
}
