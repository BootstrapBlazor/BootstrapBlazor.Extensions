// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Net;
using System.Net.Sockets;
using System.Runtime.Versioning;

namespace BootstrapBlazor.TcpSocket;

/// <summary>
/// SocketUtility 帮助类
/// </summary>
public static class TcpSocketUtility
{
    /// <summary>
    /// Converts a string representation of an IP address or hostname into an <see cref="IPAddress"/> object.
    /// </summary>
    /// <remarks>This method handles common special cases for IP address strings, such as "localhost" and
    /// "any". For other inputs, it attempts  to parse the string as an IP address using <see
    /// cref="IPAddress.TryParse(string, out IPAddress)"/>. If parsing fails, the method  resolves the input as a
    /// hostname.</remarks>
    /// <param name="ipString">A string containing the IP address or hostname to convert. Special values include: <list type="bullet">
    /// <item><description><c>"localhost"</c> returns the loopback address (<see
    /// cref="IPAddress.Loopback"/>).</description></item> <item><description><c>"any"</c> returns the wildcard address
    /// (<see cref="IPAddress.Any"/>).</description></item> </list> For other values, the method attempts to parse the
    /// string as an IP address or resolve it as a hostname.</param>
    /// <returns>An <see cref="IPAddress"/> object representing the parsed or resolved IP address. If the input cannot be parsed
    /// or resolved,  the method returns a default IP address.</returns>
    [UnsupportedOSPlatform("browser")]
    public static IPAddress ConvertToIPAddress(string ipString)
    {
        if (string.IsNullOrEmpty(ipString))
        {
            throw new ArgumentNullException(nameof(ipString), "IP address cannot be null or empty.");
        }

        if (ipString.Equals("localhost", StringComparison.OrdinalIgnoreCase))
        {
            return IPAddress.Loopback;
        }
        if (ipString.Equals("any", StringComparison.OrdinalIgnoreCase))
        {
            return IPAddress.Any;
        }

        return IPAddress.TryParse(ipString, out var ip) ? ip : IPAddressByHostName;
    }

    [ExcludeFromCodeCoverage]

    [UnsupportedOSPlatform("browser")]
    private static IPAddress IPAddressByHostName => Dns.GetHostAddresses(Dns.GetHostName(), AddressFamily.InterNetwork).FirstOrDefault() ?? IPAddress.Any;

    /// <summary>
    /// Converts a string representation of an IP address and a port number into an <see cref="IPEndPoint"/> instance.
    /// </summary>
    /// <remarks>This method is not supported on browser platforms.</remarks>
    /// <param name="ipString">The string representation of the IP address. Must be a valid IPv4 or IPv6 address.</param>
    /// <param name="port">The port number associated with the endpoint. Must be between 0 and 65535.</param>
    /// <returns>An <see cref="IPEndPoint"/> representing the specified IP address and port.</returns>
    /// <exception cref="ArgumentOutOfRangeException">Thrown if <paramref name="port"/> is less than 0 or greater than 65535.</exception>
    [UnsupportedOSPlatform("browser")]
    public static IPEndPoint ConvertToIpEndPoint(string ipString, int port)
    {
        if (port < 0 || port > 65535)
        {
            throw new ArgumentOutOfRangeException(nameof(port), "Port must be between 0 and 65535.");
        }

        var address = ConvertToIPAddress(ipString);
        return new IPEndPoint(address, port);
    }
}
