import Data from '../BootstrapBlazor/modules/data.js'
import EventHandler from "../BootstrapBlazor/modules/event-handler.js"
import { default as EmbedPDF, DocumentManagerPlugin } from './embedpdf.js'
import { getTheme, registerBootstrapBlazorModule } from '../BootstrapBlazor/modules/utility.js'

export function init(id, invoke, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return null;
    }

    const target = el.querySelector('.pdf-viewer');
    const { src, tabBar, theme } = options;
    const wasmUrl = `${location.origin}/_content/BootstrapBlazor.EmbedPDF/pdfium.wasm`;

    let preference = theme;
    if (preference === 'system') {
        preference = getTheme();
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
        wasmUrl
    });

    registerBootstrapBlazorModule('EmbedPDF', id, () => {
        EventHandler.on(document, 'changed.bb.theme', updateTheme);
    });

    Data.set(id, { el, invoke, options, viewer });
}

export async function setUrl(id, url) {
    if (url) {
        const pdf = Data.get(id);
        const { viewer } = pdf;

        if (viewer) {
            const registry = await viewer.registry;
            const docManager = registry.getPlugin('document-manager').provides();
            docManager.openDocumentUrl({
                url,
                documentId: getFileName(url),
                autoActivate: true
            });
        }
    }
}

export function setTheme(id, theme) {
    const pdf = Data.get(id);
    const { viewer } = pdf;
    if (viewer) {
        viewer.setTheme(theme);
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
