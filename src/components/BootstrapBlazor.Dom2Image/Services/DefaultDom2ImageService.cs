// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.Logging;
using Microsoft.JSInterop;

namespace BootstrapBlazor.Components;

/// <summary>
/// 默认 Html to Image 实现
/// <param name="runtime"></param>
/// <param name="logger"></param>
/// </summary>
class DefaultDom2ImageService(IJSRuntime runtime, ILogger<DefaultDom2ImageService> logger) : IDom2ImageService
{
    private JSModule? _jsModule;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async Task<string?> GetUrlAsync(string selector, Dom2ImageOptions? options = null, CancellationToken token = default)
    {
        string? data = null;
        try
        {
            _jsModule ??= await LoadModule();
            data = await _jsModule.InvokeAsync<string?>("getUrl", token, selector, options);
        }
        catch (OperationCanceledException) { }
        catch (Exception ex)
        {
            logger.LogError(ex, "{GetUrlAsync} throw exception: {ex}", nameof(GetUrlAsync), ex.Format());
        }
        return data;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async Task<Stream?> GetStreamAsync(string selector, Dom2ImageOptions? options = null, CancellationToken token = default)
    {
        Stream? data = null;
        try
        {
            _jsModule ??= await LoadModule();
            var streamReference = await _jsModule.InvokeAsync<IJSStreamReference?>("getStream", selector, options);
            if (streamReference != null)
            {
                data = await streamReference.OpenReadStreamAsync(streamReference.Length, token);
            }
        }
        catch (OperationCanceledException) { }
        catch (Exception ex)
        {
            logger.LogError(ex, "{GetStreamAsync} throw exception: {ex}", nameof(GetStreamAsync), ex.Format());
        }
        return data;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="selector"></param>
    /// <param name="fileName"></param>
    /// <param name="format"></param>
    /// <param name="backgroundColor"></param>
    /// <param name="options"></param>
    /// <returns></returns>
    public async Task DownloadAsync(string selector, string fileName = "capture", string? format = "png", string? backgroundColor = null, Dom2ImageOptions? options = null)
    {
        try
        {
            _jsModule ??= await LoadModule();
            await _jsModule.InvokeAsync<IJSStreamReference?>("downloadAsync", selector, fileName, format, backgroundColor, options);
        }
        catch (OperationCanceledException) { }
        catch (Exception ex)
        {
            logger.LogError(ex, "{DownloadAsync} throw exception: {ex}", nameof(DownloadAsync), ex.Format());
        }
    }

    private Task<JSModule> LoadModule() => runtime.LoadModule("./_content/BootstrapBlazor.Dom2Image/dom2image.js");
}
