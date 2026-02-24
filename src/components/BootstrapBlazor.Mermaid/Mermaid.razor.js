import { addScript } from '../BootstrapBlazor/modules/utility.js'

export async function init(id, content) {
    await addScript('./_content/BootstrapBlazor.Mermaid/mermaid.min.js');

    await render(id, content);
}

export async function render(id, content) {
    mermaid.initialize({ startOnLoad: false });
    const render = await mermaid.render(`${id}-svg`, content);
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
                const encodedString = encodeURIComponent(svgString);
                svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodedString));
                return svgDataUrl;
            }
        }
    }
}

export function getSvgHtml(id) {
    const el = document.getElementById(id);
    const svg = el.querySelector('svg');
    if (svg) {
        return svg.outerHTML;
    }

    return "";
}
