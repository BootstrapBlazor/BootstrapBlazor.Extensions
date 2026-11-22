using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using BootstrapBlazor.LLMsDocs.Cli.Services;

namespace BootstrapBlazor.LLMsDocs.Cli;

internal sealed class McpServer
{
    private const string ProtocolVersion = "2024-11-05";
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = false,
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
    };
    private bool _initialized;
    private bool _initializeReceived;

    public static Task StartAsync(CancellationToken cancellationToken) =>
        new McpServer().RunAsync(cancellationToken);

    private async Task RunAsync(CancellationToken cancellationToken)
    {
        Console.OutputEncoding = new UTF8Encoding(encoderShouldEmitUTF8Identifier: false);
        await foreach (var line in ReadLinesAsync(Console.OpenStandardInput(), cancellationToken))
        {
            if (string.IsNullOrWhiteSpace(line))
            {
                continue;
            }

            JsonDocument? document = null;
            try
            {
                document = JsonDocument.Parse(line);
                await HandleAsync(document.RootElement);
            }
            catch (JsonException ex)
            {
                await WriteAsync(new
                {
                    jsonrpc = "2.0",
                    id = (object?)null,
                    error = new { code = -32700, message = $"Parse error: {ex.Message}" }
                });
            }
            finally
            {
                document?.Dispose();
            }
        }
    }

    private async IAsyncEnumerable<string> ReadLinesAsync(
        Stream stream,
        [System.Runtime.CompilerServices.EnumeratorCancellation] CancellationToken cancellationToken)
    {
        using var reader = new StreamReader(stream, Encoding.UTF8, detectEncodingFromByteOrderMarks: true);
        string? line;
        while ((line = await reader.ReadLineAsync(cancellationToken)) is not null)
        {
            yield return line;
        }
    }

    private async Task HandleAsync(JsonElement root)
    {
        if (root.ValueKind != JsonValueKind.Object ||
            !root.TryGetProperty("jsonrpc", out var version) ||
            version.ValueKind != JsonValueKind.String ||
            version.GetString() != "2.0" ||
            !root.TryGetProperty("method", out var methodElement) ||
            methodElement.ValueKind != JsonValueKind.String ||
            (root.TryGetProperty("id", out var requestId) &&
                requestId.ValueKind is not (JsonValueKind.String or JsonValueKind.Number or JsonValueKind.Null)))
        {
            await WriteAsync(new
            {
                jsonrpc = "2.0",
                id = GetId(root),
                error = new { code = -32600, message = "Invalid JSON-RPC request." }
            });
            return;
        }

        var hasId = root.TryGetProperty("id", out var idElement);
        var id = hasId ? idElement.Clone() : default;
        var method = methodElement.GetString();
        if (!hasId)
        {
            if (method == "notifications/initialized" && _initializeReceived)
            {
                _initialized = true;
            }
            return;
        }

        try
        {
            switch (method)
            {
                case "initialize":
                    if (_initializeReceived)
                    {
                        await WriteErrorAsync(id, -32600, "Initialize may only be requested once.");
                        break;
                    }
                    if (!root.TryGetProperty("params", out var initializeParams) ||
                        initializeParams.ValueKind != JsonValueKind.Object ||
                        !initializeParams.TryGetProperty("protocolVersion", out var requestedVersion) ||
                        requestedVersion.ValueKind != JsonValueKind.String ||
                        !initializeParams.TryGetProperty("capabilities", out var capabilities) ||
                        capabilities.ValueKind != JsonValueKind.Object ||
                        !initializeParams.TryGetProperty("clientInfo", out var clientInfo) ||
                        clientInfo.ValueKind != JsonValueKind.Object)
                    {
                        await WriteErrorAsync(id, -32602, "Invalid initialize parameters.");
                        break;
                    }
                    _initializeReceived = true;

                    await WriteAsync(new
                    {
                        jsonrpc = "2.0",
                        id,
                        result = new
                        {
                            protocolVersion = ProtocolVersion,
                            capabilities = new { tools = new { listChanged = false } },
                            serverInfo = new
                            {
                                name = "bootstrapblazor-mcp",
                                version = typeof(McpServer).Assembly.GetName().Version?.ToString(3) ?? "unknown"
                            }
                        }
                    });
                    break;
                case "ping":
                    await WriteAsync(new { jsonrpc = "2.0", id, result = new { } });
                    break;
                case "notifications/initialized":
                    await WriteErrorAsync(id, -32600, "notifications/initialized must not include an id.");
                    break;
                case "tools/list":
                    if (!_initializeReceived || !_initialized)
                    {
                        await WriteErrorAsync(id, -32002, "Server not initialized.");
                        break;
                    }
                    await WriteAsync(new
                    {
                        jsonrpc = "2.0",
                        id,
                        result = new { tools = ToolDefinitions() }
                    });
                    break;
                case "tools/call":
                    if (!_initializeReceived || !_initialized)
                    {
                        await WriteErrorAsync(id, -32002, "Server not initialized.");
                        break;
                    }
                    await HandleToolCallAsync(root, id);
                    break;
                default:
                    await WriteErrorAsync(id, -32601, $"Method not found: {method}");
                    break;
            }
        }
        catch (Exception ex)
        {
            await WriteErrorAsync(id, -32603, ex.Message);
        }
    }

    private async Task HandleToolCallAsync(JsonElement root, JsonElement id)
    {
        if (!root.TryGetProperty("params", out var paramsElement) ||
            paramsElement.ValueKind != JsonValueKind.Object ||
            !paramsElement.TryGetProperty("name", out var nameElement) ||
            nameElement.ValueKind != JsonValueKind.String)
        {
            await WriteToolErrorAsync(id, "Tool name is required.");
            return;
        }

        var toolName = nameElement.GetString();
        var arguments = paramsElement.TryGetProperty("arguments", out var argsElement)
            ? argsElement
            : default;
        if (arguments.ValueKind is not (JsonValueKind.Object or JsonValueKind.Undefined))
        {
            await WriteToolErrorAsync(id, "Tool arguments must be an object.");
            return;
        }

        try
        {
            object result = toolName switch
            {
                "search_components" => await SearchAsync(arguments),
                "get_component_api" => await GetAsync(arguments),
                "list_components" => await ListAsync(arguments),
                _ => throw new ArgumentException($"Unknown tool: {toolName}")
            };

            await WriteAsync(new
            {
                jsonrpc = "2.0",
                id,
                result
            });
        }
        catch (Exception ex)
        {
            await WriteToolErrorAsync(id, ex.Message);
        }
    }

    private async Task<object> GetAsync(JsonElement args)
    {
        var name = RequiredString(args, "component");
        var package = OptionalString(args, "package");
        using var context = CreateClient(args);
        var result = await context.Client.ResolveAsync(name, package, CancellationToken.None);
        return ToolResult(new
        {
            name,
            source = result.Source,
            package = result.Package,
            packageVersion = result.PackageVersion,
            location = result.Location,
            warning = result.Warning,
            content = result.Content
        });
    }

    private async Task<object> ListAsync(JsonElement args)
    {
        var query = OptionalString(args, "query");
        using var context = CreateClient(args);
        var entries = await context.Client.ListAsync(query, CancellationToken.None);
        return CatalogResult(entries, context);
    }

    private async Task<object> SearchAsync(JsonElement args)
    {
        var query = RequiredString(args, "query");
        var limit = OptionalInt(args, "limit", 20, 1, 100);
        using var context = CreateClient(args);
        var entries = await context.Client.SearchAsync(query, limit, CancellationToken.None);
        return CatalogResult(entries, context);
    }

    private ClientContext CreateClient(JsonElement args)
    {
        var baseUrl = OptionalString(args, "base_url");
        var refresh = OptionalBool(args, "refresh");
        var noCache = OptionalBool(args, "no_cache");
        var project = OptionalString(args, "project");
        var framework = OptionalString(args, "framework");
        var automatic = string.IsNullOrWhiteSpace(baseUrl)
            && string.IsNullOrEmpty(Environment.GetEnvironmentVariable(LlmsDocsClient.BaseUrlEnvVar));
        var packages = automatic
            ? ProjectDocsResolver.Resolve(project, framework)
            : Array.Empty<PackageDocs>();
        var client = new LlmsDocsClient(baseUrl, refresh, noCache, automatic);
        return new ClientContext(
            new ProjectDocsClient(client, packages, automatic),
            packages,
            automatic,
            client.SourceDescription,
            client.IsLocalSource);
    }

    private static object CatalogResult(object entries, ClientContext context)
    {
        var packageVersions = context.Packages
            .Select(package => new { package.Package, package.Version })
            .Distinct()
            .ToArray();
        return ToolResult(new
        {
            source = packageVersions.Length > 0
                ? "project-packages-with-catalog-fallback"
                : context.Automatic ? "official" : context.IsLocalSource ? "local" : "remote",
            location = context.SourceLocation,
            packageVersions,
            officialVersionMayDiffer = context.Automatic,
            sourceNote = packageVersions.Length > 0
                ? "Package entries use the restored versions listed here; the catalog may also include entries from the configured source."
                : context.Automatic
                    ? "Official documentation may not match the project's package versions."
                    : null,
            entries
        });
    }

    private sealed record ClientContext(
        ProjectDocsClient Client,
        IReadOnlyList<PackageDocs> Packages,
        bool Automatic,
        string SourceLocation,
        bool IsLocalSource) : IDisposable
    {
        public void Dispose() => Client.Dispose();
    }

    private static object ToolResult(object value) => new
    {
        content = new[]
        {
            new
            {
                type = "text",
                text = value is string text
                    ? text
                    : JsonSerializer.Serialize(value, JsonOptions)
            }
        },
        isError = false
    };

    private async Task WriteToolErrorAsync(JsonElement id, string message)
    {
        await WriteAsync(new
        {
            jsonrpc = "2.0",
            id,
            result = new
            {
                content = new[]
                {
                    new { type = "text", text = $"error: {message}" }
                },
                isError = true
            }
        });
    }

    private static object[] ToolDefinitions() =>
    [
        new
        {
            name = "search_components",
            description = "Search BootstrapBlazor component and extension API documentation.",
            inputSchema = new
            {
                type = "object",
                properties = SourceProperties(new
                {
                    query = new { type = "string", description = "Name or description search term." },
                    limit = new { type = "integer", minimum = 1, maximum = 100, @default = 20 }
                }),
                required = new[] { "query" }
            }
        },
        new
        {
            name = "get_component_api",
            description = "Get a component API document. Prefer package-document source; fall back to official docs only when absent.",
            inputSchema = new
            {
                type = "object",
                properties = SourceProperties(new
                {
                    component = new { type = "string", description = "Exact component name." },
                    package = new { type = "string", description = "Optional package name used to disambiguate shared names." }
                }),
                required = new[] { "component" }
            }
        },
        new
        {
            name = "list_components",
            description = "List available components and extensions.",
            inputSchema = new
            {
                type = "object",
                properties = SourceProperties(new
                {
                    query = new { type = "string", description = "Optional name or description filter." }
                })
            }
        }
    ];

    private static object SourceProperties(object extra)
    {
        var json = JsonSerializer.SerializeToElement(extra, JsonOptions);
        var properties = new Dictionary<string, JsonElement>();
        foreach (var property in json.EnumerateObject())
        {
            properties[property.Name] = property.Value;
        }
        properties["project"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Project file or directory containing exactly one project." });
        properties["framework"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Target framework key from project.assets.json." });
        properties["base_url"] = JsonSerializer.SerializeToElement(new { type = "string", description = "Optional HTTP(S) URL or local llms directory." });
        properties["refresh"] = JsonSerializer.SerializeToElement(new { type = "boolean", @default = false });
        properties["no_cache"] = JsonSerializer.SerializeToElement(new { type = "boolean", @default = false });
        return properties;
    }

    private static string RequiredString(JsonElement args, string name)
    {
        if (args.ValueKind != JsonValueKind.Object ||
            !args.TryGetProperty(name, out var value) ||
            value.ValueKind != JsonValueKind.String ||
            string.IsNullOrWhiteSpace(value.GetString()))
        {
            throw new ArgumentException($"{name} is required.");
        }
        return value.GetString()!;
    }

    private static string? OptionalString(JsonElement args, string name)
    {
        if (args.ValueKind != JsonValueKind.Object || !args.TryGetProperty(name, out var value))
        {
            return null;
        }
        if (value.ValueKind != JsonValueKind.String)
        {
            throw new ArgumentException($"{name} must be a string.");
        }
        return value.GetString();
    }

    private static bool OptionalBool(JsonElement args, string name)
    {
        if (args.ValueKind != JsonValueKind.Object || !args.TryGetProperty(name, out var value))
        {
            return false;
        }
        if (value.ValueKind is not (JsonValueKind.True or JsonValueKind.False))
        {
            throw new ArgumentException($"{name} must be a boolean.");
        }
        return value.GetBoolean();
    }

    private static int OptionalInt(JsonElement args, string name, int defaultValue, int min, int max)
    {
        if (args.ValueKind == JsonValueKind.Object &&
            args.TryGetProperty(name, out var value) &&
            value.TryGetInt32(out var number))
        {
            return Math.Clamp(number, min, max);
        }
        if (args.ValueKind == JsonValueKind.Object && args.TryGetProperty(name, out _))
        {
            throw new ArgumentException($"{name} must be an integer.");
        }
        return defaultValue;
    }

    private static object? GetId(JsonElement root) =>
        root.ValueKind == JsonValueKind.Object && root.TryGetProperty("id", out var id)
            ? id.Clone()
            : null;

    private async Task WriteErrorAsync(JsonElement id, int code, string message)
    {
        await WriteAsync(new { jsonrpc = "2.0", id, error = new { code, message } });
    }

    private async Task WriteAsync(object response)
    {
        await Console.Out.WriteLineAsync(JsonSerializer.Serialize(response, JsonOptions));
        await Console.Out.FlushAsync();
    }
}
