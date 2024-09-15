// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.JSInterop;

namespace BootstrapBlazor.WebAPI.Services;

public interface ICookie
{
    public Task RemoveValue(string key);
    public Task SetValue(string key, string value, int? days = null);
    public Task<string> GetValue(string key, string def = "");
}

public class CookieService : ICookie
{
    private readonly IJSRuntime JSRuntime;
    private string expires = "";

    public CookieService(IJSRuntime jsRuntime)
    {
        JSRuntime = jsRuntime;
        ExpireDays = 300;
    }

    public async Task SetValue(string key, string value, int? days = null)
    {
        var curExp = (days != null) ? (days > 0 ? DateToUTC(days.Value) : "") : expires;
        await SetCookie($"{key}={value}; expires={curExp}; path=/");
    }

    public async Task<string> GetValue(string key, string def = "")
    {
        var cValue = await GetCookie();
        if (string.IsNullOrEmpty(cValue)) return def;

        var vals = cValue.Split(';');
        foreach (var val in vals)
            if (!string.IsNullOrEmpty(val) && val.IndexOf('=') > 0)
                if (val.Substring(0, val.IndexOf('=')).Trim().Equals(key, StringComparison.OrdinalIgnoreCase))
                    return val.Substring(val.IndexOf('=') + 1);
        return def;
    }
    public async Task RemoveValue(string key)
    {
        await SetCookie($"{key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/");
    }

    private async Task SetCookie(string value)
    {
        await JSRuntime.InvokeVoidAsync("eval", $"document.cookie = \"{value}\"");
    }

    private async Task<string> GetCookie()
    {
        return await JSRuntime.InvokeAsync<string>("eval", $"document.cookie");
    }

    public int ExpireDays
    {
        set => expires = DateToUTC(value);
    }

    private static string DateToUTC(int days) => DateTime.Now.AddDays(days).ToUniversalTime().ToString("R");

}



