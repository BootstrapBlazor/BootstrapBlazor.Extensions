// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace BootstrapBlazor.Components;

/// <summary>
/// BootstrapBlazor 服务扩展类
/// </summary>
public static class ServiceCollectionExtension
{
    /// <summary>
    /// 添加百度文字识别服务
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configOptions"></param>
    /// <returns></returns>
    public static IServiceCollection AddBootstrapBlazorAuthenticator(this IServiceCollection services, Action<
    AuthenticatorOptions>? configOptions = null)
    {
        services.TryAddSingleton<ITOTPService, DefaultTOTPServices>();
        services.AddOptionsMonitor<AuthenticatorOptions>();
        services.Configure<AuthenticatorOptions>(options =>
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
