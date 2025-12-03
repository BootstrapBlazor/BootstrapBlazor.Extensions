import { addScript } from '../BootstrapBlazor/modules/utility.js';

export async function login(ip, port, userName, password, loginType) {
    await addScript('./_content/BootstrapBlazor.HikVision/jsVideoPlugin-1.0.0.min.js');
    await addScript('./_content/BootstrapBlazor.HikVision/webVideoCtrl.js');

    await init_video_plugin();

    //var szDeviceIdentify = `${ip}_ ${port}`;

    WebVideoCtrl.I_Login(ip, loginType, port, userName, password, {
        timeout: 3000,
        success: function (xmlDoc) {
            showOPInfo(szDeviceIdentify + " 登录成功！");
            $("#ip").prepend("<option value='" + szDeviceIdentify + "'>" + szDeviceIdentify + "</option>");
            setTimeout(function () {
                $("#ip").val(szDeviceIdentify);
                setTimeout(function () {
                    getChannelInfo();
                }, 1000);
                getDevicePort();
            }, 10);
            console.log(xmlDoc);
        },
        error: function (oError) {
            console.log(oError);
            //if (ERROR_CODE_LOGIN_REPEATLOGIN === status) {
            //    showOPInfo(szDeviceIdentify + " 已登录过！");
            //} else {
            //    if (oError.errorCode === 401) {
            //        showOPInfo(szDeviceIdentify + " 登录失败，已自动切换认证方式！");
            //    } else {
            //        showOPInfo(szDeviceIdentify + " 登录失败！", oError.errorCode, oError.errorMsg);
            //    }
            //}
        }
    });

    return true;
}

const init_video_plugin = async () => {
    let inited = false;
    WebVideoCtrl.I_InitPlugin({
        bWndFull: true,
        iWndowType: 1,
        cbSelWnd: function (xmlDoc) {
            //g_iWndIndex = parseInt($(xmlDoc).find("SelectWnd").eq(0).text(), 10);
            //var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
            //showCBInfo(szInfo);
        },
        cbDoubleClickWnd: function (iWndIndex, bFullScreen) {
            //    var szInfo = "当前放大的窗口编号：" + iWndIndex;
            //    if (!bFullScreen) {
            //        szInfo = "当前还原的窗口编号：" + iWndIndex;
            //    }
            //    showCBInfo(szInfo);
        },
        cbEvent: function (iEventType, iParam1, iParam2) {
            //    if (2 == iEventType) {// 回放正常结束
            //        showCBInfo("窗口" + iParam1 + "回放结束！");
            //    } else if (-1 == iEventType) {
            //        showCBInfo("设备" + iParam1 + "网络错误！");
            //    } else if (3001 == iEventType) {
            //        clickStopRecord(g_szRecordType, iParam1);
            //    }
        },
        cbInitPluginComplete: function () {
            WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin").then(() => {
                WebVideoCtrl.I_CheckPluginVersion().then((bFlag) => {
                    if (bFlag) {
                        alert("检测到新的插件版本，双击开发包目录里的HCWebSDKPluginsUserSetup.exe升级！");
                    }

                    inited = true;
                });
            }, () => {
                alert("插件初始化失败，请确认是否已安装插件；如果未安装，请双击开发包目录里的HCWebSDKPluginsUserSetup.exe安装！");
            });
        }
    });

    return new Promise((resolve, reject) => {
        const handler = setInterval(() => {
            if (inited) {
                clearInterval(handler)
                resolve()
            }
        }, 20)
    })
}

export function logout(id) {
    var szDeviceIdentify = `${ip}_ ${port}`;

    WebVideoCtrl.I_Logout(szDeviceIdentify).then(() => {
        //$("#ip option:contains(" + szDeviceIdentify + ")").remove();
        //showOPInfo(szDeviceIdentify + " " + "退出成功！");
    }, () => {
        //showOPInfo(szDeviceIdentify + " " + "退出失败！");
    });
}

export function startRealPlay() {

}

export function stopRealPlay() {

}

export function dispose() {

}
