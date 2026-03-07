// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">聚合搜索引擎 IP 定位器</para>
/// <para lang="en">JuHe IP locator provider</para>
/// </summary>
/// <param name="httpClientFactory"></param>
/// <param name="options"></param>
/// <param name="juHeIpLocatorOptions"></param>
/// <param name="logger"></param>
class JuHeIpLocatorProvider(IHttpClientFactory httpClientFactory,
    IOptions<BootstrapBlazorOptions> options,
    IOptions<JuHeIpLocatorOptions> juHeIpLocatorOptions,
    ILogger<JuHeIpLocatorProvider> logger) : DefaultIpLocatorProvider(options)
{
    private HttpClient? _client;

    private JuHeIpLocatorOptions? _options;

    private const string Url = "http://apis.juhe.cn/ip/ipNewV3";

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="ip"></param>
    protected override async Task<string?> LocateByIp(string ip)
    {
        string? ret = null;
        _options ??= GetOptions();
        var url = $"{_options.Url}?ip={ip}&key={_options.Key}";
        try
        {
            _client ??= httpClientFactory.CreateClient();
            using var token = new CancellationTokenSource(_options.Timeout);
            ret = await Fetch(url, _client, token.Token);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Url: {url}", url);
        }
        return ret;
    }

    private JuHeIpLocatorOptions GetOptions()
    {
        var options = juHeIpLocatorOptions.Value;

        if (string.IsNullOrEmpty(options.Key))
        {
            LastError = $"{nameof(JuHeIpLocatorOptions)}:Key not value in appsettings configuration file. 未配置 {nameof(JuHeIpLocatorOptions)}:Key 请在 appsettings.json 中配置 {nameof(JuHeIpLocatorOptions)}:Key";
            Log(LastError);

        }
        if (string.IsNullOrEmpty(options.Url))
        {
            options.Url = Url;
        }
        return options;
    }

    /// <summary>
    /// <para lang="zh">请求获得地理位置接口方法</para>
    /// <para lang="en">Fetches the geolocation data</para>
    /// </summary>
    /// <param name="url"></param>
    /// <param name="client"></param>
    /// <param name="token"></param>
    protected virtual async Task<string?> Fetch(string url, HttpClient client, CancellationToken token)
    {
        var result = await client.GetFromJsonAsync<JuHeLocationResult>(url, token);
        if (result != null && result.ErrorCode != 0)
        {
            LastError = $"ErrorCode: {result.ErrorCode} Reason: {result.Reason}";
            Log(LastError);
        }
        return result?.ToString();
    }

    private void Log(string? message)
    {
        if (logger.IsEnabled(LogLevel.Error))
        {
            logger.LogError("{message}", message);
        }
    }
}
