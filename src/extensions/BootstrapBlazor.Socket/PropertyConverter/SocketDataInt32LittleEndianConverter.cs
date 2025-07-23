// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Buffers.Binary;

namespace BootstrapBlazor.Components;

/// <summary>
/// Sokcet 数据转换为 int 数据小端转换器
/// </summary>
public class SocketDataInt32LittleEndianConverter : ISocketDataPropertyConverter
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="data"></param>
    public object? Convert(ReadOnlyMemory<byte> data)
    {
        var ret = 0;
        if (data.Length <= 4)
        {
            Span<byte> paddedSpan = stackalloc byte[4];
            data.Span.CopyTo(paddedSpan[(4 - data.Length)..]);

            if (BinaryPrimitives.TryReadInt32LittleEndian(paddedSpan, out var v))
            {
                ret = v;
            }
        }
        return ret;
    }
}
