import { addScript } from "../BootstrapBlazor/modules/utility.js"

export async function init(id, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    await addScript("./_content/BootstrapBlazor.SmilesDrawer/smiles-drawer.min.js");

    draw(id, options);
}

export function update(id, options) {
    draw(id, options);
}

const draw = (id, options) => {
    const smiles = options.smilesValue;
    delete options.smilesValue;

    SmilesDrawer.parse(
        smiles,
        function (tree) {
            const theme = options.theme ?? 'light';
            delete options.theme;

            for (let key in options) {
                if (options[key] === null) {
                    delete options[key];
                }
            }

            const drawer = new SmilesDrawer.Drawer(options);
            drawer.draw(tree, id, theme, false);
        },
        function (err) {
            console.log(err);
        }
    );
}
