// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.Web;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">通过 MediaMTX 播放页面以 WebRTC 方式实时预览海康威视摄像机</para>
/// <para lang="en">Displays a live WebRTC preview from a Hikvision camera using the MediaMTX player page</para>
/// <para><version>11.0.2</version></para>
/// </summary>
public partial class HikVisionWebRtc
{
    /// <summary>
    /// <para lang="zh">获得/设置浏览器可访问的 MediaMTX 播放页面地址，例如动态登记摄像头后返回的 URL。127.0.0.1 仅适用于浏览器与网关同机。</para>
    /// <para lang="en">Gets or sets the browser-accessible MediaMTX player URL, such as the URL returned after dynamic camera registration. Loopback addresses require the browser and gateway to run on the same device.</para>
    /// <para><version>11.0.2</version></para>
    /// </summary>
    [Parameter]
    public string? GatewayUrl { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 播放器的无障碍标题</para>
    /// <para lang="en">Gets or sets the accessible title of the player</para>
    /// <para><version>11.0.2</version></para>
    /// </summary>
    [Parameter]
    public string Title { get; set; } = "WebRTC";

    /// <summary>
    /// <para lang="zh">获得/设置是否静音，默认值为 true。设为 false 时取消静音，有声自动播放仍受浏览器策略限制。</para>
    /// <para lang="en">Gets or sets whether playback is muted. Defaults to true. Set to false to enable sound; audible autoplay remains subject to browser policies.</para>
    /// <para><version>11.0.2</version></para>
    /// </summary>
    [Parameter]
    public bool IsMuted { get; set; } = true;

    private string? ClassString => CssBuilder.Default("ratio ratio-16x9")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddStyleFromAttributes(AdditionalAttributes)
        .Build();

    private Uri? PlayerUrl
    {
        get
        {
            if (!Uri.TryCreate(GatewayUrl, UriKind.Absolute, out var url) ||
                url.Scheme is not ("http" or "https") || url.UserInfo.Length != 0)
            {
                return null;
            }

            var query = HttpUtility.ParseQueryString(url.Query);
            query["muted"] = IsMuted ? "true" : "false";
            return new UriBuilder(url) { Query = query.ToString() }.Uri;
        }
    }
}
