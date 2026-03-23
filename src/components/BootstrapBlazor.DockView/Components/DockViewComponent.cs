// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Rendering;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockContentItem 配置项子项对标 content 配置项内部 content 配置</para>
/// <para lang="en">DockContentItem configuration item sub-item corresponds to the content configuration item inside the content configuration item</para>
/// </summary>
public class DockViewComponent : DockViewComponentBase
{
    /// <summary>
    /// <para lang="zh">获得/设置 组件是否显示 Header 默认 true 显示</para>
    /// <para lang="en">Gets or sets whether the component header is displayed. Default is true.</para>
    /// </summary>
    [Parameter]
    public bool ShowHeader { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 组件 Title</para>
    /// <para lang="en">Gets or sets the component title.</para>
    /// </summary>
    [Parameter]
    public string? Title { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件 Title 宽度 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the component title width. Default is null (not set).</para>
    /// </summary>
    [Parameter]
    public int? TitleWidth { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件 Title 样式 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the component title style. Default is null (not set).</para>
    /// </summary>
    [Parameter]
    public string? TitleClass { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 Title 模板 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the title template. Default is null (not set).</para>
    /// </summary>
    [Parameter]
    [JsonIgnore]
    public RenderFragment? TitleTemplate { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件 Class 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the component class. Default is null (not set).</para>
    /// </summary>
    [Parameter]
    public string? Class { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件是否可见 默认 true 可见</para>
    /// <para lang="en">Gets or sets whether the component is visible. Default is true.</para>
    /// </summary>
    [Parameter]
    public bool Visible { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 组件是否允许关闭 默认 null 使用 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the component is allowed to be closed. Default is null (uses DockView configuration).</para>
    /// </summary>
    [Parameter]
    public bool? ShowClose { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件唯一标识值 默认 null 未设置时取 Title 作为唯一标识</para>
    /// <para lang="en">Gets or sets the unique identifier for the component. Default is null, uses Title as the identifier if not set.</para>
    /// </summary>
    [Parameter]
    public string? Key { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否锁定 默认 null 未设置时取 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the component is locked. Default is null (uses DockView configuration).</para>
    /// </summary>
    /// <remarks>锁定后无法拖动</remarks>
    [Parameter]
    public bool? IsLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示锁定按钮 默认 null 未设置时取 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the lock button is displayed. Default is null (uses DockView configuration).</para>
    /// </summary>
    [Parameter]
    public bool? ShowLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否悬浮 默认 null 未设置时取 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the component is floating. Default is null (uses DockView configuration).</para>
    /// </summary>
    [Parameter]
    public bool? IsFloating { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示可悬浮按钮 默认 null 未设置时取 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the float button is displayed. Default is null (uses DockView configuration).</para>
    /// </summary>
    [Parameter]
    public bool? ShowFloat { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示最大化按钮 默认 null 未设置时取 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the maximize button is displayed. Default is null (uses DockView configuration).</para>
    /// </summary>
    [Parameter]
    public bool? ShowMaximize { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否一直显示 默认 null 未设置时取 DockView 的配置</para>
    /// <para lang="en">Gets or sets whether the component is always displayed. Default is null (uses DockView configuration).</para>
    /// </summary>
    [Parameter]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Renderer { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否显示标题前置图标 默认 false 不显示</para>
    /// <para lang="en">Gets or sets whether the title bar icon is displayed. Default is false.</para>
    /// </summary>
    [Parameter]
    [JsonIgnore]
    public bool ShowTitleBar { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标题前置图标 默认 null 未设置使用默认图标</para>
    /// <para lang="en">Gets or sets the title bar icon. Default is null, uses the default icon if not set.</para>
    /// </summary>
    [Parameter]
    [JsonIgnore]
    public string? TitleBarIcon { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标题前置图标 Url 默认 null 未设置使用默认图标</para>
    /// <para lang="en">Gets or sets the title bar icon URL. Default is null, uses the default icon if not set.</para>
    /// </summary>
    [Parameter]
    [JsonIgnore]
    public string? TitleBarIconUrl { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 标题前置图标点击回调方法 默认 null</para>
    /// <para lang="en">Gets or sets the callback method for clicking the title bar icon. Default is null.</para>
    /// </summary>
    [Parameter]
    [JsonIgnore]
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
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="builder"></param>
    protected override void BuildRenderTree(RenderTreeBuilder builder)
    {
        builder.OpenElement(0, "div");
        builder.AddAttribute(10, "id", Id);
        builder.AddAttribute(20, "class", "bb-dockview-panel");
        builder.AddAttribute(30, "data-bb-key", Key);
        builder.AddAttribute(40, "data-bb-title", Title);

        if (TitleTemplate != null)
        {
            builder.OpenElement(50, "div");
            builder.AddAttribute(51, "class", "bb-dockview-item-title");
            builder.AddContent(53, TitleTemplate);
            builder.CloseElement();
        }
        else if (ShowTitleBar)
        {
            builder.OpenComponent<DockViewTitleBar>(60);
            builder.AddAttribute(61, nameof(DockViewTitleBar.BarIcon), TitleBarIcon);
            builder.AddAttribute(62, nameof(DockViewTitleBar.BarIconUrl), TitleBarIconUrl);
            builder.AddAttribute(63, nameof(DockViewTitleBar.OnClickBarCallback), OnClickBar);
            builder.CloseComponent();
        }

        if (DockView.ShowTab(Key))
        {
            builder.AddContent(70, ChildContent);
        }
        builder.CloseElement();
    }

    private async Task OnClickBar()
    {
        if (OnClickTitleBarCallback != null)
        {
            await OnClickTitleBarCallback();
        }
    }

    /// <summary>
    /// <para lang="zh">设置 Visible 参数方法</para>
    /// <para lang="en">Sets the Visible parameter.</para>
    /// </summary>
    /// <param name="visible"></param>
    public void SetVisible(bool visible)
    {
        Visible = visible;
    }
}
