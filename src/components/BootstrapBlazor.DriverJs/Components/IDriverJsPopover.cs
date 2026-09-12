// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">IDriverJsPopover 接口定义</para>
/// <para lang="en">IDriverJsPopover interface</para>
/// </summary>
public interface IDriverJsPopover
{
    /// <summary>
    /// <para lang="zh">获得/设置 弹窗标题</para>
    /// <para lang="en">Gets or sets the title shown in the popover</para>
    /// </summary>
    string? Title { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗描述文本</para>
    /// <para lang="en">Gets or sets the description shown in the popover</para>
    /// </summary>
    string? Description { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗位置 "top" | "right" | "bottom" | "left"</para>
    /// <para lang="en">Gets or sets the position of the popover. "top" | "right" | "bottom" | "left"</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    string? Side { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗对齐方式 "start" | "center" | "end"</para>
    /// <para lang="en">Gets or sets the alignment of the popover. "start" | "center" | "end"</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    string? Align { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗显示按钮集合 "next" | "previous" | "close"</para>
    /// <para lang="en">Gets or sets the array of buttons to show in the popover. "next" | "previous" | "close"</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    List<string>? ShowButtons { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 禁用按钮集合 "next" | "previous" | "close"</para>
    /// <para lang="en">Gets or sets the array of buttons to disable. "next" | "previous" | "close"</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    List<string>? DisableButtons { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 下一步按钮文本</para>
    /// <para lang="en">Gets or sets the text to show in the next button</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    string? NextBtnText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 上一步按钮文本</para>
    /// <para lang="en">Gets or sets the text to show in the previous button</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    string? PrevBtnText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 完成按钮文本</para>
    /// <para lang="en">Gets or sets the text to show in the done button</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    string? DoneBtnText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否在弹窗中显示进度文本，默认为 true</para>
    /// <para lang="en">Gets or sets whether to show the progress text in popover. Default is true</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    bool? ShowProgress { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 进度文本模板，默认为 "{{current}} of {{total}}"</para>
    /// <para lang="en">Gets or sets the template for the progress text. Default is "{{current}} of {{total}}"</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    string? ProgressText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗自定义样式类名</para>
    /// <para lang="en">Gets or sets the custom class to add to the popover element</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    string? PopoverClass { get; set; }
}
