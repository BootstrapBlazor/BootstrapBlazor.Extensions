// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Buffers.Binary;

namespace BootstrapBlazor.Socket.DataConverters;

/// <summary>
/// Socket 数据转换为 uint 数据大端转换器
/// </summary>
public class DataUInt32BigEndianConverter : IDataPropertyConverter
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
            if (BinaryPrimitives.TryReadUInt32BigEndian(paddedSpan, out var v))
            {
                ret = v;
            }
        }
        return ret;
    }
}
