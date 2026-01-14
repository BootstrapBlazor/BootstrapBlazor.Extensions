using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// EmbedPDF 组件
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.EmbedPDF/EmbedPDF.razor.js", JSObjectReference = true)]
public partial class EmbedPDF
{
    /// <summary>
    /// 获得/设置 PDF 文档路径
    /// </summary>
    [Parameter]
    public string? Url { get; set; }

    /// <summary>
    /// 获得/设置 PDF 组件高度 默认 600px
    /// </summary>
    [Parameter]
    public string ViewHeight { get; set; } = "600px";

    /// <summary>
    /// 获得/设置 是否显示外边框
    /// </summary>
    [Parameter]
    public bool ShowBorder { get; set; } = true;

    private string? StyleString => CssBuilder.Default()
        .AddClass("border: 1px solid var(--bs-border-color); border-radius: var(--bs-border-radius); overflow: hidden;", ShowBorder)
        .AddClass($"height: {ViewHeight};", !string.IsNullOrEmpty(ViewHeight))
        .AddStyleFromAttributes(AdditionalAttributes)
        .Build();
}
