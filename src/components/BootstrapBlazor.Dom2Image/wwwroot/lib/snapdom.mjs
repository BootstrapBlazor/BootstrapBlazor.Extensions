
/*
* snapdom
* v.1.9.9
* Author Juan Martin Muda
* License MIT
**/


// src/core/cache.js
var cache = {
  image: /* @__PURE__ */ new Map(),
  background: /* @__PURE__ */ new Map(),
  resource: /* @__PURE__ */ new Map(),
  defaultStyle: /* @__PURE__ */ new Map(),
  baseStyle: /* @__PURE__ */ new Map(),
  computedStyle: /* @__PURE__ */ new WeakMap(),
  font: /* @__PURE__ */ new Set(),
  snapshot: /* @__PURE__ */ new WeakMap(),
  snapshotKey: /* @__PURE__ */ new Map(),
  reset: resetCache
};
function resetCache() {
  cache.computedStyle = /* @__PURE__ */ new WeakMap();
}

// src/utils/cssTools.js
var commonTags = [
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
  "svg",
  "path",
  "circle",
  "rect",
  "line",
  "g",
  "table",
  "thead",
  "tbody",
  "tr",
  "td",
  "th"
];
function precacheCommonTags() {
  for (let tag of commonTags) {
    getDefaultStyleForTag(tag);
  }
}
function getDefaultStyleForTag(tagName) {
  if (cache.defaultStyle.has(tagName)) {
    return cache.defaultStyle.get(tagName);
  }
  const skipTags = /* @__PURE__ */ new Set(["script", "style", "meta", "link", "noscript", "template", "defs", "symbol", "title", "metadata", "desc"]);
  if (skipTags.has(tagName)) {
    const empty = {};
    cache.defaultStyle.set(tagName, empty);
    return empty;
  }
  let sandbox = document.getElementById("snapdom-sandbox");
  if (!sandbox) {
    sandbox = document.createElement("div");
    sandbox.id = "snapdom-sandbox";
    sandbox.style.position = "absolute";
    sandbox.style.left = "-9999px";
    sandbox.style.top = "-9999px";
    sandbox.style.width = "0";
    sandbox.style.height = "0";
    sandbox.style.overflow = "hidden";
    document.body.appendChild(sandbox);
  }
  const el = document.createElement(tagName);
  el.style.all = "initial";
  sandbox.appendChild(el);
  const styles = getComputedStyle(el);
  const defaults = {};
  for (let prop of styles) {
    defaults[prop] = styles.getPropertyValue(prop);
  }
  sandbox.removeChild(el);
  cache.defaultStyle.set(tagName, defaults);
  return defaults;
}
var IGNORED_PROPS = /* @__PURE__ */ new Set([
  "-webkit-locale"
]);
function getStyleKey(snapshot, tagName, compress = false) {
  const entries = [];
  const defaultStyles = getDefaultStyleForTag(tagName);
  for (let [prop, value] of Object.entries(snapshot)) {
    if (IGNORED_PROPS.has(prop)) continue;
    if (!compress) {
      if (value) {
        entries.push(`${prop}:${value}`);
      }
    } else {
      const defaultValue = defaultStyles[prop];
      if (value && value !== defaultValue) {
        entries.push(`${prop}:${value}`);
      }
    }
  }
  return entries.sort().join(";");
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
  const keySet = new Set(styleMap.values());
  const classMap = /* @__PURE__ */ new Map();
  let counter = 1;
  for (const key of keySet) {
    if (!key.trim()) continue;
    classMap.set(key, `c${counter++}`);
  }
  return classMap;
}

