// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Localization;

namespace BootstrapBlazor.Components;

/// <summary>
/// Blazor Pdf Reader PDF 阅读器 组件
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.PdfReader/PdfReader.razor.js", JSObjectReference = true)]
public partial class PdfReader
{
    /// <summary>
    /// 获得/设置 是否显示工具栏 默认 true 显示
    /// </summary>
    [Parameter]
    public bool ShowToolbar { get; set; } = true;

    /// <summary>
    /// 获得/设置 是否显示下载按钮 默认 true 显示
    /// </summary>
    [Parameter]
    public bool ShowDownload { get; set; } = true;

    /// <summary>
    /// 获得/设置 是否显示打印按钮 默认 true 显示
    /// </summary>
    [Parameter]
    public bool ShowPrint { get; set; } = true;

    /// <summary>
    /// 获得/设置 是否显示缩略图 默认 true 显示
    /// </summary>
    [Parameter]
    public bool EnableThumbnails { get; set; } = true;

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

    /// <summary>
    /// 获得/设置 当前页码
    /// </summary>
    [Parameter]
    public uint CurrentPage { get; set; }

    /// <summary>
    /// 获得/设置 当前旋转角度 默认 0 数值范围 0 90 180 270
    /// </summary>
    [Parameter]
    public int CurrentRotation { get; set; }

    /// <summary>
    /// 获得/设置 是否适配当前页面宽度 默认 false
    /// </summary>
    [Parameter]
    public PdfReaderFitMode FitMode { get; set; }

    /// <summary>
    /// 获得/设置 是否显示双页单视图按钮 默认 true 显示
    /// </summary>
    [Parameter]
    public bool ShowTwoPagesOneView { get; set; } = true;

    /// <summary>
    /// 获得/设置 是否显示按钮 默认 true 显示
    /// </summary>
    [Parameter]
    public bool ShowPresentationMode { get; set; } = false;

    /// <summary>
    /// 页面初始化回调方法
    /// </summary>
    [Parameter]
    public Func<int, Task>? OnPagesInitAsync { get; set; }

    /// <summary>
    /// 页面加载完毕回调方法
    /// </summary>
    [Parameter]
    public Func<int, Task>? OnPagesLoadedAsync { get; set; }

    /// <summary>
    /// 页码变化时回调方法
    /// </summary>
    [Parameter]
    public Func<uint, Task>? OnPageChangedAsync { get; set; }

    /// <summary>
    /// 设置双页单视图模式回调方法
    /// </summary>
    [Parameter]
    public Func<bool, Task>? OnTwoPagesOneViewAsync { get; set; }

    /// <summary>
    /// 设置缩放倍率回调方法
    /// </summary>
    [Parameter]
    public Func<float, Task>? OnScaleChangedAsync { get; set; }

    /// <summary>
    /// 页面旋转回调方法
    /// </summary>
    [Parameter]
    public Func<int, Task>? OnRotationChanged { get; set; }

    /// <summary>
    /// 获得/设置 更多按钮图标 默认为 null 使用内置图标
    /// </summary>
    [Parameter]
    public string? MoreButtonIcon { get; set; }

    /// <summary>
    /// 正在打印回调方法 默认 null
    /// </summary>
    [Parameter]
    public Func<Task>? OnPrintingAsync { get; set; }

    /// <summary>
    /// 通过流加载 PDF 文档回调方法 默认 null
    /// </summary>
    /// <remarks>优先使用 <see cref="Url"/> 未提供 <see cref="Url"/> 时会尝试调用此回调获得流进行渲染</remarks>
    [Parameter]
    public Func<Task<Stream>>? OnGetStreamAsync { get; set; }

    [Inject, NotNull]
    private IStringLocalizer<PdfReader>? Localizer { get; set; }

    private string? ClassString => CssBuilder.Default("bb-pdf-reader")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddClass($"--bb-pdf-view-height: {ViewHeight};", !string.IsNullOrEmpty(ViewHeight))
        .AddClass($"--bb-pdf-toolbar-height: 0;", !ShowToolbar)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? _docTitle;
    private uint _currentPage;
    private float _currentRotation;
    private string? _url;
    private string? _dropdownItemCheckIcon;
    private string? _dropdownItemDefaultIcon;
    private bool _enableThumbnails = true;
    private bool _showToolbar = true;
    private PdfReaderFitMode _fitMode;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        MoreButtonIcon ??= "fa-solid fa-fw fa-ellipsis-vertical";
        _dropdownItemCheckIcon ??= "dropdown-item-check fa-solid fa-fw fa-check";
        _dropdownItemDefaultIcon ??= "dropdown-item-icon fa-solid fa-fw";

