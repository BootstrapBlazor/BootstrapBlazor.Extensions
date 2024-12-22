// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Memory;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BootstrapBlazor.Components.Services;
/// <summary>
/// KernelStoreService 类
/// </summary>
public class KernelStoreService()
{
    private ConcurrentDictionary<string, Kernel> kernelStore = [];
    private ConcurrentDictionary<string, ISemanticTextMemory> memoryStore = [];
    public bool TryGetKernel(string config, out Kernel kernel)
    {
        return kernelStore.TryGetValue(config, out kernel);
    }
    public bool TryGetMemoryStore(string config, out ISemanticTextMemory memory)
    {
        return memoryStore.TryGetValue(config, out memory);
    }
    public bool TryAddKernel(string config, Kernel kernel)
    {
        return kernelStore.TryAdd(config, kernel);
    }
    public bool TryAddMemoryStore(string config, ISemanticTextMemory memory)
    {
        return memoryStore.TryAdd(config, memory);
    }
}
