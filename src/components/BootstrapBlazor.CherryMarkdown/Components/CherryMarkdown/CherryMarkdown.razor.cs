﻿// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.Globalization;

namespace BootstrapBlazor.Components;

/// <summary>
/// CherryMarkdown 组件
/// </summary>
public partial class CherryMarkdown
{
    /// <summary>
    /// 获得/设置 编辑器设置
    /// </summary>
    [Parameter]
    public EditorSettings? EditorSettings { get; set; }

    /// <summary>
    /// 获得/设置 工具栏设置
    /// </summary>
    [Parameter]
    public ToolbarSettings? ToolbarSettings { get; set; }

    /// <summary>
    /// 获得/ 设置 是否使用 Katex 渲染数学公式 默认 true
    /// </summary>
    [Parameter]
    public bool IsSupportMath { get; set; } = true;

    private string? _lastValue;
    /// <summary>
    /// 获得/设置 组件值
    /// </summary>
    [Parameter]
    public string? Value { get; set; }

    /// <summary>
    /// 获得/设置 组件值回调
    /// </summary>
    [Parameter]
    public EventCallback<string?> ValueChanged { get; set; }

    /// <summary>
    /// 获得/设置 组件 Html 代码
    /// </summary>
    [Parameter]
    public string? Html { get; set; }

    /// <summary>
    /// 获得/设置 组件 Html 代码回调
    /// </summary>
    [Parameter]
    public EventCallback<string?> HtmlChanged { get; set; }

    /// <summary>
    /// 获得/设置 Markdown组件内上传文件时回调此方法
    /// </summary>
    [Parameter]
    public Func<CherryMarkdownUploadFile, Task<string>>? OnFileUpload { get; set; }

    /// <summary>
    /// 获取/设置 组件是否为浏览器模式
    /// </summary>
    [Parameter]
    public bool IsViewer { get; set; }

    /// <summary>
    /// 获取/设置 组件语言
    /// </summary>
    [Parameter]
    public string? Language { get; set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        if (string.IsNullOrEmpty(Language))
        {
            Language = CultureInfo.CurrentUICulture.Name;
        }
    }

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

        if (Value != _lastValue)
        {
            _lastValue = Value;
            await InvokeVoidAsync("update", Id, Value);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop,
        new { Value, IsSupportMath, IsViewer, Locale = Language, Editor = EditorSettings ?? new(), Toolbars = ToolbarSettings ?? new() },
        nameof(Upload));

    /// <summary>
    /// 文件上传回调
    /// </summary>
    /// <param name="uploadFile"></param>
    [JSInvokable]
    public async Task<string> Upload(CherryMarkdownUploadFile uploadFile)
    {
        var ret = "";
        if (Module != null)
        {
            var stream = await InvokeAsync<IJSStreamReference>("fetch", Id);
            if (stream != null)
            {
                using var data = await stream.OpenReadStreamAsync();
                uploadFile.UploadStream = data;
                if (OnFileUpload != null)
                {
                    ret = await OnFileUpload(uploadFile);
                }
            }
        }
        return ret;
    }

    /// <summary>
    /// 更新组件值方法
    /// </summary>
    /// <param name="values"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task Update(string[] values)
    {
        if (values.Length == 2)
        {
            var hasChanged = !EqualityComparer<string>.Default.Equals(values[0], Value);
            if (hasChanged)
            {
                Value = values[0];
                _lastValue = Value;

                if (ValueChanged.HasDelegate)
                {
                    await ValueChanged.InvokeAsync(Value);
                }
            }

            hasChanged = !EqualityComparer<string>.Default.Equals(values[1], Html);
            if (hasChanged)
            {
                Html = values[1];
                if (HtmlChanged.HasDelegate)
                {
                    await HtmlChanged.InvokeAsync(Html);
                }
            }
        }
    }

    /// <summary>
    /// 执行方法
    /// </summary>
    /// <param name="method"></param>
    /// <param name="parameters"></param>
    /// <returns></returns>
    public Task DoMethodAsync(string method, params object[] parameters) => InvokeVoidAsync("invoke", Id, method, parameters);
}
