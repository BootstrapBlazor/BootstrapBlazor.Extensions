import { addLink } from '../../../BootstrapBlazor/modules/utility.js'
import Data from '../../../BootstrapBlazor/modules/data.js'
import EventHandler from "../../../BootstrapBlazor/modules/event-handler.js"

let monacoLoader;

const loadMonaco = () => {
    monacoLoader ??= import('../../monaco-editor/monaco.js');
    return monacoLoader;
}

export async function init(id, interop, options) {
    const editor = {};
    Data.set(id, editor);

    const [module] = await Promise.all([
        loadMonaco(),
        ...options.styleSheets.map(styleSheet => addLink(styleSheet))
    ]);
    editor.monaco = module.monaco;

    const init = container => {
        const body = container.querySelector(".code-editor-body");
        editor.editor = editor.monaco.editor.create(body, {
            ariaLabel: "online code editor",
            value: options.value,
            language: options.language,
            theme: options.theme,
            lineNumbers: options.lineNumbers ? "on" : "off",
            readOnly: options.readOnly,
        });

        const progress = container.querySelector(".spinner");
        if (progress) {
            progress.style.display = "none";
        }

        editor.editor.onDidBlurEditorText((e) => {
            const code = editor.editor.getValue();
            interop.invokeMethodAsync("UpdateValueAsync", code);
        });

        editor.editor.layout();

        EventHandler.on(window, "resize", () => {
            editor.editor.layout();
        });
    }

    editor.handler = setInterval(() => {
        const container = document.getElementById(id);
        if (container?.offsetHeight > 0) {
            clearInterval(editor.handler);
            init(container);
            editor.handler = null;
            delete editor.handler;
        }
    }, 50);
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
    const wrapper = Data.get(id);
    if (wrapper?.editor) {
        wrapper.editor.setValue(options.value);
        wrapper.editor.updateOptions({
            language: options.language,
            theme: options.theme
        });
        const model = wrapper.editor.getModel();
        if (model) {
            wrapper.monaco.editor.setModelLanguage(model, options.language);
        }
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
