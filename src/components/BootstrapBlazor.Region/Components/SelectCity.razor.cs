// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// SelectCity 组件
/// </summary>
public partial class SelectCity
{
    private string? InputId => $"{Id}_input";

    private string? ClassString => CssBuilder.Default("select bb-region")
        .AddClass("disabled", IsDisabled)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private async Task OnClearValue()
    {
        CurrentValue = "";

        if (OnClearAsync != null)
        {
            await OnClearAsync();
        }
    }

    private HashSet<string> GetProvinces() => RegionService.GetProvinces();

    private HashSet<string> GetCities(string proviceName) => RegionService.GetCities(proviceName);
}
