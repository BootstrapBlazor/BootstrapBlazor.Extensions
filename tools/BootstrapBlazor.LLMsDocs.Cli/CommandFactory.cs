using System.CommandLine;
using System.Text.Encodings.Web;
using System.Text.Json;
using BootstrapBlazor.LLMsDocs.Cli.Services;

namespace BootstrapBlazor.LLMsDocs.Cli;

/// <summary>
/// Wires up the <c>bb-llms</c> command surface: four data commands
/// (index / list / search / get) plus two scaffolding commands
/// (instructions / install).
/// </summary>
internal static class CommandFactory
{
    private static readonly JsonSerializerOptions JsonOut = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        // Output goes to stdout for an agent, not into HTML — keep Chinese and
        // angle brackets unescaped so the JSON stays readable and token-light.
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
    };

    public static RootCommand Build() => new(
        "BootstrapBlazor LLM docs CLI — fetch component docs from www.blazor.zone/llms for AI agents.")
    {
        BuildIndexCommand(),
        BuildListCommand(),
        BuildSearchCommand(),
        BuildGetCommand(),
        BuildInstructionsCommand(),
        BuildInstallCommand()
    };

    // ---- data commands ----------------------------------------------------

    private static Command BuildIndexCommand()
    {
        var (baseUrl, refresh, noCache) = SourceOptions();
        var cmd = new Command("index", "Print the raw llms.txt index.") { baseUrl, refresh, noCache };
        cmd.SetAction(async (result, ct) =>
        {
            try
            {
                using var client = CreateClient(result, baseUrl, refresh, noCache);
                Console.Out.Write(await client.GetIndexAsync(ct));
                return 0;
            }
            catch (Exception ex)
            {
                return Fail(ex);
            }
        });
        return cmd;
    }

    private static Command BuildListCommand()
    {
        var query = new Option<string?>("--query") { Description = "Optional name/description filter." };
        var format = FormatOption();
        var (baseUrl, refresh, noCache) = SourceOptions();
        var cmd = new Command("list", "List components from the index (default JSON).")
        {
            query, format, baseUrl, refresh, noCache
        };
        cmd.SetAction(async (result, ct) =>
        {
            try
            {
                using var client = CreateClient(result, baseUrl, refresh, noCache);
                var entries = await client.ListAsync(result.GetValue(query), ct);
                WriteEntries(entries, result.GetValue(format));
                return 0;
            }
            catch (Exception ex)
            {
                return Fail(ex);
            }
        });
        return cmd;
    }

    private static Command BuildSearchCommand()
    {
        var query = new Argument<string>("query") { Description = "Search term." };
        var limit = new Option<int>("--limit") { Description = "Maximum results (default 20)." };
        var format = FormatOption();
        var (baseUrl, refresh, noCache) = SourceOptions();
        var cmd = new Command("search", "Search components by name or description (default JSON).")
        {
            query, limit, format, baseUrl, refresh, noCache
        };
        cmd.SetAction(async (result, ct) =>
        {
            try
            {
                using var client = CreateClient(result, baseUrl, refresh, noCache);
                var max = result.GetValue(limit);
                if (max <= 0)
                {
                    max = 20;
                }

                var entries = await client.SearchAsync(result.GetValue(query)!, max, ct);
                WriteEntries(entries, result.GetValue(format));
                return 0;
            }
            catch (Exception ex)
            {
                return Fail(ex);
            }
        });
        return cmd;
    }

    private static Command BuildGetCommand()
    {
        var component = new Argument<string>("component") { Description = "Component name, e.g. Button." };
        var (baseUrl, refresh, noCache) = SourceOptions();
        var cmd = new Command("get", "Fetch one component's API doc (the core command).")
        {
            component, baseUrl, refresh, noCache
        };
        cmd.SetAction(async (result, ct) =>
        {
            var name = result.GetValue(component)!;
            try
            {
                using var client = CreateClient(result, baseUrl, refresh, noCache);
                Console.Out.Write(await client.GetComponentAsync(name, ct));
                return 0;
            }
            catch (FileNotFoundException)
            {
                Console.Error.WriteLine($"error: component '{name}' not found. Try: bb-llms search <keyword>");
                return 1;
            }
            catch (Exception ex)
            {
                return Fail(ex);
            }
        });
        return cmd;
    }

    // ---- scaffolding commands --------------------------------------------

    private static Command BuildInstructionsCommand()
    {
        var cmd = new Command("instructions", "Print a usage snippet to paste into CLAUDE.md / AGENTS.md.");
        cmd.SetAction((result, ct) => Task.FromResult(Scaffolder.Instructions()));
        return cmd;
    }

    private static Command BuildInstallCommand()
    {
        var client = new Option<string?>("--client") { Description = "Target client: claude | cursor | trae | all (default all)." };
        var scope = new Option<string?>("--scope") { Description = "Where to write: project (cwd, default) or user (home)." };
        var target = new Option<string?>("--target") { Description = "Override base directory to write into." };
        var force = new Option<bool>("--force") { Description = "Overwrite existing files." };
        var cmd = new Command("install", "Install agent discovery artifacts (Claude Code skill / Cursor rules / Trae skill).")
        {
            client, scope, target, force
        };
        cmd.SetAction((result, ct) =>
        {
            try
            {
                return Task.FromResult(Scaffolder.Install(
                    result.GetValue(client) ?? "all",
                    result.GetValue(scope) ?? "project",
                    result.GetValue(target),
                    result.GetValue(force)));
            }
            catch (Exception ex)
            {
                return Task.FromResult(Fail(ex));
            }
        });
        return cmd;
    }

    // ---- helpers ----------------------------------------------------------

    private static (Option<string?> baseUrl, Option<bool> refresh, Option<bool> noCache) SourceOptions()
    {
        var baseUrl = new Option<string?>("--base-url")
        {
            Description = $"Docs source: HTTP(S) URL or local directory. Overrides {LlmsDocsClient.BaseUrlEnvVar}. Default: {LlmsDocsClient.DefaultBaseUrl}"
        };
        var refresh = new Option<bool>("--refresh") { Description = "Ignore cache TTL and re-fetch from the source." };
        var noCache = new Option<bool>("--no-cache") { Description = "Do not read or write the local cache." };
        return (baseUrl, refresh, noCache);
    }

    private static Option<string?> FormatOption() =>
        new("--format") { Description = "Output format: json (default) or text." };

    private static LlmsDocsClient CreateClient(
        ParseResult result, Option<string?> baseUrl, Option<bool> refresh, Option<bool> noCache) =>
        new(result.GetValue(baseUrl), result.GetValue(refresh), result.GetValue(noCache));

    private static void WriteEntries(IReadOnlyList<ComponentEntry> entries, string? format)
    {
        if (string.Equals(format, "text", StringComparison.OrdinalIgnoreCase))
        {
            foreach (var entry in entries)
            {
                Console.WriteLine(entry.Description is null ? entry.Name : $"{entry.Name} - {entry.Description}");
            }

            return;
        }

        Console.WriteLine(JsonSerializer.Serialize(entries, JsonOut));
    }

    private static int Fail(Exception ex)
    {
        Console.Error.WriteLine($"error: {ex.Message}");
        return 1;
    }
}
