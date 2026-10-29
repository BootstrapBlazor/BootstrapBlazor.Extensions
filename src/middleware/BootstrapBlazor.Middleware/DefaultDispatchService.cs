// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0.

using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">服务端本地和 SignalR 消息分发服务</para>
/// <para lang="en">Server-side local and SignalR message dispatch service.</para>
/// </summary>
sealed class DefaultDispatchService<TEntry>(
    IHubContext<BootstrapBlazorHub> hub,
    BootstrapBlazorHubOptions options,
    ILogger<DefaultDispatchService<TEntry>> logger) : IDispatchService<TEntry>
{
    private static readonly string _entryType = typeof(TEntry).FullName ?? typeof(TEntry).Name;
    private static readonly JsonSerializerOptions _serializerOptions = new(JsonSerializerDefaults.Web);
    private readonly object _locker = new();
    private readonly List<Subscription> _subscriptions = [];

    public Task DispatchAsync(DispatchEntry<TEntry> entry, CancellationToken cancellationToken = default)
        => DispatchAsync(entry, null, cancellationToken);

    internal async Task DispatchAsync(DispatchEntry<TEntry> entry, string? excludedConnectionId, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (options.EntryTypes.ContainsKey(_entryType))
        {
            var clients = excludedConnectionId == null
                ? hub.Clients.Group(_entryType)
                : hub.Clients.GroupExcept(_entryType, [excludedConnectionId]);
            await clients.SendAsync("Receive", _entryType, JsonSerializer.SerializeToElement(entry, _serializerOptions), cancellationToken);
        }

        Subscription[] subscriptions;
        lock (_locker)
        {
            subscriptions = _subscriptions.ToArray();
        }

        foreach (var subscription in subscriptions)
        {
            cancellationToken.ThrowIfCancellationRequested();
            try
            {
                Task callbackTask;
                lock (_locker)
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    if (!_subscriptions.Contains(subscription))
                    {
                        continue;
                    }

                    // Coordinate callback startup with unsubscription.
                    callbackTask = subscription.Callback(entry);
                }

                await callbackTask.WaitAsync(cancellationToken);
                cancellationToken.ThrowIfCancellationRequested();
            }
            catch (Exception ex) when (!cancellationToken.IsCancellationRequested)
            {
                logger.LogError(ex, "A dispatch subscriber failed for entry type {EntryType}.", _entryType);
            }
        }
    }

    public Task SubscribeAsync(Func<DispatchEntry<TEntry>, Task> callback, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();
        lock (_locker)
        {
            _subscriptions.Add(new Subscription(callback));
        }
        return Task.CompletedTask;
    }

    public Task UnSubscribeAsync(Func<DispatchEntry<TEntry>, Task> callback, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();
        lock (_locker)
        {
            var index = _subscriptions.FindIndex(subscription => subscription.Callback == callback);
            if (index >= 0)
            {
                _subscriptions.RemoveAt(index);
            }
        }
        return Task.CompletedTask;
    }

    private sealed class Subscription(Func<DispatchEntry<TEntry>, Task> callback)
    {
        public Func<DispatchEntry<TEntry>, Task> Callback { get; } = callback;
    }
}
