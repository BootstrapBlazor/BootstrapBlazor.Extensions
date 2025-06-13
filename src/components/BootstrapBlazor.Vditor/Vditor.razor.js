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
    const vditor = new Vditor(id, getOptions({ ...op, value }));

    Data.set(id, { el, invoke, vditor });
}

const getOptions = options => {
    return {
        cache: {
            enable: false,
        },
        ...options
    };
}

export async function update(id, value) {

}

export function dispose(id) {

}
