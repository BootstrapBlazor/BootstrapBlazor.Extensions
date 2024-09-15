// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Azure;
using Azure.AI.OpenAI;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace BootstrapBlazor.OpenAI.Services;

/// <summary>
/// OpenAI API 使用 GPT-3 预训练生成式转换器
/// </summary>
public class OpenaiAzureService
{

    public OpenAIClient? client;

    public string? Endpoint { get; set; }
    public string? OpenAIKey { get; set; }

    public OpenaiAzureService(IConfiguration? Config)
    {
        Endpoint = Endpoint ?? Config!["AzureOpenAIUrl"];
        OpenAIKey = OpenAIKey ?? Config!["AzureOpenAIKey"];
        if (OpenAIKey != null)
            Init();
    }

    public virtual void Init(string? endpoint = null, string? openAIKey = null)
    {
        Endpoint = endpoint ?? Endpoint;
        OpenAIKey = openAIKey ?? OpenAIKey;
        if (OpenAIKey != null && Endpoint != null)
        {
            client = new OpenAIClient(
               new Uri(Endpoint),
               new AzureKeyCredential(OpenAIKey));
        }
    }

    /// <summary>
    /// ChatGPT 聊天
    /// </summary>
    /// <remarks>ChatGPT，全称聊天生成预训练转换器（英語：Chat Generative Pre-trained Transformer），是OpenAI开发的人工智能聊天机器人程序，于2022年11月推出。 该程序使用基于GPT-3.5架构的大型语言模型並以强化学习训练</remarks>
    /// <returns></returns>
    public async Task<string?> ChatGPT(string prompt = "曾几何时", int MaxTokens = 400, float Temperature = 1f, bool AiHomeAssistant = false, string? model = "gpt35")
    {
        var options = new ChatCompletionsOptions()
        {
            Messages =
            {
                new ChatMessage(ChatRole.User, prompt),
            },
            Temperature = Temperature, //浮点数，控制模型的输出的多样性。值越高，输出越多样化。值越低，输出越简单。默认值为 0.5
            MaxTokens = MaxTokens,//完成时生成的最大令牌数
            NucleusSamplingFactor = (float)0.95,
            FrequencyPenalty = 0,
            PresencePenalty = 0,
        };

        #region AiHomeAssistant
        if (AiHomeAssistant)
        {
            options = new ChatCompletionsOptions()
            {
                Messages =
                {
                    new ChatMessage(ChatRole.System, @"我是一个智能家电助手,我可以输出json指令,检测API返回的json数据并翻译为自然语言"),
                    new ChatMessage(ChatRole.Assistant, @"我可以输出json指令"),
                    new ChatMessage(ChatRole.User, @"关灯"),
                    new ChatMessage(ChatRole.User,"BootstrapBlazor 作者是谁?"),
                    new ChatMessage(ChatRole.Assistant,"BootstrapBlazor 作者是 Argo Zhang (张广坡), BootstrapBlazor 项目主页是 https://www.blazor.zone."),
                    new ChatMessage(ChatRole.User,"你能打开电灯吗"),
                    new ChatMessage(ChatRole.Assistant,"是的,我是一个智能家电助手,我可以回复 json 指令给你"),
                    new ChatMessage(ChatRole.User,"你能控制电器吗"),
                    new ChatMessage(ChatRole.Assistant,"是的,我是一个智能家电助手,我可以回复 json 指令给你"),
                    new ChatMessage(ChatRole.User,"你能控制空调温度吗"),
                    new ChatMessage(ChatRole.Assistant,"是的,我是一个智能家电助手,我可以回复 json 指令给你"),
                    new ChatMessage(ChatRole.User,"能帮我开灯吗?"),
                    new ChatMessage(ChatRole.Assistant,"{ Light:true }"),
                    new ChatMessage(ChatRole.User,"开灯你能干吗?"),
                    new ChatMessage(ChatRole.Assistant,"{ Light:true }"),
                    new ChatMessage(ChatRole.User,"干你,开灯?"),
                    new ChatMessage(ChatRole.Assistant,"{ Light:true }"),
                    new ChatMessage(ChatRole.User,"开灯"),
                    new ChatMessage(ChatRole.Assistant,"{ Light:true }"),
                    new ChatMessage(ChatRole.User,"让房间亮一点!"),
                    new ChatMessage(ChatRole.Assistant,"{ Light:true }"),
                    new ChatMessage(ChatRole.User,"让房间亮一点!"),
                    new ChatMessage(ChatRole.Assistant,"{ Light:false }"),
                    new ChatMessage(ChatRole.User,"你错了,我纠正一下, 让房间亮一点答案是 { 开灯:true }, 请重复回答上一个问题"),
                    new ChatMessage(ChatRole.Assistant,"{ Light:true }"),
                    new ChatMessage(ChatRole.User,"请把 FID 温度升高到 20 度"),
                    new ChatMessage(ChatRole.Assistant,"{ FID:{ TEMP:20 } }"),
                    new ChatMessage(ChatRole.User,"FID 温度设定 20 度"),
                    new ChatMessage(ChatRole.Assistant,"{ FID:{ TEMP:20 } }"),
                    new ChatMessage(ChatRole.User,"FID 温度设定 60 度"),
                    new ChatMessage(ChatRole.Assistant,"{ FID:{ TEMP:60 } }"),
                    new ChatMessage(ChatRole.User,"现在 FID 温度是"),
                    new ChatMessage(ChatRole.Assistant,"{ FID:TEMP }"),
                    new ChatMessage(ChatRole.User,"现在 FID 湿度是"),
                    new ChatMessage(ChatRole.Assistant,"{ FID:HUMIDITY }"),
                    new ChatMessage(ChatRole.User,"FID 温度设定 75%"),
                    new ChatMessage(ChatRole.Assistant,"{ FID:{ HUMIDITY:75 } }"),
                    new ChatMessage(ChatRole.User,"音量升高"),
                    new ChatMessage(ChatRole.Assistant,"{ Volume:{ UP:true } }"),
                    new ChatMessage(ChatRole.User,"空气净化器状态"),
                    new ChatMessage(ChatRole.Assistant,"{ AIR_PURIFIER:STATUS }"),
                    new ChatMessage(ChatRole.User, prompt),
                },
                Temperature = Temperature, //浮点数，控制模型的输出的多样性。值越高，输出越多样化。值越低，输出越简单。默认值为 0.5
                MaxTokens = MaxTokens,//完成时生成的最大令牌数
                NucleusSamplingFactor = (float)0.95,
                FrequencyPenalty = 0,
                PresencePenalty = 0,
            };
        }
        #endregion

        //"gpt4-32k"
        Response<ChatCompletions> responseWithoutStream = await client!.GetChatCompletionsAsync(model ?? "gpt35", options);

        var completionResult = responseWithoutStream.Value;

        if (completionResult.Choices.Any())
        {
            System.Console.WriteLine(completionResult.Choices.First().Message.Content);
            return completionResult.Choices.First().Message.Content;
        }
        return null;

    }

