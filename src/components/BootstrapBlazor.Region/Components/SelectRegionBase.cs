// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">SelectRegion 组件基类</para>
/// <para lang="en">SelectRegion component base class</para>
/// </summary>
public abstract class SelectRegionBase : PopoverSelectBase<string>
{
    /// <summary>
    /// <para lang="zh">获得/设置 占位符文本</para>
    /// <para lang="en">Gets or sets the placeholder text</para>
    /// </summary>
    [Parameter]
    public string? PlaceHolder { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 颜色，默认为 <see cref="Color.None"/>（无颜色）</para>
    /// <para lang="en">Gets or sets the color. The default is <see cref="Color.None"/> (no color)</para>
    /// </summary>
    [Parameter]
    public Color Color { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 下拉图标，默认为 fa-solid fa-angle-up</para>
    /// <para lang="en">Gets or sets the dropdown icon. The default is "fa-solid fa-angle-up"</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? DropdownIcon { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 点击清空按钮时的回调方法，默认为 null</para>
    /// <para lang="en">Gets or sets the callback method when the clear button is clicked. Default is null</para>
    /// </summary>
    [Parameter]
    public Func<Task>? OnClearAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 右侧清空图标，默认为 fa-solid fa-angle-up</para>
    /// <para lang="en">Gets or sets the right-side clear icon. Default is fa-solid fa-angle-up</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? ClearIcon { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 <see cref="IIconTheme"/> 服务实例</para>
    /// <para lang="en">Gets or sets the <see cref="IIconTheme"/> service instance</para>
    /// </summary>
    [Inject]
    [NotNull]
    protected IIconTheme? IconTheme { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 <see cref="IRegionService"/> 服务实例</para>
    /// <para lang="en">Gets or sets the <see cref="IRegionService"/> service instance</para>
    /// </summary>
    [Inject]
    [NotNull]
    protected IRegionService? RegionService { get; set; }

    /// <summary>
    /// <para lang="zh">获得 文本框样式</para>
    /// <para lang="en">Gets the input box style</para>
    /// </summary>
    protected string? InputClassString => CssBuilder.Default("form-select form-control")
        .AddClass($"border-{Color.ToDescriptionString()}", Color != Color.None && !IsDisabled && !IsValid.HasValue)
        .AddClass($"border-success", IsValid.HasValue && IsValid.Value)
        .AddClass($"border-danger", IsValid.HasValue && !IsValid.Value)
        .AddClass(CssClass).AddClass(ValidCss)
        .Build();

    /// <summary>
    /// <para lang="zh">获得 下拉框按钮样式</para>
    /// <para lang="en">Gets the dropdown button style</para>
    /// </summary>
    protected string? AppendClassString => CssBuilder.Default("form-select-append")
        .AddClass($"text-{Color.ToDescriptionString()}", Color != Color.None && !IsDisabled && !IsValid.HasValue)
        .AddClass($"text-success", IsValid.HasValue && IsValid.Value)
        .AddClass($"text-danger", IsValid.HasValue && !IsValid.Value)
        .Build();

    /// <summary>
    /// <para lang="zh">获得 清空按钮样式</para>
    /// <para lang="en">Gets the clear button style</para>
    /// </summary>
    protected string? ClearClassString => CssBuilder.Default("clear-icon")
        .AddClass($"text-{Color.ToDescriptionString()}", Color != Color.None)
        .AddClass($"text-success", IsValid.HasValue && IsValid.Value)
        .AddClass($"text-danger", IsValid.HasValue && !IsValid.Value)
        .Build();

    /// <summary>
    /// <para lang="zh">获得 选择框组件 Id</para>
    /// <para lang="en">Gets the select component Id</para>
    /// </summary>
    protected string InputId => $"{Id}_input";

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        DropdownIcon ??= IconTheme.GetIconByKey(ComponentIcons.SelectDropdownIcon);
        ClearIcon ??= IconTheme.GetIconByKey(ComponentIcons.SelectClearIcon);
    }
}
