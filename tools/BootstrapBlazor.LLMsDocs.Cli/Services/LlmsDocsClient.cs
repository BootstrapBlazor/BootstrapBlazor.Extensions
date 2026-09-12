using System.Net;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace BootstrapBlazor.LLMsDocs.Cli.Services;

/// <summary>
/// Thin client over the BootstrapBlazor LLM docs source (default
/// <c>https://www.blazor.zone/llms</c>). Fetches the index and per-component
/// docs, with a local on-disk cache for the remote (HTTP) source.
/// The base location can also be a local directory, in which case files are
/// read straight from disk and the cache is bypassed.
/// </summary>
public sealed partial class LlmsDocsClient : IDisposable
{
    public const string DefaultBaseUrl = "https://www.blazor.zone/llms";
    public const string BaseUrlEnvVar = "BB_LLMS_BASE_URL";

    private static readonly TimeSpan CacheTtl = TimeSpan.FromHours(24);

    private readonly bool _isRemote;
    private readonly string _baseDir = "";   // local source: full directory path
    private readonly Uri? _baseUri;          // remote source: base uri ending with '/'
    private readonly HttpClient? _http;
    private readonly bool _useCache;
    private readonly bool _refresh;
    private readonly string _cacheRoot;

    public LlmsDocsClient(string? baseOverride, bool refresh = false, bool noCache = false)
    {
        var raw = !string.IsNullOrWhiteSpace(baseOverride)
            ? baseOverride!
            : Environment.GetEnvironmentVariable(BaseUrlEnvVar) is { Length: > 0 } env
                ? env
                : DefaultBaseUrl;

        if (raw.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ||
            raw.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
        {
            _isRemote = true;
            _baseUri = new Uri(raw.TrimEnd('/') + "/");
            _http = new HttpClient();
            _http.DefaultRequestHeaders.UserAgent.ParseAdd("bb-llms");
        }
        else
        {
            var path = raw.StartsWith("file://", StringComparison.OrdinalIgnoreCase)
                ? new Uri(raw).LocalPath
                : raw;
            _isRemote = false;
            _baseDir = Path.GetFullPath(path);
        }

        _refresh = refresh;
        _useCache = !noCache && _isRemote;
        _cacheRoot = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "bb-llms");
    }

    /// <summary>Human-readable description of the resolved source, for diagnostics.</summary>
    public string SourceDescription => _isRemote ? _baseUri!.ToString().TrimEnd('/') : _baseDir;

    public Task<string> GetIndexAsync(CancellationToken ct = default) => FetchAsync("llms.txt", ct);

    public Task<string> GetComponentAsync(string name, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Component name is required.", nameof(name));
        }

