using System.Text.Json.Serialization;
using BootstrapBlazor.Mcp.Analysis;

namespace BootstrapBlazor.Mcp;

public enum BootstrapBlazorRootMode
{
    Repository
}

public sealed record BootstrapBlazorRoot(
    BootstrapBlazorRootMode Mode,
    string RootPath)
{
    public string ComponentsPath => Path.Combine(RootPath, "src", "BootstrapBlazor", "Components");
    public string SamplesPath => Path.Combine(RootPath, "src", "BootstrapBlazor.Server", "Components", "Samples");
};

public sealed record ComponentSummary(
    string Name,
    bool HasComponent,
    bool HasSample,
    string? Component,
    string? Sample);

public sealed record FileContent(
    string Path,
    string FullPath,
    string Content,
    bool Truncated,
    long Length);

public sealed record ComponentContext(
    string Component,
    string Mode,
    string RootPath,
    IReadOnlyList<string> Priority,
    IReadOnlyDictionary<string, string?> IndexedPaths,
    IReadOnlyList<string> Warnings,
    IReadOnlyList<FileContent> SourceFiles,
    IReadOnlyList<FileContent> SampleFiles,
    string? GeneratedAnalysis);

public sealed record ToolContent(
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("text")] string Text);

public sealed record ToolCallResult(
    [property: JsonPropertyName("content")] IReadOnlyList<ToolContent> Content,
    [property: JsonPropertyName("isError")] bool IsError = false);
