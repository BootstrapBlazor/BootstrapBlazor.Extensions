// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************


using System.ComponentModel;

namespace BootstrapBlazor.Components;

/// <summary>
/// 屏幕类,检查屏幕的当前方向，甚至锁定到特定的方向
/// </summary>
public enum Screen
{

    /// <summary>
    /// 锁定屏幕方向为竖屏
    /// </summary>
    /// <returns></returns>
    [Description("锁定屏幕方向为竖屏")]
    LockPortrait,

    /// <summary>
    /// 锁定屏幕方向为横屏
    /// </summary>
    /// <returns></returns>
    [Description("锁定屏幕方向为横屏")]
    LockLandscape,

    /// <summary>
    /// 解除屏幕方向锁定
    /// </summary>
    /// <returns></returns>
    [Description("解除屏幕方向锁定")]
    Unlock,

    /// <summary>
    /// 返回屏幕当前的方向
    /// </summary>
    /// <returns></returns>
    [Description("返回屏幕当前的方向")]
    GetOrientation,

}
