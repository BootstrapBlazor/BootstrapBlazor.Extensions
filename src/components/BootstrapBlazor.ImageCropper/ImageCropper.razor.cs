// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

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
    /// 获得/设置 剪裁结果回调方法
    /// </summary>
    [Parameter]
    public Func<ImageCropperResult, Task>? OnCropAsync { get; set; }

    /// <summary>
    /// 获取/设置 裁剪选项
    /// </summary>
    [Parameter]
    public ImageCropperOption? Options { get; set; }

    /// <summary>
    /// 获取/设置 裁剪形状（矩形/圆形）默认 <see cref="ImageCropperShape.Rectangle"/>
    /// </summary>
    [Parameter]
    public ImageCropperShape CropperShape { get; set; }

    private string? ClassString => CssBuilder.Default("bb-cropper")
        .AddClass("is-round", CropperShape == ImageCropperShape.Round)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, Options);

    /// <summary>
    /// 剪裁方法 返回 base64 字符串
    /// </summary>
    /// <returns>base64</returns>
    public async Task<string?> Crop()
    {
        var result = await InvokeAsync<string?>(Id, "crop");
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
    /// 替换图片
    /// </summary>
    /// <param name="url"></param>
    /// <returns></returns>
    public async Task Replace(string url) => await Module!.InvokeVoidAsync("replace", url);

    /// <summary>
    /// 使用新数据更改裁剪区域的位置和大小（基于原始图像）,注意：此方法仅在选项值viewMode大于或等于时可用1
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    public async Task SetData(object data) => await Module!.InvokeVoidAsync("setData", data);

    /// <summary>
    /// 更改拖动模式,可以通过双击裁剪器来切换“裁剪”和“移动”模式, 参数为可选 : 'none'，'crop'，'move'
    /// </summary>
    /// <param name="data"></param>
    /// <returns></returns>
    public async Task SetDragMode(string? mode) => await Module!.InvokeVoidAsync("setDragMode", mode);

    /// <summary>
    /// 组件可用
    /// </summary>
    /// <returns></returns>
    public async Task Enable() => await Module!.InvokeVoidAsync("enable");

    /// <summary>
    /// 禁用组件
    /// </summary>
    /// <returns></returns>
    public async Task Disable() => await Module!.InvokeVoidAsync("disable");

    /// <summary>
    /// 复位图像
    /// </summary>
    /// <returns></returns>
    public async Task Reset() => await Module!.InvokeVoidAsync("reset");

    /// <summary>
    /// 清空图像
    /// </summary>
    /// <returns></returns>
    public async Task Clear() => await Module!.InvokeVoidAsync("clear");

    /// <summary>
    /// 销毁
    /// </summary>
    /// <returns></returns>
    public async Task Destroy() => await Module!.InvokeVoidAsync("destroy");

    /// <summary>
    /// 旋转图片方法
    /// </summary>
    /// <param name="angle">旋转角度</param>
    /// <returns></returns>
    public async Task Rotate(int angle) => await InvokeVoidAsync(Id, "rotate", angle);
}
