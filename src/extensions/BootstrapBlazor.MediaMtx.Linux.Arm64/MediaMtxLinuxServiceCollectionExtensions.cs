// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using BootstrapBlazor.Components;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// <para lang="zh">Linux MediaMTX 网关的依赖注入扩展。</para>
/// <para lang="en">Dependency injection extensions for the Linux MediaMTX gateway.</para>
/// <para><version>11.0.0</version></para>
/// </summary>
public static class MediaMtxLinuxServiceCollectionExtensions
{
    /// <summary>
    /// <para lang="zh">注册 Linux 进程启动器和 MediaMTX 服务。</para>
    /// <para lang="en">Registers the Linux process launcher and MediaMTX services.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    /// <param name="services"><para lang="zh">宿主服务集合。</para><para lang="en">The host's service collection.</para></param>
    /// <param name="configureOptions"><para lang="zh">可选的网关配置回调。</para><para lang="en">An optional gateway configuration callback.</para></param>
    /// <returns><para lang="zh">宿主服务集合。</para><para lang="en">The host's service collection.</para></returns>
    public static IServiceCollection AddMediaMtxLinuxArm64(this IServiceCollection services, Action<MediaMtxOptions>? configureOptions = null)
    {
        services.AddSingleton<IMediaMtxProcessLauncher, MediaMtxLinuxProcessLauncher>();

        return services.AddMediaMtxService(configureOptions);
    }

    private sealed class MediaMtxLinuxProcessLauncher : IMediaMtxProcessLauncher
    {
        public bool IsSupported => OperatingSystem.IsLinux() && RuntimeInformation.OSArchitecture == Architecture.Arm64;

        public Process Start(ProcessStartInfo startInfo)
        {
            if (!IsSupported)
            {
                throw new PlatformNotSupportedException("The MediaMTX Linux ARM64 launcher requires Linux ARM64.");
            }
            return Process.Start(startInfo) ?? throw new InvalidOperationException("Failed to start the MediaMTX process.");
        }
    }
}
