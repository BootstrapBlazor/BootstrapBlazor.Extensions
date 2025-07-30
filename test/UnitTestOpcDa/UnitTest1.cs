// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace UnitTestOpcDa;

using BootstrapBlazor.OpcDa;
using Microsoft.Extensions.DependencyInjection;
using System.Runtime.Versioning;

[SupportedOSPlatform("windows")]
public class UnitTest1
{
    [Fact]
    public void Write_Ok()
    {
        var sc = new ServiceCollection();
        sc.AddOpcServer();

        var sp = sc.BuildServiceProvider();
        var server = sp.GetRequiredService<IOpcServer>();
        var ret = server.Connect("opcda://localhost/Kepware.KEPServerEX.V6");
        Assert.True(ret);
        Assert.True(server.IsConnected);

        var values = server.Read("Simulation Examples.Functions.Ramp1", "Simulation Examples.Functions.Ramp2");
        Assert.Equal(2, values.Count);
        Assert.All(values, v => Assert.Equal(Quality.Good, v.Quality));

        var results = server.Write(new OpcWriteItem()
        {
            Name = "Channel1.Device1.Tag3",
            Value = 123
        });
        Assert.All(results, v => Assert.True(v.Result));

        server.Disconnect();
        Assert.False(server.IsConnected);

        server.Dispose();
    }
}
