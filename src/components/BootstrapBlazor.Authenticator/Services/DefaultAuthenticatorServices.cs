// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.Options;
using OtpNet;

namespace BootstrapBlazor.Components;

class DefaultAuthenticatorServices(IOptionsMonitor<AuthenticatorOptions> optionsMonitor) : IAuthenticatorService
{
    public TOTPInstance? TOTPInstance { get; private set; }

    public string GenerateOtpUri(AuthenticatorOptions? options = null)
    {
        options ??= optionsMonitor.CurrentValue;
        var type = options.Type.ToType();
        var mode = options.Algorithm.ToMode();
        var uri = new OtpUri(type, options.SecretKey, options.UserName, options.IssuerName, mode, options.Digits, options.Period, options.Counter);
        return uri.ToString();
    }

    public string ComputeTotp(string secretKey, DateTime? timestamp = null)
    {
        var totp = new Totp(Base32Encoding.ToBytes(secretKey));
        TOTPInstance = new DefaultTOTPInstance(totp);
        return timestamp == null ? totp.ComputeTotp() : totp.ComputeTotp(timestamp.Value);
    }

    public int GetRemainingSeconds(DateTime? timestamp = null)
    {
        if (TOTPInstance != null)
        {
            return timestamp == null ? TOTPInstance.GetRemainingSeconds() : TOTPInstance.GetRemainingSeconds(timestamp.Value);
        }
        var totp = new Totp(Base32Encoding.ToBytes("OMM2LVLFX6QJHMYI"));
        return timestamp == null ? totp.RemainingSeconds() : totp.RemainingSeconds(timestamp.Value);
    }

    public string GenerateSecretKey(int length = 20)
    {
        var secretKey = KeyGeneration.GenerateRandomKey(length);
        return Base32Encoding.ToString(secretKey);
    }

    public byte[] GetSecretKeyBytes(string input)
    {
        return Base32Encoding.ToBytes(input);
    }
}

class DefaultTOTPInstance(Totp totp) : TOTPInstance
{
    public override int GetRemainingSeconds(DateTime? timestamp = null)
    {
        return timestamp == null ? totp.RemainingSeconds() : totp.RemainingSeconds(timestamp.Value);
    }
}
