// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Runtime.Versioning;

namespace BootstrapBlazor.TcpSocket;

/// <summary>
/// TcpSocket 扩展方法
/// </summary>
[UnsupportedOSPlatform("browser")]
public static class TcpSocketExtensions
{
    /// <summary>
    /// 增加 ITcpSocketFactory 服务
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddBootstrapBlazorTcpSocketFactory(this IServiceCollection services)
    {
        // 添加 ITcpSocketFactory 服务
        services.AddSingleton<ITcpSocketFactory, DefaultTcpSocketFactory>();

        // 增加 ISocketClientProvider 服务
        services.TryAddTransient<ITcpSocketClientProvider, DefaultTcpSocketClientProvider>();

        return services;
    }

    /// <summary>
    /// 配置第三方数据模型与 <see cref="DataConverterCollections"/> 数据转换器集合配置扩展方法
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configureOptions"></param>
    /// <returns></returns>
    public static IServiceCollection ConfigureSocketDataConverters(this IServiceCollection services, Action<DataConverterCollections> configureOptions)
    {
        services.Configure(configureOptions);
        return services;
    }
}
