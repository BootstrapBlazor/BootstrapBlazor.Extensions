import { addScript } from '../BootstrapBlazor/modules/utility.js'

export async function init(id) {
    await addScript('./_content/BootstrapBlazor.Mermaid/Mermaid.js')

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
    mermaid.contentLoaded();
}

export function getContent(id) {
    let svgDataUrl = "";
    const el = document.getElementById(id);
    if (el) {
        const svgElement = el.childNodes[0];
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        svgDataUrl = 'data:image/svg+xml;base64,' + btoa(encodeURIComponent(svgString));
    }
    return svgDataUrl;
}

export function dispose(id) {

}
