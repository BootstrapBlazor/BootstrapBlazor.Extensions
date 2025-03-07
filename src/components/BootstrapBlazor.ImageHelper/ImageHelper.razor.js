import { vibrate, addScript, Utils } from '/_content/BootstrapBlazor.ImageHelper/utils.js'

let loading = true;
let img = new Image();
let element = null;
let instance = null;
let options = null;
let newfacedata = null;
let onstop = false;

export function drawPixels(canvasElement, imageBytes) {
    const canvasContext = canvasElement.getContext("2d");
    const canvasImageData = canvasContext.createImageData(canvasElement.width, canvasElement.height);
    canvasImageData.data.set(imageBytes);
    canvasContext.putImageData(canvasImageData, 0, 0);
}

export function apply(_instance, _element, _options) {
    options = _options;
    instance = _instance;
    element = _element;
    let inCanvas = element.querySelector('#' + options.imageDataDom);
    let videoInput = element.querySelector('#' + options.videoInputDom);
    inCanvas.hidden = false;
    videoInput.hidden = true;
}

export function init(_instance, _element, _options) {
    apply(_instance, _element, _options);
    let inCanvas = element.querySelector('#' + options.imageDataDom);
    let inputElement = element.querySelector('#' + options.fileInputDom);
    let captureElement = element.querySelector('#' + options.captureDom);
    let utils = new Utils(instance, element, options);

    if (inputElement) inputElement.addEventListener('change', (e) => {
        clearInput();
        clearOutput();
        img.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    if (captureElement) captureElement.addEventListener('change', (e) => {
        clearInput();
        clearOutput();
        img.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    img.onload = function () {
        let inCanvasCtx = inCanvas.getContext('2d')
        let rate = img.height / img.width;
        let height = rate > 1 ? 640 * rate : 640;
        let width = rate <= 1 ? 640 * rate : 640;
        inCanvasCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
        if (img.width !== 640 || img.height != 640) {
            inCanvas.toBlob(async function (blob) {
                img.src = URL.createObjectURL(blob);
                await faceDetection1st(instance, element, options);
            })
        }
    };

    addScript(options.openCvUrl).then(
        async () => {
            instance.invokeMethodAsync('GetReady');

            if (loading) {
                let utils = new Utils(instance, element, options);
                instance.invokeMethodAsync('GetResult', '正在加载模型文件');
                let baseurl = '_content/BootstrapBlazor.ImageHelper/models/';
                let mods = [
                    "haarcascade_eye.xml",
                    "haarcascade_frontalface_default.xml"
                ];
                let result = await utils.initModels(mods, baseurl);
                if (result) {
                    loading = false;
                    instance.invokeMethodAsync('GetResult', '加载模型文件完成');
                } else {
                    instance.invokeMethodAsync('GetResult', '加载模型文件失败');
                    loading = true;
                }
            }
        },
        () => {
            utils.printError("Failed to load " + options.url);
        }
    );
}

function isLoadImage() {
    if (!img.src) {
        alert('请先上传图片')
        return false
    }
    return true
}

//灰度化
export function grayscale(_instance, _element, _options) {
    if (!isLoadImage()) return;
    apply(_instance, _element, _options);
    let imageData = element.querySelector('#' + options.imageDataDom);
    // 读取图像
    let src = cv.imread(imageData);
    let dst = new cv.Mat();
    // 灰度化
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
    // 显示图像
    cv.imshow(options.canvasOutputDom, dst);
    // 回收对象
    src.delete();
    dst.delete()
}

//边缘检测
export function edgeDetection(_instance, _element, _options) {
    if (!isLoadImage()) return;
    apply(_instance, _element, _options);
    let imageData = element.querySelector('#' + options.imageDataDom);
    let src = cv.imread(imageData);
    let dst = new cv.Mat();

    // 灰度化
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    // 边缘检测
    cv.Canny(src, dst, 50, 100, 3, false);

    cv.imshow(options.canvasOutputDom, dst);
    src.delete();
    dst.delete()
}

//特征点检测
export function featurePointDetection(_instance, _element, _options) {
    if (!isLoadImage()) return;
    apply(_instance, _element, _options);
    let imageData = element.querySelector('#' + options.imageDataDom);
    let src = cv.imread(imageData);
    let dst = new cv.Mat();

    // 灰度化
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

    var orb = new cv.ORB();
    var keypoints = new cv.KeyPointVector();
    var descriptors = new cv.Mat();
    // 特征点
    orb.detect(src, keypoints)
    // 特征点的描述因子
    orb.compute(src, keypoints, descriptors)
    // 绘制特征点
    cv.drawKeypoints(src, keypoints, dst)

    cv.imshow(options.canvasOutputDom, dst);
    src.delete();
    dst.delete()
}

//伪彩色
export function pseudoColor(_instance, _element, _options) {
    if (!isLoadImage()) return;
    apply(_instance, _element, _options);
    let imageData = element.querySelector('#' + options.imageDataDom);
    let src = cv.imread(imageData);
    let dst = new cv.Mat();

    // 灰度化
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    // 伪彩色
    cv.applyColorMap(src, dst, cv.COLORMAP_JET);

    cv.imshow(options.canvasOutputDom, dst);
    src.delete();
    dst.delete()
}

//图像阈值化
export function threshold(_instance, _element, _options) {
    if (!isLoadImage()) return;
    apply(_instance, _element, _options);
    let imageData = element.querySelector('#' + options.imageDataDom);
    let src = cv.imread(imageData);
    let dst = new cv.Mat();

    // 灰度化
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    // 阈值化
    cv.threshold(src, dst, 177, 200, cv.THRESH_BINARY);

    cv.imshow(options.canvasOutputDom, dst);
    src.delete();
    dst.delete()
}

function clearInput() {
    let canvasInput = element.querySelector('#' + options.imageDataDom);
    let canvasContext = canvasInput.getContext('2d');
    canvasContext.clearRect(0, 0, canvasInput.width, canvasInput.height);
}

function clearOutput() {
    let canvasOutput = element.querySelector('#' + options.canvasOutputDom);
    let canvasContext = canvasOutput.getContext('2d');
    canvasContext.clearRect(0, 0, canvasOutput.width, canvasOutput.height);
}

//人脸检测
async function faceDetectionBase(_instance, _element, _options, type) {
    apply(_instance, _element, _options);
    let inCanvas = element.querySelector('#' + options.imageDataDom);
    let videoInput = element.querySelector('#' + options.videoInputDom);
    clearOutput();
    inCanvas.hidden = type == 3;
    videoInput.hidden = type != 3;

    if (type != 3 && !isLoadImage()) {
        return false;
    }
    if (loading) {
        let utils = new Utils(instance, element, options);
        instance.invokeMethodAsync('GetResult', '正在加载模型文件');
        let baseurl = '_content/BootstrapBlazor.ImageHelper/models/';
        let mods = [
            "haarcascade_eye.xml",
            "haarcascade_frontalface_default.xml"
        ];
        let result = await utils.initModels(mods, baseurl);
        if (result) {
            loading = false;
            instance.invokeMethodAsync('GetResult', '加载模型文件完成');
            if (type === 1) {
                faceDetection(_instance, _element, _options);
            }
            else if (type === 3) {
                inCanvas.hidden = true;
                videoInput.hidden = false;
                faceDetectionInCamera(_instance, _element, _options);
            }
            else {
                faceDetection1st(_instance, _element, _options);
            }
        } else {
            instance.invokeMethodAsync('GetResult', '加载模型文件失败');
        }
        return false;
    }
    return true;
}

//人脸检测
async function initFaceDetection(_instance, _element, _options, type) {
    apply(_instance, _element, _options);
    let inCanvas = element.querySelector('#' + options.imageDataDom);
    let videoInput = element.querySelector('#' + options.videoInputDom);
    clearOutput();
    inCanvas.hidden = type == 3;
    videoInput.hidden = type != 3;

    if (type != 3 && !isLoadImage()) {
        return false;
    }
    if (loading) {
        let utils = new Utils(instance, element, options);
        instance.invokeMethodAsync('GetResult', '正在加载模型文件');
        let baseurl = '_content/BootstrapBlazor.ImageHelper/models/';
        let mods = [
            "haarcascade_eye.xml",
            "haarcascade_frontalface_default.xml"
        ];
        let result = await utils.initModels(mods, baseurl);
        if (result) {
            loading = false;
            instance.invokeMethodAsync('GetResult', '加载模型文件完成');
            return true;
        } else {
            instance.invokeMethodAsync('GetResult', '加载模型文件失败');
            loading = true;
            return false;
        }
    }
    return true;
}
export async function faceDetection(_instance, _element, _options) {
    if (!(await faceDetectionBase(_instance, _element, _options, 1))) return;
    let imageData = element.querySelector('#' + options.imageDataDom);
    let src = cv.imread(imageData);
    let gray = new cv.Mat();
    // 灰度化
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    let faces = new cv.RectVector();
    let eyes = new cv.RectVector();
    let faceCascade = new cv.CascadeClassifier();
    let eyeCascade = new cv.CascadeClassifier();
    // 加载人脸检测模型
    faceCascade.load('haarcascade_frontalface_default.xml');
    eyeCascade.load('haarcascade_eye.xml');
    let msize = new cv.Size(0, 0);
    // 人脸检测
    faceCascade.detectMultiScale(gray, faces, 1.3, 5, 0, msize, msize);
    for (let i = 0; i < faces.size(); ++i) {
        let roiGray = gray.roi(faces.get(i));
        let roiSrc = src.roi(faces.get(i));
        let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
        let point2 = new cv.Point(faces.get(i).x + faces.get(i).width,
            faces.get(i).y + faces.get(i).height);
        cv.rectangle(src, point1, point2, [255, 0, 0, 255], 2);
        // detect eyes in face ROI
        eyeCascade.detectMultiScale(roiGray, eyes);
        for (let j = 0; j < eyes.size(); ++j) {
            let point1 = new cv.Point(eyes.get(j).x, eyes.get(j).y);
            let point2 = new cv.Point(eyes.get(j).x + eyes.get(j).width,
                eyes.get(j).y + eyes.get(j).height);
            cv.rectangle(roiSrc, point1, point2, [0, 0, 255, 255]);
        }
        roiGray.delete(); roiSrc.delete();
    }
    cv.imshow(options.canvasOutputDom, src);

    if (options.enableFaceDetectionCallBack && faces.size() > 0) {
        let dataUrl = imageData.toDataURL("image/jpeg");
        instance.invokeMethodAsync('GetFace', dataUrl);
    }

    src.delete(); gray.delete(); faceCascade.delete();
    eyeCascade.delete(); faces.delete(); eyes.delete();
}

export async function faceDetection1st(_instance, _element, _options) {
    await initFaceDetection(_instance, _element, _options, 2);
    let data = null;
    newfacedata = null;
    let imageData = element.querySelector('#' + options.imageDataDom);
    let src = cv.imread(imageData);
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    let faces = new cv.RectVector();
    let faceCascade = new cv.CascadeClassifier();
    faceCascade.load('haarcascade_frontalface_default.xml');
    let msize = new cv.Size(0, 0);
    //用人脸级联分类器引擎进行人脸识别，返回的faces为人脸坐标列表，1.3是放大比例，5是重复识别次数
    faceCascade.detectMultiScale(gray, faces, 1.3, 5, 0, msize, msize);
    if (faces.size() > 0) {
        cv.imshow(options.canvasOutputDom, src.roi(faces.get(0)));
        let canvas = element.querySelector('#' + options.canvasOutputDom);
        data = canvas.toDataURL("image/jpeg");
        newfacedata = data;
        if (options.enableFaceDetectionCallBack) {
            await instance.invokeMethodAsync('GetFace');
        }
    }

    src.delete();
    gray.delete();
    faceCascade.delete();
    faces.delete();
    let result = newfacedata == null;
    return !result;
}

export function streamToDotNet() {
    if (newfacedata == null) {
        return new Uint8Array();
    }
    return Uint8Array.from(Array.from(newfacedata).map(letter => letter.charCodeAt(0)));;
}

export function stop() {
    onstop = true;
}

export async function faceDetectionInCamera(_instance, _element, _options) {
    onstop = false;
    await initFaceDetection(_instance, _element, _options, 3);
    let utils = new Utils(instance, element, options);

    let streaming = false;
    let videoInput = element.querySelector('#' + options.videoInputDom);
    let startAndStop = element.querySelector('#' + options.startAndStopDom);
    let canvasOutput = element.querySelector('#' + options.canvasOutputDom);
    let canvasContext = canvasOutput.getContext('2d');
    let src;
    let dst;
    let gray;
    let cap;
    let faces;
    let faceCascade;
    const FPS = 30;

    utils.startCamera('vga', onVideoStarted, options.videoInputDom, options.deviceID, onChangeCamera, onError);

    if (startAndStop) {
        startAndStop.addEventListener('click', () => onToggleCamera());
    }
    function onToggleCamera() {
        if (!streaming) {
            utils.clearError();
            utils.startCamera('vga', onVideoStarted, options.videoInputDom, options.deviceID, onChangeCamera, onError);
        } else {
            utils.stopCamera();
            onVideoStopped();
        }
    }

    function processVideo() {
        try {
            if (!streaming || onstop) {
                // clean and stop.
                src.delete();
                dst.delete();
                gray.delete();
                faces.delete();
                faceCascade.delete();
                return;
            }
            let begin = Date.now();
            newfacedata = null;
            // start processing.
            cap.read(src);
            src.copyTo(dst);
            cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
            let msize = new cv.Size(0, 0);
            faceCascade.detectMultiScale(gray, faces, 1.3, 2, 0, msize, msize);
            if (faces.size() > 0) {
                cv.imshow(options.canvasOutputDom, src.roi(faces.get(0)));
                if (options.enableFaceDetectionCallBack) {
                    let canvas = element.querySelector('#' + options.canvasOutputDom);
                    newfacedata = canvas.toDataURL("image/jpeg");
                    instance.invokeMethodAsync('GetFace');
                }
            }
            // schedule the next one.
            let delay = 1000 / FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
        } catch (err) {
            utils.printError(err);
        }
    };


    function onVideoStarted() {
        videoInput.width = videoInput.videoWidth;
        videoInput.height = videoInput.videoHeight;
        src = new cv.Mat(videoInput.height, videoInput.width, cv.CV_8UC4);
        dst = new cv.Mat(videoInput.height, videoInput.width, cv.CV_8UC1);
        gray = new cv.Mat();
        cap = new cv.VideoCapture(videoInput);
        faces = new cv.RectVector();
        faceCascade = new cv.CascadeClassifier();
        // load pre-trained classifiers
        faceCascade.load('haarcascade_frontalface_default.xml');

        streaming = true;
        startAndStop.innerText = 'Stop';
        setTimeout(processVideo, 0);
    }

    function onChangeCamera(selectedDeviceId) {
        utils.stopCamera();
        options.deviceID = selectedDeviceId;
        utils.startCamera('vga', onVideoStarted, options.videoInputDom, options.deviceID, onChangeCamera, onError);
    }

    function onVideoStopped() {
        streaming = false;
        canvasContext.clearRect(0, 0, canvasOutput.width, canvasOutput.height);
        startAndStop.innerText = 'Start';
    }
    function onError(e) {
        instance.invokeMethodAsync('GetError', e);
    }

    return true;

}

////运动估计
//export function motionEstimation(_instance, _element, _options) {
//    let imageData = element.querySelector('#' + options.imageDataDom);
//    let src = cv.imread(imageData);
//    let dst = new cv.Mat();

//    // 灰度化
//    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

//    var prevImg = new cv.Mat();
//    var nextImg = new cv.Mat();
//    var flow = new cv.Mat();
//    // 读取图像
//    cv.imread('prev.png', prevImg);
//    cv.imread('next.png', nextImg);
//    // 运动估计
//    cv.calcOpticalFlowFarneback(prevImg, nextImg, flow, 0.5, 3, 15, 3, 5, 1.2, 0);
//    // 绘制运动轨迹
//    for (let y = 0; y < flow.rows; y += 5) {
//        for (let x = 0; x < flow.cols; x += 5) {
//            let flowVec = flow.data32F;
//            let point1 = new cv.Point(x, y);
//            let point2 = new cv.Point(Math.round(x + flowVec[2 * (y * flow.cols + x)]),
//                Math.round(y + flowVec[2 * (y * flow.cols + x) + 1]));
//            cv.arrowedLine(src, point1, point2, [255, 0, 0, 255]);
//        }
//    }

//    cv.imshow(options.canvasOutputDom, src);
//    src.delete();
//    dst.delete()
//}

////目标识别
//export function objectRecognition(_instance, _element, _options) {
//let imageData = element.querySelector('#' + options.imageDataDom);
//    let src = cv.imread(imageData);
//    let dst = new cv.Mat();

//    // 灰度化
//    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

//    var classifier = new cv.CascadeClassifier();
//    // 加载目标识别模型
//    classifier.load('haarcascade_frontalface_default.xml');
//    // 目标识别
//    var objects = new cv.RectVector();
//    classifier.detectMultiScale(src, objects, 1.1, 3, 0);

//    for (let i = 0; i < objects.size(); ++i) {
//        let object = objects.get(i);
//        let point1 = new cv.Point(object.x, object.y);
//        let point2 = new cv.Point(object.x + object.width, object.y + object.height);
//        cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
//    }

//    cv.imshow(options.canvasOutputDom, src);
//    src.delete();
//    dst.delete()
//}

////图像分割
//export function imageSegmentation(_instance, _element, _options) {
//    let imageData = element.querySelector('#' + options.imageDataDom);
//    let src = cv.imread(imageData);
//    let dst = new cv.Mat();

//    // 灰度化
//    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

//    var dst = new cv.Mat();
//    // 图像分割
//    cv.threshold(src, dst, 177, 200, cv.THRESH_BINARY);

//    cv.imshow(options.canvasOutputDom, dst);
//    src.delete();
//    dst.delete()
//}

////运动跟踪
//export function motionTracking(_instance, _element, _options) {
//    let imageData = element.querySelector('#' + options.imageDataDom);
//    let src = cv.imread(imageData);
//    let dst = new cv.Mat();

//    // 灰度化
//    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

//    var prevImg = new cv.Mat();
//    var nextImg = new cv.Mat();
//    var flow = new cv.Mat();
//    // 读取图像
//    cv.imread('prev.png', prevImg);
//    cv.imread('next.png', nextImg);
//    // 运动估计
//    cv.calcOpticalFlowFarneback(prevImg, nextImg, flow, 0.5, 3, 15, 3, 5, 1.2, 0);
//    // 绘制运动轨迹
//    for (let y = 0; y < flow.rows; y += 5) {
//        for (let x = 0; x < flow.cols; x += 5) {
//            let flowVec = flow.data32F;
//            let point1 = new cv.Point(x, y);
//            let point2 = new cv.Point(Math.round(x + flowVec[2 * (y * flow.cols + x)]),
//                Math.round(y + flowVec[2 * (y * flow.cols + x) + 1]));
//            cv.arrowedLine(src, point1, point2, [255, 0, 0, 255]);
//        }
//    }

//    cv.imshow(options.canvasOutputDom, src);
//    src.delete();
//    dst.delete()
//}

////增强现实
//export function augmentedReality(_instance, _element, _options) {
//    let imageData = element.querySelector('#' + options.imageDataDom);
//    let src = cv.imread(imageData);
//    let dst = new cv.Mat();

//    // 灰度化
//    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);

//    var dst = new cv.Mat();
//    // 图像分割
//    cv.threshold(src, dst, 177, 200, cv.THRESH_BINARY);

//    cv.imshow(options.canvasOutputDom, dst);
//    src.delete();
//    dst.delete()
//}
