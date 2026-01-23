using Microsoft.AspNetCore.Components;
using System.Globalization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">EmbedPDF 组件</para>
/// <para lang="en">EmbedPDF component</para>
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.EmbedPDF/EmbedPDF.razor.js", JSObjectReference = true)]
public partial class EmbedPDF
{
    /// <summary>
    /// <para lang="zh">获得/设置 PDF 文档路径</para>
    /// <para lang="en">Gets or sets the PDF document URL</para>
    /// </summary>
    [Parameter]
    public string? Url { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 PDF 组件高度 默认 600px</para>
    /// <para lang="en">Gets or sets the PDF component height, default is 600px</para>
    /// </summary>
    [Parameter]
    public string ViewHeight { get; set; } = "600px";

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示外边框</para>
    /// <para lang="en">Gets or sets a value indicating whether to show border</para>
    /// </summary>
    [Parameter]
    public bool ShowBorder { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 标签显示模式 默认值 <see cref="EmbedPDFTabBarMode.Always"/></para>
    /// <para lang="en">Gets or sets the tab bar display mode, default is <see cref="EmbedPDFTabBarMode.Always"/></para>
    /// </summary>
    [Parameter]
    public EmbedPDFTabBarMode TabBarMode { get; set; } = EmbedPDFTabBarMode.Always;

    /// <summary>
    /// <para lang="zh">获得/设置 滚动策略 默认值 <see cref="EmbedPDFScrollStrategy.Vertical"/></para>
    /// <para lang="en">Gets or sets the scroll strategy, default is <see cref="EmbedPDFScrollStrategy.Vertical"/></para>
    /// </summary>
    [Parameter]
    public EmbedPDFScrollStrategy ScrollStrategy { get; set; } = EmbedPDFScrollStrategy.Vertical;

    /// <summary>
    /// <para lang="zh">获得/设置 主题样式 默认 <see cref="EmbedPDFTheme.System"/></para>
    /// <para lang="en">Gets or sets the theme style, default is <see cref="EmbedPDFTheme.System"/></para>
    /// </summary>
    [Parameter]
    public EmbedPDFTheme Theme { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 语言 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the language, default is null</para>
    /// </summary>
    [Parameter]
    public string? Language { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 当前页码</para>
    /// <para lang="en">Gets or sets the current page number</para>
    /// </summary>
    [Parameter]
    public uint CurrentPage { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 页码之间的间隙 默认 null 未设置 使用默认值 20</para>
    /// <para lang="en">Gets or sets the gap between pages, default is null and uses default value 20</para>
    /// </summary>
    [Parameter]
    public uint PageGap { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 重新设置 Url 时是否保持当前打开文档 默认 false</para>
    /// <para lang="en">Gets or sets a value indicating whether to keep the current opened document when resetting the URL, default is false</para>
    /// </summary>
    [Parameter]
    public uint IsKeepCurrentDocument { get; set; }

    private string? StyleString => CssBuilder.Default()
        .AddClass("border: 1px solid var(--bs-border-color); border-radius: var(--bs-border-radius); overflow: hidden;", ShowBorder)
        .AddClass($"height: {ViewHeight};", !string.IsNullOrEmpty(ViewHeight))
        .AddStyleFromAttributes(AdditionalAttributes)
        .Build();

    private string? _url;
    private EmbedPDFTheme _theme;
    private string? _language;
    private EmbedPDFScrollStrategy _strategy = EmbedPDFScrollStrategy.Vertical;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        if (string.IsNullOrEmpty(Language))
        {
            Language = CultureInfo.CurrentUICulture.Name;
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            _url = Url;
            _language = Language;
            _theme = Theme;
            _strategy = ScrollStrategy;
            return;
        }

        if (_url != Url)
        {
            _url = Url;
            await InvokeVoidAsync("setUrl", Id, _url, IsKeepCurrentDocument);
        }
        if (_theme != Theme)
        {
            _theme = Theme;
            await InvokeVoidAsync("setTheme", Id, _theme.ToDescriptionString());
        }
        if (_language != Language)
        {
            _language = Language;
            await InvokeVoidAsync("setLocale", Id, _language);
        }
        if (_strategy != ScrollStrategy)
        {
            _strategy = ScrollStrategy;
            await InvokeVoidAsync("setScrollStrategy", Id, _strategy.ToDescriptionString());
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, new
    {
        TabBar = TabBarMode.ToDescriptionString(),
        Theme = Theme.ToDescriptionString(),
        Src = Url,
        Lang = Language,
        CurrentPage,
        ScrollStrategy = ScrollStrategy.ToDescriptionString(),
        PageGap
    });
}
