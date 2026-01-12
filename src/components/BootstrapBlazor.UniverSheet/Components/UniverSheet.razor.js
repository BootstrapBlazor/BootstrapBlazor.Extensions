import { addLink, isFunction, registerBootstrapBlazorModule } from '../../BootstrapBlazor/modules/utility.js'
import { createUniverSheetAsync } from '../univer.js'
import Data from '../../BootstrapBlazor/modules/data.js'
import EventHandler from "../../BootstrapBlazor/modules/event-handler.js"

export async function init(id, invoke, options) {
    await addLink('./_content/BootstrapBlazor.UniverSheet/css/univer-sheet.bundle.css');

    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    const backdrop = el.querySelector('.bb-univer-sheet-backdrop');
    if (backdrop) {
        backdrop.style.removeProperty('display');
    }

    const { theme, lang, plugins, data, ribbonType, darkMode } = options;
    const univerSheet = {
        el: el.querySelector('.bb-univer-sheet-wrap'),
        invoke,
        data,
        plugins,
        theme,
        lang,
        ribbonType,
        darkMode,
        events: {
            onRendered: () => {
                if (backdrop) {
                    backdrop.classList.add('d-none');
                }
            }
        }
    };

    await createUniverSheetAsync(univerSheet);
    Data.set(id, univerSheet);

    registerBootstrapBlazorModule('UniverSheet', id, () => {
        EventHandler.on(document, 'changed.bb.theme', updateTheme);
    });

    invoke.invokeMethodAsync('TriggerReadyAsync');
}

export function execute(id, data) {
    const univerSheet = Data.get(id);

    return univerSheet.pushData(data);
}

export function dispose(id) {
    const univerSheet = Data.get(id);
    Data.remove(id);

    if (isFunction(univerSheet.dispose)) {
        univerSheet.dispose();
    }

    const { UniverSheet } = window.BootstrapBlazor;
    if (UniverSheet) {
        UniverSheet.dispose(id, () => {
            EventHandler.off(document, 'changed.bb.theme', updateTheme);
        });
    }
}

const updateTheme = e => {
    const theme = e.theme;

    [...document.querySelectorAll('.bb-univer-sheet')].forEach(s => {
        const id = s.getAttribute('id');
        if (id) {
            const univerSheet = Data.get(id);
            if (univerSheet && univerSheet.darkMode === null) {
                const { univerAPI } = univerSheet;
                if (univerAPI) {
                    univerAPI.toggleDarkMode(theme === 'dark');
                }
            }
        }
    });
}
