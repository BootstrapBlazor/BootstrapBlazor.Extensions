// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// 屏幕键盘 OnScreenKeyboard 组件基类
/// </summary>
public partial class OnScreenKeyboard
{
    /// <summary>
    /// 获得/设置 组件 class 名称
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

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override async Task InvokeInitAsync()
    {
        Option ??= new KeyboardOption();
        if (KeyboardKeys != null)
        {
            Option.KeyboardKeysType = KeyboardKeys.Value;
        }
        await InvokeVoidAsync("init", ClassName, Option);
    }
}
