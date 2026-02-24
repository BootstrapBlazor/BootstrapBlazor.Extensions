// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// UniverSheet 工具栏样式枚举
/// </summary>
public enum UniverSheetRibbonType
{
    /// <summary>
    /// 默认样式
    /// </summary>
    [Description("default")]
    Default,

    /// <summary>
    /// 经典样式
    /// </summary>
    [Description("classic")]
    Classic,

    /// <summary>
    /// 简单样式
    /// </summary>
    [Description("simple")]
    Simple
}
