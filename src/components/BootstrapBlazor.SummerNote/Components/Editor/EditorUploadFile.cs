// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// Editor 上传文件信息类
/// </summary>
public class EditorUploadFile(string fileName, string contentType, long fileSize, Stream stream)
{
    /// <summary>
    /// 获得/设置 文件名
    /// </summary>
    public string FileName => fileName;

    /// <summary>
    /// 获得/设置 文件大小
    /// </summary>
    public long FileSize => fileSize;

    /// <summary>
    /// 获得/设置 文件类型
    /// </summary>
    public string ContentType => contentType;

    /// <summary>
    /// 获得/设置 上传的文件流
    /// </summary>
    public Stream Stream => stream;

    /// <summary>
    /// 获得/设置 错误信息
    /// </summary>
    public Exception? Error { get; set; }
}
