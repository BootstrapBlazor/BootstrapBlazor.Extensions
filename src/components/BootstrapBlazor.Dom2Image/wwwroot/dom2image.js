import { snapdom } from './lib/snapdom.min.mjs'

export async function getUrl(selector, options = {}) {
    let data = null;
    const el = document.querySelector(selector);
    if (el) {
        options.embedFonts = true;
        const result = await snapdom(el, options);
        data = result.url;
    }
    return data;
}

export async function getStream(selector, options = {}) {
    let data = null;
    const el = document.querySelector(selector);
    if (el) {
        options.embedFonts = true;
        const result = await snapdom(el, options);
        data = result.toBlob();
    }
    return data;
}
