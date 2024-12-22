// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BootstrapBlazor.Components.Option;
public class ModelOptions
{
    public ChatModelsProvider Provider { get; set; }
    public EmbeddingsModelProvider? EmbeddingsProvider { get; set; }
    public string ConfigName { get; set; }
    public string ApiKey { get; set; }
    public string Endpoint { get; set; } 
    public string ChatModel { get; set; }
    public string EmbeddingsModel { get; set; }
    //azure only
    public Dictionary<string, string> ChatModels { get; set; } = new Dictionary<string, string>();
    // deploymentId, modelId
    public Dictionary<string, string> EmbeddingsModels { get; set; } = new Dictionary<string, string>();
}
