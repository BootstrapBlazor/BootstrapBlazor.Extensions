// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 播放类型
/// </summary>
public enum EnumVideoType
{
    /// <summary>
    /// 
    /// </summary>
    [Description("video/ogg")]
    opus,
    /// <summary>
    /// 
    /// </summary>
    [Description("video/ogg")]
    ogv,
    /// <summary>
    /// 
    /// </summary>
    [Description("video/mp4")]
    mp4,
    /// <summary>
    /// 
    /// </summary>
    [Description("video/mp4")]
    mov,
    /// <summary>
    /// 
    /// </summary>
    [Description("video/mp4")]
    m4v,
    /// <summary>
    /// 
    /// </summary>
    [Description("video/x-matroska")]
    mkv,
    /// <summary>
    /// 
    /// </summary>
    [Description("audio/mp4")]
    m4a,
    /// <summary>
    /// 
    /// </summary>
    [Description("audio/mpeg")]
    mp3,
    /// <summary>
    /// 
    /// </summary>
    [Description("audio/aac")]
    aac,
    /// <summary>
    /// 
    /// </summary>
    [Description("audio/x-caf")]
    caf,
    /// <summary>
    /// 
    /// </summary>
    [Description("audio/flac")]
    flac,
    /// <summary>
    /// 
    /// </summary>
    [Description("audio/ogg")]
    oga,
    /// <summary>
    /// 
    /// </summary>
    [Description("audio/wav")]
    wav,
    /// <summary>
    /// 
    /// </summary>
    [Description("application/x-mpegURL")]
    m3u8,
    /// <summary>
    /// 
    /// </summary>
    [Description("application/dash+xml")]
    mpd,
    /// <summary>
    /// 
    /// </summary>
    [Description("image/jpeg")]
    jpg,
    /// <summary>
    /// 
    /// </summary>
    [Description("image/jpeg")]
    jpeg,
    /// <summary>
    /// 
    /// </summary>
    [Description("image/gif")]
    gif,
    /// <summary>
    /// 
    /// </summary>
    [Description("image/png")]
    png,
    /// <summary>
    /// 
    /// </summary>
    [Description("image/svg+xml")]
    svg,
    /// <summary>
    /// 
    /// </summary>
    [Description("image/webp")]
    webp,
}
