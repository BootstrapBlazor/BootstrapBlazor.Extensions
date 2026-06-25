# BootstrapBlazor LLMs Docs CLI（`bb-llms`）

一个轻量命令行工具，用于从 [www.blazor.zone/llms](https://www.blazor.zone/llms)
拉取 BootstrapBlazor 组件的**官方 API 文档**（参数、事件回调、公开方法、源码链接），
供 AI agent（Claude Code / Cursor 等经 Bash 调用）和开发者查询。

组件文档由官网的 `BootstrapBlazor.LLMsDocsGenerator`（生产者，CI 侧用 Roslyn 生成并发布）产出，
本工具是**消费者**：只负责按需 HTTP 拉取已生成的 `.txt` 文档并本地缓存，
**不克隆仓库、不做源码分析**。详见文末「设计说明」。

---

## 安装

### 前置条件

- 已安装 **.NET 10 SDK**（提供 `dotnet tool` 能力）。

### 全局安装

```bash
dotnet tool install -g BootstrapBlazor.LLMsDocs.Cli
```

安装后得到命令 `bb-llms`。验证：

```bash
bb-llms --help
bb-llms get Button     # 能打印 Button 的 API 文档即安装成功
```

> 若提示找不到 `bb-llms`，请确认 `~/.dotnet/tools`（Windows 为 `%USERPROFILE%\.dotnet\tools`）
> 已在 `PATH` 中，或重开一个终端。

### 更新 / 卸载

```bash
dotnet tool update -g BootstrapBlazor.LLMsDocs.Cli
dotnet tool uninstall -g BootstrapBlazor.LLMsDocs.Cli
```

> 注意：**几乎不需要更新本工具**。新增组件、参数变化都来自远程文档的更新，工具自动拉取即可——
> 只有当工具本身发布了新命令或修复时才需要 `update`。

---

## 快速开始

```bash
bb-llms search table          # 按关键词搜索组件，定位准确名称
bb-llms get Table             # 拉取 Table 组件的完整 API 文档（核心命令）
bb-llms list                  # 列出全部组件
bb-llms index                 # 打印原始 llms.txt 索引
```

---

## 命令参考

### 数据命令

| 命令 | 说明 | 输出 |
|---|---|---|
| `bb-llms index` | 打印原始 `llms.txt` 索引 | 原始 Markdown |
| `bb-llms list [--query <q>]` | 列出组件，可按名称/描述过滤 | JSON（默认）/ text |
| `bb-llms search <query> [--limit <n>]` | 按名称或描述搜索，名称前缀匹配优先 | JSON（默认）/ text |
| `bb-llms get <Component>` | 拉取单个组件的 API 文档（**核心命令**） | 原始 Markdown |

要点：

- `get` / `index` 为**原样透传**，不解析格式，输出即远程 `.txt` 原文。
- `list` / `search` 默认输出 **JSON**；加 `--format text` 输出纯文本（`Name - 描述` 每行一条）。
- `search --limit` 默认 `20`，取值范围会被限制在 `1~100`。
- 找不到组件时 `get` 退出码非 0，并提示用 `bb-llms search <关键词>` 重新定位。

示例：

```bash
bb-llms search button --limit 5      # 最多 5 条，Button 类优先
bb-llms list --query table           # 仅名称/描述含 "table" 的组件
bb-llms list --format text           # 纯文本清单
bb-llms get Table                    # Table 的参数表 / 事件 / 方法 / GitHub 源码链接
```

### 源与缓存选项（数据命令通用）

```
--base-url <url|dir>   文档源：HTTP(S) 网址或本地目录路径
--refresh              忽略缓存 TTL，强制回源拉取（仍写缓存）
--no-cache             既不读也不写本地缓存
```

**文档源解析优先级**：`--base-url` > 环境变量 `BB_LLMS_BASE_URL` > 默认 `https://www.blazor.zone/llms`

```bash
# 用环境变量指向自建/镜像源
export BB_LLMS_BASE_URL=https://your-mirror.example.com/llms
bb-llms get Button

# 单次覆盖
bb-llms get Button --base-url https://your-mirror.example.com/llms
```

**本地目录源**：`--base-url` 也可以是一个本地目录（例如 `LLMsDocsGenerator` 生成的
`wwwroot/llms` 文件夹）。此时直接读盘、**绕过缓存**，适合离线使用或在文档发布前预览：

```bash
bb-llms get Button --base-url ./wwwroot/llms
```

### 缓存

- 远程源的响应缓存在：
  - Windows：`%LOCALAPPDATA%\bb-llms`
  - Linux / macOS：`~/.local/share/bb-llms`
- 每个文档存「内容文件 + 同名 `.meta.json`（记录 ETag 与拉取时间）」。
- **TTL 24 小时**：未过期直接用缓存；过期后带 `If-None-Match` 条件请求，
  服务端返回 `304` 则沿用旧内容并刷新时间戳，`200` 则写入新内容。
- 想强制拿最新：`--refresh`；完全不碰缓存目录：`--no-cache`。

> 含义：官网发版后，最长 24 小时本地才会感知到文档更新（用 `--refresh` 可立即刷新）。

---

## 给 AI agent 使用（发现层）

一个躺在 `PATH` 上的 CLI 对 agent 是「隐形」的——必须有指令文件告诉 agent
「需要 BootstrapBlazor 组件 API 时去跑 `bb-llms get <Name>`」。
以下两个脚手架命令负责把这层「发现 / 触发」一键装好：

```bash
bb-llms instructions                 # 打印可粘贴进 CLAUDE.md / AGENTS.md 的通用片段
bb-llms install --client claude      # 写 .claude/skills/bootstrapblazor/SKILL.md
bb-llms install --client cursor      # 写 .cursor/rules/bootstrapblazor.mdc
bb-llms install --client trae        # 写 .trae/skills/bootstrapblazor/SKILL.md
bb-llms install --client all         # 三者都写（默认）
```

`install` 选项：

```
--client claude|cursor|trae|all   目标客户端（默认 all）
--scope  project|user        project=当前目录（默认），user=用户主目录
--target <dir>               覆盖写入的根目录
--force                      覆盖已存在的文件（默认存在则跳过）
```

四套生态接入方式：

- **Claude Code**：`bb-llms install --client claude` 写入一个 skill，Claude Code 会根据其
  `description` 在任务涉及 BootstrapBlazor 组件时**自动加载**并调用 `bb-llms`，
  等效于 MCP server 的自动发现。
- **Cursor**：`bb-llms install --client cursor` 写入项目规则（匹配 `*.razor` / `*.razor.cs`）。
- **Trae**：`bb-llms install --client trae` 写入一个 skill（`.trae/skills/bootstrapblazor/SKILL.md`）。
  Trae 的 skill 与 Claude 同构（同样的 `SKILL.md` + name/description frontmatter，按描述**自动匹配**），
  因此复用同一套模板。
- **通用 / 其他 agent**：把 `bb-llms instructions` 的输出粘进项目的 `CLAUDE.md` / `AGENTS.md`。

典型流程（在你的 Blazor 项目根目录）：

```bash
dotnet tool install -g BootstrapBlazor.LLMsDocs.Cli   # 1. 装工具
bb-llms install --client claude                       # 2. 装发现层
# 之后在 Claude Code 中让它写/改组件代码时，会自动用 bb-llms 查权威 API
```

---

## 开发 / 本地运行

```bash
cd tools/BootstrapBlazor.LLMsDocs.Cli
dotnet build
dotnet run -- get Button
dotnet run -- search table --limit 5
dotnet run -- get Button --base-url ../BootstrapBlazor.LLMsDocsGenerator/<生成目录>/llms
```

打包冒烟：

```bash
dotnet pack -c Release
dotnet tool install -g --add-source ./bin/Release BootstrapBlazor.LLMsDocs.Cli
bb-llms get Table
```

---

## 设计说明：运行时 vs 数据

本工具刻意做成「瘦客户端」，与文档内容彻底解耦：

- **`bb-llms`（运行时）**：只做「解析源 → 拉取 → 缓存 → 输出」，几乎零迭代。
- **`llms/` 下的 `.txt`（数据）**：由生产者 `LLMsDocsGenerator` 随每次发版更新。

因此装一次工具，新组件 / 新参数会**自动随远程文档更新**，无需重装。

唯一的隐式契约是 **`llms.txt` 索引行的格式**——只有 `list` / `search` 会解析它
（`- [Name](components/Name.txt) - 描述` 行 + `### 分类` 标题）。核心命令 `get` / `index`
是纯透传，**与格式无关**，永远不受生产者格式调整影响。换言之：

- 生产者改了文档**正文**：工具零感知，照常透传。
- 生产者改了**索引行格式**：只需同步 `LlmsDocsClient` 里的两条正则，`get` 不受影响。

---

## License

Licensed under the Apache 2.0 License.
