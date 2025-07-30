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
class OpcServer : IOpcServer
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
    /// 断开连接方法
    /// </summary>
    /// <returns></returns>
    public void Disconnect()
    {
        ServerName = string.Empty;

        if (_server != null && _server.IsConnected)
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
    public ISubscription CreateSubscription(string name, int updateRate = 1000, bool active = true)
    {
        var server = GetOpcServer();
        var subscription = server.CreateSubscription(new SubscriptionState
        {
            Name = name,
            Deadband = 0,
            UpdateRate = updateRate,
            Active = active
        });
        return subscription.ToOpcSubscription();
    }

    /// <summary>
    /// 取消订阅方法
    /// </summary>
    /// <param name="subscription">订阅接口 <see cref="ISubscription"/> 实例</param>
    /// <returns></returns>
    public void CancelSubscription(ISubscription subscription)
    {
        var server = GetOpcServer();
        server.CancelSubscription(subscription.GetSubscription());
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
            return new OpcWriteItem(i.Name, i.Value) { Result = item != null && item.ResultID == ResultID.S_OK };
        }).ToHashSet(OpcItemEqualityComparer<OpcWriteItem>.Default);
    }

    private Opc.Da.Server GetOpcServer()
    {
        if (_server == null)
        {
            throw new InvalidOperationException("OPC Server is not connected.");
        }
        return _server;
    }

    /// <summary>
    /// Dispose 方法
    /// </summary>
    /// <param name="disposing"></param>
    protected virtual void Dispose(bool disposing)
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
