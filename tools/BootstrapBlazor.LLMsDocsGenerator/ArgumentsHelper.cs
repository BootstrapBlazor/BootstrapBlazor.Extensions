// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone

using BootstrapBlazorLLMsDocsGenerator;
using System.CommandLine;

namespace BootstrapBlazor.LLMsDocsGenerator;

internal static class ArgumentsHelper
{
    public static ParseResult Parse(string[] args)
    {
        const string defaultFolder = ".";
        var rootFolderOption = new Option<string>("--root")
        {
            Description = "Set the root folder of project",
            DefaultValueFactory = _ => defaultFolder
        };
        var outputFolderOption = new Option<string>("--output")
        {
            Description = "Set the publish folder of project",
            DefaultValueFactory = _ => defaultFolder
        };

        var rootCommand = new RootCommand("BootstrapBlazor LLMs Documentation Generator")
        {
            rootFolderOption,
            outputFolderOption
        };

        rootCommand.SetAction(async result =>
        {
            var rootFolder = result.GetValue(rootFolderOption);
            if (string.IsNullOrEmpty(rootFolder))
            {
                throw new ArgumentException("Project root folder must not be empty.");
            }

            var outputFolder = result.GetValue(outputFolderOption);
            if (string.IsNullOrEmpty(outputFolder))
            {
                throw new ArgumentException("Publish folder must not be empty.");
            }

            await DocsGenerator.GenerateAllAsync(rootFolder, outputFolder);
        });

        return rootCommand.Parse(args);
    }
}
