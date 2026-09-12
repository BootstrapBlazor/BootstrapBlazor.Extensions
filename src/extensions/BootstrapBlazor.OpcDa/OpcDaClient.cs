// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc;
using Opc.Da;
using System.Runtime.Versioning;

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <para lang="zh">OpcDa 客户端实现</para>
/// <para lang="en">OpcDa client implementation</para>
/// </summary>
[SupportedOSPlatform("windows")]
class OpcDaClient : IOpcDaClient
{
    private Opc.Da.Server? _server = null;

    /// <inheritdoc/>
    public string? ServerName { get; private set; }

    /// <inheritdoc/>
    public bool IsConnected => _server?.IsConnected ?? false;

    private readonly Dictionary<string, ISubscription> _subscriptions = [];

    /// <inheritdoc/>
    /// <remarks>opcda://localhost/Kepware.KEPServerEX.V6</remarks>
    public bool Connect(string serverName)
    {
        ServerName = serverName;

        // 如果已经连接则先断开
        Disconnect();

        _server = new Opc.Da.Server(new OpcCom.Factory(), new URL(serverName));
        _server.Connect();
        return IsConnected;
    }

    /// <inheritdoc/>
    public void Disconnect()
    {
        ServerName = string.Empty;

        if (_server is { IsConnected: true })
        {
            foreach (Subscription sub in _server.Subscriptions)
            {
                _server.CancelSubscription(sub);
            }

            _server.Disconnect();
            _server = null;
        }
    }

    /// <inheritdoc/>
    public IOpcSubscription CreateSubscription(string name, int updateRate = 1000, bool active = true)
    {
        var server = GetOpcServer();
        if (_subscriptions.TryGetValue(name, out var subscription))
        {
            // 已经存在该订阅
            server.CancelSubscription(subscription);
        }

        subscription = server.CreateSubscription(name, updateRate, active);
        _subscriptions.Add(name, subscription);
        return subscription.ToOpcSubscription();
    }

    /// <inheritdoc/>
    public void CancelSubscription(IOpcSubscription subscription)
    {
        var server = GetOpcServer();
        var name = subscription.Name;
        if (_subscriptions.Remove(name, out var sub))
        {
            server.CancelSubscription(sub);
        }
    }

    /// <inheritdoc/>
    public HashSet<OpcReadItem> Read(params HashSet<string> items)
    {
        var server = GetOpcServer();
        var results = server.Read([.. items.Select(i => new Item() { ItemName = i })]);
        return results.Select(i => new OpcReadItem(i.ItemName, i.Quality.ToQuality(), i.Timestamp, i.Value)).ToHashSet(OpcItemEqualityComparer<OpcReadItem>.Default);
    }

    /// <inheritdoc/>
    public HashSet<OpcWriteItem> Write(params HashSet<OpcWriteItem> items)
    {
        var server = GetOpcServer();
        var results = server.Write([.. items.Select(i => new ItemValue() { ItemName = i.Name, Value = i.Value })]);

        return items.Select(i =>
        {
            var item = results.FirstOrDefault(v => v.ItemName == i.Name);
            return i with { Result = item != null && item.ResultID == ResultID.S_OK };
        }).ToHashSet(OpcItemEqualityComparer<OpcWriteItem>.Default);
    }

    private Opc.Da.Server GetOpcServer()
    {
        if (_server is not { IsConnected: true })
        {
            throw new InvalidOperationException("OPC Server is not connected.");
        }

        return _server;
    }

    /// <inheritdoc/>
    public OpcBrowseElement[] Browse(string name, OpcBrowseFilters filters, out OpcBrowsePosition? position)
    {
        var server = GetOpcServer();
        var results = server.Browse(new ItemIdentifier(name), filters.ToFilters(), out var pos) ?? [];
        position = pos == null ? null : new OpcBrowsePosition(pos);
        return [.. results.Select(element => new OpcBrowseElement(element))];
    }

    /// <inheritdoc/>
    public OpcBrowseElement[] BrowseNext(OpcBrowsePosition position)
    {
        var server = GetOpcServer();
        var pos = position.Position;
        var results = server.BrowseNext(ref pos) ?? [];
        return [.. results.Select(element => new OpcBrowseElement(element))];
    }

    private void Dispose(bool disposing)
    {
        if (disposing)
        {
            Disconnect();
        }
    }

    /// <inheritdoc/>
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
