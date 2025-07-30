// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// OPC Item 写入实体类
/// </summary>
public record struct OpcWriteItem(string Name, object? Value) : IOpcItem
{
    /// <summary>
    /// 获得/设置 写入结果
    /// </summary>
    public bool Result { get; set; }
}
