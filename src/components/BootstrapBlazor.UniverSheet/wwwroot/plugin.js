import DataService from './data-service.js'

const { Plugin, Injector, setDependencies } = UniverCore;

// 定义插件类
export class DefaultPlugin extends Plugin {
    static pluginName = 'DefaultPlugin';

    constructor(_injector) {
        super();

        this._injector = _injector;
    }

    onStarting() {
        this._injector.add([DataService.name, { useClass: DataService }])
    }

    onReady() {
        this._dataService = this._injector.get(DataService.name);
        this._dataService.registerReceiveDataCallback(data => {
            return this.receiveData(data);
        });
    }

    onRendered() {

    }

    receiveData(data) {
        this._sheet ??= this._dataService.getUniverSheet();
        const sheetData = data.data;
        const { univerAPI } = this._sheet;
        const rows = sheetData.length;
        let cols = 1;
        if (rows > 0) {
            cols = sheetData[0].length;
        }
        const range = univerAPI.getActiveWorkbook().getActiveSheet().getRange(0, 0, rows, cols)
        const defaultData = sheetData.map(d => {
            return d.map(v => {
                return { v: v };
            });
        });
        range.setValues(defaultData);
    }
}

// 设置依赖
setDependencies(DefaultPlugin, [Injector]);
