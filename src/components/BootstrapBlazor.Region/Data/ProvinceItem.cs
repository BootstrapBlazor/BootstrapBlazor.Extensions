// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">省份项</para>
/// <para lang="en">Province item</para>
/// </summary>
readonly record struct ProvinceItem
{
    /// <summary>
    /// <para lang="zh">获得 名称</para>
    /// <para lang="en">Gets the name</para>
    /// </summary>
    public string Name { get; init; }

    /// <summary>
    /// <para lang="zh">获得 拼音集合</para>
    /// <para lang="en">Gets the pinyin collection</para>
    /// </summary>
    public HashSet<string> PinYin { get; init; }

    /// <summary>
    /// <para lang="zh">获得 城市集合</para>
    /// <para lang="en">Gets the cities collection</para>
    /// </summary>
    public HashSet<CityItem> Cities { get; init; }
}
