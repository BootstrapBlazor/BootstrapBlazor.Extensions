import { addScript, registerBootstrapBlazorModule } from '../BootstrapBlazor/modules/utility.js';
import Data from '../BootstrapBlazor/modules/data.js';

export async function init(id) {
    await addScript('./_content/BootstrapBlazor.HikVision/webVideoCtrl.js');

    if (window.$ === void 0) {
        await addScript('./_content/BootstrapBlazor.HikVision/jquery-1.7.1.min.js');
    }

    const el = document.getElementById(id);
    if (el === null) {
        return false;
    }

    const result = await initWindow(id);
    if (result.inited === false) {
        return false;
    }

    const vision = Data.get(id);
    vision.iWndIndex = result.iWndIndex;
    vision.inited = true;

    const observer = new IntersectionObserver(() => {
        if (checkVisibility(el)) {
            WebVideoCtrl.I_Resize(el.offsetWidth, el.offsetHeight);
        }
        else {
            WebVideoCtrl.I_HidPlugin();
        }
    });
    observer.observe(el);
    vision.observer = observer;

    return true;
}

const hackJSResize = function () {
    const originalResize = JSVideoPlugin.prototype.JS_Resize;
    JSVideoPlugin.prototype.JS_Resize = function (e, t) {
        const { szId } = this.oOptions;
        const el = document.getElementById(szId);
        if (el) {
            const visible = checkVisibility(el);
            if (visible) {
                return originalResize.call(this, e, t);
            }
            else {
                WebVideoCtrl.I_HidPlugin();
            }
        }
    }
}

const hackJSShowWnd = function () {
    const originalShowWnd = JSVideoPlugin.prototype.JS_ShowWnd;
    JSVideoPlugin.prototype.JS_ShowWnd = function () {
        const { szId } = this.oOptions;
        const el = document.getElementById(szId);
        if (el) {
            const visible = checkVisibility(el);
            if (visible) {
                return originalShowWnd.call(this);
            }
            else {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            }
        }
    }
}

