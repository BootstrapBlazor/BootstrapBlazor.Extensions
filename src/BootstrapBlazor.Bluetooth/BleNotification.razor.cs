// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;

namespace BootstrapBlazor.Components;

/// <summary>
/// 蓝牙通知 BleNotification 组件
/// </summary>
public partial class BleNotification : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    private IJSObjectReference? Module { get; set; }
    private DotNetObjectReference<BleNotification>? Instance { get; set; }

    /// <summary>
    /// UI界面元素的引用对象
    /// </summary>
    public ElementReference Element { get; set; }

    /// <summary>
    /// 获得/设置 蓝牙设备
    /// </summary>
    [Parameter]
    public BluetoothDevice? Device { get; set; } = new BluetoothDevice();

    /// <summary>
    /// 获得/设置 状态更新回调方法
    /// </summary>
    [Parameter]
    public Func<BluetoothDevice, Task>? OnUpdateStatus { get; set; }

    /// <summary>
    /// 获得/设置 数值更新回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnUpdateValue { get; set; }

    /// <summary>
    /// 获得/设置 错误更新回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnUpdateError { get; set; }

    /// <summary>
    /// 获得/设置 显示log
    /// </summary>
    [Parameter]
    public bool Debug { get; set; }

    /// <summary>
    /// 自动连接设备
    /// </summary>
    [Parameter]
    [DisplayName("自动连接设备")]
    public bool AutoConnect { get; set; }

    /// <summary>
    /// 自动补全, 否则为转数字格式
    /// </summary>
    [Parameter]
    [DisplayName("自动补全, 否则为转数字格式")]
    public bool AutomaticComplement { get; set; }

    /// <summary>
    /// 显示扫描结果
    /// </summary>
    [Parameter]
    [DisplayName("显示扫描结果")]
    public bool AdvertisementReceived { get; set; }

    /// <summary>
    /// 服务UUID / Service UUID
    /// </summary>
    [Parameter]
    [DisplayName("服务UUID / Service UUID")]
    public object? ServiceUuid { get; set; } = "heart_rate";

    /// <summary>
    /// 特征UUID / Characteristic UUID
    /// </summary>
    /// <returns></returns>
    [Parameter]
    [DisplayName("特征UUID / Characteristic UUID")]
    public object? CharacteristicUuid { get; set; } = "heart_rate_measurement";

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (firstRender)
            {
                Device ??= new BluetoothDevice();
                Module = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.Bluetooth/BleNotification.razor.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
                Instance = DotNetObjectReference.Create(this);
            }
        }
        catch (Exception e)
        {
            if (OnUpdateError != null) await OnUpdateError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 获取蓝牙低功耗设备BLE的特征通知
    /// </summary>
    public virtual async Task GetNotification(object? serviceUuid, object? characteristicUuid, bool autoConnect, bool automaticComplement, bool advertisementReceived)
    {
        ServiceUuid = serviceUuid;
        CharacteristicUuid = characteristicUuid;
        AutoConnect = autoConnect;
        AutomaticComplement = automaticComplement;
        AdvertisementReceived = advertisementReceived;
        await GetNotification();
    }

    /// <summary>
    /// 获取蓝牙低功耗设备BLE的特征通知
    /// </summary>
    public virtual async Task GetNotification()
    {
        try
        {
            await Module!.InvokeVoidAsync("notification", Instance, Element, "getNotification", ServiceUuid, CharacteristicUuid, AutoConnect, AutomaticComplement, AdvertisementReceived);
        }
        catch (Exception e)
        {
            if (OnUpdateError != null) await OnUpdateError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 停止监听BLE的特征通知
    /// </summary>
    public virtual async Task StopNotification()
    {
        try
        {
            await Module!.InvokeVoidAsync("notification", Instance, Element, "stopNotification");
        }
        catch (Exception e)
        {
            if (OnUpdateError != null) await OnUpdateError.Invoke(e.Message);
        }
    }

    /// <summary>
    /// 停止监听BLE的特征通知
    /// </summary>
    public virtual async Task Scan()
    {
        try
        {
            await Module!.InvokeVoidAsync("scan", Instance);
        }
        catch (Exception e)
        {
            if (OnUpdateError != null) await OnUpdateError.Invoke(e.Message);
        }
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
    /// 设备名称回调方法
    /// </summary>
    /// <param name="devicename"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task UpdateDevicename(string devicename)
    {
        Device!.Name = devicename;
        if (OnUpdateStatus != null) await OnUpdateStatus.Invoke(Device);
    }

    /// <summary>
    /// 设备特征通知回调方法
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task UpdateValue(string value)
    {
        Device!.ValueRAW = value;
        if (OnUpdateValue != null) await OnUpdateValue.Invoke(value);
    }

    /// <summary>
    /// 状态更新回调方法
    /// </summary>
    /// <param name="status"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task UpdateStatus(string status)
    {
        Device!.Status = status;
        if (OnUpdateStatus != null) await OnUpdateStatus.Invoke(Device);
    }

    /// <summary>
    /// 错误更新回调方法
    /// </summary>
    /// <param name="status"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task UpdateError(string status)
    {
        if (OnUpdateError != null) await OnUpdateError.Invoke(status);
    }

}
