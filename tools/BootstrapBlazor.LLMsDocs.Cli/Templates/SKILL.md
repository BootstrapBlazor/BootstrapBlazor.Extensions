---
name: bootstrapblazor
description: 涉及 BootstrapBlazor（简称 BB / bb，如“BB 组件”“bb 的 Table”“用 bb 写表格”）及其扩展组件的参数、事件回调、公开方法、用法时使用，通过 bb-llms CLI 按当前项目包版本查询 API，避免臆造参数或假设组件所属包。
---

# BootstrapBlazor 组件文档查询

当任务涉及 BootstrapBlazor（简称 **BB** / **bb**，下同）及其扩展组件（编写或修改 `.razor`、配置组件参数、调用组件方法等）时，优先用 `bb-llms` 获取 API 文档，不要凭记忆臆造参数。

> 用户说“BB 组件”“bb 的 Table”“用 bb 写个表格”等时，BB / bb 均指 BootstrapBlazor，按本流程查询。

## 查询流程

在当前项目目录运行命令，使 CLI 能按项目实际还原的 NuGet 包及其版本查询包内文档。包内文档由各包提供的 skill 及其 `references/llms.txt` 索引组成；组件可能来自核心包、任一扩展包，或作为服务记录在索引中。**不要仅凭组件名推断所属包**，由索引解析归属。

1. 已知准确名称时直接获取文档；CLI 会按索引解析文档来源，不要求组件来自 `BootstrapBlazor` 核心包：
   ```bash
   bb-llms get <ComponentName>     # 例：bb-llms get Table
   ```
2. 不确定准确名称或需要确认是否有对应文档时，先搜索。搜索结果合并当前项目包与官网索引：
   ```bash
   bb-llms search <关键词>
   ```
3. 获取搜索结果中的准确名称对应的参数 / 事件 / 方法文档：
   ```bash
   bb-llms get <搜索结果中的名称>
   ```
4. 浏览索引中的条目：
   ```bash
   bb-llms list
   ```

`get` 优先读取当前项目已还原包内、与引用版本对应的文档；本地没有该文档时回退官网。`search`、`list` 合并项目包与官网索引，因此组件不在当前项目的包里时也可能找到官网文档。若有多个项目或还原目标，使用 `--project` / `--framework` 指定；项目尚未还原时，CLI 可能只能回退官网，版本可能与项目引用不同。找不到名称时先用 `search` 定位，不要仅据此判断组件不存在。

输出为 Markdown（参数表、事件回调、公开方法、GitHub 源码链接）。官网源默认 `https://www.blazor.zone/llms`，按需联网并本地缓存；可用环境变量 `BB_LLMS_BASE_URL` 或 `--base-url` 指向自建/本地源。

## 前置条件

需已安装该工具（命令名 `bb-llms`）：

```bash
dotnet tool install -g BootstrapBlazor.LLMsDocs.Cli
```
