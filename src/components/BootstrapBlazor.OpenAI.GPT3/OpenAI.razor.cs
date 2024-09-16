// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using BootstrapBlazor.OpenAI.Services;
using BootstrapBlazor.WebAPI.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;
using Microsoft.JSInterop;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;

namespace BootstrapBlazor.Components;

/// <summary>
/// Blazor OpenAI 组件 
/// </summary>
public partial class OpenAI : IAsyncDisposable
{
    [Inject]
    [NotNull]
    protected IStorage? Storage { get; set; }

    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    [NotNull]
    private IJSObjectReference? Module { get; set; }

    /// <summary>
    /// UI界面元素的引用对象
    /// </summary>
    private ElementReference Element { get; set; }

    private string ID { get; set; } = Guid.NewGuid().ToString("N");

    [NotNull]
    [Inject]
    private IConfiguration? Config { get; set; }

    [NotNull]
    [Inject]
    private OpenAiClientService? OpenaiService { get; set; }

    private string? ErrorMessage { get; set; }

    [DisplayName("问点什么")]
    private string? InputText { get; set; }

    private string? ResultText { get; set; }
    private string? ResultImage { get; set; }

    private string? PlaceHolderText { get; set; } = "问点什么,可选模型后再问我.";

    private int Lines { get; set; } = 0;

    [NotNull]
    private EnumOpenAiModel? SelectedEnumItem { get; set; } = EnumOpenAiModel.ChatGpt;

    [NotNull]
    private IEnumerable<SelectedItem> ItemsMaxToken { get; set; } = new[] {
        new SelectedItem("5", "5"),
        new SelectedItem("20", "20"),
        new SelectedItem("100", "100"),
        new SelectedItem("300", "300"),
        new SelectedItem("500", "500"),
        new SelectedItem("2000", "2000"),
        new SelectedItem("3000", "3000"),
        new SelectedItem("4000", "4000"),
        new SelectedItem("5000", "5000"),
        new SelectedItem("10000", "10000"),
        new SelectedItem("20000", "20000"),
    };

    private int SelectedMaxTokens { get; set; } = 500;

    [NotNull]
    private IEnumerable<SelectedItem> ItemsTemperature { get; set; } = new[] {
        new SelectedItem("0.1", "0.1"),
        new SelectedItem("0.2", "0.2"),
        new SelectedItem("0.5", "0.5"),
        new SelectedItem("0.6", "0.6"),
        new SelectedItem("0.7", "0.7"),
        new SelectedItem("0.8", "0.8"),
        new SelectedItem("0.9", "0.9"),
    };

    private float SelectedTemperature { get; set; } = 0.5f;

    [Parameter]
    public string? OpenAIKey { get; set; }

    /// <summary>
    /// 显示选项
    /// </summary>
    [Parameter]
    public bool ShowOptions { get; set; } = true;

    /// <summary>
    /// 设置/获取 是否语音识别/合成模块, 默认为 true
    /// </summary>
    [Parameter]
    public bool EnableSpeech { get; set; } = true;

    /// <summary>
    /// 设置/获取 语音合成使用的语言,默认中文普通话
    /// </summary>
    [Parameter]
    public string? SpeechLanguage { get; set; }

    /// <summary>
    /// 完成时生成的最大令牌数。默认值为 500<para></para>参数为空, 内置 SelectedMaxTokens 优先
    /// </summary>
    [Parameter]
    public int? MaxTokens { get; set; }

    /// <summary>
    /// 浮点数，控制模型的输出的多样性。值越高，输出越多样化。值越低，输出越简单。默认值为 0.5<para></para>参数为空, 内置 SelectedTemperature 优先
    /// </summary>
    [Parameter]
    public float? Temperature { get; set; }

    #region SpeechRecognition

    [NotNull]
    private WebSpeech? WebSpeech { get; set; }

    private SpeechRecognitionOption Options { get; set; } = new SpeechRecognitionOption() { Continuous = false, InterimResults = true };
    private SpeechSynthesisOption OptionsTTS { get; set; } = new SpeechSynthesisOption();

    /// <summary>
    /// 语音识别使用的语言,默认中文普通话
    /// </summary>
    [NotNull]
    private EnumWebVoiceLanguage? EnumSpeechRecognLanguage { get; set; } = EnumWebVoiceLanguage.zh_CN;

    /// <summary>
    /// 语音识别使用的语言,默认中文普通话
    /// </summary>
    [DisplayName("识别语言")]
    private string SpeechRecognLanguage { get; set; } = "zh-CN";

