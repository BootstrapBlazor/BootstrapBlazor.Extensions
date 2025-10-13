import Data from "../../BootstrapBlazor/modules/data.js"
import Popover from "../../BootstrapBlazor/modules/base-popover.js"

export function init(id) {
    const el = document.getElementById(id)
    if (el === null) {
        return
    }
    const input = el.querySelector(`#${id}_input`);
    const popover = Popover.init(el);

    Data.set(id, { el, popover });
}

export function dispose(id) {
    const region = Data.get(id)
    Data.remove(id)

    const { el, popover } = region;
    if (popover) {
        Popover.dispose(select.popover);
    }
}
