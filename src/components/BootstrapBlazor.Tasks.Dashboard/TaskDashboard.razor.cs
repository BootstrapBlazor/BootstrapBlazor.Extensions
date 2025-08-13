// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Localization;

namespace BootstrapBlazor.Components;

/// <summary>
/// Task Dashboard Component
/// </summary>
public partial class TaskDashboard
{
    [Inject, NotNull]
    private IStringLocalizer<TaskDashboard>? Localizer { get; set; }

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
}
