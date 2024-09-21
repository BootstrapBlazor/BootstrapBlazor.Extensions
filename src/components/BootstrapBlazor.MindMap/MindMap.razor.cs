// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BootstrapBlazor.Components;

/// <summary>
/// 思维导图 MindMap
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

    private MindMapOption OptionsCache { get; set; } = new();

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
    /// <param name="firstRender"></param>
    /// <returns></returns>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (firstRender)
            {
                DataCache = Data;
            }

            if (!firstRender && Module != null && DataCache != Data)
            {
                await Module!.InvokeVoidAsync("Init", Element, Data, Options);
                DataCache = Data;
            }
            else if (!firstRender && Module != null && OptionsCache != Options)
            {
                await Module!.InvokeVoidAsync("Init", Element, DataCache, Options);
            }

        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 下载为文件
    /// </summary>
    public virtual async Task Export(string Type = "png", bool IsDownload = true, string FileName = "temp", bool WithConfig = true)
    {
        await Module!.InvokeVoidAsync("Export", Instance, Type, IsDownload, FileName, WithConfig);
    }

    /// <summary>
    /// 获取数据
    /// </summary>
    public virtual async Task GetData(bool FullData = true)
    {
        await Module!.InvokeVoidAsync("GetData", Instance, FullData);
    }

    /// <summary>
    /// 导入数据
    /// </summary>
    public virtual async Task SetData(string JsonDataString)
    {
        try
        {
            await Module!.InvokeVoidAsync("SetData", JsonDataString);
        }
        catch
        {
        }
    }

    /// <summary>
    /// 复位
    /// </summary>
    public virtual async Task Reset()
    {
        try
        {
            await Module!.InvokeVoidAsync("Reset");
        }
        catch
        {
        }
    }

    /// <summary>
    /// 切换主题
    /// </summary>
    public virtual async Task SetTheme(EnumMindMapTheme theme)
    {
        try
        {
            Options.Theme = theme;
            await Module!.InvokeVoidAsync("SetTheme", theme);
        }
        catch
        {
        }
    }

    /// <summary>
    /// 切换布局
    /// </summary>
    public virtual async Task SetLayout(EnumMindMapLayout layout)
    {
        try
        {
            Options.Layout = layout;
            await Module!.InvokeVoidAsync("SetLayout", layout.ToString());
        }
        catch
        {
        }
    }

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
