// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Buffers;
using System.IO.Pipelines;
using System.Net;
using TouchSocket.Core;
using TouchSocket.Sockets;

namespace BootstrapBlazor.Components;

sealed class DefaultTcpSocketProvider : TcpClientBase, ISocketClientProvider
{
    private readonly Pipe _pipe = new();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public bool IsConnected => Online;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public IPEndPoint LocalEndPoint { get; set; } = new IPEndPoint(IPAddress.Any, 0);

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async ValueTask<bool> ConnectAsync(IPEndPoint endPoint, CancellationToken token = default)
    {
        await SetupAsync(new TouchSocketConfig()
            .SetBindIPHost(new IPHost(LocalEndPoint.Address, LocalEndPoint.Port))
            .SetRemoteIPHost(new IPHost(endPoint.Address, endPoint.Port)));
        await TcpConnectAsync(int.MaxValue, token);
        if (Online)
        {
            if (MainSocket.LocalEndPoint is IPEndPoint localEndPoint)
            {
                LocalEndPoint = localEndPoint;
            }
        }
        return Online;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async ValueTask<bool> SendAsync(ReadOnlyMemory<byte> data, CancellationToken token = default)
    {
        await ProtectedDefaultSendAsync(data, token);
        return true;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async ValueTask<int> ReceiveAsync(Memory<byte> buffer, CancellationToken token = default)
    {
        var result = await _pipe.Reader.ReadAsync(token);
        if (result.IsCompleted)
        {
            return 0;
        }

        result.Buffer.CopyTo(buffer.Span);
        return (int)result.Buffer.Length;
    }

    protected override async ValueTask<bool> OnTcpReceiving(ByteBlock byteBlock)
    {
        await _pipe.Writer.WriteAsync(byteBlock.Memory);
        await _pipe.Writer.FlushAsync();
        return true;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async ValueTask CloseAsync()
    {
        await CloseAsync(string.Empty);
    }
}
