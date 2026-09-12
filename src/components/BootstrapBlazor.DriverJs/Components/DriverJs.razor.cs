// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DriverJs 组件</para>
/// <para lang="en">DriverJs component</para>
/// </summary>
public partial class DriverJs
{
    /// <summary>
    /// <para lang="zh">获得/设置 是否自动开始向导，默认为 true</para>
    /// <para lang="en">Gets or sets whether to start the tour automatically. Default is true</para>
    /// </summary>
    [Parameter]
    [Obsolete("已弃用，删除即可；Deprecated, just delete it")]
    [ExcludeFromCodeCoverage]
    public bool AutoDrive { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得/设置 组件配置 <see cref="DriverJsConfig"/> 实例，默认为 null</para>
    /// <para lang="en">Gets or sets the <see cref="DriverJsConfig"/> instance. Default is null</para>
    /// </summary>
    [Parameter]
    public DriverJsConfig? Config { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 子组件内容</para>
    /// <para lang="en">Gets or sets the child content</para>
    /// </summary>
    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    [Inject, NotNull]
    private IStringLocalizer<DriverJs>? Localizer { get; set; }

    private readonly List<DriverJsStep> _steps = [];

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop);

    /// <summary>
    /// <para lang="zh">开始方法</para>
    /// <para lang="en">Starts the tour</para>
    /// </summary>
    /// <returns></returns>
    public async Task Start(int? index = 0)
    {
        Config ??= new();
        Config.Steps = _steps;
        Config.ProgressText ??= Localizer[nameof(Config.ProgressText)];
        Config.PrevBtnText ??= Localizer[nameof(Config.PrevBtnText)];
        Config.NextBtnText ??= Localizer[nameof(Config.NextBtnText)];
        Config.DoneBtnText ??= Localizer[nameof(Config.DoneBtnText)];

        await InvokeVoidAsync("start", Id, Config, new
        {
            Index = index
        });
    }

    /// <summary>
    /// <para lang="zh">组件销毁前回调方法由 JavaScript 调用 返回非空字符串时客户端 confirm 确认弹窗</para>
    /// <para lang="en">Callback before the component is destroyed. Invoked by JavaScript. When a non-empty string is returned the client shows a confirm dialog</para>
    /// </summary>
    [JSInvokable]
    public async Task<string?> OnBeforeDestroy(int index)
    {
        string? ret = null;

        if (Config is { OnDestroyStartedAsync: not null })
        {
            ret = await Config.OnDestroyStartedAsync(Config, index);
        }
        return ret;
    }

    /// <summary>
    /// <para lang="zh">组件销毁后回调方法由 JavaScript 调用</para>
    /// <para lang="en">Callback after the component is destroyed. Invoked by JavaScript</para>
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task OnDestroyed()
    {
        if (Config is { OnDestroyedAsync: not null })
        {
            await Config.OnDestroyedAsync();
        }
    }

    /// <summary>
    /// <para lang="zh">点击遮罩回调方法由 JavaScript 调用</para>
    /// <para lang="en">Callback when the overlay is clicked. Invoked by JavaScript</para>
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task OnOverlayClicked(int index)
    {
        if (Config is { OnOverlayClickedAsync: not null })
        {
            await Config.OnOverlayClickedAsync(this, Config, index);
        }
    }

    /// <summary>
    /// <para lang="zh">从指定步骤开始向导</para>
    /// <para lang="en">Starts the tour at the specified step</para>
    /// </summary>
    /// <param name="index"></param>
    /// <returns></returns>
    public Task Drive(int? index) => InvokeVoidAsync("drive", Id, index);

    /// <summary>
    /// <para lang="zh">移动到下一步</para>
    /// <para lang="en">Moves to the next step</para>
    /// </summary>
    /// <returns></returns>
    public Task MoveNext() => InvokeVoidAsync("moveNext", Id);

    /// <summary>
    /// <para lang="zh">移动到上一步</para>
    /// <para lang="en">Moves to the previous step</para>
    /// </summary>
    /// <returns></returns>
    public Task MovePrevious() => InvokeVoidAsync("movePrevious", Id);

    /// <summary>
    /// <para lang="zh">移动到指定步骤</para>
    /// <para lang="en">Moves to the specified step</para>
    /// </summary>
    /// <returns></returns>
    public Task MoveTo(int index) => InvokeVoidAsync("moveTo", Id, index);

    /// <summary>
    /// <para lang="zh">是否存在下一步</para>
    /// <para lang="en">Is there a next step</para>
    /// </summary>
    /// <returns></returns>
    public Task<bool> HasNextStep() => InvokeAsync<bool>("hasNextStep", Id);

    /// <summary>
    /// <para lang="zh">是否存在上一步</para>
    /// <para lang="en">Is there a previous step</para>
    /// </summary>
    /// <returns></returns>
    public Task<bool> HasPreviousStep() => InvokeAsync<bool>("hasPreviousStep", Id);

    /// <summary>
    /// <para lang="zh">当前步骤是否为第一步</para>
    /// <para lang="en">Is the current step the first step</para>
    /// </summary>
    /// <returns></returns>
    public Task<bool> IsFirstStep() => InvokeAsync<bool>("isFirstStep", Id);

    /// <summary>
    /// <para lang="zh">当前步骤是否为最后一步</para>
    /// <para lang="en">Is the current step the last step</para>
    /// </summary>
    /// <returns></returns>
    public Task<bool> IsLastStep() => InvokeAsync<bool>("isLastStep", Id);

    /// <summary>
    /// <para lang="zh">获得当前步骤索引</para>
    /// <para lang="en">Gets the active step index</para>
    /// </summary>
    /// <returns></returns>
    public Task<int> GetActiveIndex() => InvokeAsync<int>("getActiveIndex", Id);

    /// <summary>
    /// <para lang="zh">销毁组件方法</para>
    /// <para lang="en">Destroys the tour</para>
    /// </summary>
    /// <returns></returns>
    public Task Destroy() => InvokeVoidAsync("destroy", Id);

    /// <summary>
    /// <para lang="zh">获得当前步骤配置</para>
    /// <para lang="en">Gets the active step configuration</para>
    /// </summary>
    /// <returns></returns>
    public async Task<DriverJsStep?> GetActiveStep()
    {
        DriverJsStep? step = null;
        if (Config != null)
        {
            var index = await GetActiveIndex();
            step = Config.Steps.ElementAtOrDefault(index + 1);
        }

        return step;
    }

    /// <summary>
    /// <para lang="zh">获得上一步骤配置</para>
    /// <para lang="en">Gets the previous step configuration</para>
    /// </summary>
    /// <returns></returns>
    public async Task<DriverJsStep?> GetPreviousStep()
    {
        DriverJsStep? step = null;
        if (Config != null)
        {
            var index = await GetActiveIndex();
            step = Config.Steps.ElementAtOrDefault(index - 1);
        }

        return step;
    }

    /// <summary>
    /// <para lang="zh">向导或高亮是否处于激活状态</para>
    /// <para lang="en">Is the tour or highlight currently active</para>
    /// </summary>
    /// <returns></returns>
    public Task<bool> IsActive() => InvokeAsync<bool>("isActive", Id);

    /// <summary>
    /// <para lang="zh">重新计算并绘制高亮区域</para>
    /// <para lang="en">Recalculates and redraws the highlight</para>
    /// </summary>
    /// <returns></returns>
    public Task Refresh() => InvokeVoidAsync("refresh", Id);

    /// <summary>
    /// <para lang="zh">高亮指定元素方法</para>
    /// <para lang="en">Highlights the specified element. Look at the DriveStep section of configuration for format of the step</para>
    /// </summary>
    /// <param name="config"><see cref="DriverJsConfig"/> 实例</param>
    /// <param name="selector">target selector</param>
    /// <param name="popover"><see cref="DriverJsHighlightPopover"/> 实例</param>
    /// <returns></returns>
    public async Task Highlight(DriverJsConfig config, string? selector, DriverJsHighlightPopover popover)
    {
        config ??= new();
        config.ProgressText ??= Localizer[nameof(Config.ProgressText)];

        await InvokeVoidAsync("highlight", Id, config, new { element = selector, popover });
    }

    /// <summary>
    /// <para lang="zh">添加步骤方法</para>
    /// <para lang="en">Adds a step</para>
    /// </summary>
    /// <param name="step"></param>
    public void AddStep(DriverJsStep step)
    {
        _steps.Add(step);
    }

    /// <summary>
    /// <para lang="zh">移除步骤方法</para>
    /// <para lang="en">Removes a step</para>
    /// </summary>
    /// <param name="step"></param>
    public void RemoveStep(DriverJsStep step)
    {
        _steps.Remove(step);
    }
}
