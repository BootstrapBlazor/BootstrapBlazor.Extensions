// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">SortableEvent 类</para>
/// <para lang="en">SortableEvent class</para>
/// </summary>
public class SortableEvent
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
    [NotNull]
    public int OldIndex { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 新索引</para>
    /// <para lang="en">Gets or sets the new index.</para>
    /// </summary>
    [NotNull]
    public int NewIndex { get; set; }

    /// <summary>
    /// <para lang="zh">获得 移动元素 <see cref="SortableListItem"/> 集合</para>
    /// <para lang="en">Gets the collection of moved <see cref="SortableListItem"/> elements.</para>
    /// </summary>
    public List<SortableListItem> Items { get; } = [];
}
