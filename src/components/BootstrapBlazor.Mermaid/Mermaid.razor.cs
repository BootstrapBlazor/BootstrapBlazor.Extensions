// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
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
    /// 设置Mermaid字串
    /// </summary>
    [Parameter]
    [Required]
    public string? DiagramString { get; set; }

    /// <summary>
    /// 获取/设置 图标题 如果图类型是甘特图，饼图时和序列图时，可指定其 title 默认 null 未设置
    /// </summary>
    [Parameter]
    public string? MermaidTitle { set; get; }

    private string? ClassString => CssBuilder.Default("bb-mermaid mermaid")
        .AddClassFromAttributes(AdditionalAttributes)
        .Build();

    /// <summary>
    /// 构造Mermaid代码
    /// </summary>
    /// <returns></returns>
    private string BuildDiagramText()
    {
        StringBuilder sb = new();
        if(Type != MermaidType.None)
        {
            sb.Append(Type.ToDescriptionString());
            if(Type == MermaidType.Flowchart)
            {
                sb.Append(" " + Direction + "\n");
            }
            else if (Type == MermaidType.StateDiagram)
            {
                sb.Append("\ndirection " + Direction + "\n");

            }
            else
            {
                sb.Append('\n');
            }
            if(!string.IsNullOrEmpty(MermaidTitle) &&
                    (Type == MermaidType.Gantt
                    || Type == MermaidType.Pie
                    || Type == MermaidType.SequenceDiagram
                    ))

            {
                sb.Append("\ntitle " + MermaidTitle + "\n");
            }
        }
        sb.Append(DiagramString);
        return sb.ToString();
    }


    /// <summary>
    /// MermaidHelper.js实例
    /// </summary>
    private new IJSObjectReference? Module {  get; set; }

    /// <summary>
    /// svg图
    /// </summary>
    private MarkupString? DiagramHTML { get; set; }

    /// <summary>
    /// 渲染Mermaid
    /// </summary>
    /// <returns></returns>
    protected override async Task OnParametersSetAsync()
    {
        Module ??= await JSRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/BootstrapBlazor.Mermaid/js/MermaidHelper.js");
        string innerHTML = await Module.InvokeAsync<string>("render", Id, BuildDiagramText());
        DiagramHTML = new MarkupString(innerHTML);
    }

    /// <summary>
    /// 导出图为 base64 字符串
    /// </summary>
    /// <returns>base64 string of the diagram</returns>
    public async Task<string> ExportBase64MermaidAsync()
    {
        return await Module!.InvokeAsync<string>("getContent", Id);
    }
}
