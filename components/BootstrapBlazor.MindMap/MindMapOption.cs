// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.ComponentModel;

namespace BootstrapBlazor.Components.MindMaps;

/// <summary>
/// MindMap选项
/// </summary>
public class MindMapOption
{
    /// <summary>
    /// 布局
    /// </summary>
    [DisplayName("布局")]
    public EnumMindMapLayout Layout { get; set; } = EnumMindMapLayout.logicalStructure;

    /// <summary>
    /// 主题
    /// </summary>
    [DisplayName("主题")]
    public EnumMindMapTheme Theme { get; set; } = EnumMindMapTheme.defaultTheme;
}
