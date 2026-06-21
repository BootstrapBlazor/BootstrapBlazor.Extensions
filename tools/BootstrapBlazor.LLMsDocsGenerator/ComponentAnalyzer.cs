// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Text.RegularExpressions;

namespace BootstrapBlazorLLMsDocsGenerator;

/// <summary>
/// Analyzes Blazor component source files using Roslyn.
/// <para>
/// A single <see cref="CSharpCompilation"/> is built from every source file in the
/// library so that each component is resolved as an <see cref="INamedTypeSymbol"/>.
/// Walking the symbol's <see cref="INamedTypeSymbol.BaseType"/> chain collects
/// parameters declared on base classes, and <c>GetMembers()</c> aggregates members
/// from every <c>partial</c> declaration automatically.
/// </para>
/// </summary>
public partial class ComponentAnalyzer
{
    private readonly string _sourcePath;
    private readonly string _componentsPath;
    private readonly string _samplesPath;

    private CSharpCompilation? _compilation;
    private readonly Dictionary<string, SyntaxTree> _treeByPath = new(StringComparer.OrdinalIgnoreCase);

    /// <summary>
    /// Short type names with language keywords (int, string, bool) and nullable markers.
    /// Replaces the old hand-rolled <c>SimplifyTypeName</c> string replacement.
    /// </summary>
    private static readonly SymbolDisplayFormat TypeFormat = SymbolDisplayFormat.MinimallyQualifiedFormat;

    /// <summary>
    /// Fully qualified name including namespace and generic type parameters.
    /// </summary>
    private static readonly SymbolDisplayFormat FullNameFormat = new(
        typeQualificationStyle: SymbolDisplayTypeQualificationStyle.NameAndContainingTypesAndNamespaces,
        genericsOptions: SymbolDisplayGenericsOptions.IncludeTypeParameters);

    public ComponentAnalyzer(string sourcePath)
    {
        _sourcePath = sourcePath;
        _componentsPath = Path.Combine(sourcePath, "Components");
        _samplesPath = Path.Combine(Path.GetDirectoryName(sourcePath)!, "BootstrapBlazor.Server", "Components", "Samples");
    }

    /// <summary>
    /// Analyze all components in the source directory
    /// </summary>
    public async Task<List<ComponentInfo>> AnalyzeAllComponentsAsync()
    {
        var components = new List<ComponentInfo>();

        if (!Directory.Exists(_componentsPath))
        {
            Console.WriteLine($"Components directory not found: {_componentsPath}");
            return components;
        }

        await EnsureCompilationAsync();

        // Entry points: component code-behind files and explicit base classes.
        // Other partial files (e.g. Table.razor.Toolbar.cs) are NOT entry points;
        // their members are merged into the component via the symbol model.
        var entryFiles = Directory.GetFiles(_componentsPath, "*.razor.cs", SearchOption.AllDirectories)
            .Concat(Directory.GetFiles(_componentsPath, "*Base.cs", SearchOption.AllDirectories))
            .Distinct(StringComparer.OrdinalIgnoreCase);

        var seenTypes = new HashSet<string>(StringComparer.Ordinal);

        foreach (var file in entryFiles)
        {
            var component = AnalyzeEntryFile(file);
            if (component != null && component.Parameters.Count > 0 && seenTypes.Add(component.FullName))
            {
                components.Add(component);
            }
        }

        return components.OrderBy(c => c.Name).ToList();
    }

    /// <summary>
    /// Analyze a specific component by name
    /// </summary>
    public async Task<ComponentInfo?> AnalyzeComponentAsync(string componentName)
    {
        if (!Directory.Exists(_componentsPath))
        {
            return null;
        }

        await EnsureCompilationAsync();

        var files = Directory.GetFiles(_componentsPath, $"{componentName}.razor.cs", SearchOption.AllDirectories);
        if (files.Length == 0)
        {
            files = Directory.GetFiles(_componentsPath, $"{componentName}.cs", SearchOption.AllDirectories);
        }

        return files.Length == 0 ? null : AnalyzeEntryFile(files[0]);
    }

