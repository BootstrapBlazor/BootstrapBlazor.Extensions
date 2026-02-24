// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">PdfViewer 组件</para>
/// <para lang="en">PdfViewer component for displaying PDF files in a Blazor application</para>
/// </summary>
public partial class PdfViewer
{
    /// <summary>
    /// <para lang="zh">获得/设置 文档 Url 属性</para>
    /// <para lang="en">Gets or sets the url for the PDF file to be displayed</para>
    /// </summary>
    [Parameter]
    public string? Url { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 页码索引</para>
    /// <para lang="en">Gets or sets the page index of the PDF file</para>
    /// </summary>
    [Parameter]
    public int PageIndex { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 查看器高度</para>
    /// <para lang="en">Gets or sets the viewer height</para>
    /// </summary>
    [Parameter]
    public string? Height { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 文档加载完成回调事件</para>
    /// <para lang="en">Gets or sets the document loaded event callback</para>
    /// </summary>
    [Parameter]
    public Func<Task>? OnLoaded { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 文档不支持回调事件</para>
    /// <para lang="en">Gets or sets the document not supported event callback</para>
    /// </summary>
    [Parameter]
    public Func<Task>? NotSupportCallback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否使用 Google Docs 渲染 PDF</para>
    /// <para lang="en">Gets or sets whether to use Google Docs for PDF rendering</para>
    /// </summary>
    [Parameter]
    public bool UseGoogleDocs { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示工具栏与缩略图侧边栏</para>
    /// <para lang="en">Gets or sets whether to display toolbar and thumbnail sidebar</para>
    /// </summary>
    [Parameter]
    public bool ShowToolbar { get; set; } = true;

    [Inject, NotNull]
    private NavigationManager? NavigationManager { get; set; }

    private string? ClassString => CssBuilder.Default("bb-pdf-viewer-container")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddClass($"--bb-pdf-viewer-height: {Height};", !string.IsNullOrEmpty(Height))
        .Build();

    private string? UseGoogleDocsString => UseGoogleDocs ? "true" : null;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (!firstRender)
        {
            await InvokeVoidAsync("loadPdf", Id, GetAbsoluteUri(Url));
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, new
    {
        LoadedCallaback = nameof(TriggerOnLoaded),
        NotSupportCallback = nameof(TriggerNotSupportCallback),
        Url = GetAbsoluteUri(Url)
    });

    private string GetAbsoluteUri(string? url)
    {
        if (string.IsNullOrEmpty(url))
        {
            return string.Empty;
        }

        var uri = NavigationManager.ToAbsoluteUri(url);
        var builder = new UriBuilder(uri.AbsoluteUri);
        builder.Fragment = BuildFragment(builder);
        return builder.Uri.ToString();
    }

    private string BuildFragment(UriBuilder builder)
    {
        var fragments = new List<string>();
        if (PageIndex > 0)
        {
            fragments.Add($"page={PageIndex}");
        }
        if (!ShowToolbar)
        {
            fragments.Add("toolbar=0&navpanes=0");
        }
        return string.Join('&', fragments);
    }

    /// <summary>
    /// Trigger OnLoaded callback when the PDF document is loaded.
    /// </summary>
    [JSInvokable]
    public async Task TriggerOnLoaded()
    {
        if (OnLoaded != null)
        {
            await OnLoaded();
        }
    }

    /// <summary>
    /// Trigger NotSupportCallback when the PDF viewer does not support the document.
    /// </summary>
    [JSInvokable]
    public async Task TriggerNotSupportCallback()
    {
        if (NotSupportCallback != null)
        {
            await NotSupportCallback();
        }
    }
}
