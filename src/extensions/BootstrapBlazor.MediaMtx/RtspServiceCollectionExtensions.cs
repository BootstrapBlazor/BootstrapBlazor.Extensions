// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using BootstrapBlazor.Components;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// <para lang="zh">RTSP 服务的依赖注入扩展。</para>
/// <para lang="en">Dependency injection extensions for the RTSP service.</para>
/// <para><version>11.0.0</version></para>
/// </summary>
public static class RtspServiceCollectionExtensions
{
    /// <summary>
    /// <para lang="zh">从 Rtsp 配置节绑定选项，并注册一个由宿主管理的 MediaMTX 网关。默认查找应用目录下的 mediamtx\mediamtx.exe，文件不存在时网关不启动。</para>
    /// <para lang="en">Binds options from the Rtsp configuration section and registers one MediaMTX gateway managed by the host. By default it looks for mediamtx\mediamtx.exe under the application directory; the gateway is not started when the file does not exist.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    /// <param name="services"><para lang="zh">宿主服务集合。</para><para lang="en">The host's service collection.</para></param>
    /// <param name="configureOptions"><para lang="zh">可选的回调，用于覆盖从配置节绑定的选项。</para><para lang="en">An optional callback to override options bound from the configuration section.</para></param>
    /// <returns><para lang="zh">宿主服务集合。</para><para lang="en">The host's service collection.</para></returns>
    public static IServiceCollection AddRtspService(this IServiceCollection services, Action<RtspOptions>? configureOptions = null)
    {
        var options = services.AddOptions<RtspOptions>().BindConfiguration("Rtsp");
        if (configureOptions is not null)
        {
            options.Configure(configureOptions);
        }

        services.TryAddSingleton<IRtspService, RtspService>();
        return services.AddHostedService<RtspHostedService>();
    }
}
