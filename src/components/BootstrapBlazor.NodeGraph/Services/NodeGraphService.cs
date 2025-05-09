// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components.Data.Interop;
using BootstrapBlazor.Components.Interfaces;

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
            .InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.NodeGraph/js/Graph.js")
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

    private Dictionary<string, Func<GraphNode, Task>> _nodeExecuteActions = new();

    /// <summary>
    /// 注册新的节点类型到图形编辑器
    /// </summary>
    /// <param name="typePath">节点唯一路径标识(分类/ID)</param>
    /// <param name="displayName">节点的名称</param>
    /// <param name="inputs">输入槽位</param>
    /// <param name="outputs">输出槽位</param>
    /// <param name="onExecute">执行方法</param>
    public async Task RegisterNodeType(
        string typePath, string displayName,
        List<INodeSlot> inputs,
        List<INodeSlot> outputs,
        Func<GraphNode, Task>? onExecute)
    {
        var graphNodeConfig = new GraphNodeConfig
        {
            TypePath = typePath,
            DisplayName = displayName,
            Inputs = inputs.Select(i => new NodeSlot { Name = i.Name, Type = i.ValueType.FullName }).ToList(),
            Outputs = outputs.Select(i => new NodeSlot { Name = i.Name, Type = i.ValueType.FullName }).ToList()
        };
        // 注册执行回调
        if (onExecute != null)
        {
            _nodeExecuteActions[typePath] = onExecute;
            graphNodeConfig.HasAction = true;
        }
        else
        {
            _nodeExecuteActions.Remove(typePath);
            graphNodeConfig.HasAction = false;
        }

        var jsModule = await _moduleTask.Value;
        await jsModule.InvokeVoidAsync("registerNodeType", graphNodeConfig);
    }

    /// <summary>
    /// 执行节点操作Js回调
    /// </summary>
    [JSInvokable]
    public async Task OnNodeActionExecuted(string typePath, IJSObjectReference nodeInstance)
    {
        var graphNode = new GraphNode(nodeInstance);
        if (_nodeExecuteActions.TryGetValue(typePath, out var action))
        {
            await action.Invoke(graphNode);
        }
        else
        {
            throw new InvalidOperationException($"Node type {typePath} not registered.");
        }
    }
}
