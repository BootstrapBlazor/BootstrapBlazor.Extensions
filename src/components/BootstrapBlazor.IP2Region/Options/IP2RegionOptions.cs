// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using IP2Region.Net.XDB;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">IP2Region 配置类</para>
/// <para lang="en">IP2Region configuration class</para>
/// </summary>
public class IP2RegionOptions
{
    /// <summary>
    /// <para lang="zh">获得/设置 IP2Region 数据文件路径</para>
    /// <para lang="en">Gets or sets the IP2Region xdb file path</para>
    /// </summary>
    public string? XdbPath { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 缓存策略，默认为 <see cref="CachePolicy.Content"/></para>
    /// <para lang="en">Gets or sets the cache policy. Default is <see cref="CachePolicy.Content"/></para>
    /// </summary>
    public CachePolicy CachePolicy { get; set; } = CachePolicy.Content;
}
