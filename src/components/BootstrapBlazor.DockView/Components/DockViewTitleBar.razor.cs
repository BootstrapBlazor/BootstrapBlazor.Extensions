// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockView 标题栏组件</para>
/// <para lang="en">DockView title bar component</para>
/// </summary>
public partial class DockViewTitleBar
{
    /// <summary>
    /// <para lang="zh">获得/设置 标题前置图标点击回调方法，默认为 null</para>
    /// <para lang="en">Gets or sets the click callback for the leading title icon. Default is null</para>
    /// </summary>
    [Parameter]
    public Func<Task>? OnClickBarCallback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标题前置图标，默认为 null，未设置时使用默认图标</para>
    /// <para lang="en">Gets or sets the leading title icon. Default is null. When not set, the default icon is used</para>
    /// </summary>
    [Parameter]
    public string? BarIcon { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标题前置图标地址，默认为 null，未设置时使用默认图标</para>
    /// <para lang="en">Gets or sets the leading title icon URL. Default is null. When not set, the default icon is used</para>
    /// </summary>
    [Parameter]
    public string? BarIconUrl { get; set; }

    private async Task OnClickBar()
    {
        if (OnClickBarCallback != null)
        {
            await OnClickBarCallback();
        }
    }
}
