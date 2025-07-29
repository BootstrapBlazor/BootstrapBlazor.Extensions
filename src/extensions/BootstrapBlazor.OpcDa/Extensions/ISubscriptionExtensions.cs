// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// <see cref="Opc.Da.ISubscription"/> 扩展方法类
/// </summary>
public static class ISubscriptionExtensions
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="subscription"></param>
    public static List<OpcItem> Read(this Opc.Da.ISubscription subscription)
    {
        return [];
    }
}
