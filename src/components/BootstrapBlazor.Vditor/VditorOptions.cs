using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">Vditor 配置类</para>
/// <para lang="en">Vditor configuration class</para>
/// </summary>
public struct VditorOptions
{
    /// <summary>
    /// <para lang="zh">构造函数</para>
    /// <para lang="en">Constructor</para>
    /// </summary>
    public VditorOptions() { }

    /// <summary>
    /// <para lang="zh">获得/设置 编辑器模式 默认 <see cref="VditorMode.IR"/></para>
    /// <para lang="en">Gets or sets the editor mode. Default is <see cref="VditorMode.IR"/>.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    [JsonEnumConverter(camelCase: true)]
    public VditorMode Mode { get; set; } = VditorMode.IR;

    /// <summary>
    /// <para lang="zh">获得/设置 显示的语言 默认取当前 UI 文化信息</para>
    /// <para lang="en">Gets or sets the display language. Default is current UI culture.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Language { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 图标风格</para>
    /// <para lang="en">Gets or sets the icon style.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    [JsonEnumConverter(camelCase: true)]
    public VditorIconStyle IconStyle { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否输出日志</para>
    /// <para lang="en">Gets or sets whether to output logs.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool Debug { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 输入区域为空时的提示</para>
    /// <para lang="en">Gets or sets the placeholder when the input area is empty.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Placeholder { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 编辑器总宽度</para>
    /// <para lang="en">Gets or sets the total width of the editor.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Width { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 编辑器总高度</para>
    /// <para lang="en">Gets or sets the total height of the editor.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Height { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 编辑区域最小高度</para>
    /// <para lang="en">Gets or sets the minimum height of the editing area.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? MinHeight { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 自建 CDN 地址</para>
    /// <para lang="en">Gets or sets the custom CDN address.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? CDN { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 按下 tab 键操作的字符串</para>
    /// <para lang="en">Gets or sets the string for the tab key operation.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Tab { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 回撤的延迟时间</para>
    /// <para lang="en">Gets or sets the undo delay time.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int UndoDelay { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否启用打字机模式</para>
    /// <para lang="en">Gets or sets whether to enable typewriter mode.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public bool TypeWriterMode { get; set; }
}
