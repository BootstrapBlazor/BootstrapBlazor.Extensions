---
name: bb-ip2region
description: 随 BootstrapBlazor.IP2Region NuGet 包提供的服务接入参考。需要使用 IP2Region 接入 IP 地址归属地查询、查询服务注册方法与配置委托签名，或修复相关调用错误时使用。
---

# IP2Region 服务接入参考

此 skill 随 `BootstrapBlazor.IP2Region` NuGet 包分发，用于使用 IP2Region 接入 IP 地址归属地查询。参考文档从打包时的工程源码生成。

先阅读 [references/llms.txt](references/llms.txt)，再按需读取本包的注册 API 文档：

- [ServiceCollectionExtensions](references/components/ServiceCollectionExtensions.txt)

注册入口为 AddBootstrapBlazorIP2RegionService。配置参数以当前版本签名为准；IP2RegionOptions 的具体成员需查阅对应版本资料。

通过 NuGet 直接或间接引用本包的 .NET SDK 项目，构建和发布时会将 IPv4、IPv6 数据库复制到输出目录的 `ip2region` 子目录。单文件发布时这两个 `.xdb` 文件仍保留在该子目录，不嵌入应用程序。

注册扩展类不是可注入的服务。生成文档主要覆盖注册入口；服务接口、选项类型和其他辅助方法可能未收录，应查询对应包实际引用版本的文档或源码，不要根据注册方法推测完整 API。

优先读取当前项目实际还原版本的资料，不要选择全局缓存中的最高版本。方法重载、泛型约束、配置委托和默认值必须以签名为准；资料不可用时说明缺失，不要猜测。

此 skill 为只读参考资料，不包含脚本。
