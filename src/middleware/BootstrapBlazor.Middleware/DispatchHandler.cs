// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0.

using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">消息订阅和分发处理类</para>
/// <para lang="en">Handles message subscriptions and dispatch.</para>
/// </summary>
static class DispatchHandler
{
    /// <summary>
    /// <para lang="zh">尝试订阅消息类型，未允许时返回 false，加入分组失败时传播异常</para>
    /// <para lang="en">Attempts to subscribe to an entry type, returning false when disallowed and propagating group membership failures.</para>
    /// </summary>
    public static async Task<bool> SubscribeAsync(HubCallerContext context, IGroupManager groups, string entryType, BootstrapBlazorHubOptions options)
    {
        if (!options.EntryTypes.ContainsKey(entryType))
        {
            return false;
        }

        await groups.AddToGroupAsync(context.ConnectionId, entryType, context.ConnectionAborted);
        return true;
    }

    public static Task UnsubscribeAsync(HubCallerContext context, IGroupManager groups, string entryType)
        => groups.RemoveFromGroupAsync(context.ConnectionId, entryType, context.ConnectionAborted);

    public static Task DispatchAsync(HubCallerContext context, string entryType, JsonElement entry, BootstrapBlazorHubOptions options, IServiceProvider services)
    {
        if (!options.EntryTypes.TryGetValue(entryType, out var publish) || publish == null)
        {
            throw new HubException("Client publishing is not allowed for this type.");
        }

        return publish(services, entry, context.ConnectionId, context.ConnectionAborted);
    }
}
