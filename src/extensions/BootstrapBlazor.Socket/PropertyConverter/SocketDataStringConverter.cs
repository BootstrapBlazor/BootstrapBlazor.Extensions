// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Text;

namespace BootstrapBlazor.Components;

/// <summary>
/// Sokcet 数据转换为 string 数据转换器
/// </summary>
public class SocketDataStringConverter(string? encodingName) : ISocketDataPropertyConverter
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="data"></param>
    public object? Convert(ReadOnlyMemory<byte> data)
    {
        var encoding = string.IsNullOrEmpty(encodingName) ? Encoding.UTF8 : Encoding.GetEncoding(encodingName);
        return encoding.GetString(data.Span);
    }
}
