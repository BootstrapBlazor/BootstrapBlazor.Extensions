// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BootstrapBlazor.Components.Option;
public class KernelOptions
{
    public List<ModelOptions> Configs { get; set; } = [];

    public int MaxTokens { get; set; }
    public int MaxPlannerTokens { get; set; }

    public string[]? EnabledInterceptors { get; set; }
    public string[]? PreSelectedInterceptors { get; set; }

    public string? KrokiHost { get; set; } = default!;
    public string? StateFileSaveInterceptorPath { get; set; } = default!;

    public EmbeddingsSettings Embeddings { get; set; } = new EmbeddingsSettings();

    public string? BING_API_KEY { get; set; } = default!;
    public string? GOOGLE_API_KEY { get; set; } = default!;
    public string? GOOGLE_SEARCH_ENGINE_ID { get; set; } = default!;

    public Bot Bot { get; set; } = new Bot();

    public MemoryOptions Memory { get; set; } = new MemoryOptions();
}
