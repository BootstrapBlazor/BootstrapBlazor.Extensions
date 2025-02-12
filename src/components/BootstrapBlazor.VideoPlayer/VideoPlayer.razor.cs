﻿// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.Globalization;

namespace BootstrapBlazor.Components;

/// <summary>
/// 视频播放器 VideoPlayer 组件
/// </summary>
public partial class VideoPlayer : IAsyncDisposable
{
    /// <summary>
    /// 资源地址
    /// </summary>
    [Parameter]
    [NotNull]
    [EditorRequired]
    public string? Url { get; set; }

    /// <summary>
    /// 获得/设置 资源类型 默认 application/x-mpegURL
    /// <para>video/mp4</para>
    /// <para>application/x-mpegURL</para>
    /// <para>video/ogg</para>
    /// <para>video/x-matroska</para>
    /// <para>更多参考 EnumVideoType</para>
    /// </summary>
    [Parameter]
    public string MineType { get; set; } = "application/x-mpegURL";

    /// <summary>
    /// 获得/设置 宽度 默认 300
    /// </summary>
    [Parameter]
    public int Width { get; set; } = 300;

    /// <summary>
    /// 获得/设置 高度 默认 200
    /// </summary>
    [Parameter]
    public int Height { get; set; } = 200;

    /// <summary>
    /// 获得/设置 显示控制条 默认 true
    /// </summary>
    [Parameter]
    public bool Controls { get; set; } = true;

    /// <summary>
    /// 获得/设置 自动播放 默认 true
    /// </summary>
    [Parameter]
    public bool AutoPlay { get; set; } = true;

    /// <summary>
    /// 获得/设置 预载 默认 auto
    /// </summary>
    [Parameter]
    public string Preload { get; set; } = "auto";

    /// <summary>
    /// 获得/设置 设置封面资源，相对或者绝对路径 默认 null
    /// </summary>
    [Parameter]
    public string? Poster { get; set; }

    /// <summary>
    /// 界面语言,默认 获取当前文化, 例如 zh-CN/en-US
    /// <para></para>如果语言包不存在,回退到 zh-CN
    /// </summary>
    [Parameter]
    public string? Language { get; set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override async Task InvokeInitAsync()
    {
        Language = Language ?? CultureInfo.CurrentCulture.Name;
        var option = new VideoPlayerOption()
        {
            Width = Width,
            Height = Height,
            Controls = Controls,
            AutoPlay = AutoPlay,
            Preload = Preload,
            Poster = Poster,
            Language = Language
        };
        option.Sources.Add(new VideoSources(MineType, Url));
        await InvokeVoidAsync("init", Id, option);
    }

    /// <summary>
    /// 切换播放资源
    /// </summary>
    /// <param name="url"></param>
    /// <param name="mineType"></param>
    /// <returns></returns>
    public async Task Reload(string url, string mineType)
    {
        Url = url;
        MineType = mineType;
        await InvokeVoidAsync("reloadPlayer", Id, url, mineType);
    }

    /// <summary>
    /// 设置封面
    /// </summary>
    /// <param name="poster"></param>
    /// <returns></returns>
    public async Task SetPoster(string poster)
    {
        Poster = poster;
        await InvokeVoidAsync("setPoster", Id, poster);
    }
}
