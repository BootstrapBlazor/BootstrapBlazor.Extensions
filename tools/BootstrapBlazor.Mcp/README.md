# BootstrapBlazor MCP Server

HTTP Model Context Protocol (MCP) server that provides BootstrapBlazor component context for AI assistants.

## Features

- Runtime component analysis with Roslyn
- Source access from the BootstrapBlazor main repository
- Official sample code from BootstrapBlazor.Server
- Automatic repository clone and optional update

## Installation

```bash
dotnet tool install -g BootstrapBlazor.Mcp
```

## Usage

```bash
bootstrapblazor-mcp --auto-update
```

The server exposes:

- `GET /health`
- `POST /mcp`

### Command Line Options

- `--auto-update`: update the component repository on startup
- `--repo-root <path>`: use a specific BootstrapBlazor repository path instead of the managed clone
- `--log-messages`: enable detailed logging in development
- `--log-preview-chars <number>`: set log preview length, default `1200`

## Available Tools

### `list_components`

List available components with their source and sample paths.

```typescript
{
  query?: string
}
```

### `search_components`

Search components by name or path.

```typescript
{
  query: string,
  limit?: number
}
```

### `get_component_context`

Get complete component context with source, samples, and dynamic analysis.

```typescript
{
  component: string,
  includeSource?: boolean,
  includeSample?: boolean,
  includeAnalysis?: boolean,
  maxFileBytes?: number,
  maxFiles?: number
}
```

### `get_component_source`

Get only component source files.

### `get_component_sample`

Get only sample files.

### `get_component_analysis`

Get only dynamically generated component analysis.

## Development

```bash
cd tools/BootstrapBlazor.Mcp
dotnet build
dotnet run --auto-update --log-messages
```

Manual repository sync:

```powershell
.\Scripts\sync-component-repo.ps1 -Update
```
