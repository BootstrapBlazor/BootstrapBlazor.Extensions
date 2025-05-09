// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components.Interfaces;

public interface INodeSlot
{
    /// <summary>
    /// slot name
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// node下的唯一id
    /// </summary>
    public string Id { get; set; }
    /// <summary>
    /// 数据类型
    /// </summary>
    public Type ValueType { get; }
}
