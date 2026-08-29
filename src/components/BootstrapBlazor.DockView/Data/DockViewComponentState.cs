// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockView 组件状态</para>
/// <para lang="en">DockView component state</para>
/// </summary>
class DockViewComponentState(DockViewComponent component)
{
    /// <summary>
    /// <para lang="zh">获得/设置 组件唯一标识，默认为 null</para>
    /// <para lang="en">Gets or sets the unique component identifier. Default is null</para>
    /// </summary>
    public string? Key { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件是否锁定，默认为 false</para>
    /// <para lang="en">Gets or sets whether the component is locked. Default is false</para>
    /// </summary>
    public bool? IsLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件是否可见，默认为 true</para>
    /// <para lang="en">Gets or sets whether the component is visible. Default is true</para>
    /// </summary>
    public bool Visible { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 组件内容是否渲染，默认为 false</para>
    /// <para lang="en">Gets or sets whether the component is rendered. Default is false</para>
    /// </summary>
    /// <remarks>
    ///   <para lang="zh">组件内容是否渲染，默认为 false，只有当组件可见时并且当前状态为 Active 时才会渲染组件内容</para>
    ///   <para lang="en">Whether the component content is rendered. Default is false. The content is only rendered when the component is visible and the current state is Active.</para>
    /// </remarks>
    public bool Render { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件实例，默认为 null</para>
    /// <para lang="en">Gets or sets the component instance. Default is null</para>
    /// </summary>
    public DockViewComponent Component => component;
}
