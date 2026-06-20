# BootstrapBlazor LLMs Docs CLI

A tiny CLI (`bb-llms`) that fetches BootstrapBlazor component documentation from
[www.blazor.zone/llms](https://www.blazor.zone/llms) for AI agents and developers.

The component docs are generated and published by `BootstrapBlazor.LLMsDocsGenerator`
(the producer, run in CI). This tool is the **consumer**: it just fetches the
already-generated `.txt` docs over HTTP and caches them locally — no repository
clone and no Roslyn analysis.

## Install

```bash
dotnet tool install -g BootstrapBlazor.LLMsDocs.Cli
```

This installs the `bb-llms` command.

## Commands

### Data commands

```bash
bb-llms index                      # print the raw llms.txt index
bb-llms list [--query <q>]         # list components (JSON), optional filter
bb-llms search <query> [--limit 20]# search by name/description (JSON)
bb-llms get <Component>            # print one component's API doc (core command)
```

`list` / `search` output JSON by default; pass `--format text` for a plain list.
`get` / `index` print the raw Markdown document.

```bash
bb-llms search table --limit 5
bb-llms get Table
```

### Source & cache options (data commands)

```
--base-url <url|dir>   Docs source: an HTTP(S) URL or a local directory.
--refresh              Ignore the cache TTL and re-fetch.
--no-cache             Do not read or write the local cache.
```

Source resolution order: `--base-url` > environment variable `BB_LLMS_BASE_URL` >
default `https://www.blazor.zone/llms`.

The base may be a **local directory** (e.g. the `wwwroot/llms` folder produced by
`LLMsDocsGenerator`), in which case files are read straight from disk — useful for
offline use or previewing docs before they are published:

```bash
bb-llms get Button --base-url ./wwwroot/llms
```

Remote responses are cached under `%LOCALAPPDATA%/bb-llms` (Windows) /
`~/.local/share/bb-llms` (Linux/macOS) with a 24h TTL and ETag revalidation.

## Using it from an AI agent

A CLI on `PATH` is invisible to an agent unless something tells the agent it
exists. The scaffolding commands install that "discovery" layer:

```bash
bb-llms instructions                       # print a snippet for CLAUDE.md / AGENTS.md
bb-llms install --client claude            # write .claude/skills/bootstrapblazor/SKILL.md
bb-llms install --client cursor            # write .cursor/rules/bootstrapblazor.mdc
bb-llms install --client all               # both (default)
```

Options for `install`:

```
--client claude|cursor|all   Target client (default: all)
--scope  project|user        project = current directory (default), user = home
--target <dir>               Override the base directory to write into
--force                      Overwrite existing files
```

- **Claude Code**: `bb-llms install --client claude` drops a skill that auto-loads
  by its `description` when a task involves BootstrapBlazor components.
- **Cursor**: `bb-llms install --client cursor` writes a project rule.
- **Generic** (any agent / `CLAUDE.md` / `AGENTS.md`): paste the output of
  `bb-llms instructions`.

## Development

```bash
cd tools/BootstrapBlazor.LLMsDocs.Cli
dotnet build
dotnet run -- get Button
dotnet run -- search table --limit 5
```

## License

Licensed under the Apache 2.0 License.
