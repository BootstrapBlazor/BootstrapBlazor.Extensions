// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc.Ua;

namespace BootstrapBlazor.OpcUa;

/// <summary>
/// <para lang="zh">OPC UA 浏览节点</para>
/// <para lang="en">OPC UA browsed node</para>
/// </summary>
public sealed record OpcUaBrowseElement(
    string NodeId,
    string BrowseName,
    string DisplayName,
    NodeClass NodeClass,
    string ReferenceTypeId,
    string? TypeDefinitionId);
