// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">JitViewer 组件</para>
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.JitViewer/Components/JitViewer.razor.js", JSObjectReference = true)]
public partial class JitViewer
{
    private string? ClassString => CssBuilder.Default("bb-jit-viewer")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();
}
