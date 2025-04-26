// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.Options;
using OtpNet;

namespace BootstrapBlazor.Components;

class DefaultTotpServices(IOptionsMonitor<AuthenticatorOptions> optionsMonitor) : ITotpService
{
    [NotNull]
    public TotpInstanceBase? Instance { get; private set; }

    public string GenerateOtpUri(AuthenticatorOptions? options = null)
    {
        options ??= optionsMonitor.CurrentValue;
        var type = options.Type.ToType();
        var mode = options.Algorithm.ToMode();
        var uri = new OtpUri(type, options.SecretKey, options.UserName, options.IssuerName, mode, options.Digits, options.Period, options.Counter);
        return uri.ToString();
    }

    public string Compute(string secretKey, DateTime? timestamp = null)
    {
        var instance = new Totp(Base32Encoding.ToBytes(secretKey));
        Instance = new DefaultTotpInstance(instance);
        return timestamp == null ? instance.ComputeTotp() : instance.ComputeTotp(timestamp.Value);
    }

    public int GetRemainingSeconds(DateTime? timestamp = null)
    {
        if (Instance != null)
        {
            return timestamp == null ? Instance.GetRemainingSeconds() : Instance.GetRemainingSeconds(timestamp.Value);
        }
        var instance = new Totp(Base32Encoding.ToBytes("OMM2LVLFX6QJHMYI"));
        return timestamp == null ? instance.RemainingSeconds() : instance.RemainingSeconds(timestamp.Value);
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

    public bool Verify(string code, DateTime? timestamp = null)
    {
        if (Instance != null)
        {
            return timestamp == null ? Instance.Verify(code) : Instance.Verify(code, timestamp.Value);
        }
        var instance = new Totp(Base32Encoding.ToBytes("OMM2LVLFX6QJHMYI"));
        return timestamp == null ? instance.VerifyTotp(code, out _) : instance.VerifyTotp(timestamp.Value, code, out _);
    }
}

class DefaultTotpInstance(Totp instance) : TotpInstanceBase
{
    public override int GetRemainingSeconds(DateTime? timestamp = null)
    {
        return timestamp == null ? instance.RemainingSeconds() : instance.RemainingSeconds(timestamp.Value);
    }

    public override bool Verify(string code, DateTime? timestamp = null)
    {
        return timestamp == null ? instance.VerifyTotp(code, out _) : instance.VerifyTotp(timestamp.Value, code, out _);
    }
}
