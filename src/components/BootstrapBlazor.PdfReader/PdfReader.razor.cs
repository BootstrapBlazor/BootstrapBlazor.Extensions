// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// Blazor Pdf Reader PDF 阅读器 组件 
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.PdfReader/PdfReader.razor.js", JSObjectReference = true)]
public partial class PdfReader
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

    /// <summary>
    /// 获得/设置 是否适配当前页面宽度 默认 false
    /// </summary>
    [Parameter]
    public bool IsFitToPage { get; set; }

    private string? ClassString => CssBuilder.Default("bb-pdf-reader")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddClass($"--bb-pdf-view-height: {ViewHeight};", !string.IsNullOrEmpty(ViewHeight))
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? ViewBodyString => CssBuilder.Default("bb-view-body")
        .AddClass("fit-page", IsFitToPage)
        .Build();

    private string? _docTitle;
    private bool _isFitToPage;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

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
            _isFitToPage = IsFitToPage;
        }

        if (_isFitToPage != IsFitToPage)
        {
            _isFitToPage = IsFitToPage;
            await TriggerFit(IsFitToPage ? "fitToPage" : "fitToWidth");
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, new { Url, IsFitToPage });

    /// <summary>
    /// 跳转到指定页码方法
    /// </summary>
    /// <param name="pageNumber"></param>
    /// <returns></returns>
    public Task NavigateToPageAsync(int pageNumber) => InvokeVoidAsync("navigateToPage", Id, pageNumber);

    /// <summary>
    /// 适应页面宽度
    /// </summary>
    public void FitToPage() => IsFitToPage = true;

    /// <summary>
    /// 适应文档宽度
    /// </summary>
    public void FitToWidth() => IsFitToPage = false;

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
    public Task PagesInit()
    {
        return Task.CompletedTask;
    }

    /// <summary>
    /// 改变页码时回调方法
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public Task PageChanging()
    {
        return Task.CompletedTask;
    }
}
