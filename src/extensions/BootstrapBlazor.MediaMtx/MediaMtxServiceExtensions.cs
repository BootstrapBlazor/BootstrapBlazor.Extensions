// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using System.Net;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">MediaMTX 摄像头管理的扩展方法。</para>
/// <para lang="en">Extension methods for MediaMTX camera management.</para>
/// <para><version>11.0.0</version></para>
/// </summary>
public static class MediaMtxServiceExtensions
{
    /// <summary>
    /// <para lang="zh">路径已存在时替换其源配置，不存在时登记新路径，并返回播放 URL。替换可能中断该路径的现有播放；路径是否存在由网关判定。</para>
    /// <para lang="en">Replaces the source configuration when the path exists, or registers a new path otherwise, and returns its playback URL. Replacement may interrupt existing playback; path existence is determined by the gateway.</para>
    /// <para><version>11.0.0</version></para>
    /// </summary>
    /// <param name="service"><para lang="zh">摄像头管理服务。</para><para lang="en">The camera management service.</para></param>
    /// <param name="camera"><para lang="zh">目标路径及其完整源配置。</para><para lang="en">The target path and its complete source configuration.</para></param>
    /// <param name="cancellationToken"><para lang="zh">取消令牌。</para><para lang="en">The cancellation token.</para></param>
    /// <returns><para lang="zh">播放 URL。</para><para lang="en">The playback URL.</para></returns>
    /// <exception cref="ArgumentNullException"><para lang="zh"><paramref name="service"/> 或 <paramref name="camera"/> 为 null。</para><para lang="en"><paramref name="service"/> or <paramref name="camera"/> is null.</para></exception>
    /// <exception cref="InvalidOperationException"><para lang="zh">网关未运行。</para><para lang="en">The gateway is not running.</para></exception>
    /// <exception cref="HttpRequestException"><para lang="zh">网关拒绝操作或无法访问。</para><para lang="en">The gateway rejected the operation or is unreachable.</para></exception>
    public static async Task<string> AddOrUpdateAsync(this IMediaMtxService service, MediaMtxCameraOptions camera, CancellationToken cancellationToken = default)
    {
        try
        {
            return await service.UpdateAsync(camera, cancellationToken);
        }
        catch (HttpRequestException exception) when (exception.StatusCode == HttpStatusCode.NotFound)
        {
            // The path does not exist yet; add it below.
        }

        try
        {
            return await service.AddAsync(camera, cancellationToken);
        }
        catch (HttpRequestException exception) when (exception.StatusCode == HttpStatusCode.BadRequest)
        {
            // Another caller may have created the path between the update and add requests.
            return await service.UpdateAsync(camera, cancellationToken);
        }
    }
}
