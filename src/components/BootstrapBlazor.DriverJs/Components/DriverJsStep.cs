// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components.Rendering;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">FocusGuide 组件步骤组件</para>
/// <para lang="en">FocusGuide step component</para>
/// </summary>
public class DriverJsStep : ComponentBase, IDisposable
{
    /// <summary>
    /// <para lang="zh">获得/设置 当前步骤目标元素选择器，默认为 null 必须设置</para>
    /// <para lang="en">Gets or sets the target element selector of the current step. Default is null. Required</para>
    /// </summary>
    [Parameter]
    [JsonPropertyName("element")]
    public string? Selector { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗标题</para>
    /// <para lang="en">Gets or sets the title shown in the popover</para>
    /// </summary>
    [Parameter]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Title { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗描述文本</para>
    /// <para lang="en">Gets or sets the description shown in the popover</para>
    /// </summary>
    [Parameter]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Description { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 目标元素不存在时是否跳过该步骤，默认为 false</para>
    /// <para lang="en">Gets or sets whether to skip this step when the target element is missing. Default is false</para>
    /// </summary>
    [Parameter]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? SkipMissingElement { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 子组件内容</para>
    /// <para lang="en">Gets or sets the child content</para>
    /// </summary>
    [Parameter]
    [JsonIgnore]
    public RenderFragment? ChildContent { get; set; }

    [CascadingParameter]
    [JsonIgnore]
    private DriverJs? Driver { get; set; }

    [Inject, NotNull]
    private IStringLocalizer<DriverJs>? Localizer { get; set; }

    [JsonInclude]
    [JsonPropertyName("popover")]
    private IDriverJsPopover? _popover;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();

        Driver?.AddStep(this);
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="builder"></param>
    protected override void BuildRenderTree(RenderTreeBuilder builder)
    {
        _popover ??= new DriverJsHighlightPopover()
        {
            Title = Title,
            Description = Description,
            PrevBtnText = Localizer[nameof(DriverJsHighlightPopover.PrevBtnText)],
            NextBtnText = Localizer[nameof(DriverJsHighlightPopover.NextBtnText)],
            DoneBtnText = Localizer[nameof(DriverJsHighlightPopover.DoneBtnText)]
        };
        builder.OpenComponent<CascadingValue<DriverJsStep>>(0);
        builder.AddAttribute(1, nameof(CascadingValue<DriverJsStep>.Value), this);
        builder.AddAttribute(2, nameof(CascadingValue<DriverJsStep>.IsFixed), true);
        builder.AddAttribute(3, nameof(CascadingValue<DriverJsStep>.ChildContent), ChildContent);
        builder.CloseComponent();
    }

    /// <summary>
    /// <para lang="zh">更新 FocusGuidePopover 实例方法</para>
    /// <para lang="en">Updates the FocusGuidePopover instance</para>
    /// </summary>
    /// <param name="popover"></param>
    public void UpdatePopover(IDriverJsPopover? popover)
    {
        _popover = popover;
    }

    private void Dispose(bool disposing)
    {
        if (disposing)
        {
            Driver?.RemoveStep(this);
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
