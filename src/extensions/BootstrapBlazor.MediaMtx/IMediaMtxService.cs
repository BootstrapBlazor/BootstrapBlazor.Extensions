// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">服务端动态摄像头管理。调用方负责身份认证、权限检查和 RTSP 目标地址的访问策略。</para>
/// <para lang="en">Server-side dynamic camera management. Callers must enforce authentication, authorization and RTSP destination access policies.</para>
/// <para lang="zh">网关未运行时，管理方法抛出 <see cref="InvalidOperationException"/>。</para>
/// <para lang="en">Management methods throw <see cref="InvalidOperationException"/> when the gateway is not running.</para>
/// <para><version>11.0.0</version></para>
/// </summary>
public interface IMediaMtxService
{
    /// <summary>
    /// <para lang="zh">由宿主设置已就绪网关的 Control API 密码；传入 null 表示网关已停止。</para>
    /// <para lang="en">Sets the Control API password for the ready gateway; null indicates that the gateway has stopped. Intended for use by the host.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    /// <param name="apiPassword"><para lang="zh">网关密码，或表示停止的 null。</para><para lang="en">The gateway password, or null when stopped.</para></param>
    /// <returns><para lang="zh">状态更新任务。</para><para lang="en">The state update task.</para></returns>
    Task SetGatewayStateAsync(string? apiPassword);

    /// <summary>
    /// <para lang="zh">登记新路径或更新已有路径的摄像头源配置，返回播放 URL。默认使用同机回环地址，可通过 WebRtcPublicUrl 配置反向代理地址。更新可能中断现有播放；成功不代表源已连通。</para>
    /// <para lang="en">Registers a new path or updates the camera source configuration for an existing path and returns its playback URL. Uses the loopback address by default or WebRtcPublicUrl for a reverse proxy. Updates may interrupt existing playback; success does not verify source connectivity.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    /// <param name="camera"><para lang="zh">由管理 UI 提交的摄像头配置。</para><para lang="en">Camera configuration submitted by the management UI.</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌。</para><para lang="en">The cancellation token.</para></param>
    /// <returns><para lang="zh">播放 URL。</para><para lang="en">The playback URL.</para></returns>
    Task<string> AddOrUpdateAsync(MediaMtxCameraOptions camera, CancellationToken cancellationToken = default);

    /// <summary>
    /// <para lang="zh">显式删除摄像头路径，影响所有观看者；路径不存在时报错。</para>
    /// <para lang="en">Explicitly deletes a camera path for all viewers. Missing paths fail.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    /// <param name="path"><para lang="zh">要删除的摄像头路径。</para><para lang="en">The camera path to delete.</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌。</para><para lang="en">The cancellation token.</para></param>
    /// <returns><para lang="zh">删除操作任务。</para><para lang="en">The deletion task.</para></returns>
    Task RemoveAsync(string path, CancellationToken cancellationToken = default);
}
