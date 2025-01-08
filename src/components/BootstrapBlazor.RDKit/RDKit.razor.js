import { addScript } from "../BootstrapBlazor/modules/utility.js"
import Data from "../BootstrapBlazor/modules/data.js"

if (window.BootstrapBlazor === void 0) {
    window.BootstrapBlazor = {};
}

export async function init(id, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    await addScript("./_content/BootstrapBlazor.RDKit/RDKit_minimal.js");

    if (BootstrapBlazor.RDKit === void 0) {
        BootstrapBlazor.RDKit = await initRDKitModule();
    }

    const { RDKit } = BootstrapBlazor;
    const { smiles, smarts } = options;
    if (smiles) {
        const mol = RDKit.get_mol(smiles);
        if (smarts) {
            const qmol = RDKit.get_qmol(smarts);
            const mdetails = mol.get_substruct_match(qmol);
            el.innerHTML = mol.get_svg_with_highlights(mdetails);
        }
        else {
            el.innerHTML = mol.get_svg();
        }
    }

    Data.set(id, { el });
}

export function update(id, value) {
}
