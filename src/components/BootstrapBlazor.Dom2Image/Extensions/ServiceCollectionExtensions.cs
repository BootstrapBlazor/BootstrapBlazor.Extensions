// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// <para lang="zh">BootstrapBlazor 服务扩展类</para>
/// <para lang="en">BootstrapBlazor service extension class</para>
/// </summary>
public static class BootstrapBlazorDom2ImageServiceExtensions
{
    /// <summary>
    /// <para lang="zh">添加 Dom2ImageService 服务</para>
    /// <para lang="en">Adds Dom2ImageService service</para>
    /// </summary>
    /// <param name="services"></param>
    public static IServiceCollection AddBootstrapBlazorDom2ImageService(this IServiceCollection services)
    {
        services.AddScoped<IDom2ImageService, DefaultDom2ImageService>();
#if NET8_0_OR_GREATER
        services.AddKeyedScoped<IDom2ImageService, DefaultDom2ImageService>("BootstrapBlazor.Dom2Image");
#endif
        return services;
    }
}
