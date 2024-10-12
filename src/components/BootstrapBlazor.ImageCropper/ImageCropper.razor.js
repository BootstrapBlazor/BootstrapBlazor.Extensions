import Cropper from 'cropper.esm.js'
import Data from '../BootstrapBlazor/modules/data.js'
import { addLink } from '../BootstrapBlazor/modules/utility.js'

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

export async function init(id, invoke, options) {
    await addLink("./_content/BootstrapBlazor.ImageCropper/cropper.bundle.css");

    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    const image = el.querySelector(".bb-cropper-image");
    const cropper = new Cropper(image, options);

    Data.set(id, { cropper, invoke, });
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

export async function rotate(angle) {
    cropper.rotate(angle);
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
    }
}
