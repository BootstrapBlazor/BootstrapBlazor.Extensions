export default class DataService {
    static name = 'DataService';

    registerUniverSheet(sheet) {
        sheet.pushData = data => {
            this._checkReceiveDataCallback();
            this._callback(data);
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
        if (typeof (this._callback) !== 'function') {
            throw new Error('Receive data callback is not registered. Please call registerReceiveDataCallback first');
        }
    }
}
