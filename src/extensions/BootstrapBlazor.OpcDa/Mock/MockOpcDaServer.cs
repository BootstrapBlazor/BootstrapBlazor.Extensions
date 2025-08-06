// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// 模拟 OpcDa Server 实现类
/// </summary>
sealed class MockOpcDaServer : IOpcDaServer
{
    public bool IsConnected { get; set; }

    public string? ServerName { get; set; }

    private readonly Dictionary<string, IOpcSubscription> _subscriptions = [];

    public bool Connect(string serverName)
    {
        ServerName = serverName;
        IsConnected = true;
        return true;
    }

    public void Disconnect()
    {
        IsConnected = false;
        ServerName = null;
    }

    public IOpcSubscription CreateSubscription(string name, int updateRate = 1000, bool active = true)
    {
        if (_subscriptions.TryGetValue(name, out var subscription))
        {
            CancelSubscription(subscription);
        }

        subscription = new MockOpcDaSubscription(name, updateRate, active);
        _subscriptions.Add(name, subscription);
        return subscription;
    }

    public void CancelSubscription(IOpcSubscription subscription)
    {
        _subscriptions.Remove(subscription.Name);
        if (subscription is IDisposable disposable)
        {
            disposable.Dispose();
        }
    }

    public HashSet<OpcReadItem> Read(params HashSet<string> items)
    {
        return items.Select(i => new OpcReadItem(i, Quality.Good, DateTime.Now, Random.Shared.Next(1000, 2000)))
            .ToHashSet(OpcItemEqualityComparer<OpcReadItem>.Default);
    }

    public HashSet<OpcWriteItem> Write(params HashSet<OpcWriteItem> items)
    {
        return items.Select(i => new OpcWriteItem(i.Name, i.Value) { Result = true })
            .ToHashSet(OpcItemEqualityComparer<OpcWriteItem>.Default);
    }

    public void Dispose()
    {
    }
}
