// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components.Interfaces;

namespace BootstrapBlazor.Components;

public class NodeInput<T> : INodeSlot
{
    /// <inheritdoc />
    public string Name { get; set; }

    /// <inheritdoc />
    public string Id { get; set; }

    /// <inheritdoc />
    public Type ValueType { get;  } = typeof(T);

    public NodeInput(string id, string name)
    {
        Id = id;
        Name = name;
    }
}

public class NodeOutput<T> : INodeSlot
{
    /// <inheritdoc />
    public string Name { get; set; }

    /// <inheritdoc />
    public string Id { get; set; }

    /// <inheritdoc />
    public Type ValueType { get; } = typeof(T);

    public NodeOutput(string id, string name)
    {
        Id = id;
        Name = name;
    }
}
