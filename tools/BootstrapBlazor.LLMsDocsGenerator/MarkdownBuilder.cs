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

    public static string BuildIndexDoc(List<ComponentInfo> components, string lang)
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

        // Group components by category for the index
        var categorized = CategorizeComponents(components);

        var categoryDescriptions = new Dictionary<string, (string Title, string Description)>
        {
            ["table"] = ("数据展示 - 表格", "支持排序、筛选、分页、编辑的复杂数据表格"),
            ["input"] = ("表单输入", "文本框、数字框、多行文本、日期选择器"),
            ["select"] = ("选择组件", "下拉选择、多选、自动完成、级联、穿梭框"),
            ["button"] = ("按钮", "按钮、按钮组、下拉按钮、分裂按钮"),
            ["dialog"] = ("对话框与反馈", "模态框、抽屉、对话框服务、消息、轻提示"),
            ["nav"] = ("导航", "菜单、标签页、面包屑、步骤条、分页"),
            ["card"] = ("容器", "卡片、折叠面板、分组框、分隔面板、布局"),
            ["treeview"] = ("树形组件", "树形控件、树形选择"),
            ["form"] = ("表单验证", "验证表单、编辑表单、验证规则"),
            ["other"] = ("其他组件", "杂项组件")
        };

        foreach (var (category, categoryComponents) in categorized.OrderBy(c => c.Key))
        {
            if (categoryComponents.Count == 0) continue;

            var (title, description) = categoryDescriptions.GetValueOrDefault(category, (category, ""));
            _sb.AppendLine($"### {title}");
            _sb.AppendLine();
            _sb.AppendLine($"{description}");
            _sb.AppendLine();

            // List components with links to their individual docs
            foreach (var component in categoryComponents.OrderBy(c => c.Name))
            {
                var localized = Localize(component.Summary, lang);
                var summary = !string.IsNullOrEmpty(localized)
                    ? $" - {TruncateSummary(localized, 60)}"
                    : "";
                _sb.AppendLine($"- [{component.Name}](components/{component.Name}.txt){summary}");
            }
            _sb.AppendLine();
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
        _sb.AppendLine($"仓库地址: {GitHubRepositoryUrl}");

        return _sb.ToString();
    }

    private static Dictionary<string, List<ComponentInfo>> CategorizeComponents(List<ComponentInfo> components)
    {
        var categories = new Dictionary<string, List<ComponentInfo>>
        {
            ["table"] = [],
            ["input"] = [],
            ["select"] = [],
            ["button"] = [],
            ["dialog"] = [],
            ["nav"] = [],
            ["card"] = [],
            ["treeview"] = [],
            ["form"] = [],
            ["other"] = []
        };

        foreach (var component in components)
        {
            var category = GetComponentCategory(component.Name);
            if (categories.TryGetValue(category, out var list))
            {
                list.Add(component);
            }
            else
            {
                categories["other"].Add(component);
            }
        }

        // Remove empty categories
        return categories.Where(c => c.Value.Count > 0)
                        .ToDictionary(c => c.Key, c => c.Value);
    }

    private static string GetComponentCategory(string componentName)
    {
        return componentName.ToLowerInvariant() switch
        {
            var n when n.Contains("table") => "table",
            var n when n.Contains("input") || n.Contains("textarea") ||
                       n.Contains("password") || n == "otpinput" => "input",
            var n when n.Contains("select") || n.Contains("dropdown") ||
                       n.Contains("autocomplete") || n.Contains("cascader") ||
                       n.Contains("transfer") || n.Contains("multiselect") => "select",
            var n when n.Contains("button") || n == "gotop" ||
                       n.Contains("popconfirm") => "button",
            var n when n.Contains("dialog") || n.Contains("modal") ||
                       n.Contains("drawer") || n.Contains("swal") ||
                       n.Contains("toast") || n.Contains("message") => "dialog",
            var n when n.Contains("menu") || n.Contains("tab") ||
                       n.Contains("breadcrumb") || n.Contains("step") ||
                       n.Contains("anchor") || n.Contains("nav") => "nav",
            var n when n.Contains("card") || n.Contains("collapse") ||
                       n.Contains("groupbox") || n.Contains("panel") => "card",
            var n when n.Contains("tree") => "treeview",
            var n when n.Contains("validateform") || n.Contains("editorform") ||
                       n.Contains("validator") => "form",
            _ => "other"
        };
    }

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

            // Sort: required first, then events, then alphabetically
            var sortedParams = component.Parameters
                .OrderByDescending(p => p.IsRequired)
                .ThenBy(p => p.IsEventCallback)
                .ThenBy(p => p.Name);

            foreach (var param in sortedParams)
            {
                var required = param.IsRequired ? " **[必填]**" : "";
                var description = EscapeMarkdownCell(Localize(param.Description, lang) ?? "") + required;
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

            foreach (var evt in eventCallbacks.OrderBy(e => e.Name))
            {
                var description = EscapeMarkdownCell(Localize(evt.Description, lang) ?? "");
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
            var sourceUrl = $"{GitHubRawBaseUrl}{component.SourcePath}";
            _sb.AppendLine($"- 组件: [{component.SourcePath}]({sourceUrl})");
            if (!string.IsNullOrEmpty(component.SamplePath))
            {
                var sampleUrl = $"{GitHubRawBaseUrl}{component.SamplePath}";
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

    private static string EscapeMarkdownCell(string text)
    {
        if (string.IsNullOrEmpty(text)) return "";

        return text
            .Replace("|", "\\|")
            .Replace("\n", " ")
            .Replace("\r", "");
    }
}
