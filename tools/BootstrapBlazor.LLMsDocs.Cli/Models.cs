namespace BootstrapBlazor.LLMsDocs.Cli;

/// <summary>
/// A single component entry parsed from the llms.txt index, used by the
/// <c>list</c> and <c>search</c> commands for structured (JSON) output.
/// </summary>
public sealed record ComponentEntry(string Name, string? Description, string Category);
