// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Diagnostics.CodeAnalysis;

namespace BootstrapBlazor.Components;

/// <summary>
/// 屏幕键盘 OnScreenKeyboard 组件基类
/// </summary>
public partial class OnScreenKeyboard : IAsyncDisposable
{
    [Inject]
    [NotNull]
    private IJSRuntime? JSRuntime { get; set; }

    private IJSObjectReference? ModuleBase { get; set; }
    private IJSObjectReference? Module { get; set; }

    /// <summary>
    /// 获得/设置 组件class名称
    /// </summary>
    [Parameter]
    public string ClassName { get; set; } = "virtualkeyboard";

    /// <summary>
    /// 获得/设置 键盘语言布局
    /// </summary>
    [Parameter]
    public KeyboardKeysType? KeyboardKeys { get; set; } = KeyboardKeysType.english;

    /// <summary>
    /// 获得/设置 键盘类型
    /// </summary>
    [Parameter]
    public KeyboardType Keyboard { get; set; } = KeyboardType.all;

    /// <summary>
    /// 获得/设置 对齐
    /// </summary>
    [Parameter]
    public KeyboardPlacement Placement { get; set; } = KeyboardPlacement.bottom;

    /// <summary>
    /// 获得/设置 占位符
    /// </summary>
    [Parameter]
    public string Placeholder { get; set; } = "";

    /// <summary>
    /// 获得/设置 显示特殊字符切换按钮
    /// </summary>
    [Parameter]
    public bool Specialcharacters { get; set; } = true;

    /// <summary>
    /// 获得/设置 键盘配置
    /// </summary>
    [Parameter]
    public KeyboardOption? Option { get; set; } = new KeyboardOption();

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        try
        {
            if (firstRender)
            {
                ModuleBase = await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.OnScreenKeyboard/OnScreenKeyboard.razor.js" + "?v=" + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version);
                await ModuleBase.InvokeVoidAsync("addScript", "./_content/BootstrapBlazor.OnScreenKeyboard/lib/kioskboard/kioskboard-aio-2.3.0.min.js");

                Option ??= new KeyboardOption();
                if (KeyboardKeys != null) Option.KeyboardKeysType = KeyboardKeys!.Value;
                try
                {
                    Module = await ModuleBase.InvokeAsync<IJSObjectReference>("init", ClassName, Option);
                }
                catch (Exception)
                {
                    await Task.Delay(200);
                    Module = await ModuleBase.InvokeAsync<IJSObjectReference>("init", ClassName, Option);
                }
            }
        }
        catch (Exception e)
        {
            if (OnError != null) await OnError.Invoke(e.Message);
        }
    }

    async ValueTask IAsyncDisposable.DisposeAsync()
    {
        if (Module != null)
        {
            await Module.DisposeAsync();
        }

        if (ModuleBase is not null)
        {
            await ModuleBase.DisposeAsync();
        }
    }


    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }


}
