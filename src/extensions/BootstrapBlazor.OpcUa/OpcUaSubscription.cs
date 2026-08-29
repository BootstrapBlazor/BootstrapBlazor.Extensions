// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc.Ua;
using Opc.Ua.Client;

namespace BootstrapBlazor.OpcUa;

sealed class OpcUaSubscription(Subscription subscription) : IOpcUaSubscription
{
    private readonly object _syncRoot = new();
    private readonly Dictionary<string, object?> _lastValues = [];
    private readonly List<MonitoredItem> _items = [];
    private bool _disposed;

    public string Name => subscription.DisplayName;

    public bool KeepLastValue { get; set; }

    public Action<IReadOnlyList<OpcUaReadItem>>? DataChanged { get; set; }

    public async Task AddItemsAsync(IEnumerable<string> nodeIds, int samplingInterval = -1, CancellationToken cancellationToken = default)
    {
        Guard.ThrowIfDisposed(_disposed, this);
        ArgumentNullException.ThrowIfNull(nodeIds);

        var items = nodeIds.Select(nodeId =>
        {
            Guard.ThrowIfNullOrWhiteSpace(nodeId, nameof(nodeIds));
            var item = new MonitoredItem(subscription.DefaultItem)
            {
                StartNodeId = NodeId.Parse(nodeId),
                AttributeId = Attributes.Value,
                DisplayName = nodeId,
                SamplingInterval = samplingInterval
            };
            item.Notification += OnNotification;
            return item;
        }).ToArray();

        if (items.Length == 0)
        {
            return;
        }

        subscription.AddItems(items);
        lock (_syncRoot)
        {
            _items.AddRange(items);
        }

        try
        {
            await subscription.ApplyChangesAsync(cancellationToken);
        }
        catch
        {
            subscription.RemoveItems(items);
            lock (_syncRoot)
            {
                foreach (var item in items)
                {
                    item.Notification -= OnNotification;
                    _items.Remove(item);
                }
            }
            throw;
        }
    }

    private void OnNotification(MonitoredItem item, MonitoredItemNotificationEventArgs args)
    {
        var values = item.DequeueValues();
        if (values.Count == 0)
        {
            return;
        }

        var nodeId = item.StartNodeId.ToString();
        var results = new List<OpcUaReadItem>(values.Count);

        lock (_syncRoot)
        {
            foreach (var value in values)
            {
                _lastValues.TryGetValue(nodeId, out var lastValue);
                results.Add(new OpcUaReadItem(nodeId, value.Value, value.StatusCode, value.SourceTimestamp, value.ServerTimestamp)
                {
                    LastValue = KeepLastValue ? lastValue : null
                });
                _lastValues[nodeId] = value.Value;
            }
        }

        DataChanged?.Invoke(results);
    }

    internal Subscription Subscription => subscription;

    internal void Dispose()
    {
        if (_disposed)
        {
            return;
        }

        lock (_syncRoot)
        {
            foreach (var item in _items)
            {
                item.Notification -= OnNotification;
            }
            _items.Clear();
            _lastValues.Clear();
        }

        DataChanged = null;
        subscription.Dispose();
        _disposed = true;
    }
}
