// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

namespace BootstrapBlazor.LLMsDocsGenerator;

internal static class Runner
{
    public static async Task<int> Run(string[] args)
    {
        var result = ArgumentsHelper.Parse(args);

        return await result.InvokeAsync();
    }
}
