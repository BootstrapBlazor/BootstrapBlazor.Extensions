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
using System.Runtime.InteropServices;

namespace BootstrapBlazor.Components;

sealed class RtspHostedService(IOptions<RtspOptions> options, ILogger<RtspHostedService> logger) : IHostedService, IDisposable
{
    private const string Loopback = "127.0.0.1";
    private const string SourceKey = "MTX_PATHS_HIKVISION_SOURCE";
    private static readonly TimeSpan _startupTimeout = TimeSpan.FromSeconds(10);
    private static readonly TimeSpan _stopTimeout = TimeSpan.FromSeconds(5);
    private Process? _process;
    private WindowsProcessJob? _job;
    private string? _configPath;

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        if (_process is not null || _configPath is not null)
        {
            logger.LogWarning("This host already owns a MediaMTX gateway; skipping startup.");
            return;
        }

        var settings = options.Value;
        var source = BuildSource(settings);
        var executable = ResolveExecutable(settings.ExecutablePath);
        var httpAddress = GetAddress(settings.WebRtcPort, nameof(RtspOptions.WebRtcPort));
        var iceAddress = GetAddress(settings.WebRtcIcePort, nameof(RtspOptions.WebRtcIcePort));
        var endpoint = $"http://{httpAddress}";
        var listeners = $"{httpAddress} (TCP/HTTP), {iceAddress} (UDP/ICE)";
        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeout.CancelAfter(_startupTimeout);

        var ready = false;
        try
        {
            if (OperatingSystem.IsWindows())
            {
                _job = new WindowsProcessJob();
            }

            // An explicit empty file prevents MediaMTX from loading an unrelated default configuration.
            _configPath = Path.GetTempFileName();
            var started = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
            var process = StartMediaMtx(executable, _configPath, httpAddress, iceAddress, source, started, listeners);
            _process = process;
            if (OperatingSystem.IsWindows())
            {
                _job?.Assign(process);
            }
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();

            var exited = process.WaitForExitAsync(timeout.Token);
            var completed = await Task.WhenAny(started.Task, exited).WaitAsync(timeout.Token);
            if (completed == exited || process.HasExited)
            {
                timeout.Token.ThrowIfCancellationRequested();
                throw StartupExit(process, listeners);
            }

            using var client = new HttpClient(new HttpClientHandler { UseProxy = false, AllowAutoRedirect = false });
            using var request = new HttpRequestMessage(HttpMethod.Options, $"{endpoint}/hikvision/whep");
            using var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, timeout.Token);
            if (process.HasExited)
            {
                throw StartupExit(process, listeners);
            }
            if (response.StatusCode != HttpStatusCode.NoContent)
            {
                throw new InvalidOperationException($"MediaMTX's /hikvision/whep readiness probe returned HTTP {(int)response.StatusCode}; expected HTTP 204.");
            }

