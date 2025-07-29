// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

using Opc.Da;

/// <summary>
/// OPC Item 配置实体类
/// </summary>
public record struct OpcItem(string Name, Quality Quality, DateTime Timestamp, object? Value)
{
    /// <summary>
    /// 获得 Opc Item 上次值
    /// </summary>
    public object? LastValue { get; set; }
}
