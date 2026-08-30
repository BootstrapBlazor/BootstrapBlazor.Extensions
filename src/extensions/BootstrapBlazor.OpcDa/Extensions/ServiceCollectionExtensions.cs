// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.OpcDa;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Runtime.Versioning;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// <para lang="zh">OpcDaClient 服务扩展类</para>
/// <para lang="en">OpcDaClient service extension class</para>
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// <para lang="zh">增加 OpcDaClient 操作服务</para>
    /// <para lang="en">Adds the OpcDa client service</para>
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    [SupportedOSPlatform("windows")]
    public static IServiceCollection AddOpcDaClient(this IServiceCollection services)
    {
        services.TryAddSingleton<OpcDaClient>();
        services.TryAddSingleton<IOpcDaClient>(provider => provider.GetRequiredService<OpcDaClient>());
        services.TryAddSingleton<IOpcDaServer>(provider => provider.GetRequiredService<OpcDaClient>());
        return services;
    }

    /// <summary>
    /// <para lang="zh">增加 OpcDaClient 操作服务</para>
    /// <para lang="en">Adds the OpcDa client service</para>
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    [Obsolete("Use AddOpcDaClient instead.")]
    [SupportedOSPlatform("windows")]
    public static IServiceCollection AddOpcDaServer(this IServiceCollection services) => services.AddOpcDaClient();
}
