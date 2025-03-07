// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using BootstrapBlazor.ImageHelper;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Options;
using Microsoft.JSInterop;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Net.Http;

namespace BootstrapBlazor.Components.CV2;

/// <summary>
/// WxQrCode 微信扫码 组件基类
/// </summary>
public partial class Dnn : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    [Inject]
    [NotNull]
    private HttpClient? HttpClient { get; set; }

    private IJSObjectReference? Module { get; set; }

    private DotNetObjectReference<Dnn>? Instance { get; set; }

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

    private bool IsOpenCVReady { get; set; }
    private bool IsCameraBusy { get; set; }
    private string Status => IsCameraBusy ? "正在使用摄像头" : IsOpenCVReady ? "初始化完成" : "正在初始化...";
    private string? Message { get; set; }

    private bool FirstRender { get; set; } = true;

    [NotNull]
    private StorageService? Storage { get; set; }

    /// <summary>
    /// 选项
    /// </summary>
    [Parameter]
    public ImageHelperOption Options { get; set; } = new();

    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (!firstRender) return;
            Storage ??= new StorageService(JSRuntime);
            Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.ImageHelper/Dnn.razor.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
            Instance = DotNetObjectReference.Create(this);
            try
            {
                if (Options.SaveDeviceID)
                    Options.DeviceID = await Storage.GetValue("CamsDeviceID", Options.DeviceID);
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
            if (OnError != null) await OnError.Invoke(e.Message);
        }

    }

    protected override async Task OnParametersSetAsync()
    {
        if (FirstRender) return;
        await Apply();
    }

    [JSInvokable]
    public async Task GetReady()
    {
        IsOpenCVReady = true;
        StateHasChanged();
        if (OnResult != null)
            await OnResult.Invoke(Status);
    }

    [JSInvokable]
    public async Task GetCameraBusy(bool busy)
    {
        IsCameraBusy = busy;
        StateHasChanged();
        if (OnResult != null)
            await OnResult.Invoke(Status);
    }

    [JSInvokable]
    public async Task GetError(string err)
    {
        if (OnError != null) await OnError.Invoke(err);
    }

    /// <summary>
    /// </summary>
    /// <param name="options"></param>
    /// <returns></returns>
    public async Task<bool> Init(ImageHelperOption? options = null)
    {
        if (options != null)
            Options = options;

        try
        {
            await Module!.InvokeVoidAsync("init", Instance, Element, Options);
            if (OnResult != null)
                await OnResult.Invoke(Status);
        }
        catch (Exception ex)
        {
            Message = ex.Message;
            StateHasChanged();
            System.Console.WriteLine(ex.Message);
        }
        return IsOpenCVReady;
    }

    public virtual async Task Apply()
    {
        if (FirstRender) return;
        Message = string.Empty;
        try
        {
            await Module!.InvokeVoidAsync("apply", Instance, Element, Options);
        }
        catch (Exception ex)
        {
            Message = ex.Message;
            StateHasChanged();
            System.Console.WriteLine(ex.Message);
        }
    }

    //SSD MobileNet
    public virtual async Task ObjDetection()
    {
        if (FirstRender) return;
        Message = string.Empty;
        try
        {
            await Module!.InvokeVoidAsync("obj_detection", Instance, Element, Options);
        }
        catch (Exception ex)
        {
            Message = ex.Message;
            StateHasChanged();
            System.Console.WriteLine(ex.Message);
        }
    }

    public virtual async Task Camera()
    {
        if (FirstRender) return;
        Message = string.Empty;
        try
        {
            await Module!.InvokeVoidAsync("obj_detection_camera", Instance, Element, Options);
        }
        catch (Exception ex)
        {
            Message = ex.Message;
            StateHasChanged();
            System.Console.WriteLine(ex.Message);
        }
    }

    public virtual async Task FaceDetection()
    {
        if (FirstRender) return;
        Message = string.Empty;
        try
        {
            await Module!.InvokeVoidAsync("face_detection", Instance, Element, Options);
        }
        catch (Exception ex)
        {
            Message = ex.Message;
            StateHasChanged();
            System.Console.WriteLine(ex.Message);
        }
    }

    public virtual async Task SemanticSegmentation()
    {
        if (FirstRender) return;
        Message = string.Empty;
        try
        {
            await Module!.InvokeVoidAsync("semantic_segmentation", Instance, Element, Options);
        }
        catch (Exception ex)
        {
            Message = ex.Message;
            StateHasChanged();
            System.Console.WriteLine(ex.Message);
        }
    }

    public virtual async Task PoseEstimation()
    {
        if (FirstRender) return;
        Message = string.Empty;
        try
        {
            await Module!.InvokeVoidAsync("pose_estimation", Instance, Element, Options);
        }
        catch (Exception ex)
        {
            Message = ex.Message;
            StateHasChanged();
            System.Console.WriteLine(ex.Message);
        }
    }

    [JSInvokable]
    public async Task GetResult(string msg)
    {
        Message = msg;
        StateHasChanged();
        System.Console.WriteLine(msg);
        if (OnResult != null)
            await OnResult.Invoke(msg);
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
