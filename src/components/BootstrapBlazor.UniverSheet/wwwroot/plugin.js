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

    receiveData(payload) {
        const { messageName, commandName, data } = payload;
        if (messageName === null) {
            if (commandName === 'Init') {
                this.renderContent(data);
            }
            else if (commandName === 'Push' && Array.isArray(data)) {
                this.renderContent(data);
            }
            else if (commandName === 'Save') {
                return this.saveData();
            }
        }
        return null;
    }

    renderWorkbook(data) {

    }

    renderContent(data) {
        this._sheet ??= this._dataService.getUniverSheet();
        const { univerAPI } = this._sheet;
        const rows = data.length;
        let cols = 1;
        if (rows > 0) {
            cols = data[0].length;
        }
        const range = univerAPI.getActiveWorkbook().getActiveSheet().getRange(0, 0, rows, cols)
        const values = data.map(d => {
            return d.map(v => {
                return { v: v };
            });
        });
        range.setValues(values);
    }

    saveData() {
        this._sheet ??= this._dataService.getUniverSheet();
        const { univerAPI } = this._sheet;
        const data = univerAPI.getActiveWorkbook().save();
        return {
            messageName: null,
            commandName: 'Save',
            data: JSON.stringify(data)
        };
    }
}

// 设置依赖
setDependencies(DefaultPlugin, [Injector]);
