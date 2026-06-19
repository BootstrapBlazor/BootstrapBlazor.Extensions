using System.Collections.Concurrent;
using System.Globalization;
using System.Text.Json;
using System.Text.RegularExpressions;
using BootstrapBlazor.Mcp;

namespace BootstrapBlazor.Mcp.Analysis;

internal sealed partial class SampleLocalizer(string repoRoot)
{
    private const string SamplesPrefix = "src/BootstrapBlazor.Server/Components/Samples/";
    private readonly ConcurrentDictionary<string, LocaleCatalog?> _catalogs = new(StringComparer.OrdinalIgnoreCase);

    public string LocalizeFile(string repoPath, string content, string locale, List<string> warnings)
    {
        if (string.IsNullOrWhiteSpace(content))
        {
            return content;
        }

        var normalizedLocale = SampleLocaleResolver.NormalizeOrDefault(locale);
        var catalog = GetCatalog(normalizedLocale, warnings);
        if (catalog is null)
        {
            return content;
        }

        var resourceName = GetSampleResourceName(repoPath);
        if (resourceName is null)
        {
            return content;
        }

        var variableResources = BuildLocalizerResourceMap(content, resourceName, catalog);
        var isCSharp = repoPath.EndsWith(".cs", StringComparison.OrdinalIgnoreCase);

        var result = MarkupStringLocalizerRegex().Replace(content, match =>
            ReplaceLocalizer(match, variableResources, catalog, rawText: true, warnings));

        result = ExplicitRazorLocalizerRegex().Replace(result, match =>
            ReplaceLocalizer(match, variableResources, catalog, rawText: true, warnings));

        result = LocalizerRegex().Replace(result, match =>
            ReplaceLocalizer(match, variableResources, catalog, rawText: !isCSharp, warnings));

        return result;
    }

    private LocaleCatalog? GetCatalog(string locale, List<string> warnings)
    {
        return _catalogs.GetOrAdd(locale, item => LoadCatalog(item, warnings));
    }

    private LocaleCatalog? LoadCatalog(string locale, List<string> warnings)
    {
        var localeFile = Path.Combine(repoRoot, "src", "BootstrapBlazor.Server", "Locales", $"{locale}.json");
        if (!File.Exists(localeFile))
        {
            AddWarning(warnings, $"Localization file does not exist: {localeFile}");
            return null;
        }

        using var stream = File.OpenRead(localeFile);
        using var document = JsonDocument.Parse(stream);
        var resources = new Dictionary<string, Dictionary<string, string>>(StringComparer.Ordinal);

        foreach (var resource in document.RootElement.EnumerateObject())
        {
            if (resource.Value.ValueKind is not JsonValueKind.Object)
            {
                continue;
            }

            var values = new Dictionary<string, string>(StringComparer.Ordinal);
            foreach (var item in resource.Value.EnumerateObject())
            {
                if (item.Value.ValueKind is JsonValueKind.String)
                {
                    values[item.Name] = item.Value.GetString() ?? "";
                }
            }

            resources[resource.Name] = values;
        }

        return new LocaleCatalog(resources);
    }

    private static Dictionary<string, string> BuildLocalizerResourceMap(
        string content,
        string inferredResourceName,
        LocaleCatalog catalog)
    {
        var map = new Dictionary<string, string>(StringComparer.Ordinal)
        {
            ["Localizer"] = inferredResourceName
        };

        foreach (Match match in RazorLocalizerInjectionRegex().Matches(content))
        {
            var name = match.Groups["name"].Value;
            var type = match.Groups["type"].Value;
            map[name] = catalog.ResolveResourceName(type, inferredResourceName);
        }

        foreach (Match match in CSharpLocalizerPropertyRegex().Matches(content))
        {
            var name = match.Groups["name"].Value;
            var type = match.Groups["type"].Value;
            map[name] = catalog.ResolveResourceName(type, inferredResourceName);
        }

        return map;
    }

