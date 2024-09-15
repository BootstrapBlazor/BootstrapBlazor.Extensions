// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using BootstrapBlazor.AzureServices;
using Microsoft.AspNetCore.Components;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;

namespace BootstrapBlazor.Components;

/// <summary>
/// Blazor Translate 翻译组件 
/// </summary>
public partial class Translate
{
    [NotNull]
    private PlayAudio? PlayAudio { get; set; }

    [NotNull]
    [Inject]
    private TranslateService? TranslateService { get; set; }

    /// <summary>
    /// 获得/设置 查询关键字
    /// </summary>
    [Parameter]
    public string? Search { get; set; }

    private string? ErrorMessage { get; set; }

    [DisplayName("翻译")]
    private string? InputText { get; set; }

    private string? PlaceHolderText { get; set; } = "输入原文";

    private static List<string> Items { get; set; } = new List<string>();

    private IEnumerable<EnumTranslateLanguage> SelectedEnumValues { get; set; } = new List<EnumTranslateLanguage>
    {
        EnumTranslateLanguage.en,
        EnumTranslateLanguage.es,
        EnumTranslateLanguage.fr,
        EnumTranslateLanguage.zh_Hant
    };

    private List<TranslateResponse.Translation>? Result { get; set; }

    private string Route()
    {
        if (!SelectedEnumValues.Any()) return "/translate?api-version=3.0&to=es&to=en&to=fr&to=ca&to=zh-Hant";
        var route = "/translate?api-version=3.0";
        foreach (var item in SelectedEnumValues)
        {
            route += "&to=" + item.ToString().Replace("_", "-");
        }
        return route;
    }

    private async Task OnValueChanged(string val) => await OnTranslate(val);

    private async Task OnTranslate(string val)
    {
        if (string.IsNullOrWhiteSpace(val))
        {
            return;
        }

        PlaceHolderText = "工作中...";
        Result = await TranslateService.Translate(val, Route());

        if (Result != null)
        {
            StateHasChanged();
            PlaceHolderText = "问点啥,可选模型后再问我.";
        }
    }

    private Task OnEscAsync(string val)
    {
        InputText = string.Empty;
        Items.Add(val);
        return Task.CompletedTask;
    }

    private async Task OnPlay(string? text, string? voice)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            return;
        }

        await PlayAudio.Play(text, voice);
    }
}




