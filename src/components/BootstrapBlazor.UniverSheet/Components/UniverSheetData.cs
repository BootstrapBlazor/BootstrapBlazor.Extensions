// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// UniverSheetData 组件数据类
/// </summary>
public class UniverSheetData
{
    /// <summary>
    /// 获得/设置 消息名称 默认 null 未设置
    /// </summary>
    /// <remarks>为 null 时组件会处理内置几个 <see cref="CommandName"/></remarks>
    public string? MessageName { get; set; }

    /// <summary>
    /// 获得/设置 命令名称 默认 null 未设置
    /// </summary>
    public string? CommandName { get; set; }

    /// <summary>
    /// 获得/设置 表格数据 默认 null 未设置
    /// </summary>
    /// <remarks>给 UniverSheet Workbook 使用</remarks>
    public object? WorkbookData { get; set; }

    /// <summary>
    /// 获得/设置 附加业务数据 默认 null 未设置
    /// </summary>
    /// <remarks>给自定义业务使用</remarks>
    public object? Data { get; set; }
}
