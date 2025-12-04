// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 海康威视网络摄像机组件
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.HikVision/Components/HikVision.razor.js")]
public partial class HikVision
{
    private string PreviewId => $"{Id}_preview";

    private string? ClassString => CssBuilder.Default("bb-hik")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();
}
