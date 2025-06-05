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
    /// Gets or sets the viewer height. Default is null.
    /// </summary>
    [Parameter]
    public string? Height { get; set; }

    private string? ClassString => CssBuilder.Default("bb-pdf-viewer-container")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddClass($"--bb-pdf-viewer-height: {Height};", !string.IsNullOrEmpty(Height))
        .Build();

    private string? _url;

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
        }

        if (_url != Url)
        {
            _url = Url;
            await InvokeVoidAsync("loadPdf", Id, _url);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id);
}
