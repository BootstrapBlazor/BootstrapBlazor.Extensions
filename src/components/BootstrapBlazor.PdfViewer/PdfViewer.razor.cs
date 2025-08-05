// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// PdfViewer component for displaying PDF files in a Blazor application.
/// </summary>
public partial class PdfViewer
{
    /// <summary>
    /// Gets or sets the url for the PDF file to be displayed.
    /// </summary>
    [Parameter]
    public string? Url { get; set; }

    /// <summary>
    /// Gets or sets the page index of the PDF file.
    /// </summary>
    [Parameter]
    public int PageIndex { get; set; }

    /// <summary>
    /// Gets or sets the viewer height. Default is null.
    /// </summary>
    [Parameter]
    public string? Height { get; set; }

    /// <summary>
    /// Gets or sets the document loaded event callback.
    /// </summary>
    [Parameter]
    public Func<Task>? OnLoaded { get; set; }

    /// <summary>
    /// Gets or sets the document loaded event callback.
    /// </summary>
    [Parameter]
    public Func<Task>? NotSupportCallback { get; set; }

    /// <summary>
    /// Gets or sets whether to use Google Docs for PDF rendering. Default is false.
    /// </summary>
    [Parameter]
    public bool UseGoogleDocs { get; set; }

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
    /// <returns></returns>
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
    /// <returns></returns>
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
        return $"{uri.AbsoluteUri}#page={PageIndex}";
    }

    /// <summary>
    /// Trigger OnLoaded callback when the PDF document is loaded.
    /// </summary>
    /// <returns></returns>
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
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerNotSupportCallback()
    {
        if (NotSupportCallback != null)
        {
            await NotSupportCallback();
        }
    }
}
