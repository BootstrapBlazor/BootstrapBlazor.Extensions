import EmbedPDF from './embedpdf.js';

export function init(id, invoke) {
    const el = document.getElementById(id);
    if (el === null) {
        return null;
    }

    const target = el.querySelector('.pdf-viewer');
    const src = './samples/sample.pdf';
    const wasmUrl = `${location.origin}/_content/BootstrapBlazor.EmbedPDF/pdfium.wasm`;
    EmbedPDF.init({
        type: 'container',
        target: el,
        src,
        worker: true,
        tabBar: 'always',
        theme: {
            preference: 'system'
        },
        wasmUrl
    });
}
