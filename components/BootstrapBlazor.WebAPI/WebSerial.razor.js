let port, refreshIntervalId;
export async function Init(instance, element, options, command) {
    let reader;
    let inputDone;
    let outputDone;
    let inputStream;
    let outputStream;

    const log = element.querySelector("[data-action=log]");
    const butConnect = element.querySelector("[data-action=butConnect]");
    const butwrite = element.querySelector("[data-action=butwrite]");
    const fname = element.querySelector("[data-action=fname]");
    const notSupported = element.querySelector("[data-action=notSupported]");

    butConnect.addEventListener("click", clickConnect);
    butwrite.addEventListener("click", write);

    if (notSupported) notSupported.classList.toggle("hidden", "serial" in navigator);

    if (!"serial" in navigator) {
        instance.invokeMethodAsync("GetError", "The Web Serial API is not supported");
        return;
    }

    getPorts();

    if (!options.frameBreakChar) options.frameBreakChar = "\n"

    async function getPorts() {
        let ports = await navigator.serial.getPorts();
        if (ports.length > 0) {
            if (options.autoConnect) {
                port = ports[0];
                console.log("自动连接设备", port);
                instance.invokeMethodAsync("GetLog", "自动连接设备");
            }
            instance.invokeMethodAsync("GetLog", `获取到授权设备: ${ports.length}`);
        }
    }

    async function open() {
        console.log("open")
        if (!port.readable) {
            console.log("尝试连接");
            // Wait for the serial port to open.
            if (!options) options = { baudRate: 9600 };
            await port.open(options);
            if (log) log.textContent += "已连接" + "\n";
            console.log("已连接", port);
            instance.invokeMethodAsync("GetLog", `已连接:${options.baudRate}`);
        }
    }

    async function connect() {
        try {
            if (!port) {
                //const filters = [
                //    { usbVendorId: 0x2A03, usbProductId: 0x0043 },
                //    { usbVendorId: 0x2341, usbProductId: 0x0001 }
                //];
                // - 请求端口并打开连接.
                //port = await navigator.serial.requestPort({ filters });
                try {
                    port = await navigator.serial.requestPort();
                } catch (error) {
                    port = null;
                    console.error(error);
                    instance.invokeMethodAsync("GetError", error.message);
                    return false;
                }
                const { usbProductId, usbVendorId } = port.getInfo();
                console.log(usbProductId, usbVendorId);
                instance.invokeMethodAsync("GetLog", usbProductId);
            }
            try {
                await open();
            } catch (error) {
                port = null;
                console.error(error);
                console.log("重新选择端口");
                return await connect();
            }

            if (!options.outputInHex) {
                let decoder = new TextDecoderStream();
                inputDone = port.readable.pipeTo(decoder.writable);
                if (options.autoFrameBreak == "Character") {
                    inputStream = decoder.readable
                        .pipeThrough(new TransformStream(new LineBreakTransformer()));
                } else {
                    inputStream = decoder.readable;
                }
                reader = inputStream.getReader();
            } else {
                reader = port.readable.getReader();
            }
            readLoop();

            const encoder = new TextEncoderStream();
            outputDone = encoder.readable.pipeTo(port.writable);
            outputStream = encoder.writable;
            fname.style.visibility = "visible";
            butwrite.style.visibility = "visible";
            instance.invokeMethodAsync("Connect", true);
            return true;
        } catch (error) {
            port = null;
            console.error(error);
            instance.invokeMethodAsync("GetError", error.message);
        }
        return false;
    }


    async function disconnect() {
        try {
            if (reader) {
                await reader.cancel();
                if (!options.outputInHex) await inputDone.catch(() => { });
                reader = null;
                inputDone = null;
            }
            if (outputStream) {
                await outputStream.getWriter().close();
                await outputDone;
                outputStream = null;
                outputDone = null;
            }
            await port.close();
            port = null;
            instance.invokeMethodAsync("Connect", false);
            return true;
        } catch (error) {
            console.error(error);
            instance.invokeMethodAsync("GetError", error.message);
        }
        return false;
    }

    function addEventListener() {
        navigator.serial.addEventListener("connect", (event) => {
            instance.invokeMethodAsync("GetLog", "connect");
            instance.invokeMethodAsync("Connect", true);
        });

        navigator.serial.addEventListener("disconnect", (event) => {
            instance.invokeMethodAsync("GetLog", "disconnect");
            instance.invokeMethodAsync("Connect", false);
        });
    }

    async function clickConnect() {
        if (port && port.readable) {
            if (await disconnect()) {
                toggleUIConnected(false);
            }
            return;
        }
        if (await connect()) {
            toggleUIConnected(true);
        }
    }

    async function readLoop() {
        while (true) {
            if (options.autoGetSignals) {
                refreshIntervalId =setInterval(async () => {
                    await getSignals(instance, false);
                }, 300);
            }
            let result;
            if (options.autoFrameBreak == "Timeout") {
                let timeout = 500;
                const timer = setTimeout(() => {
                    //reader.releaseLock();
                    console.log("[Timeout]");
                }, timeout);
                result = await reader.read();
                clearTimeout(timer);
                //reader.releaseLock();
            } else {
                result = await reader.read();
            }
            const { value, done } = result;
            if (value) {
                if (log) log.textContent += "收到数据: " + value + "\n";
                instance.invokeMethodAsync("ReceiveData", value + "");
            }
            if (done) {
                console.log("[readLoop] DONE", done);
                instance.invokeMethodAsync("GetLog", `接收数据完成: ${done}`);
                reader.releaseLock();
                clearInterval(refreshIntervalId);
                break;
            }
        }
    }

    async function write() {
        await writeToStream(fname.value);
    }

    /**
     * @name writeToStream
     * 从输出流获取 writer 并将行发送到 micro:bit.
     * @param  {...string} lines 行发送到 micro:bit
     */
    async function writeToStream(...lines) {
        let writer;
        if (!options.inputWithHex) {
            writer = outputStream.getWriter();
        } else {
            writer = port.writable.getWriter();
        }

        lines.forEach(async (line) => {
            if (log) log.textContent += "发送数据" + line + "\n";
            console.log("[SEND]", line);
            instance.invokeMethodAsync("GetLog", `发送数据: ${line}`);
            await writer.write(line);
        });
        writer.releaseLock();
    }

    /**
     * @name LineBreakTransformer
     * Transform Stream 将流解析为行.
     */
    class LineBreakTransformer {
        constructor() {
            // 用于保存流数据直到新行的容器。
            this.chunks = "";
        }

        transform(chunk, controller) {
            console.log("[GET]", chunk);
            // 将新块附加到现有块。
            this.chunks += chunk + "";
            // 对于块中的每个换行符，将解析后的行发送出去。
            const lines = this.chunks.split(options.frameBreakChar);
            this.chunks = lines.pop();
            lines.forEach((line) => controller.enqueue(line));
        }

        flush(controller) {
            // 当流关闭时，刷新所有剩余的块。
            controller.enqueue(this.chunks);
        }
    }

    function toggleUIConnected(connected) {
        let lbl = options.connectBtnTitle;
        if (connected) {
            lbl = options.disconnectBtnTitle;
        }
        butConnect.textContent = lbl;
    }


}

