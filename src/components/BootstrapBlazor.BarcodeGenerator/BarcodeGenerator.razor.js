import './JsBarcode.all.min.js';

export function generate(id, value, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    if (typeof (JsBarcode) !== 'function') {
        console.error('import JsBarcode failed');
    }

    const svg = el.querySelector("svg");
    JsBarcode(svg, value, options);
    return svg.outerHTML;
}
