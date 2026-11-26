# BootstrapBlazor.MediaMtx

ASP.NET Core 动态 RTSP 摄像头服务。一个托管的 MediaMTX 进程管理多个播放路径。
启动不连接摄像头；首次观看时通过 RTSP/TCP 按需拉流，转发为 WebRTC。
包内不附带 MediaMTX。默认查找应用目录下的 `mediamtx\mediamtx.exe`，其他平台或位置需配置 `Rtsp:MediaMtxPath`，详见“工具部署与进程生命周期”。

## 注册与网关配置

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

配置仅包含网关设置，不再支持原来的全局 `Url`、`UserName`、`Password`。
`AddRtspService` 从 `Rtsp` 配置节绑定选项，也可通过 `configureOptions` 回调覆盖选项。
HTTP 和 Control API 使用不同 TCP 端口，ICE 使用 UDP。
Control API 仅监听回环地址，使用每个宿主实例生成的内部随机密码，不提供浏览器调用入口。
`IRtspService.SetGatewayStateAsync` 仅供宿主同步网关状态；自定义实现应在密码为 `null` 时
停止管理请求，并在网关就绪后使用提供的密码认证 Control API 请求。

## UI 动态登记

在自己的 **Interactive Server** 页面注入 `IRtspService`。以下代码放在已授权的管理页面中；
使用原生 Blazor 表单，不需要把凭据传给播放组件：

```razor
@using BootstrapBlazor.Components
@inject IRtspService Rtsp

<EditForm Model="@camera" OnSubmit="ConnectAsync">
    <label>Path <InputText @bind-Value="camera.Path" /></label>
    <label>RTSP URL <InputText @bind-Value="camera.Url" /></label>
    <label>User name <InputText @bind-Value="camera.UserName" /></label>
    <label>Password <InputText type="password" @bind-Value="camera.Password" /></label>
    <button type="submit" disabled="@busy">登记并播放</button>
</EditForm>
@if (error is not null)
{
    <p role="alert">@error</p>
}
@if (playerUrl is not null)
{
    <HikVisionWebRtc GatewayUrl="@playerUrl" />
}

@code {
    private readonly RtspCameraOptions camera = new() { Path = "entrance" };
    private string? playerUrl;
    private string? error;
    private bool busy;

    private async Task ConnectAsync()
    {
        busy = true;
        error = null;
        try
        {
            playerUrl = await Rtsp.AddAsync(camera);
        }
        catch (ArgumentException)
        {
            error = "请检查路径、RTSP 地址和用户名。";
        }
        catch (HttpRequestException)
        {
            error = "登记失败，请检查路径是否重复以及网关是否可用。";
        }
        catch (InvalidOperationException)
        {
            error = "网关尚未就绪。";
        }
        catch (OperationCanceledException)
        {
            error = "登记操作已取消或超时。";
        }
        finally
        {
            camera.Password = null;
            busy = false;
        }
    }
}
```

页面所在应用同时引用 `BootstrapBlazor.HikVision` 才能使用播放器。
另一个摄像头使用 `parking` 等不同 Path 即可同时播放。
Path 必须以小写字母开头，仅包含小写字母、数字和连字符，最长 63 个字符，不允许保留名称 `all`。
RTSP/RTSPS URL 必须包含显式端口和流路径，不允许内嵌凭据、查询字符串或片段。
用户名、密码传原始值，服务端负责 URL 编码；提供密码时必须提供用户名。
示例在每次登记操作结束后清空密码，再次登记时需要重新输入。

`AddAsync` 返回 `http://127.0.0.1:<WebRtcPort>/<Path>/`。路径重复时报错，不会覆盖其他摄像头。
`UpdateAsync(camera)` 替换已有路径的源和凭据，路径不存在时报错；变更可能中断现有观看。
`RemoveAsync(path)` 显式删除路径并影响所有观看者；关闭播放器不会自动删除路径。
多个观看者共享一路源，未观看时按 MediaMTX 的按需设置停止拉流。
所有管理调用支持 `CancellationToken`；HTTP 错误保留状态码，但不暴露可能含源凭据的响应正文。
请求取消或超时时，网关可能已经完成变更，调用方应核实状态，不要盲目重复登记。

