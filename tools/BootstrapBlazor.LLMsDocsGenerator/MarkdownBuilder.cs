// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using System.Text;
using System.Text.RegularExpressions;

namespace BootstrapBlazorLLMsDocsGenerator;

/// <summary>
/// Builds Markdown documentation for components
/// </summary>
internal static partial class MarkdownBuilder
{
    private const string GitHubRawBaseUrl = "https://raw.githubusercontent.com/dotnetcore/BootstrapBlazor/refs/heads/main/";
    private const string GitHubRepositoryUrl = "https://github.com/dotnetcore/BootstrapBlazor";
    private const string GitHubExtensionsRawUrl = "https://raw.githubusercontent.com/dotnetcore/BootstrapBlazor.Extensions/refs/heads/main/";
    private const string GitHubExtensionsRepositoryUrl = "https://github.com/BootstrapBlazor/BootstrapBlazor.Extensions";

    /// <summary>
    /// Extract the text for a single language from a doc string that may contain
    /// bilingual <c>&lt;para lang="zh"&gt;…&lt;/para&gt;&lt;para lang="en"&gt;…&lt;/para&gt;</c> blocks.
    /// Falls back to the raw text when there are no para tags, and to the other
    /// language's content when the requested one is missing.
    /// </summary>
    private static string? Localize(string? text, string lang)
    {
        if (string.IsNullOrEmpty(text))
        {
            return text;
        }

        var matches = ParaRegex().Matches(text);
        string result;
        if (matches.Count == 0)
        {
            result = text;
        }
        else
        {
            var wanted = string.Join(" ", matches
                .Where(m => string.Equals(m.Groups["lang"].Value, lang, StringComparison.OrdinalIgnoreCase))
                .Select(m => m.Groups["text"].Value.Trim()));

            // Requested language absent: fall back to whatever para content exists.
            result = string.IsNullOrEmpty(wanted)
                ? string.Join(" ", matches.Select(m => m.Groups["text"].Value.Trim()))
                : wanted;
        }

        return CleanInlineMarkup(result);
    }

    /// <summary>
    /// Strip residual XML doc markup left inside a localized string — nested
    /// <c>&lt;para&gt;</c>, <c>&lt;see&gt;</c>, <c>&lt;paramref&gt;</c>, <c>&lt;c&gt;</c>, etc. —
    /// keeping the meaningful text so the output is plain text.
    /// </summary>
    private static string CleanInlineMarkup(string text)
    {
        if (string.IsNullOrEmpty(text))
        {
            return text;
        }

        text = SeeCrefRegex().Replace(text, "${v}");
        text = SeeLangwordRegex().Replace(text, "${v}");
        text = ParamRefRegex().Replace(text, "${v}");
        text = AnyTagRegex().Replace(text, " ");
        return WhitespaceRegex().Replace(text, " ").Trim();
    }

    [GeneratedRegex("<para\\s+lang=\"(?<lang>[^\"]+)\"\\s*>(?<text>.*?)</para>", RegexOptions.Singleline)]
    private static partial Regex ParaRegex();

    [GeneratedRegex("<see\\s+cref=\"(?:[A-Za-z]:)?(?:[^\".]+\\.)*(?<v>[^\".]+)\"\\s*/?>", RegexOptions.Singleline)]
    private static partial Regex SeeCrefRegex();

    [GeneratedRegex("<see\\s+langword=\"(?<v>[^\"]+)\"\\s*/?>", RegexOptions.Singleline)]
    private static partial Regex SeeLangwordRegex();

    [GeneratedRegex("<paramref\\s+name=\"(?<v>[^\"]+)\"\\s*/?>", RegexOptions.Singleline)]
    private static partial Regex ParamRefRegex();

    [GeneratedRegex("</?[a-zA-Z][^>]*>", RegexOptions.Singleline)]
    private static partial Regex AnyTagRegex();

    [GeneratedRegex("\\s+")]
    private static partial Regex WhitespaceRegex();

