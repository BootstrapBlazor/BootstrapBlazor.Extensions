// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockViewRenderMode 渲染模式枚举类型</para>
/// <para lang="en">DockViewRenderMode render mode enumeration type</para>
/// </summary>
[JsonEnumConverter(true)]
public enum DockViewRenderMode
{
    /// <summary>
    /// <para lang="zh">可见时渲染</para>
    /// <para lang="en">Render when visible</para>
    /// </summary>
    OnlyWhenVisible,

    /// <summary>
    /// <para lang="zh">始终渲染</para>
    /// <para lang="en">Always render</para>
    /// </summary>
    Always
}
