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
/// 谷歌地图 Maps 组件
/// </summary>
public partial class Map : IAsyncDisposable
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
    /// 获得/设置 GoogleKey<para></para>
    /// 为空则在 IConfiguration 服务获取 "GoogleKey" , 默认在 appsettings.json 文件配置
    /// </summary>
    [Parameter]
    public string? GoogleKey { get; set; }

    /// <summary>
    /// 获得/设置 style
    /// </summary>
    [Parameter]
    public string Style { get; set; } = "height:700px;width:100%;";

    /// <summary>
    /// UI界面元素的引用对象
    /// </summary>
    private ElementReference Element { get; set; }

    private IJSObjectReference? Module { get; set; }
    private string key = String.Empty;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            key = GoogleKey ?? (config?["GoogleKey"]) ?? "abcd";
            Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.Maps/lib/google/map.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
            while (!(await Init()))
            {
                await Task.Delay(500);
            }

            //await Module.InvokeVoidAsync("initMaps"  );
        }
    }


    public async Task<bool> Init() => await Module!.InvokeAsync<bool>("addScript", new object?[] { key, Element, null, null, null });

    public async Task OnBtnClick() => await Module!.InvokeVoidAsync("addScript", new object?[] { key, Element, null, null, null });

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (Module is not null)
        {
            //await Module.InvokeVoidAsync("destroy", Options);
            await Module.DisposeAsync();
        }
    }
}
