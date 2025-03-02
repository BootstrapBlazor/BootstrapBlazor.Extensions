﻿import Data from '../../BootstrapBlazor/modules/data.js'
import { isFunction } from '../../BootstrapBlazor/modules/utility.js'
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

    invoke.invokeMethodAsync('TriggerReadyAsync');
}

export function execute(id, data) {
    const univerSheet = Data.get(id);

    return univerSheet.pushData(data);
}

export function dispose(id) {
    const univerSheet = Data.get(id);
    Data.remove(id);

    if (isFunction(univerSheet.dispose)) {
        univerSheet.dispose();
    }
}
