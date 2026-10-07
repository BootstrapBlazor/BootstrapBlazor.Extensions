import Cropper from './cropper.esm.js'
import Data from '../BootstrapBlazor/modules/data.js'
import { addLink } from '../BootstrapBlazor/modules/utility.js'

export async function init(id, invoke, options) {
    await addLink(options.styleUrl);

    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`ImageCropper element '${id}' was not found.`);
    }

    dispose(id);
    const source = el.querySelector(".bb-cropper-image");
    const op = options.options ?? {};
    const cropper = new Cropper(source);
    const canvas = cropper.getCropperCanvas();
    const image = cropper.getCropperImage();
    const selection = cropper.getCropperSelection();
    const controller = new AbortController();
    const state = { el, invoke, options: { ...options, options: op }, cropper, canvas, image, selection, controller, viewers: [], scaleX: 1, scaleY: 1 };
    Data.set(id, state);

    try {
        canvas.style.height = `${op.canvasHeight ?? 360}px`;
        canvas.style.minWidth = `${op.minCanvasWidth ?? op.minContainerWidth ?? 0}px`;
        canvas.style.minHeight = `${op.minCanvasHeight ?? op.minContainerHeight ?? 0}px`;
        canvas.background = op.background !== false;
        canvas.disabled = options.isDisabled === true;
        if (op.wheelZoomRatio != null) {
            canvas.scaleStep = op.wheelZoomRatio;
        }
        image.initialFit = op.initialFit ?? "contain";
        image.rotatable = op.rotatable !== false;
        image.scalable = op.scalable !== false || op.zoomable !== false;
        image.translatable = op.movable !== false;
        if (op.crossOrigin) {
            image.setAttribute("crossorigin", op.crossOrigin);
        }
        selection.id = `${id}-selection`;
        selection.aspectRatio = op.isRound ? 1 : (op.aspectRatio ?? NaN);
        selection.initialAspectRatio = Number(op.initialAspectRatio ?? NaN);
        selection.initialCoverage = op.autoCrop === false ? NaN : Math.sqrt(op.autoCropArea ?? 0.8);
        selection.movable = op.cropBoxMovable !== false;
        selection.resizable = op.cropBoxResizable !== false;
        selection.keyboard = op.keyboard === true && !canvas.disabled;
        selection.dynamic = op.dynamicSelection === true;
        selection.precise = true;
        selection.querySelector("cropper-grid").hidden = op.guides === false;
        selection.querySelector("cropper-crosshair").hidden = op.center === false;
        selection.querySelector('cropper-handle[action="move"]').themeColor = op.highlight === false
            ? "transparent" : "rgba(255, 255, 255, 0.35)";
        if (op.modal === false) {
            canvas.querySelector("cropper-shade").remove();
        }
        if (op.isRound) {
            selection.style.borderRadius = "50%";
            selection.style.overflow = "hidden";
        } else if (op.radius) {
            selection.style.borderRadius = op.radius;
        }
        el.classList.toggle("disabled", canvas.disabled);
        setDragMode(id, op.dragMode ?? "crop");

        const listen = (target, event, handler, capture = false) =>
            target.addEventListener(event, handler, { signal: controller.signal, capture });

        listen(canvas, "action", event => {
            const { action, relatedEvent } = event.detail;
            if ((action === "scale" || action === "transform") &&
                (op.zoomable === false ||
                    (relatedEvent?.type === "wheel" ? op.zoomOnWheel === false : op.zoomOnTouch === false))) {
                event.preventDefault();
            }
        }, true);
        listen(selection, "change", event => {
            const { width, height } = event.detail;
            if (width > 0 && height > 0 &&
                (width < (op.minCropBoxWidth ?? 0) || height < (op.minCropBoxHeight ?? 0))) {
                event.preventDefault();
            }
        });
        listen(canvas, "actionend", () => notifyChanged(state));
        if (op.toggleDragModeOnDblclick !== false) {
            listen(canvas, "dblclick", () => {
                if (!canvas.disabled) {
                    setDragMode(id, state.dragMode === "crop" ? "move" : "crop");
                }
            });
        }
        if (op.keyboard) {
            listen(document, "keydown", event => {
                if (!canvas.disabled && !event.defaultPrevented &&
                    !/^(input|textarea|select)$/i.test(event.target.tagName) &&
                    !event.target.isContentEditable &&
                    ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "+", "-", "Delete", "Backspace"].includes(event.key)) {
                    setTimeout(() => {
                        if (event.defaultPrevented) {
                            notifyChanged(state);
                        }
                    }, 0);
                }
            }, true);
        }
        state.previewTargets = op.preview ? document.querySelectorAll(op.preview) : [];

        if (source.getAttribute("src")?.trim()) {
            state.ready = loadImage(state);
            await state.ready;
        } else {
            image.removeAttribute("src");
            image.hidden = true;
            selection.$clear();
        }
        if (controller.signal.aborted) {
            return;
        }
        let canvasWidth = canvas.clientWidth;
        let canvasHeight = canvas.clientHeight;
        state.resizeObserver = new ResizeObserver(() => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            if (image.getAttribute("src") && width > 0 && height > 0 && canvasWidth > 0 && canvasHeight > 0 &&
                (width !== canvasWidth || height !== canvasHeight)) {
                fitImage(state);
                if (!selection.hidden) {
                    selection.$change(selection.x * width / canvasWidth, selection.y * height / canvasHeight,
                        selection.width * width / canvasWidth, selection.height * height / canvasHeight);
                }
            }
            canvasWidth = width;
            canvasHeight = height;
        });
        state.resizeObserver.observe(canvas);
    } catch (error) {
        if (Data.get(id) === state) {
            dispose(id);
        }
        throw error;
    }
}

