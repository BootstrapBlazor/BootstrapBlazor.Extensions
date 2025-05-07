// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.DependencyInjection;

namespace BootstrapBlazor.Components;

public static class ServiceExtension
{
    /// <summary>
    /// Adds the <see cref="NodeGraphService"/> to the service collection.
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddNodeGraph(this IServiceCollection services)
    {
        services.AddScoped<NodeGraphService>();
        return services;
    }
}
