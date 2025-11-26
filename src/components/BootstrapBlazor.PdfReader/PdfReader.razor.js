import './lib/pdf.min.mjs'
import './lib/pdf_viewer.mjs'
import { addLink } from '../BootstrapBlazor/modules/utility.js';
import Data from '../BootstrapBlazor/modules/data.js';
import EventHandler from '../BootstrapBlazor/modules/event-handler.js';

if (pdfjsLib != null) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.min.mjs';
}

export async function init(id, invoke, options) {
    await addLink('./_content/BootstrapBlazor.PdfReader/css/pdf_viewer.css');

    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    if (options.url === null) {
        return;
    }

    const loadingTask = pdfjsLib.getDocument(options);
    loadingTask.onProgress = function (progressData) {
        console.log(progressData.loaded, progressData.total);
    };

    loadingTask.onPassword = function (updatePassword, reason) {
        if (reason === pdfjsLib.PasswordResponses.NEED_PASSWORD) {
            const password = prompt("This PDF is password protected. Enter password:");
            updatePassword(password);
        }
        else if (reason === pdfjsLib.PasswordResponses.INCORRECT_PASSWORD) {
            const password = prompt("Incorrect password. Please try again:");
            updatePassword(password);
        }
    };

    const container = el.querySelector(".bb-view-container");
    const eventBus = new pdfjsViewer.EventBus();
    const pdfViewer = new pdfjsViewer.PDFViewer({
        container,
        eventBus
    });

    addEventListener(el, pdfViewer, eventBus, invoke, options);

    const pdfDocument = await loadingTask.promise;
    pdfViewer.setDocument(pdfDocument);

    Data.set(id, { el, pdfViewer });
}

export function fitToWidth(id) {
    const { pdfViewer } = Data.get(id);
    if (pdfViewer) {
        pdfViewer.currentScaleValue = "page-height";
    }
}

export function fitToPage(id) {
    const { pdfViewer } = Data.get(id);
    if (pdfViewer) {
        pdfViewer.currentScaleValue = "page-width";
    }
}

export function rotate(id, step) {
    const { pdfViewer } = Data.get(id);
    if (pdfViewer) {
        let rotate = pdfViewer.pagesRotation || 360;
        rotate += step;
        pdfViewer.pagesRotation = rotate % 360;
    }
}

export function navigateToPage(id, pageNumber) {
    const { pdfViewer } = Data.get(id);
    if (pdfViewer) {
        pdfViewer.currentPageNumber = pageNumber;
    }
}

export function scale(id, scale) {
    const { el, pdfViewer } = Data.get(id);
    if (pdfViewer) {
        pdfViewer.currentScaleValue = scale / 100;

        const minus = el.querySelector(".bb-page-minus");
        const plus = el.querySelector(".bb-page-plus");

        if (scale === "25") {
            minus.classList.add("disabled");
        }
        else if (scale === "500") {
            plus.classList.add("disabled");
        }
        else {
            minus.classList.remove("disabled");
            plus.classList.remove("disabled");
        }
    }
}

const addEventListener = (el, pdfViewer, eventBus, invoke, options) => {
    eventBus.on("pagesinit", async () => {
        if (options.isFitToPage) {
            pdfViewer.currentScaleValue = "page-width";
        }
        else {
            pdfViewer.currentScaleValue = "page-actual";
        }

        const numPages = pdfViewer.pagesCount;
        const countEl = el.querySelector(".bb-view-pagesCount");
        if (countEl) {
            countEl.innerHTML = numPages;
        }

        const toolbarEl = el.querySelector(".bb-view-toolbar");
        if (toolbarEl) {
            toolbarEl.classList.remove("init");
        }

        if (options.triggerPagesInit === true) {
            await invoke.invokeMethodAsync("pagesInit", numPages);
        }
    });

    eventBus.on("pagechanging", async evt => {
        const page = evt.pageNumber;
        const pageNumberEl = el.querySelector(".bb-view-num");
        if (pageNumberEl) {
            pageNumberEl.value = page;
        }

        if (options.triggerPageChanged === true) {
            await invoke.invokeMethodAsync("pageChanged", page);
        }
    }, true);

    const minus = el.querySelector(".bb-page-minus");
    const plus = el.querySelector(".bb-page-plus");
    const scaleEl = el.querySelector(".bb-view-scale");

    eventBus.on("scalechanging", evt => {
        scaleEl.value = `${Math.round(evt.scale * 100, 0)}%`;
    })

    EventHandler.on(minus, "click", e => updateScale(pdfViewer, e.target, -1));
    EventHandler.on(plus, "click", e => updateScale(pdfViewer, e.target, 1));
}

const updateScale = (pdfViewer, button, rate) => {
    if (button.classList.contains('disabled')) {
        return;
    }

    const scale = pdfViewer.currentScale;
    const current = Math.round(parseFloat(scale * 100), 0);
    const step = [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];
    const findValues = step.filter(s => rate > 0 ? current  < s : current > s);
    let v = 100;
    if (rate > 0) {
        v = findValues.shift();
    }
    else {
        v = findValues.pop();
    }
    pdfViewer.currentScaleValue = v / 100;
}

export function dispose(id) {
    Data.remove(id);

    const el = document.getElementById(id);
    if (el) {
        const minus = el.querySelector(".bb-page-minus");
        const plus = el.querySelector(".bb-page-plus");
        EventHandler.off(minus, "click");
        EventHandler.off(plus, "click");
    }
}
