// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BootstrapBlazor.Components;

/// <summary>
/// 图方向,如果图类型是状态图和流程图时，需要指定图的方向
/// </summary>
public enum MermaidDirection
{
    /// <summary>
    ///  从上到下（Top to Down）
    /// </summary>
    TD,
    /// <summary>
    ///  从上到下（Top to Bottom）与TD无差别
    /// </summary>
    TB,
    /// <summary>
    /// BT：从下到上（Bottom to Top）
    /// </summary>
    BT,
    /// <summary>
    /// LR：从左到右（Left to Right）
    /// </summary>
    LR,
    /// <summary>
    /// RL：从右到左（Right to Left)
    /// </summary>
    RL
}

