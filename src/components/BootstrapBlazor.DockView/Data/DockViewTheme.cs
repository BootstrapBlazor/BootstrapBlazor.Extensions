// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockView 组件主题</para>
/// <para lang="en">DockView component theme</para>
/// </summary>
public enum DockViewTheme
{
    /// <summary>
    /// <para lang="zh">dockview-theme-light 主题</para>
    /// <para lang="en">dockview-theme-light theme</para>
    /// </summary>
    [Description("dockview-theme-light")]
    Light,

    /// <summary>
    /// <para lang="zh">dockview-theme-dark 主题</para>
    /// <para lang="en">dockview-theme-dark theme</para>
    /// </summary>
    [Description("dockview-theme-dark")]
    Dark,

    /// <summary>
    /// <para lang="zh">dockview-theme-vs 主题</para>
    /// <para lang="en">dockview-theme-vs theme</para>
    /// </summary>
    [Description("dockview-theme-vs")]
    VS,

    /// <summary>
    /// <para lang="zh">dockview-theme-abyss 主题</para>
    /// <para lang="en">dockview-theme-abyss theme</para>
    /// </summary>
    [Description("dockview-theme-abyss")]
    Abyss,

    /// <summary>
    /// <para lang="zh">dockview-theme-dracula 主题</para>
    /// <para lang="en">dockview-theme-dracula theme</para>
    /// </summary>
    [Description("dockview-theme-dracula")]
    Dracula,

    /// <summary>
    /// <para lang="zh">dockview-theme-replit 主题</para>
    /// <para lang="en">dockview-theme-replit theme</para>
    /// </summary>
    [Description("dockview-theme-replit")]
    Replit
}
