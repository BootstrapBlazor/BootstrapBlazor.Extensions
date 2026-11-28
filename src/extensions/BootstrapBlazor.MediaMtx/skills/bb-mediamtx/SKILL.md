---
name: bb-mediamtx
description: 提供 BootstrapBlazor.MediaMtx 的配置与 API 参考。适用于在 ASP.NET Core 中托管 MediaMTX 网关、动态管理 RTSP 摄像头，以及排查 WebRTC 播放问题。
---

# MediaMTX API 参考

此 skill 随 `BootstrapBlazor.MediaMtx` NuGet 包分发，用于在服务端托管 MediaMTX 网关并动态管理 RTSP 摄像头。参考文档从打包时的工程源码生成。

先阅读 [references/llms.txt](references/llms.txt) 确认当前包收录的服务和选项，再按需读取对应的 API 文档。

## 注册与配置

```csharp
// 安装与目标系统及架构对应的平台包，再调用对应的注册方法：
builder.Services.AddMediaMtxWindows();
// builder.Services.AddMediaMtxLinuxX64();
// builder.Services.AddMediaMtxLinuxArm64();
// builder.Services.AddMediaMtxLinuxArmV7();
// builder.Services.AddMediaMtxMacOSX64();
// builder.Services.AddMediaMtxMacOSArm64();
```

```json
{
  "MediaMtx": {
    "WebRtcPort": 8889,
    "WebRtcIcePort": 8189,
    "ApiPort": 9997
  }
}
```

