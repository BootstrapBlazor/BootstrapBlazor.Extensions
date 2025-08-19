// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using IP2Region.Net.XDB;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace BootstrapBlazor.Components;

/// <summary>
/// 默认 IP2Region 实现
/// </summary>
class IP2RegionService : DefaultIpLocatorProvider
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="options"></param>
    /// <param name="ipRegionOptions"></param>
    /// <param name="logger"></param>
    public IP2RegionService(IOptions<BootstrapBlazorOptions> options, IOptions<IP2RegionOptions> ipRegionOptions, ILogger<IP2RegionService> logger) : base(options)
    {
        _options = options;
        _ipOptions = ipRegionOptions;
        _logger = logger;

        InitSearch();
    }

    private readonly IOptions<BootstrapBlazorOptions> _options;
    private readonly IOptions<IP2RegionOptions> _ipOptions;
    private readonly ILogger<IP2RegionService> _logger;
    private readonly TaskCompletionSource _tcs = new();
    private Searcher? _search;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="ip"></param>
    protected override async Task<string?> LocateByIp(string ip)
    {
        await _tcs.Task;
        string? result = null;
        if (_search != null && _options.Value.WebClientOptions.EnableIpLocator)
        {
            result = _search.Search(ip);
        }
        return result;
    }

    private void InitSearch()
    {
        var xdbPath = _ipOptions.Value.XdbPath ?? Path.Combine(AppContext.BaseDirectory, "ip2region", "ip2region.xdb");
        if (!File.Exists(xdbPath))
        {
            _logger.LogWarning("IP2Region xdb file not found, please check the file path: {dbPath}", xdbPath);
            return;
        }

        try
        {
            _search = new Searcher(CachePolicy.Content, xdbPath);
            _logger.LogInformation("IP2Region xdb file {dbPath} loaded", xdbPath);
            _tcs.TrySetResult();
        }
        catch (Exception ex)
        {
            _tcs.TrySetException(ex);
            _logger.LogError(ex, "IP2Region xdb file path: {dbPath}", xdbPath);
        }
    }
}
