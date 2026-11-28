// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.ComponentModel;
using System.Diagnostics;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text.Json.Nodes;

namespace BootstrapBlazor.Components;

sealed class MediaMtxHostedService(IOptions<MediaMtxOptions> options, ILogger<MediaMtxHostedService> logger, IMediaMtxService service, IMediaMtxProcessLauncher launcher) : BackgroundService
{
    private const string Loopback = "127.0.0.1";
    private const string ReleaseUrl = "https://github.com/bluenviron/mediamtx/releases";
    private const string RestartHint = "Check the port configuration and stop any other process occupying the address, then restart the application.";
    private static readonly TimeSpan _startupTimeout = TimeSpan.FromSeconds(10);
    private static readonly TimeSpan _probeInterval = TimeSpan.FromMilliseconds(100);
    private static readonly TimeSpan _stopTimeout = TimeSpan.FromSeconds(5);
    private Process? _process;
    private string? _configPath;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        try
        {
            if (await StartGatewayAsync(stoppingToken))
            {
                return;
            }
        }
        catch (OperationCanceledException) when (!stoppingToken.IsCancellationRequested)
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

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        await StopGatewayAsync();

        await base.StopAsync(cancellationToken);
    }

    private async Task<bool> StartGatewayAsync(CancellationToken cancellationToken)
    {
        if (!launcher.IsSupported)
        {
            logger.LogWarning("The registered MediaMTX platform launcher does not support this operating system; the gateway is disabled.");
            return false;
        }

        var settings = options.Value;
        var executable = Path.GetFullPath(settings.MediaMtxPath, AppContext.BaseDirectory);
        if (!File.Exists(executable))
        {
            logger.LogWarning("MediaMTX was not found at {MediaMtxPath}; the RTSP gateway is disabled. Download it from {ReleaseUrl}.", executable, ReleaseUrl);
            return false;
        }

        var httpAddress = $"{Loopback}:{settings.WebRtcPort}";
        var apiAddress = $"{Loopback}:{settings.ApiPort}";
        var iceAddress = $"{Loopback}:{settings.WebRtcIcePort}";
        var publicUri = settings.GetWebRtcPublicUri();
        var config = await CreateConfigurationAsync(settings, httpAddress, iceAddress, apiAddress, publicUri, cancellationToken);
        var cameraSources = ConfigureCameras(config, settings.Cameras, logger);

        await StopExistingGatewaysAsync(executable, cancellationToken);

        if (!IsPortAvailable(settings.WebRtcPort, ProtocolType.Tcp) |
            !IsPortAvailable(settings.ApiPort, ProtocolType.Tcp) |
            !IsPortAvailable(settings.WebRtcIcePort, ProtocolType.Udp))
        {
            return false;
        }
        var apiPassword = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeout.CancelAfter(_startupTimeout);

        _configPath = Path.GetTempFileName();
        await File.WriteAllTextAsync(_configPath, config.ToJsonString(), timeout.Token);
        var process = StartMediaMtx(launcher, executable, _configPath, apiPassword, cameraSources);
        _process = process;
        process.BeginOutputReadLine();
        process.BeginErrorReadLine();

        try
        {
            var exited = process.WaitForExitAsync(timeout.Token);
            var ready = WaitForControlApiAsync(apiAddress, apiPassword, timeout.Token);
            var completed = await Task.WhenAny(ready, exited);
            await completed;
            timeout.Token.ThrowIfCancellationRequested();
            if (process.HasExited)
            {
                logger.LogError("MediaMTX exited before the gateway was ready (exit code {ExitCode}); the RTSP gateway is disabled. Verify the MediaMTX version and listener ports. {RestartHint}",
                    process.ExitCode, RestartHint);
                return false;
            }
        }
        finally
        {
            timeout.Cancel();
        }

        await service.SetGatewayStateAsync(apiPassword);
        logger.LogInformation("MediaMTX gateway is ready (PID {ProcessId}). Executable: {ExecutablePath}; WebRTC base URL: {PlayerUrl}; ICE (UDP): {IceAddress}.",
            process.Id, executable, $"http://{httpAddress}/", iceAddress);
        return true;
    }

    private static async Task WaitForControlApiAsync(string apiAddress, string apiPassword, CancellationToken cancellationToken)
    {
        using var client = new HttpClient(new HttpClientHandler { UseProxy = false, AllowAutoRedirect = false })
        {
            BaseAddress = new Uri($"http://{apiAddress}/v3/")
        };
        while (true)
        {
            using var request = client.CreateAuthorizationRequest(HttpMethod.Get, "info", apiPassword);
            try
            {
                using var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    return;
                }
            }
            catch (HttpRequestException)
            {
            }
            await Task.Delay(_probeInterval, cancellationToken);
        }
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

    private async Task StopExistingGatewaysAsync(string executable, CancellationToken cancellationToken)
    {
        var comparison = OperatingSystem.IsWindows() ? StringComparison.OrdinalIgnoreCase : StringComparison.Ordinal;
        foreach (var process in Process.GetProcessesByName(Path.GetFileNameWithoutExtension(executable)))
        {
            using (process)
            {
                string? path;
                try
                {
                    if (process.HasExited)
                    {
                        continue;
                    }
                    path = process.MainModule?.FileName;
                }
                catch (Exception exception) when (exception is Win32Exception or InvalidOperationException)
                {
                    logger.LogWarning(exception, "Could not inspect MediaMTX process {ProcessId}; it will not be stopped.", process.Id);
                    continue;
                }

                if (!string.Equals(path, executable, comparison))
                {
                    continue;
                }

                logger.LogInformation("Stopping existing MediaMTX process {ProcessId} at {ExecutablePath}.", process.Id, executable);
                await StopProcessAsync(process, cancellationToken);
            }
        }
    }

    private static async Task StopProcessAsync(Process process, CancellationToken cancellationToken)
    {
        if (!process.HasExited)
        {
            try
            {
                process.Kill();
            }
            catch (InvalidOperationException) when (process.HasExited)
            {
                // The process exited before Kill completed.
            }
        }
        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeout.CancelAfter(_stopTimeout);
        await process.WaitForExitAsync(timeout.Token);
    }

    private static async Task<JsonObject> CreateConfigurationAsync(MediaMtxOptions settings, string httpAddress, string iceAddress,
        string apiAddress, Uri? publicUri, CancellationToken cancellationToken)
    {
        using var defaultsStream = typeof(MediaMtxHostedService).Assembly.GetManifestResourceStream("BootstrapBlazor.MediaMtx.DefaultConfig.json")
            ?? throw new InvalidOperationException("The default MediaMTX configuration is missing.");
        using var reader = new StreamReader(defaultsStream);
        var defaults = JsonNode.Parse(await reader.ReadToEndAsync())?.AsObject()
            ?? throw new InvalidOperationException("The default MediaMTX configuration must be a JSON object.");
        var config = new JsonObject();
        if (!string.IsNullOrWhiteSpace(settings.ConfigurationPath))
        {
            var path = Path.GetFullPath(settings.ConfigurationPath, AppContext.BaseDirectory);
            config = JsonNode.Parse(await File.ReadAllTextAsync(path, cancellationToken))?.AsObject()
                ?? throw new InvalidOperationException("The MediaMTX configuration must be a JSON object.");
        }

        foreach (var item in defaults.ToArray())
        {
            if (!config.ContainsKey(item.Key))
            {
                defaults.Remove(item.Key);
                config.Add(item.Key, item.Value);
            }
        }

        config["api"] = true;
        config["apiAddress"] = apiAddress;
        config["apiEncryption"] = false;
        config["authMethod"] = "internal";
        config["authInternalUsers"] = new JsonArray
        {
            new JsonObject
            {
                ["user"] = "gateway",
                ["ips"] = new JsonArray(Loopback),
                ["permissions"] = new JsonArray(new JsonObject { ["action"] = "api" })
            },
            new JsonObject
            {
                ["user"] = "any",
                ["permissions"] = new JsonArray(new JsonObject { ["action"] = "read" })
            }
        };
        config["webrtc"] = true;
        config["webrtcAddress"] = httpAddress;
        config["webrtcEncryption"] = false;
        config["webrtcLocalUDPAddress"] = iceAddress;
        config["webrtcIPsFromInterfaces"] = false;
        config["webrtcAdditionalHosts"] = new JsonArray(Loopback);
        var allowedOrigins = new JsonArray($"http://{httpAddress}");
        if (publicUri is not null)
        {
            var publicOrigin = publicUri.GetLeftPart(UriPartial.Authority);
            if (!string.Equals(publicOrigin, $"http://{httpAddress}", StringComparison.OrdinalIgnoreCase))
            {
                allowedOrigins.Add(publicOrigin);
            }
        }
        config["webrtcAllowOrigins"] = allowedOrigins;
        config["logDestinations"] = new JsonArray("stdout");
        return config;
    }

    private static Dictionary<string, string> ConfigureCameras(JsonObject config, Dictionary<string, MediaMtxCameraOptions> cameras, ILogger logger)
    {
        var sources = new Dictionary<string, string>();
        if (cameras.Count == 0)
        {
            return sources;
        }

        var paths = config["paths"]?.AsObject() ?? new JsonObject();
        if (config["paths"] is null)
        {
            config["paths"] = paths;
        }

        foreach (var (path, camera) in cameras)
        {
            var source = MediaMtxService.BuildRtspSourceUrl(camera)
                ?? throw new ArgumentException("Camera URL must be an absolute RTSP or RTSPS URL.", nameof(cameras));
            paths.Add(path, new JsonObject
            {
                ["source"] = camera.Url,
                ["rtspTransport"] = "tcp",
                ["sourceOnDemand"] = true
            });
            if (!string.IsNullOrEmpty(camera.UserName))
            {
                sources.Add($"MTX_PATHS_{path.ToUpperInvariant()}_SOURCE", source);
            }
        }
        return sources;
    }

    private static Process StartMediaMtx(IMediaMtxProcessLauncher launcher, string executable, string configPath,
        string apiPassword, Dictionary<string, string> cameraSources)
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
        environment["MTX_AUTHINTERNALUSERS_0_PASS"] = apiPassword;
        foreach (var (key, source) in cameraSources)
        {
            environment[key] = source;
        }

        return launcher.Start(startInfo);
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

        return name.StartsWith("MediaMtx__", StringComparison.OrdinalIgnoreCase) ||
            name.StartsWith("MediaMtx:", StringComparison.OrdinalIgnoreCase);
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
                    await StopProcessAsync(process, CancellationToken.None);
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
