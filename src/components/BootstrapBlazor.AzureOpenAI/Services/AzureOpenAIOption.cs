﻿// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// Azure OpenAI 配置类
/// </summary>
public class AzureOpenAIOption
{
    /// <summary>
    /// 获得/设置 Key
    /// </summary>
    [NotNull]
    public string? Endpoint { get; set; }

    /// <summary>
    /// 获得/设置 Key
    /// </summary>
    [NotNull]
    public string? Key { get; set; }

    /// <summary>
    /// 获得/设置 部署名称
    /// </summary>
    [NotNull]
    public string? DeploymentName { get; set; }
}
