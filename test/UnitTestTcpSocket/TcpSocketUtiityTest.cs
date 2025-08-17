// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Net;

namespace UnitTestTcpSocket;

public class TcpSocketUtiityTest
{

    [Fact]
    public void ConvertToIPAddress_Ok()
    {
        var ex = Assert.Throws<ArgumentNullException>(() => TcpSocketUtility.ConvertToIPAddress(""));
        Assert.NotNull(ex);

        var address = TcpSocketUtility.ConvertToIPAddress("any");
        Assert.Equal(IPAddress.Any, address);
    }

    [Fact]
    public void ConvertToIpEndPoint_Ok()
    {
        var ex = Assert.Throws<ArgumentOutOfRangeException>(() => TcpSocketUtility.ConvertToIpEndPoint("localhost", 88990));
        Assert.NotNull(ex);

        ex = null;
        ex = Assert.Throws<ArgumentOutOfRangeException>(() => TcpSocketUtility.ConvertToIpEndPoint("localhost", -1000));
        Assert.NotNull(ex);
    }
}
