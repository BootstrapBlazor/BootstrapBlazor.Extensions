// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Localization;

namespace BootstrapBlazor.Components.Tasks;

/// <summary>
/// Task Dashboard Component
/// </summary>
public partial class TaskDashboard
{
    [Inject, NotNull]
    private IStringLocalizer<TaskDashboard>? Localizer { get; set; }

    [Inject, NotNull]
    private DialogService? DialogService { get; set; }

    private string? ClassString => CssBuilder.Default("bb-tasks-dashboard")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private IEnumerable<IScheduler> _schedulers = [];

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        _schedulers = TaskServicesManager.ToList();
    }

    private static Color GetStatusColor(SchedulerStatus status) => status switch
    {
        SchedulerStatus.Running => Color.Success,
        SchedulerStatus.Ready => Color.Primary,
        _ => Color.Danger
    };

    private string FormatStatus(SchedulerStatus status) => status switch
    {
        SchedulerStatus.Running => Localizer["SchedulerStatus.Running"],
        SchedulerStatus.Ready => Localizer["SchedulerStatus.Ready"],
        _ => Localizer["SchedulerStatus.Disabled"]
    };

    private static string GetStatusIcon(SchedulerStatus status) => status switch
    {
        SchedulerStatus.Running => "fa-solid fa-play-circle",
        SchedulerStatus.Ready => "fa-solid fa-stop-circle",
        _ => "fa-solid fa-times-circle"
    };

    private static Color GetResultColor(TriggerResult result) => result switch
    {
        TriggerResult.Running => Color.Primary,
        TriggerResult.Success => Color.Success,
        TriggerResult.Cancelled => Color.Dark,
        TriggerResult.Timeout => Color.Warning,
        _ => Color.Danger,
    };

    private string FormatResult(TriggerResult result) => result switch
    {
        TriggerResult.Running => Localizer["TriggerResult.Running"],
        TriggerResult.Success => Localizer["TriggerResult.Success"],
        TriggerResult.Cancelled => Localizer["TriggerResult.Timeout"],
        TriggerResult.Timeout => Localizer["TriggerResult.Timeout"],
        _ => Localizer["TriggerResult.Error"],
    };

    private static Task OnPause(IScheduler scheduler)
    {
        scheduler.Status = SchedulerStatus.Ready;
        return Task.CompletedTask;
    }

    private static Task OnRun(IScheduler scheduler)
    {
        scheduler.Status = SchedulerStatus.Running;
        return Task.CompletedTask;
    }

    private async Task OnLog(IScheduler scheduler)
    {
        var option = new DialogOption()
        {
            Class = "modal-dialog-task",
            Title = Localizer["LogDilaogTitle", scheduler.Name],
            Component = BootstrapDynamicComponent.CreateComponent<TaskInfo>(new Dictionary<string, object?>
            {
                [nameof(TaskInfo.Scheduler)] = scheduler,
                [nameof(TaskInfo.HeaderText)] = Localizer["LogDilaogConsoleHeaderText"].Value
            })
        };
        await DialogService.Show(option);
    }

    private static bool OnCheckTaskStatus(IScheduler model) => model.Status != SchedulerStatus.Running;

    private static string? FormatDateTime(DateTimeOffset? dateTime) => dateTime?.ToString("yyyy-MM-dd HH:mm:ss");

    private Task OnShowException(Exception ex)
    {
        return Task.CompletedTask;
    }
}
