// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.TcpSocket;

/// <summary>
/// ITcpSocketFactory Interface
/// </summary>
public interface ITcpSocketFactory : IAsyncDisposable
{
    /// <summary>
    /// Retrieves an existing TCP socket client by name or creates a new one using the specified configuration.
    /// </summary>
    /// <param name="name">The unique name of the TCP socket client to retrieve or create. Cannot be null or empty.</param>
    /// <param name="valueFactory">A delegate used to configure the <see cref="TcpSocketClientOptions"/> for the new TCP socket client if it does not
    /// already exist. This delegate is invoked only when a new client is created.</param>
    /// <returns>An instance of <see cref="ITcpSocketClient"/> corresponding to the specified name. If the client already exists,
    /// the existing instance is returned; otherwise, a new instance is created and returned.</returns>
    ITcpSocketClient GetOrCreate(string name, Action<TcpSocketClientOptions> valueFactory);

    /// <summary>
    /// Removes the TCP socket client associated with the specified name.
    /// </summary>
    /// <param name="name">The name of the TCP socket client to remove. Cannot be <see langword="null"/> or empty.</param>
    /// <returns>The removed <see cref="ITcpSocketClient"/> instance if a client with the specified name exists;  otherwise, <see
    /// langword="null"/>.</returns>
    ITcpSocketClient? Remove(string name);
}
