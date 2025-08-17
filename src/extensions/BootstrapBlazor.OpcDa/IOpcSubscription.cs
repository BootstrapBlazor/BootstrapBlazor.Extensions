// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// 订阅接口定义
/// </summary>
public interface IOpcSubscription
{
    /// <summary>
    /// 获得 订阅名称
    /// </summary>
    public string Name { get; }

    /// <summary>
    /// 获得/设置 是否保留最后一个值
    /// </summary>
    public bool KeepLastValue { get; set; }

    /// <summary>
    /// 获得/设置 数据变更回调
    /// </summary>
    Action<List<OpcReadItem>>? DataChanged { get; set; }

    /// <summary>
    /// 增加数据项
    /// </summary>
    /// <param name="items"></param>
    void AddItems(IEnumerable<string> items);
}
