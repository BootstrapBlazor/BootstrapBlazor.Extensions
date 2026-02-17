// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">编辑器渲染模式</para>
/// <para lang="en">Editor rendering mode</para>
/// </summary>
public enum VditorMode
{
    /// <summary>
    /// <para lang="zh">所见即所得</para>
    /// <para lang="en">What You See Is What You Get</para>
    /// </summary>
    WYSIWYG,

    /// <summary>
    /// <para lang="zh">即时渲染</para>
    /// <para lang="en">Instant Rendering</para>
    /// </summary>
    IR,

    /// <summary>
    /// <para lang="zh">左右分屏</para>
    /// <para lang="en">Split View</para>
    /// </summary>
    SV
}
