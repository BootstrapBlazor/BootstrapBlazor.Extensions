// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// BootstrapBlazor 服务扩展类
/// </summary>
public static class BootstrapBlazorTouchSocketServiceExtensions
{
    /// <summary>
    /// 添加 TouchSocket 服务
    /// </summary>
    /// <param name="services"></param>
    public static IServiceCollection AddBootstrapBlazorTouchSocketService(this IServiceCollection services)
    {
        services.AddSingleton<ITcpSocketFactory, DefaultTcpSocketFactory>();

        // TBD: 这里注入 TouchSocket 相关服务
        return services;
    }
}
