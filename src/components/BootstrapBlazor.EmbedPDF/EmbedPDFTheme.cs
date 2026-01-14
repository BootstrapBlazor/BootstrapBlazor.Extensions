// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 主题枚举
/// </summary>
public enum EmbedPDFTheme
{
    /// <summary>
    /// 跟随系统
    /// </summary>
    [Description("system")]
    System,

    /// <summary>
    /// 明亮模式
    /// </summary>
    [Description("light")]
    Light,

    /// <summary>
    /// 暗黑模式
    /// </summary>
    [Description("dark")]
    Dark
}
