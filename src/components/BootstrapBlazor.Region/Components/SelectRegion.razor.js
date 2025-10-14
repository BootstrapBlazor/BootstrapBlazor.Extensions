import Data from "../../BootstrapBlazor/modules/data.js"
import Popover from "../../BootstrapBlazor/modules/base-popover.js"

export function init(id) {
    const el = document.getElementById(id)
    if (el === null) {
        return
    }
    const popover = Popover.init(el);

    Data.set(id, { el, popover });
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
        Popover.dispose(select.popover);
    }
}
