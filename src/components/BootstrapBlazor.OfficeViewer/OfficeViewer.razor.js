import { addLink } from "../BootstrapBlazor/modules/utility.js"
import Data from "../BootstrapBlazor/modules/data.js"

export async function init(id, invoke, options) {
    await addLink("./_content/BootstrapBlazor.OfficeViewer/office-viewer.css");

    const el = document.getElementById(id);
    const officeViewer = { el, invoke, options };
    Data.set(id, officeViewer);

    await load(id, options.url);
}

export async function load(id, url) {
    const officeViewer = Data.get(id);
    const { el, invoke, options } = officeViewer;

    el.innerHTML = '';

    if (url) {
        const { frame } = officeViewer;
        const viewer = frame || createFrame(el);
        if (options.loadedCallaback) {
            viewer.onload = () => {
                invoke.invokeMethodAsync(options.loadedCallaback);
            };
        }
        viewer.src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
    }
}

const createFrame = el => {
    const frame = document.createElement('iframe');
    frame.classList.add('bb-office-viewer');
    el.appendChild(frame);
    return frame;
}
