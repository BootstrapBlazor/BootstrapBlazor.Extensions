// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Diagnostics.CodeAnalysis;
using System.Text.RegularExpressions;

namespace BootstrapBlazor.Components;

/// <summary>
/// 视频播放器 ImageCropper 组件
/// </summary>
public partial class ImageCropper : IAsyncDisposable
{
    [NotNull]
    private IJSObjectReference? Module { get; set; }

    [Inject, NotNull]
    protected IJSRuntime? JSRuntime { get; set; }

    private DotNetObjectReference<ImageCropper>? Instance { get; set; }

    /// <summary>
    /// UI界面元素的引用对象
    /// </summary>
    private ElementReference Element { get; set; }

    /// <summary>
    /// 获得/设置 用于渲染的文件流,为空则用 FileName 参数读取文件
    /// </summary>
    [Parameter]
    public Stream? Stream { get; set; }

    private byte[]? streamCache { get; set; }

    /// <summary>
    /// 获得/设置 图片URL/Base64 dataurl
    /// </summary>
    [Parameter]
    public string? Url { get; set; }

    /// <summary>
    /// 确认按钮文本/Confirm button title
    /// </summary>
    [Parameter]
    public string ConfirmBtnTitle { get; set; } = "OK";

    /// <summary>
    /// 复位按钮文本/Reset button title
    /// </summary>
    [Parameter]
    public string ResetBtnTitle { get; set; } = "复位";

    /// <summary>
    /// 预览文本/Preview title
    /// </summary>
    [Parameter]
    public string PreviewTitle { get; set; } = "预览";

    /// <summary>
    /// 显示默认按钮/Show default button
    /// </summary>
    [Parameter]
    public bool DefaultButton { get; set; } = true;

    /// <summary>
    /// 显示剪裁后预览/Preview image afrer cropper 
    /// </summary>
    [Parameter]
    public bool Preview { get; set; } = true;

    /// <summary>
    /// 获得/设置 读取本地文件路径
    /// </summary> 
    [Parameter]
    public string? LocalFileName { get; set; }

    /// <summary>
    /// 自定义图片 CSS
    /// </summary>
    [Parameter]
    public string? CssClass { get; set; }

    /// <summary>
    /// 自定义CSS,,默认为内置 cropper.css
    /// </summary>
    [Parameter]
    public string? CssPath { get; set; } = "./_content/BootstrapBlazor.ImageCropper/cropper.css" + "?v=" + Ver;

    /// <summary>
    /// 自定义cropper.js路径,默认为null,使用内置 cropper.js
    /// </summary>
    [Parameter]
    public string? ModulePath { get; set; }

    /// <summary>
    /// 获得/设置 剪裁结果回调方法/Cropper result callback method
    /// </summary>
    [Parameter]
    public Func<Stream, Task>? OnResult { get; set; }

    /// <summary>
    /// 获得/设置 剪裁结果base64回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnBase64Result { get; set; }

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    private static string? Ver { get; set; } = System.Reflection.Assembly.GetExecutingAssembly().GetName().Version?.ToString();

    [NotNull]
    private string? Id { get; set; }
    private string? ErrorMessage { get; set; }

    [Parameter]
    public CropperOption Options { get; set; } = new();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();