- 主包不附带 MediaMTX。按部署环境选择一个包：`BootstrapBlazor.MediaMtx.Windows`（x64）、`BootstrapBlazor.MediaMtx.Linux.X64`、`BootstrapBlazor.MediaMtx.Linux.Arm64`、`BootstrapBlazor.MediaMtx.Linux.ArmV7`、`BootstrapBlazor.MediaMtx.MacOS.X64` 或 `BootstrapBlazor.MediaMtx.MacOS.Arm64`。工具版本为 v1.21.4；也可从 [MediaMTX Releases](https://github.com/bluenviron/mediamtx/releases) 下载并配置路径。
- 每个 NuGet 包仅包含对应架构的工具，`LICENSE.MediaMTX` 在源码、包内及应用输出中均与工具位于同一架构目录。还原时不复制到应用目录，编译和发布时只复制到目标目录中缺失的文件，且只复制与当前目标 RID 一致的架构目录（未指定 `RuntimeIdentifier` 时按本机 RID 判断，`dotnet publish -r` 指定的 RID 优先）。升级工具时请删除已有的目标文件或使用新的输出目录。
- `MediaMtxPath` 默认为应用目录下的 `mediamtx-tools\<平台-架构>\<可执行文件>`，例如 `mediamtx-tools\win-x64\mediamtx.exe`；可通过配置指定其他路径，相对路径以应用目录为基准。Linux/macOS 需要为输出或发布目录中的目标工具设置执行权限。
- 平台方法同时注册主服务，从 `MediaMtx` 配置节绑定选项，也支持通过 `configureOptions` 回调覆盖选项。自行实现 `IMediaMtxProcessLauncher` 时，注册该接口并调用 `AddMediaMtxService`；启动器使用宿主提供的 `ProcessStartInfo` 启动并返回进程，宿主负责就绪探测和清理。只注册一个启动器；未注册时宿主启动失败，操作系统或系统架构不匹配时网关不启动并记录警告，宿主继续启动。
- WebRTC 页面和 Control API 分别使用 TCP 端口 8889、9997，ICE 使用 UDP 端口 8189；HTTP 与 Control API 端口应不同。
- `MediaMtx:Cameras` 是以播放路径为键的静态摄像头字典，值提供 `Url` 和可选的 `UserName`、`Password`（值中的 `Path` 被忽略），网关启动时自动登记，无需手动调用 `AddOrUpdateAsync`。密码通过 User Secrets（`secrets.json` 中与 `appsettings.json` 相同的层次结构）或环境变量（如 `MediaMtx__Cameras__hikvision__Password`）提供。修改后重启应用。
- MediaMTX 配置由组件生成，不支持用户提供的 MediaMTX JSON 配置文件。组件生成临时 YAML，摄像头源地址和内部 API 密码仅通过子进程环境传递；就绪探测使用已认证的 Control API 请求，不依赖子进程日志。
- 文件不存在时记录警告；端口被占用、进程启动失败、就绪探测失败或超时时记录错误日志。网关不启动，宿主继续启动；网关未运行时管理调用抛出 `InvalidOperationException`。
- 正常停止宿主时服务会尝试回收自有 MediaMTX 进程。启动时会先结束可执行文件完整路径匹配 `MediaMtx:MediaMtxPath` 的已有实例，并等待退出。同一可执行文件路径应只交给一个宿主管理，否则新宿主启动会中断已有播放。其他路径的进程不受影响；若端口仍被占用，检查占用情况后重启。
- 本包只支持 MediaMTX，不支持其他 RTSP 转流工具。

## 摄像头管理

在服务端（如 Interactive Server 页面）注入 `IMediaMtxService`：

- 调用方应校验唯一播放路径 `MediaMtxCameraOptions.Path`：以小写字母开头，只允许小写字母、数字和连字符，最长 63 个字符，不能是 `all`。删除时传入已登记的路径。
- `Url` 为不含凭据、查询字符串或片段的 RTSP/RTSPS 地址，必须显式指定端口和流路径。`UserName`、`Password` 使用未编码的原始值；提供密码时必须提供用户名。
- `IMediaMtxService.AddOrUpdateAsync(camera)` 登记新路径或更新已有路径的源和凭据，返回可传给 `BootstrapBlazor.HikVision` 的 `HikVisionWebRtc.WebRtcUrl` 的播放 URL。成功只表示网关接受配置，不代表摄像头已连通；更新可能中断现有播放。
- 默认服务记住当前网关中已成功登记或更新的路径，后续优先更新；路径状态不一致时以网关为准。
- `RemoveAsync(path)` 显式删除路径并影响所有观看者。关闭页面不会删除路径。
- 多路摄像头使用不同路径，共用一个网关；首次观看时通过 RTSP/TCP 按需拉流。动态配置只保存在 MediaMTX 内存中，重启后需由宿主恢复；`Cameras` 中的静态配置会在启动时重新加载。
- 操作支持 `CancellationToken`；取消或超时后网关可能已经完成变更，应核实状态后再重试。
- `SetGatewayStateAsync` 仅供宿主同步网关状态，业务代码不要调用。

## 播放与声音

- 默认返回 `http://127.0.0.1:<WebRtcPort>/<Path>/`；可设置 `WebRtcPublicUrl` 为已配置的 WebRTC HTTP 反向代理基址，播放 URL 和允许的信令来源随之调整。HTTP、Control API 和 ICE 仍仅监听回环地址；普通 HTTP 代理不提供远程 ICE 媒体路径，远程播放仍需另行配置可达的媒体路径、HTTPS 与鉴权。
- MediaMTX 在此方案中转发协议，不自动转码。摄像头需启用音频并选择浏览器支持的 WebRTC 编码，例如 G.711 μ-law（PCMU）或 A-law（PCMA）；AAC 等不兼容编码需另行转码。
- MediaMTX 播放页默认静音，用户需在播放器中取消静音。无声音时还应检查摄像头的音频配置及源流。

## 安全约束

- UI 应通过 HTTPS 访问；调用方负责身份认证、摄像头级权限和 RTSP 目标地址白名单，不要把服务暴露为匿名内网代理。
- 凭据通过 `UserName`、`Password` 传原始值，不要写入 URL、日志或浏览器存储。
- Control API 使用内部随机密码，不要反向代理给浏览器；播放路径不是访问令牌，本机读取不提供多租户播放鉴权。

以文档中的公开签名为准，优先读取当前项目实际还原版本的文档，不要凭记忆编造 API。资料缺失时说明缺口，不要猜测。

此 skill 为只读参考资料，不包含脚本。
