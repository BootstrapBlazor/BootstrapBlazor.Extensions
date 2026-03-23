// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Localization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockViewIcon 组件</para>
/// <para lang="en">DockViewIcon component</para>
/// </summary>
public partial class DockViewIcon
{
    /// <summary>
    /// <para lang="zh">获得/设置 资源文件接口实例</para>
    /// <para lang="en">Gets or sets the resource file interface instance.</para>
    /// </summary>
    [Inject, NotNull]
    protected IStringLocalizer<DockViewIcon>? Localizer { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 图标名称</para>
    /// <para lang="en">Gets or sets the icon name.</para>
    /// </summary>
    [Parameter, NotNull]
    [EditorRequired]
    public string? IconName { get; set; }

    /// <summary>
    /// <para lang="zh">获得 样式字符串</para>
    /// <para lang="en">Gets the CSS class string.</para>
    /// </summary>
    private string? ClassString => CssBuilder.Default("bb-dockview-control-icon")
        .AddClass($"bb-dockview-control-icon-{IconName}")
        .Build();

    /// <summary>
    /// <para lang="zh">获得 图标地址</para>
    /// <para lang="en">Gets the icon URL.</para>
    /// </summary>
    protected string Href => $"./_content/BootstrapBlazor.DockView/icon/dockview.svg#{IconName}";

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        IconName ??= "close";
    }
}
