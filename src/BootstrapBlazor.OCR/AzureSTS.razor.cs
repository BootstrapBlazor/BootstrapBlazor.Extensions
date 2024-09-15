// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************


using BootstrapBlazor.AzureServices;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;
using Microsoft.JSInterop;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using static BootstrapBlazor.AzureServices.Enums;

namespace BootstrapBlazor.Components;

/// <summary>
/// PlayAudio 文本转语音 组件
/// </summary>
public partial class AzureSTS : IAsyncDisposable
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

    [NotNull]
    private IEnumerable<SelectedItem> ItemsVoiceName { get; set; } = typeof(AzureVoiceName).EnumsToSelectedItem();

    [DisplayName("语音名称")]
    private AzureVoiceName SelectedVoiceName { get; set; } = AzureVoiceName.zh_CN_XiaoxiaoNeural;

    [NotNull]
    private IEnumerable<SelectedItem> ItemsVoiceStyle { get; set; } = typeof(AzureVoiceStyle).EnumsToSelectedItem();

    [DisplayName("风格")]
    private AzureVoiceStyle SelectedVoiceStyle { get; set; } = AzureVoiceStyle.calm;

    [NotNull]
    private IEnumerable<SelectedItem> ItemsSSML { get; set; } = Demos.ListToSelectedItem();

    [DisplayName("SSML内容")]
    private string ItemSSML { get; set; } = Demos.DemoSsml.First();

    [NotNull]
    [Inject]
    private IConfiguration? Config { get; set; }

    private string? ErrorMessage { get; set; }

    [DisplayName("问点啥")]
    private string? InputText { get; set; } = DateTime.Now.ToString("F");

    private string? PlaceHolderText { get; set; } = "文本转换语音,回车执行.";

    public bool Processing = false;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.OCR/audio.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
        }
    }


    private async Task OnEnterAsync(string val)
    {

        if (string.IsNullOrWhiteSpace(val))
        {
            return;
        }
        await LoadAudio(val);
    }

    private async Task LoadAudio(string? val)
    {
        if (string.IsNullOrWhiteSpace(val))
        {
            return;
        }

        PlaceHolderText = "工作中...";
        StateHasChanged();
        Processing = true;
        var SelectedVoice = SelectedVoiceName.GetEnumName();
        var SelectedStyle = AzureVoiceStyle.calm.ToString();

        // 获取音频文件的字节流
        var bytes = await StsService.GetVoiceAsync(val, SelectedVoice, SelectedStyle);
        await PlayAudioFileStream(bytes);
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
        PlaceHolderText = "文本转换语音,回车执行.";
        StateHasChanged();
    }

    private Task OnEscAsync(string val)
    {
        InputText = string.Empty;
        return Task.CompletedTask;
    }

    private async Task OnPlay()
    {
        await LoadAudio(InputText);
    }

    private async Task OnPlaySSML()
    {
        if (string.IsNullOrWhiteSpace(ItemSSML))
        {
            return;
        }

        PlaceHolderText = "工作中...";
        StateHasChanged();
        Processing = true;
        // 获取音频文件的字节流
        var bytes = await StsService.GetVoiceAsync(ItemSSML);
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
