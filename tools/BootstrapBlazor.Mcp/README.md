# BootstrapBlazor MCP Server

Model Context Protocol (MCP) server providing BootstrapBlazor component context for AI assistants.

## Features

- **Dynamic Analysis**: Runtime component analysis with Roslyn, always up-to-date with source
- **Source Access**: Direct access to component source code
- **Sample Integration**: Official sample code from BootstrapBlazor.Server
- **Auto-sync**: Automatic repository cloning and updating

## Installation

```bash
dotnet tool install -g BootstrapBlazor.Mcp
```

## Usage

### Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bootstrapblazor": {
      "command": "bootstrapblazor-mcp",
      "args": ["--auto-update"]
    }
  }
}
```

### Command Line Options

- `--auto-update`: Automatically update the component repository on startup
- `--repo-root <path>`: Use a specific repository path instead of auto-cloning
- `--log-messages`: Enable detailed logging (development mode only)
- `--log-preview-chars <number>`: Set log preview length (default: 1200)

## Architecture

### Data Flow

```
BootstrapBlazor.Mcp (Extensions repo)
  ├── Automatically clones/updates → BootstrapBlazor (main repo)
  │   └── .mcp-data/BootstrapBlazor/
  │       ├── src/BootstrapBlazor/Components/
  │       ├── src/BootstrapBlazor.Server/Components/Samples/
  │       └── skill-index.json
  │
  └── Runtime Analysis
      ├── ComponentAnalyzer (Roslyn-based)
      ├── MarkdownBuilder (Documentation generation)
      └── BootstrapBlazorContextService (Orchestration)
```

### Why This Design?

1. **Separation of Concerns**: MCP tools in Extensions repo, components in main repo
2. **Always Fresh**: No static skill documents to maintain, analysis happens at runtime
3. **Offline Capable**: Once cloned, works without network
4. **Single Source of Truth**: Component source is the documentation

## Available Tools

### `list_components`

List all available components with their source and sample paths.

```typescript
{
  query?: string  // Optional filter
}
```

### `search_components`

Search components by name or path.

```typescript
{
  query: string,
  limit?: number  // Default: 20
}
```

### `get_component_context`

Get complete component context with source, samples, and dynamic analysis.

```typescript
{
  component: string,
  includeSource?: boolean,      // Default: true
  includeSample?: boolean,       // Default: true
  includeAnalysis?: boolean,     // Default: true (runtime-generated)
  maxFileBytes?: number,         // Default: 131072
  maxFiles?: number              // Default: 40
}
```

### `get_component_source`

Get only component source files.

### `get_component_sample`

Get only sample files.

### `get_component_analysis`

Get only dynamically generated component analysis (parameters, methods, etc.).

## Development

### Building

```bash
cd tools/BootstrapBlazor.Mcp
dotnet build
```

### Running Locally

```bash
dotnet run -- --auto-update --log-messages
```

### Manual Repository Sync

```powershell
.\Scripts\sync-component-repo.ps1 -Update
```

## Migrating from Old Architecture

This version replaces the previous architecture:

- ❌ **Old**: Static skill documents in `docs/skills/components/`
- ✅ **New**: Dynamic analysis at runtime
- ❌ **Old**: Manual skill maintenance required
- ✅ **New**: Automatically synced with component source

The `skill` field has been removed from `skill-index.json`. Components are now documented dynamically by analyzing their source code.

## Project Structure

```
tools/BootstrapBlazor.Mcp/
├── Analysis/                      # Roslyn-based component analysis
│   ├── ComponentAnalyzer.cs      # Extracts parameters, methods, etc.
│   ├── MarkdownBuilder.cs        # Generates documentation
│   ├── AnalysisModels.cs         # Analysis data models
│   └── TextHelpers.cs            # Text processing utilities
├── Services/
│   ├── RepositoryManager.cs      # Git clone/update management
│   ├── BootstrapBlazorContextService.cs  # Main service
│   └── BootstrapBlazorRootLocator.cs     # Path resolution
├── Scripts/
│   └── sync-component-repo.ps1   # Manual sync script
└── Program.cs                     # ASP.NET Core entry point
```

## License

Licensed under the Apache 2.0 License.
