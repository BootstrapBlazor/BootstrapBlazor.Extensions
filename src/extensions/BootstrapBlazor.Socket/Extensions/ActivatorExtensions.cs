// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Reflection;

namespace System;

/// <summary>
/// Activator 扩展方法
/// </summary>
public static class ActivatorExtensions
{
    /// <summary>
    /// 通过指定类型与参数创建实例方法
    /// </summary>
    /// <param name="type"></param>
    /// <param name="args"></param>
    /// <returns></returns>
    public static object? CreateInstance(this Type type, object?[]? args = null)
    {
        var bindings = BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.Instance | BindingFlags.Default;
        return Activator.CreateInstance(type, bindings, null, args, null);
    }

    /// <summary>
    /// 通过指定类型与参数创建实例方法
    /// </summary>
    /// <param name="type"></param>
    /// <param name="args"></param>
    /// <returns></returns>
    public static TType? CreateInstance<TType>(this Type type, object?[]? args = null)
    {
        TType? ret = default;
        var value = type.CreateInstance(args);
        if (value is TType v)
        {
            ret = v;
        }
        return ret;
    }
}
