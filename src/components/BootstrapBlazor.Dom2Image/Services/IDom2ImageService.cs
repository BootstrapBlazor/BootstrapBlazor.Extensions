// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// IDom2ImageService 接口定义
/// </summary>
public interface IDom2ImageService
{
    /// <summary>
    /// 通过指定选择器获得 Html 元素返回图片数据
    /// </summary>
    /// <param name="selector"></param>
    /// <param name="options"></param>
    /// <param name="token"></param>
    /// <returns></returns>
    Task<string?> GetUrlAsync(string selector, Dom2ImageOptions? options = null, CancellationToken token = default);

    /// <summary>
    /// 通过指定选择器获得 Html 元素返回图片数据流
    /// </summary>
    /// <param name="selector"></param>
    /// <param name="options"></param>
    /// <param name="token"></param>
    /// <returns></returns>
    Task<Stream?> GetStreamAsync(string selector, Dom2ImageOptions? options = null, CancellationToken token = default);
}
