// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0.

using BootstrapBlazor.Components;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// <para lang="zh">服务端 SignalR 服务注册和端点映射扩展</para>
/// <para lang="en">Server-side SignalR service registration and endpoint mapping extensions.</para>
/// <para><version>11.0.0</version></para>
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// <para lang="zh">注册实时 SignalR 分发服务</para>
    /// <para lang="en">Registers the live SignalR dispatch service.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    /// <remarks>
    /// <para lang="zh">应在 AddBootstrapBlazor 后调用，未配置的类型仅在服务端本地分发。单服务解析使用此注册，枚举分发服务时仍包含默认实现。</para>
    /// <para lang="en">Call after AddBootstrapBlazor. Unlisted types remain server-local. Single-service resolution uses this registration; enumerating dispatch services also includes the default implementation.</para>
    /// <para lang="zh">消息不持久化，重连后不补发。同一 Hub 支持连接心跳，快照查询需显式启用。</para>
    /// <para lang="en">Messages are not persisted or replayed after reconnecting. The same Hub accepts connection heartbeats; snapshot queries require explicit opt-in.</para>
    /// </remarks>
    /// <param name="services"></param>
    /// <param name="configure"></param>
    public static IServiceCollection AddBootstrapBlazorHub(this IServiceCollection services, Action<BootstrapBlazorHubOptions> configure)
    {
        var options = new BootstrapBlazorHubOptions();
        configure(options);
        services.AddSingleton(options);
        services.AddSignalR();
        services.AddSingleton(typeof(IDispatchService<>), typeof(DefaultDispatchService<>));
        return services;
    }

    /// <summary>
    /// <para lang="zh">映射共享 Hub 端点，宿主可链式调用 RequireAuthorization 配置授权</para>
    /// <para lang="en">Maps the shared Hub endpoint. Hosts may chain RequireAuthorization to protect it.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    /// <param name="endpoints"></param>
    /// <param name="pattern"></param>
    public static HubEndpointConventionBuilder MapBootstrapBlazorHub(this IEndpointRouteBuilder endpoints, string pattern = "/bb.hub")
        => endpoints.MapHub<BootstrapBlazorHub>(pattern);
}
