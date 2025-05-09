// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components.Data.Interop;
using BootstrapBlazor.Components.Interfaces;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace BootstrapBlazor.Components;

public class NodeGraphService : IAsyncDisposable
{
    private IJSRuntime _jsRuntime;
    private DotNetObjectReference<NodeGraphService> _reference;
    private readonly Lazy<Task<IJSObjectReference>> _moduleTask;
    private readonly ILogger<NodeGraphService> _logger;

    public NodeGraphService(IJSRuntime jsRuntime, ILogger<NodeGraphService> logger)
    {
        _jsRuntime = jsRuntime;
        _moduleTask = new Lazy<Task<IJSObjectReference>>(_jsRuntime
            .InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.NodeGraph/js/Graph.js")
            .AsTask());
        _reference = DotNetObjectReference.Create(this);
        _logger = logger;
    }

    /// <inheritdoc />
    public async ValueTask DisposeAsync()
    {
        if (_moduleTask.IsValueCreated)
        {
            var module = await _moduleTask.Value;
            try
            {
                await module.DisposeAsync();
            }
            catch (JSDisconnectedException)
            {
            }
        }
    }

    class NodeTemplate
    {
        public Func<GraphNode, Task>? NodeExecuteAction { get; set; }
        public Dictionary<string, Func<object?, GraphNode, Task>?> WidgetCallbacks { get; set; } = new();
    }

    private Dictionary<string, NodeTemplate> _registeredNodes = new();

    /// <summary>
    /// 注册新的节点类型到图形编辑器
    /// </summary>
    /// <param name="typePath">节点唯一路径标识(分类/ID)</param>
    /// <param name="displayName">节点的名称</param>
    /// <param name="inputs">输入槽位</param>
    /// <param name="outputs">输出槽位</param>
    /// <param name="widgets">节点组件</param>
    /// <param name="onExecute">执行方法</param>
    /// <exception cref="ArgumentNullException">节点中的组件必须设置ID</exception>
    public async Task RegisterNodeType(
        string typePath, string displayName,
        List<INodeSlot>? inputs = null,
        List<INodeSlot>? outputs = null,
        List<NodeWidget>? widgets = null,
        Func<GraphNode, Task>? onExecute = null)
    {
        var nodeTemplate = new NodeTemplate();
        // 判断是否已经注册过
        if (_registeredNodes.ContainsKey(typePath))
        {
            _registeredNodes.Remove(typePath);
            // TODO: 更新节点
        }

        _registeredNodes.Add(typePath, nodeTemplate);

        var graphNodeConfig = new GraphNodeConfigDto { TypePath = typePath, DisplayName = displayName, };
        if (inputs != null)
        {
            graphNodeConfig.Inputs = inputs.Select(i => new NodeSlotDto
            {
                Name = i.Name, Type = i.ValueType.FullName ?? i.ValueType.Name
            }).ToList();
        }

        if (outputs != null)
        {
            graphNodeConfig.Outputs = outputs.Select(i => new NodeSlotDto
            {
                Name = i.Name, Type = i.ValueType.FullName ?? i.ValueType.Name
            }).ToList();
        }

        widgets?.ForEach(w =>
        {
            if (string.IsNullOrWhiteSpace(w.WidgetId))
            {
                throw new ArgumentNullException(nameof(w.WidgetId), "WidgetId cannot be null or empty.");
            }

            if (nodeTemplate.WidgetCallbacks.ContainsKey(w.WidgetId))
            {
                throw new InvalidOperationException($"Widget {w.WidgetId} is already registered.");
            }

            nodeTemplate.WidgetCallbacks.Add(w.WidgetId, w.Callback);

            var widget = new WidgetDto
            {
                WidgetId = w.WidgetId,
                WidgetType = w.WidgetType.ToDescriptionString(),
                DisplayName = w.DisplayName,
                Value = w.Value,
                WidgetOptions = w.WidgetOptions,
                HasCallback = w.Callback != null
            };
            graphNodeConfig.Widgets.Add(widget);
        });

        // 注册执行回调
        if (onExecute != null)
        {
            nodeTemplate.NodeExecuteAction = onExecute;
            graphNodeConfig.HasAction = true;
        }
        else
        {
            nodeTemplate.NodeExecuteAction = null;
            graphNodeConfig.HasAction = false;
        }

        var jsModule = await _moduleTask.Value;
        await jsModule.InvokeVoidAsync("registerNodeType", graphNodeConfig);
    }

    /// <summary>
    /// 执行节点操作Js回调
    /// </summary>
    [JSInvokable]
    public async Task OnNodeActionExecuted(string typePath, object nodeId)
    {
        var module = await _moduleTask.Value;
        var nodeInstance = await module.InvokeAsync<IJSObjectReference>("getNodeById", nodeId);
        var graphNode = new GraphNode(nodeInstance);
        if (_registeredNodes.TryGetValue(typePath, out var template))
        {
            if (template.NodeExecuteAction != null)
            {
                await template.NodeExecuteAction.Invoke(graphNode);
            }
        }
        else
        {
            throw new InvalidOperationException($"Node type {typePath} not registered.");
        }
    }

    /// <summary>
    /// 执行节点组件回调
    /// </summary>
    [JSInvokable]
    public async Task OnNodeWidgetCallback(
        string typePath, string widgetId,
        object? value, object? nodeId)
    {
        // await nodeInstance.InvokeVoidAsync("test");
        if (_registeredNodes.TryGetValue(typePath, out var template))
        {
            if (template.WidgetCallbacks.TryGetValue(widgetId, out var callback))
            {
                if (callback != null)
                {
                    var module = await _moduleTask.Value;
                    var nodeInstance = await module.InvokeAsync<IJSObjectReference>("getNodeById", nodeId);
                    var graphNode = new GraphNode(nodeInstance);
                    var valuePhase = value;
                    if (value is JsonElement jsonElement)
                    {
                        valuePhase = jsonElement.ValueKind switch
                        {
                            JsonValueKind.String => jsonElement.GetString(),
                            JsonValueKind.Number => jsonElement.GetDouble(),
                            JsonValueKind.True => true,
                            JsonValueKind.False => false,
                            JsonValueKind.Null => null,
                            _ => valuePhase
                        };
                    }

                    await callback.Invoke(valuePhase, graphNode);
                }
            }
            else
            {
                throw new InvalidOperationException($"Widget {widgetId} not registered for node type {typePath}.");
            }
        }
        else
        {
            throw new InvalidOperationException($"Node type {typePath} not registered.");
        }
    }
}
