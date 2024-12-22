// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BootstrapBlazor.Components.Option;
public class LocalModelsOptions
{
    public string LocalModelName { get; set; } = string.Empty;

    public string ChatModel { get; set; } = string.Empty;
    public string[] ChatModels { get; set; } = Array.Empty<string>();

    public string EmbeddingsModel { get; set; } = string.Empty;
    public string[] EmbeddingsModels { get; set; } = Array.Empty<string>();

    public bool IsConfigured()
    {
        return string.IsNullOrEmpty(LocalModelName);
    }
}
