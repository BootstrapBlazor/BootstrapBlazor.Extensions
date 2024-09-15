// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.JSInterop;
using System.ComponentModel;

namespace BootstrapBlazor.WebAPI.Services;

public interface IStorage
{
    public Task RemoveValue(string key);
    public Task SetValue<TValue>(string key, TValue value);
    public Task<TValue?> GetValue<TValue>(string key, TValue? def);
}

public class StorageService : IStorage
{
    private readonly IJSRuntime JSRuntime;

    public StorageService(IJSRuntime jsRuntime)
    {
        JSRuntime = jsRuntime;
    }

    public async Task SetValue<TValue>(string key, TValue value)
    {
        await JSRuntime.InvokeVoidAsync("eval", $"localStorage.setItem('{key}', '{value}')");
    }

    public async Task<TValue?> GetValue<TValue>(string key, TValue? def)
    {
        try
        {
            var cValue = await JSRuntime.InvokeAsync<TValue>("eval", $"localStorage.getItem('{key}');");
            return cValue ?? def;
        }
        catch
        {
            var cValue = await JSRuntime.InvokeAsync<string>("eval", $"localStorage.getItem('{key}');");
            if (cValue == null)
                return def;

            var newValue = GetValueI<TValue>(cValue);
            return newValue ?? def;

        }
    }
    public static T? GetValueI<T>(string value)
    {
        TypeConverter converter = TypeDescriptor.GetConverter(typeof(T));
        if (converter != null)
        {
            return (T?)converter.ConvertFrom(value);
        }
        return default;
        //return (T)Convert.ChangeType(value, typeof(T));
    }

    public async Task RemoveValue(string key)
    {
        await JSRuntime.InvokeVoidAsync("eval", $"localStorage.removeItem('{key}')");
    }


}