const getState = id => {
    const state = Data.get(id);
    if (!state) {
        throw new Error(`ImageCropper '${id}' is not initialized.`);
    }
    return state;
}

const fitImage = ({ image, options }) => {
    const { translatable, scalable } = image;
    image.translatable = true;
    image.scalable = true;
    image.$center(options.options.initialFit ?? "contain");
    image.translatable = translatable;
    image.scalable = scalable;
}

const loadImage = async state => {
    const nativeImage = await state.image.$ready();
    if (state.controller.signal.aborted) {
        return;
    }
    // Cached images can be ready before Cropper's load handler sets the element dimensions.
    state.image.style.width = `${nativeImage.naturalWidth}px`;
    state.image.style.height = `${nativeImage.naturalHeight}px`;
    state.image.$resetTransform();
    state.scaleX = state.scaleY = 1;
    fitImage(state);
    state.selection.initialAspectRatio = Number(state.options.options.initialAspectRatio ?? (nativeImage.naturalWidth / nativeImage.naturalHeight));
    if (state.options.options.autoCrop === false || state.options.options.autoCropArea === 0) {
        state.selection.$clear();
    } else {
        state.selection.$initSelection(true, true);
    }
    if (state.viewers.length === 0) {
        state.previewTargets.forEach(target => {
            const viewer = document.createElement("cropper-viewer");
            viewer.setAttribute("selection", `#${CSS.escape(state.selection.id)}`);
            viewer.setAttribute("resize", "none");
            viewer.style.width = "100%";
            viewer.style.height = "100%";
            target.appendChild(viewer);
            state.viewers.push(viewer);
        });
    }
}

const removeViewers = state => {
    state.viewers.forEach(viewer => viewer.remove());
    state.viewers = [];
}

const notifyChanged = state => {
    const callback = state.options.triggerOnCropEndAsync;
    if (callback && state.image.getAttribute("src") && !state.controller.signal.aborted) {
        state.invoke.invokeMethodAsync(callback, getCropData(state));
    }
}

const getCropData = ({ image, canvas, selection, scaleX, scaleY }) => {
    const [a, b] = image.$getTransform();
    const zoom = Math.hypot(a, b);
    const imageRect = image.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    return {
        x: (selection.x - imageRect.left + canvasRect.left) / zoom,
        y: (selection.y - imageRect.top + canvasRect.top) / zoom,
        width: selection.width / zoom,
        height: selection.height / zoom,
        rotate: Math.atan2(b * scaleX, a * scaleX) * 180 / Math.PI,
        scaleX,
        scaleY
    };
}

export function dispose(id) {
    const state = Data.get(id);
    if (state) {
        state.controller.abort();
        state.resizeObserver?.disconnect();
        removeViewers(state);
        state.cropper.destroy();
        Data.remove(id);
    }
}

