import { addScript, addLink, getTheme } from '../BootstrapBlazor/modules/utility.js'
import DataService from './data-service.js'

const loadAssets2 = async lang => {
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/react.production.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/react-dom.production.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/rxjs.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.presets.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-core/index.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-drawing/index.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.sheets-zen-editor/index.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-data-validation/index.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-thread-comment/index.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-hyper-link/index.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-filter/index.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-conditional-formatting/index.umd.min.js');
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-advanced/index.umd.min.js');

    await addScript(`./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-core/locales/${lang}.js`);
    await addScript(`./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-drawing/locales/${lang}.js`);
    await addScript(`./_content/BootstrapBlazor.UniverSheet/univer/univerjs.sheets-zen-editor/locales/${lang}.js`);
    await addScript(`./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-data-validation/locales/${lang}.js`);
    await addScript(`./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-thread-comment/locales/${lang}.js`);
    await addScript(`./_content/BootstrapBlazor.UniverSheet/univer/univerjs.preset-sheets-advanced/locales/${lang}.js`);

    await addLink('./_content/BootstrapBlazor.UniverSheet/univer/univer-sheet.bundle.css');
}

const loadAssets = async lang => {
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univer-bundle.js');
    await addLink('./_content/BootstrapBlazor.UniverSheet/univer/univer-sheet.bundle.css');
}
export async function createUniverSheetAsync(sheet) {
    sheet.lang = sheet.lang ?? 'en-US';
    await loadAssets(sheet.lang);
    const { el } = sheet;
    const { LocaleType, merge } = UniverCore;
    const { createUniver } = UniverPresets;
    const { UniverSheetsCorePreset } = UniverPresetSheetsCore;
    const { UniverSheetsDrawingPreset } = UniverPresetSheetsDrawing;
    const { UniverSheetsAdvancedPreset } = UniverPresetSheetsAdvanced;
    const { UniverSheetsZenEditorPlugin } = UniverSheetsZenEditor;
    const { UniverSheetsThreadCommentPreset } = UniverPresetSheetsThreadComment;
    const { UniverSheetsDataValidationPreset } = UniverPresetSheetsDataValidation;

    const lang = sheet.lang.replace('-', '')
    const langStr = lang.charAt(0).toUpperCase() + lang.slice(1)
    const options = {
        theme: sheet.theme, 
        darkMode: sheet.darkMode,
        locale: lang,
        locales: {
            [lang]: merge(
                {},
                window[`UniverPresetSheetsCore${langStr}`],
                window[`UniverPresetSheetsDrawing${langStr}`],
                window[`UniverSheetsZenEditor${langStr}`],
                window[`UniverPresetSheetsDataValidation${langStr}`],
                window[`UniverPresetSheetsThreadComment${langStr}`],
                window[`UniverPresetSheetsAdvanced${langStr}`],
            ),
        },
        presets: [
            UniverSheetsCorePreset({
                container: el,
                ribbonType: sheet.ribbonType ?? 'simple', // default | classic | simple
                menu: {
                    'sheet.menu.print': {
                      hidden: true,
                    },
                    'sheets-exchange-client.operation.exchange': {
                      hidden: true,
                    },
                  },
            }),
            UniverSheetsDrawingPreset(),
            UniverSheetsThreadCommentPreset(),
            UniverSheetsDataValidationPreset(),
            UniverSheetsAdvancedPreset(),
        ],
        plugins: [
            UniverSheetsZenEditorPlugin,
        ]
    };
    const plugins = sheet.plugins ?? {
        DefaultPlugin: '_content/BootstrapBlazor.UniverSheet/plugin.js'
    };
    for (const name in plugins) {
        const module = await import(`../../${plugins[name]}`);
        const plugin = module[name];
        options.plugins.push(plugin);
    }

    if (options.theme === 'greenTheme') {
        options.theme = UniverDesign.greenTheme;
    }
    else {
        options.theme = UniverDesign.defaultTheme;
    }

    if (options.darkMode === null) {
        options.darkMode = getTheme() === 'dark';
    }

    const { univer, univerAPI } = createUniver(options);

    const { workbookData } = sheet.data || {};
    if (workbookData) {
        const option = typeof workbookData === 'string' ? JSON.parse(workbookData) : workbookData;
        univerAPI.createWorkbook(option);
    }
    else {
        univerAPI.createWorkbook();
    }

    const disposable = univerAPI.addEvent(
        univerAPI.Event.LifeCycleChanged,
        ({ stage }) => {
          if (stage === univerAPI.Enum.LifecycleStages.Rendered) {
            console.log('界面渲染完成')
            // 移除loading...
            
            // 移除监听器
            disposable.dispose()
          }
        },
      )

    sheet.univer = univer;
    sheet.univerAPI = univerAPI;
    sheet.dispose = () => {
        univer.dispose();
    }

    const dataService = univer._injector.get(DataService.name);
    dataService.registerUniverSheet(sheet);
}
