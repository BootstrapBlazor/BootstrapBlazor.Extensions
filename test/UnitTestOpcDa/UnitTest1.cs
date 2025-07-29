// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace UnitTestOpcDa;

using BootstrapBlazor.OpcDa;
using Opc.Da;

public class UnitTest1
{
    [Fact]
    public async Task Test_Ok()
    {
        var server = new OpcServer();
        var ret = await server.Connect("opcda://localhost/Kepware.KEPServerEX.V6", CancellationToken.None);
        Assert.True(ret);
        Assert.True(server.IsConnected);

        var items = new Item[]
        {
            new() { ItemName = "Simulation Examples.Functions.Ramp1", SamplingRate = 1000, ClientHandle = 1 },
            new() { ItemName = "Simulation Examples.Functions.Ramp2", SamplingRate = 1000, ClientHandle = 2 }
        };

        var values = server.Read("Simulation Examples.Functions.Ramp1", "Simulation Examples.Functions.Ramp2");
        Assert.Equal(2, values.Count);
        Assert.All(values, v => Assert.Equal(BootstrapBlazor.OpcDa.Quality.Good, v.Quality));

        server.Disconnect();
        Assert.False(server.IsConnected);

        server.Dispose();
    }
}
