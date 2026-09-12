// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace Microsoft.Extensions.DependencyInjection;

using BootstrapBlazor.OpcUa;

/// <summary>
/// <para lang="zh">OpcUa 服务扩展类</para>
/// <para lang="en">OpcUa service extension class</para>
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// <para lang="zh">增加 OpcUa 数据服务</para>
    /// <para lang="en">Add OpcUa data service</para>
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddOpcUaClient(this IServiceCollection services)
    {
        services.AddScoped<IOpcUaClient, OpcUaClient>();
        return services;
    }
}
