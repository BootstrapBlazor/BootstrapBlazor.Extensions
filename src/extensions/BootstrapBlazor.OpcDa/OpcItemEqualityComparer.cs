// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <para lang="zh"><see cref="IOpcItem"/> 比较器</para>
/// <para lang="en">Equality comparer for <see cref="IOpcItem"/></para>
/// </summary>
public class OpcItemEqualityComparer<TItem> : IEqualityComparer<TItem> where TItem : IOpcItem
{
    /// <summary>
    /// <para lang="zh">获得 <see cref="OpcItemEqualityComparer{TItem}"/> 实例</para>
    /// <para lang="en">Gets the <see cref="OpcItemEqualityComparer{TItem}"/> instance</para>
    /// </summary>
    public static OpcItemEqualityComparer<TItem> Default { get; } = new();

    /// <inheritdoc/>
    /// <param name="x"></param>
    /// <param name="y"></param>
    /// <returns></returns>
    public bool Equals(TItem? x, TItem? y) => x?.Name == y?.Name;

    /// <inheritdoc/>
    /// <param name="item"></param>
    /// <returns></returns>
    public int GetHashCode([DisallowNull] TItem item) => item.Name.GetHashCode();
}
