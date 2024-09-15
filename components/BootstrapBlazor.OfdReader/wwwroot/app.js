export async function showOfd(baseurl, element, stream) {
    const arrayBuffer = await stream.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const urlblob = URL.createObjectURL(blob);
    element.src = baseurl.replace('(1)', urlblob);
}