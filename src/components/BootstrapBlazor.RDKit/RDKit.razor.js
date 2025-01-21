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
    Data.set(id, { el });

    draw(el, options);
}

export function update(id, options) {
    const instance = Data.get(id);
    const { el } = instance;

    draw(el, options);
}

const draw = (el, options) => {
    const { RDKit } = BootstrapBlazor;
    const { smiles, smarts, height, width } = options;
    if (smiles) {
        const mol = RDKit.get_mol(smiles);
        if (smarts) {
            const qmol = RDKit.get_qmol(smarts);
            let mdetails = mol.get_substruct_match(qmol);
            mdetails = appendSize(mdetails, width, height);
            el.innerHTML = mol.get_svg_with_highlights(mdetails);
        }
        else {
            el.innerHTML = getSvg(mol, width, height);
        }
    }
}

const appendSize = (details, width, height) => {
    if (width && height) {
        const detail = JSON.parse(details);
        detail.width = width;
        detail.height = height;
        return JSON.stringify(detail);
    }
    else {
        return details;
    }
}

const getSvg = (mol, width, height) => {
    if (width && height) {
        return mol.get_svg(width, height);
    }
    else {
        return mol.get_svg();
    }
}
