// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components;
using System.Text.RegularExpressions;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace UniTestIconPark;

public partial class UnitTest
{
    [Fact]
    public void IconPark_Ok()
    {
        var services = new ServiceCollection();
        services.AddBootstrapBlazor();
        var provider = services.BuildServiceProvider();
        var zipService = provider.GetRequiredService<IZipArchiveService>();

        var root = AppContext.BaseDirectory;
        var downloadFile = Path.Combine(root, "IconPark", "download.zip");
        Assert.True(File.Exists(downloadFile));

        var downloadFolder = Path.Combine(root, "download");
        if (Directory.Exists(downloadFile))
        {
            Directory.Delete(downloadFile, true);
        }
        zipService.ExtractToDirectory(downloadFile, downloadFolder, true);

        var folder = new DirectoryInfo(downloadFolder);

        // 处理 List 文件
        var iconListFile = Path.Combine(root, "../../../IconPark/IconParkList.razor");
        if (File.Exists(iconListFile))
        {
            File.Delete(iconListFile);
        }

        // 处理 svg 文件
        var svgFile = Path.Combine(root, "../../../IconPark/icon-park.svg");
        if (File.Exists(svgFile))
        {
            File.Delete(svgFile);
        }
        using var listWriter = new StreamWriter(File.OpenWrite(iconListFile));
        using var writer = new StreamWriter(File.OpenWrite(svgFile));
        writer.WriteLine("<svg xmlns=\"http://www.w3.org/2000/svg\">");
        foreach (var icon in folder.EnumerateFiles())
        {
            var id = Path.GetFileNameWithoutExtension(icon.Name);
            using var reader = new StreamReader(icon.OpenRead());
            var data = reader.ReadToEnd();
            reader.Close();

            data = data.Replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "");
            data = data.Replace("<svg ", "<symbol ");
            data = data.Replace("</svg>", "</symbol>");
            data = data.Replace("width=\"24\" height=\"24\"", $"id=\"{id}\"");
            data = data.Replace(" xmlns=\"http://www.w3.org/2000/svg\"", "");
            data = data.Replace("\"#333\"", "\"var(--bb-bd-icon-color)\"");
            writer.WriteLine(data);

            listWriter.WriteLine($"<ByteDanceIcon Name=\"{id}\"></ByteDanceIcon>");
        }
        writer.WriteLine("</svg>");
        writer.Close();
    }

    [Theory]
    [InlineData("filled")]
    [InlineData("outlined")]
    [InlineData("twotone")]
    public void AntDesignIcon_Ok(string category)
    {
        var services = new ServiceCollection();
        services.AddBootstrapBlazor();
        var provider = services.BuildServiceProvider();
        var zipService = provider.GetRequiredService<IZipArchiveService>();

        var root = AppContext.BaseDirectory;
        var downloadFile = Path.Combine(root, "AntDesign", $"{category}.zip");
        Assert.True(File.Exists(downloadFile));

        var downloadFolder = Path.Combine(root, category);
        if (Directory.Exists(downloadFile))
        {
            Directory.Delete(downloadFile, true);
        }
        zipService.ExtractToDirectory(downloadFile, downloadFolder, true);

        var folder = new DirectoryInfo(downloadFolder);

        // 处理 List 文件
        var iconListFile = Path.Combine(root, $"../../../AntDesign/AntDesignIconList_{category}.razor");
        if (File.Exists(iconListFile))
        {
            File.Delete(iconListFile);
        }

        // 处理 svg 文件
        var svgFile = Path.Combine(root, $"../../../AntDesign/{category}.svg");
        if (File.Exists(svgFile))
        {
            File.Delete(svgFile);
        }
        using var listWriter = new StreamWriter(File.OpenWrite(iconListFile));
        using var writer = new StreamWriter(File.OpenWrite(svgFile));
        writer.WriteLine("<svg xmlns=\"http://www.w3.org/2000/svg\">");
        foreach (var icon in folder.EnumerateFiles())
        {
            var id = Path.GetFileNameWithoutExtension(icon.Name);
            using var reader = new StreamReader(icon.OpenRead());
            var data = reader.ReadToEnd();
            reader.Close();

            // find <svg
            var index = data.IndexOf("<svg ");
            if (index > -1)
            {
                data = data[index..];
            }
            index = data.IndexOf(">");
            if (index > -1)
            {
                data = data[(index + 1)..];
            }
            var target = data.Replace("</svg>", "").Trim();
            target = $"    <symbol viewBox=\"0 0 1024 1024\" id=\"{id}\">{target}</symbol>";
            writer.WriteLine(target);

            listWriter.WriteLine($"<AntDesignIcon Name=\"{id}\"></AntDesignIcon>");
        }
        writer.WriteLine("</svg>");
        writer.Close();
    }

    [Fact]
    public void ElementIcon_Ok()
    {
        var category = "element";
        var services = new ServiceCollection();
        services.AddBootstrapBlazor();
        var provider = services.BuildServiceProvider();
        var zipService = provider.GetRequiredService<IZipArchiveService>();

        var root = AppContext.BaseDirectory;
        var downloadFile = Path.Combine(root, "Element", $"{category}.zip");
        Assert.True(File.Exists(downloadFile));

        var downloadFolder = Path.Combine(root, category);
        if (Directory.Exists(downloadFile))
        {
            Directory.Delete(downloadFile, true);
        }
        zipService.ExtractToDirectory(downloadFile, downloadFolder, true);

        var folder = new DirectoryInfo(downloadFolder);

        // 处理 List 文件
        var iconListFile = Path.Combine(root, $"../../../Element/ElementIconList.razor");
        if (File.Exists(iconListFile))
        {
            File.Delete(iconListFile);
        }

        // 处理 svg 文件
        var svgFile = Path.Combine(root, $"../../../Element/{category}.svg");
        if (File.Exists(svgFile))
        {
            File.Delete(svgFile);
        }
        using var listWriter = new StreamWriter(File.OpenWrite(iconListFile));
        using var writer = new StreamWriter(File.OpenWrite(svgFile));
        writer.WriteLine("<svg xmlns=\"http://www.w3.org/2000/svg\">");
        foreach (var icon in folder.EnumerateFiles())
        {
            var id = Path.GetFileNameWithoutExtension(icon.Name);
            using var reader = new StreamReader(icon.OpenRead());
            var data = reader.ReadToEnd();
            reader.Close();

            // find <svg
            var index = data.IndexOf("<svg ");
            if (index > -1)
            {
                data = data[index..];
            }
            index = data.IndexOf(">");
            if (index > -1)
            {
                data = data[(index + 1)..];
            }
            var target = data.Replace("</svg>", "").Trim();
            target = $"    <symbol viewBox=\"0 0 1024 1024\" id=\"{id}\">{target}</symbol>";
            writer.WriteLine(target);

            listWriter.WriteLine($"<a><ElementIcon Name=\"{id}\"></ElementIcon><span>{id}</span></a>");
        }
        writer.WriteLine("</svg>");
        writer.Close();
    }

    [GeneratedRegex("svg\">(.*)</svg>")]
    private static partial Regex SvgRegex();

    [Fact]
    public void OctIcon_Ok()
    {
        var services = new ServiceCollection();
        services.AddBootstrapBlazor();
        var provider = services.BuildServiceProvider();
        var zipService = provider.GetRequiredService<IZipArchiveService>();

        var root = AppContext.BaseDirectory;
        var downloadFile = Path.Combine(root, "Octicon", "octicons.zip");
        Assert.True(File.Exists(downloadFile));

        var downloadFolder = Path.Combine(root, "octicons");
        if (Directory.Exists(downloadFolder))
        {
            Directory.Delete(downloadFolder, true);
        }
        zipService.ExtractToDirectory(downloadFile, downloadFolder, true);

        var folder = new DirectoryInfo(downloadFolder);

        // 处理 List 文件
        var iconListFile = Path.Combine(root, $"../../../Octicon/OcticonIconList.razor");
        if (File.Exists(iconListFile))
        {
            File.Delete(iconListFile);
        }

        // 处理 svg 文件
        var svgFile = Path.Combine(root, $"../../../Octicon/octicon.svg");
        if (File.Exists(svgFile))
        {
            File.Delete(svgFile);
        }
        using var listWriter = new StreamWriter(File.OpenWrite(iconListFile));
        using var writer = new StreamWriter(File.OpenWrite(svgFile));
        writer.WriteLine("<svg xmlns=\"http://www.w3.org/2000/svg\">");
        foreach (var icon in folder.EnumerateFiles())
        {
            if (!icon.Name.EndsWith("-16.svg"))
            {
                continue;
            }
            var id = Path.GetFileNameWithoutExtension(icon.Name);
            using var reader = new StreamReader(icon.OpenRead());
            var data = reader.ReadToEnd();
            reader.Close();

            // find viewBox
            var viewBox = FindViewBox(data);

            // find <svg
            var index = data.IndexOf("<svg ");
            if (index > -1)
            {
                data = data[index..];
            }
            index = data.IndexOf('>');
            if (index > -1)
            {
                data = data[(index + 1)..];
            }
            var target = data.Replace("</svg>", "").Trim();
            target = $"    <symbol viewBox=\"{viewBox}\" id=\"{id}\">{target}</symbol>";
            writer.WriteLine(target);

            listWriter.WriteLine($"<OctIcon Name=\"{id}\"></OctIcon>");
        }
        writer.WriteLine("</svg>");
        writer.Close();
    }

    [Fact]
    public void UniverIcon_Ok()
    {
        var services = new ServiceCollection();
        services.AddBootstrapBlazor();
        var provider = services.BuildServiceProvider();
        var zipService = provider.GetRequiredService<IZipArchiveService>();

        var root = AppContext.BaseDirectory;
        var downloadFile = Path.Combine(root, "Univer", "univer.zip");
        Assert.True(File.Exists(downloadFile));

        var downloadFolder = Path.Combine(root, "univer-icons");
        if (Directory.Exists(downloadFolder))
        {
            Directory.Delete(downloadFolder, true);
        }
        zipService.ExtractToDirectory(downloadFile, downloadFolder, true);

        var folder = new DirectoryInfo(downloadFolder);

        // 处理 List 文件
        var iconListFile = Path.Combine(root, $"../../../Univer/UniverIconList.razor");
        if (File.Exists(iconListFile))
        {
            File.Delete(iconListFile);
        }

        // 处理 svg 文件
        var svgFile = Path.Combine(root, $"../../../Univer/univer.svg");
        if (File.Exists(svgFile))
        {
            File.Delete(svgFile);
        }
        using var listWriter = new StreamWriter(File.OpenWrite(iconListFile));
        using var writer = new StreamWriter(File.OpenWrite(svgFile));
        writer.WriteLine("<svg xmlns=\"http://www.w3.org/2000/svg\">");
        foreach (var icon in folder.EnumerateFiles("*.svg", SearchOption.AllDirectories))
        {
            var id = Path.GetFileNameWithoutExtension(icon.Name);
            using var reader = new StreamReader(icon.OpenRead());
            var data = reader.ReadToEnd();
            reader.Close();

            // find viewBox
            var viewBox = FindViewBox(data);

            // find <svg
            var index = data.IndexOf("<svg ");
            if (index > -1)
            {
                data = data[index..];
            }
            index = data.IndexOf('>');
            if (index > -1)
            {
                data = data[(index + 1)..];
            }

            var target = data.Replace("</svg>", "").Trim();
            target = target.Replace("fill=\"black\"", "fill=\"currentColor\"");
            target = target.Replace("stroke=\"black\"", "stroke=\"currentColor\"");
            target = $"    <symbol viewBox=\"{viewBox}\" id=\"{id}\">{target}</symbol>";
            writer.WriteLine(target);

            listWriter.WriteLine($"<UniverIcon Name=\"{id}\"></UniverIcon>");
        }
        writer.WriteLine("</svg>");
        writer.Close();
    }

    private static string FindViewBox(string svg)
    {
        var index = svg.IndexOf(" viewBox=\"");
        if (index > -1)
        {
            index += 10;
            svg = svg[index..];
        }
        index = svg.IndexOf('\"');
        if (index > -1)
        {
            svg = svg[..index];
        }
        return svg;
    }
}
