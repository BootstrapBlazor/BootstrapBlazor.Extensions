// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// 订阅接口定义
/// </summary>
public interface ISubscription
{
    /// <summary>
    /// 数据变更回调
    /// </summary>
    Func<List<OpcReadItem>>? DataChanged { get; set; }

    /// <summary>
    /// 获得 <see cref="Opc.Da.ISubscription"/> 实例
    /// </summary>
    /// <returns></returns>
    Opc.Da.ISubscription GetSubscription();
}
