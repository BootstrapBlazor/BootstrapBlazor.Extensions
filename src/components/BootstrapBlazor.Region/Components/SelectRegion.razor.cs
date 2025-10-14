// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// SelectRegion 组件
/// </summary>
public partial class SelectRegion
{
    /// <summary>
    /// Gets or sets the placeholder text.
    /// </summary>
    [Parameter]
    public string? PlaceHolder { get; set; }

    /// <summary>
    /// Gets or sets the color. The default is <see cref="Color.None"/> (no color).
    /// </summary>
    [Parameter]
    public Color Color { get; set; }

    /// <summary>
    /// Gets or sets the dropdown icon. The default is "fa-solid fa-angle-up".
    /// </summary>
    [Parameter]
    [NotNull]
    public string? DropdownIcon { get; set; }

    /// <summary>
    /// Gets or sets the callback method when the clear button is clicked. Default is null.
    /// </summary>
    [Parameter]
    public Func<Task>? OnClearAsync { get; set; }

    /// <summary>
    /// Gets or sets the right-side clear icon. Default is fa-solid fa-angle-up.
    /// </summary>
    [Parameter]
    [NotNull]
    public string? ClearIcon { get; set; }

    /// <summary>
    /// Gets or sets the <see cref="IIconTheme"/> service instance.
    /// </summary>
    [Inject]
    [NotNull]
    private IIconTheme? IconTheme { get; set; }

    [Inject]
    [NotNull]
    private IRegionService? RegionService { get; set; }

    private string? ClassString => CssBuilder.Default("select bb-region")
        .AddClass("disabled", IsDisabled)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? InputId => $"{Id}_input";

    private string? InputClassString => CssBuilder.Default("form-select form-control")
        .AddClass($"border-{Color.ToDescriptionString()}", Color != Color.None && !IsDisabled && !IsValid.HasValue)
        .AddClass($"border-success", IsValid.HasValue && IsValid.Value)
        .AddClass($"border-danger", IsValid.HasValue && !IsValid.Value)
        .AddClass(CssClass).AddClass(ValidCss)
        .Build();

    private string? AppendClassString => CssBuilder.Default("form-select-append")
        .AddClass($"text-{Color.ToDescriptionString()}", Color != Color.None && !IsDisabled && !IsValid.HasValue)
        .AddClass($"text-success", IsValid.HasValue && IsValid.Value)
        .AddClass($"text-danger", IsValid.HasValue && !IsValid.Value)
        .Build();

    private string? ClearClassString => CssBuilder.Default("clear-icon")
        .AddClass($"text-{Color.ToDescriptionString()}", Color != Color.None)
        .AddClass($"text-success", IsValid.HasValue && IsValid.Value)
        .AddClass($"text-danger", IsValid.HasValue && !IsValid.Value)
        .Build();

    private string? GetHeaderActiveClass(RegionViewMode type) => _currentViewMode == type ? "active" : null;

    private string? GetBodyActiveClass(RegionViewMode type) => CssBuilder.Default("bb-region-body-item")
        .AddClass("active", _currentViewMode == type)
        .Build();

    private string? GetProvinceActiveClass(string item) => _provinceValue == item ? "active" : null;

    private string? GetCityActiveClass(string item) => _cityValue == item ? "active" : null;

    private string? GetCountyActiveClass(CountyItem item) => _countyValue == item ? "active" : null;

    private string? GetDetailActiveClass(string item) => _detailValue == item ? "active" : null;

    private RegionViewMode _currentViewMode = RegionViewMode.Province;

    private string? _provinceValue;

    private string? _cityValue;

    private CountyItem _countyValue;

    private string? _detailValue;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        DropdownIcon ??= IconTheme.GetIconByKey(ComponentIcons.SelectDropdownIcon);
        ClearIcon ??= IconTheme.GetIconByKey(ComponentIcons.SelectClearIcon);

        ResetValue();
    }

    private void ResetValue()
    {
        if (!string.IsNullOrEmpty(Value))
        {
            var segments = Value.Split('-', StringSplitOptions.RemoveEmptyEntries);
            if (segments.Length > 0 && _provinceValue != segments[0] && GetProvinces().Contains(segments[0]))
            {
                _provinceValue = segments[0];

                Value = _provinceValue;
            }
            if (segments.Length > 1 && _cityValue != segments[1] && GetCities().Contains(segments[1]))
            {
                _cityValue = segments[1];

                Value = $"{_provinceValue}-{_cityValue}";
            }
            if (segments.Length > 2 && _countyValue.Name != segments[2])
            {
                var county = GetCounties().First(i => i.Name == segments[2]);
                if (!string.IsNullOrEmpty(county.Name))
                {
                    _countyValue = county;
                }

                Value = $"{_provinceValue}-{_cityValue}-{_countyValue.Name}";
            }
            if (segments.Length > 3 && _cityValue != segments[3] && GetDetails().Contains(segments[3]))
            {
                _detailValue = segments[3];

                Value = $"{_provinceValue}-{_cityValue}-{_countyValue.Name}-{_detailValue}";
            }
        }
    }

    private async Task OnClearValue()
    {
        _provinceValue = "";
        _cityValue = "";
        _countyValue = new();
        _detailValue = "";
        CurrentValue = "";

        _currentViewMode = RegionViewMode.Province;

        if (OnClearAsync != null)
        {
            await OnClearAsync();
        }
    }

    private HashSet<string> GetProvinces() => RegionService.GetProvinces();

    private HashSet<string> GetCities()
    {
        if (string.IsNullOrEmpty(_provinceValue))
        {
            return [];
        }

        return RegionService.GetCities(_provinceValue);
    }

    private HashSet<CountyItem> GetCounties()
    {
        if (string.IsNullOrEmpty(_cityValue))
        {
            return [];
        }

        return RegionService.GetCounties(_cityValue);
    }

    private HashSet<string> GetDetails()
    {
        if (string.IsNullOrEmpty(_countyValue.Code))
        {
            return [];
        }

        return RegionService.GetDetails(_countyValue.Code);
    }

    private void OnClickProvince(string value)
    {
        _provinceValue = value;
        _currentViewMode = RegionViewMode.City;

        CurrentValue = _provinceValue;
    }

    private void OnClickCity(string value)
    {
        _cityValue = value;
        _currentViewMode = RegionViewMode.County;

        CurrentValue = $"{_provinceValue}-{_cityValue}";
    }

    private void OnClickCounty(CountyItem item)
    {
        _countyValue = item;
        _currentViewMode = RegionViewMode.Detail;

        CurrentValue = $"{_provinceValue}-{_cityValue}-{_countyValue.Name}";
    }

    private async Task OnClickDetail(string value)
    {
        _detailValue = value;
        _currentViewMode = RegionViewMode.Province;

        CurrentValue = $"{_provinceValue}-{_cityValue}-{_countyValue.Name}-{_detailValue}";
        await InvokeVoidAsync("hide", Id);
    }

    private void OnSwitchProvinceView()
    {
        _currentViewMode = RegionViewMode.Province;
        _cityValue = "";
        _countyValue = new();
        _detailValue = "";
    }

    private void OnSwitchCityView()
    {
        _currentViewMode = RegionViewMode.City;
        _countyValue = new();
        _detailValue = "";
    }

    private void OnSwitchCountyView()
    {
        _currentViewMode = RegionViewMode.County;
        _detailValue = "";
    }

    private void OnSwitchDetailView()
    {
        _currentViewMode = RegionViewMode.Detail;
    }
}
