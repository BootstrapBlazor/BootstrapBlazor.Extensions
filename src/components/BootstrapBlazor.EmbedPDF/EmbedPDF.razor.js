import Data from '../BootstrapBlazor/modules/data.js';
import EventHandler from "../BootstrapBlazor/modules/event-handler.js"
import { default as EmbedPDF, UIPlugin } from './embedpdf.js';
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

export function setUrl(id, url) {

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
