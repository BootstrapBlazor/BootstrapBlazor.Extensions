// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.ImageHelper;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace BootstrapBlazor.Components;

/// <summary>
/// ImageHelper 图像助手 组件基类
/// </summary>
public partial class ImageHelper : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    [Inject]
    [NotNull]
    private HttpClient? HttpClient { get; set; }

    private IJSObjectReference? Module { get; set; }
    private DotNetObjectReference<ImageHelper>? Instance { get; set; }

    /// <summary>
    /// UI界面元素的引用对象
    /// </summary>
    public ElementReference Element { get; set; }

    /// <summary>
    /// 消息回调方法/ message callback method
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnResult { get; set; }

    /// <summary>
    /// 错误回调方法/Error callback method
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// 检测到人脸回调方法/  face detection callback method
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnFaceDetection { get; set; }

    private bool IsOpenCVReady { get; set; }
    private string Status => IsOpenCVReady ? "初始化完成" : "正在初始化...";
    private string? Message { get; set; }

    private bool FirstRender { get; set; } = true;

    [NotNull]
    private StorageService? Storage { get; set; }

    /// <summary>
    /// 选项
    /// </summary>
    [Parameter]
    public ImageHelperOption Options { get; set; } = new();

    private ImageHelperOption? optionsCache;

    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    /// <summary>
    /// 单一功能
    /// </summary>
    [Parameter]
    public bool SingleFunction { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (!firstRender)
            {
                return;
            }

            Storage ??= new StorageService(JSRuntime);
            Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.ImageHelper/ImageHelper.razor.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
            Instance = DotNetObjectReference.Create(this);
            try
            {
                if (Options.SaveDeviceID)
                {
                    Options.DeviceID = await Storage.GetValue("CamsDeviceID", Options.DeviceID);
                }
            }
            catch (Exception)
            {
            }
            await Init();
            FirstRender = false;

        }
        catch (Exception e)
        {
            Message = e.Message;
            StateHasChanged();
            if (OnError != null)
            {
                await OnError.Invoke(e.Message);
            }
        }

    }

    protected override async Task OnParametersSetAsync()
    {
        if (FirstRender || optionsCache == Options)
        {
            return;
        }

        await Apply();
    }

    [JSInvokable]
    public async Task GetReady()
    {
        IsOpenCVReady = true;
        StateHasChanged();
        if (OnResult != null)
        {
            await OnResult.Invoke(Status);
        }
    }

    [JSInvokable]
    public async Task GetError(string err)
    {
        if (OnError != null)
        {
            await OnError.Invoke(err);
        }
        try
        {
            if (!string.IsNullOrEmpty(Options.DeviceID))
            {
                Options.DeviceID = null;
                await Storage.RemoveValue("CamsDeviceID");
                await Apply();
            }
        }
        catch
        {
        }
    }

    /// <summary>
    /// </summary>
    /// <param name="options"></param>
    /// <returns></returns>
    public async Task<bool> Init(ImageHelperOption? options = null)
    {
        if (options != null)
        {
            Options = options;
        }

        try
        {
            await Module!.InvokeVoidAsync("init", Instance, Element, Options);
            if (OnResult != null)
            {
                await OnResult.Invoke(Status);
            }
        }
        catch (Exception ex)
        {
            Message = ex.Message;
            StateHasChanged();
            System.Console.WriteLine(ex.Message);
        }
        return IsOpenCVReady;
    }

    public virtual async Task OnChanged(SelectedItem item)
    {
        await Apply();
    }

    public virtual async Task<string?> Apply(EnumImageHelperFunc func)
    {
        Options.Type = func;
        return await Apply();
    }

    public virtual async Task<string?> TakeFace()
    {
        Options.Type = EnumImageHelperFunc.FaceDetection1st;
        return await Apply(true);
    }

    public virtual async Task Stop()
    {
        await Module!.InvokeVoidAsync("stop");
    }

    public virtual async Task<string?> Apply(bool callback = false)
    {
        if (!callback && (FirstRender || Options.Type == EnumImageHelperFunc.None))
        {
            return null;
        }

        Message = string.Empty;
        optionsCache = Options;
        try
        {
            Options.EnableFaceDetectionCallBack = !callback && OnFaceDetection != null;
            var func = Options.Type.ToString().Substring(0, 1).ToLower() + Options.Type.ToString().Substring(1);
            //StateHasChanged();
            var res = await Module!.InvokeAsync<bool?>(func, Instance, Element, Options);
            if (callback)
            {
                if (res==true)
                {
                    var dataReference = await Module!.InvokeAsync<IJSStreamReference>("streamToDotNet");
                    using var dataReferenceStream = await dataReference.OpenReadStreamAsync(maxAllowedSize: 10_000_000);
                    using var memoryStream = new MemoryStream();
                    await dataReferenceStream.CopyToAsync(memoryStream);
                    var res1 = Encoding.UTF8.GetString(memoryStream.GetBuffer());
                    return res1;
                }
            }
        }
        catch (Exception ex)
        {
            Message = ex.Message;
            StateHasChanged();
            System.Console.WriteLine(ex.Message);
        }
        return null;
    }

    [JSInvokable]
    public async Task GetResult(string msg)
    {
        Message = msg;
        StateHasChanged();
        System.Console.WriteLine(msg);
        if (OnResult != null)
        {
            await OnResult.Invoke(msg);
        }
    }

    private bool isBusy;

    [JSInvokable()]
    public async Task GetFace()
    {
        if (OnFaceDetection != null)
        {
            if (isBusy)
            {
                Message = "忙碌中...";
                StateHasChanged();
                return;
            }
            isBusy = true;
            _ = Task.Run(async () =>
            {
                await Task.Delay(TimeSpan.FromSeconds(2));
                isBusy = false;
            });

            var dataReference = await Module!.InvokeAsync<IJSStreamReference>("streamToDotNet");
            using var dataReferenceStream = await dataReference.OpenReadStreamAsync(maxAllowedSize: 10_000_000);
            using var memoryStream = new MemoryStream();
            await dataReferenceStream.CopyToAsync(memoryStream);
            var res1 = Encoding.UTF8.GetString(memoryStream.GetBuffer());

            await OnFaceDetection.Invoke(res1);
            isBusy = false;

        }
    }

    /// <summary>
    /// 选择摄像头回调方法
    /// </summary>
    /// <param name="deviceID"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task SelectDeviceID(string deviceID)
    {
        try
        {
            if (Options.SaveDeviceID)
            {
                await Storage.SetValue("CamsDeviceID", deviceID);
            }
        }
        catch
        {
        }
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (Module is not null)
        {
            await Module.DisposeAsync();
        }
        Instance?.Dispose();
    }

}
