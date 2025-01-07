import { addScript } from "../BootstrapBlazor/modules/utility.js"
import Data from "../BootstrapBlazor/modules/data.js"

if (window.BootstrapBlazor === void 0) {
    window.BootstrapBlazor = {};
}

export async function init(id, value = "") {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    await addScript("./_content/BootstrapBlazor.RDKit/RDKit_minimal.js");

    if (BootstrapBlazor.RDKit === void 0) {
        const kit = await initRDKitModule();
        BootstrapBlazor.RDKit = kit;
    }

    if (value !== "") {
        const mol = BootstrapBlazor.RDKit.get_mol(value);
        el.innerHTML = mol.get_svg();
    }

    Data.set(id, { el });
}

export function update(id, value) {
}
