# BootstrapBlazor.LLMsDocsGenerator

English | [简体中文](./README.zh-CN.md)

A .NET tool that automatically generates LLM-friendly documentation for BootstrapBlazor components.

## Purpose

AI coding assistants (Claude Code, Cursor, GitHub Copilot) often generate incorrect UI code because they lack accurate component API information. This tool solves that problem by:

1. **Auto-generating parameter tables** from source code using Roslyn
2. **Providing GitHub source links** for deeper reference
3. **Producing one file per component** so agents load only the API they need

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                BootstrapBlazor.LLMsDocsGenerator             │
├─────────────────────────────────────────────────────────────┤
│  ComponentAnalyzer     → Roslyn-based source code parser     │
│  MarkdownBuilder       → Generates markdown documentation    │
│  DocsGenerator         → Orchestrates the generation flow    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Output: <output>/wwwroot/llms/                  │
├─────────────────────────────────────────────────────────────┤
│  llms.txt              → Index with quick start guide        │
│  components/           → Individual component documentation  │
│    ├── Button.txt      → Button component API reference      │
│    ├── Table.txt       → Table component API reference       │
│    ├── Select.txt      → Select component API reference      │
│    └── ...             → One file per component              │
└─────────────────────────────────────────────────────────────┘
```

### Why One File Per Component?

This design optimizes for LLM and Code Agent consumption:

| Aspect | Per-Category (Old) | Per-Component (New) |
|--------|-------------------|---------------------|
| **Precision** | ❌ Loads unrelated components | ✅ Only needed API info |
| **Token Efficiency** | ❌ Wastes tokens on irrelevant data | ✅ Minimal context loading |
| **Cache Friendly** | ❌ Regenerates entire category | ✅ Updates single file |
| **RAG Retrieval** | ❌ Coarse-grained matches | ✅ Fine-grained matches |

## How It Works

### 1. Source Code Analysis

The `ComponentAnalyzer` uses Roslyn to parse C# source files, scanning properties marked with the `[Parameter]` attribute and extracting their XML documentation comments.

### 2. Documentation Generation

The `MarkdownBuilder` creates structured markdown with:

- Parameter tables (name, type, default, description)
- Event callbacks section
- Public methods
- GitHub source links

### 3. Component Organization

Components are organized in the index by category for easy navigation, but each component has its own dedicated documentation file:

| Category | Example Components |
|----------|-------------------|
| table | Table, SelectTable, TableToolbar |
| input | BootstrapInput, Textarea, OtpInput |
| select | Select, AutoComplete, Cascader |
| button | Button, PopConfirmButton |
| dialog | Modal, Drawer, Toast |
| nav | Menu, Tab, Breadcrumb |
| card | Card, Collapse, GroupBox |
| treeview | TreeView, Tree |
| form | ValidateForm, EditorForm |
| other | All other components |

## Requirements

- .NET 10 SDK

## Installation

### Run from source

```bash
dotnet run --project tools/BootstrapBlazor.LLMsDocsGenerator -- --root <ROOT> --output <OUTPUT>
```

### Install as a global tool

Pack and install from the local build output:

```bash
dotnet pack tools/BootstrapBlazor.LLMsDocsGenerator -c Release
dotnet tool install --global --add-source ./tools/BootstrapBlazor.LLMsDocsGenerator/bin/Release BootstrapBlazor.LLMsDocsGenerator
```

Update / uninstall:

```bash
dotnet tool update --global BootstrapBlazor.LLMsDocsGenerator
dotnet tool uninstall --global BootstrapBlazor.LLMsDocsGenerator
```

Once installed, the tool is invoked with the command name `llms-docs`.

## Usage

The generator requires **both** `--root` and `--output`. If either is missing it exits without writing anything.

| Option | Required | Description |
|--------|----------|-------------|
| `--root` | Yes | Project root folder. The component source is read from `<root>/../BootstrapBlazor`, so this is typically the `BootstrapBlazor.Server` project directory. |
| `--output` | Yes | Publish folder. Documentation is written to `<output>/wwwroot/llms/`. |

### Example

Running from the BootstrapBlazor repository root, pointing both options at the server project:

```bash
llms-docs --root src/BootstrapBlazor.Server --output src/BootstrapBlazor.Server
```

This reads components from `src/BootstrapBlazor` and produces:

```
src/BootstrapBlazor.Server/wwwroot/llms/llms.txt
src/BootstrapBlazor.Server/wwwroot/llms/components/*.txt
```

The same command works through `dotnet run`:

```bash
dotnet run --project tools/BootstrapBlazor.LLMsDocsGenerator -- --root src/BootstrapBlazor.Server --output src/BootstrapBlazor.Server
```

## CI/CD Integration

Regenerate the documentation as part of a workflow that publishes the doc site:

```yaml
- name: Generate LLM Documentation
  run: >
    dotnet run --project tools/BootstrapBlazor.LLMsDocsGenerator --
    --root src/BootstrapBlazor.Server
    --output src/BootstrapBlazor.Server
```

## Output Format

Each component file (`components/<ComponentName>.txt`) contains markdown like:

```markdown
# BootstrapBlazor Table

> Component summary from XML comments

### Type Parameters
- `TItem` - Generic type parameter

### Parameters
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| Items | `List<TItem>` | - | Data source |
| ShowToolbar | `bool` | false | Show toolbar |

### Event Callbacks
| Event | Type | Description |
|-------|------|-------------|
| OnClick | `EventCallback` | Click handler |

### Public Methods
- `Task RefreshAsync()` - Refresh data

### Source
- Component: [src/.../Component.razor.cs](GitHub URL)
- Examples: [src/.../Samples/Components.razor](GitHub URL)
```

## For Library Users

Users can reference this documentation in their own projects by creating a `llms.txt`:

```markdown
# My Project

## Dependencies

### BootstrapBlazor
- Documentation Index: https://www.blazor.zone/llms/llms.txt
- Button: https://www.blazor.zone/llms/components/Button.txt
- Table: https://www.blazor.zone/llms/components/Table.txt
- Modal: https://www.blazor.zone/llms/components/Modal.txt
```

LLM agents can:

1. First read `llms.txt` to discover available components
2. Then fetch specific `components/{ComponentName}.txt` for detailed API info
