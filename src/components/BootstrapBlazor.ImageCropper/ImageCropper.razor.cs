// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BootstrapBlazor.Components;

/// <summary>
/// 视频播放器 ImageCropper 组件
/// </summary>
public partial class ImageCropper
{
    /// <summary>
    /// 获得/设置 图片地址 URL
    /// </summary>
    [Parameter]
    public string? Url { get; set; }

    /// <summary>
    /// 获取/设置 是否被禁用 默认 false
    /// </summary>
    [Parameter]
    public bool IsDisabled { get; set; }

    /// <summary>
    /// 获得/设置 剪裁结果回调方法
    /// </summary>
    [Parameter]
    public Func<ImageCropperResult, Task>? OnCropAsync { get; set; }

    /// <summary>
    /// 获得/设置 剪裁框调整大小位置回调方法
    /// </summary>
    [Parameter]
    public Func<ImageCropperData, Task>? OnCropChangedAsync { get; set; }

    /// <summary>
    /// 获取/设置 裁剪选项
    /// </summary>
    [Parameter]
    public ImageCropperOption? Options { get; set; }

    /// <summary>
    /// 获取/设置 裁剪形状（矩形/圆形）默认 <see cref="ImageCropperShape.Rectangle"/>
    /// </summary>
    [Parameter]
    [Obsolete("已弃用，使用 ImageCropperOption.IsRound 参数代替；Deprecated, use ImageCropperOption.IsRound parameter instead")]
    public ImageCropperShape CropperShape { get; set; }

    private string? ClassString => CssBuilder.Default("bb-cropper")
        .AddClass("is-round", Options?.IsRound ?? false)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private bool _isDisabled;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    /// <returns></returns>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            _isDisabled = IsDisabled;
        }

        if (_isDisabled != IsDisabled)
        {
            _isDisabled = IsDisabled;
            if (IsDisabled)
            {
                await Disable();
            }
            else
            {
                await Enable();
            }
        }
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, new
    {
        Options = Options ?? new(),
        TriggerOnCropEndAsync = OnCropChangedAsync != null ? nameof(TriggerOnCropChangedAsync) : null,
    });

    /// <summary>
    /// 剪裁方法 触发 <see cref="OnCropAsync"/> 回调方法
    /// </summary>
    public async Task<string?> Crop()
    {
        var result = await InvokeAsync<string?>("crop", Id);
        if (!string.IsNullOrEmpty(result))
        {
            if (OnCropAsync != null)
            {
                await OnCropAsync(new ImageCropperResult(result));
            }
        }
        return result;
    }

    /// <summary>
    /// 替换图片方法
    /// </summary>
    /// <param name="url"></param>
    /// <returns></returns>
    public Task Replace(string url) => InvokeVoidAsync("replace", Id, url);

    /// <summary>
    /// 重置图片方法
    /// </summary>
    /// <returns></returns>
    public Task Reset() => InvokeVoidAsync("reset", Id);

    /// <summary>
    /// 更改拖动模式 可以通过双击裁剪器来切换“裁剪”和“移动”模式, 参数为可选 : 'none'，'crop'，'move'
    /// </summary>
    /// <param name="mode"></param>
    /// <returns></returns>
    public Task SetDragMode(string? mode) => InvokeVoidAsync("setDragMode", Id, mode);

    /// <summary>
    /// 组件可用
    /// </summary>
    /// <returns></returns>
    public Task Enable()
    {
        IsDisabled = false;
        _isDisabled = false;
        return InvokeVoidAsync("enable", Id);
    }

    /// <summary>
    /// 禁用组件
    /// </summary>
    /// <returns></returns>
    public Task Disable()
    {
        IsDisabled = true;
        _isDisabled = true;
        return InvokeVoidAsync("disable", Id);
    }

    /// <summary>
    /// 清空图像
    /// </summary>
    /// <returns></returns>
    public Task Clear() => InvokeVoidAsync("clear", Id);

    /// <summary>
    /// 旋转图片方法
    /// </summary>
    /// <param name="angle">旋转角度</param>
    /// <returns></returns>
    public async Task Rotate(int angle) => await InvokeVoidAsync("rotate", Id, angle);

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task TriggerOnCropChangedAsync(ImageCropperData data)
    {
        if (OnCropChangedAsync != null)
        {
            await OnCropChangedAsync(data);
        }
    }
}
