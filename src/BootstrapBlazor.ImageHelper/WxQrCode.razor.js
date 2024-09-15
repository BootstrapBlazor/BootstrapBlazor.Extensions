import { vibrate, addScript, Utils } from '/_content/BootstrapBlazor.ImageHelper/utils.js'

let loading = true;
let img = new Image();
let qrcode_detector;
let element = null;
let instance = null;
let options = null;

export function init(_instance, _element, _options) {
    apply(_instance, _element, _options);
    let inputElement = element.querySelector('#' + options.fileInputDom);
    let captureElement = element.querySelector('#' + options.captureDom);
    let canvasOutput = element.querySelector('#' + _options.imageDataDom);
    let utils = new Utils(instance, element, options);
    canvasOutput.height = 0;
    canvasOutput.width = 0;

    inputElement.addEventListener('change', (e) => {
        img.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    captureElement.addEventListener('change', (e) => {
        img.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    img.onload = function () {
        let src = cv.imread(img);
        cv.imshow(options.imageDataDom, src);
        src.delete();
        wechatQrcode452(instance, element, _options);
    };

    addScript(options.openCvUrl).then(
        async () => {
            instance.invokeMethodAsync('GetReady'); 
            if (loading) {
                instance.invokeMethodAsync('GetResult', '正在加载模型文件');
                let baseurl = '_content/BootstrapBlazor.ImageHelper/models/wxqrcode/';
                let mods = [
                    "detect.prototxt",
                    "detect.caffemodel",
                    "sr.prototxt",
                    "sr.caffemodel"
                ];
                let result = await utils.initModels(mods, baseurl);
                if (result) {
                    loading = false;
                    qrcode_detector = new cv.wechat_qrcode_WeChatQRCode(
                        "detect.prototxt",
                        "detect.caffemodel",
                        "sr.prototxt",
                        "sr.caffemodel"
                    );
                    instance.invokeMethodAsync('GetResult', '加载模型文件完成');
                } else {
                    instance.invokeMethodAsync('GetResult', '加载模型文件失败');
                }
            }
        },
        () => {
            utils.printError("Failed to load " + options.url);
        }
    );

}

export function apply(_instance, _element, _options) {
    options = _options;
    instance = _instance;
    element = _element; 
}

function cutImage(src, dst, width = 600) {
    if (options.autoCaputeCrop) {
        if ((src.rows / src.cols) > 1.2) {
            //比例不对, 截取中间部分
            let rect = new cv.Rect(0, (src.rows - src.cols) / 2, src.cols, src.cols);
            dst = src.roi(rect);
        } else if ((src.cols / src.rows) > 1.2) {
            //比例不对, 截取中间部分
            let rect = new cv.Rect((src.cols - src.rows) / 2, 0, src.rows, src.rows);
            dst = src.roi(rect);
        }
        if (dst.rows > 600) {
            cv.resize(dst, dst, new cv.Size(width, width));
        }
        return dst;
    } else {
        return src;
    }
}
function isLoadImage() {
    if (!img.src) {
        alert('请先上传图片')
        return false
    }
    return true
}

export function wechatQrcode452(_instance, _element, _options) {
    if (!isLoadImage()) return;
    apply(_instance, _element, _options);
    let imageData = element.querySelector('#' + _options.imageDataDom);
    let inputImage = cv.imread(imageData, cv.IMREAD_GRAYSCALE);
    detectAndDecode(instance, inputImage, _options);
}

export function detectAndDecode(instance, inputImage, _options, retry = true, toGray = false) {
    if (retry && _options.debug) console.time("OpenCV耗时");
    let i = 0
    let arr = []
    const rects = []
    let temp = inputImage
    let points_vec = new cv.MatVector();
    if (toGray) {
        //inputImage.copyTo(temp);
        //cv.cvtColor(inputImage, inputImage, cv.COLOR_RGBA2GRAY, 0);
    }
    let res = qrcode_detector.detectAndDecode(inputImage, points_vec);

    while (i < res.size()) {
        arr.push(res.get(i++))
    }
    res.delete()
    if (_options.debug) console.log(`检测到 ${arr.length} 个二维码:\r\n` + arr.join('\r\n'));
    instance.invokeMethodAsync('GetResult', `检测到 ${arr.length} 个二维码:\r\n` + arr.join('\r\n'));

    if (arr.length > 0) {
        if (options.decodeOnce) {
            vibrate();
        }
        for (let j = 0; j < points_vec.size(); j += 1) {
            let rect = cv.boundingRect(points_vec.get(j))
            rects.push(rect)

            let point1 = new cv.Point(rect.x, rect.y);
            let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
            cv.rectangle(temp, point1, point2, [255, 0, 0, 255], 2);
        }
    } else if (retry && options.retry) {
        if (_options.debug) console.log(`截取中间部分试第二次`);
        temp = cutImage(temp, temp); //尝试截取中间部分再试一次

        if (detectAndDecode(instance, temp, _options, false) == 0) {
            let rect = new cv.Rect(temp.rows / 2, temp.rows / 2, temp.rows / 2, temp.rows / 2);
            temp = temp.roi(rect);
            if (_options.debug) console.log(`截取中间部分试第三次`);
            detectAndDecode(instance, temp, _options, false)
        }
    }
    if (arr.length > 0) {
        cv.imshow(_options.imageDataDom, temp)
    }

    if (retry && _options.debug) console.timeEnd("OpenCV耗时");
    return arr.length;
}


export function wechatQrcodeCamera(_instance, _element, _options) {
    apply(_instance, _element, _options);
    let utils = new Utils(instance, element, _options);

    let streaming = false;
    let videoInput = element.querySelector('#' + _options.videoInputDom);
    let startAndStop = element.querySelector('#' + _options.startAndStopDom);
    let canvasOutput = element.querySelector('#' + _options.imageDataDom);
    let src;
    let dst;
    let gray;
    let cap;
    const FPS = 30;
    canvasOutput.height = 0;
    canvasOutput.width = 0;
    let retry = true;
    utils.startCamera('vga', onVideoStarted, _options.videoInputDom, _options.deviceID, onChangeCamera);

    startAndStop.addEventListener('click', () => onToggleCamera());

    function onToggleCamera() {
        if (!streaming) {
            utils.clearError();
            utils.startCamera('vga', onVideoStarted, _options.videoInputDom, _options.deviceID, onChangeCamera);
        } else {
            utils.stopCamera();
            onVideoStopped();
        }
    }

    function processVideo() {
        try {
            if (!streaming) {
                // clean and stop.
                src.delete();
                dst.delete();
                gray.delete();
                return;
            }
            let begin = Date.now();
            // start processing.
            cap.read(src);
            src.copyTo(dst);
            //dst = cutImage(src, dst);
            //cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
            if (detectAndDecode(instance, dst, _options, true, true) != 0 && options.decodeOnce) {
                utils.stopCamera();
                onVideoStopped();
                return;
            }
            // schedule the next one.
            let delay = 1000 / FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
        } catch (err) {
            utils.printError(err);
            if (retry) {
                retry = false;
                setTimeout(onToggleCamera(), 100);
                setTimeout(onToggleCamera(), 0);
            }
        }
    };

    function onVideoStarted() {
        src = new cv.Mat(videoInput.height, videoInput.width, cv.CV_8UC4);
        dst = new cv.Mat(videoInput.height, videoInput.width, cv.CV_8UC1);
        gray = new cv.Mat();
        cap = new cv.VideoCapture(videoInput);

        streaming = true;
        startAndStop.innerText = 'Stop';
        videoInput.width = videoInput.videoWidth;
        videoInput.height = videoInput.videoHeight;
        setTimeout(processVideo, 0);
        instance.invokeMethodAsync('GetCameraBusy', true);

    }

    function onChangeCamera(selectedDeviceId) {
        utils.stopCamera();
        _options.deviceID = selectedDeviceId;
        utils.startCamera('vga', onVideoStarted, _options.videoInputDom, _options.deviceID, onChangeCamera);
    }

    function onVideoStopped() {
        streaming = false;
        canvasOutput.height = 0;
        canvasOutput.width = 0;
        startAndStop.innerText = 'Start';
        instance.invokeMethodAsync('GetCameraBusy', false);
    }

}
