export async function DownLoadAudioFileStream(contentStreamReference, filename = "test.wav") {
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const blobURL = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = blobURL;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(blobURL);
}

export async function PlayAudioFileStream(contentStreamReference, player) {
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);

    var sound = document.getElementsByTagName('Audio')[0];
    if (sound == undefined || sound == null) {
        sound = new Audio();
        player.appendChild(sound);
    }
    sound.src = url;
    sound.type = 'audio/mpeg';
    //sound.pause();
    sound.load();
    sound.play();
    sound.onended = function () {
        player.removeChild(sound);
        URL.revokeObjectURL(url);
    };
}

function convertDataURIToBinary(dataURI) {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}