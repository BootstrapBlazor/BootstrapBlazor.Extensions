// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 标签模式
/// </summary>
public enum EmbedPDFTabBarMode
{
    /// <summary>
    /// 始终显示
    /// </summary>
    [Description("always")]
    Always,

    /// <summary>
    /// 多标签模式
    /// </summary>
    [Description("multiple")]
    Multiple,

    /// <summary>
    /// 不显示
    /// </summary>
    [Description("never")]
    Never
}
