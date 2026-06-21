// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

namespace BootstrapBlazorLLMsDocsGenerator;

/// <summary>
/// Represents information about a Blazor component
/// </summary>
public class ComponentInfo
{
    /// <summary>
    /// Component name (e.g., "Table", "Button")
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Full type name including namespace
    /// </summary>
    public string FullName { get; set; } = string.Empty;

    /// <summary>
    /// XML documentation summary
    /// </summary>
    public string? Summary { get; set; }

    /// <summary>
    /// Generic type parameters (e.g., "TItem", "TValue")
    /// </summary>
    public List<string> TypeParameters { get; set; } = new();

    /// <summary>
    /// Component parameters ([Parameter] properties)
    /// </summary>
    public List<ParameterInfo> Parameters { get; set; } = new();

    /// <summary>
    /// Public methods
    /// </summary>
    public List<MethodInfo> PublicMethods { get; set; } = new();

    /// <summary>
    /// Base class name
    /// </summary>
    public string? BaseClass { get; set; }

    /// <summary>
    /// Source file path
    /// </summary>
    public string SourcePath { get; set; } = string.Empty;

    /// <summary>
    /// Last modification time of the source file
    /// </summary>
    public DateTime LastModified { get; set; }

    /// <summary>
    /// Related sample file path (if exists)
    /// </summary>
    public string? SamplePath { get; set; }

    /// <summary>
    /// Whether this type comes from a BootstrapBlazor.Extensions package; affects which
    /// GitHub repository the source link points to.
    /// </summary>
    public bool IsExtension { get; set; }

    /// <summary>
    /// Dependency-injection registration for an extension service, resolved from the
    /// <c>AddXxx(this IServiceCollection)</c> extension method that registers this type.
    /// Null for components and for services with no discoverable registration method.
    /// </summary>
    public ServiceRegistration? Registration { get; set; }
}

/// <summary>
/// Describes how an extension service is added to the DI container, so the docs can
/// show the registration call required before the service can be injected.
/// </summary>
public class ServiceRegistration
{
    /// <summary>
    /// Registration extension method name, e.g. <c>AddBootstrapBlazorWinBoxService</c>.
    /// </summary>
    public string MethodName { get; set; } = string.Empty;

    /// <summary>
    /// Optional extra parameters (excluding the <c>this IServiceCollection</c> receiver),
    /// e.g. <c>Action&lt;BaiduOcrOption&gt;? configOptions = null</c>. Null when the method
    /// takes no configuration arguments.
    /// </summary>
    public string? Parameters { get; set; }
}

/// <summary>
/// Represents a component parameter
/// </summary>
public class ParameterInfo
{
    /// <summary>
    /// Parameter name
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Parameter type as string
    /// </summary>
    public string Type { get; set; } = string.Empty;

    /// <summary>
    /// Default value (if any)
    /// </summary>
    public string? DefaultValue { get; set; }

    /// <summary>
    /// XML documentation summary
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Whether this is an EditorRequired parameter
    /// </summary>
    public bool IsRequired { get; set; }

    /// <summary>
    /// Whether this parameter is obsolete
    /// </summary>
    public bool IsObsolete { get; set; }

    /// <summary>
    /// Obsolete message (if obsolete)
    /// </summary>
    public string? ObsoleteMessage { get; set; }

    /// <summary>
    /// Whether this is an EventCallback
    /// </summary>
    public bool IsEventCallback { get; set; }

    /// <summary>
    /// Name of the type that declares this parameter. Differs from the component
    /// name when the parameter is inherited from a base class.
    /// </summary>
    public string? DeclaringType { get; set; }
}

/// <summary>
/// Represents a public method
/// </summary>
public class MethodInfo
{
    /// <summary>
    /// Method name
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Return type
    /// </summary>
    public string ReturnType { get; set; } = string.Empty;

    /// <summary>
    /// Method parameters
    /// </summary>
    public List<(string Type, string Name)> Parameters { get; set; } = new();

    /// <summary>
    /// XML documentation summary
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Whether this is a JSInvokable method
    /// </summary>
    public bool IsJSInvokable { get; set; }
}
