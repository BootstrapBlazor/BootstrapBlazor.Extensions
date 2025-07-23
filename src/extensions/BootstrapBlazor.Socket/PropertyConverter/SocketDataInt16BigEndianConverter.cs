// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Buffers.Binary;

namespace BootstrapBlazor.Components;

/// <summary>
/// Sokcet 数据转换为 short 数据大端转换器
/// </summary>
public class SocketDataInt16BigEndianConverter : ISocketDataPropertyConverter
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
            if (BinaryPrimitives.TryReadInt16BigEndian(paddedSpan, out var v))
            {
                ret = v;
            }
        }
        return ret;
    }
}
