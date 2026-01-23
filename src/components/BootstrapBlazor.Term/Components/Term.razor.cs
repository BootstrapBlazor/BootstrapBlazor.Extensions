// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.Buffers;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">Term 终端组件</para>
/// <para lang="en">Term Component</para>
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.Term/Components/Term.razor.js", JSObjectReference = true)]
public partial class Term
{
    /// <summary>
    /// <para lang="zh">获得/设置 <see cref="TermOptions"/> 实例</para>
    /// <para lang="en">Gets or sets the <see cref="TermOptions"/></para>
    /// </summary>
    [Parameter]
    public TermOptions Options { get; set; } = new TermOptions();

    /// <summary>
    /// <para lang="zh">获得/设置 收到数据回调</para>
    /// <para lang="en">Gets or sets the callback when data is received.</para>
    /// </summary>
    [Parameter]
    public Func<byte[], Task>? OnReceivedAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 终端 Resize 回调</para>
    /// <para lang="en">Gets or sets the callback when terminal is resized.</para>
    /// </summary>
    [Parameter]
    public Func<int, int, Task>? OnResize { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 高度 默认 300px</para>
    /// <para lang="en">Gets or sets the height. Default is 300px.</para>
    /// </summary>
    [Parameter]
    public string Height { get; set; } = "300px";

    /// <summary>
    /// <para lang="zh">获得 终端行数</para>
    /// <para lang="en">Gets the number of rows in the terminal.</para>
    /// </summary>
    public int Rows { get; private set; }

    /// <summary>
    /// <para lang="zh">获得 终端列数</para>
    /// <para lang="en">Gets the number of columns in the terminal.</para>
    /// </summary>
    public int Columns { get; private set; }

    private string? ClassString => CssBuilder.Default("bb-term")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddClass($"height: {Height};", !string.IsNullOrEmpty(Height))
        .AddStyleFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override async Task InvokeInitAsync()
    {
        await InvokeVoidAsync("init", Id, Interop, Options);
    }

    /// <summary>
    /// <para lang="zh">写入数据</para>
    /// <para lang="en">Writes data to the terminal.</para>
    /// </summary>
    /// <param name="data"></param>
    public async Task Write(string data)
    {
        await InvokeVoidAsync("write", Id, data);
    }

    /// <summary>
    /// <para lang="zh">写入一行文本数据</para>
    /// <para lang="en">Writes a line of data to the terminal.</para>
    /// </summary>
    /// <param name="data"></param>
    public async Task WriteLine(string data)
    {
        await InvokeVoidAsync("writeln", Id, data);
    }

    /// <summary>
    /// <para lang="zh">写入数据 （<see langword="byte[]"/>)</para>
    /// <para lang="en">Writes byte array data to the terminal.</para>
    /// </summary>
    /// <param name="data"></param>
    public async Task Write(byte[] data)
    {
        await InvokeVoidAsync("write", Id, data);
    }

    /// <summary>
    /// <para lang="zh">写入数据 (<see langword="Memory[]"/>)</para>
    /// <para lang="en">Writes data to the terminal.</para>
    /// </summary>
    /// <param name="data"></param>
    public async Task Write(Memory<byte> data)
    {
        await InvokeVoidAsync("write", Id, data);
    }

    /// <summary>
    /// <para lang="zh">清空终端</para>
    /// <para lang="en">Clears the terminal.</para>
    /// </summary>
    public async Task Clear()
    {
        await InvokeVoidAsync("clear", Id);
    }

    /// <summary>
    /// <para lang="zh">连接流</para>
    /// <para lang="en">Connects a stream.</para>
    /// </summary>
    /// <param name="stream"></param>
    public Task Open(Stream stream) => ReadStreamAsync(stream);

    private Stream? _stream;
    private CancellationTokenSource? _cancellationTokenSource;

    private async Task ReadStreamAsync(Stream stream)
    {
        if (stream is { CanRead: true })
        {
            _ = Task.Run(() => LoopRead(stream));
        }
    }

    private async Task LoopRead(Stream stream)
    {
        _stream = stream;

        if (_cancellationTokenSource is { IsCancellationRequested: false })
        {
            _cancellationTokenSource.Cancel();
            _cancellationTokenSource.Dispose();
        }

        try
        {
            _cancellationTokenSource = new();
            using var memoryOwner = MemoryPool<byte>.Shared.Rent(1024);
            var buffer = memoryOwner.Memory;
            while (_cancellationTokenSource is { IsCancellationRequested: false })
            {
                if (stream is { CanRead: true })
                {
                    var length = await stream.ReadAsync(buffer, _cancellationTokenSource.Token);
                    if (length == 0)
                    {
                        await Task.Delay(50);
                        continue;
                    }
                    await Write(buffer.Slice(0, length).ToArray());
                }
                else
                {
                    break;
                }
            }
        }
        catch (OperationCanceledException)
        {
            // ignored
        }
        catch (Exception ex)
        {
            await WriteLine($"\r\nError: {ex.Message}");
        }
    }

    /// <summary>
    /// <para lang="zh">收到数据回调方法由 JavaScript 调用</para>
    /// <para lang="en">Callback when data is received from JS</para>
    /// </summary>
    /// <param name="data"></param>
    [JSInvokable]
    public async Task TriggerReceiveDataAsync(byte[] data)
    {
        if (_stream is { CanWrite: true })
        {
            await _stream.WriteAsync(data);
            await _stream.FlushAsync();
        }

        if (OnReceivedAsync != null)
        {
            await OnReceivedAsync(data);
        }
    }

    /// <summary>
    /// <para lang="zh">Resize JSInvoke</para>
    /// <para lang="en">Callback when terminal is resized from JS.</para>
    /// </summary>
    /// <param name="rows"></param>
    /// <param name="cols"></param>
    [JSInvokable]
    public async Task TriggerResizeAsync(int rows, int cols)
    {
        Rows = rows;
        Columns = cols;

        if (OnResize != null)
        {
            await OnResize(rows, cols);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="disposing"></param>
    protected override async ValueTask DisposeAsync(bool disposing)
    {
        await base.DisposeAsync(disposing);

        if (disposing)
        {
            _cancellationTokenSource?.Cancel();
            _cancellationTokenSource?.Dispose();
            _cancellationTokenSource = null;
        }
    }
}
