// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">主题枚举</para>
/// <para lang="en">Theme enumeration</para>
/// </summary>
public enum EmbedPDFTheme
{
    /// <summary>
    /// <para lang="zh">跟随系统</para>
    /// <para lang="en">Follow system</para>
    /// </summary>
    [Description("system")]
    System,

    /// <summary>
    /// <para lang="zh">明亮模式</para>
    /// <para lang="en">Light mode</para>
    /// </summary>
    [Description("light")]
    Light,

    /// <summary>
    /// <para lang="zh">暗黑模式</para>
    /// <para lang="en">Dark mode</para>
    /// </summary>
    [Description("dark")]
    Dark
}
