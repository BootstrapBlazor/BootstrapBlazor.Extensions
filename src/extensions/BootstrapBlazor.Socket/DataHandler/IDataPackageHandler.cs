﻿// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.DataHandlers;

/// <summary>
/// Defines an interface for adapting data packages to and from a TCP socket connection.
/// </summary>
/// <remarks>Implementations of this interface are responsible for converting raw data received from a TCP socket
/// into structured data packages and vice versa. This allows for custom serialization and deserialization logic
/// tailored to specific application protocols.</remarks>
public interface IDataPackageHandler
{
    /// <summary>
    /// Gets or sets the callback function to be invoked when data is received asynchronously.
    /// </summary>
    Func<ReadOnlyMemory<byte>, ValueTask>? ReceivedCallBack { get; set; }

    /// <summary>
    /// Asynchronously receives data and processes it.
    /// </summary>
    /// <remarks>The method is designed for asynchronous operations and may be used in scenarios where
    /// efficient handling of data streams is required. Ensure that the <paramref name="data"/> parameter contains valid
    /// data for processing, and handle potential cancellation using the <paramref name="token"/>.</remarks>
    /// <param name="data">The data to be received, represented as a read-only memory block of bytes.</param>
    /// <param name="token">A cancellation token that can be used to cancel the operation. Defaults to <see langword="default"/> if not
    /// provided.</param>
    /// <returns>A <see cref="ValueTask{TResult}"/> containing <see langword="true"/> if the data was successfully received and
    /// processed; otherwise, <see langword="false"/>.</returns>
    ValueTask HandlerAsync(ReadOnlyMemory<byte> data, CancellationToken token = default);
}
