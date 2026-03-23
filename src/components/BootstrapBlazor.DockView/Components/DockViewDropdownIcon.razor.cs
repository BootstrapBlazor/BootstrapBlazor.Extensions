// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockViewDropdownIcon 组件</para>
/// <para lang="en">DockViewDropdownIcon component</para>
/// </summary>
public partial class DockViewDropdownIcon
{
    /// <summary>
    /// <para lang="zh">获得 样式字符串</para>
    /// <para lang="en">Gets the CSS class string.</para>
    /// </summary>
    private string? ClassString => CssBuilder.Default("dropdown dropdown-center bb-dockview-control-icon")
        .AddClass($"bb-dockview-control-icon-{IconName}")
        .Build();
}
