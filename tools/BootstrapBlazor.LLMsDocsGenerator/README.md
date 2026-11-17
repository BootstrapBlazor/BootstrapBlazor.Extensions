# BootstrapBlazor.LLMsDocsGenerator

English | [简体中文](./README.zh-CN.md)

A .NET tool that generates LLM-friendly API documentation from a project's component and service source code. Single-project generation requires only the target project, with no sibling repository required.

## Requirements

- An SDK matching the tool project's target framework (currently .NET 11 for source builds).
- The target project's `.csproj` and source files.

## Installation

Pack from this repository's root and install the tool:

```powershell
dotnet pack tools\BootstrapBlazor.LLMsDocsGenerator -c Release
dotnet tool install --global --add-source .\tools\BootstrapBlazor.LLMsDocsGenerator\bin\Release BootstrapBlazor.LLMsDocsGenerator
```

Update or uninstall:

```powershell
dotnet tool update --global BootstrapBlazor.LLMsDocsGenerator
dotnet tool uninstall --global BootstrapBlazor.LLMsDocsGenerator
```

The command name is `llms-docs`.

## Single-project usage

Run from the target project's directory:

```powershell
llms-docs --output ".\artifacts\llms"
```

Or specify the project from another directory:

```powershell
llms-docs --project ".\src\MyComponents\MyComponents.csproj" --output ".\artifacts\llms"
```

`--project` also accepts a directory containing exactly one `.csproj`.

| Option | Description |
|--------|-------------|
| `--project` | Target project file or directory. Omit to analyze the project in the current working directory. |
| `--output` | Output directory, defaulting to the current working directory. Documentation is written directly into it. |

Without arguments, `llms-docs` analyzes the project in the current working directory and writes documentation there. It does not search parent, child or sibling directories for another project. Relative paths are resolved from the current working directory. Generation errors and explicitly empty paths return a nonzero exit code.

## Output

```text
<output>\
  llms.txt
  components\
    MyComponent.txt
    IExampleService.txt
    ServiceCollectionExtensions.txt
```

`llms.txt` indexes the project's components and services using relative links. Each type has its own Markdown document, so an agent can load only the API it needs:

- Parameters, types, defaults and descriptions
- Event callbacks and public methods
- Generic type parameters and base type
- Discoverable service registration methods
- Source links when the repository is recognized

Documentation uses Chinese text from bilingual XML comments, falling back to available text. Component-only, service-only and registration-extension-only projects are supported; generation fails if no supported types are found. Duplicate names that would overwrite files also cause generation to fail.

The output directory is created if needed. Existing contents are not cleared; only stale `.txt` documents carrying the generator's marker are removed. Unmarked files and subdirectories are preserved.

## Analysis scope and limitations

The analyzer uses Roslyn to scan project source and collect `[Parameter]` properties, event callbacks, public methods and XML comments. Locally resolvable base members are included. Services are discovered from public, non-obsolete top-level types: interfaces under `Services`, interfaces ending in `Service` or `Provider`, and non-static classes ending in `Service` or `Provider`.

Public, non-obsolete top-level static classes containing public, non-obsolete `Add*` or `TryAdd*` extension methods on `IServiceCollection` are also included. Only those registration methods are documented, preserving their source signatures, including the `this` receiver, generic parameters and constraints, and optional defaults. They appear in a separate index section, not as injectable services. Receiver types are matched by name because dependency metadata is not loaded; external service interfaces, implementations and configuration types are not copied into the output.

This is source analysis, not a complete MSBuild or Razor compilation:

- External base members and service interfaces may be missing.
- Razor inheritance declarations are synthesized; members inside `@code` blocks are not extracted.
- Explicit project `<Using Include="..." />` items are supported, including aliases and static imports.
- Conditions, property expansion, imported `.props`/`.targets`, and `Using Remove` are not evaluated.

The index notes the source-analysis limitations. The generator produces reference documents only; it does not create or install a skill.

## Validation

From this repository's root, build and run integration checks with PowerShell 7:

```powershell
dotnet build .\tools\BootstrapBlazor.LLMsDocsGenerator -c Release
.\tools\BootstrapBlazor.LLMsDocsGenerator\tests\Verify-SingleProject.ps1
```
