import { addScript, addLink } from '../BootstrapBlazor/modules/utility.js'
import DataService from './data-service.js'

const loadAssets = async lang => {
    console.log(lang, 'lang');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/react.production.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/react-dom.production.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/rxjs.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.presets.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-core/index.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-drawing/index.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.sheets-zen-editor/index.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-data-validation/index.umd.min.js');

    await addScript(`./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-core/locales/${lang}.js`);
    await addScript(`./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-drawing/locales/${lang}.js`);
    await addScript(`./_content/BootstrapBlazor.UniverSheet/univer/univerjs.sheets-zen-editor/locales/${lang}.js`);
    await addScript(`./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-data-validation/locales/${lang}.js`);

    await addLink('./_content/BootstrapBlazor.UniverSheet/univer/univer-sheet.bundle.css');
}

export async function createUniverSheetAsync(sheet) {
    await loadAssets(sheet.lang);
    
    const { el } = sheet;
    const { LocaleType, merge } = UniverCore;
    const { createUniver } = UniverPresets;
    const { UniverSheetsCorePreset } = UniverPresetSheetsCore;
    const { UniverSheetsDrawingPreset } = UniverPresetSheetsDrawing;
    const { UniverSheetsZenEditorPlugin } = UniverSheetsZenEditor
    const { UniverSheetsDataValidationPlugin } = UniverSheetsDataValidation
    const { UniverSheetsDataValidationUIPlugin } = UniverSheetsDataValidationUi
    const lang = sheet.lang.replace('-', '')
    const langStr = lang.charAt(0).toUpperCase() + lang.slice(1)
    const options = {
        theme: UniverDesign[sheet.theme] ?? UniverDesign.defaultTheme, //'defaultTheme' | greenTheme
        locale: lang,
        locales: {
            [lang]: merge(
                {},
                window[`UniverPresetSheetsCore${langStr}`],
                window[`UniverPresetSheetsDrawing${langStr}`],
                window[`UniverSheetsZenEditor${langStr}`],
                window[`UniverSheetsDataValidationUi${langStr}`],
            ),
        },
        plugins: [
            UniverSheetsZenEditorPlugin,
            UniverSheetsDataValidationPlugin,
            UniverSheetsDataValidationUIPlugin,
        ]
    };
    const plugins = sheet.plugins ?? {
        DefaultPlugin: '_content/BootstrapBlazor.UniverSheet/plugin.js'
    };
    for (const name in plugins) {
        const module = await import(`../../../${plugins[name]}`);
        const plugin = module[name];
        options.plugins.push(plugin);
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

    const { workbookData } = sheet.data || {};
    if (workbookData) {
        const option = typeof workbookData === 'string' ? JSON.parse(workbookData) : workbookData;
        univerAPI.createWorkbook(option);
    }
    else {
        univerAPI.createWorkbook();
    }

    sheet.univer = univer;
    sheet.univerAPI = univerAPI;
    sheet.dispose = () => {
        univer.dispose();
    }

    const dataService = univer._injector.get(DataService.name);
    dataService.registerUniverSheet(sheet);
}
