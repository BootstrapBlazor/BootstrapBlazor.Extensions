import Data from "../../BootstrapBlazor/modules/data.js"
import EventHandler from "../../BootstrapBlazor/modules/event-handler.js"
import Input from "../../BootstrapBlazor/modules/input.js"
import Popover from "../../BootstrapBlazor/modules/base-popover.js"

export function init(id, invoke, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return
    }

    const popover = Popover.init(el, {
        shownCallback: () => {
            if (searchInput != null) {
                searchInput.focus();
            }
        }
    });

    const region = { el, invoke, options, popover };
    initSearch(region);
    Data.set(id, region);
}

export function resetSearch(id, search) {
    const region = Data.get(id);

    if (search) {
        initSearch(region)
    }
    else {
        disposeSearch(region);
    }
}

const initSearch = region => {
    const { el, invoke, options } = region;
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

    region.searchInput = searchInput;
    region.search = search;
}

const disposeSearch = region => {
    const { searchInput, search } = region;
    if (searchInput) {
        Input.dispose(searchInput);
    }
    if (search) {
        EventHandler.off(search, 'click');
    }
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

    const { popover } = region;
    if (popover) {
        Popover.dispose(popover);
    }

    disposeSearch(region);
}
