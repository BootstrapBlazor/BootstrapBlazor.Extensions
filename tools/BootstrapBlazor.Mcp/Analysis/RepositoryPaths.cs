// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.

namespace BootstrapBlazor.Mcp.Analysis;

internal static class RepositoryPaths
{
    public static string FromRepoPath(string repoRoot, string repoPath)
    {
        var normalized = repoPath.Replace('/', Path.DirectorySeparatorChar);
        return Path.GetFullPath(Path.Combine(repoRoot, normalized));
    }

    public static string ToRepoPath(string repoRoot, string fullPath)
    {
        return Path.GetRelativePath(repoRoot, fullPath).Replace('\\', '/');
    }
}
