// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

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

    private string? InputId => $"{Id}_input";

    private string? ClassString => CssBuilder.Default("select bb-region")
        .AddClass("disabled", IsDisabled)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private readonly HashSet<string> _values = [];

    private string? GetActiveClass(string item) => _values.Contains(item) ? "active" : null;

    private async Task OnClearValue()
    {
        CurrentValue = "";

        if (OnClearAsync != null)
        {
            await OnClearAsync();
        }
    }

    private void OnSelectCity(string item)
    {
        if(IsMultiple)
        {

        }
        if (!_values.Remove(item))
        {
            _values.Add(item);
        }
        CurrentValue = string.Join(",", _values);
    }

    private static HashSet<string> GetProvinces()
    {
        return
        [
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
    }

    private HashSet<string> GetCities(string proviceName)
    {
        if (proviceName == "直辖市")
        {
            return
            [
                "北京市",
                "天津市",
                "上海市",
                "重庆市"
            ];
        }

        if (proviceName == "特别行政区")
        {
            return
            [
                "香港特别行政区",
                "澳门特别行政区"
            ];
        }

        return RegionService.GetCities(proviceName);
    }
}
