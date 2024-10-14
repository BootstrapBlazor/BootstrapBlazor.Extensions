// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Text.RegularExpressions;

namespace BootstrapBlazor.Components;

/// <summary>
/// 裁切结果实体类
/// </summary>
/// <remarks>
/// 构造函数
/// </remarks>
/// <param name="data"></param>
public class ImageCropperResult(string data)
{
    /// <summary>
    /// 获得/设置 裁剪后数据 base64 格式字符串
    /// </summary>
    public string Data { get; } = data;

    /// <summary>
    /// 获得/设置 裁剪后数据流 由 base64 格式字符串转换
    /// </summary>
    [NotNull]
    public Stream? Stream
    {
        get
        {
            _stream ??= ConvertToStream();
            return _stream;
        }
    }

    private Stream? _stream;

    private MemoryStream ConvertToStream()
    {
        MemoryStream? stream = null;
        var match = Regex.Match(Data, @"data:image/(?<type>.+?),(?<data>.+)");
        if (match.Success)
        {
            var data = match.Groups["data"].Value;
            var bytes = Convert.FromBase64String(data);
            stream = new MemoryStream(bytes);
        }
        return stream ?? new MemoryStream();
    }
}
