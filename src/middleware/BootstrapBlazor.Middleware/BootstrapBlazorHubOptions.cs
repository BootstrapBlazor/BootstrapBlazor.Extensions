// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0.

using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">共享 SignalR Hub 配置，消息类型和在线连接快照查询需显式启用</para>
/// <para lang="en">Shared SignalR Hub options. Dispatch types and connection snapshot queries require explicit opt-in.</para>
/// <para><version>11.0.0</version></para>
/// </summary>
public sealed class BootstrapBlazorHubOptions
{
    private static readonly JsonSerializerOptions _serializerOptions = new(JsonSerializerDefaults.Web);

    internal Dictionary<string, Func<IServiceProvider, JsonElement, string, CancellationToken, Task>?> EntryTypes { get; } = new(StringComparer.Ordinal);

    /// <summary>
    /// <para lang="zh">获得/设置是否允许查询在线连接快照，快照包含客户端信息，默认关闭</para>
    /// <para lang="en">Gets or sets whether connection snapshot queries are enabled. Disabled by default because snapshots contain client information.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public bool EnableConnectionSnapshots { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置独立于消息订阅的快照查询授权策略；未设置时，启用查询后所有获准连接 Hub 的客户端均可查询</para>
    /// <para lang="en">Gets or sets the optional snapshot authorization policy, independent of dispatch subscriptions. When omitted, enabling snapshots permits all clients authorized to connect to the Hub to query them.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    public string? ConnectionSnapshotAuthorizationPolicy { get; set; }

    /// <summary>
    /// <para lang="zh">允许客户端订阅指定消息类型，并可选择允许发布；不得公开包含凭据的内部 Webhook 载荷</para>
    /// <para lang="en">Allows clients to subscribe to a type and optionally publish it. Internal webhook payloads containing credentials must not be exposed.</para>
    /// </summary>
    /// <typeparam name="TEntry"></typeparam>
    /// <param name="allowClientPublish">
    /// <para lang="zh">是否允许客户端发布，默认 false</para>
    /// <para lang="en">Whether clients are allowed to publish. Defaults to false.</para>
    /// </param>
    public void Allow<TEntry>(bool allowClientPublish = false)
    {
        EntryTypes[typeof(TEntry).FullName ?? typeof(TEntry).Name] = allowClientPublish ? PublishAsync<TEntry> : null;
    }

    private static async Task PublishAsync<TEntry>(IServiceProvider services, JsonElement json, string connectionId, CancellationToken cancellationToken)
    {
        DispatchEntry<TEntry>? entry;
        try
        {
            entry = json.Deserialize<DispatchEntry<TEntry>>(_serializerOptions);
        }
        catch (Exception ex) when (ex is JsonException or NotSupportedException)
        {
            throw new HubException("Invalid dispatch payload.");
        }

        if (entry == null || json.ValueKind != JsonValueKind.Object)
        {
            throw new HubException("Invalid dispatch payload.");
        }

        var service = (DefaultDispatchService<TEntry>)services.GetRequiredService<IDispatchService<TEntry>>();
        await service.DispatchAsync(entry, connectionId, cancellationToken);
    }
}
