// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the LGPL License, Version 3.0. See License.txt in the project root for license information.
// Website: https://admin.blazor.zone

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components.Tasks;

/// <summary>
/// TaskInfo 组件
/// </summary>
public partial class TaskInfo : IDisposable
{
    /// <summary>
    /// 获得/设置 <see cref="IScheduler"/> 实例
    /// </summary>
    [Parameter]
    [NotNull]
    [EditorRequired]
    public IScheduler? Scheduler { get; set; }

    /// <summary>
    /// 获得/设置 日志窗口标题文本
    /// </summary>
    [Parameter]
    public string? HeaderText { get; set; }

    private List<ConsoleMessageItem> Messages { get; } = new(24);

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    /// <returns></returns>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            var scheduler = TaskServicesManager.Get(Scheduler.Name);
            if (scheduler != null)
            {
                scheduler.Triggers.First().PulseCallback += DispatchMessageCallback;
                await DispatchMessage(scheduler.Triggers.First());
            }
        }
    }

    private void DispatchMessageCallback(ITrigger trigger)
    {
        _ = DispatchMessage(trigger);
    }

    private async Task DispatchMessage(ITrigger trigger)
    {
        if (trigger.LastRuntime == null)
        {
            return;
        }

        var message = $"Trigger({trigger.GetType().Name}) LastRuntime: {trigger.LastRuntime} Run({trigger.LastResult}) NextRuntime: {trigger.NextRuntime} Elapsed: {trigger.LastRunElapsedTime.TotalSeconds}";
        Messages.Add(new ConsoleMessageItem()
        {
            Message = message
        });
        if (Messages.Count > 20)
        {
            Messages.RemoveAt(0);
        }
        await InvokeAsync(StateHasChanged);
    }

    private void Dispose(bool disposing)
    {
        if (disposing)
        {
            var scheduler = TaskServicesManager.Get(Scheduler.Name);
            if (scheduler != null)
            {
                scheduler.Triggers.First().PulseCallback -= DispatchMessageCallback;
            }
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
