// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">标签模式枚举</para>
/// <para lang="en">Tab bar mode enumeration</para>
/// </summary>
public enum EmbedPDFTabBarMode
{
    /// <summary>
    /// <para lang="zh">始终显示</para>
    /// <para lang="en">Always show</para>
    /// </summary>
    [Description("always")]
    Always,

    /// <summary>
    /// <para lang="zh">多标签模式</para>
    /// <para lang="en">Multiple tabs mode</para>
    /// </summary>
    [Description("multiple")]
    Multiple,

    /// <summary>
    /// <para lang="zh">不显示</para>
    /// <para lang="en">Never show</para>
    /// </summary>
    [Description("never")]
    Never
}
