// Copyright (c) Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">SortableOption 配置类</para>
/// <para lang="en">SortableOption configuration class</para>
/// </summary>
public class SortableOption
{
    /// <summary>
    /// <para lang="zh">获得/设置 目标元素选择器</para>
    /// <para lang="en">Gets or sets the target element selector.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? RootSelector { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 分组配置</para>
    /// <para lang="en">Gets or sets the group configuration.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Group { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 拖动时是否克隆元素 默认 null 未设置 不克隆</para>
    /// <para lang="en">Gets or sets whether to clone the element when dragging. Default is null (no clone).</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Clone { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否允许拖动回来 默认 null 未设置 允许</para>
    /// <para lang="en">Gets or sets whether to allow dragging back. Default is null (allowed).</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Putback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否允许列表内排序</para>
    /// <para lang="en">Gets or sets whether sorting inside the list is allowed.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Sort { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 开始排序的延迟时间(毫秒)</para>
    /// <para lang="en">Gets or sets the time in milliseconds to define when the sorting should start.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Delay { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否仅在触摸操作时延迟</para>
    /// <para lang="en">Gets or sets whether to only delay if the user is using touch.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? DelayOnTouchOnly { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 取消延迟拖动事件前点应移动的像素数</para>
    /// <para lang="en">Gets or sets how many pixels the point should move before cancelling a delayed drag event.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? TouchStartThreshold { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否禁用排序</para>
    /// <para lang="en">Gets or sets whether the sortable is disabled.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Disabled { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 排序时移动项目的动画速度(毫秒) 0 表示无动画</para>
    /// <para lang="en">Gets or sets the animation speed in milliseconds when sorting items. 0 means no animation.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Animation { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 动画缓动函数 默认 null</para>
    /// <para lang="en">Gets or sets the easing for animation. Default is null.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Easing { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 列表项内的拖动句柄选择器</para>
    /// <para lang="en">Gets or sets the drag handle selector within list items.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Handle { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 不允许拖动的选择器</para>
    /// <para lang="en">Gets or sets the selectors that do not lead to dragging.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Filter { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 触发过滤时是否调用 event.preventDefault()</para>
    /// <para lang="en">Gets or sets whether to call event.preventDefault() when filter is triggered.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? PreventOnFilter { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 元素内可拖动项的选择器</para>
    /// <para lang="en">Gets or sets which items inside the element should be draggable.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Draggable { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 toArray() 方法使用的 HTML 属性</para>
    /// <para lang="en">Gets or sets the HTML attribute used by the toArray() method.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DataIdAttr { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 拖放占位符的样式类名</para>
    /// <para lang="en">Gets or sets the class name for the drop placeholder.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? GhostClass { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 选中项的样式类名</para>
    /// <para lang="en">Gets or sets the class name for the chosen item.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ChosenClass { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 拖动项的样式类名</para>
    /// <para lang="en">Gets or sets the class name for the dragging item.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DragClass { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 交换区域的阈值</para>
    /// <para lang="en">Gets or sets the threshold of the swap zone.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? SwapThreshold { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否始终使用反转交换区域</para>
    /// <para lang="en">Gets or sets whether to always use the inverted swap zone.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? InvertSwap { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 反转交换区域的阈值</para>
    /// <para lang="en">Gets or sets the threshold of the inverted swap zone.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? InvertedSwapThreshold { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 排序方向</para>
    /// <para lang="en">Gets or sets the direction of sortable.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Direction { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否忽略 HTML5 DnD 行为强制使用回退方案</para>
    /// <para lang="en">Gets or sets whether to ignore the HTML5 DnD behaviour and force the fallback to kick in.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? ForceFallback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 使用 forceFallback 时克隆 DOM 元素的样式类名</para>
    /// <para lang="en">Gets or sets the class name for the cloned DOM element when using forceFallback.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FallbackClass { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否将克隆的 DOM 元素追加到 Document 的 Body 中</para>
    /// <para lang="en">Gets or sets whether to append the cloned DOM element into the document's body.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? FallbackOnBody { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 鼠标移动多少像素后被视为拖动</para>
    /// <para lang="en">Gets or sets how far in pixels the mouse should move before it is considered as a drag.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? FallbackTolerance { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否允许 dragover 事件冒泡</para>
    /// <para lang="en">Gets or sets whether the dragover event should bubble.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? DragoverBubble { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 不显示时是否移除克隆元素而不是隐藏</para>
    /// <para lang="en">Gets or sets whether to remove the clone element when it is not showing, rather than just hiding it.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? RemoveCloneOnHide { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 鼠标距离空排序容器多少像素时可插入拖动元素</para>
    /// <para lang="en">Gets or sets the distance in pixels the mouse must be from an empty sortable to insert a drag element into it.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? EmptyInsertThreshold { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否允许多拖动 默认 null 未设置</para>
    /// <para lang="en">Gets or sets whether multi-drag is allowed. Default is null.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? MultiDrag { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否交换拖动 默认 null 未设置</para>
    /// <para lang="en">Gets or sets whether swap dragging is enabled. Default is null.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Swap { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 交换拖动项样式名称 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the class name for the swap dragging item. Default is null.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? SwapClass { get; set; }
}
