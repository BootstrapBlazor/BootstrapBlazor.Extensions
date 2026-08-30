// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

internal static class OtpExtensions
{
    public static OtpNet.OtpHashMode ToMode(this OtpHashMode mode) => mode switch
    {
        OtpHashMode.Sha256 => OtpNet.OtpHashMode.Sha256,
        OtpHashMode.Sha512 => OtpNet.OtpHashMode.Sha512,
        _ => OtpNet.OtpHashMode.Sha1
    };

    public static OtpNet.OtpType ToType(this OtpType type) => type switch
    {
        OtpType.Hotp => OtpNet.OtpType.Hotp,
        _ => OtpNet.OtpType.Totp
    };
}
