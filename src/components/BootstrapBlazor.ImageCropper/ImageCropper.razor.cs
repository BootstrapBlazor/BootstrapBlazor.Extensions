// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BootstrapBlazor.Components;

/// <summary>
/// 图片裁剪 ImageCropper 组件
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
        .AddClass("disabled", IsDisabled)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    private bool _isDisabled;

    private string? _url;

    private bool _initialized;

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <param name="firstRender"></param>
    /// <returns></returns>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (_initialized && _url != Url)
        {
            _url = Url;
            if (!string.IsNullOrWhiteSpace(Url))
            {
                await InvokeVoidAsync("replace", Id, Url, true);
            }
            else
            {
                await InvokeVoidAsync("removeImage", Id);
            }
        }

        if (_initialized && _isDisabled != IsDisabled)
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
    protected override async Task InvokeInitAsync()
    {
        var options = Options ?? new();
        var url = Url;
        var isDisabled = IsDisabled;
        options.Validate();
        await InvokeVoidAsync("init", Id, Interop, new
        {
            Options = options,
            IsDisabled = isDisabled,
            TriggerOnCropEndAsync = OnCropChangedAsync != null ? nameof(TriggerOnCropChangedAsync) : null,
        });
        _url = url;
        _isDisabled = isDisabled;
        _initialized = true;
    }

    /// <summary>
    /// 剪裁方法 触发 <see cref="OnCropAsync"/> 回调方法
    /// </summary>
    public Task<string?> Crop() => Crop(null);

    /// <summary>
    /// 按指定尺寸和格式裁剪图片并触发 <see cref="OnCropAsync"/> 回调
    /// </summary>
    /// <param name="options">导出选项，为 null 时使用 PNG 格式和原始图片像素尺寸</param>
    /// <returns>裁剪结果的 Data URL</returns>
    public async Task<string?> Crop(ImageCropperExportOptions? options)
    {
        options?.Validate();
        var result = await InvokeAsync<string?>("crop", Id, options);
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
    public Task Replace(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
        {
            throw new ArgumentException("An image URL is required.", nameof(url));
        }
        return InvokeVoidAsync("replace", Id, url);
    }

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
    /// 缩放图片，正数放大，负数缩小，例如 0.1 表示放大 10%
    /// </summary>
    /// <param name="ratio">缩放比例</param>
    public Task Zoom(double ratio)
    {
        if (!double.IsFinite(ratio))
        {
            throw new ArgumentOutOfRangeException(nameof(ratio));
        }
        return InvokeVoidAsync("zoom", Id, ratio);
    }

    /// <summary>
    /// 水平翻转图片
    /// </summary>
    public Task FlipHorizontal() => InvokeVoidAsync("flip", Id, true);

    /// <summary>
    /// 垂直翻转图片
    /// </summary>
    public Task FlipVertical() => InvokeVoidAsync("flip", Id, false);

    /// <summary>
    /// 移动图片，单位为画布像素
    /// </summary>
    /// <param name="x">水平方向偏移量</param>
    /// <param name="y">垂直方向偏移量</param>
    public Task Move(double x, double y)
    {
        if (!double.IsFinite(x))
        {
            throw new ArgumentOutOfRangeException(nameof(x));
        }
        if (!double.IsFinite(y))
        {
            throw new ArgumentOutOfRangeException(nameof(y));
        }
        return InvokeVoidAsync("move", Id, x, y);
    }

    /// <summary>
    /// 设置裁剪比例，为 null 时使用自由比例；圆形裁剪始终使用 1:1
    /// </summary>
    /// <param name="aspectRatio">裁剪比例，必须大于零</param>
    public Task SetAspectRatio(double? aspectRatio)
    {
        if (aspectRatio.HasValue && (!double.IsFinite(aspectRatio.Value) || aspectRatio.Value <= 0))
        {
            throw new ArgumentOutOfRangeException(nameof(aspectRatio));
        }
        return InvokeVoidAsync("setAspectRatio", Id, aspectRatio);
    }

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
