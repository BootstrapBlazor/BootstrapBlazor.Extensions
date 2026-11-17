---
name: bb-middleware
description: 随 BootstrapBlazor.Middleware NuGet 包提供的服务接入参考。需要接入服务端 SignalR 分发服务与 Hub 端点、查询服务注册方法与配置委托签名，或修复相关调用错误时使用。
---

# Middleware 服务接入参考

此 skill 随 `BootstrapBlazor.Middleware` NuGet 包分发，用于接入服务端 SignalR 分发服务与 Hub 端点。参考文档从打包时的工程源码生成。

先阅读 [references/llms.txt](references/llms.txt)，再按需读取本包的注册 API 文档：

- [ServiceCollectionExtensions](references/components/ServiceCollectionExtensions.txt)

先调用 AddBootstrapBlazor，再调用本包带 configure 参数的 AddBootstrapBlazorHub。注册文档不包含 MapBootstrapBlazorHub 等端点映射 API，使用时需查阅本包对应版本源码；不要混用 SignalR.Client 中同名方法的签名。

注册扩展类不是可注入的服务。生成文档主要覆盖注册入口；服务接口、选项类型和其他辅助方法可能未收录，应查询对应包实际引用版本的文档或源码，不要根据注册方法推测完整 API。

优先读取当前项目实际还原版本的资料，不要选择全局缓存中的最高版本。方法重载、泛型约束、配置委托和默认值必须以签名为准；资料不可用时说明缺失，不要猜测。

此 skill 为只读参考资料，不包含脚本。
