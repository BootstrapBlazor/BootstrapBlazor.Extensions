// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// 串口读写 WebSerial
/// <remarks>
/// <para></para>
/// 浏览器兼容性：仅限桌面版 Chrome/Edge/Opera
/// <para></para>
/// Browser compatibility: Only Desktop Chrome/Edge/Opera
/// </remarks>
/// </summary>
public partial class WebSerial : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    private IJSObjectReference? Module { get; set; }
    private DotNetObjectReference<WebSerial>? Instance { get; set; }

    /// <summary>
    /// UI界面元素的引用对象
    /// </summary>
    public ElementReference Element { get; set; }

    /// <summary>
    /// 获得/设置 连接状态回调方法
    /// </summary>
    [Parameter]
    public Func<bool, Task>? OnConnect { get; set; }

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// 获得/设置 Log回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnLog { get; set; }

    /// <summary>
    /// 获得/设置 收到数据回调方法
    /// </summary>
    [Parameter]
    public Func<string?, Task>? OnReceive { get; set; }

    /// <summary>
    /// 获得/设置 收到信号数据回调方法
    /// </summary>
    [Parameter]
    public Func<WebSerialSignals?, Task>? OnSignals { get; set; }

    /// <summary>
    /// 连接按钮文本/Connect button title
    /// </summary>
    [Parameter]
    public string? ConnectBtnTitle { get; set; }

    /// <summary>
    /// 断开连接按钮文本/Connect button title
    /// </summary>
    [Parameter]
    public string? DisconnectBtnTitle { get; set; }

    /// <summary>
    /// 写入按钮文本/Write button title
    /// </summary>
    [Parameter]
    public string? WriteBtnTitle { get; set; }

    /// <summary>
    /// 获得/设置 显示内置UI
    /// </summary>
    [Parameter]
    public bool ShowUI { get; set; } = true;

    /// <summary>
    /// 获得/设置 显示log
    /// </summary>
    [Parameter]
    public bool Debug { get; set; }

    [Parameter]
    public WebSerialOptions Options { get; set; } = new WebSerialOptions();

    private WebSerialOptions? OptionsCache { get; set; }

    /// <summary>
    /// 串口是否连接
    /// </summary>
    private bool IsConnected { get; set; }

    /// <summary>
    /// 收到的信号数据
    /// </summary>
    public WebSerialSignals Signals { get; set; } = new WebSerialSignals();

    /// <summary>
    /// 中断
    /// </summary>
    [DisplayName("中断")]
    public bool Break { get; set; }

    /// <summary>
    /// 数据终端就绪
    /// </summary>
    [JsonPropertyName("DTR")]
    [DisplayName("DTR")]
    public bool DTR { get; set; }

    /// <summary>
    /// 请求发送
    /// </summary>
    [JsonPropertyName("RTS")]
    [DisplayName("RTS")]
    public bool RTS { get; set; }

    protected override void OnInitialized()
    {
        Options.ConnectBtnTitle = ConnectBtnTitle ?? Options.ConnectBtnTitle ?? "连接";
        Options.DisconnectBtnTitle = DisconnectBtnTitle ?? Options.DisconnectBtnTitle ?? "断开连接";
        Options.WriteBtnTitle = WriteBtnTitle ?? Options.WriteBtnTitle ?? "写入";
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            Options.ConnectBtnTitle = ConnectBtnTitle ?? Options.ConnectBtnTitle ?? "连接";
            Options.DisconnectBtnTitle = DisconnectBtnTitle ?? Options.DisconnectBtnTitle ?? "断开连接";
            Options.WriteBtnTitle = WriteBtnTitle ?? Options.WriteBtnTitle ?? "写入";

            if (firstRender)
            {
                Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.WebAPI/WebSerial.razor.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
                Instance = DotNetObjectReference.Create(this);
                await Module!.InvokeVoidAsync("Init", Instance, Element, Options, "Start");
                OptionsCache = Options;
            }

            if (!firstRender && Module != null && OptionsCache != Options)
            {
                await Module!.InvokeVoidAsync("Init", Instance, Element, Options, "Start");
                OptionsCache = Options;
            }

        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    protected override async Task OnParametersSetAsync()
    {
        await Task.CompletedTask;
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        Instance?.Dispose();
        if (Module is not null)
        {
            await Module.DisposeAsync();
        }
    }

    /// <summary>
    /// Start
    /// </summary>
    public virtual async Task Start()
    {
        try
        {
            await Module!.InvokeVoidAsync("Init", Instance, Element, Options, "Start");
        }
        catch
        {
        }
    }

    /// <summary>
    /// 撤销对串行端口的访问
    /// </summary>
    public virtual async Task forget()
    {
        try
        {
            await Module!.InvokeVoidAsync("forget", Instance);
        }
        catch
        {
        }
    }

    /// <summary>
    /// 连接状态
    /// </summary>
    /// <param name="msg"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task Connect(bool flag)
    {
        IsConnected = flag;
        if (OnConnect != null) await OnConnect.Invoke(flag);
    }

    /// <summary>
    /// 收到数据回调方法
    /// </summary>
    /// <param name="msg"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task ReceiveData(object? msg)
    {
        try
        {
            if (OnReceive != null && msg != null)
            {
                await OnReceive.Invoke(msg.ToString());
            }
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// Log回调方法
    /// </summary>
    /// <param name="msg"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task GetLog(string msg)
    {
        try
        {
            if (OnLog != null)
            {
                await OnLog.Invoke(msg);
            }
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 设置Break信号
    /// </summary>
    public virtual async Task SetSignalBreak(bool flag) => await SetSignals(new WebSerialSignalsSetting { Break = flag });

    /// <summary>
    /// 设置DTR信号
    /// </summary>
    public virtual async Task SetSignalDTR(bool flag) => await SetSignals(new WebSerialSignalsSetting { DTR = flag });

    /// <summary>
    /// 设置RTS信号
    /// </summary>
    public virtual async Task SetSignalRTS(bool flag) => await SetSignals(new WebSerialSignalsSetting { RTS = flag });

    /// <summary>
    /// 设置信号
    /// </summary>
    public virtual async Task SetSignals(WebSerialSignalsSetting signals)
    {
        try
        {
            await Module!.InvokeVoidAsync("setSignals", Instance, signals);
        }
        catch
        {
        }
    }


    /// <summary>
    /// 获取信号
    /// </summary>
    public virtual async Task GetSignals()
    {
        try
        {
            Signals = await Module!.InvokeAsync<WebSerialSignals>("getSignals", Instance);
            //add  callback
        }
        catch
        {
        }
    }


    /// <summary>
    /// 获取信号回调方法
    /// </summary>
    /// <param name="msg"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task GetSignals(WebSerialSignals signals)
    {
        try
        {
            if (OnSignals != null)
            {
                await OnSignals.Invoke(signals);
            }
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 错误回调方法
    /// </summary>
    /// <param name="error"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task GetError(string error)
    {
        if (OnError != null) await OnError.Invoke(error);
    }
}
