// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// Mermaid 组件
/// </summary>
public partial class Mermaid
{
    /// <summary>
    /// 获取/设置 图方向
    /// </summary>
    [Parameter]
    public MermaidDirection? Direction { get; set; } = MermaidDirection.TD;

    /// <summary>
    /// 获取/设置 mermaid 图内容
    /// </summary>
    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    /// <summary>
    /// 获取/设置 错误回调方法
    /// </summary>
    [Parameter]
    public Func<string, Task>? OnError { get; set; }

    /// <summary>
    /// 获取/设置 自定义样式
    /// </summary>
    [Parameter]
    public string? Style { get; set; }

    /// <summary>
    /// 获取/设置 图类型
    /// </summary>
    [Parameter]
    public MermaidType Type { set; get; }

    /// <summary>
    /// 获取/设置 图标题 如果图类型是甘特图，饼图时和序列图时，可指定其 title 默认 null 未设置
    /// </summary>
    [Parameter]
    public string? MermaidTitle { set; get; }

    private string? ClassString => CssBuilder.Default("bb-mermaid")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id);

    /// <summary>
    /// 导出图为 base64 字符串
    /// </summary>
    /// <returns>base64 string of the diagram</returns>
    public Task<string?> ExportBase64MermaidAsync() => InvokeAsync<string?>("getContent", Id);
}
