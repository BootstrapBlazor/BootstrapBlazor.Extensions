// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Socket.Logging;

namespace UnitTestTcpSocket;

public class SocketLoggingTest
{
    [Fact]
    public void Logger_Ok()
    {
        SocketLogging.LogError(new Exception());
    }
}
