// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <para lang="zh">OPC Item 写入实体类</para>
/// <para lang="en">OPC item write model</para>
/// </summary>
public record struct OpcWriteItem(string Name, object? Value) : IOpcItem
{
    /// <summary>
    /// <para lang="zh">获得/设置 写入结果</para>
    /// <para lang="en">Gets or sets the write result</para>
    /// </summary>
    public bool Result { get; set; }
}
