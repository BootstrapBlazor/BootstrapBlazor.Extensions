---
name: bb-opcda
description: 随 BootstrapBlazor.OpcDa NuGet 包提供的服务接入参考。需要接入 Windows OPC DA 客户端服务、查询服务注册方法与配置委托签名，或修复相关调用错误时使用。
---

# OpcDa 服务接入参考

此 skill 随 `BootstrapBlazor.OpcDa` NuGet 包分发，用于接入 Windows OPC DA 客户端服务。参考文档从打包时的工程源码生成。

先阅读 [references/llms.txt](references/llms.txt)，再按需读取本包的注册 API 文档：

- [ServiceCollectionExtensions](references/components/ServiceCollectionExtensions.txt)

使用 AddOpcDaClient 注册，旧的 AddOpcDaServer 已过时。该入口要求 Windows；IOpcDaClient 的连接、读写及订阅 API 需查询本包对应版本资料。

注册扩展类不是可注入的服务。生成文档主要覆盖注册入口；服务接口、选项类型和其他辅助方法可能未收录，应查询对应包实际引用版本的文档或源码，不要根据注册方法推测完整 API。

优先读取当前项目实际还原版本的资料，不要选择全局缓存中的最高版本。方法重载、泛型约束、配置委托和默认值必须以签名为准；资料不可用时说明缺失，不要猜测。

此 skill 为只读参考资料，不包含脚本。
