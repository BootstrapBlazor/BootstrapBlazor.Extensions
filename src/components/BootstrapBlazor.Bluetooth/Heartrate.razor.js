let heartrateIcon = '&#10084;';
let myCharacteristic;

export function heartrate(wrapper, element, callfunction =null) {
    if (!element.id) element = document;
    const log = element.querySelector("[data-action=log]");
    const heartrate = document.querySelector("[data-action=heartrate]");

    if (callfunction && callfunction == "stopHeartrate") {
        console.log('stopHeartrate');
        stopHeartrate();
        return;
    }

    getHeartrate();

    async function getHeartrate() {
        if (heartrate) heartrate.innerHTML = '--';
        let serviceUuid = 'heart_rate';
        let characteristicUuid = 'heart_rate_measurement';
        if (characteristicUuid.startsWith('0x')) {
            characteristicUuid = parseInt(characteristicUuid);
        }

        try {
            logII('Requesting Bluetooth Device...', serviceUuid);
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: [serviceUuid] }]
            });
            wrapper.invokeMethodAsync('UpdateDevicename', device.name);

            logII('Connecting to GATT Server...');
            const server = await device.gatt.connect();

            wrapper.invokeMethodAsync('UpdateStatus', 'Getting Heartrate Service...');
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

    async function stopHeartrate() {
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
        let heartRates = parseHeartRate(value).heartRate;
        wrapper.invokeMethodAsync('UpdateValue', heartRates);
        logII('> ' + heartRates);
        if (heartRates == -1) {
            heartrate.innerHTML = "error";
        } else {
            heartrateIcon = (heartrateIcon == '&#10084;' ? '&hearts;' : '&#10084;');
            if (heartrate) heartrate.innerHTML = heartrateIcon + heartRates;
        }
    }

    function parseHeartRate(data) {
        const result = {};

        if (data.byteLength == 0) {
            result.heartRate = -1;
            return result;
        }

        const flags = data.getUint8(0);
        const rate16Bits = flags & 0x1;
        let index = 1;
        if (rate16Bits) {
            result.heartRate = data.getUint16(index, /*littleEndian=*/true);
            index += 2;
        } else {
            result.heartRate = data.getUint8(index);
            index += 1;
        }
        const contactDetected = flags & 0x2;
        const contactSensorPresent = flags & 0x4;
        if (contactSensorPresent) {
            result.contactDetected = !!contactDetected;
        }
        const energyPresent = flags & 0x8;
        if (energyPresent) {
            result.energyExpended = data.getUint16(index, /*littleEndian=*/true);
            index += 2;
        }
        const rrIntervalPresent = flags & 0x10;
        if (rrIntervalPresent) {
            const rrIntervals = [];
            for (; index + 1 < data.byteLength; index += 2) {
                rrIntervals.push(data.getUint16(index, /*littleEndian=*/true));
            }
            result.rrIntervals = rrIntervals;
        }
        return result;
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