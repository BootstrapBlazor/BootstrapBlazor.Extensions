export function createDragController(root, dotNetRef, initialOptions, scheduleDependencyRender) {
    let slotStepWidth = initialOptions.slotStepWidth;
    let slots = initialOptions.slots ?? [];
    let dragState = null;
    let previewFrame = 0;
    const dragEventOptions = true;
    const dragActivationDistance = 3;

    function readInt(value, fallback = 0) {
        const parsed = Number.parseInt(value ?? `${fallback}`, 10);
        return Number.isNaN(parsed) ? fallback : parsed;
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function cancelPreviewFrame() {
        if (previewFrame) {
            cancelAnimationFrame(previewFrame);
            previewFrame = 0;
        }
    }

    function schedulePreview() {
        if (previewFrame) {
            return;
        }

        previewFrame = requestAnimationFrame(() => {
            previewFrame = 0;
            applyPreview();
        });
    }

    function releasePointerCapture() {
        const { handle, pointerId } = dragState ?? {};
        if (!handle?.releasePointerCapture) {
            return;
        }

        try {
            if (handle.hasPointerCapture?.(pointerId)) {
                handle.releasePointerCapture(pointerId);
            }
        } catch {
        }
    }

    function setDraggingDocumentState(isDragging) {
        document.body.classList.toggle("gantt-chart--dragging", isDragging);
    }

    function addGlobalListeners() {
        window.addEventListener("pointermove", onPointerMove, dragEventOptions);
        window.addEventListener("pointerup", onPointerUp, dragEventOptions);
        window.addEventListener("pointercancel", onPointerCancel, dragEventOptions);
        window.addEventListener("blur", onWindowBlur, dragEventOptions);
        document.addEventListener("visibilitychange", onVisibilityChange, dragEventOptions);
    }

    function removeGlobalListeners() {
        window.removeEventListener("pointermove", onPointerMove, dragEventOptions);
        window.removeEventListener("pointerup", onPointerUp, dragEventOptions);
        window.removeEventListener("pointercancel", onPointerCancel, dragEventOptions);
        window.removeEventListener("blur", onWindowBlur, dragEventOptions);
        document.removeEventListener("visibilitychange", onVisibilityChange, dragEventOptions);
    }

    function clampDeltaSlots(nextDeltaSlots) {
        if (!dragState) {
            return nextDeltaSlots;
        }

        return Math.max(dragState.minDeltaSlots, Math.min(dragState.maxDeltaSlots, nextDeltaSlots));
    }

    function clampDeltaPixels(nextDeltaPixels) {
        if (!dragState) {
            return nextDeltaPixels;
        }

        const minDeltaPixels = dragState.minDeltaSlots * slotStepWidth;
        const maxDeltaPixels = dragState.maxDeltaSlots * slotStepWidth;
        return clamp(nextDeltaPixels, minDeltaPixels, maxDeltaPixels);
    }

    function getLinkedPreviewElements(bar, descendantItemIdsText) {
        if (!bar || !descendantItemIdsText) {
            return [];
        }

        const bars = Array.from(root.querySelectorAll(".gantt-chart__bar"));
        return descendantItemIdsText
            .split(",")
            .map((itemId) => itemId.trim())
            .filter((itemId) => itemId.length > 0)
            .map((itemId) => {
                const element = bars.find((candidate) => candidate.dataset.itemId === itemId);
                return element
                    ? {
                        element,
                        originalTransform: element.style.transform ?? "",
                        startIndex: readInt(element.dataset.startIndex),
                        endIndex: readInt(element.dataset.endIndex),
                        previewBadge: null
                    }
                    : null;
            })
            .filter((entry) => entry !== null);
    }

    function createDragState(handle, event) {
        const bar = handle.closest(".gantt-chart__bar");
        const track = bar?.offsetParent;
        const progressElement = bar?.querySelector(".gantt-chart__bar-progress");
        const dragKind = handle.dataset.dragKind ?? "schedule";
        const operation = readInt(handle.dataset.dragOperation);
        const linkedPreviewElements = dragKind === "schedule" && operation === 0
            ? getLinkedPreviewElements(bar, bar?.dataset.descendantItemIds ?? "")
            : [];
        return {
            pointerId: event.pointerId,
            startClientX: event.clientX,
            dragKind,
            itemId: handle.dataset.itemId,
            operation,
            viewMode: readInt(handle.dataset.viewMode),
            minDeltaSlots: readInt(handle.dataset.minDeltaSlots),
            maxDeltaSlots: readInt(handle.dataset.maxDeltaSlots),
            startIndex: readInt(handle.dataset.startIndex),
            endIndex: readInt(handle.dataset.endIndex),
            minStartIndex: readInt(handle.dataset.minStartIndex),
            maxEndIndex: readInt(handle.dataset.maxEndIndex),
            slotCount: Math.max(1, readInt(handle.dataset.slotCount, 1)),
            isMilestone: handle.dataset.isMilestone === "true",
            handle,
            element: bar,
            trackWidth: Math.max(1, track?.clientWidth ?? 1),
            deltaSlots: 0,
            deltaPixels: 0,
            didDrag: false,
            originalOffsetLeft: bar?.offsetLeft ?? 0,
            originalOffsetWidth: bar?.offsetWidth ?? 0,
            originalProgress: Number.parseFloat(handle.dataset.progressValue ?? "0") || 0,
            previewProgress: Number.parseFloat(handle.dataset.progressValue ?? "0") || 0,
            progressElement,
            originalProgressWidthStyle: progressElement?.style.width ?? "",
            originalHandleLeftStyle: handle?.style.left ?? "",
            previewBadge: null,
            originalLeftStyle: bar?.style.left ?? "",
            originalTransform: bar?.style.transform ?? "",
            originalWidthStyle: bar?.style.width ?? "",
            linkedPreviewElements
        };
    }

    function getPreviewDeltaPixels(state) {
        if (!state || state.viewMode === 0) {
            return state?.deltaPixels ?? 0;
        }

        const snappedDeltaPixels = state.deltaSlots * slotStepWidth;
        const freeDeltaPixels = state.deltaPixels;
        const difference = Math.abs(freeDeltaPixels - snappedDeltaPixels);
        const slotHalfWidth = Math.max(1, slotStepWidth / 2);
        const snapWeight = clamp(0.55 + ((slotHalfWidth - Math.min(slotHalfWidth, difference)) / slotHalfWidth) * 0.25, 0.55, 0.8);
        return (freeDeltaPixels * (1 - snapWeight)) + (snappedDeltaPixels * snapWeight);
    }

    function buildTransformWithTranslateX(transform, deltaPixels) {
        const translateX = `translateX(${deltaPixels.toFixed(2)}px)`;
        return transform ? `${transform} ${translateX}` : translateX;
    }

    function setPreviewStyles(state) {
        const element = state.element;
        const previewDeltaPixels = getPreviewDeltaPixels(state);

        if (!element) {
            return;
        }

        if (state.dragKind === "progress") {
            if (state.progressElement) {
                state.progressElement.style.width = `${clamp(state.previewProgress, 0, 100).toFixed(2)}%`;
            }

            if (state.handle) {
                state.handle.style.left = `calc(${clamp(state.previewProgress, 0, 100).toFixed(2)}% - 0.38rem)`;
            }

            return;
        }

        if (state.isMilestone) {
            element.style.transform = buildTransformWithTranslateX(state.originalTransform, previewDeltaPixels);
            return;
        }

        if (state.operation === 0) {
            element.style.transform = buildTransformWithTranslateX(state.originalTransform, previewDeltaPixels);

            for (const linkedElement of state.linkedPreviewElements ?? []) {
                linkedElement.element.style.transform = buildTransformWithTranslateX(linkedElement.originalTransform, previewDeltaPixels);
            }

            return;
        }

        const nextLeft = state.originalOffsetLeft + (state.operation === 1 ? previewDeltaPixels : 0);
        const nextWidth = state.originalOffsetWidth + (state.operation === 1 ? -previewDeltaPixels : previewDeltaPixels);
        const leftPercent = clamp(nextLeft * 100 / state.trackWidth, 0, 100);
        const widthPercent = clamp(nextWidth * 100 / state.trackWidth, 0, 100 - leftPercent);

        element.style.left = `${leftPercent.toFixed(4)}%`;
        element.style.width = `${widthPercent.toFixed(4)}%`;
    }

    function restorePreviewStyles(state) {
        if (!state?.element) {
            return;
        }

        if (state.progressElement) {
            state.progressElement.style.width = state.originalProgressWidthStyle;
        }

        if (state.handle) {
            state.handle.style.left = state.originalHandleLeftStyle;
        }

        state.element.style.left = state.originalLeftStyle;
        state.element.style.transform = state.originalTransform;
        state.element.style.width = state.originalWidthStyle;

        for (const linkedElement of state.linkedPreviewElements ?? []) {
            linkedElement.element.style.transform = linkedElement.originalTransform;
        }
    }

    function getPreviewRange() {
        if (!dragState) {
            return null;
        }

        if (dragState.dragKind === "progress") {
            return null;
        }

        const spanUnits = Math.max(1, dragState.endIndex - dragState.startIndex + 1);

        if (dragState.operation === 1) {
            const startIndex = clamp(dragState.startIndex + dragState.deltaSlots, dragState.minStartIndex, dragState.endIndex);
            return { startIndex, endIndex: dragState.endIndex };
        }

        if (dragState.operation === 2) {
            const endIndex = clamp(dragState.endIndex + dragState.deltaSlots, dragState.startIndex, dragState.maxEndIndex);
            return { startIndex: dragState.startIndex, endIndex };
        }

        const maxStartIndex = Math.min(Math.max(0, dragState.slotCount - spanUnits), dragState.maxEndIndex - spanUnits + 1);
        const startIndex = clamp(dragState.startIndex + dragState.deltaSlots, dragState.minStartIndex, Math.max(dragState.minStartIndex, maxStartIndex));
        return { startIndex, endIndex: startIndex + spanUnits - 1 };
    }

    function getDragHandle(target) {
        const handle = target.closest("[data-gantt-drag='true']");
        return handle && root.contains(handle) ? handle : null;
    }

    function ensurePreviewBadge(target) {
        if (!target?.element) {
            return null;
        }

        if (target.previewBadge?.isConnected) {
            return target.previewBadge;
        }

        const badge = document.createElement("div");
        badge.className = "gantt-chart__drag-preview-badge";
        badge.setAttribute("role", "tooltip");
        badge.setAttribute("aria-hidden", "true");
        target.element.appendChild(badge);
        target.previewBadge = badge;
        return badge;
    }

    function removePreviewBadge(target) {
        if (target?.previewBadge?.isConnected) {
            target.previewBadge.remove();
        }

        if (target) {
            target.previewBadge = null;
        }
    }

    function formatSlotPoint(slot, edge, viewMode) {
        if (!slot) {
            return "";
        }

        if (viewMode === 0) {
            return edge === "start" ? slot.start : slot.end;
        }

        if (viewMode === 1) {
            return `${slot.label}（${slot.start} 至 ${slot.end}）`;
        }

        return slot.label;
    }

    function formatPreviewText(range, viewMode, highlight) {
        const startSlot = slots[range.startIndex];
        const endSlot = slots[range.endIndex];
        if (!startSlot || !endSlot) {
            return null;
        }

        const startText = formatSlotPoint(startSlot, "start", viewMode);
        const endText = formatSlotPoint(endSlot, "end", viewMode);
        return {
            startText,
            endText,
            highlight
        };
    }

    function renderDatePreviewBadge(target, preview) {
        const badge = ensurePreviewBadge(target);
        if (!badge) {
            return;
        }

        const startClass = preview.highlight === 1
            ? "gantt-chart__drag-preview-value gantt-chart__drag-preview-value--active"
            : "gantt-chart__drag-preview-value";
        const endClass = preview.highlight === 2
            ? "gantt-chart__drag-preview-value gantt-chart__drag-preview-value--active"
            : "gantt-chart__drag-preview-value";

        badge.innerHTML = `
            <span class="gantt-chart__drag-preview-arrow" aria-hidden="true"></span>
            <span class="gantt-chart__drag-preview-item">
                <span class="gantt-chart__drag-preview-label">开始</span>
                <span class="${startClass}">${preview.startText}</span>
            </span>
            <span class="gantt-chart__drag-preview-separator">·</span>
            <span class="gantt-chart__drag-preview-item">
                <span class="gantt-chart__drag-preview-label">结束</span>
                <span class="${endClass}">${preview.endText}</span>
            </span>
        `;
    }

    function getMovedRange(startIndex, endIndex, deltaSlots) {
        return {
            startIndex: startIndex + deltaSlots,
            endIndex: endIndex + deltaSlots
        };
    }

    function updatePreviewBadge(state, range) {
        if (!state?.didDrag) {
            removePreviewBadge(state);

            for (const linkedElement of state?.linkedPreviewElements ?? []) {
                removePreviewBadge(linkedElement);
            }

            return;
        }

        if (state.dragKind === "progress") {
            const badge = ensurePreviewBadge(state);
            if (!badge) {
                return;
            }

            badge.innerHTML = `
                <span class="gantt-chart__drag-preview-arrow" aria-hidden="true"></span>
                <span class="gantt-chart__drag-preview-item">
                    <span class="gantt-chart__drag-preview-label">完成度</span>
                    <span class="gantt-chart__drag-preview-value gantt-chart__drag-preview-value--active">${Math.round(clamp(state.previewProgress, 0, 100))}%</span>
                </span>
            `;
            return;
        }

        const preview = formatPreviewText(range, state.viewMode, state.operation);
        if (!preview) {
            removePreviewBadge(state);
            return;
        }

        renderDatePreviewBadge(state, preview);

        for (const linkedElement of state.linkedPreviewElements ?? []) {
            const linkedRange = getMovedRange(linkedElement.startIndex, linkedElement.endIndex, state.deltaSlots);
            const linkedPreview = formatPreviewText(linkedRange, state.viewMode, 0);
            if (!linkedPreview) {
                removePreviewBadge(linkedElement);
                continue;
            }

            renderDatePreviewBadge(linkedElement, linkedPreview);
        }
    }

    function beginDrag(handle, event) {
        dragState = createDragState(handle, event);

        if (handle.setPointerCapture) {
            handle.setPointerCapture(event.pointerId);
        }

        dragState.element?.classList.add("gantt-chart__bar--js-dragging");
        dragState.element?.classList.toggle("gantt-chart__bar--js-dragging-start", dragState.operation === 1);
        dragState.element?.classList.toggle("gantt-chart__bar--js-dragging-end", dragState.operation === 2);
        dragState.element?.classList.toggle("gantt-chart__bar--js-dragging-move", dragState.operation === 0);
        dragState.element?.classList.toggle("gantt-chart__bar--js-dragging-parent", (dragState.linkedPreviewElements?.length ?? 0) > 0);

        for (const linkedElement of dragState.linkedPreviewElements ?? []) {
            linkedElement.element.classList.add("gantt-chart__bar--linked-preview");
        }

        setDraggingDocumentState(true);
        addGlobalListeners();
    }

    function updateDrag(clientX) {
        if (!dragState) {
            return;
        }

        if (dragState.dragKind === "progress") {
            const width = Math.max(1, dragState.originalOffsetWidth);
            const deltaPixels = clientX - dragState.startClientX;
            const nextProgress = clamp(dragState.originalProgress + ((deltaPixels / width) * 100), 0, 100);
            const didDrag = Math.abs(nextProgress - dragState.originalProgress) >= 1;
            if (nextProgress === dragState.previewProgress && deltaPixels === dragState.deltaPixels && didDrag === dragState.didDrag) {
                return;
            }

            dragState.deltaPixels = deltaPixels;
            dragState.previewProgress = nextProgress;
            dragState.didDrag = didDrag;
            schedulePreview();
            return;
        }

        const deltaPixels = clampDeltaPixels(clientX - dragState.startClientX);
        const deltaSlots = Math.round(deltaPixels / slotStepWidth);
        const clampedDeltaSlots = clampDeltaSlots(deltaSlots);
        const didDrag = Math.abs(deltaPixels) >= dragActivationDistance;
        if (clampedDeltaSlots === dragState.deltaSlots && deltaPixels === dragState.deltaPixels && didDrag === dragState.didDrag) {
            return;
        }

        dragState.deltaPixels = deltaPixels;
        dragState.deltaSlots = clampedDeltaSlots;
        dragState.didDrag = didDrag;
        schedulePreview();
    }

    function onPointerDown(event) {
        if (!event.isPrimary || event.button !== 0) {
            return;
        }

        const handle = getDragHandle(event.target);
        if (!handle) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        beginDrag(handle, event);
    }

    function onPointerMove(event) {
        if (!dragState || event.pointerId !== dragState.pointerId) {
            return;
        }

        updateDrag(event.clientX);
    }

    function finishDrag() {
        const completedState = dragState ? { ...dragState } : null;
        removeGlobalListeners();
        releasePointerCapture();
        setDraggingDocumentState(false);
        dragState = null;
        return completedState;
    }

    function cancelActiveDrag() {
        if (!dragState) {
            return;
        }

        cleanupDrag();
    }

    async function onPointerUp(event) {
        if (!dragState || event.pointerId !== dragState.pointerId) {
            return;
        }

        const commitState = finishDrag();
        if (!commitState) {
            return;
        }

        if (commitState.dragKind === "progress" && !commitState.didDrag) {
            cleanupDrag(commitState, true);
            return;
        }

        if (!commitState.didDrag || commitState.deltaSlots === 0) {
            if (commitState.dragKind !== "progress") {
                cleanupDrag(commitState, true);
                return;
            }
        }

        try {
            if (commitState.dragKind === "progress") {
                await dotNetRef.invokeMethodAsync("CommitJsProgress", commitState.itemId, clamp(commitState.previewProgress, 0, 100));
            } else {
                if (commitState.deltaSlots === 0) {
                    cleanupDrag(commitState, true);
                    return;
                }

                await dotNetRef.invokeMethodAsync("CommitJsDrag", commitState.itemId, commitState.operation, commitState.deltaSlots);
            }

            cleanupDrag(commitState, false);
        } catch {
            cleanupDrag(commitState, true);
        }
    }

    function onPointerCancel(event) {
        if (!dragState || event.pointerId !== dragState.pointerId) {
            return;
        }

        cancelActiveDrag();
    }

    function onWindowBlur() {
        cancelActiveDrag();
    }

    function onVisibilityChange() {
        if (!dragState || document.visibilityState === "visible") {
            return;
        }

        cancelActiveDrag();
    }

    function applyPreview() {
        if (!dragState?.element) {
            return;
        }

        if (!dragState.element.isConnected) {
            cleanupDrag();
            return;
        }

        if (!dragState.didDrag) {
            restorePreviewStyles(dragState);
            removePreviewBadge(dragState);
            return;
        }

        const range = getPreviewRange();
        if (dragState.dragKind !== "progress" && !range) {
            return;
        }

        updatePreviewBadge(dragState, range);

        restorePreviewStyles(dragState);
        setPreviewStyles(dragState);
        scheduleDependencyRender();
    }

    function cleanupDrag(state = dragState, restorePreview = true) {
        cancelPreviewFrame();

        if (state?.element) {
            state.element.classList.remove("gantt-chart__bar--js-dragging");
            state.element.classList.remove("gantt-chart__bar--js-dragging-start");
            state.element.classList.remove("gantt-chart__bar--js-dragging-end");
            state.element.classList.remove("gantt-chart__bar--js-dragging-move");
            state.element.classList.remove("gantt-chart__bar--js-dragging-parent");
            removePreviewBadge(state);
            for (const linkedElement of state.linkedPreviewElements ?? []) {
                linkedElement.element.classList.remove("gantt-chart__bar--linked-preview");
                removePreviewBadge(linkedElement);
            }

            if (restorePreview) {
                restorePreviewStyles(state);
            }
        }

        scheduleDependencyRender();

        setDraggingDocumentState(false);
        if (state === dragState) {
            releasePointerCapture();
            dragState = null;
        }

        removeGlobalListeners();
    }

    root.addEventListener("pointerdown", onPointerDown, dragEventOptions);

    return {
        updateOptions(nextOptions) {
            slotStepWidth = nextOptions.slotStepWidth;
            slots = nextOptions.slots ?? [];
            scheduleDependencyRender();
        },
        dispose() {
            cleanupDrag();
            root.removeEventListener("pointerdown", onPointerDown, dragEventOptions);
        }
    };
}
