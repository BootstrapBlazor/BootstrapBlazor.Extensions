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
/// An extension package (from BootstrapBlazor.Extensions) with its exported components
/// and services.
/// </summary>
public sealed class ExtensionPackage
{
    public string Name { get; set; } = string.Empty;

    public List<string> Components { get; set; } = new();

    public List<string> Services { get; set; } = new();
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

    /// <summary>
    /// Read the "services" array (injected service type names). Returns an empty list
    /// when docs.json or the section is missing.
    /// </summary>
    public List<string> ParseServices()
    {
        var result = new List<string>();
        if (!File.Exists(_docsFile))
        {
            return result;
        }

        using var doc = JsonDocument.Parse(File.ReadAllText(_docsFile));
        if (doc.RootElement.TryGetProperty("services", out var services) &&
            services.ValueKind == JsonValueKind.Array)
        {
            result.AddRange(services.EnumerateArray()
                .Where(e => e.ValueKind == JsonValueKind.String)
                .Select(e => e.GetString()!));
        }

        return result;
    }

    /// <summary>
    /// Read the "extensions" section: each package with its components and services.
    /// </summary>
    public List<ExtensionPackage> ParseExtensions()
    {
        var result = new List<ExtensionPackage>();
        if (!File.Exists(_docsFile))
        {
            return result;
        }

        using var doc = JsonDocument.Parse(File.ReadAllText(_docsFile));
        if (doc.RootElement.TryGetProperty("extensions", out var extensions) &&
            extensions.ValueKind == JsonValueKind.Object)
        {
            foreach (var pkg in extensions.EnumerateObject())
            {
                if (pkg.Value.ValueKind != JsonValueKind.Object)
                {
                    continue;
                }

                result.Add(new ExtensionPackage
                {
                    Name = pkg.Name,
                    Components = ReadStringArray(pkg.Value, "components"),
                    Services = ReadStringArray(pkg.Value, "services")
                });
            }
        }

        return result;
    }

    private static List<string> ReadStringArray(JsonElement obj, string name)
    {
        var list = new List<string>();
        if (obj.TryGetProperty(name, out var arr) && arr.ValueKind == JsonValueKind.Array)
        {
            list.AddRange(arr.EnumerateArray()
                .Where(e => e.ValueKind == JsonValueKind.String)
                .Select(e => e.GetString()!));
        }

        return list;
    }
}
