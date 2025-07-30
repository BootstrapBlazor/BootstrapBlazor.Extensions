// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <see cref="IOpcItem"/> 比较器
/// </summary>
public class OpcItemEqualityComparer<TItem> : IEqualityComparer<TItem> where TItem : IOpcItem
{
    /// <summary>
    /// 获得 <see cref="OpcItemEqualityComparer{TItem}"/> 实例
    /// </summary>
    public static OpcItemEqualityComparer<TItem> Default { get; } = new();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="x"></param>
    /// <param name="y"></param>
    /// <returns></returns>
    public bool Equals(TItem? x, TItem? y) => x?.Name == y?.Name;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    public int GetHashCode([DisallowNull] TItem item) => item.Name.GetHashCode();
}
