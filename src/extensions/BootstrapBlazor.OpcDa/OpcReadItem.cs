// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <para lang="zh">OPC Item 读取实体类</para>
/// <para lang="en">OPC item read model</para>
/// </summary>
public record struct OpcReadItem(string Name, Quality Quality, DateTime Timestamp, object? Value) : IOpcItem
{
    /// <summary>
    /// <para lang="zh">获得 Opc Item 上次值</para>
    /// <para lang="en">Gets the previous item value</para>
    /// </summary>
    public object? LastValue { get; set; }
}
