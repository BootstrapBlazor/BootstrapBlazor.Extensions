// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Diagnostics.CodeAnalysis;

namespace BootstrapBlazor.Components;

/// <summary>
/// Geolocation 组件基类
/// <para></para>
/// 扩展阅读:Chrome中模拟定位信息，清除定位信息<para></para>
/// https://blog.csdn.net/u010844189/article/details/81163438
/// </summary>
public partial class Geolocations : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }


    /// <summary>
    /// 获得/设置 定位
    /// </summary>
    [Parameter]
    [NotNull]
    public string? GeolocationInfo { get; set; }

    /// <summary>
    /// 获得/设置 获取位置按钮文字 默认为 获取位置
    /// </summary>
    [Parameter]
    [NotNull]
    public string? GetLocationButtonText { get; set; } = "获取位置";

    /// <summary>
    /// 获得/设置 获取持续定位监听器ID
    /// </summary>
    [Parameter]
    public long? WatchID { get; set; }

    /// <summary>
    /// 获得/设置 获取移动距离追踪按钮文字 默认为 移动距离追踪
    /// </summary>
    [Parameter]
    [NotNull]
    public string? WatchPositionButtonText { get; set; } = "移动距离追踪";

    /// <summary>
    /// 获得/设置 获取停止追踪按钮文字 默认为 停止追踪
    /// </summary>
    [Parameter]
    [NotNull]
    public string? ClearWatchPositionButtonText { get; set; } = "停止追踪";

    /// <summary>
    /// 获得/设置 是否显示默认按钮界面
    /// </summary>
    [Parameter]
    public bool ShowButtons { get; set; } = true;

    /// <summary>
    /// UI界面元素的引用对象
    /// </summary>
    protected ElementReference Element { get; set; }

    /// <summary>
    /// 获得/设置 定位结果回调方法
    /// </summary>
    [Parameter]
    public Func<Geolocationitem, Task>? OnResult { get; set; }

    /// <summary>
    /// 获得/设置 状态更新回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnUpdateStatus { get; set; }

    /// <summary>
    /// 获得/设置 状态更新回调方法
    /// </summary>
    [Parameter]
    public GeolocationOptions Options { get; set; } = new();

    private IJSObjectReference? Module { get; set; }
    private DotNetObjectReference<Geolocations>? Instance { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (firstRender)
            {
                Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.Geolocation/Geolocations.razor.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
                Instance = DotNetObjectReference.Create(this);
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
            //await Module.InvokeVoidAsync("destroy");
            Instance!.Dispose();
            await Module.DisposeAsync();
        }
    }


    /// <summary>
    /// 获取定位
    /// </summary>
    public virtual async Task GetLocation()
    {
        try
        {
            await Module!.InvokeVoidAsync("getLocation", Instance, true, Options);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 持续定位
    /// </summary>
    public virtual async Task WatchPosition()
    {
        try
        {
            await Module!.InvokeVoidAsync("getLocation", Instance, false);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 持续定位
    /// </summary>
    public virtual async Task ClearWatch()
    {
        await Module!.InvokeVoidAsync("clearWatchLocation", Instance, WatchID);
        WatchID = null;
    }

    /// <summary>
    /// 定位完成回调方法
    /// </summary>
    /// <param name="geolocations"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task GetResult(Geolocationitem geolocations)
    {
        try
        {
            if (OnResult != null) await OnResult.Invoke(geolocations);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// 状态更新回调方法
    /// </summary>
    /// <param name="status"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task UpdateStatus(string status)
    {
        if (OnUpdateStatus != null) await OnUpdateStatus.Invoke(status);
    }

    /// <summary>
    /// 监听器ID回调方法
    /// </summary>
    /// <param name="watchID"></param>
    /// <returns></returns>
    [JSInvokable]
    public Task UpdateWatchID(long watchID)
    {
        WatchID = watchID;
        return Task.CompletedTask;
    }

}
