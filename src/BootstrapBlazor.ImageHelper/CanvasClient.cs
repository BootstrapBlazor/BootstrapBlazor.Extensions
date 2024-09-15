// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BootstrapBlazor.ImageHelper;

public class CanvasClient : IAsyncDisposable
{
    private readonly IJSRuntime jsRuntime;
    private readonly ElementReference canvasElement;
    private IJSObjectReference? Module { get; set; }

    public CanvasClient(IJSRuntime jsRuntime,ElementReference canvasElement)
    {
        this.jsRuntime = jsRuntime;
        this.canvasElement = canvasElement;
    }


    public async Task DrawPixelsAsync(byte[] pixels)
    {
        Module ??= await jsRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.ImageHelper/ImageHelper.razor.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
        await Module!.InvokeVoidAsync("drawPixels", canvasElement, pixels);
    }


    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (Module is not null)
        {
            await Module.DisposeAsync();
        } 
    }
}

