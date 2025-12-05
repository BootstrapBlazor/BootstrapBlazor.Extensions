// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 海康威视网络摄像机通道信息
/// </summary>
public class HikVisionChannel
{
    /// <summary>
    /// 获得/设置 模拟通道信息集合
    /// </summary>
    public List<HikVisionAnalogChannelInfo> AnalogChannels { get; set; } = [];

    /// <summary>
    /// 获得/设置 数字通道信息集合
    /// </summary>
    public List<HikVisionDigitalChannelInfo> DigitalChannels { get; set; } = [];

    /// <summary>
    /// 获得/设置 数字通道信息集合
    /// </summary>
    public List<HikVisionZeroChannelInfo> ZeroChannels { get; set; } = [];
}