    public static string BuildIndexDoc(List<ComponentInfo> components, List<ComponentCategory> categories, List<ComponentInfo> services, List<ComponentInfo> extensionComponents, List<ComponentInfo> extensionServices, List<ExtensionPackage> extensionPackages, string lang)
    {
        var _sb = new StringBuilder();
        _sb.AppendLine("# BootstrapBlazor");
        _sb.AppendLine();
        _sb.AppendLine("> 基于 Bootstrap 5 的企业级 Blazor UI 组件库");
        _sb.AppendLine();

        // Quick Start section
        _sb.AppendLine("## 快速开始");
        _sb.AppendLine();
        _sb.AppendLine("```bash");
        _sb.AppendLine("dotnet add package BootstrapBlazor");
        _sb.AppendLine("```");
        _sb.AppendLine();
        _sb.AppendLine("### 配置");
        _sb.AppendLine();
        _sb.AppendLine("```csharp");
        _sb.AppendLine("// Program.cs");
        _sb.AppendLine("builder.Services.AddBootstrapBlazor();");
        _sb.AppendLine("```");
        _sb.AppendLine();
        _sb.AppendLine("```razor");
        _sb.AppendLine("@* _Imports.razor *@");
        _sb.AppendLine("@using BootstrapBlazor.Components");
        _sb.AppendLine("```");
        _sb.AppendLine();
        _sb.AppendLine("```html");
        _sb.AppendLine("<!-- App.razor or _Host.cshtml -->");
        _sb.AppendLine("<link href=\"_content/BootstrapBlazor/css/bootstrap.blazor.bundle.min.css\" rel=\"stylesheet\" />");
        _sb.AppendLine("<script src=\"_content/BootstrapBlazor/js/bootstrap.blazor.bundle.min.js\"></script>");
        _sb.AppendLine("```");
        _sb.AppendLine();

        // Component List - grouped by category for easy navigation
        _sb.AppendLine("## 组件");
        _sb.AppendLine();
        _sb.AppendLine("每个组件在 `components/` 目录下都有独立的文档文件。");
        _sb.AppendLine("使用 `components/{ComponentName}.txt` 获取详细的 API 信息。");
        _sb.AppendLine();

        // Group components using the docs.json categories. Each category lists its
        // component type names directly, so a name lookup is all that is needed.
        var byName = components
            .GroupBy(c => c.Name, StringComparer.Ordinal)
            .ToDictionary(g => g.Key, g => g.First(), StringComparer.Ordinal);
        var used = new HashSet<string>(StringComparer.Ordinal);

        void AppendComponentLink(ComponentInfo component)
        {
            var localized = Localize(component.Summary, lang);
            var summary = !string.IsNullOrEmpty(localized)
                ? $" - {TruncateSummary(localized, 60)}"
                : "";
            _sb.AppendLine($"- [{component.Name}](components/{component.Name}.txt){summary}");
        }

        foreach (var category in categories)
        {
            var items = category.ComponentNames
                .Where(n => byName.ContainsKey(n) && used.Add(n))
                .Select(n => byName[n])
                .ToList();
            if (items.Count == 0)
            {
                continue;
            }

            _sb.AppendLine($"### {category.Title}");
            _sb.AppendLine();
            foreach (var component in items)
            {
                AppendComponentLink(component);
            }
            _sb.AppendLine();
        }

        // Anything not listed in docs.json falls back to "Other".
        var others = components.Where(c => !used.Contains(c.Name)).OrderBy(c => c.Name).ToList();
        if (others.Count > 0)
        {
            _sb.AppendLine(lang == "zh" ? "### 其他组件" : "### Other Components");
            _sb.AppendLine();
            foreach (var component in others)
            {
                AppendComponentLink(component);
            }
            _sb.AppendLine();
        }

        // Injected services
        if (services.Count > 0)
        {
            _sb.AppendLine("## 内置服务");
            _sb.AppendLine();
            _sb.AppendLine("通过依赖注入使用的服务，每个服务在 `components/` 目录下都有独立的文档文件。");
            _sb.AppendLine();
            foreach (var service in services)
            {
                var localized = Localize(service.Summary, lang);
                var summary = !string.IsNullOrEmpty(localized) ? $" - {TruncateSummary(localized, 60)}" : "";
                _sb.AppendLine($"- [{service.Name}](components/{service.Name}.txt){summary}");
            }
            _sb.AppendLine();
        }

        // Extension components & services (from BootstrapBlazor.Extensions)
        void AppendExtensionLink(ComponentInfo item)
        {
            var localized = Localize(item.Summary, lang);
            var s = !string.IsNullOrEmpty(localized) ? $" - {TruncateSummary(localized, 60)}" : "";
            _sb.AppendLine($"- [{item.Name}](extensions/{item.Name}.txt){s}");
        }

        // Group extension items under their owning package (docs.json "extensions"
        // order), so the index mirrors the per-package layout of the source repo.
        void AppendExtensionByPackage(List<ComponentInfo> items, Func<ExtensionPackage, List<string>> selector)
        {
            var byName = items
                .GroupBy(c => c.Name, StringComparer.Ordinal)
                .ToDictionary(g => g.Key, g => g.First(), StringComparer.Ordinal);

            foreach (var pkg in extensionPackages)
            {
                var members = selector(pkg)
                    .Where(byName.ContainsKey)
                    .Select(n => byName[n])
                    .ToList();
                if (members.Count == 0)
                {
                    continue;
                }

                _sb.AppendLine($"### {pkg.Name}");
                _sb.AppendLine();
                foreach (var item in members)
                {
                    AppendExtensionLink(item);
                }
                _sb.AppendLine();
            }
        }

        if (extensionComponents.Count > 0)
        {
            _sb.AppendLine("## 扩展组件");
            _sb.AppendLine();
            _sb.AppendLine("来自 BootstrapBlazor.Extensions 扩展库的组件，按扩展包分组，每个在 `extensions/` 目录下都有独立的文档文件。");
            _sb.AppendLine();
            AppendExtensionByPackage(extensionComponents, p => p.Components);
        }

        if (extensionServices.Count > 0)
        {
            _sb.AppendLine("## 扩展服务");
            _sb.AppendLine();
            _sb.AppendLine("来自 BootstrapBlazor.Extensions 扩展库的服务，按扩展包分组，每个在 `extensions/` 目录下都有独立的文档文件。");
            _sb.AppendLine();
            AppendExtensionByPackage(extensionServices, p => p.Services);
        }

        // Source Code Reference
        _sb.AppendLine("## 源码参考");
        _sb.AppendLine();
        _sb.AppendLine($"GitHub 仓库: {GitHubRepositoryUrl}");
        _sb.AppendLine();
        _sb.AppendLine("当文档不足时，请查阅源码：");
        _sb.AppendLine();
        _sb.AppendLine("### 文件结构");
        _sb.AppendLine();
        _sb.AppendLine("```");
        _sb.AppendLine($"{GitHubRawBaseUrl}/src/BootstrapBlazor/Components/{{ComponentName}}/");
        _sb.AppendLine("├── {Component}.razor          # Razor 模板");
        _sb.AppendLine("├── {Component}.razor.cs       # 组件逻辑与参数");
        _sb.AppendLine("├── {Component}Base.cs         # 基类（如果存在）");
        _sb.AppendLine("├── {Component}Option.cs       # 配置选项");
        _sb.AppendLine("└── {Component}Service.cs      # 服务类（Dialog、Toast 等）");
        _sb.AppendLine("```");
        _sb.AppendLine();
        _sb.AppendLine("### 示例");
        _sb.AppendLine();
        _sb.AppendLine("```");
        _sb.AppendLine($"{GitHubRawBaseUrl}src/BootstrapBlazor.Server/Components/Samples/{{ComponentName}}s.razor");
        _sb.AppendLine("```");
        _sb.AppendLine();
        _sb.AppendLine("### 读取组件参数");
        _sb.AppendLine();
        _sb.AppendLine("查找带有 `[Parameter]` 特性的属性：");
        _sb.AppendLine();
        _sb.AppendLine("```csharp");
        _sb.AppendLine("/// <summary>");
        _sb.AppendLine("/// 获得/设置 是否显示工具栏");
        _sb.AppendLine("/// </summary>");
        _sb.AppendLine("[Parameter]");
        _sb.AppendLine("public bool ShowToolbar { get; set; }");
        _sb.AppendLine("```");
        _sb.AppendLine();

        // Footer
        _sb.AppendLine("---");
        _sb.AppendLine($"生成时间: {DateTime.UtcNow:yyyy-MM-dd}");
        _sb.AppendLine($"组件总数: {components.Count}");
        _sb.AppendLine($"服务总数: {services.Count}");
        _sb.AppendLine($"仓库地址: {GitHubRepositoryUrl}");

        return _sb.ToString();
    }