    private static string? GetSampleResourceName(string repoPath)
    {
        var normalized = repoPath.Replace('\\', '/');
        if (!normalized.StartsWith(SamplesPrefix, StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        var relativePath = normalized[SamplesPrefix.Length..];
        if (relativePath.EndsWith(".razor.cs", StringComparison.OrdinalIgnoreCase))
        {
            relativePath = relativePath[..^".razor.cs".Length];
        }
        else
        {
            relativePath = Path.ChangeExtension(relativePath, null);
        }

        return "BootstrapBlazor.Server.Components.Samples." + relativePath.Replace('/', '.');
    }

    private static string ReplaceLocalizer(
        Match match,
        IReadOnlyDictionary<string, string> variableResources,
        LocaleCatalog catalog,
        bool rawText,
        List<string> warnings)
    {
        var variableName = match.Groups["var"].Value;
        var arguments = SplitArguments(match.Groups["inside"].Value);
        if (arguments.Count == 0)
        {
            return match.Value;
        }

        var key = ResolveKey(arguments[0]);
        if (key is null)
        {
            return match.Value;
        }

        var resourceName = variableResources.TryGetValue(variableName, out var resource)
            ? resource
            : variableResources["Localizer"];

        if (!catalog.TryGetString(resourceName, key, out var value))
        {
            AddLocalizationWarning(warnings, $"Missing localization key: {resourceName}.{key}");
            return match.Value;
        }

        value = FormatValue(value, arguments.Skip(1).ToArray());
        return rawText ? value : JsonSerializer.Serialize(value);
    }

    private static List<string> SplitArguments(string text)
    {
        var arguments = new List<string>();
        var start = 0;
        var depth = 0;
        var inString = false;
        var escaped = false;

        for (var index = 0; index < text.Length; index++)
        {
            var ch = text[index];

            if (inString)
            {
                if (escaped)
                {
                    escaped = false;
                }
                else if (ch == '\\')
                {
                    escaped = true;
                }
                else if (ch == '"')
                {
                    inString = false;
                }

                continue;
            }

            switch (ch)
            {
                case '"':
                    inString = true;
                    break;
                case '(' or '[' or '{':
                    depth++;
                    break;
                case ')' or ']' or '}':
                    depth = Math.Max(0, depth - 1);
                    break;
                case ',' when depth == 0:
                    arguments.Add(text[start..index].Trim());
                    start = index + 1;
                    break;
            }
        }

        arguments.Add(text[start..].Trim());
        return arguments;
    }

    private static string? ResolveKey(string expression)
    {
        expression = expression.Trim();
        if (expression.StartsWith("nameof(", StringComparison.Ordinal) && expression.EndsWith(')'))
        {
            var name = expression["nameof(".Length..^1].Trim();
            var dotIndex = name.LastIndexOf('.');
            return dotIndex >= 0 ? name[(dotIndex + 1)..] : name;
        }

        return TryReadStringLiteral(expression, out var value) ? value : null;
    }

    private static string FormatValue(string value, IReadOnlyList<string> argumentExpressions)
    {
        if (argumentExpressions.Count == 0)
        {
            return value;
        }

        var arguments = new object[argumentExpressions.Count];
        for (var index = 0; index < argumentExpressions.Count; index++)
        {
            if (!TryResolveFormatArgument(argumentExpressions[index], out var argument))
            {
                return value;
            }

            arguments[index] = argument;
        }

        try
        {
            return string.Format(CultureInfo.InvariantCulture, value, arguments);
        }
        catch (FormatException)
        {
            return value;
        }
    }

    private static bool TryResolveFormatArgument(string expression, out object value)
    {
        expression = expression.Trim();

        if (TryReadStringLiteral(expression, out var stringValue))
        {
            value = stringValue;
            return true;
        }

        if (int.TryParse(expression, NumberStyles.Integer, CultureInfo.InvariantCulture, out var intValue))
        {
            value = intValue;
            return true;
        }

        if (expression.StartsWith("nameof(", StringComparison.Ordinal) && expression.EndsWith(')'))
        {
            value = ResolveKey(expression) ?? expression;
            return true;
        }

        value = "";
        return false;
    }

    private static bool TryReadStringLiteral(string expression, out string value)
    {
        if (expression.StartsWith('"') && expression.EndsWith('"'))
        {
            try
            {
                value = JsonSerializer.Deserialize<string>(expression) ?? "";
                return true;
            }
            catch (JsonException)
            {
                value = expression.Trim('"');
                return true;
            }
        }

        value = "";
        return false;
    }

    private static void AddLocalizationWarning(List<string> warnings, string warning)
    {
        var count = warnings.Count(item => item.StartsWith("Missing localization key:", StringComparison.Ordinal));
        if (count < 25)
        {
            AddWarning(warnings, warning);
        }
        else
        {
            AddWarning(warnings, "Additional missing localization keys were omitted.");
        }
    }

    private static void AddWarning(List<string> warnings, string warning)
    {
        if (!warnings.Contains(warning, StringComparer.Ordinal))
        {
            warnings.Add(warning);
        }
    }

    [GeneratedRegex(@"@\(\(MarkupString\)\s*@?(?<var>[A-Za-z_][A-Za-z0-9_]*Localizer|Localizer)\[(?<inside>[^\]]+)\](?:\.Value)?\)")]
    private static partial Regex MarkupStringLocalizerRegex();

    [GeneratedRegex(@"@(?<var>[A-Za-z_][A-Za-z0-9_]*Localizer|Localizer)\[(?<inside>[^\]]+)\](?:\.Value)?")]
    private static partial Regex ExplicitRazorLocalizerRegex();

    [GeneratedRegex(@"(?<![\w@])(?<var>[A-Za-z_][A-Za-z0-9_]*Localizer|Localizer)\[(?<inside>[^\]]+)\](?:\.Value)?")]
    private static partial Regex LocalizerRegex();

    [GeneratedRegex(@"@inject\s+IStringLocalizer<(?<type>[A-Za-z_][A-Za-z0-9_\.]*)>\s+(?<name>[A-Za-z_][A-Za-z0-9_]*)")]
    private static partial Regex RazorLocalizerInjectionRegex();

    [GeneratedRegex(@"IStringLocalizer<(?<type>[A-Za-z_][A-Za-z0-9_\.]*)>\??\s+(?<name>[A-Za-z_][A-Za-z0-9_]*)")]
    private static partial Regex CSharpLocalizerPropertyRegex();

    private sealed class LocaleCatalog(Dictionary<string, Dictionary<string, string>> resources)
    {
        public bool TryGetString(string resourceName, string key, out string value)
        {
            value = "";
            return resources.TryGetValue(resourceName, out var values)
                && values.TryGetValue(key, out value!);
        }

        public string ResolveResourceName(string typeName, string inferredResourceName)
        {
            if (typeName.Contains('.', StringComparison.Ordinal) && resources.ContainsKey(typeName))
            {
                return typeName;
            }

            var inferredNamespace = inferredResourceName.Contains('.', StringComparison.Ordinal)
                ? inferredResourceName[..inferredResourceName.LastIndexOf('.')]
                : inferredResourceName;

            var candidates = new[]
            {
                $"{inferredNamespace}.{typeName}",
                $"BootstrapBlazor.Server.Components.Samples.{typeName}",
                $"BootstrapBlazor.Server.Data.{typeName}",
                $"BootstrapBlazor.Server.Components.Components.{typeName}"
            };

            foreach (var candidate in candidates)
            {
                if (resources.ContainsKey(candidate))
                {
                    return candidate;
                }
            }

            var suffix = "." + typeName;
            var matches = resources.Keys
                .Where(key => key.EndsWith(suffix, StringComparison.Ordinal))
                .Take(2)
                .ToArray();

            return matches.Length == 1 ? matches[0] : candidates[0];
        }
    }
}
