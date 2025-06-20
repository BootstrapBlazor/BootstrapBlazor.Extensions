// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using TouchSocket.Core;
using TouchSocket.Sockets;

namespace BootstrapBlazor.Components;

internal sealed class TouchSocketTcpClient : TcpClientBase, ITcpSocketClient
{
    private IDataPackageHandler? dataPackageHandler;
    public bool IsConnected => base.Online;
    public IPEndPoint LocalEndPoint => base.MainSocket.LocalEndPoint as IPEndPoint ?? throw new ArgumentNullException(nameof(LocalEndPoint));
    public int ReceiveBufferSize { get; set; }
    public Func<ReadOnlyMemory<byte>, ValueTask>? ReceivedCallBack { get; set; }

    #region ConnectAsync

    public async ValueTask<bool> ConnectAsync(string host, int port, CancellationToken token = default)
    {
        try
        {
            if (this.IsConnected)
            {
                await this.CloseAsync("Already connected", token);
            }

            await this.SetupAsync(new TouchSocketConfig()
                .SetRemoteIPHost($"{host}:{port}"));

            await base.TcpConnectAsync(5000, token);

            return true;
        }
        catch
        {
            return false;
        }
    }

    public async ValueTask<bool> ConnectAsync(IPEndPoint endPoint, CancellationToken token = default)
    {
        try
        {
            if (this.IsConnected)
            {
                await this.CloseAsync("Already connected", token);
            }

            await this.SetupAsync(new TouchSocketConfig()
                .SetRemoteIPHost(endPoint.ToString()));

            await base.TcpConnectAsync(5000, token);

            return true;
        }
        catch
        {
            return false;
        }
    }

    #endregion ConnectAsync

    public async ValueTask<bool> SendAsync(ReadOnlyMemory<byte> data, CancellationToken token = default)
    {
        try
        {
            ReadOnlyMemory<byte> memory;
            var dataPackageHandler = this.dataPackageHandler;
            if (dataPackageHandler == null)
            {
                memory = data;
            }
            else
            {
                memory = await dataPackageHandler.SendAsync(data);
            }

            await base.ProtectedDefaultSendAsync(memory).WaitAsync(token);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public void SetDataHandler(IDataPackageHandler handler)
    {
        this.dataPackageHandler = handler ?? throw new ArgumentNullException(nameof(handler));
        handler.ReceivedCallBack = this.OnReceivedCallBack;
    }

    protected override async ValueTask<bool> OnTcpReceiving(ByteBlock byteBlock)
    {
        var dataPackageHandler = this.dataPackageHandler;
        if (dataPackageHandler != null)
        {
            await dataPackageHandler.ReceiveAsync(byteBlock.Memory);
        }

        var func = this.ReceivedCallBack;
        if (func != null)
        {
            await func(byteBlock.Memory);
        }
        return true;
    }

    private async ValueTask OnReceivedCallBack(ReadOnlyMemory<byte> memory)
    {
        var func = this.ReceivedCallBack;
        if (func != null)
        {
            await func(memory);
        }
    }

    #region Close

    async ValueTask<bool> ITcpSocketClient.CloseAsync(string msg, CancellationToken token)
    {
        await this.CloseAsync(msg, token);
        return true;
    }

    public override async Task<Result> CloseAsync(string msg, CancellationToken token = default)
    {
        await base.ShutdownAsync(System.Net.Sockets.SocketShutdown.Both);
        return await base.CloseAsync(msg, token);
    }

    #endregion Close
}
