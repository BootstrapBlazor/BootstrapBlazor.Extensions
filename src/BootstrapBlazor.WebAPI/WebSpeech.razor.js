let speakBtn, el, utteranceCache, recognition;
let inited = false;
let speechSynthesis = window.speechSynthesis || window.mozspeechSynthesis || window.webkitspeechSynthesis;

export function SpeechRecognitionDemo(wrapper, lang, continuous = false, interimResults = false) {

    if (!lang) lang = 'zh-CN';

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

    var colors = ['水色', '天蓝色', '米色', '素色', '黑色', '蓝色', '棕色', '巧克力', '珊瑚', '深红色', '青色', '紫红色', '鬼白', '金色', '金黄色', '灰色', '绿色', '靛蓝', '象牙色', '卡其色', '薰衣草色', '石灰', '亚麻色', '洋红色', '栗色', '莫卡辛', '海军蓝', '橄榄色', '橙色', '兰花', '秘鲁', '粉色', '梅花', '紫色', '红色', '鲑鱼色', '西耶娜', '银色', '雪', '棕褐色', '青色', '蓟', '番茄', '绿松石', '紫罗兰', '白色', '黄色'];

    var colorsEn = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

    //var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

    recognition = new SpeechRecognition();
    //const speechRecognitionList = new SpeechGrammarList();
    //speechRecognitionList.addFromString(colors, 1);
    //recognition.grammars = speechRecognitionList;
    recognition.continuous = continuous;
    recognition.lang = lang;
    recognition.interimResults = interimResults;
    recognition.maxAlternatives = 1;

    var diagnostic = document.querySelector('.output');
    var hints = document.querySelector('.hints');

    var colorHTML = '';
    colors.forEach(function (v, i, a) {
        console.log(v, i);
        colorHTML += '<span style="background-color:' + colorsEn[i] + ';"> ' + v + ' </span>';
    });
    hints.innerHTML = '<h4>点击这个区域，然后说出一种颜色来更改应用程序的背景颜色<br/> ' + colorHTML + '.<h4>';

    hints.onclick = function () {
        if (recognition) {
            recognition.stop();
        }
        recognition.start();
        console.log('开始识别.');
        wrapper.invokeMethodAsync('GetStatus', "开始识别");
    }

    recognition.onresult = function (event) {
        var color = event.results[0][0].transcript;
        wrapper.invokeMethodAsync('GetResult', color);
        diagnostic.textContent = '结果: ' + color;
        var index = colors.indexOf(color.replace('.', '').replace('。', ''));
        if (index > -1) {
            color = colorsEn[index];
            diagnostic.textContent += '(' + color + ')';
        }
        hints.style.backgroundColor = color;
        diagnostic.textContent += ' , ' + '匹配率: ' + event.results[0][0].confidence;
        console.log('结果: ' + event.results[0][0].transcript + ',匹配率: ' + event.results[0][0].confidence);
        return event.results[0][0].transcript;
    }

    recognition.onspeechend = function () {
        recognition.stop();
        wrapper.invokeMethodAsync('GetStatus', "识别停止");
    }

    recognition.onnomatch = function () {
        diagnostic.textContent = "不能识别.";
        wrapper.invokeMethodAsync('GetStatus', "不能识别");
    }

    recognition.onerror = function (event) {
        diagnostic.textContent = '识别时出现错误: ' + event.error;
        wrapper.invokeMethodAsync('GetError', event.error);
    }

}

export function SpeechRecognition(wrapper, lang, continuous = false, interimResults = false, maxAlternatives = 1) {

    if (!lang) lang = 'zh-CN';

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

    recognition = new SpeechRecognition();
    recognition.continuous = continuous;
    recognition.lang = lang;
    recognition.interimResults = interimResults;
    recognition.maxAlternatives = maxAlternatives;

    if (recognition) {
        recognition.stop();
    }
    recognition.start();
    console.log('开始识别.' + lang);
    wrapper.invokeMethodAsync('GetStatus', "开始识别");
    wrapper.invokeMethodAsync('Busy', true);

    recognition.onresult = function (event) {
        if (maxAlternatives > 1 && event.results.count > 1) {
            var result = '';
            event.results.forEach(function (v, i, a) {
                result += v[0].transcript + ',';
                console.log('多结果: ' + v[0].transcript + ',匹配率: ' + v[0].confidence);
            });
            wrapper.invokeMethodAsync('GetResult', result);
            wrapper.invokeMethodAsync('GetStatus', '结果: ' + result);

        } else {
            var result = event.results[0][0].transcript;
            wrapper.invokeMethodAsync('GetResult', result);
            console.log('结果: ' + result + ',匹配率: ' + event.results[0][0].confidence);
            wrapper.invokeMethodAsync('GetStatus', '结果: ' + result + ',匹配率: ' + event.results[0][0].confidence);
        }
        return result;
    }

    // recognition.onaudiostart = function () {
    //     recognition.stop();
    //     wrapper.invokeMethodAsync('GetStatus', "开始捕获音频");
    // }

    // recognition.onspeechstart = function () {
    //     wrapper.invokeMethodAsync('GetStatus', "检测到语音");
    // }

    // recognition.onspeechend = function () {
    //     wrapper.invokeMethodAsync('GetStatus', "停止检测语音");
    // }

    // recognition.onaudioend = function () {
    //     wrapper.invokeMethodAsync('GetStatus', "完成音频捕获");
    //}

    recognition.onspeechend = function () {
        recognition.stop();
        wrapper.invokeMethodAsync('Busy', false);
        wrapper.invokeMethodAsync('GetStatus', "识别停止");
    }

    recognition.onnomatch = function () {
        wrapper.invokeMethodAsync('GetStatus', "不能识别");
    }

    recognition.onerror = function (event) {
        wrapper.invokeMethodAsync('GetError', event.error);
    }

}

