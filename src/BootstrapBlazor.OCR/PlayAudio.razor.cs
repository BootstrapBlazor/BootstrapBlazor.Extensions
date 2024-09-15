// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************


using BootstrapBlazor.AzureServices;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;
using Microsoft.JSInterop;
using System.Diagnostics.CodeAnalysis;

namespace BootstrapBlazor.Components;

/// <summary>
/// PlayAudio 播放语音/文本转语音 组件
/// </summary>
public partial class PlayAudio : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    [Inject]
    [NotNull]
    private StsService? StsService { get; set; }

    [NotNull]
    private IJSObjectReference? Module { get; set; }

    /// <summary>
    /// UI界面元素的引用对象
    /// </summary>
    private ElementReference Element { get; set; }

    /// <summary>
    /// 语音名称, 默认 zh-HK-HiuGaaiNeural
    /// </summary>
    [Parameter]
    public string VoiceName { get; set; } = "zh-HK-HiuGaaiNeural";

    /// <summary>
    /// 语音风格, 默认 calm
    /// </summary>
    [Parameter]
    public string Style { get; set; } = "calm";

    /// <summary>
    /// 文本/SSML内容
    /// </summary>
    [Parameter]
    public string? TextOrSSML { get; set; }

    /// <summary>
    /// 数据流, 优先级高于 TextOrSSML
    /// </summary>
    [Parameter]
    public byte[]? Bytes { get; set; }

    [NotNull]
    [Inject]
    private IConfiguration? Config { get; set; }

    private string? ErrorMessage { get; set; }

    public bool Processing = false;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.OCR/audio.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
            await Task.Delay(100);
            await Play();
        }
    }

    public async Task Play()
    {
        if (Bytes != null)
        {
            await PlayAudioFileStream(Bytes);
        }
        else if (!string.IsNullOrEmpty(TextOrSSML))
        {
            await PlayAudioFromText();
        }
    }

    /// <summary>
    /// 播放数据流
    /// </summary>
    /// <param name="bytes"></param>
    /// <returns></returns>

    public async Task Play(byte[] bytes)
    {
        if (Module == null)
        {
            Bytes = bytes;
        }
        else
        {
            await PlayAudioFileStream(bytes);
        }
    }

    /// <summary>
    /// 播放文本
    /// </summary>
    /// <param name="textOrSSML"></param>
    /// <returns></returns>
    public async Task Play(string textOrSSML, string? voicename = null, string? style = null)
    {
        TextOrSSML = textOrSSML;
        VoiceName = voicename ?? VoiceName;
        Style = style ?? Style;

        if (Module != null)
        {
            await PlayAudioFromText();
        }

    }

    private async Task PlayAudioFileStream(byte[]? bytes)
    {
        if (bytes != null)
        {
            var stream = new MemoryStream(bytes);
            using var streamRef = new DotNetStreamReference(stream: stream);
            // 播放音频文件
            await Module.InvokeVoidAsync("PlayAudioFileStream", streamRef, Element);
        }
        else
        {
            ErrorMessage = "Error creating audio file.";
        }
        Processing = false;
        StateHasChanged();
    }

    private async Task PlayAudioFromText()
    {
        if (string.IsNullOrWhiteSpace(TextOrSSML))
        {
            return;
        }

        StateHasChanged();
        Processing = true;
        // 获取音频文件的字节流
        var bytes = await StsService.GetVoiceAsync(TextOrSSML, VoiceName, Style);
        await PlayAudioFileStream(bytes);
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
