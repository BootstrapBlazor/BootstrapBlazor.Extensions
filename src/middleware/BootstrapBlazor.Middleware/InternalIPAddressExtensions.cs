// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Net;

namespace Microsoft.AspNetCore.Builder;

/// <summary>
/// <para lang="zh">IP 地址内部操作扩展类</para>
/// <para lang="en">Internal IP address extensions.</para>
/// </summary>
internal static class InternalIPAddressExtensions
{
    /// <summary>
    /// <para lang="zh">获得 IP 地址字符串，将 IPv4 映射地址转换为 IPv4 格式，空地址使用 IPv6 回环地址</para>
    /// <para lang="en">Gets an IP address string, converting IPv4-mapped addresses to IPv4 format and using the IPv6 loopback address when null.</para>
    /// </summary>
    public static string ToIPv4String(this IPAddress? address)
    {
        var ipv4Address = (address ?? IPAddress.IPv6Loopback).ToString();
        return ipv4Address.StartsWith("::ffff:") ? (address ?? IPAddress.IPv6Loopback).MapToIPv4().ToString() : ipv4Address;
    }
}
