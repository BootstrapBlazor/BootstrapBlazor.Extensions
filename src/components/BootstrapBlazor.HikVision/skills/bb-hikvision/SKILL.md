---
name: bb-hikvision
description: 随 BootstrapBlazor.HikVision NuGet 包提供的 API 参考。需要集成海康威视 Web 插件或 WebRTC 预览、查询相关组件的公开 API，或修复相关调用错误时使用。
---

# HikVision API 参考

此 skill 随 `BootstrapBlazor.HikVision` NuGet 包分发，用于集成海康威视 Web 插件或无插件 WebRTC 预览。参考文档从打包时的工程源码生成。

先阅读 [references/llms.txt](references/llms.txt) 确认当前包收录的组件和服务，再按需读取对应的 API 文档：

- [HikVisionWebPlugin](references/components/HikVisionWebPlugin.txt)
- [HikVisionWebRtc](references/components/HikVisionWebRtc.txt)

## 两种预览方式

- `HikVisionWebPlugin`：在浏览器加载海康 WebSDK 静态资源，用摄像机账号登录，支持实时预览、抓图、通道列表和声音开关。
- `HikVisionWebRtc`：只嵌入 MediaMTX 的 WebRTC 播放页，浏览器不需要海康插件，摄像机凭据留在服务端，但需要另行托管网关。

## WebRTC 预览

`HikVisionWebRtc` 将 MediaMTX 的 WebRTC 播放页面嵌入 16:9 的 iframe，无需安装海康威视 Web 插件。组件只显示播放地址，不负责登记摄像头、读取凭据或启动网关。

网关和摄像头可由 `BootstrapBlazor.MediaMtx` 包管理：安装目标平台包并调用对应的 `AddMediaMtxWindows()`、`AddMediaMtxLinux()` 或 `AddMediaMtxMacOS()`。调用页面在服务端自行登记摄像头，再将返回的播放地址传给组件。注册、配置和摄像头管理的细节以该包的 `bb-mediamtx` skill 为准。

下面的示例同时引用 `BootstrapBlazor.HikVision` 与 `BootstrapBlazor.MediaMtx`，并安装一个平台包；`IMediaMtxService` 由 MediaMtx 包提供，不属于 HikVision 包。

```razor
@inject IMediaMtxService MediaMtxService

<Button Text="预览" OnClick="PreviewAsync" />

@if (_webRtcUrl is not null)
{
    <HikVisionWebRtc WebRtcUrl="@_webRtcUrl" Title="入口摄像头" />
}

@code {
    private readonly MediaMtxCameraOptions _camera = new()
    {
        Path = "entrance",
        Url = "rtsp://192.168.1.100:554/Streaming/Channels/101"
    };

    private string? _webRtcUrl;

    private async Task PreviewAsync()
    {
        _webRtcUrl = await MediaMtxService.AddAsync(_camera);
    }
}
```

- `Url` 是摄像机 RTSP 地址，不应包含用户名或密码；`WebRtcUrl` 是浏览器访问的完整播放页面地址。两者互不替代。
- 登记由调用页面发起，不要在可能重复执行的预渲染生命周期中调用；同一路径重复登记会报错，已存在的路径可改用 `AddOrUpdateAsync`（`IMediaMtxService` 扩展方法）或 `UpdateAsync` 替换源配置并取得播放地址，替换可能中断该路径的现有播放。
- `IMediaMtxService` 只能在服务端调用（如 Interactive Server 页面）；`UserName`、`Password` 由服务端管理界面提交原始值，不要写入地址、页面标记或浏览器存储。
- 关闭页面或移除组件不会删除路径；需要删除时由服务端调用 `RemoveAsync(path)`，这会影响该路径的所有观看者。

## 播放地址

