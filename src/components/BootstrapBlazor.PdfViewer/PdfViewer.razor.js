import { addLink, addScript } from "../BootstrapBlazor/modules/utility.js"
import Data from "../BootstrapBlazor/modules/data.js"

export async function init(id) {
    await addLink("./_content/BootstrapBlazor.PdfViewer/pdf-viewer.css");

    const el = document.getElementById(id);
    const url = el.getAttribute('data-bb-url');
    const pdfViewer = { el };

    createFrame(pdfViewer, url);
    Data.set(id, pdfViewer);

    console.log(pdfViewer);
}

export function loadPdf(id, url) {
    const pdfViewer = Data.get(id);
    const { frame } = pdfViewer;
    if (frame) {
        frame.src = url;
    }
    else {
        createFrame(pdfViewer, url);
    }
}

const createFrame = (pdfViewer, url) => {
    const { el } = pdfViewer;
    if (url) {
        const frame = document.createElement('iframe');
        frame.src = url;
        frame.classList.add('bb-pdf-viewer');
        el.appendChild(frame);
        pdfViewer.frame = frame;
    }
}

export function dispose(id) {
}
