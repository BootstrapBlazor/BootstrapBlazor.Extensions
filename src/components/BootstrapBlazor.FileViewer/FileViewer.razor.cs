// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using ce.office.extension;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// 文件预览 FileViewer 组件
/// </summary>
public partial class FileViewer
{
    /// <summary>
    /// UI界面元素的引用对象
    /// </summary>
    private ElementReference Element { get; set; }

    /// <summary>
    /// 获得/设置 Excel/Word 文件路径或者URL
    /// </summary>
    [Parameter]
    public string? Filename { get; set; }

    /// <summary>
    /// 获得/设置 宽 单位(px|%) 默认 100%
    /// </summary>
    [Parameter]
    public string Width { get; set; } = "100%";

    /// <summary>
    /// 获得/设置 高 单位(px|%) 默认 500px
    /// </summary>
    [Parameter]
    public string Height { get; set; } = "700px";

    /// <summary>
    /// 获得/设置 组件外观 Css Style
    /// </summary>
    [Parameter]
    public string? StyleString { get; set; }

    /// <summary>
    /// 获得/设置 Html 直接渲染 
    /// </summary>
    [Parameter]
    public string? Html { get; set; }

    /// <summary>
    /// 获得/设置 用于渲染的文件流,为空则用Filename参数读取文件
    /// </summary>
    [Parameter]
    public Stream? Stream { get; set; }

    /// <summary>
    /// 获得/设置 文件流模式需要指定是否 Excel. 默认为 false
    /// </summary>
    [Parameter]
    public bool IsExcel { get; set; }

    /// <summary>
    /// 获得/设置 无数据提示文本,默认为 无数据
    /// </summary>
    [Parameter]
    public string NodataString { get; set; } = "无数据";

    /// <summary>
    /// 获得/设置 载入中提示文本,默认为 载入中...
    /// </summary>
    [Parameter]
    public string LoadingString { get; set; } = "载入中...";

    private string? ErrorMessage { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Refresh();
        }
    }

    /// <summary>
    /// 重新载入文件
    /// </summary>
    /// <returns></returns>
    public virtual async Task Reload(string filename)
    {
        Filename = filename;
        Html = null;
        Stream = null;
        StateHasChanged();
        await Refresh();
    }

    /// <summary>
    /// 重新载入流
    /// </summary>
    /// <returns></returns>
    public virtual async Task Reload(Stream stream)
    {
        Stream = stream;
        Html = null;
        Filename = null;
        StateHasChanged();
        await Refresh();
    }

    /// <summary>
    /// 刷新
    /// </summary>
    /// <returns></returns>
    public virtual async Task Refresh()
    {
        if (ErrorMessage != null)
        {
            ErrorMessage = null;
            StateHasChanged();
        }

        try
        {
            if (Stream != null)
            {
                string tempFile = Path.GetTempFileName() + (IsExcel ? ".xlsx" : ".docx");
                using (Stream fileStream = File.OpenWrite(tempFile))
                {
                    await Stream.CopyToAsync(fileStream);
                }
                if (IsExcel)
                {
                    Html = ExcelHelper.ToHtml(tempFile);
                    StateHasChanged();
                }
                else
                {
                    Html = WordHelper.ToHtml(tempFile);
                    StateHasChanged();
                }
                File.Delete(tempFile);
            }
            else if (!string.IsNullOrEmpty(Filename))
            {
                var tempFile = Filename;
                if (Filename.StartsWith("http"))
                {
                    var client = new HttpClient();
                    tempFile = Path.GetTempFileName() + (Filename.EndsWith("xlsx") ? ".xlsx" : ".docx");
                    var fileBytes = await client.GetByteArrayAsync(Filename);
                    await File.WriteAllBytesAsync(tempFile, fileBytes);
                }
                if (IsExcel || Filename.EndsWith("xlsx"))
                {
                    Html = ExcelHelper.ToHtml(tempFile);
                    StateHasChanged();
                }
                else
                {
                    Html = WordHelper.ToHtml(tempFile);
                    StateHasChanged();
                }
                if (Filename.StartsWith("http"))
                {
                    File.Delete(tempFile);
                }
            }

        }
        catch (Exception e)
        {
            ErrorMessage = e.Message + e.StackTrace;
            StateHasChanged();
        }

    }


}
