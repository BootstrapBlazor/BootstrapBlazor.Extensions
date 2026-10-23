// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

using BootstrapBlazor.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace Microsoft.AspNetCore.Builder;

internal static class IApplicationBuilderExtensions
{
    extension(IApplicationBuilder builder)
    {
        public void MapIp()
        {
            builder.MapWhen(context => context.Request.Path.StartsWithSegments("/ip.axd"), app => app.Run(HandleIpAsync));
        }

        public void MapConnection()
        {
            builder.MapWhen(context => context.Request.Path.Equals(new PathString("/connection.axd")), app => app.Run(HandleHeartbeatAsync));
        }
    }

    private static async Task HandleIpAsync(HttpContext context)
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

    /// <summary>
    /// 接收客户端心跳并更新服务器端在线连接记录。
    /// </summary>
    /// <remarks>
    /// 仅在启用连接服务时接受 POST JSON 请求。
    /// IP、登录用户及地理位置由服务器确定，不信任客户端提交的对应信息。
    /// </remarks>
    /// <param name="context">当前 HTTP 请求上下文。</param>
    private static async Task HandleHeartbeatAsync(HttpContext context)
    {
        // 仅接受 POST 心跳，其他方法返回 405 并声明允许的方法。
        if (!HttpMethods.IsPost(context.Request.Method))
        {
            context.Response.Headers.Allow = HttpMethods.Post;
            context.Response.StatusCode = StatusCodes.Status405MethodNotAllowed;
            return;
        }

        // 以服务器配置为准，关闭时返回明确的错误信息，便于排查客户端配置不一致。
        var options = context.RequestServices.GetRequiredService<IOptions<BootstrapBlazorOptions>>().Value;
        if (!options.ConnectionHubOptions.Enable)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(new
            {
                code = "connection_hub_disabled",
                message = "ConnectionHub is disabled on the server."
            }, context.RequestAborted);
            return;
        }

        // 要求 JSON 请求体，不支持的媒体类型返回 415。
        if (!context.Request.HasJsonContentType())
        {
            context.Response.StatusCode = StatusCodes.Status415UnsupportedMediaType;
            return;
        }

        // 反序列化客户端信息；JSON 格式错误返回 400，请求取消则继续向上传播。
        ClientInfo? client;
        try
        {
            client = await context.Request.ReadFromJsonAsync<ClientInfo>(context.RequestAborted);
        }
        catch (JsonException)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            return;
        }

        // 校验连接标识及设备类型，避免无效数据写入在线连接集合。
        if (client == null || string.IsNullOrWhiteSpace(client.Id) || client.Id.Length > 128 || !Enum.IsDefined(client.Device))
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            return;
        }

        // 使用服务器连接信息和认证身份覆盖客户端上报值，同时清除不可信的地理位置。
        client.Ip = context.Connection.RemoteIpAddress.ToIPv4String();
        client.UserName = context.User.Identity is { IsAuthenticated: true } identity ? identity.Name : null;
        client.City = null;

        // 启用定位时，根据服务器确认的 IP 查询地理位置。
        if (options.ConnectionHubOptions.EnableIpLocator)
        {
            var factory = context.RequestServices.GetRequiredService<IIpLocatorFactory>();
            client.City = await factory.Create(options.IpLocatorOptions.ProviderName).Locate(client.Ip);
        }

        // 新增连接或刷新已有连接的心跳时间，成功后返回 204，无响应体。
        context.RequestServices.GetRequiredService<IConnectionService>().AddOrUpdate(client);
        context.Response.StatusCode = StatusCodes.Status204NoContent;
    }
}
