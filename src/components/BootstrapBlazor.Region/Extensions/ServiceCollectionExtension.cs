// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.DependencyInjection;

namespace BootstrapBlazor.Components;

/// <summary>
/// BootstrapBlazor service extensions
/// </summary>
public static class ServiceCollectionExtension
{
    /// <summary>
    /// Inject <see cref="IRegionService"/> service extension method.
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddBootstrapBlazorRegionService(this IServiceCollection services)
    {
        services.AddSingleton<IRegionService, DefaultRegionService>();
        services.AddPinyinService();

        return services;
    }
}