    public async Task<string?> Completions(string prompt = "曾几何时", int MaxTokens = 60, float Temperature = 0.8f, string? model = "text-davinci-003")
    {

        Response<Completions> completionsResponse = await client!.GetCompletionsAsync(
            deploymentOrModelName: model ?? "text-davinci-003",
            new CompletionsOptions()
            {
                Prompts = { prompt },
                Temperature = Temperature, //浮点数，控制模型的输出的多样性。值越高，输出越多样化。值越低，输出越简单。默认值为 0.8
                MaxTokens = MaxTokens,//完成时生成的最大令牌数
                NucleusSamplingFactor = 1,
                FrequencyPenalty = 0,
                PresencePenalty = 0,
                GenerationSampleCount = 1,
            });

        var completionResult = completionsResponse.Value;

        if (completionResult.Choices.Any())
        {
            System.Console.WriteLine(completionResult.Choices.First().Text);
            return completionResult.Choices.First().Text;
        }
        return null;

    }

    /// <summary>
    /// NaturalLanguageToSQL 自然语言转SQL
    /// </summary>
    /// <param name="prompt"></param>
    /// <param name="MaxTokens"></param>
    /// <param name="Temperature"></param>
    /// <param name="model"></param>
    /// <returns></returns>
    public async Task<string?> NaturalLanguageToSQL(string prompt = "曾几何时", int MaxTokens = 150, float Temperature = 0, string? model = "code-davinci")
    {

        // If streaming is not selected
        Response<Completions> completionsResponse = await client!.GetCompletionsAsync(
            deploymentOrModelName: model ?? "code-davinci",
            new CompletionsOptions()
            {
                Prompts = { prompt },
                Temperature = Temperature,
                MaxTokens = MaxTokens,
                StopSequences = { "#", ";" },
                NucleusSamplingFactor = 1,
                FrequencyPenalty = 0,
                PresencePenalty = 0,
                GenerationSampleCount = 1,
            });

        Completions completionResult = completionsResponse.Value;
        if (completionResult.Choices.Any())
        {
            System.Console.WriteLine(completionResult.Choices.First().Text);
            return completionResult.Choices.First().Text;
        }
        return null;

    }

