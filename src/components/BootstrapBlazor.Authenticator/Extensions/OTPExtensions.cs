// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

internal static class OTPExtensions
{
    public static OtpNet.OtpHashMode ToMode(this OTPHashMode mode) => mode switch
    {
        OTPHashMode.Sha256 => OtpNet.OtpHashMode.Sha256,
        OTPHashMode.Sha512 => OtpNet.OtpHashMode.Sha512,
        _ => OtpNet.OtpHashMode.Sha1
    };

    public static OtpNet.OtpType ToType(this OTPType type) => type switch
    {
        OTPType.Hotp => OtpNet.OtpType.Hotp,
        _ => OtpNet.OtpType.Totp
    };
}