    /// <summary>
    /// Suggested injection property name for a service type: drops a leading <c>I</c>
    /// interface prefix (e.g. <c>IBaiduOcr</c> -> <c>BaiduOcr</c>), otherwise keeps the
    /// type name (e.g. <c>WinBoxService</c>).
    /// </summary>
    private static string InjectPropertyName(string typeName) =>
        typeName.Length > 1 && typeName[0] == 'I' && char.IsUpper(typeName[1])
            ? typeName[1..]
            : typeName;

    private static string TruncateSummary(string summary, int maxLength)
    {
        if (string.IsNullOrEmpty(summary)) return "";
        summary = summary.Replace("\n", " ").Replace("\r", "").Trim();
        return summary.Length <= maxLength ? summary : summary[..(maxLength - 3)] + "...";
    }

    public static string BuildComponentDoc(ComponentInfo component, string lang)
    {
        var _sb = new StringBuilder();
        _sb.AppendLine($"# BootstrapBlazor {component.Name}");
        _sb.AppendLine();

        var summary = Localize(component.Summary, lang);
        if (!string.IsNullOrEmpty(summary))
        {
            _sb.AppendLine(summary);
            _sb.AppendLine();
        }

        BuildComponentSection(_sb, component, lang, includeHeader: false);

        // Footer
        _sb.AppendLine("---");
        _sb.AppendLine($"<!-- Generated: {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC -->");

        return _sb.ToString();
    }

