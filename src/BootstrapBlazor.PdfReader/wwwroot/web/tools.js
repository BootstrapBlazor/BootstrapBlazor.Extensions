//屏蔽功能按钮
function onBodyLoad() {

    if (getQueryVariable("wm"))
    { 
        document.getElementById("watermark").value = getQueryVariable("wm");
    } 
    console.log(navigator.userAgent); 
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