        if (CurrentPage == 0)
        {
            CurrentPage = 1;
        }
        _docTitle = Path.GetFileName(Url);
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
            _currentPage = CurrentPage;
            _enableThumbnails = EnableThumbnails;
            _showToolbar = ShowToolbar;
            _fitMode = FitMode;
        }

        if (_url != Url)
        {
            _url = Url;
            await InvokeInitAsync();
        }
        if (_currentPage != CurrentPage)
        {
            _currentPage = CurrentPage;
            await NavigateToPageAsync(_currentPage);
        }
        if (_currentRotation != CurrentRotation)
        {
            _currentRotation = CurrentRotation;
            await InvokeVoidAsync("rotate", Id, _currentRotation);
        }
        if (_showToolbar != ShowToolbar)
        {
            _showToolbar = ShowToolbar;
            if (_showToolbar)
            {
                await InvokeVoidAsync("resetToolbar", Id);
            }
        }
        if (_enableThumbnails != EnableThumbnails)
        {
            _enableThumbnails = EnableThumbnails;
            if (_enableThumbnails)
            {
                await InvokeVoidAsync("resetThumbnails", Id);
            }
        }
        if (_fitMode != FitMode)
        {
            _fitMode = FitMode;
            await SetFitMode(_fitMode);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override async Task InvokeInitAsync()
    {
        var _data = await GetPdfStreamDataAsync();
        await InvokeVoidAsync("init", Id, Interop, new
        {
            Url,
            Data = _data,
            FitMode,
            EnableThumbnails,
            CurrentPage,
            TriggerPagesInit = OnPagesInitAsync != null,
            TriggerPagesLoaded = OnPagesLoadedAsync != null,
            TriggerPageChanged = OnPageChangedAsync != null,
            TriggerTowPagesOnViewChanged = OnTwoPagesOneViewAsync != null,
            TriggerScaleChanged = OnScaleChangedAsync != null,
            TriggerRotationChanged = OnRotationChanged != null,
        });
    }

    /// <summary>
    /// 跳转到指定页码方法
    /// </summary>
    /// <param name="pageNumber"></param>
    /// <returns></returns>
    public Task NavigateToPageAsync(uint pageNumber) => InvokeVoidAsync("navigateToPage", Id, pageNumber);

    /// <summary>
    /// 设置页面适配模式方法
    /// </summary>
    public Task SetFitMode(PdfReaderFitMode mode) => InvokeVoidAsync("setScaleValue", Id, mode.ToDescriptionString());

    /// <summary>
    /// 旋转页面方法
    /// </summary>
    /// <returns></returns>
    public Task RotateLeft() => InvokeVoidAsync("rotate", Id, -90);

    /// <summary>
    /// 旋转页面方法
    /// </summary>
    /// <returns></returns>
    public Task RotateRight() => InvokeVoidAsync("rotate", Id, 90);

    private async Task<byte[]?> GetPdfStreamDataAsync()
    {
        byte[]? pdfBytes = null;
        if (OnGetStreamAsync != null)
        {
            using var memoryStream = new MemoryStream();
            var stream = await OnGetStreamAsync();
            await stream.CopyToAsync(memoryStream);
            pdfBytes = memoryStream.ToArray();
        }
        return pdfBytes;
    }

    /// <summary>
    /// 页面开始初始化时回调方法
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task PagesInit(int pagesCount)
    {
        if (OnPagesInitAsync != null)
        {
            await OnPagesInitAsync(pagesCount);
        }
    }

    /// <summary>
    /// 页面加载完毕时回调方法
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task PagesLoaded(int pagesCount)
    {
        if (OnPagesLoadedAsync != null)
        {
            await OnPagesLoadedAsync(pagesCount);
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
        CurrentPage = pageIndex;

        if (OnPageChangedAsync != null)
        {
            await OnPageChangedAsync(pageIndex);
        }
    }

    /// <summary>
    /// 缩放倍率更改回调方法
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task ScaleChanged(float val)
    {
        if (OnScaleChangedAsync != null)
        {
            await OnScaleChangedAsync(val);
        }
    }

    /// <summary>
    /// 正在打印回调方法
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task Printing()
    {
        if (OnPrintingAsync != null)
        {
            await OnPrintingAsync();
        }
    }

    /// <summary>
    /// 页面旋转回调方法
    /// </summary>
    /// <param name="angle"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task RotationChanged(int angle)
    {
        if (OnRotationChanged != null)
        {
            await OnRotationChanged(angle);
        }
    }
}
