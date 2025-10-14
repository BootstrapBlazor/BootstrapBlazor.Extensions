// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace UnitTestRegion;

public class UnitTest1
{
    [Fact]
    public void GetCities_Ok()
    {
        var sc = new ServiceCollection();
        sc.AddBootstrapBlazorRegionService();

        var provider = sc.BuildServiceProvider();
        var regionService = provider.GetRequiredService<IRegionService>();

        var provinces = regionService.GetProvinces();
        Assert.Equal(34, provinces.Count);

        var cities = regionService.GetCities("北京市");
        Assert.Empty(cities);

        cities = regionService.GetCities("河北省");
        Assert.Equal(11, cities.Count);

        cities = regionService.GetCities("台湾省");
        Assert.Equal(9, cities.Count);
    }

    [Fact]
    public void GetCounties_Ok()
    {
        var sc = new ServiceCollection();
        sc.AddBootstrapBlazorRegionService();

        var provider = sc.BuildServiceProvider();
        var regionService = provider.GetRequiredService<IRegionService>();

        var counties = regionService.GetCounties("北京市");
        Assert.Equal(16, counties.Count);

        counties = regionService.GetCounties("天津市");
        Assert.Equal(16, counties.Count);

        counties = regionService.GetCounties("承德市");
        Assert.Equal(11, counties.Count);

        counties = regionService.GetCounties("嘉义市");
        Assert.Equal(15, counties.Count);

        counties = regionService.GetCounties("重庆市");
        Assert.Equal(38, counties.Count);
    }

    [Fact]
    public void GetDetails_Ok()
    {
        var sc = new ServiceCollection();
        sc.AddBootstrapBlazorRegionService();

        var provider = sc.BuildServiceProvider();
        var regionService = provider.GetRequiredService<IRegionService>();

        var details = regionService.GetDetails("659012");
        Assert.Equal(4, details.Count);
    }
}
