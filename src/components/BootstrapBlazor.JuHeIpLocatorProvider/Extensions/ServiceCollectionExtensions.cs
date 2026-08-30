// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// <para lang="zh">BootstrapBlazor 服务扩展类</para>
/// <para lang="en">BootstrapBlazor service extensions</para>
/// </summary>
public static class BootstrapBlazorJuHeIpLocatorExtensions
{
    /// <summary>
    /// <para lang="zh">添加聚合搜索引擎 IP 定位器服务</para>
    /// <para lang="en">Adds JuHe IP locator service</para>
    /// </summary>
    /// <param name="services"></param>
    public static IServiceCollection AddBootstrapBlazorJuHeIpLocatorService(this IServiceCollection services)
    {
        services.AddSingleton<IIpLocatorProvider, JuHeIpLocatorProvider>();
#if NET8_0_OR_GREATER
        services.AddKeyedSingleton<IIpLocatorProvider, JuHeIpLocatorProvider>("BootstrapBlazor.JuHeIpLocatorProvider");
#endif

        services.AddOptionsMonitor<JuHeIpLocatorOptions>();
        return services;
    }
}
