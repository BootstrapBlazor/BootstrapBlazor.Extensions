namespace BootstrapBlazor.Mcp.Services;

public static class BootstrapBlazorRootLocator
{
    public static BootstrapBlazorRoot Locate(McpServerOptions options)
    {
        // Prefer RootPath if set (from RepositoryManager)
        if (!string.IsNullOrWhiteSpace(options.RootPath))
        {
            return FromRepositoryRoot(options.RootPath);
        }

        if (!string.IsNullOrWhiteSpace(options.RepoRoot))
        {
            return FromRepositoryRoot(options.RepoRoot);
        }

        return FromCurrentDirectory();
    }

    private static BootstrapBlazorRoot FromCurrentDirectory()
    {
        var current = new DirectoryInfo(Environment.CurrentDirectory);
        while (current is not null)
        {
            // Check for BootstrapBlazor repository structure
            if (IsBootstrapBlazorRepository(current.FullName))
            {
                return new BootstrapBlazorRoot(
                    BootstrapBlazorRootMode.Repository,
                    current.FullName);
            }

            current = current.Parent;
        }

        throw new InvalidOperationException("Unable to locate BootstrapBlazor repository. Use --repo-root or ensure Components directory exists.");
    }

    private static BootstrapBlazorRoot FromRepositoryRoot(string repoRoot)
    {
        var root = Path.GetFullPath(repoRoot);

        if (!IsBootstrapBlazorRepository(root))
        {
            throw new DirectoryNotFoundException($"Directory does not appear to be a BootstrapBlazor repository: {root}");
        }

        return new BootstrapBlazorRoot(BootstrapBlazorRootMode.Repository, root);
    }

    private static bool IsBootstrapBlazorRepository(string path)
    {
        var componentsPath = Path.Combine(path, "src", "BootstrapBlazor", "Components");
        return Directory.Exists(componentsPath);
    }
}
