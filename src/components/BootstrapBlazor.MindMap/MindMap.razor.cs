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
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// 获得/设置 收到数据回调方法
    /// </summary>
    [Parameter]
    public Func<string?, Task>? OnReceive { get; set; }

    /// <summary>
    /// 自定义CSS/Custom CSS
    /// </summary>
    [Parameter]
    [NotNull]
    public string? StyleCss { get; set; }

    /// <summary>
    /// 获得/设置 显示内置UI
    /// </summary>
    [Parameter]
    public bool ShowUI { get; set; } = true;

    /// <summary>
    /// 选项
    /// </summary>
    [Parameter]
    public MindMapOption? Options { get; set; }

    private string? ClassString => CssBuilder.Default("bb-mindmap")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// 初始数据
    /// </summary>
    [Parameter]
    public MindMapNode Data { get; set; } = new MindMapNode
    {
        Data = new NodeData
        {
            Text = "根节点",
            Generalization = new Generalization
            {
                Text = "概要的内容"
            },
        }
    };

    private MindMapNode? DataCache { get; set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Data, Options);

    /// <summary>
    /// 下载为文件
    /// </summary>
    public Task Export(string type = "png", bool download = true, string fileName = "temp", bool withConfig = true) => InvokeVoidAsync("export", Id, type, download, fileName, withConfig);

    /// <summary>
    /// 获取数据
    /// </summary>
    public Task GetData(bool fullData = true) => InvokeVoidAsync("getData", Id, fullData);

    /// <summary>
    /// 导入数据
    /// </summary>
    public Task SetData(string jsonDataString) => InvokeVoidAsync("setData", Id, jsonDataString);

    /// <summary>
    /// 复位
    /// </summary>
    public Task Reset() => InvokeVoidAsync("reset", Id);

    /// <summary>
    /// 切换主题
    /// </summary>
    public Task SetTheme(EnumMindMapTheme theme) => InvokeVoidAsync("setTheme", Id, theme);

    /// <summary>
    /// 切换布局
    /// </summary>
    public Task SetLayout(EnumMindMapLayout layout) => InvokeVoidAsync("setLayout", Id, layout);

    /// <summary>
    /// 收到数据回调方法
    /// </summary>
    /// <param name="msg"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task ReceiveData(object? msg)
    {
        try
        {
            if (OnReceive != null && msg != null)
            {
                await OnReceive.Invoke(msg.ToString());
            }
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }
}
