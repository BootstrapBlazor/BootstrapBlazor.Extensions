// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using BootstrapBlazor.OCR.Services;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Microsoft.Extensions.Configuration;

namespace BootstrapBlazor.Ocr.Services;

/// <summary>
/// OCR
/// </summary>
public partial class OcrService : BaseService<ReadResult>
{
    public string? LocalFilePath;

    //https://learn.microsoft.com/zh-cn/azure/cognitive-services/computer-vision/quickstarts-sdk/client-library?tabs=visual-studio&pivots=programming-language-csharp
    // 添加您的计算机视觉订阅密钥和端点

    public string SubscriptionKey = "your Computer Vision subscription key";

    public string Endpoint = "https://xxx.cognitiveservices.azure.com/";

    //public Stream? Stream { get; set; }
    public string? Tempfilename { get; set; }

    /// <summary>
    /// 获得/设置 识别完成回调方法,结果为string集合
    /// </summary>
    public Func<List<string>, Task>? Result { get; set; }

    public OcrService(IConfiguration? config)
    {
        if (config != null)
        {
            SubscriptionKey = config["AzureCvKey"] ?? "";
            Endpoint = config["AzureCvUrl"] ?? "";
        }
    }

    public OcrService(string localFilePath)
    {
        LocalFilePath = localFilePath;
    }

    public OcrService(string key, string url, string localFilePath)
    {
        LocalFilePath = localFilePath;
        SubscriptionKey = key;
        Endpoint = url;
    }

    private ComputerVisionClient? client_;

    public ComputerVisionClient Client
    {
        get => client_ = client_ ?? Authenticate(Endpoint, SubscriptionKey);
        set => client_ = value;
    }

