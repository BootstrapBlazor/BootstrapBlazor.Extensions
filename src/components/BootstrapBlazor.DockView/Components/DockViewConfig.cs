// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockView 配置项</para>
/// <para lang="en">DockView configuration options</para>
/// </summary>
class DockViewConfig
{
    /// <summary>
    /// <para lang="zh">获得/设置 是否首次加载，默认为 false</para>
    /// <para lang="en">Gets or sets whether it is the first render. Default is false</para>
    /// </summary>
    public bool FirstRender { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否启用本地布局持久化，默认为 true</para>
    /// <para lang="en">Gets or sets whether local layout persistence is enabled. Default is true</para>
    /// </summary>
    public bool EnableLocalStorage { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否锁定，默认为 false</para>
    /// <para lang="en">Gets or sets whether the component is locked. Default is false</para>
    /// </summary>
    [JsonPropertyName("lock")]
    public bool IsLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示锁定按钮，默认为 true</para>
    /// <para lang="en">Gets or sets whether the lock button is displayed. Default is true</para>
    /// </summary>
    public bool ShowLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否悬浮，默认为 false</para>
    /// <para lang="en">Gets or sets whether the component is floating. Default is false</para>
    /// </summary>
    public bool IsFloating { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示悬浮按钮，默认为 true</para>
    /// <para lang="en">Gets or sets whether the float button is displayed. Default is true</para>
    /// </summary>
    public bool ShowFloat { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示关闭按钮，默认为 true</para>
    /// <para lang="en">Gets or sets whether the close button is displayed. Default is true</para>
    /// </summary>
    public bool ShowClose { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示图钉按钮，默认为 true</para>
    /// <para lang="en">Gets or sets whether the pin button is displayed. Default is true</para>
    /// </summary>
    public bool ShowPin { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示最大化按钮，默认为 true</para>
    /// <para lang="en">Gets or sets whether the maximize button is displayed. Default is true</para>
    /// </summary>
    public bool ShowMaximize { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 客户端渲染模式</para>
    /// <para lang="en">Gets or sets the client render mode</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public DockViewRenderMode Renderer { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标签页可见状态变更回调名称</para>
    /// <para lang="en">Gets or sets the callback name for tab visibility state changes</para>
    /// </summary>
    public string? PanelVisibleChangedCallback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件初始化完成回调名称</para>
    /// <para lang="en">Gets or sets the callback name for component initialization completion</para>
    /// </summary>
    public string? InitializedCallback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 锁定状态变更回调名称</para>
    /// <para lang="en">Gets or sets the callback name for lock state changes</para>
    /// </summary>
    public string? LockChangedCallback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 分割器调整回调名称</para>
    /// <para lang="en">Gets or sets the callback name for splitter adjustments</para>
    /// </summary>
    public string? SplitterCallback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 加载标签页回调名称</para>
    /// <para lang="en">Gets or sets the callback name for loading tabs</para>
    /// </summary>
    public string? LoadTabs { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 客户端缓存键</para>
    /// <para lang="en">Gets or sets the client-side cache key</para>
    /// </summary>
    public string? LocalStorageKey { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 配置项集合，默认为空集合</para>
    /// <para lang="en">Gets or sets the configuration items. Default is an empty collection</para>
    /// </summary>
    [JsonPropertyName("content")]
    [JsonConverter(typeof(DockViewComponentConverter))]
    public List<DockViewComponentBase> Contents { get; set; } = [];

    /// <summary>
    /// <para lang="zh">获得/设置 组件主题，默认为 null</para>
    /// <para lang="en">Gets or sets the component theme. Default is null</para>
    /// </summary>
    public string? Theme { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 布局配置，默认为 null</para>
    /// <para lang="en">Gets or sets the layout configuration. Default is null</para>
    /// </summary>
    public string? LayoutConfig { get; set; }
}