    /// <summary>
    /// 语音合成使用的语言,默认中文普通话
    /// </summary>
    private string? PlayLanguage { get; set; }

    [DisplayName("连续对话(2s)")]
    private bool SpeechRecognContinuous { get; set; } = true;

    [DisplayName("识别语音后自动发送")]
    private bool AutoSent { get; set; } = true;

    [DisplayName("朗读")]
    private bool AutoSpeak { get; set; } = true;

    [DisplayName("单行输入/多行输入")]
    private bool SingleLine { get; set; } = false;

    [DisplayName("自适应多行输入")]
    private bool AutoMultiLine { get; set; } = true;

    [DisplayName("内容")]
    private string? SpeakText { get; set; }

    private List<WebVoice>? WebVoiceList { get; set; }

    private bool IsInited { get; set; }

    private BreakPoint Size { get; set; }

    private bool IsSpeechEnableWithClick { get; set; }

    #endregion

    public override async Task SetParametersAsync(ParameterView parameters)
    {
        if (parameters.TryGetValue<string>(nameof(OpenAIKey), out var value))
        {
            OpenAIKey = value ?? Config["OpenAIKey"];
            OpenaiService.Init(OpenAIKey);
        }
        SpeechRecognLanguage = SpeechLanguage ?? "zh-CN";
        await base.SetParametersAsync(parameters);
    }


    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.OpenAI/app.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);

            SelectedMaxTokens = await Storage.GetValue("AiMaxTokens", SelectedMaxTokens);
            SelectedTemperature = await Storage.GetValue("AiTemperature", SelectedTemperature);

            SpeechRecognLanguage = await Storage.GetValue("SpeechRecognLanguage", SpeechRecognLanguage) ?? "zh-CN";

            if (Enum.TryParse(SpeechRecognLanguage.Replace("-", "_"), out EnumWebVoiceLanguage lang))
            {
                EnumSpeechRecognLanguage = lang;
            }

            SpeechRecognContinuous = await Storage.GetValue("SpeechRecognContinuous", SpeechRecognContinuous);
            AutoSent = await Storage.GetValue("SpeechAutoSent", AutoSent);
            AutoSpeak = await Storage.GetValue("SpeechAutoSpeak", AutoSpeak);
            Options.Continuous = await Storage.GetValue("SpeechContinuous", Options.Continuous);
            Options.InterimResults = await Storage.GetValue("SpeechInterimResults", Options.InterimResults);
            PlayLanguage = await Storage.GetValue("PlayLanguage", PlayLanguage);
            OptionsTTS.Rate = await Storage.GetValue("PlayRate", OptionsTTS.Rate);
            OptionsTTS.Picth = await Storage.GetValue("PlayPicth", OptionsTTS.Picth);
            OptionsTTS.Volume = await Storage.GetValue("PlayVolume", OptionsTTS.Volume);
            SingleLine = await Storage.GetValue("SingleLine", SingleLine);
            AutoMultiLine = await Storage.GetValue("AutoMultiLine", AutoMultiLine);

            await OnAfterRenderAsyncSpeech(firstRender);

            IsInited = true;
        }
    }

    private async Task OnEnter()
    {
        var val = InputText;
        if (string.IsNullOrWhiteSpace(val))
        {
            return;
        }

        Lines++;
        if (Lines > 20)
        {
            ResultText = string.Empty;
            Lines = 1;
        }
        ResultText += ($"Q: {val}{Environment.NewLine}");
        InputText = string.Empty;
        PlaceHolderText = "思考中...";
        ResultImage = null;
        string? res;
        switch (SelectedEnumItem)
        {
            default:
                ResultText += "[ChatGpt]" + Environment.NewLine;
                await UpdateUI();
                res = await OpenaiService.ChatGPT(val, MaxTokens ?? SelectedMaxTokens, Temperature ?? SelectedTemperature);
                break;
            case EnumOpenAiModel.ChatGpt4:
                ResultText += "[ChatGpt4]" + Environment.NewLine;
                await UpdateUI();
                res = await OpenaiService.ChatGPT(val, MaxTokens ?? SelectedMaxTokens, Temperature ?? SelectedTemperature, model: "gpt4");
                break;
            case EnumOpenAiModel.ChatGpt4_32k:
                ResultText += "[ChatGpt4 32k]" + Environment.NewLine;
                await UpdateUI();
                res = await OpenaiService.ChatGPT(val, MaxTokens ?? SelectedMaxTokens, Temperature ?? SelectedTemperature, model: "gpt4-32k");
                break;
            case EnumOpenAiModel.ChatGptAiHomeAssistant:
                ResultText += "[AiHomeAssistant]" + Environment.NewLine;
                await UpdateUI();
                res = await OpenaiService.ChatGPT(val, MaxTokens ?? SelectedMaxTokens, Temperature ?? SelectedTemperature, true);
                break;
            case EnumOpenAiModel.Completions:
                ResultText += "[Completions]" + Environment.NewLine;
                await UpdateUI();
                res = await OpenaiService.Completions(val, MaxTokens ?? SelectedMaxTokens, Temperature ?? SelectedTemperature);
                break;
            case EnumOpenAiModel.NaturalLanguageToSQL:
                ResultText += "[NaturalLanguageToSQL]" + Environment.NewLine;
                await UpdateUI();
                res = await OpenaiService.NaturalLanguageToSQL(val);
                break;
            case EnumOpenAiModel.Chatbot:
                ResultText += "[Chatbot]" + Environment.NewLine;
                await UpdateUI();
                res = await OpenaiService.Chatbot(val);
                break;
            case EnumOpenAiModel.ExtractingInformation:
                ResultText += "[ExtractingInformation]" + Environment.NewLine;
                await UpdateUI();
                res = await OpenaiService.ExtractingInformation(val);
                break;
            //case EnumOpenaiModdel.CompletionsStream:
            //    ResultText += "[Completions Stream]" + Environment.NewLine;
            //    await UpdateUI();
            //    res = await OpenaiService.CompletionsStream(val);
            //    break;
            case EnumOpenAiModel.DALLE:
                ResultText += "[DALL·E]" + Environment.NewLine;
                await UpdateUI();
                res = await OpenaiService.DALLE_CreateImage(val, false);
                if (res != null)
                {
                    if (res.StartsWith("http"))
                    {
                        var httpclient = new HttpClient();
                        var stream = await httpclient.GetStreamAsync(res);
                        ResultImage = res;
                    }
                    else
                    {
                        var imageDataUrl = $"data:image/jpg;base64,{res}";
                        ResultImage = imageDataUrl;
                    }
                    ResultText += Environment.NewLine;
                    res = string.Empty;
                }
                break;
        }

        if (res != null)
        {
            if (res.StartsWith("http"))
            {
                //var httpclient = new HttpClient();
                //var stream = await httpclient.GetStreamAsync(res);

                ResultImage = res;
                ResultText += (Environment.NewLine);
            }
            else if (res != string.Empty)
            {
                ResultText += ($"A: {res}{Environment.NewLine}");
                SpeakText = res;
                if (IsSpeechEnableWithClick && EnableSpeech && AutoSpeak)
                {
                    PlaceHolderText = "沟通中...";
                    await UpdateUI();
                    await SpeechSynthesis();
                }

            }
            ResultText += (Environment.NewLine);
            InputText = string.Empty;
            PlaceHolderText = "问点啥,可选模型后再问我.";

            if (IsSpeechEnableWithClick && EnableSpeech && SpeechRecognContinuous)
            {
                do
                {
                    PlaceHolderText = "叽叽咕咕...";
                    await UpdateUI();
                    await Task.Delay(2000);
                } while (await WebSpeech.Speaking());
                await OnTalk();
            }

        }
        else
        {
            PlaceHolderText = "AI开小差了. 重新问点什么吧,可选模型后再问我.";
            SpeakText = PlaceHolderText;
            if (IsSpeechEnableWithClick && EnableSpeech && AutoSpeak)
            {
                await SpeechSynthesis();
            }
        }
        await UpdateUI();
    }

    private async Task OnEnterAsync(string val)
    {
        await OnEnter();
    }

    /// <summary>
    /// 更新界面以及自动滚动
    /// </summary>
    /// <param name="scroll"></param>
    /// <returns></returns>
    private async Task UpdateUI(bool scroll = true)
    {
        StateHasChanged();
        if (!scroll) return;
        //await Module!.InvokeVoidAsync("AutoScrollTextarea", Element);
        await Module!.InvokeVoidAsync("AutoScrollTextareaByID", ID);
    }

    private Task OnEscAsync(string val)
    {
        InputText = string.Empty;
        return Task.CompletedTask;
    }

    private async Task OnClear()
    {
        ResultText = string.Empty;
        InputText = string.Empty;
        ResultImage = null;
        if (EnableSpeech) await OnStop();
    }

    #region SpeechRecognition

    private Task OnIsBusy(bool flag)
    {
        StateHasChanged();
        return Task.CompletedTask;
    }

    private async Task OnResult(string message)
    {
        InputText = message;
        StateHasChanged();
        if (AutoSent)
        {
            await Task.Delay(200);
            if (!WebSpeech.IsBusy)
                await OnEnter();
        }
    }

    private async Task OnError(string message)
    {
        ResultText += ($"Error: {message}{Environment.NewLine}");
        await UpdateUI();
    }

    private async Task OnTalk()
    {
        IsSpeechEnableWithClick = true;
        PlaceHolderText = "识别语音...";
        ResultText += ($"识别语音{(SpeechRecognLanguage == "zh-CN" ? "" : SpeechRecognLanguage)}...{Environment.NewLine}");
        await UpdateUI();
        await WebSpeech.SpeechRecognition(SpeechRecognLanguage, option: Options);
    }

    private async Task OnStop()
    {
        IsSpeechEnableWithClick = false;
        SpeechRecognContinuous = false;
        await WebSpeech.SpeechRecognitionStop();
        await SpeechStop();
    }

    private async Task SpeechSynthesis()
    {
        if (SpeakText != null) await WebSpeech.SpeechSynthesis(SpeakText, OptionsTTS, SpeechRecognLanguage, PlayLanguage);
    }

    private async Task SpeechStop() => await WebSpeech.SpeechStop();

    private async Task GetVoiceList()
    {
        WebVoiceList = await WebSpeech.GetVoiceList();
        if (WebVoiceList != null && WebVoiceList.Any()) StateHasChanged();
    }

    private async void OnSelectLangChange(ChangeEventArgs val)
    {
        if (val?.Value != null)
        {
            PlayLanguage = val.Value.ToString();
            await Storage.SetValue("PlayLanguage", PlayLanguage);
        }
    }
    private async Task OnPlayLanguageChanged(SelectedItem item)
    {
        if (IsInited)
        {
            SpeechRecognLanguage = item.Value?.ToString().Replace("_", "-") ?? SpeechRecognLanguage;
            await Storage.SetValue("SpeechRecognLanguage", SpeechRecognLanguage);
        }
    }

    private async Task OnPlay()
    {
        IsSpeechEnableWithClick = true;
        await WebSpeech.SpeechSynthesis(SpeakText ?? "我们一直与Blazor同行", OptionsTTS, SpeechRecognLanguage, PlayLanguage ?? WebVoiceList?.FirstOrDefault()?.VoiceURI);
    }
    protected async Task OnAfterRenderAsyncSpeech(bool firstRender)
    {

        if (firstRender)
        {
            await Task.Delay(500);
            await Task.Delay(1500);
            while (WebVoiceList == null || !WebVoiceList.Any())
            {
                await Task.Delay(100);
                await GetVoiceList();
                if (WebSpeech.SpeechUndefined)
                {
                    return;
                }
            }
        }
    }
    private Task OnBreakPointChanged(BreakPoint size)
    {
        Size = size;
        StateHasChanged();
        return Task.CompletedTask;
    }
    private Task OnValueChanged()
    {
        StateHasChanged();
        return Task.CompletedTask;
    }
    private bool IsBackdropOpen { get; set; }

    private void OpenDrawer()
    {
        IsBackdropOpen = !IsBackdropOpen;
    }
    private async Task Save()
    {
        IsBackdropOpen = false;
        await Storage.SetValue("AiMaxTokens", SelectedMaxTokens);
        await Storage.SetValue("AiTemperature", SelectedTemperature);
        await Storage.SetValue("SpeechRecognLanguage", SpeechRecognLanguage);
        await Storage.SetValue("SpeechRecognContinuous", SpeechRecognContinuous);
        await Storage.SetValue("SpeechAutoSent", AutoSent);
        await Storage.SetValue("SpeechAutoSpeak", AutoSpeak);
        await Storage.SetValue("SpeechContinuous", Options.Continuous);
        await Storage.SetValue("SpeechInterimResults", Options.InterimResults);
        await Storage.SetValue("PlayLanguage", PlayLanguage);
        await Storage.SetValue("PlayRate", OptionsTTS.Rate);
        await Storage.SetValue("PlayPicth", OptionsTTS.Picth);
        await Storage.SetValue("PlayVolume", OptionsTTS.Volume);
        await Storage.SetValue("SingleLine", SingleLine);
        await Storage.SetValue("AutoMultiLine", AutoMultiLine);

    }

    #endregion

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    public async ValueTask DisposeAsync()
    {
        await Save();
        if (Module is not null)
        {
            await Module.DisposeAsync();
        }
        GC.SuppressFinalize(this);
    }


}




