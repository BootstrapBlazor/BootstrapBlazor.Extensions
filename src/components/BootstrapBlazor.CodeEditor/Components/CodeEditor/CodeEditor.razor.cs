// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">代码编辑器组件</para>
/// <para lang="en">Code editor component</para>
/// </summary>
public partial class CodeEditor
{
    /// <summary>
    /// <para lang="zh">获得/设置 编辑器语言</para>
    /// <para lang="en">Gets or sets the editor language</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? Language { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 编辑器主题</para>
    /// <para lang="en">Gets or sets the editor theme</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? Theme { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 输入的值。应与双向绑定一起使用。</para>
    /// <para lang="en">Gets or sets the value of the input. This should be used with two-way binding.</para>
    /// </summary>
    [Parameter]
    public string? Value { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 更新绑定值的回调。</para>
    /// <para lang="en">Gets or sets a callback that updates the bound value.</para>
    /// </summary>
    [Parameter]
    public EventCallback<string?> ValueChanged { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 更新绑定值的回调。</para>
    /// <para lang="en">Gets or sets a callback that updates the bound value.</para>
    /// </summary>
    [Parameter]
    public Func<string?, Task>? OnValueChanged { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示行号 默认 false</para>
    /// <para lang="en">Gets or sets whether to show line numbers. Default is false.</para>
    /// </summary>
    [Parameter]
    public bool ShowLineNo { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示只读 默认 false</para>
    /// <para lang="en">Gets or sets whether to show read-only. Default is false.</para>
    /// </summary>
    [Parameter]
    public bool IsReadonly { get; set; }

    private string? ClassString => CssBuilder.Default("code-editor")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        Language ??= "csharp";
        Theme ??= "vs";
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    /// <returns></returns>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (!firstRender)
        {
            await InvokeVoidAsync("monacoSetOptions", Id, new { Value, Theme, Language });
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override async Task InvokeInitAsync()
    {
        var options = new
        {
            Value,
            Language,
            Theme,
            LineNumbers = ShowLineNo,
            ReadOnly = IsReadonly,
            StyleSheets = new List<string>()
            {
#if NET9_0_OR_GREATER
                Assets["_content/BootstrapBlazor.CodeEditor/monaco-editor/monaco.css"],
                Assets["_content/BootstrapBlazor.CodeEditor/code-editor.bundle.css"]
#else
                "_content/BootstrapBlazor.CodeEditor/monaco-editor/monaco.css",
                "_content/BootstrapBlazor.CodeEditor/code-editor.bundle.css"
#endif
            }
        };
        await InvokeVoidAsync("init", Id, Interop, options);
    }

    /// <summary>
    /// <para lang="zh">使代码编辑器获得焦点。</para>
    /// <para lang="en">Sets focus to the code editor.</para>
    /// </summary>
    public async Task Focus() => await InvokeVoidAsync("focus");

    /// <summary>
    /// <para lang="zh">重新计算代码编辑器的布局。</para>
    /// <para lang="en">Recalculates the layout of the code editor.</para>
    /// </summary>
    public async Task Resize() => await InvokeVoidAsync("resize");

    /// <summary>
    /// <para lang="zh">在当前光标位置插入文本，替换当前选定内容。</para>
    /// <para lang="en">Inserts text at the current cursor position, replacing the current selection.</para>
    /// </summary>
    /// <param name="data"></param>
    public async Task InsertTextAsync(string data) => await InvokeVoidAsync("insertText", Id, data);

    /// <summary>
    /// <para lang="zh">更新编辑器值并通知值变更回调。</para>
    /// <para lang="en">Updates the editor value and notifies the value change callbacks.</para>
    /// </summary>
    /// <param name="value">The updated editor value.</param>
    [JSInvokable]
    public async Task UpdateValueAsync(string value)
    {
        Value = value;
        if (ValueChanged.HasDelegate)
        {
            await ValueChanged.InvokeAsync(Value);
        }
        if (OnValueChanged != null)
        {
            await OnValueChanged(Value);
        }
    }
}
