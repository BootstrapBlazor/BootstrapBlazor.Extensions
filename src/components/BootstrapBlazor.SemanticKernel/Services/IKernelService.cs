// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.Extensions.DependencyInjection;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BootstrapBlazor.Components.Services;
internal interface IKernelService
{
    public Task<Kernel?> CreateKernelAsync(string config = "Default",ServiceLifetime lifetime = ServiceLifetime.Singleton);

    public Task<ISemanticTextMemory?> CreateMemoryStoreAsync(string config = "Default", ServiceLifetime lifetime = ServiceLifetime.Singleton);
}
