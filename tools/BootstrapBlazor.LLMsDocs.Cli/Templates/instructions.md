## BootstrapBlazor 组件文档

需要 BootstrapBlazor（简称 BB / bb）及其扩展组件的参数 / 事件 / 公开方法时，在当前项目目录使用 `bb-llms` CLI 查询文档，不要凭记忆臆造 API。CLI 优先按当前项目实际还原的 NuGet 包及其版本读取包内 skill 文档；组件所属包由索引解析，不要仅凭组件名假设它来自核心包：

- 已知准确名称时获取文档：`bb-llms get <ComponentName>`（例：`bb-llms get Table`）
- 不确定准确名称时先搜索：`bb-llms search <关键词>`，再用搜索结果中的准确名称执行 `get`
- 浏览索引条目：`bb-llms list`

`get` 本地缺少文档时回退官网；`search` / `list` 合并项目包和官网索引。项目或还原目标不唯一时使用 `--project` / `--framework` 指定。官网源默认 https://www.blazor.zone/llms，按需联网拉取并本地缓存；可用环境变量 `BB_LLMS_BASE_URL` 或 `--base-url` 指向自建/本地源。
