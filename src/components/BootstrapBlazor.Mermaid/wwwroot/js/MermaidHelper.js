import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: false });

export async function init(id) {
    mermaid.initialize({ startOnLoad: false })
    const el = document.getElementById(id);
    if (el) {
        const childNodes = el.childNodes;
        for (let i = childNodes.length - 1; i >= 0; i--) {
            const node = childNodes[i];
            if (node.nodeType === Node.COMMENT_NODE) {
                el.removeChild(node);
            }
        }
    }
    const graphDefinition = el.textContent;
    mermaid.render(id + '-svg', graphDefinition).then((svgCode) => {
        el.innerHTML = svgCode.svg;
    });
}


export function getContent(id) {
    let svgDataUrl = "";
    const el = document.getElementById(id);
    if (el) {
        const svgElement = el.childNodes[0];
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const utf8Array = new TextEncoder().encode(svgString);
        svgDataUrl = 'data:image/svg+xml;base64,' + btoa(String.fromCharCode(...utf8Array));
    }
    return svgDataUrl;
}

