// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.ComponentModel;
using System.Data;
using System.Diagnostics.CodeAnalysis;

namespace BootstrapBlazor.Components;
/// <summary>
/// 图片浏览器 Viewer  组件
/// </summary>
public partial class Viewer : IAsyncDisposable
{
    [Inject][NotNull] IJSRuntime? JSRuntime { get; set; }
    
    /// <summary>
    /// 使用内置图片DIV
    /// </summary>
    [Parameter] public bool UseBuiltinImageDiv { get; set; } = true;

    /// <summary>
    /// 图片列表
    /// </summary>
    [Parameter] public List<string> Images { get; set; } = new List<string>();

    /// <summary>
    /// 单图片
    /// </summary>
    [Parameter] public string? Src { get; set; }

    /// <summary>
    /// 图片名称列表
    /// </summary>
    [Parameter] public List<string>? Alts { get; set; }

    /// <summary>
    /// 组件初始化参数
    /// </summary>
    [Parameter] public ViewerOptions Options { get; set; } = new ViewerOptions();

    /// <summary>
    /// 简化版工具条
    /// </summary>
    [Parameter] public bool? toolbarlite { get; set; }

    /// <summary>
    /// 高
    /// </summary>
    [Parameter] public string? Height { get; set; } = "400px";

    /// <summary>
    /// 宽
    /// </summary>
    [Parameter] public string? Width { get; set; } = "400px";

    /// <summary>
    /// 组件ID
    /// </summary>
    [Parameter] public string? ID { get; set; }

    /// <summary>
    /// 图片流列表
    /// </summary>
    [Parameter] public List<Stream> ImagesStream { get; set; } = new List<Stream>();

    /// <summary>
    /// 单图片流
    /// </summary>
    [Parameter] public Stream? SrcStream { get; set; }

    /// <summary>
    /// 使用流读取本地图片
    /// </summary>
    [Parameter] public bool LocalFileToStream { get; set; }

    /// <summary>
    /// 列表为空自动显示默认图片
    /// </summary>
    [Parameter] public bool ShowDefaultPhotos { get; set; }


    private IJSObjectReference? Module { get; set; }

    protected override void OnInitialized()
    {
        Options ??= new ViewerOptions();

        if (toolbarlite != null) Options.toolbarlite = toolbarlite.Value;

        if (!string.IsNullOrEmpty(ID)) Options.id = ID; else Options.id = Guid.NewGuid().ToString();

        if (LocalFileToStream && !Images.Any())
        {
            Images.ForEach(src => Images.Add(PopulateImageFromStream(File.OpenRead(src))));
        }

        Images ??= new List<string>();

        if (SrcStream != null)
        {
            Images.Add(PopulateImageFromStream(SrcStream));
        }
        if (ImagesStream != null)
        {
            ImagesStream.ForEach(stream => Images.Add(PopulateImageFromStream(stream)));
        }
        if (Src != null)
        {
            Images.Add(!LocalFileToStream ? Src : PopulateImageFromStream(File.OpenRead(Src)));
        }
        else if (ShowDefaultPhotos && !Images.Any())
        {
            for (int i = 1; i <= 9; i++)
            {
                Images.Add("./_content/BootstrapBlazor.Viewer/logo.png");
            }
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.Viewer/lib/viewerjs/viewerjs.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
            await Module.InvokeVoidAsync("initOptions", Options);
        }
    }

    public async Task OnOptionsChanged(ViewerOptions options) => await Module!.InvokeVoidAsync("initOptions", options);

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (Module is not null)
        {
            await Module.InvokeVoidAsync("destroy", Options);
            await Module.DisposeAsync();
        }
    }

    private string PopulateImageFromStream(Stream stream)
    {
        MemoryStream ms = new MemoryStream();
        stream.CopyTo(ms);
        byte[] byteArray = ms.ToArray();
        var b64String = Convert.ToBase64String(byteArray);
        return "data:image/png;base64," + b64String;
    }

}
