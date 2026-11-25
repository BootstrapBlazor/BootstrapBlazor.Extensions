---
name: bb-hikvision
description: 随 BootstrapBlazor.HikVision NuGet 包提供的 API 参考。需要集成海康威视 Web 插件或 WebRTC 预览、查询相关组件的公开 API，或修复相关调用错误时使用。
---

# HikVision API 参考

此 skill 随 `BootstrapBlazor.HikVision` NuGet 包分发，用于集成海康威视 Web 插件或无插件 WebRTC 预览。参考文档从打包时的工程源码生成。

先阅读 [references/llms.txt](references/llms.txt) 确认当前包收录的组件和服务，再按需读取对应的 API 文档：

- [HikVisionWebPlugin](references/components/HikVisionWebPlugin.txt)
- [HikVisionWebRtc](references/components/HikVisionWebRtc.txt)

## WebRTC 预览

`HikVisionWebRtc` 将 MediaMTX 的 WebRTC 播放页面嵌入 iframe，无需安装海康威视 Web 插件。先在服务端启动 MediaMTX 并配置摄像机的 RTSP 源；本组件不读取摄像机凭据、不管理 RTSP 流，也不启动网关。

在同一台机器上运行浏览器和网关时，可以直接使用组件，默认播放 `http://127.0.0.1:8889/hikvision/`：

```razor
<HikVisionWebRtc />
```

使用不同端口、流名称或远程网关时，传入浏览器可访问的完整 HTTP(S) 播放页面地址：

```razor
<HikVisionWebRtc GatewayUrl="https://video.example.com/hikvision/" />
```

如需启停预览，在调用页面中用 `@if` 显示或移除组件；这不会修改 MediaMTX 的流配置。`GatewayUrl` 不是摄像机 RTSP 地址或 Control API 地址，也不应包含摄像机凭据。远程浏览器的 `127.0.0.1` 指向客户端自身，应配置浏览器可访问的播放地址和 WebRTC 媒体端口；HTTPS 页面应使用 HTTPS 播放地址。

以文档中的参数、事件回调和公开方法签名为准；需要服务注册时，检查对应文档中的注册说明。不要将其他包中名称相似的组件或服务混用。

优先读取当前项目实际还原版本的文档，不要选择全局缓存中的最高版本，也不要凭记忆编造 API。

文档仅分析当前工程源码，外部基类和 Razor `@code` 中的成员可能未收录。需要继承成员、配套类型或未收录的注册方式时，应查询项目实际引用版本的源码或资料；资料不可用时说明缺失，不要猜测。

此 skill 为只读参考资料，不包含脚本。
