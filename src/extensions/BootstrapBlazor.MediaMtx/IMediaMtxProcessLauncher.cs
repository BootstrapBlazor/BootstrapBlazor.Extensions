// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using System.Diagnostics;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">MediaMTX 平台进程启动器，由宿主负责管理返回的进程。</para>
/// <para lang="en">Starts the MediaMTX platform process; the host manages the returned process.</para>
/// <para><version>11.0.0</version></para>
/// </summary>
public interface IMediaMtxProcessLauncher
{
    /// <summary>
    /// <para lang="zh">获得当前操作系统和系统架构是否受支持。</para>
    /// <para lang="en">Gets whether the current operating system and OS architecture are supported.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    bool IsSupported { get; }

    /// <summary>
    /// <para lang="zh">使用宿主提供的配置启动 MediaMTX 进程。</para>
    /// <para lang="en">Starts the MediaMTX process using the host-provided configuration.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    /// <param name="startInfo"><para lang="zh">进程启动配置。</para><para lang="en">The process start configuration.</para></param>
    /// <returns><para lang="zh">已启动的进程。</para><para lang="en">The started process.</para></returns>
    Process Start(ProcessStartInfo startInfo);
}