`AddAsync` 默认返回 `http://127.0.0.1:<WebRtcPort>/<Path>/`；也可配置 `MediaMtx:WebRtcPublicUrl`。网关的 HTTP 和 ICE 端口仅监听回环地址。远程浏览器的 `127.0.0.1` 指向客户端自身，需要另外配置可达的信令和媒体路径、HTTPS 与鉴权，仅替换主机名不够；HTTPS 页面应使用 HTTPS 播放地址。已配置好的远程网关可直接传入完整播放地址：

```razor
<HikVisionWebRtc WebRtcUrl="https://video.example.com/entrance/" />
```

- `WebRtcUrl` 是 MediaMTX 播放页面地址，不是摄像机 RTSP 地址或 Control API 地址，也不应包含凭据；播放路径不是访问令牌。
- 播放地址是播放路径页面，形如 `/<Path>/`，应保留结尾的 `/`；换成 Control API 接口地址或 RTSP 地址都无法播放。
- 如需启停预览，在调用页面中用 `@if` 显示或移除组件；这不会修改 MediaMTX 的流配置。
- 反向代理不应返回 `X-Frame-Options: DENY`、`SAMEORIGIN` 或限制性的 CSP `frame-ancestors`，否则浏览器拒绝嵌入 iframe，表现为空白区域，与地址本身是否正确无关。
- `IsMuted` 默认为 `true`（静音），设置 `IsMuted="false"` 会写入 `muted=false`。组件覆盖地址中的 `muted` 查询参数并保留其他参数；是否因此取消静音取决于 MediaMTX 播放页，仍可能需要在播放器内手动取消静音。有声自动播放受浏览器策略限制；无声音时检查摄像头是否启用浏览器支持的音频编码（如 PCMU、PCMA）。

## 组件行为

- `WebRtcUrl` 为 `null`、空字符串、非绝对 HTTP(S) 地址或包含用户名、密码时，不渲染 iframe，而渲染 `role="alert"` 的提示 `WebRtcUrl must be an absolute HTTP or HTTPS player URL without credentials.`；不会抛出异常，提示文本固定为英文，不能本地化。
- 尚未取得播放地址时，调用页面可用 `@if` 暂不渲染组件，避免先显示上述提示。
- `Title` 默认为 `WebRTC`，只作为 iframe 的 `title`（无障碍名称），不显示可见标题。
- iframe 带 `allow="autoplay; fullscreen"` 和 `referrerpolicy="no-referrer"`，播放器可进入全屏。
- 外层容器固定使用 Bootstrap 的 `ratio ratio-16x9`，尺寸由父容器宽度决定；`class`、`style` 等附加属性并入该容器，需要其他比例或固定高度时调整父元素。
- `WebRtcUrl` 或 `IsMuted` 变化会更新 iframe 的 `src`，浏览器通常会重新加载播放页；`IsMuted` 不是播放器运行时的音量控制。
- 组件自身没有事件回调或额外公开方法，不使用 JS 互操作，也不加载额外静态资源或要求服务注册；播放状态由 MediaMTX 播放页自身负责。

## 排错

- 区域空白：先确认渲染出的是 iframe 还是 `role="alert"` 提示，再检查反代响应头、HTTPS 页面是否嵌入了 HTTP 地址。
- 播放器长时间转圈：网关是否运行、路径是否已登记、摄像机源是否连通；`AddAsync` 成功只表示配置被接受。
- 画面正常但无声：确认 `IsMuted`、播放器静音状态和摄像头音频编码。

## 注意事项

以文档中的参数、事件回调和公开方法签名为准；需要服务注册时，检查对应文档中的注册说明。不要将其他包中名称相似的组件或服务混用。

优先读取当前项目实际还原版本的文档，不要选择全局缓存中的最高版本，也不要凭记忆编造 API。

文档仅分析当前工程源码，外部基类和 Razor `@code` 中的成员可能未收录。需要继承成员、配套类型或未收录的注册方式时，应查询项目实际引用版本的源码或资料；资料不可用时说明缺失，不要猜测。

此 skill 为只读参考资料，不包含脚本。
