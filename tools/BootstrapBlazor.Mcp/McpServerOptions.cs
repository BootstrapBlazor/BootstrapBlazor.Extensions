namespace BootstrapBlazor.Mcp;

public sealed record McpServerOptions
{
    public string? RepoRoot { get; init; }

    public string? RootPath { get; init; }  // New: for overriding with cloned repo path

    public bool AutoUpdate { get; init; }  // New: auto-update repository on start

    public string DefaultSampleLocale { get; init; } = SampleLocaleResolver.DefaultLocale;

    public bool LogMessages { get; init; }

    public int LogPreviewChars { get; init; } = 1200;

    public bool ShouldLogMessages(string environmentName, bool debuggerAttached = false)
    {
        return LogMessages &&
            (debuggerAttached || environmentName.Equals("Development", StringComparison.OrdinalIgnoreCase));
    }

    public static McpServerOptions Parse(string[] args)
    {
        var options = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        for (var index = 0; index < args.Length; index++)
        {
            var arg = args[index];
            if (!arg.StartsWith("--", StringComparison.Ordinal))
            {
                continue;
            }

            var name = arg[2..];
            if (string.IsNullOrWhiteSpace(name))
            {
                continue;
            }

            if (index + 1 >= args.Length || args[index + 1].StartsWith("--", StringComparison.Ordinal))
            {
                options[name] = "true";
                continue;
            }

            options[name] = args[++index];
        }

        return new McpServerOptions
        {
            RepoRoot = GetOption(options, "repo-root"),
            AutoUpdate = GetBoolOption(options, "auto-update"),
            DefaultSampleLocale = SampleLocaleResolver.NormalizeOrDefault(
                GetOption(options, "default-sample-locale") ?? GetOption(options, "sample-locale")),
            LogMessages = GetBoolOption(options, "log-messages") || GetBoolOption(options, "log-mcp"),
            LogPreviewChars = GetIntOption(options, "log-preview-chars", 1200)
        };
    }

    private static string? GetOption(Dictionary<string, string> options, string name)
    {
        return options.TryGetValue(name, out var value) && !string.IsNullOrWhiteSpace(value)
            ? value
            : null;
    }

    private static bool GetBoolOption(Dictionary<string, string> options, string name)
    {
        if (!options.TryGetValue(name, out var value))
        {
            return false;
        }

        return value.Equals("true", StringComparison.OrdinalIgnoreCase) ||
            value.Equals("1", StringComparison.OrdinalIgnoreCase) ||
            value.Equals("yes", StringComparison.OrdinalIgnoreCase);
    }

    private static int GetIntOption(Dictionary<string, string> options, string name, int defaultValue)
    {
        return options.TryGetValue(name, out var value) && int.TryParse(value, out var result)
            ? Math.Clamp(result, 200, 20_000)
            : defaultValue;
    }
}
