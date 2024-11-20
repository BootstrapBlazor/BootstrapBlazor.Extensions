// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Options;
using System.Globalization;

namespace BootstrapBlazor.Components;

/// <summary>
/// Pre 组件
/// </summary>
public partial class MeiliSearchBox
{
    [Inject, NotNull]
    private IOptionsMonitor<MeiliSearchOptions>? Options { get; set; }

    /// <summary>
    /// 获得/设置 搜索框占位字符串 默认 null 取内置资源文件值
    /// </summary>
    [Parameter]
    public string? SearchBoxPlaceHolder { get; set; }

    /// <summary>
    /// 获得/设置 搜索框占位字符串 默认 null 取内置资源文件值
    /// </summary>
    [Parameter]
    public string? SearchStatus { get; set; }

    /// <summary>
    /// 获得/设置 搜索框结果占位字符串 默认 null 取内置资源文件值
    /// </summary>
    [Parameter]
    public string? SearchResultPlaceHolder { get; set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync()
    {
        return Task.CompletedTask;
    }
}
