// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OCR.Services;

public class BaseService<Model>
{

    /// <summary>
    /// 获得/设置 识别完成回调方法,返回 Model 集合
    /// </summary>
    public Func<List<Model>, Task>? OnResult { get; set; }

    /// <summary>
    /// 获得/设置 状态回调方法
    /// </summary>
    public Func<string, Task>? OnStatus { get; set; }

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    public Func<string, Task>? OnError { get; set; }

    public async Task<string> GetStatus(string status = "----------------------------------------------------------")
    {
        try
        {
            Console.WriteLine(status);
            if (OnStatus != null) await OnStatus.Invoke(status);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
        return status;
    }

    public async Task GetResult(List<Model> models)
    {
        try
        {
            Console.WriteLine(models);
            if (OnResult != null) await OnResult.Invoke(models);
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    public string? msg = string.Empty;

}
