// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <para lang="zh">OpcDaServer 兼容接口</para>
/// <para lang="en">Compatibility interface for OpcDaServer</para>
/// </summary>
[Obsolete("Use IOpcDaClient instead.")]
public interface IOpcDaServer : IOpcDaClient
{
}
