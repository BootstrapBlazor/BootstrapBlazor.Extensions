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

        Logger($"Source path: {_sourcePath}");
        Logger($"Output path: {_outputPath}");

        if (!Directory.Exists(_sourcePath))
        {
            return;
        }

        Logger("Analyzing components...");

        var _analyzer = new ComponentAnalyzer(_sourcePath);
        var components = await _analyzer.AnalyzeAllComponentsAsync();
        Logger($"Found {components.Count} components");

        // Chinese documentation only: the index at the docs root and one file per
        // component (Chinese text extracted from the bilingual <para> blocks) under
        // the components/ directory.
        Directory.CreateDirectory(_outputPath);
        var indexPath = Path.Combine(_outputPath, "llms.txt");
        await File.WriteAllTextAsync(indexPath, MarkdownBuilder.BuildIndexDoc(components, "zh"));
        Logger($"Generated: {indexPath}");

        var componentsOutputPath = Path.Combine(_outputPath, "components");
        Directory.CreateDirectory(componentsOutputPath);
        foreach (var component in components)
        {
            var content = MarkdownBuilder.BuildComponentDoc(component, "zh");
            var filePath = Path.Combine(componentsOutputPath, $"{component.Name}.txt");
            await File.WriteAllTextAsync(filePath, content);
        }
        Logger($"Generated {components.Count} component files in {componentsOutputPath}");
        Logger("Documentation generation complete!");
    }

    private static void Logger(string message)
    {
        Console.WriteLine(message);
    }
}
