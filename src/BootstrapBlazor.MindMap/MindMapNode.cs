// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

namespace BootstrapBlazor.Components.MindMaps;

public class MindMapNode
{
    public NodeData? Data { get; set; }

    public List<MindMapNode>? Children { get; set; }
}

public class NodeData
{
    /// <summary>
    /// 节点文本
    /// </summary>
    public string? Text { get; set; }

    /// <summary>
    /// 图片
    /// </summary>
    public string? Image { get; set; }

    /// <summary>
    /// 图片文本
    /// </summary>
    public string? ImageTitle { get; set; }

    /// <summary>
    /// 图片尺寸
    /// </summary>
    public ImageSize? ImageSize { get; set; }

    /// <summary>
    /// 图标
    /// </summary>
    public List<string>? Icon { get; set; }

    /// <summary>
    /// 标签, tag: ['标签1', '标签2'],
    /// </summary>
    public List<string>? Tag { get; set; }

    /// <summary>
    /// 链接
    /// </summary>
    public string? Hyperlink { get; set; }

    /// <summary>
    /// 链接文本
    /// </summary>
    public string? HyperlinkTitle { get; set; }

    /// <summary>
    /// 备注内容
    /// </summary>
    public string? Note { get; set; }

    /// <summary>
    /// 概要
    /// </summary>
    public Generalization? Generalization { get; set; }

    /// <summary>
    /// 节点是否展开
    /// </summary>
    public bool Expand { get; set; } = true;
}

/// <summary>
/// 图片尺寸
/// </summary>
public class ImageSize
{
    public int? Width { get; set; }

    public int? Height { get; set; }
}

/// <summary>
/// 概要
/// </summary>
public class Generalization
{
    /// <summary>
    /// 概要的内容
    /// </summary>
    public string? Text { get; set; }
}

