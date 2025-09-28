// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.CssBundler;

static class ArgumentsHelper
{
    public static void PrintHelp()
    {
        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("Usage: BootstrapBlazorCssBundler [options]");
        Console.WriteLine("Options:");
        Console.WriteLine("  <bundler.json>        ConfigFileFullPath D:\\Argo\\src\\BootstrapBlazor\\src\\BootstrapBlazor\\bundler.json");
        Console.WriteLine();
        Console.ForegroundColor = ConsoleColor.Gray;
    }

    public static string? ParseOptions(string[] args)
    {
        return args.Length > 0 ? args[0] : "";
    }
}
