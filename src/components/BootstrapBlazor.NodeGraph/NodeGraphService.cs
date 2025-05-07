// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

public class NodeGraphService : IAsyncDisposable
{
    private IJSRuntime _jsRuntime;
    private DotNetObjectReference<NodeGraphService> _reference;
    private readonly Lazy<Task<IJSObjectReference>> _moduleTask;

    public NodeGraphService(IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
        _moduleTask = new Lazy<Task<IJSObjectReference>>(_jsRuntime
            .InvokeAsync<IJSObjectReference>("import", "./_content/SyminDesign/symin-litegraph.js")
            .AsTask());
        _reference = DotNetObjectReference.Create(this);
    }

    /// <inheritdoc />
    public async ValueTask DisposeAsync()
    {
        if (_moduleTask.IsValueCreated)
        {
            var module = await _moduleTask.Value;
            await module.DisposeAsync();
        }
    }

    private Dictionary<string,Action<GraphNode>> _nodeExecuteActions = new ();

    public async Task RegisterNodeType(string typePath, string displayText,
        List<NodeInput> inputs, List<NodeOutput> outputs, Action<GraphNode>? onExecute)
    {

    }
}
