import { addScript, addLink } from '../../BootstrapBlazor/modules/utility.js'
import Data from '../../BootstrapBlazor/modules/data.js'

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

    await addLink('./_content/BootstrapBlazor.UniverSheet/univer/css/univer-sheet.bundle.css');

    const sheet = {
        el,
        invoke,
        options,
    };
    await createUniverSheet(sheet);
    Data.set(id, sheet);
}

const createUniverSheet = async sheet => {
    const { el } = sheet;
    const { LocaleType, merge } = UniverCore;
    const { createUniver } = UniverPresets;
    const { UniverSheetsCorePreset } = UniverPresetSheetsCore;
    const { UniverSheetsDrawingPreset } = UniverPresetSheetsDrawing;
    const { UniverSheetsZenEditorPlugin } = UniverSheetsZenEditor
    const { defaultTheme } = UniverDesign;
    const options = {
        theme: defaultTheme,
        locale: LocaleType.ZH_CN,
        locales: {
            [LocaleType.ZH_CN]: merge(
                {},
                UniverPresetSheetsCoreZhCN,
                UniverPresetSheetsDrawingZhCN,
                UniverSheetsZenEditorZhCN
            ),
        },
        plugins: [
            UniverSheetsZenEditorPlugin
        ]
    };
    const sheetName = sheet.options.sheetName ?? "default";
    const plugins = sheet.options.plugins ?? {};
    for (const name in plugins) {
        const module = await import(`../../../${plugins[name]}`);
        options.plugins.push(module[name]);
    }

    if (BootstrapBlazor.Univer.Sheet.callbacks.beforeCreateUniver) {
        BootstrapBlazor.Univer.Sheet.callbacks.beforeCreateUniver(sheetName, options);
    }
    const { univer, univerAPI } = createUniver({
        presets: [
            UniverSheetsCorePreset({
                container: el
            }),
            UniverSheetsDrawingPreset(),
        ],
        ...options
    });

    const workbookData = {
        defaultWorkbookData
    };
    if (BootstrapBlazor.Univer.Sheet.callbacks.beforeCreateUniverSheet) {
        BootstrapBlazor.Univer.Sheet.callbacks.beforeCreateUniverSheet(sheetName, workbookData);
    }
    univerAPI.createUniverSheet();
    sheet.univer = univer;
    sheet.univerAPI = univerAPI;

    sheet.customService = sheet.univerAPI._injector.get('zhangsan');
    sheet.customService.pushData = data => {
        sheet.invoke.invokeMethodAsync('TriggerPostData', data);
    }
}

export function execute(id, data) {
    const sheet = Data.get(id);
    sheet.customService.receiveData(data);
}

export function dispose(id) {

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