        Id = $"vp_{GetHashCode()}";
    }

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
                ModulePath = ModulePath ?? $"./_content/BootstrapBlazor.ImageCropper/cropper.js" + "?v=" + Ver;

                await JSRuntime.InvokeAsync<IJSObjectReference>("import", ModulePath);

                Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.ImageCropper/ImageCropper.razor.js" + "?v=" + Ver);
                Instance = DotNetObjectReference.Create(this);
                await Module!.InvokeVoidAsync("init", Instance, Element, Options);
                //await Module!.InvokeVoidAsync("changeAvatar", Instance, Element);

            }
        }
        catch (Exception e)
        {
            OnError?.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 剪裁,返回 base64, 并执行 OnResult/OnBase64Result 回调
    /// </summary>
    /// <returns>base64</returns>
    public async Task<string> Crop()
    {
        var base64encodedstring = await Module!.InvokeAsync<string>("crop");
        await GetResult(base64encodedstring);
        return base64encodedstring;
    }

    /// <summary>
    /// 剪裁,返回 Stream
    /// </summary>
    /// <returns>Stream</returns>
    public async Task<Stream> CropToStream() => DataUrl2Stream(await Module!.InvokeAsync<string>("crop"));

    /// <summary>
    /// 替换图片
    /// </summary>
    /// <param name="url"></param>
    /// <returns></returns>
    public async Task Replace(string url) => await Module!.InvokeVoidAsync("replace", url);

    /// <summary>
    /// 使用新数据更改裁剪区域的位置和大小（基于原始图像）,注意：此方法仅在选项值viewMode大于或等于时可用1
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    public async Task SetData(object data) => await Module!.InvokeVoidAsync("setData", data);

    /// <summary>
    /// 更改拖动模式,可以通过双击裁剪器来切换“裁剪”和“移动”模式, 参数为可选 : 'none'，'crop'，'move'
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    public async Task SetDragMode(string? mode) => await Module!.InvokeVoidAsync("setDragMode", mode);

    /// <summary>
    /// 组件可用
    /// </summary>
    /// <returns></returns>
    public async Task Enable() => await Module!.InvokeVoidAsync("enable");

    /// <summary>
    /// 禁用组件
    /// </summary>
    /// <returns></returns>
    public async Task Disable() => await Module!.InvokeVoidAsync("disable");

    /// <summary>
    /// 复位图像
    /// </summary>
    /// <returns></returns>
    public async Task Reset() => await Module!.InvokeVoidAsync("reset");

    /// <summary>
    /// 清空图像
    /// </summary>
    /// <returns></returns>
    public async Task Clear() => await Module!.InvokeVoidAsync("clear");

    /// <summary>
    /// 销毁
    /// </summary>
    /// <returns></returns>
    public async Task Destroy() => await Module!.InvokeVoidAsync("destroy");

    /// <summary>
    /// 旋转, 90, 180, 270, -90 ...
    /// </summary>
    /// <param name="degree"></param>
    /// <returns></returns>
    public async Task Rotate(int degree) => await Module!.InvokeVoidAsync("rotate", degree);

    //[JSInvokable]
    public async Task GetResult(string base64encodedstring)
    {
        try
        {
            if (OnResult != null)
            {
                await OnResult.Invoke(DataUrl2Stream(base64encodedstring));
            }
            if (OnBase64Result != null)
            {
                await OnBase64Result.Invoke(base64encodedstring);
            }
        }
        catch (Exception e)
        {
            if (OnError != null)
            {
                await OnError.Invoke(e.Message);
            }
        }
    }

    /// <summary>
    /// 选择图片解码 / Select picture decoding
    /// </summary>
    /// <param name="dataUrl">可选直接解码 Base64, DataUrl 格式</param>
    /// <returns></returns>
    public async Task DecodeFromImage(string? dataUrl = null)
    {
        if (dataUrl != null && !dataUrl.StartsWith("data:image"))
        {
            dataUrl = "data:image/jpeg;base64," + dataUrl;
        }
        await Module!.InvokeVoidAsync("DecodeFormImage", dataUrl);
    }

    /// <summary>
    /// 从 DataUrl 转换为 Stream
    /// <para>Convert from a DataUrl to an Stream</para>
    /// </summary>
    /// <param name="base64encodedstring"></param>
    /// <returns></returns>
    public static Stream DataUrl2Stream(string base64encodedstring)
    {
        var base64Data = Regex.Match(base64encodedstring, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
        var bytes = Convert.FromBase64String(base64Data);
        var stream = new MemoryStream(bytes);
        return stream;
    }

    public virtual async Task Refresh()
    {
        ErrorMessage = null;
        try
        {
            if (Stream != null)
            {
                await ShowPdf(Stream);
            }
            else if (!string.IsNullOrEmpty(LocalFileName) && File.Exists(LocalFileName))
            {
                var streamLocal = new FileStream(LocalFileName, FileMode.Open, FileAccess.Read);
                if (streamLocal != null)
                {
                    await ShowPdf(streamLocal);
                }
                else
                {
                    ErrorMessage = "No data";
                }
            }
            else if (!string.IsNullOrEmpty(Url) && Url.StartsWith("http"))
            {
                var client = new HttpClient();
                var stream = await client.GetStreamAsync(Url);
                if (stream != null)
                {
                    await ShowPdf(stream);
                }
                else
                {
                    ErrorMessage = "No data";
                }
            }

        }
        catch (Exception e)
        {
            ErrorMessage = e.Message;
        }
        StateHasChanged();

    }


    /// <summary>
    /// 打开 stream
    /// </summary>
    public virtual async Task ShowPdf(Stream stream)
    {
        if (Module == null)
        {
            Stream = stream;
        }
        else
        {
            if (streamCache == null)
            {
                streamCache = new byte[stream.Length];
                stream.Read(streamCache, 0, (int)stream.Length);
            }
            if (streamCache != null)
            {
                Url = null;
                using var streamRef = new DotNetStreamReference(new MemoryStream(streamCache));
                await Module!.InvokeVoidAsync("showPdf", Url, Element, streamRef);
            }
        }
    }

    /// <summary>
    /// 错误回调方法
    /// </summary>
    /// <param name="error"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task GetError(string error)
    {
        if (OnError != null)
        {
            await OnError.Invoke(error);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    public async ValueTask DisposeAsync()
    {
        if (Module is not null)
        {
            await Module.InvokeVoidAsync("destroyMod");
            await Module.DisposeAsync();
        }
        GC.SuppressFinalize(this); 
    }

}
