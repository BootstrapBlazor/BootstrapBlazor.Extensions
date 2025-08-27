// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Text;

namespace BootstrapBlazor.Components.DataConverter;

/// <summary>
/// 二进制 与 Byte 数组转换方法
/// </summary>
public static class BinConverter
{
    /// <summary>
    /// 将 byte[] 转为 二进制字符串
    /// <para>Converts a byte array to its hexadecimal string representation.</para>
    /// </summary>
    /// <param name="bytes">The byte array to convert.</param>
    /// <param name="separator"></param>
    /// <returns>A string containing the hexadecimal representation of the byte array.</returns>
    public static string ToString(byte[]? bytes, string? separator = "-")
    {
        if (bytes == null || bytes.Length == 0)
        {
            return string.Empty;
        }

        return string.Join(separator, bytes.Select(i => Convert.ToString(i, 2).PadLeft(8, '0')));
    }

    /// <summary>
    /// 将字符串转换为字节数组
    /// </summary>
    /// <param name="str"></param>
    /// <param name="separator"></param>
    /// <param name="options"></param>
    /// <returns></returns>
    public static byte[] ToBytes(string str, string? separator = null, StringSplitOptions options = StringSplitOptions.None)
    {
        // 把 str 内的 separator 符号替换掉
        if (!string.IsNullOrEmpty(separator))
        {
            str = string.Join("", str.Split(separator, options).Select(i => i.PadLeft(8, '0')));
        }

        // 把 Hex 形式的 str 转化为 byte[]
        if (str.Length % 8 != 0)
        {
            throw new ArgumentException("The raw string cannot have an odd number of digits. 参数 str 位数不正确无法转化为 二进制字节数组", nameof(str));
        }

        var bytes = new byte[str.Length / 8];
        for (var i = 0; i < bytes.Length; i++)
        {
            bytes[i] = Convert.ToByte(str.Substring(i * 8, 8), 2);
        }
        return bytes;
    }
}
