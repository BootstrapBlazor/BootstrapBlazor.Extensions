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
/// 语音识别/合成
/// <para></para>
/// 浏览器兼容性提示：安卓基于浏览器API,仅可以工作在Google服务正常的设备上
/// <para></para>
/// Recordatorio de compatibilidad del navegador: Android se basa en la API basada en el navegador y solo puede funcionar en el dispositivo normal de Google Service
/// </remarks>
/// </summary>
public partial class WebSpeech : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    private IJSObjectReference? Module { get; set; }
    private DotNetObjectReference<WebSpeech>? Instance { get; set; }

    /// <summary>
    /// UI界面元素的引用对象
    /// </summary>
    public ElementReference Element { get; set; }

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// 获得/设置 识别完成回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnResult { get; set; }

    /// <summary>
    /// 获得/设置 状态信息回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnStatus { get; set; }

    /// <summary>
    /// 显示语音识别调试信息
    /// </summary>
    [Parameter]
    public bool ShowSpeechInfo { get; set; }

    public bool SpeechUndefined { get; set; }
    public bool IsBusy { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (firstRender)
            {
                Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.WebAPI/WebSpeech.razor.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
                Instance = DotNetObjectReference.Create(this);
                await InitWebapi();
            }
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    [JSInvokable]
    public async Task GetStatus(string val)
    {
        if (OnStatus != null) await OnStatus.Invoke(val);
    }

    [JSInvokable]
    public async Task GetResult(string val)
    {
        if (OnResult != null) await OnResult.Invoke(val);
    }

    [JSInvokable]
    public async Task GetError(string err)
    {
        if (err == "Speech undefined")
        {
            SpeechUndefined = true;
        }

        if (OnError != null) await OnError.Invoke(err);
    }

    /// <summary>
    /// 初始化语音
    /// </summary>
    public virtual async Task InitWebapi()
    {
        try
        {
            await Module!.InvokeVoidAsync("InitWebapi", Instance, Element);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 语音识别
    /// </summary>
    /// <returns></returns>
    public virtual async Task<string> SpeechRecognition(string? lang = "zh-CN", SpeechRecognitionOption? option = null)
    {
        option = option ?? new SpeechRecognitionOption();
        return await SpeechRecognition(lang, option.Continuous, option.InterimResults, option.MaxAlternatives);
    }

    /// <summary>
    /// 语音识别
    /// </summary>
    /// <param name="lang">设置当前的语言</param>
    /// <param name="continuous">每次识别返回连续结果，还是仅返回单个结果。默认为单个 false</param>
    /// <param name="interimResults">返回临时结果。默认为 false</param>
    /// <param name="maxAlternatives">返回结果数量。默认值为 1</param>
    /// <returns></returns>
    public virtual async Task<string> SpeechRecognition(string? lang = "zh-CN", bool continuous = false, bool interimResults = false, int maxAlternatives = 1)
    {
        try
        {
            return await Module!.InvokeAsync<string>("SpeechRecognition", Instance, lang ?? "zh-CN", continuous, interimResults, maxAlternatives);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
            return e.Message;
        }
    }

    /// <summary>
    /// 语音识别Demo
    /// </summary>
    /// <returns></returns>
    public virtual async Task<string> SpeechRecognitionDemo(string? lang = "zh-CN", SpeechRecognitionOption? option = null)
    {
        try
        {
            option = option ?? new SpeechRecognitionOption();
            return await Module!.InvokeAsync<string>("SpeechRecognitionDemo", Instance, lang ?? "zh-CN", option.Continuous, option.InterimResults);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
            return e.Message;
        }
    }

    /// <summary>
    /// 语音合成（文字转语音）
    /// </summary>
    /// <param name="text">文字</param>
    /// <param name="lang">语言</param>
    /// <returns></returns>
    public virtual async Task SpeechSynthesis(string text, SpeechSynthesisOption? option, string? lang = "zh-CN", string? voiceURI = null)
    {
        option = option ?? new SpeechSynthesisOption();
        await SpeechSynthesis(text, lang ?? "zh-CN", option.Rate, option.Picth, option.Volume, voiceURI);
    }

    /// <summary>
    /// 语音合成（文字转语音）
    /// </summary>
    /// <param name="text">文字</param>
    /// <param name="lang">语言</param>
    /// <param name="rate">速率, 范围可以在 0.1（最低）和 10（最高）之间</param>
    /// <param name="picth">音高,范围可以在 0（最低）和 2（最高）之间</param>
    /// <param name="volume">音量, 浮点数，介于 0（最低）和 1（最高）之间</param>
    /// <param name="voiceURI">语音引擎名称</param>
    /// <returns></returns>
    public virtual async Task SpeechSynthesis(string text, string? lang = "zh-CN", double rate = 1, double picth = 1, double volume = 1, string? voiceURI = null)
    {
        try
        {
            await Module!.InvokeVoidAsync("SpeechSynthesis", Instance, text, lang ?? "zh-CN", rate, picth, volume, voiceURI);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    public virtual async Task SpeechRecognitionStop()
    {
        try
        {
            var res = await Module!.InvokeAsync<bool>("SpeechRecognitionStop", Instance);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    public virtual async Task SpeechStop()
    {
        try
        {
            var res = await Module!.InvokeAsync<bool>("SpeechStop", Instance);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    public virtual async Task<bool> Speaking()
    {
        try
        {
            return await Module!.InvokeAsync<bool>("Speaking", Instance);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
        return false;
    }

    /// <summary>
    /// 状态
    /// </summary>
    /// <param name="msg"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task Busy(bool flag)
    {
        IsBusy = flag;
        if (OnIsBusy != null) await OnIsBusy.Invoke(flag);
    }

    /// <summary>
    /// 获得/设置 状态回调方法
    /// </summary>
    [Parameter]
    public Func<bool, Task>? OnIsBusy { get; set; }

    public virtual async Task<List<WebVoice>?> GetVoiceList(bool orderByName = false)
    {
        try
        {
            List<WebVoice> res = await Module!.InvokeAsync<List<WebVoice>>("GetVoiceList", Instance);
            var retry = 0;
            while ((res == null || res.Count == 0) && !SpeechUndefined)
            {
                await Task.Delay(200);
                res = await Module!.InvokeAsync<List<WebVoice>>("GetVoiceList", Instance);
                retry++;
                if (retry == 5 || SpeechUndefined)
                {
                    return null;
                }
            }
            try
            {
                return orderByName ? (res?.OrderByDescending(a => a.LocalService).ThenBy(a => a.Lang).ThenBy(a => a.Name).ToList()) : res;
            }
            catch (Exception)
            {
                return res;
            }
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke("GetVoiceList:" + e.Message);
        }
        return null;
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        Instance?.Dispose();
        if (Module is not null)
        {
            await Module.DisposeAsync();
        }
    }



}
