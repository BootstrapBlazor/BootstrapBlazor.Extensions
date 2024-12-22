// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components.Option;
using BootstrapBlazor.Components.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection;
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// 注入语义核心服务
    /// </summary>
    /// <param name="services"></param>
    /// <param name="config"></param>
    /// <returns></returns>
    public static IServiceCollection AddBootstrapBlazorSemanticKernel(this IServiceCollection services, IConfiguration config)
    {
        services.Configure<KernelOptions>(config.GetSection("KernelOptions"));
        services.AddSingleton<IKernelService, KernelService>();
        return services;
    }
}
