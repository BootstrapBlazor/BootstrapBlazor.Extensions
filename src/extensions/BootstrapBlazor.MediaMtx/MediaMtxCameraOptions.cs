// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">由服务端配置或 UI 提供的摄像头配置，不应持久化到浏览器或写入日志。</para>
/// <para lang="en">Camera configuration supplied by server-side configuration or UI. Do not persist it in the browser or write it to logs.</para>
/// <para><version>11.0.0</version></para>
/// </summary>
public sealed class MediaMtxCameraOptions
{
    /// <summary>
    /// <para lang="zh">获得/设置唯一的播放路径，使用小写字母开头，后接小写字母、数字或连字符，最长 63 个字符，不允许保留名称 all。例如：camera01</para>
    /// <para lang="en">Gets or sets the unique playback path: a lowercase letter followed by lowercase letters, digits or hyphens, up to 63 characters, excluding the reserved name all. For example: camera01</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string? Path { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置不含凭据的绝对 RTSP 或 RTSPS 地址，必须指定端口和流路径。例如：rtsp://192.168.1.100:554/Streaming/Channels/101</para>
    /// <para lang="en">Gets or sets the absolute RTSP or RTSPS URL without credentials, with an explicit port and stream path. For example: rtsp://192.168.1.100:554/Streaming/Channels/101</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string? Url { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置未进行 URL 编码的摄像头用户名。</para>
    /// <para lang="en">Gets or sets the camera user name without URL encoding.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string? UserName { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置未进行 URL 编码的摄像头密码。</para>
    /// <para lang="en">Gets or sets the camera password without URL encoding.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string? Password { get; set; }
}
