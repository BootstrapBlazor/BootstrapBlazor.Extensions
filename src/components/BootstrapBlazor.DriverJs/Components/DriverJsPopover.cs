// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">FocusGuide Popover 配置类</para>
/// <para lang="en">FocusGuide popover configuration class</para>
/// </summary>
public class DriverJsPopover : ComponentBase, IDriverJsPopover, IDisposable
{
    /// <summary>
    /// <para lang="zh">获得/设置 弹窗标题</para>
    /// <para lang="en">Gets or sets the title shown in the popover</para>
    /// </summary>
    [Parameter]
    [EditorRequired]
    public string? Title { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗描述文本</para>
    /// <para lang="en">Gets or sets the description shown in the popover</para>
    /// </summary>
    [Parameter]
    [EditorRequired]
    public string? Description { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗位置 "top" | "right" | "bottom" | "left"</para>
    /// <para lang="en">Gets or sets the position of the popover. "top" | "right" | "bottom" | "left"</para>
    /// </summary>
    [Parameter]
    public string? Side { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗对齐方式 "start" | "center" | "end"</para>
    /// <para lang="en">Gets or sets the alignment of the popover. "start" | "center" | "end"</para>
    /// </summary>
    [Parameter]
    public string? Align { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗显示按钮集合 "next" | "previous" | "close"</para>
    /// <para lang="en">Gets or sets the array of buttons to show in the popover. "next" | "previous" | "close"</para>
    /// </summary>
    [Parameter]
    public List<string>? ShowButtons { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 禁用按钮集合 "next" | "previous" | "close"</para>
    /// <para lang="en">Gets or sets the array of buttons to disable. "next" | "previous" | "close"</para>
    /// </summary>
    [Parameter]
    public List<string>? DisableButtons { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 下一步按钮文本</para>
    /// <para lang="en">Gets or sets the text to show in the next button</para>
    /// </summary>
    [Parameter]
    public string? NextBtnText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 上一步按钮文本</para>
    /// <para lang="en">Gets or sets the text to show in the previous button</para>
    /// </summary>
    [Parameter]
    public string? PrevBtnText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 完成按钮文本</para>
    /// <para lang="en">Gets or sets the text to show in the done button</para>
    /// </summary>
    [Parameter]
    public string? DoneBtnText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否在弹窗中显示进度文本，默认为 true</para>
    /// <para lang="en">Gets or sets whether to show the progress text in popover. Default is true</para>
    /// </summary>
    [Parameter]
    public bool? ShowProgress { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 进度文本模板，默认为 "{{current}} of {{total}}"</para>
    /// <para lang="en">Gets or sets the template for the progress text. Default is "{{current}} of {{total}}"</para>
    /// </summary>
    [Parameter]
    public string? ProgressText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗自定义样式类名</para>
    /// <para lang="en">Gets or sets the custom class to add to the popover element</para>
    /// </summary>
    [Parameter]
    public string? PopoverClass { get; set; }

    [CascadingParameter]
    [JsonIgnore]
    private DriverJsStep? Step { get; set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();

        Step?.UpdatePopover(this);
    }

    private void Dispose(bool disposing)
    {
        if (disposing)
        {
            Step?.UpdatePopover(null);
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
