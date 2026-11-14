## BootstrapBlazor 组件文档

涉及 BootstrapBlazor（简称 BB / bb）的组件、参数、事件、方法或服务时，不要凭记忆臆造 API。优先使用当前项目实际还原的 NuGet 包文档：

1. 确定与当前任务相关的项目，读取其 `obj/project.assets.json`。如果项目尚未还原，提示用户还原，并继续执行下面的官网兜底；不要选择全局缓存中的最新版本。
2. 使用 `dnx dotnet-inspect -y -- project <项目.csproj> -S Skills --jsonl` 发现项目依赖的 skill。选择当前项目实际解析的 BootstrapBlazor 包中的 `bb-api`（旧版包名为 `bootstrapblazor`），并用 `dnx dotnet-inspect -y -- project <项目.csproj> -S Skills --print --row <行号> --raw` 读取它。
3. 根据 `project.assets.json` 的 `packageFolders` 和 `libraries` 中对应 `<PackageId>/<Version>` 的 `path`，定位该版本的 `skills/bb-api` 目录。按其 `SKILL.md` 指引读取 `references` 中的相关文档。`--print` 只输出 skill 内容，不能代替旁边的参考文件。多个项目或目标框架使用不同版本时，使用当前任务对应的版本。
4. 如果 `dotnet-inspect` 不可用、未找到 skill 或无法读取自定义 NuGet 缓存，仍先尝试根据上述还原数据直接读取包内 skill 和参考文件。

本地找不到所需信息时，必须执行 `bb-llms get <ComponentName> --base-url https://www.blazor.zone/llms --no-cache` 查询官网文档；不确定组件名称时先执行 `bb-llms search <关键词> --base-url https://www.blazor.zone/llms --no-cache`。旧版包内 skill 要求不回退官网时，按本入口的兜底规则执行。不要只提示还原或用网页搜索代替此步骤。使用官网结果时说明其版本可能与项目引用的版本不同；命令或官网不可用时报告原因，不要编造 API。
