# BootstrapBlazor LLMs Docs CLI（`bb-llms`）

一个轻量命令行工具，用于从 [www.blazor.zone/llms](https://www.blazor.zone/llms)
拉取 BootstrapBlazor 及 BootstrapBlazor.Extensions 组件的**官方 API 文档**（参数、事件回调、公开方法、源码链接），
供 AI agent（Copilot CLI / Claude Code / Cursor / Trae / Codex 等）和开发者查询。

组件文档由官网的 `BootstrapBlazor.LLMsDocsGenerator`（生产者，CI 侧用 Roslyn 生成并发布）产出，
本工具是**消费者**：只负责按需 HTTP 拉取已生成的 `.txt` 文档并本地缓存，
**不克隆仓库、不做源码分析**。详见文末「设计说明」。

---

## 安装

### 前置条件

- 已安装 **.NET 11 SDK**（当前源码目标为 `net11.0`）。

### 全局安装

```bash
dotnet tool install -g BootstrapBlazor.LLMsDocs.Cli
```

安装后得到命令 `bb-llms`。验证：

```bash
bb-llms --help
bb-llms get Button     # 能打印 Button 的 API 文档即安装成功
```

不带参数运行 `bb-llms` 会显示帮助信息。

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
bb-llms get SelectCity        # 拉取 Region 扩展包中 SelectCity 的 API 文档
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

- `get` / `index` 的输出保留远程 `.txt` 原文；`get` 会先解析 `llms.txt`，按名称找到文档路径，再直接读取核心或扩展文档，不通过请求失败来尝试其他目录。本地源也必须包含该索引。
- `list` / `search` 包括组件和服务，默认输出 **JSON**；`isExtension` 表示文档位于 `extensions/`，不表示接口源码一定声明在扩展仓库。加 `--format text` 输出纯文本（`Name - 描述` 每行一条）。
- `search --limit` 默认 `20`，取值范围会被限制在 `1~100`。
- `search` 按文档路径去重后应用结果数量限制，避免多个包共用的服务占满结果；`list` 保留各包的索引项。
- 找不到组件时 `get` 退出码非 0，并提示用 `bb-llms search <关键词>` 重新定位。
- 索引缺失、索引中没有对应名称、目标文档缺失均返回非零退出码，并保留具体失败原因；不会把缺少 `llms.txt` 误报为组件不存在。

示例：

```bash
bb-llms search button --limit 5      # 最多 5 条，Button 类优先
bb-llms list --query table           # 仅名称/描述含 "table" 的组件
bb-llms list --format text           # 纯文本清单
bb-llms get Table                    # Table 的参数表 / 事件 / 方法 / GitHub 源码链接
bb-llms get SelectCity               # BootstrapBlazor.Region 扩展包的 SelectCity 文档
bb-llms get IRecognizerProvider      # 共享服务接口，按包列出 Azure/Baidu 注册方式
```

多个扩展包共用一个接口时，各包的索引项指向同一份服务文档；按实际使用的包选择其中一种注册方式，不要全部复制执行。

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

索引同样缓存。`get` 在缓存索引中找不到名称时，会自动回源刷新一次索引后重试，便于发现新增组件或扩展服务；刷新后仍不存在才报错。索引已回源、指定了 `--refresh` / `--no-cache` 或使用本地目录时，不会重复刷新。已有文档内容仍遵循 24 小时缓存，可使用 `bb-llms get SelectCity --refresh` 立即刷新索引及目标文档。此自动刷新行为需要更新到包含该功能的 CLI 版本。

---

## 给 AI agent 使用（发现层）

一个躺在 `PATH` 上的 CLI 对 agent 是「隐形」的。以下脚手架命令安装入口指令：
涉及 BootstrapBlazor 时，agent 优先发现当前项目实际还原的 NuGet 包内 skill 和参考文档；
本地找不到所需信息时，才使用 `bb-llms` 查询官网。

```bash
bb-llms instructions                 # 打印可粘贴进 CLAUDE.md / AGENTS.md 的通用片段
bb-llms install --client copilot     # 写 ~/.copilot/skills/bootstrapblazor/SKILL.md
bb-llms install --client claude      # 写 ~/.claude/skills/bootstrapblazor/SKILL.md
bb-llms install --client cursor      # 写 ~/.cursor/rules/bootstrapblazor.mdc
bb-llms install --client trae        # 写 ~/.trae/skills/bootstrapblazor/SKILL.md
bb-llms install --client codex       # 写 ~/.codex/AGENTS.md
bb-llms install --client all         # 五者都写（默认）
```

`install` 选项：

```
--client copilot|claude|cursor|trae|codex|all   目标客户端（默认 all）
--scope  user|project        user=用户主目录（默认），project=当前目录
--target <dir>               覆盖写入的根目录
--force                      覆盖已存在的文件（默认存在则跳过）
```

> 默认 scope 为 **user（用户主目录）**：发现文件装到各客户端的用户目录，
> 包括 `~/.copilot/skills/`、`~/.claude/skills/`、`~/.cursor/rules/`、
> `~/.trae/skills/` 和 `~/.codex/AGENTS.md`。
> 需要只对当前项目生效时，用 `--scope project` 显式覆盖
> （如 `--client copilot --scope project` 写 `.github/skills/`，`--client codex --scope project` 写仓库根目录的 `AGENTS.md`）。

自动加载取决于 agent 和权限设置，安装后可重启 agent 或重新加载其 skills。
入口通过 `dotnet-inspect` 发现还原后的包 skill；首次运行 `dnx` 可能需要联网。
若工具不可用，agent 仍可通过 `obj/project.assets.json` 定位包内文件。
包内 skill 名称为 `bb-api`。
本地缺少文档时查询官网，并说明官网版本可能与项目引用的版本不同。

接入方式：

- **Copilot CLI**：`bb-llms install --client copilot` 写入
  `~/.copilot/skills/bootstrapblazor/SKILL.md`；项目级安装写入
  `.github/skills/bootstrapblazor/SKILL.md`。

- **Claude Code**：`bb-llms install --client claude` 在用户目录 `~/.claude/skills/`
  写入一个 skill。
- **Cursor**：`bb-llms install --client cursor` 在**用户主目录** `~/.cursor/rules/`
  写入规则（匹配 `*.razor` / `*.razor.cs`），全局生效。
- **Trae**：`bb-llms install --client trae` 在用户目录 `~/.trae/skills/` 写入与 Claude 共用的 skill。
- **Codex**：`bb-llms install --client codex` 写入 `~/.codex/AGENTS.md`（用户主目录，默认；
  `--scope project` 则写仓库根目录的 `AGENTS.md`）。Codex 没有独立的 skill/规则机制，统一读 `AGENTS.md`，
  因此复用 `instructions` 的通用片段。
  > ⚠️ `AGENTS.md` 是手工维护的共享文件，**默认存在则跳过**；`--force` 会整文件覆盖，原有内容会丢失。
  > 已有 `AGENTS.md` 时，建议改用 `bb-llms instructions` 把片段手动粘进去。
- **通用 / 其他 agent**：把 `bb-llms instructions` 的输出粘进项目的 `CLAUDE.md` / `AGENTS.md`。

典型流程：

```bash
dotnet tool install -g BootstrapBlazor.LLMsDocs.Cli   # 1. 装工具
bb-llms install --client claude                       # 2. 装发现层（写入用户主目录，全局生效）
# 之后 agent 可按项目版本查询包内 API；本地缺失时查询官网
```

---

## 开发 / 本地运行

在 Extentions 仓库根目录执行 CLI 回归检查：

```powershell
dotnet build .\tools\BootstrapBlazor.LLMsDocs.Cli\BootstrapBlazor.LLMsDocs.Cli.csproj -c Release
```

```bash
cd tools/BootstrapBlazor.LLMsDocs.Cli
dotnet build
dotnet run -- get Button
dotnet run -- search table --limit 5
dotnet run -- get Button --base-url "<生成目录>/wwwroot/llms"
```

打包冒烟：

```bash
dotnet pack -c Release
dotnet tool install -g --add-source ./bin/Release BootstrapBlazor.LLMsDocs.Cli
bb-llms get Table
```

### 修改发现层模板

`instructions` / `install` 输出的模板正文是 `Templates/` 下的独立文件，**直接编辑这些文件即可**，无需改 C# 代码：

| 文件 | 对应命令 |
|---|---|
| `Templates/instructions.md` | 共享查询流程，供所有客户端和 `bb-llms instructions` 使用 |
| `Templates/SKILL.md` | Copilot、Claude、Trae skill 的元数据，与共享流程合并 |
| `Templates/bootstrapblazor.mdc` | Cursor 规则的元数据，与共享流程合并 |

这些文件以**嵌入资源**编入程序集（见 `.csproj`），因此全局安装后工具仍能在运行时读取到，无需依赖项目源码目录。改完重新 `dotnet build` / `dotnet pack` 即生效。

---

## 设计说明：运行时 vs 数据

本工具刻意做成「瘦客户端」，与文档内容彻底解耦：

- **`bb-llms`（运行时）**：只做「解析源 → 拉取 → 缓存 → 输出」，几乎零迭代。
- **`llms/` 下的 `.txt`（数据）**：由生产者 `LLMsDocsGenerator` 随每次发版更新。

因此装一次工具，新组件 / 新参数会**自动随远程文档更新**，无需重装。

**`llms.txt` 索引行的格式**是数据命令的契约：`list` / `search` 和 `get` 都会解析它
（`- [Name](components/Name.txt) - 描述` 行 + `### 分类` 标题），`index` 输出原文。换言之：

- 生产者改了文档**正文**：工具零感知，照常透传。
- 生产者改了**索引行格式**：需同步 `LlmsDocsClient` 的解析规则，否则也可能影响 `get`。

---

## License

Licensed under the Apache 2.0 License.
