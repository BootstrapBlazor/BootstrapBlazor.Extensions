// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 汉字拼音服务接口
/// </summary>
public interface IPinyinService
{
    /// <summary>
    /// 判断给定字符串是否包含中文
    /// </summary>
    /// <param name="text"></param>
    /// <returns></returns>
    bool IsChinese(string text);

    /// <summary>
    /// 给定中文字符串，返回拼音首字母字符串
    /// </summary>
    /// <param name="text"></param>
    /// <returns></returns>
    string GetFirstLetters(string text);
}
