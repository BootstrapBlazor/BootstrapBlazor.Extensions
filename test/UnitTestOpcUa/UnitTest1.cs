// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.OpcUa;
using Opc.Ua;

namespace UnitTestOpcUa;

public class UnitTest1
{
    [Fact]
    public async Task AddOpcUaServer_Ok()
    {
        var services = new ServiceCollection();
        services.AddOpcUaServer();

        await using var provider = services.BuildServiceProvider();
        await using var scope1 = provider.CreateAsyncScope();
        await using var scope2 = provider.CreateAsyncScope();
        var server = scope1.ServiceProvider.GetRequiredService<IOpcUaServer>();

        Assert.Same(server, scope1.ServiceProvider.GetRequiredService<IOpcUaServer>());
        Assert.NotSame(server, scope2.ServiceProvider.GetRequiredService<IOpcUaServer>());
        Assert.False(server.IsConnected);
        Assert.Null(server.EndpointUrl);
    }

    [Fact]
    public async Task Operation_NotConnected()
    {
        var services = new ServiceCollection();
        services.AddOpcUaServer();

        await using var provider = services.BuildServiceProvider();
        var server = provider.GetRequiredService<IOpcUaServer>();

        await Assert.ThrowsAsync<InvalidOperationException>(() => server.ReadAsync(["ns=2;s=Tag"]));
        await Assert.ThrowsAsync<InvalidOperationException>(() => server.WriteAsync([new OpcUaWriteItem("ns=2;s=Tag", 1)]));
        await Assert.ThrowsAsync<InvalidOperationException>(() => server.BrowseAsync("i=85"));
        await Assert.ThrowsAsync<InvalidOperationException>(() => server.CreateSubscriptionAsync("Test"));
    }

    [Fact]
    public void Model_Ok()
    {
        var timestamp = DateTime.UtcNow;
        var readItem = new OpcUaReadItem("ns=2;s=Tag", 10, StatusCodes.Good, timestamp, timestamp)
        {
            LastValue = 9
        };
        var writeItem = new OpcUaWriteItem("ns=2;s=Tag", 10)
        {
            StatusCode = StatusCodes.BadNotWritable
        };

        Assert.True(readItem.IsGood);
        Assert.Equal(9, readItem.LastValue);
        Assert.False(writeItem.Result);
    }

    [Fact]
    public async Task Dispose_Ok()
    {
        var services = new ServiceCollection();
        services.AddOpcUaServer();

        await using var provider = services.BuildServiceProvider();
        var server = provider.GetRequiredService<IOpcUaServer>();
        await server.DisposeAsync();

        await Assert.ThrowsAsync<ObjectDisposedException>(() => server.DisconnectAsync());
    }

    [Fact]
    public async Task Connect_Options()
    {
        var services = new ServiceCollection();
        services.AddOpcUaServer();

        await using var provider = services.BuildServiceProvider();
        var server = provider.GetRequiredService<IOpcUaServer>();

        await Assert.ThrowsAsync<ArgumentException>(() => server.ConnectAsync("", new OpcUaConnectionOptions()));
        await Assert.ThrowsAsync<ArgumentException>(() => server.ConnectAsync("opc.tcp://localhost:4840", new OpcUaConnectionOptions
        {
            UseSecurity = true
        }));
        await Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => server.ConnectAsync("opc.tcp://localhost:4840", new OpcUaConnectionOptions
        {
            OperationTimeout = 0
        }));
    }
}
