import { addScript } from '../../../BootstrapBlazor/modules/utility.js'
import Data from '../../../BootstrapBlazor/modules/data.js'
import EventHandler from "../../../BootstrapBlazor/modules/event-handler.js"

export async function init(id, interop, options) {
    await addScript('./_content/BootstrapBlazor.CodeEditor/monaco-editor/min/vs/loader.min.js')

    const init = container => {
        var body = container.querySelector(".code-editor-body");

        // Hide the Progress Ring
        monaco.editor.onDidCreateEditor((e) => {
            var progress = container.querySelector(".spinner");
            if (progress && progress.style) {
                progress.style.display = "none";
            }
        });

        const editor = {}

        // Create the Monaco Editor
        editor.editor = monaco.editor.create(body, {
            ariaLabel: "online code editor",
            value: options.value,
            language: options.language,
            theme: options.theme,
            lineNumbers: options.lineNumbers ? "on" : "off",
            readOnly: options.readOnly,
        });

        // Catch when the editor lost the focus (didType to immediate)
        editor.editor.onDidBlurEditorText((e) => {
            var code = editor.editor.getValue();
            interop.invokeMethodAsync("UpdateValueAsync", code);
        });

        monaco.editor.setModelLanguage(monaco.editor.getModels()[0], options.language)

        editor.interop = interop;

        editor.editor.layout();

        EventHandler.on(window, "resize", () => {
            editor.editor.layout();
        });

        Data.set(id, editor);
    }

    // require is provided by loader.min.js.
    require.config({
        paths: { 'vs': options.path }
    });

    require(["vs/editor/editor.main"], () => {
        const handler = setInterval(() => {
            var container = document.getElementById(id);
            console.log(container.offsetHeight);

            if (container.offsetHeight > 0) {
                clearInterval(handler);
                init(container);
            }
        }, 50);
    });
}

// Update the editor options
export function monacoSetOptions(id, options) {
    var editor = Data.get(id);
    if (editor) {
        editor.editor.setValue(options.value);
        editor.editor.updateOptions({
            language: options.language,
            theme: options.theme
        });
        monaco.editor.setModelLanguage(monaco.editor.getModels()[0], options.language)
    }
}

export function dispose(id) {
    Data.remove(id);
    EventHandler.off(window, "resize");
}
