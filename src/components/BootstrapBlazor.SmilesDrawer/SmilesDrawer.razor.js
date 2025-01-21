import { addScript } from "../BootstrapBlazor/modules/utility.js"

export async function init(id, smiles, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    await addScript("./_content/BootstrapBlazor.SmilesDrawer/smiles-drawer.min.js");

    draw(id, smiles, options);
}

export function update(id, smiles, options) {
    draw(id, smiles, options);
}

const draw = (id, smiles, options) => {
    SmilesDrawer.parse(
        smiles,
        function (tree) {
            if (options === null) {
                options = { theme: 'light' };
            }
            const theme = options.theme ?? 'light';
            delete options.theme;

            const drawer = new SmilesDrawer.Drawer(options);
            drawer.draw(tree, id, theme, false);
        },
        function (err) {
            console.log(err);
        }
    );
}
