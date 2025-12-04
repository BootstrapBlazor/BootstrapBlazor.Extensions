import { addScript } from '../BootstrapBlazor/modules/utility.js';
import Data from '../BootstrapBlazor/modules/data.js';

export async function init(id) {
    await addScript('./_content/BootstrapBlazor.HikVision/jsVideoPlugin-1.0.0.min.js');
    await addScript('./_content/BootstrapBlazor.HikVision/webVideoCtrl.js');

    if (window.$ === void 0) {
        await addScript('./_content/BootstrapBlazor.HikVision/jquery-1.7.1.min.js');
    }

    const el = document.getElementById(id);
    if (el === null) {
        return;
    }

    const result = await initWindow(id);
    if (result.inited === false) {
        return;
    }

    Data.set(id, {
        iWndIndex: result.iWndIndex
    });
}

const initWindow = id => {
    const result = { inited: null, iWndIndex: -1 };
    WebVideoCtrl.I_InitPlugin({
        bWndFull: true,
        iWndowType: 1,
        cbSelWnd: function (xmlDoc) {
            result.iWndIndex = getTagNameFirstValue(xmlDoc, "SelectWnd")
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
                clearInterval(handler)
                resolve(result);
            }
        }, 16);
    });
}

export async function login(id, ip, port, userName, password, loginType) {
    const vision = Data.get(id);
    vision.szDeviceIdentify = `${ip}_${port}`;
    vision.logined = null;
    vision.loginErrorCode = null;
    vision.loginErrorMsg = null;

    WebVideoCtrl.I_Login(ip, loginType, port, userName, password, {
        timeout: 3000,
        success: function (xmlDoc) {
            vision.logined = true;
        },
        error: function (oError) {
            const ERROR_CODE_LOGIN_REPEATLOGIN = 2001;
            if (oError.errorCode === ERROR_CODE_LOGIN_REPEATLOGIN) {
                vision.logined = true;
                return;
            }

            vision.logined = false;
            vision.loginErrorCode = oError.errorCode;
            vision.loginErrorMsg = oError.errorMsg;
        }
    });

    return new Promise((resolve, reject) => {
        const handler = setInterval(async () => {
            if (vision.logined !== void 0) {
                clearInterval(handler)
                resolve(vision);
            }
        }, 16);
    });
}

const getChannelInfo = vision => {
    const { szDeviceIdentify } = vision;
    let analog_completed = false;
    WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
            const channels = [...getTagNameValues(xmlDoc, "VideoInputChannel")];
            vision.analogChannels = channels.map(channel => {
                return {
                    id: getTagNameFirstValue(channel, "id"),
                    inputPort: getTagNameFirstValue(channel, "inputPort"),
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
                    id: getTagNameFirstValue(channel, "id"),
                    name: getTagNameFirstValue(channel, "name"),
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
                    id: getTagNameFirstValue(channel, "id"),
                    name: getTagNameFirstValue(channel, "name")
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
                resolve(vision);
            }
        }, 16);
    });
}

export function logout(id) {
    const vision = Data.get(id);
    const { szDeviceIdentify } = vision;

    let completed = null;
    WebVideoCtrl.I_Logout(szDeviceIdentify).then(() => {
        completed = true;
    }, () => {
        completed = false;
    });

    return new Promise((resolve, reject) => {
        const handler = setInterval(() => {
            if (completed !== null) {
                clearInterval(handler)
                resolve(vision);
            }
        }, 16);
    });
}

export async function startRealPlay(id) {
    const vision = Data.get(id);
    const { iWndIndex, szDeviceIdentify } = vision;

    vision.devicePort = await WebVideoCtrl.I_GetDevicePort(vision.szDeviceIdentify);
    await getChannelInfo(vision);

    const oWndInfo = WebVideoCtrl.I_GetWindowStatus(iWndIndex);
    const iRtspPort = vision.devicePort.iRtspPort;
    const iChannelID = 1;
    const bZeroChannel = false;
    const iStreamType = 1;

    const startRealPlay = function () {
        WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
            iStreamType: iStreamType,
            iChannelID: iChannelID,
            bZeroChannel: bZeroChannel,
            iPort: iRtspPort,
            success: function () {

            },
            error: function (oError) {

            }
        });
    };

    if (oWndInfo != null) {
        WebVideoCtrl.I_Stop({
            success: function () {
                startRealPlay();
            }
        });
    }
    else {
        startRealPlay();
    }
}

export function stopRealPlay(id) {
    const vision = Data.get(id);
    const { iWndIndex, szDeviceIdentify } = vision;

    const oWndInfo = WebVideoCtrl.I_GetWindowStatus(iWndIndex);
    if (oWndInfo !== null) {
        WebVideoCtrl.I_Stop({
            success: function () {

            },
            error: function (oError) {

            }
        });
    }
}

export function dispose(id) {
    stopRealPlay(id);
    logout(id);
    WebVideoCtrl.I_DestroyPlugin();

    Data.remove(id);
}

const getTagNameFirstValue = (xmlDoc, tagName) => {
    const tags = xmlDoc.getElementsByTagName(tagName);
    if (tags.length > 0) {
        return tags[0].textContent;
    }
    return null;
}

const getTagNameValues = (xmlDoc, tagName) => {
    return xmlDoc.getElementsByTagName(tagName);
}
