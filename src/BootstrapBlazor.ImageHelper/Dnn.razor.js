import { vibrate, addScript, Utils } from '/_content/BootstrapBlazor.ImageHelper/utils.js'
import { UtilsDnn } from '/_content/BootstrapBlazor.ImageHelper/utilsdnn.js'

let loading = true;
let img = new Image();
let element = null;
let instance = null;
let options = null;
let utils = null;
let utilsDnn = null;
let loadingFace = true;
let loadingSemanticSegmentation = true;
let loadingPoseEstimation = true;

export function init(_instance, _element, _options) {
    apply(_instance, _element, _options);
    let inputElement = element.querySelector('#' + options.fileInputDom);
    let captureElement = element.querySelector('#' + options.captureDom);
    let canvasOutput = element.querySelector('#' + _options.imageDataDom);
    utils = new Utils(instance, element, options);
    utilsDnn = new UtilsDnn(instance, element, options);
    //canvasOutput.height = 0;
    //canvasOutput.width = 0;

    inputElement.addEventListener('change', (e) => {
        utilsDnn.loadImageToCanvas(e, options.imageDataDom, obj_detection(instance, element, _options));
        //img.src = URL.createObjectURL(e.target.files[0]);
    }, false);

    captureElement.addEventListener('change', (e) => {
        utilsDnn.loadImageToCanvas(e, options.imageDataDom, obj_detection(instance, element, _options));
        //img.src = URL.createObjectURL(e.target.files[0]); 
    }, false);

    img.onload = function () {
        let mat = cv.imread(img);
        cv.imshow(options.imageDataDom, mat);
        mat.delete();
        obj_detection(instance, element, _options);
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

export function apply(_instance, _element, _options) {
    options = _options;
    instance = _instance;
    element = _element;
}

function isLoadImage() {
    if (!img.src) {
        alert('请先上传图片')
        return false
    }
    return true
}

export async function obj_detection(_instance, _element, _options) {
    apply(_instance, _element, _options);
    //ssd
    let mods = [
        "mobilenet_iter_deploy.prototxt",
        "mobilenet_iter_73000.caffemodel"
    ];
    if (loading) {
        instance.invokeMethodAsync('GetResult', '正在加载模型文件');
        let baseurl = '_content/BootstrapBlazor.ImageHelper/models/obj_detection/';
        let result = await utils.initModels(mods, baseurl);
        if (result) {
            loading = false;
            setTimeout(utilsDnn.main(mods), 1);
            instance.invokeMethodAsync('GetResult', '加载模型文件完成');
        } else {
            instance.invokeMethodAsync('GetResult', '加载模型文件失败');
        }
    } else {
        setTimeout(utilsDnn.main(mods), 1);
    }
}

export function obj_detection_camera(_instance, _element, _options) {
    apply(_instance, _element, _options);
    setTimeout(utilsDnn.main, 1);
}

export async function semantic_segmentation(_instance, _element, _options) {
    apply(_instance, _element, _options);
    let mods = [
        "opt_deeplabv3_mnv2_513.pb"
    ];
    if (loadingSemanticSegmentation) {
        instance.invokeMethodAsync('GetResult', '正在加载模型文件');
        let baseurl = '_content/BootstrapBlazor.ImageHelper/models/semantic_segmentation/';
        let result = await utils.initModels(mods, baseurl);
        if (result) {
            loadingSemanticSegmentation = false;
            setTimeout(utilsDnn.main(mods, 1), 1);
            instance.invokeMethodAsync('GetResult', '加载模型文件完成');
        } else {
            instance.invokeMethodAsync('GetResult', '加载模型文件失败');
        }
    } else {
        setTimeout(utilsDnn.main(mods, 1), 1);
    }
}

//899.62秒
export async function pose_estimation(_instance, _element, _options) {
    apply(_instance, _element, _options);
    let mods = [
        "pose_iter_440000.caffemodel",
        "pose_deploy_linevec.prototxt"
    ];
    if (loadingPoseEstimation) {
        instance.invokeMethodAsync('GetResult', '正在加载模型文件');
        let baseurl = '_content/BootstrapBlazor.ImageHelper/models/pose_estimation/coco/';
        let result = await utils.initModels(mods, baseurl);
        if (result) {
            loadingPoseEstimation = false;
            setTimeout(utilsDnn.main(mods, 2), 1);
            instance.invokeMethodAsync('GetResult', '加载模型文件完成');
        } else {
            instance.invokeMethodAsync('GetResult', '加载模型文件失败');
        }
    } else {
        setTimeout(utilsDnn.main(mods, 2), 1);
    }
}

export async function face_detection(_instance, _element, _options) {
    apply(_instance, _element, _options);
    let mods = [
        "res10_300x300_ssd_iter_140000_fp16.caffemodel",
        "deploy.prototxt"
    ];
    if (loadingFace) {
        instance.invokeMethodAsync('GetResult', '正在加载模型文件');
        let baseurl = '_content/BootstrapBlazor.ImageHelper/models/face/';
        let result = await utils.initModels(mods, baseurl);
        if (result) {
            loadingFace = false;
            setTimeout(utilsDnn.main(mods, 3), 1);
            instance.invokeMethodAsync('GetResult', '加载模型文件完成');
        } else {
            instance.invokeMethodAsync('GetResult', '加载模型文件失败');
        }
    } else {
        setTimeout(utilsDnn.main(mods, 3), 1);
    }
}

