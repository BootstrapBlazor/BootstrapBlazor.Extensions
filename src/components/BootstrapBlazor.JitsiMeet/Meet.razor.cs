using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// Meet 组件用于显示会议室
/// </summary>
public partial class Meet
{
    /// <summary>
    /// 获得/设置 服务器地址
    /// </summary>
    [Parameter]
    [EditorRequired]
    public string? Domain { get; set; }

    /// <summary>
    /// 获得/设置 会议信息
    /// </summary>
    [EditorRequired]
    [Parameter]
    public MeetOption? Option { get; set; }

    /// <summary>
    /// 获得/设置 会议室初始化完成事件
    /// </summary>
    [Parameter]
    public Action? OnLoad { get; set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override async Task InvokeInitAsync()
    {
        await InvokeVoidAsync("init", Id, Interop, Domain, Option);
    }

    /// <summary>
    /// 执行命令
    /// </summary>
    /// <param name="command"></param>
    /// <param name="args"></param>
    /// <returns></returns>
    public Task ExecuteCommand(string command, object? args = null)
    {
        return InvokeVoidAsync("executeCommand", Id, command, args);
    }

    /// <summary>
    /// 会议室加载完成回调
    /// </summary>
    [JSInvokable]
    public void OnLoadCallBack()
    {
        OnLoad?.Invoke();
    }
}

