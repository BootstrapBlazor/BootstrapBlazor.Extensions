// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.Logging;
using System.Buffers;
using System.Net;
using TouchSocket.Core;
using TouchSocket.Sockets;

namespace BootstrapBlazor.Components;

sealed class DefaultTcpSocketClient(IPEndPoint localEndPoint) : TcpSocketClientBase
{
    private TcpClient? _client;
    private CancellationTokenSource? _receiveCancellationTokenSource;
    private IPEndPoint? _remoteEndPoint;

    public override bool IsConnected => _client?.Online ?? false;

    private IReceiver<IReceiverResult>? _receiver;

    [NotNull]
    public ILogger<DefaultTcpSocketClient>? Logger { get; set; }

    public override async ValueTask<bool> ConnectAsync(IPEndPoint endPoint, CancellationToken token = default)
    {
        var ret = false;
        try
        {
            // 释放资源
            await CloseAsync();

            // 创建新的 TcpClient 实例
            _client ??= new TcpClient();
            _remoteEndPoint = endPoint;

            // 设置本地端点
            var config = new TouchSocketConfig()
                .SetBindIPHost(new IPHost(localEndPoint.Address, localEndPoint.Port))
                .SetRemoteIPHost(new IPHost(endPoint.Address, endPoint.Port))
                .SetMaxBufferSize(ReceiveBufferSize)
                .SetMinBufferSize(ReceiveBufferSize / 10);
            await _client.SetupAsync(config);

            var connectTimeout = ConnectTimeout == 0 ? int.MaxValue : ConnectTimeout;
            await _client.ConnectAsync(connectTimeout, token);

            if (IsConnected)
            {
                // 设置本地以及远端端点信息
                if (_client.MainSocket.LocalEndPoint is IPEndPoint local)
                {
                    LocalEndPoint = local;
                }

                _receiver = _client.CreateReceiver();
                _receiver.CacheMode = true;
                _receiver.MaxCacheSize = ReceiveBufferSize;

                if (_client.MainSocket.RemoteEndPoint is IPEndPoint remote)
                {
                    _remoteEndPoint = remote;
                }
                if (IsAutoReceive)
                {
                    _ = Task.Run(AutoReceiveAsync);
                }
            }
            ret = true;
        }
        catch (OperationCanceledException ex)
        {
            if (token.IsCancellationRequested)
            {
                Logger.LogWarning(ex, "TCP Socket connect operation was canceled from {LocalEndPoint} to {RemoteEndPoint}", LocalEndPoint, endPoint);
            }
            else
            {
                Logger.LogWarning(ex, "TCP Socket connect operation timed out from {LocalEndPoint} to {RemoteEndPoint}", LocalEndPoint, endPoint);
            }
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "TCP Socket connection failed from {LocalEndPoint} to {RemoteEndPoint}", LocalEndPoint, endPoint);
        }
        return ret;
    }

    public override async ValueTask<bool> SendAsync(ReadOnlyMemory<byte> data, CancellationToken token = default)
    {
        if (_client is not { Online: true })
        {
            throw new InvalidOperationException($"TCP Socket is not connected {LocalEndPoint}");
        }

        var ret = false;
        try
        {
            var sendToken = token;
            if (SendTimeout > 0)
            {
                // 设置发送超时时间
                var sendTokenSource = new CancellationTokenSource(SendTimeout);
                sendToken = CancellationTokenSource.CreateLinkedTokenSource(token, sendTokenSource.Token).Token;
            }

            if (DataPackageHandler != null)
            {
                data = await DataPackageHandler.SendAsync(data, sendToken);
            }

            await _client.SendAsync(data,sendToken);
            ret = true;
        }
        catch (OperationCanceledException ex)
        {
            if (token.IsCancellationRequested)
            {
                Logger.LogWarning(ex, "TCP Socket send operation was canceled from {LocalEndPoint} to {RemoteEndPoint}", LocalEndPoint, _remoteEndPoint);
            }
            else
            {
                Logger.LogWarning(ex, "TCP Socket send operation timed out from {LocalEndPoint} to {RemoteEndPoint}", LocalEndPoint, _remoteEndPoint);
            }
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "TCP Socket send failed from {LocalEndPoint} to {RemoteEndPoint}", LocalEndPoint, _remoteEndPoint);
        }
        return ret;
    }

    public override async ValueTask<Memory<byte>> ReceiveAsync(CancellationToken token = default)
    {
        if (_client is not { Online: true })
        {
            throw new InvalidOperationException($"TCP Socket is not connected {LocalEndPoint}");
        }

        if (IsAutoReceive)
        {
            throw new InvalidOperationException("Cannot call ReceiveAsync when IsAutoReceive is true. Use the auto-receive mechanism instead.");
        }

        using var block = MemoryPool<byte>.Shared.Rent(ReceiveBufferSize);
        var buffer = block.Memory;
        var len = await ReceiveCoreAsync(buffer, token);
        return buffer[0..len];
    }

    private async ValueTask AutoReceiveAsync()
    {
        _receiveCancellationTokenSource ??= new();
        while (_receiveCancellationTokenSource is { IsCancellationRequested: false })
        {
            if (_client is not { Online: true })
            {
                throw new InvalidOperationException($"TCP Socket is not connected {LocalEndPoint}");
            }

            using var block = MemoryPool<byte>.Shared.Rent(ReceiveBufferSize);
            var buffer = block.Memory;
            var len = await ReceiveCoreAsync(buffer, _receiveCancellationTokenSource.Token);
            if (len == 0)
            {
                break;
            }
        }
    }

    private async ValueTask<int> ReceiveCoreAsync(Memory<byte> buffer, CancellationToken token)
    {
        var len = 0;
        try
        {
            var receiveToken = token;
            if (ReceiveTimeout > 0)
            {
                // 设置接收超时时间
                var receiveTokenSource = new CancellationTokenSource(ReceiveTimeout);
                receiveToken = CancellationTokenSource.CreateLinkedTokenSource(receiveToken, receiveTokenSource.Token).Token;
            }

            using var result = await _receiver!.ReadAsync(receiveToken);
            if (result.IsCompleted)
            {
                Logger.LogInformation("TCP Socket {LocalEndPoint} received 0 data closed by {RemoteEndPoint}", LocalEndPoint, _remoteEndPoint);
                return 0;
            }

            result.ByteBlock.Memory.CopyTo(buffer);
            len = result.ByteBlock.Length;
            buffer = buffer[..len];

            if (ReceivedCallBack != null)
            {
                await ReceivedCallBack(buffer);
            }

            if (DataPackageHandler != null)
            {
                await DataPackageHandler.ReceiveAsync(buffer, receiveToken);
                result.ByteBlock.Seek(len);
            }
        }
        catch (OperationCanceledException ex)
        {
            if (token.IsCancellationRequested)
            {
                Logger.LogWarning(ex, "TCP Socket receive operation canceled from {LocalEndPoint} to {RemoteEndPoint}", LocalEndPoint, _remoteEndPoint);
            }
            else
            {
                Logger.LogWarning(ex, "TCP Socket receive operation timed out from {LocalEndPoint} to {RemoteEndPoint}", LocalEndPoint, _remoteEndPoint);
            }
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "TCP Socket receive failed from {LocalEndPoint} to {RemoteEndPoint}", LocalEndPoint, _remoteEndPoint);
        }
        return len;
    }

    protected override async ValueTask DisposeAsync(bool disposing)
    {
        if (disposing)
        {
            _remoteEndPoint = null;

            // 取消接收数据的任务
            if (_receiveCancellationTokenSource != null)
            {
                _receiveCancellationTokenSource.Cancel();
                _receiveCancellationTokenSource.Dispose();
                _receiveCancellationTokenSource = null;
            }

            if (_receiver != null)
            {
                _receiver.Dispose();
                _receiver = null;
            }

            // 释放 TcpClient 资源
            if (_client != null)
            {
                await _client.CloseAsync();
                _client = null;
            }
        }
    }
}
