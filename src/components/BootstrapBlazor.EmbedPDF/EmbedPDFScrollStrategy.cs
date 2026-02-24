// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">滚动方向枚举</para>
/// <para lang="en">Scroll strategy enumeration</para>
/// </summary>
public enum EmbedPDFScrollStrategy
{
    /// <summary>
    /// <para lang="zh">垂直方向</para>
    /// <para lang="en">Vertical</para>
    /// </summary>
    [Description("vertical")]
    Vertical,

    /// <summary>
    /// <para lang="zh">水平方向</para>
    /// <para lang="en">Horizontal</para>
    /// </summary>
    [Description("horizontal")]
    Horizontal
}