            ready = true;
            logger.LogInformation("MediaMTX gateway is ready (PID {ProcessId}). WebRTC player: {PlayerUrl}; ICE (UDP): {IceAddress}.",
                process.Id, $"{endpoint}/hikvision/", iceAddress);
        }
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            throw new TimeoutException($"MediaMTX did not become ready on {listeners} within {_startupTimeout.TotalSeconds} seconds. Verify the installed MediaMTX version and listener ports.");
        }
        catch (HttpRequestException)
        {
            throw new InvalidOperationException($"Could not reach the MediaMTX readiness endpoint at {endpoint}/hikvision/whep.");
        }
        finally
        {
            if (!ready)
            {
                await StopGatewayAsync();
            }
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => StopGatewayAsync();

    public void Dispose() => StopGatewayAsync().GetAwaiter().GetResult();

    private static string BuildSource(RtspOptions settings)
    {
        if (settings.Url is not { } url ||
            !Uri.TryCreate(url, UriKind.Absolute, out var source) ||
            !source.IsWellFormedOriginalString() ||
            source.Scheme is not ("rtsp" or "rtsps") ||
            source.Host.Length == 0 ||
            source.Port is < 1 or > 65535 ||
            source.AbsolutePath.Length <= 1 ||
            source.Fragment.Length != 0)
        {
            throw InvalidSource();
        }

        var sourceAddress = url.AsSpan(source.Scheme.Length + 3);
        var pathStart = sourceAddress.IndexOf('/');
        if (pathStart < 0)
        {
            throw InvalidSource();
        }

        var authority = sourceAddress[..pathStart];
        if (authority.Contains('@') || authority.LastIndexOf(':') <= authority.LastIndexOf(']'))
        {
            throw InvalidSource();
        }

        if (string.IsNullOrEmpty(settings.UserName))
        {
            if (!string.IsNullOrEmpty(settings.Password))
            {
                throw new InvalidOperationException("Rtsp:UserName is required when Rtsp:Password is set.");
            }
            return $"{source.Scheme}://{sourceAddress}";
        }

        var userName = Uri.EscapeDataString(settings.UserName);
        var password = Uri.EscapeDataString(settings.Password ?? string.Empty);
        return $"{source.Scheme}://{userName}:{password}@{sourceAddress}";
    }

    private static InvalidOperationException InvalidSource() =>
        new("Rtsp:Url must be an absolute rtsp:// or rtsps:// URL with an explicit port and stream path, without credentials or a fragment.");

    private static string ResolveExecutable(string executablePath)
    {
        if (string.IsNullOrEmpty(executablePath))
        {
            executablePath = GetBundledExecutablePath();
        }
        else if (string.IsNullOrWhiteSpace(executablePath))
        {
            throw new InvalidOperationException("Rtsp:ExecutablePath must not consist only of whitespace.");
        }

        var path = Path.GetFullPath(executablePath, AppContext.BaseDirectory);
        return File.Exists(path)
            ? path
            : throw new FileNotFoundException("MediaMTX was not found. Publish for the application's operating system and architecture or set Rtsp:ExecutablePath to an existing executable.", path);
    }

    private static string GetBundledExecutablePath()
    {
        var rid = RuntimeInformation.ProcessArchitecture switch
        {
            Architecture.X64 when OperatingSystem.IsWindows() => "win-x64",
            Architecture.X64 when OperatingSystem.IsLinux() => "linux-x64",
            Architecture.Arm64 when OperatingSystem.IsLinux() => "linux-arm64",
            Architecture.Arm when OperatingSystem.IsLinux() => "linux-arm",
            Architecture.X64 when OperatingSystem.IsMacOS() => "osx-x64",
            Architecture.Arm64 when OperatingSystem.IsMacOS() => "osx-arm64",
            _ => throw new PlatformNotSupportedException($"No bundled MediaMTX executable is available for runtime '{RuntimeInformation.RuntimeIdentifier}'. Set Rtsp:ExecutablePath to a compatible executable.")
        };
        return Path.Combine("tools", rid, OperatingSystem.IsWindows() ? "mediamtx.exe" : "mediamtx");
    }

    private static string GetAddress(int port, string option) => port is >= 1 and <= 65535
        ? $"{Loopback}:{port}"
        : throw new InvalidOperationException($"Rtsp:{option} must be between 1 and 65535.");

    private static Process StartMediaMtx(string executable, string configPath, string httpAddress, string iceAddress,
        string source, TaskCompletionSource started, string listeners)
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
        environment["MTX_API"] = "false";
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
        environment["MTX_PATHS_HIKVISION_RTSPTRANSPORT"] = "tcp";
        environment["MTX_PATHS_HIKVISION_SOURCEONDEMAND"] = "true";
        environment[SourceKey] = source;

        Process process;
        try
        {
            process = Process.Start(startInfo) ?? throw new InvalidOperationException("MediaMTX did not start as a child process.");
        }
        catch (Win32Exception exception)
        {
            throw new InvalidOperationException($"Could not start MediaMTX (OS error {exception.NativeErrorCode}). Verify Rtsp:ExecutablePath, file permissions and the executable's platform.");
        }
        finally
        {
            environment.Remove(SourceKey);
        }

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

    private static InvalidOperationException StartupExit(Process process, string listeners) =>
        new($"MediaMTX exited before the /hikvision stream endpoint was ready (exit code {process.ExitCode}). Verify the MediaMTX version and that {listeners} are available.");

    private async Task StopGatewayAsync()
    {
        if (_process is { } process)
        {
            if (!process.HasExited)
            {
                try
                {
                    process.Kill();
                }
                catch (Exception exception) when ((exception is InvalidOperationException or Win32Exception) && process.HasExited)
                {
                    // The owned process exited between HasExited and Kill.
                }
            }
            using var timeout = new CancellationTokenSource(_stopTimeout);
            try
            {
                await process.WaitForExitAsync(timeout.Token).ConfigureAwait(false);
            }
            catch (OperationCanceledException)
            {
                throw new TimeoutException($"MediaMTX process {process.Id} did not exit within {_stopTimeout.TotalSeconds} seconds.");
            }
            process.Dispose();
            _process = null;
        }

        if (OperatingSystem.IsWindows())
        {
            _job?.Dispose();
        }
        _job = null;

        if (_configPath is { } configPath)
        {
            File.Delete(configPath);
            _configPath = null;
        }
    }
}
