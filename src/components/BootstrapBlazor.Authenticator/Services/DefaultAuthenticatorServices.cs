// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.Options;
using OtpNet;

namespace BootstrapBlazor.Components;

internal class DefaultAuthenticatorServices(IOptionsMonitor<AuthenticatorOptions> optionsMonitor) : IAuthenticatorService
{
    public string GenerateOtpUri(AuthenticatorOptions? options = null)
    {
        options ??= optionsMonitor.CurrentValue;
        var type = options.Type.ToType();
        var mode = options.Algorithm.ToMode();
        var uri = new OtpUri(type, options.SecretKey, options.UserName, options.IssuerName, mode, options.Digits, options.Period, options.Counter);
        return uri.ToString();
    }
}
