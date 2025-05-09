// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

public class GraphNode : IAsyncDisposable
{
    private IJSObjectReference _graphNodeReference;

    internal GraphNode(IJSObjectReference graphNodeReference)
    {
        _graphNodeReference = graphNodeReference;
    }

    /// <inheritdoc />
    public ValueTask DisposeAsync()
    {
        return _graphNodeReference.DisposeAsync();
    }

    public ValueTask<T?> GetInputData<T>(int slotIndex)
    {
        return _graphNodeReference.InvokeAsync<T?>( "getInputData", slotIndex);
    }

    public ValueTask<T?> GetOutputData<T>(int slotIndex)
    {
        return _graphNodeReference.InvokeAsync<T?>( "getOutputData", slotIndex);
    }

    public ValueTask SetOutputData<T>(int slotIndex, T outputData)
    {
        return _graphNodeReference.InvokeVoidAsync( "setOutputData", slotIndex, outputData);
    }
}
