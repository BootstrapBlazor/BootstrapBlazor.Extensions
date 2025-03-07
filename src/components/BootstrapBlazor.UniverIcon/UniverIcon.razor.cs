// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// UniverIcon Component
/// </summary>
public partial class UniverIcon
{
    /// <summary>
    /// Gets or sets the icon name
    /// </summary>
    [Parameter, NotNull]
    [EditorRequired]
    public string? Name { get; set; }

    /// <summary>
    /// Gets the icon URL
    /// </summary>
    [Parameter, NotNull]
    public string? Href { get; set; }

    /// <summary>
    /// Gets the icon color, default is null (not set)
    /// </summary>
    [Parameter]
    public string? Color { get; set; }

    /// <summary>
    /// Gets the style string
    /// </summary>
    private string? ClassString => CssBuilder.Default("bb-univer-icon")
        .AddClass($"bb-univer-icon-{Name}", !string.IsNullOrEmpty(Name))
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddClass($"--bb-univer-icon-color: {Color};", !string.IsNullOrEmpty(Color))
        .AddStyleFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        Href ??= $"./_content/BootstrapBlazor.UniverIcon/univer.svg#{Name}";
    }
}
