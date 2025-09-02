// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace UnitTestTcpSocket;

public class TcpSocketPropertyConverterTest
{
    [Fact]
    public void UInt16Converter_Ok()
    {
        var converter = new DataUInt16LittleEndianConverter();
        var actual = converter.Convert(new byte[] { 0xFF, 0x00 });
        Assert.Equal((ushort)0xFF, actual);
    }

    [Fact]
    public void Int16Converter_Ok()
    {
        var converter = new DataInt16LittleEndianConverter();
        var actual = converter.Convert(new byte[] { 0xFF, 0x00 });
        Assert.Equal((short)0xFF, actual);
    }

    [Fact]
    public void UInt32Converter_Ok()
    {
        var converter = new DataUInt32LittleEndianConverter();
        var actual = converter.Convert(new byte[] { 0xFF, 0x00, 0x00, 0x00 });
        Assert.Equal((uint)0xFF, actual);
    }

    [Fact]
    public void Int32Converter_Ok()
    {
        var converter = new DataInt32LittleEndianConverter();
        var actual = converter.Convert(new byte[] { 0xFF, 0x00, 0x00, 0x00 });
        Assert.Equal(0xFF, actual);
    }

    [Fact]
    public void UInt64Converter_Ok()
    {
        var converter = new DataUInt64LittleEndianConverter();
        var actual = converter.Convert(new byte[] { 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 });
        Assert.Equal((ulong)0xFF, actual);
    }

    [Fact]
    public void Int64Converter_Ok()
    {
        var converter = new DataInt64LittleEndianConverter();
        var actual = converter.Convert(new byte[] { 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 });
        Assert.Equal((long)0xFF, actual);
    }

    [Fact]
    public void SingleConverter_Ok()
    {
        var converter = new DataSingleLittleEndianConverter();
        var actual = converter.Convert(new byte[] { 0xC3, 0xF5, 0x48, 0x40 });
        Assert.Equal((float)3.14, actual);
    }

    [Fact]
    public void DoubleConverter_Ok()
    {
        var converter = new DataDoubleLittleEndianConverter();
        var actual = converter.Convert(new byte[] { 0x1F, 0x85, 0xEB, 0x51, 0xB8, 0x1E, 0x09, 0x40 });
        Assert.Equal(3.14, actual);
    }

    [Fact]
    public void ByteConverter_Ok()
    {
        var converter = new DataByteConverter();
        var actual = converter.Convert(new byte[] { 0xFF });
        Assert.Equal((byte)0xFF, actual);

        actual = converter.Convert(Array.Empty<byte>());
        Assert.Equal((byte)0x0, actual);
    }
}
