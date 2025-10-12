// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// IRegion 获得行政区域数据接口
/// </summary>
public interface IRegionService
{
    /// <summary>
    /// 获得所有省份数据
    /// </summary>
    /// <returns></returns>
    IReadOnlySet<string> GetProvinces();

    /// <summary>
    /// 获得指定省份的城市数据
    /// </summary>
    /// <param name="province"></param>
    /// <returns></returns>
    IReadOnlySet<string> GetCities(string province);

    /// <summary>
    /// 获得指定城市的区县数据
    /// </summary>
    /// <param name="city"></param>
    /// <returns></returns>
    IReadOnlySet<CountyItem> GetCounties(string city);

    /// <summary>
    /// 获得指定区县的街道地址数据
    /// </summary>
    /// <param name="countyCode"></param>
    /// <returns></returns>
    IReadOnlySet<string> GetDetails(string countyCode);
}
