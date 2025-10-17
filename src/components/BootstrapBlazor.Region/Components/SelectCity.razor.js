import Data from "../../BootstrapBlazor/modules/data.js"
import EventHandler from "../../BootstrapBlazor/modules/event-handler.js"
import Input from "../../BootstrapBlazor/modules/input.js"
import Popover from "../../BootstrapBlazor/modules/base-popover.js"

export function init(id, invoke, options) {
    const el = document.getElementById(id)
    if (el === null) {
        return
    }
    const popover = Popover.init(el);

    const searchInput = el.querySelector(".search-text");
    if (searchInput) {
        Input.composition(searchInput, async v => {
            await invoke.invokeMethodAsync(options.triggerSearch, v);
        });
    }

    const search = el.querySelector(".dropdown-menu-search .clear-icon");
    if (search) {
        EventHandler.on(search, 'click', async e => {
            searchInput.value = '';
            await invoke.invokeMethodAsync(options.triggerSearch, '');
        });
    }

    Data.set(id, { el, popover, searchInput, search });
}

export function hide(id) {
    const region = Data.get(id)
    const { popover } = region;
    if (popover) {
        popover.hide();
    }
}

export function dispose(id) {
    const region = Data.get(id)
    Data.remove(id)

    const { popover, searchInput, search } = region;
    if (popover) {
        Popover.dispose(popover);
    }
    if (searchInput) {
        Input.dispose(searchInput);
    }
    if (search) {
        EventHandler.off(search, 'click');
    }
}
