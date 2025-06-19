// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;

namespace BootstrapBlazor.Components;

class DefaultTcpSocketFactory(IServiceProvider provider) : ITcpSocketFactory
{
    private readonly ConcurrentDictionary<string, ITcpSocketClient> _pool = new();

    public ITcpSocketClient GetOrCreate(string host, int port = 0)
    {
        return _pool.GetOrAdd($"{host}:{port}", key =>
        {
            var client = new DefaultTcpSocketClient(host, port)
            {
                Logger = provider.GetService<ILogger<DefaultTcpSocketClient>>()
            };
            return client;
        });
    }

    public ITcpSocketClient? Remove(string host, int port)
    {
        ITcpSocketClient? client = null;
        if (_pool.TryRemove($"{host}:{port}", out var c))
        {
            client = c;
        }
        return client;
    }

    private void Dispose(bool disposing)
    {
        if (disposing)
        {
            // 释放托管资源
            foreach (var socket in _pool.Values)
            {
                socket.Dispose();
            }
            _pool.Clear();
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
