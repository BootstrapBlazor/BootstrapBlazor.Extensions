// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Runtime.CompilerServices;

namespace BootstrapBlazor.Components;

/// <summary>
/// SelectCity 组件
/// </summary>
public partial class SelectCity
{
    /// <summary>
    /// 获得/设置 是否可多选 默认 false 单选
    /// </summary>
    [Parameter]
    public bool IsMultiple { get; set; }

    /// <summary>
    /// 获得/设置 是否开启搜索功能 默认 true 开启
    /// </summary>
    [Parameter]
    public bool ShowSearch { get; set; } = true;

    /// <summary>
    /// Gets or sets the search icon.
    /// </summary>
    [Parameter]
    public string? SearchIcon { get; set; }

    /// <summary>
    /// 获得/设置 单选时选择后是否自动关闭 默认 true
    /// <para><see cref="IsMultiple"/> 值为 true 时，这个参数不生效</para>
    /// </summary>
    [Parameter]
    public bool AutoClose { get; set; } = true;

    private string? ClassString => CssBuilder.Default("select bb-city")
        .AddClass("disabled", IsDisabled)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? SearchIconString => CssBuilder.Default("icon search-icon")
        .AddClass(SearchIcon)
        .Build();

    private string? ClearIconString => CssBuilder.Default("icon clear-icon")
        .AddClass(ClearIcon)
        .Build();

    private readonly HashSet<string> _values = [];
    private string? _searchText;

    private string? GetActiveClass(string item) => CssBuilder.Default()
        .AddClass("active", _values.Contains(item) || CurrentValue == item)
        .AddClass("prev", !string.IsNullOrEmpty(_searchText) && PinYinService.GetFirstLetters(item).StartsWith(_searchText))
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        SearchIcon ??= IconTheme.GetIconByKey(ComponentIcons.SelectSearchIcon);
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, new
    {
        TriggerSearch = nameof(TriggerSearch)
    });

    /// <summary>
    /// 触发过滤方法 由 JavaScript 触发
    /// </summary>
    /// <param name="v"></param>
    /// <returns></returns>
    [JSInvokable]
    public void TriggerSearch(string v)
    {
        _searchText = v.ToUpperInvariant();
        StateHasChanged();
    }

    private async Task OnClearValue()
    {
        if (IsMultiple)
        {
            _values.Clear();
        }
        CurrentValue = "";

        if (OnClearAsync != null)
        {
            await OnClearAsync();
        }
    }

    private RenderFragment RenderCities() => builder =>
    {
        foreach (var item in GetProvinces())
        {
            builder.AddContent(0, RenderItem(item));
        }
    };

    private void OnSelectProvince(string provinceName)
    {
        if (!IsMultiple)
        {
            return;
        }

        HashSet<string> cities = provinceName switch
        {
            "直辖市" => Municipalities,
            "特别行政区" => SpecialAdministrativeRegions,
            _ => GetCities(provinceName)
        };
        foreach (var city in cities.Where(city => !_values.Remove(city)))
        {
            _values.Add(city);
        }
        CurrentValue = string.Join(",", _values);
    }

    private async Task OnSelectCity(string item)
    {
        if (IsMultiple)
        {
            if (!_values.Remove(item))
            {
                _values.Add(item);
            }
            CurrentValue = string.Join(",", _values);
        }
        else
        {
            CurrentValue = item;
        }

        if (!IsMultiple && AutoClose)
        {
            await InvokeVoidAsync("hide", Id);
        }
    }

    private HashSet<string> GetProvinces()
    {
        if (string.IsNullOrEmpty(_searchText))
        {
            return Provinces;
        }

        if (IsChinese(_searchText))
        {
            return [.. Provinces.Where(i => i.Contains(_searchText) || GetCities(i).Any(city => city.Contains(_searchText)))];
        }

        return [.. GenerateProvincePinYin().Where(i => FilterProvince(i, _searchText)).Select(i => i.Name)];
    }

    [MethodImpl(MethodImplOptions.AggressiveInlining)]
    private static bool FilterProvince(ProvinceItem item, string searchText) => item.PinYin.StartsWith(searchText) || item.Cities.Any(city => city.PinYin.StartsWith(searchText));

    private static HashSet<ProvinceItem>? _provinceItems;

    private HashSet<ProvinceItem> GenerateProvincePinYin()
    {
        _provinceItems ??= [.. Provinces.Select(i => new ProvinceItem()
        {
            PinYin = PinYinService.GetFirstLetters(i),
            Name = i,
            Cities = GenerateCityPinYin(i)
        })];
        return _provinceItems;
    }

    private HashSet<string> GetCities(string provinceName) => provinceName switch
    {
        "直辖市" => Municipalities,
        "特别行政区" => SpecialAdministrativeRegions,
        _ => RegionService.GetCities(provinceName)
    };

    private HashSet<CityItem> GenerateCityPinYin(string provinceName) => [.. GetCities(provinceName).Select(i => new CityItem()
    {
        PinYin = PinYinService.GetFirstLetters(i),
        Name = i
    })];

    private bool IsChinese(string text) => text.Any(i => i >= 0x4E00 && i <= 0x9FFF);

    private static readonly HashSet<string> Provinces = [
        "直辖市",
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
        "台湾省",
        "特别行政区"
    ];

    private static readonly HashSet<string> Municipalities = ["北京市", "天津市", "上海市", "重庆市"];

    private static readonly HashSet<string> SpecialAdministrativeRegions = ["香港特别行政区", "澳门特别行政区"];
}
