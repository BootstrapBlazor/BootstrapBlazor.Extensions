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
        backdrop,
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

    invoke.invokeMethodAsync('TriggerReadyAsync');

    registerBootstrapBlazorModule('UniverSheet', id, () => {
        EventHandler.on(document, 'changed.bb.theme', updateTheme);
    });
}

export function execute(id, data) {
    const univerSheet = Data.get(id);

    const { firstPush, backdrop, pushData } = univerSheet;
    let ret = null;
    if (pushData) {
        ret = pushData(data);
    }
    if (firstPush === true && backdrop) {
        setTimeout(() => {
            backdrop.classList.add('d-none');
        }, 100);
    }
    return ret;
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
