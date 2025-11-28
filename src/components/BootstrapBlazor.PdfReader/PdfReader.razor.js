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

    const pdfViewer = await loadPdf(el, invoke, options);
    setObserver(el);

    Data.set(id, { el, pdfViewer });
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
    const { pdfViewer } = Data.get(id);
    if (pdfViewer) {
        pdfViewer.currentScaleValue = scale / 100;
    }
}

export function resetThumbnails(id) {
    const { el, pdfViewer } = Data.get(id);
    if (pdfViewer) {
        resetThumbnailsView(el, pdfViewer);
    }
}

const loadPdf = async (el, invoke, options) => {
    const loadingTask = pdfjsLib.getDocument(options);
    loadingTask.onProgress = function (progressData) {

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

    addEventListener(el, pdfViewer, eventBus, invoke, options);

    const pdfDocument = await loadingTask.promise;
    pdfViewer.setDocument(pdfDocument);

    return pdfViewer;
}

const setObserver = el => {
    const observer = new ResizeObserver(entries => {
        console.log(entries);
    });

    observer.observe(el);
}

const addEventListener = (el, pdfViewer, eventBus, invoke, options) => {
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
        if (options.enableThumbnails) {
            resetThumbnailsView(el, pdfViewer);
        }

        if (options.triggerPagesLoaded === true) {
            await invoke.invokeMethodAsync("PagesLoaded", e.pagesCount);
        }

        const controls = el.querySelector(".bb-view-controls");
        EventHandler.on(controls, "click", ".bb-view-print", async e => {
            printPdf(options.url);
            await invoke.invokeMethodAsync("Printing");
        });
        EventHandler.on(controls, "click", ".dropdown-item-pages", async e => {
            e.delegateTarget.classList.toggle("active");

            if (pdfViewer.spreadMode !== 1) {
                pdfViewer.spreadMode = 1;
            }
            else {
                pdfViewer.spreadMode = 0;
            }
        });
        EventHandler.on(controls, "click", ".dropdown-item-presentation", async e => {
            e.delegateTarget.classList.toggle("active");

            //if (pdfViewer.isInPresentationMode) {
            //    document.exitFullscreen();
            //}
            //else {
            //    el.requestFullscreen();
            //}
        });
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
            await invoke.invokeMethodAsync("pageChanged", page);
        }
    }, true);

    const minus = el.querySelector(".bb-page-minus");
    const plus = el.querySelector(".bb-page-plus");
    const scaleEl = el.querySelector(".bb-view-scale-input");

    eventBus.on("scalechanging", evt => {
        const scale = evt.scale * 100;
        scaleEl.value = `${Math.round(scale, 0)}%`;

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
    })

    EventHandler.on(minus, "click", e => updateScale(pdfViewer, e.target, -1));
    EventHandler.on(plus, "click", e => updateScale(pdfViewer, e.target, 1));

    const titleEl = el.querySelector(".bb-view-title");
    if (titleEl) {
        EventHandler.on(titleEl, "click", '.bb-view-bar', e => {
            const thumbnailsEl = el.querySelector(".bb-view-thumbnails");
            thumbnailsEl.classList.toggle("show");
        });
    }

    eventBus.on("rotationchanging", evt => {
        const thumbnailsContainer = el.querySelector(".bb-view-thumbnails");
        if (thumbnailsContainer) {
            thumbnailsContainer.style.setProperty('--thumb-rotate', `${evt.pagesRotation}deg`);
        }
    })
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

const updateScale = (pdfViewer, button, rate) => {
    if (button.classList.contains('disabled')) {
        return;
    }

    const scale = pdfViewer.currentScale;
    const current = Math.round(parseFloat(scale * 100), 0);
    const step = [25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];
    const findValues = step.filter(s => rate > 0 ? current < s : current > s);
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

const printPdf = url => {
    let iframe = document.querySelector(".bb-view-print-iframe");
    if (iframe) {
        iframe.remove();
    }

    iframe = document.createElement("iframe");
    iframe.classList = "bb-view-print-iframe";
    iframe.style.position = "fixed";
    iframe.style.right = "100%";
    iframe.style.bottom = "100%";
    iframe.src = url;

    iframe.onload = () => {
        iframe.contentWindow.addEventListener('afterprint', function () {
            document.body.removeChild(iframe);
        });

        iframe.contentWindow.focus();
        iframe.contentWindow.print();
    };

    document.body.appendChild(iframe);
}

export function dispose(id) {
    Data.remove(id);

    const el = document.getElementById(id);
    if (el) {
        const minus = el.querySelector(".bb-page-minus");
        const plus = el.querySelector(".bb-page-plus");
        if (minus) {
            EventHandler.off(minus, "click");
        }
        if (plus) {
            EventHandler.off(plus, "click");
        }

        const towPagesOneView = el.querySelector(".dropdown-item-pages");
        if (towPagesOneView) {
            EventHandler.off(towPagesOneView, "click");
        }

        const titleEl = el.querySelector(".bb-view-title");
        if (titleEl) {
            EventHandler.off(titleEl, "click");
        }

        const thumbnailsContainer = el.querySelector(".bb-view-thumbnails");
        if (thumbnailsContainer) {
            EventHandler.off(thumbnailsContainer, "click");
        }

        const controls = el.querySelector(".bb-view-controls");
        EventHandler.off(controls, "click");

        const iframe = document.querySelector('.bb-view-print-iframe');
        if (iframe) {
            iframe.remove();
        }
    }
}
