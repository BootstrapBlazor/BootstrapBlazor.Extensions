﻿// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components.Extensions;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MiniExcelLibs;
using System.Text;

namespace BootstrapBlazor.Components;

/// <summary>
/// 构造函数
/// </summary>
/// <param name="serviceProvider"></param>
class DefaultTableExport(IServiceProvider serviceProvider) : ITableExport
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Task<bool> ExportAsync<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn>? cols = null, string? fileName = null) => InternalExportAsync(items, cols, ExcelType.UNKNOWN, fileName);

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Task<bool> ExportAsync<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn>? cols, TableExportOptions options, string? fileName = null) => InternalExportAsync(items, cols, ExcelType.UNKNOWN, fileName, options);

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Task<bool> ExportExcelAsync<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn>? cols = null, string? fileName = null) => InternalExportAsync(items, cols, ExcelType.XLSX, fileName);

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Task<bool> ExportExcelAsync<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn>? cols, TableExportOptions options, string? fileName = null) => InternalExportAsync(items, cols, ExcelType.XLSX, fileName, options);

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Task<bool> ExportCsvAsync<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn>? cols, string? fileName = null) => InternalExportAsync(items, cols, ExcelType.CSV, fileName);

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Task<bool> ExportCsvAsync<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn>? cols, TableExportOptions options, string? fileName = null) => InternalExportAsync(items, cols, ExcelType.CSV, fileName, options);

    private async Task<bool> InternalExportAsync<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn>? cols, ExcelType excelType, string? fileName = null, TableExportOptions? options = null)
    {
        options ??= serviceProvider.GetRequiredService<IOptions<BootstrapBlazorOptions>>().Value.TableSettings.TableExportOptions;
        cols ??= Utility.GetTableColumns<TModel>();
        var value = new ExportDataReader<TModel>(items, cols, options);

        using var stream = new MemoryStream();
        await MiniExcel.SaveAsAsync(stream, value, excelType: excelType);

        fileName ??= $"ExportData_{DateTime.Now:yyyyMMddHHmmss}.{GetExtension()}";
        stream.Position = 0;
        var downloadService = serviceProvider.GetRequiredService<DownloadService>();
        await downloadService.DownloadFromStreamAsync(fileName, stream);
        return true;

        string GetExtension() => excelType == ExcelType.XLSX ? "xlsx" : "csv";
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Task<bool> ExportPdfAsync<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn>? cols, string? fileName = null)
    {
        var options = serviceProvider.GetRequiredService<IOptions<BootstrapBlazorOptions>>().Value.TableSettings.TableExportOptions;
        return ExportPdfAsync(items, cols, options, fileName, null);
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Task<bool> ExportPdfAsync<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn>? cols, TableExportOptions options, string? fileName = null) => ExportPdfAsync(items, cols, options, fileName, null);

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public async Task<bool> ExportPdfAsync<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn>? cols, TableExportOptions options, string? fileName = null, IEnumerable<string>? links = null)
    {
        var ret = false;
        var logger = serviceProvider.GetRequiredService<ILogger<DefaultTableExport>>();

        try
        {
            var tags = GetDefaultLinks();
            if (links != null)
            {
                tags.AddRange(links);
            }
            var linkString = string.Join("", tags.Select(i => $"<link rel=\"stylesheet\" href=\"{i}\">"));
            var html = await GenerateTableHtmlAsync(items, cols, options);
            var htmlString = $"""
                <!DOCTYPE html>

                <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <meta charset="utf-8" />
                    {linkString}
                </head>
                <body class="p-3">
                    {html}
                </body>
                </html>
                """;
            // 得到 Pdf 文件数据
            var pdfService = serviceProvider.GetRequiredService<IHtml2Pdf>();
            var stream = await pdfService.PdfStreamFromHtmlAsync(htmlString);

            // 下载 Pdf 文件
            var downloadService = serviceProvider.GetRequiredService<DownloadService>();
            fileName ??= $"ExportData_{DateTime.Now:yyyyMMddHHmmss}.pdf";
            await downloadService.DownloadFromStreamAsync(fileName, stream);
            ret = true;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "ExportPdfAsync execute failed");
        }
        return ret;
    }

    private List<string> GetDefaultLinks()
    {
        var navigationManager = serviceProvider.GetRequiredService<NavigationManager>();
        var baseUri = navigationManager.BaseUri;
        return
        [
            $"{baseUri}_content/BootstrapBlazor.FontAwesome/css/font-awesome.min.css",
            $"{baseUri}_content/BootstrapBlazor.MaterialDesign/css/md.min.css",
            $"{baseUri}_content/BootstrapBlazor.BootstrapIcon/css/bootstrap-icons.min.css",
            $"{baseUri}_content/BootstrapBlazor/css/bootstrap.blazor.bundle.min.css",
            $"{baseUri}_content/BootstrapBlazor/css/motronic.min.css"
        ];
    }

    private static async Task<string> GenerateTableHtmlAsync<TModel>(IEnumerable<TModel> items, IEnumerable<ITableColumn>? cols, TableExportOptions options)
    {
        var builder = new StringBuilder();
        cols ??= Utility.GetTableColumns<TModel>();
        builder.AppendLine("<table class=\"table table-bordered table-striped\">");

        // 生成表头
        builder.AppendLine("<thead><tr>");
        foreach (var pi in cols)
        {
            builder.AppendLine($"<th><div class=\"table-cell\">{pi.GetDisplayName()}</div></th>");
        }
        builder.AppendLine("</tr></thead>");

        builder.AppendLine("<tbody>");
        foreach (var item in items)
        {
            if (item != null)
            {
                builder.AppendLine("<tr>");
                foreach (var pi in cols)
                {
                    var val = await pi.FormatValue(Utility.GetPropertyValue(item, pi.GetFieldName()), options);
                    builder.AppendLine($"<td><div class=\"table-cell\">{val}</div></td>");
                }
                builder.AppendLine("</tr>");
            }
        }
        builder.AppendLine("</tbody>");
        builder.AppendLine("</table>");
        return builder.ToString();
    }
}
