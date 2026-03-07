// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">SelectProvince 组件</para>
/// <para lang="en">SelectProvince component</para>
/// </summary>
public partial class SelectProvince
{
    /// <summary>
    /// <para lang="zh">获得/设置 是否可多选，默认 false 单选</para>
    /// <para lang="en">Gets or sets whether multiple selection is enabled. Default is false (single selection)</para>
    /// </summary>
    [Parameter]
    public bool IsMultiple { get; set; }

    private string? ClassString => CssBuilder.Default("select bb-province")
        .AddClass("disabled", IsDisabled)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private readonly HashSet<string> _values = [];

    private string? GetActiveClass(string item) => _values.Contains(item) || CurrentValue == item ? "active" : null;

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

    private void OnSelectProvince(string item)
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
    }

    private HashSet<string> GetProvinces() => RegionService.GetProvinces();
}
