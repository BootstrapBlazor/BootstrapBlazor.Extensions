// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

#if NET8_0_OR_GREATER
using System.Collections.Frozen;
#endif

using BootstrapBlazor.Components;

namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// BootstrapBlazor 服务扩展类
/// </summary>
public static class IconMapperOptionsExtensions
{
    /// <summary>
    /// 添加 Material 图标主题服务
    /// </summary>
    /// <param name="services"></param>
    public static IServiceCollection ConfigureMaterialDesignIconTheme(this IServiceCollection services)
    {
        services.ConfigureIconThemeOptions(options =>
        {
            options.ThemeKey = "mdi";
#if NET8_0_OR_GREATER
            options.TryAddIcons("mdi", DefaultIcon.Icons.ToFrozenDictionary());
#else
            options.Icons["mdi"] = DefaultIcon.Icons;
#endif
        });
        return services;
    }
}
