// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Buffers;
using System.Diagnostics;
using System.IO.Pipelines;
using System.Net;
using TouchSocket.Core;
using TouchSocket.Sockets;

namespace BootstrapBlazor.Components;

internal sealed class DefaultTcpSocketProvider : TcpClientBase, ISocketClientProvider
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public bool IsConnected => base.Online;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public IPEndPoint LocalEndPoint { get; set; } = new IPEndPoint(IPAddress.Any, 0);

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async ValueTask CloseAsync()
    {
        await base.CloseAsync(string.Empty);
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async ValueTask<bool> ConnectAsync(IPEndPoint endPoint, CancellationToken token = default)
    {
        await SetupAsync(new TouchSocketConfig()
            .SetBindIPHost(new IPHost(LocalEndPoint.Address, LocalEndPoint.Port))
            .SetRemoteIPHost(new IPHost(endPoint.Address, endPoint.Port)));

        try
        {
            await TcpConnectAsync(int.MaxValue, token);
            Debug.Assert(MainSocket != null, "MainSocket cannot be null after connection.");
            Debug.Assert(base.Online, "Online should be true after successful connection.");
            if (MainSocket.LocalEndPoint is IPEndPoint localEndPoint)
            {
                LocalEndPoint = localEndPoint;
            }
            return true;
        }
        catch (Exception ex)
        {
            this.Logger?.Exception(this, ex);
            return false;
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async ValueTask<int> ReceiveAsync(Memory<byte> buffer, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        this.ThrowIfTcpClientNotConnected();
        this.ThrowIfDisposed();

        var result = await base.Transport.Input.ReadAsync(token);
        if (result.IsCompleted)
        {
            return 0;
        }
        var length = (int)Math.Min(result.Buffer.Length, buffer.Length);

        var sequence = result.Buffer.Slice(0, length);

        sequence.CopyTo(buffer.Span);
        base.Transport.Input.AdvanceTo(sequence.End);
        return length;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async ValueTask<bool> SendAsync(ReadOnlyMemory<byte> data, CancellationToken token = default)
    {
        token.ThrowIfCancellationRequested();
        base.ThrowIfTcpClientNotConnected();
        base.ThrowIfDisposed();
        var pipeWriter = base.Transport.Output;
        var locker = base.Transport.SemaphoreSlimForWriter;
        await locker.WaitAsync(token);
        try
        {
            pipeWriter.Write(data.Span);
            var result = await pipeWriter.FlushAsync(token);
            if (result.IsCanceled || result.IsCompleted)
            {
                return false;
            }
            return true;
        }
        catch (Exception ex)
        {
            this.Logger?.Exception(this, ex);
            return false;
        }
        finally
        {
            locker.Release();
        }
    }

    protected override sealed async Task ReceiveLoopAsync(ITransport transport)
    {
        //重写接收循环方法
        //此处不做任何数据读取
        //让数据直接到ReceiveAsync使用管道直接读取数据
        await Task.Delay(-1, transport.ClosedToken);
    }
}
