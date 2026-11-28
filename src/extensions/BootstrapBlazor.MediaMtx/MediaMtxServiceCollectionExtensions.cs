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
public static class MediaMtxServiceCollectionExtensions
{
    /// <summary>
    /// <para lang="zh">从 MediaMtx 配置节绑定选项，并注册摄像头管理服务和托管网关。还需注册平台进程启动器；否则宿主无法启动。</para>
    /// <para lang="en">Binds options from the MediaMtx configuration section and registers camera management and a hosted gateway. A platform process launcher must also be registered or the host cannot start.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    /// <param name="services"><para lang="zh">宿主服务集合。</para><para lang="en">The host's service collection.</para></param>
    /// <param name="configureOptions"><para lang="zh">可选的回调，用于覆盖从配置节绑定的选项。</para><para lang="en">An optional callback to override options bound from the configuration section.</para></param>
    /// <returns><para lang="zh">宿主服务集合。</para><para lang="en">The host's service collection.</para></returns>
    public static IServiceCollection AddMediaMtxService(this IServiceCollection services, Action<MediaMtxOptions>? configureOptions = null)
    {
        var options = services.AddOptions<MediaMtxOptions>().BindConfiguration("MediaMtx");
        if (configureOptions is not null)
        {
            options.Configure(configureOptions);
        }

        services.TryAddSingleton<IMediaMtxService, MediaMtxService>();
        return services.AddHostedService<MediaMtxHostedService>();
    }
}
