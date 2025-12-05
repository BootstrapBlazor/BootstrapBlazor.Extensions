// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// 海康威视网络摄像机接口
/// </summary>
public interface IHikVision : IAsyncDisposable
{
    /// <summary>
    /// 登录方法
    /// </summary>
    /// <param name="loginType">登录方式 <see cref="HikVisionLoginType"/> 实例</param>
    /// <param name="ip">设备 Ip 地址</param>
    /// <param name="port">设备端口</param>
    /// <param name="userName">用户名</param>
    /// <param name="password">密码</param>
    /// <returns></returns>
    Task<bool> Login(string ip, int port, string userName, string password, HikVisionLoginType loginType = HikVisionLoginType.Http);

    /// <summary>
    /// 登出方法
    /// </summary>
    /// <param name="ip">设备 Ip 地址</param>
    /// <param name="port">设备端口</param>
    /// <returns></returns>
    Task<bool> Logout(string ip, int port);

    /// <summary>
    /// 开始实时预览画面方法
    /// </summary>
    /// <returns></returns>
    Task StartRealPlay();

    /// <summary>
    /// 停止实时预览画面方法
    /// </summary>
    /// <returns></returns>
    Task StopRealPlay();
}
