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
    /// 获得/设置 Name 默认 null 未设置
    /// </summary>
    [Parameter]
    public string? Name { get; set; }

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

    /// <summary>
    /// 获得/设置 需要传递的数据
    /// </summary>
    [Parameter]
    public UniverSheetData? Data { get; set; }

    /// <summary>
    /// 获得/设置 Frame 加载页面传递过来的数据
    /// </summary>
    [Parameter]
    public Func<UniverSheetData?, Task<UniverSheetData?>>? OnPostDataAsync { get; set; }

    private string? ClassString => CssBuilder.Default("bb-univer-sheet")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private UniverSheetData? _lastData;

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
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, new { SheetName = Name, Theme, Lang, Plugins });

    /// <summary>
    /// 推送数据方法
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    public Task PushDataAsync(UniverSheetData? data) => InvokeVoidAsync("execute", Id, data);

    /// <summary>
    /// 由 JavaScript 调用
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task<UniverSheetData?> TriggerPostData(UniverSheetData data)
    {
        return OnPostDataAsync == null ? null : await OnPostDataAsync(data);
    }

    /// <summary>
    /// 获得/设置 页面加载完毕后回调方法
    /// </summary>
    [Parameter]
    public Func<Task>? OnReadyAsync { get; set; }

    /// <summary>
    /// 由 JavaScript 调用
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerLoaded()
    {
        if (OnReadyAsync != null)
        {
            await OnReadyAsync();
        }
    }
}
