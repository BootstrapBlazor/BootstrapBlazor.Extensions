// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;
using Microsoft.JSInterop;
using System.Diagnostics.CodeAnalysis;

namespace BootstrapBlazor.Components;
/// <summary>
/// 百度地图 BaiduMap 组件
/// </summary>
public partial class BaiduMap : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    [Inject] private IConfiguration? config { get; set; }

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// 获得/设置 BaiduKey<para></para>
    /// 为空则在 IConfiguration 服务获取 "BaiduKey" , 默认在 appsettings.json 文件配置
    /// </summary>
    [Parameter]
    public string? BaiduKey { get; set; }

    /// <summary>
    /// 获得/设置 style
    /// </summary>
    [Parameter]
    public string Style { get; set; } = "height:700px;width:100%;";

    /// <summary>
    /// 获得/设置 ID
    /// </summary>
    [Parameter]
    public string ID { get; set; } = "container";

    /// <summary>
    /// 获得/设置 定位结果回调方法
    /// </summary>
    [Parameter]
    public Func<BaiduItem, Task>? OnResult { get; set; }

    private IJSObjectReference? Module { get; set; }
    private DotNetObjectReference<BaiduMap>? Instance { get; set; }

    private string key = String.Empty;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            key = BaiduKey ?? (config?["BaiduKey"]) ?? "abcd";
            Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.BaiduMap/lib/baidu/baidumap.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
            Instance = DotNetObjectReference.Create(this);
            while (!(await Init()))
            {
                await Task.Delay(500);
            }
            //await Module!.InvokeVoidAsync("initMaps");
        }
    }

    public async Task<bool> Init() => await Module!.InvokeAsync<bool>("addScript", new object?[] { key, ID, null, null, null });

    public async Task ResetMaps() => await Module!.InvokeVoidAsync("resetMaps", ID);

    public async Task OnBtnClick(string btn) => await Module!.InvokeVoidAsync(btn);

    /// <summary>
    /// 获取定位
    /// </summary>
    public virtual async Task GetLocation()
    {
        try
        {
            await Module!.InvokeVoidAsync("geolocation", Instance);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }


    /// <summary>
    /// 定位完成回调方法
    /// </summary>
    /// <param name="geolocations"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task GetResult(BaiduItem geolocations)
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

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (Module is not null)
        {
            //await Module.InvokeVoidAsync("destroy", Options);
            await Module.DisposeAsync();
        }
    }

}
