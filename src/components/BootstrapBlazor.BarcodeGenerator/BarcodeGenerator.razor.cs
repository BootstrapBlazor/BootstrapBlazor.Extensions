// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// 条码生成器组件
/// </summary>
public partial class BarcodeGenerator
{
    private string? _value;
    private BarcodeGeneratorOption _options = new();

    /// <summary>
    /// 获得/设置 条码值
    /// </summary>
    [Parameter]
    public string? Value { get; set; }

    /// <summary>
    /// 获得/设置 <see cref="BarcodeGeneratorOption"/> 实例值
    /// </summary>
    [Parameter]
    public BarcodeGeneratorOption? Options { get; set; }

    /// <summary>
    /// 获得/设置 条码生成回调方法
    /// </summary>
    [Parameter]
    public Func<string?, Task>? OnCompletedAsync { get; set; }

    private string? ClassString => CssBuilder.Default("bb-barcode")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        var render = false;
        if (_value != Value)
        {
            _value = Value;
            render = true;
        }
        if (_options.DifferAndAssign(Options))
        {
            render = true;
        }

        if (render)
        {
            var result = await GenerateBarCode(Value, Options);
            if (OnCompletedAsync != null)
            {
                await OnCompletedAsync(result);
            }
        }
    }

    /// <summary>
    /// 生成条码方法
    /// </summary>
    /// <param name="value"></param>
    /// <param name="options"></param>
    /// <returns></returns>
    public async Task<string?> Generate(string? value = null, BarcodeGeneratorOption? options = null)
    {
        if (_value != value)
        {
            _value = Value = value;
        }

        return await GenerateBarCode(_value, options);
    }

    private Task<string?> GenerateBarCode(string? value, BarcodeGeneratorOption? options = null) => InvokeAsync<string?>("generate", Id, value, options);
}