const hackJSDestroyPlugin = function () {
    const originalDestroy = JSVideoPlugin.prototype.JS_DestroyPlugin;
    JSVideoPlugin.prototype.JS_DestroyPlugin = function (n) {
        const origianlSendRequestProxy = this.oPlugin.oRequest.oRequest.sendRequest;
        this.oPlugin.oRequest.oRequest.sendRequest = function (r) {
            if (this.oWebSocket && WebSocket.OPEN === this.oWebSocket.readyState) {
                return origianlSendRequestProxy.call(this, r);
            }
        }
        this.oPlugin.JS_DestroyPlugin(true);

        JSVideoPlugin = null;
        delete window.JSVideoPlugin;
        removePlugin();

        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

const removePlugin = () => {
    const scripts = [...document.head.querySelectorAll('script')]
    const nodes = scripts.filter(function (link) {
        return link.src.indexOf('/jsVideoPlugin-1.0.0.min.js') > -1
    })
    for (let index = 0; index < nodes.length; index++) {
        document.head.removeChild(nodes[index])
    }
}

const initWindow = id => {
    const result = { inited: null, iWndIndex: -1 };
    WebVideoCtrl.I_InitPlugin({
        szBasePath: './_content/BootstrapBlazor.HikVision',
        bWndFull: true,
        iWndowType: 1,
        cbSelWnd: function (xmlDoc) {
            result.iWndIndex = parseInt(getTagNameFirstValue(xmlDoc, "SelectWnd"));
        },
        cbDoubleClickWnd: function (iWndIndex, bFullScreen) {

        },
        cbEvent: function (iEventType, iParam1, iParam2) {

        },
        cbInitPluginComplete: function () {
            WebVideoCtrl.I_InsertOBJECTPlugin(id).then(() => {
                result.inited = true;
            }, () => {
                result.inited = false;
            });
        }
    });

    return new Promise((resolve, reject) => {
        const handler = setInterval(() => {
            if (result.inited === false || (result.inited && result.iWndIndex !== -1)) {
                clearInterval(handler);
                hackJSResize();
                hackJSShowWnd();
                hackJSDestroyPlugin();
                resolve(result);
            }
        }, 16);
    });
}

export async function login(id, ip, port, userName, password, loginType) {
    const vision = Data.get(id);
    const { inited, logined } = vision;
    if (inited !== true || ip.length === 0 || port <= 0 || userName.length === 0 || password.length === 0) {
        vision.logined = false;
        return false;
    }
    if (logined === true) {
        return true;
    }

    vision.szDeviceIdentify = `${ip}_${port}`;
    vision.logined = null;
    vision.loginErrorCode = null;
    vision.loginErrorMsg = null;

    WebVideoCtrl.I_Login(ip, loginType, port, userName, password, {
        timeout: 3000,
        success: function (xmlDoc) {
            getChannelList(vision).then(() => {
                vision.logined = true;
            });
        },
        error: function (oError) {
            const ERROR_CODE_LOGIN_REPEATLOGIN = 2001;
            if (oError.errorCode === ERROR_CODE_LOGIN_REPEATLOGIN) {
                vision.logined = true;
                return true;
            }

            vision.logined = false;
            vision.loginErrorCode = oError.errorCode;
            vision.loginErrorMsg = oError.errorMsg;
        }
    });

    return new Promise((resolve, reject) => {
        const handler = setInterval(async () => {
            if (vision.logined !== null) {
                clearInterval(handler)
                resolve(vision.logined);
            }
        }, 16);
    });
}

const getChannelList = vision => {
    const { szDeviceIdentify, logined } = vision;

    let analog_completed = false;
    WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
            const channels = [...getTagNameValues(xmlDoc, "VideoInputChannel")];
            vision.analogChannels = channels.map(channel => {
                return {
                    id: parseInt(getTagNameFirstValue(channel, "id")),
                    inputPort: parseInt(getTagNameFirstValue(channel, "inputPort")),
                    name: getTagNameFirstValue(channel, "name"),
                    videoFormat: getTagNameFirstValue(channel, "videoFormat")
                };
            });
            analog_completed = true;
        },
        error: function (oError) {
            analog_completed = true;
        }
    });

    let digital_completed = false;
    WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
            const channels = [...getTagNameValues(xmlDoc, "InputProxyChannelStatus")];
            vision.digitalChannels = channels.map(channel => {
                return {
                    id: parseInt(getTagNameFirstValue(channel, "id")),
                    online: getTagNameFirstValue(channel, "online")
                };
            });
            digital_completed = true;
        },
        error: function (oError) {
            digital_completed = true;
        }
    });

    let zero_completed = false;
    WebVideoCtrl.I_GetZeroChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
            const channels = [...getTagNameValues(xmlDoc, "ZeroVideoChannel")];
            vision.zeroChannels = channels.map(channel => {
                return {
                    id: parseInt(getTagNameFirstValue(channel, "id")),
                    inputPort: parseInt(getTagNameFirstValue(channel, "inputPort")),
                    enabled: getTagNameFirstValue(channel, "enabled") === 'true',
                };
            });
            zero_completed = true;
        },
        error: function (oError) {
            zero_completed = true;
        }
    });

    return new Promise((resolve, reject) => {
        const handler = setInterval(() => {
            if (analog_completed && digital_completed && zero_completed) {
                clearInterval(handler)
                resolve();
            }
        }, 16);
    });
}

export async function logout(id) {
    const vision = Data.get(id);
    const { szDeviceIdentify, logined } = vision;
    if (logined !== true) {
        vision.logined = false;
        return;
    }

    stopRealPlay(id);

    await WebVideoCtrl.I_Logout(szDeviceIdentify);
    vision.logined = false;
}

export async function startRealPlay(id, iStreamType, iChannelID) {
    const vision = Data.get(id);
    const { iWndIndex, szDeviceIdentify } = vision;

    vision.devicePort = await WebVideoCtrl.I_GetDevicePort(szDeviceIdentify);
    const { iRtspPort } = vision.devicePort;
    const bZeroChannel = false;
    let completed = null;
    const startRealPlay = function () {
        WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
            iWndIndex: iWndIndex,
            iStreamType: iStreamType,
            iChannelID: iChannelID,
            bZeroChannel: bZeroChannel,
            iPort: iRtspPort,
            success: function () {
                vision.realPlaying = true;
                completed = true;
            },
            error: function (oError) {
                vision.realPlaying = false;
                completed = false;
            }
        });
    };

    const oWndInfo = WebVideoCtrl.I_GetWindowStatus(iWndIndex);
    if (oWndInfo !== null) {
        WebVideoCtrl.I_Stop({
            success: function () {
                startRealPlay();
            }
        });
    }
    else {
        startRealPlay();
    }

    return new Promise((resolve, reject) => {
        const handler = setInterval(() => {
            if (completed !== null) {
                clearInterval(handler)
                resolve(completed);
            }
        }, 16);
    });
}

