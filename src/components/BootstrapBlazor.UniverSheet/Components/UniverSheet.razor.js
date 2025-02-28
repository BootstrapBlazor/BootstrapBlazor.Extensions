import Data from '../../BootstrapBlazor/modules/data.js'
import { createUniverSheetAsync } from '../univer.js'


export async function init(id, invoke, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    const univerSheet = {
        el,
        invoke,
        options
    };
    await createUniverSheetAsync(univerSheet);
    Data.set(id, univerSheet);
}

export function execute(id, data) {
    const univerSheet = Data.get(id);

    univerSheet.pushData(data);
}

export function dispose(id) {

}
