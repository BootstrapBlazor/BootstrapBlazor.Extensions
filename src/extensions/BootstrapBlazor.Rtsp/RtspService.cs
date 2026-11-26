// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using Microsoft.Extensions.Options;
using System.Diagnostics.CodeAnalysis;
using System.Net.Http.Json;
using System.Text.RegularExpressions;

namespace BootstrapBlazor.Components;

sealed class RtspService(IOptions<RtspOptions> options) : IRtspService, IDisposable
{
    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly HttpClient _client = new(new HttpClientHandler { UseProxy = false, AllowAutoRedirect = false })
    {
        BaseAddress = new Uri($"http://127.0.0.1:{options.Value.ApiPort}/v3/"),
        Timeout = TimeSpan.FromSeconds(10)
    };
    private string? _apiPassword;

    public async Task SetGatewayStateAsync(string? apiPassword)
    {
        if (apiPassword is not null && apiPassword.Length == 0)
        {
            throw new ArgumentException("The Control API password must not be empty.", nameof(apiPassword));
        }
        await _gate.WaitAsync();
        try
        {
            _apiPassword = apiPassword;
        }
        finally
        {
            _gate.Release();
        }
    }

    public Task<string> AddAsync(RtspCameraOptions camera, CancellationToken cancellationToken = default) =>
        ConfigureAsync("add", camera, cancellationToken);

    public Task<string> UpdateAsync(RtspCameraOptions camera, CancellationToken cancellationToken = default) =>
        ConfigureAsync("patch", camera, cancellationToken);

    private async Task<string> ConfigureAsync(string operation, RtspCameraOptions camera, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(camera);
        var path = camera.Path;
        ValidatePath(path);
        var source = BuildSource(camera);
        await SendAsync(operation == "add" ? HttpMethod.Post : HttpMethod.Patch,
            $"config/paths/{operation}/{path}", new { source, rtspTransport = "tcp", sourceOnDemand = true }, cancellationToken);
        return $"http://127.0.0.1:{options.Value.WebRtcPort}/{path}/";
    }

    public async Task RemoveAsync(string path, CancellationToken cancellationToken = default)
    {
        ValidatePath(path);
        await SendAsync(HttpMethod.Delete, $"config/paths/delete/{path}", null, cancellationToken);
    }

    private async Task SendAsync(HttpMethod method, string route, object? content, CancellationToken cancellationToken)
    {
        await _gate.WaitAsync(cancellationToken);
        try
        {
            if (_apiPassword is not { } apiPassword)
            {
                throw new InvalidOperationException("The MediaMTX gateway is not running.");
            }
            using var request = _client.CreateApiRequest(method, route, apiPassword);
            if (content is not null)
            {
                request.Content = JsonContent.Create(content);
            }
            using var response = await _client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken);
            if (!response.IsSuccessStatusCode)
            {
                // API response bodies can contain the RTSP source, including credentials.
                throw new HttpRequestException($"MediaMTX camera management failed with HTTP {(int)response.StatusCode}.",
                    null, response.StatusCode);
            }
        }
        finally
        {
            _gate.Release();
        }
    }

    private static void ValidatePath([NotNull] string? path)
    {
        if (path is null or "all" || !Regex.IsMatch(path, @"\A[a-z][a-z0-9-]{0,62}\z", RegexOptions.CultureInvariant))
        {
            throw new ArgumentException("Camera path must start with a lowercase letter, contain only lowercase letters, digits or hyphens, be at most 63 characters, and not be the reserved name 'all'.", nameof(path));
        }
    }

    private static string BuildSource(RtspCameraOptions camera)
    {
        var url = camera.Url;
        if (!Uri.TryCreate(url, UriKind.Absolute, out var source) ||
            !source.IsWellFormedOriginalString() ||
            source.Scheme is not ("rtsp" or "rtsps") ||
            source.Host.Length == 0 ||
            source.Port is < 1 or > 65535 ||
            source.AbsolutePath.Length <= 1 ||
            source.Query.Length != 0 ||
            source.Fragment.Length != 0)
        {
            throw InvalidSource();
        }

        var sourceAddress = url.AsSpan(source.Scheme.Length + 3);
        var pathStart = sourceAddress.IndexOf('/');
        var authority = sourceAddress[..pathStart];
        if (authority.Contains('@') || authority.LastIndexOf(':') <= authority.LastIndexOf(']'))
        {
            throw InvalidSource();
        }
        if (string.IsNullOrEmpty(camera.UserName))
        {
            if (!string.IsNullOrEmpty(camera.Password))
            {
                throw new ArgumentException("A camera user name is required when a password is set.");
            }
            return url;
        }
        return $"{source.Scheme}://{Uri.EscapeDataString(camera.UserName)}:{Uri.EscapeDataString(camera.Password ?? string.Empty)}@{sourceAddress}";
    }

    private static ArgumentException InvalidSource() =>
        new("Camera URL must be an absolute rtsp:// or rtsps:// URL with an explicit port and stream path, without credentials, query or fragment.");

    public void Dispose()
    {
        _client.Dispose();
        _gate.Dispose();
    }
}
