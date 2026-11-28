// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using System.Runtime.InteropServices;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">从服务器配置的 MediaMtx 节读取的 MediaMTX 网关选项。</para>
/// <para lang="en">MediaMTX gateway options bound from the server's MediaMtx configuration section.</para>
/// <para><version>11.0.0</version></para>
/// </summary>
public sealed class MediaMtxOptions
{
    /// <summary>
    /// <para lang="zh">获得/设置仅供服务端使用的回环 Control API 端口，默认为 9997。</para>
    /// <para lang="en">Gets or sets the server-only loopback Control API port. Defaults to 9997.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public int ApiPort { get; set; } = 9997;

    /// <summary>
    /// <para lang="zh">获得/设置网关启动时自动登记的摄像头，键为播放路径，值中的 Path 被忽略。密码应通过 User Secrets 或环境变量等安全配置源提供。</para>
    /// <para lang="en">Gets or sets the cameras registered automatically when the gateway starts. Keys are playback paths, and the Path value of each entry is ignored. Supply passwords through a secure configuration source such as User Secrets or environment variables.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public Dictionary<string, MediaMtxCameraOptions> Cameras { get; set; } = new();

    /// <summary>
    /// <para lang="zh">获得/设置 MediaMTX 可执行文件路径，默认按当前系统和架构选择应用目录 mediamtx-tools 子目录下的工具。相对路径以应用目录为基准，文件不存在时不启动网关。</para>
    /// <para lang="en">Gets or sets the MediaMTX executable path. By default, the tool is selected under the application directory's mediamtx-tools subdirectory according to the current OS and architecture. Relative paths are resolved against the application directory; the gateway is not started when the file does not exist.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string MediaMtxPath { get; set; } = Path.Combine("mediamtx-tools",
        $"{PlatformName}-{RuntimeInformation.OSArchitecture.ToString().ToLowerInvariant()}",
        ExecuteableFileName);

    private static string PlatformName => OperatingSystem.IsWindows() ? "win" : OperatingSystem.IsMacOS() ? "osx" : "linux";

    private static string ExecuteableFileName => OperatingSystem.IsWindows() ? "mediamtx.exe" : "mediamtx";

    /// <summary>
    /// <para lang="zh">获得/设置 WebRTC 播放页面和信令使用的回环 TCP 端口，默认为 8889。</para>
    /// <para lang="en">Gets or sets the loopback TCP port for the WebRTC player and signaling. Defaults to 8889.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public int WebRtcPort { get; set; } = 8889;

    /// <summary>
    /// <para lang="zh">获得/设置经反向代理访问的 WebRTC 播放基址，例如 https://example.com/mediamtx/。未设置时使用本机回环地址；不改变 ICE 媒体地址。</para>
    /// <para lang="en">Gets or sets the reverse-proxied WebRTC player base URL, such as https://example.com/mediamtx/. When unset, the loopback address is used; this does not change the ICE media address.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string? WebRtcPublicUrl { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 WebRTC 媒体使用的回环 UDP 端口，默认为 8189。</para>
    /// <para lang="en">Gets or sets the loopback UDP port for WebRTC media. Defaults to 8189.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public int WebRtcIcePort { get; set; } = 8189;

    internal Uri? GetWebRtcPublicUri()
    {
        if (string.IsNullOrWhiteSpace(WebRtcPublicUrl))
        {
            return null;
        }

        if (!Uri.TryCreate(WebRtcPublicUrl, UriKind.Absolute, out var uri) ||
            !uri.IsWellFormedOriginalString() ||
            uri.Scheme is not ("http" or "https") ||
            uri.UserInfo.Length != 0 ||
            uri.Query.Length != 0 ||
            uri.Fragment.Length != 0)
        {
            throw new ArgumentException("WebRtcPublicUrl must be an absolute HTTP or HTTPS URL without credentials, query or fragment.");
        }

        return new Uri($"{uri.AbsoluteUri.TrimEnd('/')}/");
    }
}
