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
    /// <para lang="zh">获得/设置不含凭据的绝对 RTSP 或 RTSPS 源地址，必须指定端口和流路径。</para>
    /// <para lang="en">Gets or sets the absolute RTSP or RTSPS source URL without credentials. An explicit port and stream path are required.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string? Url { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置可选的源用户名；直接提供原始值，不要进行 URL 编码。</para>
    /// <para lang="en">Gets or sets the optional source user name. Provide the original value without URL encoding.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string? UserName { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置可选的源密码；通过服务器私有配置提供原始值，不要进行 URL 编码。</para>
    /// <para lang="en">Gets or sets the optional source password. Supply the original value through private server configuration without URL encoding.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string? Password { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 MediaMTX 可执行文件路径。相对路径以应用目录为基准。默认为空，自动从 tools 下与当前进程平台匹配的 RID 子目录选择内置工具。</para>
    /// <para lang="en">Gets or sets the MediaMTX executable path. Relative paths are resolved against the application directory. Defaults to an empty string, which selects the bundled executable from the tools subdirectory matching the current process runtime identifier.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string ExecutablePath { get; set; } = string.Empty;

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
