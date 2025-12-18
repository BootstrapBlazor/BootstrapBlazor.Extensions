import './lib/pdf.min.mjs'
import './lib/pdf_viewer.mjs'
import { addLink } from '../BootstrapBlazor/modules/utility.js';
import Data from '../BootstrapBlazor/modules/data.js';
import EventHandler from '../BootstrapBlazor/modules/event-handler.js';

if (pdfjsLib != null) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/_content/BootstrapBlazor.PdfReader/lib/pdf.worker.min.mjs';
}

export async function init(id, invoke, options) {
    await addLink('./_content/BootstrapBlazor.PdfReader/css/pdf_reader.css');

    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    Data.set(id, { el, invoke, options });

    if (options.url) {
        setUrl(id, options.url);
    }
    else {
        setData(id, options.data);
    }
}

export async function setUrl(id, url) {
    const pdf = Data.get(id);
    disposePdf(pdf);

    if (!url) {
        return;
    }

    const { options } = pdf;
    options.url = url;
    options.data = null;
    await loadPdf(pdf);
}

export async function setData(id, data) {
    const pdf = Data.get(id);
    disposePdf(pdf);

    if (!data) {
        return;
    }

    const { options } = pdf;
    options.url = null;
    options.data = data;
    await loadPdf(pdf);
}

export function setScaleValue(id, value) {
    const { pdfViewer } = Data.get(id);
    if (pdfViewer) {
        pdfViewer.currentScaleValue = value;
    }
}

export function rotate(id, step) {
    const { pdfViewer } = Data.get(id);
    if (pdfViewer) {
        rotateView(pdfViewer, step);
    }
}

const rotateView = (pdfViewer, step) => {
    let rotate = pdfViewer.pagesRotation || 360;
    rotate += step;
    pdfViewer.pagesRotation = rotate % 360;
}

export function navigateToPage(id, pageNumber) {
    const { pdfViewer } = Data.get(id);
    if (pdfViewer) {
        pdfViewer.currentPageNumber = pageNumber;
    }
}

export function scale(id, scale) {
    const { pdfViewer } = Data.get(id);
    if (pdfViewer) {
        pdfViewer.currentScaleValue = scale / 100;
    }
}

export function resetToolbar(id) {
    const { el, pdfViewer } = Data.get(id);
    if (pdfViewer) {
        resetToolbarView(el, pdfViewer);
    }
}

export function resetThumbnails(id) {
    const { el, pdfViewer } = Data.get(id);
    if (pdfViewer) {
        resetThumbnailsView(el, pdfViewer);
    }
}

const loadPdf = async pdf => {
    const { el, invoke, options } = pdf;
    const loadingTask = pdfjsLib.getDocument(options);

    const progressEl = el.querySelector('.bb-view-progress');
    if (progressEl) {
        progressEl.classList.add('show');
    }
    const bar = el.querySelector('.bb-view-progress-bar');
    if (bar) {
        bar.style.setProperty('--bb-view-progress-val', '0');
    }

    let progressHandler = null;
    loadingTask.onProgress = function (progressData) {
        const { loaded, total } = progressData;

        if (bar) {
            const val = loaded / total * 100;
            bar.style.setProperty('--bb-view-progress-val', `${Math.min(val, 100)}%`);

            if (progressHandler === null) {
                progressHandler = setTimeout(() => {
                    clearTimeout(progressHandler);
                    progressEl.classList.remove('show');
                }, 300);
            }
        }
    };

    loadingTask.onPassword = function (updatePassword, reason) {
        if (reason === pdfjsLib.PasswordResponses.NEED_PASSWORD) {

        }
        else if (reason === pdfjsLib.PasswordResponses.INCORRECT_PASSWORD) {

        }
    };

    const container = el.querySelector(".bb-view-container");
    const eventBus = new pdfjsViewer.EventBus();
    const pdfViewer = new pdfjsViewer.PDFViewer({
        container,
        eventBus
    });

    resetToolbarView(el, pdfViewer);
    addEventBus(el, pdfViewer, eventBus, invoke, options);

    const pdfDocument = await loadingTask.promise;
    pdfViewer.setDocument(pdfDocument);

    pdfDocument.getMetadata().then(metadata => {
        if (metadata.contentLength === null) {
            metadata.contentLength = options.data.length;
        }
        loadMetadata(el, pdfViewer, metadata);
    });

    pdf.pdfViewer = pdfViewer;
    pdf.loadingTask = loadingTask;
    pdf.observer = setObserver(el);
}

