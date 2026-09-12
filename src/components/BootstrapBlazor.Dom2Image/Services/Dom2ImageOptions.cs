// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// <para lang="zh">Dom2Image 本地字体描述类</para>
/// <para lang="en">Dom2Image local font descriptor class</para>
/// </summary>
public class Dom2ImageLocalFont
{
    /// <summary>
    /// <para lang="zh">获得/设置 字体族名称</para>
    /// <para lang="en">Gets or sets the font family name</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Family { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 字体来源 URL 或 data: URL</para>
    /// <para lang="en">Gets or sets the font source URL or data: URL</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Src { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 字体粗细，如 "bold"、"400"</para>
    /// <para lang="en">Gets or sets the font weight, such as "bold" or "400"</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Weight { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 字体样式，如 "italic"</para>
    /// <para lang="en">Gets or sets the font style, such as "italic"</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Style { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 font-stretch 百分比，如 100</para>
    /// <para lang="en">Gets or sets the font-stretch percentage, such as 100</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? StretchPct { get; set; }
}

/// <summary>
/// <para lang="zh">Dom2Image 排除字体配置类</para>
/// <para lang="en">Dom2Image exclude fonts configuration class</para>
/// </summary>
public class Dom2ImageExcludeFonts
{
    /// <summary>
    /// <para lang="zh">获得/设置 要跳过的字体族名称列表（不区分大小写）</para>
    /// <para lang="en">Gets or sets the font family names to skip (case-insensitive)</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[]? Families { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 要跳过的字体来源域名子串，如 "fonts.gstatic.com"</para>
    /// <para lang="en">Gets or sets the font source domain substrings to skip, such as "fonts.gstatic.com"</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[]? Domains { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 要跳过的 Unicode 范围子集标签，如 "cyrillic-ext"</para>
    /// <para lang="en">Gets or sets the Unicode range subset labels to skip, such as "cyrillic-ext"</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[]? Subsets { get; set; }
}

