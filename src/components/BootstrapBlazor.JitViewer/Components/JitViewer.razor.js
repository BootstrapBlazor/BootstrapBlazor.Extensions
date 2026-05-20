import '../lib/jit-viewer.min.js';
import Data from '../../BootstrapBlazor/modules/data.js';
import { addLink } from '../../BootstrapBlazor/modules/utility.js';

export async function init(id, invoke) {
    await addLink('./_content/BootstrapBlazor.JitViewer/lib/jit-viewer.min.css');

    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    Data.set(id, {
        el,
        invoke
    });

    const { createViewer } = window.JitViewer;
    const viewer = createViewer({
        target: el,
        theme: 'light',
        toolbar: true
    });
    viewer.mount();
}

export function dispose(id) {

}
