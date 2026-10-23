// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace Microsoft.AspNetCore.Builder;

/// <summary>
/// BootstrapBlazor server middleware extensions.
/// </summary>
public static class BootstrapBlazorApplicationBuilderExtensions
{
    /// <summary>
    /// Adds the client IP and connection heartbeat handlers.
    /// </summary>
    /// <remarks>
    /// Call after forwarded headers and authentication middleware to record the client IP and authenticated user.
    /// The /connection.axd handler accepts POST requests containing ClientInfo JSON when ConnectionHubOptions.Enable is true.
    /// Client-supplied IP, city, and user name are replaced with server-side values.
    /// </remarks>
    /// <param name="builder"></param>
    /// <returns></returns>
    public static IApplicationBuilder UseBootstrapBlazor(this IApplicationBuilder builder)
    {
        // Map /ip.axd to return the client IP address.
        builder.MapIp();

        // Map /connection.axd to receive client heartbeats.
        builder.MapConnection();

        return builder;
    }
}
