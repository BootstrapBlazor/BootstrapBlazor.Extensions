// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc;
using Opc.Da;
using System.Collections.Concurrent;
using System.Runtime.Versioning;

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// OPC Server 操作类
/// </summary>
[SupportedOSPlatform("windows")]
sealed class OpcDaServer : IOpcDaServer
{
    private Opc.Da.Server? _server = null;
    private readonly ConcurrentDictionary<string, HashSet<OpcReadItem>> _valuesCache = [];

    /// <summary>
    /// 获得 OPC Server 名称
    /// </summary>
    public string? ServerName { get; private set; }

    /// <summary>
    /// 获得 OPC Server 状态
    /// </summary>
    public bool IsConnected => _server?.IsConnected ?? false;

    private readonly Dictionary<string, ISubscription> _subscriptions = [];

    /// <summary>
    /// 连接到 OPCServer 方法
    /// </summary>
    /// <param name="serverName">服务器名称</param>
    /// <remarks>opcda://localhost/Kepware.KEPServerEX.V6</remarks>
    /// <returns>成功时返回真</returns>
    public bool Connect(string serverName)
    {
        ServerName = serverName;

        // 如果已经连接则先断开
        Disconnect();

        _server = new Opc.Da.Server(new OpcCom.Factory(), new URL(serverName));
        _server.Connect();
        return IsConnected;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="name"></param>
    /// <param name="filters"></param>
    /// <param name="position"></param>
    /// <returns></returns>
    public OpcBrowseElement[] Browse(string name, OpcBrowseFilters filters, out OpcBrowsePosition position)
    {
        if (_server is not { IsConnected: true })
        {
            throw new InvalidOperationException("OPC Server is not connected.");
        }

        var results = _server.Browse(new ItemIdentifier(name), filters.ToFilters(), out var pos);
        position = new OpcBrowsePosition(pos);
        return results.Select(element => new OpcBrowseElement(element)).ToArray();
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="position"></param>
    /// <returns></returns>
    public OpcBrowseElement[] BrowseNext(OpcBrowsePosition position)
    {
        if (_server is not { IsConnected: true })
        {
            throw new InvalidOperationException("OPC Server is not connected.");
        }

        var pos = position.Position;
        return _server.BrowseNext(ref pos).Select(element => new OpcBrowseElement(element)).ToArray();
    }

    /// <summary>
    /// 断开连接方法
    /// </summary>
    /// <returns></returns>
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

    /// <summary>
    /// 创建订阅方法
    /// </summary>
    /// <param name="name">订阅名称</param>
    /// <param name="updateRate">更新频率 默认 1000 毫秒</param>
    /// <param name="active">是否激活 默认 true</param>
    /// <returns></returns>
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

    /// <summary>
    /// 取消订阅方法
    /// </summary>
    /// <param name="subscription">订阅接口 <see cref="IOpcSubscription"/> 实例</param>
    /// <returns></returns>
    public void CancelSubscription(IOpcSubscription subscription)
    {
        var server = GetOpcServer();
        var name = subscription.Name;
        if (_subscriptions.Remove(name, out var sub))
        {
            server.CancelSubscription(sub);
        }
    }

    /// <summary>
    /// 读取指定 Item 值方法
    /// </summary>
    /// <param name="items"></param>
    /// <returns></returns>
    public HashSet<OpcReadItem> Read(params HashSet<string> items)
    {
        var server = GetOpcServer();
        var results = server.Read([.. items.Select(i => new Item() { ItemName = i })]);
        return results.Select(i => new OpcReadItem(i.ItemName, i.Quality.ToQuality(), i.Timestamp, i.Value)).ToHashSet(OpcItemEqualityComparer<OpcReadItem>.Default);
    }

    /// <summary>
    /// 读取指定 Item 值方法
    /// </summary>
    /// <param name="items"></param>
    /// <returns></returns>
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

    /// <summary>
    /// Dispose 方法
    /// </summary>
    /// <param name="disposing"></param>
    private void Dispose(bool disposing)
    {
        if (disposing)
        {
            Disconnect();
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
