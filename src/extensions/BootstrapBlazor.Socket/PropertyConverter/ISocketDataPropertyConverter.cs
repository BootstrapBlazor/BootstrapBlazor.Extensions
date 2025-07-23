// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// Socket 数据转换器接口
/// </summary>
public interface ISocketDataPropertyConverter
{
    /// <summary>
    /// 将数据转换为指定类型的对象
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    object? Convert(ReadOnlyMemory<byte> data);
}