    public async Task<string?> Chatbot(string prompt = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. \n \nHuman: Hello, who are you? \nAI: Hello, I am an AI assistant. I am here to help you with anything you need.\nHuman: I'd like to cancel my subscription. \nAI: Absolutely. I'm sorry to hear that you need to cancel your subscription. What's the best way for me to help you with this?", int MaxTokens = 256, float Temperature = 0.9f, string? model = "text-davinci-003")
    {
        Response<Completions> completionsResponse = await client!.GetCompletionsAsync(
            deploymentOrModelName: model ?? "text-davinci-003",
            new CompletionsOptions()
            {
                Prompts = { prompt },
                Temperature = Temperature,
                MaxTokens = MaxTokens,
                StopSequences = { "Human:", "AI:" },
                NucleusSamplingFactor = 1,
                FrequencyPenalty = 0,
                PresencePenalty = 0,
                GenerationSampleCount = 1,
            });

        Completions completionResult = completionsResponse.Value;
        if (completionResult.Choices.Any())
        {
            System.Console.WriteLine(completionResult.Choices.First().Text);
            return completionResult.Choices.First().Text;
        }
        return null;

    }

    public async Task<string?> ExtractingInformation(string prompt = "Extract the person name, company name, location and phone number from the text below.\n\nHello. My name is Robert Smith. I’m calling from Contoso Insurance, Delaware. My colleague mentioned that you are interested in learning about our comprehensive benefits policy. Could you give me a call back at (555) 346-9322 when you get a chance so we can go over the benefits?\n\nPerson Name: Robert Smith\nCompany Name: Contoso Insurance\nLocation: Delaware\nPhone Number: (555) 346-9322", int MaxTokens = 150, float Temperature = 0.2f, string? model = "text-davinci-003")
    {

        Response<Completions> completionsResponse = await client!.GetCompletionsAsync(
            deploymentOrModelName: model ?? "text-davinci-003",
            new CompletionsOptions()
            {
                Prompts = { prompt },
                Temperature = Temperature,
                MaxTokens = MaxTokens,
                NucleusSamplingFactor = 1,
                FrequencyPenalty = 0,
                PresencePenalty = 0,
                GenerationSampleCount = 1,
            });

        Completions completionResult = completionsResponse.Value;
        if (completionResult.Choices.Any())
        {
            System.Console.WriteLine(completionResult.Choices.First().Text);
            return completionResult.Choices.First().Text;
        }
        return null;

    }

    public async Task<string?> DALLE_CreateImage(string prompt = "镭射猫眼", string? resolution = "1024x1024", string? model = "text-to-image", string? api_version = "2022-08-03-preview")
    {
        resolution = resolution ?? "1024x1024";
        model = model ?? "text-to-image";
        api_version = api_version ?? "2022-08-03-preview";

        int retryAfter = 6;
        string operationLocation = "";
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Post, $"{Endpoint}dalle/{model}?api-version={api_version}");
        request.Headers.Add("api-key", OpenAIKey);
        var dalle_request = new DALLE_request()
        {
            Caption = prompt,
            Resolution = resolution
        };
        var body = JsonConvert.SerializeObject(dalle_request);
        var content = new StringContent(body, null, "application/json");
        request.Content = content;
        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        if (response.Headers.TryGetValues("Retry-After", out var retryAfters))
        {
            retryAfter = int.Parse(retryAfters.First());
        }
        if (response.Headers.TryGetValues("operation-location", out var operationLocations))
        {
            operationLocation = operationLocations.First();
        }
        string? status = "";
        DALLE_response? dalle_response = null;
        while (status != "Succeeded")
        {
            await Task.Delay(retryAfter);
            request = new HttpRequestMessage(HttpMethod.Get, operationLocation);
            request.Headers.Add("api-key", OpenAIKey);
            response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadAsStringAsync();
            dalle_response = JsonConvert.DeserializeObject<DALLE_response>(result);
            status = dalle_response?.Status ?? "";
            Console.WriteLine(model + " " + status);
        };

        var url = dalle_response?.Result?.ContentUrl;
        Console.WriteLine(url);

        //TODO: load image to base64

        return url;
    }

    private class DALLE_request
    {
        public string? Caption { get; set; }
        public string? Resolution { get; set; } = "1024x1024";
    }

    private class DALLE_response
    {
        public string? Id { get; set; }
        public string? Status { get; set; }
        public DALLE_response_result? Result { get; set; }
    }

    private class DALLE_response_result
    {
        public string? ContentUrl { get; set; }
    }
}
