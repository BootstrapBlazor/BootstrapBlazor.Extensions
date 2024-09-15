let cropper = null;
let opt = null;
let inst = null;
let result = null;

export async function init(instance, element, options) {
    inst = instance;
    opt = options;

    var image = element.querySelector("[data-action=image]");
    result = element.querySelector("[data-action=result]");
    cropper = new Cropper(image, options);

}

export async function crop() {
    cropper.crop();
    let resultData = cropper.getCroppedCanvas();
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