// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// 海康威视网络摄像机组件 (Websdk Plugin 插件版本)
/// </summary>
[JSModuleAutoLoader("./_content/BootstrapBlazor.HikVision/Components/HikVisionWebPlugin.razor.js", JSObjectReference = true)]
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

    /// <summary>
    /// 获得/设置 插件初始化完成后回调方法
    /// </summary>
    [Parameter]
    public Func<bool, Task> OnInitedAsync { get; set; }

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
    /// 获得 是否正在实时预览
    /// </summary>
    public bool IsRealPlaying { get; private set; }

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
    /// 登录方法
    /// </summary>
    /// <param name="ip"></param>
    /// <param name="port"></param>
    /// <param name="userName"></param>
    /// <param name="password"></param>
    /// <param name="loginType"></param>
    /// <returns></returns>
    public async Task<bool> Login(string ip, int port, string userName, string password, LoginType loginType = LoginType.Http)
    {
        ThrowIfNotInited();
        IsLogined = await InvokeAsync<bool?>("login", Id, ip, port, userName, password, (int)loginType) ?? false;
        return IsLogined;
    }

    /// <summary>
    /// 登出方法
    /// </summary>
    /// <returns></returns>
    public async Task Logout()
    {
        if (IsLogined)
        {
            await InvokeVoidAsync("logout", Id);
        }
        IsLogined = false;
    }

    /// <summary>
    /// 开始实时预览方法
    /// </summary>
    /// <returns></returns>
    public async Task StartRealPlay(int streamType, int channelId)
    {
        if (IsLogined && !IsRealPlaying)
        {
            IsRealPlaying = await InvokeAsync<bool?>("startRealPlay", Id, streamType, channelId) ?? false;
        }
    }

    /// <summary>
    /// 停止实时预览方法
    /// </summary>
    /// <returns></returns>
    public async Task StopRealPlay()
    {
        if (IsLogined && IsRealPlaying)
        {
            var result = await InvokeAsync<bool?>("stopRealPlay", Id) ?? false;
            if (result)
            {
                IsRealPlaying = false;
            }
        }
    }

    private void ThrowIfNotInited()
    {
        if (!Inited)
        {
            throw new InvalidOperationException("HikVision Web Plugin not inited");
        }
    }

    /// <summary>
    /// 触发 <see cref="OnInitedAsync"/> 回调方法由 JavaScript 调用
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerInited(bool inited)
    {
        Inited = inited;

        if (OnInitedAsync != null)
        {
            await OnInitedAsync(inited);
        }
    }
}
