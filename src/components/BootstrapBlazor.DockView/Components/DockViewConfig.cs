// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

class DockViewConfig
{
    /// <summary>
    /// <para lang="zh">获得/设置 是否启用本地布局保持 默认 true</para>
    /// <para lang="en">Gets or sets whether to enable local layout persistence. Default is true.</para>
    /// </summary>
    public bool EnableLocalStorage { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否锁定 默认 false</para>
    /// <para lang="en">Gets or sets whether the component is locked. Default is false.</para>
    /// </summary>
    /// <remarks>锁定后无法拖动</remarks>
    [JsonPropertyName("lock")]
    public bool IsLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示锁定按钮 默认 true 显示</para>
    /// <para lang="en">Gets or sets whether the lock button is displayed. Default is true.</para>
    /// </summary>
    public bool ShowLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否悬浮 默认 false</para>
    /// <para lang="en">Gets or sets whether the component is floating. Default is false.</para>
    /// </summary>
    /// <remarks>锁定后无法拖动</remarks>
    public bool IsFloating { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示可悬浮按钮 默认 true</para>
    /// <para lang="en">Gets or sets whether the float button is displayed. Default is true.</para>
    /// </summary>
    public bool ShowFloat { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示关闭按钮 默认 true 显示</para>
    /// <para lang="en">Gets or sets whether the close button is displayed. Default is true.</para>
    /// </summary>
    public bool ShowClose { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示图钉按钮 默认 true</para>
    /// <para lang="en">Gets or sets whether the pin button is displayed. Default is true.</para>
    /// </summary>
    public bool ShowPin { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示最大化按钮 默认 true</para>
    /// <para lang="en">Gets or sets whether the maximize button is displayed. Default is true.</para>
    /// </summary>
    public bool ShowMaximize { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 客户端渲染模式 默认 null 客户端默认使用 always onlyWhenVisible 值</para>
    /// <para lang="en">Gets or sets the client render mode. Default is null, the client will use always onlyWhenVisible value.</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public DockViewRenderMode Renderer { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标签页可见状态改变事件回调</para>
    /// <para lang="en">Gets or sets the callback for when the tab visibility changes.</para>
    /// </summary>
    public string? PanelVisibleChangedCallback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件初始化完成事件回调</para>
    /// <para lang="en">Gets or sets the callback for when the component is initialized.</para>
    /// </summary>
    public string? InitializedCallback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 锁定事件回调</para>
    /// <para lang="en">Gets or sets the callback for when the lock state changes.</para>
    /// </summary>
    public string? LockChangedCallback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 分割栏调整事件回调</para>
    /// <para lang="en">Gets or sets the callback for when the splitter is adjusted.</para>
    /// </summary>
    public string? SplitterCallback { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 加载当前激活标签页事件回调</para>
    /// <para lang="en">Gets or sets the callback for loading the currently active tab.</para>
    /// </summary>
    public string? LoadTabs { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 客户端缓存键值</para>
    /// <para lang="en">Gets or sets the client-side cache key.</para>
    /// </summary>
    public string? LocalStorageKey { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 配置项集合 默认 空集合</para>
    /// <para lang="en">Gets or sets the configuration items. Default is an empty collection.</para>
    /// </summary>
    [JsonPropertyName("content")]
    [JsonConverter(typeof(DockViewComponentConverter))]
    public List<DockViewComponentBase> Contents { get; set; } = [];

    /// <summary>
    /// <para lang="zh">获得/设置 组件主题 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the component theme. Default is null, not set.</para>
    /// </summary>
    public string? Theme { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 布局配置 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the layout configuration. Default is null, not set.</para>
    /// </summary>
    public string? LayoutConfig { get; set; }
}