const disposePdf = pdf => {
    const { el, observer, loadingTask } = pdf;

    if (observer) {
        observer.disconnect();
    }

    if (loadingTask && !loadingTask.destroyed) {
        loadingTask.destroy();
    }

    if (el) {
        removeToolbarEventHandlers(el);
        const viewContainer = el.querySelector(".bb-view-container");
        if (viewContainer) {
            [...viewContainer.children].forEach(i => {
                if (i.classList.contains("pdfViewer")) {
                    i.innerHTML = "";
                }
                else {
                    i.remove();
                }
            })
        }

        const thumbnailsContainer = el.querySelector(".bb-view-thumbnails");
        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = "";
        }

        const iframe = el.querySelector(".bb-view-print-iframe");
        if (iframe) {
            iframe.remove();
        }
    }
}

const loadMetadata = (el, pdfViewer, metadata) => {
    const filename = el.querySelector('.bb-view-pdf-dialog-filename');
    const docTitle = el.querySelector('.bb-view-subject');
    if (docTitle) {
        filename.textContent = docTitle.textContent;
    }

    const filesize = el.querySelector('.bb-view-pdf-dialog-file-size');
    filesize.textContent = getFileSize(metadata);

    const title = el.querySelector('.bb-view-pdf-dialog-title');
    const author = el.querySelector('.bb-view-pdf-dialog-author');
    const subject = el.querySelector('.bb-view-pdf-dialog-subject');
    const keywords = el.querySelector('.bb-view-pdf-dialog-keywords');
    const created = el.querySelector('.bb-view-pdf-dialog-created');
    created.textContent = parsePdfDate(metadata.info.CreationDate)?.toLocaleString();

    const modified = el.querySelector('.bb-view-pdf-dialog-modified');

    const application = el.querySelector('.bb-view-pdf-dialog-application');
    application.textContent = metadata.info.Creator;

    const producer = el.querySelector('.bb-view-pdf-dialog-producer');
    producer.textContent = metadata.info.Producer;

    const version = el.querySelector('.bb-view-pdf-dialog-version');
    version.textContent = metadata.info.PDFFormatVersion;

    const count = el.querySelector('.bb-view-pdf-dialog-count');
    count.textContent = pdfViewer.pagesCount;

    const size = el.querySelector('.bb-view-pdf-dialog-size');
    pdfViewer.pdfDocument.getPage(pdfViewer.currentPageNumber).then(page => {
        const viewport = page.getViewport({ scale: 1 });
        size.textContent = `${(viewport.width / 72).toFixed(2)} * ${(viewport.height / 72).toFixed(2)} in (portrait)`;
    });

    const webview = el.querySelector('.bb-view-pdf-dialog-view');
}

function parsePdfDate(pdfDateString) {
    if (!pdfDateString || typeof pdfDateString !== 'string') {
        return null;
    }

    let dateStr = pdfDateString.startsWith('D:') ? pdfDateString.substring(2) : pdfDateString;

    const pdfDateRegex = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})([Zz+-])(\d{2})'?(\d{2})'?$/;
    const match = dateStr.match(pdfDateRegex);

    if (!match) {
        return null;
    }

    const [, year, month, day, hours, minutes, seconds, timezoneSign, timezoneHours, timezoneMinutes] = match;

    const date = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes),
        parseInt(seconds)
    );

    if (timezoneSign === 'Z' || timezoneSign === 'z') {
        const utcTime = Date.UTC(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            parseInt(hours),
            parseInt(minutes),
            parseInt(seconds)
        );
        date.setTime(utcTime);
    }
    else if (timezoneSign === '+' || timezoneSign === '-') {
        const offsetHours = parseInt(timezoneHours);
        const offsetMinutes = parseInt(timezoneMinutes || 0);
        const totalOffsetMinutes = offsetHours * 60 + offsetMinutes;

        if (timezoneSign === '+') {
            date.setMinutes(date.getMinutes() - totalOffsetMinutes);
        }
        else {
            date.setMinutes(date.getMinutes() + totalOffsetMinutes);
        }
    }
    return date;
}

