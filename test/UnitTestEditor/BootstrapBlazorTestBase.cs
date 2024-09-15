// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.Configuration;

namespace UnitTest.Core;

public class BootstrapBlazorTestBase : IDisposable
{
    protected TestContext Context { get; }

    protected ICacheManager Cache { get; }

    public BootstrapBlazorTestBase()
    {
        Context = new TestContext();
        Context.JSInterop.Mode = JSRuntimeMode.Loose;

        ConfigureServices(Context.Services);

        ConfigureConfiguration(Context.Services);

        // 渲染 BootstrapBlazorRoot 组件 激活 ICacheManager 接口
        Cache = Context.Services.GetRequiredService<ICacheManager>();
    }

    protected virtual void ConfigureServices(IServiceCollection services)
    {
        services.AddBootstrapBlazor();
        services.ConfigureJsonLocalizationOptions(op =>
        {
            op.IgnoreLocalizerMissing = false;
        });
    }

    protected virtual void ConfigureConfiguration(IServiceCollection services)
    {
        // 增加单元测试 appsettings.json 配置文件
        var builder = new ConfigurationBuilder();
        //builder.AddJsonFile("appsettings.json");
        //if (cultureName != null)
        //{
        //    builder.AddInMemoryCollection(new Dictionary<string, string?>()
        //    {
        //        ["BootstrapBlazorOptions:DefaultCultureInfo"] = cultureName
        //    });
        //}
        var config = builder.Build();
        services.AddSingleton<IConfiguration>(config);
    }

    public void Dispose()
    {
        Context.Dispose();
        GC.SuppressFinalize(this);
    }
}
