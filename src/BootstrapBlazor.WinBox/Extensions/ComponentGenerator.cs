﻿// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

class ComponentGenerator : IRootComponentGenerator
{
    public RenderFragment Generator() => BootstrapDynamicComponent.CreateComponent<WinBox>().Render();
}
