// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 滚动方向枚举
/// </summary>
public enum EmbedPDFScrollStrategy
{
    /// <summary>
    /// 垂直方向
    /// </summary>
    [Description("vertical")]
    Vertical,

    /// <summary>
    /// 水平方向
    /// </summary>
    [Description("horizontal")]
    Horizontal
}
