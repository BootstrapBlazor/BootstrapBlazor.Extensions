// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using BootstrapBlazor.WebAPI.Services;
namespace Microsoft.Extensions.DependencyInjection;

/// <summary>
/// 服务扩展类
/// </summary>
public static class StorageServiceCollectionExtensions
{


    /// <summary>
    /// Cookie / LocalStorage 服务扩展类
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddStorages(this IServiceCollection services)
    {

        services.AddScoped<ICookie, CookieService>();
        services.AddScoped<IStorage, StorageService>();

        return services;
    }

}


