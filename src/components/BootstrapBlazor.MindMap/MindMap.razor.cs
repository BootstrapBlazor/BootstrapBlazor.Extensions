// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// 思维导图 MindMap
/// <para>JS 仓库 https://github.com/wanglin2/mind-map?wt.mc_id=DT-MVP-5004174</para>
/// </summary>
public partial class MindMap
{
    /// <summary>
    /// 获得/设置 组件布局类型 默认 LogicalStructure 逻辑结构图
    /// </summary>
    [Parameter]
    public EnumMindMapLayout Layout { get; set; } = EnumMindMapLayout.LogicalStructure;

    /// <summary>
    /// 获得/设置 组件主题 默认 DefaultTheme 主题
    /// </summary>
    [Parameter]
    public EnumMindMapTheme Theme { get; set; } = EnumMindMapTheme.Coffee;

    private string? ClassString => CssBuilder.Default("bb-mindmap")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// 获得/设置 初始数据
    /// </summary>
    [Parameter]
    public string? Data { get; set; }

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

        }
        else
        {
            await InvokeVoidAsync("update", Id, new { Layout, Theme });
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, Data, new { Layout, Theme });

    /// <summary>
    /// 执行指定不带返回值的 Javascript 方法
    /// </summary>
    /// <param name="methodName"></param>
    /// <param name="args"></param>
    public Task Execute(string methodName, params object?[]? args) => InvokeVoidAsync("execute", Id, methodName, args);

    /// <summary>
    /// 下载为文件
    /// </summary>
    public Task Export(string type = "png", bool download = true, string fileName = "temp", bool withConfig = true) => InvokeVoidAsync("exportAs", Id, type, download, fileName, withConfig);

    /// <summary>
    /// 容器尺寸变化后，需要调用该方法进行适应
    /// </summary>
    public Task Resize() => Execute("resize");

    /// <summary>
    /// 恢复到默认的变换
    /// </summary>
    public Task Reset() => InvokeVoidAsync("reset", Id);

    /// <summary>
    /// 缩放思维导图至适应画布
    /// </summary>
    public Task Fit() => InvokeVoidAsync("fit", Id);

    /// <summary>
    /// 缩放思维导图至适应画布
    /// </summary>
    public Task Scale(float rate) => InvokeVoidAsync("scale", Id, rate);

    /// <summary>
    /// 获取数据方法
    /// </summary>
    /// <param name="withConfig">获取的数据只包括节点树，如果传 true 则会包含主题、布局、视图等数据 默认 false</param>
    /// <returns></returns>
    public async Task<string?> GetData(bool withConfig = false) => await InvokeAsync<string?>("getData", Id, withConfig);

    /// <summary>
    /// 获取数据方法
    /// </summary>
    /// <param name="jsonData">思维导图结构数据 null 画布会显示空白</param>
    /// <returns></returns>
    public Task SetData(string jsonData) => InvokeVoidAsync("setData", Id, jsonData);

    /// <summary>
    /// 设置主题方法 
    /// </summary>
    /// <param name="theme"></param>
    /// <returns></returns>
    public Task SetTheme(EnumMindMapTheme theme) => Execute("setTheme", theme);

    /// <summary>
    /// 设置主题方法 
    /// </summary>
    /// <param name="layout"></param>
    /// <returns></returns>
    public Task SetLayout(EnumMindMapLayout layout) => Execute("setLayout", layout);
}
