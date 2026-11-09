# BootstrapBlazor.LLMsDocsGenerator

[English](./README.md) | 简体中文

自动为 BootstrapBlazor 组件生成 LLM 友好文档的 .NET 工具。

## 目的

AI 编程助手（Claude Code、Cursor、GitHub Copilot）经常因为缺乏准确的组件 API 信息而生成错误的 UI 代码。本工具通过以下方式解决这个问题：

1. **使用 Roslyn 自动生成参数表** - 从源代码提取
2. **提供 GitHub 源码链接** - 方便深入查阅
3. **每个组件单独成文件** - 让 Agent 只加载所需的 API

## 架构

```
┌─────────────────────────────────────────────────────────────┐
│                BootstrapBlazor.LLMsDocsGenerator             │
├─────────────────────────────────────────────────────────────┤
│  ComponentAnalyzer     → 基于 Roslyn 的源码解析器            │
│  MarkdownBuilder       → 生成 Markdown 文档                  │
│  DocsGenerator         → 协调生成流程                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              输出目录: <output>/wwwroot/llms/               │
├─────────────────────────────────────────────────────────────┤
│  llms.txt              → 索引文件，包含快速入门指南           │
│  components/           → 单独的组件文档目录                   │
│    ├── Button.txt      → Button 组件 API 参考                │
│    ├── Table.txt       → Table 组件 API 参考                 │
│    ├── Select.txt      → Select 组件 API 参考                │
│    └── ...             → 每个组件一个文件                     │
│  extensions/           → BootstrapBlazor.Extensions 文档     │
│    ├── SelectCity.txt  → 扩展组件 API 参考                   │
│    └── ...             → 每个扩展类型一个文件                 │
└─────────────────────────────────────────────────────────────┘
```

### 为什么每个组件单独一个文件？

这种设计针对 LLM 和 Code Agent 进行了优化：

| 方面 | 按分类（旧方案） | 按组件（新方案） |
|------|-----------------|-----------------|
| **精确性** | ❌ 加载无关组件 | ✅ 只加载需要的 API |
| **Token 效率** | ❌ 浪费 token 在无关数据上 | ✅ 最小化上下文加载 |
| **缓存友好** | ❌ 需重新生成整个分类 | ✅ 只更新单个文件 |
| **RAG 检索** | ❌ 粗粒度匹配 | ✅ 细粒度匹配 |

## 工作原理

### 1. 源码分析

`ComponentAnalyzer` 使用 Roslyn 解析 C# 源文件，扫描标记了 `[Parameter]` 特性的属性，并提取其 XML 文档注释。

### 2. 文档生成

`MarkdownBuilder` 生成结构化的 Markdown，包含：

- 参数表（名称、类型、默认值、描述）
- 事件回调部分
- 公共方法
- GitHub 源码链接

### 3. 组件组织

组件在索引中按类别组织便于导航，但每个组件有独立的文档文件：

| 类别 | 组件示例 |
|------|----------|
| table | Table, SelectTable, TableToolbar |
| input | BootstrapInput, Textarea, OtpInput |
| select | Select, AutoComplete, Cascader |
| button | Button, PopConfirmButton |
| dialog | Modal, Drawer, Toast |
| nav | Menu, Tab, Breadcrumb |
| card | Card, Collapse, GroupBox |
| treeview | TreeView, Tree |
| form | ValidateForm, EditorForm |
| other | 其他所有组件 |

## 环境要求

- 与工程 `TargetFrameworks` 匹配的 SDK（当前源码构建使用 .NET 11）。
- 本地 `BootstrapBlazor` 仓库；`docs.json` 配置了扩展包时，还需要同级的 `BootstrapBlazor.Extensions` 仓库。生成器不会自动克隆仓库。

## 安装

### 从源代码运行

在 `BootstrapBlazor.Extensions` 仓库根目录执行：

```powershell
dotnet run --project tools\BootstrapBlazor.LLMsDocsGenerator --root "..\BootstrapBlazor\src\BootstrapBlazor.Server" --output "..\BootstrapBlazor\src\BootstrapBlazor.Server"
```

### 作为全局工具安装

从本地构建产物打包并安装：

```bash
dotnet pack tools/BootstrapBlazor.LLMsDocsGenerator -c Release
dotnet tool install --global --add-source ./tools/BootstrapBlazor.LLMsDocsGenerator/bin/Release BootstrapBlazor.LLMsDocsGenerator
```

更新 / 卸载：

```bash
dotnet tool update --global BootstrapBlazor.LLMsDocsGenerator
dotnet tool uninstall --global BootstrapBlazor.LLMsDocsGenerator
```

安装后，使用 `llms-docs` 命令调用。

## 使用方法

两个参数均可省略，各自默认为当前工作目录（`.`）。在 BB 的 `src/BootstrapBlazor.Server` 目录直接执行 `llms-docs` 即可将文档生成到该工程。覆盖 `--root` 不会改变 `--output` 的默认值；使用其他仓库或发布目录时请分别指定。

