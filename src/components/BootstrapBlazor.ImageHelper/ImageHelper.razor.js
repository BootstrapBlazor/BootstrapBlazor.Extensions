import { vibrate, addScript, Utils } from '/_content/BootstrapBlazor.ImageHelper/utils.js'

let loading = true;
let img = new Image();
let element = null;
let instance = null;
let options = null;

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
        img.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    if (captureElement) captureElement.addEventListener('change', (e) => {
        img.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    img.onload = function () {
        let inCanvasCtx = inCanvas.getContext('2d')
        inCanvasCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 400, 400);
        if (img.width !== 400 || img.height != 400) {
            inCanvas.toBlob(function (blob) {
                img.src = URL.createObjectURL(blob);
            })
        }
    };

    addScript(options.openCvUrl).then(
        () => {
            instance.invokeMethodAsync('GetReady');
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

//人脸检测
async function faceDetectionBase(_instance, _element, _options, type) {
    apply(_instance, _element, _options);
    let inCanvas = element.querySelector('#' + options.imageDataDom);
    let videoInput = element.querySelector('#' + options.videoInputDom);
    inCanvas.hidden = true;
    videoInput.hidden = false;

    if (type != 3 && !isLoadImage()) return false;
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
            if (type === 1)
                faceDetection(_instance, _element, _options);
            else if (type === 3)
                faceDetectionInCamera(_instance, _element, _options);
            else
                faceDetection1st(_instance, _element, _options);
        } else {
            instance.invokeMethodAsync('GetResult', '加载模型文件失败');
        }        
        return false;
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
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
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
    src.delete(); gray.delete(); faceCascade.delete();
    eyeCascade.delete(); faces.delete(); eyes.delete();
}

export async function faceDetection1st(_instance, _element, _options) {
    if (!(await faceDetectionBase(_instance, _element, _options, 2))) return; 
    let imageData = element.querySelector('#' + options.imageDataDom);
    let src = cv.imread(imageData);
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    let faces = new cv.RectVector();
    let faceCascade = new cv.CascadeClassifier();
    // load pre-trained classifiers
    faceCascade.load('haarcascade_frontalface_default.xml');
    // // detect faces
    let msize = new cv.Size(0, 0);
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
    for (let i = 0; i < faces.size(); ++i) {
        let roiGray = gray.roi(faces.get(i));
        let roiSrc = src.roi(faces.get(i));
        const offest = 0
        let point1 = new cv.Point(faces.get(i).x, faces.get(i));
        let point2 = new cv.Point(faces.get(i).x + faces.get(i).width,
            faces.get(i).y + faces.get(i).height);
        let dst = new cv.Mat();
        // You can try more different parameters
        let rect = new cv.Rect(faces.get(i).x, faces.get(i).y, faces.get(i).width, faces.get(i).height);
        dst = src.roi(rect);
        cv.imshow(options.canvasOutputDom, dst);
        dst.delete();
        roiGray.delete();
        roiSrc.delete();
    }
    src.delete();
    gray.delete();
    faceCascade.delete();
    faces.delete();
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

export async function faceDetectionInCamera(_instance, _element, _options) {
    if (!(await faceDetectionBase(_instance, _element, _options, 3))) return;
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

    utils.startCamera('vga', onVideoStarted, options.videoInputDom, options.deviceID, onChangeCamera);

    startAndStop.addEventListener('click', () => onToggleCamera());
    function onToggleCamera() {
        if (!streaming) {
            utils.clearError();
            utils.startCamera('vga', onVideoStarted, options.videoInputDom, options.deviceID, onChangeCamera);
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
                faces.delete();
                faceCascade.delete();
                return;
            }
            let begin = Date.now();
            // start processing.
            cap.read(src);
            src.copyTo(dst);
            cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
            // detect faces.
            faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0);
            // draw faces.
            for (let i = 0; i < faces.size(); ++i) {
                let face = faces.get(i);
                let point1 = new cv.Point(face.x, face.y);
                let point2 = new cv.Point(face.x + face.width, face.y + face.height);
                cv.rectangle(dst, point1, point2, [255, 0, 0, 255], 2); 

                dst = new cv.Mat();
                let rect = new cv.Rect(faces.get(i).x, faces.get(i).y, faces.get(i).width, faces.get(i).height);
                dst = src.roi(rect);
                break;
            }
            cv.imshow(options.canvasOutputDom, dst);
            if (faces.size() > 0) {
                let canvas = element.querySelector('#' + options.canvasOutputDom);
                let dataUrl = canvas.toDataURL("image/jpeg");
                instance.invokeMethodAsync('GetFace', dataUrl);  
            }
            // schedule the next one.
            let delay = 1000 / FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
        } catch (err) {
            utils.printError(err);
        }
    };


    function onVideoStarted() {
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
        videoInput.width = videoInput.videoWidth;
        videoInput.height = videoInput.videoHeight;
        setTimeout(processVideo, 0);
    }

    function onChangeCamera(selectedDeviceId) {
        utils.stopCamera();
        options.deviceID = selectedDeviceId;
        utils.startCamera('vga', onVideoStarted, options.videoInputDom, options.deviceID, onChangeCamera);
    }

    function onVideoStopped() {
        streaming = false;
        canvasContext.clearRect(0, 0, canvasOutput.width, canvasOutput.height);
        startAndStop.innerText = 'Start';
    }

}
