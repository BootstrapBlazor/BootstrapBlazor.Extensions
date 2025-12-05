// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 模拟通道信息
/// </summary>
public class HikVisionDigitalChannelInfo()
{
    /// <summary>
    /// 获得 通道 Id
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// 获得 通道号
    /// </summary>
    public int InputPort { get; set; }

    /// <summary>
    /// 获得 通道名称
    /// </summary>
    public string? Name { get; set; }

    /// <summary>
    /// 获得 通道制式
    /// </summary>
    public string? VideoFormat { get; set; }
}
