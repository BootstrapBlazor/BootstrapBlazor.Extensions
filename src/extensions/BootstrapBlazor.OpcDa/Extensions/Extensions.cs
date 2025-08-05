// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// 扩展方法类
/// </summary>
internal static class Extensions
{
    public static Quality ToQuality(this Opc.Da.Quality quality)
    {
        return quality.QualityBits == Opc.Da.qualityBits.good
            ? Quality.Good
            : Quality.Bad;
    }

    public static ISubscription ToOpcSubscription(this Opc.Da.ISubscription subscription)
    {
        return new OpcSubscription(subscription);
    }
}
