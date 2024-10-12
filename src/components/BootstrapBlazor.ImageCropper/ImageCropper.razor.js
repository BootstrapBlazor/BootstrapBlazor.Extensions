import Cropper from './cropper.esm.js'
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

export async function init(id, options) {
    await addLink("./_content/BootstrapBlazor.ImageCropper/cropper.bundle.css");

    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    const image = el.querySelector(".bb-cropper-image");
    const cropper = new Cropper(image, options);

    Data.set(id, cropper);
}

export function dispose(id) {
    const cropper = Data.get(id);
    Data.remove(id);

    if (cropper != null) {
        cropper.destroy();
    }
}
export function crop(id, isRound = false) {
    let ret = null;
    const cropper = Data.get(id);
    if (cropper != null) {
        cropper.crop();
        let resultData = cropper.getCroppedCanvas();
        if (isRound) {
            resultData = getRoundCanvas(resultData);
        }
        ret = resultData.toDataURL("image/jpeg", 0.8);
        resultData = null;
    }
    return ret;
}

export function replace(id, url) {
    const cropper = Data.get(id);
    if (cropper != null) {
        cropper.replace(url);
    }
}

export function reset(id) {
    const cropper = Data.get(id);
    if (cropper != null) {
        cropper.reset();
    }
}

export function setDragMode(id, mode) {
    const cropper = Data.get(id);
    if (cropper != null) {
        cropper.setDragMode(mode);
    }
}

export function rotate(id, angle) {
    const cropper = Data.get(id);
    if (cropper != null) {
        cropper.rotate(angle);
    }
}

export function clear(id) {
    const cropper = Data.get(id);
    if (cropper != null) {
        cropper.clear();
    }
}

export async function enable(id) {
    const cropper = Data.get(id);
    if (cropper != null) {
        cropper.enable();
    }

    const el = document.getElementById(id);
    if (el) {
        el.classList.remove("disabled");
    }
}

export async function disable(id) {
    const cropper = Data.get(id);
    if (cropper != null) {
        cropper.disable();
    }

    const el = document.getElementById(id);
    if (el) {
        el.classList.add("disabled");
    }
}
