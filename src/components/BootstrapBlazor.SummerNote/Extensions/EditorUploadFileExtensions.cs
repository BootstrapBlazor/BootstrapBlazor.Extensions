// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// EditorUploadFile 扩展方法类
/// </summary>
public static class EditorUploadFileExtensions
{
    /// <summary>
    /// 保存到文件方法
    /// </summary>
    /// <param name="upload"></param>
    /// <param name="fileName"></param>
    /// <param name="bufferSize"></param>
    /// <param name="token"></param>
    /// <returns></returns>
    public static async Task<bool> SaveToFileAsync(this EditorUploadFile upload, string fileName, int bufferSize = 64 * 1024, CancellationToken token = default)
    {
        var ret = false;

        // 文件保护，如果文件存在则先删除
        if (File.Exists(fileName))
        {
            try
            {
                File.Delete(fileName);
            }
            catch (Exception ex)
            {
                upload.Error = ex;
                return ret;
            }
        }

        var folder = Path.GetDirectoryName(fileName);
        if (!string.IsNullOrEmpty(folder) && !Directory.Exists(folder))
        {
            Directory.CreateDirectory(folder);
        }

        using var uploadFile = File.OpenWrite(fileName);
        try
        {
            // 打开文件流
            var buffer = new byte[bufferSize];
            int bytesRead = 0;

            // 开始读取文件
            while ((bytesRead = await upload.Stream.ReadAsync(buffer, token)) > 0)
            {
                await uploadFile.WriteAsync(buffer.AsMemory(0, bytesRead), token);
            }
            ret = true;
        }
        catch (Exception ex)
        {
            upload.Error = ex;
        }

        return ret;
    }
}
