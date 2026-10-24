// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Localization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">手写签名组件</para>
/// <para lang="en">Signature pad component</para>
/// </summary>
public partial class SignaturePad
{
    private const string StylePath = "_content/BootstrapBlazor.SignaturePad/SignaturePad.css";

#if NET9_0_OR_GREATER
    private string StyleUrl => Assets[StylePath];
#else
    private static string StyleUrl => StylePath;
#endif

    /// <summary>
    /// <para lang="zh">手写签名结果回调</para>
    /// <para lang="en">Callback invoked with the signature result</para>
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnResult { get; set; }

    /// <summary>
    /// <para lang="zh">手写签名警告信息回调</para>
    /// <para lang="en">Callback invoked when a signature alert is raised</para>
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnAlert { get; set; }

    /// <summary>
    /// <para lang="zh">手写签名关闭回调</para>
    /// <para lang="en">Callback invoked when the signature pad is closed</para>
    /// </summary>
    [Parameter]
    public Func<Task>? OnClose { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置错误回调</para>
    /// <para lang="en">Gets or sets the error callback</para>
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置签名区域上方的提示文本</para>
    /// <para lang="en">Gets or sets the label displayed above the signing area</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SignAboveLabel { get; set; }
    /// <summary>
    /// <para lang="zh">获得或设置清除按钮文本</para>
    /// <para lang="en">Gets or sets the clear button label</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? ClearBtnTitle { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置尚未签名时显示的提示文本</para>
    /// <para lang="en">Gets or sets the alert text shown when no signature is present</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SignatureAlertText { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置更改颜色按钮文本</para>
    /// <para lang="en">Gets or sets the change color button label</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? ChangeColorBtnTitle { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置撤销按钮文本</para>
    /// <para lang="en">Gets or sets the undo button label</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? UndoBtnTitle { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置关闭按钮文本</para>
    /// <para lang="en">Gets or sets the close button label</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? CloseBtnTitle { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置保存为 Base64 按钮文本</para>
    /// <para lang="en">Gets or sets the save as Base64 button label</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SaveBase64BtnTitle { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置保存为 PNG 按钮文本</para>
    /// <para lang="en">Gets or sets the save as PNG button label</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SavePNGBtnTitle { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置保存为 JPG 按钮文本</para>
    /// <para lang="en">Gets or sets the save as JPG button label</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SaveJPGBtnTitle { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置保存为 SVG 按钮文本</para>
    /// <para lang="en">Gets or sets the save as SVG button label</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public string? SaveSVGBtnTitle { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置是否启用更改颜色按钮</para>
    /// <para lang="en">Gets or sets whether the change color button is enabled</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableChangeColorBtn { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得或设置是否启用撤销按钮</para>
    /// <para lang="en">Gets or sets whether the undo button is enabled</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableUndoBtn { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得或设置是否启用 JavaScript 提示框</para>
    /// <para lang="en">Gets or sets whether JavaScript alerts are enabled</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableAlertJS { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得或设置是否启用保存为 Base64 按钮</para>
    /// <para lang="en">Gets or sets whether the save as Base64 button is enabled</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableSaveBase64Btn { get; set; } = true;

    /// <summary>
    /// <para lang="zh">获得或设置是否启用保存为 PNG 按钮</para>
    /// <para lang="en">Gets or sets whether the save as PNG button is enabled</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableSavePNGBtn { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置是否启用保存为 JPG 按钮</para>
    /// <para lang="en">Gets or sets whether the save as JPG button is enabled</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public bool EnableSaveJPGBtn { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置是否启用保存为 SVG 按钮</para>
    /// <para lang="en">Gets or sets whether the save as SVG button is enabled</para>
    /// </summary>
    [Parameter]
    public bool EnableSaveSVGBtn { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置按钮 CSS 类</para>
    /// <para lang="en">Gets or sets the CSS classes for buttons</para>
    /// </summary>
    [Parameter]
    public string BtnCssClass { get; set; } = "btn btn-light";

    /// <summary>
    /// <para lang="zh">获得或设置保存按钮的 CSS 类</para>
    /// <para lang="en">Gets or sets the CSS classes for save buttons</para>
    /// </summary>
    [Parameter]
    public string BtnSaveCssClass { get; set; } = "btn btn-light";

    /// <summary>
    /// <para lang="zh">获得或设置组件 CSS 类（已过期，请直接使用 class）</para>
    /// <para lang="en">Gets or sets the component CSS class (obsolete; use class instead)</para>
    /// </summary>
    [Parameter]
    [NotNull]
    [Obsolete("已过期，直接使用 class 即可")]
    public string CssClass { get; set; } = "signature-pad-body";

    /// <summary>
    /// <para lang="zh">获得或设置是否启用响应式布局</para>
    /// <para lang="en">Gets or sets whether responsive layout is enabled</para>
    /// </summary>
    [Parameter]
    [NotNull]
    public bool Responsive { get; set; }

    /// <summary>
    /// <para lang="zh">获得或设置签名画布的背景颜色</para>
    /// <para lang="en">Gets or sets the signature canvas background color</para>
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
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, Interop, EnableAlertJS ? SignatureAlertText : null, BackgroundColor, StyleUrl);

    /// <summary>
    /// <para lang="zh">调用签名结果回调</para>
    /// <para lang="en">Invokes the signature result callback</para>
    /// </summary>
    /// <param name="val"></param>
    [JSInvokable]
    public async Task SignatureResult(string? val)
    {
        if (OnResult != null) await OnResult.Invoke(val ?? "");
    }

    /// <summary>
    /// <para lang="zh">调用签名提示回调</para>
    /// <para lang="en">Invokes the signature alert callback</para>
    /// </summary>
    [JSInvokable]
    public async Task SignatureAlert()
    {
        if (OnAlert != null)
        {
            await OnAlert.Invoke(SignatureAlertText);
        }
    }

    /// <summary>
    /// <para lang="zh">调用签名板关闭回调</para>
    /// <para lang="en">Invokes the signature pad close callback</para>
    /// </summary>
    [JSInvokable]
    public async Task Close()
    {
        if (OnClose != null)
        {
            await OnClose.Invoke();
        }
    }
}
