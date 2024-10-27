// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/



using System.IO;

namespace BootstrapBlazor.Components;

/// <summary>
/// 默认 Html to Pdf 实现 
/// </summary>
class DefaultPdfService : IHtml2Pdf
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async Task<byte[]> PdfDataAsync(string url)
    {
        SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
        SelectPdf.PdfDocument doc = converter.ConvertUrl(url);
        byte[] result = doc.Save();
        doc.Close();
        return result;
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async Task<Stream> PdfStreamAsync(string url)
    {
        MemoryStream stream = new MemoryStream();
        SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
        SelectPdf.PdfDocument doc = converter.ConvertUrl(url);
        doc.Save(stream);
        stream.Flush();
        stream.Position = 0;
        return stream;
    }

    /// <summary>
    /// Export method
    /// </summary>
    /// <param name="html">html raw string</param>
    /// <param name="links"></param>
    /// <param name="scripts"></param>
    public async Task<byte[]> PdfDataFromHtmlAsync(string html, IEnumerable<string>? links = null, IEnumerable<string>? scripts = null)
    {
        SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
        SelectPdf.PdfDocument doc = converter.ConvertHtmlString(html);
        byte[] result = doc.Save();
        doc.Close();
        return result;
    }

    /// <summary>
    /// Export method
    /// </summary>
    /// <param name="html">html raw string</param>
    /// <param name="links"></param>
    /// <param name="scripts"></param>
    public async Task<Stream> PdfStreamFromHtmlAsync(string html, IEnumerable<string>? links = null, IEnumerable<string>? scripts = null)
    {
        MemoryStream stream = new MemoryStream();
        SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
        SelectPdf.PdfDocument doc = converter.ConvertHtmlString(html);
        doc.Save(stream);
        stream.Flush();
        stream.Position = 0;
        return stream;
    }

}
