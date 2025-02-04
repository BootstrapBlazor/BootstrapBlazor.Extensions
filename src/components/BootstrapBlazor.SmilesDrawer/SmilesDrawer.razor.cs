// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// SmilesDrawer 组件
/// </summary>
public partial class SmilesDrawer
{
    /// <summary>
    /// 获得/设置描述分子结构的 Smiles 字符串
    /// </summary>
    [Parameter]
    [EditorRequired]
    [NotNull]
    public string? Smiles { get; set; }

    /// <summary>
    /// 获得/设置描述分子结构的 <see cref="SmilesDrawerOptions"/> 实例
    /// </summary>
    [Parameter]
    public SmilesDrawerOptions? Options { get; set; }

    private string? ClassString => CssBuilder.Default("bb-smiles-drawer")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? _lastOptions;

    private string? _lastSmiles;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    /// <returns></returns>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            _lastSmiles = Smiles;
            _lastOptions = Options?.ToString();
        }
        else if (ValidateParameters())
        {
            await InvokeVoidAsync("update", Id, Smiles, Options);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Smiles, Options);

    private bool ValidateParameters()
    {
        var ret = false;
        var optionString = Options?.ToString();
        if (Smiles != _lastSmiles || _lastOptions != optionString)
        {
            _lastSmiles = Smiles;
            _lastOptions = optionString;
            ret = true;
        }
        return ret;
    }
}
