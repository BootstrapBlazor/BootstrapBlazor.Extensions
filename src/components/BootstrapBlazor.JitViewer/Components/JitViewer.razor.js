import { addLink, addScript, getTheme } from '../../BootstrapBlazor/modules/utility.js'
import Data from '../../BootstrapBlazor/modules/data.js'
import EventHandler from "../../BootstrapBlazor/modules/event-handler.js"

export async function init(id, invoke, options) {
    await addLink('./_content/BootstrapBlazor.JitViewer/jit-viewer.css');
    await addScript('./_content/BootstrapBlazor.JitViewer/lib/jit-viewer.min.js');

    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    setOptions(options);

    const { createViewer } = window.JitViewer;
    const viewer = createViewer({
        target: el,
        ...options
    });
    viewer.mount();

    Data.set(id, {
        el,
        invoke,
        options,
        viewer
    });

    const updateTheme = e => viewer.setTheme(e.theme);
    EventHandler.on(document, 'changed.bb.theme', updateTheme);
}

const setOptions = options => {
    if (options.locale.startsWith('en')) {
        options.locale = 'en';
    }

    if (options.theme === 'auto') {
        options.theme = getTheme();
    }
}

export function update(id, options) {
    const data = Data.get(id);
    if (data === null) {
        return;
    }

    const { viewer } = data;
    if (viewer) {
        setOptions(options);

        if (data.options.theme !== options.theme) {
            viewer.setTheme(options.theme);
        }
        if (data.options.locale !== options.locale) {
            viewer.setLocale(options.locale);
        }
        if (data.options.file !== options.file) {
            viewer.setFile(options.file, options.fileName);
        }
    }
}

export function dispose(id) {
    const data = Data.get(id);
    if (data === null) {
        return;
    }

    const { viewer } = data;
    if (viewer) {
        viewer.destroy();
    }
}
