import './lib/signature_pad.umd.js';
import Data from '../BootstrapBlazor/modules/data.js'
import { addLink } from '../BootstrapBlazor/modules/utility.js'

export async function init(id, invoke, alertText, backgroundColor, styleUrl) {
    await addLink(styleUrl)

    var element = document.getElementById(id);
    var clearButton = element.querySelector("[data-action=clear]");
    var changeColorButton = element.querySelector("[data-action=change-color]");
    var undoButton = element.querySelector("[data-action=undo]");
    var saveBase64Button = element.querySelector("[data-action=save-base64]");
    var savePNGButton = element.querySelector("[data-action=save-png]");
    var saveJPGButton = element.querySelector("[data-action=save-jpg]");
    var saveSVGButton = element.querySelector("[data-action=save-svg]");
    var closeButton = element.querySelector("[data-action=close]");
    var canvas = element.querySelector("canvas");
    var signaturePad = new SignaturePad(canvas, {
        backgroundColor: backgroundColor || 'rgb(255, 255, 255)'
    });

    var previousWidth = canvas.parentElement.offsetWidth;
    var previousHeight = canvas.parentElement.offsetHeight;

    function resizeCanvas() {
        var ratio = devicePixelRatio;
        var width = canvas.parentElement.offsetWidth;
        var height = canvas.parentElement.offsetHeight;
        var data = signaturePad.toData();
        var scaleX = previousWidth > 0 ? width / previousWidth : 1;
        var scaleY = previousHeight > 0 ? height / previousHeight : 1;

        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.getContext("2d").scale(ratio, ratio);

        previousWidth = width;
        previousHeight = height;

        if (data.length > 0) {
            signaturePad.fromData(data.map(group => ({
                ...group,
                points: group.points.map(point => ({
                    ...point,
                    x: point.x * scaleX,
                    y: point.y * scaleY
                }))
            })));
        }
        else {
            signaturePad.clear();
        }
    }

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(element);

    Data.set(id, { observer });
    function download(dataURL, filename) {
        if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
            window.open(dataURL);
        } else {
            var blob = dataURLToBlob(dataURL);
            var url = window.URL.createObjectURL(blob);

            var a = document.createElement("a");
            a.style = "display: none";
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();

            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                a.remove();
            }, 1000);
        }
    }

    function dataURLToBlob(dataURL) {
        var parts = dataURL.split(';base64,');
        var contentType = parts[0].split(":")[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }

    if (clearButton) clearButton.addEventListener("click", function (event) {
        signaturePad.clear();
    });

    if (undoButton) undoButton.addEventListener("click", function (event) {
        var data = signaturePad.toData();

        if (data) {
            data.pop(); // remove the last dot or line
            signaturePad.fromData(data);
        }
    });

    if (changeColorButton) changeColorButton.addEventListener("click", function (event) {
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);
        var color = "rgb(" + r + "," + g + "," + b + ")";

        signaturePad.penColor = color;
    });

    if (saveBase64Button) saveBase64Button.addEventListener("click", function (event) {
        if (signaturePad.isEmpty()) {
            alertMessage();
        } else {
            var imgBase64 = signaturePad.toDataURL();
            return invoke.invokeMethodAsync("SignatureResult", imgBase64);
        }
    });

    if (savePNGButton) savePNGButton.addEventListener("click", function (event) {
        if (signaturePad.isEmpty()) {
            alertMessage();
        } else {
            var dataURL = signaturePad.toDataURL();
            download(dataURL, "signature.png");
        }
    });

    if (saveJPGButton) saveJPGButton.addEventListener("click", function (event) {
        if (signaturePad.isEmpty()) {
            alertMessage();
        } else {
            var dataURL = signaturePad.toDataURL("image/jpeg");
            download(dataURL, "signature.jpg");
        }
    });

    if (saveSVGButton) saveSVGButton.addEventListener("click", function (event) {
        if (signaturePad.isEmpty()) {
            alertMessage();
        } else {
            var dataURL = signaturePad.toDataURL('image/svg+xml');
            download(dataURL, "signature.svg");
        }
    });

    if (closeButton) closeButton.addEventListener("click", function (event) {
        return invoke.invokeMethodAsync("Close", null);
    });


    function alertMessage() {
        if (alertText) alert(alertText);
        invoke.invokeMethodAsync("SignatureAlert");
    }
}

export function dispose(id) {
    const observer = Data.get(id)?.observer;
    observer?.disconnect();
    Data.remove(id);
}
