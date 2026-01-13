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
    public string? ViewHeight { get; set; }
}