    private static void BuildComponentSection(StringBuilder _sb, ComponentInfo component, string lang, bool includeHeader = true)
    {
        if (includeHeader)
        {
            _sb.AppendLine($"## {component.Name}");
            _sb.AppendLine();

            var summary = Localize(component.Summary, lang);
            if (!string.IsNullOrEmpty(summary))
            {
                _sb.AppendLine(summary);
                _sb.AppendLine();
            }
        }

        // Service registration (DI): extension services must be registered before use.
        if (component.Registration != null)
        {
            var reg = component.Registration;
            _sb.AppendLine("### 服务注册");
            _sb.AppendLine();
            _sb.AppendLine("该服务需要先注册到容器，在 `Program.cs` 中添加：");
            _sb.AppendLine();
            _sb.AppendLine("```csharp");
            _sb.AppendLine($"builder.Services.{reg.MethodName}();");
            if (!string.IsNullOrEmpty(reg.Parameters))
            {
                _sb.AppendLine($"// 可选配置参数：{reg.MethodName}({reg.Parameters})");
            }
            _sb.AppendLine("```");
            _sb.AppendLine();
            _sb.AppendLine("在组件或页面中注入使用：");
            _sb.AppendLine();
            _sb.AppendLine("```csharp");
            _sb.AppendLine("[Inject]");
            _sb.AppendLine("[NotNull]");
            _sb.AppendLine($"private {component.Name}? {InjectPropertyName(component.Name)} {{ get; set; }}");
            _sb.AppendLine("```");
            _sb.AppendLine();
        }

        // Type parameters
        if (component.TypeParameters.Count > 0)
        {
            _sb.AppendLine("### 类型参数");
            _sb.AppendLine();
            foreach (var tp in component.TypeParameters)
            {
                _sb.AppendLine($"- `{tp}` - 泛型类型参数");
            }
            _sb.AppendLine();
        }

        // Base class info
        if (!string.IsNullOrEmpty(component.BaseClass))
        {
            _sb.AppendLine($"**继承自**: `{component.BaseClass}`");
            _sb.AppendLine();
        }

        // Parameters table
        if (component.Parameters.Count > 0)
        {
            _sb.AppendLine("### 参数");
            _sb.AppendLine();
            _sb.AppendLine("<!-- AUTO-GENERATED-PARAMETERS-START -->");
            _sb.AppendLine();
            _sb.AppendLine("| 参数 | 类型 | 默认值 | 描述 |");
            _sb.AppendLine("|------|------|--------|------|");

            // Sort: active params first (obsolete sink to the bottom), then required,
            // then events, then alphabetically.
            var sortedParams = component.Parameters
                .OrderBy(p => p.IsObsolete)
                .ThenByDescending(p => p.IsRequired)
                .ThenBy(p => p.IsEventCallback)
                .ThenBy(p => p.Name);

            foreach (var param in sortedParams)
            {
                var required = param.IsRequired ? " **[必填]**" : "";
                var description = EscapeMarkdownCell(Localize(param.Description, lang) ?? "") + required + FormatObsolete(param);
                var defaultVal = param.DefaultValue ?? "-";
                var type = EscapeMarkdownCell(param.Type);

                _sb.AppendLine($"| {param.Name} | `{type}` | {defaultVal} | {description} |");
            }

            _sb.AppendLine();
            _sb.AppendLine("<!-- AUTO-GENERATED-PARAMETERS-END -->");
            _sb.AppendLine();
        }

        // Event callbacks (separate section for clarity)
        var eventCallbacks = component.Parameters.Where(p => p.IsEventCallback).ToList();
        if (eventCallbacks.Count > 0)
        {
            _sb.AppendLine("### 事件回调");
            _sb.AppendLine();
            _sb.AppendLine("| 事件 | 类型 | 描述 |");
            _sb.AppendLine("|------|------|------|");

            foreach (var evt in eventCallbacks.OrderBy(e => e.IsObsolete).ThenBy(e => e.Name))
            {
                var description = EscapeMarkdownCell(Localize(evt.Description, lang) ?? "") + FormatObsolete(evt);
                var type = EscapeMarkdownCell(evt.Type);
                _sb.AppendLine($"| {evt.Name} | `{type}` | {description} |");
            }

            _sb.AppendLine();
        }

        // Public methods
        if (component.PublicMethods.Count > 0)
        {
            _sb.AppendLine("### 公共方法");
            _sb.AppendLine();

            foreach (var method in component.PublicMethods.OrderBy(m => m.Name))
            {
                var paramStr = string.Join(", ", method.Parameters.Select(p => $"{p.Item1} {p.Item2}"));
                _sb.AppendLine($"- `{method.ReturnType} {method.Name}({paramStr})`");
                var methodDescription = Localize(method.Description, lang);
                if (!string.IsNullOrEmpty(methodDescription))
                {
                    _sb.AppendLine($"  - {methodDescription}");
                }
                if (method.IsJSInvokable)
                {
                    _sb.AppendLine("  - *[JSInvokable]*");
                }
            }

            _sb.AppendLine();
        }

        // Source reference with GitHub URLs
        if (!string.IsNullOrEmpty(component.SourcePath))
        {
            _sb.AppendLine("### 源码");
            _sb.AppendLine();
            var rawBase = component.IsExtension ? GitHubExtensionsRawUrl : GitHubRawBaseUrl;
            var sourceUrl = $"{rawBase}{component.SourcePath}";
            _sb.AppendLine($"- 组件: [{component.SourcePath}]({sourceUrl})");
            if (!string.IsNullOrEmpty(component.SamplePath))
            {
                var sampleUrl = $"{rawBase}{component.SamplePath}";
                _sb.AppendLine($"- 示例: [{component.SamplePath}]({sampleUrl})");
            }
            _sb.AppendLine();
        }
    }

