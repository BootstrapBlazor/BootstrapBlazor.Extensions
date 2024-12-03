// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 图方向,如果图类型是状态图和流程图时，需要指定图的方向
/// </summary>
public enum MermaidDirection
{
    /// <summary>
    /// 从上到下（Top to Bottom)
    /// </summary>
    TB,
    /// <summary>
    /// 从下到上（Bottom to Top）
    /// </summary>
    BT,
    /// <summary>
    /// 从左到右（Left to Right）
    /// </summary>
    LR,
    /// <summary>
    /// 从右到左（Right to Left)
    /// </summary>
    RL
}

