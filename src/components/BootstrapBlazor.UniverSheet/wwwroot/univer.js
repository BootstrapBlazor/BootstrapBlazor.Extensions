import { addScript, addLink } from '../BootstrapBlazor/modules/utility.js'
import DataService from './data-service.js'

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


export async function createUniverSheetAsync(sheet) {
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

    const workbookData = sheet.options.workbookData
    if (BootstrapBlazor.Univer.Sheet.callbacks.beforeCreateUniverSheet) {
        BootstrapBlazor.Univer.Sheet.callbacks.beforeCreateUniverSheet(sheetName, workbookData);
    }
    univerAPI.createWorkbook(workbookData);
    sheet.univer = univer;
    sheet.univerAPI = univerAPI;

    const dataService = univer._injector.get(DataService.name);
    dataService.registerUniverSheet(sheet);
}