    /// <summary>
    /// 转换和提取结果
    /// </summary>
    /// <param name="models"></param>
    /// <returns></returns>
    private async Task GetResult(List<string> models)
    {
        try
        {
            Console.WriteLine(models);
            if (Result != null) await Result.Invoke(models);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 从图像中提取文本 (OCR)
    /// </summary>
    /// <param name="url"></param>
    /// <param name="stream"></param>
    /// <returns></returns>
    public async Task<List<string>> StartOcr(string? url = null, Stream? stream = null)
    {
        msg = "Ocr start";
        await GetStatus(msg);
        Console.WriteLine();
        Tempfilename = null;

        if (stream != null)
        {
#if (IOS || MACCATALYST)
            var ms = await CopyStream(stream);
            var res1 = await ReadFileLocal(url ?? "", ms);
#else
            if (LocalFilePath != null)
            {
                Tempfilename = Path.Combine(LocalFilePath, "temp.jpg");
                await using FileStream fs = new(Tempfilename, FileMode.Create);
                await stream.CopyToAsync(fs);
                var res1 = await OcrLocal(Tempfilename);
                return res1;

            }
            else
            {
                var res1 = await OcrLocal(url ?? "", stream);
                return res1;
            }

#endif

        }
        else
        {
            // 使用读取 API 从 URL 图像中提取文本 (OCR)
            var res = await OcrUrl(url ?? "");
            return res;

        }

    }



    /// <summary>
    /// 暂存图片流
    /// </summary>
    /// <param name="stream"></param>
    /// <returns></returns>
    public async Task CopyStreamAsync(Stream stream)
    {
        msg = "Save a stream";
        await GetStatus(msg);
        try
        {
            Tempfilename = Path.Combine(Path.GetTempPath(), Path.GetTempFileName());
            await using FileStream fs = new(Tempfilename, FileMode.Create);
            await stream.CopyToAsync(fs);
        }
        catch
        {
            Tempfilename = null;
        }
    }

    /// <summary>
    /// 初始化 ComputerVisionClient 类的新实例
    /// </summary>
    /// <param name="endpoint"></param>
    /// <param name="key"></param>
    /// <returns></returns>
    public ComputerVisionClient Authenticate(string endpoint, string key)
    {
        ComputerVisionClient client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(key)) { Endpoint = endpoint };
        return client;
    }

    /// <summary>
    /// 从 URL 提取文本
    /// </summary>
    /// <param name="client"></param>
    /// <param name="urlFile"></param>
    /// <returns></returns>
    public async Task<List<string>> OcrUrl(string urlFile)
    {
        Console.WriteLine("----------------------------------------------------------");
        msg = "从 URL 提取文本";
        await GetStatus(msg);
        Console.WriteLine();

        // 从 URL 读取文本
        var textHeaders = await Client.ReadAsync(urlFile);
        // 请求后，获取操作位置（操作ID）
        string operationLocation = textHeaders.OperationLocation;
        Thread.Sleep(2000);

        // 从 Operation-Location 标头中检索将存储提取的文本的 URI。
        // 我们只需要 ID 而不是完整的 URL
        const int numberOfCharsInOperationId = 36;
        string operationId = operationLocation.Substring(operationLocation.Length - numberOfCharsInOperationId);

        // 提取文本
        ReadOperationResult results;
        msg = $"从 URL 文件中提取文本 {Path.GetFileName(urlFile)}...";
        await GetStatus(msg);
        Console.WriteLine();
        do
        {
            results = await Client.GetReadResultAsync(Guid.Parse(operationId));
            msg = $"{results.Status}...";
            await GetStatus(msg);
        }
        while ((results.Status is OperationStatusCodes.Running or
            OperationStatusCodes.NotStarted));

        // 显示找到的文本。
        Console.WriteLine();
        var res = new List<string>();
        var textUrlFileResults = results.AnalyzeResult.ReadResults;
        await GetStatus("end");
        await GetResult(textUrlFileResults.ToList());
        foreach (ReadResult page in textUrlFileResults)
        {
            foreach (Line line in page.Lines)
            {
                res.Add($"{line.Text}");
                Console.WriteLine($"{line.Text}");
            }
        }
        Console.WriteLine();
        await GetResult(res);
        return res;

    }


    /// <summary>
    /// 从本地文件或者流提取文本
    /// </summary>
    /// <param name="client"></param>
    /// <param name="localFile"></param>
    /// <param name="stream"></param>
    /// <returns></returns>
    public async Task<List<string>> OcrLocal(string localFile, Stream? stream = null, bool splitPerLine = false)
    {
        Console.WriteLine("----------------------------------------------------------");
        msg = stream != null ? "从流提取文本" : "从本地文件提取文本";
        await GetStatus(msg);
        Console.WriteLine();

        // 从 URL 读取文本
        var textHeaders = await Client.ReadInStreamAsync(stream ?? File.OpenRead(localFile));
        // 请求后，获取操作位置（操作 operation ID）
        string operationLocation = textHeaders.OperationLocation;
        Thread.Sleep(2000);

        // <snippet_extract_response>
        // 从 Operation-Location 标头中检索将存储已识别文本的 URI。
        // 我们只需要 ID 而不是完整的 URL
        const int numberOfCharsInOperationId = 36;
        string operationId = operationLocation.Substring(operationLocation.Length - numberOfCharsInOperationId);

        // 提取文本
        ReadOperationResult results;
        msg = stream != null ? "从流提取文本" : $"从文件 {Path.GetFileName(localFile)} 提取文本...";
        await GetStatus(msg);
        Console.WriteLine();
        do
        {
            results = await Client.GetReadResultAsync(Guid.Parse(operationId));
        }
        while ((results.Status is OperationStatusCodes.Running or
            OperationStatusCodes.NotStarted));
        // </snippet_extract_response>

        // <snippet_extract_display>
        // 显示找到的文本。
        Console.WriteLine();
        var res = new List<string>();
        var res2 = new List<string>();
        double? lastheight = 0.0;
        var textUrlFileResults = results.AnalyzeResult.ReadResults;
        await GetStatus("end");
        await GetResult(textUrlFileResults.ToList());
        foreach (ReadResult page in textUrlFileResults)
        {
            Console.WriteLine($"Angle角度: {page.Angle}");
            var line2 = "";
            foreach (Line line in page.Lines)
            {
                res.Add($"{line.Text}");
                if (line.BoundingBox[1] >= lastheight + 20 || line.BoundingBox[1] <= lastheight - 20)
                {
                    //X 左上、Y 左上、  X 右上、Y 右上、   X 右下、Y 右下、   X 左下、Y 左下
                    line2 += line.Text + "\t";
                }
                else
                {
                    Console.WriteLine($"line2=> {line2}");
                    res2.Add(line2);
                    line2 = "";
                }
                lastheight = line.BoundingBox[1];
                Console.WriteLine($"{line.Text}  Y 左上{line.BoundingBox[1]}");
            }
        }
        Console.WriteLine();
        await GetResult(res);
        return res;
    }


}

