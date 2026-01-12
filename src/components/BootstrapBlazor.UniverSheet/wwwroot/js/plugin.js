import DataService from './data-service.js'

const { Plugin, Injector, setDependencies } = UniverCore;

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
        const { messageName, commandName, data, workbookData } = payload;
        if (messageName === null) {
            if (commandName === 'SetWorkbook') {
                this.setWorkbookData(JSON.parse(workbookData));
            }
            else if (commandName === 'GetWorkbook') {
                return this.getWorkbookData();
            }
            else if (commandName == 'UpdateRange') {
                this.updateRange(data);
            }
        }
        return null;
    }

    setWorkbookData(data) {
        this._sheet = this._sheet || this._dataService.getUniverSheet();
        const { univerAPI } = this._sheet;
        const activeWorkbook = univerAPI.getActiveWorkbook()
        const unitId = activeWorkbook?.getId()
        if (unitId) {
            univerAPI.disposeUnit(unitId)
        }
        univerAPI.createWorkbook(data);
    }

    getWorkbookData() {
        this._sheet = this._sheet || this._dataService.getUniverSheet();
        const { univerAPI } = this._sheet;
        const data = univerAPI.getActiveWorkbook().save();
        delete data.id;
        delete data.name;
        delete data.sheetOrder;
        delete data.appVersion;
        delete data.resources;
        return {
            messageName: null,
            commandName: null,
            data: JSON.stringify(data)
        };
    }

    updateRange(data) {
        this._sheet = this._sheet || this._dataService.getUniverSheet();
        const { univerAPI } = this._sheet;
        const sheet = univerAPI.getActiveWorkbook().getActiveSheet();
        const range = sheet.getRange(data.range);
        range.setValue(data.value);
    }
}

// 设置依赖
setDependencies(DefaultPlugin, [Injector]);
