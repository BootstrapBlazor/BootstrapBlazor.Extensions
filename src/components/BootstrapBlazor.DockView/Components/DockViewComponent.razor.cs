// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockView 组件配置项，对应 content 配置项中的组件项</para>
/// <para lang="en">DockView component option corresponding to a component item in the content configuration</para>
/// </summary>
public partial class DockViewComponent
{
    /// <summary>
    /// <para lang="zh">获得/设置 组件是否显示标题栏，默认为 true</para>
    /// <para lang="en">Gets or sets whether the component header is displayed. Default is true</para>
    /// </summary>
    [Parameter]
    public bool ShowHeader { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 组件标题</para>
    /// <para lang="en">Gets or sets the component title</para>
    /// </summary>
    [Parameter]
    public string? Title { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件标题宽度，默认为 null</para>
    /// <para lang="en">Gets or sets the component title width. Default is null</para>
    /// </summary>
    [Parameter]
    public int? TitleWidth { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件标题样式类，默认为 null</para>
    /// <para lang="en">Gets or sets the component title CSS class. Default is null</para>
    /// </summary>
    [Parameter]
    public string? TitleClass { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标题模板，默认为 null</para>
    /// <para lang="en">Gets or sets the title template. Default is null</para>
    /// </summary>
    [Parameter]
    public RenderFragment? TitleTemplate { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件样式类，默认为 null</para>
    /// <para lang="en">Gets or sets the component CSS class. Default is null</para>
    /// </summary>
    [Parameter]
    public string? Class { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件是否可见，默认为 true</para>
    /// <para lang="en">Gets or sets whether the component is visible. Default is true</para>
    /// </summary>
    [Parameter]
    public bool Visible { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 组件是否允许关闭，默认为 null，未设置时使用 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the component can be closed. Default is null. When not set, the DockView configuration is used</para>
    /// </summary>
    [Parameter]
    public bool? ShowClose { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件唯一标识，默认为 null，未设置时使用 Title 作为唯一标识</para>
    /// <para lang="en">Gets or sets the unique component identifier. Default is null. When not set, Title is used as the unique identifier</para>
    /// </summary>
    [Parameter]
    public string? Key { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件是否锁定，默认为 null，未设置时使用 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the component is locked. Default is null. When not set, the DockView configuration is used</para>
    /// </summary>
    [Parameter]
    public bool? IsLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示锁定按钮，默认为 null，未设置时使用 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the lock button is displayed. Default is null. When not set, the DockView configuration is used</para>
    /// </summary>
    [Parameter]
    public bool? ShowLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否悬浮，默认为 null，未设置时使用 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the component is floating. Default is null. When not set, the DockView configuration is used</para>
    /// </summary>
    [Parameter]
    public bool? IsFloating { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示悬浮按钮，默认为 null，未设置时使用 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the float button is displayed. Default is null. When not set, the DockView configuration is used</para>
    /// </summary>
    [Parameter]
    public bool? ShowFloat { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示最大化按钮，默认为 null，未设置时使用 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the maximize button is displayed. Default is null. When not set, the DockView configuration is used</para>
    /// </summary>
    [Parameter]
    public bool? ShowMaximize { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件渲染模式，默认为 null，未设置时使用 DockView 的配置</para>
    /// <para lang="en">Gets or sets the component render mode. Default is null. When not set, the DockView configuration is used</para>
    /// </summary>
    [Parameter]
    public string? Renderer { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示标题前置图标，默认为 false</para>
    /// <para lang="en">Gets or sets whether the leading title icon is displayed. Default is false</para>
    /// </summary>
    [Parameter]
    [JsonIgnore]
    public bool ShowTitleBar { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标题前置图标，默认为 null，未设置时使用默认图标</para>
    /// <para lang="en">Gets or sets the leading title icon. Default is null. When not set, the default icon is used</para>
    /// </summary>
    [Parameter]
    [JsonIgnore]
    public string? TitleBarIcon { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标题前置图标地址，默认为 null，未设置时使用默认图标</para>
    /// <para lang="en">Gets or sets the leading title icon URL. Default is null. When not set, the default icon is used</para>
    /// </summary>
    [Parameter]
    [JsonIgnore]
    public string? TitleBarIconUrl { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标题前置图标点击回调方法，默认为 null</para>
    /// <para lang="en">Gets or sets the click callback for the leading title icon. Default is null</para>
    /// </summary>
    [Parameter]
    public Func<Task>? OnClickTitleBarCallback { get; set; }

    [CascadingParameter]
    [NotNull]
    private DockViewV2? DockView { get; set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();

        Type = DockViewContentType.Component;

        // 增加组件状态用于序列化
        DockView?.AddComponentState(new DockViewComponentState(this) { Key = Key });
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        // 同步组件状态到缓存
        DockView.UpdateComponentState(Key, Visible, IsLock);
    }

    private async Task OnClickBar()
    {
        if (OnClickTitleBarCallback != null)
        {
            await OnClickTitleBarCallback();
        }
    }

    private bool IsRender() => DockView.IsRender(Key);

    internal void SetVisible(bool visible) => Visible = visible;

    internal void SetLock(bool isLock) => IsLock = isLock;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="disposing"></param>
    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);

        DockView.RemoveComponentState(Key);
    }
}
