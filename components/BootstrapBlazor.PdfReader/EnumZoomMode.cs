// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.ComponentModel;
using System.Reflection;

namespace BootstrapBlazor.Components;

/// <summary>
/// 缩放模式
/// </summary>
public enum EnumZoomMode
{
    /// <summary>
    /// 自动缩放
    /// </summary>
    [Description("auto")]
    Auto,

    /// <summary>
    /// 实际大小
    /// </summary>
    [Description("page-actual")]
    PageActual,

    /// <summary>
    /// 适合页面
    /// </summary>
    [Description("page-fit")]
    PageFit,

    /// <summary>
    /// 适合页宽
    /// </summary>
    [Description("page-width")]
    PageWidth,

    [Description("page-height")]
    PageHeight,

    [Description("pref")]
    Pref,

    [Description("refW")]
    RefW,

    [Description("75")]
    Zoom75,

    [Description("50")]
    Zoom50,

    [Description("25")]
    Zoom25,

    [Description("200")]
    Zoom200,

}

/// <summary>
/// Enum 扩展方法
/// </summary>


internal static class EnumExtensions
{

    /// <summary>
    /// 重写Enum ToString（）
    /// </summary>
    /// <param name="en"></param>
    /// <returns></returns>
    public static string GetEnumName(this Enum en)
    {
        Type temType = en.GetType();
        MemberInfo[] memberInfos = temType.GetMember(en.ToString());
        if (memberInfos != null && memberInfos.Length > 0)
        {
            object[] objs = memberInfos[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
            if (objs != null && objs.Length > 0)
            {
                return ((DescriptionAttribute)objs[0]).Description;
            }
        }
        return en.ToString();
    }
}