        return FetchAsync($"components/{name}.txt", ct);
    }

    public async Task<IReadOnlyList<ComponentEntry>> ListAsync(string? query, CancellationToken ct = default)
    {
        var entries = ParseIndex(await GetIndexAsync(ct));
        if (!string.IsNullOrWhiteSpace(query))
        {
            entries = entries
                .Where(e => e.Name.Contains(query, StringComparison.OrdinalIgnoreCase)
                    || (e.Description?.Contains(query, StringComparison.OrdinalIgnoreCase) ?? false))
                .ToList();
        }

        return entries;
    }

    public async Task<IReadOnlyList<ComponentEntry>> SearchAsync(string query, int limit, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return [];
        }

        var matches = await ListAsync(query, ct);
        return matches
            .OrderBy(e => e.Name.StartsWith(query, StringComparison.OrdinalIgnoreCase) ? 0 : 1)
            .ThenBy(e => e.Name, StringComparer.OrdinalIgnoreCase)
            .Take(Math.Clamp(limit, 1, 100))
            .ToList();
    }

    // ---- core fetch -------------------------------------------------------

    private async Task<string> FetchAsync(string relativePath, CancellationToken ct)
    {
        if (!_isRemote)
        {
            var full = Path.Combine(_baseDir, relativePath.Replace('/', Path.DirectorySeparatorChar));
            if (!File.Exists(full))
            {
                throw new FileNotFoundException($"Doc not found in local source: {relativePath} ({full})");
            }

            return await File.ReadAllTextAsync(full, ct);
        }

        var url = new Uri(_baseUri!, relativePath);

        if (_useCache && !_refresh && TryReadFreshCache(relativePath, out var fresh))
        {
            return fresh;
        }

        using var request = new HttpRequestMessage(HttpMethod.Get, url);
        var etag = _useCache ? ReadCacheEtag(relativePath) : null;
        if (etag is not null)
        {
            request.Headers.TryAddWithoutValidation("If-None-Match", etag);
        }

        using var response = await _http!.SendAsync(request, ct);

        if (response.StatusCode == HttpStatusCode.NotModified && _useCache
            && ReadCacheContent(relativePath) is { } cached)
        {
            WriteMeta(relativePath, etag);   // refresh the freshness timestamp
            return cached;
        }

        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            throw new FileNotFoundException($"Not found at source: {url}");
        }

        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadAsStringAsync(ct);
        if (_useCache)
        {
            WriteContent(relativePath, body, response.Headers.ETag?.Tag);
        }

        return body;
    }

    // ---- index parsing ----------------------------------------------------

    // Matches: "- [Button](components/Button.txt) - optional description"
    [GeneratedRegex(@"^- \[(?<name>[^\]]+)\]\(components/[^)]+\.txt\)(?:\s*-\s*(?<desc>.*))?$")]
    private static partial Regex IndexLineRegex();

    // Matches a category heading: "### Buttons"
    [GeneratedRegex(@"^###\s+(?<cat>.+?)\s*$")]
    private static partial Regex CategoryLineRegex();

    private static List<ComponentEntry> ParseIndex(string indexText)
    {
        var entries = new List<ComponentEntry>();
        var category = "";

        foreach (var rawLine in indexText.Split('\n'))
        {
            var line = rawLine.TrimEnd('\r');

            var categoryMatch = CategoryLineRegex().Match(line);
            if (categoryMatch.Success)
            {
                category = categoryMatch.Groups["cat"].Value.Trim();
                continue;
            }

            var lineMatch = IndexLineRegex().Match(line);
            if (!lineMatch.Success)
            {
                continue;
            }

            var name = lineMatch.Groups["name"].Value.Trim();
            var desc = lineMatch.Groups["desc"].Success ? lineMatch.Groups["desc"].Value.Trim() : null;
            entries.Add(new ComponentEntry(name, string.IsNullOrEmpty(desc) ? null : desc, category));
        }

        return entries;
    }

    // ---- cache ------------------------------------------------------------

    private sealed class CacheMeta
    {
        public string? ETag { get; set; }
        public DateTime FetchedAtUtc { get; set; }
    }

    private string CachePath(string relativePath) =>
        Path.Combine(_cacheRoot, relativePath.Replace('/', Path.DirectorySeparatorChar));

    private string MetaPath(string relativePath) => CachePath(relativePath) + ".meta.json";

    private bool TryReadFreshCache(string relativePath, out string content)
    {
        content = "";
        var meta = ReadMeta(relativePath);
        if (meta is null || DateTime.UtcNow - meta.FetchedAtUtc >= CacheTtl)
        {
            return false;
        }

        if (ReadCacheContent(relativePath) is not { } cached)
        {
            return false;
        }

        content = cached;
        return true;
    }

    private CacheMeta? ReadMeta(string relativePath)
    {
        var meta = MetaPath(relativePath);
        if (!File.Exists(meta))
        {
            return null;
        }

        try
        {
            return JsonSerializer.Deserialize<CacheMeta>(File.ReadAllText(meta));
        }
        catch
        {
            return null;
        }
    }

    private string? ReadCacheEtag(string relativePath) => ReadMeta(relativePath)?.ETag;

    private string? ReadCacheContent(string relativePath)
    {
        var file = CachePath(relativePath);
        return File.Exists(file) ? File.ReadAllText(file) : null;
    }

    private void WriteContent(string relativePath, string content, string? etag)
    {
        var file = CachePath(relativePath);
        Directory.CreateDirectory(Path.GetDirectoryName(file)!);
        File.WriteAllText(file, content);
        WriteMeta(relativePath, etag);
    }

    private void WriteMeta(string relativePath, string? etag)
    {
        var meta = MetaPath(relativePath);
        Directory.CreateDirectory(Path.GetDirectoryName(meta)!);
        File.WriteAllText(meta, JsonSerializer.Serialize(new CacheMeta { ETag = etag, FetchedAtUtc = DateTime.UtcNow }));
    }

    public void Dispose() => _http?.Dispose();
}
