// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// BootstrapBlazor 服务扩展类
/// </summary>
public static class BootstrapBlazoIP2RegionExtensions
{
    /// <summary>
    /// 添加 IP2RegionService 服务
    /// </summary>
    /// <param name="services"></param>
    public static IServiceCollection AddBootstrapBlazorIP2RegionService(this IServiceCollection services)
    {
        services.AddSingleton<IIpLocatorProvider, IP2RegionService>();
#if NET8_0_OR_GREATER
        services.AddKeyedSingleton<IIpLocatorProvider, IP2RegionService>("BootstrapBlazor.IP2Region");
#endif

        services.AddOptionsMonitor<IP2RegionOptions>();
        return services;
    }
}
