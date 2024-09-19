import '/_content/BootstrapBlazor.BarcodeGenerator/JsBarcode.all.min.js';

export function Gen(instance, element, options) {
    var ele = element.querySelector("[data-action=barcode]");

    if (options.fontOption) {
        if (options.fontOption == "normal")
            options.fontOption = "";
        else if (options.fontOption == "bold_italic")
            options.fontOption = "bold italic";
    }

    JsBarcode(ele, options.value, options);
    return ele.innerHTML// .toDataURL("image/jpeg", 0.8);
}
