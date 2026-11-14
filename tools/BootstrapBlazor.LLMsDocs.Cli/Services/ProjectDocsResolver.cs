using System.Text.Json;

namespace BootstrapBlazor.LLMsDocs.Cli.Services;

internal sealed record PackageDocs(string Package, string Version, string Directory, bool IsExtension);

internal static class ProjectDocsResolver
{
    public static IReadOnlyList<PackageDocs> Resolve(string? project, string? framework)
    {
        string? projectPath;
        try
        {
            projectPath = FindProject(project);
        }
        catch (Exception ex) when (string.IsNullOrWhiteSpace(project) && (ex is IOException or UnauthorizedAccessException))
        {
            Console.Error.WriteLine($"Cannot discover projects: {ex.Message}; using the configured online source.");
            return [];
        }
        if (projectPath is null)
        {
            if (!string.IsNullOrWhiteSpace(framework))
            {
                throw new InvalidOperationException("No project found; specify --project when using --framework.");
            }
            return [];
        }

        var assetsPath = Path.Combine(Path.GetDirectoryName(projectPath)!, "obj", "project.assets.json");
        if (!File.Exists(assetsPath))
        {
            Console.Error.WriteLine($"Project is not restored: {projectPath}; using the configured online source.");
            return [];
        }

        try
        {
            return ReadPackages(assetsPath, framework);
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException or JsonException)
        {
            Console.Error.WriteLine($"Cannot read {assetsPath}: {ex.Message}; using the configured online source.");
            return [];
        }
    }

    private static IReadOnlyList<PackageDocs> ReadPackages(string assetsPath, string? framework)
    {
        using var assets = JsonDocument.Parse(File.ReadAllText(assetsPath));
        var root = assets.RootElement;
        if (root.ValueKind != JsonValueKind.Object ||
            !root.TryGetProperty("targets", out var targets) || targets.ValueKind != JsonValueKind.Object ||
            !root.TryGetProperty("libraries", out var libraries) || libraries.ValueKind != JsonValueKind.Object ||
            !root.TryGetProperty("packageFolders", out var packageFolders) || packageFolders.ValueKind != JsonValueKind.Object)
        {
            throw new JsonException("Missing targets, libraries or packageFolders.");
        }
        var target = SelectTarget(targets, framework);
        if (target.Value.ValueKind != JsonValueKind.Object)
        {
            throw new JsonException("Invalid target.");
        }
        var folders = packageFolders.EnumerateObject().Select(p => p.Name).ToArray();
        var packages = new List<PackageDocs>();

        foreach (var item in target.Value.EnumerateObject())
        {
            var separator = item.Name.LastIndexOf('/');
            if (separator <= 0)
            {
                continue;
            }

            var name = item.Name[..separator];
            var core = name.Equals("BootstrapBlazor", StringComparison.OrdinalIgnoreCase);
            if (!core && !name.StartsWith("BootstrapBlazor.", StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            if (!libraries.TryGetProperty(item.Name, out var library) || library.ValueKind != JsonValueKind.Object ||
                !library.TryGetProperty("type", out var type) || type.ValueKind != JsonValueKind.String || type.GetString() != "package" ||
                !library.TryGetProperty("path", out var path) || path.ValueKind != JsonValueKind.String)
            {
                continue;
            }

            var packagePath = path.GetString();
            if (string.IsNullOrEmpty(packagePath))
            {
                continue;
            }

            foreach (var folder in folders)
            {
                var packageRoot = Path.Combine(folder, packagePath.Replace('/', Path.DirectorySeparatorChar));
                if (!Directory.Exists(packageRoot))
                {
                    continue;
                }
                var candidates = core
                    ? new[] { Path.Combine(packageRoot, "skills", "bb-api", "references"), Path.Combine(packageRoot, "skills", "bootstrapblazor", "references") }
                    : [Path.Combine(packageRoot, "docs", "llms")];
                var docs = candidates.FirstOrDefault(p => File.Exists(Path.Combine(p, "llms.txt"))
                    && (!core || File.Exists(Path.Combine(Path.GetDirectoryName(p)!, "SKILL.md"))));
                if (docs is not null)
                {
                    packages.Add(new PackageDocs(name, item.Name[(separator + 1)..], docs, !core));
                }
                break;
            }
        }

        return packages;
    }

    private static JsonProperty SelectTarget(JsonElement targets, string? framework)
    {
        var all = targets.EnumerateObject().ToArray();
        if (all.Length == 0)
        {
            throw new JsonException("No restore targets.");
        }
        if (!string.IsNullOrWhiteSpace(framework))
        {
            var matches = all.Where(t => t.Name.Equals(framework, StringComparison.OrdinalIgnoreCase)).ToArray();
            if (matches.Length != 1)
            {
                throw new InvalidOperationException($"Target '{framework}' is not in project.assets.json. Available targets: {string.Join(", ", all.Select(t => t.Name))}");
            }
            return matches[0];
        }

        if (all.Length != 1)
        {
            throw new InvalidOperationException($"Select a target with --framework. Available targets: {string.Join(", ", all.Select(t => t.Name))}");
        }
        return all[0];
    }

    private static string? FindProject(string? project)
    {
        if (!string.IsNullOrWhiteSpace(project))
        {
            var path = Path.GetFullPath(project);
            if (Directory.Exists(path))
            {
                var matches = Directory.GetFiles(path, "*.csproj");
                if (matches.Length != 1)
                {
                    throw new InvalidOperationException($"Expected one project in {path}; specify a .csproj with --project.");
                }
                return matches[0];
            }

            if (!File.Exists(path) || !path.EndsWith(".csproj", StringComparison.OrdinalIgnoreCase))
            {
                throw new FileNotFoundException($"Project not found: {path}");
            }
            return path;
        }

        var cwd = Directory.GetCurrentDirectory();
        for (var directory = new DirectoryInfo(cwd); directory is not null; directory = directory.Parent)
        {
            var projects = directory.GetFiles("*.csproj");
            if (projects.Length > 1)
            {
                throw new InvalidOperationException($"Multiple projects in {directory.FullName}; specify --project.");
            }
            if (projects.Length == 1)
            {
                return projects[0].FullName;
            }
            if (Directory.Exists(Path.Combine(directory.FullName, ".git")) || File.Exists(Path.Combine(directory.FullName, ".git")))
            {
                break;
            }
        }

        var descendants = FindProjects(cwd).Take(2).ToArray();
        if (descendants.Length > 1)
        {
            throw new InvalidOperationException($"Multiple projects under {cwd}; specify --project.");
        }
        return descendants.FirstOrDefault();
    }

    private static IEnumerable<string> FindProjects(string directory)
    {
        foreach (var project in Directory.EnumerateFiles(directory, "*.csproj"))
        {
            yield return project;
        }

        foreach (var child in Directory.EnumerateDirectories(directory))
        {
            var name = Path.GetFileName(child);
            if (name.StartsWith('.') || name is "bin" or "obj" or "node_modules" ||
                (File.GetAttributes(child) & FileAttributes.ReparsePoint) != 0)
            {
                continue;
            }
            foreach (var project in FindProjects(child))
            {
                yield return project;
            }
        }
    }
}
