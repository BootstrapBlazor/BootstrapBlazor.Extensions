// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// DockViewIcon 组件
/// </summary>
public partial class AntDesignIcon
{
    /// <summary>
    /// 获得/设置 图标名称
    /// </summary>
    [Parameter, NotNull]
    [EditorRequired]
    public string? Name { get; set; }

    /// <summary>
    /// 获得 图标地址
    /// </summary>
    [Parameter, NotNull]
    public string? Href { get; set; }

    /// <summary>
    /// 获得 图标颜色 默认 null 未设置
    /// </summary>
    [Parameter]
    public string? Color { get; set; }

    /// <summary>
    /// 获得 图标分类 默认为 Outlined    
    /// </summary>
    [Parameter]
    public AntDesignIconCategory Category { get; set; } = AntDesignIconCategory.Outlined;

    /// <summary>
    /// 获得 样式字符串
    /// </summary>
    private string? ClassString => CssBuilder.Default("bb-ant-icon")
        .AddClass($"bb-ant-icon-{Name}", !string.IsNullOrEmpty(Name))
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddClass($"--bb-ant-icon-color: {Color};", !string.IsNullOrEmpty(Color) && Category != AntDesignIconCategory.TwoTone)
        .AddStyleFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        Href ??= $"./_content/BootstrapBlazor.AntDesignIcon/{Category.ToDescriptionString()}.svg#{Name}";
    }
}
