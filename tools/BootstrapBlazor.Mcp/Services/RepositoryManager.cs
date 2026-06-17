using System.Diagnostics;

namespace BootstrapBlazor.Mcp.Services;

/// <summary>
/// Manages the local clone of the BootstrapBlazor component repository
/// </summary>
public sealed class RepositoryManager
{
    private const string DefaultRepoUrl = "https://github.com/dotnetcore/BootstrapBlazor.git";
    private const string DefaultBranch = "main";

    private readonly string _dataDirectory;
    private readonly string _repoPath;
    private readonly string _repoUrl;
    private readonly string _branch;

    public RepositoryManager(string? dataDirectory = null, string? repoUrl = null, string? branch = null)
    {
        _repoUrl = repoUrl ?? DefaultRepoUrl;
        _branch = branch ?? DefaultBranch;

        // Default to .mcp-data in the Extensions repository root
        _dataDirectory = dataDirectory ?? Path.Combine(
            Path.GetDirectoryName(typeof(RepositoryManager).Assembly.Location)!,
            "..", "..", "..", "..", ".mcp-data");

        _repoPath = Path.Combine(_dataDirectory, "BootstrapBlazor");
    }

    public string RepoPath => Path.GetFullPath(_repoPath);

    public string ComponentsPath => Path.Combine(RepoPath, "src", "BootstrapBlazor", "Components");

    public string SamplesPath => Path.Combine(RepoPath, "src", "BootstrapBlazor.Server", "Components", "Samples");

    public string SkillIndexPath => Path.Combine(RepoPath, "skill-index.json");

    /// <summary>
    /// Ensures the repository is cloned and up-to-date
    /// </summary>
    public async Task<RepositoryStatus> EnsureRepositoryAsync(bool autoUpdate = false)
    {
        if (!Directory.Exists(RepoPath))
        {
            Console.WriteLine($"Cloning BootstrapBlazor repository to {RepoPath}...");
            await CloneRepositoryAsync();
            return new RepositoryStatus(RepoPath, true, null);
        }

        if (!IsGitRepository(RepoPath))
        {
            throw new InvalidOperationException(
                $"Directory exists but is not a git repository: {RepoPath}");
        }

        var currentCommit = await GetCurrentCommitAsync();

        if (autoUpdate)
        {
            Console.WriteLine("Updating BootstrapBlazor repository...");
            await UpdateRepositoryAsync();
            var newCommit = await GetCurrentCommitAsync();
            return new RepositoryStatus(RepoPath, false, currentCommit != newCommit ? newCommit : null);
        }

        return new RepositoryStatus(RepoPath, false, null);
    }

    /// <summary>
    /// Clones the repository
    /// </summary>
    private async Task CloneRepositoryAsync()
    {
        Directory.CreateDirectory(_dataDirectory);

        var result = await RunGitCommandAsync(
            _dataDirectory,
            "clone", "--depth", "1", "--branch", _branch, _repoUrl, "BootstrapBlazor");

        if (result.ExitCode != 0)
        {
            throw new InvalidOperationException(
                $"Failed to clone repository: {result.Error}");
        }

        Console.WriteLine("Repository cloned successfully.");
    }

    /// <summary>
    /// Updates the repository
    /// </summary>
    private async Task UpdateRepositoryAsync()
    {
        var result = await RunGitCommandAsync(RepoPath, "pull", "origin", _branch);

        if (result.ExitCode != 0)
        {
            throw new InvalidOperationException(
                $"Failed to update repository: {result.Error}");
        }

        Console.WriteLine("Repository updated successfully.");
    }

    /// <summary>
    /// Gets the current commit hash
    /// </summary>
    private async Task<string> GetCurrentCommitAsync()
    {
        var result = await RunGitCommandAsync(RepoPath, "rev-parse", "HEAD");

        if (result.ExitCode != 0)
        {
            throw new InvalidOperationException(
                $"Failed to get current commit: {result.Error}");
        }

        return result.Output.Trim();
    }

    /// <summary>
    /// Checks if a directory is a git repository
    /// </summary>
    private static bool IsGitRepository(string path)
    {
        return Directory.Exists(Path.Combine(path, ".git"));
    }

    /// <summary>
    /// Runs a git command
    /// </summary>
    private static async Task<(int ExitCode, string Output, string Error)> RunGitCommandAsync(
        string workingDirectory, params string[] args)
    {
        var startInfo = new ProcessStartInfo
        {
            FileName = "git",
            WorkingDirectory = workingDirectory,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        foreach (var arg in args)
        {
            startInfo.ArgumentList.Add(arg);
        }

        using var process = Process.Start(startInfo);
        if (process == null)
        {
            throw new InvalidOperationException("Failed to start git process");
        }

        var outputTask = process.StandardOutput.ReadToEndAsync();
        var errorTask = process.StandardError.ReadToEndAsync();

        await process.WaitForExitAsync();

        var output = await outputTask;
        var error = await errorTask;

        return (process.ExitCode, output, error);
    }
}

/// <summary>
/// Repository status information
/// </summary>
public sealed record RepositoryStatus(
    string Path,
    bool WasCloned,
    string? UpdatedToCommit);
