// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using System.Buffers;

namespace BootstrapBlazor.CssBundler;

internal class Bundler
{
    public static void Run(string[] args)
    {
#if DEBUG
        if (args.Length == 0)
        {
            args = [
                "C:\\Users\\Argo\\src\\BootstrapBlazor\\src\\BootstrapBlazor\\bundler.json"
            ];
        }
#endif

        var bundlerFile = ArgumentsHelper.ParseOptions(args);

        if (string.IsNullOrEmpty(bundlerFile))
        {
            ArgumentsHelper.PrintHelp();
            return;
        }

        BundlerCore(bundlerFile);
    }

    static void BundlerCore(string bundlerFile)
    {
        var options = BundlerOptions.LoadFromConfigFile(bundlerFile);

        foreach (var option in options)
        {
            DoBundler(bundlerFile, option);
        }
    }

    static void DoBundler(string bundlerFile, BundlerOptions option)
    {
        if (string.IsNullOrEmpty(option.OutputFileName))
        {
            return;
        }

        if (option.InputFiles.Count == 0)
        {
            return;
        }

        var rootFolder = Path.GetDirectoryName(bundlerFile);
        if (string.IsNullOrEmpty(rootFolder))
        {
            return;
        }

        var buffer = ArrayPool<byte>.Shared.Rent(64 * 1024);
        try
        {
            using var writer = File.OpenWrite(Path.Combine(rootFolder, option.OutputFileName));
            foreach (var file in option.InputFiles)
            {
                var inputFile = Path.Combine(rootFolder, file);
                if (!File.Exists(inputFile))
                {
                    continue;
                }

                using var reader = File.OpenRead(inputFile);
                var read = reader.Read(buffer, 0, buffer.Length);
                if (read >= 3 && buffer[0] == 0xEF && buffer[1] == 0xBB && buffer[2] == 0xBF)
                {
                    writer.Write(buffer, 3, read - 3);
                }
                else
                {
                    writer.Write(buffer, 0, read);
                }

                while (reader.Position < reader.Length)
                {
                    read = reader.Read(buffer, 0, buffer.Length);
                    writer.Write(buffer, 0, read);
                }
            }
            writer.Close();
        }
        finally
        {
            ArrayPool<byte>.Shared.Return(buffer);
        }

        Console.WriteLine($"Bundler Completed .... {option.OutputFileName}");
    }
}
