// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Diagnostics.CodeAnalysis;

namespace BootstrapBlazor.Components;

//https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
//https://web.dev/file-system-access/

/// <summary>
/// 文件系统访问 File System Access 组件基类
/// </summary>
public partial class FileSystem : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }


    /// <summary>
    /// 获得/设置 显示log
    /// </summary>
    [Parameter]
    public bool Debug { get; set; } = false;

    /// <summary>
    /// 获得/设置 打开文件按钮文字 默认为 打开
    /// </summary>
    [Parameter]
    public string? ButtonGetFile { get; set; } = "打开";

    /// <summary>
    /// 获得/设置 打开文本按钮文字 默认为 打开文本
    /// </summary>
    [Parameter]
    public string? ButtonGetFileText { get; set; } = "打开文本";

    /// <summary>
    /// 获得/设置 新建按钮文字 默认为 新建
    /// </summary>
    [Parameter]
    public string? ButtonNewFile { get; set; } = "新建";

    /// <summary>
    /// 获得/设置 打开目录按钮文字 默认为 打开目录
    /// </summary>
    [Parameter]
    public string? ButtonGetDir { get; set; } = "打开目录";

    /// <summary>
    /// 获得/设置 检查权限按钮文字 默认为 检查权限
    /// </summary>
    [Parameter]
    public string? ButtonVerifyPermission { get; set; } = "检查权限";

    /// <summary>
    /// 获得/设置 写入文件按钮文字 默认为 写入文件
    /// </summary>
    [Parameter]
    public string? ButtonSaveFile { get; set; } = "写入文件";

    /// <summary>
    /// 获得/设置 信息回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnInfo { get; set; }

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// 获得/设置 文件内容回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnFileText { get; set; }

    /// <summary>
    /// 获得/设置 文件内容流回调方法
    /// </summary>
    [Parameter]
    public Func<Stream?, Task>? OnFileStream { get; set; }

    /// <summary>
    /// 获得/设置 文件信息回调方法
    /// </summary>
    [Parameter]
    public Func<FileInfo, Task>? OnFileInfo { get; set; }


    /// <summary>
    /// 获得/设置 文件夹信息回调方法
    /// </summary>
    [Parameter]
    public Func<List<string>, Task>? OnDirectory { get; set; }



    private IJSObjectReference? Module { get; set; }
    private DotNetObjectReference<FileSystem>? Instance { get; set; }
    public string? msg = string.Empty;

    protected string FileText = "";

    protected FileSystemHandle? FileHandle;
    private Task HandleOnChange(ChangeEventArgs args)
    {
        FileText = args?.Value?.ToString() ?? "";
        return Task.CompletedTask;
    }
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (firstRender)
            {
                Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.FileSystem/api.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
                Instance = DotNetObjectReference.Create(this);
            }
        }
        catch (Exception e)
        {
            msg += e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (Module is not null)
        {
            await Module.DisposeAsync();
        }
    }


    public virtual async Task NewFile()
    {
        FileHandle = null;
        try
        {
            //指定建议的文件名
            //文件内容
            FileHandle = await Module!.InvokeAsync<FileSystemHandle>("newFile", Guid.NewGuid().ToString() + ".txt", Guid.NewGuid().ToString());
            FileText = FileHandle.contents ?? "";
            msg += FileHandle.status + ":" + FileHandle?.name + " => " + FileText + Environment.NewLine;
            if (OnInfo != null) await OnInfo.Invoke(msg);
        }
        catch (Exception e)
        {
            msg += e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    public virtual async Task SaveFile()
    {
        try
        {
            FileHandle = await Module!.InvokeAsync<FileSystemHandle>("saveFile", FileText);
            msg += FileHandle.status + ":" + FileHandle?.name + Environment.NewLine;
        }
        catch (Exception e)
        {
            msg += e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 打开文件
    /// </summary>
    public virtual async Task GetFileText()
    {
        FileHandle = null;
        FileText = string.Empty;
        try
        {
            FileHandle = await Module!.InvokeAsync<FileSystemHandle>("GetFile", Instance);
            FileText = FileHandle?.contents ?? "";
            if (OnFileText != null) await OnFileText.Invoke(FileText);
            msg += FileHandle?.status + ":" + FileHandle?.name + " => " + (OnFileText != null ? "" : FileText) + Environment.NewLine;
            if (OnInfo != null) await OnInfo.Invoke(msg);
        }
        catch (Exception e)
        {
            msg += e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 打开文件
    /// </summary>
    public virtual async Task GetFileStream()
    {
        FileHandle = null;
        FileText = string.Empty;
        try
        {
            var dataReference = await Module!.InvokeAsync<IJSStreamReference>("GetFileStream", Instance);
            using var dataReferenceStream = await dataReference.OpenReadStreamAsync(maxAllowedSize: 10_000_000);
            if (dataReferenceStream != null && OnFileStream != null)
            {
                using var outputFileStream = new MemoryStream();
                await dataReferenceStream.CopyToAsync(outputFileStream);
                await OnFileStream.Invoke(outputFileStream);
            }
            msg += FileHandle?.status + ":" + FileHandle?.name + " => Stream OK" + Environment.NewLine;
            if (OnInfo != null) await OnInfo.Invoke(msg);
        }
        catch (Exception e)
        {
            msg += e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 获取文件夹
    /// </summary>
    public virtual async Task GetDir()
    {
        FileHandle = null;
        FileText = string.Empty;
        try
        {
            var dirs = await Module!.InvokeAsync<List<string>>("GetDir");
            if (OnDirectory != null) await OnDirectory.Invoke(dirs);
            if (dirs == null || !dirs.Any()) return;
            msg += "Dir:" + Environment.NewLine;
            msg += dirs.First() + Environment.NewLine;
            foreach (var item in dirs.Skip(1).OrderByDescending(a => a.StartsWith("+")).ThenBy(a => a))
            {
                msg += item + Environment.NewLine;
            }
            if (OnInfo != null) await OnInfo.Invoke(msg);
        }
        catch (Exception e)
        {
            msg += e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }


    /// <summary>
    /// 获取文件信息完成回调方法
    /// </summary> 
    /// <returns></returns>
    [JSInvokable]
    public async Task GetFileResult(FileInfo fileData)
    {
        try
        {
            msg += fileData.name + Environment.NewLine;
            Console.WriteLine(fileData.name);
            if (OnFileInfo != null) await OnFileInfo.Invoke(fileData);
        }
        catch (Exception e)
        {
            msg += e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 检查授权
    /// </summary>
    public virtual async Task VerifyPermission()
    {
        try
        {
            var result = await Module!.InvokeAsync<bool>("verifyPermission");
            msg += (result ? "授权" : "未授权") + Environment.NewLine;
        }
        catch (Exception e)
        {
            msg += e.Message + Environment.NewLine;
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

}
