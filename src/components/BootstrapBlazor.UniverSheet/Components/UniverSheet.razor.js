import Data from '../../BootstrapBlazor/modules/data.js'
import { createUniverSheet } from '../univer.js'


export async function init(id, invoke, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    const sheet = {
        el,
        invoke,
        options
    };
    await createUniverSheet(sheet);
    Data.set(id, sheet);
}

export function execute(id, data) {
    const sheet = Data.get(id);

    sheet.pushData(data);
}

export function dispose(id) {

}
