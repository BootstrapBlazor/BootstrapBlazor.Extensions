// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Buffers.Binary;

namespace BootstrapBlazor.DataConverters;

/// <summary>
/// Sokcet 数据转换为 uint 数据小端转换器
/// </summary>
public class DataUInt32LittleEndianConverter : IDataPropertyConverter
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="data"></param>
    public object? Convert(ReadOnlyMemory<byte> data)
    {
        uint ret = 0;
        if (data.Length <= 4)
        {
            Span<byte> paddedSpan = stackalloc byte[4];
            data.Span.CopyTo(paddedSpan[(4 - data.Length)..]);
            if (BinaryPrimitives.TryReadUInt32LittleEndian(paddedSpan, out var v))
            {
                ret = v;
            }
        }
        return ret;
    }
}
