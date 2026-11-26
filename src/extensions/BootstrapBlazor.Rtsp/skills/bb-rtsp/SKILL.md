---
name: bb-rtsp
description: 随 BootstrapBlazor.Rtsp NuGet 包提供的 API 参考。需要在 ASP.NET Core 中托管 MediaMTX 网关、动态登记 RTSP 摄像头并转为 WebRTC 播放，或修复相关调用错误时使用。
---

# Rtsp API 参考

此 skill 随 `BootstrapBlazor.Rtsp` NuGet 包分发，用于在服务端托管 MediaMTX 网关并动态管理 RTSP 摄像头。参考文档从打包时的工程源码生成。

先阅读 [references/llms.txt](references/llms.txt) 确认当前包收录的服务和选项，再按需读取对应的 API 文档。

## 注册与配置

```csharp
builder.Services.AddRtspService();
```

```json
{
  "Rtsp": {
    "MediaMtxPath": "mediamtx\\mediamtx.exe",
    "WebRtcPort": 8889,
    "WebRtcIcePort": 8189,
    "ApiPort": 9997
  }
}
```

- 包内不附带 MediaMTX，需从 [MediaMTX Releases](https://github.com/bluenviron/mediamtx/releases) 按服务器系统和架构下载；已验证 v1.21.4。
- `MediaMtxPath` 默认为应用目录下的 `mediamtx\mediamtx.exe`（Windows 布局）；其他位置或 Linux/macOS 应配置对应的可执行文件路径，相对路径以应用目录为基准。Linux/macOS 需要执行权限。
- `AddRtspService` 从 `Rtsp` 配置节绑定选项，也支持通过 `configureOptions` 回调覆盖选项。WebRTC 页面和 Control API 分别使用 TCP 端口 8889、9997，ICE 使用 UDP 端口 8189；HTTP 与 Control API 端口应不同。
- 文件不存在时记录警告；端口被占用、进程启动失败、就绪探测失败或超时时记录错误日志。网关不启动，宿主继续启动；网关未运行时管理调用抛出 `InvalidOperationException`。
- 停止宿主时服务尝试回收自有 MediaMTX 进程；宿主被强制终止时不保证自动回收。端口被残留进程占用时须确认并手动处理后重启，服务不会结束其他进程。
- 本包只支持 MediaMTX，不支持其他 RTSP 转流工具。

## 摄像头管理

在服务端（如 Interactive Server 页面）注入 `IRtspService`：

- `RtspCameraOptions.Path` 是唯一播放路径，以小写字母开头，只允许小写字母、数字和连字符，最长 63 个字符，不能是 `all`。
- `Url` 为不含凭据、查询字符串或片段的 RTSP/RTSPS 地址，必须显式指定端口和流路径。`UserName`、`Password` 使用未编码的原始值；提供密码时必须提供用户名。
- `AddAsync(camera)` 登记新路径并返回播放 URL，可传给 `BootstrapBlazor.HikVision` 的 `HikVisionWebRtc.GatewayUrl`；路径重复时报错。登记成功只表示配置被接受，并不表示摄像头已连通。
- `UpdateAsync(camera)` 替换已有路径的源和凭据，可能中断现有播放；`RemoveAsync(path)` 显式删除路径并影响所有观看者。关闭页面不会删除路径。
- 多路摄像头使用不同路径，共用一个网关；首次观看时通过 RTSP/TCP 按需拉流。配置只保存在 MediaMTX 内存中，重启后需由宿主恢复。
- 操作支持 `CancellationToken`；取消或超时后网关可能已经完成变更，应核实状态后再重试。
- `SetGatewayStateAsync` 仅供宿主同步网关状态，业务代码不要调用。

## 播放与声音

- 默认返回 `http://127.0.0.1:<WebRtcPort>/<Path>/`；HTTP、Control API 和 ICE 均仅监听回环地址，只适合同机浏览器。远程访问需要另外配置可达的信令和媒体路径、HTTPS 与鉴权，仅替换 URL 主机名不够。
- MediaMTX 在此方案中转发协议，不自动转码。摄像头需启用音频并选择浏览器支持的 WebRTC 编码，例如 G.711 μ-law（PCMU）或 A-law（PCMA）；AAC 等不兼容编码需另行转码。
- MediaMTX 播放页默认静音，用户需在播放器中取消静音。无声音时还应检查摄像头的音频配置及源流。

## 安全约束

- UI 应通过 HTTPS 访问；调用方负责身份认证、摄像头级权限和 RTSP 目标地址白名单，不要把服务暴露为匿名内网代理。
- 凭据通过 `UserName`、`Password` 传原始值，不要写入 URL、日志或浏览器存储。
- Control API 使用内部随机密码，不要反向代理给浏览器；播放路径不是访问令牌，本机读取不提供多租户播放鉴权。

以文档中的公开签名为准，优先读取当前项目实际还原版本的文档，不要凭记忆编造 API。资料缺失时说明缺口，不要猜测。

此 skill 为只读参考资料，不包含脚本。
