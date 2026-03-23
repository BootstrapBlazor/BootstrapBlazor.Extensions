// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockComponent 基类</para>
/// <para lang="en">Base class for DockComponent</para>
/// </summary>
public abstract class DockViewComponentBase : IdComponentBase, IDisposable
{
    /// <summary>
    /// <para lang="zh">获得/设置 渲染类型 默认 Component</para>
    /// <para lang="en">Gets or sets the render type. Default is Component.</para>
    /// </summary>
    [Parameter]
    public DockViewContentType Type { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件宽度百分比 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the component width percentage. Default is null (not set).</para>
    /// </summary>
    [Parameter]
    public int? Width { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件高度百分比 默认 null 未设置</para>
    /// <para lang="en">Gets or sets the component height percentage. Default is null (not set).</para>
    /// </summary>
    [Parameter]
    public int? Height { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 子组件</para>
    /// <para lang="en">Gets or sets the child content.</para>
    /// </summary>
    [Parameter]
    [JsonIgnore]
    public RenderFragment? ChildContent { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 DockContent 实例</para>
    /// <para lang="en">Gets or sets the DockContent instance.</para>
    /// </summary>
    [CascadingParameter]
    private List<DockViewComponentBase>? Parent { get; set; }

    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();

        Parent?.Add(this);
    }

    /// <summary>
    /// <para lang="zh">资源销毁方法</para>
    /// <para lang="en">Resource disposal method</para>
    /// </summary>
    /// <param name="disposing"></param>
    protected virtual void Dispose(bool disposing)
    {
        if (disposing)
        {
            Parent?.Remove(this);
        }
    }

    /// <summary>
    /// <para lang="zh">资源销毁方法</para>
    /// <para lang="en">Resource disposal method</para>
    /// </summary>
    public void Dispose()
    {
        Dispose(disposing: true);
        GC.SuppressFinalize(this);
    }
}
