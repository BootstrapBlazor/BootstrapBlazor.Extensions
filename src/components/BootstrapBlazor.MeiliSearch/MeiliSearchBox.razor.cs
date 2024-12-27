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
    /// 获得/设置 搜索框占位字符串 默认 null
    /// </summary>
    [Parameter]
    public string? SearchBoxPlaceHolder { get; set; }

    /// <summary>
    /// 获得/设置 正在搜索字符串 默认 null
    /// </summary>
    [Parameter]
    public string? SearchingText { get; set; }

    /// <summary>
    /// 获得/设置 搜索字结果符串 默认 null
    /// </summary>
    [Parameter]
    public string? SearchResultText { get; set; }

    /// <summary>
    /// 获得/设置 搜索框占位字符串 默认 null
    /// </summary>
    [Parameter]
    public string? LogoText { get; set; }

    /// <summary>
    /// 获得/设置 是否显示 Logo 文字 默认 true
    /// </summary>
    [Parameter]
    public bool ShowLogoText { get; set; } = true;

    /// <summary>
    /// 获得/设置 搜索框结果占位字符串 默认 null
    /// </summary>
    [Parameter]
    public string? SearchResultPlaceHolder { get; set; }

    /// <summary>
    /// 获得/设置 是否显示搜索结果 默认 true
    /// </summary>
    [Parameter]
    public bool ShowSearchResult { get; set; } = true;

    /// <summary>
    /// 获得/设置 是否显示 Footer 默认 true
    /// </summary>
    [Parameter]
    public bool ShowFooter { get; set; } = true;

    /// <summary>
    /// 获得/设置 是否显示键盘提示信息
    /// </summary>
    [Parameter]
    public bool ShowKeyboardTips { get; set; } = true;

    /// <summary>
    /// 获得/设置 无搜索框结果占位字符串 默认 null
    /// </summary>
    [Parameter]
    public string? EmptySearchResultPlaceHolder { get; set; }

    /// <summary>
    /// 获得/设置 滚动效果 <see cref="ScrollIntoViewOptions"/> 实例 默认 null
    /// </summary>
    [Parameter]
    public ScrollIntoViewOptions? ScrollIntoViewOptions { get; set; }

    /// <summary>
    /// 获得/设置 搜索列集合 默认 null 未设置
    /// </summary>
    [Parameter]
    public List<string>? SearchableColumns { get; set; }

    /// <summary>
    /// 获得/设置 回车按键提示文本信息 默认 to Select
    /// </summary>
    [Parameter]
    public string? EnterKeyText { get; set; }

    /// <summary>
    /// 获得/设置 箭头按键提示文本信息 默认 to Navigate
    /// </summary>
    [Parameter]
    public string? ArrowKeyText { get; set; }

    /// <summary>
    /// 获得/设置 Esc 按键提示文本信息 默认 to Close
    /// </summary>
    [Parameter]
    public string? EscKeyText { get; set; }

    /// <summary>
    /// 获得/设置 Footer 模板
    /// </summary>
    [Parameter]
    public RenderFragment? FooterTemplate { get; set; }

    private string? ClassString => CssBuilder.Default("bb-g-search d-none")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        SearchBoxPlaceHolder ??= "Search";
        SearchingText ??= "Searching";
        SearchResultText ??= "Found {0} results in {1}ms";
        LogoText ??= "Powered by BootstrapBlazor";
        SearchResultPlaceHolder ??= "Type something to search";
        EmptySearchResultPlaceHolder ??= "No recent searches";
        EnterKeyText ??= "to Select";
        ArrowKeyText ??= "to Navigate";
        EscKeyText ??= "to Close";
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, new
    {
        Options.CurrentValue?.Url,
        Options.CurrentValue?.ApiKey,
        Index = $"{Options.CurrentValue?.Index}-{CultureInfo.CurrentUICulture.Name}",
        SearchableColumns,
        ScrollIntoViewOptions,
        EmptySearchResultPlaceHolder,
        SearchingText,
        SearchResultText
    });
}
