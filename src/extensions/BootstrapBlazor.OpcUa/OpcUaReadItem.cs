// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc.Ua;

namespace BootstrapBlazor.OpcUa;

/// <summary>
/// <para lang="zh">OPC UA 节点读取结果</para>
/// <para lang="en">OPC UA node read result</para>
/// </summary>
public sealed record OpcUaReadItem(string NodeId, object? Value, StatusCode StatusCode, DateTime SourceTimestamp, DateTime ServerTimestamp)
{
    /// <summary>
    /// <para lang="zh">获得状态是否正常</para>
    /// <para lang="en">Gets whether the status is good</para>
    /// </summary>
    public bool IsGood => Opc.Ua.StatusCode.IsGood(StatusCode);

    /// <summary>
    /// <para lang="zh">获得上一次的值</para>
    /// <para lang="en">Gets the previous value</para>
    /// </summary>
    public object? LastValue { get; init; }
}
