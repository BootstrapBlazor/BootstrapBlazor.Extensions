// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Ocr.Services;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// OCR 服务扩展类
/// </summary>
public static class OcrServiceCollectionExtensions
{

    /// <summary>
    /// 增加 OCR 服务扩展类,<para></para>
    /// </summary>
    /// <param name="services"></param>
    /// <param name="key"></param>
    /// <param name="url"></param>
    /// <param name="localFilePath"></param> 
    /// <returns></returns>
    public static IServiceCollection AddOcrExtensions(this IServiceCollection services, string? key = null, string? url = null, string? localFilePath = null)
    {
        if (key != null && url != null) services.AddTransient(sp => new OcrService(key, url, localFilePath));
        else if (localFilePath != null) services.AddTransient(sp => new OcrService(localFilePath));
        else services.AddTransient<OcrService>();
        return services;
    }

}
