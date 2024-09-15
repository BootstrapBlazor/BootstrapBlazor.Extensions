// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using BootstrapBlazor.OCR.Services;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using System.Text;
using static BootstrapBlazor.AzureServices.Enums;

namespace BootstrapBlazor.AzureServices;

/// <summary>
/// STS 文本转语音服务
/// </summary>
public partial class StsService : BaseService<ReadResult>
{

    public string SubscriptionKey = "your Computer Vision subscription key";

    public string Endpoint = "https://api.cognitive.microsofttranslator.com";

    public string FetchTokenUri = "https://westeurope.api.cognitive.microsoft.com/sts/v1.0/issueToken";

    public string? Error;

    private string? token;

    private DateTime? lastRefreshTime;

    public StsService(IConfiguration? config)
    {
        if (config != null)
        {
            SubscriptionKey = config["AzureSsKey"] ?? "";
            FetchTokenUri = config["AzureSsFetchTokenUri"] ?? "";
            Endpoint = config["AzureSsUrl"] ?? "";
        }
    }

    public StsService(string key, string url)
    {
        SubscriptionKey = key;
        Endpoint = url;
    }

    private async Task<string> FetchTokenAsync(string fetchUri, string subscriptionKey)
    {
        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);
            UriBuilder uriBuilder = new UriBuilder(fetchUri);

            var result = await client.PostAsync(uriBuilder.Uri.AbsoluteUri, null);
            Console.WriteLine("Token Uri: {0}", uriBuilder.Uri.AbsoluteUri);
            return await result.Content.ReadAsStringAsync();
        }
    }


    /// <summary>
    /// 语音文件流生成
    /// </summary>
    /// <param name="speakText"></param>
    /// <param name="voicename"></param>
    /// <param name="style"></param>
    /// <returns></returns>
    public async Task<byte[]?> GetVoiceAsync(string speakText, string? voicename = "zh-HK-HiuGaaiNeural", string? style = "calm")
    {
        var ssml = speakText;
        if (!ssml.StartsWith("<speak "))
        {
            voicename = string.IsNullOrWhiteSpace(voicename) ? "zh-HK-HiuGaaiNeural" : GetVoiceName(voicename);
            style = string.IsNullOrWhiteSpace(style) ? "calm" : style;
            ssml = CreateSSML(speakText, voicename, style);
        }
        return await GetVoiceAsync(ssml);
    }

    public async Task<byte[]?> GetVoiceAsync(string ssml)
    {
        if (token == null || lastRefreshTime == null)
        {
            token = await FetchTokenAsync(FetchTokenUri, SubscriptionKey);
            lastRefreshTime = DateTime.Now;
        }
        if (DateTime.Now - lastRefreshTime > TimeSpan.FromMinutes(9))
        {
            token = await FetchTokenAsync(FetchTokenUri, SubscriptionKey);
            lastRefreshTime = DateTime.Now;
        }
        using (var client = new HttpClient())
        {
            var data = new StringContent(ssml, Encoding.UTF8, "application/ssml+xml");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            client.DefaultRequestHeaders.Add("X-Microsoft-OutputFormat", "riff-24khz-16bit-mono-pcm");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/ssml+xml"));
            client.DefaultRequestHeaders.Add("User-Agent", "Densen TTS");
            UriBuilder uriBuilder = new UriBuilder(Endpoint);

            var response = await client.PostAsync(uriBuilder.Uri.AbsoluteUri, data);
            if (response.IsSuccessStatusCode)
            {
                var wavBytes = await response.Content.ReadAsByteArrayAsync();
                return wavBytes;
            }
            else if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                Console.WriteLine("Error: {0}", response.StatusCode);
                token = FetchTokenAsync(FetchTokenUri, SubscriptionKey).Result;
                return await GetVoiceAsync(ssml);
            }
            return null;
        }
    }

    private static string CreateSSML(string paramAudioText, string paramSelectedVoice, string paramSelectedStyle)
    {
        var ssml = @"<speak version='1.0' xml:lang='en-US' xmlns='http://www.w3.org/2001/10/synthesis' ";
        ssml = ssml + @"xmlns:mstts='http://www.w3.org/2001/mstts'>";
        ssml = ssml + @$"<voice name='{paramSelectedVoice}'>";
        ssml = ssml + @$"<mstts:express-as style='{paramSelectedStyle}'>";
        ssml = ssml + @$"{paramAudioText}";
        ssml = ssml + @"</mstts:express-as>";
        ssml = ssml + @$"</voice>";
        ssml = ssml + @$"</speak>";
        return ssml;
    }

    private string GetVoiceName(string name) => name switch
    {
        "zh-Hans" => AzureVoiceName.zh_CN_XiaomoNeural.GetEnumName(),

        "es" => AzureVoiceName.es_ES_AbrilNeural.GetEnumName(),

        "en" => AzureVoiceName.en_US_JennyNeural.GetEnumName(),

        "fr" => AzureVoiceName.fr_FR_BrigitteNeural.GetEnumName(),

        "ca" => AzureVoiceName.ca_ES_AlbaNeural.GetEnumName(),

        "zh-Hant" => AzureVoiceName.zh_HK_HiuGaaiNeural.GetEnumName(),

        "pt" => AzureVoiceName.pt_PT_FernandaNeural.GetEnumName(),

        "it" => AzureVoiceName.it_IT_FabiolaNeural.GetEnumName(),

        "de" => AzureVoiceName.de_DE_AmalaNeural.GetEnumName(),

        "pl" => AzureVoiceName.pl_PL_AgnieszkaNeural.GetEnumName(),
        _ => name
    };


}




