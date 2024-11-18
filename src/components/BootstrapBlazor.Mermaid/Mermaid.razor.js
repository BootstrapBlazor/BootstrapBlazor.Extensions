
export function init(id) {
    const mermaidDiv = document.querySelectorAll(".bb-mermaid");
    if (mermaidDiv) {
        mermaidDiv.forEach((Mermaid) => {
            const childNodes = Mermaid.childNodes;
            for (let i = childNodes.length - 1; i >= 0; i--) {
                const node = childNodes[i];
                if (node.nodeType === Node.COMMENT_NODE) {
                    Mermaid.removeChild(node);
                }
            }
        })
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
