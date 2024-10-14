// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Azure.AI.OpenAI;
using Microsoft.Extensions.Options;
using OpenAI.Chat;
using System.ClientModel;
using System.Runtime.CompilerServices;
using System.Text;

namespace BootstrapBlazor.Components;

class AzureOpenAIService : IAzureOpenAIService
{
    private AzureOpenAIOption Options { get; set; }

    private AzureOpenAIClient? Client { get; set; }

    /// <summary>
    /// 构造函数
    /// </summary>
    /// <param name="options"></param>
    public AzureOpenAIService(IOptions<AzureOpenAIOption> options)
    {
        Options = options.Value;

        if (string.IsNullOrEmpty(Options.Endpoint))
        {
            throw new InvalidOperationException($"{nameof(AzureOpenAIOption.Endpoint)} is null or empty");
        }
        if (string.IsNullOrEmpty(Options.Key))
        {
            throw new InvalidOperationException($"{nameof(AzureOpenAIOption.Key)} is null or empty");
        }
        if (string.IsNullOrEmpty(Options.DeploymentName))
        {
            throw new InvalidOperationException($"{nameof(AzureOpenAIOption.DeploymentName)} is null or empty");
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="context"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<IEnumerable<AzureOpenAIChatMessage>> GetChatCompletionsAsync(string context, CancellationToken cancellationToken = default)
    {
        Client ??= new(new Uri(Options.Endpoint), new ApiKeyCredential(Options.Key));

        var client = Client.GetChatClient(Options.DeploymentName);
        var completion = await client.CompleteChatAsync([new UserChatMessage(context)], null, cancellationToken);
        return completion.Value.Content.Select(x => new AzureOpenAIChatMessage()
        {
            Content = x.Text
        });
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="context"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async IAsyncEnumerable<AzureOpenAIChatMessage> GetChatCompletionsStreamingAsync(string context, [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        Client ??= new(new Uri(Options.Endpoint), new ApiKeyCredential(Options.Key));

        var client = Client.GetChatClient(Options.DeploymentName);
        var content = new StringBuilder();
        await foreach (var chatUpdate in client.CompleteChatStreamingAsync([new UserChatMessage(context)], null, cancellationToken))
        {
            foreach (var partText in chatUpdate.ContentUpdate)
            {
                content.Append(partText.Text);
                yield return new AzureOpenAIChatMessage
                {
                    Role = ChatRole.Assistant,
                    Content = partText.Text
                };
            }
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    public Task CreateNewTopic()
    {
        return Task.CompletedTask;
    }
}
