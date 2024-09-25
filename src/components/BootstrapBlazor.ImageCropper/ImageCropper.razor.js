let cropper = null;
let opt = null;
let inst = null;
let result = null;
let isRound = false;

function getRoundCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    var centerX = width / 2;
    var centerY = height / 2;
    var radiusX = width / 2;
    var radiusY = height / 2;
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI, false);
    context.fill();
    return canvas;
}

export async function init(instance, element, options) {
    inst = instance;
    opt = options;

    isRound = element.querySelector("[data-crop-shape=round]") != null;

    var image = element.querySelector("[data-action=image]");
    result = element.querySelector("[data-action=result]");
    cropper = new Cropper(image, options);

}

export async function crop() {
    cropper.crop();
    let resultData = cropper.getCroppedCanvas();
    if (isRound) {
        resultData = getRoundCanvas(resultData);
    }
    if (result) {
        result.innerHTML = '';
        result.appendChild(resultData);
    }
    //inst.invokeMethodAsync("GetResult", resultDataUrl);
    return resultData.toDataURL("image/jpeg", 0.8);
}

export async function replace(url) {
    cropper.replace(url);
}

export async function setData(data) {
    cropper.setData(data);
}

export async function setDragMode(mode) {
    cropper.setDragMode(mode);
}

export async function rotate() {
    cropper.rotate(90);
}

export async function reset() {
    cropper.reset();
}

export async function clear() {
    cropper.clear();
}

export async function destroy() {
    cropper.destroy();
}

export async function enable() {
    cropper.enable();
}

export async function disable() {
    cropper.disable();
}

export function destroyMod() {
    if (undefined !== cropper && null !== cropper) {
        cropper.destroy();
        cropper = null;
        console.log('destroy');
    }
}
