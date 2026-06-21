// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using System.Text.Json;

namespace BootstrapBlazorLLMsDocsGenerator;

/// <summary>
/// A component category and its members.
/// </summary>
public sealed class ComponentCategory
{
    /// <summary>
    /// Category title (e.g. "表单组件").
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Component type names belonging to this category, in declared order.
    /// </summary>
    public List<string> ComponentNames { get; set; } = new();
}

/// <summary>
/// Provides component categories from the demo site's <c>docs.json</c> "category"
/// section — the maintained source of truth mapping each category to its component
/// types. This replaces parsing the navigation menu and localization resources.
/// </summary>
internal sealed class CategoryProvider
{
    private readonly string _docsFile;

    public CategoryProvider(string serverPath)
    {
        _docsFile = Path.Combine(serverPath, "docs.json");
    }

    /// <summary>
    /// Read the "category" section as ordered categories. Returns an empty list when
    /// docs.json or the section is missing.
    /// </summary>
    public List<ComponentCategory> Parse()
    {
        var result = new List<ComponentCategory>();
        if (!File.Exists(_docsFile))
        {
            return result;
        }

        using var doc = JsonDocument.Parse(File.ReadAllText(_docsFile));
        if (doc.RootElement.TryGetProperty("category", out var category) &&
            category.ValueKind == JsonValueKind.Object)
        {
            foreach (var group in category.EnumerateObject())
            {
                if (group.Value.ValueKind != JsonValueKind.Array)
                {
                    continue;
                }

                var names = group.Value.EnumerateArray()
                    .Where(e => e.ValueKind == JsonValueKind.String)
                    .Select(e => e.GetString()!)
                    .ToList();

                result.Add(new ComponentCategory { Title = group.Name, ComponentNames = names });
            }
        }

        return result;
    }
}
