export function vibrate() {
    if ("vibrate" in navigator) navigator.vibrate(1000);
}

export function addScript(url) {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("id", "opencvjs");
        script.addEventListener("load", async () => {
            if (cv.getBuildInformation) {
                console.log(cv.getBuildInformation());
                resolve();
            } else {
                // WASM
                if (cv instanceof Promise) {
                    cv = await cv;
                    console.log(cv.getBuildInformation());
                    resolve();
                } else {
                    cv["onRuntimeInitialized"] = () => {
                        console.log(cv.getBuildInformation());
                        resolve();
                    };
                }
            }
        });
        script.addEventListener("error", () => {
            reject();
        });
        script.src = url;
        let node = document.getElementsByTagName("script")[0];
        node.parentNode.insertBefore(script, node);
    });
}

export function Utils(instance, element, options) { // eslint-disable-line no-unused-vars
    let self = this;
    let selectedDeviceId = null;

    this.errorOutput = element.querySelector('#' + options.errorOutputDom);

    this.createFileFromUrl = function (path, url, callback) {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function (ev) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    let data = new Uint8Array(request.response);
                    cv.FS_createDataFile('/', path, data, true, false, false);
                    callback();
                } else {
                    self.printError('Failed to load ' + url + ' status: ' + request.status);
                }
            }
        };
        request.send();
    };

    this.initModels = async function (paths, baseurl) {
        let result = false;
        await Promise.all(paths.map(async (path) => {
            let url = baseurl + path
            if (!path.endsWith('.xml')) url = url + '.txt';
            let res = await self.createFileFromUrlRequest(path, url);
            result = res;
        }));
        return result;
    }

    this.createFileFromUrlRequest = function (path, url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let data = new Uint8Array(xhr.response);
                        cv.FS_createDataFile('/', path, data, true, false, false);
                        resolve(true);
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText,
                            error: 'Failed to load ' + url + ' status: ' + xhr.status,
                        });
                    }
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }

    this.clearError = function () {
        this.errorOutput.innerHTML = '';
    };

    this.printError = function (err) {
        if (typeof err === 'undefined') {
            err = '';
        } else if (typeof err === 'number') {
            if (!isNaN(err)) {
                if (typeof cv !== 'undefined') {
                    err = 'Exception: ' + cv.exceptionFromPtr(err).msg;
                }
            }
        } else if (typeof err === 'string') {
            let ptr = Number(err.split(' ')[0]);
            if (!isNaN(ptr)) {
                if (typeof cv !== 'undefined') {
                    err = 'Exception: ' + cv.exceptionFromPtr(ptr).msg;
                }
            }
        } else if (err instanceof Error) {
            err = err.stack.replace(/\n/g, '<br>');
        }
        this.errorOutput.innerHTML = err;
    };

    this.loadCode = function (scriptId, textAreaId) {
        let scriptNode = element.querySelector('#' + scriptId);
        let textArea = element.querySelector('#' + textAreaId);
        if (scriptNode.type !== 'text/code-snippet') {
            throw Error('Unknown code snippet type');
        }
        textArea.value = scriptNode.text.replace(/^\n/, '');
    };

    this.addFileInputHandler = function (fileInputId, canvasId) {
        let inputElement = element.querySelector('#' + fileInputId);
        inputElement.addEventListener('change', (e) => {
            let files = e.target.files;
            if (files.length > 0) {
                let imgUrl = URL.createObjectURL(files[0]);
                self.loadImageToCanvas(imgUrl, canvasId);
            }
        }, false);
    };

    function onVideoCanPlay() {
        if (self.onCameraStartedCallback) {
            self.onCameraStartedCallback(self.stream, self.video);
        }
    };

    this.startCamera = function (resolution, callback, videoId, selectedDeviceId, changeCameraCallback) {
        self.selectedDeviceId = selectedDeviceId;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            let constraints = {
                'qvga': { width: { exact: 320 }, height: { exact: 240 } },
                'vga': { width: { exact: 640 }, height: { exact: 480 } }
            };
            let video = element.querySelector('#' + videoId);
            if (!video) {
                video = document.createElement('video');
            }

            let videoConstraint = constraints[resolution];
            if (!videoConstraint) {
                videoConstraint = true;
            }
            if (selectedDeviceId != null || options.deviceID != null) {
                let deviceId = selectedDeviceId;
                if (deviceId == null) deviceId = options.deviceID;
                videoConstraint = {
                    deviceId: deviceId ? { exact: deviceId } : undefined,
                    width: { ideal: options.width },
                    height: { ideal: options.height },
                    facingMode: "environment",
                    focusMode: "continuous"
                }

            }

            navigator.mediaDevices.getUserMedia({ video: videoConstraint, audio: false })
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                    self.video = video;
                    self.stream = stream;
                    self.onCameraStartedCallback = callback;
                    video.addEventListener('canplay', onVideoCanPlay, false);

                    self.listCameras(changeCameraCallback);
                })
                .catch(function (err) {
                    self.printError('Camera Error: ' + err.name + ' ' + err.message);
                });
        }
    };


    this.listCameras = function (callback) {
        if (selectedDeviceId != null) return;
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                let sourceSelect = element.querySelector('[data-action=' + options.sourceSelectDom + ']');
                let sourceSelectPanel = element.querySelector('[data-action=' + options.sourceSelectPanelDom + ']');
                let videoInputDevices = [];
                devices.forEach((device) => {
                    if (device.kind === 'videoinput') {
                        videoInputDevices.push(device);
                    }
                });
                if (options.deviceID != null) {
                    selectedDeviceId = options.deviceID
                } else if (videoInputDevices.length > 1) {
                    selectedDeviceId = videoInputDevices[1].deviceId
                } else {
                    selectedDeviceId = videoInputDevices[0].deviceId
                }
                if (videoInputDevices.length > 1) {
                    sourceSelect.innerHTML = '';
                    devices.forEach((device) => {
                        if (device.kind === 'videoinput') {
                            if (options.debug) console.log(`${device.label} id = ${device.deviceId}`);
                            const sourceOption = document.createElement('option');
                            if (device.label === '') {
                                sourceOption.text = 'Camera' + (sourceSelect.length + 1);
                            } else {
                                sourceOption.text = device.label
                            }
                            sourceOption.value = device.deviceId
                            if (selectedDeviceId != null && device.deviceId == selectedDeviceId) {
                                sourceOption.selected = true;
                            }
                            sourceSelect.appendChild(sourceOption)
                        }
                    });

                    sourceSelect.onchange = () => {
                        selectedDeviceId = sourceSelect.value;
                        if (options.debug) console.log(`selectedDevice: ${sourceSelect.options[sourceSelect.selectedIndex].text} id = ${sourceSelect.value}`);
                        instance.invokeMethodAsync('SelectDeviceID', selectedDeviceId);
                        callback(selectedDeviceId);
                    }

                    sourceSelectPanel.style.display = 'block'

                }
            })
            .catch((err) => {
                console.error(`${err.name}: ${err.message}`);
            });
    };

    this.stopCamera = function () {
        if (this.video) {
            this.video.pause();
            this.video.srcObject = null;
            this.video.removeEventListener('canplay', onVideoCanPlay);
        }
        if (this.stream) {
            this.stream.getVideoTracks()[0].stop();
        }
    };
};
