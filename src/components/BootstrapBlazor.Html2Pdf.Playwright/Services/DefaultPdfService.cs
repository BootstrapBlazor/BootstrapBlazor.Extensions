// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Playwright;

namespace BootstrapBlazor.Components;

/// <summary>
/// 默认 Html to Pdf 实现 
/// </summary>
class DefaultPdfService : IHtml2Pdf
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Task<byte[]> PdfDataAsync(string url)
    {
        return GeneratePdfFromUrlAsync(url);
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async Task<Stream> PdfStreamAsync(string url)
    {
        var data = await GeneratePdfFromUrlAsync(url);
        return new MemoryStream(data);
    }

    /// <summary>
    /// Export method
    /// </summary>
    /// <param name="html">html raw string</param>
    /// <param name="links"></param>
    /// <param name="scripts"></param>
    public Task<byte[]> PdfDataFromHtmlAsync(string html, IEnumerable<string>? links = null, IEnumerable<string>? scripts = null)
    {
        return GeneratePdfFromHtmlAsync(html, links, scripts);
    }

    /// <summary>
    /// Export method
    /// </summary>
    /// <param name="html">html raw string</param>
    /// <param name="links"></param>
    /// <param name="scripts"></param>
    public async Task<Stream> PdfStreamFromHtmlAsync(string html, IEnumerable<string>? links = null, IEnumerable<string>? scripts = null)
    {
        var data = await PdfDataFromHtmlAsync(html, links, scripts);
        return new MemoryStream(data);
    }

    private static async Task<byte[]> GeneratePdfFromUrlAsync(string url)
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync(CreateOptions());

        await using var context = await browser.NewContextAsync();
        var page = await context.NewPageAsync();

        await page.GotoAsync(url, new PageGotoOptions { WaitUntil = WaitUntilState.NetworkIdle });
        return await page.PdfAsync(new PagePdfOptions
        {
            Format = "A4",
            Landscape = false,
        });
    }

    private static async Task<byte[]> GeneratePdfFromHtmlAsync(string html, IEnumerable<string>? links = null, IEnumerable<string>? scripts = null)
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync(CreateOptions());

        await using var context = await browser.NewContextAsync();
        var page = await context.NewPageAsync();

        await page.SetContentAsync(html);
        await AddStyleTagAsync(page, links);
        await AddScriptTagAsync(page, scripts);

        return await page.PdfAsync(new PagePdfOptions
        {
            Format = "A4",
            Landscape = false,
        });
    }

    private static BrowserTypeLaunchOptions CreateOptions() => new()
    {
        Headless = true,
        Args = ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"]
    };

    private static async Task AddStyleTagAsync(IPage page, IEnumerable<string>? links = null)
    {
        var styles = new List<string>();

        if (links != null)
        {
            styles.AddRange(links);
        }

        foreach (var link in styles)
        {
            await page.AddStyleTagAsync(new PageAddStyleTagOptions()
            {
                Url = link,
            });
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
            await page.AddScriptTagAsync(new PageAddScriptTagOptions()
            {
                Url = script,
                Type = "script"
            });
        }
    }
}
