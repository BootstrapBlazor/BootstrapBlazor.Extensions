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

    await addScript("./_content/BootstrapBlazor.SmilesDrawer/smiles-drawer.min.js");

    //修改option之后需要new一个新的smilesDrawer对象，所以init中不单独做该对象的new和全局

    Data.set(id, { el });

    draw(id, options);
}

export function update(id, options) {
    draw(id, options);
}

const draw = (id, options) => {
    const { smilesValue, needReLoadOptions, compactDrawing } = options;
    const opt = { compactDrawing: compactDrawing };
    if (BootstrapBlazor.SmilesDrawer === void 0 || needReLoadOptions) {
        BootstrapBlazor.SmilesDrawer = new SmilesDrawer.Drawer(opt);
    }
    SmilesDrawer.parse(
        smilesValue,
        function(tree) {
            BootstrapBlazor.SmilesDrawer.draw(tree, id, 'light', false);
            console.log(tree);
        },
        function (err) {
            console.log(err);
        }
    );
}
