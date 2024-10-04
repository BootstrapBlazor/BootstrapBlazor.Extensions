// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Localization;
using Microsoft.JSInterop;

namespace BootstrapBlazor.Components;

/// <summary>
/// SignaturePad 签名
/// </summary>
public partial class SignaturePad
{
    /// <summary>
    /// 手写签名结果回调/SignaturePad result callback method
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnResult { get; set; }

    /// <summary>
    /// 手写签名警告信息回调/SignaturePad alert callback method
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnAlert { get; set; }

    /// <summary>
    /// 手写签名关闭信息回调/SignaturePad close callback method
    /// </summary>
    [Parameter]
    public Func<Task>? OnClose { get; set; }

    /// <summary>
    /// 获得/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// 在框内签名标签文本/Sign above label
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SignAboveLabel { get; set; }
    /// <summary>
    /// 清除按钮文本/Clear button title
    /// </summary>
    [Parameter]
    [NotNull]
    public string? ClearBtnTitle { get; set; }

    /// <summary>
    /// 请先签名提示文本/'Please provide a signature first' alert text
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SignatureAlertText { get; set; }

    /// <summary>
    /// 换颜色按钮文本/Change color button title
    /// </summary>
    [Parameter]
    [NotNull]
    public string? ChangeColorBtnTitle { get; set; }

    /// <summary>
    /// 撤消按钮文本/Undo button title
    /// </summary>
    [Parameter]
    [NotNull]
    public string? UndoBtnTitle { get; set; }

    /// <summary>
    /// 关闭按钮文本/Close button title
    /// </summary>
    [Parameter]
    [NotNull]
    public string? CloseBtnTitle { get; set; }

    /// <summary>
    /// 保存为 base64 按钮文本 Save as Base64 button title
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SaveBase64BtnTitle { get; set; }

    /// <summary>
    /// 保存为PNG按钮文本/Save as PNG button title
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SavePNGBtnTitle { get; set; }

    /// <summary>
    /// 保存为JPG按钮文本/Save as JPG button title
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SaveJPGBtnTitle { get; set; }

    /// <summary>
    /// 保存为SVG按钮文本/Save as SVG button title
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SaveSVGBtnTitle { get; set; }

    /// <summary>
    /// 启用换颜色按钮/Enable change color button
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableChangeColorBtn { get; set; } = true;

    /// <summary>
    /// 启用撤消按钮/Enable undo button
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableUndoBtn { get; set; } = true;

    /// <summary>
    /// 启用JS错误弹窗/Enable Alert from JS
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableAlertJS { get; set; } = true;

    /// <summary>
    /// 启用保存为 base64 按钮 Enable save as Base64 button
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableSaveBase64Btn { get; set; } = true;

    /// <summary>
    /// 启用保存为PNG按钮文本/Enable save as PNG button
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableSavePNGBtn { get; set; }

    /// <summary>
    /// 启用保存为JPG按钮文本/Enable save as JPG button
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableSaveJPGBtn { get; set; }

    /// <summary>
    /// 启用保存为SVG按钮文本/Enable save as SVG button
    /// </summary>
    [Parameter]
    public bool EnableSaveSVGBtn { get; set; }

    /// <summary>
    /// 按钮CSS式样/Button css style
    /// </summary>
    [Parameter]
    public string BtnCssClass { get; set; } = "btn btn-light";

    /// <summary>
    /// 按钮 "保存 "的css样式/Button "Save" css style
    /// </summary>
    [Parameter]
    public string BtnSaveCssClass { get; set; } = "btn btn-light";

    /// <summary>
    /// 组件CSS式样/Components css style
    /// </summary>
    [Parameter]
    [NotNull]
    [Obsolete("已过期，直接使用 class 即可")]
    public string CssClass { get; set; } = "signature-pad-body";

    /// <summary>
    /// 响应式css界面,为所有用户设计最佳体验/Enable Responsive css
    /// </summary>
    [Parameter]
    [NotNull]
    public bool Responsive { get; set; }

    /// <summary>
    /// 组件背景 backgroundColor
    /// </summary>
    [Parameter]
    public string? BackgroundColor { get; set; }

    [Inject]
    [NotNull]
    private IStringLocalizer<SignaturePad>? Localizer { get; set; }

    private string? ClassString => CssBuilder.Default("signature-pad")
        .AddClass("signature-pad-body-responsive", Responsive)
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnParametersSet()
    {
        base.OnParametersSet();

        SignAboveLabel ??= Localizer[nameof(SignAboveLabel)];
        ClearBtnTitle ??= Localizer[nameof(ClearBtnTitle)];
        SignatureAlertText ??= Localizer[nameof(SignatureAlertText)];
        ChangeColorBtnTitle ??= Localizer[nameof(ChangeColorBtnTitle)];
        UndoBtnTitle ??= Localizer[nameof(UndoBtnTitle)];
        CloseBtnTitle ??= Localizer[nameof(CloseBtnTitle)];
        SaveBase64BtnTitle ??= Localizer[nameof(SaveBase64BtnTitle)];
        SavePNGBtnTitle ??= Localizer[nameof(SavePNGBtnTitle)];
        SaveJPGBtnTitle ??= Localizer[nameof(SaveJPGBtnTitle)];
        SaveSVGBtnTitle ??= Localizer[nameof(SaveSVGBtnTitle)];
        BackgroundColor ??= "rgb(255, 255, 255)";
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, EnableAlertJS ? SignatureAlertText : null, BackgroundColor);

    /// <summary>
    /// 签名完成回调方法
    /// </summary>
    /// <param name="val"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task SignatureResult(string? val)
    {
        if (OnResult != null) await OnResult.Invoke(val ?? "");
    }

    /// <summary>
    /// 告警回调方法
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task SignatureAlert()
    {
        if (OnAlert != null)
        {
            await OnAlert.Invoke(SignatureAlertText);
        }
    }

    /// <summary>
    /// 关闭回调方法
    /// </summary>
    /// <returns></returns>
    [JSInvokable]
    public async Task Close()
    {
        if (OnClose != null)
        {
            await OnClose.Invoke();
        }
    }
}
