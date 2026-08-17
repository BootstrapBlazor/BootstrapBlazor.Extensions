import { addLink, addScript } from '../../../BootstrapBlazor/modules/utility.js'
import Data from '../../../BootstrapBlazor/modules/data.js'
import EventHandler from "../../../BootstrapBlazor/modules/event-handler.js"

export async function init(id, interop, options) {
    const editor = {};
    Data.set(id, editor);

    await addLink('_content/BootstrapBlazor.CodeEditor/code-editor.bundle.css');
    await addScript('_content/BootstrapBlazor.CodeEditor/monaco-editor/min/vs/loader.js');

    const init = container => {

        // Hide the Progress Ring
        monaco.editor.onDidCreateEditor((e) => {
            const progress = container.querySelector(".spinner");
            if (progress && progress.style) {
                progress.style.display = "none";
            }
        });

        // Create the Monaco Editor
        const body = container.querySelector(".code-editor-body");
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
            const code = editor.editor.getValue();
            interop.invokeMethodAsync("UpdateValueAsync", code);
        });

        monaco.editor.setModelLanguage(monaco.editor.getModels()[0], options.language)

        editor.editor.layout();

        EventHandler.on(window, "resize", () => {
            editor.editor.layout();
        });
    }

    const protocol = window.location.protocol;
    const host = window.location.hostname;
    const port = window.location.port;
    let fullDomain = "";

    if (port === "80" && protocol === "http:") {
        fullDomain = `${protocol}//${host}`;
    } else if (port === "443" && protocol === "https:") {
        fullDomain = `${protocol}//${host}`;
    } else {
        fullDomain = `${protocol}//${host}:${port}`;
    }

    // require is provided by loader.min.js.
    require.config({
        paths: {'vs': `${fullDomain}${options.path}`}
    });

    require(["vs/editor/editor.main"], () => {
        editor.handler = setInterval(() => {
            var container = document.getElementById(id);
            if (container.offsetHeight > 0) {
                clearInterval(editor.handler);
                init(container);
                editor.handler = null;
                delete editor.handler;
            }
        }, 50);
    });
}

export function insertText(id, insertData) {
    const wrapper = Data.get(id);
    if (!wrapper) return;

    const editor = wrapper.editor;
    const selection = editor.getSelection();
    editor.executeEdits('insert-custom-text', [
        {
            range: selection,
            text: insertData,
            forceMoveMarkers: true
        }
    ]);
    editor.focus();
}

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
    const editor = Data.get(id);
    Data.remove(id);
    EventHandler.off(window, "resize");

    const { handler } = editor;
    if (handler) {
        clearInterval(handler);
    }
}
