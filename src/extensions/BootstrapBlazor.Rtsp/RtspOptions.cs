// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">从服务器配置的 Rtsp 节读取的 MediaMTX 网关选项。</para>
/// <para lang="en">MediaMTX gateway options bound from the server's Rtsp configuration section.</para>
/// <para><version>11.0.0</version></para>
/// </summary>
public sealed class RtspOptions
{
    /// <summary>
    /// <para lang="zh">获得/设置仅供服务端使用的回环 Control API 端口，默认为 9997。</para>
    /// <para lang="en">Gets or sets the server-only loopback Control API port. Defaults to 9997.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public int ApiPort { get; set; } = 9997;

    /// <summary>
    /// <para lang="zh">获得/设置 MediaMTX 可执行文件路径，默认为应用目录下的 mediamtx\mediamtx.exe（Windows 布局）。Linux、macOS 或其他位置需配置完整路径，例如 mediamtx/mediamtx。相对路径以应用目录为基准；设为空或文件不存在时不启动网关。</para>
    /// <para lang="en">Gets or sets the MediaMTX executable path. Defaults to mediamtx\mediamtx.exe under the application directory (Windows layout). On Linux, macOS or for other locations, set the full path, such as mediamtx/mediamtx. Relative paths are resolved against the application directory. The gateway is not started when the path is empty or the file does not exist.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string MediaMtxPath { get; set; } = "mediamtx\\mediamtx.exe";

    /// <summary>
    /// <para lang="zh">获得/设置 WebRTC 播放页面和信令使用的回环 TCP 端口，默认为 8889。</para>
    /// <para lang="en">Gets or sets the loopback TCP port for the WebRTC player and signaling. Defaults to 8889.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public int WebRtcPort { get; set; } = 8889;

    /// <summary>
    /// <para lang="zh">获得/设置 WebRTC 媒体使用的回环 UDP 端口，默认为 8189。</para>
    /// <para lang="en">Gets or sets the loopback UDP port for WebRTC media. Defaults to 8189.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public int WebRtcIcePort { get; set; } = 8189;
}
