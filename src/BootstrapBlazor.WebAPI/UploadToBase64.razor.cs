// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;

namespace BootstrapBlazor.Components;

/// <summary>
/// UploadToBase64 组件,返回 DataUrl 集合
/// </summary>
public partial class UploadToBase64
{

    /// <summary>
    /// 上传文件大小限制 默认 15M
    /// </summary>
    [Parameter]
    public long MaxFileSize { get; set; } = 1024 * 1024 * 15;

    /// <summary>
    /// 文件多选,反之为单选 默认为 true
    /// </summary>
    [Parameter]
    public bool Multiple { get; set; } = true;

    /// <summary>
    /// 只接受图片上传, 默认为 true
    /// </summary>
    [Parameter]
    public bool ImageOnly { get; set; } = true;

    /// <summary>
    /// 在移动设备上可使用相机拍照, 默认为 false
    /// <see href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture"/>
    /// </summary>
    [Parameter]
    public bool Capture { get; set; }

    /// <summary>
    /// 在移动设备上使用前置相机拍照, 默认为 false
    /// <see href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture"/>
    /// </summary>
    [Parameter]
    public bool CaptureUser { get; set; }

    /// <summary>
    /// 接受上传的文件类型,<para></para> 例如 image/* 表示只接受图片上传
    /// <para>mage/png, image/jpeg</para>
    /// <para>video/*</para>
    /// <para>image/*</para>
    /// <see href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept"/>
    /// </summary>
    [Parameter]
    public string Accept { get; set; } = "*";

    /// <summary>
    /// 获得/设置 上传图片按钮文字 默认为 上传图片
    /// </summary>
    [Parameter]
    public string UploadButtonText { get; set; } = "上传图片";

    /// <summary>
    /// 获得/设置 用户自定义样式
    /// </summary>
    [Parameter]
    public string? CssClass { get; set; }

    /// <summary>
    /// 获得/设置 用户自定义样式2
    /// </summary>
    [Parameter]
    public string? Style { get; set; }

    /// <summary>
    /// 获得/设置 上传回调方法,返回 ImageFile 集合
    /// </summary>
    [Parameter]
    public Func<List<ImageFile>, Task>? OnChanged { get; set; }

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    protected async Task OnChange(InputFileChangeEventArgs e)
    {
        var selectedFiles = e.GetMultipleFiles(100);
        var dataUrlList = new List<ImageFile>();
        foreach (var efile in selectedFiles)
        {
            try
            {
                using var stream = efile.OpenReadStream(MaxFileSize);
                var dataUrl = await PopulateImageFromStream(stream, efile.ContentType);
                dataUrlList.Add(new ImageFile()
                {
                    Name = efile.Name,
                    Size = efile.Size,
                    ContentType = efile.ContentType,
                    DataUrl = dataUrl
                });
            }
            catch (Exception ex)
            {
                if (OnError != null) await OnError.Invoke($"保存照片失败{ex.Message}");
            }
        }
        if (OnChanged != null) await OnChanged.Invoke(dataUrlList);
    }

    private async Task<string> PopulateImageFromStream(Stream stream, string contentType)
    {
        var ms = await CopyStream(stream);
        byte[] byteArray = ms.ToArray();
        var b64String = Convert.ToBase64String(byteArray);
        return $"data:{(contentType ?? "image/jpeg")};base64," + b64String;
    }

    /// <summary>
    /// 转换 BrowserFileStream 到 MemoryStream
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    private static async Task<MemoryStream> CopyStream(Stream input)
    {
        try
        {
            if (input.GetType().Name == "BrowserFileStream")
            {
                var output = new MemoryStream();
                byte[] buffer = new byte[16 * 1024];
                int read;
                while ((read = await input.ReadAsync(buffer, 0, buffer.Length)) > 0)
                {
                    output.Write(buffer, 0, read);
                }
                return output;
            }
            else
            {
                MemoryStream ms = new MemoryStream();
                input.CopyTo(ms);
                return ms;
            }
        }
        catch
        {
            throw;
        }
    }

    public class ImageFile
    {
        /// <summary>
        /// 文件名称
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// 文件大小
        /// </summary>
        public long Size { get; set; }

        /// <summary>
        /// 文件类型
        /// </summary>
        public string? ContentType { get; set; }

        /// <summary>
        /// Base64 DataUrl 格式
        /// </summary>
        public string? DataUrl { get; set; }
    }

}

