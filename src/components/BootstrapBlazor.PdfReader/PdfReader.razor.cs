// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/


namespace BootstrapBlazor.Components;

/// <summary>
/// Blazor Pdf Reader PDF 阅读器 组件 
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.PdfReader/PdfReader.razor.js", JSObjectReference = true)]
public partial class PdfReader
{
    private string? ClassString => CssBuilder.Default("bb-pdf-reader")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop);
}
