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
    public string? SmilesValue { get; set; }

    /// <summary>
    /// 是否开启紧凑绘图，默认为 false 不开启
    /// </summary>
    [Parameter]
    public bool CompactDrawing { get; set; }

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

    /// <summary>
    /// 获得/设置 主题 默认 null 使用 light 主题
    /// </summary>
    [Parameter]
    public string? Theme { get; set; }

    private string? ClassString => CssBuilder.Default("bb-smiles-drawer")
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

    private object GetOptions() => new { SmilesValue, CompactDrawing, Width, Height, Theme };

    private string? _lastSmilesValue;

    private bool _lastCompactDrawing;

    private float? _lastWidth;

    private float? _lastHeight;

    private string? _lastTheme;

    private void StoreParameters()
    {
        _lastSmilesValue = SmilesValue;
        _lastCompactDrawing = CompactDrawing;
        _lastWidth = Width;
        _lastHeight = Height;
        _lastTheme = Theme;
    }

    private bool ValidateParameters()
    {
        var changed = false;
        if (_lastSmilesValue != SmilesValue)
        {
            _lastSmilesValue = SmilesValue;
            changed = true;
        }
        else if (_lastCompactDrawing != CompactDrawing)
        {
            _lastCompactDrawing = CompactDrawing;
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
        else if (_lastTheme != Theme)
        {
            _lastTheme = Theme;
            changed = true;
        }
        return changed;
    }
}
