// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using SelectPdf;

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
        var converter = new HtmlToPdf();
        var doc = converter.ConvertUrl(url);
        byte[] result = doc.Save();
        doc.Close();
        return Task.FromResult(result);
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Task<Stream> PdfStreamAsync(string url)
    {
        var stream = new MemoryStream();
        var converter = new HtmlToPdf();
        var doc = converter.ConvertUrl(url);
        doc.Save(stream);
        stream.Flush();
        stream.Position = 0;
        return Task.FromResult<Stream>(stream);
    }

    /// <summary>
    /// Export method
    /// </summary>
    /// <param name="html">html raw string</param>
    /// <param name="links"></param>
    /// <param name="scripts"></param>
    public Task<byte[]> PdfDataFromHtmlAsync(string html, IEnumerable<string>? links = null, IEnumerable<string>? scripts = null)
    {
        var converter = new HtmlToPdf();
        var doc = converter.ConvertHtmlString(html);
        byte[] result = doc.Save();
        doc.Close();
        return Task.FromResult(result);
    }

    /// <summary>
    /// Export method
    /// </summary>
    /// <param name="html">html raw string</param>
    /// <param name="links"></param>
    /// <param name="scripts"></param>
    public Task<Stream> PdfStreamFromHtmlAsync(string html, IEnumerable<string>? links = null, IEnumerable<string>? scripts = null)
    {
        var stream = new MemoryStream();
        var converter = new SelectPdf.HtmlToPdf();
        var doc = converter.ConvertHtmlString(html);
        doc.Save(stream);
        stream.Flush();
        stream.Position = 0;
        return Task.FromResult<Stream>(stream);
    }
}
