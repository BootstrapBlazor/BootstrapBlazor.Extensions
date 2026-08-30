// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.DependencyInjection;

namespace BootstrapBlazor.Components;

/// <summary>
/// BootstrapBlazor service extensions
/// </summary>
public static class ServiceCollectionExtension
{
    /// <summary>
    /// Inject <see cref="ITotpService"/> service extension method.
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configOptions"></param>
    /// <returns></returns>
    public static IServiceCollection AddBootstrapBlazorTotpService(this IServiceCollection services, Action<
    OtpOptions>? configOptions = null)
    {
        services.AddSingleton<ITotpService, DefaultTotpService>();
        services.Configure<OtpOptions>(options =>
        {
            configOptions?.Invoke(options);

            options.AccountName ??= "BootstrapBlazor";
            options.UserName ??= "Simulator";
            options.IssuerName ??= options.AccountName;
            options.SecretKey ??= "OMM2LVLFX6QJHMYI";
        });
        return services;
    }
}
