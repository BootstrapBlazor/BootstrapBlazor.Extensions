---
name: bb-meilisearch
description: 随 BootstrapBlazor.MeiliSearch NuGet 包提供的 API 参考。需要集成 MeiliSearch 搜索框、查询相关组件或服务的公开 API，或修复相关调用错误时使用。
---

# MeiliSearch API 参考

此 skill 随 `BootstrapBlazor.MeiliSearch` NuGet 包分发，用于集成 MeiliSearch 搜索框。参考文档从打包时的工程源码生成。

先阅读 [references/llms.txt](references/llms.txt) 确认当前包收录的组件和服务，再按需读取对应的 API 文档：

- [MeiliSearchBox](references/components/MeiliSearchBox.txt)

以文档中的参数、事件回调和公开方法签名为准；需要服务注册时，检查对应文档中的注册说明。不要将其他包中名称相似的组件或服务混用。

优先读取当前项目实际还原版本的文档，不要选择全局缓存中的最高版本，也不要凭记忆编造 API。

文档仅分析当前工程源码，外部基类和 Razor `@code` 中的成员可能未收录。需要继承成员、配套类型或未收录的注册方式时，应查询项目实际引用版本的源码或资料；资料不可用时说明缺失，不要猜测。

此 skill 为只读参考资料，不包含脚本。
