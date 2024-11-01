// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 页面模式
/// </summary>
public enum EnumPageMode
{
    /// <summary>
    /// 缩略图 / SidebarView.THUMBS;
    /// </summary>
    Thumbs,

    /// <summary>
    /// 大纲 / SidebarView.OUTLINE , non-standard
    /// </summary>
    Outline,

    /// <summary>
    /// 附件 / SidebarView.ATTACHMENTS , non-standard
    /// </summary>
    Attachments,

    /// <summary>
    /// 图层 / SidebarView.LAYERS , non-standard
    /// </summary> 

    Layers,

    /// <summary>
    /// SidebarView.NONE;
    /// </summary>
    None
}
