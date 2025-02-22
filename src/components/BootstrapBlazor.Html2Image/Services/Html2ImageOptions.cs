// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the Apache 2.0 License
// See the LICENSE file in the project root for more information.
// Maintainer: Argo Zhang(argo@live.ca) Website: https://www.blazor.zone

using System.Text.Json.Serialization;

namespace BootstrapBlazor.Components;

/// <summary>
/// Html2Image 选项类
/// </summary>
public class Html2ImageOptions : IHtml2ImageOptions
{
    /// <summary>
    /// Width in pixels to be applied to node before rendering.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Width { get; set; }

    /// <summary>
    /// Height in pixels to be applied to node before rendering.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Height { get; set; }

    /// <summary>
    /// A string value for the background color, any valid CSS color value.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? BackgroundColor { get; set; }

    /// <summary>
    /// Width in pixels to be applied to canvas on export.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? CanvasWidth { get; set; }

    /// <summary>
    /// Height in pixels to be applied to canvas on export.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? CanvasHeight { get; set; }

    /// <summary>
    /// An array of style properties to be copied to node's style before rendering.
    /// For performance-critical scenarios, users may want to specify only the required properties instead of all styles.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[]? IncludeStyleProperties { get; set; }

    /// <summary>
    /// A number between `0` and `1` indicating image quality (e.g. 0.92 => 92%)
    /// of the JPEG image.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? Quality { get; set; }

    /// <summary>
    /// The pixel ratio of captured image. Default is the actual pixel ratio of
    /// the device. Set 1 to use as initial-scale 1 for the image
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? PixelRatio { get; set; }

    /// <summary>
    /// A string indicating the image format. The default type is image/png; that type is also used if the given type isn't supported.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Type { get; set; }

    /// <summary>
    /// An object whose properties to be copied to node's style before rendering.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, string>? Style { get; set; }

    /// <summary>
    /// Set to `true` to append the current time as a query string to URL
    /// requests to enable cache busting.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? CacheBust { get; set; }

    /// <summary>
    /// Set false to use all URL as cache key.
    /// Default: false | undefined - which strips away the query parameters
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? IncludeQueryParams { get; set; }

    /// <summary>
    /// A data URL for a placeholder image that will be used when fetching
    /// an image fails. Defaults to an empty string and will render empty
    /// areas for failed images.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ImagePlaceholder { get; set; }

    /// <summary>
    /// Option to skip the fonts download and embed.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? SkipFonts { get; set; }

    /// <summary>
    /// The preferred font format. If specified all other font formats are ignored.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? PreferredFontFormat { get; set; }

    /// <summary>
    /// A CSS string to specify for font embeds. If specified only this CSS will
    /// be present in the resulting image. Use with `getFontEmbedCSS()` to
    /// create embed CSS for use across multiple calls to library functions.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? FontEmbedCSS { get; set; }

    /// <summary>
    /// A boolean to turn off auto scaling for truly massive images.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? SkipAutoScale { get; set; }

    /// <summary>
    /// 执行方法名称 ToPng ToJpeg ToSvg ToCanvas
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? MethodName { get; set; }
}
