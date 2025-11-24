import './lib/pdf.min.mjs'
import './lib/pdf_viewer.mjs'
import { addLink } from '../BootstrapBlazor/modules/utility.js';
import Data from '../BootstrapBlazor/modules/data.js';

if (pdfjsLib != null) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.min.mjs';
}

export async function init(id, invoke, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    await addLink('./_content/BootstrapBlazor.PdfReader/css/pdf.css');

    const loadingTask = pdfjsLib.getDocument(options);
    loadingTask.onProgress = function (progressData) {
        console.log(progressData.loaded, progressData.total);
    };

    // handle password only when required (optional password support)
    loadingTask.onPassword = function (updatePassword, reason) {
        if (reason === pdfjsLib.PasswordResponses.NEED_PASSWORD) {
            // only prompt if PDF actually requires password
            const password = prompt("This PDF is password protected. Enter password:");
            updatePassword(password);
        } else if (reason === pdfjsLib.PasswordResponses.INCORRECT_PASSWORD) {
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


    eventBus.on("pagesinit", function () {
        if (options.isFitToPage) {
            pdfViewer.currentScaleValue = 1.0;
        }
        else {
            pdfViewer.currentScaleValue = "page-width";
        }
    });

    // handle the promise
    const pdfDocument = await loadingTask.promise;
    pdfViewer.setDocument(pdfDocument);

    //    pdfDocument.then(function (doc) {
    //        pdf.pdfDoc = doc;
    //        pdf.pagesCount = doc.numPages;
    //        renderPage(pdf, pdf.pageNum);

    //        // notify .NET side that document is loaded
    //        invoke.invokeMethodAsync('DocumentLoaded', {
    //            pagesCount: pdf.pagesCount,
    //            pageNumber: pdf.pageNum
    //        });
    //    })
    //        .catch(function (error) {
    //            console.error("PDF loading error:", error);

    //            // handle password exceptions specifically
    //            if (error.name === "PasswordException") {
    //                console.error("Password required but not provided");
    //            }

    //            // notify .NET side that document loading failed
    //            invoke.invokeMethodAsync('DocumentLoadError', error.message);
    //        });

    Data.set(id, pdfViewer);
}

export function fitToPage(id) {
    const pdfViewer = Data.get(id);
    if (pdfViewer) {
        pdfViewer.currentScaleValue = 1.0;
    }
}

export function fitToWidth(id) {
    const pdfViewer = Data.get(id);
    if (pdfViewer) {
        pdfViewer.currentScaleValue = "page-width";
    }
}

export function dispose(id) {
    Data.get(id);
}

function getCanvas(item) {
    if (isDomSupported() && typeof item === 'string') {
        item = document.getElementById(item);
    } else if (item && item.length) {
        // support for array based queries
        item = item[0];
    }

    if (item && item.canvas !== undefined && item.canvas) {
        // support for any object associated to a canvas (including a context2d)
        item = item.canvas;
    }

    return item;
}

const getPdf = (key) => {
    const canvas = getCanvas(key);
    return Object.values(pdfInstances).filter((c) => c.canvas === canvas).pop();
};

const pdfInstances = {};

class Pdf {
    static instances = pdfInstances;
    static getPdf = getPdf;

    constructor(item) {
        const canvas = getCanvas(item);

        this.id = canvas.id;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.pdfDoc = null;
        this.pageNum = 1;
        this.pagesCount = 0;
        this.pageRendering = false;
        this.pageNumPending = null;
        this.scale = 1;
        this.rotation = 0;

        pdfInstances[this.id] = this;
    }
}

export function navigateToPage(id, pageNumber) {
    const pdf = Data.get(id);
    pdf.currentPageNumber = pageNumber;
}

export function firstPage(invoke, elementId) {
    const pdf = getPdf(elementId);

    if (pdf == null || pdf.pageNum === 1)
        return;

    if (pdf.pageNum > 1)
        pdf.pageNum = 1;

    queueRenderPage(pdf, pdf.pageNum);

    setPdfViewerMetaData(invoke, pdf);
}

export function gotoPage(invoke, elementId, gotoPageNum) {
    const pdf = getPdf(elementId);

    if (pdf == null || gotoPageNum < 1 || gotoPageNum > pdf.pagesCount)
        return;

    pdf.pageNum = gotoPageNum;

    queueRenderPage(pdf, pdf.pageNum);

    setPdfViewerMetaData(invoke, pdf);
}

export function lastPage(invoke, elementId) {
    const pdf = getPdf(elementId);

    if (pdf == null || (pdf.pageNum === 1 && pdf.pageNum === pdf.pagesCount))
        return;

    if (pdf.pageNum < pdf.pagesCount)
        pdf.pageNum = pdf.pagesCount;

    queueRenderPage(pdf, pdf.pageNum);

    setPdfViewerMetaData(invoke, pdf);
}

export function nextPage(invoke, elementId) {
    const pdf = getPdf(elementId);

    if (pdf == null || pdf.pageNum === pdf.pagesCount)
        return;

    if (pdf.pageNum < pdf.pagesCount)
        pdf.pageNum += 1;

    queueRenderPage(pdf, pdf.pageNum);

    setPdfViewerMetaData(invoke, pdf);
}

export function previousPage(invoke, elementId) {
    const pdf = getPdf(elementId);

    if (pdf == null || pdf.pageNum === 0 || pdf.pageNum === 1)
        return;

    if (pdf.pageNum > 0)
        pdf.pageNum -= 1;

    queueRenderPage(pdf, pdf.pageNum);

    setPdfViewerMetaData(invoke, pdf);
}

export async function print(invoke, elementId, url) {
    const pdfDoc = await pdfjsLib.getDocument(url).promise;
    const pageRange = [1, 2, 3, 4]; // TODO: update this

    const iframeEl = document.createElement('iframe');
    iframeEl.style = 'display:none';
    document.body.appendChild(iframeEl);

    for (const pageNumber of pageRange) {
        const page = await pdfDoc.getPage(pageNumber);

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const ctx = canvas.getContext('2d');

        const renderContext = {
            //intent: 'print',
            canvasContext: ctx,
            viewport: viewport
        };
        await page.render(renderContext).promise;

        const iframeDoc = iframeEl.contentWindow.document;
        iframeDoc.body.appendChild(canvas);
    }

    setTimeout(() => {
        iframeEl.contentWindow.print();
        iframeEl.remove();
    },
        1000);
}

export function rotate(invoke, elementId, rotation) {
    const pdf = getPdf(elementId);

    if (pdf == null || Number.isNaN(rotation) || rotation % 90 !== 0)
        return;

    pdf.rotation = rotation;

    queueRenderPage(pdf, pdf.pageNum);
}

export function zoomInOut(invoke, elementId, scale) {
    const pdf = getPdf(elementId);

    if (pdf == null)
        return;

    if (!Number.isNaN(scale))
        pdf.scale = scale;

    queueRenderPage(pdf, pdf.pageNum);
}

function isDomSupported() {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function queueRenderPage(pdf, num) {
    if (pdf.pageRendering) {
        pdf.pageNumPending = num;
    } else {
        renderPage(pdf, num);
    }
}

function renderPage(pdf, num) {
    pdf.pageRendering = true;

    // Using promise to fetch the page
    pdf.pdfDoc.getPage(num).then((page) => {
        const viewport = page.getViewport({ scale: pdf.scale, rotation: pdf.rotation });
        const dpr = window.devicePixelRatio || 1;

        pdf.canvas.height = viewport.height * dpr;
        pdf.canvas.width = viewport.width * dpr;

        pdf.ctx.scale(dpr, dpr);

        pdf.canvas.style.height = viewport.height + 'px';
        pdf.canvas.style.width = viewport.width + 'px';

        // Render PDF page into canvas context
        const renderContext = {
            canvasContext: pdf.ctx,
            viewport: viewport
        };

        const renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(() => {
            pdf.pageRendering = false;
            if (pdf.pageNumPending !== null) {
                // New page rendering is pending
                renderPage(pdf, pdf.pageNumPending);
                pdf.pageNumPending = null;
            }
        })
            .catch((error) => {
                // TODO: track exception
            });
    });
}

function setPdfViewerMetaData(invoke, pdf) {
    if (invoke == null)
        return;

    invoke.invokeMethodAsync('SetPdfViewerMetaData', { pagesCount: pdf.pagesCount, pageNumber: pdf.pageNum });
}
