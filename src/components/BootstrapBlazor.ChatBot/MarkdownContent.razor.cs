// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using ColorCode;
using ColorCode.Compilation.Languages;
using ColorCode.Styling;
using Markdig;
using Markdown.ColorCode;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Logging;
using System.Text.RegularExpressions;

namespace BootstrapBlazor.Components;

/// <summary>
/// MarkdownContent component
/// </summary>
public partial class MarkdownContent
{
    /// <summary>
    /// Gets or sets the content. Default value is null.
    /// </summary>
    [Parameter]
    [EditorRequired]
    public string? Content { get; set; }

    [Inject, NotNull]
    private ILogger<MarkdownContent>? Logger { get; set; }

    private string? _markdown;
    private MarkdownPipeline? _markdownPipeline;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();

        _markdownPipeline = new MarkdownPipelineBuilder()
            .UsePipeTables()
            .UseAdvancedExtensions()
            .UseColorCode(styleDictionary: StyleDictionary.DefaultLight, additionalLanguages: new List<ILanguage>()
            {
                new Json(),
                new CSharp(),
                new Cpp(),
                new Css(),
                new Html(),
                new JavaScript(),
                new Php(),
            })
            .UseAutoLinks()
            .UseEmojiAndSmiley()
            .UseMediaLinks()
            .UseCitations()
            .UseMathematics()
            .UseDiagrams()
            .Build();
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        _markdown = GetMarkdown(Content);
    }

    private string GetMarkdown(string? toHtml)
    {
        var html = "";

        if (string.IsNullOrEmpty(toHtml))
        {
            return html;
        }

        try
        {
            // 处理未封闭的 think 标签
            toHtml = HandleUnclosedThinkTags(toHtml);

            // 处理正常的 think 标签
            var thinkPattern = @"<\s*think\b[^>]*>(.*?)<\s*/\s*think\s*>";
            toHtml = Regex.Replace(toHtml, thinkPattern, @"<div class=""think"">$1</div>", RegexOptions.Singleline | RegexOptions.IgnoreCase);
            toHtml = RemoveEmbeddingsElement(toHtml);

            html = Markdig.Markdown.ToHtml(toHtml, _markdownPipeline);
            var pattern = "(<div style=\"color:#DADADA;background-color:#1E1E1E;\"><pre>(.*?)</pre></div>)";
            var matches = Regex.Matches(html, pattern, RegexOptions.Singleline | RegexOptions.Multiline | RegexOptions.IgnoreCase);

            for (var i = matches.Count - 1; i >= 0; i--)
            {
                var match = matches[i].ToString();
                var id = "copy" + i;
                var replacement = $"<button data-clipboard-target=\"#{id}\" class=\"float-end copyBtn  mt-0\">Copy</button>" + match;
                html = html.Remove(matches[i].Index, matches[i].Length).Insert(matches[i].Index, replacement);
            }
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "{GetMakrDown} method throw exception", nameof(GetMarkdown));
        }

        return html;
    }

    private static string HandleUnclosedThinkTags(string content)
    {
        if (string.IsNullOrEmpty(content))
            return content;

        // 匹配开始标签
        var openTagPattern = @"<\s*think\b[^>]*>";
        var closeTagPattern = @"<\s*/\s*think\s*>";

        var openTags = Regex.Matches(content, openTagPattern);
        var closeTags = Regex.Matches(content, closeTagPattern);

        // 如果开始标签数量等于结束标签数量，说明标签都是配对的
        if (openTags.Count == closeTags.Count)
            return content;

        // 处理未封闭的标签
        var parts = Regex.Split(content, openTagPattern);
        if (parts.Length <= 1)
            return content;

        var result = parts[0]; // 保留第一部分的内容
        for (int i = 1; i < parts.Length; i++)
        {
            var part = parts[i];
            // 检查这部分是否已经包含结束标签
            if (!part.Contains("</think>", StringComparison.OrdinalIgnoreCase))
            {
                // 没有结束标签，添加一个完整的 think 标签包装
                result += $"<think>{part}</think>";
            }
            else
            {
                // 已经有结束标签，保持原样
                result += $"<think>{part}";
            }
        }

        return result;
    }

    private static string RemoveEmbeddingsElement(string data)
    {
        if (string.IsNullOrEmpty(data))
        {
            return "";
        }
        string pattern = @"\[EMBEDDINGS\](.*?)\[/EMBEDDINGS\]";
        var matches = Regex.Matches(data, pattern, RegexOptions.Multiline | RegexOptions.Singleline | RegexOptions.IgnoreCase);

        if (matches.Count == 0)
        {
            return data;
        }

        return Regex.Replace(data, pattern, "", RegexOptions.Multiline | RegexOptions.Singleline | RegexOptions.IgnoreCase);
    }
}
