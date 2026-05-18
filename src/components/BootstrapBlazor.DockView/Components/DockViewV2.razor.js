import { addLink, getTheme } from '../../BootstrapBlazor/modules/utility.js'
import { cerateDockview } from '../js/dockview-utils.js'
import Data from '../../BootstrapBlazor/modules/data.js'
import EventHandler from "../../BootstrapBlazor/modules/event-handler.js"

export async function init(id, invoke, options) {
    await addLink("./_content/BootstrapBlazor.DockView/css/dockview-bb.css")
    const el = document.getElementById(id);
    if (!el) {
        return;
    }

    if (options.theme === 'dockview-theme-light') {
        let theme = getTheme();
        if (theme === 'dark') {
            options.theme = `dockview-theme-dark`;
        }
    }
    const dockview = cerateDockview(el, options);
    dockview.params.invisiblePanels?.forEach(invisiblePanel => {
        invoke.invokeMethodAsync(options.panelVisibleChangedCallback, invisiblePanel.params.key, false);
    })

    const updateTheme = e => dockview.switchTheme(e.theme);
    Data.set(id, { el, dockview, updateTheme });

    dockview.on('initialized', () => {
        invoke.invokeMethodAsync(options.initializedCallback);
    });
    dockview.on('lockChanged', ({ title, isLock }) => {
        invoke.invokeMethodAsync(options.lockChangedCallback, title, isLock);
    });
    dockview.on('panelVisibleChanged', ({ key, status }) => {
        invoke.invokeMethodAsync(options.panelVisibleChangedCallback, key, status);
    });
    dockview.on('groupSizeChanged', () => {
        invoke.invokeMethodAsync(options.splitterCallback);
    });
    dockview.on('loadTabs', tabs => {
        if (tabs.length === 0) {
            return;
        }
        invoke.invokeMethodAsync(options.loadTabs, tabs);
    });
    dockview.on('saveConfig', json => {
        if (options.enableLocalStorage) {
            return;
        }

        invoke.invokeMethodAsync(options.saveConfigCallback, json);
    });
    EventHandler.on(document, 'changed.bb.theme', updateTheme);
}

export function update(id, options) {
    const dock = Data.get(id)
    if (dock) {
        const { dockview } = dock;
        dockview.update(options);
    }
}

export function reset(id, options) {
    const dock = Data.get(id)
    if (dock) {
        const { dockview } = dock;
        dockview.reset(options);
    }
}

export function save(id) {
    let ret = '';
    const dock = Data.get(id)
    if (dock) {
        const { dockview } = dock;
        ret = JSON.stringify(dockview.toJSON());
    }
    return ret;
}

export function dispose(id) {
    const dock = Data.get(id)
    Data.remove(id);

    if (dock) {
        EventHandler.off(document, 'changed.bb.theme', dock.updateTheme);

        const { dockview } = dock;
        if (dockview) {
            dockview.dispose();
        }
    }
}
