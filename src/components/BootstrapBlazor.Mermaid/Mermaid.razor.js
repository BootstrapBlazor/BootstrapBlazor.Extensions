export function loadMermaidContent() {
    mermaid.contentLoaded();
}

export function removeComment() {
    const mermaidDiv = document.querySelectorAll(".mermaid");
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
}

export function exportBase64Mermaid(Id) {
    const svgElement = document.getElementById(Id).childNodes[0];
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
    return svgDataUrl;
}
