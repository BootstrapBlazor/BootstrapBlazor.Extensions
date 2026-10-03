# ImageCropper

`BootstrapBlazor.ImageCropper` bundles [Cropper.js 2.2.0](https://github.com/fengyuanchen/cropperjs/releases/tag/v2.2.0).
No CDN scripts or Cropper.js stylesheet are required. The component loads its local JavaScript and styles automatically.

## Example

```razor
<ImageCropper @ref="_cropper" Url="@_url" Options="@_options"
             OnCropAsync="@OnCropAsync" OnCropChangedAsync="@OnCropChangedAsync" />
<div class="bb-cropper-preview bb-cropper-preview-lg"></div>
<p>Selection: @_data.Width.ToString("F0") x @_data.Height.ToString("F0")</p>
<Button Text="Crop" OnClick="@(() => _cropper!.Crop())" />
<Button Text="Zoom in" OnClick="@(() => _cropper!.Zoom(0.1))" />
<Button Text="Zoom out" OnClick="@(() => _cropper!.Zoom(-0.1))" />
<Button Text="Rotate" OnClick="@(() => _cropper!.Rotate(90))" />
<Button Text="Flip horizontally" OnClick="@(() => _cropper!.FlipHorizontal())" />
<Button Text="Flip vertically" OnClick="@(() => _cropper!.FlipVertical())" />
<Button Text="Square" OnClick="@(() => _cropper!.SetAspectRatio(1))" />
<Button Text="16:9" OnClick="@(() => _cropper!.SetAspectRatio(16.0 / 9))" />
<Button Text="Free ratio" OnClick="@(() => _cropper!.SetAspectRatio(null))" />
<Button Text="Reset" OnClick="@(() => _cropper!.Reset())" />
<Button Text="Export JPEG" OnClick="@ExportAsync" />
@if (_result != null)
{
    <img src="@_result" alt="Cropped image" />
}

@code {
    private ImageCropper? _cropper;
    private string _url = "images/photo.jpg";
    private string? _result;
    private ImageCropperData _data;
    private readonly ImageCropperOption _options = new()
    {
        CanvasHeight = 360,
        InitialFit = "contain",
        AutoCropArea = 0.8f,
        Keyboard = true,
        Preview = ".bb-cropper-preview"
    };

    private Task OnCropAsync(ImageCropperResult result)
    {
        _result = result.Data;
        // result.Stream provides the decoded image.
        return Task.CompletedTask;
    }

    private Task OnCropChangedAsync(ImageCropperData data)
    {
        _data = data;
        return Task.CompletedTask;
    }

    private async Task ExportAsync()
    {
        await _cropper!.Crop(new ImageCropperExportOptions
        {
            Width = 800,
            MimeType = "image/jpeg",
            Quality = 0.9,
            FillColor = "#fff"
        });
    }
}
```

## Operations and export

Existing `Crop()`, `Replace(url)`, `Reset()`, `Rotate(degrees)`, `Clear()`,
`SetDragMode("crop" | "move" | "none")`, `Enable()` and `Disable()` methods remain available.
`IsDisabled` is respected on the first render and subsequent updates. Changing `Url` replaces the image;
setting it to null or empty removes the image. An empty component can be initialized and later populated
with `Replace(url)`. `Replace` waits for the image to load and resets the image transform and selection.
Image-loading and export failures propagate through JS interop instead of returning an empty result.
While disabled, image-transform methods, `Replace`, `Reset`, `Clear` and `SetAspectRatio` do nothing;
export remains available. Parameter-driven `Url` changes are still applied.

`Zoom(ratio)` changes the image scale, `Move(x, y)` moves the image in canvas pixels,
and `FlipHorizontal()` / `FlipVertical()` toggle mirroring. `SetAspectRatio(null)` restores a free ratio.
For circular crops, set `ImageCropperOption.IsRound = true`; the selection always remains square.
For live circular previews, also apply `.bb-cropper-preview-round` to each preview container;
this makes the preview square before the 50% border radius is applied:

```razor
<ImageCropper Url="@_url" Options="@_roundOptions" />
<div class="bb-cropper-preview bb-cropper-preview-round bb-cropper-preview-lg"></div>

@code {
    private readonly ImageCropperOption _roundOptions = new()
    {
        IsRound = true,
        Preview = ".bb-cropper-preview-round"
    };
}
```

`Crop(ImageCropperExportOptions)` supports PNG, JPEG and WebP. Without a size, the export uses source-image
pixels, not the displayed canvas resolution. Setting width or height scales the result while preserving
the selection aspect ratio. When both are set, the result fits inside that rectangle without stretching.
Quality ranges from 0 to 1 and affects JPEG/WebP. PNG/WebP default to a transparent background;
JPEG defaults to white. Circular PNG/WebP exports preserve transparent corners unless a fill color is set.
Browsers that cannot export the requested format report an error rather than silently returning PNG.

`OnCropChangedAsync` fires at the end of a pointer gesture and after supported keyboard operations.
Its rectangle uses source-image pixels relative to the bounding box of the transformed image.
`Rotate` is in degrees; `ScaleX` and `ScaleY` indicate mirroring (`1` or `-1`).
Do not use the rectangle as an unrotated source-image crop after rotating the image.

## Migration from Cropper.js 1.6.2

Cropper.js 2 uses custom elements. Existing method names and compatible options are adapted by the component,
but the interaction and rendering implementation are different.

| Option | Behavior |
| --- | --- |
| `ViewMode` | Deprecated and ignored. `InitialFit` controls initial sizing only; it does not enforce image/selection boundaries. |
| `Responsive`, `Restore` | Deprecated and ignored. The canvas responds to container resizing automatically. |
| `CheckCrossOrigin` | Deprecated and ignored. Use `CrossOrigin = "anonymous"` or `"use-credentials"` and configure server CORS. |
| `CheckOrientation` | Deprecated and ignored. Image orientation is handled by the browser; preprocess images if needed. |
| `DragMode`, `ToggleDragModeOnDblclick` | Mapped to the canvas handle action; double-click toggles crop/move. |
| `InitialAspectRatio`, `AspectRatio`, `AutoCrop`, `AutoCropArea` | Mapped to the selection. `InitialAspectRatio` accepts a positive invariant-culture numeric string. `AutoCropArea` remains an area fraction from 0 to 1. |
| `Modal`, `Guides`, `Center`, `Highlight`, `Background` | Mapped to shade/grid/crosshair/handle/canvas properties. |
| `Movable`, `Rotatable`, `Scalable`, `Zoomable`, `ZoomOnTouch`, `ZoomOnWheel`, `WheelZoomRatio` | Adapted to image properties and canvas gesture handling. Flipping respects `Scalable`; zooming respects `Zoomable`. |
| `CropBoxMovable`, `CropBoxResizable` | Mapped to selection properties. |
| `MinCanvasWidth`, `MinCanvasHeight`, `MinContainerWidth`, `MinContainerHeight` | Minimum canvas CSS dimensions; canvas-specific values take precedence. |
| `MinCropBoxWidth`, `MinCropBoxHeight` | Reject selection changes below the minimum dimensions. |
| `Preview` | A CSS selector for preview containers. Each receives a live `cropper-viewer`, removed on disposal. |
| `IsRound`, `Radius` | Applied to the selection; `IsRound` also masks the exported image. |

New options include `CanvasHeight` (default 360), `InitialFit` (`contain` or `cover`),
`Keyboard` (default false), `DynamicSelection` (default false), and `CrossOrigin`.
Options are applied at initialization. Use `SetAspectRatio` for runtime ratio changes.
Keyboard shortcuts include arrow keys to move the selection and Delete to clear it.
The Cropper.js 2 keyboard handler is document-level, so enable it for only one cropper at a time.

Custom styles targeting Cropper.js 1 classes such as `.cropper-view-box` must be migrated to the
`cropper-*` custom elements. Keep using the `.bb-cropper-preview-*` helper classes for preview sizes.
