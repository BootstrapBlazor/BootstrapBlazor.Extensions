import { addScript, getTheme } from '../BootstrapBlazor/modules/utility.js'
import DataService from './data-service.js'

export async function createUniverSheetAsync(sheet) {
    await addScript('./_content/BootstrapBlazor.UniverSheet/univer/univer-bundle.js');

    sheet.lang = sheet.lang ?? 'en-US';
    const { el } = sheet;
    const { LocaleType, merge } = UniverCore;
    const { createUniver } = UniverPresets;
    const { UniverSheetsCorePreset } = UniverPresetSheetsCore;
    const { UniverSheetsDrawingPreset } = UniverPresetSheetsDrawing;
    const { UniverSheetsZenEditorPlugin } = UniverSheetsZenEditor;
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
                window[`UniverProSheetsChart${langStr}`],
                window[`UniverProSheetsChartUi${langStr}`],
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
                sheets: {
                    disableForceStringAlert: true,
                    disableForceStringMark: true,
                }
            }),
            UniverSheetsDrawingPreset(),
            UniverSheetsDataValidationPreset(),
        ],
        plugins: [
            UniverSheetsZenEditorPlugin,
            UniverProSheetsChart.UniverSheetsChartPlugin,
            UniverProSheetsChartUi.UniverSheetsChartUIPlugin,
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

    const { onRendered } = sheet.events;
    if (onRendered) {
        const disposable = univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, e => {
            const { stage } = e;
            if (stage === univerAPI.Enum.LifecycleStages.Rendered) {
                onRendered();
                disposable.dispose()
            }
        });
    }

    sheet.univer = univer;
    sheet.univerAPI = univerAPI;
    sheet.dispose = () => {
        univer.dispose();
    }

    const dataService = univer._injector.get(DataService.name);
    dataService.registerUniverSheet(sheet);
}
