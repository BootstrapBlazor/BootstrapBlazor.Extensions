// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// Term 终端组件
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.Term/Components/Term/Term.razor.js", JSObjectReference = true)]
public partial class Term
{
    /// <summary>
    /// 获得/设置 UI Element
    /// </summary>
    private ElementReference Element { get; set; }

    /// <summary>
    /// 获得/设置 Options
    /// </summary>
    [Parameter]
    public TermOptions Options { get; set; } = new TermOptions();

    /// <summary>
    /// 获得/设置 收到数据回调
    /// </summary>
    [Parameter]
    public Func<byte[], Task>? OnData { get; set; }

    /// <summary>
    /// 获得/设置 终端 Resize 回调
    /// </summary>
    [Parameter]
    public Func<int, int, Task>? OnResize { get; set; }

    /// <summary>
    /// 获得/设置 高度 默认 300px
    /// </summary>
    [Parameter]
    public string Height { get; set; } = "300px";

    /// <summary>
    /// GetClassString
    /// </summary>
    /// <returns></returns>
    private string? GetClassString() => CssBuilder.Default("bb-term")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// GetStyleString
    /// </summary>
    /// <returns></returns>
    private string? GetStyleString() => CssBuilder.Default()
        .AddClass($"height: {Height};", !string.IsNullOrEmpty(Height))
        .AddStyleFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// OnInitialized
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();
    }

    /// <summary>
    /// InvokeInitAsync
    /// </summary>
    /// <returns></returns>
    protected override async Task InvokeInitAsync()
    {
        await InvokeVoidAsync("init", Id, Interop, Options);
    }

    /// <summary>
    /// 写入数据
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    public async Task Write(string data)
    {
        await InvokeVoidAsync("write", Id, data);
    }

    /// <summary>
    /// 写入一行数据
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    public async Task WriteLine(string data)
    {
        await InvokeVoidAsync("writeln", Id, data);
    }

    /// <summary>
    /// 清空终端
    /// </summary>
    /// <returns></returns>
    public async Task Clear()
    {
        await InvokeVoidAsync("clear", Id);
    }

    /// <summary>
    /// 连接流
    /// </summary>
    /// <param name="stream"></param>
    /// <returns></returns>
    public async Task Open(Stream stream)
    {
        _stream = stream;
        _cancellationTokenSource = new CancellationTokenSource();
        _ = ReadStreamAsync();

        await Task.CompletedTask;
    }

    private Stream? _stream;
    private CancellationTokenSource? _cancellationTokenSource;

    private async Task ReadStreamAsync()
    {
        if (_stream == null) return;

        var buffer = new byte[1024];
        try
        {
            while (!_cancellationTokenSource!.IsCancellationRequested)
            {
                var read = await _stream.ReadAsync(buffer, _cancellationTokenSource.Token);
                if (read == 0) break;
                var data = new byte[read];
                Array.Copy(buffer, data, read);
                await Write(data);
            }
        }
        catch (TaskCanceledException)
        {
            // ignored
        }
        catch (Exception ex)
        {
            // Handle error
            await WriteLine($"\r\nError: {ex.Message}");
        }
    }

    /// <summary>
    /// 写入数据 (Byte[])
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    public async Task Write(byte[] data)
    {
        await InvokeVoidAsync("write", Id, data);
    }

    /// <summary>
    /// 收到数据 JSInvoke
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task OnDataAsync(byte[] data)
    {
        if (_stream != null && _stream.CanWrite)
        {
            await _stream.WriteAsync(data);
            await _stream.FlushAsync();
        }

        if (OnData != null)
        {
            await OnData(data);
        }
    }

    /// <summary>
    /// Dispose
    /// </summary>
    /// <param name="disposing"></param>
    protected override async ValueTask DisposeAsync(bool disposing)
    {
        _cancellationTokenSource?.Cancel();
        _cancellationTokenSource?.Dispose();
        await base.DisposeAsync(disposing);
    }

    /// <summary>
    /// 获得 终端行数
    /// </summary>
    public int Rows { get; private set; }

    /// <summary>
    /// 获得 终端列数
    /// </summary>
    public int Columns { get; private set; }

    /// <summary>
    /// Resize JSInvoke
    /// </summary>
    /// <param name="rows"></param>
    /// <param name="cols"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task OnResizeAsync(int rows, int cols)
    {
        Rows = rows;
        Columns = cols;
        if (OnResize != null)
        {
            await OnResize(rows, cols);
        }
    }
}
