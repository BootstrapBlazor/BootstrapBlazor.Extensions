// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// Region 类
/// </summary>
public readonly record struct CountyItem
{
    /// <summary>
    /// 城市编码
    /// </summary>
    public string Code { get; init; }

    /// <summary>
    /// 城市名称
    /// </summary>
    public string Name { get; init; }
}
