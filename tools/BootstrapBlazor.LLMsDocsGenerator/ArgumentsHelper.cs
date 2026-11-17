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
        var outputFolderOption = new Option<string>("--output")
        {
            Description = "Set the output folder (defaults to the current directory)",
            DefaultValueFactory = _ => defaultFolder
        };
        var projectOption = new Option<string?>("--project")
        {
            Description = "Project file or directory to analyze (defaults to the current directory)"
        };

        var rootCommand = new RootCommand("BootstrapBlazor LLMs Documentation Generator")
        {
            outputFolderOption,
            projectOption
        };

        rootCommand.SetAction(async result =>
        {
            var outputFolder = result.GetValue(outputFolderOption);
            if (string.IsNullOrEmpty(outputFolder))
            {
                throw new ArgumentException("Output folder must not be empty.");
            }

            var project = result.GetValue(projectOption);
            if (project != null && string.IsNullOrWhiteSpace(project))
            {
                throw new ArgumentException("--project requires a nonempty path.");
            }
            await DocsGenerator.GenerateAllAsync(outputFolder, project);
        });

        return rootCommand.Parse(args);
    }
}