/// <summary>
/// <para lang="zh">Dom2Image 选项配置类</para>
/// <para lang="en">Dom2Image options configuration class</para>
/// </summary>
public class Dom2ImageOptions
{
    /// <summary>
    /// <para lang="zh">获得/设置 将内联的光栅图像降采样到其可视分辨率（display box × scale × dpr），默认值 true</para>
    /// <para lang="en">Gets or sets whether to downsample inline raster images to their visual resolution (display box × scale × dpr), default is true</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Compress { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 跳过空闲延迟以加快捕获速度，默认值 true</para>
    /// <para lang="en">Gets or sets whether to skip idle delays to speed up capture, default is true</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Fast { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 内联实际使用的非图标字体（@font-face），默认值 false</para>
    /// <para lang="en">Gets or sets whether to inline actually used non-icon fonts (@font-face), default is false</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? EmbedFonts { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 输出缩放倍数，优先级高于 Width/Height，默认值 1</para>
    /// <para lang="en">Gets or sets the output scale multiplier, takes precedence over Width/Height, default is 1</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Scale { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 设备像素比，默认使用浏览器 devicePixelRatio</para>
    /// <para lang="en">Gets or sets the device pixel ratio, defaults to browser devicePixelRatio</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Dpr { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 指定输出宽度，仅设置一个维度时保持宽高比</para>
    /// <para lang="en">Gets or sets the specified output width, maintains aspect ratio when only one dimension is set</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Width { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 指定输出高度，仅设置一个维度时保持宽高比</para>
    /// <para lang="en">Gets or sets the specified output height, maintains aspect ratio when only one dimension is set</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Height { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 背景填充色，JPEG/WebP 默认 #ffffff，其他格式默认透明</para>
    /// <para lang="en">Gets or sets the background fill color, JPEG/WebP defaults to #ffffff, other formats default to transparent</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? BackgroundColor { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 JPEG/WebP 质量（0 到 1），默认值 0.92</para>
    /// <para lang="en">Gets or sets the JPEG/WebP quality (0 to 1), default is 0.92</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public float? Quality { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 toBlob() 默认 Blob 类型：svg、png、jpg、jpeg、webp，默认值 svg</para>
    /// <para lang="en">Gets or sets the default Blob type for toBlob(): svg, png, jpg, jpeg, webp, default is svg</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Type { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 捕获/导出的输出格式：png、jpg、jpeg、webp、svg，默认值 png</para>
    /// <para lang="en">Gets or sets the output format for capture/export: png, jpg, jpeg, webp, svg, default is png</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Format { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 download() 的默认文件名（不含扩展名），默认值 snapDOM</para>
    /// <para lang="en">Gets or sets the default filename for download() (without extension), default is snapDOM</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Filename { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 从捕获中排除的 CSS 选择器列表</para>
    /// <para lang="en">Gets or sets the list of CSS selectors to exclude from capture</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[]? Exclude { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 exclude 的处理方式："hide"（保持布局，使用 visibility:hidden）或 "remove"（移除节点），默认值 "hide"</para>
    /// <para lang="en">Gets or sets the exclude processing mode: "hide" (keep layout, use visibility:hidden) or "remove" (remove node), default is "hide"</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ExcludeMode { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 显式提供本地字体列表，避免远程字体发现</para>
    /// <para lang="en">Gets or sets the explicitly provided local font list to avoid remote font discovery</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dom2ImageLocalFont[]? LocalFonts { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 图标字体族名称列表（始终内联，不受 EmbedFonts 影响）</para>
    /// <para lang="en">Gets or sets the icon font family name list (always inlined, not affected by EmbedFonts)</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[]? IconFonts { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 排除特定非图标字体（按族名/域名/子集）</para>
    /// <para lang="en">Gets or sets the specific non-icon fonts to exclude (by family/domain/subset)</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dom2ImageExcludeFonts? ExcludeFonts { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 允许跨域字体样式表获取的额外域名列表，如自托管 CDN</para>
    /// <para lang="en">Gets or sets the additional domain list for cross-origin font stylesheet fetching, such as self-hosted CDN</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[]? FontStylesheetDomains { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 跨域图片/资源代理前缀，用于处理 CORS 被拒绝的外部资源</para>
    /// <para lang="en">Gets or sets the cross-origin image/resource proxy prefix for handling CORS-rejected external resources</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? UseProxy { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 img 加载失败时的回退图片 URL</para>
    /// <para lang="en">Gets or sets the fallback image URL when img loading fails</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FallbackURL { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 资源和样式映射的缓存策略："soft"、"auto"、"full"、"disabled"，默认值 "soft"</para>
    /// <para lang="en">Gets or sets the cache strategy for resource and style mapping: "soft", "auto", "full", "disabled", default is "soft"</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Cache { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 布局协调：将克隆挂载到文档中，对比实际 DOM 修正尺寸偏差。代价是额外一次布局，默认值 false</para>
    /// <para lang="en">Gets or sets layout reconciliation: mount clone to document, compare with actual DOM to correct size deviation. Cost is one extra layout, default is false</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Reconcile { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 对相同元素的重复捕获进行记忆化，DOM 未变化时跳过整个管道，默认值 false</para>
    /// <para lang="en">Gets or sets whether to memoize repeated captures of the same element, skip entire pipeline when DOM is unchanged, default is false</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Burst { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 配合 Burst 使用，强制重新捕获（用于 canvas 绘制、CSSOM 编辑等 MutationObserver 无法感知的变更），默认值 false</para>
    /// <para lang="en">Gets or sets whether to force recapture when used with Burst (for canvas drawing, CSSOM edits, etc. that MutationObserver cannot detect), default is false</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Invalidate { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 在输出中保留根元素的 translate/rotate 变换，默认值 true</para>
    /// <para lang="en">Gets or sets whether to preserve root element's translate/rotate transforms in output, default is true</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? OuterTransforms { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 扩展根元素边界以包含阴影/模糊/描边，默认值 false</para>
    /// <para lang="en">Gets or sets whether to extend root element boundary to include shadows/blur/stroke, default is false</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? OuterShadows { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 资源缺失时显示占位符，默认值 true</para>
    /// <para lang="en">Gets or sets whether to show placeholders when resources are missing, default is true</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Placeholders { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 捕获前解析懒加载 picture/data-src 占位符，默认值 true</para>
    /// <para lang="en">Gets or sets whether to resolve lazy-load picture/data-src placeholders before capture, default is true</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? ResolvePicturePlaceholders { get; set; }

    /// <summary>
    /// <para lang="zh">获得/设置 启用详细诊断输出（console.warn），默认值 false</para>
    /// <para lang="en">Gets or sets whether to enable verbose diagnostic output (console.warn), default is false</para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Debug { get; set; }
}
