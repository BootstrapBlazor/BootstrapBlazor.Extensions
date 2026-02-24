// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Localization;
using System.Globalization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">UniverSheet 组件</para>
/// <para lang="en">UniverSheet component</para>
/// </summary>
public partial class UniverSheet
{
    /// <summary>
    /// <para lang="zh">获得/设置 插件集合 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the plugin collection. Default is null.</para>
    /// </summary>
    [Parameter]
    public Dictionary<string, string>? Plugins { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 主题颜色 默认 null 未设置 可设置为 greenTheme</para>
    /// <para lang="en">Gets or sets the theme color. Default is null. Can be set to greenTheme.</para>
    /// </summary>
    [Parameter]
    public string? Theme { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否为暗黑模式 默认 null 未设置 自动</para>
    /// <para lang="en">Gets or sets whether dark mode is enabled. Default is null (auto).</para>
    /// </summary>
    [Parameter]
    public bool? IsDarkMode { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 语言 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the language. Default is null.</para>
    /// </summary>
    [Parameter]
    public string? Lang { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 工具栏样式 默认 default 未设置</para>
    /// <para lang="en">Gets or sets the ribbon toolbar style. Default is default.</para>
    /// </summary>
    [Parameter]
    public UniverSheetRibbonType RibbonType { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 需要传递的数据</para>
    /// <para lang="en">Gets or sets the data to pass.</para>
    /// </summary>
    [Parameter]
    public UniverSheetData? Data { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示加载遮罩 默认 true 显示遮罩</para>
    /// <para lang="en">Gets or sets whether to show loading mask. Default is true.</para>
    /// </summary>
    [Parameter]
    public bool ShowLoading { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 正在加载显示文本 默认 null 未设置读取资源文件</para>
    /// <para lang="en">Gets or sets the loading display text. Default is null, reads from resource file.</para>
    /// </summary>
    [Parameter]
    public string? LoadingText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 Frame 加载页面传递过来的数据回调方法</para>
    /// <para lang="en">Gets or sets the callback for data posted from the Frame loaded page.</para>
    /// </summary>
    [Parameter]
    public Func<UniverSheetData?, Task<UniverSheetData?>>? OnPostDataAsync { get; set; }

    [Inject, NotNull]
    private IStringLocalizer<UniverSheet>? Localizer { get; set; }

    private string? ClassString => CssBuilder.Default("bb-univer-sheet")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private UniverSheetData? _lastData;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();

        _lastData = Data;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        Lang ??= CultureInfo.CurrentUICulture.Name;
        LoadingText ??= Localizer[nameof(LoadingText)];
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (_lastData != Data)
        {
            _lastData = Data;
            await PushDataAsync(Data);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, new
    {
        Theme,
        Lang,
        Plugins,
        Data,
        DarkMode = IsDarkMode,
        RibbonType = RibbonType.ToDescriptionString()
    });

    /// <summary>
    /// <para lang="zh">推送数据方法</para>
    /// <para lang="en">Pushes data to the sheet.</para>
    /// </summary>
    /// <param name="data"></param>
    public Task<UniverSheetData?> PushDataAsync(UniverSheetData? data) => InvokeAsync<UniverSheetData>("execute", Id, data);

    /// <summary>
    /// <para lang="zh">由 JavaScript 调用</para>
    /// <para lang="en">Called by JavaScript.</para>
    /// </summary>
    /// <param name="data"></param>
    [JSInvokable]
    public async Task<UniverSheetData?> TriggerPostData(UniverSheetData data) => OnPostDataAsync == null
        ? null
        : await OnPostDataAsync(data);

    /// <summary>
    /// <para lang="zh">获得/设置 页面加载完毕后回调方法</para>
    /// <para lang="en">Gets or sets the callback method after page loading is complete.</para>
    /// </summary>
    [Parameter]
    public Func<Task>? OnReadyAsync { get; set; }

    /// <summary>
    /// <para lang="zh">由 JavaScript 调用</para>
    /// <para lang="en">Called by JavaScript.</para>
    /// </summary>
    [JSInvokable]
    public async Task TriggerReadyAsync()
    {
        if (OnReadyAsync != null)
        {
            await OnReadyAsync();
        }
    }
}
