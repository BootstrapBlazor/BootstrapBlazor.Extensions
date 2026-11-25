# BootstrapBlazor.Rtsp

ASP.NET Core 服务包。显式注册后，宿主启动一个 MediaMTX 网关，在首次 WebRTC
读取时通过 RTSP/TCP 拉取固定源。默认播放器地址为 `http://127.0.0.1:8889/hikvision/`。

## 部署与配置

本包随附 [MediaMTX v1.21.4](https://github.com/bluenviron/mediamtx/releases/tag/v1.21.4)
（MIT 许可），支持 `win-x64`、`linux-x64`、`linux-arm64`、`linux-arm`（ARMv7）、
`osx-x64` 和 `osx-arm64`。引用 NuGet 包后，构建和发布会按目标运行时标识符（RID）将对应版本复制到应用输出目录的 `tools/<rid>/`；未指定 RID 时使用 .NET SDK 所在平台。
本 README 随工具复制，保留文末的 MediaMTX 许可声明。
启动时，服务根据当前进程的操作系统和架构使用对应工具，例如 `tools/win-x64/mediamtx.exe` 或 `tools/linux-arm64/mediamtx`，不会从 `wwwroot` 提供该文件。
在 Linux 或 macOS 上构建和发布时会设置执行权限。从 Windows 交叉发布或传输时若执行权限未保留，在部署机对对应文件执行 `chmod a+x`，例如 `chmod a+x tools/linux-arm64/mediamtx`。
`Rtsp:ExecutablePath` 可指定绝对路径或相对于应用目录的路径，并优先于内置工具。其他平台需自行部署对应的 MediaMTX 并设置此选项。
从旧目录结构升级时，删除指向 `tools/mediamtx.exe` 或 `tools/mediamtx` 的配置（包括环境变量 `Rtsp__ExecutablePath`）以及项目中手工复制内置工具的规则，交由包按 RID 部署。确实使用自备工具时，保留指向该工具的配置。
使用其他版本时请重新验证启动和就绪探测。

`dotnet pack` 直接把源码 `tools/<rid>/` 中的可执行文件打入 NuGet 包。
引用包的应用直接从包内复制对应版本；打包、构建、发布和启动都不会下载 MediaMTX。

`Program.cs`：

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRtspServer();

var app = builder.Build();
app.Run();
```

`appsettings.json`（替换为自己的无凭据源 URL）：

```json
{
  "Rtsp": {
    "Url": "rtsp://camera.example.invalid:554/Streaming/Channels/101",
    "WebRtcPort": 8889,
    "WebRtcIcePort": 8189
  }
}
```

`Url` 支持 `rtsp://` 和 `rtsps://`，必须指定端口和流路径，不得在 URL
（包括查询字符串）中放入凭据。相应地，使用服务端的私有配置提供
`Rtsp:UserName` 和 `Rtsp:Password`（无需预编码）。例如，通过 ASP.NET Core
User Secrets（仅开发）、部署平台的密钥提供程序，或 `Rtsp__UserName` 和
`Rtsp__Password` 环境变量注入；不要把凭据写入仓库、示例或客户端配置。
可执行文件仅通过子进程的 `MTX_PATHS_HIKVISION_SOURCE` 接收带凭据的地址；
命令行和空的临时配置文件均不含凭据，子进程输出不会转发到宿主日志。
能检查子进程内存或环境的本机高权限账号仍可能读到凭据。

宿主启动会等待网关的 HTTP 和 ICE 监听器以及 `/hikvision/whep` 就绪；
就绪后会记录一条 `Information` 日志，包含进程 ID、播放地址和 ICE 监听地址，不包含 RTSP 源地址或凭据。
它不会提前连接摄像机或验证源凭据。宿主已持有网关时，重复启动请求会记录警告并跳过。
启动失败会阻止应用启动，正常停止或启动失败时仅回收该宿主自行启动的进程。
在 Windows 上，MediaMTX 同时受 Job Object 管理，宿主被强制终止时也会随之退出。
其他平台上的强制终止不会触发托管服务清理，应由外部进程管理器负责回收。
配置变更需重启宿主。

## 回环限制

WebRTC HTTP（TCP）和媒体（UDP ICE）都只监听 `127.0.0.1`，其他 MediaMTX
协议端口不启用。播放器不提供用户鉴权；不要将它直接暴露给不可信客户端。
浏览器中的 `127.0.0.1` 指的是**浏览器所在机器**，不是远程应用服务器。
本包不提供同源反向代理或远程 WebRTC 接入；即使网页可达，远程播放也需要单独
可达的 ICE 媒体路径，以及适当的 HTTPS、访问控制和网络配置。

## MediaMTX License

MIT License

Copyright (c) 2019 aler9

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
