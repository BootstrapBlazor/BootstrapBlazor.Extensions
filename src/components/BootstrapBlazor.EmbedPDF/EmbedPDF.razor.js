import Data from '../BootstrapBlazor/modules/data.js'
import EventHandler from "../BootstrapBlazor/modules/event-handler.js"
import EmbedPDF from './embedpdf.js'
import { getTheme, registerBootstrapBlazorModule } from '../BootstrapBlazor/modules/utility.js'

export async function init(id, invoke, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return null;
    }

    const target = el.querySelector('.pdf-viewer');
    const { src, tabBar, theme, lang, currentPage, scrollStrategy, pageGap } = options;
    const wasmUrl = `${location.origin}/_content/BootstrapBlazor.EmbedPDF/pdfium.wasm`;

    let preference = theme;
    if (preference === 'system') {
        preference = getTheme();
    }

    let currentPageGap = pageGap;
    if (currentPageGap === 0) {
        currentPageGap = 20;
    }

    const viewer = EmbedPDF.init({
        type: 'container',
        target: el,
        src,
        worker: true,
        tabBar,
        theme: {
            preference: preference
        },
        wasmUrl,
        i18n: {
            defaultLocale: lang,
            fallbackLocale: 'en'
        },
        scroll: {
            defaultStrategy: scrollStrategy,
            defaultPageGap: currentPageGap
        }
    });

    registerBootstrapBlazorModule('EmbedPDF', id, () => {
        EventHandler.on(document, 'changed.bb.theme', updateTheme);
    });

    Data.set(id, { el, invoke, options, viewer });

    const registry = await viewer.registry;
    const scroll = registry.getPlugin('scroll').provides();

    if (currentPage !== 0) {
        scroll.onLayoutReady((event) => {
            scroll.scrollToPage({
                pageNumber: currentPage,
                behavior: 'instant'
            });
        });
    }
}

export async function setUrl(id, url) {
    const pdf = Data.get(id);
    const { viewer } = pdf;

    if (viewer) {
        const registry = await viewer.registry;
        const docManager = registry.getPlugin('document-manager').provides();
        const name = getFileName(url);
        docManager.openDocumentUrl({
            url,
            name,
            documentId: name,
            autoActivate: true
        });
    }
}

export function setTheme(id, theme) {
    const pdf = Data.get(id);
    const { viewer } = pdf;

    if (viewer) {
        viewer.setTheme(theme);
    }
}

export async function setLocale(id, locale) {
    const pdf = Data.get(id);
    const { viewer } = pdf;

    if (viewer) {
        const registry = await viewer.registry;
        const i18n = registry.getPlugin('i18n').provides();
        i18n.setLocale(locale);
    }
}

export async function setScrollStrategy(id, strategy) {
    const pdf = Data.get(id);
    const { viewer } = pdf;

    if (viewer) {
        const registry = await viewer.registry;
        const scroll = registry.getPlugin('scroll').provides();
        scroll.setScrollStrategy(strategy);
    }
}

export function dispose(id) {
    const pdf = Data.get(id);
    Data.remove(id);

    const { EmbedPDF } = window.BootstrapBlazor;
    if (EmbedPDF) {
        EmbedPDF.dispose(id, () => {
            EventHandler.off(document, 'changed.bb.theme', updateTheme);
        });
    }
}

const updateTheme = e => {
    const theme = e.theme;

    [...document.querySelectorAll('.bb-embed-pdf')].forEach(s => {
        const id = s.getAttribute('id');
        if (id) {
            const pdf = Data.get(id);
            if (pdf) {
                const { viewer } = pdf;
                if (viewer) {
                    viewer.setTheme(theme);
                }
            }
        }
    });
}

function getFileName(filePath) {
    const lastSeparatorIndex = Math.max(
        filePath.lastIndexOf('/'),
        filePath.lastIndexOf('\\')
    );
    return filePath.substring(lastSeparatorIndex + 1);
}
