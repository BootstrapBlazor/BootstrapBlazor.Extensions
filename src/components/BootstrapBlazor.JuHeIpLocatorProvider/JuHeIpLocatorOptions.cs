// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">聚合搜索引擎 IP 定位器配置类</para>
/// <para lang="en">JuHe IP locator options</para>
/// </summary>
class JuHeIpLocatorOptions
{
    /// <summary>
    /// <para lang="zh">获得/设置 聚合搜索引擎 IP 定位器 AppKey</para>
    /// <para lang="en">Gets or sets the JuHe IP locator AppKey</para>
    /// </summary>
    public string? Key { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 聚合搜索引擎 IP 定位器请求地址</para>
    /// <para lang="en">Gets or sets the JuHe IP locator request URL</para>
    /// </summary>
    public string? Url { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 聚合搜索引擎 IP 定位器请求超时时间 默认 5 秒</para>
    /// <para lang="en">Gets or sets the JuHe IP locator request timeout, default is 5 seconds</para>
    /// </summary>
    public TimeSpan Timeout { get; set; }
}
