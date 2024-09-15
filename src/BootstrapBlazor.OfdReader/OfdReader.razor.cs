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
/// Blazor Ofd Reader Ofd阅读器 组件 
/// </summary>
public partial class OfdReader : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    [NotNull]
    private IJSObjectReference? Module { get; set; }

    /// <summary>
    /// UI界面元素的引用对象
    /// </summary>
    private ElementReference Element { get; set; } 

    /// <summary>
    /// 获得/设置 宽 单位(px|%) 默认 100%
    /// </summary>
    [Parameter]
    public string Width { get; set; } = "100%";

    /// <summary>
    /// 获得/设置 高 单位(px|%) 默认 500px
    /// </summary>
    [Parameter]
    public string Height { get; set; } = "700px";

    /// <summary>
    /// 获得/设置 组件外观 Css Style
    /// </summary>
    [Parameter]
    public string? StyleString { get; set; } 

    /// <summary>
    /// 获得/设置 浏览器路径
    /// </summary> 
    [Parameter]
    public string ViewerBase { get; set; } = "/_content/BootstrapBlazor.OfdReader/index.html";

    /// <summary>
    /// Debug
    /// </summary>
    [Parameter]
    public bool Debug { get; set; }

    string? ErrorMessage { get; set; }

    private string? Url { get; set; }

    private string? UrlDebug { get; set; }

    /// <summary>
    /// 获得/设置 Ofd文件URL
    /// </summary>
    [Parameter]
    public string? FileName { get; set; }

    string? fileNameCache { get; set; }

    /// <summary>
    /// 获得/设置 用于渲染的文件流,为空则用 FileName 参数读取文件
    /// </summary>
    [Parameter]
    public Stream? Stream { get; set; }

    private byte[]? streamCache { get; set; }

    /// <summary>
    /// 获得/设置 读取本地文件路径
    /// </summary> 
    [Parameter]
    public string? LocalFileName { get; set; }
    string? localFileNameCache { get; set; }

    /// <summary>
    /// 获得/设置 使用流化模式,可跨域读取文件. 默认为 false
    /// </summary>
    [Parameter]
    public bool StreamMode { get; set; }

    /// <summary>
    /// 获得/设置 'http' 开头自动使用流模式读取
    /// </summary> 
    [Parameter]
    public bool AutoStreamMode { get; set; } = true;


    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.OfdReader/app.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);

            await Refresh();
        }
    }


    private string GenUrl(bool filemode = true) => $"{ViewerBase}?file={(filemode ? FileName : "(1)")}";


    protected override async Task OnParametersSetAsync()
    {
        if (Module != null)
        {
            await Refresh();
        }
    }

    public virtual async Task Refresh()
    {
        ErrorMessage = null;
        try
        {
            if (Stream != null)
            {
                await ShowOfd(Stream);
            }
            else if (!string.IsNullOrEmpty(LocalFileName) && File.Exists(LocalFileName))
            {
                var streamLocal = new FileStream(LocalFileName, FileMode.Open, FileAccess.Read);
                if (streamLocal != null)
                {
                    await ShowOfd(streamLocal, fileNameCache != localFileNameCache, true);
                    localFileNameCache = LocalFileName;
                }
                else
                {
                    ErrorMessage = "No data";
                }
            }
            else if (!string.IsNullOrEmpty(FileName) && (StreamMode || (AutoStreamMode && FileName.StartsWith("http999"))))
            {
                var client = new HttpClient();
                var stream = await client.GetStreamAsync(FileName);
                if (stream != null)
                {
                    await ShowOfd(stream, fileNameCache != FileName);
                    fileNameCache = FileName;
                }
                else
                {
                    ErrorMessage = "No data";
                }
            }
            else
            {
                Url = GenUrl();
            }

        }
        catch (Exception e)
        {
            ErrorMessage = e.Message;
        }
        StateHasChanged();

    }
    public virtual async Task ShowOfd(Stream stream, bool forceLoad = true, bool islocalFile = false)
    {
        if (Module == null)
        {
            Stream = stream;
        }
        else if (islocalFile)
        {
            if (forceLoad)
            {
                streamCache = new byte[stream.Length];
                stream.Read(streamCache, 0, (int)stream.Length);
            }
            if (streamCache == null)
            {
                streamCache = new byte[stream.Length];
                stream.Read(streamCache, 0, (int)stream.Length);
            }
            if (streamCache != null)
            {
                Url = null;
                var url = GenUrl(false);
                UrlDebug = url;
                using var streamRef = new DotNetStreamReference(new MemoryStream(streamCache));
                await Module!.InvokeVoidAsync("showOfd", url, Element, streamRef);
            }
        }
        else
        {
            Url = null;
            var url = GenUrl(false);
            UrlDebug = url;
            using var streamRef = new DotNetStreamReference(stream);
            await Module!.InvokeVoidAsync("showOfd", url, Element, streamRef);
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
            await Module.DisposeAsync();
        }
        GC.SuppressFinalize(this);
    }


}




