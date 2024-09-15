// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************


using UAParser;

namespace BootstrapBlazor.Components;

/// <summary>
/// 浏览器信息类
/// </summary>


public class UAInfo : ClientInfo
{
    public UAInfo() : base(null, null, null, null)
    {
    }
    public UAInfo(string inputString, OS os, Device device, UserAgent userAgent) : base(inputString, os, device, userAgent)
    {
    }
}
