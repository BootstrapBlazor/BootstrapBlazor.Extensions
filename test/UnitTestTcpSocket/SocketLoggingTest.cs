// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Socket.Logging;
using Microsoft.Extensions.Logging;

namespace UnitTestTcpSocket;

public class SocketLoggingTest
{
    [Fact]
    public void Logger_Ok()
    {
        SocketLogging.LogError(new Exception());
        SocketLogging.LogInformation("Information");
        SocketLogging.LogWarning("Warning");
        SocketLogging.LogDebug("Debug");

        SocketLogging.Init(new LoggerFactory().CreateLogger("SocketLoggingTest"));
        SocketLogging.LogInformation("Information");
        SocketLogging.LogWarning("Warning");
        SocketLogging.LogDebug("Debug");
    }
}
