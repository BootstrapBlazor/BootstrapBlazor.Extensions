// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using BootstrapBlazor.Ocr.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using System.Diagnostics.CodeAnalysis;

namespace BootstrapBlazor.Components;

/// <summary>
/// OCR 组件
/// </summary>
public partial class OCR
{
    public string URL { get; set; } = "https://freepos.es/uploads/demo/Doc/libai.jpg";

    private string? log;
    private string? log2;

    [Inject]
    [NotNull]
    public OcrService? OcrService { get; set; }

    /// <summary>
    /// 获得/设置 识别完成回调方法,返回 ReadResult
    /// </summary>
    [Parameter]
    public Func<List<ReadResult>, Task>? OnReadResult { get; set; }

    /// <summary>
    /// 获得/设置 识别完成回调方法,返回 string
    /// </summary>
    [Parameter]
    public Func<List<string>, Task>? OnResult { get; set; }

    /// <summary>
    /// 获得/设置 状态回调方法,返回 string
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnStatus { get; set; }

    /// <summary>
    /// 获得/设置 Url识别按钮文字 默认为 执行识别
    /// </summary>
    [Parameter]
    [NotNull]
    public string? OcrUrlButtonText { get; set; } = "执行识别";

    /// <summary>
    /// 获得/设置 拍照识别按钮文字 默认为 拍照
    /// </summary>
    [Parameter]
    [NotNull]
    public string? OcrCaptureButtonText { get; set; } = "拍照";

    /// <summary>
    /// 获得/设置 文件识别按钮文字 默认为 文件
    /// </summary>
    [Parameter]
    [NotNull]
    public string? OcrButtonText { get; set; } = "文件";


    /// <summary>
    /// 获得/设置 显示内置UI, 默认为 false
    /// </summary>
    [Parameter]
    public bool ShowUI { get; set; }

    /// <summary>
    /// 获得/设置 显示内置UI, 默认为 true
    /// </summary>
    [Parameter]
    public bool ShowUI_Capture { get; set; } = true;

    /// <summary>
    /// 获得/设置 显示内置识别URL的UI, 默认为 false
    /// </summary>
    [Parameter]
    public bool ShowUI_Url { get; set; }

    /// <summary>
    /// 获得/设置 显示log, 默认为 false
    /// </summary>
    [Parameter]
    public bool Debug { get; set; }

    /// <summary>
    /// 获得/设置 key
    /// </summary>
    [Parameter]
    public string? Key { get; set; }

    /// <summary>
    /// 获得/设置 Endpoint
    /// </summary>
    [Parameter]
    public string? Endpoint { get; set; }

    /// <summary>
    /// 获得/设置 分析图像, 默认为 false
    /// </summary>
    [Parameter]
    public bool AnalyzeImage { get; set; }

    /// <summary>
    /// 获得/设置 检测图像中的对象, 默认为 false
    /// </summary>
    [Parameter]
    public bool DetectObjects { get; set; }

    /// <summary>
    /// 获得/设置 检测图像中的地标或名人, 默认为 false
    /// </summary>
    [Parameter]
    public bool DetectDomainSpecific { get; set; }

    protected string? uploadstatus;
    private long maxFileSize = 1024 * 1024 * 15;

