# BootstrapBlazor.MediaMtx

ASP.NET Core 动态 RTSP 摄像头服务。一个托管的 MediaMTX 进程管理多个播放路径。
启动不连接摄像头；首次观看时通过 RTSP/TCP 按需拉流，转发为 WebRTC。
主包不附带 MediaMTX；安装并注册对应平台包，或自行提供进程启动器，详见“工具部署与进程生命周期”。

## 注册与网关配置

```csharp
// 安装与目标系统对应的平台包，三选一：
builder.Services.AddMediaMtxWindows();
// builder.Services.AddMediaMtxLinux();
// builder.Services.AddMediaMtxMacOS();
```

```json
{
  "MediaMtx": {
    "WebRtcPort": 8889,
    "WebRtcIcePort": 8189,
    "ApiPort": 9997,
    "Cameras": {
      "hikvision": {
        "Url": "rtsp://192.0.2.1:554/stream",
        "UserName": "camera"
      },
      "gate": {
        "Url": "rtsp://192.0.2.2:554/stream",
        "UserName": "camera"
      }
    }
  }
}
```

`Cameras` 是可选的静态摄像头字典，网关启动时自动登记，无需调用 `AddOrUpdateAsync`。
键即播放路径，值包含不含凭据的 `Url` 和可选的 `UserName`、`Password`，值中的 `Path` 会被忽略；路径和 URL 规则与动态登记相同。
密码应通过 User Secrets 或环境变量等安全配置源提供，不要提交到 `appsettings.json`。
User Secrets 的 `secrets.json` 使用与 `appsettings.json` 相同的层次结构，按路径合并：

```json
{
  "MediaMtx": {
    "Cameras": {
      "hikvision": {
        "Password": "<password>"
      }
    }
  }
}
```

对应的环境变量名为 `MediaMtx__Cameras__hikvision__Password`。ASP.NET Core 默认只在 Development 环境加载 User Secrets。
网关通过子进程环境传递包含凭据的源地址，不会将其写入生成的临时配置文件或日志。
静态摄像头同样按需使用 RTSP/TCP 拉流；修改摄像头配置后需重启应用。静态路径不能与其他静态路径或用户 JSON 中的路径重复。
不再支持原来的全局 `Url`、`UserName`、`Password`。
平台注册方法同时注册主服务，从 `MediaMtx` 配置节绑定选项，也可通过 `configureOptions` 回调覆盖选项。
只注册一个平台启动器；未注册时宿主启动失败。平台不匹配时记录警告并跳过网关，宿主仍可启动。
自行实现 `IMediaMtxProcessLauncher` 时，注册该接口并调用 `AddMediaMtxService`；启动器使用宿主提供的 `ProcessStartInfo` 启动并返回进程，宿主负责就绪探测和清理。
HTTP 和 Control API 使用不同 TCP 端口，ICE 使用 UDP。
Control API 仅监听回环地址，使用每个宿主实例生成的内部随机密码，不提供浏览器调用入口。
`IMediaMtxService.SetGatewayStateAsync` 仅供宿主同步网关状态；自定义实现应在密码为 `null` 时
停止管理请求，并在网关就绪后使用提供的密码认证 Control API 请求。

### 可选的 MediaMTX JSON 配置

默认使用包内的 JSON 配置。需要调整其他 MediaMTX 参数时，可在应用目录创建例如 `mediamtx.settings.json`：

```json
{
  "readTimeout": "25s",
  "writeTimeout": "25s"
}
```

在 `MediaMtx` 配置节中设置 `"ConfigurationPath": "mediamtx.settings.json"`，也可使用绝对路径。
文件必须是 JSON 对象，顶层字段使用 MediaMTX 的配置名称；未指定的字段沿用默认值。
相对路径以应用目录为基准，指定的文件不存在或内容无效时，网关不会启动。
部署时需自行将该文件放到指定位置；UI 可以由服务端校验并保存此文件，但本包不提供编辑界面。
修改文件后需要重启应用，用户文件不会被组件改写。

