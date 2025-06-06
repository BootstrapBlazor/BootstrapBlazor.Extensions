import { addLink } from "../BootstrapBlazor/modules/utility.js"
import Data from "../BootstrapBlazor/modules/data.js"

export async function init(id, invoke, options) {
    await addLink("./_content/BootstrapBlazor.PdfViewer/pdf-viewer.css");

    if (!navigator.pdfViewerEnabled) {
        await invoke.invokeMethodAsync(options.notSupportCallback);
    }

    const el = document.getElementById(id);
    const pdfViewer = { el, invoke, options };
    Data.set(id, pdfViewer);

    const url = el.getAttribute('data-bb-url');
    loadPdf(id, url);
}

export function loadPdf(id, url) {
    const pdfViewer = Data.get(id);
    const { el } = pdfViewer;
    if (url) {
        const { frame, invoke, options } = pdfViewer;
        const viewer = frame || createFrame(el);
        if (options.loadedCallaback) {
            viewer.onload = () => {
                invoke.invokeMethodAsync(options.loadedCallaback);
            };
        }
        viewer.src = url;
    }
    else {
        delete pdfViewer.frame;
        el.innerHTML = '';
    }
}

const createFrame = el => {
    const frame = document.createElement('iframe');
    frame.classList.add('bb-pdf-viewer');
    el.appendChild(frame);
    return frame;
}
