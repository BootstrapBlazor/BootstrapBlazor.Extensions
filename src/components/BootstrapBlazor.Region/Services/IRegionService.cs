// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">获得行政区域数据接口</para>
/// <para lang="en">Region data service interface</para>
/// </summary>
public interface IRegionService
{
    /// <summary>
    /// <para lang="zh">获得所有省份数据</para>
    /// <para lang="en">Gets all province data</para>
    /// </summary>
    HashSet<string> GetProvinces();

    /// <summary>
    /// <para lang="zh">获得指定省份的城市数据</para>
    /// <para lang="en">Gets cities for the specified province</para>
    /// </summary>
    /// <param name="province"></param>
    HashSet<string> GetCities(string province);

    /// <summary>
    /// <para lang="zh">获得指定城市的区县数据</para>
    /// <para lang="en">Gets counties for the specified city</para>
    /// </summary>
    /// <param name="city"></param>
    HashSet<CountyItem> GetCounties(string city);

    /// <summary>
    /// <para lang="zh">获得指定区县的街道地址数据</para>
    /// <para lang="en">Gets detail addresses for the specified county</para>
    /// </summary>
    /// <param name="countyCode"></param>
    HashSet<string> GetDetails(string countyCode);
}
