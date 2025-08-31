// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Socket.DataConverters;

/// <summary>
/// Socket 数据转换为 bool 数据转换器
/// </summary>
public class DataBoolConverter : IDataPropertyConverter
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="data"></param>
    public object? Convert(ReadOnlyMemory<byte> data)
    {
        var ret = false;
        if (data.Length == 1)
        {
            ret = data.Span[0] != 0x00;
        }
        return ret;
    }
}
