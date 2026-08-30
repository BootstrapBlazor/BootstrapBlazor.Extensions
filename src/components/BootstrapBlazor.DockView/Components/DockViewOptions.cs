// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockView 组件配置项</para>
/// <para lang="en">DockView component options</para>
/// </summary>
class DockViewOptions
{
    /// <summary>
    /// <para lang="zh">获得/设置 组件版本信息</para>
    /// <para lang="en">Gets or sets the component version information</para>
    /// </summary>
    public string? Version { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否启用本地存储，默认为 null</para>
    /// <para lang="en">Gets or sets whether local storage is enabled. Default is null</para>
    /// </summary>
    public bool? EnableLocalStorage { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 本地存储前缀，默认为 bb-dock</para>
    /// <para lang="en">Gets or sets the local storage prefix. Default is bb-dock</para>
    /// </summary>
    public string? LocalStoragePrefix { get; set; }
}
