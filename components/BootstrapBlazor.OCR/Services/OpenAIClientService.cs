// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

#if NET7_0_OR_GREATER
using AzureOpenAIClient.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BootstrapBlazor.AzureServices;

public class AzureOpenAIService
{
    //public string SubscriptionKey = "your Computer Vision subscription key";

    //public string Endpoint = "https://api.cognitive.microsofttranslator.com";

    [NotNull]
    private OpenAIClient? _openAiClient;

    //public AzureOpenAIService(IConfiguration? config)
    //{
    //    if (config != null)
    //    {
    //        SubscriptionKey = config["AzureTranslateKey"] ?? "";
    //        Endpoint = config["AzureTranslateUrl"] ?? "";
    //    }
    //}

    //public AzureOpenAIService(string key, string url)
    //{
    //    SubscriptionKey = key;
    //    Endpoint = url;
    //}

    public AzureOpenAIService(OpenAIClient client)
    {
        _openAiClient = client;
    }

    /***
      JSON 配置，它可以存储在您的secrets.json文件、appsettings.development.json或appsettings.json.

      "OpenAiClientConfiguration": {
        "BaseUri": "[your_fqdn]",
        "ApiKey": "[your_api_key]",
        "DeploymentName": "[your_deployment_name]"
      }
     ***/
    public async Task<CompletionResponse?> GetTextCompletionResponse(
        string input, int maxTokens)
    {
        var completionRequest = new CompletionRequest()
        {
            Prompt = input,
            MaxTokens = maxTokens
        };

        return await _openAiClient
            .GetTextCompletionResponseAsync(completionRequest);
    }

    public async Task<string?> GetTextCompletionStreamingResponse(
        string input, int maxTokens)
    {
        var completionRequest = new CompletionRequest()
        {
            Prompt = input,
            MaxTokens = maxTokens
        };

        var stream = _openAiClient.StreamTextCompletionResponseAsync(completionRequest);

        if (stream == null)
        {
            return null;
        }

        var res = string.Empty;
        await foreach (var completionResponse in stream)
        {
            if (completionResponse != null && completionResponse?.Choices != null)
            {
                res += completionResponse.Choices?.FirstOrDefault()?.Text;
                Console.Write(completionResponse.Choices?.FirstOrDefault()?.Text);
            }
        }

        return res;
    }
}
#endif
