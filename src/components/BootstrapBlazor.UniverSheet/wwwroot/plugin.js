import DataService from './data-service.js'

const { Plugin, Injector, setDependencies, UniverInstanceType } = UniverCore;

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
            if (commandName === 'SetWorkbook') {
                this.setWorkbookData(data);
            }
            else if (commandName === 'GetWorkbook') {
                return this.getWorkbookData();
            }
        }
        return null;
    }

    setWorkbookData(data) {
        this._sheet ??= this._dataService.getUniverSheet();
        const { univerAPI } = this._sheet;
        const activeWorkbook = univerAPI.getActiveWorkbook()
        const unitId = activeWorkbook?.getId()
        if (unitId) {
            univerAPI.disposeUnit(unitId)
        }
        univerAPI.createWorkbook(JSON.parse(data));
    }

    getWorkbookData() {
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
