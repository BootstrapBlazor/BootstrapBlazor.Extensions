// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// BootstrapBlazor 服务扩展类
/// </summary>
public static class BootstrapBlazoJuHeIpLocatorExtensions
{
    /// <summary>
    /// 添加 AzureOpenAIService 服务
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