const getFileSize = metadata => {
    const length = metadata.contentLength;
    let val = 0;
    let unit = 'B';
    if (length < 1024) {
        val = length;
    }
    else if (length < 1024 * 1024) {
        unit = 'KB';
        val = length / 1024;
    }
    else if (length < 1024 * 1024 * 1024) {
        unit = 'MB';
        val = length / 1024 / 1024;
    }
    else if (length < 1024 * 1024 * 1024 * 1024) {
        unit = 'GB';
        val = length / 1024 / 1024 / 1024;
    }
    return `${Math.round(val * 100) / 100}${unit}`;
}

const setObserver = el => {
    const observer = new ResizeObserver(entries => {
        relayoutToolbar(el);
    });

    observer.observe(el);
    return observer;
}

const relayoutToolbar = el => {
    const toolbar = el.querySelector(".bb-view-toolbar");
    if (toolbar === null || toolbar.offsetWidth === 0) {
        return;
    }

    const title = el.querySelector(".bb-view-title");
    const subject = el.querySelector(".bb-view-subject");
    if (subject === null) {
        return;
    }

    const groupPage = el.querySelector(".bb-view-group-page");
    const groupScale = el.querySelector(".bb-view-group-scale");
    const groupRotate = el.querySelector(".bb-view-group-rotate");
    const controls = el.querySelector(".bb-view-controls");

    if (el.widths === void 0) {
        el.widths = [subject.offsetWidth, groupRotate.offsetWidth, groupScale.offsetWidth, groupPage.offsetWidth, controls.offsetWidth];
    }

    const getActualWidth = () => title.offsetWidth + groupPage.offsetWidth + groupScale.offsetWidth + groupRotate.offsetWidth + controls.offsetWidth;
    while (getActualWidth() + 8 > toolbar.offsetWidth) {
        if (subject.classList.contains("d-none") === false) {
            subject.classList.add("d-none");
        }
        else if (groupRotate.classList.contains('d-none') === false) {
            groupRotate.classList.add("d-none");
        }
        else if (groupScale.classList.contains('d-none') === false) {
            groupScale.classList.add("d-none");
        }
        else if (groupPage.classList.contains('d-none') === false) {
            groupPage.classList.add("d-none");
        }
        else if (controls.classList.contains('d-none') === false) {
            controls.classList.add("d-none");
        }
    }

    if (controls.classList.contains('d-none')) {
        if (getActualWidth() + el.widths[4] < toolbar.offsetWidth) {
            controls.classList.remove("d-none");
        }
    }
    else if (groupPage.classList.contains('d-none')) {
        if (getActualWidth() + el.widths[3] < toolbar.offsetWidth) {
            groupPage.classList.remove("d-none");
        }
    }
    else if (groupScale.classList.contains('d-none')) {
        if (getActualWidth() + el.widths[2] < toolbar.offsetWidth) {
            groupScale.classList.remove("d-none");
        }
    }
    else if (groupRotate.classList.contains('d-none')) {
        if (getActualWidth() + el.widths[1] < toolbar.offsetWidth) {
            groupRotate.classList.remove("d-none");
        }
    }
    else if (subject.classList.contains("d-none")) {
        if (getActualWidth() + el.widths[0] < toolbar.offsetWidth) {
            subject.classList.remove("d-none");
        }
    }
}

