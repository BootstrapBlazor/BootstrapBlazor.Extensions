using BootstrapBlazor.Mcp;
using BootstrapBlazor.Mcp.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Text;
using System.Text.Json.Nodes;

var options = McpServerOptions.Parse(args);

if (string.IsNullOrWhiteSpace(options.RepoRoot))
{
    var repoManager = new RepositoryManager();
    var repoStatus = await repoManager.EnsureRepositoryAsync(autoUpdate: options.AutoUpdate);

    Console.Error.WriteLine(repoStatus.WasCloned
        ? $"[BootstrapBlazor.Mcp] Cloned repository to: {repoStatus.Path}"
        : repoStatus.UpdatedToCommit != null
            ? $"[BootstrapBlazor.Mcp] Updated repository to: {repoStatus.UpdatedToCommit}"
            : $"[BootstrapBlazor.Mcp] Using repository at: {repoStatus.Path}");

    options = options with { RootPath = repoManager.RepoPath };
}
else
{
    Console.Error.WriteLine($"[BootstrapBlazor.Mcp] Using repository at: {Path.GetFullPath(options.RepoRoot)}");
}

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(options);
builder.Services.AddSingleton(serviceProvider =>
    BootstrapBlazorContextService.Create(serviceProvider.GetRequiredService<McpServerOptions>()));
builder.Services.AddSingleton<McpJsonRpcDispatcher>();

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new
{
    status = "ok",
    service = "bootstrapblazor-mcp"
}));

app.MapPost("/mcp", async (
    HttpRequest request,
    McpJsonRpcDispatcher dispatcher,
    McpServerOptions options,
    ILoggerFactory loggerFactory,
    CancellationToken cancellationToken) =>
{
    var logger = loggerFactory.CreateLogger("BootstrapBlazor.Mcp.Messages");
    string rawBody;
    using (var reader = new StreamReader(request.Body, Encoding.UTF8))
    {
        rawBody = await reader.ReadToEndAsync(cancellationToken);
    }

    JsonNode? message;
    try
    {
        message = JsonNode.Parse(rawBody);
    }
    catch
    {
        if (options.ShouldLogMessages(app.Environment.EnvironmentName, Debugger.IsAttached))
        {
            logger.LogWarning("MCP request parse failed. bodyPreview={BodyPreview}", rawBody);
        }

        return Results.Json(
            McpJsonRpcDispatcher.CreateErrorResponse(null, -32700, "Invalid JSON."),
            statusCode: StatusCodes.Status400BadRequest);
    }

    if (message is not JsonObject jsonObject)
    {
        return Results.Json(
            McpJsonRpcDispatcher.CreateErrorResponse(null, -32600, "Expected a JSON-RPC object."),
            statusCode: StatusCodes.Status400BadRequest);
    }

    var logMessages = options.ShouldLogMessages(app.Environment.EnvironmentName, Debugger.IsAttached);

    if (logMessages)
    {
        logger.LogInformation("MCP request: {Request}", McpDebugLogFormatter.FormatRequest(jsonObject, rawBody, options.LogPreviewChars));
    }

    var sampleLocale = SampleLocaleResolver.Resolve(
        options.DefaultSampleLocale,
        request.Headers[SampleLocaleResolver.LocaleHeaderName].ToString(),
        request.Headers.AcceptLanguage.ToString());

    var response = await dispatcher.HandleMessageAsync(jsonObject, sampleLocale, cancellationToken);
    if (logMessages)
    {
        logger.LogInformation("MCP response: {Response}", McpDebugLogFormatter.FormatResponse(response, options.LogPreviewChars));
    }

    return response is null
        ? Results.Accepted()
        : Results.Json(response);
});

app.Run();
