// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">SortableList 组件</para>
/// <para lang="en">SortableList component</para>
/// </summary>
public partial class SortableList : ISortableList
{
    /// <summary>
    /// <para lang="zh">获得/设置 配置项实例 <see cref="SortableOption"/></para>
    /// <para lang="en">Gets or sets the configuration option instance <see cref="SortableOption"/>.</para>
    /// </summary>
    [Parameter]
    public SortableOption? Option { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 子组件 必填项不可为空</para>
    /// <para lang="en">Gets or sets the child content. Required and cannot be null.</para>
    /// </summary>
    [Parameter]
    [EditorRequired]
    public RenderFragment? ChildContent { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 元素更新回调方法</para>
    /// <para lang="en">Gets or sets the callback method when an element is updated.</para>
    /// </summary>
    [Parameter]
    public Func<SortableEvent, Task>? OnUpdate { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 元素移除回调方法</para>
    /// <para lang="en">Gets or sets the callback method when an element is removed.</para>
    /// </summary>
    [Parameter]
    public Func<SortableEvent, Task>? OnRemove { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 元素增加回调方法</para>
    /// <para lang="en">Gets or sets the callback method when an element is added.</para>
    /// </summary>
    [Parameter]
    public Func<SortableEvent, Task>? OnAdd { get; set; }
    private string? ClassString => CssBuilder.Default("bb-sortable")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc />
    /// </summary>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, Option, OnUpdate != null, OnRemove != null, OnAdd != null);

    /// <summary>
    /// <para lang="zh">由 JavaScript 调用触发节点更新方法</para>
    /// <para lang="en">Called by JavaScript to trigger the node update method.</para>
    /// </summary>
    [JSInvokable]
    public async Task TriggerUpdate(List<SortableListItem> items)
    {
        if (OnUpdate != null)
        {
            var @event = new SortableEvent();
            if (items.Count == 1)
            {
                @event.OldIndex = items[0].OldIndex;
                @event.NewIndex = items[0].NewIndex;
            }
            @event.Items.AddRange(items);
            await OnUpdate(@event);
            StateHasChanged();
        }
    }

    /// <summary>
    /// <para lang="zh">由 JavaScript 调用触发节点移除方法</para>
    /// <para lang="en">Called by JavaScript to trigger the node remove method.</para>
    /// </summary>
    [JSInvokable]
    public async Task TriggerRemove(List<SortableListItem> items)
    {
        if (OnRemove != null)
        {
            var @event = new SortableEvent();
            if (items.Count == 1)
            {
                @event.OldIndex = items[0].OldIndex;
                @event.NewIndex = items[0].NewIndex;
            }
            @event.Items.AddRange(items);
            await OnRemove(@event);
            StateHasChanged();
        }
    }

    /// <summary>
    /// <para lang="zh">由 JavaScript 调用触发节点增加方法</para>
    /// <para lang="en">Called by JavaScript to trigger the node add method.</para>
    /// </summary>
    [JSInvokable]
    public async Task TriggerAdd(List<SortableListItem> items)
    {
        if (OnAdd != null)
        {
            var @event = new SortableEvent();
            if (items.Count == 1)
            {
                @event.OldIndex = items[0].OldIndex;
                @event.NewIndex = items[0].NewIndex;
            }
            @event.FromId = items.FirstOrDefault()?.FromId;
            @event.Items.AddRange(items);
            await OnAdd(@event);
            StateHasChanged();
        }
    }
}
