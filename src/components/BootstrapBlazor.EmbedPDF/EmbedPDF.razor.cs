using Microsoft.AspNetCore.Components;
using System.Globalization;

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

    /// <summary>
    /// 获得/设置 标签显示模式 默认值 <see cref="EmbedPDFTabBarMode.Always"/>
    /// </summary>
    [Parameter]
    public EmbedPDFTabBarMode TabBarMode { get; set; } = EmbedPDFTabBarMode.Always;

    /// <summary>
    /// 获得/设置 标签显示模式 默认值 <see cref="EmbedPDFTabBarMode.Always"/>
    /// </summary>
    [Parameter]
    public EmbedPDFScrollStrategy ScrollStrategy { get; set; } = EmbedPDFScrollStrategy.Vertical;

    /// <summary>
    /// 获得/设置 主题样式 默认 <see cref="EmbedPDFTheme.System"/>
    /// </summary>
    [Parameter]
    public EmbedPDFTheme Theme { get; set; }

    /// <summary>
    /// 获得/设置 语言 默认 null 未设置
    /// </summary>
    [Parameter]
    public string? Language { get; set; }

    /// <summary>
    /// 获得/设置 当前页码
    /// </summary>
    [Parameter]
    public uint CurrentPage { get; set; }

    /// <summary>
    /// 获得/设置 页码之间的间隙 默认 null 未设置 使用默认值 20
    /// </summary>
    [Parameter]
    public uint PageGap { get; set; }

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
    /// <returns></returns>
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
            await InvokeVoidAsync("setUrl", Id, _url);
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
    /// <returns></returns>
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