export function SpeechRecognitionStop(wrapper) {
    try {
        if (recognition) {
            recognition.stop();
            wrapper.invokeMethodAsync('Busy', false);
            wrapper.invokeMethodAsync('GetStatus', "停止识别");
        }
    } catch (error) {
        console.error(error);
        wrapper.invokeMethodAsync('GetError', error.message);
        return false;
    }
    return true;
}

export function SpeechSynthesis(wrapper, text, lang, rate = 1, picth = 1, volume = 1, voiceURI = null) {
    try {
        if (!wrapper) {
            return;
        }
        if (typeof speechSynthesis === "undefined") {
            wrapper.invokeMethodAsync('GetError', "Speech undefined");
            return;
        }
        if (!speechSynthesis) {
            wrapper.invokeMethodAsync('GetError', "Speech 未初始化");
        }
        if (!text) text = 'hello blazor';
        if (!lang) lang = 'zh-CN';

        // Create speech synthesis utterance
        var utterance = new SpeechSynthesisUtterance();

        // Speech synthesis voices 返回一个 SpeechSynthesisVoice 列表，用于表示当前设备上所有可用的语音。
        const voices = speechSynthesis.getVoices();

        // Set voice and language
        if (voiceURI !== null)
            utterance.voice = voices.find(voice => voice.voiceURI === voiceURI);
        else
            utterance.voice = voices.find(voice => voice.lang === lang);

        try {
            wrapper.invokeMethodAsync('GetStatus', '语音:' + utterance.voice.name);
        } catch (error) {
            console.error(error);
        }

        utterance.text = text;
        utterance.volume = volume;
        utterance.rate = rate;
        utterance.pitch = picth;

        // Speak the text
        speechSynthesis.speak(utterance);
        if (!inited) {
            setTimeout(() => {
                if (!speechSynthesis.speaking) {
                    wrapper.invokeMethodAsync('GetError', '请点击初始化按钮');
                    utteranceCache = utterance;
                    el.style.visibility = "visible";
                    speakBtn.addEventListener("click", talk, false);
                } else {
                    inited = true;
                }
            }, 100);
        }
    } catch (error) {
        console.error(error);
        wrapper.invokeMethodAsync('GetError', error.message);
    }
}

export function Speaking(wrapper) {
    try {
        return speechSynthesis.speaking;
    } catch (error) {
        console.error(error);
        wrapper.invokeMethodAsync('GetError', error.message);
        return false;
    }
}

export function SpeechStop(wrapper) {
    try {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            wrapper.invokeMethodAsync('GetStatus', "停止播放");
        }
    } catch (error) {
        console.error(error);
        wrapper.invokeMethodAsync('GetError', error.message);
        return false;
    }
    return true;
}

export async function GetVoiceList(wrapper) {
    if (typeof speechSynthesis === "undefined") {
        wrapper.invokeMethodAsync('GetError', "Speech undefined");
        return;
    }
    let voices = speechSynthesis.getVoices();
    let list = [];
    for (var i = 0; i < voices.length; i++) {
        let x = {
            name: voices[i].name,
            isDefault: voices[i].default,
            lang: voices[i].lang,
            localService: voices[i].localService,
            voiceURI: voices[i].voiceURI,
        }
        list.push(x)
    }
    return list;
}

export function InitWebapi(wrapper, element) {
    el = element;
    speakBtn = element.querySelector("[data-action=speakBtn]");
}

function talk() {
    //speechSynthesis.speak() without user activation is no longer allowed
    //iOS 禁止网站自动播放视频，需要用户交互才能播放。此策略已扩展到 voiceSynthesis.speak 调用。Chrome 也效仿，现在打印一条弃用警告：
    //自 M71（2018 年 12 月左右）起，不再允许在没有用户激活的情况下使用 voiceSynthesis.speak()。有关更多详细信息，请参阅 https://www.chromestatus.com/feature/5687444770914304
    el.style.visibility = "hidden";
    if (utteranceCache !== null) {
        speechSynthesis.speak(utteranceCache);
    } else {
        let u = new SpeechSynthesisUtterance();
        u.text = 'OK';
        speechSynthesis.speak(u);
    }
    setTimeout(() => {
        if (!speechSynthesis.speaking) {
            el.style.visibility = "visible";
            speakBtn.addEventListener("click", talk, false);
        } else {
            inited = true;
            speakBtn.removeEventListener("click", talk);
        }
    }, 100);
}
