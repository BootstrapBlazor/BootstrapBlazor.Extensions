## BootstrapBlazor 组件文档

需要 BootstrapBlazor（简称 BB / bb）组件的参数 / 事件 / 公开方法时，使用 `bb-llms` CLI 获取官方文档，不要凭记忆臆造 API：

- 查找组件名：`bb-llms search <关键词>`
- 获取组件文档：`bb-llms get <ComponentName>`（例：`bb-llms get Table`）
- 列出全部组件：`bb-llms list`

文档源默认 https://www.blazor.zone/llms ，按需联网拉取并本地缓存；可用环境变量 `BB_LLMS_BASE_URL` 或 `--base-url` 指向自建/本地源。
