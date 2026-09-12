using BootstrapBlazor.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BootstrapBlazor.Gantt;

public partial class GanttChart
{
    private ElementReference timelineShellRef;

    private IJSObjectReference? jSObjectReference;

    private ViewportState? pendingViewportState;

    /// <summary>
    ///
    /// </summary>
    /// <param name="firstRender"></param>
    /// <returns></returns>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);
        if (!IsEditable || VisibleRows.Count == 0)
        {
            if (jSObjectReference is not null)
            {
                await DisposeJsDragAsync();
            }

            return;
        }

        if (Module == null)
        {
            throw new Exception("JS module is not initialized.");
        }

        if (jSObjectReference is null)
        {
            jSObjectReference = await Module.InvokeAsync<IJSObjectReference>("initGanttDrag",
                timelineShellRef,
                Interop,
                BuildJsDragOptions());
        }
        else
        {
            await jSObjectReference.InvokeVoidAsync("updateOptions", BuildJsDragOptions());
        }

        if (pendingViewportState is not null)
        {
            await Module.InvokeVoidAsync("restoreViewportState", timelineShellRef, pendingViewportState);
            pendingViewportState = null;
        }
    }

    private async Task SetViewModeAsync(GanttViewMode viewMode)
    {
        if (ResolvedViewMode == viewMode)
        {
            return;
        }

        pendingViewportState = await Module!.InvokeAsync<ViewportState?>("captureViewportState", timelineShellRef);

        internalViewMode = viewMode;
        InvalidateComputedState();
        await InvokeAsync(StateHasChanged);

        if (ViewModeChanged.HasDelegate)
        {
            await ViewModeChanged.InvokeAsync(viewMode);
        }
    }

    private object BuildJsDragOptions() => new
    {
        slotStepWidth = GetSlotStepWidth(),
        showDependencies = ShowDependencies,
        showHierarchyLines = ShowHierarchyLines,
        slots = TimelineSlots.Select(slot => new
        {
            label = slot.Label,
            caption = slot.Caption,
            start = slot.Start.ToString("yyyy-MM-dd"),
            end = slot.End.ToString("yyyy-MM-dd")
        }).ToArray()
    };

    /// <summary>
    /// /
    /// </summary>
    /// <param name="disposing"></param>
    /// <returns></returns>
    protected override async ValueTask DisposeAsync(bool disposing)
    {
        if (disposing)
        {
            await DisposeJsDragAsync();
        }

        await base.DisposeAsync(disposing);
    }

    private async Task DisposeJsDragAsync()
    {
        var jsObjectReference = jSObjectReference;
        jSObjectReference = null;
        if (jsObjectReference is null)
        {
            return;
        }

        try
        {
            await jsObjectReference.InvokeVoidAsync("dispose");
            await jsObjectReference.DisposeAsync();
        }
        catch (JSDisconnectedException)
        {
        }
    }

    //表示时间轴视口滚动状态
    private sealed class ViewportState(double scrollLeftRatio, double scrollTopRatio)
    {
        public double ScrollLeftRatio { get; } = scrollLeftRatio;

        public double ScrollTopRatio { get; } = scrollTopRatio;
    }
}
