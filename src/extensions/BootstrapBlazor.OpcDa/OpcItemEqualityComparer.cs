// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <see cref="OpcItem"/> 比较器
/// </summary>
public class OpcItemEqualityComparer : IEqualityComparer<OpcItem>
{
    /// <summary>
    /// 获得 <see cref="OpcItemEqualityComparer"/> 实例
    /// </summary>
    public static OpcItemEqualityComparer Default { get; } = new();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="x"></param>
    /// <param name="y"></param>
    /// <returns></returns>
    public bool Equals(OpcItem x, OpcItem y) => x.Name == y.Name;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    public int GetHashCode([DisallowNull] OpcItem item) => item.Name.GetHashCode();
}
