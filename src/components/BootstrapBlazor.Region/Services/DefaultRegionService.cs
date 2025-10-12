// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

#if NET9_0_OR_GREATER
using System.Collections.Frozen;
#endif

using System.Collections.Concurrent;
using System.Runtime.CompilerServices;
using System.Text.Json;

namespace BootstrapBlazor.Components;

class DefaultRegionService : IRegionService
{
    private static readonly ConcurrentDictionary<string, IReadOnlySet<string>> _citiesCache = new();
    private static readonly ConcurrentDictionary<string, IReadOnlySet<CountyItem>> _countiesCache = new();
    private static readonly ConcurrentDictionary<string, IReadOnlySet<string>> _detailCache = new();

    private static bool _initialized = false;

#if NET9_0_OR_GREATER
    private static readonly Lock _lock = new();
#else
    private static readonly object _lock = new();
#endif

    public IReadOnlySet<string> GetProvinces() => Provinces;

    public IReadOnlySet<string> GetCities(string province)
    {
        LoadCityData();
        return _citiesCache.TryGetValue(province, out var cities) ? cities : new HashSet<string>();
    }

    public IReadOnlySet<CountyItem> GetCounties(string city)
    {
        LoadCityData();
        return _countiesCache.TryGetValue(city, out var counties) ? counties : new HashSet<CountyItem>();
    }

    public IReadOnlySet<string> GetDetails(string countyCode)
    {
        LoadDetailData(countyCode);
        return _detailCache.TryGetValue(countyCode, out var details) ? details : new HashSet<string>();
    }

    private static IReadOnlySet<string> LoadDetailData(string countyCode)
    {
        if (_detailCache.TryGetValue(countyCode, out var detail))
        {
            return detail;
        }

        var details = new HashSet<string>();
        var data = typeof(DefaultRegionService).Assembly.GetManifestResourceStream($"BootstrapBlazor.Components.Data.town.{countyCode}.json");
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
        _detailCache.TryAdd(countyCode, details);
        return details;
    }

    private static void LoadCityData()
    {
        if (_initialized)
        {
            return;
        }

        lock (_lock)
        {
            if (_initialized)
            {
                return;
            }

            _initialized = true;
            var data = typeof(DefaultRegionService).Assembly.GetManifestResourceStream("BootstrapBlazor.Components.Data.data.json");
            if (data != null)
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
                            _citiesCache.TryAdd(value, cities);
                            counties = null;
                            continue;
                        }

                        if (code[4..] == "00")
                        {
                            cities.Add(value);
                            counties = [];
                            _countiesCache.TryAdd(value, counties);
                            continue;
                        }

                        if (counties == null)
                        {
                            counties = [];
                            _countiesCache.TryAdd(city, counties);
                        }

                        counties.Add(new CountyItem() { Name = value, Code = code });
                    }
                }
            }
        }
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    private static string Trim(string segment) => segment.Replace("\"", string.Empty).Trim();

#if NET9_0_OR_GREATER
    private static readonly FrozenSet<string> Provinces =
#else
    private static readonly HashSet<string> Provinces =
#endif
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
