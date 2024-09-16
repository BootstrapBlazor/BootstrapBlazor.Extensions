// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.ComponentModel.DataAnnotations;

namespace BootstrapBlazor.OpenAI.Services;

/// <summary>
///
/// </summary>
public enum EnumOpenAiModel
{
    /// <summary>
    ///ChatGPT
    /// </summary>
    [Display(Name = "ChatGPT")]
    ChatGpt,

    /// <summary>
    ///Completions
    /// </summary>
    [Display(Name = "Completions")]
    Completions,

    ///// <summary>
    ///// Completions Stream
    ///// </summary>
    //[Display(Name = "Completions Stream")]
    //CompletionsStream,

    /// <summary>
    /// DALL-E
    /// </summary>
    [Display(Name = "DALL-E")]
    DALLE,

    /// <summary>
    ///ChatGPT AiHomeAssistant
    /// </summary>
    [Display(Name = "AiHomeAssistant")]
    ChatGptAiHomeAssistant,

    [Display(Name = "聊天机器人")]
    Chatbot,

    [Display(Name = "自然语言转SQL")]
    NaturalLanguageToSQL,

    [Display(Name = "提取信息")]
    ExtractingInformation,

    /// <summary>
    ///ChatGPT4
    /// </summary>
    [Display(Name = "ChatGPT4")]
    ChatGpt4,

    /// <summary>
    ///ChatGPT4-32k
    /// </summary>
    [Display(Name = "ChatGPT4 32k")]
    ChatGpt4_32k,

}
