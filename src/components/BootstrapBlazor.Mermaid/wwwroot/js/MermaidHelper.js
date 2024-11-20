import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: false });

export async function render(id, graphDefinition) {
    var result = await mermaid.render(id + '-svg', graphDefinition);
    return result.svg;
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