export async function forget(instance) {
    try {
        if ("serial" in navigator && "forget" in SerialPort.prototype) {
            if (port) await port.forget();
        }
    } catch (error) {
        console.error(error);
        instance.invokeMethodAsync("GetError", error.message);
    }
}


export async function setSignals(instance, options) {
    try {
        if ("serial" in navigator && "forget" in SerialPort.prototype) {
            if (port) {

                // 中断
                if (options.break != null) await port.setSignals({ break: options.break });

                // 数据终端就绪 (DTR) 
                if (options.DTR != null) await port.setSignals({ dataTerminalReady: options.DTR });

                // 请求发送 (RTS) 
                if (options.RTS != null) await port.setSignals({ requestToSend: options.RTS });

            }
        }
    } catch (error) {
        console.error(error);
        instance.invokeMethodAsync("GetError", error.message);
    }

}

export async function setDTR_Demo() {
    let signals = await port.getSignals();

    console.log(`Clear To Send:       ${signals.clearToSend}`);
    console.log(`Data Carrier Detect: ${signals.dataCarrierDetect}`);
    console.log(`Data Set Ready:      ${signals.dataSetReady}`);
    console.log(`Ring Indicator:      ${signals.ringIndicator}`);

    await new Promise(resolve => setTimeout(resolve, 200));
    await port.setSignals({ dataTerminalReady: true });

    signals = await port.getSignals();

    console.log(`Clear To Send:       ${signals.clearToSend}`);
    console.log(`Data Carrier Detect: ${signals.dataCarrierDetect}`);
    console.log(`Data Set Ready:      ${signals.dataSetReady}`);
    console.log(`Ring Indicator:      ${signals.ringIndicator}`);
}

export async function getSignals(instance, debug=true) {
    try {
        let signals = await port.getSignals();

        if (debug) {
            console.log(`RING (Ring Indicator) :      ${signals.ringIndicator}`);
            console.log(`DSR (Data Set Ready):        ${signals.dataSetReady}`);
            console.log(`CTS (Clear To Send):         ${signals.clearToSend}`);
            console.log(`DCD (Data Carrier Detect):   ${signals.dataCarrierDetect}`);
        }
        let result = {
            RING: signals.ringIndicator,
            DSR: signals.dataSetReady,
            CTS: signals.clearToSend,
            DCD: signals.dataCarrierDetect
        };
        instance.invokeMethodAsync("GetSignals", result);
        return result;
    } catch (error) {
        console.error(error);
        instance.invokeMethodAsync("GetError", error.message);
    }

}