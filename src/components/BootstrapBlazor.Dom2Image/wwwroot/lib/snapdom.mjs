/*
* SnapDOM
* v2.0.0
* Author: Juan Martin Muda
* License: MIT
*/
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/core/cache.js
function applyCachePolicy(policy = "soft") {
  cache.session.__counterEpoch = (cache.session.__counterEpoch || 0) + 1;
  switch (policy) {
    case "auto": {
      cache.session.styleMap = /* @__PURE__ */ new Map();
      cache.session.nodeMap = /* @__PURE__ */ new Map();
      return;
    }
    case "soft": {
      cache.session.styleMap = /* @__PURE__ */ new Map();
      cache.session.nodeMap = /* @__PURE__ */ new Map();
      cache.session.styleCache = /* @__PURE__ */ new WeakMap();
      return;
    }
    case "full": {
      return;
    }
    case "disabled": {
      cache.session.styleMap = /* @__PURE__ */ new Map();
      cache.session.nodeMap = /* @__PURE__ */ new Map();
      cache.session.styleCache = /* @__PURE__ */ new WeakMap();
      cache.computedStyle = /* @__PURE__ */ new WeakMap();
      cache.baseStyle = /* @__PURE__ */ new Map();
      cache.defaultStyle = /* @__PURE__ */ new Map();
      cache.image = /* @__PURE__ */ new Map();
      cache.background = /* @__PURE__ */ new Map();
      cache.resource = /* @__PURE__ */ new Map();
      cache.font = /* @__PURE__ */ new Set();
      return;
    }
    default: {
      cache.session.styleMap = /* @__PURE__ */ new Map();
      cache.session.nodeMap = /* @__PURE__ */ new Map();
      cache.session.styleCache = /* @__PURE__ */ new WeakMap();
      return;
    }
  }
}
var cache;
var init_cache = __esm({
  "src/core/cache.js"() {
    cache = {
      image: /* @__PURE__ */ new Map(),
      background: /* @__PURE__ */ new Map(),
      resource: /* @__PURE__ */ new Map(),
      defaultStyle: /* @__PURE__ */ new Map(),
      baseStyle: /* @__PURE__ */ new Map(),
      computedStyle: /* @__PURE__ */ new WeakMap(),
      font: /* @__PURE__ */ new Set(),
      session: {
        styleMap: /* @__PURE__ */ new Map(),
        styleCache: /* @__PURE__ */ new WeakMap(),
        nodeMap: /* @__PURE__ */ new Map()
      }
    };
  }
});

// src/utils/helpers.js
function extractURL(value) {
  const match = value.match(/url\((['"]?)(.*?)(\1)\)/);
  if (!match) return null;
  const url = match[2].trim();
  if (url.startsWith("#")) return null;
  return url;
}
function stripTranslate(transform) {
  if (!transform || transform === "none") return "";
  let cleaned = transform.replace(/translate[XY]?\([^)]*\)/g, "");
  cleaned = cleaned.replace(/matrix\(([^)]+)\)/g, (_, values) => {
    const parts = values.split(",").map((s) => s.trim());
    if (parts.length !== 6) return `matrix(${values})`;
    parts[4] = "0";
    parts[5] = "0";
    return `matrix(${parts.join(", ")})`;
  });
  cleaned = cleaned.replace(/matrix3d\(([^)]+)\)/g, (_, values) => {
    const parts = values.split(",").map((s) => s.trim());
    if (parts.length !== 16) return `matrix3d(${values})`;
    parts[12] = "0";
    parts[13] = "0";
    return `matrix3d(${parts.join(", ")})`;
  });
  return cleaned.trim().replace(/\s{2,}/g, " ");
}
function safeEncodeURI(uri) {
  if (/%[0-9A-Fa-f]{2}/.test(uri)) return uri;
  try {
    return encodeURI(uri);
  } catch {
    return uri;
  }
}
var init_helpers = __esm({
  "src/utils/helpers.js"() {
  }
});

// src/modules/snapFetch.js
function createSnapLogger(prefix = "[snapDOM]", { ttlMs = 5 * 6e4, maxEntries = 12 } = {}) {
  const seen = /* @__PURE__ */ new Map();
  let emitted = 0;
  function log(level, key, msg) {
    if (emitted >= maxEntries) return;
    const now = Date.now();
    const until = seen.get(key) || 0;
    if (until > now) return;
    seen.set(key, now + ttlMs);
    emitted++;
    if (level === "warn" && console && console.warn) console.warn(`${prefix} ${msg}`);
    else if (console && console.error) console.error(`${prefix} ${msg}`);
  }
  return {
    warnOnce(key, msg) {
      log("warn", key, msg);
    },
    errorOnce(key, msg) {
      log("error", key, msg);
    },
    reset() {
      seen.clear();
      emitted = 0;
    }
  };
}
function isSpecialURL(url) {
  return /^data:|^blob:|^about:blank$/i.test(url);
}
function isAlreadyProxied(url, useProxy) {
  try {
    const baseHref = typeof location !== "undefined" && location.href ? location.href : "http://localhost/";
    const proxyBaseRaw = useProxy.includes("{url}") ? useProxy.split("{url}")[0] : useProxy;
    const proxyBase = new URL(proxyBaseRaw || ".", baseHref);
    const u = new URL(url, baseHref);
    if (u.origin === proxyBase.origin) return true;
    const sp = u.searchParams;
    if (sp && (sp.has("url") || sp.has("target"))) return true;
  } catch {
  }
  return false;
}
function shouldProxy(url, useProxy) {
  if (!useProxy) return false;
  if (isSpecialURL(url)) return false;
  if (isAlreadyProxied(url, useProxy)) return false;
  try {
    const base = typeof location !== "undefined" && location.href ? location.href : "http://localhost/";
    const u = new URL(url, base);
    return typeof location !== "undefined" ? u.origin !== location.origin : true;
  } catch {
    return !!useProxy;
  }
}
function applyProxy(url, useProxy) {
  if (!useProxy) return url;
  if (useProxy.includes("{url}")) {
    return useProxy.replace("{urlRaw}", safeEncodeURI(url)).replace("{url}", encodeURIComponent(url));
  }
  if (/[?&]url=?$/.test(useProxy)) {
    return `${useProxy}${encodeURIComponent(url)}`;
  }
  if (useProxy.endsWith("?")) {
    return `${useProxy}url=${encodeURIComponent(url)}`;
  }
  if (useProxy.endsWith("/")) {
    return `${useProxy}${safeEncodeURI(url)}`;
  }
  const sep = useProxy.includes("?") ? "&" : "?";
  return `${useProxy}${sep}url=${encodeURIComponent(url)}`;
}
function blobToDataURL(blob) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(String(fr.result || ""));
    fr.onerror = () => rej(new Error("read_failed"));
    fr.readAsDataURL(blob);
  });
}
function makeKey(url, o) {
  return [
    o.as || "blob",
    o.timeout ?? 3e3,
    o.useProxy || "",
    o.errorTTL ?? 8e3,
    url
  ].join("|");
}
async function snapFetch(url, options = {}) {
  const as = options.as ?? "blob";
  const timeout = options.timeout ?? 3e3;
  const useProxy = options.useProxy || "";
  const errorTTL = options.errorTTL ?? 8e3;
  const headers = options.headers || {};
  const silent = !!options.silent;
  if (/^data:/i.test(url)) {
    try {
      if (as === "text") {
        return { ok: true, data: String(url), status: 200, url, fromCache: false };
      }
      if (as === "dataURL") {
        return {
          ok: true,
          data: String(url),
          status: 200,
          url,
          fromCache: false,
          mime: String(url).slice(5).split(";")[0] || ""
        };
      }
      const [, meta = "", data = ""] = String(url).match(/^data:([^,]*),(.*)$/) || [];
      const isBase64 = /;base64/i.test(meta);
      const bin = isBase64 ? atob(data) : decodeURIComponent(data);
      const bytes = new Uint8Array([...bin].map((c) => c.charCodeAt(0)));
      const b = new Blob([bytes], { type: (meta || "").split(";")[0] || "" });
      return { ok: true, data: b, status: 200, url, fromCache: false, mime: b.type || "" };
    } catch {
      return { ok: false, data: null, status: 0, url, fromCache: false, reason: "special_url_error" };
    }
  }
  if (/^blob:/i.test(url)) {
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        return { ok: false, data: null, status: resp.status, url, fromCache: false, reason: "http_error" };
      }
      const blob = await resp.blob();
      const mime = blob.type || resp.headers.get("content-type") || "";
      if (as === "dataURL") {
        const dataURL = await blobToDataURL(blob);
        return { ok: true, data: dataURL, status: resp.status, url, fromCache: false, mime };
      }
      if (as === "text") {
        const text = await blob.text();
        return { ok: true, data: text, status: resp.status, url, fromCache: false, mime };
      }
      return { ok: true, data: blob, status: resp.status, url, fromCache: false, mime };
    } catch {
      return { ok: false, data: null, status: 0, url, fromCache: false, reason: "network" };
    }
  }
  if (/^about:blank$/i.test(url)) {
    if (as === "dataURL") {
      return {
        ok: true,
        data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
        status: 200,
        url,
        fromCache: false,
        mime: "image/png"
      };
    }
    return { ok: true, data: as === "text" ? "" : new Blob([]), status: 200, url, fromCache: false };
  }
  const key = makeKey(url, { as, timeout, useProxy, errorTTL });
  const e = _errorCache.get(key);
  if (e && e.until > Date.now()) {
    return { ...e.result, fromCache: true };
  } else if (e) {
    _errorCache.delete(key);
  }
  const inflight = _inflight.get(key);
  if (inflight) return inflight;
  const finalURL = shouldProxy(url, useProxy) ? applyProxy(url, useProxy) : url;
  let cred = options.credentials;
  if (!cred) {
    try {
      const base = typeof location !== "undefined" && location.href ? location.href : "http://localhost/";
      const u = new URL(url, base);
      const sameOrigin = typeof location !== "undefined" && u.origin === location.origin;
      cred = sameOrigin ? "include" : "omit";
    } catch {
      cred = "omit";
    }
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort("timeout"), timeout);
  const p = (async () => {
    try {
      const resp = await fetch(finalURL, { signal: ctrl.signal, credentials: cred, headers });
      if (!resp.ok) {
        const result = { ok: false, data: null, status: resp.status, url: finalURL, fromCache: false, reason: "http_error" };
        if (errorTTL > 0) _errorCache.set(key, { until: Date.now() + errorTTL, result });
        if (!silent) {
          const short = `${resp.status} ${resp.statusText || ""}`.trim();
          snapLogger.warnOnce(
            `http:${resp.status}:${as}:${new URL(url, location?.href ?? "http://localhost/").origin}`,
            `HTTP error ${short} while fetching ${as} ${url}`
          );
        }
        options.onError && options.onError(result);
        return result;
      }
      if (as === "text") {
        const text = await resp.text();
        return { ok: true, data: text, status: resp.status, url: finalURL, fromCache: false };
      }
      const blob = await resp.blob();
      const mime = blob.type || resp.headers.get("content-type") || "";
      if (as === "dataURL") {
        const dataURL = await blobToDataURL(blob);
        return { ok: true, data: dataURL, status: resp.status, url: finalURL, fromCache: false, mime };
      }
      return { ok: true, data: blob, status: resp.status, url: finalURL, fromCache: false, mime };
    } catch (err) {
      const reason = err && typeof err === "object" && "name" in err && err.name === "AbortError" ? String(err.message || "").includes("timeout") ? "timeout" : "abort" : "network";
      const result = { ok: false, data: null, status: 0, url: finalURL, fromCache: false, reason };
      if (!/^blob:/i.test(url) && errorTTL > 0) {
        _errorCache.set(key, { until: Date.now() + errorTTL, result });
      }
      if (!silent) {
        const k = `${reason}:${as}:${new URL(url, location?.href ?? "http://localhost/").origin}`;
        const tips = reason === "timeout" ? `Timeout after ${timeout}ms. Consider increasing timeout or using a proxy for ${url}` : reason === "abort" ? `Request aborted while fetching ${as} ${url}` : `Network/CORS issue while fetching ${as} ${url}. A proxy may be required`;
        snapLogger.errorOnce(k, tips);
      }
      options.onError && options.onError(result);
      return result;
    } finally {
      clearTimeout(timer);
      _inflight.delete(key);
    }
  })();
  _inflight.set(key, p);
  return p;
}
var snapLogger, _inflight, _errorCache;
var init_snapFetch = __esm({
  "src/modules/snapFetch.js"() {
    init_helpers();
    snapLogger = createSnapLogger("[snapDOM]", { ttlMs: 3 * 6e4, maxEntries: 10 });
    _inflight = /* @__PURE__ */ new Map();
    _errorCache = /* @__PURE__ */ new Map();
  }
});

// src/utils/image.js
async function inlineSingleBackgroundEntry(entry, options = {}) {
  const isGradient = /^((repeating-)?(linear|radial|conic)-gradient)\(/i.test(entry);
  if (isGradient || entry.trim() === "none") {
    return entry;
  }
  const rawUrl = extractURL(entry);
  if (!rawUrl) {
    return entry;
  }
  const encodedUrl = safeEncodeURI(rawUrl);
  if (cache.background.has(encodedUrl)) {
    const dataUrl = cache.background.get(encodedUrl);
    return dataUrl ? `url("${dataUrl}")` : "none";
  }
  try {
    const dataUrl = await snapFetch(encodedUrl, { as: "dataURL", useProxy: options.useProxy });
    if (dataUrl.ok) {
      cache.background.set(encodedUrl, dataUrl.data);
      return `url("${dataUrl.data}")`;
    }
    cache.background.set(encodedUrl, null);
    return "none";
  } catch {
    cache.background.set(encodedUrl, null);
    return "none";
  }
}
var init_image = __esm({
  "src/utils/image.js"() {
    init_cache();
    init_helpers();
    init_snapFetch();
  }
});

// src/utils/css.js
function precacheCommonTags() {
  for (let tag of commonTags) {
    const t = String(tag).toLowerCase();
    if (NO_CAPTURE_TAGS.has(t)) continue;
    if (NO_DEFAULTS_TAGS.has(t)) continue;
    getDefaultStyleForTag(t);
  }
}
function getDefaultStyleForTag(tagName) {
  tagName = String(tagName).toLowerCase();
  if (NO_DEFAULTS_TAGS.has(tagName)) {
    const empty = {};
    cache.defaultStyle.set(tagName, empty);
    return empty;
  }
  if (cache.defaultStyle.has(tagName)) {
    return cache.defaultStyle.get(tagName);
  }
  let sandbox = document.getElementById("snapdom-sandbox");
  if (!sandbox) {
    sandbox = document.createElement("div");
    sandbox.id = "snapdom-sandbox";
    sandbox.setAttribute("data-snapdom-sandbox", "true");
    sandbox.setAttribute("aria-hidden", "true");
    sandbox.style.position = "absolute";
    sandbox.style.left = "-9999px";
    sandbox.style.top = "-9999px";
    sandbox.style.width = "0px";
    sandbox.style.height = "0px";
    sandbox.style.overflow = "hidden";
    document.body.appendChild(sandbox);
  }
  const el = document.createElement(tagName);
  el.style.all = "initial";
  sandbox.appendChild(el);
  const styles = getComputedStyle(el);
  const defaults = {};
  for (let prop of styles) {
    if (shouldIgnoreProp(prop)) continue;
    const value = styles.getPropertyValue(prop);
    defaults[prop] = value;
  }
  sandbox.removeChild(el);
  cache.defaultStyle.set(tagName, defaults);
  return defaults;
}
function shouldIgnoreProp(prop) {
  const p = String(prop).toLowerCase();
  if (NO_PAINT_EXACT.has(p)) return true;
  if (NO_PAINT_PREFIX.test(p)) return true;
  if (NO_PAINT_TOKEN.test(p)) return true;
  return false;
}
function getStyleKey(snapshot, tagName) {
  tagName = String(tagName || "").toLowerCase();
  if (NO_DEFAULTS_TAGS.has(tagName)) {
    return "";
  }
  const entries = [];
  const defaults = getDefaultStyleForTag(tagName);
  for (let [prop, value] of Object.entries(snapshot)) {
    if (shouldIgnoreProp(prop)) continue;
    const def = defaults[prop];
    if (value && value !== def) entries.push(`${prop}:${value}`);
  }
  entries.sort();
  return entries.join(";");
}
function collectUsedTagNames(root) {
  const tagSet = /* @__PURE__ */ new Set();
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
    return [];
  }
  if (root.tagName) {
    tagSet.add(root.tagName.toLowerCase());
  }
  if (typeof root.querySelectorAll === "function") {
    root.querySelectorAll("*").forEach((el) => tagSet.add(el.tagName.toLowerCase()));
  }
  return Array.from(tagSet);
}
function generateDedupedBaseCSS(usedTagNames) {
  const groups = /* @__PURE__ */ new Map();
  for (let tagName of usedTagNames) {
    const styles = cache.defaultStyle.get(tagName);
    if (!styles) continue;
    const key = Object.entries(styles).map(([k, v]) => `${k}:${v};`).sort().join("");
    if (!key) continue;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(tagName);
  }
  let css = "";
  for (let [styleBlock, tagList] of groups.entries()) {
    css += `${tagList.join(",")} { ${styleBlock} }
`;
  }
  return css;
}
function generateCSSClasses(styleMap) {
  const keys = Array.from(new Set(styleMap.values())).filter(Boolean).sort();
  const classMap = /* @__PURE__ */ new Map();
  let i = 1;
  for (const k of keys) classMap.set(k, `c${i++}`);
  return classMap;
}
function getStyle(el, pseudo = null) {
  if (!(el instanceof Element)) {
    return window.getComputedStyle(el, pseudo);
  }
  let map = cache.computedStyle.get(el);
  if (!map) {
    map = /* @__PURE__ */ new Map();
    cache.computedStyle.set(el, map);
  }
  if (!map.has(pseudo)) {
    const st = window.getComputedStyle(el, pseudo);
    map.set(pseudo, st);
  }
  return map.get(pseudo);
}
function snapshotComputedStyle(style) {
  const snap = {};
  for (let prop of style) {
    snap[prop] = style.getPropertyValue(prop);
  }
  return snap;
}
function splitBackgroundImage(bg) {
  const parts = [];
  let depth = 0;
  let lastIndex = 0;
  for (let i = 0; i < bg.length; i++) {
    const char = bg[i];
    if (char === "(") depth++;
    if (char === ")") depth--;
    if (char === "," && depth === 0) {
      parts.push(bg.slice(lastIndex, i).trim());
      lastIndex = i + 1;
    }
  }
  parts.push(bg.slice(lastIndex).trim());
  return parts;
}
var NO_CAPTURE_TAGS, NO_DEFAULTS_TAGS, commonTags, NO_PAINT_TOKEN, NO_PAINT_PREFIX, NO_PAINT_EXACT;
var init_css = __esm({
  "src/utils/css.js"() {
    init_cache();
    NO_CAPTURE_TAGS = /* @__PURE__ */ new Set([
      "meta",
      "script",
      "noscript",
      "title",
      "link",
      "template"
    ]);
    NO_DEFAULTS_TAGS = /* @__PURE__ */ new Set([
      // non-painting / head stuff
      "meta",
      "link",
      "style",
      "title",
      "noscript",
      "script",
      "template",
      // SVG whole namespace (safe for LeaderLine/presentation attrs)
      "g",
      "defs",
      "use",
      "marker",
      "mask",
      "clipPath",
      "pattern",
      "path",
      "polygon",
      "polyline",
      "line",
      "circle",
      "ellipse",
      "rect",
      "filter",
      "lineargradient",
      "radialgradient",
      "stop"
    ]);
    commonTags = [
      "div",
      "span",
      "p",
      "a",
      "img",
      "ul",
      "li",
      "button",
      "input",
      "select",
      "textarea",
      "label",
      "section",
      "article",
      "header",
      "footer",
      "nav",
      "main",
      "aside",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th"
    ];
    NO_PAINT_TOKEN = /(?:^|-)(animation|transition)(?:-|$)/i;
    NO_PAINT_PREFIX = /^(--|view-timeline|scroll-timeline|animation-trigger|offset-|position-try|app-region|interactivity|overlay|view-transition|-webkit-locale|-webkit-user-(?:drag|modify)|-webkit-tap-highlight-color|-webkit-text-security)$/i;
    NO_PAINT_EXACT = /* @__PURE__ */ new Set([
      // Interaction hints
      "cursor",
      "pointer-events",
      "touch-action",
      "user-select",
      // Printing/speech/reading-mode hints
      "print-color-adjust",
      "speak",
      "reading-flow",
      "reading-order",
      // Anchoring/container/timeline scopes (metadata for layout queries)
      "anchor-name",
      "anchor-scope",
      "container-name",
      "container-type",
      "timeline-scope"
    ]);
  }
});

// src/utils/browser.js
function idle(fn, { fast = false } = {}) {
  if (fast) return fn();
  if ("requestIdleCallback" in window) {
    requestIdleCallback(fn, { timeout: 50 });
  } else {
    setTimeout(fn, 1);
  }
}
function isSafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const uaLower = ua.toLowerCase();
  const isSafariUA = uaLower.includes("safari") && !uaLower.includes("chrome") && !uaLower.includes("crios") && // Chrome on iOS
  !uaLower.includes("fxios") && // Firefox on iOS
  !uaLower.includes("android");
  const isWebKit = /applewebkit/i.test(ua);
  const isMobile = /mobile/i.test(ua);
  const missingSafariToken = !/safari/i.test(ua);
  const isUIWebView = isWebKit && isMobile && missingSafariToken;
  const isWeChatUA = /(micromessenger|wxwork|wecom|windowswechat|macwechat)/i.test(ua);
  const isBaiduUA = /(baiduboxapp|baidubrowser|baidusearch|baiduboxlite)/i.test(uaLower);
  const isIOSWebKit = /ipad|iphone|ipod/.test(uaLower) && isWebKit;
  return isSafariUA || isUIWebView || isWeChatUA || isBaiduUA || isIOSWebKit;
}
var init_browser = __esm({
  "src/utils/browser.js"() {
  }
});

// src/utils/index.js
var init_utils = __esm({
  "src/utils/index.js"() {
    init_image();
    init_css();
    init_browser();
    init_helpers();
  }
});

