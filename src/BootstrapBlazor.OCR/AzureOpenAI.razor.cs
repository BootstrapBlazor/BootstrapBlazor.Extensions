// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

#if NET7_0_OR_GREATER
using AzureOpenAIClient.Http;
#endif

using BootstrapBlazor.AzureServices;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Configuration;
using Microsoft.JSInterop;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;

namespace BootstrapBlazor.Components;

/// <summary>
/// Blazor AzureOpenAI 组件 
/// </summary>
public partial class AzureOpenAI : IAsyncDisposable
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

    private string ID { get; set; } = Guid.NewGuid().ToString("N");

    [NotNull]
    [Inject]
    private IConfiguration? Config { get; set; }

#if NET7_0_OR_GREATER
    [NotNull]
    [Inject]
    private AzureOpenAIService? OpenaiService { get; set; }

    private CompletionResponse? Completion;
#endif

    /// <summary>
    /// 获得/设置 查询关键字
    /// </summary>
    [Parameter]
    public string? Search { get; set; }

    private string? ErrorMessage { get; set; }

    [DisplayName("问点啥")]
    private string? InputText { get; set; }

    private string? ResultText { get; set; }
    private string? ResultImage { get; set; }

    private string? PlaceHolderText { get; set; } = "问点啥,可选模型后再问我.";

    private int Lines { get; set; } = 0;

    [NotNull]
    private EnumAzureOpenAIModel? SelectedEnumItem { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.OCR/app.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
        }
    }


    private async Task OnEnterAsync(string val)
    {
#if NET7_0_OR_GREATER

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
        await UpdateUI();

        Completion = await OpenaiService.GetTextCompletionResponse(val, 500);
        if (Completion?.Choices.Count > 0)
        {
            var res = Completion.Choices[0].Text;
            ResultText += ($"A: {res}{Environment.NewLine}");
            ResultText += (Environment.NewLine);
            InputText = string.Empty;
            await UpdateUI();
            PlaceHolderText = "问点啥,可选模型后再问我.";
        }
#else
        await Task.CompletedTask;
#endif

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

    private Task OnClear()
    {
        ResultText = string.Empty;
        InputText = string.Empty;
        ResultImage = null;
        return Task.CompletedTask;
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




