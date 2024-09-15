// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Diagnostics.CodeAnalysis;
using System.Reflection.Metadata;
using UAParser;

namespace BootstrapBlazor.Components;

/// <summary>
/// WebApi 组件基类
/// </summary>
public partial class WebApi : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    private IJSObjectReference? Module { get; set; }

    private DotNetObjectReference<WebApi>? Instance { get; set; }
    private UAInfo? ClientInfo { get; set; }

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// 获得/设置 电池信息回调方法
    /// </summary>
    [Parameter]
    public Func<BatteryStatus, Task>? OnBatteryResult { get; set; }

    /// <summary>
    /// 获得/设置 浏览器信息回调方法
    /// </summary>
    [Parameter]
    public Func<UAInfo, Task>? OnUserAgentResult { get; set; }

    /// <summary>
    /// 显示调试信息
    /// </summary>
    [Parameter]
    public bool ShowInfo { get; set; }

    private string? UserAgents { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (firstRender)
            {
                Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.WebAPI/app.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
                Instance = DotNetObjectReference.Create(this);
                if (OnBatteryResult != null) await GetBattery();
                if (OnNetworkInfoResult != null) await GetNetworkInfo();
                if (OnUserAgentResult != null)
                {
                    var userAgent = await Module!.InvokeAsync<string>("getUserAgent");
                    var parser = Parser.GetDefault();
                    var clientInfo = parser.Parse(userAgent);
                    ClientInfo = new UAInfo(clientInfo.String, clientInfo.OS, clientInfo.Device, clientInfo.UA);
                    await OnUserAgentResult.Invoke(ClientInfo);
                    if (ShowInfo)
                    {
                        Console.WriteLine(userAgent);
                        UserAgents = userAgent;
                        StateHasChanged();
                    }
                }
            }
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (Module is not null)
        {
            await Module.DisposeAsync();
        }
    }

    /// <summary>
    /// 获取电量
    /// </summary>
    public virtual async Task GetBattery()
    {
        try
        {
            await Module!.InvokeVoidAsync("GetBattery", Instance);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 获取电池信息完成回调方法
    /// </summary>
    /// <param name="batteryStatus"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task GetBatteryResult(BatteryStatus batteryStatus)
    {
        try
        {
            if (OnBatteryResult != null) await OnBatteryResult.Invoke(batteryStatus);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }


    /// <summary>
    /// 获取网络信息
    /// </summary>
    public virtual async Task GetNetworkInfo()
    {
        try
        {
            await Module!.InvokeVoidAsync("GetNetworkInfo", Instance);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 获得/设置 网络信息回调方法
    /// </summary>
    [Parameter]
    public Func<NetworkInfoStatus, Task>? OnNetworkInfoResult { get; set; }

    /// <summary>
    /// 获取网络信息完成回调方法
    /// </summary>
    /// <param name="networkInfoStatus"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task GetNetworkInfoResult(NetworkInfoStatus networkInfoStatus)
    {
        try
        {
            if (OnNetworkInfoResult != null) await OnNetworkInfoResult.Invoke(networkInfoStatus);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 分享文本、链接甚至是文件到设备上安装的其他应用程序
    /// </summary>
    /// <param name="title">分享标题</param>
    /// <param name="text">分享文本</param>
    /// <param name="url">分享链接</param>
    /// <returns></returns>
    public virtual async Task Share(string title, string text, string url, string? files = null)
    {
        try
        {
            if (!string.IsNullOrWhiteSpace(files))
            {
                await Module!.InvokeVoidAsync("Share", title, text, url, files);
            }
            else
            {
                var txt = $@"navigator.share({{title: '{title}',  text: '{text}',  url: '{url}' }});";
                await JSRuntime.InvokeVoidAsync("eval", $"let discard ={txt}");
            }
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 检查屏幕的当前方向，甚至锁定到特定的方向
    /// </summary>
    /// <param name="screen"></param>
    /// <returns></returns>
    public virtual async Task<string> ScreenOrientation(Screen screen)
    {
        try
        {
            return await Module!.InvokeAsync<string>("ScreenOrientation", screen.ToString());
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
            return e.Message;
        }
    }

    /// <summary>
    /// 屏幕录屏开始
    /// </summary>
    /// <param name="screen"></param>
    /// <returns></returns>
    public virtual async Task ScreenRecordStart()
    {
        try
        {
            await Module!.InvokeVoidAsync("ScreenRecord", Instance, "start");
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 屏幕录屏结束
    /// </summary>
    /// <param name="uploadToServer"></param>
    /// <returns></returns>
    public virtual async Task<string> ScreenRecordStop(bool uploadToServer = false)
    {
        try
        {
            return await Module!.InvokeAsync<string>("ScreenRecord", Instance, "stop", uploadToServer);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
            return e.Message;
        }
    }

    /// <summary>
    /// 屏幕录屏支持格式
    /// </summary>
    /// <param name="screen"></param>
    /// <returns></returns>
    public virtual async Task<string[]?> ScreenRecordTypeSupported()
    {
        try
        {
            return await Module!.InvokeAsync<string[]>("ScreenRecord", Instance, "getTypeSupported");
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
            return null;
        }
    }


    /// <summary>
    /// 获得/设置 屏幕录像回调方法
    /// </summary>
    [Parameter]
    public Func<string, string, Task>? OnScreenRecordResult { get; set; }

    /// <summary>
    /// 获取屏幕录像完成回调方法
    /// </summary>
    /// <param name="blob"></param>
    /// <param name="extName"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task GetScreenRecordResult(string blob, string extName)
    {
        try
        {
            if (OnScreenRecordResult != null) await OnScreenRecordResult.Invoke(blob, extName);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    [JSInvokable]
    public async Task GetError(string err)
    {
        if (OnError != null) await OnError.Invoke(err);
    }

}
