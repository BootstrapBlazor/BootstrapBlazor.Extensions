// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;
using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">DockView 组件基类</para>
/// <para lang="en">Base class for DockView components</para>
/// </summary>
public abstract class DockViewComponentBase : IdComponentBase, IDisposable
{
    /// <summary>
    /// <para lang="zh">获得/设置 组件渲染类型，默认为 Component</para>
    /// <para lang="en">Gets or sets the component render type. Default is Component</para>
    /// </summary>
    [Parameter]
    public DockViewContentType Type { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件宽度百分比，默认为 null</para>
    /// <para lang="en">Gets or sets the component width percentage. Default is null</para>
    /// </summary>
    [Parameter]
    public int? Width { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 组件高度百分比，默认为 null</para>
    /// <para lang="en">Gets or sets the component height percentage. Default is null</para>
    /// </summary>
    [Parameter]
    public int? Height { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 子组件内容</para>
    /// <para lang="en">Gets or sets the child content</para>
    /// </summary>
    [Parameter]
    [JsonIgnore]
    public RenderFragment? ChildContent { get; set; }

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
    /// <para lang="zh">资源释放方法</para>
    /// <para lang="en">Releases resources</para>
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
    /// <para lang="zh">资源释放方法</para>
    /// <para lang="en">Releases resources</para>
    /// </summary>
    public void Dispose()
    {
        Dispose(disposing: true);
        GC.SuppressFinalize(this);
    }
}
