// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

namespace BootstrapBlazorLLMsDocsGenerator;

internal static class DocsGenerator
{
    /// <summary>
    /// Generate all documentation files for one project.
    /// </summary>
    public static async Task GenerateAllAsync(string outputFolder, string? project = null)
    {
        var sourcePath = GetSourcePath(project);
        var projectFiles = Directory.GetFiles(sourcePath, "*.csproj");
        if (projectFiles.Length != 1)
        {
            throw new InvalidDataException($"Expected one project in {sourcePath}, found {projectFiles.Length}.");
        }
        var packageName = Path.GetFileNameWithoutExtension(projectFiles[0]);

        Logger($"Source path: {sourcePath}");
        Logger($"Output path: {outputFolder}");
        Logger("Analyzing components...");

        var projects = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) { [packageName] = sourcePath };
        var analyzer = new ComponentAnalyzer(sourcePath, null, projects, includeSamples: false, singleProject: true);
        var components = await analyzer.AnalyzeAllComponentsAsync();
        Logger($"Found {components.Count} components");
        var categories = GetProjectCategories(components);
        var services = await analyzer.AnalyzeProjectServicesAsync(components);
        var registrationCount = services.Count(service => service.IsServiceRegistrationExtension);
        Logger($"Found {services.Count - registrationCount} services");
        Logger($"Found {registrationCount} service registration extensions");
        if (components.Count == 0 && services.Count == 0)
        {
            throw new InvalidDataException("No components, services or service registration extensions found in the project.");
        }

        var duplicateComponent = components.GroupBy(component => component.Name, StringComparer.OrdinalIgnoreCase)
            .FirstOrDefault(group => group.Skip(1).Any());
        if (duplicateComponent != null)
        {
            throw new InvalidDataException($"Component names collide: {duplicateComponent.Key}");
        }

        var componentNames = components.Select(component => component.Name).ToHashSet(StringComparer.OrdinalIgnoreCase);
        var duplicate = services.FirstOrDefault(service => componentNames.Contains(service.Name));
        if (duplicate != null)
        {
            throw new InvalidDataException($"Component and service names collide: {duplicate.Name}");
        }

        Directory.CreateDirectory(outputFolder);
        var indexPath = Path.Combine(outputFolder, "llms.txt");
        await File.WriteAllTextAsync(indexPath, MarkdownBuilder.BuildIndexDoc(components, categories, services, "zh", packageName));
        Logger($"Generated: {indexPath}");

        var componentsOutputPath = Path.Combine(outputFolder, "components");
        Directory.CreateDirectory(componentsOutputPath);
        foreach (var type in components.Concat(services))
        {
            var content = MarkdownBuilder.BuildComponentDoc(type, "zh");
            var filePath = Path.Combine(componentsOutputPath, $"{type.Name}.txt");
            await File.WriteAllTextAsync(filePath, content);
        }
        Logger($"Generated {components.Count} component, {services.Count - registrationCount} service and {registrationCount} registration extension files in {componentsOutputPath}");
        RemoveStaleDocuments(componentsOutputPath, components.Concat(services));

        Logger("Documentation generation complete!");
    }

    private static string GetSourcePath(string? project)
    {
        if (project == null)
        {
            return Directory.GetCurrentDirectory();
        }

        var path = Path.GetFullPath(project);
        if (File.Exists(path) && path.EndsWith(".csproj", StringComparison.OrdinalIgnoreCase))
        {
            return Path.GetDirectoryName(path)!;
        }
        if (Directory.Exists(path))
        {
            return path;
        }
        throw new FileNotFoundException($"Project not found: {path}");
    }

    private static List<ComponentCategory> GetProjectCategories(IEnumerable<ComponentInfo> components)
    {
        return components
            .Select(component => (Component: component, Parts: component.SourcePath.Split('/')))
            .Where(item => Array.IndexOf(item.Parts, "Components") is var index && index >= 0 && index + 2 < item.Parts.Length)
            .GroupBy(item => item.Parts[Array.IndexOf(item.Parts, "Components") + 1], StringComparer.Ordinal)
            .OrderBy(group => group.Key, StringComparer.Ordinal)
            .Select(group => new ComponentCategory
            {
                Title = group.Key,
                ComponentNames = group.Select(item => item.Component.Name).OrderBy(name => name, StringComparer.Ordinal).ToList()
            })
            .ToList();
    }

    private static void RemoveStaleDocuments(string directory, IEnumerable<ComponentInfo> types)
    {
        if (!Directory.Exists(directory))
        {
            return;
        }

        var expected = types.Select(type => $"{type.Name}.txt").ToHashSet(StringComparer.OrdinalIgnoreCase);
        foreach (var file in Directory.EnumerateFiles(directory, "*.txt"))
        {
            if (!expected.Contains(Path.GetFileName(file))
                && File.ReadAllText(file).Contains("<!-- Generated:", StringComparison.Ordinal))
            {
                File.Delete(file);
                Logger($"Removed stale documentation: {file}");
            }
        }
    }

    private static void Logger(string message)
    {
        Console.WriteLine(message);
    }
}
