---
name: bb-authenticator
description: 随 BootstrapBlazor.Authenticator NuGet 包提供的服务接入参考。注册 TOTP 身份验证服务、接入 OTP 双因素验证、查询 AddBootstrapBlazorTotpService 注册方式，或修复相关调用错误时使用。
---

# Authenticator 服务接入参考

此 skill 随 `BootstrapBlazor.Authenticator` NuGet 包分发，参考文档从打包时的工程源码生成。

1. 阅读 [references/llms.txt](references/llms.txt)，确认当前包收录的服务注册扩展。
2. 阅读 [references/components/ServiceCollectionExtension.txt](references/components/ServiceCollectionExtension.txt)，确认 `AddBootstrapBlazorTotpService` 的参数、默认值与签名。
3. 注册后通过 `ITotpService` 使用服务。该接口和 `OtpOptions` 等类型来自 BootstrapBlazor 依赖包，详细 API 应查询项目实际引用版本的文档或源码，不要将本包未收录的外部类型误认为不可用。

注册扩展类不是可注入服务；不要直接使用内部的 `DefaultTotpService` 实现，也不要将演示默认密钥用于实际账户。

优先读取当前项目实际还原版本的文档，不要选择全局缓存中的最高版本。不要凭记忆编造方法、配置参数或调用签名；资料不可用时说明缺失。

此 skill 为只读参考资料，不包含脚本。
