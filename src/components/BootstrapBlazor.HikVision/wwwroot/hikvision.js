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
        return false;
    }

    const result = await initWindow(id);
    if (result.inited === false) {
        return false;
    }

    Data.set(id, {
        iWndIndex: result.iWndIndex,
        inited: true
    });

    return true;
}

const initWindow = id => {
    const result = { inited: null, iWndIndex: -1 };
    WebVideoCtrl.I_InitPlugin({
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
                clearInterval(handler)
                resolve(result);
            }
        }, 16);
    });
}

export async function login(id, ip, port, userName, password, loginType) {
    const vision = Data.get(id);
    const { inited, logined } = vision;
    if (inited !== true || ip.length === 0 || port <= 0 || userName.length === 0 || password.length === 0) {
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
            if (vision.logined !== null) {
                clearInterval(handler)
                resolve(vision.logined);
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

    vision.devicePort = await WebVideoCtrl.I_GetDevicePort(vision.szDeviceIdentify);
    await getChannelInfo(vision);

    const oWndInfo = WebVideoCtrl.I_GetWindowStatus(iWndIndex);
    const iRtspPort = vision.devicePort.iRtspPort;
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

    console.log(oWndInfo);
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

export function dispose(id) {
    const vision = Data.get(id);
    Data.remove(id);

    const { realPlaying, logined } = vision;
    if (realPlaying === true) {
        stopRealPlay(id);
    }
    if (logined === true) {
        logout(id);
    }
    WebVideoCtrl.I_DestroyPlugin();

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
