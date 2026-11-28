// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;

namespace BootstrapBlazor.Components;

sealed class MediaMtxService(IOptions<MediaMtxOptions> options) : IMediaMtxService, IDisposable
{
    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly HashSet<string?> _registeredPaths = new(StringComparer.Ordinal);
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
            _registeredPaths.Clear();
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task<string> AddOrUpdateAsync(MediaMtxCameraOptions camera, CancellationToken cancellationToken = default)
    {
        var path = camera.Path;
        var source = BuildSource(camera);
        var playerBaseUrl = options.Value.GetWebRtcPublicUri()?.AbsoluteUri ?? $"http://127.0.0.1:{options.Value.WebRtcPort}/";
        var content = new { source, rtspTransport = "tcp", sourceOnDemand = true };
        await _gate.WaitAsync(cancellationToken);
        try
        {
            await AddOrUpdatePathAsync(path, content, cancellationToken);
            _registeredPaths.Add(path);
            return $"{playerBaseUrl}{path}/";
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task RemoveAsync(string path, CancellationToken cancellationToken = default)
    {
        await _gate.WaitAsync(cancellationToken);
        try
        {
            await SendAsync(HttpMethod.Delete, $"config/paths/delete/{path}", null, cancellationToken);
            _registeredPaths.Remove(path);
        }
        finally
        {
            _gate.Release();
        }
    }

    private async Task AddOrUpdatePathAsync(string? path, object content, CancellationToken cancellationToken)
    {
        if (_registeredPaths.Contains(path))
        {
            if (await UpdatePathAsync(path, content, cancellationToken, allowMissing: true))
            {
                return;
            }
            _registeredPaths.Remove(path);
        }

        if (!await SendAsync(HttpMethod.Post, $"config/paths/add/{path}", content, cancellationToken, HttpStatusCode.BadRequest))
        {
            await UpdatePathAsync(path, content, cancellationToken);
        }
    }

    private Task<bool> UpdatePathAsync(string? path, object content, CancellationToken cancellationToken, bool allowMissing = false) =>
        SendAsync(HttpMethod.Patch, $"config/paths/patch/{path}", content, cancellationToken, allowMissing ? HttpStatusCode.NotFound : null);

    private async Task<bool> SendAsync(HttpMethod method, string route, object? content, CancellationToken cancellationToken,
        HttpStatusCode? fallbackStatus = null)
    {
        if (_apiPassword is not { } apiPassword)
        {
            throw new InvalidOperationException("The MediaMTX gateway is not running.");
        }
        using var request = _client.CreateAuthorizationRequest(method, route, apiPassword);
        if (content is not null)
        {
            request.Content = JsonContent.Create(content);
        }
        var completionOption = fallbackStatus == HttpStatusCode.BadRequest
            ? HttpCompletionOption.ResponseContentRead
            : HttpCompletionOption.ResponseHeadersRead;
        using var response = await _client.SendAsync(request, completionOption, cancellationToken);
        if (response.IsSuccessStatusCode)
        {
            return true;
        }
        if (response.StatusCode == fallbackStatus &&
            (fallbackStatus != HttpStatusCode.BadRequest || await IsDuplicatePathAsync(response.Content, cancellationToken)))
        {
            return false;
        }

        // API response bodies can contain the RTSP source, including credentials.
        throw new HttpRequestException($"MediaMTX camera management failed with HTTP {(int)response.StatusCode}.",
            null, response.StatusCode);
    }

    private static async Task<bool> IsDuplicatePathAsync(HttpContent content, CancellationToken cancellationToken)
    {
        using var stream = await content.ReadAsStreamAsync(cancellationToken);
        try
        {
            using var json = await JsonDocument.ParseAsync(stream, cancellationToken: cancellationToken);
            return json.RootElement.ValueKind == JsonValueKind.Object &&
                json.RootElement.TryGetProperty("error", out var error) &&
                error.ValueKind == JsonValueKind.String && error.ValueEquals("path already exists");
        }
        catch (JsonException)
        {
            return false;
        }
    }

    internal static string BuildSource(MediaMtxCameraOptions camera)
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
