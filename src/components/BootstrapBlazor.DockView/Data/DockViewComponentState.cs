// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockView 组件状态持久化类</para>
/// </summary>
record struct DockViewComponentState
{
    /// <summary>
    /// <para lang="zh">获得/设置 组件唯一标识值 默认 null 未设置</para>
    /// </summary>
    public string? Key { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件是否锁定 默认 false</para>
    /// </summary>
    public bool? IsLock { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件是否可见 默认 false</para>
    /// </summary>
    public bool Visible { get; set; }
}
