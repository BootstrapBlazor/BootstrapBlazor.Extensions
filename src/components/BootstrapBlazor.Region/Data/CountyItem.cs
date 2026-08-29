// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">区县项</para>
/// <para lang="en">County item</para>
/// </summary>
public readonly record struct CountyItem
{
    /// <summary>
    /// <para lang="zh">获得 城市编码</para>
    /// <para lang="en">Gets the city code</para>
    /// </summary>
    public string Code { get; init; }

    /// <summary>
    /// <para lang="zh">获得 城市名称</para>
    /// <para lang="en">Gets the city name</para>
    /// </summary>
    public string Name { get; init; }
}
