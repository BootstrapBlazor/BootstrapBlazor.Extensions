// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Opc.Da;

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// 扩展方法类
/// </summary>
internal static class Extensions
{
    public static Quality ToQuality(this Opc.Da.Quality quality)
    {
        return quality.QualityBits == qualityBits.good
            ? Quality.Good
            : Quality.Bad;
    }

    public static IOpcSubscription ToOpcSubscription(this ISubscription subscription)
    {
        return new OpcSubscription(subscription);
    }

    public static ISubscription CreateSubscription(this Server server, string name, int updateRate = 1000, bool active = true) => server.CreateSubscription(new SubscriptionState { Name = name, Deadband = 0, UpdateRate = updateRate, Active = active });

    public static BrowseFilters ToFilters(this OpcBrowseFilters filtes)
    {
        return new BrowseFilters
        {
            ReturnAllProperties = filtes.ReturnAllProperties,
            ReturnPropertyValues = filtes.ReturnPropertyValues,
            MaxElementsReturned = filtes.MaxElementsReturned,
            ElementNameFilter = filtes.ElementNameFilter
        };
    }
}
