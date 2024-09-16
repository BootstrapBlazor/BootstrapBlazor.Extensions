// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using System.Security.Cryptography;
using System.Text;

namespace BootstrapBlazor.WebAPI.Services;


public class PasswordHasher
{
    public string HashPassword(string password, string? sal = null)
    {
        var rnd = sal ?? Guid.NewGuid().ToString("N").Substring(10);
        return BuildHash(rnd, password);
    }

    public bool CheckPassword(string password, string hash)
    {
        if (string.IsNullOrWhiteSpace(hash))
        {
            return false;
        }

        var items = hash.Split('|');
        if (items.Length != 2)
        {
            return false;
        }

        var rnd = items[0];
        return hash == BuildHash(rnd, password);
    }

    private string BuildHash(string rnd, string password)
    {
        var key = rnd + "|" + password.Trim();
        var hash = Hash(key);
        return rnd + "|" + hash;
    }

    private string Hash(string input)
    {
        using (var sha = SHA256.Create())
        {
            var bytes = Encoding.UTF8.GetBytes(input);
            bytes = sha.ComputeHash(bytes);
            return Convert.ToBase64String(bytes);
        }
    }
}