在 Server 工程目录运行时也支持 `dotnet llms-docs --output=bin\Release\publish\`，省略的 `--root` 使用 `.`，相对输出路径也基于当前 Server 目录解析。MSBuild 中可使用 `dotnet llms-docs --output=$(PublishDir)`（路径不含空格时）。

| 选项 | 必需 | 说明 |
|------|------|------|
| `--root` | 否 | 项目根目录，默认为 `.`。组件源码从 `<root>/../BootstrapBlazor` 读取。 |
| `--output` | 否 | 发布目录，默认为 `.`。文档生成到 `<output>/wwwroot/llms/`。 |

当 `BootstrapBlazor.Extensions` 仓库与核心 `BootstrapBlazor` 仓库并列存在时，生成器也会分析扩展仓库源码。需在 `src/BootstrapBlazor.Server/docs.json` 的 `extensions` 节中配置要生成文档的扩展包和类型；这是唯一配置位置，文件不存在时生成失败。扩展文档会写入 `extensions/` 目录。

仅扫描 `BootstrapBlazor.Extensions.slnx` 中列出的源码工程，按工程文件名而非目录名匹配扩展包。配置中不属于解决方案的包会输出提示并跳过；解决方案引用了不存在的工程时会报错。磁盘上残留的其他目录不会参与分析。核心库中仅有 `.razor` 文件、通过 `@inherits` 指定基类的组件也支持生成文档。重新生成时会清理带有 `<!-- Generated: ... -->` 标记的过期 `.txt` 文档，保留其他文件。

配置了扩展包但缺少同级扩展源码仓库时，生成会失败且不改动已有文档。配置中的组件或服务类型无法解析时，也会在写入文件、清理过期文档之前报错。多个包共用的服务接口仍使用一份文档，按配置的包分别列出注册方法，使用时选择对应包的注册方式。

源码工程 `.csproj` 中显式声明的 `<Using Include="..." />`（包括别名和静态导入）会应用到该工程的 C# 文件，不会在合并分析时泄漏到其他工程。

此工具进行源码分析，不执行完整的 MSBuild 求值：不处理条件、属性展开、导入的 `.props`/`.targets` 及 `Using Remove`。纯 Razor 支持仅合成继承声明，不编译 Razor，也不提取 `@code` 块中的成员。

扩展服务应配置实际用于依赖注入的注册类型。例如，两个语音包均使用 `"services": ["IRecognizerProvider", "ISynthesizerProvider"]`，而不是 Provider 实现类。

生成错误或显式传入空路径时会返回非零进程退出码，便于 MSBuild 和 CI 中止。

使用 PowerShell 执行集成检查：

```powershell
.\tools\BootstrapBlazor.LLMsDocsGenerator\tests\Verify-Generation.ps1
```

### 示例

将 `BootstrapBlazor` 与 `BootstrapBlazor.Extensions` 仓库放在同级目录后，在 BootstrapBlazor 仓库根目录执行，两个选项都指向 Server 项目：

```bash
llms-docs --root src/BootstrapBlazor.Server --output src/BootstrapBlazor.Server
```

它会从 `src/BootstrapBlazor` 读取组件，并生成：

```
src/BootstrapBlazor.Server/wwwroot/llms/llms.txt
src/BootstrapBlazor.Server/wwwroot/llms/components/*.txt
src/BootstrapBlazor.Server/wwwroot/llms/extensions/*.txt
```

索引会按扩展包分组，例如 `BootstrapBlazor.Region`；`SelectCity` 文档生成到 `extensions/SelectCity.txt`。

仍在 `BootstrapBlazor` 仓库根目录，通过同级仓库的源码工程执行：

```powershell
dotnet run --project "..\BootstrapBlazor.Extensions\tools\BootstrapBlazor.LLMsDocsGenerator" --root "src\BootstrapBlazor.Server" --output "src\BootstrapBlazor.Server"
```

## CI/CD 集成

将两个仓库检出到同级目录，使用与生成器工程匹配的 SDK。以下步骤假定工作流位于 `dotnetcore/BootstrapBlazor` 仓库；构建发布版本时请固定兼容的 ref：

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

BB Server 的发布 target 则还原并运行 BB 的 `dotnet-tools.json` 固定版本的本地 `llms-docs` 工具。执行目录固定为 Server 工程目录（`$(MSBuildThisFileDirectory)`），使用默认 `--root`，仅传入实际发布目录的绝对路径 `--output`。修改生成器源码不会自动更新该工具包；使用简化后的 target 前，需发布支持默认参数的新版本并更新工具清单。

## 输出格式

文档统一生成中文版本，从 XML 注释的双语 `<para lang="zh">` 块中提取。每个组件文件（`components/<组件名>.txt`）的 Markdown 内容形如：

```markdown
# BootstrapBlazor Table

来自 XML 注释的组件描述

### Type Parameters
- `TItem` - 泛型类型参数

### Parameters
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| Items | `List<TItem>` | - | 数据源 |
| ShowToolbar | `bool` | false | 显示工具栏 |

### Event Callbacks
| Event | Type | Description |
|-------|------|-------------|
| OnClick | `EventCallback` | 点击处理器 |

### Public Methods
- `Task RefreshAsync()` - 刷新数据

### Source
- 组件: [src/.../Component.razor.cs](GitHub 链接)
- 示例: [src/.../Samples/Components.razor](GitHub 链接)
```

## 库用户使用指南

用户可以在自己的项目中创建 `llms.txt` 来引用本文档：

```markdown
# 我的项目

## 依赖

### BootstrapBlazor
- 文档索引: https://www.blazor.zone/llms/llms.txt
- Button: https://www.blazor.zone/llms/components/Button.txt
- Table: https://www.blazor.zone/llms/components/Table.txt
- Modal: https://www.blazor.zone/llms/components/Modal.txt
```

LLM 代理可以：

1. 先读取 `llms.txt` 了解有哪些组件
2. 然后获取 `components/{组件名}.txt` 获取详细 API 信息
```
