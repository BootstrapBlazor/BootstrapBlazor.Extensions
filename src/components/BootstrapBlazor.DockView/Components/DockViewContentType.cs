// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockContent 类型</para>
/// <para lang="en">DockContent type</para>
/// </summary>
[JsonEnumConverter(true)]
public enum DockViewContentType
{
    /// <summary>
    /// <para lang="zh">行排列 水平排列</para>
    /// <para lang="en">Row layout, horizontal arrangement</para>
    /// </summary>
    Row,

    /// <summary>
    /// <para lang="zh">列排列 垂直排列</para>
    /// <para lang="en">Column layout, vertical arrangement</para>
    /// </summary>
    Column,

    /// <summary>
    /// <para lang="zh">标签排列</para>
    /// <para lang="en">Tab layout</para>
    /// </summary>
    Group,

    /// <summary>
    /// <para lang="zh">组件</para>
    /// <para lang="en">Component</para>
    /// </summary>
    Component
}
