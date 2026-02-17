import { addLink, addScript } from '../BootstrapBlazor/modules/utility.js';
import Data from '../BootstrapBlazor/modules/data.js';

export async function init(id, invoke, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    await addLink('./_content/BootstrapBlazor.Vditor/css/vditor.css');
    await addScript('./_content/BootstrapBlazor.Vditor/js/vditor.js');

    const root = el.querySelector('.bb-vditor-container');
    const { options: op, value } = options;
    const vditor = new Vditor(root, getOptions(invoke, { ...op, value }));

    Data.set(id, { el, invoke, vditor });
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
    const { el, invoke, vditor } = md;
    if (vditor) {
        vditor.destroy();

        const root = el.querySelector('.bb-vditor-container');
        md.vditor = new Vditor(root, getOptions(invoke, { ...options, value }));
    }
}

export function setValue(id, value) {
    const md = Data.get(id);
    const { vditor } = md;
    if (vditor) {
        vditor.setValue(value, true);
    }
}

export function insertValue(id, value, render) {
    const md = Data.get(id);
    const { vditor } = md;
    if (vditor) {
        vditor.insertValue(value, render);
    }
}

export function execute(id, method) {
    const md = Data.get(id);
    const { vditor } = md;
    let ret = '';
    if (vditor) {
        var cb = vditor[method];
        if (cb) {
            ret = cb();
        }
    }
    return ret;
}

export function dispose(id) {
    const md = Data.get(id);
    const { vditor } = md;
    if (vditor) {
        vditor.destroy();
    }
}
