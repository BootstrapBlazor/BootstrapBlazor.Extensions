// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">Vditor Markdown 组件</para>
/// <para lang="en">Vditor markdown component</para>
/// </summary>
public partial class Vditor
{
    /// <summary>
    /// <para lang="zh">获得/设置 组件 <see cref="VditorOptions"/> 实例 默认 null</para>
    /// <para lang="en">Gets or sets the <see cref="VditorOptions"/> instance. Default is null.</para>
    /// </summary>
    [Parameter]
    public VditorOptions? Options { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件渲染完毕回调方法 默认 null</para>
    /// <para lang="en">Gets or sets the callback method when component rendering is complete. Default is null.</para>
    /// </summary>
    [Parameter]
    public Func<Task>? OnRenderedAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件输入时回调方法 高频触发 默认 null</para>
    /// <para lang="en">Gets or sets the callback method on input. High frequency trigger. Default is null.</para>
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnInputAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件获得焦点时回调方法 默认 null</para>
    /// <para lang="en">Gets or sets the callback method when the component gains focus. Default is null.</para>
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnFocusAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件失去焦点时回调方法 默认 null</para>
    /// <para lang="en">Gets or sets the callback method when the component loses focus. Default is null.</para>
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnBlurAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件选择内容时回调方法 默认 null</para>
    /// <para lang="en">Gets or sets the callback method when content is selected. Default is null.</para>
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnSelectAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件按 ESC 按键时回调方法 默认 null</para>
    /// <para lang="en">Gets or sets the callback method when ESC key is pressed. Default is null.</para>
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnEscapeAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件按 Ctrl + Enter 组合按键时回调方法 默认 null</para>
    /// <para lang="en">Gets or sets the callback method when Ctrl + Enter is pressed. Default is null.</para>
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnCtrlEnterAsync { get; set; }

    private string? ClassString => CssBuilder.Default("bb-vditor")
        .AddClass(CssClass)
        .AddClass(ValidCss)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? _lastValue;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            _lastValue = Value;
        }

        if (_lastValue != Value)
        {
            _lastValue = Value;
            await InvokeVoidAsync("setValue", Id, Value);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override Task InvokeInitAsync() => InvokeAsync<IJSObjectReference>("init", Id, Interop, new
    {
        Options,
        Value
    });

    /// <summary>
    /// <para lang="zh">重新设置编辑器方法</para>
    /// <para lang="en">Resets the editor.</para>
    /// </summary>
    /// <param name="value"></param>
    /// <param name="options"></param>
    public async Task Reset(string value, VditorOptions options)
    {
        if (!string.IsNullOrEmpty(value))
        {
            Value = value;
        }
        await InvokeVoidAsync("reset", Id, Value, Options);
    }

    /// <summary>
    /// <para lang="zh">在焦点处插入内容 并默认进行 Markdown 渲染</para>
    /// <para lang="en">Inserts content at the cursor position and renders Markdown by default.</para>
    /// </summary>
    /// <param name="value"></param>
    /// <param name="render"></param>
    public Task InsertValueAsync(string? value, bool render = true) => InvokeVoidAsync("insertValue", Id, value, render);

    /// <summary>
    /// <para lang="zh">获取编辑器的 Markdown 内容</para>
    /// <para lang="en">Gets the markdown content of the editor.</para>
    /// </summary>
    public Task<string?> GetValueAsync() => InvokeAsync<string?>("execute", Id, "getValue");

    /// <summary>
    /// <para lang="zh">获取 Markdown 渲染后的 HTML</para>
    /// <para lang="en">Gets the HTML rendered from markdown.</para>
    /// </summary>
    public Task<string?> GetHtmlAsync() => InvokeAsync<string?>("execute", Id, "getHTML");

    /// <summary>
    /// <para lang="zh">获取 返回选中的字符串</para>
    /// <para lang="en">Returns the selected string.</para>
    /// </summary>
    public Task<string?> GetSelectionAsync() => InvokeAsync<string?>("execute", Id, "getSelection");

    /// <summary>
    /// <para lang="zh">解除编辑器禁用</para>
    /// <para lang="en">Enables the editor.</para>
    /// </summary>
    public Task EnableAsync() => InvokeVoidAsync("execute", Id, "enable");

    /// <summary>
    /// <para lang="zh">禁用编辑器</para>
    /// <para lang="en">Disables the editor.</para>
    /// </summary>
    public Task DisableAsync() => InvokeVoidAsync("execute", Id, "disabled");

    /// <summary>
    /// <para lang="zh">聚焦编辑器</para>
    /// <para lang="en">Focuses the editor.</para>
    /// </summary>
    public Task FocusAsync() => InvokeVoidAsync("execute", Id, "focus");

    /// <summary>
    /// <para lang="zh">让编辑器失去焦点</para>
    /// <para lang="en">Blurs the editor.</para>
    /// </summary>
    public Task BlurAsync() => InvokeVoidAsync("execute", Id, "blur");

    /// <summary>
    /// <para lang="zh">客户端渲染完毕回调方法 由 JavaScript 调用</para>
    /// <para lang="en">Callback when client rendering is complete. Called by JavaScript.</para>
    /// </summary>
    [JSInvokable]
    public async Task TriggerRenderedAsync()
    {
        if (OnRenderedAsync != null)
        {
            await OnRenderedAsync();
        }
    }

    /// <summary>
    /// <para lang="zh">组件录入时回调方法 由 JavaScript 调用</para>
    /// <para lang="en">Callback when input occurs. Called by JavaScript.</para>
    /// </summary>
    /// <param name="value"></param>
    [JSInvokable]
    public async Task TriggerInputAsync(string value)
    {
        _lastValue = value;
        CurrentValue = value;

        if (OnInputAsync != null)
        {
            await OnInputAsync(value);
        }
    }

    /// <summary>
    /// <para lang="zh">触发焦点回调方法 由 JavaScript 调用</para>
    /// <para lang="en">Callback when focus is triggered. Called by JavaScript.</para>
    /// </summary>
    /// <param name="value"></param>
    [JSInvokable]
    public async Task TriggerFocusAsync(string value)
    {
        if (OnFocusAsync != null)
        {
            await OnFocusAsync(value);
        }
    }

    /// <summary>
    /// <para lang="zh">触发失焦回调方法 由 JavaScript 调用</para>
    /// <para lang="en">Callback when blur is triggered. Called by JavaScript.</para>
    /// </summary>
    /// <param name="value"></param>
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
    /// <para lang="zh">触发选择回调方法 由 JavaScript 调用</para>
    /// <para lang="en">Callback when selection is triggered. Called by JavaScript.</para>
    /// </summary>
    /// <param name="value"></param>
    [JSInvokable]
    public async Task TriggerSelectAsync(string value)
    {
        if (OnSelectAsync != null)
        {
            await OnSelectAsync(value);
        }
    }

    /// <summary>
    /// <para lang="zh">触发 ESC 按键回调方法 由 JavaScript 调用</para>
    /// <para lang="en">Callback when ESC key is pressed. Called by JavaScript.</para>
    /// </summary>
    /// <param name="value"></param>
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
    /// <para lang="zh">触发 Ctrl+Enter 组合按键回调方法 由 JavaScript 调用</para>
    /// <para lang="en">Callback when Ctrl+Enter is pressed. Called by JavaScript.</para>
    /// </summary>
    /// <param name="value"></param>
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
}
