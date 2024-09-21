// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// MindMap选项
/// </summary>
public class MindMapOption
{
    /// <summary>
    /// 布局
    /// </summary>
    [DisplayName("布局")]
    public EnumMindMapLayout Layout { get; set; } = EnumMindMapLayout.logicalStructure;

    /// <summary>
    /// 主题
    /// </summary>
    [DisplayName("主题")]
    public EnumMindMapTheme Theme { get; set; } = EnumMindMapTheme.defaultTheme;
}