为保证登记、同机播放和就绪探测，组件会覆盖 `api`、`apiAddress`、`apiEncryption`、
`authMethod`、`authInternalUsers`、`webrtc`、`webrtcAddress`、`webrtcEncryption`、
`webrtcLocalUDPAddress`、`webrtcIPsFromInterfaces`、`webrtcAdditionalHosts`、
`webrtcAllowOrigins` 和 `logDestinations`。
组件将子进程日志限制到标准输出并丢弃，不转发可能含源凭据的输出。
端口请通过 `MediaMtx` 配置节设置，内部 API 密码只通过进程环境传递。
启用其他协议或监听器可能扩大网络暴露范围，应由调用方进行访问控制。

运行时会将合并后的配置写入临时文件；不要在用户 JSON 中存放摄像头凭据。
如果用户配置包含敏感信息，临时文件也会包含这些信息，强制终止进程时可能无法清理。

## UI 动态登记

在自己的 **Interactive Server** 页面注入 `IMediaMtxService`。以下代码放在已授权的管理页面中；
使用原生 Blazor 表单，不需要把凭据传给播放组件：

```razor
@using BootstrapBlazor.Components
@inject IMediaMtxService MediaMtx

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
    <HikVisionWebRtc WebRtcUrl="@playerUrl" />
}

@code {
    private readonly MediaMtxCameraOptions camera = new() { Path = "entrance" };
    private string? playerUrl;
    private string? error;
    private bool busy;

    private async Task ConnectAsync()
    {
        busy = true;
        error = null;
        try
        {
            playerUrl = await MediaMtx.AddOrUpdateAsync(camera);
        }
        catch (ArgumentException)
        {
            error = "请检查 RTSP 地址和用户名。";
        }
        catch (HttpRequestException)
        {
            error = "登记或更新失败，请检查摄像头配置和网关是否可用。";
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
`IMediaMtxService.AddOrUpdateAsync(camera)` 按 `Path` 登记新路径或更新已有路径的源和凭据。默认服务对未记录的路径优先新增，对已成功登记或更新的路径优先更新；若网关报告路径已存在或不存在，则改用相应的操作。删除成功或网关状态变更后会清除相应记录。更新已有路径可能中断现有播放。
另一个摄像头使用 `parking` 等不同 Path 即可同时播放。
Path 必须以小写字母开头，仅包含小写字母、数字和连字符，最长 63 个字符，不允许保留名称 `all`。
RTSP/RTSPS URL 必须包含显式端口和流路径，不允许内嵌凭据、查询字符串或片段。
用户名、密码传原始值，服务端负责 URL 编码；提供密码时必须提供用户名。
示例在每次登记操作结束后清空密码，再次登记时需要重新输入。

`AddOrUpdateAsync` 默认返回 `http://127.0.0.1:<WebRtcPort>/<Path>/`。
如果 nginx 已将公开地址反向代理到本机 WebRTC HTTP 端口，可在 `MediaMtx` 配置节设置
`"WebRtcPublicUrl": "https://example.com/mediamtx/"`，返回的地址将以该基址开头。
支持带路径前缀的绝对 HTTP/HTTPS 地址，不允许包含凭据、查询字符串或片段；未设置时使用回环地址。
组件同时允许该地址的来源访问 WebRTC 信令。代理需要正确转发播放页面、WHEP 请求及会话地址；
路径前缀场景还需正确处理上游 `Location` 响应头。
`RemoveAsync(path)` 显式删除路径并影响所有观看者；关闭播放器不会自动删除路径。
多个观看者共享一路源，未观看时按 MediaMTX 的按需设置停止拉流。
所有管理调用支持 `CancellationToken`；HTTP 错误保留状态码，但不暴露可能含源凭据的响应正文。
请求取消或超时时，网关可能已经完成变更，调用方应核实状态，不要盲目重复登记。

登记成功仅表示配置被网关接受，不代表摄像头在线或凭据正确。
动态配置保存在 MediaMTX 内存中，停止或重启后清空，宿主需要自行安全持久化并在启动后恢复；`Cameras` 中的静态配置会在启动时重新加载。

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

