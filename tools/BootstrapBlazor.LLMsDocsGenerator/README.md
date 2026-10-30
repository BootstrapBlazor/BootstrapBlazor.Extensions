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
│  extensions/           → BootstrapBlazor.Extensions docs     │
│    ├── SelectCity.txt  → Extension component API reference   │
│    └── ...             → One file per extension type         │
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

- An SDK matching the project's `TargetFrameworks` (currently .NET 11 for source builds).
- A local `BootstrapBlazor` checkout; when `docs.json` configures extension packages, also check out `BootstrapBlazor.Extensions` beside it. The generator does not clone repositories.

## Installation

### Run from source

From the `BootstrapBlazor.Extensions` repository root:

```powershell
dotnet run --project tools\BootstrapBlazor.LLMsDocsGenerator --root "..\BootstrapBlazor\src\BootstrapBlazor.Server" --output "..\BootstrapBlazor\src\BootstrapBlazor.Server"
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

Both options are optional and independently default to the current working directory (`.`). Run `llms-docs` without arguments from BB's `src/BootstrapBlazor.Server` directory to write documentation into that project. Overriding `--root` does not change the default `--output`; specify both when using another checkout or publish directory.

From the Server project directory, `dotnet llms-docs --output=bin\Release\publish\` also works: the omitted `--root` defaults to `.`, and relative output paths are resolved from that same directory. MSBuild can use `dotnet llms-docs --output=$(PublishDir)` when the path contains no spaces.

| Option | Required | Description |
|--------|----------|-------------|
| `--root` | No | Project root folder. Defaults to `.`. Component source is read from `<root>/../BootstrapBlazor`. |
| `--output` | No | Publish folder. Defaults to `.`. Documentation is written to `<output>/wwwroot/llms/`. |

When a `BootstrapBlazor.Extensions` checkout is available beside the core `BootstrapBlazor` checkout, the generator also analyzes the extension sources. The extension types to document are configured under `extensions` in `src/BootstrapBlazor.Server/docs.json`, the only configuration location. Generation fails if the file is missing. Extension docs are written to `extensions/`.

Only source projects listed in `BootstrapBlazor.Extensions.slnx` are scanned. Package names are matched against project filenames, not directory names. Configured packages outside the solution are skipped with a diagnostic; missing solution projects are reported as errors. Leftover directories do not participate in analysis. Core Razor-only components with an `@inherits` directive are also supported. Regeneration removes obsolete `.txt` files carrying the generator's `<!-- Generated: ... -->` marker, while preserving other files.

If extension packages are configured but the sibling extension source checkout is missing, generation fails before changing existing documentation. Unresolved configured component or service types also fail generation before writing files or removing stale documents. Services shared by multiple packages retain one document listing the registration method for each configured package; choose the registration matching the package in use.

Explicit `<Using Include="..." />` items in each source project's `.csproj` (including aliases and static imports) are applied to that project's C# files, without leaking these imports into other projects in the combined analysis.

This is source analysis, not a full MSBuild evaluation: conditions, property expansion, imported `.props`/`.targets`, and `Using Remove` are not evaluated. Razor-only support synthesizes inheritance declarations; it does not compile Razor or extract members from `@code` blocks.

Declare extension services by the types actually registered for injection. For example, both speech packages use `"services": ["IRecognizerProvider", "ISynthesizerProvider"]`, not their provider implementation classes.

Generation errors and explicitly empty paths return a nonzero process exit code so MSBuild and CI can stop.

Run the integration checks with PowerShell:

```powershell
.\tools\BootstrapBlazor.LLMsDocsGenerator\tests\Verify-Generation.ps1
```

### Example

With the `BootstrapBlazor` and `BootstrapBlazor.Extensions` repositories checked out as sibling directories, run from the `BootstrapBlazor` repository root and point both options at the server project:

```bash
llms-docs --root src/BootstrapBlazor.Server --output src/BootstrapBlazor.Server
```

This reads components from `src/BootstrapBlazor` and produces:

```
src/BootstrapBlazor.Server/wwwroot/llms/llms.txt
src/BootstrapBlazor.Server/wwwroot/llms/components/*.txt
src/BootstrapBlazor.Server/wwwroot/llms/extensions/*.txt
```

The index groups extension docs by package, for example `BootstrapBlazor.Region`; `SelectCity` is generated as `extensions/SelectCity.txt`.

From the same `BootstrapBlazor` repository root, run the sibling source project:

```powershell
dotnet run --project "..\BootstrapBlazor.Extensions\tools\BootstrapBlazor.LLMsDocsGenerator" --root "src\BootstrapBlazor.Server" --output "src\BootstrapBlazor.Server"
```

## CI/CD Integration

Check out both repositories as siblings and use an SDK matching the checked-out generator project. The following steps assume the workflow belongs to `dotnetcore/BootstrapBlazor`; pin compatible refs when building a release:

```yaml
- uses: actions/checkout@v4
  with:
    path: BootstrapBlazor
- uses: actions/checkout@v4
  with:
    repository: BootstrapBlazor/BootstrapBlazor.Extensions
    path: BootstrapBlazor.Extensions
- uses: actions/setup-dotnet@v4
  with:
    dotnet-version: '11.0.x'
    dotnet-quality: 'preview'
- name: Generate LLM Documentation
  working-directory: BootstrapBlazor
  run: >
    dotnet run --project ../BootstrapBlazor.Extensions/tools/BootstrapBlazor.LLMsDocsGenerator
    --root src/BootstrapBlazor.Server
    --output src/BootstrapBlazor.Server
```

The BB Server publish target instead restores and runs the local `llms-docs` tool pinned in BB's `dotnet-tools.json`. Its working directory is the Server project directory (`$(MSBuildThisFileDirectory)`); it uses the default `--root` and passes only `--output` with the absolute publish directory. Editing generator source does not update that package; publish a new tool version supporting these defaults and update the manifest before using the simplified target.

## Output Format

Documentation is generated in Chinese, extracted from the bilingual `<para lang="zh">` blocks in the source XML comments. Each component file (`components/<ComponentName>.txt`) contains markdown like:

```markdown
# BootstrapBlazor Table

Component summary from XML comments

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
