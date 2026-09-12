// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcUa;

static class Guard
{
    public static void ThrowIfDisposed(bool disposed, object instance)
    {
#if NET6_0
        if (disposed)
        {
            throw new ObjectDisposedException(instance.GetType().FullName);
        }
#else
        ObjectDisposedException.ThrowIf(disposed, instance.GetType());
#endif
    }

    public static void ThrowIfNullOrWhiteSpace(string? value, string paramName)
    {
#if NET8_0_OR_GREATER
        ArgumentException.ThrowIfNullOrWhiteSpace(value, paramName);
#else
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException($"'{paramName}' cannot be null or whitespace.", paramName);
        }
#endif
    }
}
