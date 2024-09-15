export function getBatteryLevel(wrapper, element) {
    if (!element.id) element = document;
    const log = element.querySelector("[data-action=log]"); 
    getBatteryLevel();
    async function getBatteryLevel() {
        try {
            logII('Requesting Bluetooth Device...');
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['battery_service', 'heart_rate'] }]
            });
            wrapper.invokeMethodAsync('UpdateDevicename', device.name);

            logII('Connecting to GATT Server...');
            const server = await device.gatt.connect();

            wrapper.invokeMethodAsync('UpdateStatus', 'Getting Battery Service...');
            logII('Getting Battery Service...');
            const service = await server.getPrimaryService('battery_service');

            logII('Getting Battery Level Characteristic...');
            const characteristic = await service.getCharacteristic('battery_level');

            logII('Reading Battery Level...');
            const value = await characteristic.readValue();

            logII('> Battery Level is ' + value.getUint8(0) + '%');

            wrapper.invokeMethodAsync('UpdateValue', value.getUint8(0));

        } catch (error) {
            logErr('Argh! ' + error);
        }
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