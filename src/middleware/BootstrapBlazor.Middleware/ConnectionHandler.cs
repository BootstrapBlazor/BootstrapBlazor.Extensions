// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0.

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">在线连接心跳和快照查询处理类</para>
/// <para lang="en">Handles online connection heartbeats and snapshot queries.</para>
/// </summary>
static class ConnectionHandler
{
    public static async Task<bool> ReportHeartbeatAsync(HubCallerContext context, ClientInfo client, IServiceProvider services)
    {
        var bootstrapOptions = services.GetRequiredService<IOptions<BootstrapBlazorOptions>>().Value;
        if (!bootstrapOptions.ConnectionHubOptions.Enable)
        {
            return false;
        }

        if (client == null || string.IsNullOrWhiteSpace(client.Id) || client.Id.Length > 128 ||
            !Enum.IsDefined(typeof(WebClientDeviceType), client.Device))
        {
            throw new HubException("Invalid connection heartbeat.");
        }

        var httpContext = context.GetHttpContext() ?? throw new HubException("The connection context is unavailable.");
        client.Ip = httpContext.Connection.RemoteIpAddress.ToIPv4String();
        client.UserName = context.User?.Identity is { IsAuthenticated: true } identity ? identity.Name : null;
        client.City = null;

        if (bootstrapOptions.ConnectionHubOptions.EnableIpLocator)
        {
            var factory = services.GetRequiredService<IIpLocatorFactory>();
            client.City = await factory.Create(bootstrapOptions.IpLocatorOptions.ProviderName).Locate(client.Ip);
        }

        context.ConnectionAborted.ThrowIfCancellationRequested();
        await services.GetRequiredService<IConnectionService>().AddOrUpdateAsync(client, context.ConnectionAborted);
        return true;
    }

    public static async Task<ICollection<ConnectionItem>?> GetSnapshotAsync(HubCallerContext context, BootstrapBlazorHubOptions options, IServiceProvider services)
    {
        if (!options.EnableConnectionSnapshots)
        {
            // 未开启快照查询功能直接返回 null
            return null;
        }

        if (!string.IsNullOrEmpty(options.ConnectionSnapshotAuthorizationPolicy))
        {
            // 如果设置了授权策略则进行授权检查
            var authorization = services.GetRequiredService<IAuthorizationService>();
            var result = await authorization.AuthorizeAsync(context.User ?? new ClaimsPrincipal(), null, options.ConnectionSnapshotAuthorizationPolicy);
            if (!result.Succeeded)
            {
                return null;
            }
        }

        var service = services.GetRequiredService<IConnectionService>();
        return service.Connections;
    }
}
