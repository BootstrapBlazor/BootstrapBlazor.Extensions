// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.Logging;

namespace BootstrapBlazor.Socket.Logging;

/// <summary>
/// Socket 日志记录类
/// </summary>
public static class SocketLogging
{
    private static ILogger? _logger;
    private static bool _inited;

    /// <summary>
    /// 返回 是否已经初始化
    /// </summary>
    public static bool Inited => _inited;

    /// <summary>
    /// 初始化 ILogger 实例
    /// </summary>
    /// <param name="logger"></param>
    public static void Init(ILogger logger)
    {
        _inited = true;
        _logger = logger;
    }

    /// <summary>
    /// 记录异常信息方法
    /// </summary>
    /// <param name="ex"></param>
    /// <param name="message"></param>
    public static void LogError(Exception ex, string? message = null)
    {
        if (_logger == null)
        {
            return;
        }

        _logger.LogError(ex, "{message}", message);
    }
}
