import { addScript } from "../BootstrapBlazor/modules/utility.js"
import Data from "../BootstrapBlazor/modules/data.js"

export async function init(id, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    await addScript("./_content/BootstrapBlazor.SmilesDrawer/smiles-drawer.min.js");

    Data.set(id, { el });

    draw(id, options);
}

export function update(id, options) {
    draw(id, options);
}

const draw = (id, options) => {
    SmilesDrawer.parse(
        options.smilesValue,
        function (tree) {
            delete options.smilesValue;
            for (let key in options) {
                if (options[key] === null) {
                    delete options[key];
                }
            }
            const drawer = new SmilesDrawer.Drawer(options);
            drawer.draw(tree, id, 'light', false);
            console.log(tree);
        },
        function (err) {
            console.log(err);
        }
    );
}
