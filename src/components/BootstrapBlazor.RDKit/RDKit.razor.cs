// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// RDKit 组件
/// </summary>
public partial class RDKit
{
    /// <summary>
    /// 获得/设置 RDKit 值
    /// </summary>
    [Parameter]
    [EditorRequired]
    [NotNull]
    public string? Value { get; set; }

    /// <summary>
    /// 获得/设置 Smarts 值
    /// </summary>
    [Parameter]
    public string? Smarts { get; set; }

    /// <summary>
    /// 获得/设置 分子图宽度单位 px
    /// </summary>
    [Parameter]
    public float? Width { get; set; }

    /// <summary>
    /// 获得/设置 分子图高度单位 px
    /// </summary>
    [Parameter]
    public float? Height { get; set; }

    private string? ClassString => CssBuilder.Default("bb-rdk")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

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
            StoreParameters();
        }
        else if (ValidateParameters())
        {
            await InvokeVoidAsync("update", Id, GetOptions());
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, GetOptions());

    private object GetOptions() => new { Smiles = Value, Smarts, Height, Width };


    private string? _lastValue;

    private string? _lastSmarts;

    private float? _lastWidth;

    private float? _lastHeight;

    private void StoreParameters()
    {
        _lastValue = Value;
        _lastSmarts = Smarts;
        _lastWidth = Width;
        _lastHeight = Height;
    }

    private bool ValidateParameters()
    {
        var changed = false;
        if (_lastValue != Value)
        {
            _lastValue = Value;
            changed = true;
        }
        else if (_lastSmarts != Smarts)
        {
            _lastSmarts = Smarts;
            changed = true;
        }
        else if (_lastWidth != Width)
        {
            _lastWidth = Width;
            changed = true;
        }
        else if (_lastHeight != Height)
        {
            _lastHeight = Height;
            changed = true;
        }
        return changed;
    }
}
