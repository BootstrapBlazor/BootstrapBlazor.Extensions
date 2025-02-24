// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// UniverSheet 组件
/// </summary>
public partial class UniverSheet
{
    /// <summary>
    /// 获得/设置 插件集合 默认 null 未设置
    /// </summary>
    [Parameter]
    public Dictionary<string, string>? Plugins { get; set; }

    /// <summary>
    /// 获得/设置 主题颜色 默认 null 未设置
    /// </summary>
    [Parameter]
    public string? Theme { get; set; }

    /// <summary>
    /// 获得/设置 语言 默认 null 未设置
    /// </summary>
    [Parameter]
    public string? Lang { get; set; }

    private string? ClassString => CssBuilder.Default("bb-univer-sheet w-100 h-100")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, new { Theme, Lang, Plugins });
}
