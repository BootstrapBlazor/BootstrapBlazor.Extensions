﻿// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 
/// </summary>
[AttributeUsage(AttributeTargets.Class)]
public class SocketDataTypeConverterAttribute : Attribute
{
    /// <summary>
    /// Gets or sets the type of the <see cref="ISocketDataConverter{TEntity}"/>.
    /// </summary>
    public Type? Type { get; set; }
}
