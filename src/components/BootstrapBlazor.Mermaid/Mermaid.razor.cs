// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.Text;

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
    public MermaidDirection? Direction { get; set; } = MermaidDirection.TB;

    /// <summary>
    /// 获取/设置 图类型
    /// </summary>
    [Parameter]
    public MermaidType Type { set; get; }

    /// <summary>
    /// 设置 Mermaid 字串
    /// </summary>
    [Parameter]
    [EditorRequired]
    public string? DiagramString { get; set; }

    /// <summary>
    /// 获取/设置 图标题 如果图类型是甘特图，饼图时和序列图时，可指定其 title 默认 null 未设置
    /// </summary>
    [Parameter]
    public string? Title { set; get; }

    private string? ClassString => CssBuilder.Default("bb-mermaid mermaid")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// 构造 Mermaid 代码
    /// </summary>
    /// <returns></returns>
    private string BuildDiagramText()
    {
        StringBuilder sb = new();
        if (Type != MermaidType.None)
        {
            sb.Append(Type.ToDescriptionString());
            if (Type == MermaidType.Flowchart)
            {
                sb.Append($" {Direction}\n");
            }
            else if (Type == MermaidType.StateDiagram)
            {
                sb.Append($"\ndirection {Direction}\n");

            }
            else
            {
                sb.Append('\n');
            }
            if (!string.IsNullOrEmpty(Title) && (Type == MermaidType.Gantt || Type == MermaidType.Pie || Type == MermaidType.SequenceDiagram))
            {
                sb.Append($"\ntitle {Title}\n");
            }
        }
        sb.Append(DiagramString);
        return sb.ToString();
    }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    /// <returns></returns>
    protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id, BuildDiagramText());

    /// <summary>
    /// 导出图为 base64 字符串
    /// </summary>
    /// <returns>base64 string of the diagram</returns>
    public Task<string?> ExportBase64MermaidAsync() => InvokeAsync<string>("getContent", Id);

    /// <summary>
    /// 内容改变时重新渲染mermaid
    /// </summary>
    /// <returns></returns>
    public Task MermaidChanged() => InvokeVoidAsync("init", Id, BuildDiagramText());
}
