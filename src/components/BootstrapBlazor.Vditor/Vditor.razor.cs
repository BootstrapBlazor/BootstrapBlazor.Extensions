// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// Vditor component
/// </summary>
public partial class Vditor
{
    /// <summary>
    /// 获得/设置 组件 <see cref="VditorOptions"/> 实例 默认 null
    /// </summary>
    [Parameter]
    public VditorOptions? Options { get; set; }

    private string? ClassString => CssBuilder.Default("bb-vditor")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? _lastValue;

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
            _lastValue = Value;
            return;
        }

        if (_lastValue != Value)
        {
            _lastValue = Value;
            await InvokeVoidAsync("update", Id, Value);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, new
    {
        Options,
        Value,
        TriggerUpdateValueAsync = nameof(TriggerUpdateValueAsync)
    });

    /// <summary>
    /// 触发 Value 值改变回调方法由 JavaScript 调用
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    [JSInvokable]
    public Task TriggerUpdateValueAsync(string value)
    {
        CurrentValue = value;
        return Task.CompletedTask;
    }
}

