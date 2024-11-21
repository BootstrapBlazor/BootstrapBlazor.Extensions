import mermaid from './mermaid.esm.min.mjs';

export async function init(id, content) {
    mermaid.initialize({ startOnLoad: false });

    const render = await mermaid.render(id + '-svg', content);
    if (render) {
        const el = document.getElementById(id);
        el.innerHTML = render.svg;
    }
}
export function getContent(id) {
    let svgDataUrl = "";
    const el = document.getElementById(id);
    if (el) {
        for (let e in el.childNodes) {
            if (el.childNodes[e].nodeName == "svg") {
                const svgElement = el.childNodes[e];
                const serializer = new XMLSerializer();
                const svgString = serializer.serializeToString(svgElement);
                const utf8Array = new TextEncoder().encode(svgString);
                svgDataUrl = 'data:image/svg+xml;base64,' + btoa(String.fromCharCode(...utf8Array));
                return svgDataUrl;
            }
        }
    }
}
