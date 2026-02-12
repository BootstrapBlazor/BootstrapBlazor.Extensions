// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using IP2Region.Net.Abstractions;
using IP2Region.Net.XDB;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using System.Net;

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
    }

    private readonly IOptions<BootstrapBlazorOptions> _options;
    private readonly IOptions<IP2RegionOptions> _ipOptions;
    private readonly ILogger<IP2RegionService> _logger;
    private readonly TaskCompletionSource _tcs = new();
    private ConcurrentDictionary<string, ISearcher?> _searchCache = [];

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="ip"></param>
    protected override Task<string?> LocateByIp(string ip)
    {
        string? result = null;
        if (_options.Value.WebClientOptions.EnableIpLocator && IPAddress.TryParse(ip, out var address))
        {
            ISearcher? searcher = null;
            if (address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
            {
                searcher = CreateSearcher("ip2region_v4.xdb");
            }
            else if (address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetworkV6)
            {
                searcher = CreateSearcher("ip2region_v6.xdb");
            }
            result = searcher?.Search(ip);
        }
        return Task.FromResult(result);
    }

    private ISearcher? CreateSearcher(string xdbFile) => _searchCache.GetOrAdd(xdbFile, key =>
    {
        var xdbPath = _ipOptions.Value.XdbPath ?? Path.Combine(AppContext.BaseDirectory, "ip2region", xdbFile);
        if (!File.Exists(xdbPath))
        {
            _logger.LogWarning("IP2Region xdb file not found, please check the file path: {dbPath}", xdbPath);
            return null;
        }

        ISearcher? searcher = null;
        try
        {
            var cachePolicy = _ipOptions.Value.CachePolicy;
            searcher = new Searcher(cachePolicy, xdbPath);

            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("IP2Region xdb file {dbPath} loaded", xdbPath);
            }
            _tcs.TrySetResult();
        }
        catch (Exception ex)
        {
            _tcs.TrySetException(ex);
            _logger.LogError(ex, "IP2Region xdb file path: {dbPath}", xdbPath);
        }

        return searcher;
    });
}
