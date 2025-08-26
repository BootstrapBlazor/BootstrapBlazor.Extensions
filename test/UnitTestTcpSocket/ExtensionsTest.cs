// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components.DataConverter;

namespace UnitTestTcpSocket;

public class ExtensionsTest
{
    [Fact]
    public void ToHexString_Ok()
    {
        var data = new byte[] { 0x1A, 0x02, 0x13, 0x04, 0xFE };
        var actual = HexConverter.ToString(data);
        Assert.Equal("1A-02-13-04-FE", actual);

        actual = HexConverter.ToString(data, " ");
        Assert.Equal("1A 02 13 04 FE", actual);
    }

    [Fact]
    public void ToByte_Ok()
    {
        var excepted = new byte[] { 0x1A, 0x02, 0x13, 0x04, 0xFE };

        var data = "1A021304FE";
        var actual = HexConverter.ToByte(data);
        Assert.Equal(excepted, actual);

        data = "1A-02-13-04-FE";
        actual = HexConverter.ToByte(data, "-");
        Assert.Equal(excepted, actual);

        data = "1A 02 13 04 FE";
        actual = HexConverter.ToByte(data, " ");
        Assert.Equal(excepted, actual);
    }
}
