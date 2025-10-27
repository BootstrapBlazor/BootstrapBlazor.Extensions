// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.Logging;
using PuppeteerSharp;
using System.Net;

namespace BootstrapBlazor.Components;

/// <summary>
/// 默认 Html to Pdf 实现 
/// </summary>
class DefaultPdfService(ILogger<DefaultPdfService> logger) : IHtml2Pdf
{
    /// <summary>
    /// 获得/设置 WebProxy 对象用于网络请求代理
    /// <para>Get or set the WebProxy object for network request proxy</para>
    /// </summary>
    public IWebProxy? WebProxy { get; set; }

    public async Task<byte[]> PdfDataAsync(string url, PdfOptions? options = null)
    {
        try
        {
            await using var browser = await LaunchBrowserAsync();
            await using var page = await browser.NewPageAsync();

            await page.GoToAsync(url);
            return await page.PdfDataAsync(GetOptions(options));
        }
        catch (Exception ex)
        {
            Log(ex, "Error generating PDF from URL: {Url}", url);
            throw;
        }
    }

    public async Task<Stream> PdfStreamAsync(string url, PdfOptions? options = null)
    {
        try
        {
            await using var browser = await LaunchBrowserAsync();
            await using var page = await browser.NewPageAsync();
            await page.GoToAsync(url);

            return await page.PdfStreamAsync(GetOptions(options));
        }
        catch (Exception ex)
        {
            Log(ex, "Error generating PDF from URL: {Url}", url);
            throw;
        }
    }

    public async Task<byte[]> PdfDataFromHtmlAsync(string html, IEnumerable<string>? links = null, IEnumerable<string>? scripts = null, PdfOptions? options = null)
    {
        try
        {
            await using var browser = await LaunchBrowserAsync();
            await using var page = await browser.NewPageAsync();
            await page.SetContentAsync(html);

            await AddStyleTagAsync(page, links);
            await AddScriptTagAsync(page, scripts);

            return await page.PdfDataAsync(GetOptions(options));
        }
        catch (Exception ex)
        {
            Log(ex, "Error generating PDF from HTML content");
            throw;
        }
    }

    public async Task<Stream> PdfStreamFromHtmlAsync(string html, IEnumerable<string>? links = null, IEnumerable<string>? scripts = null, PdfOptions? options = null)
    {
        try
        {
            await using var browser = await LaunchBrowserAsync();
            await using var page = await browser.NewPageAsync();
            await page.SetContentAsync(html);

            await AddStyleTagAsync(page, links);
            await AddScriptTagAsync(page, scripts);

            return await page.PdfStreamAsync(GetOptions(options));
        }
        catch (Exception ex)
        {
            Log(ex, "Error generating PDF from HTML content");
            throw;
        }
    }

    private static PuppeteerSharp.PdfOptions GetOptions(PdfOptions? options)
    {
        return options == null ? new PuppeteerSharp.PdfOptions() : new PuppeteerSharp.PdfOptions
        {
            Landscape = options.Landscape
        };
    }

    private static async Task AddStyleTagAsync(IPage page, IEnumerable<string>? links = null)
    {
        var styles = new List<string>();

        if (links != null)
        {
            styles.AddRange(links);
        }

        foreach (var link in styles)
        {
            await page.AddStyleTagAsync(link);
        }
    }

    private static async Task AddScriptTagAsync(IPage page, IEnumerable<string>? scripts = null)
    {
        var tags = new List<string>();

        if (scripts != null)
        {
            tags.AddRange(scripts);
        }

        foreach (var script in tags)
        {
            await page.AddScriptTagAsync(script);
        }
    }

    private static LaunchOptions CreateOptions() => new() { Headless = true, Args = ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"] };

    private async Task<IBrowser> LaunchBrowserAsync()
    {
        var browserFetcher = new BrowserFetcher
        {
            WebProxy = WebProxy
        };

        Log(null, "Ready to start downloading browser");
        var browser = await browserFetcher.DownloadAsync();
        Log(null, $"Browser downloaded successfully. installed browser {browser.BuildId}");

        var options = CreateOptions();
        Log(null, "Start your browser", "--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security");
        return await Puppeteer.LaunchAsync(options);
    }

    private void Log(Exception? exception, string? message, params object?[] args)
    {
        if (logger.IsEnabled(LogLevel.Information))
        {
            if (args.Length != 0)
            {
                logger.LogInformation(exception, "{Message} | Args: {Args}", message, args);
            }
            else
            {
                logger.LogInformation(exception, "{Message}", message);
            }
        }
    }
}