    ///// <summary>
    ///// Build a minimal parameter table for embedding in existing docs
    ///// </summary>
    //public string BuildParameterTable(List<ParameterInfo> parameters)
    //{
    //    _sb.Clear();

    //    _sb.AppendLine("| Parameter | Type | Default | Description |");
    //    _sb.AppendLine("|-----------|------|---------|-------------|");

    //    var sortedParams = parameters
    //        .OrderByDescending(p => p.IsRequired)
    //        .ThenBy(p => p.IsEventCallback)
    //        .ThenBy(p => p.Name);

    //    foreach (var param in sortedParams)
    //    {
    //        var required = param.IsRequired ? " **[Required]**" : "";
    //        var description = EscapeMarkdownCell(param.Description ?? "") + required;
    //        var defaultVal = param.DefaultValue ?? "-";
    //        var type = EscapeMarkdownCell(param.Type);

    //        _sb.AppendLine($"| {param.Name} | `{type}` | {defaultVal} | {description} |");
    //    }

    //    return _sb.ToString();
    //}

    /// <summary>
    /// Render the deprecation flag for a parameter/event table cell: a bold
    /// <c>[已弃用]</c> marker followed by the migration hint from <c>[Obsolete("…")]</c>
    /// when present. Empty for active parameters.
    /// </summary>
    private static string FormatObsolete(ParameterInfo param)
    {
        if (!param.IsObsolete)
        {
            return "";
        }

        return string.IsNullOrEmpty(param.ObsoleteMessage)
            ? " **[已弃用]**"
            : $" **[已弃用]** {EscapeMarkdownCell(param.ObsoleteMessage)}";
    }

    private static string EscapeMarkdownCell(string text)
    {
        if (string.IsNullOrEmpty(text)) return "";

        return text
            .Replace("|", "\\|")
            .Replace("\n", " ")
            .Replace("\r", "");
    }
}
