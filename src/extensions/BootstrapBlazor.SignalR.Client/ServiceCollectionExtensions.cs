// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using BootstrapBlazor.Components;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// <para lang="zh">SignalR 客户端服务扩展类</para>
/// <para lang="en">SignalR client service collection extensions</para>
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// <para lang="zh">注册 SignalR 客户端消息分发、心跳上报与连接快照服务，共用一个 Hub 连接</para>
    /// <para lang="en">Register SignalR client dispatch, heartbeat reporting, and connection snapshot services with one shared Hub connection</para>
    /// </summary>
    /// <param name="services"><para lang="zh">服务集合</para><para lang="en">The service collection</para></param>
    /// <param name="hubPath"><para lang="zh">Hub 地址，默认为 bb.hub</para><para lang="en">The Hub path. Defaults to bb.hub</para></param>
    /// <returns><para lang="zh">服务集合</para><para lang="en">The service collection</para></returns>
    /// <remarks>
    /// <para lang="zh">在 WebAssembly 宿主中调用 AddBootstrapBlazor 后调用此方法。离线发送会失败，消息不会排队或重放</para>
    /// <para lang="en">Call this method after AddBootstrapBlazor in the WebAssembly host. Offline sends fail; messages are not queued or replayed</para>
    /// <para lang="zh">服务端需注册并映射对应 Hub，Subscribe 方法需返回 bool，以区分订阅拒绝与可重试的执行失败。连接快照查询需在服务端单独启用并授权客户端访问</para>
    /// <para lang="en">The server must register and map a corresponding Hub whose Subscribe method returns bool to distinguish subscription rejection from retryable execution failures. Connection snapshot queries require explicit server-side opt-in and client authorization</para>
    /// </remarks>
    public static IServiceCollection AddBootstrapBlazorHub(this IServiceCollection services, string hubPath = "bb.hub")
    {
#if NET7_0_OR_GREATER
        ArgumentException.ThrowIfNullOrEmpty(hubPath);
#endif
        services.TryAddSingleton(provider => new SignalRConnection(
            provider.GetRequiredService<Microsoft.AspNetCore.Components.NavigationManager>(),
            provider.GetRequiredService<Microsoft.Extensions.Logging.ILogger<SignalRConnection>>(),
            hubPath));
        services.AddSingleton(typeof(IDispatchService<>), typeof(DefaultDispatchService<>));
        services.AddSingleton<IConnectionService, DefaultConnectionService>();
        return services;
    }
}
