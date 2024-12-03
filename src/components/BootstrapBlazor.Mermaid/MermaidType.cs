// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 图类型
/// </summary>
public enum MermaidType
{
    /// <summary>
    /// 不指定图类型，需要在ChildContent中显式指定
    /// </summary>
    None,

    /// <summary>
    /// 流程图
    /// </summary>
    [Description("flowchart")]
    Flowchart,

    /// <summary>
    /// 序列图
    /// </summary>
    [Description("sequenceDiagram")]
    SequenceDiagram,

    /// <summary>
    /// 类图
    /// </summary>
    [Description("classDiagram")]
    ClassDiagram,

    /// <summary>
    /// 状态图
    /// </summary>
    [Description("stateDiagram")]
    StateDiagram,

    /// <summary>
    /// 实体关系图
    /// </summary>
    [Description("erDiagram")]
    ErDiagram,

    /// <summary>
    /// 用户旅程图
    /// </summary>
    [Description("journey")]
    Journey,

    /// <summary>
    /// 甘特图
    /// </summary>
    [Description("gantt")]
    Gantt,

    /// <summary>
    /// 饼图
    /// </summary>
    [Description("pie")]
    Pie
};
