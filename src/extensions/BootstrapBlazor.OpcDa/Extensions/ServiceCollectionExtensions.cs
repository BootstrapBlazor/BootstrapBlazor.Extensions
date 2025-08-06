// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.OpcDa;
using System.Runtime.Versioning;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// Opc Da 服务扩展类
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// 增加 OpcDaServer 操作服务
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    [SupportedOSPlatform("windows")]
    public static IServiceCollection AddOpcDaServer(this IServiceCollection services)
    {
        services.AddSingleton<IOpcDaServer, OpcDaServer>();
        return services;
    }

    /// <summary>
    /// 增加模拟 OpcDaServer 操作服务
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddMockOpcDaServer(this IServiceCollection services)
    {
        services.AddSingleton<IOpcDaServer, MockOpcDaServer>();
        return services;
    }
}
