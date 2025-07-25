﻿// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Collections.Concurrent;
using System.Runtime.Versioning;

namespace BootstrapBlazor.TcpSocket;

[UnsupportedOSPlatform("browser")]
sealed class DefaultTcpSocketFactory(IServiceProvider provider) : ITcpSocketFactory
{
    private readonly ConcurrentDictionary<string, ITcpSocketClient> _pool = new();

    public ITcpSocketClient GetOrCreate(string name, Action<TcpSocketClientOptions> valueFactory)
    {
        return _pool.GetOrAdd(name, key =>
        {
            var options = new TcpSocketClientOptions();
            valueFactory(options);
            var client = new DefaultTcpSocketClient(options)
            {
                ServiceProvider = provider,
            };
            return client;
        });
    }

    public ITcpSocketClient? Remove(string name)
    {
        ITcpSocketClient? client = null;
        if (_pool.TryRemove(name, out var c))
        {
            client = c;
        }
        return client;
    }

    private async ValueTask DisposeAsync(bool disposing)
    {
        if (disposing)
        {
            // 释放托管资源
            foreach (var socket in _pool.Values)
            {
                await socket.DisposeAsync();
            }
            _pool.Clear();
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async ValueTask DisposeAsync()
    {
        await DisposeAsync(true);
        GC.SuppressFinalize(this);
    }
}