    /// <summary>
    /// Analyze injected service types (by name) into ComponentInfo records carrying the
    /// summary, public methods and source path. Services are not Razor components, so
    /// they are resolved by type name from the compilation (classes or interfaces).
    /// </summary>
    public async Task<List<ComponentInfo>> AnalyzeServicesAsync(IEnumerable<string> serviceNames)
    {
        await EnsureCompilationAsync();

        var services = new List<ComponentInfo>();
        foreach (var name in serviceNames)
        {
            var symbol = _compilation!.GetSymbolsWithName(name, SymbolFilter.Type)
                .OfType<INamedTypeSymbol>()
                .FirstOrDefault();
            var syntax = symbol?.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax();
            if (symbol == null || syntax == null)
            {
                continue;
            }

            services.Add(new ComponentInfo
            {
                Name = symbol.Name,
                FullName = symbol.ToDisplayString(FullNameFormat),
                Summary = ExtractXmlSummary(syntax),
                SourcePath = GetRelativePath(syntax.SyntaxTree.FilePath),
                PublicMethods = CollectMethods(symbol)
            });
        }

        return services;
    }

    /// <summary>
    /// Build a single compilation from every source file in the library so that
    /// base types declared in source can be resolved as symbols. No external metadata
    /// references are added: attributes are matched by name, which tolerates the
    /// unresolved framework types (e.g. <c>ComponentBase</c>) at the top of each chain.
    /// </summary>
    private async Task EnsureCompilationAsync()
    {
        if (_compilation != null)
        {
            return;
        }

        var parseOptions = new CSharpParseOptions(documentationMode: DocumentationMode.Parse);
        var trees = new List<SyntaxTree>();

        var files = Directory.GetFiles(_sourcePath, "*.cs", SearchOption.AllDirectories)
            .Where(IsCompilableSource);

        foreach (var file in files)
        {
            var code = await File.ReadAllTextAsync(file);
            var fullPath = Path.GetFullPath(file);
            var tree = CSharpSyntaxTree.ParseText(code, parseOptions, path: fullPath);
            trees.Add(tree);
            _treeByPath[fullPath] = tree;
        }

        // Razor components declare their base class via the @inherits directive, which
        // only materializes in the generated *.razor.g.cs (under obj/, excluded above).
        // Synthesize an equivalent partial declaration so the base type resolves and the
        // inheritance chain is complete. This relies on the .cs trees already being
        // indexed in _treeByPath for namespace lookup, so it must run afterwards.
        var sep = Path.DirectorySeparatorChar;
        foreach (var razorFile in Directory.GetFiles(_sourcePath, "*.razor", SearchOption.AllDirectories))
        {
            if (razorFile.Contains($"{sep}obj{sep}") || razorFile.Contains($"{sep}bin{sep}"))
            {
                continue;
            }

            var shim = await BuildInheritsShimAsync(razorFile);
            if (shim != null)
            {
                trees.Add(CSharpSyntaxTree.ParseText(shim, parseOptions));
            }
        }

        _compilation = CSharpCompilation.Create(
            "BootstrapBlazorDocs",
            trees,
            references: null,
            options: new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary));
    }

    /// <summary>
    /// Read the <c>@inherits</c> / <c>@typeparam</c> / <c>@namespace</c> directives from a
    /// .razor file and emit a minimal partial class that re-states the base type, so the
    /// component's <see cref="INamedTypeSymbol.BaseType"/> resolves in the compilation.
    /// Returns null when the file has no <c>@inherits</c> directive.
    /// </summary>
    private async Task<string?> BuildInheritsShimAsync(string razorFile)
    {
        var content = await File.ReadAllTextAsync(razorFile);

        string? baseType = null;
        string? ns = null;
        var typeParams = new List<string>();

        foreach (var raw in content.Split('\n'))
        {
            var line = raw.Trim();
            if (line.StartsWith("@inherits ", StringComparison.Ordinal))
            {
                baseType = line["@inherits ".Length..].Trim();
            }
            else if (line.StartsWith("@namespace ", StringComparison.Ordinal))
            {
                ns = line["@namespace ".Length..].Trim();
            }
            else if (line.StartsWith("@typeparam ", StringComparison.Ordinal))
            {
                // Take the parameter name only, dropping any "where T : ..." constraint.
                var name = line["@typeparam ".Length..].Trim().Split([' ', '\t'], 2)[0];
                if (name.Length > 0)
                {
                    typeParams.Add(name);
                }
            }
        }

        if (string.IsNullOrEmpty(baseType))
        {
            return null;
        }

        var className = Path.GetFileNameWithoutExtension(razorFile);
        ns ??= GetNamespaceForRazor(razorFile) ?? "BootstrapBlazor.Components";
        var generics = typeParams.Count > 0 ? $"<{string.Join(", ", typeParams)}>" : "";

        return $"namespace {ns};\npublic partial class {className}{generics} : {baseType} {{ }}\n";
    }

    /// <summary>
    /// Resolve the namespace of a .razor file from its sibling code-behind (X.razor.cs),
    /// already parsed into <see cref="_treeByPath"/>. Returns null when none exists.
    /// </summary>
    private string? GetNamespaceForRazor(string razorFile)
    {
        var csPath = Path.GetFullPath(razorFile + ".cs");
        if (_treeByPath.TryGetValue(csPath, out var tree))
        {
            return tree.GetRoot().DescendantNodes()
                .OfType<BaseNamespaceDeclarationSyntax>()
                .FirstOrDefault()?.Name.ToString();
        }

        return null;
    }

    private static bool IsCompilableSource(string path)
    {
        if (path.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}") ||
            path.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}"))
        {
            return false;
        }

        // Skip generated files; they contain no authored [Parameter] documentation.
        return !path.EndsWith(".g.cs", StringComparison.OrdinalIgnoreCase) &&
               !path.EndsWith(".Designer.cs", StringComparison.OrdinalIgnoreCase) &&
               !path.EndsWith(".AssemblyInfo.cs", StringComparison.OrdinalIgnoreCase) &&
               !path.EndsWith(".GlobalUsings.g.cs", StringComparison.OrdinalIgnoreCase);
    }

    private ComponentInfo? AnalyzeEntryFile(string filePath)
    {
        try
        {
            var fullPath = Path.GetFullPath(filePath);
            if (!_treeByPath.TryGetValue(fullPath, out var tree))
            {
                return null;
            }

            var root = tree.GetRoot();

            // Prefer the class whose name matches the file (Button.razor.cs -> Button),
            // falling back to the first class declaration.
            var expectedName = DeriveClassName(filePath);
            var classDeclaration = root.DescendantNodes()
                .OfType<ClassDeclarationSyntax>()
                .FirstOrDefault(c => c.Identifier.Text == expectedName)
                ?? root.DescendantNodes().OfType<ClassDeclarationSyntax>().FirstOrDefault();

            if (classDeclaration == null)
            {
                return null;
            }

            var model = _compilation!.GetSemanticModel(tree);
            if (model.GetDeclaredSymbol(classDeclaration) is not INamedTypeSymbol symbol)
            {
                return null;
            }

            return BuildComponentInfo(symbol, classDeclaration, filePath);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error analyzing {filePath}: {ex.Message}");
            return null;
        }
    }

    private ComponentInfo BuildComponentInfo(INamedTypeSymbol symbol, ClassDeclarationSyntax classDeclaration, string filePath)
    {
        return new ComponentInfo
        {
            Name = symbol.Name,
            FullName = symbol.ToDisplayString(FullNameFormat),
            Summary = ExtractXmlSummary(classDeclaration),
            TypeParameters = symbol.TypeParameters.Select(t => t.Name).ToList(),
            BaseClass = GetBaseClassName(symbol),
            SourcePath = GetRelativePath(filePath),
            LastModified = File.GetLastWriteTimeUtc(filePath),
            SamplePath = FindSamplePath(symbol.Name),
            Parameters = CollectParameters(symbol),
            PublicMethods = CollectMethods(symbol)
        };
    }

    private static string? GetBaseClassName(INamedTypeSymbol symbol)
    {
        var baseType = symbol.BaseType;
        if (baseType == null || baseType.SpecialType == SpecialType.System_Object)
        {
            return null;
        }

        return baseType.ToDisplayString(TypeFormat);
    }

    /// <summary>
    /// Collect [Parameter] properties from the type and every base class in source.
    /// Derived declarations win on name collisions; obsolete parameters are dropped.
    /// </summary>
    private List<ParameterInfo> CollectParameters(INamedTypeSymbol type)
    {
        var parameters = new List<ParameterInfo>();
        var seen = new HashSet<string>(StringComparer.Ordinal);

        for (var current = type;
             current is { SpecialType: SpecialType.None, TypeKind: not TypeKind.Error };
             current = current.BaseType)
        {
            foreach (var property in current.GetMembers().OfType<IPropertySymbol>())
            {
                var syntax = GetPropertySyntax(property);
                if (syntax == null || !HasAttribute(syntax, "Parameter"))
                {
                    continue;
                }

                // Reserve the name even when skipped so a derived declaration always
                // shadows a base one (whether or not the base is obsolete).
                if (!seen.Add(property.Name))
                {
                    continue;
                }

                if (HasAttribute(syntax, "Obsolete"))
                {
                    continue;
                }

                parameters.Add(new ParameterInfo
                {
                    Name = property.Name,
                    Type = property.Type.ToDisplayString(TypeFormat),
                    DefaultValue = GetDefaultValue(syntax),
                    Description = ResolveDescription(property),
                    IsRequired = HasAttribute(syntax, "EditorRequired"),
                    IsObsolete = false,
                    ObsoleteMessage = null,
                    IsEventCallback = property.Type.Name == "EventCallback",
                    DeclaringType = current.Name
                });
            }
        }

        return parameters.OrderBy(p => p.Name).ToList();
    }

    /// <summary>
    /// Collect public methods declared on the component itself (partials merged),
    /// excluding overrides, constructors, accessors and operators.
    /// </summary>
    private List<MethodInfo> CollectMethods(INamedTypeSymbol type)
    {
        var methods = new List<MethodInfo>();

        foreach (var method in type.GetMembers().OfType<IMethodSymbol>())
        {
            if (method.DeclaredAccessibility != Accessibility.Public ||
                method.IsOverride ||
                method.IsImplicitlyDeclared ||
                method.MethodKind != MethodKind.Ordinary)
            {
                continue;
            }

            var syntax = method.DeclaringSyntaxReferences
                .Select(r => r.GetSyntax())
                .OfType<MethodDeclarationSyntax>()
                .FirstOrDefault();

            methods.Add(new MethodInfo
            {
                Name = method.Name,
                ReturnType = method.ReturnType.ToDisplayString(TypeFormat),
                Description = ResolveDescription(method),
                IsJSInvokable = syntax != null && HasAttribute(syntax, "JSInvokable"),
                Parameters = method.Parameters
                    .Select(p => (p.Type.ToDisplayString(TypeFormat), p.Name))
                    .ToList()
            });
        }

        return methods;
    }

    private static PropertyDeclarationSyntax? GetPropertySyntax(IPropertySymbol property) =>
        property.DeclaringSyntaxReferences
            .Select(r => r.GetSyntax())
            .OfType<PropertyDeclarationSyntax>()
            .FirstOrDefault();

    /// <summary>
    /// Resolve a parameter's summary, following <c>&lt;inheritdoc&gt;</c> (with or without a
    /// cref) to the inherited member so parameters that delegate their docs to a base
    /// type or interface still get a real description instead of an empty cell.
    /// </summary>
    private string? ResolveDescription(ISymbol symbol, int depth = 0)
    {
        if (depth > 8)
        {
            return null;
        }

        var syntax = GetMemberSyntax(symbol);
        if (syntax == null)
        {
            return null;
        }

        var inheritdoc = FindInheritdoc(syntax);
        if (inheritdoc == null)
        {
            return ExtractXmlSummary(syntax);
        }

        var target = ResolveInheritdocTarget(symbol, syntax, inheritdoc);
        if (target != null && !SymbolEqualityComparer.Default.Equals(target, symbol))
        {
            var inherited = ResolveDescription(target, depth + 1);
            if (!string.IsNullOrWhiteSpace(inherited))
            {
                return inherited;
            }
        }

        // Unresolved: fall back to whatever this declaration itself carries.
        return ExtractXmlSummary(syntax);
    }

    private static MemberDeclarationSyntax? GetMemberSyntax(ISymbol symbol) =>
        symbol.DeclaringSyntaxReferences
            .Select(r => r.GetSyntax())
            .OfType<MemberDeclarationSyntax>()
            .FirstOrDefault();

    private static XmlNodeSyntax? FindInheritdoc(SyntaxNode syntax)
    {
        var doc = syntax.GetLeadingTrivia()
            .Select(t => t.GetStructure())
            .OfType<DocumentationCommentTriviaSyntax>()
            .FirstOrDefault();
        if (doc == null)
        {
            return null;
        }

        // <inheritdoc> is usually nested inside <summary>, so search all descendants.
        foreach (var node in doc.DescendantNodes())
        {
            switch (node)
            {
                case XmlEmptyElementSyntax e when e.Name.LocalName.Text == "inheritdoc":
                    return e;
                case XmlElementSyntax el when el.StartTag.Name.LocalName.Text == "inheritdoc":
                    return el;
            }
        }

        return null;
    }

    private ISymbol? ResolveInheritdocTarget(ISymbol symbol, SyntaxNode syntax, XmlNodeSyntax inheritdoc)
    {
        var cref = GetCref(inheritdoc);
        if (cref != null)
        {
            var model = _compilation!.GetSemanticModel(syntax.SyntaxTree);
            return model.GetSymbolInfo(cref).Symbol;
        }

        // Implicit <inheritdoc/>: prefer the overridden base member, then a matching
        // interface member.
        return symbol switch
        {
            IPropertySymbol p => (ISymbol?)p.OverriddenProperty ?? FindInterfaceMember(p),
            IMethodSymbol m => (ISymbol?)m.OverriddenMethod ?? FindInterfaceMember(m),
            _ => null
        };
    }

    private static CrefSyntax? GetCref(XmlNodeSyntax inheritdoc)
    {
        SyntaxList<XmlAttributeSyntax> attributes = inheritdoc switch
        {
            XmlEmptyElementSyntax e => e.Attributes,
            XmlElementSyntax el => el.StartTag.Attributes,
            _ => default
        };

        return attributes.OfType<XmlCrefAttributeSyntax>().FirstOrDefault()?.Cref;
    }

    private static ISymbol? FindInterfaceMember(ISymbol member)
    {
        var type = member.ContainingType;
        if (type == null)
        {
            return null;
        }

        foreach (var iface in type.AllInterfaces)
        {
            foreach (var candidate in iface.GetMembers(member.Name))
            {
                var impl = type.FindImplementationForInterfaceMember(candidate);
                if (SymbolEqualityComparer.Default.Equals(impl, member))
                {
                    return candidate;
                }
            }
        }

        return null;
    }

    private static string DeriveClassName(string filePath)
    {
        var fileName = Path.GetFileName(filePath);
        if (fileName.EndsWith(".razor.cs", StringComparison.OrdinalIgnoreCase))
        {
            return fileName[..^".razor.cs".Length];
        }

        return fileName.EndsWith(".cs", StringComparison.OrdinalIgnoreCase)
            ? fileName[..^".cs".Length]
            : fileName;
    }

    private string? ExtractXmlSummary(SyntaxNode node)
    {
        var trivia = node.GetLeadingTrivia();
        var xmlTrivia = trivia.FirstOrDefault(t =>
            t.IsKind(SyntaxKind.SingleLineDocumentationCommentTrivia) ||
            t.IsKind(SyntaxKind.MultiLineDocumentationCommentTrivia));

        if (xmlTrivia == default)
            return null;

        var xmlText = xmlTrivia.ToString();

        // Extract content from <summary> tags
        var match = SummaryRegex().Match(xmlText);
        if (match.Success)
        {
            var summary = match.Groups[1].Value;
            // Clean up the summary
            summary = CleanXmlComment(summary);
            return string.IsNullOrWhiteSpace(summary) ? null : summary;
        }

        return null;
    }

    private string CleanXmlComment(string comment)
    {
        // Remove /// prefixes and extra whitespace
        var lines = comment.Split('\n')
            .Select(l => l.Trim().TrimStart('/').Trim())
            .Where(l => !string.IsNullOrWhiteSpace(l));

        return string.Join(" ", lines);
    }

    private string? GetDefaultValue(PropertyDeclarationSyntax property)
    {
        var initializer = property.Initializer;
        if (initializer != null)
        {
            return SimplifyDefaultValue(initializer.Value.ToString());
        }

        // Check for default in constructor or OnParametersSet
        return null;
    }

    private string SimplifyDefaultValue(string value)
    {
        // Simplify common patterns
        if (value == "false") return "false";
        if (value == "true") return "true";
        if (value == "null") return "null";
        if (value == "0") return "0";
        if (value == "string.Empty" || value == "\"\"") return "\"\"";
        if (value.StartsWith("new ")) return "new()";

        return value;
    }

    private bool HasAttribute(MemberDeclarationSyntax member, string attributeName)
    {
        return member.AttributeLists
            .SelectMany(a => a.Attributes)
            .Any(a => a.Name.ToString() == attributeName ||
                     a.Name.ToString() == attributeName + "Attribute");
    }

    private string GetRelativePath(string fullPath)
    {
        // Normalize first: _sourcePath is "<root>/../BootstrapBlazor", so without
        // GetFullPath the ".." segment throws off GetDirectoryName and the result
        // becomes "../BootstrapBlazor/..." instead of "src/BootstrapBlazor/...".
        var sourceRoot = Path.GetFullPath(_sourcePath);
        var basePath = Path.GetDirectoryName(Path.GetDirectoryName(sourceRoot))!;
        return Path.GetRelativePath(basePath, Path.GetFullPath(fullPath)).Replace('\\', '/');
    }

    private string? FindSamplePath(string componentName)
    {
        if (!Directory.Exists(_samplesPath))
            return null;

        // Try common sample file naming patterns
        var patterns = new[]
        {
            $"{componentName}s.razor",
            $"{componentName}.razor",
            $"{componentName}Demo.razor",
            $"{componentName}Sample.razor"
        };

        foreach (var pattern in patterns)
        {
            var files = Directory.GetFiles(_samplesPath, pattern, SearchOption.AllDirectories);
            if (files.Length > 0)
            {
                return GetRelativePath(files[0]);
            }
        }

        return null;
    }

    [GeneratedRegex(@"<summary>\s*(.*?)\s*</summary>", RegexOptions.Singleline)]
    private static partial Regex SummaryRegex();
}