export function stopRealPlay(id) {
    const vision = Data.get(id);
    const { iWndIndex, realPlaying } = vision;

    if (realPlaying !== true) {
        return true;
    }

    const oWndInfo = WebVideoCtrl.I_GetWindowStatus(iWndIndex);
    let completed = null;
    if (oWndInfo !== null) {
        WebVideoCtrl.I_Stop({
            success: function () {
                vision.realPlaying = false;
                completed = true;
            },
            error: function (oError) {
                completed = false;
            }
        });
    }

    return new Promise((resolve, reject) => {
        const handler = setInterval(() => {
            if (completed !== null) {
                clearInterval(handler)
                resolve(completed);
            }
        }, 16);
    });
}

export async function openSound(id) {
    const vision = Data.get(id);
    const { iWndIndex, realPlaying } = vision;

    if (realPlaying !== true) {
        return 101;
    }

    let code = 100;
    try {
        await WebVideoCtrl.I_OpenSound(iWndIndex);
    }
    catch (ex) {
        code = 102;
        console.log(ex);
    }
    return code;
}

export async function closeSound(id) {
    const vision = Data.get(id);
    const { iWndIndex, realPlaying } = vision;

    if (realPlaying !== true) {
        return 101;
    }

    let code = 100;
    try {
        await WebVideoCtrl.I_CloseSound(iWndIndex);
    }
    catch (ex) {
        code = 102;
        console.log(ex);
    }
    return code;
}

export async function setVolume(id, value) {
    const vision = Data.get(id);
    const { iWndIndex, realPlaying } = vision;

    if (realPlaying !== true) {
        return 101;
    }

    let v = parseInt(value);
    if (isNaN(v)) {
        v = 50;
    }

    let code = 100;
    try {
        await WebVideoCtrl.I_SetVolume(Math.min(100, Math.max(0, v)));
    }
    catch (ex) {
        code = 102;
        console.log(ex);
    }
    return code;
}

export async function capturePicture(id) {
    const vision  = Data.get(id);
    const { iWndIndex, realPlaying, invoke } = vision;

    if (realPlaying !== true) {
        return "";
    }

    try {
        const base64 = await WebVideoCtrl.I_CapturePicData();
        const bytes = base64ToArray(base64);
        return DotNet.createJSStreamReference(bytes.buffer);
    }
    catch (ex) {
        return null;
    }
}

const base64ToArray = base64String => {
    const base64Data = base64String.split(',')[1] || base64String;
    const binaryString = atob(base64Data);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
}
export function dispose(id) {
    const vision = Data.get(id);
    const { realPlaying, logined, observer } = vision;
    if (observer) {
        observer.disconnect();
    }
    WebVideoCtrl.I_HidPlugin();

    if (realPlaying === true) {
        stopRealPlay(id);
    }
    if (logined === true) {
        logout(id);
    }
    WebVideoCtrl.I_DestroyPlugin();

    Data.remove(id);
}

const getTagNameFirstValue = (xmlDoc, tagName, defaultValue = '0') => {
    const tags = xmlDoc.getElementsByTagName(tagName);
    if (tags.length > 0) {
        return tags[0].textContent;
    }
    return defaultValue;
}

const getTagNameValues = (xmlDoc, tagName) => {
    return xmlDoc.getElementsByTagName(tagName);
}

const checkVisibility = el => {
    if (el.checkVisibility) {
        return el.checkVisibility();
    }
    else {
        return isVisible(el);
    }
}

const isVisible = (element) => {
    if (!element) return false;

    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) < 0.01) {
        return false;
    }

    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
        return false;
    }

    let parent = element.parentElement;
    while (parent) {
        const parentStyle = window.getComputedStyle(parent);
        if (parentStyle.display === 'none' || parentStyle.visibility === 'hidden') {
            return false;
        }
        parent = parent.parentElement;
    }

    return true;
}
