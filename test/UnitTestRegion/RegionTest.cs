// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Bunit;

namespace UnitTestRegion;

public class RegionTest : IDisposable
{
    private readonly Bunit.BunitContext _context = new();

    public RegionTest()
    {
        _context.JSInterop.Mode = Bunit.JSRuntimeMode.Loose;
        _context.Services.AddBootstrapBlazor();
        _context.Services.AddBootstrapBlazorRegionService();
    }

    [Fact]
    public async Task Search_Ok()
    {
        var cut = _context.Render<SelectCity>();

        await cut.InvokeAsync(() => cut.Instance.TriggerSearch("深圳"));
        var province = Assert.Single(cut.FindAll(".bb-region-city-title"));
        Assert.Equal("广东省", province.TextContent);

        var pinyinService = _context.Services.GetRequiredService<IPinyinService>();
        var pinyin = pinyinService.GetFirstLetters("深圳市").MaxBy(i => i.Length)!;
        await cut.InvokeAsync(() => cut.Instance.TriggerSearch(pinyin));
        Assert.Contains(cut.FindAll(".bb-region-city-title"), i => i.TextContent == "广东省");
        Assert.Contains("prev", cut.FindAll("li").Single(i => i.TextContent == "深圳市").ClassList);

        await cut.InvokeAsync(() => cut.Instance.TriggerSearch(""));
        Assert.Equal(30, cut.FindAll(".bb-region-city-title").Count);
    }

    public void Dispose()
    {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}
