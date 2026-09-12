// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <para lang="zh">OpcDa 数据项接口</para>
/// <para lang="en">OpcDa item interface</para>
/// </summary>
public interface IOpcItem
{
    /// <summary>
    /// <para lang="zh">获得 数据项名称</para>
    /// <para lang="en">Gets the item name</para>
    /// </summary>
    string Name { get; }
}