// src/utils/helpers.js
async function inlineSingleBackgroundEntry(entry, options = {}) {
  const rawUrl = extractURL(entry);
  const isGradient = /^((repeating-)?(linear|radial|conic)-gradient)\(/i.test(entry);
  if (rawUrl) {
    const encodedUrl = safeEncodeURI(rawUrl);
    if (cache.background.has(encodedUrl)) {
      return options.skipInline ? void 0 : `url(${cache.background.get(encodedUrl)})`;
    } else {
      const dataUrl = await fetchImage(encodedUrl, { useProxy: options.useProxy });
      cache.background.set(encodedUrl, dataUrl);
      return options.skipInline ? void 0 : `url("${dataUrl}")`;
    }
  }
  if (isGradient || entry === "none") {
    return entry;
  }
  return entry;
}
function idle(fn, { fast = false } = {}) {
  if (fast) return fn();
  if ("requestIdleCallback" in window) {
    requestIdleCallback(fn, { timeout: 50 });
  } else {
    setTimeout(fn, 1);
  }
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
function parseContent(content) {
  let clean = content.replace(/^['"]|['"]$/g, "");
  if (clean.startsWith("\\")) {
    try {
      return String.fromCharCode(parseInt(clean.replace("\\", ""), 16));
    } catch {
      return clean;
    }
  }
  return clean;
}
function extractURL(value) {
  const match = value.match(/url\((['"]?)(.*?)(\1)\)/);
  if (!match) return null;
  const url = match[2].trim();
  if (url.startsWith("#")) return null;
  return url;
}
async function fetchResource(url, { useProxy = "" } = {}) {
  async function doFetch(u) {
    const res = await fetch(u);
    if (!res.ok) throw new Error(`[snapdom] Failed to fetch resource: ${u}`);
    return res;
  }
  try {
    return await doFetch(url);
  } catch (e) {
    if (useProxy && typeof useProxy === "string") {
      const proxied = useProxy.replace(/\/$/, "") + safeEncodeURI(url);
      return doFetch(proxied);
    }
    throw e;
  }
}
var _inflight = /* @__PURE__ */ new Map();
var _errorCache = /* @__PURE__ */ new Map();
function fetchImage(src, { timeout = 3e3, useProxy = "", errorTTL = 8e3 } = {}) {
  function getCrossOriginMode(url) {
    try {
      const parsed = new URL(url, window.location.href);
      return parsed.origin === window.location.origin ? "use-credentials" : "anonymous";
    } catch {
      return "anonymous";
    }
  }
  const ok = (data) => ({ ok: true, data });
  const fail = (e) => ({ ok: false, error: e instanceof Error ? e : new Error(String(e)) });
  function fetchBlobAsDataURLSafe(fetchUrl) {
    try {
      return fetch(fetchUrl, {
        mode: "cors",
        credentials: getCrossOriginMode(fetchUrl) === "use-credentials" ? "include" : "omit"
      }).then((r) => {
        if (!r.ok) return fail(new Error("HTTP " + r.status));
        return r.blob().then((blob) => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result;
            if (typeof base64 !== "string" || !base64.startsWith("data:image/")) {
              resolve(fail(new Error("Invalid image data URL")));
            } else {
              resolve(ok(base64));
            }
          };
          reader.onerror = () => resolve(fail(new Error("FileReader error")));
          reader.readAsDataURL(blob);
        }));
      }).catch((e) => fail(e));
    } catch (e) {
      return Promise.resolve(fail(e));
    }
  }
  function fetchWithFallbackOnceSafe(url) {
    return fetchBlobAsDataURLSafe(url).then((r) => {
      if (r.ok) return r;
      if (useProxy && typeof useProxy === "string") {
        const proxied = useProxy.replace(/\/$/, "") + safeEncodeURI(url);
        return fetchBlobAsDataURLSafe(proxied).then((r2) => {
          if (r2.ok) return r2;
          return fail(new Error("[SnapDOM - fetchImage] Fetch failed and no proxy provided"));
        });
      }
      return fail(new Error("[SnapDOM - fetchImage] Fetch failed and no proxy provided"));
    });
  }
  const now = Date.now();
  const until = _errorCache.get(src);
  if (until && until > now) {
    const pr = Promise.reject(new Error("[SnapDOM - fetchImage] Recently failed (cooldown)."));
    pr.catch(() => {
    });
    return pr;
  }
  if (_inflight.has(src)) return _inflight.get(src);
  const crossOriginValue = getCrossOriginMode(src);
  if (cache.image.has(src)) return Promise.resolve(cache.image.get(src));
  if (src.startsWith("data:image/")) {
    cache.image.set(src, src);
    return Promise.resolve(src);
  }
  if (/\.svg(\?.*)?$/i.test(src)) {
    const p2 = (async () => {
      const direct = await (async () => {
        try {
          const res = await fetch(src, {
            mode: "cors",
            credentials: crossOriginValue === "use-credentials" ? "include" : "omit"
          });
          if (!res.ok) return fail(new Error("HTTP " + res.status));
          const svgText = await res.text();
          return ok(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`);
        } catch (e) {
          return fail(e);
        }
      })();
      if (direct.ok) {
        cache.image.set(src, direct.data);
        return direct.data;
      }
      const via = await fetchWithFallbackOnceSafe(src);
      if (via.ok) {
        cache.image.set(src, via.data);
        return via.data;
      }
      _errorCache.set(src, now + errorTTL);
      return Promise.reject(via.error);
    })();
    _inflight.set(src, p2);
    p2.finally(() => _inflight.delete(src));
    p2.catch(() => {
    });
    return p2;
  }
  const p = new Promise((resolve, reject) => {
    let finished = false;
    const img = new Image();
    const finish = (fn) => (arg) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeoutId);
      img.onload = img.onerror = null;
      fn(arg);
    };
    const onSuccess = (d) => {
      cache.image.set(src, d);
      resolve(d);
    };
    const onFinalError = (e) => {
      _errorCache.set(src, Date.now() + errorTTL);
      reject(e);
    };
    const timeoutId = setTimeout(
      finish(() => {
        fetchWithFallbackOnceSafe(src).then((r) => {
          if (r.ok) onSuccess(r.data);
          else onFinalError(new Error("Image load timed out"));
        });
      }),
      timeout
    );
    img.crossOrigin = crossOriginValue;
    img.onload = finish(() => {
      Promise.resolve(img.decode()).then(() => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          onSuccess(canvas.toDataURL("image/png"));
        } catch {
          fetchWithFallbackOnceSafe(src).then((r) => {
            if (r.ok) onSuccess(r.data);
            else onFinalError(r.error);
          });
        }
      }).catch(() => {
        fetchWithFallbackOnceSafe(src).then((r) => {
          if (r.ok) onSuccess(r.data);
          else onFinalError(r.error);
        });
      });
    });
    img.onerror = finish(() => {
      fetchWithFallbackOnceSafe(src).then((r) => {
        if (r.ok) onSuccess(r.data);
        else onFinalError(r.error);
      });
    });
    img.src = src;
  });
  _inflight.set(src, p);
  p.finally(() => _inflight.delete(src));
  p.catch(() => {
  });
  return p;
}
function snapshotComputedStyle(style) {
  const snap = {};
  for (let prop of style) {
    snap[prop] = style.getPropertyValue(prop);
  }
  return snap;
}
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
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

// src/modules/styles.js
var snapshotCache = /* @__PURE__ */ new WeakMap();
var snapshotKeyCache = /* @__PURE__ */ new Map();
function snapshotComputedStyleFull(style) {
  const result = {};
  const computedVisibility = style.getPropertyValue("visibility");
  for (let i = 0; i < style.length; i++) {
    const prop = style[i];
    let val = style.getPropertyValue(prop);
    if ((prop === "background-image" || prop === "content") && val.includes("url(") && !val.includes("data:")) {
      val = "none";
    }
    result[prop] = val;
  }
  if (computedVisibility === "hidden") {
    result.opacity = "0";
  }
  return result;
}
function inlineAllStyles(source, clone, styleMap, cache2, compress) {
  if (source.tagName === "STYLE") return;
  if (!cache2.has(source)) {
    cache2.set(source, getStyle(source));
  }
  const style = cache2.get(source);
  if (!snapshotCache.has(source)) {
    const snapshot2 = snapshotComputedStyleFull(style);
    snapshotCache.set(source, snapshot2);
  }
  const snapshot = snapshotCache.get(source);
  const hash = Object.entries(snapshot).sort(([a], [b]) => a.localeCompare(b)).map(([prop, val]) => `${prop}:${val}`).join(";");
  if (snapshotKeyCache.has(hash)) {
    styleMap.set(clone, snapshotKeyCache.get(hash));
    return;
  }
  const tagName = source.tagName?.toLowerCase() || "div";
  const key = getStyleKey(snapshot, tagName, compress);
  snapshotKeyCache.set(hash, key);
  styleMap.set(clone, key);
}

// src/core/clone.js
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
function deepClone(node, styleMap, styleCache, nodeMap, compress, options = {}, originalRoot) {
  if (!node) throw new Error("Invalid node");
  const clonedAssignedNodes = /* @__PURE__ */ new Set();
  let pendingSelectValue = null;
  if (node.nodeType === Node.TEXT_NODE) {
    return node.cloneNode(true);
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return node.cloneNode(true);
  }
  if (node.getAttribute("data-capture") === "exclude") {
    const spacer = document.createElement("div");
    const rect = node.getBoundingClientRect();
    spacer.style.cssText = `display:inline-block;width:${rect.width}px;height:${rect.height}px;visibility:hidden;`;
    return spacer;
  }
  if (options.exclude && Array.isArray(options.exclude)) {
    for (const selector of options.exclude) {
      try {
        if (node.matches?.(selector)) {
          const spacer = document.createElement("div");
          const rect = node.getBoundingClientRect();
          spacer.style.cssText = `display:inline-block;width:${rect.width}px;height:${rect.height}px;visibility:hidden;`;
          return spacer;
        }
      } catch (err) {
        console.warn(`Invalid selector in exclude option: ${selector}`, err);
      }
    }
  }
  if (typeof options.filter === "function") {
    try {
      if (!options.filter(node, originalRoot || node)) {
        const spacer = document.createElement("div");
        const rect = node.getBoundingClientRect();
        spacer.style.cssText = `display:inline-block;width:${rect.width}px;height:${rect.height}px;visibility:hidden;`;
        return spacer;
      }
    } catch (err) {
      console.warn("Error in filter function:", err);
    }
  }
  if (node.tagName === "IFRAME") {
    const fallback = document.createElement("div");
    fallback.style.cssText = `width:${node.offsetWidth}px;height:${node.offsetHeight}px;background-image:repeating-linear-gradient(45deg,#ddd,#ddd 5px,#f9f9f9 5px,#f9f9f9 10px);display:flex;align-items:center;justify-content:center;font-size:12px;color:#555;border:1px solid #aaa;`;
    return fallback;
  }
  if (node.getAttribute("data-capture") === "placeholder") {
    const clone2 = node.cloneNode(false);
    nodeMap.set(clone2, node);
    inlineAllStyles(node, clone2, styleMap, styleCache, compress);
    const placeholder = document.createElement("div");
    placeholder.textContent = node.getAttribute("data-placeholder-text") || "";
    placeholder.style.cssText = `color:#666;font-size:12px;text-align:center;line-height:1.4;padding:0.5em;box-sizing:border-box;`;
    clone2.appendChild(placeholder);
    return clone2;
  }
  if (node.tagName === "CANVAS") {
    const dataURL = node.toDataURL();
    const img = document.createElement("img");
    img.src = dataURL;
    img.width = node.width;
    img.height = node.height;
    nodeMap.set(img, node);
    inlineAllStyles(node, img, styleMap, styleCache, compress);
    return img;
  }
  let clone;
  try {
    clone = node.cloneNode(false);
    nodeMap.set(clone, node);
    if (node.tagName === "IMG") {
      freezeImgSrcset(node, clone);
    }
  } catch (err) {
    console.error("[Snapdom] Failed to clone node:", node, err);
    throw err;
  }
  if (node instanceof HTMLTextAreaElement) {
    clone.textContent = node.value;
    clone.value = node.value;
    const rect = node.getBoundingClientRect();
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    return clone;
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
  inlineAllStyles(node, clone, styleMap, styleCache, compress);
  if (node.shadowRoot) {
    const hasSlot = Array.from(node.shadowRoot.querySelectorAll("slot")).length > 0;
    if (hasSlot) {
      for (const child of node.shadowRoot.childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE && child.tagName === "STYLE") {
          const cssText = child.textContent || "";
          if (cssText.trim() && compress) {
            styleCache.set(child, cssText);
          }
        }
      }
    } else {
      const shadowFrag = document.createDocumentFragment();
      for (const child of node.shadowRoot.childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE && child.tagName === "STYLE") {
          const cssText = child.textContent || "";
          if (cssText.trim() && compress) {
            styleCache.set(child, cssText);
          }
          continue;
        }
        const clonedChild = deepClone(child, styleMap, styleCache, nodeMap, compress, options, originalRoot || node);
        if (clonedChild) shadowFrag.appendChild(clonedChild);
      }
      clone.appendChild(shadowFrag);
    }
  }
  if (node.tagName === "SLOT") {
    const assigned = node.assignedNodes?.({ flatten: true }) || [];
    const nodesToClone = assigned.length > 0 ? assigned : Array.from(node.childNodes);
    const fragment = document.createDocumentFragment();
    for (const child of nodesToClone) {
      const clonedChild = deepClone(child, styleMap, styleCache, nodeMap, compress, options, originalRoot || node);
      if (clonedChild) fragment.appendChild(clonedChild);
    }
    return fragment;
  }
  for (const child of node.childNodes) {
    if (clonedAssignedNodes.has(child)) continue;
    const clonedChild = deepClone(child, styleMap, styleCache, nodeMap, compress, options, originalRoot || node);
    if (clonedChild) clone.appendChild(clonedChild);
  }
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
  return clone;
}

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
var userIconFonts = [];
function extendIconFonts(fonts) {
  const list = Array.isArray(fonts) ? fonts : [fonts];
  for (const f of list) {
    if (f instanceof RegExp) {
      userIconFonts.push(f);
    } else if (typeof f === "string") {
      userIconFonts.push(new RegExp(f, "i"));
    } else {
      console.warn("[snapdom] Ignored invalid iconFont value:", f);
    }
  }
}
function isIconFont(input) {
  const text = typeof input === "string" ? input : "";
  const candidates = [...defaultIconFonts, ...userIconFonts];
  for (const rx of candidates) {
    if (rx instanceof RegExp && rx.test(text)) return true;
  }
  if (/icon/i.test(text) || /glyph/i.test(text) || /symbols/i.test(text) || /feather/i.test(text) || /fontawesome/i.test(text)) return true;
  return false;
}

// src/modules/fonts.js
async function iconToImage(unicodeChar, fontFamily, fontWeight, fontSize = 32, color = "#000") {
  fontFamily = fontFamily.replace(/^['"]+|['"]+$/g, "");
  const dpr = window.devicePixelRatio || 1;
  await document.fonts.ready;
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
  canvas.width = width * dpr;
  canvas.height = height * dpr;
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
function isStylesheetLoaded(href) {
  return Array.from(document.styleSheets).some((sheet) => sheet.href === href);
}
function injectLinkIfMissing(href) {
  return new Promise((resolve) => {
    if (isStylesheetLoaded(href)) return resolve(null);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-snapdom", "injected-import");
    link.onload = () => resolve(link);
    link.onerror = () => resolve(null);
    document.head.appendChild(link);
  });
}
async function embedCustomFonts({ preCached = false, localFonts = [], useProxy = "" } = {}) {
  if (cache.resource.has("fonts-embed-css")) {
    if (preCached) {
      const style = document.createElement("style");
      style.setAttribute("data-snapdom", "embedFonts");
      style.textContent = cache.resource.get("fonts-embed-css");
      document.head.appendChild(style);
    }
    return cache.resource.get("fonts-embed-css");
  }
  const loadedFonts = /* @__PURE__ */ new Set();
  try {
    for (const f of document.fonts) {
      if (f.status === "loaded") {
        loadedFonts.add(`${f.family}__${f.weight || "normal"}__${f.style || "normal"}`);
      }
    }
  } catch {
  }
  const importRegex = /@import\s+url\(["']?([^"')]+)["']?\)/g;
  const styleImports = [];
  for (const styleTag of document.querySelectorAll("style")) {
    const cssText = styleTag.textContent || "";
    const matches = Array.from(cssText.matchAll(importRegex));
    for (const match of matches) {
      const importUrl = match[1];
      if (isIconFont(importUrl)) continue;
      if (!isStylesheetLoaded(importUrl)) {
        styleImports.push(importUrl);
      }
    }
  }
  await Promise.all(styleImports.map(injectLinkIfMissing));
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter((link) => link.href);
  let finalCSS = "";
  for (const link of links) {
    try {
      const res = await fetchResource(link.href, { useProxy });
      const cssText = await res.text();
      if (isIconFont(link.href) || isIconFont(cssText)) continue;
      const faceRegex = /@font-face[^{}]*{[^}]*}/g;
      let cssFinal = cssText;
      for (const face of cssText.match(faceRegex) || []) {
        const famMatch = face.match(/font-family:\s*([^;]+);/i);
        if (!famMatch) continue;
        const family = famMatch[1].replace(/['"]/g, "").trim();
        const weightMatch = face.match(/font-weight:\s*([^;]+);/i);
        const styleMatch = face.match(/font-style:\s*([^;]+);/i);
        const weight = weightMatch ? weightMatch[1].trim() : "normal";
        const style = styleMatch ? styleMatch[1].trim() : "normal";
        const key = `${family}__${weight}__${style}`;
        const urlRegex = /url\((["']?)([^"')]+)\1\)/g;
        const hasURL = /url\(/i.test(face);
        const hasLocal = /local\(/i.test(face);
        if (!hasURL && hasLocal) {
          continue;
        }
        if (!loadedFonts.has(key)) {
          cssFinal = cssFinal.replace(face, "");
          continue;
        }
        let inlined = face;
        const matches = Array.from(face.matchAll(urlRegex));
        for (const match of matches) {
          let rawUrl = extractURL(match[0]);
          if (!rawUrl) continue;
          let url = rawUrl;
          if (!url.startsWith("http") && !url.startsWith("data:")) {
            url = new URL(url, link.href).href;
          }
          if (isIconFont(url)) continue;
          if (cache.resource.has(url)) {
            cache.font.add(url);
            inlined = inlined.replace(match[0], `url(${cache.resource.get(url)})`);
            continue;
          }
          if (cache.font.has(url)) continue;
          try {
            const fontRes = await fetchResource(url, { useProxy });
            const blob = await fontRes.blob();
            const b64 = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
            cache.resource.set(url, b64);
            cache.font.add(url);
            inlined = inlined.replace(match[0], `url(${b64})`);
          } catch (e) {
            console.warn("[snapdom] Failed to fetch font resource:", url);
          }
        }
        cssFinal = cssFinal.replace(face, inlined);
      }
      finalCSS += cssFinal + "\n";
    } catch (e) {
      console.warn("[snapdom] Failed to fetch CSS:", link.href);
    }
  }
  for (const sheet of document.styleSheets) {
    try {
      if (!sheet.href || links.every((link) => link.href !== sheet.href)) {
        for (const rule of sheet.cssRules) {
          if (rule.type === CSSRule.FONT_FACE_RULE) {
            const src = rule.style.getPropertyValue("src");
            const family = rule.style.getPropertyValue("font-family");
            if (!src || isIconFont(family)) continue;
            const weightVal = rule.style.getPropertyValue("font-weight") || "normal";
            const styleVal = rule.style.getPropertyValue("font-style") || "normal";
            const key = `${family}__${weightVal}__${styleVal}`;
            const urlRegex = /url\((["']?)([^"')]+)\1\)/g;
            const localRegex = /local\((["']?)[^)]+?\1\)/g;
            const hasURL = !!src.match(urlRegex);
            const hasLocal = !!src.match(localRegex);
            if (!hasURL && hasLocal) {
              finalCSS += `@font-face{font-family:${family};src:${src};font-style:${styleVal};font-weight:${weightVal};}`;
              continue;
            }
            if (!loadedFonts.has(key)) continue;
            let inlinedSrc = src;
            const matches = Array.from(src.matchAll(urlRegex));
            for (const match of matches) {
              let rawUrl = match[2].trim();
              if (!rawUrl) continue;
              let url = rawUrl;
              if (!url.startsWith("http") && !url.startsWith("data:")) {
                url = new URL(url, sheet.href || location.href).href;
              }
              if (isIconFont(url)) continue;
              if (cache.resource.has(url)) {
                cache.font.add(url);
                inlinedSrc = inlinedSrc.replace(match[0], `url(${cache.resource.get(url)})`);
                continue;
              }
              if (cache.font.has(url)) continue;
              try {
                const res = await fetchResource(url, { useProxy });
                const blob = await res.blob();
                const b64 = await new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result);
                  reader.readAsDataURL(blob);
                });
                cache.resource.set(url, b64);
                cache.font.add(url);
                inlinedSrc = inlinedSrc.replace(match[0], `url(${b64})`);
              } catch (e) {
                console.warn("[snapdom] Failed to fetch font URL:", url);
              }
            }
            finalCSS += `@font-face{font-family:${family};src:${inlinedSrc};font-style:${styleVal};font-weight:${weightVal};}`;
          }
        }
      }
    } catch (e) {
      console.warn("[snapdom] Cannot access stylesheet", sheet.href, e);
    }
  }
  for (const font of document.fonts) {
    if (font.family && font.status === "loaded" && font._snapdomSrc) {
      if (isIconFont(font.family)) continue;
      let b64 = font._snapdomSrc;
      if (!b64.startsWith("data:")) {
        if (cache.resource.has(font._snapdomSrc)) {
          b64 = cache.resource.get(font._snapdomSrc);
          cache.font.add(font._snapdomSrc);
        } else if (!cache.font.has(font._snapdomSrc)) {
          try {
            const res = await fetchResource(font._snapdomSrc, { useProxy });
            const blob = await res.blob();
            b64 = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
            cache.resource.set(font._snapdomSrc, b64);
            cache.font.add(font._snapdomSrc);
          } catch (e) {
            console.warn("[snapdom] Failed to fetch dynamic font src:", font._snapdomSrc);
            continue;
          }
        }
      }
      finalCSS += `@font-face{font-family:'${font.family}';src:url(${b64});font-style:${font.style || "normal"};font-weight:${font.weight || "normal"};}`;
    }
  }
  for (const font of localFonts) {
    if (!font || typeof font !== "object") continue;
    const { family, src, weight = "normal", style = "normal" } = font;
    if (!family || !src) continue;
    let b64 = src;
    if (!b64.startsWith("data:")) {
      try {
        const res = await fetchResource(src, { useProxy });
        const blob = await res.blob();
        b64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        cache.resource.set(src, b64);
        cache.font.add(src);
      } catch (e) {
        console.warn("[snapdom] Failed to load local font:", src);
        continue;
      }
    } else {
      cache.resource.set(src, b64);
      cache.font.add(src);
    }
    finalCSS += `@font-face{font-family:'${family}';src:url(${b64});font-style:${style};font-weight:${weight};}`;
  }
  if (finalCSS) {
    cache.resource.set("fonts-embed-css", finalCSS);
    if (preCached) {
      const style = document.createElement("style");
      style.setAttribute("data-snapdom", "embedFonts");
      style.textContent = finalCSS;
      document.head.appendChild(style);
    }
  }
  return finalCSS;
}

// src/modules/pseudo.js
async function inlinePseudoElements(source, clone, styleMap, styleCache, options) {
  if (!(source instanceof Element) || !(clone instanceof Element)) return;
  for (const pseudo of ["::before", "::after", "::first-letter"]) {
    try {
      const style = getStyle(source, pseudo);
      if (!style || typeof style[Symbol.iterator] !== "function") continue;
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
        const key2 = getStyleKey(snapshot2, "span", options);
        styleMap.set(span, key2);
        const restNode = document.createTextNode(rest);
        clone.replaceChild(restNode, textNode);
        clone.insertBefore(span, restNode);
        continue;
      }
      const content = style.content;
      const cleanContent = /counter\s*\(|counters\s*\(/.test(content) ? "- " : parseContent(content);
      const bg = style.backgroundImage;
      const bgColor = style.backgroundColor;
      const fontFamily = style.fontFamily;
      const fontSize = parseInt(style.fontSize) || 32;
      const fontWeight = parseInt(style.fontWeight) || false;
      const color = style.color || "#000";
      const display = style.display;
      const width = parseFloat(style.width);
      const height = parseFloat(style.height);
      const borderStyle = style.borderStyle;
      const borderWidth = parseFloat(style.borderWidth);
      const transform = style.transform;
      const isIconFont2 = isIconFont(fontFamily);
      const hasExplicitContent = content !== "none" && cleanContent !== "";
      const hasBg = bg && bg !== "none";
      const hasBgColor = bgColor && bgColor !== "transparent" && bgColor !== "rgba(0, 0, 0, 0)";
      const hasBox = display !== "inline" && (width > 0 || height > 0);
      const hasBorder = borderStyle && borderStyle !== "none" && borderWidth > 0;
      const hasTransform = transform && transform !== "none";
      const shouldRender = hasExplicitContent || hasBg || hasBgColor || hasBox || hasBorder || hasTransform;
      if (!shouldRender) continue;
      const pseudoEl = document.createElement("span");
      pseudoEl.dataset.snapdomPseudo = pseudo;
      pseudoEl.style.verticalAlign = "middle";
      const snapshot = snapshotComputedStyle(style);
      const key = getStyleKey(snapshot, "span", options);
      styleMap.set(pseudoEl, key);
      if (isIconFont2 && cleanContent.length === 1) {
        const { dataUrl, width: width2, height: height2 } = await iconToImage(cleanContent, fontFamily, fontWeight, fontSize, color);
        const imgEl = document.createElement("img");
        imgEl.src = dataUrl;
        imgEl.style = `height:${fontSize}px;width:${width2 / height2 * fontSize}px;object-fit:contain;`;
        pseudoEl.appendChild(imgEl);
        clone.dataset.snapdomHasIcon = "true";
      } else if (cleanContent.startsWith("url(")) {
        const rawUrl = extractURL(cleanContent);
        if (rawUrl?.trim()) {
          try {
            const imgEl = document.createElement("img");
            const dataUrl = await fetchImage(safeEncodeURI(rawUrl), options);
            imgEl.src = dataUrl;
            imgEl.style = `width:${fontSize}px;height:auto;object-fit:contain;`;
            pseudoEl.appendChild(imgEl);
          } catch (e) {
            console.error(`[snapdom] Error in pseudo ${pseudo} for`, source, e);
          }
        }
      } else if (!isIconFont2 && hasExplicitContent) {
        pseudoEl.textContent = cleanContent;
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
      const hasVisibleBox = hasContent2 || hasBg || hasBgColor || hasBox || hasBorder || hasTransform;
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
    await inlinePseudoElements(sChildren[i], cChildren[i], styleMap, styleCache, options);
  }
}

// src/modules/svgDefs.js
function inlineExternalDefsAndSymbols(rootElement) {
  if (!rootElement) return;
  const usedIds = /* @__PURE__ */ new Set();
  rootElement.querySelectorAll("use").forEach((use) => {
    const href = use.getAttribute("xlink:href") || use.getAttribute("href");
    if (href && href.startsWith("#")) {
      usedIds.add(href.slice(1));
    }
  });
  if (!usedIds.size) return;
  const allGlobal = Array.from(document.querySelectorAll("svg > symbol, svg > defs"));
  const globalSymbols = allGlobal.filter((el) => el.tagName.toLowerCase() === "symbol");
  const globalDefs = allGlobal.filter((el) => el.tagName.toLowerCase() === "defs");
  let container = rootElement.querySelector("svg.inline-defs-container");
  if (!container) {
    container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    container.setAttribute("aria-hidden", "true");
    container.setAttribute("style", "position: absolute; width: 0; height: 0; overflow: hidden;");
    container.classList.add("inline-defs-container");
    rootElement.insertBefore(container, rootElement.firstChild);
  }
  const existingIds = /* @__PURE__ */ new Set();
  rootElement.querySelectorAll("symbol[id], defs > *[id]").forEach((el) => {
    existingIds.add(el.id);
  });
  usedIds.forEach((id) => {
    if (existingIds.has(id)) return;
    const symbol = globalSymbols.find((sym) => sym.id === id);
    if (symbol) {
      container.appendChild(symbol.cloneNode(true));
      existingIds.add(id);
      return;
    }
    for (const defs of globalDefs) {
      const defEl = defs.querySelector(`#${CSS.escape(id)}`);
      if (defEl) {
        let defsContainer = container.querySelector("defs");
        if (!defsContainer) {
          defsContainer = document.createElementNS("http://www.w3.org/2000/svg", "defs");
          container.appendChild(defsContainer);
        }
        defsContainer.appendChild(defEl.cloneNode(true));
        existingIds.add(id);
        break;
      }
    }
  });
}

// src/core/prepare.js
async function prepareClone(element, compress = false, embedFonts = false, options = {}) {
  const styleMap = /* @__PURE__ */ new Map();
  const styleCache = /* @__PURE__ */ new WeakMap();
  const nodeMap = /* @__PURE__ */ new Map();
  let clone;
  let classCSS = "";
  stabilizeLayout(element);
  try {
    inlineExternalDefsAndSymbols(element);
  } catch (e) {
    console.warn("inlineExternal defs or symbol failed:", e);
  }
  try {
    clone = deepClone(element, styleMap, styleCache, nodeMap, compress, options, element);
  } catch (e) {
    console.warn("deepClone failed:", e);
    throw e;
  }
  try {
    await inlinePseudoElements(element, clone, styleMap, styleCache, compress, embedFonts, options.useProxy);
  } catch (e) {
    console.warn("inlinePseudoElements failed:", e);
  }
  await resolveBlobUrlsInTree(clone);
  if (compress) {
    const keyToClass = generateCSSClasses(styleMap);
    classCSS = Array.from(keyToClass.entries()).map(([key, className]) => `.${className}{${key}}`).join("");
    for (const [node, key] of styleMap.entries()) {
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
  } else {
    for (const [node, key] of styleMap.entries()) {
      if (node.tagName === "STYLE") continue;
      node.setAttribute("style", key.replace(/;/g, "; "));
    }
  }
  for (const [cloneNode, originalNode] of nodeMap.entries()) {
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
  if (element === nodeMap.get(clone)) {
    const computed = styleCache.get(element) || window.getComputedStyle(element);
    styleCache.set(element, computed);
    const transform = stripTranslate(computed.transform);
    clone.style.margin = "0";
    clone.style.position = "static";
    clone.style.top = "auto";
    clone.style.left = "auto";
    clone.style.right = "auto";
    clone.style.bottom = "auto";
    clone.style.zIndex = "auto";
    clone.style.float = "none";
    clone.style.clear = "none";
    clone.style.transform = transform || "";
  }
  for (const [cloneNode, originalNode] of nodeMap.entries()) {
    if (originalNode.tagName === "PRE") {
      cloneNode.style.marginTop = "0";
      cloneNode.style.marginBlockStart = "0";
    }
  }
  return { clone, classCSS, styleCache };
}
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
var _blobToDataUrlCache = /* @__PURE__ */ new Map();
async function blobUrlToDataUrl(blobUrl) {
  if (_blobToDataUrlCache.has(blobUrl)) return _blobToDataUrlCache.get(blobUrl);
  const res = await fetch(blobUrl);
  if (!res.ok) throw new Error(`[SnapDOM] HTTP ${res.status} on blob fetch (${blobUrl})`);
  const blob = await res.blob();
  const dataUrl = await new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onloadend = () => {
      const v = fr.result;
      if (typeof v === "string" && v.startsWith("data:")) resolve(v);
      else reject(new Error("[SnapDOM] Invalid data URL from blob"));
    };
    fr.onerror = () => reject(new Error("[SnapDOM] FileReader error"));
    fr.readAsDataURL(blob);
  });
  _blobToDataUrlCache.set(blobUrl, dataUrl);
  return dataUrl;
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

// src/modules/images.js
async function inlineImages(clone, options = {}) {
  const imgs = Array.from(clone.querySelectorAll("img"));
  const processImg = async (img) => {
    if (!img.getAttribute("src")) {
      const eff = img.currentSrc || img.src || "";
      if (eff) img.setAttribute("src", eff);
    }
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
    const src = img.src;
    try {
      const dataUrl = await fetchImage(src, { useProxy: options.useProxy });
      img.src = dataUrl;
      if (!img.width) img.width = img.naturalWidth || 100;
      if (!img.height) img.height = img.naturalHeight || 100;
    } catch {
      const fallback = document.createElement("div");
      fallback.style = `width: ${img.width || 100}px; height: ${img.height || 100}px; background: #ccc; display: inline-block; text-align: center; line-height: ${img.height || 100}px; color: #666; font-size: 12px;`;
      fallback.innerText = "img";
      img.replaceWith(fallback);
    }
  };
  for (let i = 0; i < imgs.length; i += 4) {
    const group = imgs.slice(i, i + 4).map(processImg);
    await Promise.allSettled(group);
  }
}

// src/modules/background.js
async function inlineBackgroundImages(source, clone, styleCache, options = {}) {
  const queue = [[source, clone]];
  const imageProps = [
    "background-image",
    "mask",
    "mask-image",
    "-webkit-mask-image",
    "mask-source",
    "mask-box-image-source",
    "mask-border-source",
    "-webkit-mask-box-image-source",
    "border-image",
    "border-image-source",
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
    for (const prop of imageProps) {
      if (["border-image-slice", "border-image-width", "border-image-outset", "border-image-repeat"].includes(prop) && !hasBorderImage) {
        continue;
      }
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
    const bgColor = style.getPropertyValue("background-color");
    if (bgColor && bgColor !== "transparent" && bgColor !== "rgba(0, 0, 0, 0)") {
      cloneNode.style.backgroundColor = bgColor;
    }
    const sChildren = Array.from(srcNode.children);
    const cChildren = Array.from(cloneNode.children);
    for (let i = 0; i < Math.min(sChildren.length, cChildren.length); i++) {
      queue.push([sChildren[i], cChildren[i]]);
    }
  }
}

// src/core/capture.js
async function captureDOM(element, options = {}) {
  if (!element) throw new Error("Element cannot be null or undefined");
  cache.reset();
  const { compress = true, embedFonts = false, fast = true, scale = 1, useProxy = "", localFonts = [] } = options;
  let clone, classCSS, styleCache;
  let fontsCSS = "";
  let baseCSS = "";
  let dataURL;
  let svgString;
  ({ clone, classCSS, styleCache } = await prepareClone(element, compress, embedFonts, options));
  await new Promise((resolve) => {
    idle(async () => {
      await inlineImages(clone, options);
      resolve();
    }, { fast });
  });
  await new Promise((resolve) => {
    idle(async () => {
      await inlineBackgroundImages(element, clone, styleCache, options);
      resolve();
    }, { fast });
  });
  if (embedFonts) {
    await new Promise((resolve) => {
      idle(async () => {
        fontsCSS = await embedCustomFonts({ localFonts, useProxy });
        resolve();
      }, { fast });
    });
  }
  if (compress) {
    const usedTags = collectUsedTagNames(clone).sort();
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
  }
  await new Promise((resolve) => {
    idle(() => {
      const rect = element.getBoundingClientRect();
      let w = rect.width;
      let h = rect.height;
      const hasW = Number.isFinite(options.width);
      const hasH = Number.isFinite(options.height);
      const hasScale = typeof scale === "number" && scale !== 1;
      if (!hasScale) {
        const aspect = rect.width / rect.height;
        if (hasW && hasH) {
          w = options.width;
          h = options.height;
        } else if (hasW) {
          w = options.width;
          h = w / aspect;
        } else if (hasH) {
          h = options.height;
          w = h * aspect;
        }
      }
      w = Math.ceil(w);
      h = Math.ceil(h);
      clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      clone.style.transformOrigin = "top left";
      if (!hasScale && (hasW || hasH)) {
        const originalW = rect.width;
        const originalH = rect.height;
        const scaleX = w / originalW;
        const scaleY = h / originalH;
        const existingTransform = clone.style.transform || "";
        const scaleTransform = `scale(${scaleX}, ${scaleY})`;
        clone.style.transform = `${scaleTransform} ${existingTransform}`.trim();
      }
      const svgNS = "http://www.w3.org/2000/svg";
      const fo = document.createElementNS(svgNS, "foreignObject");
      fo.setAttribute("width", "100%");
      fo.setAttribute("height", "100%");
      const styleTag = document.createElement("style");
      styleTag.textContent = baseCSS + fontsCSS + "svg{overflow:visible;}" + classCSS;
      fo.appendChild(styleTag);
      fo.appendChild(clone);
      const serializer = new XMLSerializer();
      const foString = serializer.serializeToString(fo);
      const svgHeader = `<svg xmlns="${svgNS}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`;
      const svgFooter = "</svg>";
      svgString = svgHeader + foString + svgFooter;
      dataURL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
      resolve();
    }, { fast });
  });
  const sandbox = document.getElementById("snapdom-sandbox");
  if (sandbox && sandbox.style.position === "absolute") sandbox.remove();
  return dataURL;
}

// src/api/snapdom.js
async function toImg(url, { scale = 1 } = {}) {
  const img = new Image();
  img.src = url;
  await img.decode();
  if (scale !== 1) {
    img.style.width = `${img.naturalWidth * scale}px`;
    img.style.height = `${img.naturalHeight * scale}px`;
  }
  return img;
}
async function toCanvas(url, { dpr = 1, scale = 1 } = {}) {
  const img = new Image();
  img.src = url;
  img.crossOrigin = "anonymous";
  img.loading = "eager";
  img.decoding = "sync";
  const isSafariBrowser = isSafari();
  let appended = false;
  if (isSafariBrowser) {
    document.body.appendChild(img);
    appended = true;
  }
  await img.decode();
  if (isSafariBrowser) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (img.width === 0 || img.height === 0) {
    if (appended) img.remove();
    throw new Error("Image failed to load or has no dimensions");
  }
  const width = img.naturalWidth * scale;
  const height = img.naturalHeight * scale;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width * dpr);
  canvas.height = Math.ceil(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.drawImage(img, 0, 0, width, height);
  if (appended) img.remove();
  return canvas;
}
async function toBlob(url, {
  type = "svg",
  scale = 1,
  backgroundColor = "#fff",
  quality
} = {}) {
  const mime = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp"
  }[type] || "image/png";
  if (type === "svg") {
    const svgText = decodeURIComponent(url.split(",")[1]);
    return new Blob([svgText], { type: "image/svg+xml" });
  }
  const canvas = await createBackground(url, { dpr: 1, scale }, backgroundColor);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), `${mime}`, quality);
  });
}
async function createBackground(url, { dpr = 1, scale = 1 }, backgroundColor) {
  const baseCanvas = await toCanvas(url, { dpr, scale });
  if (!backgroundColor) return baseCanvas;
  const temp = document.createElement("canvas");
  temp.width = baseCanvas.width;
  temp.height = baseCanvas.height;
  const ctx = temp.getContext("2d");
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, temp.width, temp.height);
  ctx.drawImage(baseCanvas, 0, 0);
  return temp;
}
async function toRasterImg(url, { dpr = 1, scale = 1, backgroundColor, quality }, format = "png") {
  const defaultBg = ["jpg", "jpeg", "webp"].includes(format) ? "#fff" : void 0;
  const finalBg = backgroundColor ?? defaultBg;
  const canvas = await createBackground(url, { dpr, scale }, finalBg);
  const img = new Image();
  img.src = canvas.toDataURL(`image/${format}`, quality);
  await img.decode();
  img.style.width = `${canvas.width / dpr}px`;
  img.style.height = `${canvas.height / dpr}px`;
  return img;
}
async function download(url, { dpr = 1, scale = 1, backgroundColor, format = "png", filename = "snapDOM" } = {}) {
  if (format === "svg") {
    const blob = await toBlob(url);
    const objectURL = URL.createObjectURL(blob);
    const a2 = document.createElement("a");
    a2.href = objectURL;
    a2.download = `${filename}.svg`;
    a2.click();
    URL.revokeObjectURL(objectURL);
    return;
  }
  const defaultBg = ["jpg", "jpeg", "webp"].includes(format) ? "#fff" : void 0;
  const finalBg = backgroundColor ?? defaultBg;
  const canvas = await createBackground(url, { dpr, scale }, finalBg);
  const mime = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp"
  }[format] || "image/png";
  const dataURL = canvas.toDataURL(mime);
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = `${filename}.${format}`;
  a.click();
}
async function snapdom(element, options = {}) {
  options = { scale: 1, ...options };
  if (!element) throw new Error("Element cannot be null or undefined");
  if (options.iconFonts) {
    extendIconFonts(options.iconFonts);
  }
  return await snapdom.capture(element, options);
}
snapdom.capture = async (el, options = {}) => {
  const url = await captureDOM(el, options);
  const dpr = options.dpr ?? (window.devicePixelRatio || 1);
  const scale = options.scale || 1;
  return {
    url,
    options,
    toRaw: () => url,
    toImg: (opts = {}) => toImg(url, { dpr, scale, ...opts }),
    toCanvas: (opts = {}) => toCanvas(url, { dpr, scale, ...opts }),
    toBlob: (opts = {}) => toBlob(url, { dpr, scale, ...opts }),
    toPng: (opts = {}) => toRasterImg(url, { dpr, scale, ...opts }, "png"),
    toJpg: (opts = {}) => toRasterImg(url, { dpr, scale, ...opts }, "jpeg"),
    toWebp: (opts = {}) => toRasterImg(url, { dpr, scale, ...opts }, "webp"),
    download: ({ format = "png", filename = "snapDOM", backgroundColor, ...opts } = {}) => download(url, { dpr, scale, format, filename, backgroundColor, ...opts })
  };
};
snapdom.toRaw = async (el, options) => (await snapdom.capture(el, options)).toRaw();
snapdom.toImg = async (el, options) => (await snapdom.capture(el, options)).toImg();
snapdom.toCanvas = async (el, options) => (await snapdom.capture(el, options)).toCanvas();
snapdom.toBlob = async (el, options) => (await snapdom.capture(el, options)).toBlob(options);
snapdom.toPng = async (el, options) => (await snapdom.capture(el, options)).toPng(options);
snapdom.toJpg = async (el, options) => (await snapdom.capture(el, options)).toJpg(options);
snapdom.toWebp = async (el, options) => (await snapdom.capture(el, options)).toWebp(options);
snapdom.download = async (el, options = {}) => {
  const {
    format = "png",
    filename = "capture",
    backgroundColor,
    ...rest
  } = options;
  const capture = await snapdom.capture(el, rest);
  return await capture.download({ format, filename, backgroundColor });
};

// src/api/preCache.js
async function preCache(root = document, options = {}) {
  const { embedFonts = true, reset = false, useProxy } = options;
  if (reset) {
    cache.image.clear();
    cache.background.clear();
    cache.resource.clear();
    cache.defaultStyle.clear();
    cache.baseStyle.clear();
    cache.font.clear();
    cache.computedStyle = /* @__PURE__ */ new WeakMap();
    return;
  }
  try {
    await document.fonts.ready;
  } catch {
  }
  precacheCommonTags();
  let imgEls = [], allEls = [];
  if (root?.querySelectorAll) {
    imgEls = Array.from(root.querySelectorAll("img[src]"));
    allEls = Array.from(root.querySelectorAll("*"));
  }
  const promises = [];
  for (const img of imgEls) {
    const src = img?.src;
    if (!src) continue;
    if (!cache.image.has(src)) {
      const p = Promise.resolve().then(() => fetchImage(src, { useProxy })).then((dataURL) => {
        cache.image.set(src, dataURL);
      }).catch(() => {
      });
      promises.push(p);
    }
  }
  for (const el of allEls) {
    let bg = "";
    try {
      bg = getStyle(el).backgroundImage;
    } catch {
    }
    if (bg && bg !== "none") {
      const bgSplits = splitBackgroundImage(bg);
      for (const entry of bgSplits) {
        if (entry.startsWith("url(")) {
          const p = Promise.resolve().then(() => inlineSingleBackgroundEntry(entry, { ...options, useProxy })).catch(() => {
          });
          promises.push(p);
        }
      }
    }
  }
  if (embedFonts) {
    try {
      await embedCustomFonts({ preCached: true, localFonts: options.localFonts, useProxy: options.useProxy });
    } catch {
    }
    ;
  }
  await Promise.allSettled(promises);
}
export {
  preCache,
  snapdom
};
