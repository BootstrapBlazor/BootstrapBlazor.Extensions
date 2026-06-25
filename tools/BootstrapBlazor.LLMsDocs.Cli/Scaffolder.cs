using System.Reflection;
using System.Text;

namespace BootstrapBlazor.LLMsDocs.Cli;

/// <summary>
/// Generates the "discovery" artifacts that let AI agents know the
/// <c>bb-llms</c> CLI exists and when to use it. A plain CLI on PATH is
/// invisible to an agent unless an instruction file points at it; these
/// templates recover the auto-discovery that an MCP server would provide.
///
/// The template bodies are maintained as editable Markdown files under
/// <c>Templates/</c> and embedded into the assembly (see the .csproj), so they
/// can be edited like normal docs instead of inline C# string literals while
/// still being available to the globally-installed tool at runtime.
/// </summary>
internal static class Scaffolder
{
    /// <summary>Snippet to paste into a project's CLAUDE.md / AGENTS.md.</summary>
    public static string GenericSnippet => ReadTemplate("instructions.md");

    /// <summary>
    /// Skill manifest shared by Claude Code (.claude/skills/bootstrapblazor/SKILL.md)
    /// and Trae (.trae/skills/bootstrapblazor/SKILL.md): both use the same SKILL.md
    /// layout with name/description frontmatter, auto-matched by description.
    /// </summary>
    public static string SkillMarkdown => ReadTemplate("SKILL.md");

    /// <summary>Cursor project rule (.cursor/rules/bootstrapblazor.mdc).</summary>
    public static string CursorRule => ReadTemplate("bootstrapblazor.mdc");

    /// <summary>Print the generic snippet to stdout.</summary>
    public static int Instructions()
    {
        // The template is normalized to end with a single newline, so use Write.
        Console.Write(GenericSnippet);
        return 0;
    }

    /// <summary>Write discovery artifacts for the requested client(s).</summary>
    public static int Install(string client, string scope, string? target, bool force)
    {
        var clients = client.ToLowerInvariant() switch
        {
            "all" => new[] { "claude", "cursor", "trae", "codex" },
            "claude" => ["claude"],
            "cursor" => ["cursor"],
            "trae" => ["trae"],
            "codex" => ["codex"],
            _ => throw new ArgumentException($"Unknown client: {client} (expected claude|cursor|trae|codex|all)")
        };

        var scopeKey = scope.ToLowerInvariant();
        if (scopeKey is not ("project" or "user"))
        {
            throw new ArgumentException($"Unknown scope: {scope} (expected project|user)");
        }

        var baseDir = target
            ?? (scopeKey == "user"
                ? Environment.GetFolderPath(Environment.SpecialFolder.UserProfile)
                : Directory.GetCurrentDirectory());

        var written = 0;
        foreach (var c in clients)
        {
            var (path, content) = c switch
            {
                "claude" => (Path.Combine(baseDir, ".claude", "skills", "bootstrapblazor", "SKILL.md"), SkillMarkdown),
                "cursor" => (Path.Combine(baseDir, ".cursor", "rules", "bootstrapblazor.mdc"), CursorRule),
                // Trae skills mirror Claude skills (.trae/skills/<name>/SKILL.md, same
                // name/description frontmatter, auto-matched by description), so the
                // Claude skill template is reused verbatim.
                "trae" => (Path.Combine(baseDir, ".trae", "skills", "bootstrapblazor", "SKILL.md"), SkillMarkdown),
                // Codex has no dedicated skill/rule format — it reads AGENTS.md: the
                // repo-root AGENTS.md for project scope, ~/.codex/AGENTS.md for user scope.
                // It reuses the generic snippet (same content as `bb-llms instructions`).
                // NOTE: AGENTS.md is a shared, hand-maintained file, so this only creates it
                // when absent; --force overwrites it wholesale (existing content is lost).
                _ => (scopeKey == "user"
                        ? Path.Combine(baseDir, ".codex", "AGENTS.md")
                        : Path.Combine(baseDir, "AGENTS.md"), GenericSnippet)
            };

            if (File.Exists(path) && !force)
            {
                Console.Error.WriteLine($"Exists, skipped (use --force to overwrite): {path}");
                continue;
            }

            Directory.CreateDirectory(Path.GetDirectoryName(path)!);
            File.WriteAllText(path, content);
            Console.WriteLine($"Wrote: {path}");
            written++;
        }

        return written > 0 ? 0 : 1;
    }

    /// <summary>
    /// Read an embedded template by its <c>LogicalName</c> (see the .csproj).
    /// Trailing whitespace/newlines are normalized to a single trailing newline
    /// so output stays stable regardless of how the source file was saved.
    /// </summary>
    private static string ReadTemplate(string logicalName)
    {
        var assembly = typeof(Scaffolder).Assembly;
        using var stream = assembly.GetManifestResourceStream(logicalName)
            ?? throw new InvalidOperationException($"Embedded template not found: {logicalName}");
        using var reader = new StreamReader(stream, Encoding.UTF8);
        return reader.ReadToEnd().TrimEnd() + "\n";
    }
}
