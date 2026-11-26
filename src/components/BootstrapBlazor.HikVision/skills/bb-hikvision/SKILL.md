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

`HikVisionWebRtc` 将 MediaMTX 的 WebRTC 播放页面嵌入 16:9 的 iframe，无需安装海康威视 Web 插件。本组件只负责显示播放页面，不读取摄像机凭据、不管理 RTSP 流，也不启动网关。

网关和摄像头可由 `BootstrapBlazor.Rtsp` 包管理：注册 `AddRtspService()` 并配置 `Rtsp:MediaMtxPath` 托管 MediaMTX，再在服务端调用 `IRtspService.AddAsync` 登记摄像头，将返回的播放 URL 传给 `GatewayUrl`。注册、配置和摄像头管理的细节以该包的 `bb-rtsp` skill 为准。

```razor
@inject IRtspService RtspService

<Button Text="预览" OnClick="PreviewAsync" />

@if (_playerUrl is not null)
{
    <HikVisionWebRtc GatewayUrl="@_playerUrl" Title="入口摄像头" />
}

@code {
    private readonly RtspCameraOptions _camera = new()
    {
        Path = "entrance",
        Url = "rtsp://192.168.1.100:554/Streaming/Channels/101"
    };

    private string? _playerUrl;

    private async Task PreviewAsync()
    {
        _playerUrl = await RtspService.AddAsync(_camera);
    }
}
```

- `IRtspService` 只能在服务端调用（如 Interactive Server 页面）；`UserName`、`Password` 由服务端管理界面提交原始值，不要写入 `Url`、页面标记或浏览器存储。
- `GatewayUrl` 没有默认值。值为空、不是绝对 HTTP(S) 地址或包含用户信息时，组件不渲染 iframe，而是显示错误提示。
- 同一路径重复调用 `AddAsync` 会报错，不要放在可能重复执行的生命周期方法中（如预渲染时的 `OnInitializedAsync`）；已登记的路径可调用 `UpdateAsync` 替换源配置并获取播放 URL。
- 关闭页面或移除组件不会删除路径；需要删除时由服务端调用 `RemoveAsync(path)`，这会影响该路径的所有观看者。

## 播放地址

`AddAsync` 返回 `http://127.0.0.1:<WebRtcPort>/<Path>/`，网关的 HTTP 和 ICE 端口仅监听回环地址，只适合浏览器与网关同机。远程浏览器的 `127.0.0.1` 指向客户端自身，需要另外配置可达的信令和媒体路径、HTTPS 与鉴权，仅替换主机名不够；HTTPS 页面应使用 HTTPS 播放地址。已配置好的远程网关可直接传入完整播放地址：

```razor
<HikVisionWebRtc GatewayUrl="https://video.example.com/entrance/" />
```

- `GatewayUrl` 是 MediaMTX 播放页面地址，不是摄像机 RTSP 地址或 Control API 地址，也不应包含凭据；播放路径不是访问令牌。
- 如需启停预览，在调用页面中用 `@if` 显示或移除组件；这不会修改 MediaMTX 的流配置。
- `class`、`style` 等附加属性作用于外层容器，可用于控制尺寸。
- `IsMuted` 默认为 `true`（静音），设置 `IsMuted="false"` 可取消静音。组件会覆盖播放地址中的 `muted` 查询参数并保留其他参数。有声自动播放受浏览器策略限制，可能仍需用户点击播放器；无声音时检查摄像头是否启用浏览器支持的音频编码（如 PCMU、PCMA）。

## 注意事项

以文档中的参数、事件回调和公开方法签名为准；需要服务注册时，检查对应文档中的注册说明。不要将其他包中名称相似的组件或服务混用。

优先读取当前项目实际还原版本的文档，不要选择全局缓存中的最高版本，也不要凭记忆编造 API。

文档仅分析当前工程源码，外部基类和 Razor `@code` 中的成员可能未收录。需要继承成员、配套类型或未收录的注册方式时，应查询项目实际引用版本的源码或资料；资料不可用时说明缺失，不要猜测。

此 skill 为只读参考资料，不包含脚本。
