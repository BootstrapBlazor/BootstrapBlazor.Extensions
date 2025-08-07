// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.OpcDa;

/// <summary>
/// 对 OpcDataServer BrowsePosition 的封装类
/// </summary>
public class OpcBrowsePosition
{
    internal OpcBrowsePosition(Opc.Da.BrowsePosition? position)
    {
        Position = position;
    }

    internal Opc.Da.BrowsePosition? Position { get; set; }
}
