export default class DataService {
    static name = 'DataService';

    constructor() {
        console.log('DataService.constructor');
    }

    register(sheet) {
        sheet.pushData = data => {
            this._callback(data);
        };
        this._sheet = sheet;
    }

    registerReceiveDataCallback(callback) {
        this._callback = callback;
    }

    getSheet() {
        return this._sheet;
    }

    async getDataAsync(data) {
        console.log('getData', data);
        return await this._sheet.invoke.invokeMethodAsync('TriggerPostData', data);
    }
}
