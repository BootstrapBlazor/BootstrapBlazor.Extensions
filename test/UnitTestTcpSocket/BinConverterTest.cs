// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components.DataConverter;

namespace UnitTestTcpSocket;

public class BinConverterTest
{
    [Fact]
    public void ToHexString_Null()
    {
        var actual = BinConverter.ToString(null);
        Assert.Equal(string.Empty, actual);

        actual = BinConverter.ToString([]);
        Assert.Equal(string.Empty, actual);
    }

    [Fact]
    public void ToBinString_Ok()
    {
        var data = new byte[] { 0x1A, 0x02 };
        var actual = BinConverter.ToString(data);
        Assert.Equal("00011010-00000010", actual);

        actual = BinConverter.ToString(data, " ");
        Assert.Equal("00011010 00000010", actual);
    }

    [Fact]
    public void ToHexString_Exception()
    {
        var data = "00011010-00000010";
        var ex = Assert.ThrowsAny<ArgumentException>(() => BinConverter.ToBytes(data));
        Assert.NotNull(ex);
    }

    [Fact]
    public void ToBytes_Ok()
    {
        var excepted = new byte[] { 0x1A, 0x02 };

        var data = "00011010-00000010";
        var actual = BinConverter.ToBytes(data, "-");
        Assert.Equal(excepted, actual);

        data = "00011010 00000010";
        actual = BinConverter.ToBytes(data, " ");
        Assert.Equal(excepted, actual);

        data = "0001101000000010";
        actual = BinConverter.ToBytes(data);
        Assert.Equal(excepted, actual);
    }
}
