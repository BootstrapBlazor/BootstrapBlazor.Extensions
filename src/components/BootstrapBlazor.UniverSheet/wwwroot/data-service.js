import { isFunction } from '../BootstrapBlazor/modules/utility.js'

export default class DataService {
    static name = 'DataService';

    registerUniverSheet(sheet) {
        sheet.firstPush = true;
        sheet.pushData = data => {
            sheet.firstPush = false;
            this._checkReceiveDataCallback();
            return this._callback(data);
        };
        this._sheet = sheet;
    }

    registerReceiveDataCallback(callback) {
        this._callback = callback;
    }

    getUniverSheet() {
        this._checkUniverSheet();
        return this._sheet;
    }

    async getDataAsync(data) {
        this._checkUniverSheet();
        return await this._sheet.invoke.invokeMethodAsync('TriggerPostData', data);
    }

    _checkUniverSheet() {
        if (this._sheet === void 0) {
            throw new Error('UniverSheet is not registered. Please call registerUniverSheet first');
        }
    }

    _checkReceiveDataCallback() {
        if (isFunction(this._callback) === false) {
            throw new Error('Receive data callback is not registered. Please call registerReceiveDataCallback first');
        }
    }
}
