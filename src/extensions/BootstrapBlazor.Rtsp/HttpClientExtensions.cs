// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using System.Net.Http.Headers;
using System.Text;

namespace BootstrapBlazor.Components;

static class HttpClientExtensions
{
    internal static HttpRequestMessage CreateApiRequest(this HttpClient client, HttpMethod method, string route, string password)
    {
        var baseAddress = client.BaseAddress ?? throw new InvalidOperationException("The MediaMTX Control API base address is not configured.");
        var request = new HttpRequestMessage(method, new Uri(baseAddress, route));
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic",
            Convert.ToBase64String(Encoding.UTF8.GetBytes($"gateway:{password}")));
        return request;
    }
}
