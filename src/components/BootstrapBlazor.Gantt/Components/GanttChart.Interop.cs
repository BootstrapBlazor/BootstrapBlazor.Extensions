using BootstrapBlazor.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BootstrapBlazor.Gantt;

public partial class GanttChart
{
    private ElementReference timelineShellRef;

    private ViewportState? pendingViewportState;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);
        if (!IsEditable)
        {
            await DisposeJsDragAsync();
            return;
        }

        if (firstRender)
        {
            await InvokeVoidAsync( "initGanttDrag",
                timelineShellRef,
                Interop,
                BuildJsDragOptions());
        }
        else
        {
            await InvokeVoidAsync("updateOptions", BuildJsDragOptions());
        }

        if (pendingViewportState is not null)
        {
            await InvokeVoidAsync("restoreViewportState", timelineShellRef, pendingViewportState);
            pendingViewportState = null;
        }
    }

    private async Task SetViewModeAsync(GanttViewMode viewMode)
    {
        if (ResolvedViewMode == viewMode)
        {
            return;
        }

        pendingViewportState = await JSRuntime.InvokeAsync<ViewportState?>("captureViewportState", timelineShellRef);

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

    protected override async ValueTask DisposeAsync(bool disposing)
    {
        await base.DisposeAsync(disposing);
        await DisposeJsDragAsync();
    }

    private async Task DisposeJsDragAsync()
    {
        try
        {
            await InvokeVoidAsync("dispose");
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
