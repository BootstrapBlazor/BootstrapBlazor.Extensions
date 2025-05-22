import { addScript } from '../BootstrapBlazor/modules/utility.js';
import Data from '../BootstrapBlazor/modules/data.js';

export async function init(id, invoke, domain, options) {
    await addScript('./_content/BootstrapBlazor.JitsiMeet/external_api.js');
    const el = document.getElementById(id);
    options.parentNode = el;
    options.onload = () => {
        invoke.invokeMethodAsync('OnLoadCallBack');
    }
    const api = new JitsiMeetExternalAPI(domain, options);
    const jitsi = { el, invoke, api };
    Data.set(id, jitsi);
}

export function dispose(id) {
    const p = Data.get(id);
    Data.remove(id);

    if (p) {
        const { api } = p;
        if (api) {
            api.dispose();
        }
    }
}

export function executeCommand(id, command, option) {
    const p = Data.get(id);
    if (p) {
        const { api } = p;
        if (api) {
            api.executeCommand(command, option);
        }
    }
}
