// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Buffers.Binary;

namespace BootstrapBlazor.DataConverters;

/// <summary>
/// Sokcet 数据转换为 short 数据小端转换器
/// </summary>
public class DataInt16LittleEndianConverter : IDataPropertyConverter
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="data"></param>
    public object? Convert(ReadOnlyMemory<byte> data)
    {
        short ret = 0;
        if (data.Length <= 2)
        {
            Span<byte> paddedSpan = stackalloc byte[2];
            data.Span.CopyTo(paddedSpan[(2 - data.Length)..]);
            if (BinaryPrimitives.TryReadInt16LittleEndian(paddedSpan, out var v))
            {
                ret = v;
            }
        }
        return ret;
    }
}
