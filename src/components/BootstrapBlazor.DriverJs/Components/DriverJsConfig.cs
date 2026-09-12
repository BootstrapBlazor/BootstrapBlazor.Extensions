// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">FocusGuide 配置类</para>
/// <para lang="en">FocusGuide configuration class</para>
/// </summary>
public class DriverJsConfig
{
    /// <summary>
    /// <para lang="zh">获得/设置 高亮步骤集合</para>
    /// <para lang="en">Gets or sets the array of steps to highlight</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<DriverJsStep> Steps { get; set; } = [];

    /// <summary>
    /// <para lang="zh">获得/设置 是否使用动画，默认为 true</para>
    /// <para lang="en">Gets or sets whether to animate the product tour. Default is true</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Animate { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 动画时长，单位毫秒，默认为 400</para>
    /// <para lang="en">Gets or sets the duration of the animation in milliseconds. Default is 400</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Duration { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 遮罩颜色，默认为 black</para>
    /// <para lang="en">Gets or sets the overlay color. Default is black</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? OverlayColor { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否平滑滚动到高亮元素，默认为 false</para>
    /// <para lang="en">Gets or sets whether to smooth scroll to the highlighted element. Default is false</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? SmoothScroll { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否允许点击遮罩关闭弹窗，默认为 true</para>
    /// <para lang="en">Gets or sets whether to allow closing the popover by clicking on the backdrop. Default is true</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? AllowClose { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 引导激活时是否允许页面滚动，默认为 true</para>
    /// <para lang="en">Gets or sets whether to allow scrolling the page while the tour is active. Default is true</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? AllowScroll { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 目标元素不存在时是否跳过该步骤，默认为 false</para>
    /// <para lang="en">Gets or sets whether to skip the step when the target element is missing. Default is false</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? SkipMissingElement { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 遮罩透明度，默认为 0.5</para>
    /// <para lang="en">Gets or sets the opacity of the backdrop. Default is 0.5</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? OverlayOpacity { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 高亮元素与镂空区域之间的距离，默认为 10</para>
    /// <para lang="en">Gets or sets the distance between the highlighted element and the cutout. Default is 10</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? StagePadding { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 高亮元素镂空区域圆角，默认为 5</para>
    /// <para lang="en">Gets or sets the radius of the cutout around the highlighted element. Default is 5</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? StageRadius { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否允许键盘导航，默认为 true</para>
    /// <para lang="en">Gets or sets whether to allow keyboard navigation. Default is true</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? AllowKeyboardControl { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否禁止与高亮元素交互，默认为 false</para>
    /// <para lang="en">Gets or sets whether to disable interaction with the highlighted element. Default is false</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? DisableActiveInteraction { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗自定义样式类名</para>
    /// <para lang="en">Gets or sets the custom class to add to the popover</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? PopoverClass { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗与高亮元素之间的距离，默认为 10</para>
    /// <para lang="en">Gets or sets the distance between the popover and the highlighted element. Default is 10</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? PopoverOffset { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 弹窗显示按钮集合，默认为 ["next", "previous", "close"]</para>
    /// <para lang="en">Gets or sets the array of buttons to show in the popover. Default is ["next", "previous", "close"]</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<string>? ShowButtons { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 禁用按钮集合</para>
    /// <para lang="en">Gets or sets the array of buttons to disable</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public List<string>? DisableButtons { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 是否在弹窗中显示进度文本，默认为 false</para>
    /// <para lang="en">Gets or sets whether to show the progress text in popover. Default is false</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? ShowProgress { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 进度文本模板，模板中可使用占位符 {{current}} 当前步骤序号 {{total}} 总步骤数</para>
    /// <para lang="en">Gets or sets the template for the progress text. You can use the placeholders {{current}} for the current step number and {{total}} for the total number of steps</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ProgressText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 下一步按钮文本</para>
    /// <para lang="en">Gets or sets the text to show in the next button</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? NextBtnText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 上一步按钮文本</para>
    /// <para lang="en">Gets or sets the text to show in the previous button</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? PrevBtnText { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 完成按钮文本</para>
    /// <para lang="en">Gets or sets the text to show in the done button</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? DoneBtnText { get; set; }

    [JsonInclude]
    private bool HookDestroyStarted => OnDestroyStartedAsync != null;

    /// <summary>
    /// <para lang="zh">获得/设置 组件销毁前回调方法</para>
    /// <para lang="en">Gets or sets the callback before the component is destroyed</para>
    /// </summary>
    [JsonIgnore]
    public Func<DriverJsConfig, int, Task<string?>>? OnDestroyStartedAsync { get; set; }

    [JsonInclude]
    private bool HookDestroyed => OnDestroyedAsync != null;

    /// <summary>
    /// <para lang="zh">获得/设置 组件销毁后回调方法</para>
    /// <para lang="en">Gets or sets the callback after the component is destroyed</para>
    /// </summary>
    [JsonIgnore]
    public Func<Task>? OnDestroyedAsync { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 点击遮罩行为 close nextStep function，默认为 close</para>
    /// <para lang="en">Gets or sets the overlay click behavior. close nextStep function. Default is close</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? OverlayClickBehavior { get; set; }

    [JsonInclude]
    private string OverlayClickCallbackMethod => nameof(OnOverlayClickedAsync);

    /// <summary>
    /// <para lang="zh">获得/设置 点击遮罩回调方法</para>
    /// <para lang="en">Gets or sets the callback when the overlay is clicked</para>
    /// </summary>
    [JsonIgnore]
    public Func<DriverJs, DriverJsConfig, int, Task>? OnOverlayClickedAsync { get; set; }
}
