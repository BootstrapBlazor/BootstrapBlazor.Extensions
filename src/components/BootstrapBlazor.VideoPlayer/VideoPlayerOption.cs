// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// 播放器选项
/// </summary>
public class VideoPlayerOption
{
    /// <summary>
    /// 宽度
    /// </summary>
    public int Width { get; set; } = 300;

    /// <summary>
    /// 高度
    /// </summary>
    public int Height { get; set; } = 200;

    /// <summary>
    /// 显示控制条,默认 true
    /// </summary>
    public bool Controls { get; set; } = true;

    /// <summary>
    /// 自动播放,默认 true
    /// </summary>
    [JsonPropertyName("autoplay")]
    public bool AutoPlay { get; set; } = true;

    /// <summary>
    /// 预载,默认 auto
    /// </summary>
    public string Preload { get; set; } = "auto";

    /// <summary>
    /// 播放资源
    /// </summary>
    public List<VideoSources> Sources { get; set; } = [];

    /// <summary>
    /// 设置封面资源,相对或者绝对路径
    /// </summary>
    public string? Poster { get; set; }

    /// <summary>
    /// 界面语言, 默认 zh-CN
    /// </summary>
    public string? Language { get; set; } = "zh-CN";
}
