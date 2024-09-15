let device, myCharacteristic;

export function notification(wrapper, element, callfunction = null, serviceUuid = 'heart_rate', characteristicUuid = 'heart_rate_measurement', autoConnect = false, automaticComplement = false, advertisementReceived =false) {
    if (!element.id) element = document;
    const log = element.querySelector("[data-action=log]");
    const notificationValue = document.querySelector("[data-action=notificationValue]");

    if (callfunction && callfunction == "stopNotification") {
        console.log('stopNotification');
        stopNotification();
        return;
    }

    getNotification();

    async function getNotification() {
        if (notificationValue) notificationValue.innerHTML = '--';
        serviceUuid = checkUUID(serviceUuid, automaticComplement);
        characteristicUuid = checkUUID(characteristicUuid, automaticComplement); 
        try {
            let devices = await navigator.bluetooth.getDevices();
            if (devices.length > 0) {
                if (autoConnect) {
                    device = devices[0];
                    console.log("自动连接设备", device);
                    logII(`自动连接设备 ${device.name}`);
                }
                logII(`获取到授权设备: ${devices.length}`);
            }
        } catch (error) {
            logErr('Argh! ' + error);
        }

        try {
            if (!device) {
                logII(`Requesting Bluetooth Device... ${serviceUuid}`);
                try {

                    device = await navigator.bluetooth.requestDevice({
                        filters: [{ services: [serviceUuid] }]
                    });
                } catch (error) {
                    device = null;
                    logErr('Argh! ' + error);
                    return;
                }
            }

            if (advertisementReceived) {
                const abortController = new AbortController();
                device.addEventListener('advertisementreceived', (event) => {
                    logII('Advertisement received.');
                    // Stop watching advertisements to conserve battery life.
                    abortController.abort();
                    logII('  Device Name: ' + event.device.name);
                    logII('  Device ID: ' + event.device.id);
                    logII('  RSSI: ' + event.rssi);
                    logII('  TX Power: ' + event.txPower);
                    logII('  UUIDs: ' + event.uuids);
                    event.manufacturerData.forEach((valueDataView, key) => {
                        logDataView('Manufacturer', key, valueDataView);
                    });
                    event.serviceData.forEach((valueDataView, key) => {
                        logDataView('Service', key, valueDataView);
                    });
                });

                logII('Watching advertisements from "' + device.name + '"...');
                await device.watchAdvertisements({ signal: abortController.signal }); 
            }

            wrapper.invokeMethodAsync('UpdateDevicename', device.name);

            logII(`${device.name}`);
            logII('Connecting to GATT Server...');
            const server = await device.gatt.connect();

            wrapper.invokeMethodAsync('UpdateStatus', 'Getting Service...');
            logII('Getting Service...');
            const service = await server.getPrimaryService(serviceUuid);

            logII('Getting Characteristic...');
            myCharacteristic = await service.getCharacteristic(characteristicUuid);

            await myCharacteristic.startNotifications();

            logII('> Notifications started');
            myCharacteristic.addEventListener('characteristicvaluechanged',
                handleNotifications);
        } catch (error) {
            logErr('Argh! ' + error);
        }
    }

    function checkUUID(uuid, automaticComplement) {
        if (uuid.startsWith('0x')) {
            if (!automaticComplement) {
                try {
                    uuid = parseInt(uuid);
                } catch (error) {
                    uuid = uuid.replace('0x', '0000') + '-0000-1000-8000-00805f9b34fb';
                }
            } else {
                uuid = uuid.replace('0x', '0000') + '-0000-1000-8000-00805f9b34fb';
            }
        }
        return uuid;
    }

    async function stopNotification() {
        device = null;
        if (myCharacteristic) {
            try {
                await myCharacteristic.stopNotifications();
                logII('> Notifications stopped');
                myCharacteristic.removeEventListener('characteristicvaluechanged',
                    handleNotifications);
            } catch (error) {
                logErr('Argh! ' + error);
            }
        }
    }

    function handleNotifications(event) {
        let value = event.target.value;
        let a = [];
        // 将原始数据字节转换为十六进制值只是为了显示某些内容。
        // 在“真实”世界中，您可以使用 data.get Uint8、data.get Uint16 甚至
        // 文本解码器处理原始数据字节。
        for (let i = 0; i < value.byteLength; i++) {
            a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
        }
        let result = a.join(' ');
        wrapper.invokeMethodAsync('UpdateValue', result);
        logII('> ' + result);
        if (result) notificationValue.innerHTML = result;
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

}

/* Utils */

const logDataView = (labelOfDataSource, key, valueDataView) => {
    const hexString = [...new Uint8Array(valueDataView.buffer)].map(b => {
        return b.toString(16).padStart(2, '0');
    }).join(' ');
    const textDecoder = new TextDecoder('ascii');
    const asciiString = textDecoder.decode(valueDataView.buffer);
    console.log(`  ${labelOfDataSource} Data: ` + key +
        '\n    (Hex) ' + hexString +
        '\n    (ASCII) ' + asciiString);
};

export async function scan(wrapper,allAdvertisements=true, filterName = null, filterNamePrefix=null,) {
    let filters = [];

    if (filterName) {
        filters.push({ name: filterName });
    }

    if (filterNamePrefix) {
        filters.push({ namePrefix: filterNamePrefix });
    }

    let options = {};
    if (allAdvertisements) {
        options.acceptAllAdvertisements = true;
    } else {
        options.filters = filters;
    }

    try {
        logII('Requesting Bluetooth Scan with options: ' + JSON.stringify(options));
        const scan = await navigator.bluetooth.requestLEScan(options);

        logII('Scan started with:');
        logII(' acceptAllAdvertisements: ' + scan.acceptAllAdvertisements);
        logII(' active: ' + scan.active);
        logII(' keepRepeatedDevices: ' + scan.keepRepeatedDevices);
        logII(' filters: ' + JSON.stringify(scan.filters));

        navigator.bluetooth.addEventListener('advertisementreceived', event => {
            logII('Advertisement received.');
            logII('  Device Name: ' + event.device.name);
            logII('  Device ID: ' + event.device.id);
            logII('  RSSI: ' + event.rssi);
            logII('  TX Power: ' + event.txPower);
            logII('  UUIDs: ' + event.uuids);
            event.manufacturerData.forEach((valueDataView, key) => {
                logDataView('Manufacturer', key, valueDataView);
            });
            event.serviceData.forEach((valueDataView, key) => {
                logDataView('Service', key, valueDataView);
            });
        });

        setTimeout(stopScan, 10000);
        function stopScan() {
            logII('Stopping scan...');
            scan.stop();
            logII('Stopped.  scan.active = ' + scan.active);
        }
    } catch (error) {
        logII('Argh! ' + error);
    }

    function logII(info) {
        console.log(info);
        wrapper.invokeMethodAsync('UpdateStatus', info);
    }

}