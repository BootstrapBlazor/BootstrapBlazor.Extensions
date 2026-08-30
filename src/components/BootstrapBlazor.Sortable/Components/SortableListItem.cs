// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">SortableListItem 类</para>
/// <para lang="en">SortableListItem class</para>
/// </summary>
public class SortableListItem
{
    /// <summary>
    /// <para lang="zh">获得/设置 原始项所属容器 Id</para>
    /// <para lang="en">Gets or sets the container Id of the original item.</para>
    /// </summary>
    [NotNull]
    public string? FromId { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 原始索引</para>
    /// <para lang="en">Gets or sets the original index.</para>
    /// </summary>
    public int OldIndex { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 新索引</para>
    /// <para lang="en">Gets or sets the new index.</para>
    /// </summary>
    public int NewIndex { get; set; }
}
