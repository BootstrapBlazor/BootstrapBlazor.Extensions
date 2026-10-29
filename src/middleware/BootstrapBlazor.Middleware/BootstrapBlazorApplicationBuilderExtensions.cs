// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components;

namespace Microsoft.AspNetCore.Builder;

/// <summary>
/// <para lang="zh">BootstrapBlazor 服务端中间件扩展</para>
/// <para lang="en">BootstrapBlazor server middleware extensions.</para>
/// </summary>
public static class BootstrapBlazorApplicationBuilderExtensions
{
    /// <summary>
    /// <para lang="zh">使用 BootstrapBlazor 中间件</para>
    /// <para lang="en">Use BootstrapBlazor middleware</para>
    /// </summary>
    /// <remarks>
    /// <para lang="zh">提供客户端 IP 地址查询（/ip.axd）。</para>
    /// <para lang="en">Provides client IP lookup (/ip.axd).</para>
    /// </remarks>
    public static IApplicationBuilder UseBootstrapBlazor(this IApplicationBuilder builder)
    {
        builder.MapWhen(context => context.Request.Path.StartsWithSegments("/ip.axd"), app => app.Run(IpRequestHandler.HandleAsync));

        return builder;
    }
}
