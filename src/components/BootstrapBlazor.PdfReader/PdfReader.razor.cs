// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.Globalization;

namespace BootstrapBlazor.Components;

/// <summary>
/// Blazor Pdf Reader PDF 阅读器 组件 
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.PdfReader/PdfReader.razor.js", JSObjectReference = true)]
public partial class PdfReader
{
    /// <summary>
    /// 获得/设置 <see cref="PdfReaderOptions"/> 配置项实例
    /// </summary>
    [Parameter]
    [NotNull]
    public PdfReaderOptions? Options { get; set; }

    private string? ClassString => CssBuilder.Default("bb-pdf-reader")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddClass($"--bb-pdf-view-height: {Options.ViewHeight};", !string.IsNullOrEmpty(Options.ViewHeight))
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? ViewBodyString => CssBuilder.Default("bb-view-body")
        .AddClass("fit-page", Options.IsFitToPage)
        .Build();

    private string? _docTitle;
    private bool _isFitToPage;
    private uint _currentPage;
    private string? _url;
    private string? _currentScale;

    private readonly HashSet<string> AllowedScaleValues = ["page-actual", "page-width", "page-height", "page-fit", "auto"];

    private string CurrentPageString
    {
        get => Options.CurrentPage.ToString(CultureInfo.InvariantCulture);
        set => SetCurrentPage(value);
    }

    private void SetCurrentPage(string value)
    {
        if (uint.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var num))
        {
            Options.CurrentPage = num;
        }
    }

    private string CurrentScaleString
    {
        get => $"{Options.CurrentScale ?? "100"}%";
        set => SetCurrentScale(value);
    }

    private void SetCurrentScale(string value)
    {
        if (string.IsNullOrEmpty(value))
        {
            Options.CurrentScale = "100";
        }
        else if (float.TryParse(value.TrimEnd("%"), out var v))
        {
            if (v > 500)
            {
                v = 500;
            }
            else if (v < 25)
            {
                v = 25;
            }

            Options.CurrentScale = v.ToString(CultureInfo.InvariantCulture);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        Options ??= new PdfReaderOptions();

        if (Options.CurrentPage == 0)
        {
            Options.CurrentPage = 1;
        }
        _docTitle = Path.GetFileName(Options.Url);
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
            _isFitToPage = Options.IsFitToPage;
            _currentPage = Options.CurrentPage;
            _url = Options.Url;
            _currentScale = Options.CurrentScale;
        }

        if (_url != Options.Url)
        {
            _url = Options.Url;
            await InvokeInitAsync();
        }

        if (_isFitToPage != Options.IsFitToPage)
        {
            _isFitToPage = Options.IsFitToPage;
            await TriggerFit(_isFitToPage ? "fitToPage" : "fitToWidth");
        }
        if (_currentPage != Options.CurrentPage)
        {
            _currentPage = Options.CurrentPage;
            await NavigateToPageAsync(_currentPage);
        }
        if (_currentScale != Options.CurrentScale)
        {
            _currentScale = Options.CurrentScale;
            await InvokeVoidAsync("scale", Id, _currentScale);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, new
    {
        Options.Url,
        Options.IsFitToPage,
        TriggerPagesInit = Options.OnInitAsync != null,
        TriggerPageChanged = Options.OnPageChangedAsync != null
    });

    /// <summary>
    /// 跳转到指定页码方法
    /// </summary>
    /// <param name="pageNumber"></param>
    /// <returns></returns>
    public Task NavigateToPageAsync(uint pageNumber) => InvokeVoidAsync("navigateToPage", Id, pageNumber);

    /// <summary>
    /// 适应页面宽度
    /// </summary>
    public void FitToPage() => Options.IsFitToPage = true;

    /// <summary>
    /// 适应文档宽度
    /// </summary>
    public void FitToWidth() => Options.IsFitToPage = false;

    /// <summary>
    /// 旋转页面方法
    /// </summary>
    /// <returns></returns>
    public async Task RotateLeft()
    {
        await InvokeVoidAsync("rotate", Id, -90);
    }

    /// <summary>
    /// 旋转页面方法
    /// </summary>
    /// <returns></returns>
    public async Task RotateRight()
    {
        await InvokeVoidAsync("rotate", Id, 90);
    }

    private Task TriggerFit(string methodName) => InvokeVoidAsync(methodName, Id);

    /// <summary>
    /// 页面开始初始化时回调方法
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task PagesInit(int pagesCount)
    {
        if (Options.OnInitAsync != null)
        {
            await Options.OnInitAsync(pagesCount);
        }
    }

    /// <summary>
    /// 改变页码时回调方法
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task PageChanged(uint pageIndex)
    {
        _currentPage = pageIndex;
        Options.CurrentPage = pageIndex;

        if (Options.OnPageChangedAsync != null)
        {
            await Options.OnPageChangedAsync(pageIndex);
        }
    }
}
