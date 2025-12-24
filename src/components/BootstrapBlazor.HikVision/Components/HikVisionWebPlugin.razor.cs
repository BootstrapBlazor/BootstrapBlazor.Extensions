// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// 海康威视网络摄像机组件 (WebSdk Plugin 插件版本)
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
    /// 获得/设置 网络摄像机 登录类型 默认值 <see cref="HikVisionLoginType.Http"/>
    /// </summary>
    [Parameter]
    public HikVisionLoginType LoginType { get; set; }

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
    public Func<bool, Task>? OnInitedAsync { get; set; }

    /// <summary>
    /// 获得/设置 登录成功后回调方法
    /// </summary>
    [Parameter]
    public Func<Task>? OnLoginAsync { get; set; }

    /// <summary>
    /// 获得/设置 停止预览后回调方法
    /// </summary>
    [Parameter]
    public Func<HikVisionChannel, Task>? OnGetChannelsAsync { get; set; }

    /// <summary>
    /// 获得/设置 注销成功后回调方法
    /// </summary>
    [Parameter]
    public Func<Task>? OnLogoutAsync { get; set; }

    /// <summary>
    /// 获得/设置 开始预览后回调方法
    /// </summary>
    [Parameter]
    public Func<Task>? OnStartRealPlayedAsync { get; set; }

    /// <summary>
    /// 获得/设置 停止预览后回调方法
    /// </summary>
    [Parameter]
    public Func<Task>? OnStopRealPlayedAsync { get; set; }

    private string? ClassString => CssBuilder.Default("bb-hik")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private string? StyleString => CssBuilder.Default()
        .AddClass($"width: {Width};", !string.IsNullOrEmpty(Width))
        .AddClass($"height: {Height};", !string.IsNullOrEmpty(Height))
        .AddStyleFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// 获得 Web sdk 插件是否初始化成功
    /// </summary>
    public bool Inited { get; private set; }

    /// <summary>
    /// 获得 是否已登录
    /// </summary>
    public bool IsLogin { get; private set; }

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
    public async Task<bool> Login(string ip, int port, string userName, string password, HikVisionLoginType loginType = HikVisionLoginType.Http)
    {
        ThrowIfNotInited();
        IsLogin = await InvokeAsync<bool?>("login", Id, ip, port, userName, password, (int)loginType) ?? false;
        if (IsLogin)
        {
            await TriggerLogin();
        }
        return IsLogin;
    }

    private async Task TriggerLogin()
    {
        if (OnLoginAsync != null)
        {
            await OnLoginAsync();
        }
    }

    /// <summary>
    /// 登出方法
    /// </summary>
    /// <returns></returns>
    public async Task Logout()
    {
        if (IsLogin)
        {
            await InvokeVoidAsync("logout", Id);
        }
        IsRealPlaying = false;
        IsLogin = false;
        await TriggerLogout();
    }

    private async Task TriggerLogout()
    {
        if (OnLogoutAsync != null)
        {
            await OnLogoutAsync();
        }
    }

    /// <summary>
    /// 获得通道列表方法
    /// </summary>
    /// <returns></returns>
    public async Task GetChannelList()
    {
        ThrowIfNotInited();
        await InvokeVoidAsync("getChannelList", Id);
    }

    /// <summary>
    /// 开始实时预览方法
    /// </summary>
    /// <returns></returns>
    public async Task StartRealPlay(int streamType, int channelId)
    {
        if (IsLogin && !IsRealPlaying)
        {
            IsRealPlaying = await InvokeAsync<bool?>("startRealPlay", Id, streamType, channelId) ?? false;
            if (IsRealPlaying)
            {
                await TriggerStartRealPlay();
            }
        }
    }

    private async Task TriggerStartRealPlay()
    {
        if (OnStartRealPlayedAsync != null)
        {
            await OnStartRealPlayedAsync();
        }
    }

    /// <summary>
    /// 停止实时预览方法
    /// </summary>
    /// <returns></returns>
    public async Task StopRealPlay()
    {
        if (IsRealPlaying)
        {
            await InvokeVoidAsync("stopRealPlay", Id);
            IsRealPlaying = false;
            await TriggerStopRealPlay();
        }
    }

    private async Task TriggerStopRealPlay()
    {
        if (OnStopRealPlayedAsync != null)
        {
            await OnStopRealPlayedAsync();
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

    /// <summary>
    /// 触发 <see cref="OnGetChannelsAsync"/> 回调方法由 JavaScript 调用
    /// </summary>
    /// <param name="channel"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerGetChannelList(HikVisionChannel channel)
    {
        if (OnGetChannelsAsync != null)
        {
            await OnGetChannelsAsync(channel);
        }
    }

    /// <summary>
    /// 打开声音方法
    /// </summary>
    /// <returns></returns>
    public async Task<bool> OpenSound()
    {
        var ret = false;
        if (IsLogin && IsRealPlaying)
        {
            var code = await InvokeAsync<int>("openSound", Id);
            ret = code == 100;
        }
        return ret;
    }

    /// <summary>
    /// 关闭声音方法
    /// </summary>
    /// <returns></returns>
    public async Task<bool> CloseSound()
    {
        var ret = false;
        if (IsLogin && IsRealPlaying)
        {
            var code = await InvokeAsync<int>("closeSound", Id);
            ret = code == 100;
        }
        return ret;
    }

    /// <summary>
    /// 设置声音方法
    /// </summary>
    /// <param name="value">音量大小值 0 - 100 之间</param>
    /// <returns></returns>
    public async Task<bool> SetVolume(int value)
    {
        var ret = false;
        if (IsLogin && IsRealPlaying)
        {
            var code = await InvokeAsync<int>("setVolume", Id, Math.Max(0, Math.Min(100, value)));
            ret = code == 100;
        }
        return ret;
    }

    private TaskCompletionSource<IJSStreamReference?>? _captureTaskCompletionSource = null;

    /// <summary>
    /// 抓图方法返回 Url
    /// </summary>
    /// <returns></returns>
    public async Task<IJSStreamReference?> CapturePicture(CancellationToken token = default)
    {
        IJSStreamReference? ret = null;
        if (IsLogin && IsRealPlaying)
        {
            _captureTaskCompletionSource = new();

            try
            {
                await InvokeVoidAsync("capturePicture", token, Id);
                ret = await _captureTaskCompletionSource.Task;
            }
            catch (Exception ex)
            {
                _captureTaskCompletionSource.SetException(ex);
            }
        }
        return ret;
    }

    /// <summary>
    /// 抓图返回文件流方法 由 Javascript 调用
    /// </summary>
    /// <param name="stream"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerReceivePictureStream(IJSStreamReference stream)
    {
        if (_captureTaskCompletionSource != null)
        {
            _captureTaskCompletionSource.SetResult(stream);
        }
    }
}
