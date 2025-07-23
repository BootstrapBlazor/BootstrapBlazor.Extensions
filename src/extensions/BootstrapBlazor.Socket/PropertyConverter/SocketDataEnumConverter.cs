// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// Sokcet 数据转换为 Enum 数据转换器
/// </summary>
public class SocketDataEnumConverter(Type? type) : ISocketDataPropertyConverter
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="data"></param>
    public object? Convert(ReadOnlyMemory<byte> data)
    {
        object? ret = null;
        if (type != null)
        {
            if (data.Length == 1)
            {
                var v = data.Span[0];
                if (Enum.TryParse(type, v.ToString(), out var enumValue))
                {
                    ret = enumValue;
                }
            }
        }
        return ret;
    }
}