export async function crop(id, exportOptions) {
    const state = getState(id);
    const { image, selection } = state;
    if (!image.getAttribute("src")) {
        throw new Error("Set an image URL before cropping.");
    }
    await state.ready;
    if (selection.hidden || selection.width === 0 || selection.height === 0) {
        selection.initialCoverage = Math.sqrt(state.options.options.autoCropArea || 0.8);
        selection.$initSelection(true, true);
    }
    const op = exportOptions ?? {};
    const fillColor = op.fillColor ?? (op.mimeType === "image/jpeg" ? "#fff" : null);
    if (fillColor && !CSS.supports("color", fillColor)) {
        throw new Error(`Invalid export fill color: '${fillColor}'.`);
    }
    const [a, b] = image.$getTransform();
    const naturalWidth = selection.width / Math.hypot(a, b);
    let result = await selection.$toCanvas({
        width: op.width ?? (op.height ? undefined : Math.max(1, Math.round(naturalWidth))),
        height: op.height ?? undefined,
        beforeDraw: (context, canvas) => {
            context.imageSmoothingEnabled = op.imageSmoothingEnabled !== false;
            context.imageSmoothingQuality = "high";
            if (fillColor) {
                context.fillStyle = fillColor;
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
        }
    });
    if (state.options.options.isRound) {
        result = getRoundCanvas(result);
        if (fillColor) {
            const context = result.getContext("2d");
            context.globalCompositeOperation = "destination-over";
            context.fillStyle = fillColor;
            context.fillRect(0, 0, result.width, result.height);
        }
    }
    const mimeType = op.mimeType ?? "image/png";
    const data = result.toDataURL(mimeType, op.quality ?? 0.92);
    if (!data.startsWith(`data:${mimeType};base64,`)) {
        throw new Error(`The browser could not export '${mimeType}' at the requested size.`);
    }
    return data;
}

export async function replace(id, url, force = false) {
    const state = getState(id);
    if (state.canvas.disabled && !force) {
        return;
    }
    removeViewers(state);
    state.image.hidden = false;
    state.image.setAttribute("src", url);
    state.ready = loadImage(state);
    await state.ready;
}

export function removeImage(id) {
    const state = getState(id);
    removeViewers(state);
    state.image.removeAttribute("src");
    state.image.hidden = true;
    state.selection.$clear();
    state.ready = null;
}

export async function reset(id) {
    const state = getState(id);
    if (!state.canvas.disabled && state.image.getAttribute("src")) {
        await state.ready;
        await loadImage(state);
    }
}

export function setDragMode(id, mode) {
    if (!["crop", "move", "none"].includes(mode ?? "none")) {
        throw new Error(`Invalid drag mode: '${mode}'.`);
    }
    const state = getState(id);
    state.dragMode = mode ?? "none";
    state.canvas.querySelector(":scope > cropper-handle").action = mode === "crop" ? "select" : (mode ?? "none");
}

export function rotate(id, angle) {
    const state = getState(id);
    if (!state.canvas.disabled) {
        state.image.$rotate(`${angle}deg`);
    }
}

export function zoom(id, ratio) {
    const state = getState(id);
    if (!state.canvas.disabled && state.options.options.zoomable !== false) {
        const { scalable } = state.image;
        state.image.scalable = true;
        state.image.$zoom(ratio);
        state.image.scalable = scalable;
    }
}

export function flip(id, horizontal) {
    const state = getState(id);
    if (!state.canvas.disabled && state.options.options.scalable !== false) {
        state.image.$scale(horizontal ? -1 : 1, horizontal ? 1 : -1);
        if (horizontal) {
            state.scaleX *= -1;
        } else {
            state.scaleY *= -1;
        }
    }
}

export function move(id, x, y) {
    const state = getState(id);
    if (!state.canvas.disabled) {
        state.image.$move(x, y);
    }
}

export function setAspectRatio(id, ratio) {
    const state = getState(id);
    if (!state.canvas.disabled) {
        const { selection } = state;
        selection.aspectRatio = state.options.options.isRound ? 1 : (ratio ?? NaN);
        selection.$change(selection.x, selection.y, selection.width, selection.height);
    }
}

export function clear(id) {
    const state = getState(id);
    if (!state.canvas.disabled) {
        state.selection.$clear();
    }
}

export function enable(id) {
    const state = getState(id);
    state.canvas.disabled = false;
    state.selection.keyboard = state.options.options.keyboard === true;
    state.el.classList.remove("disabled");
}

export function disable(id) {
    const state = getState(id);
    state.canvas.disabled = true;
    state.selection.keyboard = false;
    state.el.classList.add("disabled");
}

const getRoundCanvas = source => {
    const canvas = document.createElement("canvas");
    canvas.width = source.width;
    canvas.height = source.height;
    const context = canvas.getContext("2d");
    context.drawImage(source, 0, 0);
    context.globalCompositeOperation = "destination-in";
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2, 0, 2 * Math.PI);
    context.fill();
    return canvas;
}
