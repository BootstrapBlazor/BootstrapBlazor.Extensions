// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Collections.Concurrent;
using System.Runtime.CompilerServices;
using System.Text.Json;

namespace BootstrapBlazor.Components;

class DefaultRegionService : IRegionService
{
    private static readonly ConcurrentDictionary<string, HashSet<string>> CitiesCache = new();
    private static readonly ConcurrentDictionary<string, HashSet<CountyItem>> CountiesCache = new();
    private static readonly ConcurrentDictionary<string, HashSet<string>> DetailCache = new();

    private static bool _initialized;

#if NET9_0_OR_GREATER
    private static readonly Lock Lock = new();
#else
    private static readonly object Lock = new();
#endif

    public HashSet<string> GetProvinces() => Provinces;

    public HashSet<string> GetCities(string province)
    {
        LoadCityData();
        return CitiesCache.TryGetValue(province, out var cities) ? cities : [];
    }

    public HashSet<CountyItem> GetCounties(string city)
    {
        LoadCityData();
        return CountiesCache.TryGetValue(city, out var counties) ? counties : [];
    }

    public HashSet<string> GetDetails(string countyCode)
    {
        return DetailCache.GetOrAdd(countyCode, LoadDetailData);
    }

    private static HashSet<string> LoadDetailData(string countyCode)
    {
        var details = new HashSet<string>();
        using var data = typeof(DefaultRegionService).Assembly.GetManifestResourceStream($"BootstrapBlazor.Components.Data.town.{countyCode}.json");
        if (data != null)
        {
            var document = JsonDocument.Parse(data);
            var token = document.RootElement.EnumerateObject();
            foreach (var t in token)
            {
                var v = t.Value.GetString();
                if (!string.IsNullOrEmpty(v))
                {
                    details.Add(v);
                }
            }
        }
        return details;
    }

    private static void LoadCityData()
    {
        if (!_initialized)
        {
            lock (Lock)
            {
                if (!_initialized)
                {
                    using var data = typeof(DefaultRegionService).Assembly.GetManifestResourceStream("BootstrapBlazor.Components.Data.data.json");
                    if (data != null)
                    {
                        LoadDataCore(data);
                    }
                    _initialized = true;
                }
            }
        }
    }

    private static void LoadDataCore(Stream data)
    {
        var city = "";
        HashSet<string> cities = [];
        HashSet<CountyItem>? counties = null;
        using var stream = new StreamReader(data);
        while (!stream.EndOfStream)
        {
            var content = stream.ReadLine();
            if (!string.IsNullOrEmpty(content))
            {
                var index = content.IndexOf(':');
                if (index == -1)
                {
                    continue;
                }

                var mem = content.AsMemory();
                var code = Trim(mem[0..index].ToString());
                var value = Trim(mem[(index + 1)..(mem.Length - 1)].ToString());

                if (code[2..] == "0000")
                {
                    city = value;
                    cities = [];

                    if (value == "北京市" || value == "天津市" || value == "上海市" || value == "重庆市" || value == "香港特别行政区" || value == "澳门特别行政区")
                    {
                        cities.Add(value);
                    }

                    CitiesCache.TryAdd(value, cities);
                    counties = null;
                    continue;
                }

                if (code[4..] == "00")
                {
                    cities.Add(value);
                    counties = [];
                    CountiesCache.TryAdd(value, counties);
                    continue;
                }

                if (counties == null)
                {
                    counties = [];
                    CountiesCache.TryAdd(city, counties);
                }

                counties.Add(new CountyItem() { Name = value, Code = code });
            }
        }
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    private static string Trim(string segment) => segment.Replace("\"", string.Empty).Trim();

    private static readonly HashSet<string> Provinces =
    [
        "北京市",
        "天津市",
        "上海市",
        "重庆市",
        "河北省",
        "山西省",
        "辽宁省",
        "吉林省",
        "黑龙江省",
        "江苏省",
        "浙江省",
        "安徽省",
        "福建省",
        "江西省",
        "山东省",
        "河南省",
        "湖北省",
        "湖南省",
        "广东省",
        "海南省",
        "四川省",
        "贵州省",
        "云南省",
        "陕西省",
        "甘肃省",
        "青海省",
        "内蒙古自治区",
        "广西壮族自治区",
        "西藏自治区",
        "宁夏回族自治区",
        "新疆维吾尔自治区",
        "香港特别行政区",
        "澳门特别行政区",
        "台湾省"
    ];
}
