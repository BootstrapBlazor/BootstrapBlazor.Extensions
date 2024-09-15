export async function downloadFileFromStream(fileName, contentStreamReference) {
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    if (fileName == null) fileName = ""
    anchorElement.download = fileName;
    anchorElement.click();
    anchorElement.remove();
    URL.revokeObjectURL(url);
}

export async function downloadFileFromStreamToDataUrl(fileName, contentStreamReference) {
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    var blobUrl = 'data:text/plain;charset=utf-8,' +
        encodeURIComponent(arrayBuffer);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ' blobUrl + "', true);
    xhr.setRequestHeader('Content-type', 'text/plain');
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
        if (this.status == 200) {
            var blobPdf = this.response;
            var reader = new FileReader();
            reader.readAsDataURL(blobPdf);
            reader.onloadend = function () {
                var base64data = reader.result;
                const anchorElement = document.createElement('a');
                if (fileName == null) fileName = ""
                anchorElement.href = base64data.replace('data:text/html;', 'data:text/' + fileName+';');
                anchorElement.download = fileName;
                anchorElement.click();
                anchorElement.remove();
            }
        }
    };
    xhr.send();
}

export async function downloadFileFromUrl(fileName, url) {
    const anchorElement = document.createElement('a')
    anchorElement.href = url
    if (fileName == null) fileName = ""
    anchorElement.download = fileName
    anchorElement.click()
    anchorElement.remove()
}