// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.ComponentModel.DataAnnotations;

namespace BootstrapBlazor.AzureServices;

/// <summary>
///
/// </summary>
public enum EnumAzureOpenAIModel
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
}
