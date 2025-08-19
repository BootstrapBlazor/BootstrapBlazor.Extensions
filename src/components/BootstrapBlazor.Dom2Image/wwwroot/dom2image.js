import { snapdom } from './lib/snapdom.min.mjs'

export async function getUrl(selector, options = {}) {
    let data = null;
    const el = document.querySelector(selector);
    if (el) {
        const result = await snapdom(el, options);
        data = result.url;
    }
    return data;
}

export async function getStream(selector, options = {}) {
    let data = null;
    const el = document.querySelector(selector);
    if (el) {
        const result = await snapdom(el, options);
        data = result.toBlob();
    }
    return data;
}

export async function downloadAsync(selector, filename, format, backgroundColor, options) {
    const el = document.querySelector(selector);
    if (el) {
        const result = await snapdom(el, options);
        await result.download({
            format,
            filename,
            backgroundColor
        });
    }
}
