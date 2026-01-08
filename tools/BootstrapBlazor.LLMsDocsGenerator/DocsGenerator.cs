// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

namespace BootstrapBlazorLLMsDocsGenerator;

internal static class DocsGenerator
{
    /// <summary>
    /// Generate all documentation files
    /// </summary>
    public static async Task GenerateAllAsync(string rootFolder, string outputFolder)
    {
        var _sourcePath = Path.Combine(rootFolder, "..", "BootstrapBlazor");
        var _outputPath = Path.Combine(outputFolder, "wwwroot", "llms");
        var _componentsOutputPath = Path.Combine(_outputPath, "components");

        Logger($"Source path: {_sourcePath}");
        Logger($"Output path: {_outputPath}");
        Logger($"Components path: {_componentsOutputPath}");

        if (!Directory.Exists(_sourcePath))
        {
            return;
        }

        Directory.CreateDirectory(_outputPath);
        Directory.CreateDirectory(_componentsOutputPath);

        Logger("Analyzing components...");

        var _analyzer = new ComponentAnalyzer(_sourcePath);
        var components = await _analyzer.AnalyzeAllComponentsAsync();
        Logger($"Found {components.Count} components");

        var indexPath = Path.Combine(_outputPath, "llms.txt");
        var content = MarkdownBuilder.BuildIndexDoc(components);
        await File.WriteAllTextAsync(indexPath, content);
        Logger($"Generated: {indexPath}");

        Logger("Generating individual component documentation...");
        foreach (var component in components)
        {
            content = MarkdownBuilder.BuildComponentDoc(component);
            var fileName = $"{component.Name}.txt";
            var filePath = Path.Combine(_componentsOutputPath, fileName);
            await File.WriteAllTextAsync(filePath, content);
            Logger($"Generated: {filePath}");
        }
        Logger("Documentation generation complete!");
    }

    private static void Logger(string message)
    {
        Console.WriteLine(message);
    }
}
