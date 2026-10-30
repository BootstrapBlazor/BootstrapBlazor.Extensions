// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using System.Xml.Linq;

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
            throw new DirectoryNotFoundException($"Core source directory not found: {_sourcePath}");
        }

        Logger("Analyzing components...");

        // The extensions repository sits next to the core repo:
        // <core-repo>/.. / BootstrapBlazor.Extensions / src
        var coreRepoRoot = Path.GetDirectoryName(Path.GetDirectoryName(Path.GetFullPath(_sourcePath)))!;
        var extensionsSrc = Path.Combine(Path.GetDirectoryName(coreRepoRoot)!, "BootstrapBlazor.Extensions", "src");
        var hasExtensions = Directory.Exists(extensionsSrc);

        var extensionProjects = hasExtensions
            ? ReadExtensionProjects(Path.GetDirectoryName(extensionsSrc)!)
            : new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        var _analyzer = new ComponentAnalyzer(_sourcePath, hasExtensions ? extensionsSrc : null,
            extensionProjects);
        var components = await _analyzer.AnalyzeAllComponentsAsync();
        Logger($"Found {components.Count} components");

        // Derive index categories, injected services and extension packages from docs.json.
        var serverPath = Path.Combine(Path.GetDirectoryName(Path.GetFullPath(_sourcePath))!, "BootstrapBlazor.Server");
        var provider = new CategoryProvider(serverPath);
        var categories = provider.Parse();
        Logger($"Found {categories.Count} categories");
        var services = await _analyzer.AnalyzeServicesAsync(provider.ParseServices());
        Logger($"Found {services.Count} services");

        var configuredPackages = provider.ParseExtensions();
        if (!hasExtensions && configuredPackages.Count > 0)
        {
            throw new DirectoryNotFoundException($"Extension sources required by docs.json were not found: {extensionsSrc}");
        }

        var extPackages = configuredPackages.Where(package =>
        {
            if (extensionProjects.ContainsKey(package.Name))
            {
                return true;
            }

            Console.Error.WriteLine($"Skipping extension package not in the solution: {package.Name}");
            return false;
        }).ToList();
        var extComponents = hasExtensions
            ? await _analyzer.AnalyzeTypesByNameAsync(extPackages.SelectMany(p => p.Components).Distinct())
            : new List<ComponentInfo>();
        var extServices = hasExtensions
            ? await _analyzer.AnalyzeTypesByNameAsync(extPackages.SelectMany(p => p.Services).Distinct(),
                resolveRegistration: true, registrationPackages: extPackages)
            : new List<ComponentInfo>();
        Logger($"Found {extComponents.Count} extension components, {extServices.Count} extension services");

        // A service can be both a core built-in (default implementation, registered by
        // AddBootstrapBlazor) and provided by an extension package as an alternative
        // implementation — e.g. IHtml2Pdf. Keep only the extension entry (it carries the
        // registration call) and drop the duplicate from the built-in service list.
        var extServiceNames = extServices.Select(s => s.Name).ToHashSet(StringComparer.Ordinal);
        var removed = services.RemoveAll(s => extServiceNames.Contains(s.Name));
        if (removed > 0)
        {
            Logger($"De-duplicated {removed} service(s) also provided by extension packages");
        }

        // Chinese documentation only: the index at the docs root and one file per
        // component (Chinese text extracted from the bilingual <para> blocks) under
        // the components/ directory.
        Directory.CreateDirectory(_outputPath);
        var indexPath = Path.Combine(_outputPath, "llms.txt");
        await File.WriteAllTextAsync(indexPath, MarkdownBuilder.BuildIndexDoc(components, categories, services, extComponents, extServices, extPackages, "zh"));
        Logger($"Generated: {indexPath}");

        var componentsOutputPath = Path.Combine(_outputPath, "components");
        Directory.CreateDirectory(componentsOutputPath);
        foreach (var component in components)
        {
            var content = MarkdownBuilder.BuildComponentDoc(component, "zh");
            var filePath = Path.Combine(componentsOutputPath, $"{component.Name}.txt");
            await File.WriteAllTextAsync(filePath, content);
        }
        foreach (var service in services)
        {
            var content = MarkdownBuilder.BuildComponentDoc(service, "zh");
            var filePath = Path.Combine(componentsOutputPath, $"{service.Name}.txt");
            await File.WriteAllTextAsync(filePath, content);
        }
        Logger($"Generated {components.Count} component and {services.Count} service files in {componentsOutputPath}");

        // Extension components & services go into a separate extensions/ directory.
        if (extComponents.Count > 0 || extServices.Count > 0)
        {
            var extOutputPath = Path.Combine(_outputPath, "extensions");
            Directory.CreateDirectory(extOutputPath);
            foreach (var item in extComponents.Concat(extServices))
            {
                var content = MarkdownBuilder.BuildComponentDoc(item, "zh");
                var filePath = Path.Combine(extOutputPath, $"{item.Name}.txt");
                await File.WriteAllTextAsync(filePath, content);
            }
            Logger($"Generated {extComponents.Count + extServices.Count} extension files in {extOutputPath}");
        }

        RemoveStaleDocuments(componentsOutputPath, components.Concat(services));
        RemoveStaleDocuments(Path.Combine(_outputPath, "extensions"), extComponents.Concat(extServices));

        Logger("Documentation generation complete!");
    }

    private static Dictionary<string, string> ReadExtensionProjects(string repositoryRoot)
    {
        var solutionPath = Path.Combine(repositoryRoot, "BootstrapBlazor.Extensions.slnx");
        var solution = XDocument.Load(solutionPath);
        var sourceRoot = Path.GetFullPath(Path.Combine(repositoryRoot, "src")) + Path.DirectorySeparatorChar;
        var projects = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        foreach (var project in solution.Descendants("Project"))
        {
            var relativePath = (string?)project.Attribute("Path")
                ?? throw new InvalidDataException($"Project without a path in {solutionPath}");
            var projectPath = Path.GetFullPath(Path.Combine(repositoryRoot,
                relativePath.Replace('/', Path.DirectorySeparatorChar)));
            if (!projectPath.StartsWith(sourceRoot, StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            if (!File.Exists(projectPath))
            {
                throw new FileNotFoundException("Extension solution project not found.", projectPath);
            }

            projects.Add(Path.GetFileNameWithoutExtension(projectPath), Path.GetDirectoryName(projectPath)!);
        }

        return projects;
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
