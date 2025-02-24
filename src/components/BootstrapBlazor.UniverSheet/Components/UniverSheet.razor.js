import { addScript, addLink } from '../BootstrapBlazor/modules/utility.js'
import Data from '../BootstrapBlazor/modules/data.js'

if (window.BootstrapBlazor === void 0) {
    window.BootstrapBlazor = {};
}

if (window.BootstrapBlazor.Univer === void 0) {
    window.BootstrapBlazor.Univer = {};
}

if (window.BootstrapBlazor.Univer.Sheet === void 0) {
    window.BootstrapBlazor.Univer.Sheet = {
        callbacks: {
            beforeCreateUniver: null,
            beforeCreateUniverSheet: null
        }
    }
}

export async function init(id, invoke, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/js/react.production.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/js/react-dom.production.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/js/rxjs.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/js/univerjs.presets.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/js/univerjs.preset-sheets-core.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/js/univerjs.preset-sheets-drawing.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/js/univerjs.sheets-zen-editor.umd.min.js');

    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/js/univerjs.preset-sheets-core.locales.zh-CN.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/js/univerjs.preset-sheets-drawing.locales.zhCN.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/js/univerjs.sheets-zen-editor.locales.zh-CN.js');

    await addLink('./_content/BootstrapBlazor.UniverSheet/univer/css/univerjs.preset-sheets-core.css');
    await addLink('./_content/BootstrapBlazor.UniverSheet/univer/css/univerjs.preset-sheets-drawing.css');
    await addLink('./_content/BootstrapBlazor.UniverSheet/univer/css/univerjs.sheets-zen-editor.css');

    const sheet = {
        el,
        invoke,
        options
    };
    createUniverSheet(sheet);
    Data.set(id, sheet);
}

const createUniverSheet = sheet => {
    const options = {};
    const { univer, univerAPI } = createUniver({
        presets: [
            UniverSheetsCorePreset({
                container: el
            }),
            UniverSheetsDrawingPreset(),
        ],
        ...options
    });

    univerAPI.createUniverSheet({
        defaultWorkbookData,
        ...options.workbookData
    });
    sheet.univer = univer;
    sheet.univerAPI = univerAPI;
}

const defaultWorkbookData = {
    sheets: {
        sheet1: {
            id: 'sheet1',
            name: 'sheet1',
            cellData: {
                0: {
                    0: {
                        v: "default-workbook-data:sheet1:A1",
                    },
                },
            },
            rowCount: 100,
            columnCount: 100,
        },
        sheet2: {
            id: 'sheet2',
            name: 'sheet2',
            cellData: {
                0: {
                    0: {
                        v: 'default-workbook-data:sheet2:A1',
                    },
                },

            },
            rowCount: 100,
            columnCount: 100,
        },
    }
}

export function dispose(id) {

}
