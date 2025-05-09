// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

public class Graph
{
    public IJSObjectReference GraphRef { get; }

    internal Graph(IJSObjectReference lGraphRef)
    {
        GraphRef = lGraphRef;
    }

    public async Task RunStep(int step, bool ignoreErrors = true, int? limits = null)
    {
        await GraphRef.InvokeVoidAsync("runStep", step, ignoreErrors, limits);
    }
}
