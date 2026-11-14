using System.Text;
using System.Text.RegularExpressions;

namespace BootstrapBlazor.LLMsDocs.Cli.Services;

internal sealed partial class ProjectDocsClient(LlmsDocsClient fallback, IReadOnlyList<PackageDocs> packages, bool automatic) : IDisposable
{
    private sealed record LocalEntry(ComponentEntry Entry, string File, PackageDocs Package);

    public async Task<string> GetAsync(string name, CancellationToken ct)
    {
        var entry = ReadLocalEntries().OrderByDescending(e => e.Package.IsExtension)
            .FirstOrDefault(e => e.Entry.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        if (entry is not null)
        {
            try
            {
                var content = await File.ReadAllTextAsync(entry.File, ct);
                Console.Error.WriteLine($"Source: {entry.Package.Package} {entry.Package.Version} ({entry.File})");
                return content;
            }
            catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
            {
                Console.Error.WriteLine($"Cannot read local documentation: {ex.Message}");
            }
        }

        if (automatic)
        {
            Console.Error.WriteLine("Local documentation not found; online documentation may differ from the project version.");
        }
        return await fallback.GetComponentAsync(name, ct);
    }

    public async Task<string> IndexAsync(CancellationToken ct)
    {
        var local = ReadLocalEntries();
        if (local.Count == 0)
        {
            if (automatic)
            {
                Console.Error.WriteLine("Local documentation not found; online documentation may differ from the project version.");
            }
            return await fallback.GetIndexAsync(ct);
        }

        var entries = await MergeAsync(local, ct);
        var builder = new StringBuilder("# BootstrapBlazor\n");
        foreach (var group in entries.GroupBy(e => e.Category))
        {
            builder.Append("\n### ").AppendLine(group.Key);
            foreach (var entry in group)
            {
                builder.Append("- [").Append(entry.Name).Append("](").Append(entry.DocumentPath).Append(')');
                if (entry.Description is not null)
                {
                    builder.Append(" - ").Append(entry.Description);
                }
                builder.AppendLine();
            }
        }
        return builder.ToString();
    }

    public async Task<IReadOnlyList<ComponentEntry>> ListAsync(string? query, CancellationToken ct)
    {
        var local = ReadLocalEntries();
        if (local.Count == 0)
        {
            if (automatic)
            {
                Console.Error.WriteLine("Local documentation not found; online documentation may differ from the project version.");
            }
            return await fallback.ListAsync(query, ct);
        }

        var entries = await MergeAsync(local, ct);
        return string.IsNullOrWhiteSpace(query)
            ? entries
            : entries.Where(e => e.Name.Contains(query, StringComparison.OrdinalIgnoreCase)
                || (e.Description?.Contains(query, StringComparison.OrdinalIgnoreCase) ?? false)).ToList();
    }

    public async Task<IReadOnlyList<ComponentEntry>> SearchAsync(string query, int limit, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return [];
        }

        var entries = await ListAsync(query, ct);
        return entries.DistinctBy(e => e.DocumentPath, StringComparer.Ordinal)
            .OrderBy(e => e.Name.StartsWith(query, StringComparison.OrdinalIgnoreCase) ? 0 : 1)
            .ThenBy(e => e.Name, StringComparer.OrdinalIgnoreCase)
            .Take(Math.Clamp(limit, 1, 100)).ToList();
    }

    private async Task<List<ComponentEntry>> MergeAsync(List<LocalEntry> local, CancellationToken ct)
    {
        var entries = local.Select(e => e.Entry).ToList();
        var names = entries.Select(e => e.Name).ToHashSet(StringComparer.OrdinalIgnoreCase);
        Console.Error.WriteLine($"Source: project packages ({string.Join(", ", packages.Select(p => $"{p.Package} {p.Version}"))}).");
        try
        {
            using var timeout = CancellationTokenSource.CreateLinkedTokenSource(ct);
            timeout.CancelAfter(TimeSpan.FromSeconds(3));
            var online = await fallback.ListAsync(null, timeout.Token);
            var added = false;
            foreach (var entry in online)
            {
                if (!names.Contains(entry.Name))
                {
                    entries.Add(entry);
                    added = true;
                }
            }
            if (added)
            {
                Console.Error.WriteLine("Additional online catalog entries may differ from the project version.");
            }
        }
        catch (Exception ex) when (ex is HttpRequestException or IOException or TaskCanceledException && !ct.IsCancellationRequested)
        {
            Console.Error.WriteLine($"Online catalog unavailable: {ex.Message}");
        }
        return entries;
    }

    private List<LocalEntry> ReadLocalEntries()
    {
        var entries = new List<LocalEntry>();
        foreach (var package in packages)
        {
            try
            {
                entries.AddRange(ReadPackageEntries(package));
            }
            catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
            {
                Console.Error.WriteLine($"Cannot read {package.Package} index: {ex.Message}");
            }
        }
        return entries;
    }

    private static List<LocalEntry> ReadPackageEntries(PackageDocs package)
    {
        var entries = new List<LocalEntry>();
        var category = package.Package;
        var basePath = Path.GetFullPath(package.Directory).TrimEnd(Path.DirectorySeparatorChar) + Path.DirectorySeparatorChar;
        foreach (var line in File.ReadLines(Path.Combine(package.Directory, "llms.txt")))
        {
            var heading = HeadingRegex().Match(line.TrimEnd('\r'));
            if (heading.Success)
            {
                category = heading.Groups["category"].Value.Trim();
                continue;
            }

            var match = LinkRegex().Match(line.TrimEnd('\r'));
            if (!match.Success)
            {
                continue;
            }

            var relative = match.Groups["path"].Value.Replace('/', Path.DirectorySeparatorChar);
            string file;
            try
            {
                file = Path.GetFullPath(relative, basePath);
            }
            catch (ArgumentException)
            {
                continue;
            }
            if (!file.StartsWith(basePath, OperatingSystem.IsWindows() ? StringComparison.OrdinalIgnoreCase : StringComparison.Ordinal) || !File.Exists(file))
            {
                continue;
            }

            var name = match.Groups["name"].Value.Trim();
            var description = match.Groups["description"].Success ? match.Groups["description"].Value.Trim() : null;
            var entry = new ComponentEntry(name, string.IsNullOrEmpty(description) ? null : description, category)
            {
                IsExtension = package.IsExtension,
                DocumentPath = $"{(package.IsExtension ? "extensions" : "components")}/{name}.txt"
            };
            entries.Add(new LocalEntry(entry, file, package));
        }
        return entries;
    }

    [GeneratedRegex(@"^###\s+(?<category>.+?)\s*$")]
    private static partial Regex HeadingRegex();

    [GeneratedRegex(@"^- \[(?<name>[^\]]+)\]\((?<path>[^):]+\.txt)\)(?:\s*-\s*(?<description>.*))?$")]
    private static partial Regex LinkRegex();

    public void Dispose() => fallback.Dispose();
}
