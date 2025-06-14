// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// Vditor markdown component
/// </summary>
public partial class Vditor
{
    /// <summary>
    /// 获得/设置 组件 <see cref="VditorOptions"/> 实例 默认 null
    /// </summary>
    [Parameter]
    public VditorOptions? Options { get; set; }

    /// <summary>
    /// 获得/设置 组件渲染完毕回调方法 默认 null
    /// </summary>
    [Parameter]
    public Func<Task>? OnRenderedAsync { get; set; }

    /// <summary>
    /// 获得/设置 组件输入时回调方法 高频触发 默认 null
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnInputAsync { get; set; }

    /// <summary>
    /// 获得/设置 组件获得焦点时回调方法 默认 null
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnFocusAsync { get; set; }

    /// <summary>
    /// 获得/设置 组件失去焦点时回调方法 默认 null
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnBlurAsync { get; set; }

    /// <summary>
    /// 获得/设置 组件选择内容时回调方法 默认 null
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnSelectAsync { get; set; }

    /// <summary>
    /// 获得/设置 组件按 ESC 案件时回调方法 默认 null
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnEscapeAsync { get; set; }

    /// <summary>
    /// 获得/设置 组件按 Ctrl + Enter 组合案件时回调方法 默认 null
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnCtrlEnterAsync { get; set; }

    private string? ClassString => CssBuilder.Default("bb-vditor")
        .AddClass(CssClass)
        .AddClass(ValidCss)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? _lastValue;
    private IJSObjectReference? _vditor;

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
            if (_vditor != null)
            {
                await _vditor.InvokeVoidAsync("setValue", Value, true);
            }
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override async Task InvokeInitAsync()
    {
        _vditor = await InvokeAsync<IJSObjectReference>("init", Id, Interop, new
        {
            Options,
            Value
        });
    }

    /// <summary>
    /// 重新设置编辑器方法
    /// </summary>
    /// <param name="value"></param>
    /// <param name="options"></param>
    /// <returns></returns>
    public async Task Reset(string value, VditorOptions options)
    {
        if (!string.IsNullOrEmpty(value))
        {
            Value = value;
        }
        _vditor = await InvokeAsync<IJSObjectReference>("reset", Id, Value, Options);
    }

    /// <summary>
    /// 在焦点处插入内容，并默认进行 Markdown 渲染
    /// </summary>
    /// <param name="value">要插入的 markdown 值</param>
    /// <param name="render">是否渲染</param>
    public async ValueTask InsertValueAsync(string? value, bool render = true)
    {
        if (_vditor != null)
        {
            await _vditor.InvokeVoidAsync("insertValue", value, render);
        }
    }

    /// <summary>
    /// 获取编辑器的 markdown 内容
    /// </summary>
    public async ValueTask<string?> GetValueAsync()
    {
        string? ret = null;
        if (_vditor != null)
        {
            ret = await _vditor.InvokeAsync<string?>("getValue");
        }
        return ret;
    }

    /// <summary>
    /// 获取 markdown 渲染后的 HTML
    /// </summary>
    public async ValueTask<string?> GetHtmlAsync()
    {
        string? ret = null;
        if (_vditor != null)
        {
            ret = await _vditor.InvokeAsync<string?>("getHTML");
        }
        return ret;
    }

    /// <summary>
    /// 返回选中的字符串
    /// </summary>
    public async ValueTask<string?> GetSelectionAsync()
    {
        string? ret = null;
        if (_vditor != null)
        {
            ret = await _vditor.InvokeAsync<string?>("getSelection");
        }
        return ret;
    }

    /// <summary>
    /// 解除编辑器禁用
    /// </summary>
    public async ValueTask EnableAsync()
    {
        if (_vditor != null)
        {
            await _vditor.InvokeVoidAsync("enable");
        }
    }

    /// <summary>
    /// 禁用编辑器
    /// </summary>
    public async ValueTask DisableAsync()
    {
        if (_vditor != null)
        {
            await _vditor.InvokeVoidAsync("disabled");
        }
    }

    /// <summary>
    /// 聚焦编辑器
    /// </summary>
    public async ValueTask FocusAsync()
    {
        if (_vditor != null)
        {
            await _vditor.InvokeVoidAsync("focus");
        }
    }

    /// <summary>
    /// 让编辑器失去焦点
    /// </summary>
    public async ValueTask BlurAsync()
    {
        if (_vditor != null)
        {
            await _vditor.InvokeAsync<string?>("blur");
        }
    }

    /// <summary>
    /// 客户端渲染完毕回调方法由 JavaScript 调用
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerRenderedAsync()
    {
        if (OnRenderedAsync != null)
        {
            await OnRenderedAsync();
        }
    }

    /// <summary>
    /// 组件录入时回调方法由 JavaScript 调用
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerInputAsync(string value)
    {
        if (OnInputAsync != null)
        {
            _lastValue = value;
            CurrentValue = value;
            await OnInputAsync(value);
        }
    }

    /// <summary>
    /// 触发 Value 值改变回调方法由 JavaScript 调用
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerFocusAsync(string value)
    {
        if (OnFocusAsync != null)
        {
            await OnFocusAsync(value);
        }
    }

    /// <summary>
    /// 触发 Value 值改变回调方法由 JavaScript 调用
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerBlurAsync(string value)
    {
        if (OnBlurAsync != null)
        {
            _lastValue = value;
            CurrentValue = value;
            await OnBlurAsync(value);
        }
    }

    /// <summary>
    /// 触发 Value 值改变回调方法由 JavaScript 调用
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerSelectAsync(string value)
    {
        if (OnSelectAsync != null)
        {
            await OnSelectAsync(value);
        }
    }

    /// <summary>
    /// 触发 Value 值改变回调方法由 JavaScript 调用
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerEscapeAsync(string value)
    {
        if (OnEscapeAsync != null)
        {
            _lastValue = value;
            CurrentValue = value;
            await OnEscapeAsync(value);
        }
    }

    /// <summary>
    /// 触发 Value 值改变回调方法由 JavaScript 调用
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerCtrlEnterAsync(string value)
    {
        if (OnCtrlEnterAsync != null)
        {
            _lastValue = value;
            CurrentValue = value;
            await OnCtrlEnterAsync(value);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="disposing"></param>
    /// <returns></returns>
    protected override async ValueTask DisposeAsync(bool disposing)
    {
        if (disposing)
        {
            if (_vditor != null)
            {
                await _vditor.DisposeAsync();
                _vditor = null;
            }

            await base.DisposeAsync(disposing);
        }
    }
}