登记成功仅表示配置被网关接受，不代表摄像头在线或凭据正确。
动态配置保存在 MediaMTX 内存中，停止或重启后清空，宿主需要自行安全持久化并在启动后恢复。

## 声音

MediaMTX 在此方案中转发协议，不自动转码。摄像头需启用音频并选择浏览器支持的 WebRTC 编码，
例如 G.711 μ-law（PCMU）或 A-law（PCMA）；AAC 等不兼容编码需要另行转码。
MediaMTX 播放页面默认静音，播放后需取消静音；仍无声音时检查摄像头的音频配置及源流。

## 安全与访问范围

UI 必须通过 HTTPS 与服务端通信。调用方负责身份认证、摄像头级权限检查和目标 RTSP 地址白名单，
避免将该服务暴露成可访问任意内网地址的匿名代理。
不要将摄像头密码放进播放 URL、日志、浏览器本地存储，或在列表查询中回传。
流路径不是访问令牌；当前播放端允许本机读取，内置服务不提供多租户播放鉴权。
不要直接将 Control API 反向代理给浏览器。

HTTP、Control API、UDP ICE 只监听 `127.0.0.1`。返回 URL 中的回环地址指浏览器所在设备。
远程浏览器访问需要单独配置可达的信令和媒体路径、HTTPS 与鉴权；仅替换 URL 主机名不足以支持远程播放。
摄像头管理不属于 iframe 播放组件的职责。

## 工具部署与进程生命周期

包内不附带 MediaMTX，请按服务器的操作系统和 CPU 架构从
[MediaMTX Releases](https://github.com/bluenviron/mediamtx/releases) 下载，已验证版本为 v1.21.4。
解压后只需要 `mediamtx`（Windows 为 `mediamtx.exe`），压缩包中的 `mediamtx.yml` 不会被使用。

`Rtsp:MediaMtxPath` 默认为 `mediamtx\mediamtx.exe`（相对应用目录），Windows 下解压到应用目录的 `mediamtx` 文件夹即可，无需配置。
其他位置或平台需配置可执行文件的完整路径，Windows 包含 `.exe` 扩展名，例如 `C:\tools\mediamtx\mediamtx.exe`；
Linux 和 macOS 没有扩展名，例如 `/opt/mediamtx/mediamtx`。相对路径以应用目录为基准。
路径指向存在的文件时尝试启动网关；文件不存在时记录警告并跳过网关，宿主正常启动，管理调用报告网关未运行。
Linux 和 macOS 需要执行权限，例如 `chmod a+x mediamtx`。
启动探测同时检查本进程的 WebRTC 监听日志和已认证 Control API。
就绪日志包含 PID、工具路径、WebRTC 基址和 ICE 地址，不包含摄像头源或凭据。
路径有效但进程启动、就绪探测失败或超时时记录错误日志并跳过网关，宿主正常启动；停止时尝试回收自有进程和不含凭据的临时配置文件，清理失败记录错误日志。
各平台统一使用 .NET `Process` 启停进程；宿主被强制终止时不保证自动回收 MediaMTX。
下次启动网关前，会结束可执行文件完整路径与 `Rtsp:MediaMtxPath` 解析结果相同的现有进程，并等待退出后再启动。
同一路径的 MediaMTX 应由一个宿主管理；启动新宿主会中断该路径下已有实例的播放。其他目录的实例不会被结束。
启动前检查 WebRTC HTTP、Control API 的 TCP 端口和 ICE 的 UDP 端口是否可绑定。
地址仍不可用或被其他进程占用时记录错误日志并跳过网关，宿主正常启动，管理调用报告网关未运行；应检查端口配置及占用情况，处理后重启。
端口检查与进程启动之间仍可能发生竞争，此时同样记录错误日志并给出处理提示。
网关配置修改后需要重启应用。程序不自动重启崩溃的 MediaMTX；管理调用会报告连接失败。
