// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// Region 视图模式
/// </summary>
internal enum RegionViewMode
{
    /// <summary>
    /// 省模式
    /// </summary>
    Province = 0,

    /// <summary>
    /// 城市模式
    /// </summary>
    City = 1,

    /// <summary>
    /// 区县模式
    /// </summary>
    County = 2,

    /// <summary>
    /// 乡镇街道模式
    /// </summary>
    Detail = 3
}
