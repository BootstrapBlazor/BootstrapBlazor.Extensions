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
/// DownloadBlob 组件基类
/// </summary>
public partial class DownloadBlob : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    private IJSObjectReference? Module { get; set; }

    private DotNetObjectReference<DownloadBlob>? Instance { get; set; }

    /// <summary>
    /// 获得/设置 错误回调方法 / Error callback method
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }


    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (firstRender)
            {
                Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.WebAPI/download.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
                Instance = DotNetObjectReference.Create(this);
            }
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 下载文件方法<para></para>通常，此方法用于相对较小的文件 (< 250 MB)
    /// </summary>
    /// <param name="fileName">文件名或者文件路径 | File name or the file path</param>
    /// <param name="memoryStream">数据流,为空则读取 <paramref name="fileName"/>, 默认为 null | data stream, if is null, read <paramref name="fileName"/>, default is null</param>
    /// <returns></returns>
    public virtual async Task<string> DownloadFileFromStream(string fileName, MemoryStream? memoryStream = null, bool isAndroid = false)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(fileName))
            {
                return "File name cannot be empty";
            }

            if (memoryStream == null && File.Exists(fileName))
            {
                memoryStream = new MemoryStream();
                using FileStream source = File.Open(fileName, FileMode.Open);
                source.CopyTo(memoryStream);
            }

            if (memoryStream != null)
            {
                using var streamRef = new DotNetStreamReference(stream: memoryStream);
                await Module!.InvokeVoidAsync(isAndroid ? "downloadFileFromStreamToDataUrl" : "downloadFileFromStream", Path.GetFileName(fileName), streamRef);
                return "OK";
            }
            else
            {
                return "Stream can not be empty";
            }

        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
            return e.Message;
        }
    }

    public virtual async Task DownloadFileFromURL(string fileName, string fileURL)
    {
        await Module!.InvokeVoidAsync("downloadFileFromUrl", fileName, fileURL);
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (Module is not null)
        {
            await Module.DisposeAsync();
        }
    }


}
