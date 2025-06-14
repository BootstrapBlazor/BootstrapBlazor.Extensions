import { addLink, addScript } from '../BootstrapBlazor/modules/utility.js';
import Data from '../BootstrapBlazor/modules/data.js';

export async function init(id, invoke, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    await addLink('./_content/BootstrapBlazor.Vditor/css/index.css');
    await addScript('./_content/BootstrapBlazor.Vditor/js/vditor.js');

    const { options: op, value } = options;
    const vditor = new Vditor(id, getOptions(invoke, { ...op, value }));

    Data.set(id, { el, invoke, vditor });
    return vditor;
}

const getOptions = (invoke, options) => {
    return {
        cache: {
            enable: false,
        },
        ...options,
        after: () => invoke.invokeMethodAsync('TriggerRenderedAsync'),
        input: value => invoke.invokeMethodAsync('TriggerInputAsync', value),
        focus: value => invoke.invokeMethodAsync('TriggerFocusAsync', value),
        blur: value => invoke.invokeMethodAsync('TriggerBlurAsync', value),
        esc: value => invoke.invokeMethodAsync('TriggerEscapeAsync', value),
        select: value => invoke.invokeMethodAsync('TriggerSelectAsync', value),
        ctrlEnter: value => invoke.invokeMethodAsync('TriggerCtrlEnterAsync', value)
    };
}

export async function reset(id, value, options) {
    const md = Data.get(id);
    const { invoke, vditor } = md;
    if (vditor) {
        vditor.destroy();

        md.vditor = new Vditor(id, getOptions(invoke, { ...options, value }));
    }
    return md.vditor;
}

export function dispose(id) {
    const md = Data.get(id);
    const { vditor } = md;
    if (vditor) {
        vditor.destroy();
    }
}