const addEventBus = (el, pdfViewer, eventBus, invoke, options) => {
    eventBus.on("pagesinit", async () => {
        if (options.fitMode) {
            pdfViewer.currentScaleValue = fitMode;
        }

        const numPages = pdfViewer.pagesCount;
        const countEl = el.querySelector(".bb-view-pagesCount");
        if (countEl) {
            countEl.innerHTML = numPages;
        }

        if (options.triggerPagesInit === true) {
            await invoke.invokeMethodAsync("PagesInit", numPages);
        }
    });

    eventBus.on("pagesloaded", async e => {
        if (options.triggerPagesLoaded === true) {
            await invoke.invokeMethodAsync("PagesLoaded", e.pagesCount);
        }

        if (options.currentPage !== 1) {
            pdfViewer.currentPageNumber = options.currentPage;
        }

        if (options.enableThumbnails) {
            resetThumbnailsView(el, pdfViewer);
        }

        addToolbarEventHandlers(el, pdfViewer, invoke, options);
    })

    eventBus.on("pagechanging", async evt => {
        const page = evt.pageNumber;
        const pageNumberEl = el.querySelector(".bb-view-num");
        if (pageNumberEl) {
            pageNumberEl.value = page;
        }

        if (options.enableThumbnails || false) {
            const thumbnailsContainer = el.querySelector(".bb-view-thumbnails");
            if (thumbnailsContainer) {
                const active = thumbnailsContainer.querySelector('.active');
                active.classList.remove('active');

                const item = thumbnailsContainer.querySelector(`[data-bb-page='${page}']`);
                item.classList.add("active");
                item.scrollIntoView({ behavior: 'smooth', block: "nearest", inline: "start" });
            }
        }

        if (options.triggerPageChanged === true) {
            await invoke.invokeMethodAsync("PageChanged", page);
        }
    }, true);


    eventBus.on("scalechanging", async evt => {
        updateScaleValue(el, evt.scale);

        if (options.triggerScaleChanged) {
            await invoke.invokeMethodAsync("ScaleChanged", evt.scale);
        }
    })

    eventBus.on("rotationchanging", async evt => {
        const thumbnailsContainer = el.querySelector(".bb-view-thumbnails");
        if (thumbnailsContainer) {
            thumbnailsContainer.style.setProperty('--thumb-rotate', `${evt.pagesRotation}deg`);
        }

        if (options.triggerRotationChanged) {
            await invoke.invokeMethodAsync("RotationChanged", evt.pagesRotation);
        }
    })
}

const addToolbarEventHandlers = (el, pdfViewer, invoke, options) => {
    const toolbar = el.querySelector(".bb-view-toolbar");
    [...el.querySelectorAll('.invisible')].forEach(i => {
        i.classList.remove('invisible');
    });

    EventHandler.on(toolbar, "click", '.bb-view-bar', e => {
        const thumbnailsEl = el.querySelector(".bb-view-thumbnails");
        thumbnailsEl.classList.toggle("show");
    });
    EventHandler.on(toolbar, "change", '.bb-view-num', e => {
        let pageNumber = parseInt(e.delegateTarget.value) || 1;
        if (pageNumber < 1) {
            pageNumber = 1;
        }
        if (pageNumber > pdfViewer.pagesCount) {
            pageNumber = pdfViewer.pagesCount;
        }
        pdfViewer.currentPageNumber = pageNumber;
    });
    EventHandler.on(toolbar, "click", '.bb-page-minus', e => updateScale(pdfViewer, e.delegateTarget, -1));
    EventHandler.on(toolbar, "click", '.bb-page-plus', e => updateScale(pdfViewer, e.delegateTarget, 1));
    EventHandler.on(toolbar, 'click', '.bb-view-fit-width', e => {
        const group = el.querySelector('.bb-view-group-rotate');
        group.classList.remove('fit-height')
        pdfViewer.currentScaleValue = 'page-width';
    });
    EventHandler.on(toolbar, 'click', '.bb-view-fit-height', e => {
        const group = el.querySelector('.bb-view-group-rotate');
        group.classList.add('fit-height')
        pdfViewer.currentScaleValue = 'page-height';
    });
    EventHandler.on(toolbar, 'click', '.bb-view-page-actual', e => {
        const group = el.querySelector('.bb-view-group-rotate');
        group.classList.remove('fit-height')
        pdfViewer.currentScaleValue = 'page-actual';
    });
    EventHandler.on(toolbar, 'change', '.bb-view-scale-input', e => {
        let value = parseInt(e.delegateTarget.value);
        if (value < 25) {
            value = 25;
        }
        else if (value > 500) {
            value = 500;
        }
        pdfViewer.currentScale = value / 100;
    });
    EventHandler.on(toolbar, 'focus', '.bb-view-scale-input, .bb-view-num', e => {
        e.delegateTarget.select();
    });
    EventHandler.on(toolbar, 'click', '.bb-view-rotate-left', e => {
        rotateView(pdfViewer, -90);
    });
    EventHandler.on(toolbar, 'click', '.bb-view-rotate-right', e => {
        rotateView(pdfViewer, 90);
    });
    EventHandler.on(toolbar, "click", ".bb-view-print", async e => {
        await printPdf(el, options);
        await invoke.invokeMethodAsync("Printing");
    })
    EventHandler.on(toolbar, "click", ".dropdown-item-pages", async e => {
        e.delegateTarget.classList.toggle("active");

        if (pdfViewer.spreadMode !== 1) {
            pdfViewer.spreadMode = 1;
        }
        else {
            pdfViewer.spreadMode = 0;
        }
    });
    EventHandler.on(toolbar, "click", ".bb-view-download", async e => {
        let fileName = el.getAttribute('data-bb-download');
        if (fileName === null) {
            const docTitle = el.querySelector('.bb-view-subject');
            if (docTitle) {
                fileName = docTitle.textContent;
            }
        }
        await downloadPdf(options, fileName);
    });

    EventHandler.on(toolbar, "click", ".dropdown-item-presentation", async e => {
        e.delegateTarget.classList.toggle("active");

        //if (pdfViewer.isInPresentationMode) {
        //    document.exitFullscreen();
        //}
        //else {
        //    el.requestFullscreen();
        //}
    });
    EventHandler.on(toolbar, "click", ".dropdown-item-doc", e => {
        const dialog = el.querySelector(".bb-view-pdf-info");
        if (dialog) {
            dialog.classList.add("show");
        }

        const backdrop = el.querySelector(".bb-view-pdf-backdrop");
        if (backdrop) {
            backdrop.classList.add("show");
        }
    });

    const closeButton = el.querySelector(".btn-close-doc");
    EventHandler.on(closeButton, 'click', e => {
        const dialog = el.querySelector(".bb-view-pdf-info");
        if (dialog) {
            dialog.classList.remove("show");
        }

        const backdrop = el.querySelector(".bb-view-pdf-backdrop");
        if (backdrop) {
            backdrop.classList.remove("show");
        }
    });
}

