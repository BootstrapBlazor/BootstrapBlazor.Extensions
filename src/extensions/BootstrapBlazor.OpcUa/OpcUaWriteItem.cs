// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc.Ua;

namespace BootstrapBlazor.OpcUa;

/// <summary>
/// <para lang="zh">OPC UA 节点写入项</para>
/// <para lang="en">OPC UA node write item</para>
/// </summary>
public sealed record OpcUaWriteItem(string NodeId, object? Value)
{
    /// <summary>
    /// <para lang="zh">获得写入状态</para>
    /// <para lang="en">Gets the write status</para>
    /// </summary>
    public StatusCode StatusCode { get; init; } = StatusCodes.Good;

    /// <summary>
    /// <para lang="zh">获得写入是否成功</para>
    /// <para lang="en">Gets whether the write succeeded</para>
    /// </summary>
    public bool Result => Opc.Ua.StatusCode.IsGood(StatusCode);
}
