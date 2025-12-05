// Copyright (c) BootstrapBlazor & Argo Zhang (argo@live.ca). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

sealed class DefaultHicVision(IJSRuntime jsRuntime) : IHikVision
{
    private JSModule _module = default!;
    private bool _initialized;
    private bool _logined;

    public async Task<bool> Login(string ip, int port, string userName, string password, HikVisionLoginType loginType = HikVisionLoginType.Http)
    {
        await LoadAsync();

        if (!_logined)
        {
            _logined = await _module.InvokeAsync<bool>("login", ip, port, userName, password, (int)loginType);
        }

        return _logined;
    }

    public async Task<bool> Logout(string ip, int port)
    {
        if (_logined)
        {
            _logined = await _module.InvokeAsync<bool>("logout");
        }

        return _logined;
    }

    public async Task StartRealPlay()
    {
        if (_logined)
        {
            await _module.InvokeVoidAsync("startRealPlay");
        }
    }

    public async Task StopRealPlay()
    {
        if (_logined)
        {
            await _module.InvokeVoidAsync("stopRealPlay");
        }
    }

    private async Task LoadAsync()
    {
        if (!_initialized)
        {
            var module = await jsRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.HikVision/hikvision.js");
            _module = new JSModule(module);

            _initialized = true;
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (_module != null)
        {
            await _module.InvokeVoidAsync("dispose");
            await _module.DisposeAsync();
        }
        GC.SuppressFinalize(this);
    }
}
