---
name: bootstrapblazor
description: 涉及 BootstrapBlazor（简称 BB / bb，如“BB 组件”“bb 的 Table”“用 bb 写表格”）的组件参数、事件回调、公开方法、用法时使用，通过 bb-llms CLI 获取官方组件 API 文档，避免臆造参数。
---

# BootstrapBlazor 组件文档查询

当任务涉及 BootstrapBlazor（简称 **BB** / **bb**，下同）组件（编写或修改 .razor、配置组件参数、调用组件方法等）时，优先用 `bb-llms` 获取**权威**组件 API。

> 用户说“BB 组件”“bb 的 Table”“用 bb 写个表格”等时，BB / bb 均指 BootstrapBlazor，按本流程查询。

## 用法

1. 不确定组件名时先搜索：
   ```bash
   bb-llms search <关键词>
   ```
2. 获取某组件的参数 / 事件 / 方法文档：
   ```bash
   bb-llms get <ComponentName>     # 例：bb-llms get Table
   ```
3. 浏览全部组件：
   ```bash
   bb-llms list
   ```

输出为 Markdown（参数表、事件回调、公开方法、GitHub 源码链接）。文档源默认 https://www.blazor.zone/llms ，自动本地缓存；可用环境变量 `BB_LLMS_BASE_URL` 或 `--base-url` 指向自建/本地源。

## 前置条件

需已安装该工具（命令名 `bb-llms`）：

```bash
dotnet tool install -g BootstrapBlazor.LLMsDocs.Cli
```
