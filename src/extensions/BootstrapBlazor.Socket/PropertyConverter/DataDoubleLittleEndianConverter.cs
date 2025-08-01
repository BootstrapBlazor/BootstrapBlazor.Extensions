﻿// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Buffers.Binary;

namespace BootstrapBlazor.DataConverters;

/// <summary>
/// Sokcet 数据转换为 double 数据小端转换器
/// </summary>
public class DataDoubleLittleEndianConverter : IDataPropertyConverter
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="data"></param>
    public object? Convert(ReadOnlyMemory<byte> data)
    {
        double ret = 0;
        if (data.Length <= 8)
        {
            Span<byte> paddedSpan = stackalloc byte[8];
            data.Span.CopyTo(paddedSpan[(8 - data.Length)..]);
            if (BinaryPrimitives.TryReadDoubleLittleEndian(paddedSpan, out var v))
            {
                ret = v;
            }
        }
        return ret;
    }
}
