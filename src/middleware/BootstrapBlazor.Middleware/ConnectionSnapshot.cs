// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0.

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">SignalR 连接快照及服务端计算的在线连接数量</para>
/// <para lang="en">SignalR connection snapshot and the online connection count computed by the server</para>
/// </summary>
public sealed record ConnectionSnapshot(long Count, ICollection<ConnectionItem> Connections);
