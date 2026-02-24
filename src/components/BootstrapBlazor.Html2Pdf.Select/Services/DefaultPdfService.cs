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
    public Task<byte[]> PdfDataAsync(string url, PdfOptions? options = null)
    {
        var converter = new HtmlToPdf();
        var doc = converter.ConvertUrl(url);
        byte[] result = doc.Save();
        doc.Close();
        return Task.FromResult(result);
    }

    public Task<Stream> PdfStreamAsync(string url, PdfOptions? options = null)
    {
        var stream = new MemoryStream();
        var converter = new HtmlToPdf();
        var doc = converter.ConvertUrl(url);
        doc.Save(stream);
        stream.Flush();
        stream.Position = 0;
        return Task.FromResult<Stream>(stream);
    }

    public Task<byte[]> PdfDataFromHtmlAsync(string html, IEnumerable<string>? links = null, IEnumerable<string>? scripts = null, PdfOptions? options = null)
    {
        var converter = new HtmlToPdf();
        var doc = converter.ConvertHtmlString(html);
        byte[] result = doc.Save();
        doc.Close();
        return Task.FromResult(result);
    }

    public Task<Stream> PdfStreamFromHtmlAsync(string html, IEnumerable<string>? links = null, IEnumerable<string>? scripts = null, PdfOptions? options = null)
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
