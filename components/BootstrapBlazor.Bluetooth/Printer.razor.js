export function addScript(url) {
    let scriptsIncluded = false;
    let scriptTags = document.querySelectorAll('head > script');
    scriptTags.forEach(scriptTag => {
        if (scriptTag) {
            let srcAttribute = scriptTag.getAttribute('src');
            if (srcAttribute && srcAttribute.startsWith(url)) {
                scriptsIncluded = true;
                return true;
            }
        }
    });

    if (scriptsIncluded) {
        return true;
    }

    let script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
    return false;

}

let port;
let bluetoothDevice;
let serialWriter;
let myDescriptor;

export function printFunction(wrapper, element, opt = null, callfunction = null, write = null) {
    if (!element.id) element = document;
    const log = element.querySelector("[data-action=log]");
    const btnConnect = element.querySelector("[data-action=btnConnect]");
    const btnwrite = element.querySelector("[data-action=btnwrite]");
    const btnwrite2 = element.querySelector("[data-action=btnwrite2]");
    const btnwriteR = element.querySelector("[data-action=btnwriteR]");
    const btnwriteQr = element.querySelector("[data-action=btnwriteQr]");
    const barcode = element.querySelector("[data-action=barcode]");
    const notSupportedSerial = element.querySelector("[data-action=notSupportedSerial]");
    const notSupportedBluetooth = element.querySelector("[data-action=notSupportedBluetooth]");
    const tools = element.querySelector("[data-action=tools]");
    const btnDisconnect = element.querySelector("[data-action=btnDisconnect]");
    const btnReconnect = element.querySelector("[data-action=btnReconnect]");
    const btnGetDevices = element.querySelector("[data-action=btnGetDevices]");
    const btnComConnect = element.querySelector("[data-action=btnComConnect]");
    const btnConnectdevice = element.querySelector("[data-action=btnConnectdevice]");
    const selectDevices = element.querySelector("[data-action=selectDevices]");
    const devicename = element.querySelector("[data-action=devicename]");
    const serviceUuid = element.querySelector("[data-action=serviceUuid]");

    if (callfunction && callfunction == "write") {
        console.log('start WriteChunk');
        WriteChunk(write);
        return;
    } else if (callfunction && callfunction == "connectdevice") {
        console.log('start connect device:' + opt.devicename);
        connectDevices(opt.devicename);
        return;
    }

    console.log('start printer');


    let cpcl = '! 10 200 200 400 1\r\n' +
        'BEEP 1\r\n' +
        'PW 380\r\n' +
        'SETMAG 1 1\r\n' +
        'CENTER\r\n' +
        'TEXT 10 2 10 40 Loranca Bar\r\n' +
        'TEXT 12 3 10 75 DaydayGO\r\n' +
        'TEXT 10 2 10 350 eMenu\r\n' +
        'B QR 30 150 M 2 U 7\r\n' +
        'MA,https://app1.es/1121\r\n' +
        'ENDQR\r\n' +
        'FORM\r\n' +
        'PRINT\r\n';

    if (!opt) opt = {
        "id": null,
        "deviceID": null,
        "devicename": null,
        "serviceUuid": '0xff00',
        "characteristicUuid": '0xff02',
        "descriptorsUuid": null,
        "maxChunk": 100,
        "namePrefix": null
    };

    if (!callfunction) {
        initBtprinter();
        if (btnGetDevices)
           getDevices();
    }
    function initBtprinter() {
        console.log('start printer DOMContentLoaded');
        if (btnConnect) btnConnect.addEventListener("click", onConnect);

        if (btnGetDevices) btnGetDevices.addEventListener("pointerup", getDevices);
        if (selectDevices) selectDevices.addEventListener("change", (event) => {
            logII(event.target.value);
            if (devicename) devicename.value = event.target.value;
            opt.devicename = event.target.value;
            //await connectDevices(opt.devicename)
        });

        if (btnwrite) btnwrite.addEventListener("click", () => {
            let string = barcode.value.replace(/\n/g, '\r\n');
            WriteChunk(string);
        });

        if (btnwrite2) btnwrite2.addEventListener("click", () => {
            let string = PrintLabelBMAU('Batata Nopa 商品', '12345', '1.23');
            barcode.value = string;
            WriteChunk(string);
        });

        if (btnwriteR) btnwriteR.addEventListener("click", () => {
            WriteChunk(cpcl);
        });

        if (btnwriteQr) btnwriteQr.addEventListener("click", () => {
            WriteChunk(cpcl);
        });

        if (btnDisconnect) btnDisconnect.addEventListener('click', () => {
            event.stopPropagation();
            event.preventDefault();
            onDisconnectButtonClick();
        });

        if (btnReconnect) btnReconnect.addEventListener('click', () => {
            event.stopPropagation();
            event.preventDefault();
            onReconnectButtonClick();
        });

        if (btnComConnect) btnComConnect.addEventListener('click', async () => {
            // 响应用户手势（例如触摸或鼠标单击）来提示用户选择单个串行端口
            const port = await navigator.serial.requestPort();
            getPorts();
        });

        if (btnConnectdevice) btnConnectdevice.addEventListener("click", async () => connectDevices());

        if (notSupportedBluetooth) notSupportedBluetooth.classList.toggle('hidden', 'bluetooth' in navigator);
        if (notSupportedSerial) notSupportedSerial.classList.toggle('hidden', 'serial' in navigator);
        if (tools) tools.classList.add('hidden');
        if (btnDisconnect) btnDisconnect.classList.add('hidden');
        if (btnReconnect) btnReconnect.classList.add('hidden');

        //let string = PrintLabelBMAU('Batata Nopa 商品', '12345', '1.23');
        //barcode.value = string;
        if (barcode) barcode.value = cpcl;
    };

    async function getPorts() {
        //或者选择一个navigator.serial.getPorts()返回网站已被授予访问权限的串行端口列表的串行端口
        let ports = await navigator.serial.getPorts();
        if (ports.length > 0) {
            port = ports[0];
            console.log('设备0', port);
            await port.open({ baudRate: 9600 });
            logII('已连接');
            serialWriter = port.writable.getWriter();

            await WriteChunk(cpcl);

            // Allow the serial port to be closed later.
            serialWriter.releaseLock();
            await port.close();
        }
    }


    async function onConnect() {
        bluetoothDevice = null;

        if (opt.serviceUuid && opt.serviceUuid.toString().startsWith('0x')) {
            opt.serviceUuid = parseInt(opt.serviceUuid);
        }
        if (opt.characteristicUuid && opt.characteristicUuid.toString().startsWith('0x')) {
            opt.characteristicUuid = parseInt(opt.characteristicUuid);
        }

        try {
            logII('Requesting any Bluetooth Device...');
            var option = {
                //acceptAllDevices: true,
                //"filters": [{
                //    namePrefix: "BMAU"
                //    services: [0x1234, 0x12345678, '99999999-0000-1000-8000-00805f9b34fb']
                //}],
                //optionalServices: [opt.serviceUuid]
            }
            if (serviceUuid && serviceUuid.value.length>0)
                option.optionalServices = [serviceUuid.value];
            else if (opt.serviceUuid)
                option.optionalServices = [opt.serviceUuid];
            
            if (opt.namePrefix)
                option.filters = [{namePrefix: opt.namePrefix }];
            else if (opt.filtersServices)
                option.filters = [{ services: opt.filtersServices }];
            else
                option.acceptAllDevices = true;

            bluetoothDevice = await navigator.bluetooth.requestDevice(option);
            bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
            await connect();
        } catch (error) {
            logErr('Argh! ' + error);
        }
    }

    async function connect() {
        exponentialBackoff(3 /* max retries */, 2 /* seconds delay */,
            async function toTry() {
                time('Connecting to Bluetooth Device... ');
                logII('Connecting to GATT Server...');
                logII('> Name:             ' + bluetoothDevice.name);
                logII('> Id:               ' + bluetoothDevice.id);
                opt.devicename = bluetoothDevice.name;
                opt.deviceID = bluetoothDevice.id;
                wrapper.invokeMethodAsync('GetResult', opt, "连接中...");
                wrapper.invokeMethodAsync('UpdateError', '');

                const server = await bluetoothDevice.gatt.connect();

                logII('Getting Services...');
                const services = await server.getPrimaryServices();
                logII('Getting Characteristics...');
                for (const service of services) {
                    logII('> Service: ' + service.uuid);
                    const characteristics = await service.getCharacteristics();

                    characteristics.forEach(characteristic => {
                        if (getSupportedPropertiesWrite(characteristic)) {
                            logII('>> Characteristic: ' + characteristic.uuid);
                            opt.characteristicUuid = characteristic.uuid;
                            myDescriptor = characteristic;
                            return;
                        }
                    });
                    if (opt.characteristicUuid) {
                        if (tools) tools.classList.remove('hidden');
                        if (btnDisconnect) btnDisconnect.classList.remove('hidden');
                        if (btnReconnect) btnReconnect.classList.remove('hidden');
                        wrapper.invokeMethodAsync('GetResult', opt, "已连接");
                        wrapper.invokeMethodAsync('UpdateError', '');

                        return;
                    }
                }
            },
            function success() {
                logII(`> Bluetooth Device ${bluetoothDevice.name} connected. `);
            },
            function fail() {
                time('Failed to reconnect.');
            });
    }

    /* Utils */
    function onDisconnectButtonClick() {
        if (!bluetoothDevice) {
            return;
        }
        logII('Disconnecting from Bluetooth Device...');
        if (bluetoothDevice.gatt.connected) {
            bluetoothDevice.gatt.disconnect();
        } else {
            logII('> Bluetooth Device is already disconnected');
        }
    }

    function onDisconnected(event) {
        // Object event.target is Bluetooth Device getting disconnected.
        const device = event.target;
        if (tools) tools.classList.add('hidden');
        if (btnDisconnect) btnDisconnect.classList.add('hidden');
        if (btnReconnect) btnReconnect.classList.add('hidden');
        logII(`> Bluetooth Device ${device.name} disconnected`);
    }

    function onReconnectButtonClick() {
        if (!bluetoothDevice) {
            return;
        }
        if (bluetoothDevice.gatt.connected) {
            logII('> Bluetooth Device is already connected');
            return;
        }
        try {
            connect();
        } catch (error) {
            logErr('Argh! ' + error);
        }
    }
    async function getDevices() {
        try {
            let getBluetoothDevices = await navigator.bluetooth.getDevices();
            let devices = [];
            if (selectDevices) selectDevices.innerHTML = "";
            getBluetoothDevices.forEach(element => {
                logII(element.name);
                devices.push(element.name);
                if (selectDevices) {
                    var opt = document.createElement('option');
                    opt.value = element.name;
                    opt.innerHTML = element.name;
                    selectDevices.appendChild(opt);
                }
            });
            wrapper.invokeMethodAsync('GetDevices', devices);
            //    logII(getBluetoothDevices);
            //    bluetoothDevice = getBluetoothDevices[0];
            //    await connect();
        } catch (error) {
            logErr('Argh! ' + error);
        }
    }

    async function connectDevices(name = null) {
        try {
            if (!name && devicename) name = devicename.value;
            else if (!name && opt.devicename) name = opt.devicename;

            let getBluetoothDevices = await navigator.bluetooth.getDevices();
            try {
                getBluetoothDevices.forEach(device => {
                    if (name == device.name) {
                        bluetoothDevice = device;
                        throw 'BreakException';
                    }
                });
            } catch (error) {
                if (error !== 'BreakException') {
                    throw error;
                } else {
                    logII('连接' + bluetoothDevice);
                    await connect();
                }
            }
        } catch (error) {
            if (e !== 'BreakException') {
                logErr('Argh! ' + error);
            }
        }
    }

    function getSupportedProperties(characteristic) {
        let supportedProperties = [];
        for (const p in characteristic.properties) {
            if (characteristic.properties[p] === true) {
                supportedProperties.push(p);
            }
        }
        return '[' + supportedProperties.join(', ') + ']';
    }

    function getSupportedPropertiesWrite(characteristic) {
        for (const p in characteristic.properties) {
            if (characteristic.properties.write) {
                return true;
            }
        }
        return false;
    }

    async function WriteChunk(string) {
        if (!myDescriptor && !serialWriter) {
            console.log(' > !myDescriptor serialWriter null!');
            return;
        }
        console.log('WriteChunk', string);
        var buffer = GBK.encode(string);
        var buffer1 = new Uint8Array(buffer).buffer;

        for (let i = 0, j = 0, length = buffer1.byteLength; i < length; i += opt.maxChunk, j++) {
            let subPackage = buffer1.slice(i, i + opt.maxChunk <= length ? (i + opt.maxChunk) : length);
            await _print(subPackage);
        }
    }

    async function _print(buffer) {
        try {
            logII('Setting Characteristic User Description...');
            console.log(buffer);
            if (myDescriptor)
                await myDescriptor.writeValue(buffer);
        } catch (error) {
            logErr('Argh! ' + error);
        }
        try {
            if (serialWriter) {
                await serialWriter.write(buffer);
            }
        } catch (error) {
            logErr('Argh! ' + error);
        }
    }

    function PrintLabelBMAU(title, barcode, price) {
        //店名
        var title0 = '店名 My Shop';
        var size1 = '1 1';
        var BMAUtitle0 = '1 0 0 250';

        //名称
        var size2 = '2 2';
        var BMAUtitle = '1 0 10 10';

        //条码
        var BMAUbarcode = '1 0 50 0 70';

        //价格
        var BMAUprice = '2 0 0 170';
        var size3 = '3 3';

        // 价格PVP和Euros
        var size4 = '2 2';
        var pos4 = '1 0 10 200';
        var pos5 = '1 0 10 200';

        // 标签
        var LABELsize = '0 200 200 290';
        var LABELWidth = '450';

        return '! ' + LABELsize + ' 1\r\n' +
            'BEEP 1\r\n' +
            'PW ' + LABELWidth + '\r\n' +
            'CENTER\r\n' +
            'SETMAG ' + size1 + '\r\n' +
            'TEXT ' + BMAUtitle0 + ' ' + title0 + '\r\n' +
            'SETMAG ' + size2 + '\r\n' +
            'TEXT ' + BMAUtitle + ' ' + title + '\r\n' +
            'BARCODE-TEXT 7 0 5\r\n' +
            'BARCODE 128 ' + BMAUbarcode + ' ' + barcode + '\r\n' +
            'BARCODE-TEXT OFF\r\n' +
            'SETBOLD 1\r\n' +
            'SETMAG ' + size3 + '\r\n' +
            'TEXT ' + BMAUprice + ' ' + price + '\r\n' +
            'SETMAG ' + size4 + '\r\n' +
            'LEFT\r\n' +
            'TEXT ' + pos5 + ' PVP:\r\n' +
            'RIGHT\r\n' +
            'TEXT ' + pos4 + ' Euros\r\n' +
            'SETBOLD 0\r\n' +
            'FORM\r\n' +
            'PRINT\r\n';


    }

    function logII(info) {
        if (log) log.textContent += info + '\n';
        console.log(info);
        wrapper.invokeMethodAsync('UpdateStatus', info);
    }

    function logErr(info) {
        if (log) log.textContent += info + '\n';
        console.log(info);
        wrapper.invokeMethodAsync('UpdateError', info);
    }

    // This function keeps calling "toTry" until promise resolves or has
    // retried "max" number of times. First retry has a delay of "delay" seconds.
    // "success" is called upon success.
    async function exponentialBackoff(max, delay, toTry, success, fail) {
        try {
            const result = await toTry();
            success(result);
        } catch (error) {
            logErr('Argh! ' + error);
            if (max === 0) {
                return fail();
            }
            time('Retrying in ' + delay + 's... (' + max + ' tries left)');
            setTimeout(function () {
                exponentialBackoff(--max, delay * 2, toTry, success, fail);
            }, delay * 1000);
        }
    }

    function time(text) {
        logII('[' + new Date().toJSON().substr(11, 8) + '] ' + text);
    }
}