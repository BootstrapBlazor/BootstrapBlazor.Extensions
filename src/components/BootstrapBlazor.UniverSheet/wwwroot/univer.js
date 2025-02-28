import { addScript, addLink } from '../BootstrapBlazor/modules/utility.js'

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

const loadAssets = async () => {
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
}


export async function createUniverSheet(sheet) {
    await loadAssets();

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
        const plugin = module[name];
        options.plugins.push(plugin);
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

    const dataService = univer._injector.get(DataService.name);
    dataService.register(sheet);
}

export class DataService {
    static name = 'DataService';

    constructor() {
        console.log('DataService.constructor');
    }

    receiveData(data) {
        this._callback(data);
    }

    register(sheet) {
        this._sheet = sheet;
        this._sheet.pushData = this.receiveData.bind(this);
    }

    registerCallback(callback) {
        this._callback = callback;
    }

    getSheet() {
        return this._sheet;
    }

    async getData(data) {
        console.log('getData', data);
        return await this._sheet.invoke.invokeMethodAsync('TriggerPostData', data);
    }
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