const downloadPdf = async (options, fileName) => {
    if (fileName === null) {
        fileName = "download.pdf";
    }

    await getPdfUrl(options, url => {
        const anchorElement = document.createElement('a');
        anchorElement.href = url;
        anchorElement.download = fileName;
        document.body.appendChild(anchorElement);
        anchorElement.click();
        document.body.removeChild(anchorElement);

        return new Promise((resolve, reject) => {
            resolve();
        });
    });
}

const removeToolbarEventHandlers = el => {
    if (el) {
        const towPagesOneView = el.querySelector(".dropdown-item-pages");
        if (towPagesOneView) {
            EventHandler.off(towPagesOneView, "click");
        }

        const toolbar = el.querySelector(".bb-view-toolbar");
        if (toolbar) {
            EventHandler.off(toolbar, "click");
            EventHandler.off(toolbar, "change");
            EventHandler.off(toolbar, "focus");
        }

        const thumbnailsContainer = el.querySelector(".bb-view-thumbnails");
        if (thumbnailsContainer) {
            EventHandler.off(thumbnailsContainer, "click");
        }

        const iframe = document.querySelector('.bb-view-print-iframe');
        if (iframe) {
            iframe.remove();
        }

        const closeButton = el.querySelector(".btn-close-doc");
        if (closeButton) {
            EventHandler.off(closeButton, "click");
        }
    }
}

const resetToolbarView = (el, pdfViewer) => {
    const scaleEl = el.querySelector(".bb-view-scale-input");
    if (scaleEl) {
        updateScaleValue(el, pdfViewer.currentScale);
    }

    const pageEl = el.querySelector(".bb-view-num");
    if (pageEl) {
        pageEl.value = pdfViewer.currentPageNumber;
    }

    const group = el.querySelector('.bb-view-group-rotate');
    if (group) {
        if (pdfViewer.currentScaleValue === 'page-height') {
            group.classList.add('fit-height');
        }
        else {
            group.classList.remove('fit-height');
        }
    }

    const twoPagesOneView = el.querySelector(".dropdown-item-pages");
    if (twoPagesOneView) {
        if (pdfViewer.spreadMode === 1) {
            twoPagesOneView.classList.add("active");
        }
        else {
            twoPagesOneView.classList.remove("active");
        }
    }

    delete el.widths
    relayoutToolbar(el);
}

