// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// 海康威视网络摄像机组件 (Websdk Plugin 插件版本)
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.HikVision/Components/HikVisionWebPlugin.razor.js")]
public partial class HikVisionWebPlugin
{
    /// <summary>
    /// 获得/设置 网络摄像机 IP 地址
    /// </summary>
    [Parameter]
    public string? Ip { get; set; }

    /// <summary>
    /// 获得/设置 网络摄像机 端口号 默认值 80
    /// </summary>
    [Parameter]
    public int Port { get; set; } = 80;

    /// <summary>
    /// 获得/设置 网络摄像机 登录用户名
    /// </summary>
    [Parameter]
    public string? UserName { get; set; }

    /// <summary>
    /// 获得/设置 网络摄像机 登录密码
    /// </summary>
    [Parameter]
    public string? Password { get; set; }

    /// <summary>
    /// 获得/设置 网络摄像机 登录类型 默认值 <see cref="LoginType.Http"/>
    /// </summary>
    [Parameter]
    public LoginType LoginType { get; set; }

    /// <summary>
    /// 获得/设置 视频图像窗口宽度 默认值 500px
    /// </summary>
    [Parameter]
    public string? Width { get; set; }

    /// <summary>
    /// 获得/设置 视频图像窗口高度 默认值 300px
    /// </summary>
    [Parameter]
    public string? Height { get; set; }

    private string? ClassString => CssBuilder.Default("bb-hik")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddClass($"width: {Width};", !string.IsNullOrEmpty(Width))
        .AddClass($"height: {Height};", !string.IsNullOrEmpty(Height))
        .AddStyleFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// 获得 Websdk 插件是否初始化成功
    /// </summary>
    public bool Inited { get; private set; }

    /// <summary>
    /// 获得 是否已登录
    /// </summary>
    public bool IsLogined { get; private set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        Width ??= "500px";
        Height ??= "300px";
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override async Task InvokeInitAsync()
    {
        Inited = await InvokeAsync<bool?>("init", Id) ?? false;
    }

    /// <summary>
    /// 登录方法
    /// </summary>
    /// <param name="ip"></param>
    /// <param name="port"></param>
    /// <param name="userName"></param>
    /// <param name="password"></param>
    /// <param name="loginType"></param>
    /// <returns></returns>
    public async Task Login(string ip, int port, string userName, string password, LoginType loginType = LoginType.Http)
    {
        ThrowIfNotInited();
        IsLogined = await InvokeAsync<bool>("login", Id, ip, port, userName, password, (int)loginType);
    }

    /// <summary>
    /// 登出方法
    /// </summary>
    /// <returns></returns>
    public async Task Logout()
    {
        IsLogined = false;
        await InvokeVoidAsync("logout", Id);
    }

    /// <summary>
    /// 开始实时预览方法
    /// </summary>
    /// <returns></returns>
    public async Task StartRealPlay()
    {
        if (IsLogined)
        {
            await InvokeVoidAsync("startRealPlay", Id);
        }
    }

    /// <summary>
    /// 停止实时预览方法
    /// </summary>
    /// <returns></returns>
    public async Task StopRealPlay()
    {
        if (IsLogined)
        {
            await InvokeVoidAsync("stopRealPlay", Id);
        }
    }

    private void ThrowIfNotInited()
    {
        if (!Inited)
        {
            throw new InvalidOperationException("HikVision Web Plugin not inited");
        }
    }
}
