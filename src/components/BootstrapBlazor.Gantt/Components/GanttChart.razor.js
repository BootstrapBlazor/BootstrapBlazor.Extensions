import { createDragController } from "../js/ganttChart.drag.js";
import { createDependencyRenderer } from "../js/ganttChart.links.js";

export function initGanttDrag(root, dotNetRef, options) {
    const dependencyRenderer = createDependencyRenderer(root, options);
    const dragController = createDragController(root, dotNetRef, options, dependencyRenderer.scheduleRender);

    return {
        updateOptions(nextOptions) {
            dependencyRenderer.updateOptions(nextOptions);
            dragController.updateOptions(nextOptions);
        },
        dispose() {
            dragController.dispose();
            dependencyRenderer.dispose();
        }
    };
}

export function captureViewportState(root) {
    const viewport = root?.closest?.(".gantt-chart__viewport");
    if (!viewport) {
        return null;
    }

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);

    return {
        scrollLeftRatio: maxScrollLeft <= 0 ? 0 : viewport.scrollLeft / maxScrollLeft,
        scrollTopRatio: maxScrollTop <= 0 ? 0 : viewport.scrollTop / maxScrollTop
    };
}

export function restoreViewportState(root, state) {
    const viewport = root?.closest?.(".gantt-chart__viewport");
    if (!viewport || !state) {
        return;
    }

    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    viewport.scrollLeft = maxScrollLeft * Math.max(0, Math.min(1, state.scrollLeftRatio ?? 0));
    viewport.scrollTop = maxScrollTop * Math.max(0, Math.min(1, state.scrollTopRatio ?? 0));
}
