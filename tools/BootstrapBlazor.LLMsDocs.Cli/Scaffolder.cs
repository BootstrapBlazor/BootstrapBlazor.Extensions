namespace BootstrapBlazor.LLMsDocs.Cli;

/// <summary>
/// Generates the "discovery" artifacts that let AI agents know the
/// <c>bb-llms</c> CLI exists and when to use it. A plain CLI on PATH is
/// invisible to an agent unless an instruction file points at it; these
/// templates recover the auto-discovery that an MCP server would provide.
/// </summary>
internal static class Scaffolder
{
    /// <summary>Snippet to paste into a project's CLAUDE.md / AGENTS.md.</summary>
    public const string GenericSnippet = """
## BootstrapBlazor 组件文档

需要 BootstrapBlazor 组件的参数 / 事件 / 公开方法时，使用 `bb-llms` CLI 获取官方文档，不要凭记忆臆造 API：

- 查找组件名：`bb-llms search <关键词>`
- 获取组件文档：`bb-llms get <ComponentName>`（例：`bb-llms get Table`）
- 列出全部组件：`bb-llms list`

文档源默认 https://www.blazor.zone/llms ，按需联网拉取并本地缓存；可用环境变量 `BB_LLMS_BASE_URL` 或 `--base-url` 指向自建/本地源。
""";

    /// <summary>Claude Code skill (.claude/skills/bootstrapblazor/SKILL.md).</summary>
    public const string SkillMarkdown = """
---
name: bootstrapblazor
description: 涉及 BootstrapBlazor 组件（参数、事件回调、公开方法、用法）时使用，通过 bb-llms CLI 获取官方组件 API 文档，避免臆造参数。
---

# BootstrapBlazor 组件文档查询

当任务涉及 BootstrapBlazor 组件（编写或修改 .razor、配置组件参数、调用组件方法等）时，优先用 `bb-llms` 获取**权威**组件 API。

## 用法

1. 不确定组件名时先搜索：
   ```bash
   bb-llms search <关键词>
   ```
2. 获取某组件的参数 / 事件 / 方法文档：
   ```bash
   bb-llms get <ComponentName>     # 例：bb-llms get Table
   ```
3. 浏览全部组件：
   ```bash
   bb-llms list
   ```

输出为 Markdown（参数表、事件回调、公开方法、GitHub 源码链接）。文档源默认 https://www.blazor.zone/llms ，自动本地缓存；可用环境变量 `BB_LLMS_BASE_URL` 或 `--base-url` 指向自建/本地源。

## 前置条件

需已安装该工具（命令名 `bb-llms`）：

```bash
dotnet tool install -g BootstrapBlazor.LLMsDocs.Cli
```
""";

    /// <summary>Cursor project rule (.cursor/rules/bootstrapblazor.mdc).</summary>
    public const string CursorRule = """
---
description: 涉及 BootstrapBlazor 组件时，用 bb-llms CLI 获取官方组件 API 文档
globs: ["**/*.razor", "**/*.razor.cs"]
alwaysApply: false
---

# BootstrapBlazor 组件文档

编写或修改 BootstrapBlazor 组件代码时，用 `bb-llms` 获取权威组件 API，避免臆造参数：

- 搜索组件：`bb-llms search <关键词>`
- 获取文档：`bb-llms get <ComponentName>`（例：`bb-llms get Table`）
- 列出全部：`bb-llms list`

文档源默认 https://www.blazor.zone/llms ，可用 `BB_LLMS_BASE_URL` / `--base-url` 覆盖。
安装：`dotnet tool install -g BootstrapBlazor.LLMsDocs.Cli`。
""";

    /// <summary>Print the generic snippet to stdout.</summary>
    public static int Instructions()
    {
        Console.WriteLine(GenericSnippet);
        return 0;
    }

    /// <summary>Write discovery artifacts for the requested client(s).</summary>
    public static int Install(string client, string scope, string? target, bool force)
    {
        var clients = client.ToLowerInvariant() switch
        {
            "all" => new[] { "claude", "cursor" },
            "claude" => ["claude"],
            "cursor" => ["cursor"],
            _ => throw new ArgumentException($"Unknown client: {client} (expected claude|cursor|all)")
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
            var (path, content) = c == "claude"
                ? (Path.Combine(baseDir, ".claude", "skills", "bootstrapblazor", "SKILL.md"), SkillMarkdown)
                : (Path.Combine(baseDir, ".cursor", "rules", "bootstrapblazor.mdc"), CursorRule);

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
}
