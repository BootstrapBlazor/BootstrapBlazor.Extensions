// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">IDom2ImageService 接口定义</para>
/// <para lang="en">IDom2ImageService interface definition</para>
/// </summary>
public interface IDom2ImageService
{
    /// <summary>
    /// <para lang="zh">通过指定选择器获得 Html 元素返回图片数据</para>
    /// <para lang="en">Gets image data from an HTML element by the specified selector</para>
    /// </summary>
    /// <param name="selector"></param>
    /// <param name="options"></param>
    /// <param name="token"></param>
    Task<string?> GetUrlAsync(string selector, Dom2ImageOptions? options = null, CancellationToken token = default);

    /// <summary>
    /// <para lang="zh">通过指定选择器获得 Html 元素返回图片数据流</para>
    /// <para lang="en">Gets image data stream from an HTML element by the specified selector</para>
    /// </summary>
    /// <param name="selector"></param>
    /// <param name="options"></param>
    /// <param name="token"></param>
    Task<Stream?> GetStreamAsync(string selector, Dom2ImageOptions? options = null, CancellationToken token = default);

    /// <summary>
    /// <para lang="zh">通过指定选择器下载 Html 元素图片</para>
    /// <para lang="en">Downloads an image from an HTML element by the specified selector</para>
    /// </summary>
    /// <param name="selector"></param>
    /// <param name="fileName"></param>
    /// <param name="format"></param>
    /// <param name="backgroundColor"></param>
    /// <param name="options"></param>
    Task DownloadAsync(string selector, string fileName = "capture", string? format = "png", string? backgroundColor = null, Dom2ImageOptions? options = null);
}
