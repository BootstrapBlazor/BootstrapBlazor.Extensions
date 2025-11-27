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
    /// 获得/设置 当前缩放倍率 默认 null 使用 100%
    /// </summary>
    [Parameter]
    public string? CurrentScale { get; set; }

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
    /// 获得/设置 是否启用双页单视图模式 默认 false
    /// </summary>
    [Parameter]
    public bool EnableTwoPagesOneView { get; set; }

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
    /// 页面初始化回调方法
    /// </summary>
    [Parameter]
    public Func<uint, Task>? OnPageChangedAsync { get; set; }

    /// <summary>
    /// 设置双页单视图模式回调方法
    /// </summary>
    [Parameter]
    public Func<bool, Task>? OnTwoPagesOneViewAsync { get; set; }

    /// <summary>
    /// 获得/设置 更多按钮图标 默认为 null 使用内置图标
    /// </summary>
    [Parameter]
    public string? MoreButtonIcon { get; set; }

    /// <summary>
    /// 点击下载按钮回调方法 默认 null 使用组件内置下载功能
    /// </summary>
    [Parameter]
    public Func<Task>? OnDownloadAsync { get; set; }

    [Inject, NotNull]
    private DownloadService? DownloadService { get; set; }

    private string? ClassString => CssBuilder.Default("bb-pdf-reader")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddClass($"--bb-pdf-view-height: {ViewHeight};", !string.IsNullOrEmpty(ViewHeight))
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? ViewBodyString => CssBuilder.Default("bb-view-body")
        .AddClass("fit-width", FitMode == PdfReaderFitMode.PageHeight)
        .Build();

    private string? _docTitle;
    private PdfReaderFitMode _fitMode;
    private uint _currentPage;
    private string? _url;
    private string? _currentScale;
    private bool _enableTwoPagesOneView;
    private bool _showTwoPagesOneViewButton;
    private string? _twoPagesOneViewIcon;

    private readonly HashSet<string> AllowedScaleValues = ["page-actual", "page-width", "page-height", "page-fit", "auto"];

    private string CurrentPageString
    {
        get => CurrentPage.ToString(CultureInfo.InvariantCulture);
        set => SetCurrentPage(value);
    }

    private void SetCurrentPage(string value)
    {
        if (uint.TryParse(value, NumberStyles.Integer, CultureInfo.InvariantCulture, out var num))
        {
            CurrentPage = num;
        }
    }

    private string CurrentScaleString
    {
        get => $"{CurrentScale ?? "100"}%";
        set => SetCurrentScale(value);
    }

    private void SetCurrentScale(string value)
    {
        if (string.IsNullOrEmpty(value))
        {
            CurrentScale = "100";
        }
        else if (float.TryParse(value.TrimEnd("%"), out var v))
        {
            v = v switch
            {
                > 500 => 500,
                < 25 => 25,
                _ => v
            };

            CurrentScale = v.ToString(CultureInfo.InvariantCulture);
        }
    }

    private void OnToggleTwoPagesOneView()
    {
        _enableTwoPagesOneView = !_enableTwoPagesOneView;
        EnableTwoPagesOneView = _enableTwoPagesOneView;

        _twoPagesOneViewIcon = _enableTwoPagesOneView ? "fa-solid fa-fw fa-check" : "fa-solid fa-fw";
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        MoreButtonIcon ??= "fa-solid fa-fw fa-ellipsis-vertical";
        _twoPagesOneViewIcon ??= "fa-solid fa-fw";

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
            _fitMode = FitMode;
            _currentPage = CurrentPage;
            _url = Url;
            _currentScale = CurrentScale;
            _enableTwoPagesOneView = EnableTwoPagesOneView;
            _showTwoPagesOneViewButton = ShowTwoPagesOneView;
        }

        if (_url != Url)
        {
            _url = Url;
            await InvokeInitAsync();
        }

        if (_fitMode != FitMode)
        {
            _fitMode = FitMode;
            await InvokeVoidAsync("setScaleValue", Id, _fitMode.ToDescriptionString());
        }
        if (_currentPage != CurrentPage)
        {
            _currentPage = CurrentPage;
            await NavigateToPageAsync(_currentPage);
        }
        if (_currentScale != CurrentScale)
        {
            _currentScale = CurrentScale;
            await InvokeVoidAsync("scale", Id, _currentScale);
        }
        if (_enableTwoPagesOneView != EnableTwoPagesOneView)
        {
            _enableTwoPagesOneView = EnableTwoPagesOneView;
            await InvokeVoidAsync("setPages", Id, _enableTwoPagesOneView);
        }
        if (_showTwoPagesOneViewButton != ShowTwoPagesOneView)
        {
            _showTwoPagesOneViewButton = ShowTwoPagesOneView;
            await InvokeVoidAsync("setPages", Id, _enableTwoPagesOneView);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, new
    {
        Url,
        FitMode,
        EnableThumbnails,
        TriggerPagesInit = OnPagesInitAsync != null,
        TriggerPagesLoaded = OnPagesLoadedAsync != null,
        TriggerPageChanged = OnPageChangedAsync != null,
        TriggerTowPagesOnViewChanged = OnTwoPagesOneViewAsync != null
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
    public void SetFitMode(PdfReaderFitMode mode) => FitMode = mode;

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

    private async Task OnDownload()
    {
        if (OnDownloadAsync != null)
        {
            await OnDownloadAsync();
        }
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
}
