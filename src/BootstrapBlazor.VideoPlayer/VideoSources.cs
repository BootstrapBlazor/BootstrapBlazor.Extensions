// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

namespace BootstrapBlazor.Components;

/// <summary>
/// 播放资源
/// </summary>
public class VideoSources
{
    /// <summary>
    /// 构造函数
    /// </summary>
    /// <param name="type"></param>
    /// <param name="src"></param>
    public VideoSources(string type, string src)
    {
        Type = type;
        Src = src;
    }

    /// <summary>
    /// 资源类型
    /// <para>video/mp4</para>
    /// <para>application/x-mpegURL</para>
    /// <para>video/ogg</para>
    /// <para>video/x-matroska</para>
    /// <para>更多参考 EnumVideoType</para>
    /// </summary>
    public string Type { get; set; } = "application/x-mpegURL";

    /// <summary>
    /// 资源地址
    /// </summary>
    public string Src { get; set; }
}
