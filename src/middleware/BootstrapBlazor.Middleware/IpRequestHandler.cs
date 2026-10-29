// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">客户端 IP 地址查询请求处理类</para>
/// <para lang="en">Handles client IP address lookup requests.</para>
/// </summary>
static class IpRequestHandler
{
    public static async Task HandleAsync(HttpContext context)
    {
        var ip = "";
        var headers = context.Request.Headers;
        if (headers.TryGetValue("X-Forwarded-For", out var value))
        {
            var ips = new List<string>();
            foreach (var xf in value)
            {
                if (!string.IsNullOrEmpty(xf))
                {
                    ips.Add(xf);
                }
            }
            ip = string.Join(";", ips);
        }
        else
        {
            ip = context.Connection.RemoteIpAddress.ToIPv4String();
        }

        context.Response.Headers.TryAdd("Content-Type", new Microsoft.Extensions.Primitives.StringValues("application/json; charset=utf-8"));
        await context.Response.WriteAsync(JsonSerializer.Serialize(new { Id = context.TraceIdentifier, Ip = ip }));
    }
}
