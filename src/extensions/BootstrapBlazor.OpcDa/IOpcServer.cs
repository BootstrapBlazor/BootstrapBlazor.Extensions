// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// Opc Server 接口定义
/// </summary>
public interface IOpcServer : IDisposable
{
    /// <summary>
    /// 获得 OPC Server 是否已连接
    /// </summary>
    bool IsConnected { get; }

    /// <summary>
    /// 获得 OPC Server 名称
    /// </summary>
    string? ServerName { get; }

    /// <summary>
    /// 连接到 OPC Server 方法
    /// </summary>
    /// <param name="serverName"></param>
    /// <returns></returns>
    bool Connect(string serverName);

    /// <summary>
    /// 断开连接方法
    /// </summary>
    void Disconnect();

    /// <summary>
    /// 取消订阅方法
    /// </summary>
    /// <param name="subscription"></param>
    void CancelSubscription(ISubscription subscription);

    /// <summary>
    /// 创建订阅方法
    /// </summary>
    /// <param name="name">订阅名称</param>
    /// <param name="updateRate">更新频率 默认 1000 毫秒</param>
    /// <param name="active">是否激活 默认 true</param>
    /// <returns></returns>
    ISubscription CreateSubscription(string name, int updateRate = 1000, bool active = true);

    /// <summary>
    /// 读取 Item 值方法
    /// </summary>
    /// <param name="items"></param>
    /// <returns></returns>
    HashSet<OpcItem> Read(params List<string> items);
}
