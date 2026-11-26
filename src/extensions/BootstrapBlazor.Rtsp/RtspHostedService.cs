// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Diagnostics;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;

namespace BootstrapBlazor.Components;

sealed class RtspHostedService(IOptions<RtspOptions> options, ILogger<RtspHostedService> logger, IRtspService service) : IHostedService, IDisposable
{
    private const string Loopback = "127.0.0.1";
    private const string ReleaseUrl = "https://github.com/bluenviron/mediamtx/releases";
    private const string RestartHint = "A previous abnormal shutdown may have left MediaMTX running. Manually stop the process occupying the address, then restart the application.";
    private static readonly TimeSpan _startupTimeout = TimeSpan.FromSeconds(10);
    private static readonly TimeSpan _stopTimeout = TimeSpan.FromSeconds(5);
    private Process? _process;
    private string? _configPath;

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        try
        {
            if (await StartGatewayAsync(cancellationToken))
            {
                return;
            }
        }
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            logger.LogError("MediaMTX did not become ready within {Timeout} seconds; the RTSP gateway is disabled. Verify the installed MediaMTX version and listener ports. {RestartHint}",
                _startupTimeout.TotalSeconds, RestartHint);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Failed to start MediaMTX; the RTSP gateway is disabled. {RestartHint}", RestartHint);
        }

        await StopGatewayAsync();
    }

    public Task StopAsync(CancellationToken cancellationToken) => StopGatewayAsync();

    public void Dispose() => StopGatewayAsync().GetAwaiter().GetResult();

    private async Task<bool> StartGatewayAsync(CancellationToken cancellationToken)
    {
        var settings = options.Value;
        var executable = Path.GetFullPath(settings.MediaMtxPath, AppContext.BaseDirectory);
        if (!File.Exists(executable))
        {
            logger.LogWarning("MediaMTX was not found at {MediaMtxPath}; the RTSP gateway is disabled. Download it from {ReleaseUrl}.", executable, ReleaseUrl);
            return false;
        }

        if (!IsPortAvailable(settings.WebRtcPort, ProtocolType.Tcp) |
            !IsPortAvailable(settings.ApiPort, ProtocolType.Tcp) |
            !IsPortAvailable(settings.WebRtcIcePort, ProtocolType.Udp))
        {
            return false;
        }
        var apiPassword = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeout.CancelAfter(_startupTimeout);

        var httpAddress = $"{Loopback}:{settings.WebRtcPort}";
        var apiAddress = $"{Loopback}:{settings.ApiPort}";
        var iceAddress = $"{Loopback}:{settings.WebRtcIcePort}";
        var listeners = $"{httpAddress} (TCP/HTTP), {iceAddress} (UDP/ICE)";

        // Clear default users before applying indexed environment settings; no credentials are written to disk.
        _configPath = Path.GetTempFileName();
        await File.WriteAllTextAsync(_configPath, "{\"authInternalUsers\":[]}", timeout.Token);
        var started = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        var process = StartMediaMtx(executable, _configPath, httpAddress, iceAddress, apiAddress, apiPassword, started, listeners);
        _process = process;
        process.BeginOutputReadLine();
        process.BeginErrorReadLine();

        await Task.WhenAny(started.Task, process.WaitForExitAsync(timeout.Token)).WaitAsync(timeout.Token);
        if (process.HasExited)
        {
            logger.LogError("MediaMTX exited before the gateway was ready (exit code {ExitCode}); the RTSP gateway is disabled. Verify the MediaMTX version and that {Listeners} and {ApiAddress} (TCP/Control API) are available. {RestartHint}",
                process.ExitCode, listeners, apiAddress, RestartHint);
            return false;
        }

        using var client = new HttpClient(new HttpClientHandler { UseProxy = false, AllowAutoRedirect = false })
        {
            BaseAddress = new Uri($"http://{apiAddress}/v3/")
        };
        using var request = client.CreateApiRequest(HttpMethod.Get, "info", apiPassword);
        using var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, timeout.Token);
        if (response.StatusCode != HttpStatusCode.OK)
        {
            logger.LogError("MediaMTX's Control API readiness probe at http://{ApiAddress}/v3/info returned HTTP {StatusCode}; expected HTTP 200. The RTSP gateway is disabled.",
                apiAddress, (int)response.StatusCode);
            return false;
        }

        await service.SetGatewayStateAsync(apiPassword);
        logger.LogInformation("MediaMTX gateway is ready (PID {ProcessId}). Executable: {ExecutablePath}; WebRTC base URL: {PlayerUrl}; ICE (UDP): {IceAddress}.",
            process.Id, executable, $"http://{httpAddress}/", iceAddress);
        return true;
    }

    private bool IsPortAvailable(int port, ProtocolType protocol)
    {
        using var socket = new Socket(AddressFamily.InterNetwork,
            protocol == ProtocolType.Tcp ? SocketType.Stream : SocketType.Dgram, protocol);
        try
        {
            socket.ExclusiveAddressUse = true;
            socket.Bind(new IPEndPoint(IPAddress.Loopback, port));
            return true;
        }
        catch (SocketException exception)
        {
            logger.LogError("MediaMTX cannot bind to {Address}:{Port} ({Protocol}); the address may already be in use or unavailable (socket error: {SocketError}). The RTSP gateway is disabled. {RestartHint}",
                Loopback, port, protocol, exception.SocketErrorCode, RestartHint);
            return false;
        }
    }

    private Process StartMediaMtx(string executable, string configPath, string httpAddress, string iceAddress,
        string apiAddress, string apiPassword, TaskCompletionSource started, string listeners)
    {
        var startInfo = new ProcessStartInfo(executable)
        {
            UseShellExecute = false,
            CreateNoWindow = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true
        };
        startInfo.ArgumentList.Add(configPath);
        var environment = startInfo.Environment;
        foreach (var key in environment.Keys.ToArray())
        {
            if (key.StartsWith("MTX_", StringComparison.OrdinalIgnoreCase) ||
                key.StartsWith("RTSP_", StringComparison.OrdinalIgnoreCase) ||
                IsSourceConfiguration(key))
            {
                environment.Remove(key);
            }
        }
        environment["MTX_API"] = "true";
        environment["MTX_APIADDRESS"] = apiAddress;
        environment["MTX_AUTHMETHOD"] = "internal";
        environment["MTX_AUTHINTERNALUSERS_0_USER"] = "gateway";
        environment["MTX_AUTHINTERNALUSERS_0_PASS"] = apiPassword;
        environment["MTX_AUTHINTERNALUSERS_0_IPS"] = Loopback;
        environment["MTX_AUTHINTERNALUSERS_0_PERMISSIONS_0_ACTION"] = "api";
        environment["MTX_AUTHINTERNALUSERS_1_USER"] = "any";
        environment["MTX_AUTHINTERNALUSERS_1_PERMISSIONS_0_ACTION"] = "read";
        environment["MTX_METRICS"] = "false";
        environment["MTX_PPROF"] = "false";
        environment["MTX_PLAYBACK"] = "false";
        environment["MTX_RTSP"] = "false";
        environment["MTX_RTMP"] = "false";
        environment["MTX_HLS"] = "false";
        environment["MTX_SRT"] = "false";
        environment["MTX_MOQ"] = "false";
        environment["MTX_WEBRTC"] = "true";
        environment["MTX_WEBRTCADDRESS"] = httpAddress;
        environment["MTX_WEBRTCLOCALUDPADDRESS"] = iceAddress;
        environment["MTX_WEBRTCIPSFROMINTERFACES"] = "false";
        environment["MTX_WEBRTCADDITIONALHOSTS"] = Loopback;
        environment["MTX_WEBRTCALLOWORIGINS"] = $"http://{httpAddress}";

        var process = Process.Start(startInfo)!;

        // Confirm these listeners belong to this process. Never forward MediaMTX output, which may contain the source URL.
        var marker = $"[WebRTC] started with listeners on {listeners}";
        process.OutputDataReceived += (_, args) =>
        {
            if (args.Data?.EndsWith(marker, StringComparison.Ordinal) == true)
            {
                started.TrySetResult();
            }
        };
        return process;
    }

    private static bool IsSourceConfiguration(string key)
    {
        var name = key.AsSpan();
        if (name.StartsWith("ASPNETCORE_", StringComparison.OrdinalIgnoreCase))
        {
            name = name["ASPNETCORE_".Length..];
        }
        else if (name.StartsWith("DOTNET_", StringComparison.OrdinalIgnoreCase))
        {
            name = name["DOTNET_".Length..];
        }

        return name.StartsWith("Rtsp__", StringComparison.OrdinalIgnoreCase) ||
            name.StartsWith("Rtsp:", StringComparison.OrdinalIgnoreCase);
    }

    private async Task StopGatewayAsync()
    {
        try
        {
            await service.SetGatewayStateAsync(null);
            if (_process is { } process)
            {
                _process = null;
                using (process)
                {
                    process.Kill();
                    using var timeout = new CancellationTokenSource(_stopTimeout);
                    await process.WaitForExitAsync(timeout.Token);
                }
            }

            if (_configPath is { } configPath)
            {
                _configPath = null;
                File.Delete(configPath);
            }
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Failed to stop the MediaMTX gateway cleanly.");
        }
    }
}
