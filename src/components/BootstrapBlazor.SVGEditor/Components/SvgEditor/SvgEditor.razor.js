import { addLink } from '../../../BootstrapBlazor/modules/utility.js'
import Data from '../../../BootstrapBlazor/modules/data.js'
import Editor from "../../editor/Editor.js"

export async function init(id, options, styleUrl) {
    const { preload, interop, callback } = options;

    await addLink(styleUrl)

    const container = document.getElementById(id)
    const svgEditor = new Editor(container)
    svgEditor.setConfig({
        canvasName: id,
        lang: "en",
        allowInitialUserOverride: false,
        imgPath: "./_content/BootstrapBlazor.SvgEditor/editor/images",
        showGrid: true,
        extPath: "/_content/BootstrapBlazor.SvgEditor/editor/extensions/",
        noDefaultExtensions: false
    })
    await svgEditor.init()
    svgEditor.topPanel.showSourceEditor = async (e, forceSaving) => {
        const origSource = svgEditor.svgCanvas.getSvgString()
        await interop.invokeMethodAsync(callback, origSource);
    }

    if (preload != null) {
        await svgEditor.loadFromString(preload)
    }
    Data.set(id, {
        svgEditor,
        interop
    })

    svgEditor.zoomChanged(window, "canvas", true)
    container.querySelector("#zoom").value = "canvas"
}

export async function update(id, content) {
    var editor = Data.get(id)
    if (editor) {
        await editor.svgEditor.loadFromString(content);
    }
}

export function dispose(id) {
    Data.remove(id)
}
