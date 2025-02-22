import './lib/html-to-image.js'

export async function execute(selector, methodName, options) {
    let data = null;
    const el = document.querySelector(selector);
    if (el) {
        const fn = methodName === 'toBlob'
            ? htmlToImage[methodName]
            : getMethod(options);
        data = await fn(el, options);
    }
    return data;
}

const getMethod = options => {
    let ret = "toPng";
    if (options) {
        const { methodName } = options;
        delete options.methodName;

        if (['toPng', 'toJpeg', 'toSvg', 'toCanvas'].find(i => i === methodName)) {
            ret = methodName;
        }
    }
    return htmlToImage[ret];
}