    public List<ReadResult>? Results { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (firstRender)
            {
                if (Key != null) OcrService!.SubscriptionKey = Key;
                if (Endpoint != null) OcrService!.Endpoint = Endpoint;
                OcrService!.OnResult = OnResult1;
                OcrService!.Result = OnResult;
                OcrService.OnStatus = OnStatus1;
                OcrService.OnError = OnError1;
            }
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    protected async Task OnChange(InputFileChangeEventArgs e)
    {
        int i = 0;
        var selectedFiles = e.GetMultipleFiles(100);
        foreach (var item in selectedFiles)
        {
            i++;
            await OnSubmit(item);
            uploadstatus += Environment.NewLine + $"[{i}]: " + item.Name;
        }
    }

    protected async Task OnSubmit(IBrowserFile efile)
    {
        if (efile == null) return;
        try
        {
            using var stream = efile.OpenReadStream(maxFileSize);
            await OcrService!.CopyStreamAsync(stream);
            if (DetectDomainSpecific || DetectObjects || AnalyzeImage)
            {
                log = "图像获取成功";
                StateHasChanged();
                return;
            }
            await OcrGO();
        }
        catch (Exception e)
        {
            log += "Error:" + e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    private void oninput(ChangeEventArgs e)
    {
        URL = e.Value?.ToString() ?? "";
    }

    /// <summary>
    /// 识别文字
    /// </summary>
    public virtual async Task GetOCR() => await GetOCR(null);

    /// <summary>
    /// 识别 url 文字
    /// </summary>
    public virtual async Task GetOCR(string? url)
    {
        try
        {
            var res = await OcrService!.StartOcr(url ?? URL);
            if (Debug)
            {
                log = "";
                res.ForEach(a => log += a + Environment.NewLine);
                StateHasChanged();
            }
        }
        catch (Exception e)
        {
            log += "Error:" + e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 识别 Stream 内的文字
    /// </summary>
    public virtual async Task OCRFromStream(Stream stream)
    {
        try
        {
            var res = await OcrService!.StartOcr(stream: stream);
            if (Debug)
            {
                log = "";
                res.ForEach(a => log += a + Environment.NewLine);
                StateHasChanged();
            }
        }
        catch (Exception e)
        {
            log += "Error:" + e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }


    private async Task OnResult1(List<ReadResult> models)
    {
        Results = models;
        if (OnReadResult != null) await OnReadResult.Invoke(models);
        StateHasChanged();
    }
    private async Task OnStatus1(string message)
    {
        log2 = message;
        if (OnStatus != null) await OnStatus.Invoke(message);
        StateHasChanged();
    }

    private Task OnStatus2(string message)
    {
        log += message + Environment.NewLine;
        StateHasChanged();
        return Task.CompletedTask;
    }

    private Task OnError1(string message)
    {
        log2 = message;
        StateHasChanged();
        return Task.CompletedTask;
    }


    protected async Task OcrGO()
    {
        if (OcrService.Tempfilename == null) return;
        try
        {
            var res = await OcrService!.OcrLocal(OcrService.Tempfilename);
            if (Debug)
            {
                log = "";
                res.ForEach(a => log += a + Environment.NewLine);
                StateHasChanged();
            }
        }
        catch (Exception e)
        {
            log += "Error:" + e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    protected async Task AnalyzeImageGo()
    {
        if (OcrService.Tempfilename == null) return;
        try
        {
            var res = await OcrService!.AnalyzeImage(localImage: OcrService.Tempfilename);
            if (Debug)
            {
                log = "";
                res.ForEach(a => log += a + Environment.NewLine);
                StateHasChanged();
            }
        }
        catch (Exception e)
        {
            log += "Error:" + e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    protected async Task DetectObjectsGO()
    {
        if (OcrService.Tempfilename == null) return;
        try
        {
            var res = await OcrService!.DetectObjects(localImage: OcrService.Tempfilename);
            if (Debug)
            {
                log = "";
                res.ForEach(a => log += a + Environment.NewLine);
                StateHasChanged();
            }
        }
        catch (Exception e)
        {
            log += "Error:" + e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    protected async Task DetectDomainSpecificGo()
    {
        if (OcrService.Tempfilename == null) return;
        try
        {
            var res = await OcrService!.DetectDomainSpecific(localImage: OcrService.Tempfilename);
            if (Debug)
            {
                log = "";
                res.ForEach(a => log += a + Environment.NewLine);
                StateHasChanged();
            }
        }
        catch (Exception e)
        {
            log += "Error:" + e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

}
