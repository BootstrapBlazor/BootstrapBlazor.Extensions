# BootstrapBlazor local MCP service

[简体中文](README.md)

The existing `BootstrapBlazor.LLMsDocs.Cli` tool package also provides a local, read-only MCP service. Install or update the CLI as usual; there is no separate MCP package:

```powershell
dotnet tool install --global BootstrapBlazor.LLMsDocs.Cli
dotnet tool update --global BootstrapBlazor.LLMsDocs.Cli
```

Start the server with:

```text
bb-llms mcp
```

## Client configuration

Claude Desktop-style `mcpServers` configuration:

```json
{
  "mcpServers": {
    "bootstrapblazor": {
      "command": "bb-llms",
      "args": ["mcp"]
    }
  }
}
```

VS Code `.vscode/mcp.json` configuration:

```json
{
  "servers": {
    "bootstrapblazor": {
      "type": "stdio",
      "command": "bb-llms",
      "args": ["mcp"]
    }
  }
}
```

Ensure the global .NET tools directory is on `PATH`. If the client does not inherit that `PATH`, configure `command` with the full path to `bb-llms` or use the client's documented environment configuration.

## Available tools

- `search_components`: search by component name or description.
- `get_component_api`: retrieve an exact component API document; pass `package` to disambiguate a name shared by restored packages.
- `list_components`: list or filter indexed components and extensions.

All tools accept optional `project`, `framework`, `base_url`, `refresh`, and `no_cache` arguments. Project and restore-target ambiguity remains an error unless the caller explicitly selects them. Package documentation is preferred; missing local documentation falls back to the configured documentation source. `get_component_api` reports the source, package and confirmed package version when available, and warns that official documentation may not match the project's package version when it falls back to the official site. Missing documents and ambiguous names are returned as tool errors rather than guessed.

Catalog responses report their source and restored package versions. Catalog entries can combine project-package indexes with the configured official or custom source; the response notes the possibility of official-version differences.

## Protocol and transport scope

The server implements MCP protocol version **`2024-11-05`** over stdio, with `initialize`, `ping`, `tools/list`, and `tools/call`. It uses UTF-8 without a BOM and one JSON-RPC message per line on stdout; diagnostics go to stderr. It does not expose HTTP, resources, or prompts. Clients must accept this protocol version and stdio transport; compatibility with every MCP client is not implied.
