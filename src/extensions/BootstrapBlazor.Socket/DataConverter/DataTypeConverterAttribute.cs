// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.DataConverters;

/// <summary>
/// 
/// </summary>
[AttributeUsage(AttributeTargets.Class)]
public class DataTypeConverterAttribute : Attribute
{
    /// <summary>
    /// Gets or sets the type of the <see cref="IDataConverter{TEntity}"/>.
    /// </summary>
    public Type? Type { get; set; }
}
