using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// Vditor 配置类
/// </summary>
public struct VditorOptions
{
    /// <summary>
    /// 构造函数
    /// </summary>
    public VditorOptions() { }

    /// <summary>
    /// 获得/设置 编辑器模式。默认 <see cref="VditorMode.IR"/>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    [JsonEnumConverter(camelCase: true)]
    public VditorMode Mode { get; set; } = VditorMode.IR;

    /// <summary>
    /// 获得/设置 显示的语言。默认取当前 UI 文化信息
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Language { get; set; }

    /// <summary>
    /// 获得/设置 图标风格
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    [JsonEnumConverter(camelCase: true)]
    public VditorIconStyle IconStyle { get; set; }

    /// <summary>
    /// 获得/设置 是否输出日志。
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Debug { get; set; }

    /// <summary>
    /// 获得/设置 输入区域为空时的提示。
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Placeholder { get; set; }

    /// <summary>
    /// 获得/设置 编辑器总宽度。
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Width { get; set; }

    /// <summary>
    /// 获得/设置 编辑器总高度。
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Height { get; set; }

    /// <summary>
    /// 获得/设置 编辑区域最小高度。
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? MinHeight { get; set; }

    /// <summary>
    /// 获得/设置 配置自建 CDN 地址。
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CDN { get; set; }

    /// <summary>
    /// 获得/设置 按下 <c>tab</c> 键操作的字符串。
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Tab { get; set; }

    /// <summary>
    /// 获得/设置 回撤的延迟时间。
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int UndoDelay { get; set; }

    /// <summary>
    /// 获得/设置 是否启用打字机模式。
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool TypeWriterMode { get; set; }
}
