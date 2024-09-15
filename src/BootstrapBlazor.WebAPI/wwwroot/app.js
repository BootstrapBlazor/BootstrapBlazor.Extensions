export function GetBattery(wrapper, addListener = true) {
    navigator.getBattery().then(function (battery) {

        console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
        console.log("Battery level: " + battery.level * 100 + "%");
        console.log("Battery charging time: " + battery.chargingTime + " seconds");
        console.log("Battery discharging time: " + battery.dischargingTime + " seconds");

        if (addListener) {
            battery.addEventListener('chargingchange', function () {
                console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
                logbatteryitem();
            });

            battery.addEventListener('levelchange', function () {
                console.log("Battery level: " + battery.level * 100 + "%");
                logbatteryitem();
            });

            battery.addEventListener('chargingtimechange', function () {
                console.log("Battery charging time: " + battery.chargingTime + " seconds");
                logbatteryitem();
            });

            battery.addEventListener('dischargingtimechange', function () {
                console.log("Battery discharging time: " + battery.dischargingTime + " seconds");
                logbatteryitem();
            });
        }

        function logbatteryitem() {

            var batteryitem = {
                "charging": battery.charging,
                "level": battery.level * 100,
                "chargingTime": battery.chargingTime == 'Infinity' ? null : battery.chargingTime,
                "dischargingTime": battery.dischargingTime == 'Infinity' ? null : battery.dischargingTime
            };
            wrapper.invokeMethodAsync('GetBatteryResult', batteryitem);
        }

        logbatteryitem();
    });
}

export function GetNetworkInfo(wrapper) {
    navigator.connection.addEventListener('change', logNetworkInfo);
    function logNetworkInfo() {
        // Network type that browser uses
        console.log('         type: ' + navigator.connection.type);

        // Effective bandwidth estimate
        console.log('     downlink: ' + navigator.connection.downlink + ' Mb/s');

        // Effective round-trip time estimate
        console.log('          rtt: ' + navigator.connection.rtt + ' ms');

        // Upper bound on the downlink speed of the first network hop
        console.log('  downlinkMax: ' + navigator.connection.downlinkMax + ' Mb/s');

        // Effective connection type determined using a combination of recently
        // observed rtt and downlink values: ' +
        console.log('effectiveType: ' + navigator.connection.effectiveType);

        // True if the user has requested a reduced data usage mode from the user
        // agent.
        console.log('     saveData: ' + navigator.connection.saveData);

        // Add whitespace for readability
        console.log('');

        var networkInfo = {
            "type": navigator.connection.type,
            "downlink": navigator.connection.downlink == undefined ? null : navigator.connection.downlink,
            "rtt": navigator.connection.rtt,
            "downlinkMax": navigator.connection.downlinkMax == undefined ? null : navigator.connection.downlinkMax,
            "effectiveType": navigator.connection.effectiveType,
            "saveData": navigator.connection.saveData,
        };
        wrapper.invokeMethodAsync('GetNetworkInfoResult', networkInfo);

    }

    logNetworkInfo();
}

export async function getUserAgent() {
    console.log(navigator.userAgent);
    return navigator.userAgent;
}

export async function Share(title, text, url, files) {
    // 调用navigator.share方法进行分享，传入分享内容的相关信息
    if (!navigator.canShare) {
        return `Your browser doesn't support the Web Share API.`;
    }
    if (files.length === 0) {
        navigator.share({
            title: title, // 分享标题
            text: text, // 分享文本
            url: url, // 分享链接
        });
        return "OK";
    }

    if (navigator.canShare({ files })) {
        try {
            await navigator.share({
                files,// 分享文件
                title: title, // 分享标题
                text: text, // 分享文本
            });
            return "Shared!";
        } catch (error) {
            return `Error: ${error.message}`;
        }
    } else {
        return `Your system doesn't support sharing these files.`;
    }
}

export async function ScreenOrientation(type) {
    if (type == 'LockPortrait') {
        //锁定屏幕方向为竖屏
        await screen.orientation.lock("portrait");
    }
    else if (type == 'LockLandscape') {
        //锁定屏幕方向为横屏
        await screen.orientation.lock("landscape");
    }
    else if (type == 'Unlock') {
        //解除屏幕方向锁定
        screen.orientation.unlock();
    }
    else if (type == 'GetOrientation') {
        //返回屏幕当前的方向
        return screen.orientation.type;
    }
}

let chunks = [];
let mediaRecorder;
let videoformat = "video/webm";

export async function ScreenRecord(instance, type, isUpload = false, format = "video/webm") {

    console.log(MediaRecorder.isTypeSupported("video/webm"))
    console.log(MediaRecorder.isTypeSupported("video/mp4"))
    console.log(MediaRecorder.isTypeSupported("video/mp4;codecs=avc1"))

    let typeSupported = getvideoformat();

    if (type == 'start') {
        startRecording(); // Start the recording
    }
    else if (type == 'stop') {
        stopRecording(); // Stop screen recording
    }
    else if (type == 'getTypeSupported') {
        return typeSupported;
    }

    function getvideoformat() {
        let typeSupported = [];

        if (MediaRecorder.isTypeSupported("video/webm")) {
            if (!format) videoformat = "webm";
            typeSupported.push("webm");
        }
        if (MediaRecorder.isTypeSupported("video/mp4")) {
            if (!format) videoformat = "mp4";
            typeSupported.push("mp4");
        }
        if (MediaRecorder.isTypeSupported("video/mp4;codecs=avc1")) {
            if (!format) videoformat = "mp4";
            typeSupported.push("mp4_avc1");
        }

        return typeSupported;
    }

    async function startRecording() {
        chunks = [];
        if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            var stream = await navigator.mediaDevices.getDisplayMedia(
                { video: { mediaSource: "screen" }, audio: true }
            );

            mediaRecorder = new MediaRecorder(stream, { mimeType: videoformat });
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            }
            mediaRecorder.onstop = () => {
                chunks = [];
            }
            mediaRecorder.start(250)
        } else {
            alert('不支持这个特性');
        }
    }

    function stopRecording() {

        mediaRecorder.stop(); // Stopping the recording
        let blob = new Blob(chunks, { type: videoformat })
        chunks = [] // Resetting the data chunks

        if (!isUpload) {
            var dataDownloadUrl = URL.createObjectURL(blob);
            var filename = window.prompt("File name", "video"); // Ask the file name
            // Downloadin it onto the user's device
            let a = document.createElement('a')
            a.href = dataDownloadUrl;
            a.download = `${filename}.${videoformat == "video/webm" ? "webm" : "mp4"}`
            a.click()

            URL.revokeObjectURL(dataDownloadUrl)
        } else {
            instance.invokeMethodAsync('GetScreenRecordResult', blob, "video/webm" ? "webm" : "mp4");
        }


    }
}
