// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">聚合定位结果类</para>
/// <para lang="en">JuHe location result class</para>
/// </summary>
class JuHeLocationResult
{
    /// <summary>
    /// <para lang="zh">获得/设置 结果状态返回码</para>
    /// <para lang="en">Gets or sets the result status reason</para>
    /// </summary>
    public string? Reason { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 错误码</para>
    /// <para lang="en">Gets or sets the error code</para>
    /// </summary>
    [JsonPropertyName("error_code")]
    public int ErrorCode { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 定位信息</para>
    /// <para lang="en">Gets or sets the location data</para>
    /// </summary>
    public JuHeLocationData? Result { get; set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public override string? ToString()
    {
        string? ret = null;
        if (ErrorCode == 0)
        {
            ret = Result?.Country == "中国"
                ? $"{Result?.Prov}{Result?.City}{Result?.District} {Result?.Isp}"
                : $"{Result?.Continent} {Result?.Country} {Result?.City}";
        }
        return ret;
    }
}
