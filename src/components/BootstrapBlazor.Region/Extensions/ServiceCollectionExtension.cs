// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.DependencyInjection;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">BootstrapBlazor 服务扩展</para>
/// <para lang="en">BootstrapBlazor service extensions</para>
/// </summary>
public static class ServiceCollectionExtension
{
    /// <summary>
    /// <para lang="zh">注入 <see cref="IRegionService"/> 服务扩展方法</para>
    /// <para lang="en">Injects <see cref="IRegionService"/> service extension method</para>
    /// </summary>
    /// <param name="services"></param>
    public static IServiceCollection AddBootstrapBlazorRegionService(this IServiceCollection services)
    {
        services.AddSingleton<IRegionService, DefaultRegionService>();

        return services;
    }
}
