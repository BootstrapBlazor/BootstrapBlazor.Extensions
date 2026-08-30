// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.Globalization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">JitViewer 组件</para>
/// <para lang="en">JitViewer component</para>
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.JitViewer/Components/JitViewer.razor.js", JSObjectReference = true)]
public partial class JitViewer
{
    /// <summary>
    /// <para lang="zh">预览文件路径</para>
    /// <para lang="en">File path for preview</para>
    /// </summary>
    [Parameter]
    public string? File { get; set; }

    /// <summary>
    /// <para lang="zh">预览文件显示名称</para>
    /// <para lang="en">File display name for preview</para>
    /// </summary>
    [Parameter]
    public string? FileName { get; set; }

    /// <summary>
    /// <para lang="zh">组件高度 默认未设置</para>
    /// <para lang="en">Component height, default is not set</para>
    /// </summary>
    [Parameter]
    public int? Height { get; set; }

    /// <summary>
    /// <para lang="zh">组件是否显示工具栏 默认 true</para>
    /// <para lang="en">Whether to show the toolbar, default is true</para>
    /// </summary>
    [Parameter]
    public bool ShowToolbar { get; set; } = true;

    /// <summary>
    /// <para lang="zh">组件主题 默认 auto 值列表 light/dark/auto</para>
    /// <para lang="en">Component theme, default is auto value list light/dark/auto</para>
    /// </summary>
    [Parameter]
    public string Theme { get; set; } = "auto";

    private string? ClassString => CssBuilder.Default("bb-jit-viewer")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private bool _invoke = false;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        _invoke = true;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            _invoke = false;
            return;
        }

        if (_invoke)
        {
            _invoke = false;
            await InvokeVoidAsync("update", Id, GetOptions());
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, GetOptions());

    private object GetOptions() => new
    {
        File = File,
        FileName = FileName,
        Height = Height ?? 600,
        Toolbar = ShowToolbar,
        Locale = CultureInfo.CurrentUICulture.Name,
        Theme = Theme
    };
}
