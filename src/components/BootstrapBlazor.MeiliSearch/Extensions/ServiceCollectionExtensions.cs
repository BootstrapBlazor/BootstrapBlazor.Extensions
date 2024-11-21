// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// 扩展方法
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// 增加 MeiliSearch 服务方法
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddBootstrapBlazorMeiliSearch(this IServiceCollection services)
    {
        // 增加文档搜索配置项
        services.AddOptionsMonitor<MeiliSearchOptions>();

        return services;
    }
}
