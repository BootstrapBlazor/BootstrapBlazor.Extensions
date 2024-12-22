// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BootstrapBlazor.Components.Option;
public class EmbeddingsSettings
{
    public string RedisConfigurationString { get; set; } = default!;
    public string RedisIndexName { get; set; } = default!;
    public int MaxTokensToIncludeAsContext { get; set; } = default!;
    public bool UseRedis { get; set; }
    public bool UseSqlite { get; set; }
    public string SqliteConnectionString { get; set; } = default!;
}
