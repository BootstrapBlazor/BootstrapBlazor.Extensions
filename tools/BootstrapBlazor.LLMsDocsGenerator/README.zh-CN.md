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

- .NET 10 SDK

## 安装

### 从源代码运行

```bash
dotnet run --project tools/BootstrapBlazor.LLMsDocsGenerator -- --root <ROOT> --output <OUTPUT>
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

生成器要求**同时**提供 `--root` 和 `--output`，缺少任意一个都会直接退出且不生成任何文件。

| 选项 | 必需 | 说明 |
|------|------|------|
| `--root` | 是 | 项目根目录。组件源码从 `<root>/../BootstrapBlazor` 读取，因此通常指向 `BootstrapBlazor.Server` 项目目录。 |
| `--output` | 是 | 发布目录。文档生成到 `<output>/wwwroot/llms/`。 |

### 示例

在 BootstrapBlazor 仓库根目录下执行，两个选项都指向 Server 项目：

```bash
llms-docs --root src/BootstrapBlazor.Server --output src/BootstrapBlazor.Server
```

它会从 `src/BootstrapBlazor` 读取组件，并生成：

```
src/BootstrapBlazor.Server/wwwroot/llms/llms.txt
src/BootstrapBlazor.Server/wwwroot/llms/components/*.txt
```

通过 `dotnet run` 执行同样的命令：

```bash
dotnet run --project tools/BootstrapBlazor.LLMsDocsGenerator -- --root src/BootstrapBlazor.Server --output src/BootstrapBlazor.Server
```

## CI/CD 集成

在发布文档站点的工作流中重新生成文档：

```yaml
- name: Generate LLM Documentation
  run: >
    dotnet run --project tools/BootstrapBlazor.LLMsDocsGenerator --
    --root src/BootstrapBlazor.Server
    --output src/BootstrapBlazor.Server
```

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
