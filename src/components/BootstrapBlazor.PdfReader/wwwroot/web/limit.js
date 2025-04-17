//屏蔽功能按钮
function onBodyLoad() {
    var appConfig = PDFViewerApplication.appConfig;
    //appConfig.toolbar.viewBookmarkviewBookmark.setAttribute('hidden', 'true');
    appConfig.secondaryToolbar.viewBookmarkButton.setAttribute('hidden', 'true');
    appConfig.toolbar.openFile.setAttribute('hidden', 'true');
    appConfig.secondaryToolbar.openFileButton.setAttribute('hidden', 'true');
    appConfig.toolbar.download.setAttribute('hidden', 'true');
    appConfig.secondaryToolbar.downloadButton.setAttribute('hidden', 'true');
    appConfig.toolbar.print.setAttribute('hidden', 'true');
    appConfig.secondaryToolbar.printButton.setAttribute('hidden', 'true');

    //禁止键盘操作
    window.onkeydown = window.onkeyup = window.onkeypress = function (e) {
        e.preventDefault(); // 阻止默认事件行为
        window.event.returnValue = false;
    }

    if (getQueryVariable("wm"))
    {
        if (getQueryVariable("wmonlydemo") && getQueryVariable("wmonlydemo")=='true')
        {
            document.addEventListener('fullscreenchange', () => {
                if (document.fullscreenElement === document.getElementById("viewerContainer") ) {
                    document.getElementById("watermark").value = getQueryVariable("wm");
                } else {
                    document.getElementById("watermark").value = '';
                }
            });
        } else {
            document.getElementById("watermark").value = getQueryVariable("wm");
        }
    }
}

function getQueryVariable(variable) {
    console.log(variable, window.location)
    var query = window.location.hash.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
