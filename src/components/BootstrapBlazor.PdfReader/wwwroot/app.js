export async function getUserAgent() {
    console.log(navigator.userAgent);
    return navigator.userAgent;
}
export async function showPdf(baseurl, element, stream) {
    const arrayBuffer = await stream.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const urlblob = URL.createObjectURL(blob);
    element.src = baseurl.replace('(1)',  urlblob);
}
export function getGlobalWatermark() {
    return document.body.getAttribute('data-bb-watermark') == 'true';
} 