const resetThumbnailsView = (el, pdfViewer) => {
    const thumbnailsContainer = el.querySelector(".bb-view-thumbnails");
    pdfViewer.getPagesOverview().map(async (p, i) => {
        const item = document.createElement("div");
        item.classList.add("bb-view-thumbnail-item");
        if (pdfViewer.currentPageNumber === i + 1) {
            item.classList.add("active");
        }
        item.setAttribute("data-bb-page", `${i + 1}`);
        thumbnailsContainer.appendChild(item);

        const page = await pdfViewer.pdfDocument.getPage(i + 1);
        const canvas = await makeThumb(page);
        const group = document.createElement("div");
        group.classList.add("bb-view-thumbnail-group");
        const img = document.createElement("img");
        img.src = canvas.toDataURL();
        group.appendChild(img);

        const label = document.createElement("label");
        label.textContent = `${i + 1}`;
        group.appendChild(label);

        item.appendChild(group);
    });

    EventHandler.on(thumbnailsContainer, "click", ".bb-view-thumbnail-item", e => {
        const active = thumbnailsContainer.querySelector('.active');
        if (active) {
            active.classList.remove('active');
        }

        const item = e.delegateTarget;
        item.classList.add("active");

        const index = parseInt(item.getAttribute("data-bb-page")) || 1;
        pdfViewer.currentPageNumber = index;
    });
}

const updateScaleValue = (el, value) => {
    const minus = el.querySelector(".bb-page-minus");
    const plus = el.querySelector(".bb-page-plus");
    const scaleEl = el.querySelector(".bb-view-scale-input");

    const scale = value * 100;
    scaleEl.value = `${Math.round(scale)}%`;

    if (scale === 25) {
        minus.classList.add("disabled");
    }
    else if (scale === 500) {
        plus.classList.add("disabled");
    }
    else {
        minus.classList.remove("disabled");
        plus.classList.remove("disabled");
    }
}

const updateScale = (pdfViewer, button, rate) => {
    if (button.classList.contains('disabled')) {
        return;
    }

    const scale = pdfViewer.currentScale;
    const current = Math.round(parseFloat(scale * 100));
    const step = [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];
    const findValues = step.filter(s => rate > 0 ? current < s : current > s);
    if (findValues.length === 0) {
        return;
    }

    let v = 100;
    if (rate > 0) {
        v = findValues.shift();
    }
    else {
        v = findValues.pop();
    }
    pdfViewer.currentScaleValue = v / 100;
}

const makeThumb = async page => {
    const outputScale = window.devicePixelRatio || 1;
    const vp = page.getViewport({ scale: 1 });
    const canvas = document.createElement("canvas");
    const scaleSize = 1;
    canvas.width = vp.width * scaleSize * outputScale;
    canvas.height = vp.height * scaleSize * outputScale;

    await page.render({
        canvasContext: canvas.getContext("2d"),
        viewport: page.getViewport({ scale: scaleSize * outputScale })
    }).promise;

    return canvas;
}

const printPdf = async (el, options) => {
    let iframe = el.querySelector(".bb-view-print-iframe");
    if (iframe === null) {
        iframe = document.createElement("iframe");
        iframe.classList.add("bb-view-print-iframe");
        iframe.style.position = "fixed";
        iframe.style.right = "100%";
        iframe.style.bottom = "100%";
        el.appendChild(iframe);
    }

    await getPdfUrl(options, url => {
        iframe.src = url;
        iframe.onload = () => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };
        return new Promise((resolve, reject) => {
            resolve();
        });
    });
}

const getPdfUrl = async (options, callback) => {
    if (options.url) {
        callback(options.url);
    }
    else if (options.data) {
        const blob = new Blob([options.data], { type: 'application/pdf' });
        var url = window.URL.createObjectURL(blob);
        await callback(url);
        window.URL.revokeObjectURL(url);
    }
}

export function dispose(id) {
    const pdf = Data.get(id);
    Data.remove(id);

    disposePdf(pdf);
}