HTTP、Control API、UDP ICE 只监听 `127.0.0.1`。默认返回 URL 中的回环地址指浏览器所在设备。
`WebRtcPublicUrl` 仅改变返回的播放 URL 和允许的信令来源，不会配置 nginx 或更改 ICE 地址；
普通 HTTP 反向代理不能单独使远程浏览器访问回环 UDP ICE，远程播放还需可达的媒体路径和鉴权。
摄像头管理不属于 iframe 播放组件的职责。

## 工具部署与进程生命周期

除主包外，可按服务器系统安装对应的工具包，包含 MediaMTX v1.21.4：

- `BootstrapBlazor.MediaMtx.Windows`：Windows x64。
- `BootstrapBlazor.MediaMtx.Linux`：Linux x64、arm64、armv7。
- `BootstrapBlazor.MediaMtx.MacOS`：macOS x64、arm64。

平台包会将该平台所有支持架构的工具复制到输出或发布目录的 `mediamtx-tools` 子目录，并分别在 `mediamtx-tools\windows`、`mediamtx-tools\linux` 或 `mediamtx-tools\macos` 附带 `LICENSE.MediaMTX`；构建和发布不需要为工具指定 `RuntimeIdentifier`。例如 Windows 工具位于 `mediamtx-tools\win-x64\mediamtx.exe`，Linux 工具分别位于 `mediamtx-tools\linux-x64`、`mediamtx-tools\linux-arm64` 和 `mediamtx-tools\linux-arm`。默认启动路径按运行时操作系统及系统架构选择；不支持的架构无法使用内置工具。
也可以自行从 [MediaMTX Releases](https://github.com/bluenviron/mediamtx/releases) 下载并配置路径；仍需注册平台启动器或自行实现启动器。压缩包中的 `mediamtx.yml` 不会被使用。

`MediaMtx:MediaMtxPath` 默认为 `mediamtx-tools\<平台-架构>\<可执行文件>`，相对应用目录。
自行部署到其他位置时需配置可执行文件路径，Windows 包含 `.exe` 扩展名，例如 `C:\tools\mediamtx\mediamtx.exe`；
Linux 和 macOS 没有扩展名，例如 `/opt/mediamtx/mediamtx`。相对路径以应用目录为基准。
找不到工具时记录警告并跳过网关，宿主正常启动，管理调用报告网关未运行。
Linux 和 macOS 需要为应用输出或发布目录中的目标工具设置执行权限，例如 Linux x64 使用 `chmod a+x mediamtx-tools/linux-x64/mediamtx`。
启动时在 10 秒内重试已认证的 Control API 请求，不依赖子进程日志。只有子进程仍在运行且 Control API 返回 HTTP 200，网关才标记为就绪。
就绪日志包含 PID、工具路径、WebRTC 基址和 ICE 地址，不包含摄像头源或凭据。
路径有效但进程启动、就绪探测失败或超时时记录错误日志并跳过网关，宿主正常启动；停止时尝试回收自有进程和临时配置文件，清理失败记录错误日志。
平台包使用 .NET `Process` 启动进程，主包负责管理和停止；宿主被强制终止时不保证自动回收 MediaMTX。
下次启动网关前，会结束可执行文件完整路径与 `MediaMtx:MediaMtxPath` 解析结果相同的现有进程，并等待退出后再启动。
同一路径的 MediaMTX 应由一个宿主管理；启动新宿主会中断该路径下已有实例的播放。其他目录的实例不会被结束。
启动前检查 WebRTC HTTP、Control API 的 TCP 端口和 ICE 的 UDP 端口是否可绑定。
地址仍不可用或被其他进程占用时记录错误日志并跳过网关，宿主正常启动，管理调用报告网关未运行；应检查端口配置及占用情况，处理后重启。
端口检查与进程启动之间仍可能发生竞争，此时同样记录错误日志并给出处理提示。
网关配置修改后需要重启应用。程序不自动重启崩溃的 MediaMTX；管理调用会报告连接失败。