// src/exporters/toCanvas.js
var toCanvas_exports = {};
__export(toCanvas_exports, {
  toCanvas: () => toCanvas
});
function isSvgDataURL(u) {
  return typeof u === "string" && /^data:image\/svg\+xml/i.test(u);
}
function decodeSvgFromDataURL(u) {
  const i = u.indexOf(",");
  return i >= 0 ? decodeURIComponent(u.slice(i + 1)) : "";
}
function encodeSvgToDataURL(svgText) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
}
function splitDecls(s) {
  let parts = [], buf = "", depth = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(") depth++;
    if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === ";" && depth === 0) {
      parts.push(buf);
      buf = "";
    } else buf += ch;
  }
  if (buf.trim()) parts.push(buf);
  return parts.map((x) => x.trim()).filter(Boolean);
}
function boxShadowToDropShadow(value) {
  const layers = [];
  let buf = "", depth = 0;
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    if (ch === "(") depth++;
    if (ch === ")") depth = Math.max(0, depth - 1);
    if (ch === "," && depth === 0) {
      layers.push(buf.trim());
      buf = "";
    } else buf += ch;
  }
  if (buf.trim()) layers.push(buf.trim());
  const fns = [];
  for (const layer of layers) {
    if (/\binset\b/i.test(layer)) continue;
    const nums = layer.match(/-?\d+(?:\.\d+)?px/gi) || [];
    const [ox = "0px", oy = "0px", blur = "0px"] = nums;
    let color = layer.replace(/-?\d+(?:\.\d+)?px/gi, "").replace(/\binset\b/ig, "").trim().replace(/\s{2,}/g, " ");
    const hasColor = !!color && color !== ",";
    fns.push(`drop-shadow(${ox} ${oy} ${blur}${hasColor ? ` ${color}` : ""})`);
  }
  return fns.join(" ");
}
function rewriteDeclList(list) {
  const decls = splitDecls(list);
  let filter = null, wfilter = null, box = null;
  const rest = [];
  for (const d of decls) {
    const idx = d.indexOf(":");
    if (idx < 0) continue;
    const prop = d.slice(0, idx).trim().toLowerCase();
    const val = d.slice(idx + 1).trim();
    if (prop === "box-shadow") box = val;
    else if (prop === "filter") filter = val;
    else if (prop === "-webkit-filter") wfilter = val;
    else rest.push([prop, val]);
  }
  if (box) {
    const ds = boxShadowToDropShadow(box);
    if (ds) {
      filter = filter ? `${filter} ${ds}` : ds;
      wfilter = wfilter ? `${wfilter} ${ds}` : ds;
    }
  }
  const out = [...rest];
  if (filter) out.push(["filter", filter]);
  if (wfilter) out.push(["-webkit-filter", wfilter]);
  return out.map(([k, v]) => `${k}:${v}`).join(";");
}
function rewriteCssBlock(css) {
  return css.replace(/([^{}]+)\{([^}]*)\}/g, (_m, sel, body) => `${sel}{${rewriteDeclList(body)}}`);
}
function rewriteSvgBoxShadowToDropShadow(svgText) {
  svgText = svgText.replace(
    /<style[^>]*>([\s\S]*?)<\/style>/gi,
    (m, css) => m.replace(css, rewriteCssBlock(css))
  );
  svgText = svgText.replace(
    /style=(['"])([\s\S]*?)\1/gi,
    (m, q, body) => `style=${q}${rewriteDeclList(body)}${q}`
  );
  return svgText;
}
function maybeConvertBoxShadowForSafari(url) {
  if (!isSafari() || !isSvgDataURL(url)) return url;
  try {
    const svg = decodeSvgFromDataURL(url);
    const fixed = rewriteSvgBoxShadowToDropShadow(svg);
    return encodeSvgToDataURL(fixed);
  } catch {
    return url;
  }
}
async function toCanvas(url, options) {
  let { width: optW, height: optH, scale = 1, dpr = 1, meta = {}, backgroundColor } = options;
  url = maybeConvertBoxShadowForSafari(url);
  const img = new Image();
  img.loading = "eager";
  img.decoding = "sync";
  img.crossOrigin = "anonymous";
  img.src = url;
  await img.decode();
  const natW = img.naturalWidth;
  const natH = img.naturalHeight;
  const refW = Number.isFinite(meta.w0) ? meta.w0 : natW;
  const refH = Number.isFinite(meta.h0) ? meta.h0 : natH;
  let outW, outH;
  const hasW = Number.isFinite(optW);
  const hasH = Number.isFinite(optH);
  if (hasW && hasH) {
    outW = Math.max(1, optW);
    outH = Math.max(1, optH);
  } else if (hasW) {
    const k = optW / Math.max(1, refW);
    outW = optW;
    outH = refH * k;
  } else if (hasH) {
    const k = optH / Math.max(1, refH);
    outH = optH;
    outW = refW * k;
  } else {
    outW = natW;
    outH = natH;
  }
  outW = outW * scale;
  outH = outH * scale;
  const canvas = document.createElement("canvas");
  canvas.width = outW * dpr;
  canvas.height = outH * dpr;
  canvas.style.width = `${outW}px`;
  canvas.style.height = `${outH}px`;
  const ctx = canvas.getContext("2d");
  if (dpr !== 1) ctx.scale(dpr, dpr);
  if (backgroundColor) {
    ctx.save();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, outW, outH);
    ctx.restore();
  }
  ctx.drawImage(img, 0, 0, outW, outH);
  return canvas;
}
var init_toCanvas = __esm({
  "src/exporters/toCanvas.js"() {
    init_browser();
  }
});

// src/modules/rasterize.js
var rasterize_exports = {};
__export(rasterize_exports, {
  rasterize: () => rasterize
});
async function rasterize(url, options) {
  const canvas = await toCanvas(url, options);
  const img = new Image();
  img.src = canvas.toDataURL(`image/${options.format}`, options.quality);
  await img.decode();
  img.style.width = `${canvas.width / options.dpr}px`;
  img.style.height = `${canvas.height / options.dpr}px`;
  return img;
}
var init_rasterize = __esm({
  "src/modules/rasterize.js"() {
    init_toCanvas();
  }
});

// src/exporters/toImg.js
var toImg_exports = {};
__export(toImg_exports, {
  toImg: () => toImg,
  toSvg: () => toImg
});
async function toImg(url, options) {
  const { scale = 1, width, height, meta = {} } = options;
  const hasW = Number.isFinite(width);
  const hasH = Number.isFinite(height);
  const wantsScale = Number.isFinite(scale) && scale !== 1 || hasW || hasH;
  if (isSafari() && wantsScale) {
    const pngUrl = await rasterize(url, { ...options, format: "png", quality: 1, meta });
    return pngUrl;
  }
  const img = new Image();
  img.decoding = "sync";
  img.loading = "eager";
  img.src = url;
  await img.decode();
  if (hasW && hasH) {
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
  } else if (hasW) {
    const refW = Number.isFinite(meta.w0) ? meta.w0 : img.naturalWidth;
    const refH = Number.isFinite(meta.h0) ? meta.h0 : img.naturalHeight;
    const k = width / Math.max(1, refW);
    img.style.width = `${width}px`;
    img.style.height = `${Math.round(refH * k)}px`;
  } else if (hasH) {
    const refW = Number.isFinite(meta.w0) ? meta.w0 : img.naturalWidth;
    const refH = Number.isFinite(meta.h0) ? meta.h0 : img.naturalHeight;
    const k = height / Math.max(1, refH);
    img.style.height = `${height}px`;
    img.style.width = `${Math.round(refW * k)}px`;
  } else {
    const cssW = Math.round(img.naturalWidth * scale);
    const cssH = Math.round(img.naturalHeight * scale);
    img.style.width = `${cssW}px`;
    img.style.height = `${cssH}px`;
    if (typeof url === "string" && url.startsWith("data:image/svg+xml")) {
      try {
        const decoded = decodeURIComponent(url.split(",")[1]);
        const patched = decoded.replace(/width="[^"]*"/, `width="${cssW}"`).replace(/height="[^"]*"/, `height="${cssH}"`);
        url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(patched)}`;
        img.src = url;
      } catch {
      }
    }
  }
  return img;
}
var init_toImg = __esm({
  "src/exporters/toImg.js"() {
    init_utils();
    init_rasterize();
  }
});

// src/exporters/toBlob.js
var toBlob_exports = {};
__export(toBlob_exports, {
  toBlob: () => toBlob
});
async function toBlob(url, options) {
  const type = options.type;
  if (type === "svg") {
    const svgText = decodeURIComponent(url.split(",")[1]);
    return new Blob([svgText], { type: "image/svg+xml" });
  }
  const canvas = await toCanvas(url, options);
  return new Promise(
    (resolve) => canvas.toBlob((blob) => resolve(blob), `image/${type}`, options.quality)
  );
}
var init_toBlob = __esm({
  "src/exporters/toBlob.js"() {
    init_toCanvas();
  }
});

// src/exporters/download.js
var download_exports = {};
__export(download_exports, {
  download: () => download
});
async function download(url, options) {
  options.dpr = 1;
  if (options.format === "svg") {
    const blob = await toBlob(url, { ...options, type: "svg" });
    const objectURL = URL.createObjectURL(blob);
    const a2 = document.createElement("a");
    a2.href = objectURL;
    a2.download = options.filename;
    a2.click();
    URL.revokeObjectURL(objectURL);
    return;
  }
  const canvas = await toCanvas(url, options);
  const a = document.createElement("a");
  a.href = canvas.toDataURL(`image/${options.format}`, options.quality);
  a.download = options.filename;
  a.click();
}
var init_download = __esm({
  "src/exporters/download.js"() {
    init_toBlob();
    init_toCanvas();
  }
});

// src/core/prepare.js
init_utils();

// src/modules/styles.js
init_utils();
init_cache();
var snapshotCache = /* @__PURE__ */ new WeakMap();
var snapshotKeyCache = /* @__PURE__ */ new Map();
var __epoch = 0;
function bumpEpoch() {
  __epoch++;
}
var __wired = false;
function setupInvalidationOnce(root = document.documentElement) {
  if (__wired) return;
  __wired = true;
  try {
    const domObs = new MutationObserver(() => bumpEpoch());
    domObs.observe(root, { subtree: true, childList: true, characterData: true, attributes: true });
  } catch {
  }
  try {
    const headObs = new MutationObserver(() => bumpEpoch());
    headObs.observe(document.head, { subtree: true, childList: true, characterData: true, attributes: true });
  } catch {
  }
  try {
    const f = document.fonts;
    if (f) {
      f.addEventListener?.("loadingdone", bumpEpoch);
      f.ready?.then(() => bumpEpoch()).catch(() => {
      });
    }
  } catch {
  }
}
function snapshotComputedStyleFull(style, options = {}) {
  const out = {};
  const vis = style.getPropertyValue("visibility");
  for (let i = 0; i < style.length; i++) {
    const prop = style[i];
    let val = style.getPropertyValue(prop);
    if ((prop === "background-image" || prop === "content") && val.includes("url(") && !val.includes("data:")) {
      val = "none";
    }
    out[prop] = val;
  }
  const EXTRA_TEXT_DECORATION_PROPS = [
    "text-decoration-line",
    "text-decoration-color",
    "text-decoration-style",
    "text-decoration-thickness",
    "text-underline-offset",
    "text-decoration-skip-ink"
  ];
  for (const prop of EXTRA_TEXT_DECORATION_PROPS) {
    if (out[prop]) continue;
    try {
      const v = style.getPropertyValue(prop);
      if (v) out[prop] = v;
    } catch {
    }
  }
  if (options.embedFonts) {
    const EXTRA_FONT_PROPS = [
      "font-feature-settings",
      "font-variation-settings",
      "font-kerning",
      "font-variant",
      "font-variant-ligatures",
      "font-optical-sizing"
    ];
    for (const prop of EXTRA_FONT_PROPS) {
      if (out[prop]) continue;
      try {
        const v = style.getPropertyValue(prop);
        if (v) out[prop] = v;
      } catch {
      }
    }
  }
  if (vis === "hidden") out.opacity = "0";
  return out;
}
var __snapshotSig = /* @__PURE__ */ new WeakMap();
function styleSignature(snap) {
  let sig = __snapshotSig.get(snap);
  if (sig) return sig;
  const entries = Object.entries(snap).sort((a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0);
  sig = entries.map(([k, v]) => `${k}:${v}`).join(";");
  __snapshotSig.set(snap, sig);
  return sig;
}
function getSnapshot(el, preStyle = null, options = {}) {
  const rec = snapshotCache.get(el);
  if (rec && rec.epoch === __epoch) return rec.snapshot;
  const style = preStyle || getComputedStyle(el);
  const snap = snapshotComputedStyleFull(style, options);
  stripHeightForWrappers(el, style, snap);
  snapshotCache.set(el, { epoch: __epoch, snapshot: snap });
  return snap;
}
function _resolveCtx(sessionOrCtx, opts) {
  if (sessionOrCtx && sessionOrCtx.session && sessionOrCtx.persist) return sessionOrCtx;
  if (sessionOrCtx && (sessionOrCtx.styleMap || sessionOrCtx.styleCache || sessionOrCtx.nodeMap)) {
    return {
      session: sessionOrCtx,
      persist: {
        snapshotKeyCache,
        defaultStyle: cache.defaultStyle,
        baseStyle: cache.baseStyle,
        image: cache.image,
        resource: cache.resource,
        background: cache.background,
        font: cache.font
      },
      options: opts || {}
    };
  }
  return {
    session: cache.session,
    persist: {
      snapshotKeyCache,
      defaultStyle: cache.defaultStyle,
      baseStyle: cache.baseStyle,
      image: cache.image,
      resource: cache.resource,
      background: cache.background,
      font: cache.font
    },
    options: sessionOrCtx || opts || {}
  };
}
async function inlineAllStyles(source, clone, sessionOrCtx, opts) {
  if (source.tagName === "STYLE") return;
  const ctx = _resolveCtx(sessionOrCtx, opts);
  const resetMode = ctx.options && ctx.options.cache || "auto";
  if (resetMode !== "disabled") setupInvalidationOnce(document.documentElement);
  if (resetMode === "disabled" && !ctx.session.__bumpedForDisabled) {
    bumpEpoch();
    snapshotKeyCache.clear();
    ctx.session.__bumpedForDisabled = true;
  }
  if (NO_DEFAULTS_TAGS.has(source.tagName?.toLowerCase())) {
    const author = source.getAttribute?.("style");
    if (author) clone.setAttribute("style", author);
  }
  const { session, persist } = ctx;
  if (!session.styleCache.has(source)) {
    session.styleCache.set(source, getComputedStyle(source));
  }
  const pre = session.styleCache.get(source);
  const snap = getSnapshot(source, pre, ctx.options);
  const sig = styleSignature(snap);
  let key = persist.snapshotKeyCache.get(sig);
  if (!key) {
    const tag = source.tagName?.toLowerCase() || "div";
    key = getStyleKey(snap, tag);
    persist.snapshotKeyCache.set(sig, key);
  }
  session.styleMap.set(clone, key);
}
function isReplaced(el) {
  return el instanceof HTMLImageElement || el instanceof HTMLCanvasElement || el instanceof HTMLVideoElement || el instanceof HTMLIFrameElement || el instanceof SVGElement || el instanceof HTMLObjectElement || el instanceof HTMLEmbedElement;
}
function hasBox(cs) {
  if (cs.backgroundImage && cs.backgroundImage !== "none") return true;
  if (cs.backgroundColor && cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent") return true;
  if ((parseFloat(cs.borderTopWidth) || 0) > 0) return true;
  if ((parseFloat(cs.borderBottomWidth) || 0) > 0) return true;
  if ((parseFloat(cs.paddingTop) || 0) > 0) return true;
  if ((parseFloat(cs.paddingBottom) || 0) > 0) return true;
  const ob = cs.overflowBlock || cs.overflowY || "visible";
  return ob !== "visible";
}
function isFlexOrGridItem(el) {
  const p = el.parentElement;
  if (!p) return false;
  const pd = getComputedStyle(p).display || "";
  return pd.includes("flex") || pd.includes("grid");
}
function hasFlowFast(el, cs) {
  if (el.textContent && /\S/.test(el.textContent)) return true;
  const f = el.firstElementChild, l = el.lastElementChild;
  if (f && f.tagName === "BR" || l && l.tagName === "BR") return true;
  const sh = el.scrollHeight;
  if (sh === 0) return false;
  const pt = parseFloat(cs.paddingTop) || 0;
  const pb = parseFloat(cs.paddingBottom) || 0;
  return sh > pt + pb;
}
function stripHeightForWrappers(el, cs, snap) {
  if (el instanceof HTMLElement && el.style && el.style.height) return;
  const tag = el.tagName && el.tagName.toLowerCase();
  if (!tag || tag !== "div" && tag !== "section" && tag !== "article" && tag !== "main" && tag !== "aside" && tag !== "header" && tag !== "footer" && tag !== "nav") {
    return;
  }
  const disp = cs.display || "";
  if (disp.includes("flex") || disp.includes("grid")) return;
  if (isReplaced(el)) return;
  const pos = cs.position;
  if (pos === "absolute" || pos === "fixed" || pos === "sticky") return;
  if (cs.transform !== "none") return;
  if (hasBox(cs)) return;
  if (isFlexOrGridItem(el)) return;
  const overflowX = cs.overflowX || cs.overflow || "visible";
  const overflowY = cs.overflowY || cs.overflow || "visible";
  if (overflowX !== "visible" || overflowY !== "visible") return;
  const clip = cs.clip;
  if (clip && clip !== "auto" && clip !== "rect(auto, auto, auto, auto)") return;
  if (cs.visibility === "hidden" || cs.opacity === "0") return;
  if (!hasFlowFast(el, cs)) return;
  delete snap.height;
  delete snap["block-size"];
}

// src/core/clone.js
init_css();

// src/modules/CSSVar.js
var KEY_PROPS = ["fill", "stroke", "color", "background-color", "stop-color"];
var __BASELINE_CACHE = /* @__PURE__ */ new Map();
function getBaselineComputed(tagName, ns) {
  const key = ns + "::" + tagName.toLowerCase();
  let entry = __BASELINE_CACHE.get(key);
  if (entry) return entry;
  const doc = document;
  const el = ns === "http://www.w3.org/2000/svg" ? doc.createElementNS(ns, tagName) : doc.createElement(tagName);
  const holder = doc.createElement("div");
  holder.style.cssText = "position:absolute;left:-99999px;top:-99999px;contain:strict;display:block;";
  holder.appendChild(el);
  doc.documentElement.appendChild(holder);
  const cs = getComputedStyle(el);
  const base = {};
  for (const p of KEY_PROPS) {
    base[p] = cs.getPropertyValue(p) || "";
  }
  holder.remove();
  __BASELINE_CACHE.set(key, base);
  return base;
}
function resolveCSSVars(sourceEl, cloneEl) {
  if (!(sourceEl instanceof Element) || !(cloneEl instanceof Element)) return;
  const styleAttr = sourceEl.getAttribute?.("style");
  let hasVar = !!(styleAttr && styleAttr.includes("var("));
  if (!hasVar && sourceEl.attributes?.length) {
    const attrs = sourceEl.attributes;
    for (let i = 0; i < attrs.length; i++) {
      const a = attrs[i];
      if (a && typeof a.value === "string" && a.value.includes("var(")) {
        hasVar = true;
        break;
      }
    }
  }
  let cs = null;
  if (hasVar) {
    try {
      cs = getComputedStyle(sourceEl);
    } catch {
    }
  }
  if (hasVar) {
    const author = sourceEl.style;
    if (author && author.length) {
      for (let i = 0; i < author.length; i++) {
        const prop = author[i];
        const val = author.getPropertyValue(prop);
        if (!val || !val.includes("var(")) continue;
        const resolved = cs && cs.getPropertyValue(prop);
        if (resolved) {
          try {
            cloneEl.style.setProperty(prop, resolved.trim(), author.getPropertyPriority(prop));
          } catch {
          }
        }
      }
    }
  }
  if (hasVar && sourceEl.attributes?.length) {
    const attrs = sourceEl.attributes;
    for (let i = 0; i < attrs.length; i++) {
      const a = attrs[i];
      if (!a || typeof a.value !== "string" || !a.value.includes("var(")) continue;
      const propName = a.name;
      const resolved = cs && cs.getPropertyValue(propName);
      if (resolved) {
        try {
          cloneEl.style.setProperty(propName, resolved.trim());
        } catch {
        }
      }
    }
  }
  if (!hasVar) {
    if (!cs) {
      try {
        cs = getComputedStyle(sourceEl);
      } catch {
        cs = null;
      }
    }
    if (!cs) return;
    const ns = sourceEl.namespaceURI || "html";
    const base = getBaselineComputed(sourceEl.tagName, ns);
    for (const prop of KEY_PROPS) {
      const v = cs.getPropertyValue(prop) || "";
      const b = base[prop] || "";
      if (v && v !== b) {
        try {
          cloneEl.style.setProperty(prop, v.trim());
        } catch {
        }
      }
    }
  }
}

// src/utils/clone.helpers.js
init_utils();
init_cache();
init_snapFetch();
function idleCallback(childList, callback, fast) {
  return Promise.all(childList.map((child) => {
    return new Promise((resolve) => {
      function deal() {
        idle((deadline) => {
          const hasIdleBudget = deadline && typeof deadline.timeRemaining === "function" ? deadline.timeRemaining() > 0 : true;
          if (hasIdleBudget) {
            callback(child, resolve);
          } else {
            deal();
          }
        }, { fast });
      }
      deal();
    });
  }));
}
function addNotSlottedRightmost(sel) {
  sel = sel.trim();
  if (!sel) return sel;
  if (/:not\(\s*\[data-sd-slotted\]\s*\)\s*$/.test(sel)) return sel;
  return `${sel}:not([data-sd-slotted])`;
}
function wrapWithScope(selectorList, scopeSelector, excludeSlotted = true) {
  return selectorList.split(",").map((s) => s.trim()).filter(Boolean).map((s) => {
    if (s.startsWith(":where(")) return s;
    if (s.startsWith("@")) return s;
    const body = excludeSlotted ? addNotSlottedRightmost(s) : s;
    return `:where(${scopeSelector} ${body})`;
  }).join(", ");
}
function rewriteShadowCSS(cssText, scopeSelector) {
  if (!cssText) return "";
  cssText = cssText.replace(/:host\(([^)]+)\)/g, (_, sel) => {
    return `:where(${scopeSelector}:is(${sel.trim()}))`;
  });
  cssText = cssText.replace(/:host\b/g, `:where(${scopeSelector})`);
  cssText = cssText.replace(/:host-context\(([^)]+)\)/g, (_, sel) => {
    return `:where(:where(${sel.trim()}) ${scopeSelector})`;
  });
  cssText = cssText.replace(/::slotted\(([^)]+)\)/g, (_, sel) => {
    return `:where(${scopeSelector} ${sel.trim()})`;
  });
  cssText = cssText.replace(/(^|})(\s*)([^@}{]+){/g, (_, brace, ws, selectorList) => {
    const wrapped = wrapWithScope(
      selectorList,
      scopeSelector,
      /*excludeSlotted*/
      true
    );
    return `${brace}${ws}${wrapped}{`;
  });
  return cssText;
}
function nextShadowScopeId(sessionCache) {
  sessionCache.shadowScopeSeq = (sessionCache.shadowScopeSeq || 0) + 1;
  return `s${sessionCache.shadowScopeSeq}`;
}
function extractShadowCSS(sr) {
  let css = "";
  try {
    sr.querySelectorAll("style").forEach((s) => {
      css += (s.textContent || "") + "\n";
    });
    const sheets = sr.adoptedStyleSheets || [];
    for (const sh of sheets) {
      try {
        if (sh && sh.cssRules) {
          for (const rule of sh.cssRules) css += rule.cssText + "\n";
        }
      } catch {
      }
    }
  } catch {
  }
  return css;
}
function injectScopedStyle(hostClone, cssText, scopeId) {
  if (!cssText) return;
  const style = document.createElement("style");
  style.setAttribute("data-sd", scopeId);
  style.textContent = cssText;
  hostClone.insertBefore(style, hostClone.firstChild || null);
}
function freezeImgSrcset(original, cloned) {
  try {
    const chosen = original.currentSrc || original.src || "";
    if (!chosen) return;
    cloned.setAttribute("src", chosen);
    cloned.removeAttribute("srcset");
    cloned.removeAttribute("sizes");
    cloned.loading = "eager";
    cloned.decoding = "sync";
  } catch {
  }
}
function collectCustomPropsFromCSS(cssText) {
  const out = /* @__PURE__ */ new Set();
  if (!cssText) return out;
  const re = /var\(\s*(--[A-Za-z0-9_-]+)\b/g;
  let m;
  while (m = re.exec(cssText)) out.add(m[1]);
  return out;
}
function resolveCustomProp(el, name) {
  try {
    const cs = getComputedStyle(el);
    let v = cs.getPropertyValue(name).trim();
    if (v) return v;
  } catch {
  }
  try {
    const rootCS = getComputedStyle(document.documentElement);
    let v = rootCS.getPropertyValue(name).trim();
    if (v) return v;
  } catch {
  }
  return "";
}
function buildSeedCustomPropsRule(hostEl, names, scopeSelector) {
  const decls = [];
  for (const name of names) {
    const val = resolveCustomProp(hostEl, name);
    if (val) decls.push(`${name}: ${val};`);
  }
  if (!decls.length) return "";
  return `${scopeSelector}{${decls.join("")}}
`;
}
function markSlottedSubtree(root) {
  if (!root) return;
  if (root.nodeType === Node.ELEMENT_NODE) {
    root.setAttribute("data-sd-slotted", "");
  }
  if (root.querySelectorAll) {
    root.querySelectorAll("*").forEach((el) => el.setAttribute("data-sd-slotted", ""));
  }
}
async function getAccessibleIframeDocument(iframe, attempts = 3) {
  const probe = () => {
    try {
      return iframe.contentDocument || iframe.contentWindow?.document || null;
    } catch {
      return null;
    }
  };
  let doc = probe();
  let i = 0;
  while (i < attempts && (!doc || !doc.body && !doc.documentElement)) {
    await new Promise((r) => setTimeout(r, 0));
    doc = probe();
    i++;
  }
  return doc && (doc.body || doc.documentElement) ? doc : null;
}
function measureContentBox(el) {
  const rect = el.getBoundingClientRect();
  let bl = 0, br = 0, bt = 0, bb = 0;
  try {
    const cs = getComputedStyle(el);
    bl = parseFloat(cs.borderLeftWidth) || 0;
    br = parseFloat(cs.borderRightWidth) || 0;
    bt = parseFloat(cs.borderTopWidth) || 0;
    bb = parseFloat(cs.borderBottomWidth) || 0;
  } catch {
  }
  const contentWidth = Math.max(0, Math.round(rect.width - (bl + br)));
  const contentHeight = Math.max(0, Math.round(rect.height - (bt + bb)));
  return { contentWidth, contentHeight, rect };
}
function pinIframeViewport(doc, w, h) {
  const style = doc.createElement("style");
  style.setAttribute("data-sd-iframe-pin", "");
  style.textContent = `html, body {margin: 0 !important;padding: 0 !important;width: ${w}px !important;height: ${h}px !important;min-width: ${w}px !important;min-height: ${h}px !important;box-sizing: border-box !important;overflow: hidden !important;background-clip: border-box !important;}`;
  (doc.head || doc.documentElement).appendChild(style);
  return () => {
    try {
      style.remove();
    } catch {
    }
  };
}
async function rasterizeIframe(iframe, sessionCache, options) {
  const doc = await getAccessibleIframeDocument(iframe, 3);
  if (!doc) throw new Error("iframe document not accessible/ready");
  const { contentWidth, contentHeight, rect } = measureContentBox(iframe);
  const snap = options?.snap;
  if (!snap || typeof snap.toPng !== "function") {
    throw new Error("snapdom.toPng not available in iframe or window");
  }
  const nested = { ...options, scale: 1 };
  const unpin = pinIframeViewport(doc, contentWidth, contentHeight);
  let imgEl;
  try {
    imgEl = await snap.toPng(doc.documentElement, nested);
  } finally {
    unpin();
  }
  imgEl.style.display = "block";
  imgEl.style.width = `${contentWidth}px`;
  imgEl.style.height = `${contentHeight}px`;
  const wrapper = document.createElement("div");
  sessionCache.nodeMap.set(wrapper, iframe);
  inlineAllStyles(iframe, wrapper, sessionCache, options);
  wrapper.style.overflow = "hidden";
  wrapper.style.display = "block";
  if (!wrapper.style.width) wrapper.style.width = `${Math.round(rect.width)}px`;
  if (!wrapper.style.height) wrapper.style.height = `${Math.round(rect.height)}px`;
  wrapper.appendChild(imgEl);
  return wrapper;
}
var _blobToDataUrlCache = /* @__PURE__ */ new Map();
async function blobUrlToDataUrl(blobUrl) {
  if (cache.resource?.has(blobUrl)) return cache.resource.get(blobUrl);
  if (_blobToDataUrlCache.has(blobUrl)) return _blobToDataUrlCache.get(blobUrl);
  const p = (async () => {
    const r = await snapFetch(blobUrl, { as: "dataURL", silent: true });
    if (!r.ok || typeof r.data !== "string") {
      throw new Error(`[snapDOM] Failed to read blob URL: ${blobUrl}`);
    }
    cache.resource?.set(blobUrl, r.data);
    return r.data;
  })();
  _blobToDataUrlCache.set(blobUrl, p);
  try {
    const data = await p;
    _blobToDataUrlCache.set(blobUrl, data);
    return data;
  } catch (e) {
    _blobToDataUrlCache.delete(blobUrl);
    throw e;
  }
}
var BLOB_URL_RE = /\bblob:[^)"'\s]+/g;
async function replaceBlobUrlsInCssText(cssText) {
  if (!cssText || cssText.indexOf("blob:") === -1) return cssText;
  const uniques = Array.from(new Set(cssText.match(BLOB_URL_RE) || []));
  if (uniques.length === 0) return cssText;
  let out = cssText;
  for (const u of uniques) {
    try {
      const d = await blobUrlToDataUrl(u);
      out = out.split(u).join(d);
    } catch {
    }
  }
  return out;
}
function isBlobUrl(u) {
  return typeof u === "string" && u.startsWith("blob:");
}
function parseSrcset(srcset) {
  return (srcset || "").split(",").map((s) => s.trim()).filter(Boolean).map((item) => {
    const m = item.match(/^(\S+)(\s+.+)?$/);
    return m ? { url: m[1], desc: m[2] || "" } : null;
  }).filter(Boolean);
}
function stringifySrcset(parts) {
  return parts.map((p) => p.desc ? `${p.url} ${p.desc.trim()}` : p.url).join(", ");
}
async function resolveBlobUrlsInTree(root) {
  if (!root) return;
  const imgs = root.querySelectorAll ? root.querySelectorAll("img") : [];
  for (const img of imgs) {
    try {
      const srcAttr = img.getAttribute("src");
      const effective = srcAttr || img.currentSrc || "";
      if (isBlobUrl(effective)) {
        const data = await blobUrlToDataUrl(effective);
        img.setAttribute("src", data);
      }
      const srcset = img.getAttribute("srcset");
      if (srcset && srcset.includes("blob:")) {
        const parts = parseSrcset(srcset);
        let changed = false;
        for (const p of parts) {
          if (isBlobUrl(p.url)) {
            try {
              p.url = await blobUrlToDataUrl(p.url);
              changed = true;
            } catch {
            }
          }
        }
        if (changed) img.setAttribute("srcset", stringifySrcset(parts));
      }
    } catch {
    }
  }
  const svgImages = root.querySelectorAll ? root.querySelectorAll("image") : [];
  for (const node of svgImages) {
    try {
      const XLINK_NS = "http://www.w3.org/1999/xlink";
      const href = node.getAttribute("href") || node.getAttributeNS?.(XLINK_NS, "href");
      if (isBlobUrl(href)) {
        const d = await blobUrlToDataUrl(href);
        node.setAttribute("href", d);
        node.removeAttributeNS?.(XLINK_NS, "href");
      }
    } catch {
    }
  }
  const styled = root.querySelectorAll ? root.querySelectorAll("[style*='blob:']") : [];
  for (const el of styled) {
    try {
      const styleText = el.getAttribute("style");
      if (styleText && styleText.includes("blob:")) {
        const replaced = await replaceBlobUrlsInCssText(styleText);
        el.setAttribute("style", replaced);
      }
    } catch {
    }
  }
  const styleTags = root.querySelectorAll ? root.querySelectorAll("style") : [];
  for (const s of styleTags) {
    try {
      const css = s.textContent || "";
      if (css.includes("blob:")) {
        s.textContent = await replaceBlobUrlsInCssText(css);
      }
    } catch {
    }
  }
  const urlAttrs = ["poster"];
  for (const attr of urlAttrs) {
    const nodes = root.querySelectorAll ? root.querySelectorAll(`[${attr}^='blob:']`) : [];
    for (const n of nodes) {
      try {
        const u = n.getAttribute(attr);
        if (isBlobUrl(u)) {
          n.setAttribute(attr, await blobUrlToDataUrl(u));
        }
      } catch {
      }
    }
  }
}

// src/core/clone.js
async function deepClone(node, sessionCache, options) {
  if (!node) throw new Error("Invalid node");
  const clonedAssignedNodes = /* @__PURE__ */ new Set();
  let pendingSelectValue = null;
  let pendingTextAreaValue = null;
  if (node.nodeType === Node.ELEMENT_NODE) {
    const tag = (node.localName || node.tagName || "").toLowerCase();
    if (node.id === "snapdom-sandbox" || node.hasAttribute("data-snapdom-sandbox")) {
      return null;
    }
    if (NO_CAPTURE_TAGS.has(tag)) {
      return null;
    }
  }
  if (node.nodeType === Node.TEXT_NODE) {
    return node.cloneNode(true);
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return node.cloneNode(true);
  }
  if (node.getAttribute("data-capture") === "exclude") {
    if (options.excludeMode === "hide") {
      const spacer = document.createElement("div");
      const rect = node.getBoundingClientRect();
      spacer.style.cssText = `display:inline-block;width:${rect.width}px;height:${rect.height}px;visibility:hidden;`;
      return spacer;
    } else if (options.excludeMode === "remove") {
      return null;
    }
  }
  if (options.exclude && Array.isArray(options.exclude)) {
    for (const selector of options.exclude) {
      try {
        if (node.matches?.(selector)) {
          if (options.excludeMode === "hide") {
            const spacer = document.createElement("div");
            const rect = node.getBoundingClientRect();
            spacer.style.cssText = `display:inline-block;width:${rect.width}px;height:${rect.height}px;visibility:hidden;`;
            return spacer;
          } else if (options.excludeMode === "remove") {
            return null;
          }
        }
      } catch (err) {
        console.warn(`Invalid selector in exclude option: ${selector}`, err);
      }
    }
  }
  if (typeof options.filter === "function") {
    try {
      if (!options.filter(node)) {
        if (options.filterMode === "hide") {
          const spacer = document.createElement("div");
          const rect = node.getBoundingClientRect();
          spacer.style.cssText = `display:inline-block;width:${rect.width}px;height:${rect.height}px;visibility:hidden;`;
          return spacer;
        } else if (options.filterMode === "remove") {
          return null;
        }
      }
    } catch (err) {
      console.warn("Error in filter function:", err);
    }
  }
  if (node.tagName === "IFRAME") {
    let sameOrigin = false;
    try {
      sameOrigin = !!(node.contentDocument || node.contentWindow?.document);
    } catch {
      sameOrigin = false;
    }
    if (sameOrigin) {
      try {
        const wrapper = await rasterizeIframe(node, sessionCache, options);
        return wrapper;
      } catch (err) {
        console.warn("[SnapDOM] iframe rasterization failed, fallback:", err);
      }
    }
    if (options.placeholders) {
      const fallback = document.createElement("div");
      fallback.style.cssText = `width:${node.offsetWidth}px;height:${node.offsetHeight}px;background-image:repeating-linear-gradient(45deg,#ddd,#ddd 5px,#f9f9f9 5px,#f9f9f9 10px);display:flex;align-items:center;justify-content:center;font-size:12px;color:#555;border:1px solid #aaa;`;
      inlineAllStyles(node, fallback, sessionCache, options);
      return fallback;
    } else {
      const rect = node.getBoundingClientRect();
      const spacer = document.createElement("div");
      spacer.style.cssText = `display:inline-block;width:${rect.width}px;height:${rect.height}px;visibility:hidden;`;
      inlineAllStyles(node, spacer, sessionCache, options);
      return spacer;
    }
  }
  if (node.getAttribute("data-capture") === "placeholder") {
    const clone2 = node.cloneNode(false);
    sessionCache.nodeMap.set(clone2, node);
    inlineAllStyles(node, clone2, sessionCache, options);
    const placeholder = document.createElement("div");
    placeholder.textContent = node.getAttribute("data-placeholder-text") || "";
    placeholder.style.cssText = "color:#666;font-size:12px;text-align:center;line-height:1.4;padding:0.5em;box-sizing:border-box;";
    clone2.appendChild(placeholder);
    return clone2;
  }
  if (node.tagName === "CANVAS") {
    let url = "";
    try {
      const ctx = node.getContext("2d", { willReadFrequently: true });
      try {
        ctx && ctx.getImageData(0, 0, 1, 1);
      } catch {
      }
      await new Promise((r) => requestAnimationFrame(r));
      url = node.toDataURL("image/png");
      if (!url || url === "data:,") {
        try {
          ctx && ctx.getImageData(0, 0, 1, 1);
        } catch {
        }
        await new Promise((r) => requestAnimationFrame(r));
        url = node.toDataURL("image/png");
        if (!url || url === "data:,") {
          const scratch = document.createElement("canvas");
          scratch.width = node.width;
          scratch.height = node.height;
          const sctx = scratch.getContext("2d");
          if (sctx) {
            sctx.drawImage(node, 0, 0);
            url = scratch.toDataURL("image/png");
          }
        }
      }
    } catch {
    }
    const img = document.createElement("img");
    try {
      img.decoding = "sync";
      img.loading = "eager";
    } catch {
    }
    if (url) img.src = url;
    img.width = node.width;
    img.height = node.height;
    try {
      const cs = getComputedStyle(node);
      if (cs.width) img.style.width = cs.width;
      if (cs.height) img.style.height = cs.height;
    } catch {
    }
    sessionCache.nodeMap.set(img, node);
    inlineAllStyles(node, img, sessionCache, options);
    return img;
  }
  let clone;
  try {
    clone = node.cloneNode(false);
    resolveCSSVars(node, clone);
    sessionCache.nodeMap.set(clone, node);
    if (node.tagName === "IMG") {
      freezeImgSrcset(node, clone);
      try {
        const rect = node.getBoundingClientRect();
        let w = Math.round(rect.width || 0);
        let h = Math.round(rect.height || 0);
        if (!w || !h) {
          const computed = window.getComputedStyle(node);
          const cssW = parseFloat(computed.width) || 0;
          const cssH = parseFloat(computed.height) || 0;
          const attrW = parseInt(node.getAttribute("width") || "", 10) || 0;
          const attrH = parseInt(node.getAttribute("height") || "", 10) || 0;
          const propW = node.width || node.naturalWidth || 0;
          const propH = node.height || node.naturalHeight || 0;
          w = Math.round(w || cssW || attrW || propW || 0);
          h = Math.round(h || cssH || attrH || propH || 0);
        }
        if (w) clone.dataset.snapdomWidth = String(w);
        if (h) clone.dataset.snapdomHeight = String(h);
      } catch {
      }
      try {
        const authored = node.getAttribute("style") || "";
        const cs = window.getComputedStyle(node);
        const usesPercentOrAuto = (prop) => {
          const a = authored.match(new RegExp(`${prop}\\s*:\\s*([^;]+)`, "i"));
          const v = a ? a[1].trim() : cs.getPropertyValue(prop);
          return /%|auto/i.test(String(v || ""));
        };
        const w = parseInt(clone.dataset.snapdomWidth || "0", 10);
        const h = parseInt(clone.dataset.snapdomHeight || "0", 10);
        const needFreezeW = usesPercentOrAuto("width") || !w;
        const needFreezeH = usesPercentOrAuto("height") || !h;
        if (needFreezeW && w) clone.style.width = `${w}px`;
        if (needFreezeH && h) clone.style.height = `${h}px`;
        if (w) clone.style.minWidth = `${w}px`;
        if (h) clone.style.minHeight = `${h}px`;
      } catch {
      }
    }
  } catch (err) {
    console.error("[Snapdom] Failed to clone node:", node, err);
    throw err;
  }
  if (node instanceof HTMLTextAreaElement) {
    const rect = node.getBoundingClientRect();
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
  }
  if (node instanceof HTMLInputElement) {
    clone.value = node.value;
    clone.setAttribute("value", node.value);
    if (node.checked !== void 0) {
      clone.checked = node.checked;
      if (node.checked) clone.setAttribute("checked", "");
      if (node.indeterminate) clone.indeterminate = node.indeterminate;
    }
  }
  if (node instanceof HTMLSelectElement) {
    pendingSelectValue = node.value;
  }
  if (node instanceof HTMLTextAreaElement) {
    pendingTextAreaValue = node.value;
  }
  inlineAllStyles(node, clone, sessionCache, options);
  if (node.shadowRoot) {
    let callback2 = function(child, resolve) {
      if (child.nodeType === Node.ELEMENT_NODE && child.tagName === "STYLE") {
        return resolve(null);
      } else {
        deepClone(child, sessionCache, options).then((clonedChild) => {
          resolve(clonedChild || null);
        }).catch(() => {
          resolve(null);
        });
      }
    };
    try {
      const slots = node.shadowRoot.querySelectorAll("slot");
      for (const s of slots) {
        let assigned = [];
        try {
          assigned = s.assignedNodes?.({ flatten: true }) || s.assignedNodes?.() || [];
        } catch {
          assigned = s.assignedNodes?.() || [];
        }
        for (const an of assigned) clonedAssignedNodes.add(an);
      }
    } catch {
    }
    const scopeId = nextShadowScopeId(sessionCache);
    const scopeSelector = `[data-sd="${scopeId}"]`;
    try {
      clone.setAttribute("data-sd", scopeId);
    } catch {
    }
    const rawCSS = extractShadowCSS(node.shadowRoot);
    const rewritten = rewriteShadowCSS(rawCSS, scopeSelector);
    const neededVars = collectCustomPropsFromCSS(rawCSS);
    const seed = buildSeedCustomPropsRule(node, neededVars, scopeSelector);
    injectScopedStyle(clone, seed + rewritten, scopeId);
    const shadowFrag = document.createDocumentFragment();
    const cloneList2 = await idleCallback(Array.from(node.shadowRoot.childNodes), callback2, options.fast);
    shadowFrag.append(...cloneList2.filter((clonedChild) => !!clonedChild));
    clone.appendChild(shadowFrag);
  }
  if (node.tagName === "SLOT") {
    let callback2 = function(child, resolve) {
      deepClone(child, sessionCache, options).then((clonedChild) => {
        if (clonedChild) {
          markSlottedSubtree(clonedChild);
        }
        resolve(clonedChild || null);
      }).catch(() => {
        resolve(null);
      });
    };
    const assigned = node.assignedNodes?.({ flatten: true }) || [];
    const nodesToClone = assigned.length > 0 ? assigned : Array.from(node.childNodes);
    const fragment = document.createDocumentFragment();
    const cloneList2 = await idleCallback(Array.from(nodesToClone), callback2, options.fast);
    fragment.append(...cloneList2.filter((clonedChild) => !!clonedChild));
    return fragment;
  }
  function callback(child, resolve) {
    if (clonedAssignedNodes.has(child)) return resolve(null);
    deepClone(child, sessionCache, options).then((clonedChild) => {
      resolve(clonedChild || null);
    }).catch(() => {
      resolve(null);
    });
  }
  const cloneList = await idleCallback(Array.from(node.childNodes), callback, options.fast);
  clone.append(...cloneList.filter((clonedChild) => !!clonedChild));
  if (pendingSelectValue !== null && clone instanceof HTMLSelectElement) {
    clone.value = pendingSelectValue;
    for (const opt of clone.options) {
      if (opt.value === pendingSelectValue) {
        opt.setAttribute("selected", "");
      } else {
        opt.removeAttribute("selected");
      }
    }
  }
  if (pendingTextAreaValue !== null && clone instanceof HTMLTextAreaElement) {
    clone.textContent = pendingTextAreaValue;
  }
  return clone;
}

// src/modules/pseudo.js
init_utils();

// src/modules/fonts.js
init_helpers();
init_cache();

// src/modules/iconFonts.js
var defaultIconFonts = [
  // /uicons/i,
  /font\s*awesome/i,
  /material\s*icons/i,
  /ionicons/i,
  /glyphicons/i,
  /feather/i,
  /bootstrap\s*icons/i,
  /remix\s*icons/i,
  /heroicons/i,
  /layui/i,
  /lucide/i
];
var ICON_FONT_URLS = Object.assign({
  materialIconsFilled: "https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  materialIconsOutlined: "https://fonts.gstatic.com/s/materialiconsoutlined/v110/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcel5euIg.woff2",
  materialIconsRound: "https://fonts.gstatic.com/s/materialiconsround/v109/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmPq_HTTw.woff2",
  materialIconsSharp: "https://fonts.gstatic.com/s/materialiconssharp/v110/oPWQ_lt5nv4pWNJpghLP75WiFR4kLh3kvmvRImcycg.woff2"
}, typeof window !== "undefined" && window.__SNAPDOM_ICON_FONTS__ || {});
var userIconFonts = [];
function extendIconFonts(fonts) {
  const list = Array.isArray(fonts) ? fonts : [fonts];
  for (const f of list) {
    if (f instanceof RegExp) userIconFonts.push(f);
    else if (typeof f === "string") userIconFonts.push(new RegExp(f, "i"));
    else console.warn("[snapdom] Ignored invalid iconFont value:", f);
  }
}
function isIconFont2(input) {
  const text = typeof input === "string" ? input : "";
  const candidates = [...defaultIconFonts, ...userIconFonts];
  for (const rx of candidates) {
    if (rx instanceof RegExp && rx.test(text)) return true;
  }
  if (/icon/i.test(text) || /glyph/i.test(text) || /symbols/i.test(text) || /feather/i.test(text) || /fontawesome/i.test(text)) return true;
  return false;
}
function isMaterialFamily(family = "") {
  const s = String(family).toLowerCase();
  return /\bmaterial\s*icons\b/.test(s) || /\bmaterial\s*symbols\b/.test(s);
}
var loadedCanvasFamilies = /* @__PURE__ */ new Map();
function parseAxes(variation = "") {
  const out = /* @__PURE__ */ Object.create(null);
  const v = String(variation || "");
  const rx = /['"]?\s*([A-Za-z]{3,4})\s*['"]?\s*([+-]?\d+(?:\.\d+)?)\s*/g;
  let m;
  while (m = rx.exec(v)) out[m[1].toUpperCase()] = Number(m[2]);
  return out;
}
async function ensureLigatureCanvasFont(cssFamily, className, axes) {
  const fam = String(cssFamily || "");
  const lowerFam = fam.toLowerCase();
  const cls = String(className || "").toLowerCase();
  if (/\bmaterial\s*icons\b/.test(lowerFam) && !/\bsymbols\b/.test(lowerFam)) {
    return { familyForMeasure: fam, familyForCanvas: fam };
  }
  const isSymbols = /\bmaterial\s*symbols\b/.test(lowerFam);
  if (!isSymbols) {
    return { familyForMeasure: fam, familyForCanvas: fam };
  }
  const FILL = axes && (axes.FILL ?? axes.fill);
  let style = "outlined";
  if (/\brounded\b/.test(cls) || /\bround\b/.test(cls)) style = "rounded";
  else if (/\bsharp\b/.test(cls)) style = "sharp";
  else if (/\boutlined\b/.test(cls)) style = "outlined";
  const filled = FILL === 1;
  let pick = null;
  if (filled) {
    if (style === "outlined" && ICON_FONT_URLS.materialIconsFilled) {
      pick = { url: ICON_FONT_URLS.materialIconsFilled, alias: "snapdom-mi-filled" };
    } else if (style === "rounded" && ICON_FONT_URLS.materialIconsRound) {
      pick = { url: ICON_FONT_URLS.materialIconsRound, alias: "snapdom-mi-round" };
    } else if (style === "sharp" && ICON_FONT_URLS.materialIconsSharp) {
      pick = { url: ICON_FONT_URLS.materialIconsSharp, alias: "snapdom-mi-sharp" };
    }
  }
  if (!pick) {
    return { familyForMeasure: fam, familyForCanvas: fam };
  }
  if (!loadedCanvasFamilies.has(pick.alias)) {
    try {
      const ff = new FontFace(pick.alias, `url(${pick.url})`, { style: "normal", weight: "400" });
      document.fonts.add(ff);
      await ff.load();
      loadedCanvasFamilies.set(pick.alias, true);
    } catch {
      return { familyForMeasure: fam, familyForCanvas: fam };
    }
  }
  const quoted = `"${pick.alias}"`;
  return { familyForMeasure: quoted, familyForCanvas: quoted };
}
async function ensureMaterialFontsReady(family = "Material Icons", px = 24) {
  try {
    await Promise.all([
      document.fonts.load(`400 ${px}px "${String(family).replace(/["']/g, "")}"`),
      document.fonts.ready
    ]);
  } catch {
  }
}
function resolvePaintColor(cs) {
  let fill = cs.getPropertyValue("-webkit-text-fill-color")?.trim() || "";
  const isTransparent = /^transparent$/i.test(fill) || /rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/i.test(fill);
  if (fill && !isTransparent && fill.toLowerCase() !== "currentcolor") return fill;
  const c = cs.color?.trim();
  return c && c !== "inherit" ? c : "#000";
}
async function materialIconToImage(ligatureText, {
  family = "Material Icons",
  weight = "normal",
  fontSize = 32,
  color = "#000",
  variation = "",
  className = ""
} = {}) {
  const fam = String(family || "").replace(/^['"]+|['"]+$/g, "");
  const dpr = window.devicePixelRatio || 1;
  const axes = parseAxes(variation);
  const { familyForMeasure, familyForCanvas } = await ensureLigatureCanvasFont(fam, className, axes);
  await ensureMaterialFontsReady(familyForCanvas.replace(/^["']+|["']+$/g, ""), fontSize);
  const span = document.createElement("span");
  span.textContent = ligatureText;
  span.style.position = "absolute";
  span.style.visibility = "hidden";
  span.style.left = "-99999px";
  span.style.whiteSpace = "nowrap";
  span.style.fontFamily = familyForMeasure;
  span.style.fontWeight = String(weight || "normal");
  span.style.fontSize = `${fontSize}px`;
  span.style.lineHeight = "1";
  span.style.margin = "0";
  span.style.padding = "0";
  span.style.fontFeatureSettings = "'liga' 1";
  span.style.fontVariantLigatures = "normal";
  span.style.color = color;
  document.body.appendChild(span);
  const rect = span.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(rect.width));
  const height = Math.max(1, Math.ceil(rect.height));
  document.body.removeChild(span);
  const canvas = document.createElement("canvas");
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.font = `${weight ? `${weight} ` : ""}${fontSize}px ${familyForCanvas}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = color;
  try {
    ctx.fontKerning = "normal";
  } catch {
  }
  ctx.fillText(ligatureText, 0, 0);
  return {
    dataUrl: canvas.toDataURL(),
    width,
    height
  };
}
async function ligatureIconToImage(cloneRoot, sourceRoot) {
  if (!(cloneRoot instanceof Element)) return 0;
  const selector = '.material-icons, [class*="material-symbols"]';
  const cloneNodes = Array.from(
    cloneRoot.querySelectorAll(selector)
  ).filter((n) => n && n.textContent && n.textContent.trim());
  if (cloneNodes.length === 0) return 0;
  const sourceNodes = sourceRoot instanceof Element ? Array.from(sourceRoot.querySelectorAll(selector)).filter((n) => n && n.textContent && n.textContent.trim()) : [];
  let replaced = 0;
  for (let i = 0; i < cloneNodes.length; i++) {
    const el = cloneNodes[i];
    const src = sourceNodes[i] || null;
    try {
      const cs = src ? getComputedStyle(src) : getComputedStyle(el);
      const family = cs.fontFamily || "Material Icons";
      if (!isMaterialFamily(family)) continue;
      const text = (src || el).textContent.trim();
      if (!text) continue;
      const size = parseInt(cs.fontSize, 10) || 24;
      const weight = cs.fontWeight && cs.fontWeight !== "normal" ? cs.fontWeight : "normal";
      const color = resolvePaintColor(cs);
      const variation = cs.fontVariationSettings && cs.fontVariationSettings !== "normal" ? cs.fontVariationSettings : "";
      const className = (src || el).className || "";
      const { dataUrl, width, height } = await materialIconToImage(text, {
        family,
        weight,
        fontSize: size,
        color,
        variation,
        className
      });
      el.textContent = "";
      const img = el.ownerDocument.createElement("img");
      img.src = dataUrl;
      img.alt = text;
      img.style.height = `${size}px`;
      img.style.width = `${Math.max(1, Math.round(width / height * size))}px`;
      img.style.objectFit = "contain";
      img.style.verticalAlign = getComputedStyle(el).verticalAlign || "baseline";
      el.appendChild(img);
      replaced++;
    } catch {
    }
  }
  return replaced;
}

// src/modules/fonts.js
init_snapFetch();
async function iconToImage(unicodeChar, fontFamily, fontWeight, fontSize = 32, color = "#000") {
  fontFamily = fontFamily.replace(/^['"]+|['"]+$/g, "");
  const dpr = window.devicePixelRatio || 1;
  try {
    await document.fonts.ready;
  } catch {
  }
  const span = document.createElement("span");
  span.textContent = unicodeChar;
  span.style.position = "absolute";
  span.style.visibility = "hidden";
  span.style.fontFamily = `"${fontFamily}"`;
  span.style.fontWeight = fontWeight || "normal";
  span.style.fontSize = `${fontSize}px`;
  span.style.lineHeight = "1";
  span.style.whiteSpace = "nowrap";
  span.style.padding = "0";
  span.style.margin = "0";
  document.body.appendChild(span);
  const rect = span.getBoundingClientRect();
  const width = Math.ceil(rect.width);
  const height = Math.ceil(rect.height);
  document.body.removeChild(span);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, width * dpr);
  canvas.height = Math.max(1, height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.font = fontWeight ? `${fontWeight} ${fontSize}px "${fontFamily}"` : `${fontSize}px "${fontFamily}"`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = color;
  ctx.fillText(unicodeChar, 0, 0);
  return {
    dataUrl: canvas.toDataURL(),
    width,
    height
  };
}
var GENERIC_FAMILIES = /* @__PURE__ */ new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "emoji",
  "math",
  "fangsong",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded"
]);
function pickPrimaryFamily(familyList) {
  if (!familyList) return "";
  for (let raw of familyList.split(",")) {
    let f = raw.trim().replace(/^['"]+|['"]+$/g, "");
    if (!f) continue;
    if (!GENERIC_FAMILIES.has(f.toLowerCase())) return f;
  }
  return "";
}
function normWeight(w) {
  const t = String(w ?? "400").trim().toLowerCase();
  if (t === "normal") return 400;
  if (t === "bold") return 700;
  const n = parseInt(t, 10);
  return Number.isFinite(n) ? Math.min(900, Math.max(100, n)) : 400;
}
function normStyle(s) {
  const t = String(s ?? "normal").trim().toLowerCase();
  if (t.startsWith("italic")) return "italic";
  if (t.startsWith("oblique")) return "oblique";
  return "normal";
}
function normStretchPct(st) {
  const m = String(st ?? "100%").match(/(\d+(?:\.\d+)?)\s*%/);
  return m ? Math.max(50, Math.min(200, parseFloat(m[1]))) : 100;
}
function parseWeightSpec(spec) {
  const s = String(spec || "400").trim();
  const m = s.match(/^(\d{2,3})\s+(\d{2,3})$/);
  if (m) {
    const a = normWeight(m[1]), b = normWeight(m[2]);
    return { min: Math.min(a, b), max: Math.max(a, b) };
  }
  const v = normWeight(s);
  return { min: v, max: v };
}
function parseStyleSpec(spec) {
  const t = String(spec || "normal").trim().toLowerCase();
  if (t === "italic") return { kind: "italic" };
  if (t.startsWith("oblique")) return { kind: "oblique" };
  return { kind: "normal" };
}
function parseStretchSpec(spec) {
  const s = String(spec || "100%").trim();
  const mm = s.match(/(\d+(?:\.\d+)?)\s*%\s+(\d+(?:\.\d+)?)\s*%/);
  if (mm) {
    const a = parseFloat(mm[1]), b = parseFloat(mm[2]);
    return { min: Math.min(a, b), max: Math.max(a, b) };
  }
  const m = s.match(/(\d+(?:\.\d+)?)\s*%/);
  const v = m ? parseFloat(m[1]) : 100;
  return { min: v, max: v };
}
function isLikelyFontStylesheet(href, requiredFamilies) {
  if (!href) return false;
  try {
    const u = new URL(href, location.href);
    const sameOrigin = u.origin === location.origin;
    if (sameOrigin) return true;
    const host = u.host.toLowerCase();
    const FONT_HOSTS = [
      "fonts.googleapis.com",
      "fonts.gstatic.com",
      "use.typekit.net",
      "p.typekit.net",
      "kit.fontawesome.com",
      "use.fontawesome.com"
    ];
    if (FONT_HOSTS.some((h) => host.endsWith(h))) return true;
    const path = (u.pathname + u.search).toLowerCase();
    if (/\bfont(s)?\b/.test(path) || /\.woff2?(\b|$)/.test(path)) return true;
    for (const fam of requiredFamilies) {
      const tokenA = fam.toLowerCase().replace(/\s+/g, "+");
      const tokenB = fam.toLowerCase().replace(/\s+/g, "-");
      if (path.includes(tokenA) || path.includes(tokenB)) return true;
    }
    return false;
  } catch {
    return false;
  }
}
function familiesFromRequired(required) {
  const out = /* @__PURE__ */ new Set();
  for (const k of required || []) {
    const fam = String(k).split("__")[0]?.trim();
    if (fam) out.add(fam);
  }
  return out;
}
function rewriteRelativeUrls(cssText, baseHref) {
  if (!cssText) return cssText;
  return cssText.replace(
    /url\(\s*(['"]?)([^)'"]+)\1\s*\)/g,
    (m, q, u) => {
      const src = (u || "").trim();
      if (!src || /^data:|^blob:|^https?:|^file:|^about:/i.test(src)) return m;
      let abs = src;
      try {
        abs = new URL(src, baseHref || location.href).href;
      } catch {
      }
      return `url("${abs}")`;
    }
  );
}
var IMPORT_ANY_RE = /@import\s+(?:url\(\s*(['"]?)([^)"']+)\1\s*\)|(['"])([^"']+)\3)([^;]*);/g;
var MAX_IMPORT_DEPTH = 4;
async function inlineImportsAndRewrite(cssText, ownerHref, useProxy) {
  if (!cssText) return cssText;
  const visited = /* @__PURE__ */ new Set();
  function normalizeUrl(u, base) {
    try {
      return new URL(u, base || location.href).href;
    } catch {
      return u;
    }
  }
  async function resolveOnce(text, baseHref, depth = 0) {
    if (depth > MAX_IMPORT_DEPTH) {
      console.warn(`[snapDOM] @import depth exceeded (${MAX_IMPORT_DEPTH}) at ${baseHref}`);
      return text;
    }
    let out = "";
    let last = 0;
    let m;
    while (m = IMPORT_ANY_RE.exec(text)) {
      out += text.slice(last, m.index);
      last = IMPORT_ANY_RE.lastIndex;
      const rawUrl = (m[2] || m[4] || "").trim();
      const absUrl = normalizeUrl(rawUrl, baseHref);
      if (visited.has(absUrl)) {
        console.warn(`[snapDOM] Skipping circular @import: ${absUrl}`);
        continue;
      }
      visited.add(absUrl);
      let imported = "";
      try {
        const r = await snapFetch(absUrl, { as: "text", useProxy, silent: true });
        if (r.ok && typeof r.data === "string") imported = r.data;
      } catch {
      }
      if (imported) {
        imported = rewriteRelativeUrls(imported, absUrl);
        imported = await resolveOnce(imported, absUrl, depth + 1);
        out += `
/* inlined: ${absUrl} */
${imported}
`;
      } else {
        out += m[0];
      }
    }
    out += text.slice(last);
    return out;
  }
  let rewritten = rewriteRelativeUrls(cssText, ownerHref || location.href);
  rewritten = await resolveOnce(rewritten, ownerHref || location.href, 0);
  return rewritten;
}
var URL_RE = /url\((["']?)([^"')]+)\1\)/g;
var FACE_RE = /@font-face[^{}]*\{[^}]*\}/g;
function parseUnicodeRange(ur) {
  if (!ur) return [];
  const ranges = [];
  const parts = ur.split(",").map((s) => s.trim()).filter(Boolean);
  for (const p of parts) {
    const m = p.match(/^U\+([0-9A-Fa-f?]+)(?:-([0-9A-Fa-f?]+))?$/);
    if (!m) continue;
    const a = m[1], b = m[2];
    const expand = (hex) => {
      if (!hex.includes("?")) return parseInt(hex, 16);
      const min = parseInt(hex.replace(/\?/g, "0"), 16);
      const max = parseInt(hex.replace(/\?/g, "F"), 16);
      return [min, max];
    };
    if (b) {
      const A = expand(a), B = expand(b);
      const min = Array.isArray(A) ? A[0] : A;
      const max = Array.isArray(B) ? B[1] : B;
      ranges.push([Math.min(min, max), Math.max(min, max)]);
    } else {
      const X = expand(a);
      if (Array.isArray(X)) ranges.push([X[0], X[1]]);
      else ranges.push([X, X]);
    }
  }
  return ranges;
}
function unicodeIntersects(used, ranges) {
  if (!ranges.length) return true;
  if (!used || used.size === 0) return true;
  for (const cp of used) {
    for (const [a, b] of ranges) if (cp >= a && cp <= b) return true;
  }
  return false;
}
function extractSrcUrls(srcValue, baseHref) {
  const urls = [];
  if (!srcValue) return urls;
  for (const m of srcValue.matchAll(URL_RE)) {
    let u = (m[2] || "").trim();
    if (!u || u.startsWith("data:")) continue;
    if (!/^https?:/i.test(u)) {
      try {
        u = new URL(u, baseHref || location.href).href;
      } catch {
      }
    }
    urls.push(u);
  }
  return urls;
}
async function inlineUrlsInCssBlock(cssBlock, baseHref, useProxy = "") {
  let out = cssBlock;
  for (const m of cssBlock.matchAll(URL_RE)) {
    const raw = extractURL(m[0]);
    if (!raw) continue;
    let abs = raw;
    if (!abs.startsWith("http") && !abs.startsWith("data:")) {
      try {
        abs = new URL(abs, baseHref || location.href).href;
      } catch {
      }
    }
    if (isIconFont2(abs)) continue;
    if (cache.resource?.has(abs)) {
      cache.font?.add(abs);
      out = out.replace(m[0], `url(${cache.resource.get(abs)})`);
      continue;
    }
    if (cache.font?.has(abs)) continue;
    try {
      const r = await snapFetch(abs, { as: "dataURL", useProxy, silent: true });
      if (r.ok && typeof r.data === "string") {
        const b64 = r.data;
        cache.resource?.set(abs, b64);
        cache.font?.add(abs);
        out = out.replace(m[0], `url(${b64})`);
      }
    } catch {
      console.warn("[snapDOM] Failed to fetch font resource:", abs);
    }
  }
  return out;
}
function subsetFromRanges(ranges) {
  if (!ranges.length) return null;
  const hit = (a, b) => ranges.some(([x, y]) => !(y < a || x > b));
  const latin = hit(0, 255) || hit(305, 305);
  const latinExt = hit(256, 591) || hit(7680, 7935);
  const greek = hit(880, 1023);
  const cyr = hit(1024, 1279);
  const viet = hit(7840, 7929) || hit(258, 259) || hit(416, 417) || hit(431, 432);
  if (viet) return "vietnamese";
  if (cyr) return "cyrillic";
  if (greek) return "greek";
  if (latinExt) return "latin-ext";
  if (latin) return "latin";
  return null;
}
function buildSimpleExcluder(ex = {}) {
  const famSet = new Set((ex.families || []).map((s) => String(s).toLowerCase()));
  const domSet = new Set((ex.domains || []).map((s) => String(s).toLowerCase()));
  const subSet = new Set((ex.subsets || []).map((s) => String(s).toLowerCase()));
  return (meta, parsedRanges) => {
    if (famSet.size && famSet.has(meta.family.toLowerCase())) return true;
    if (domSet.size) {
      for (const u of meta.srcUrls) {
        try {
          if (domSet.has(new URL(u).host.toLowerCase())) return true;
        } catch {
        }
      }
    }
    if (subSet.size) {
      const label = subsetFromRanges(parsedRanges);
      if (label && subSet.has(label)) return true;
    }
    return false;
  };
}
function dedupeFontFaces(cssText) {
  if (!cssText) return cssText;
  const FACE_RE_G = /@font-face[^{}]*\{[^}]*\}/gi;
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const block of cssText.match(FACE_RE_G) || []) {
    const familyRaw = block.match(/font-family:\s*([^;]+);/i)?.[1] || "";
    const family = pickPrimaryFamily(familyRaw);
    const weightSpec = (block.match(/font-weight:\s*([^;]+);/i)?.[1] || "400").trim();
    const styleSpec = (block.match(/font-style:\s*([^;]+);/i)?.[1] || "normal").trim();
    const stretchSpec = (block.match(/font-stretch:\s*([^;]+);/i)?.[1] || "100%").trim();
    const urange = (block.match(/unicode-range:\s*([^;]+);/i)?.[1] || "").trim();
    const srcRaw = (block.match(/src\s*:\s*([^;}]+)[;}]/i)?.[1] || "").trim();
    const urls = extractSrcUrls(srcRaw, location.href);
    const srcPart = urls.length ? urls.map((u) => String(u).toLowerCase()).sort().join("|") : srcRaw.toLowerCase();
    const key = [
      String(family || "").toLowerCase(),
      weightSpec,
      styleSpec,
      stretchSpec,
      urange.toLowerCase(),
      srcPart
    ].join("|");
    if (!seen.has(key)) {
      seen.add(key);
      out.push(block);
    }
  }
  if (out.length === 0) return cssText;
  let i = 0;
  return cssText.replace(FACE_RE_G, () => out[i++] || "");
}
function buildFontsCacheKey(required, exclude, localFonts, useProxy) {
  const req = Array.from(required || []).sort().join("|");
  const ex = exclude ? JSON.stringify({
    families: (exclude.families || []).map((s) => String(s).toLowerCase()).sort(),
    domains: (exclude.domains || []).map((s) => String(s).toLowerCase()).sort(),
    subsets: (exclude.subsets || []).map((s) => String(s).toLowerCase()).sort()
  }) : "";
  const lf = (localFonts || []).map((f) => `${(f.family || "").toLowerCase()}::${f.weight || "normal"}::${f.style || "normal"}::${f.src || ""}`).sort().join("|");
  const px = useProxy || "";
  return `fonts-embed-css::req=${req}::ex=${ex}::lf=${lf}::px=${px}`;
}
async function collectFacesFromSheet(sheet, baseHref, emitFace, ctx) {
  let rules;
  try {
    rules = sheet.cssRules || [];
  } catch {
    return;
  }
  const normalizeUrl = (u, base) => {
    try {
      return new URL(u, base || location.href).href;
    } catch {
      return u;
    }
  };
  for (const rule of rules) {
    if (rule.type === CSSRule.IMPORT_RULE && rule.styleSheet) {
      const childHref = rule.href ? normalizeUrl(rule.href, baseHref) : baseHref;
      if (ctx.depth >= MAX_IMPORT_DEPTH) {
        console.warn(`[snapDOM] CSSOM import depth exceeded (${MAX_IMPORT_DEPTH}) at ${childHref}`);
        continue;
      }
      if (childHref && ctx.visitedSheets.has(childHref)) {
        console.warn(`[snapDOM] Skipping circular CSSOM import: ${childHref}`);
        continue;
      }
      if (childHref) ctx.visitedSheets.add(childHref);
      const nextCtx = { ...ctx, depth: (ctx.depth || 0) + 1 };
      await collectFacesFromSheet(rule.styleSheet, childHref, emitFace, nextCtx);
      continue;
    }
    if (rule.type === CSSRule.FONT_FACE_RULE) {
      const famRaw = (rule.style.getPropertyValue("font-family") || "").trim();
      const family = pickPrimaryFamily(famRaw);
      if (!family || isIconFont2(family)) continue;
      const weightSpec = (rule.style.getPropertyValue("font-weight") || "400").trim();
      const styleSpec = (rule.style.getPropertyValue("font-style") || "normal").trim();
      const stretchSpec = (rule.style.getPropertyValue("font-stretch") || "100%").trim();
      const srcRaw = (rule.style.getPropertyValue("src") || "").trim();
      const urange = (rule.style.getPropertyValue("unicode-range") || "").trim();
      if (!ctx.faceMatchesRequired(family, styleSpec, weightSpec, stretchSpec)) continue;
      const ranges = parseUnicodeRange(urange);
      if (!unicodeIntersects(ctx.usedCodepoints, ranges)) continue;
      const meta = {
        family,
        weightSpec,
        styleSpec,
        stretchSpec,
        unicodeRange: urange,
        srcRaw,
        srcUrls: extractSrcUrls(srcRaw, baseHref || location.href),
        href: baseHref || location.href
      };
      if (ctx.simpleExcluder && ctx.simpleExcluder(meta, ranges)) continue;
      if (/url\(/i.test(srcRaw)) {
        const inlinedSrc = await inlineUrlsInCssBlock(srcRaw, baseHref || location.href, ctx.useProxy);
        await emitFace(`@font-face{font-family:${family};src:${inlinedSrc};font-style:${styleSpec};font-weight:${weightSpec};font-stretch:${stretchSpec};${urange ? `unicode-range:${urange};` : ""}}`);
      } else {
        await emitFace(`@font-face{font-family:${family};src:${srcRaw};font-style:${styleSpec};font-weight:${weightSpec};font-stretch:${stretchSpec};${urange ? `unicode-range:${urange};` : ""}}`);
      }
    }
  }
}
async function embedCustomFonts({
  required,
  usedCodepoints,
  exclude = void 0,
  localFonts = [],
  useProxy = ""
} = {}) {
  if (!(required instanceof Set)) required = /* @__PURE__ */ new Set();
  if (!(usedCodepoints instanceof Set)) usedCodepoints = /* @__PURE__ */ new Set();
  const requiredIndex = /* @__PURE__ */ new Map();
  for (const key of required) {
    const [fam, w, s, st] = String(key).split("__");
    if (!fam) continue;
    const arr = requiredIndex.get(fam) || [];
    arr.push({ w: parseInt(w, 10), s, st: parseInt(st, 10) });
    requiredIndex.set(fam, arr);
  }
  function faceMatchesRequired(fam, styleSpec, weightSpec, stretchSpec) {
    if (!requiredIndex.has(fam)) return false;
    const need = requiredIndex.get(fam);
    const ws = parseWeightSpec(weightSpec);
    const ss = parseStyleSpec(styleSpec);
    const ts = parseStretchSpec(stretchSpec);
    const faceIsRange = ws.min !== ws.max;
    const faceSingleW = ws.min;
    const styleOK = (reqKind) => ss.kind === "normal" && reqKind === "normal" || ss.kind !== "normal" && (reqKind === "italic" || reqKind === "oblique");
    let exactMatched = false;
    for (const r of need) {
      const wOk = faceIsRange ? r.w >= ws.min && r.w <= ws.max : r.w === faceSingleW;
      const sOk = styleOK(normStyle(r.s));
      const tOk = r.st >= ts.min && r.st <= ts.max;
      if (wOk && sOk && tOk) {
        exactMatched = true;
        break;
      }
    }
    if (exactMatched) return true;
    if (!faceIsRange) {
      for (const r of need) {
        const sOk = styleOK(normStyle(r.s));
        const tOk = r.st >= ts.min && r.st <= ts.max;
        const nearWeight = Math.abs(faceSingleW - r.w) <= 300;
        if (nearWeight && sOk && tOk) return true;
      }
    }
    if (!faceIsRange && ss.kind === "normal") {
      const hasItalicRequest = need.some((r) => normStyle(r.s) !== "normal");
      if (hasItalicRequest) {
        for (const r of need) {
          const nearWeight = Math.abs(faceSingleW - r.w) <= 300;
          const stretchOK = r.st >= ts.min && r.st <= ts.max;
          if (nearWeight && stretchOK) {
            return true;
          }
        }
      }
    }
    return false;
  }
  const simpleExcluder = buildSimpleExcluder(exclude);
  const cacheKey = buildFontsCacheKey(required, exclude, localFonts, useProxy);
  if (cache.resource?.has(cacheKey)) {
    return cache.resource.get(cacheKey);
  }
  const requiredFamilies = familiesFromRequired(required);
  const importUrls = [];
  const IMPORT_ANY_RE_LOCAL = IMPORT_ANY_RE;
  for (const styleTag of document.querySelectorAll("style")) {
    const cssText = styleTag.textContent || "";
    for (const m of cssText.matchAll(IMPORT_ANY_RE_LOCAL)) {
      const u = (m[2] || m[4] || "").trim();
      if (!u || isIconFont2(u)) continue;
      const hasLink = !!document.querySelector(`link[rel="stylesheet"][href="${u}"]`);
      if (!hasLink) importUrls.push(u);
    }
  }
  if (importUrls.length) {
    await Promise.all(importUrls.map((u) => new Promise((resolve) => {
      if (document.querySelector(`link[rel="stylesheet"][href="${u}"]`)) return resolve(null);
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = u;
      link.setAttribute("data-snapdom", "injected-import");
      link.onload = () => resolve(link);
      link.onerror = () => resolve(null);
      document.head.appendChild(link);
    })));
  }
  let finalCSS = "";
  const linkNodes = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter((l) => !!l.href);
  for (const link of linkNodes) {
    try {
      if (isIconFont2(link.href)) continue;
      let cssText = "";
      let sameOrigin = false;
      try {
        sameOrigin = new URL(link.href, location.href).origin === location.origin;
      } catch {
      }
      if (!sameOrigin) {
        if (!isLikelyFontStylesheet(link.href, requiredFamilies)) continue;
      }
      if (sameOrigin) {
        const sheet = Array.from(document.styleSheets).find((s) => s.href === link.href);
        if (sheet) {
          try {
            const rules = sheet.cssRules || [];
            cssText = Array.from(rules).map((r) => r.cssText).join("");
          } catch {
          }
        }
      }
      if (!cssText) {
        const res = await snapFetch(link.href, { as: "text", useProxy });
        cssText = res.data;
        if (isIconFont2(link.href)) continue;
      }
      cssText = await inlineImportsAndRewrite(cssText, link.href, useProxy);
      let facesOut = "";
      for (const face of cssText.match(FACE_RE) || []) {
        const famRaw = (face.match(/font-family:\s*([^;]+);/i)?.[1] || "").trim();
        const family = pickPrimaryFamily(famRaw);
        if (!family || isIconFont2(family)) continue;
        const weightSpec = (face.match(/font-weight:\s*([^;]+);/i)?.[1] || "400").trim();
        const styleSpec = (face.match(/font-style:\s*([^;]+);/i)?.[1] || "normal").trim();
        const stretchSpec = (face.match(/font-stretch:\s*([^;]+);/i)?.[1] || "100%").trim();
        const urange = (face.match(/unicode-range:\s*([^;]+);/i)?.[1] || "").trim();
        const srcRaw = (face.match(/src\s*:\s*([^;}]+)[;}]/i)?.[1] || "").trim();
        const srcUrls = extractSrcUrls(srcRaw, link.href);
        if (!faceMatchesRequired(family, styleSpec, weightSpec, stretchSpec)) continue;
        const ranges = parseUnicodeRange(urange);
        if (!unicodeIntersects(usedCodepoints, ranges)) continue;
        const meta = { family, weightSpec, styleSpec, stretchSpec, unicodeRange: urange, srcRaw, srcUrls, href: link.href };
        if (exclude && simpleExcluder(meta, ranges)) continue;
        const newFace = /url\(/i.test(srcRaw) ? await inlineUrlsInCssBlock(face, link.href, useProxy) : face;
        facesOut += newFace;
      }
      if (facesOut.trim()) finalCSS += facesOut;
    } catch {
      console.warn("[snapDOM] Failed to process stylesheet:", link.href);
    }
  }
  const ctx = {
    requiredIndex,
    usedCodepoints,
    faceMatchesRequired,
    simpleExcluder: exclude ? buildSimpleExcluder(exclude) : null,
    useProxy,
    visitedSheets: /* @__PURE__ */ new Set(),
    depth: 0
  };
  for (const sheet of document.styleSheets) {
    if (sheet.href && linkNodes.some((l) => l.href === sheet.href)) continue;
    try {
      const rootHref = sheet.href || location.href;
      if (rootHref) ctx.visitedSheets.add(rootHref);
      await collectFacesFromSheet(
        sheet,
        rootHref,
        async (faceCss) => {
          finalCSS += faceCss;
        },
        ctx
      );
    } catch {
    }
  }
  try {
    for (const f of document.fonts || []) {
      if (!f || !f.family || f.status !== "loaded" || !f._snapdomSrc) continue;
      const fam = String(f.family).replace(/^['"]+|['"]+$/g, "");
      if (isIconFont2(fam)) continue;
      if (!requiredIndex.has(fam)) continue;
      if (exclude?.families && exclude.families.some((n) => String(n).toLowerCase() === fam.toLowerCase())) {
        continue;
      }
      let b64 = f._snapdomSrc;
      if (!String(b64).startsWith("data:")) {
        if (cache.resource?.has(f._snapdomSrc)) {
          b64 = cache.resource.get(f._snapdomSrc);
          cache.font?.add(f._snapdomSrc);
        } else if (!cache.font?.has(f._snapdomSrc)) {
          try {
            const r = await snapFetch(f._snapdomSrc, { as: "dataURL", useProxy, silent: true });
            if (r.ok && typeof r.data === "string") {
              b64 = r.data;
              cache.resource?.set(f._snapdomSrc, b64);
              cache.font?.add(f._snapdomSrc);
            } else {
              continue;
            }
          } catch {
            console.warn("[snapDOM] Failed to fetch dynamic font src:", f._snapdomSrc);
            continue;
          }
        }
      }
      finalCSS += `@font-face{font-family:'${fam}';src:url(${b64});font-style:${f.style || "normal"};font-weight:${f.weight || "normal"};}`;
    }
  } catch {
  }
  for (const font of localFonts) {
    if (!font || typeof font !== "object") continue;
    const family = String(font.family || "").replace(/^['"]+|['"]+$/g, "");
    if (!family || isIconFont2(family)) continue;
    if (!requiredIndex.has(family)) continue;
    if (exclude?.families && exclude.families.some((n) => String(n).toLowerCase() === family.toLowerCase())) continue;
    const weight = font.weight != null ? String(font.weight) : "normal";
    const style = font.style != null ? String(font.style) : "normal";
    const stretch = font.stretchPct != null ? `${font.stretchPct}%` : "100%";
    const src = String(font.src || "");
    let b64 = src;
    if (!b64.startsWith("data:")) {
      if (cache.resource?.has(src)) {
        b64 = cache.resource.get(src);
        cache.font?.add(src);
      } else if (!cache.font?.has(src)) {
        try {
          const r = await snapFetch(src, { as: "dataURL", useProxy, silent: true });
          if (r.ok && typeof r.data === "string") {
            b64 = r.data;
            cache.resource?.set(src, b64);
            cache.font?.add(src);
          } else {
            continue;
          }
        } catch {
          console.warn("[snapDOM] Failed to fetch localFonts src:", src);
          continue;
        }
      }
    }
    finalCSS += `@font-face{font-family:'${family}';src:url(${b64});font-style:${style};font-weight:${weight};font-stretch:${stretch};}`;
  }
  if (finalCSS) {
    finalCSS = dedupeFontFaces(finalCSS);
    cache.resource?.set(cacheKey, finalCSS);
  }
  return finalCSS;
}
function collectUsedFontVariants(root) {
  const req = /* @__PURE__ */ new Set();
  if (!root) return req;
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null);
  const addFromStyle = (cs) => {
    const family = pickPrimaryFamily(cs.fontFamily);
    if (!family) return;
    const key = (w, s, st) => `${family}__${normWeight(w)}__${normStyle(s)}__${normStretchPct(st)}`;
    req.add(key(cs.fontWeight, cs.fontStyle, cs.fontStretch));
  };
  addFromStyle(getComputedStyle(root));
  const csBeforeRoot = getComputedStyle(root, "::before");
  if (csBeforeRoot && csBeforeRoot.content && csBeforeRoot.content !== "none") addFromStyle(csBeforeRoot);
  const csAfterRoot = getComputedStyle(root, "::after");
  if (csAfterRoot && csAfterRoot.content && csAfterRoot.content !== "none") addFromStyle(csAfterRoot);
  while (tw.nextNode()) {
    const el = (
      /** @type {Element} */
      tw.currentNode
    );
    const cs = getComputedStyle(el);
    addFromStyle(cs);
    const b = getComputedStyle(el, "::before");
    if (b && b.content && b.content !== "none") addFromStyle(b);
    const a = getComputedStyle(el, "::after");
    if (a && a.content && a.content !== "none") addFromStyle(a);
  }
  return req;
}
function collectUsedCodepoints(root) {
  const used = /* @__PURE__ */ new Set();
  const pushText = (txt) => {
    if (!txt) return;
    for (const ch of txt) used.add(ch.codePointAt(0));
  };
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null);
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (n.nodeType === Node.TEXT_NODE) {
      pushText(n.nodeValue || "");
    } else if (n.nodeType === Node.ELEMENT_NODE) {
      const el = (
        /** @type {Element} */
        n
      );
      for (const pseudo of ["::before", "::after"]) {
        const cs = getComputedStyle(el, pseudo);
        const c = cs?.getPropertyValue("content");
        if (!c || c === "none") continue;
        if (/^"/.test(c) || /^'/.test(c)) {
          pushText(c.slice(1, -1));
        } else {
          const matches = c.match(/\\[0-9A-Fa-f]{1,6}/g);
          if (matches) {
            for (const m of matches) {
              try {
                used.add(parseInt(m.slice(1), 16));
              } catch {
              }
            }
          }
        }
      }
    }
  }
  return used;
}
async function ensureFontsReady(families, warmupRepetitions = 2) {
  try {
    await document.fonts.ready;
  } catch {
  }
  const fams = Array.from(families || []).filter(Boolean);
  if (fams.length === 0) return;
  const warmupOnce = () => {
    const container = document.createElement("div");
    container.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;opacity:0!important;pointer-events:none!important;contain:layout size style;";
    for (const fam of fams) {
      const span = document.createElement("span");
      span.textContent = "AaBbGg1234\xC1\xC9\xCD\xD3\xDA\xE7\xF1\u2014\u221E";
      span.style.fontFamily = `"${fam}"`;
      span.style.fontWeight = "700";
      span.style.fontStyle = "italic";
      span.style.fontSize = "32px";
      span.style.lineHeight = "1";
      span.style.whiteSpace = "nowrap";
      span.style.margin = "0";
      span.style.padding = "0";
      container.appendChild(span);
    }
    document.body.appendChild(container);
    container.offsetWidth;
    document.body.removeChild(container);
  };
  for (let i = 0; i < Math.max(1, warmupRepetitions); i++) {
    warmupOnce();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  }
}

// src/modules/counter.js
init_cache();
function hasCounters(input) {
  return /\bcounter\s*\(|\bcounters\s*\(/.test(input || "");
}
function unquoteDoubleStrings(s) {
  return (s || "").replace(/"([^"]*)"/g, "$1");
}
function alpha(n, upper = false) {
  let s = "", x = Math.max(1, n);
  while (x > 0) {
    x--;
    s = String.fromCharCode(97 + x % 26) + s;
    x = Math.floor(x / 26);
  }
  return upper ? s.toUpperCase() : s;
}
function roman(n, upper = true) {
  const map = [[1e3, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let num = Math.max(1, Math.min(3999, n)), out = "";
  for (const [v, sym] of map) while (num >= v) {
    out += sym;
    num -= v;
  }
  return upper ? out : out.toLowerCase();
}
function formatCounter(value, style) {
  switch ((style || "decimal").toLowerCase()) {
    case "decimal":
      return String(Math.max(0, value));
    case "decimal-leading-zero":
      return (value < 10 ? "0" : "") + String(Math.max(0, value));
    case "lower-alpha":
      return alpha(value, false);
    case "upper-alpha":
      return alpha(value, true);
    case "lower-roman":
      return roman(value, false);
    case "upper-roman":
      return roman(value, true);
    default:
      return String(Math.max(0, value));
  }
}
function buildCounterContext(root) {
  const getEpoch = () => cache?.session?.__counterEpoch ?? 0;
  let run = getEpoch();
  const nodeCounters = /* @__PURE__ */ new WeakMap();
  const rootEl = root instanceof Document ? root.documentElement : root;
  const isLi = (el) => el && el.tagName === "LI";
  const countPrevLi = (li) => {
    let c = 0, p = li?.parentElement;
    if (!p) return 0;
    for (const sib of p.children) {
      if (sib === li) break;
      if (sib.tagName === "LI") c++;
    }
    return c;
  };
  const cloneMap = (m) => {
    const out = /* @__PURE__ */ new Map();
    for (const [k, arr] of m) out.set(k, arr.slice());
    return out;
  };
  const applyTo = (baseMap, parentMap, el) => {
    const map = cloneMap(baseMap);
    let reset;
    try {
      reset = el.style?.counterReset || getComputedStyle(el).counterReset;
    } catch {
    }
    if (reset && reset !== "none") {
      for (const part of reset.split(",")) {
        const toks = part.trim().split(/\s+/);
        const name = toks[0];
        const val = Number.isFinite(Number(toks[1])) ? Number(toks[1]) : 0;
        if (!name) continue;
        const parentStack = parentMap.get(name);
        if (parentStack && parentStack.length) {
          const s = parentStack.slice();
          s.push(val);
          map.set(name, s);
        } else {
          map.set(name, [val]);
        }
      }
    }
    let inc;
    try {
      inc = el.style?.counterIncrement || getComputedStyle(el).counterIncrement;
    } catch {
    }
    if (inc && inc !== "none") {
      for (const part of inc.split(",")) {
        const toks = part.trim().split(/\s+/);
        const name = toks[0];
        const by = Number.isFinite(Number(toks[1])) ? Number(toks[1]) : 1;
        if (!name) continue;
        const stack = map.get(name) || [];
        if (stack.length === 0) stack.push(0);
        stack[stack.length - 1] += by;
        map.set(name, stack);
      }
    }
    try {
      const cs = getComputedStyle(el);
      if (cs.display === "list-item" && isLi(el)) {
        const p = el.parentElement;
        let idx = 1;
        if (p && p.tagName === "OL") {
          const startAttr = p.getAttribute("start");
          const start = Number.isFinite(Number(startAttr)) ? Number(startAttr) : 1;
          const prev = countPrevLi(el);
          const ownAttr = el.getAttribute("value");
          idx = Number.isFinite(Number(ownAttr)) ? Number(ownAttr) : start + prev;
        } else {
          idx = 1 + countPrevLi(el);
        }
        const s = map.get("list-item") || [];
        if (s.length === 0) s.push(0);
        s[s.length - 1] = idx;
        map.set("list-item", s);
      }
    } catch {
    }
    return map;
  };
  const build = (el, parentMap, carryMap) => {
    const curr = applyTo(carryMap, parentMap, el);
    nodeCounters.set(el, curr);
    let nextCarry = curr;
    for (const child of el.children) {
      const childCarry = build(child, curr, nextCarry);
      nextCarry = childCarry;
    }
    return curr;
  };
  const empty = /* @__PURE__ */ new Map();
  build(rootEl, empty, empty);
  function ensureFresh() {
    const now = getEpoch();
    if (now !== run) {
      run = now;
      const empty2 = /* @__PURE__ */ new Map();
      build(rootEl, empty2, empty2);
    }
  }
  return {
    /**
     * Get top value for counter name at given node.
     * @param {Element} node
     * @param {string} name
     */
    get(node, name) {
      ensureFresh();
      const s = nodeCounters.get(node)?.get(name);
      return s && s.length ? s[s.length - 1] : 0;
    },
    /**
     * Get full stack for counter name at given node.
     * @param {Element} node
     * @param {string} name
     */
    getStack(node, name) {
      ensureFresh();
      const s = nodeCounters.get(node)?.get(name);
      return s ? s.slice() : [];
    }
  };
}
function resolveCountersInContent(raw, node, ctx) {
  if (!raw || raw === "none") return raw;
  try {
    const RX = /\b(counter|counters)\s*\(([^)]+)\)/g;
    let out = raw.replace(RX, (_, fn, args) => {
      const parts = String(args).split(",").map((s) => s.trim());
      if (fn === "counter") {
        const name = parts[0]?.replace(/^["']|["']$/g, "");
        const style = (parts[1] || "decimal").toLowerCase();
        const v = ctx.get(node, name);
        return formatCounter(v, style);
      } else {
        const name = parts[0]?.replace(/^["']|["']$/g, "");
        const sep = parts[1]?.replace(/^["']|["']$/g, "") ?? "";
        const style = (parts[2] || "decimal").toLowerCase();
        const stack = ctx.getStack(node, name);
        if (!stack.length) return "";
        const pieces = stack.map((v) => formatCounter(v, style));
        return pieces.join(sep);
      }
    });
    return unquoteDoubleStrings(out);
  } catch {
    return "- ";
  }
}

// src/modules/pseudo.js
init_snapFetch();
init_cache();
var __preflightMemo = /* @__PURE__ */ new WeakMap();
var CSS_RULE_SCAN_BUDGET = 300;
function preflightWithFp(doc, sessionCache) {
  const fp = styleFingerprint(doc);
  if (!sessionCache) return shouldProcessPseudos(doc);
  if (sessionCache.__pseudoPreflightFp !== fp) {
    sessionCache.__pseudoPreflight = shouldProcessPseudos(doc);
    sessionCache.__pseudoPreflightFp = fp;
  }
  return !!sessionCache.__pseudoPreflight;
}
function safeRules(sheet) {
  try {
    return sheet && sheet.cssRules ? sheet.cssRules : null;
  } catch {
    return null;
  }
}
function styleFingerprint(doc) {
  const nodes = doc.querySelectorAll('style,link[rel~="stylesheet"]');
  let fp = `n:${nodes.length}|`;
  let totalRules = 0;
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.tagName === "STYLE") {
      const len = n.textContent ? n.textContent.length : 0;
      fp += `S${len}|`;
      const sheet = (
        /** @type {HTMLStyleElement} */
        n.sheet
      );
      const rules = sheet ? safeRules(sheet) : null;
      if (rules) totalRules += rules.length;
    } else {
      const href = n.getAttribute("href") || "";
      const media = n.getAttribute("media") || "all";
      fp += `L${href}|m:${media}|`;
      const sheet = (
        /** @type {HTMLLinkElement} */
        n.sheet
      );
      const rules = sheet ? safeRules(sheet) : null;
      if (rules) totalRules += rules.length;
    }
  }
  const ass = (
    /** @type {any} */
    doc.adoptedStyleSheets
  );
  fp += `ass:${Array.isArray(ass) ? ass.length : 0}|tr:${totalRules}`;
  return fp;
}
function sheetHasNeedles(sheet, needles, state) {
  const rules = safeRules(sheet);
  if (!rules) return false;
  for (let i = 0; i < rules.length; i++) {
    if (state.budget <= 0) return false;
    const rule = rules[i];
    const css = rule && rule.cssText ? rule.cssText : "";
    state.budget--;
    for (const k of needles) {
      if (css.includes(k)) return true;
    }
    if (rule && rule.cssRules && rule.cssRules.length) {
      for (let j = 0; j < rule.cssRules.length && state.budget > 0; j++) {
        const inner = rule.cssRules[j];
        const innerCss = inner && inner.cssText ? inner.cssText : "";
        state.budget--;
        for (const k of needles) {
          if (innerCss.includes(k)) return true;
        }
      }
    }
    if (state.budget <= 0) return false;
  }
  return false;
}
function shouldProcessPseudos(doc = document) {
  const fp = styleFingerprint(doc);
  const memo = __preflightMemo.get(doc);
  if (memo && memo.fingerprint === fp) return memo.result;
  const NEEDLES = [
    // double-colon
    "::before",
    "::after",
    "::first-letter",
    // single-colon robustness
    ":before",
    ":after",
    ":first-letter",
    // counters
    "counter(",
    "counters(",
    "counter-increment",
    "counter-reset"
  ];
  const styleEls = doc.querySelectorAll("style");
  for (let i = 0; i < styleEls.length; i++) {
    const t = styleEls[i].textContent || "";
    for (const k of NEEDLES) if (t.includes(k)) {
      __preflightMemo.set(doc, { fingerprint: fp, result: true });
      return true;
    }
  }
  const ass = (
    /** @type {any} */
    doc.adoptedStyleSheets
  );
  if (Array.isArray(ass) && ass.length) {
    const state = { budget: CSS_RULE_SCAN_BUDGET };
    try {
      for (const sheet of ass) {
        if (sheetHasNeedles(sheet, NEEDLES, state)) {
          __preflightMemo.set(doc, { fingerprint: fp, result: true });
          return true;
        }
      }
    } catch {
    }
  }
  {
    const nodes = doc.querySelectorAll('style,link[rel~="stylesheet"]');
    const state = { budget: CSS_RULE_SCAN_BUDGET };
    for (let i = 0; i < nodes.length && state.budget > 0; i++) {
      const n = nodes[i];
      let sheet = null;
      if (n.tagName === "STYLE") {
        sheet = /** @type {HTMLStyleElement} */
        n.sheet || null;
      } else {
        sheet = /** @type {HTMLLinkElement} */
        n.sheet || null;
      }
      if (sheet && sheetHasNeedles(sheet, NEEDLES, state)) {
        __preflightMemo.set(doc, { fingerprint: fp, result: true });
        return true;
      }
    }
  }
  if (doc.querySelector('[style*="counter("], [style*="counters("]')) {
    __preflightMemo.set(doc, { fingerprint: fp, result: true });
    return true;
  }
  __preflightMemo.set(doc, { fingerprint: fp, result: false });
  return false;
}
var __siblingCounters = /* @__PURE__ */ new WeakMap();
var __pseudoEpoch = -1;
function unquoteDoubleStrings2(s) {
  return (s || "").replace(/"([^"]*)"/g, "$1");
}
function collapseCssContent(raw) {
  if (!raw) return "";
  const tokens = [];
  const rx = /"([^"]*)"/g;
  let m;
  while (m = rx.exec(raw)) tokens.push(m[1]);
  if (tokens.length) return tokens.join("");
  return unquoteDoubleStrings2(raw);
}
function withSiblingOverrides(node, base) {
  const parent = node.parentElement;
  const map = parent ? __siblingCounters.get(parent) : null;
  if (!map) return base;
  return {
    get(n, name) {
      const v = base.get(n, name);
      const ov = map.get(name);
      return typeof ov === "number" ? Math.max(v, ov) : v;
    },
    getStack(n, name) {
      const s = base.getStack(n, name);
      if (!s.length) return s;
      const ov = map.get(name);
      if (typeof ov === "number") {
        const out = s.slice();
        out[out.length - 1] = Math.max(out[out.length - 1], ov);
        return out;
      }
      return s;
    }
  };
}
function deriveCounterCtxForPseudo(node, pseudoStyle, baseCtx) {
  const modStacks = /* @__PURE__ */ new Map();
  function parseListDecl(value) {
    const out = [];
    if (!value || value === "none") return out;
    for (const part of String(value).split(",")) {
      const toks = part.trim().split(/\s+/);
      const name = toks[0];
      const num = Number.isFinite(Number(toks[1])) ? Number(toks[1]) : void 0;
      if (name) out.push({ name, num });
    }
    return out;
  }
  const resets = parseListDecl(pseudoStyle?.counterReset);
  const incs = parseListDecl(pseudoStyle?.counterIncrement);
  function getStackDerived(name) {
    if (modStacks.has(name)) return modStacks.get(name).slice();
    let stack = baseCtx.getStack(node, name);
    stack = stack.length ? stack.slice() : [];
    const r = resets.find((x) => x.name === name);
    if (r) {
      const val = Number.isFinite(r.num) ? r.num : 0;
      stack = stack.length ? [...stack, val] : [val];
    }
    const inc = incs.find((x) => x.name === name);
    if (inc) {
      const by = Number.isFinite(inc.num) ? inc.num : 1;
      if (stack.length === 0) stack = [0];
      stack[stack.length - 1] += by;
    }
    modStacks.set(name, stack.slice());
    return stack;
  }
  return {
    get(_node, name) {
      const s = getStackDerived(name);
      return s.length ? s[s.length - 1] : 0;
    },
    getStack(_node, name) {
      return getStackDerived(name);
    },
    /** expone increments del pseudo para que el caller pueda propagar a hermanos */
    __incs: incs
  };
}
function resolvePseudoContentAndIncs(node, pseudo, baseCtx) {
  let ps;
  try {
    ps = getComputedStyle(node, pseudo);
  } catch {
  }
  const raw = ps?.content;
  if (!raw || raw === "none" || raw === "normal") return { text: "", incs: [] };
  const baseWithSiblings = withSiblingOverrides(node, baseCtx);
  const derived = deriveCounterCtxForPseudo(node, ps, baseWithSiblings);
  let resolved = hasCounters(raw) ? resolveCountersInContent(raw, node, derived) : raw;
  const text = collapseCssContent(resolved);
  return { text, incs: derived.__incs || [] };
}
async function inlinePseudoElements(source, clone, sessionCache, options) {
  if (!(source instanceof Element) || !(clone instanceof Element)) return;
  const doc = source.ownerDocument || document;
  if (!preflightWithFp(doc, sessionCache)) {
    return;
  }
  const epoch = cache?.session?.__counterEpoch ?? 0;
  if (__pseudoEpoch !== epoch) {
    __siblingCounters = /* @__PURE__ */ new WeakMap();
    if (sessionCache) sessionCache.__counterCtx = null;
    __pseudoEpoch = epoch;
  }
  if (!sessionCache.__counterCtx) {
    try {
      sessionCache.__counterCtx = buildCounterContext(source.ownerDocument || document);
    } catch {
    }
  }
  const counterCtx = sessionCache.__counterCtx;
  for (const pseudo of ["::before", "::after", "::first-letter"]) {
    try {
      const style = getStyle(source, pseudo);
      if (!style) continue;
      const isEmptyPseudo = style.content === "none" && style.backgroundImage === "none" && style.backgroundColor === "transparent" && (style.borderStyle === "none" || parseFloat(style.borderWidth) === 0) && (!style.transform || style.transform === "none") && style.display === "inline";
      if (isEmptyPseudo) continue;
      if (pseudo === "::first-letter") {
        const normal = getComputedStyle(source);
        const isMeaningful = style.color !== normal.color || style.fontSize !== normal.fontSize || style.fontWeight !== normal.fontWeight;
        if (!isMeaningful) continue;
        const textNode = Array.from(clone.childNodes).find(
          (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim().length > 0
        );
        if (!textNode) continue;
        const text = textNode.textContent;
        const match = text.match(/^([^\p{L}\p{N}\s]*[\p{L}\p{N}](?:['’])?)/u);
        const first = match?.[0];
        const rest = text.slice(first?.length || 0);
        if (!first || /[\uD800-\uDFFF]/.test(first)) continue;
        const span = document.createElement("span");
        span.textContent = first;
        span.dataset.snapdomPseudo = "::first-letter";
        const snapshot2 = snapshotComputedStyle(style);
        const key2 = getStyleKey(snapshot2, "span");
        sessionCache.styleMap.set(span, key2);
        const restNode = document.createTextNode(rest);
        clone.replaceChild(restNode, textNode);
        clone.insertBefore(span, restNode);
        continue;
      }
      const rawContent = style.content ?? "";
      const isNoExplicitContent = rawContent === "" || rawContent === "none" || rawContent === "normal";
      const { text: cleanContent, incs } = resolvePseudoContentAndIncs(source, pseudo, counterCtx);
      const bg = style.backgroundImage;
      const bgColor = style.backgroundColor;
      const fontFamily = style.fontFamily;
      const fontSize = parseInt(style.fontSize) || 32;
      const fontWeight = parseInt(style.fontWeight) || false;
      const color = style.color || "#000";
      const borderStyle = style.borderStyle;
      const borderWidth = parseFloat(style.borderWidth);
      const transform = style.transform;
      const isIconFont22 = isIconFont2(fontFamily);
      const hasExplicitContent = !isNoExplicitContent && cleanContent !== "";
      const hasBg = bg && bg !== "none";
      const hasBgColor = bgColor && bgColor !== "transparent" && bgColor !== "rgba(0, 0, 0, 0)";
      const hasBorder = borderStyle && borderStyle !== "none" && borderWidth > 0;
      const hasTransform = transform && transform !== "none";
      const shouldRender = hasExplicitContent || hasBg || hasBgColor || hasBorder || hasTransform;
      if (!shouldRender) {
        if (incs && incs.length && source.parentElement) {
          const map = __siblingCounters.get(source.parentElement) || /* @__PURE__ */ new Map();
          for (const { name } of incs) {
            if (!name) continue;
            const baseWithSibs = withSiblingOverrides(source, counterCtx);
            const derived = deriveCounterCtxForPseudo(source, getComputedStyle(source, pseudo), baseWithSibs);
            const finalVal = derived.get(source, name);
            map.set(name, finalVal);
          }
          __siblingCounters.set(source.parentElement, map);
        }
        continue;
      }
      const pseudoEl = document.createElement("span");
      pseudoEl.dataset.snapdomPseudo = pseudo;
      pseudoEl.style.pointerEvents = "none";
      const snapshot = snapshotComputedStyle(style);
      const key = getStyleKey(snapshot, "span");
      sessionCache.styleMap.set(pseudoEl, key);
      if (isIconFont22 && cleanContent && cleanContent.length === 1) {
        const { dataUrl, width: w, height: h } = await iconToImage(cleanContent, fontFamily, fontWeight, fontSize, color);
        const imgEl = document.createElement("img");
        imgEl.src = dataUrl;
        imgEl.style = `height:${fontSize}px;width:${w / h * fontSize}px;object-fit:contain;`;
        pseudoEl.appendChild(imgEl);
        clone.dataset.snapdomHasIcon = "true";
      } else if (cleanContent && cleanContent.startsWith("url(")) {
        const rawUrl = extractURL(cleanContent);
        if (rawUrl?.trim()) {
          try {
            const imgEl = document.createElement("img");
            const dataUrl = await snapFetch(safeEncodeURI(rawUrl), { as: "dataURL", useProxy: options.useProxy });
            imgEl.src = dataUrl.data;
            imgEl.style = `width:${fontSize}px;height:auto;object-fit:contain;`;
            pseudoEl.appendChild(imgEl);
          } catch (e) {
            console.error(`[snapdom] Error in pseudo ${pseudo} for`, source, e);
          }
        }
      } else if (!isIconFont22 && hasExplicitContent) {
        pseudoEl.textContent = cleanContent;
      }
      pseudoEl.style.backgroundImage = "none";
      if ("maskImage" in pseudoEl.style) pseudoEl.style.maskImage = "none";
      if ("webkitMaskImage" in pseudoEl.style) pseudoEl.style.webkitMaskImage = "none";
      try {
        pseudoEl.style.backgroundRepeat = style.backgroundRepeat;
        pseudoEl.style.backgroundSize = style.backgroundSize;
        if (style.backgroundPositionX && style.backgroundPositionY) {
          pseudoEl.style.backgroundPositionX = style.backgroundPositionX;
          pseudoEl.style.backgroundPositionY = style.backgroundPositionY;
        } else {
          pseudoEl.style.backgroundPosition = style.backgroundPosition;
        }
        pseudoEl.style.backgroundOrigin = style.backgroundOrigin;
        pseudoEl.style.backgroundClip = style.backgroundClip;
        pseudoEl.style.backgroundAttachment = style.backgroundAttachment;
        pseudoEl.style.backgroundBlendMode = style.backgroundBlendMode;
      } catch {
      }
      if (hasBg) {
        try {
          const bgSplits = splitBackgroundImage(bg);
          const newBgParts = await Promise.all(bgSplits.map(inlineSingleBackgroundEntry));
          pseudoEl.style.backgroundImage = newBgParts.join(", ");
        } catch (e) {
          console.warn(`[snapdom] Failed to inline background-image for ${pseudo}`, e);
        }
      }
      if (hasBgColor) pseudoEl.style.backgroundColor = bgColor;
      const hasContent2 = pseudoEl.childNodes.length > 0 || pseudoEl.textContent?.trim() !== "";
      const hasVisibleBox = hasContent2 || hasBg || hasBgColor || hasBorder || hasTransform;
      if (incs && incs.length && source.parentElement) {
        const map = __siblingCounters.get(source.parentElement) || /* @__PURE__ */ new Map();
        const baseWithSibs = withSiblingOverrides(source, counterCtx);
        const derived = deriveCounterCtxForPseudo(source, getComputedStyle(source, pseudo), baseWithSibs);
        for (const { name } of incs) {
          if (!name) continue;
          const finalVal = derived.get(source, name);
          map.set(name, finalVal);
        }
        __siblingCounters.set(source.parentElement, map);
      }
      if (!hasVisibleBox) continue;
      if (pseudo === "::before") {
        clone.insertBefore(pseudoEl, clone.firstChild);
      } else {
        clone.appendChild(pseudoEl);
      }
    } catch (e) {
      console.warn(`[snapdom] Failed to capture ${pseudo} for`, source, e);
    }
  }
  const sChildren = Array.from(source.children);
  const cChildren = Array.from(clone.children).filter((child) => !child.dataset.snapdomPseudo);
  for (let i = 0; i < Math.min(sChildren.length, cChildren.length); i++) {
    await inlinePseudoElements(sChildren[i], cChildren[i], sessionCache, options);
  }
}

// src/modules/svgDefs.js
function inlineExternalDefsAndSymbols(element, lookupRoot) {
  if (!element || !(element instanceof Element)) return;
  const doc = element.ownerDocument || document;
  const searchRoot = lookupRoot || doc;
  const svgRoots = element instanceof SVGSVGElement ? [element] : Array.from(element.querySelectorAll("svg"));
  if (svgRoots.length === 0) return;
  const URL_ID_RE = /url\(\s*#([^)]+)\)/g;
  const URL_ATTRS = [
    "fill",
    "stroke",
    "filter",
    "clip-path",
    "mask",
    "marker",
    "marker-start",
    "marker-mid",
    "marker-end"
  ];
  const cssEscape = (s) => window.CSS && CSS.escape ? CSS.escape(s) : s.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  const XLINK_NS = "http://www.w3.org/1999/xlink";
  const getHrefAttr = (el) => {
    if (!el || !el.getAttribute) return null;
    let href = el.getAttribute("href") || el.getAttribute("xlink:href") || (typeof el.getAttributeNS === "function" ? el.getAttributeNS(XLINK_NS, "href") : null);
    if (href) return href;
    const attrs = el.attributes;
    if (!attrs) return null;
    for (let i = 0; i < attrs.length; i++) {
      const a = attrs[i];
      if (!a || !a.name) continue;
      if (a.name === "href") return a.value;
      const idx = a.name.indexOf(":");
      if (idx !== -1 && a.name.slice(idx + 1) === "href") {
        return a.value;
      }
    }
    return null;
  };
  const globalExistingIds = new Set(
    Array.from(element.querySelectorAll("[id]")).map((n) => n.id)
  );
  const neededIds = /* @__PURE__ */ new Set();
  let sawAnyReference = false;
  const addUrlIdsFromValue = (val, queueForResolve = null) => {
    if (!val) return;
    URL_ID_RE.lastIndex = 0;
    let m;
    while (m = URL_ID_RE.exec(val)) {
      sawAnyReference = true;
      const id = (m[1] || "").trim();
      if (!id) continue;
      if (!globalExistingIds.has(id)) {
        neededIds.add(id);
        if (queueForResolve && !queueForResolve.has(id)) {
          queueForResolve.add(id);
        }
      }
    }
  };
  const collectReferencesInSvg = (rootSvg) => {
    const uses = rootSvg.querySelectorAll("use");
    for (const u of uses) {
      const href = getHrefAttr(u);
      if (!href || !href.startsWith("#")) continue;
      sawAnyReference = true;
      const id = href.slice(1).trim();
      if (id && !globalExistingIds.has(id)) neededIds.add(id);
    }
    const query = '*[style*="url("],*[fill^="url("], *[stroke^="url("],*[filter^="url("],*[clip-path^="url("],*[mask^="url("],*[marker^="url("],*[marker-start^="url("],*[marker-mid^="url("],*[marker-end^="url("]';
    const candidates = rootSvg.querySelectorAll(query);
    for (const el of candidates) {
      addUrlIdsFromValue(el.getAttribute("style") || "");
      for (const a of URL_ATTRS) addUrlIdsFromValue(el.getAttribute(a));
    }
  };
  for (const svg of svgRoots) collectReferencesInSvg(svg);
  if (!sawAnyReference) return;
  let defsHost = element.querySelector("svg.inline-defs-container");
  if (!defsHost) {
    defsHost = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
    defsHost.classList.add("inline-defs-container");
    defsHost.setAttribute("aria-hidden", "true");
    defsHost.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
    element.insertBefore(defsHost, element.firstChild || null);
  }
  let localDefs = defsHost.querySelector("defs") || null;
  const findGlobalById = (id) => {
    if (!id) return null;
    if (globalExistingIds.has(id)) return null;
    const esc = cssEscape(id);
    const tryFind = (sel) => {
      const el = searchRoot.querySelector(sel);
      return el && !element.contains(el) ? el : null;
    };
    return tryFind(`svg defs > *#${esc}`) || tryFind(`svg > symbol#${esc}`) || tryFind(`*#${esc}`);
  };
  if (!neededIds.size) return;
  const queued = new Set(neededIds);
  const inlined = /* @__PURE__ */ new Set();
  while (queued.size) {
    const id = queued.values().next().value;
    queued.delete(id);
    if (!id || globalExistingIds.has(id) || inlined.has(id)) continue;
    const source = findGlobalById(id);
    if (!source) {
      inlined.add(id);
      continue;
    }
    if (!localDefs) {
      localDefs = doc.createElementNS("http://www.w3.org/2000/svg", "defs");
      defsHost.appendChild(localDefs);
    }
    const clone = source.cloneNode(true);
    if (!clone.id) clone.setAttribute("id", id);
    localDefs.appendChild(clone);
    inlined.add(id);
    globalExistingIds.add(id);
    const walk = [clone, ...clone.querySelectorAll("*")];
    for (const node of walk) {
      const href = getHrefAttr(node);
      if (href && href.startsWith("#")) {
        const ref = href.slice(1).trim();
        if (ref && !globalExistingIds.has(ref) && !inlined.has(ref)) {
          queued.add(ref);
        }
      }
      const style = node.getAttribute?.("style") || "";
      if (style) addUrlIdsFromValue(style, queued);
      for (const a of URL_ATTRS) {
        const v = node.getAttribute?.(a);
        if (v) addUrlIdsFromValue(v, queued);
      }
    }
  }
}

// src/core/prepare.js
init_cache();

// src/modules/changeCSS.js
function freezeSticky(originalRoot, cloneRoot) {
  if (!originalRoot || !cloneRoot) return;
  const scrollTop = originalRoot.scrollTop || 0;
  if (!scrollTop) return;
  if (getComputedStyle(cloneRoot).position === "static") {
    cloneRoot.style.position = "relative";
  }
  const rootRect = originalRoot.getBoundingClientRect();
  const viewportH = originalRoot.clientHeight;
  const PH_ATTR = "data-snap-ph";
  const walker = document.createTreeWalker(originalRoot, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) {
    const el = (
      /** @type {HTMLElement} */
      walker.currentNode
    );
    const cs = getComputedStyle(el);
    const pos = cs.position;
    if (pos !== "sticky" && pos !== "-webkit-sticky") continue;
    const topInit = _toPx(cs.top);
    const bottomInit = _toPx(cs.bottom);
    if (topInit == null && bottomInit == null) continue;
    const path = _pathOf(el, originalRoot);
    const cloneEl = _findByPathIgnoringPlaceholders(cloneRoot, path, PH_ATTR);
    if (!cloneEl) continue;
    const elRect = el.getBoundingClientRect();
    const widthPx = elRect.width;
    const heightPx = elRect.height;
    const leftPx = elRect.left - rootRect.left;
    if (!(widthPx > 0 && heightPx > 0)) continue;
    if (!Number.isFinite(leftPx)) continue;
    const topAbsPx = topInit != null ? topInit + scrollTop : scrollTop + (viewportH - heightPx - /** bottomInit non-null */
    bottomInit);
    if (!Number.isFinite(topAbsPx)) continue;
    const zParsed = Number.parseInt(cs.zIndex, 10);
    const hasZ = Number.isFinite(zParsed);
    const overlayZ = hasZ ? Math.max(zParsed, 1) + 1 : 2;
    const placeholderZ = hasZ ? zParsed - 1 : 0;
    const ph = cloneEl.cloneNode(false);
    ph.setAttribute(PH_ATTR, "1");
    ph.style.position = "sticky";
    ph.style.left = `${leftPx}px`;
    ph.style.top = `${topAbsPx}px`;
    ph.style.width = `${widthPx}px`;
    ph.style.height = `${heightPx}px`;
    ph.style.visibility = "hidden";
    ph.style.zIndex = String(placeholderZ);
    ph.style.overflow = "hidden";
    ph.style.background = "transparent";
    ph.style.boxShadow = "none";
    ph.style.filter = "none";
    cloneEl.parentElement?.insertBefore(ph, cloneEl);
    cloneEl.style.position = "absolute";
    cloneEl.style.left = `${leftPx}px`;
    cloneEl.style.top = `${topAbsPx}px`;
    cloneEl.style.bottom = "auto";
    cloneEl.style.zIndex = String(overlayZ);
    cloneEl.style.pointerEvents = "none";
  }
}
function _toPx(v) {
  if (!v || v === "auto") return null;
  const n = Number.parseFloat(v);
  return Number.isFinite(n) ? n : null;
}
function _pathOf(el, root) {
  const path = [];
  for (let cur = el; cur && cur !== root; ) {
    const p = cur.parentElement;
    if (!p) break;
    path.push(Array.prototype.indexOf.call(p.children, cur));
    cur = p;
  }
  return path.reverse();
}
function _findByPathIgnoringPlaceholders(root, path, phAttr) {
  let cur = root;
  for (let i = 0; i < path.length; i++) {
    const kids = _childrenWithoutPlaceholders(cur, phAttr);
    cur = /** @type {HTMLElement|undefined} */
    kids[path[i]];
    if (!cur) return null;
  }
  return cur instanceof HTMLElement ? cur : null;
}
function _childrenWithoutPlaceholders(el, phAttr) {
  const out = [];
  const ch = el.children;
  for (let i = 0; i < ch.length; i++) {
    const c = ch[i];
    if (!c.hasAttribute(phAttr)) out.push(c);
  }
  return out;
}

// src/utils/prepare.helpers.js
function stabilizeLayout(element) {
  const style = getComputedStyle(element);
  const outlineStyle = style.outlineStyle;
  const outlineWidth = style.outlineWidth;
  const borderStyle = style.borderStyle;
  const borderWidth = style.borderWidth;
  const outlineVisible = outlineStyle !== "none" && parseFloat(outlineWidth) > 0;
  const borderAbsent = borderStyle === "none" || parseFloat(borderWidth) === 0;
  if (outlineVisible && borderAbsent) {
    element.style.border = `${outlineWidth} solid transparent`;
  }
}

// src/core/prepare.js
async function prepareClone(element, options = {}) {
  const sessionCache = {
    styleMap: cache.session.styleMap,
    styleCache: cache.session.styleCache,
    nodeMap: cache.session.nodeMap
  };
  let clone;
  let classCSS = "";
  let shadowScopedCSS = "";
  stabilizeLayout(element);
  try {
    inlineExternalDefsAndSymbols(element);
  } catch (e) {
    console.warn("inlineExternal defs or symbol failed:", e);
  }
  try {
    clone = await deepClone(element, sessionCache, options, element);
  } catch (e) {
    console.warn("deepClone failed:", e);
    throw e;
  }
  try {
    await inlinePseudoElements(element, clone, sessionCache, options);
  } catch (e) {
    console.warn("inlinePseudoElements failed:", e);
  }
  await resolveBlobUrlsInTree(clone);
  try {
    const styleNodes = clone.querySelectorAll("style[data-sd]");
    for (const s of styleNodes) {
      shadowScopedCSS += s.textContent || "";
      s.remove();
    }
  } catch {
  }
  const keyToClass = generateCSSClasses(sessionCache.styleMap);
  classCSS = Array.from(keyToClass.entries()).map(([key, className]) => `.${className}{${key}}`).join("");
  classCSS = shadowScopedCSS + classCSS;
  for (const [node, key] of sessionCache.styleMap.entries()) {
    if (node.tagName === "STYLE") continue;
    if (node.getRootNode && node.getRootNode() instanceof ShadowRoot) {
      node.setAttribute("style", key.replace(/;/g, "; "));
      continue;
    }
    const className = keyToClass.get(key);
    if (className) node.classList.add(className);
    const bgImage = node.style?.backgroundImage;
    const hasIcon = node.dataset?.snapdomHasIcon;
    if (bgImage && bgImage !== "none") node.style.backgroundImage = bgImage;
    if (hasIcon) {
      node.style.verticalAlign = "middle";
      node.style.display = "inline";
    }
  }
  for (const [cloneNode, originalNode] of sessionCache.nodeMap.entries()) {
    const scrollX = originalNode.scrollLeft;
    const scrollY = originalNode.scrollTop;
    const hasScroll = scrollX || scrollY;
    if (hasScroll && cloneNode instanceof HTMLElement) {
      cloneNode.style.overflow = "hidden";
      cloneNode.style.scrollbarWidth = "none";
      cloneNode.style.msOverflowStyle = "none";
      const inner = document.createElement("div");
      inner.style.transform = `translate(${-scrollX}px, ${-scrollY}px)`;
      inner.style.willChange = "transform";
      inner.style.display = "inline-block";
      inner.style.width = "100%";
      while (cloneNode.firstChild) {
        inner.appendChild(cloneNode.firstChild);
      }
      cloneNode.appendChild(inner);
    }
  }
  const contentRoot = clone instanceof HTMLElement && clone.firstElementChild instanceof HTMLElement ? clone.firstElementChild : clone;
  freezeSticky(element, contentRoot);
  if (element === sessionCache.nodeMap.get(clone)) {
    const computed = sessionCache.styleCache.get(element) || window.getComputedStyle(element);
    sessionCache.styleCache.set(element, computed);
    const transform = stripTranslate(computed.transform);
    clone.style.margin = "0";
    clone.style.top = "auto";
    clone.style.left = "auto";
    clone.style.right = "auto";
    clone.style.bottom = "auto";
    clone.style.animation = "none";
    clone.style.transition = "none";
    clone.style.willChange = "auto";
    clone.style.float = "none";
    clone.style.clear = "none";
    clone.style.transform = transform || "";
  }
  for (const [cloneNode, originalNode] of sessionCache.nodeMap.entries()) {
    if (originalNode.tagName === "PRE") {
      cloneNode.style.marginTop = "0";
      cloneNode.style.marginBlockStart = "0";
    }
  }
  return { clone, classCSS, styleCache: sessionCache.styleCache };
}

// src/modules/images.js
init_snapFetch();
function extractImageDimensions(img) {
  const dsW = parseInt(img.dataset?.snapdomWidth || "", 10) || 0;
  const dsH = parseInt(img.dataset?.snapdomHeight || "", 10) || 0;
  const attrW = parseInt(img.getAttribute("width") || "", 10) || 0;
  const attrH = parseInt(img.getAttribute("height") || "", 10) || 0;
  const styleW = parseFloat(img.style?.width || "") || 0;
  const styleH = parseFloat(img.style?.height || "") || 0;
  const w = dsW || styleW || attrW || img.width || img.naturalWidth || 100;
  const h = dsH || styleH || attrH || img.height || img.naturalHeight || 100;
  return { width: w, height: h };
}
async function inlineImages(clone, options = {}) {
  const imgs = Array.from(clone.querySelectorAll("img"));
  const processImg = async (img) => {
    if (!img.getAttribute("src")) {
      const eff = img.currentSrc || img.src || "";
      if (eff) img.setAttribute("src", eff);
    }
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
    const src = img.src || "";
    if (!src) return;
    const r = await snapFetch(src, { as: "dataURL", useProxy: options.useProxy });
    if (r.ok && typeof r.data === "string" && r.data.startsWith("data:")) {
      img.src = r.data;
      if (!img.width) img.width = img.naturalWidth || 100;
      if (!img.height) img.height = img.naturalHeight || 100;
      return;
    }
    const { width: fbW, height: fbH } = extractImageDimensions(img);
    const { fallbackURL } = options || {};
    if (fallbackURL) {
      try {
        const fallbackUrl = typeof fallbackURL === "function" ? await fallbackURL({ width: fbW, height: fbH, src, element: img }) : fallbackURL;
        if (fallbackUrl) {
          const fallbackData = await snapFetch(fallbackUrl, { as: "dataURL", useProxy: options.useProxy });
          img.src = fallbackData.data;
          if (!img.width) img.width = fbW;
          if (!img.height) img.height = fbH;
          return;
        }
      } catch {
      }
    }
    if (options.placeholders !== false) {
      const fallback = document.createElement("div");
      fallback.style.cssText = [
        `width:${fbW}px`,
        `height:${fbH}px`,
        "background:#ccc",
        "display:inline-block",
        "text-align:center",
        `line-height:${fbH}px`,
        "color:#666",
        "font-size:12px",
        "overflow:hidden"
      ].join(";");
      fallback.textContent = "img";
      img.replaceWith(fallback);
    } else {
      const spacer = document.createElement("div");
      spacer.style.cssText = `display:inline-block;width:${fbW}px;height:${fbH}px;visibility:hidden;`;
      img.replaceWith(spacer);
    }
  };
  for (let i = 0; i < imgs.length; i += 4) {
    const group = imgs.slice(i, i + 4).map(processImg);
    await Promise.allSettled(group);
  }
}

// src/modules/background.js
init_utils();
async function inlineBackgroundImages(source, clone, styleCache, options = {}) {
  const queue = [[source, clone]];
  const URL_PROPS = [
    "background-image",
    // Mask shorthands & images (both standard and WebKit)
    "mask",
    "mask-image",
    "-webkit-mask",
    "-webkit-mask-image",
    // Mask sources (rare, but keep)
    "mask-source",
    "mask-box-image-source",
    "mask-border-source",
    "-webkit-mask-box-image-source",
    // Border image
    "border-image",
    "border-image-source"
  ];
  const MASK_LAYOUT_PROPS = [
    "mask-position",
    "mask-size",
    "mask-repeat",
    // WebKit variants
    "-webkit-mask-position",
    "-webkit-mask-size",
    "-webkit-mask-repeat",
    // Extra (optional but helpful across engines)
    "mask-origin",
    "mask-clip",
    "-webkit-mask-origin",
    "-webkit-mask-clip",
    // Some engines expose X/Y position separately:
    "-webkit-mask-position-x",
    "-webkit-mask-position-y"
  ];
  const BG_LAYOUT_PROPS = [
    "background-position",
    "background-position-x",
    "background-position-y",
    "background-size",
    "background-repeat",
    "background-origin",
    "background-clip",
    "background-attachment",
    "background-blend-mode"
  ];
  const BORDER_AUX_PROPS = [
    "border-image-slice",
    "border-image-width",
    "border-image-outset",
    "border-image-repeat"
  ];
  while (queue.length) {
    const [srcNode, cloneNode] = queue.shift();
    const style = styleCache.get(srcNode) || getStyle(srcNode);
    if (!styleCache.has(srcNode)) styleCache.set(srcNode, style);
    const hasBorderImage = (() => {
      const bi = style.getPropertyValue("border-image");
      const bis = style.getPropertyValue("border-image-source");
      return bi && bi !== "none" || bis && bis !== "none";
    })();
    for (const prop of BG_LAYOUT_PROPS) {
      const v = style.getPropertyValue(prop);
      if (!v) continue;
      cloneNode.style.setProperty(prop, v);
    }
    for (const prop of URL_PROPS) {
      const val = style.getPropertyValue(prop);
      if (!val || val === "none") continue;
      const splits = splitBackgroundImage(val);
      const inlined = await Promise.all(
        splits.map((entry) => inlineSingleBackgroundEntry(entry, options))
      );
      if (inlined.some((p) => p && p !== "none" && !/^url\(undefined/.test(p))) {
        cloneNode.style.setProperty(prop, inlined.join(", "));
      }
    }
    for (const prop of MASK_LAYOUT_PROPS) {
      const val = style.getPropertyValue(prop);
      if (!val || val === "initial") continue;
      cloneNode.style.setProperty(prop, val);
    }
    if (hasBorderImage) {
      for (const prop of BORDER_AUX_PROPS) {
        const val = style.getPropertyValue(prop);
        if (!val || val === "initial") continue;
        cloneNode.style.setProperty(prop, val);
      }
    }
    const sChildren = Array.from(srcNode.children);
    const cChildren = Array.from(cloneNode.children).filter((el) => !(el.dataset && el.dataset.snapdomPseudo));
    for (let i = 0; i < Math.min(sChildren.length, cChildren.length); i++) {
      queue.push([sChildren[i], cChildren[i]]);
    }
  }
}

// src/core/capture.js
init_utils();
init_cache();

// src/modules/lineClamp.js
function lineClamp(el) {
  if (!el) return () => {
  };
  const lines = getClamp(el);
  if (lines <= 0) return () => {
  };
  if (!isPlainTextContainer(el)) return () => {
  };
  const cs = getComputedStyle(el);
  const targetH = Math.round(usedLineHeightPx(cs) * lines + vpad(cs));
  const original = el.textContent ?? "";
  const prevText = original;
  if (el.scrollHeight <= targetH + 0.5) {
    return () => {
    };
  }
  let lo = 0, hi = original.length, best = -1;
  while (lo <= hi) {
    const mid = lo + hi >> 1;
    el.textContent = original.slice(0, mid) + "\u2026";
    if (el.scrollHeight <= targetH + 0.5) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  el.textContent = (best >= 0 ? original.slice(0, best) : "") + "\u2026";
  return () => {
    el.textContent = prevText;
  };
}
function getClamp(el) {
  const cs = getComputedStyle(el);
  let v = cs.getPropertyValue("-webkit-line-clamp") || cs.getPropertyValue("line-clamp");
  v = (v || "").trim();
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}
function usedLineHeightPx(cs) {
  const lh = (cs.lineHeight || "").trim();
  const fs = parseFloat(cs.fontSize) || 16;
  if (!lh || lh === "normal") return Math.round(fs * 1.2);
  if (lh.endsWith("px")) return parseFloat(lh);
  if (/^\d+(\.\d+)?$/.test(lh)) return Math.round(parseFloat(lh) * fs);
  if (lh.endsWith("%")) return Math.round(parseFloat(lh) / 100 * fs);
  return Math.round(fs * 1.2);
}
function vpad(cs) {
  return (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
}
function isPlainTextContainer(el) {
  if (el.childElementCount > 0) return false;
  return Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE);
}

// src/core/plugins.js
var __plugins = [];
function normalizePlugin(spec) {
  if (!spec) return null;
  if (Array.isArray(spec)) {
    const [factory, options] = spec;
    return typeof factory === "function" ? factory(options) : factory;
  }
  if (typeof spec === "object" && "plugin" in spec) {
    const { plugin, options } = spec;
    return typeof plugin === "function" ? plugin(options) : plugin;
  }
  if (typeof spec === "function") return spec();
  return spec;
}
function registerPlugins(...defs) {
  const flat = defs.flat();
  for (const d of flat) {
    const inst = normalizePlugin(d);
    if (!inst) continue;
    if (!__plugins.some((p) => p && p.name && inst.name && p.name === inst.name)) {
      __plugins.push(inst);
    }
  }
}
function getContextPlugins(context) {
  const arr = context && Array.isArray(context.plugins) ? context.plugins : __plugins;
  return arr || __plugins;
}
async function runHook(name, context, payload) {
  let acc = payload;
  const list = getContextPlugins(context);
  for (const p of list) {
    const fn = p && typeof p[name] === "function" ? p[name] : null;
    if (!fn) continue;
    const out = await fn(context, acc);
    if (typeof out !== "undefined") acc = out;
  }
  return acc;
}
async function runAll(name, context, payload) {
  const outs = [];
  const list = getContextPlugins(context);
  for (const p of list) {
    const fn = p && typeof p[name] === "function" ? p[name] : null;
    if (!fn) continue;
    const out = await fn(context, payload);
    if (typeof out !== "undefined") outs.push(out);
  }
  return outs;
}
function mergePlugins(localDefs) {
  const out = [];
  if (Array.isArray(localDefs)) {
    for (const d of localDefs) {
      const inst = normalizePlugin(d);
      if (!inst || !inst.name) continue;
      const i = out.findIndex((x) => x && x.name === inst.name);
      if (i >= 0) out.splice(i, 1);
      out.push(inst);
    }
  }
  for (const g of __plugins) {
    if (g && g.name && !out.some((x) => x.name === g.name)) {
      out.push(g);
    }
  }
  return Object.freeze(out);
}
function attachSessionPlugins(context, localDefs, force = false) {
  if (!context || context.plugins && !force) return context;
  context.plugins = mergePlugins(localDefs);
  return context;
}

// src/utils/capture.helpers.js
function stripRootShadows(originalEl, cloneRoot) {
  if (!originalEl || !cloneRoot || !cloneRoot.style) return;
  const cs = getComputedStyle(originalEl);
  try {
    cloneRoot.style.boxShadow = "none";
  } catch {
  }
  try {
    cloneRoot.style.textShadow = "none";
  } catch {
  }
  try {
    cloneRoot.style.outline = "none";
  } catch {
  }
  const f = cs.filter || "";
  const cleaned = f.replace(/\bblur\([^()]*\)\s*/gi, "").replace(/\bdrop-shadow\([^()]*\)\s*/gi, "").trim().replace(/\s+/g, " ");
  try {
    cloneRoot.style.filter = cleaned.length ? cleaned : "none";
  } catch {
  }
}
function removeAllComments(root) {
  const it = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
  const toRemove = [];
  while (it.nextNode()) toRemove.push(it.currentNode);
  for (const n of toRemove) n.remove();
}
function sanitizeAttributesForXHTML(root, opts = {}) {
  const { stripFrameworkDirectives = true } = opts;
  const ALLOWED_PREFIXES = /* @__PURE__ */ new Set(["xml", "xlink"]);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) {
    const el = walker.currentNode;
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name;
      if (name.includes("@")) {
        el.removeAttribute(name);
        continue;
      }
      if (name.includes(":")) {
        const prefix = name.split(":", 1)[0];
        if (!ALLOWED_PREFIXES.has(prefix)) {
          el.removeAttribute(name);
          continue;
        }
      }
      if (!stripFrameworkDirectives) continue;
      if (name.startsWith("x-") || // Alpine
      name.startsWith("v-") || // Vue
      name.startsWith(":") || // Vue/Alpine shorthand
      name.startsWith("on:") || // Svelte
      name.startsWith("bind:") || // Svelte
      name.startsWith("let:") || // Svelte
      name.startsWith("class:")) {
        el.removeAttribute(name);
        continue;
      }
    }
  }
}
function sanitizeCloneForXHTML(root, opts = {}) {
  if (!root) return;
  sanitizeAttributesForXHTML(root, opts);
  removeAllComments(root);
}
function authorHasExplicitSize(el) {
  try {
    const s = el.getAttribute?.("style") || "";
    return /\b(height|width|block-size|inline-size)\s*:/.test(s);
  } catch {
    return false;
  }
}
function isReplacedElement(el) {
  return el instanceof HTMLImageElement || el instanceof HTMLCanvasElement || el instanceof HTMLVideoElement || el instanceof HTMLIFrameElement || el instanceof SVGElement || el instanceof HTMLObjectElement || el instanceof HTMLEmbedElement;
}
function shouldShrinkBox(srcEl, cs) {
  if (!(srcEl instanceof Element)) return false;
  if (authorHasExplicitSize(srcEl)) return false;
  if (isReplacedElement(srcEl)) return false;
  const pos = cs.position;
  if (pos === "absolute" || pos === "fixed" || pos === "sticky") return false;
  const disp = cs.display || "";
  if (disp.includes("flex") || disp.includes("grid") || disp.startsWith("table")) return false;
  if (cs.transform && cs.transform !== "none") return false;
  return true;
}
function shrinkAutoSizeBoxes(sourceRoot, cloneRoot, styleCache = /* @__PURE__ */ new Map()) {
  function walk(src, cln) {
    if (!(src instanceof Element) || !(cln instanceof Element)) return;
    const lostKids = src.childElementCount > cln.childElementCount;
    const cs = styleCache.get(src) || getComputedStyle(src);
    if (!styleCache.has(src)) styleCache.set(src, cs);
    if (lostKids && shouldShrinkBox(src, cs)) {
      if (!cln.style.height) cln.style.height = "auto";
      if (!cln.style.width) cln.style.width = "auto";
      cln.style.removeProperty("block-size");
      cln.style.removeProperty("inline-size");
      if (!cln.style.minHeight) cln.style.minHeight = "0";
      if (!cln.style.minWidth) cln.style.minWidth = "0";
      if (!cln.style.maxHeight) cln.style.maxHeight = "none";
      if (!cln.style.maxWidth) cln.style.maxWidth = "none";
      const oy = cs.overflowY || cs.overflowBlock || "visible";
      const ox = cs.overflowX || cs.overflowInline || "visible";
      if (oy !== "visible" || ox !== "visible") {
        cln.style.overflow = "visible";
      }
    }
    const sKids = Array.from(src.children);
    const cKids = Array.from(cln.children);
    for (let i = 0; i < Math.min(sKids.length, cKids.length); i++) {
      walk(sKids[i], cKids[i]);
    }
  }
  walk(sourceRoot, cloneRoot);
}
function isInNormalFlow(el) {
  const cs = getComputedStyle(el);
  if (cs.display === "none") return false;
  if (cs.position === "absolute" || cs.position === "fixed" || cs.position === "sticky") return false;
  if ((cs.cssFloat || cs.float || "none") !== "none") return false;
  if (cs.transform && cs.transform !== "none") return false;
  return true;
}
function willBeExcluded(el, options) {
  if (!(el instanceof Element)) return false;
  if (el.getAttribute("data-capture") === "exclude" && options?.excludeMode === "remove") return true;
  if (Array.isArray(options?.exclude)) {
    for (const sel of options.exclude) {
      try {
        if (el.matches(sel)) return options.excludeMode === "remove";
      } catch {
      }
    }
  }
  return false;
}
function estimateKeptHeight(container, options) {
  const csC = getComputedStyle(container);
  const rC = container.getBoundingClientRect();
  let minTop = Infinity;
  let maxBottom = -Infinity;
  let found = false;
  const kids = Array.from(container.children);
  for (const k of kids) {
    if (willBeExcluded(k, options)) continue;
    if (!isInNormalFlow(k)) continue;
    const rk = k.getBoundingClientRect();
    const top = rk.top - rC.top;
    const bottom = rk.bottom - rC.top;
    if (bottom <= top) continue;
    if (top < minTop) minTop = top;
    if (bottom > maxBottom) maxBottom = bottom;
    found = true;
  }
  const contentSpan = found ? Math.max(0, maxBottom - minTop) : 0;
  const bt = parseFloat(csC.borderTopWidth) || 0;
  const bb = parseFloat(csC.borderBottomWidth) || 0;
  const pt = parseFloat(csC.paddingTop) || 0;
  const pb = parseFloat(csC.paddingBottom) || 0;
  return bt + bb + pt + pb + contentSpan;
}
var limitDecimals = (v, n = 3) => Number.isFinite(v) ? Math.round(v * 10 ** n) / 10 ** n : v;

// src/utils/transforms.helpers.js
function parseBoxShadow(cs) {
  const v = cs.boxShadow || "";
  if (!v || v === "none") return { top: 0, right: 0, bottom: 0, left: 0 };
  const parts = v.split(/\),(?=(?:[^()]*\([^()]*\))*[^()]*$)/).map((s) => s.trim());
  let t = 0, r = 0, b2 = 0, l = 0;
  for (const part of parts) {
    const nums = part.match(/-?\d+(\.\d+)?px/g)?.map((n) => parseFloat(n)) || [];
    if (nums.length < 2) continue;
    const [ox2, oy2, blur = 0, spread = 0] = nums;
    const extX = Math.abs(ox2) + blur + spread;
    const extY = Math.abs(oy2) + blur + spread;
    r = Math.max(r, extX + Math.max(ox2, 0));
    l = Math.max(l, extX + Math.max(-ox2, 0));
    b2 = Math.max(b2, extY + Math.max(oy2, 0));
    t = Math.max(t, extY + Math.max(-oy2, 0));
  }
  return { top: Math.ceil(t), right: Math.ceil(r), bottom: Math.ceil(b2), left: Math.ceil(l) };
}
function parseFilterBlur(cs) {
  const m = (cs.filter || "").match(/blur\(\s*([0-9.]+)px\s*\)/);
  const b2 = m ? Math.ceil(parseFloat(m[1]) || 0) : 0;
  return { top: b2, right: b2, bottom: b2, left: b2 };
}
function parseOutline(cs) {
  if ((cs.outlineStyle || "none") === "none") return { top: 0, right: 0, bottom: 0, left: 0 };
  const w2 = Math.ceil(parseFloat(cs.outlineWidth || "0") || 0);
  return { top: w2, right: w2, bottom: w2, left: w2 };
}
function parseFilterDropShadows(cs) {
  const raw = `${cs.filter || ""} ${cs.webkitFilter || ""}`.trim();
  if (!raw || raw === "none") {
    return { bleed: { top: 0, right: 0, bottom: 0, left: 0 }, has: false };
  }
  const tokens = raw.match(/drop-shadow\((?:[^()]|\([^()]*\))*\)/gi) || [];
  let t = 0, r = 0, b = 0, l = 0;
  let found = false;
  for (const tok of tokens) {
    found = true;
    const nums = tok.match(/-?\d+(?:\.\d+)?px/gi)?.map((v) => parseFloat(v)) || [];
    const [ox = 0, oy = 0, blur = 0] = nums;
    const extX = Math.abs(ox) + blur;
    const extY = Math.abs(oy) + blur;
    r = Math.max(r, extX + Math.max(ox, 0));
    l = Math.max(l, extX + Math.max(-ox, 0));
    b = Math.max(b, extY + Math.max(oy, 0));
    t = Math.max(t, extY + Math.max(-oy, 0));
  }
  return {
    bleed: {
      top: limitDecimals(t),
      right: limitDecimals(r),
      bottom: limitDecimals(b),
      left: limitDecimals(l)
    },
    has: found
  };
}
function normalizeRootTransforms(originalEl, cloneRoot) {
  if (!originalEl || !cloneRoot || !cloneRoot.style) return null;
  const cs = getComputedStyle(originalEl);
  try {
    cloneRoot.style.transformOrigin = "0 0";
  } catch {
  }
  try {
    if ("translate" in cloneRoot.style) cloneRoot.style.translate = "none";
    if ("rotate" in cloneRoot.style) cloneRoot.style.rotate = "none";
  } catch {
  }
  const tr = cs.transform || "none";
  if (!tr || tr === "none") {
    try {
      const M = matrixFromComputed(originalEl);
      if (M.a === 1 && M.b === 0 && M.c === 0 && M.d === 1) {
        cloneRoot.style.transform = "none";
        return { a: 1, b: 0, c: 0, d: 1 };
      }
    } catch {
    }
  }
  const m2d = tr.match(/^matrix\(\s*([^)]+)\)$/i);
  if (m2d) {
    const nums = m2d[1].split(",").map((v) => parseFloat(v.trim()));
    if (nums.length === 6 && nums.every(Number.isFinite)) {
      const [a, b, c, d] = nums;
      const scaleX = Math.sqrt(a * a + b * b) || 0;
      let a1 = 0, b1 = 0, shear = 0, c2 = 0, d2 = 0, scaleY = 0;
      if (scaleX > 0) {
        a1 = a / scaleX;
        b1 = b / scaleX;
        shear = a1 * c + b1 * d;
        c2 = c - a1 * shear;
        d2 = d - b1 * shear;
        scaleY = Math.sqrt(c2 * c2 + d2 * d2) || 0;
        if (scaleY > 0) shear = shear / scaleY;
        else shear = 0;
      }
      const aP = scaleX;
      const bP = 0;
      const cP = shear * scaleY;
      const dP = scaleY;
      try {
        cloneRoot.style.transform = `matrix(${aP}, ${bP}, ${cP}, ${dP}, 0, 0)`;
      } catch {
      }
      return { a: aP, b: bP, c: cP, d: dP };
    }
  }
  try {
    const legacy = String(tr).trim();
    cloneRoot.style.transform = legacy + " translate(0px, 0px) rotate(0deg)";
    return null;
  } catch {
    return null;
  }
}
function bboxWithOriginFull(w2, h2, M, ox2, oy2) {
  const a2 = M.a, b2 = M.b, c2 = M.c, d2 = M.d, e2 = M.e || 0, f2 = M.f || 0;
  function pt(x, y) {
    let X = x - ox2, Y = y - oy2;
    let X2 = a2 * X + c2 * Y, Y2 = b2 * X + d2 * Y;
    X2 += ox2 + e2;
    Y2 += oy2 + f2;
    return [X2, Y2];
  }
  const P = [pt(0, 0), pt(w2, 0), pt(0, h2), pt(w2, h2)];
  let minX2 = Infinity, minY2 = Infinity, maxX2 = -Infinity, maxY2 = -Infinity;
  for (const [X, Y] of P) {
    if (X < minX2) minX2 = X;
    if (Y < minY2) minY2 = Y;
    if (X > maxX2) maxX2 = X;
    if (Y > maxY2) maxY2 = Y;
  }
  return { minX: minX2, minY: minY2, maxX: maxX2, maxY: maxY2, width: maxX2 - minX2, height: maxY2 - minY2 };
}
function parseTransformOriginPx(cs, w, h) {
  const raw = (cs.transformOrigin || "0 0").trim().split(/\s+/);
  const [oxRaw, oyRaw] = [raw[0] || "0", raw[1] || "0"];
  const toPx = (token, size) => {
    const t = token.toLowerCase();
    if (t === "left" || t === "top") return 0;
    if (t === "center") return size / 2;
    if (t === "right") return size;
    if (t === "bottom") return size;
    if (t.endsWith("px")) return parseFloat(t) || 0;
    if (t.endsWith("%")) return (parseFloat(t) || 0) * size / 100;
    if (/^-?\d+(\.\d+)?$/.test(t)) return parseFloat(t) || 0;
    return 0;
  };
  return {
    ox: toPx(oxRaw, w),
    oy: toPx(oyRaw, h)
  };
}
function readIndividualTransforms(el) {
  const out = { rotate: "0deg", scale: null, translate: null };
  const map = typeof el.computedStyleMap === "function" ? el.computedStyleMap() : null;
  if (map) {
    const safeGet = (prop) => {
      try {
        if (typeof map.has === "function" && !map.has(prop)) return null;
        if (typeof map.get !== "function") return null;
        return map.get(prop);
      } catch {
        return null;
      }
    };
    const rot = safeGet("rotate");
    if (rot) {
      if (rot.angle) {
        const ang = rot.angle;
        out.rotate = ang.unit === "rad" ? ang.value * 180 / Math.PI + "deg" : ang.value + ang.unit;
      } else if (rot.unit) {
        out.rotate = rot.unit === "rad" ? rot.value * 180 / Math.PI + "deg" : rot.value + rot.unit;
      } else {
        out.rotate = String(rot);
      }
    } else {
      const cs2 = getComputedStyle(el);
      out.rotate = cs2.rotate && cs2.rotate !== "none" ? cs2.rotate : "0deg";
    }
    const sc = safeGet("scale");
    if (sc) {
      const sx = "x" in sc && sc.x?.value != null ? sc.x.value : Array.isArray(sc) ? sc[0]?.value : Number(sc) || 1;
      const sy = "y" in sc && sc.y?.value != null ? sc.y.value : Array.isArray(sc) ? sc[1]?.value : sx;
      out.scale = `${sx} ${sy}`;
    } else {
      const cs2 = getComputedStyle(el);
      out.scale = cs2.scale && cs2.scale !== "none" ? cs2.scale : null;
    }
    const tr = safeGet("translate");
    if (tr) {
      const tx = "x" in tr && "value" in tr.x ? tr.x.value : Array.isArray(tr) ? tr[0]?.value : 0;
      const ty = "y" in tr && "value" in tr.y ? tr.y.value : Array.isArray(tr) ? tr[1]?.value : 0;
      const ux = "x" in tr && tr.x?.unit ? tr.x.unit : "px";
      const uy = "y" in tr && tr.y?.unit ? tr.y.unit : "px";
      out.translate = `${tx}${ux} ${ty}${uy}`;
    } else {
      const cs2 = getComputedStyle(el);
      out.translate = cs2.translate && cs2.translate !== "none" ? cs2.translate : null;
    }
    return out;
  }
  const cs = getComputedStyle(el);
  out.rotate = cs.rotate && cs.rotate !== "none" ? cs.rotate : "0deg";
  out.scale = cs.scale && cs.scale !== "none" ? cs.scale : null;
  out.translate = cs.translate && cs.translate !== "none" ? cs.translate : null;
  return out;
}
var __measureHost = null;
function getMeasureHost() {
  if (__measureHost) return __measureHost;
  const n = document.createElement("div");
  n.id = "snapdom-measure-slot";
  n.setAttribute("aria-hidden", "true");
  Object.assign(n.style, {
    position: "absolute",
    left: "-99999px",
    top: "0px",
    width: "0px",
    height: "0px",
    overflow: "hidden",
    opacity: "0",
    pointerEvents: "none",
    contain: "size layout style"
  });
  document.documentElement.appendChild(n);
  __measureHost = n;
  return n;
}
function readTotalTransformMatrix(t) {
  const host = getMeasureHost();
  const tmp = document.createElement("div");
  tmp.style.transformOrigin = "0 0";
  if (t.baseTransform) tmp.style.transform = t.baseTransform;
  if (t.rotate) tmp.style.rotate = t.rotate;
  if (t.scale) tmp.style.scale = t.scale;
  if (t.translate) tmp.style.translate = t.translate;
  host.appendChild(tmp);
  const M = matrixFromComputed(tmp);
  host.removeChild(tmp);
  return M;
}
function hasBBoxAffectingTransform(el) {
  const cs = getComputedStyle(el);
  const t = cs.transform || "none";
  const hasMatrix = t !== "none" && !/^matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*,\s*0\s*,\s*0\s*\)$/i.test(t);
  if (hasMatrix) return true;
  const r = cs.rotate && cs.rotate !== "none" && cs.rotate !== "0deg";
  const s = cs.scale && cs.scale !== "none" && cs.scale !== "1";
  const tr = cs.translate && cs.translate !== "none" && cs.translate !== "0px 0px";
  return Boolean(r || s || tr);
}
function matrixFromComputed(el) {
  const tr = getComputedStyle(el).transform;
  if (!tr || tr === "none") return new DOMMatrix();
  try {
    return new DOMMatrix(tr);
  } catch {
    return new WebKitCSSMatrix(tr);
  }
}

// src/core/capture.js
async function captureDOM(element, options) {
  if (!element) throw new Error("Element cannot be null or undefined");
  applyCachePolicy(options.cache);
  const fast = options.fast;
  const outerTransforms = options.outerTransforms !== false;
  const outerShadows = !!options.outerShadows;
  let state = { element, options, plugins: options.plugins };
  let clone, classCSS, styleCache;
  let fontsCSS = "";
  let baseCSS = "";
  let dataURL;
  let svgString;
  let rootTransform2D = null;
  await runHook("beforeSnap", state);
  await runHook("beforeClone", state);
  const undoClamp = lineClamp(state.element);
  try {
    ({ clone, classCSS, styleCache } = await prepareClone(state.element, state.options));
    if (!outerTransforms && clone) {
      rootTransform2D = normalizeRootTransforms(state.element, clone);
    }
    if (!outerShadows && clone) {
      stripRootShadows(state.element, clone);
    }
  } finally {
    undoClamp();
  }
  state = { clone, classCSS, styleCache, ...state };
  await runHook("afterClone", state);
  sanitizeCloneForXHTML(state.clone);
  if (state.options?.excludeMode === "remove") {
    try {
      shrinkAutoSizeBoxes(state.element, state.clone, state.styleCache);
    } catch (e) {
      console.warn("[snapdom] shrink pass failed:", e);
    }
  }
  try {
    await ligatureIconToImage(state.clone, state.element);
  } catch {
  }
  await new Promise((resolve) => {
    idle(async () => {
      await inlineImages(state.clone, state.options);
      resolve();
    }, { fast });
  });
  await new Promise((resolve) => {
    idle(async () => {
      await inlineBackgroundImages(state.element, state.clone, state.styleCache, state.options);
      resolve();
    }, { fast });
  });
  if (options.embedFonts) {
    await new Promise((resolve) => {
      idle(async () => {
        const required = collectUsedFontVariants(state.element);
        const usedCodepoints = collectUsedCodepoints(state.element);
        if (isSafari()) {
          const families = new Set(
            Array.from(required).map((k) => String(k).split("__")[0]).filter(Boolean)
          );
          await ensureFontsReady(families, 1);
        }
        fontsCSS = await embedCustomFonts({
          required,
          usedCodepoints,
          preCached: false,
          exclude: state.options.excludeFonts,
          useProxy: state.options.useProxy
        });
        resolve();
      }, { fast });
    });
  }
  const usedTags = collectUsedTagNames(state.clone).sort();
  const tagKey = usedTags.join(",");
  if (cache.baseStyle.has(tagKey)) {
    baseCSS = cache.baseStyle.get(tagKey);
  } else {
    await new Promise((resolve) => {
      idle(() => {
        baseCSS = generateDedupedBaseCSS(usedTags);
        cache.baseStyle.set(tagKey, baseCSS);
        resolve();
      }, { fast });
    });
  }
  state = { fontsCSS, baseCSS, ...state };
  await runHook("beforeRender", state);
  await new Promise((resolve) => {
    idle(() => {
      const csEl = getComputedStyle(state.element);
      const rect = state.element.getBoundingClientRect();
      let w0 = Math.max(1, limitDecimals(state.element.offsetWidth || parseFloat(csEl.width) || rect.width || 1));
      let h0 = Math.max(1, limitDecimals(state.element.offsetHeight || parseFloat(csEl.height) || rect.height || 1));
      if (state.options?.excludeMode === "remove") {
        const hEst = estimateKeptHeight(state.element, state.options);
        const EPS = 1;
        if (Number.isFinite(hEst) && hEst > 0) {
          h0 = Math.max(1, Math.min(h0, limitDecimals(hEst + EPS)));
        }
      }
      const coerceNum = (v, def = NaN) => {
        const n = typeof v === "string" ? parseFloat(v) : v;
        return Number.isFinite(n) ? n : def;
      };
      const optW = coerceNum(state.options.width);
      const optH = coerceNum(state.options.height);
      let w = w0, h = h0;
      const hasW = Number.isFinite(optW);
      const hasH = Number.isFinite(optH);
      const aspect0 = h0 > 0 ? w0 / h0 : 1;
      if (hasW && hasH) {
        w = Math.max(1, limitDecimals(optW));
        h = Math.max(1, limitDecimals(optH));
      } else if (hasW) {
        w = Math.max(1, limitDecimals(optW));
        h = Math.max(1, limitDecimals(w / (aspect0 || 1)));
      } else if (hasH) {
        h = Math.max(1, limitDecimals(optH));
        w = Math.max(1, limitDecimals(h * (aspect0 || 1)));
      } else {
        w = w0;
        h = h0;
      }
      let minX = 0, minY = 0, maxX = w0, maxY = h0;
      if (!outerTransforms && rootTransform2D && Number.isFinite(rootTransform2D.a)) {
        const M2 = {
          a: rootTransform2D.a,
          b: rootTransform2D.b || 0,
          c: rootTransform2D.c || 0,
          d: rootTransform2D.d || 1,
          e: 0,
          f: 0
        };
        const bb2 = bboxWithOriginFull(w0, h0, M2, 0, 0);
        minX = limitDecimals(bb2.minX);
        minY = limitDecimals(bb2.minY);
        maxX = limitDecimals(bb2.maxX);
        maxY = limitDecimals(bb2.maxY);
      } else {
        const useTFBBox = outerTransforms && hasTFBBox(state.element);
        if (useTFBBox) {
          const baseTransform2 = csEl.transform && csEl.transform !== "none" ? csEl.transform : "";
          const ind2 = readIndividualTransforms(state.element);
          const TOTAL = readTotalTransformMatrix({
            baseTransform: baseTransform2,
            rotate: ind2.rotate || "0deg",
            scale: ind2.scale,
            translate: ind2.translate
          });
          const { ox: ox2, oy: oy2 } = parseTransformOriginPx(csEl, w0, h0);
          const M = TOTAL.is2D ? TOTAL : new DOMMatrix(TOTAL.toString());
          const bb = bboxWithOriginFull(w0, h0, M, ox2, oy2);
          minX = limitDecimals(bb.minX);
          minY = limitDecimals(bb.minY);
          maxX = limitDecimals(bb.maxX);
          maxY = limitDecimals(bb.maxY);
        }
      }
      const bleedShadow = parseBoxShadow(csEl);
      const bleedBlur = parseFilterBlur(csEl);
      const bleedOutline = parseOutline(csEl);
      const drop = parseFilterDropShadows(csEl);
      const bleed = !outerShadows ? { top: 0, right: 0, bottom: 0, left: 0 } : {
        top: limitDecimals(bleedShadow.top + bleedBlur.top + bleedOutline.top + drop.bleed.top),
        right: limitDecimals(bleedShadow.right + bleedBlur.right + bleedOutline.right + drop.bleed.right),
        bottom: limitDecimals(bleedShadow.bottom + bleedBlur.bottom + bleedOutline.bottom + drop.bleed.bottom),
        left: limitDecimals(bleedShadow.left + bleedBlur.left + bleedOutline.left + drop.bleed.left)
      };
      minX = limitDecimals(minX - bleed.left);
      minY = limitDecimals(minY - bleed.top);
      maxX = limitDecimals(maxX + bleed.right);
      maxY = limitDecimals(maxY + bleed.bottom);
      const vbW0 = Math.max(1, limitDecimals(maxX - minX));
      const vbH0 = Math.max(1, limitDecimals(maxY - minY));
      const scaleW = hasW || hasH ? limitDecimals(w / w0) : 1;
      const scaleH = hasH || hasW ? limitDecimals(h / h0) : 1;
      const outW = Math.max(1, limitDecimals(vbW0 * scaleW));
      const outH = Math.max(1, limitDecimals(vbH0 * scaleH));
      const svgNS = "http://www.w3.org/2000/svg";
      const basePad = isSafari() ? 1 : 0;
      const extraPad = !outerTransforms ? 1 : 0;
      const pad = limitDecimals(basePad + extraPad);
      const fo = document.createElementNS(svgNS, "foreignObject");
      const vbMinX = limitDecimals(minX);
      const vbMinY = limitDecimals(minY);
      fo.setAttribute("x", String(limitDecimals(-(vbMinX - pad))));
      fo.setAttribute("y", String(limitDecimals(-(vbMinY - pad))));
      fo.setAttribute("width", String(limitDecimals(w0 + pad * 2)));
      fo.setAttribute("height", String(limitDecimals(h0 + pad * 2)));
      fo.style.overflow = "visible";
      const styleTag = document.createElement("style");
      styleTag.textContent = state.baseCSS + state.fontsCSS + "svg{overflow:visible;} foreignObject{overflow:visible;}" + state.classCSS;
      fo.appendChild(styleTag);
      const container = document.createElement("div");
      container.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      container.style.width = `${limitDecimals(w0)}px`;
      container.style.height = `${limitDecimals(h0)}px`;
      container.style.overflow = "visible";
      state.clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      container.appendChild(state.clone);
      fo.appendChild(container);
      const serializer = new XMLSerializer();
      const foString = serializer.serializeToString(fo);
      const vbW = limitDecimals(vbW0 + pad * 2);
      const vbH = limitDecimals(vbH0 + pad * 2);
      const wantsSize = hasW || hasH;
      options.meta = { w0, h0, vbW, vbH, targetW: w, targetH: h };
      const svgOutW = isSafari() && wantsSize ? vbW : limitDecimals(outW + pad * 2);
      const svgOutH = isSafari() && wantsSize ? vbH : limitDecimals(outH + pad * 2);
      const svgHeader = `<svg xmlns="${svgNS}" width="${svgOutW}" height="${svgOutH}" viewBox="0 0 ${vbW} ${vbH}">`;
      const svgFooter = "</svg>";
      svgString = svgHeader + foString + svgFooter;
      dataURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
      state = { svgString, dataURL, ...state };
      resolve();
    }, { fast });
  });
  await runHook("afterRender", state);
  const sandbox = document.getElementById("snapdom-sandbox");
  if (sandbox && sandbox.style.position === "absolute") sandbox.remove();
  return state.dataURL;
}
function hasTFBBox(el) {
  return hasBBoxAffectingTransform(el);
}

// src/core/context.js
function normalizeCachePolicy(v) {
  if (typeof v === "string") {
    const s = v.toLowerCase().trim();
    if (s === "disabled" || s === "full" || s === "auto" || s === "soft") return (
      /** @type {CachePolicy} */
      s
    );
  }
  return "soft";
}
function createContext(options = {}) {
  let resolvedFormat = options.format ?? "png";
  if (resolvedFormat === "jpg") resolvedFormat = "jpeg";
  const cachePolicy = normalizeCachePolicy(options.cache);
  return {
    // Debug & perf
    debug: options.debug ?? false,
    fast: options.fast ?? true,
    scale: options.scale ?? 1,
    // DOM filters
    exclude: options.exclude ?? [],
    excludeMode: options.excludeMode ?? "hide",
    filter: options.filter ?? null,
    filterMode: options.filterMode ?? "hide",
    // Placeholders
    placeholders: options.placeholders !== false,
    // default true
    // Fonts
    embedFonts: options.embedFonts ?? false,
    iconFonts: Array.isArray(options.iconFonts) ? options.iconFonts : options.iconFonts ? [options.iconFonts] : [],
    localFonts: Array.isArray(options.localFonts) ? options.localFonts : [],
    excludeFonts: options.excludeFonts ?? void 0,
    fallbackURL: options.fallbackURL ?? void 0,
    /** @type {CachePolicy} */
    cache: cachePolicy,
    // Network
    useProxy: typeof options.useProxy === "string" ? options.useProxy : "",
    // Output
    width: options.width ?? null,
    height: options.height ?? null,
    format: resolvedFormat,
    type: options.type ?? "svg",
    quality: options.quality ?? 0.92,
    dpr: options.dpr ?? (window.devicePixelRatio || 1),
    backgroundColor: options.backgroundColor ?? (["jpeg", "webp"].includes(resolvedFormat) ? "#ffffff" : null),
    filename: options.filename ?? "snapDOM",
    // NEW flags (user-friendly)
    outerTransforms: options.outerTransforms ?? true,
    outerShadows: options.outerShadows ?? false
    // Plugins (reservado)
    // plugins: normalizePlugins(...),
  };
}

// src/api/snapdom.js
init_browser();
function plugins(...defs) {
  registerPlugins(...defs);
  return snapdom;
}
var snapdom = Object.assign(main, { plugins });
var INTERNAL_TOKEN = Symbol("snapdom.internal");
var INTERNAL_EXPORT_TOKEN = Symbol("snapdom.internal.silent");
var _safariWarmup = false;
async function main(element, userOptions) {
  if (!element) throw new Error("Element cannot be null or undefined");
  const context = createContext(userOptions);
  attachSessionPlugins(context, userOptions && userOptions.plugins);
  if (isSafari() && (context.embedFonts === true || hasBackgroundOrMask(element))) {
    for (let i = 0; i < 3; i++) {
      try {
        await safariWarmup(element, userOptions);
        _safariWarmup = false;
      } catch {
      }
    }
  }
  if (context.iconFonts && context.iconFonts.length > 0) extendIconFonts(context.iconFonts);
  if (!context.snap) {
    context.snap = {
      toPng: (el, opts) => snapdom.toPng(el, opts),
      toSvg: (el, opts) => snapdom.toSvg(el, opts)
    };
  }
  return snapdom.capture(element, context, INTERNAL_TOKEN);
}
snapdom.capture = async (el, context, _token) => {
  if (_token !== INTERNAL_TOKEN) throw new Error("[snapdom.capture] is internal. Use snapdom(...) instead.");
  const url = await captureDOM(el, context);
  const coreExports = {
    img: async (ctx, opts) => {
      const { toImg: toImg2 } = await Promise.resolve().then(() => (init_toImg(), toImg_exports));
      return toImg2(url, { ...ctx, ...opts || {} });
    },
    svg: async (ctx, opts) => {
      const { toSvg } = await Promise.resolve().then(() => (init_toImg(), toImg_exports));
      return toSvg(url, { ...ctx, ...opts || {} });
    },
    canvas: async (ctx, opts) => {
      const { toCanvas: toCanvas2 } = await Promise.resolve().then(() => (init_toCanvas(), toCanvas_exports));
      return toCanvas2(url, { ...ctx, ...opts || {} });
    },
    blob: async (ctx, opts) => {
      const { toBlob: toBlob2 } = await Promise.resolve().then(() => (init_toBlob(), toBlob_exports));
      return toBlob2(url, { ...ctx, ...opts || {} });
    },
    png: async (ctx, opts) => {
      const { rasterize: rasterize2 } = await Promise.resolve().then(() => (init_rasterize(), rasterize_exports));
      return rasterize2(url, { ...ctx, ...opts || {}, format: "png" });
    },
    jpeg: async (ctx, opts) => {
      const { rasterize: rasterize2 } = await Promise.resolve().then(() => (init_rasterize(), rasterize_exports));
      return rasterize2(url, { ...ctx, ...opts || {}, format: "jpeg" });
    },
    webp: async (ctx, opts) => {
      const { rasterize: rasterize2 } = await Promise.resolve().then(() => (init_rasterize(), rasterize_exports));
      return rasterize2(url, { ...ctx, ...opts || {}, format: "webp" });
    },
    download: async (ctx, opts) => {
      const { download: download2 } = await Promise.resolve().then(() => (init_download(), download_exports));
      return download2(url, { ...ctx, ...opts || {} });
    }
  };
  const _pluginExports = {
    svg: async (opts) => {
      const { toSvg } = await Promise.resolve().then(() => (init_toImg(), toImg_exports));
      return toSvg(url, { ...context, ...opts || {}, [INTERNAL_EXPORT_TOKEN]: true });
    },
    canvas: async (opts) => {
      const { toCanvas: toCanvas2 } = await Promise.resolve().then(() => (init_toCanvas(), toCanvas_exports));
      return toCanvas2(url, { ...context, ...opts || {}, [INTERNAL_EXPORT_TOKEN]: true });
    },
    png: async (opts) => {
      const { rasterize: rasterize2 } = await Promise.resolve().then(() => (init_rasterize(), rasterize_exports));
      return rasterize2(url, { ...context, ...opts || {}, format: "png", [INTERNAL_EXPORT_TOKEN]: true });
    },
    jpeg: async (opts) => {
      const { rasterize: rasterize2 } = await Promise.resolve().then(() => (init_rasterize(), rasterize_exports));
      return rasterize2(url, { ...context, ...opts || {}, format: "jpeg", [INTERNAL_EXPORT_TOKEN]: true });
    },
    jpg: async (opts) => {
      const { rasterize: rasterize2 } = await Promise.resolve().then(() => (init_rasterize(), rasterize_exports));
      return rasterize2(url, { ...context, ...opts || {}, format: "jpeg", [INTERNAL_EXPORT_TOKEN]: true });
    },
    webp: async (opts) => {
      const { rasterize: rasterize2 } = await Promise.resolve().then(() => (init_rasterize(), rasterize_exports));
      return rasterize2(url, { ...context, ...opts || {}, format: "webp", [INTERNAL_EXPORT_TOKEN]: true });
    },
    blob: async (opts) => {
      const { toBlob: toBlob2 } = await Promise.resolve().then(() => (init_toBlob(), toBlob_exports));
      return toBlob2(url, { ...context, ...opts || {}, [INTERNAL_EXPORT_TOKEN]: true });
    },
    img: async (opts) => {
      const { toImg: toImg2 } = await Promise.resolve().then(() => (init_toImg(), toImg_exports));
      return toImg2(url, { ...context, ...opts || {}, [INTERNAL_EXPORT_TOKEN]: true });
    }
  };
  const _defineCtx = { ...context, export: { url }, exports: _pluginExports };
  const providedMaps = await runAll("defineExports", _defineCtx);
  const provided = Object.assign({}, ...providedMaps.filter((x) => x && typeof x === "object"));
  const exportsMap = { ...coreExports, ...provided };
  if (exportsMap.jpeg && !exportsMap.jpg) {
    exportsMap.jpg = (ctx, opts) => exportsMap.jpeg(ctx, opts);
  }
  function normalizeExportOptions(type, opts) {
    const next = { ...context, ...opts || {} };
    if (type === "jpeg" || type === "jpg") {
      const noBg = next.backgroundColor == null || next.backgroundColor === "transparent";
      if (noBg) next.backgroundColor = "#ffffff";
    }
    return next;
  }
  let afterSnapFired = false;
  let _exportQueue = Promise.resolve();
  async function runExport(type, opts) {
    const job = async () => {
      const work = exportsMap[type];
      if (!work) throw new Error(`[snapdom] Unknown export type: ${type}`);
      const nextOpts = normalizeExportOptions(type, opts);
      const ctx = { ...context, export: { type, options: nextOpts, url } };
      await runHook("beforeExport", ctx);
      const result2 = await work(ctx, nextOpts);
      await runHook("afterExport", ctx, result2);
      if (!afterSnapFired) {
        afterSnapFired = true;
        await runHook("afterSnap", context);
      }
      return result2;
    };
    return _exportQueue = _exportQueue.then(job);
  }
  const result = {
    url,
    toRaw: () => url,
    to: (type, opts) => runExport(type, opts),
    // Métodos “clásicos” que los tests esperan:
    toImg: (opts) => runExport("img", opts),
    toSvg: (opts) => runExport("svg", opts),
    toCanvas: (opts) => runExport("canvas", opts),
    toBlob: (opts) => runExport("blob", opts),
    toPng: (opts) => runExport("png", opts),
    toJpg: (opts) => runExport("jpg", opts),
    // alias requerido por tests
    toWebp: (opts) => runExport("webp", opts),
    download: (opts) => runExport("download", opts)
  };
  for (const key of Object.keys(exportsMap)) {
    const helper = "to" + key.charAt(0).toUpperCase() + key.slice(1);
    if (!result[helper]) {
      result[helper] = (opts) => runExport(key, opts);
    }
  }
  return result;
};
snapdom.toRaw = (el, options) => snapdom(el, options).then((result) => result.toRaw());
snapdom.toImg = (el, options) => snapdom(el, options).then((result) => result.toImg());
snapdom.toSvg = (el, options) => snapdom(el, options).then((result) => result.toSvg());
snapdom.toCanvas = (el, options) => snapdom(el, options).then((result) => result.toCanvas());
snapdom.toBlob = (el, options) => snapdom(el, options).then((result) => result.toBlob());
snapdom.toPng = (el, options) => snapdom(el, { ...options, format: "png" }).then((result) => result.toPng());
snapdom.toJpg = (el, options) => snapdom(el, { ...options, format: "jpeg" }).then((result) => result.toJpg());
snapdom.toWebp = (el, options) => snapdom(el, { ...options, format: "webp" }).then((result) => result.toWebp());
snapdom.download = (el, options) => snapdom(el, options).then((result) => result.download());
async function safariWarmup(element, baseOptions) {
  if (_safariWarmup) return;
  const preflight = {
    ...baseOptions,
    fast: true,
    embedFonts: true,
    scale: 0.2
  };
  let url;
  try {
    url = await captureDOM(element, preflight);
  } catch {
  }
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  if (url) {
    await new Promise((resolve) => {
      const img = new Image();
      try {
        img.decoding = "sync";
        img.loading = "eager";
      } catch {
      }
      img.style.cssText = "position:fixed;left:0px;top:0px;width:10px;height:10px;opacity:0.01;pointer-events:none;";
      img.src = url;
      document.body.appendChild(img);
      (async () => {
        try {
          if (typeof img.decode === "function") await img.decode();
        } catch {
        }
        const start = performance.now();
        while (!(img.complete && img.naturalWidth > 0) && performance.now() - start < 900) {
          await new Promise((r) => setTimeout(r, 50));
        }
        await new Promise((r) => requestAnimationFrame(r));
        try {
          img.remove();
        } catch {
        }
        resolve();
      })();
    });
  }
  element.querySelectorAll("canvas").forEach((c) => {
    try {
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        ctx.getImageData(0, 0, 1, 1);
      }
    } catch {
    }
  });
  _safariWarmup = true;
}
function hasBackgroundOrMask(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) {
    const node = (
      /** @type {Element} */
      walker.currentNode
    );
    const cs = getComputedStyle(node);
    const bg = cs.backgroundImage && cs.backgroundImage !== "none";
    const mask = cs.maskImage && cs.maskImage !== "none" || cs.webkitMaskImage && cs.webkitMaskImage !== "none";
    if (bg || mask) return true;
    if (node.tagName === "CANVAS") return true;
  }
  return false;
}

// src/api/preCache.js
init_utils();
init_snapFetch();
init_cache();
async function preCache(root = document, options = {}) {
  const {
    embedFonts = true,
    useProxy = ""
  } = options;
  const cacheMode = options.cache ?? options.cacheOpt ?? "full";
  applyCachePolicy(cacheMode);
  try {
    await document.fonts?.ready;
  } catch {
  }
  try {
    precacheCommonTags();
  } catch {
  }
  cache.session = cache.session || {};
  if (!cache.session.styleCache) {
    cache.session.styleCache = /* @__PURE__ */ new WeakMap();
  }
  cache.image = cache.image || /* @__PURE__ */ new Map();
  cache.background = cache.background || /* @__PURE__ */ new Map();
  try {
    await inlineBackgroundImages(
      root,
      /* mirror */
      void 0,
      cache.session.styleCache,
      { useProxy }
    );
  } catch {
  }
  let imgEls = [], allEls = [];
  try {
    if (root && root.nodeType === 1) {
      const descendants = root.querySelectorAll ? Array.from(root.querySelectorAll("*")) : [];
      allEls = [root, ...descendants];
      imgEls = [];
      if (root.tagName === "IMG" && root.getAttribute("src")) imgEls.push(root);
      imgEls.push(...Array.from(root.querySelectorAll?.("img[src]") || []));
    } else if (root?.querySelectorAll) {
      imgEls = Array.from(root.querySelectorAll("img[src]"));
      allEls = Array.from(root.querySelectorAll("*"));
    }
  } catch {
  }
  const promises = [];
  for (const img of imgEls) {
    const src = img?.currentSrc || img?.src;
    if (!src) continue;
    if (!cache.image.has(src)) {
      const p = Promise.resolve().then(async () => {
        const res = await snapFetch(src, { as: "dataURL", useProxy });
        if (res?.ok && typeof res.data === "string") {
          cache.image.set(src, res.data);
        }
      }).catch(() => {
      });
      promises.push(p);
    }
  }
  for (const el of allEls) {
    let bg = "";
    try {
      bg = el?.style?.backgroundImage || "";
      if (!bg || bg === "none") {
        bg = getStyle(el).backgroundImage;
      }
    } catch {
    }
    if (bg && bg !== "none") {
      const urlEntries = bg.match(/url\((?:[^()"']+|"(?:[^"]*)"|'(?:[^']*)')\)/gi) || [];
      for (const entry of urlEntries) {
        const p = Promise.resolve().then(() => inlineSingleBackgroundEntry(entry, { ...options, useProxy })).catch(() => {
        });
        promises.push(p);
      }
    }
  }
  if (embedFonts) {
    try {
      const required = collectUsedFontVariants(root);
      const usedCodepoints = collectUsedCodepoints(root);
      const safari = typeof isSafari === "function" ? isSafari() : !!isSafari;
      if (safari) {
        const families = new Set(
          Array.from(required).map((k) => String(k).split("__")[0]).filter(Boolean)
        );
        await ensureFontsReady(families, 3);
      }
      await embedCustomFonts({
        required,
        usedCodepoints,
        exclude: options.excludeFonts,
        localFonts: options.localFonts,
        useProxy: options.useProxy ?? useProxy
      });
    } catch {
    }
  }
  await Promise.allSettled(promises);
}
export {
  preCache,
  snapdom
};
