namespace BootstrapBlazor.Mcp;

internal static class SampleLocaleResolver
{
    public const string DefaultLocale = "en-US";
    public const string LocaleHeaderName = "X-BootstrapBlazor-Locale";

    private static readonly string[] SupportedLocales = ["en-US", "zh-CN"];

    public static string Resolve(string? configuredDefault, string? explicitLocale, string? acceptLanguage)
    {
        return Normalize(explicitLocale)
            ?? ResolveAcceptLanguage(acceptLanguage)
            ?? Normalize(configuredDefault)
            ?? DefaultLocale;
    }

    public static string NormalizeOrDefault(string? locale)
    {
        return Normalize(locale) ?? DefaultLocale;
    }

    private static string? ResolveAcceptLanguage(string? acceptLanguage)
    {
        if (string.IsNullOrWhiteSpace(acceptLanguage))
        {
            return null;
        }

        return acceptLanguage
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(item => item.Split(';', 2, StringSplitOptions.TrimEntries)[0])
            .Select(Normalize)
            .FirstOrDefault(locale => locale is not null);
    }

    private static string? Normalize(string? locale)
    {
        if (string.IsNullOrWhiteSpace(locale))
        {
            return null;
        }

        return locale.Trim().ToLowerInvariant() switch
        {
            "en" or "en-us" => "en-US",
            "zh" or "zh-cn" => "zh-CN",
            _ => SupportedLocales.FirstOrDefault(item => item.Equals(locale, StringComparison.OrdinalIgnoreCase))
        };
    }
}
