/*!
 * MIT License
 * 
 * Copyright (c) 2017-2024 Peculiar Ventures, LLC
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
const Mm = "[object ArrayBuffer]";
class L {
  static isArrayBuffer(e) {
    return Object.prototype.toString.call(e) === Mm;
  }
  static toArrayBuffer(e) {
    return this.isArrayBuffer(e) ? e : e.byteLength === e.buffer.byteLength || e.byteOffset === 0 && e.byteLength === e.buffer.byteLength ? e.buffer : this.toUint8Array(e.buffer).slice(e.byteOffset, e.byteOffset + e.byteLength).buffer;
  }
  static toUint8Array(e) {
    return this.toView(e, Uint8Array);
  }
  static toView(e, t) {
    if (e.constructor === t)
      return e;
    if (this.isArrayBuffer(e))
      return new t(e);
    if (this.isArrayBufferView(e))
      return new t(e.buffer, e.byteOffset, e.byteLength);
    throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
  }
  static isBufferSource(e) {
    return this.isArrayBufferView(e) || this.isArrayBuffer(e);
  }
  static isArrayBufferView(e) {
    return ArrayBuffer.isView(e) || e && this.isArrayBuffer(e.buffer);
  }
  static isEqual(e, t) {
    const s = L.toUint8Array(e), n = L.toUint8Array(t);
    if (s.length !== n.byteLength)
      return !1;
    for (let i = 0; i < s.length; i++)
      if (s[i] !== n[i])
        return !1;
    return !0;
  }
  static concat(...e) {
    let t;
    Array.isArray(e[0]) && !(e[1] instanceof Function) || Array.isArray(e[0]) && e[1] instanceof Function ? t = e[0] : e[e.length - 1] instanceof Function ? t = e.slice(0, e.length - 1) : t = e;
    let s = 0;
    for (const a of t)
      s += a.byteLength;
    const n = new Uint8Array(s);
    let i = 0;
    for (const a of t) {
      const l = this.toUint8Array(a);
      n.set(l, i), i += l.length;
    }
    return e[e.length - 1] instanceof Function ? this.toView(n, e[e.length - 1]) : n.buffer;
  }
}
const Yu = "string", _m = /^[0-9a-f\s]+$/i, $m = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, Km = /^[a-zA-Z0-9-_]+$/;
class Rf {
  static fromString(e) {
    const t = unescape(encodeURIComponent(e)), s = new Uint8Array(t.length);
    for (let n = 0; n < t.length; n++)
      s[n] = t.charCodeAt(n);
    return s.buffer;
  }
  static toString(e) {
    const t = L.toUint8Array(e);
    let s = "";
    for (let i = 0; i < t.length; i++)
      s += String.fromCharCode(t[i]);
    return decodeURIComponent(escape(s));
  }
}
class Lt {
  static toString(e, t = !1) {
    const s = L.toArrayBuffer(e), n = new DataView(s);
    let i = "";
    for (let a = 0; a < s.byteLength; a += 2) {
      const l = n.getUint16(a, t);
      i += String.fromCharCode(l);
    }
    return i;
  }
  static fromString(e, t = !1) {
    const s = new ArrayBuffer(e.length * 2), n = new DataView(s);
    for (let i = 0; i < e.length; i++)
      n.setUint16(i * 2, e.charCodeAt(i), t);
    return s;
  }
}
class H {
  static isHex(e) {
    return typeof e === Yu && _m.test(e);
  }
  static isBase64(e) {
    return typeof e === Yu && $m.test(e);
  }
  static isBase64Url(e) {
    return typeof e === Yu && Km.test(e);
  }
  static ToString(e, t = "utf8") {
    const s = L.toUint8Array(e);
    switch (t.toLowerCase()) {
      case "utf8":
        return this.ToUtf8String(s);
      case "binary":
        return this.ToBinary(s);
      case "hex":
        return this.ToHex(s);
      case "base64":
        return this.ToBase64(s);
      case "base64url":
        return this.ToBase64Url(s);
      case "utf16le":
        return Lt.toString(s, !0);
      case "utf16":
      case "utf16be":
        return Lt.toString(s);
      default:
        throw new Error(`Unknown type of encoding '${t}'`);
    }
  }
  static FromString(e, t = "utf8") {
    if (!e)
      return new ArrayBuffer(0);
    switch (t.toLowerCase()) {
      case "utf8":
        return this.FromUtf8String(e);
      case "binary":
        return this.FromBinary(e);
      case "hex":
        return this.FromHex(e);
      case "base64":
        return this.FromBase64(e);
      case "base64url":
        return this.FromBase64Url(e);
      case "utf16le":
        return Lt.fromString(e, !0);
      case "utf16":
      case "utf16be":
        return Lt.fromString(e);
      default:
        throw new Error(`Unknown type of encoding '${t}'`);
    }
  }
  static ToBase64(e) {
    const t = L.toUint8Array(e);
    if (typeof btoa < "u") {
      const s = this.ToString(t, "binary");
      return btoa(s);
    } else
      return Buffer.from(t).toString("base64");
  }
  static FromBase64(e) {
    const t = this.formatString(e);
    if (!t)
      return new ArrayBuffer(0);
    if (!H.isBase64(t))
      throw new TypeError("Argument 'base64Text' is not Base64 encoded");
    return typeof atob < "u" ? this.FromBinary(atob(t)) : new Uint8Array(Buffer.from(t, "base64")).buffer;
  }
  static FromBase64Url(e) {
    const t = this.formatString(e);
    if (!t)
      return new ArrayBuffer(0);
    if (!H.isBase64Url(t))
      throw new TypeError("Argument 'base64url' is not Base64Url encoded");
    return this.FromBase64(this.Base64Padding(t.replace(/\-/g, "+").replace(/\_/g, "/")));
  }
  static ToBase64Url(e) {
    return this.ToBase64(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
  }
  static FromUtf8String(e, t = H.DEFAULT_UTF8_ENCODING) {
    switch (t) {
      case "ascii":
        return this.FromBinary(e);
      case "utf8":
        return Rf.fromString(e);
      case "utf16":
      case "utf16be":
        return Lt.fromString(e);
      case "utf16le":
      case "usc2":
        return Lt.fromString(e, !0);
      default:
        throw new Error(`Unknown type of encoding '${t}'`);
    }
  }
  static ToUtf8String(e, t = H.DEFAULT_UTF8_ENCODING) {
    switch (t) {
      case "ascii":
        return this.ToBinary(e);
      case "utf8":
        return Rf.toString(e);
      case "utf16":
      case "utf16be":
        return Lt.toString(e);
      case "utf16le":
      case "usc2":
        return Lt.toString(e, !0);
      default:
        throw new Error(`Unknown type of encoding '${t}'`);
    }
  }
  static FromBinary(e) {
    const t = e.length, s = new Uint8Array(t);
    for (let n = 0; n < t; n++)
      s[n] = e.charCodeAt(n);
    return s.buffer;
  }
  static ToBinary(e) {
    const t = L.toUint8Array(e);
    let s = "";
    for (let n = 0; n < t.length; n++)
      s += String.fromCharCode(t[n]);
    return s;
  }
  static ToHex(e) {
    const t = L.toUint8Array(e);
    let s = "";
    const n = t.length;
    for (let i = 0; i < n; i++) {
      const a = t[i];
      a < 16 && (s += "0"), s += a.toString(16);
    }
    return s;
  }
  static FromHex(e) {
    let t = this.formatString(e);
    if (!t)
      return new ArrayBuffer(0);
    if (!H.isHex(t))
      throw new TypeError("Argument 'hexString' is not HEX encoded");
    t.length % 2 && (t = `0${t}`);
    const s = new Uint8Array(t.length / 2);
    for (let n = 0; n < t.length; n = n + 2) {
      const i = t.slice(n, n + 2);
      s[n / 2] = parseInt(i, 16);
    }
    return s.buffer;
  }
  static ToUtf16String(e, t = !1) {
    return Lt.toString(e, t);
  }
  static FromUtf16String(e, t = !1) {
    return Lt.fromString(e, t);
  }
  static Base64Padding(e) {
    const t = 4 - e.length % 4;
    if (t < 4)
      for (let s = 0; s < t; s++)
        e += "=";
    return e;
  }
  static formatString(e) {
    return e?.replace(/[\n\r\t ]/g, "") || "";
  }
}
H.DEFAULT_UTF8_ENCODING = "utf8";
/*!
 Copyright (c) Peculiar Ventures, LLC
*/
function r(o, e, t) {
  var s;
  return o instanceof Object && (s = o[e]) !== null && s !== void 0 ? s : t;
}
function Qu(o, e = 0, t = o.byteLength - e, s = !1) {
  let n = "";
  for (const i of new Uint8Array(o, e, t)) {
    const a = i.toString(16).toUpperCase();
    a.length === 1 && (n += "0"), n += a, s && (n += " ");
  }
  return n.trim();
}
function er(o, e) {
  let t = 0;
  if (o.length === 1)
    return o[0];
  for (let s = o.length - 1; s >= 0; s--)
    t += o[o.length - 1 - s] * Math.pow(2, e * s);
  return t;
}
function Ss(o, e, t = -1) {
  const s = t;
  let n = o, i = 0, a = Math.pow(2, e);
  for (let l = 1; l < 8; l++) {
    if (o < a) {
      let c;
      if (s < 0)
        c = new ArrayBuffer(l), i = l;
      else {
        if (s < l)
          return new ArrayBuffer(0);
        c = new ArrayBuffer(s), i = s;
      }
      const h = new Uint8Array(c);
      for (let m = l - 1; m >= 0; m--) {
        const g = Math.pow(2, m * e);
        h[i - m - 1] = Math.floor(n / g), n -= h[i - m - 1] * g;
      }
      return c;
    }
    a *= Math.pow(2, e);
  }
  return new ArrayBuffer(0);
}
function Pa(...o) {
  let e = 0, t = 0;
  for (const i of o)
    e += i.byteLength;
  const s = new ArrayBuffer(e), n = new Uint8Array(s);
  for (const i of o)
    n.set(new Uint8Array(i), t), t += i.byteLength;
  return s;
}
function Vh(...o) {
  let e = 0, t = 0;
  for (const i of o)
    e += i.length;
  const s = new ArrayBuffer(e), n = new Uint8Array(s);
  for (const i of o)
    n.set(i, t), t += i.length;
  return n;
}
function ld() {
  const o = new Uint8Array(this.valueHex);
  if (this.valueHex.byteLength >= 2) {
    const l = o[0] === 255 && o[1] & 128, c = o[0] === 0 && (o[1] & 128) === 0;
    (l || c) && this.warnings.push("Needlessly long format");
  }
  const e = new ArrayBuffer(this.valueHex.byteLength), t = new Uint8Array(e);
  for (let l = 0; l < this.valueHex.byteLength; l++)
    t[l] = 0;
  t[0] = o[0] & 128;
  const s = er(t, 8), n = new ArrayBuffer(this.valueHex.byteLength), i = new Uint8Array(n);
  for (let l = 0; l < this.valueHex.byteLength; l++)
    i[l] = o[l];
  return i[0] &= 127, er(i, 8) - s;
}
function Jm(o) {
  const e = o < 0 ? o * -1 : o;
  let t = 128;
  for (let s = 1; s < 8; s++) {
    if (e <= t) {
      if (o < 0) {
        const a = t - e, l = Ss(a, 8, s), c = new Uint8Array(l);
        return c[0] |= 128, l;
      }
      let n = Ss(e, 8, s), i = new Uint8Array(n);
      if (i[0] & 128) {
        const a = n.slice(0), l = new Uint8Array(a);
        n = new ArrayBuffer(n.byteLength + 1), i = new Uint8Array(n);
        for (let c = 0; c < a.byteLength; c++)
          i[c + 1] = l[c];
        i[0] = 0;
      }
      return n;
    }
    t *= Math.pow(2, 8);
  }
  return new ArrayBuffer(0);
}
function Ka(o, e) {
  if (o.byteLength !== e.byteLength)
    return !1;
  const t = new Uint8Array(o), s = new Uint8Array(e);
  for (let n = 0; n < t.length; n++)
    if (t[n] !== s[n])
      return !1;
  return !0;
}
function ot(o, e) {
  const t = o.toString(10);
  if (e < t.length)
    return "";
  const s = e - t.length, n = Array.from({ length: s });
  for (let a = 0; a < s; a++)
    n[a] = "0";
  return n.join("").concat(t);
}
const cd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", ud = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
function xh(o, e = !1, t = !1, s = !1) {
  let n = 0, i = 0, a = 0, l = "";
  const c = e ? ud : cd;
  if (s) {
    let h = 0;
    for (let m = 0; m < o.length; m++)
      if (o.charCodeAt(m) !== 0) {
        h = m;
        break;
      }
    o = o.slice(h);
  }
  for (; n < o.length; ) {
    const h = o.charCodeAt(n++);
    n >= o.length && (i = 1);
    const m = o.charCodeAt(n++);
    n >= o.length && (a = 1);
    const g = o.charCodeAt(n++), d = h >> 2, b = (h & 3) << 4 | m >> 4;
    let A = (m & 15) << 2 | g >> 6, E = g & 63;
    i === 1 ? A = E = 64 : a === 1 && (E = 64), t ? A === 64 ? l += `${c.charAt(d)}${c.charAt(b)}` : E === 64 ? l += `${c.charAt(d)}${c.charAt(b)}${c.charAt(A)}` : l += `${c.charAt(d)}${c.charAt(b)}${c.charAt(A)}${c.charAt(E)}` : l += `${c.charAt(d)}${c.charAt(b)}${c.charAt(A)}${c.charAt(E)}`;
  }
  return l;
}
function fc(o, e = !1, t = !1) {
  const s = e ? ud : cd;
  function n(c) {
    for (let h = 0; h < 64; h++)
      if (s.charAt(h) === c)
        return h;
    return 64;
  }
  function i(c) {
    return c === 64 ? 0 : c;
  }
  let a = 0, l = "";
  for (; a < o.length; ) {
    const c = n(o.charAt(a++)), h = a >= o.length ? 0 : n(o.charAt(a++)), m = a >= o.length ? 0 : n(o.charAt(a++)), g = a >= o.length ? 0 : n(o.charAt(a++)), d = i(c) << 2 | i(h) >> 4, b = (i(h) & 15) << 4 | i(m) >> 2, A = (i(m) & 3) << 6 | i(g);
    l += String.fromCharCode(d), m !== 64 && (l += String.fromCharCode(b)), g !== 64 && (l += String.fromCharCode(A));
  }
  if (t) {
    const c = l.length;
    let h = -1;
    for (let m = c - 1; m >= 0; m--)
      if (l.charCodeAt(m) !== 0) {
        h = m;
        break;
      }
    h !== -1 ? l = l.slice(0, h + 1) : l = "";
  }
  return l;
}
function xu(o) {
  let e = "";
  const t = new Uint8Array(o);
  for (const s of t)
    e += String.fromCharCode(s);
  return e;
}
function Ja(o) {
  const e = o.length, t = new ArrayBuffer(e), s = new Uint8Array(t);
  for (let n = 0; n < e; n++)
    s[n] = o.charCodeAt(n);
  return t;
}
const jm = Math.log(2);
function Fm(o) {
  const e = Math.log(o) / jm, t = Math.floor(e), s = Math.round(e);
  return t === s ? t : s;
}
function C(o, e) {
  for (const t of e)
    delete o[t];
}
/*!
 * Copyright (c) 2014, GMO GlobalSign
 * Copyright (c) 2015-2022, Peculiar Ventures
 * All rights reserved.
 * 
 * Author 2014-2019, Yury Strozhevsky
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice, this
 *   list of conditions and the following disclaimer in the documentation and/or
 *   other materials provided with the distribution.
 * 
 * * Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */
function Ou() {
  if (typeof BigInt > "u")
    throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.");
}
function rf(o) {
  let e = 0, t = 0;
  for (let n = 0; n < o.length; n++) {
    const i = o[n];
    e += i.byteLength;
  }
  const s = new Uint8Array(e);
  for (let n = 0; n < o.length; n++) {
    const i = o[n];
    s.set(new Uint8Array(i), t), t += i.byteLength;
  }
  return s.buffer;
}
function As(o, e, t, s) {
  return e instanceof Uint8Array ? e.byteLength ? t < 0 ? (o.error = "Wrong parameter: inputOffset less than zero", !1) : s < 0 ? (o.error = "Wrong parameter: inputLength less than zero", !1) : e.byteLength - t - s < 0 ? (o.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", !1) : !0 : (o.error = "Wrong parameter: inputBuffer has zero length", !1) : (o.error = "Wrong parameter: inputBuffer must be 'Uint8Array'", !1);
}
class af {
  constructor() {
    this.items = [];
  }
  write(e) {
    this.items.push(e);
  }
  final() {
    return rf(this.items);
  }
}
const Xa = [new Uint8Array([1])], Tf = "0123456789", Xu = "name", Df = "valueHexView", qm = "isHexOnly", Wm = "idBlock", Gm = "tagClass", Ym = "tagNumber", Qm = "isConstructed", Xm = "fromBER", Zm = "toBER", zm = "local", st = "", qt = new ArrayBuffer(0), Ju = new Uint8Array(0), dc = "EndOfContent", hd = "OCTET STRING", fd = "BIT STRING";
function ps(o) {
  var e;
  return e = class extends o {
    get valueHex() {
      return this.valueHexView.slice().buffer;
    }
    set valueHex(s) {
      this.valueHexView = new Uint8Array(s);
    }
    constructor(...s) {
      var n;
      super(...s);
      const i = s[0] || {};
      this.isHexOnly = (n = i.isHexOnly) !== null && n !== void 0 ? n : !1, this.valueHexView = i.valueHex ? L.toUint8Array(i.valueHex) : Ju;
    }
    fromBER(s, n, i, a) {
      const l = s instanceof ArrayBuffer ? new Uint8Array(s) : s;
      if (!As(this, l, n, i))
        return -1;
      const c = n + i;
      return this.valueHexView = l.subarray(n, c), this.valueHexView.length ? (this.blockLength = i, c) : (this.warnings.push("Zero buffer length"), n);
    }
    toBER(s = !1) {
      return this.isHexOnly ? s ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.byteLength === this.valueHexView.buffer.byteLength ? this.valueHexView.buffer : this.valueHexView.slice().buffer : (this.error = "Flag 'isHexOnly' is not set, abort", qt);
    }
    toJSON() {
      return {
        ...super.toJSON(),
        isHexOnly: this.isHexOnly,
        valueHex: H.ToHex(this.valueHexView)
      };
    }
  }, e.NAME = "hexBlock", e;
}
class sr {
  static blockName() {
    return this.NAME;
  }
  get valueBeforeDecode() {
    return this.valueBeforeDecodeView.slice().buffer;
  }
  set valueBeforeDecode(e) {
    this.valueBeforeDecodeView = new Uint8Array(e);
  }
  constructor({ blockLength: e = 0, error: t = st, warnings: s = [], valueBeforeDecode: n = Ju } = {}) {
    this.blockLength = e, this.error = t, this.warnings = s, this.valueBeforeDecodeView = L.toUint8Array(n);
  }
  toJSON() {
    return {
      blockName: this.constructor.NAME,
      blockLength: this.blockLength,
      error: this.error,
      warnings: this.warnings,
      valueBeforeDecode: H.ToHex(this.valueBeforeDecodeView)
    };
  }
}
sr.NAME = "baseBlock";
class Ze extends sr {
  fromBER(e, t, s, n) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
  toBER(e, t) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
}
Ze.NAME = "valueBlock";
class dd extends ps(sr) {
  constructor({ idBlock: e = {} } = {}) {
    var t, s, n, i;
    super(), e ? (this.isHexOnly = (t = e.isHexOnly) !== null && t !== void 0 ? t : !1, this.valueHexView = e.valueHex ? L.toUint8Array(e.valueHex) : Ju, this.tagClass = (s = e.tagClass) !== null && s !== void 0 ? s : -1, this.tagNumber = (n = e.tagNumber) !== null && n !== void 0 ? n : -1, this.isConstructed = (i = e.isConstructed) !== null && i !== void 0 ? i : !1) : (this.tagClass = -1, this.tagNumber = -1, this.isConstructed = !1);
  }
  toBER(e = !1) {
    let t = 0;
    switch (this.tagClass) {
      case 1:
        t |= 0;
        break;
      case 2:
        t |= 64;
        break;
      case 3:
        t |= 128;
        break;
      case 4:
        t |= 192;
        break;
      default:
        return this.error = "Unknown tag class", qt;
    }
    if (this.isConstructed && (t |= 32), this.tagNumber < 31 && !this.isHexOnly) {
      const n = new Uint8Array(1);
      if (!e) {
        let i = this.tagNumber;
        i &= 31, t |= i, n[0] = t;
      }
      return n.buffer;
    }
    if (!this.isHexOnly) {
      const n = Ss(this.tagNumber, 7), i = new Uint8Array(n), a = n.byteLength, l = new Uint8Array(a + 1);
      if (l[0] = t | 31, !e) {
        for (let c = 0; c < a - 1; c++)
          l[c + 1] = i[c] | 128;
        l[a] = i[a - 1];
      }
      return l.buffer;
    }
    const s = new Uint8Array(this.valueHexView.byteLength + 1);
    if (s[0] = t | 31, !e) {
      const n = this.valueHexView;
      for (let i = 0; i < n.length - 1; i++)
        s[i + 1] = n[i] | 128;
      s[this.valueHexView.byteLength] = n[n.length - 1];
    }
    return s.buffer;
  }
  fromBER(e, t, s) {
    const n = L.toUint8Array(e);
    if (!As(this, n, t, s))
      return -1;
    const i = n.subarray(t, t + s);
    if (i.length === 0)
      return this.error = "Zero buffer length", -1;
    switch (i[0] & 192) {
      case 0:
        this.tagClass = 1;
        break;
      case 64:
        this.tagClass = 2;
        break;
      case 128:
        this.tagClass = 3;
        break;
      case 192:
        this.tagClass = 4;
        break;
      default:
        return this.error = "Unknown tag class", -1;
    }
    this.isConstructed = (i[0] & 32) === 32, this.isHexOnly = !1;
    const l = i[0] & 31;
    if (l !== 31)
      this.tagNumber = l, this.blockLength = 1;
    else {
      let c = 0;
      for (; ; ) {
        const m = c + 1;
        if (m >= i.length)
          return this.error = "End of input reached before message was fully decoded", -1;
        if (c++, (i[m] & 128) === 0)
          break;
      }
      this.blockLength = c + 1;
      const h = this.valueHexView = new Uint8Array(c);
      for (let m = 0; m < c; m++)
        h[m] = i[m + 1] & 127;
      this.blockLength <= 9 ? this.tagNumber = er(h, 7) : (this.isHexOnly = !0, this.warnings.push("Tag too long, represented as hex-coded"));
    }
    if (this.tagClass === 1 && this.isConstructed)
      switch (this.tagNumber) {
        case 1:
        case 2:
        case 5:
        case 6:
        case 9:
        case 13:
        case 14:
        case 23:
        case 24:
        case 31:
        case 32:
        case 33:
        case 34:
          return this.error = "Constructed encoding used for primitive type", -1;
      }
    return t + this.blockLength;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      tagClass: this.tagClass,
      tagNumber: this.tagNumber,
      isConstructed: this.isConstructed
    };
  }
}
dd.NAME = "identificationBlock";
class md extends sr {
  constructor({ lenBlock: e = {} } = {}) {
    var t, s, n;
    super(), this.isIndefiniteForm = (t = e.isIndefiniteForm) !== null && t !== void 0 ? t : !1, this.longFormUsed = (s = e.longFormUsed) !== null && s !== void 0 ? s : !1, this.length = (n = e.length) !== null && n !== void 0 ? n : 0;
  }
  fromBER(e, t, s) {
    const n = L.toUint8Array(e);
    if (!As(this, n, t, s))
      return -1;
    const i = n.subarray(t, t + s);
    if (i.length === 0)
      return this.error = "Zero buffer length", -1;
    if (i[0] === 255)
      return this.error = "Length block 0xFF is reserved by standard", -1;
    if (this.isIndefiniteForm = i[0] === 128, this.isIndefiniteForm)
      return this.blockLength = 1, t + this.blockLength;
    if (this.longFormUsed = !!(i[0] & 128), this.longFormUsed === !1)
      return this.length = i[0], this.blockLength = 1, t + this.blockLength;
    const a = i[0] & 127;
    if (a > 8)
      return this.error = "Too big integer", -1;
    if (a + 1 > i.length)
      return this.error = "End of input reached before message was fully decoded", -1;
    const l = t + 1, c = n.subarray(l, l + a);
    return c[a - 1] === 0 && this.warnings.push("Needlessly long encoded length"), this.length = er(c, 8), this.longFormUsed && this.length <= 127 && this.warnings.push("Unnecessary usage of long length form"), this.blockLength = a + 1, t + this.blockLength;
  }
  toBER(e = !1) {
    let t, s;
    if (this.length > 127 && (this.longFormUsed = !0), this.isIndefiniteForm)
      return t = new ArrayBuffer(1), e === !1 && (s = new Uint8Array(t), s[0] = 128), t;
    if (this.longFormUsed) {
      const n = Ss(this.length, 8);
      if (n.byteLength > 127)
        return this.error = "Too big length", qt;
      if (t = new ArrayBuffer(n.byteLength + 1), e)
        return t;
      const i = new Uint8Array(n);
      s = new Uint8Array(t), s[0] = n.byteLength | 128;
      for (let a = 0; a < n.byteLength; a++)
        s[a + 1] = i[a];
      return t;
    }
    return t = new ArrayBuffer(1), e === !1 && (s = new Uint8Array(t), s[0] = this.length), t;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      isIndefiniteForm: this.isIndefiniteForm,
      longFormUsed: this.longFormUsed,
      length: this.length
    };
  }
}
md.NAME = "lengthBlock";
const D = {};
class je extends sr {
  constructor({ name: e = st, optional: t = !1, primitiveSchema: s, ...n } = {}, i) {
    super(n), this.name = e, this.optional = t, s && (this.primitiveSchema = s), this.idBlock = new dd(n), this.lenBlock = new md(n), this.valueBlock = i ? new i(n) : new Ze(n);
  }
  fromBER(e, t, s, n) {
    const i = this.valueBlock.fromBER(e, t, this.lenBlock.isIndefiniteForm ? s : this.lenBlock.length, n);
    return i === -1 ? (this.error = this.valueBlock.error, i) : (this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength), i);
  }
  toBER(e, t) {
    const s = t || new af();
    t || gd(this);
    const n = this.idBlock.toBER(e);
    if (s.write(n), this.lenBlock.isIndefiniteForm)
      s.write(new Uint8Array([128]).buffer), this.valueBlock.toBER(e, s), s.write(new ArrayBuffer(2));
    else {
      const i = this.valueBlock.toBER(e);
      this.lenBlock.length = i.byteLength;
      const a = this.lenBlock.toBER(e);
      s.write(a), s.write(i);
    }
    return t ? qt : s.final();
  }
  toJSON() {
    const e = {
      ...super.toJSON(),
      idBlock: this.idBlock.toJSON(),
      lenBlock: this.lenBlock.toJSON(),
      valueBlock: this.valueBlock.toJSON(),
      name: this.name,
      optional: this.optional
    };
    return this.primitiveSchema && (e.primitiveSchema = this.primitiveSchema.toJSON()), e;
  }
  toString(e = "ascii") {
    return e === "ascii" ? this.onAsciiEncoding() : H.ToHex(this.toBER());
  }
  onAsciiEncoding() {
    const e = this.constructor.NAME, t = H.ToHex(this.valueBlock.valueBeforeDecodeView);
    return `${e} : ${t}`;
  }
  isEqual(e) {
    if (this === e)
      return !0;
    if (!(e instanceof this.constructor))
      return !1;
    const t = this.toBER(), s = e.toBER();
    return Ka(t, s);
  }
}
je.NAME = "BaseBlock";
function gd(o) {
  var e;
  if (o instanceof D.Constructed)
    for (const t of o.valueBlock.value)
      gd(t) && (o.lenBlock.isIndefiniteForm = !0);
  return !!(!((e = o.lenBlock) === null || e === void 0) && e.isIndefiniteForm);
}
class wd extends je {
  getValue() {
    return this.valueBlock.value;
  }
  setValue(e) {
    this.valueBlock.value = e;
  }
  constructor({ value: e = st, ...t } = {}, s) {
    super(t, s), e && this.fromString(e);
  }
  fromBER(e, t, s) {
    const n = this.valueBlock.fromBER(e, t, this.lenBlock.isIndefiniteForm ? s : this.lenBlock.length);
    return n === -1 ? (this.error = this.valueBlock.error, n) : (this.fromBuffer(this.valueBlock.valueHexView), this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength), n);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : '${this.valueBlock.value}'`;
  }
}
wd.NAME = "BaseStringBlock";
class yd extends ps(Ze) {
  constructor({ isHexOnly: e = !0, ...t } = {}) {
    super(t), this.isHexOnly = e;
  }
}
yd.NAME = "PrimitiveValueBlock";
var vd;
class M extends je {
  constructor(e = {}) {
    super(e, yd), this.idBlock.isConstructed = !1;
  }
}
vd = M;
D.Primitive = vd;
M.NAME = "PRIMITIVE";
const eg = 100, tg = 1e4, sg = 16 * 1024 * 1024, ng = "Maximum ASN.1 nesting depth exceeded", ig = "Maximum ASN.1 node count exceeded", rg = "Maximum ASN.1 content length exceeded";
function Ec(o = {}) {
  var e, t, s;
  return {
    depth: 0,
    maxDepth: (e = o.maxDepth) !== null && e !== void 0 ? e : eg,
    nodesCount: 0,
    maxNodes: (t = o.maxNodes) !== null && t !== void 0 ? t : tg,
    maxContentLength: (s = o.maxContentLength) !== null && s !== void 0 ? s : sg
  };
}
function ag(o) {
  const e = new je({}, Ze);
  return e.error = o, {
    offset: -1,
    result: e
  };
}
function og(o) {
  if (o.nodesCount += 1, o.nodesCount > o.maxNodes)
    return ig;
}
function lg(o, e) {
  if (o > e.maxContentLength)
    return rg;
}
function of(o, e, t, s) {
  const n = s.depth + 1;
  if (n > s.maxDepth)
    return ag(ng);
  s.depth = n;
  try {
    return lf(o, e, t, s);
  } finally {
    s.depth -= 1;
  }
}
function cg(o, e) {
  if (o instanceof e)
    return o;
  const t = new e();
  return t.idBlock = o.idBlock, t.lenBlock = o.lenBlock, t.warnings = o.warnings, t.valueBeforeDecodeView = o.valueBeforeDecodeView, t;
}
function lf(o, e = 0, t = o.length, s = Ec()) {
  const n = e;
  let i = new je({}, Ze);
  const a = new sr();
  if (!As(a, o, e, t))
    return i.error = a.error, {
      offset: -1,
      result: i
    };
  if (!o.subarray(e, e + t).length)
    return i.error = "Zero buffer length", {
      offset: -1,
      result: i
    };
  const c = og(s);
  if (c)
    return i.error = c, {
      offset: -1,
      result: i
    };
  let h = i.idBlock.fromBER(o, e, t);
  if (i.idBlock.warnings.length && i.warnings.concat(i.idBlock.warnings), h === -1)
    return i.error = i.idBlock.error, {
      offset: -1,
      result: i
    };
  if (e = h, t -= i.idBlock.blockLength, h = i.lenBlock.fromBER(o, e, t), i.lenBlock.warnings.length && i.warnings.concat(i.lenBlock.warnings), h === -1)
    return i.error = i.lenBlock.error, {
      offset: -1,
      result: i
    };
  e = h, t -= i.lenBlock.blockLength;
  const m = i.lenBlock.isIndefiniteForm ? t : i.lenBlock.length, g = lg(m, s);
  if (g)
    return i.error = g, {
      offset: -1,
      result: i
    };
  if (!i.idBlock.isConstructed && i.lenBlock.isIndefiniteForm)
    return i.error = "Indefinite length form used for primitive encoding form", {
      offset: -1,
      result: i
    };
  let d = je;
  switch (i.idBlock.tagClass) {
    case 1:
      if (i.idBlock.tagNumber >= 37 && i.idBlock.isHexOnly === !1)
        return i.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard", {
          offset: -1,
          result: i
        };
      switch (i.idBlock.tagNumber) {
        case 0:
          if (i.idBlock.isConstructed && i.lenBlock.length > 0)
            return i.error = "Type [UNIVERSAL 0] is reserved", {
              offset: -1,
              result: i
            };
          d = D.EndOfContent;
          break;
        case 1:
          d = D.Boolean;
          break;
        case 2:
          d = D.Integer;
          break;
        case 3:
          d = D.BitString;
          break;
        case 4:
          d = D.OctetString;
          break;
        case 5:
          d = D.Null;
          break;
        case 6:
          d = D.ObjectIdentifier;
          break;
        case 10:
          d = D.Enumerated;
          break;
        case 12:
          d = D.Utf8String;
          break;
        case 13:
          d = D.RelativeObjectIdentifier;
          break;
        case 14:
          d = D.TIME;
          break;
        case 15:
          return i.error = "[UNIVERSAL 15] is reserved by ASN.1 standard", {
            offset: -1,
            result: i
          };
        case 16:
          d = D.Sequence;
          break;
        case 17:
          d = D.Set;
          break;
        case 18:
          d = D.NumericString;
          break;
        case 19:
          d = D.PrintableString;
          break;
        case 20:
          d = D.TeletexString;
          break;
        case 21:
          d = D.VideotexString;
          break;
        case 22:
          d = D.IA5String;
          break;
        case 23:
          d = D.UTCTime;
          break;
        case 24:
          d = D.GeneralizedTime;
          break;
        case 25:
          d = D.GraphicString;
          break;
        case 26:
          d = D.VisibleString;
          break;
        case 27:
          d = D.GeneralString;
          break;
        case 28:
          d = D.UniversalString;
          break;
        case 29:
          d = D.CharacterString;
          break;
        case 30:
          d = D.BmpString;
          break;
        case 31:
          d = D.DATE;
          break;
        case 32:
          d = D.TimeOfDay;
          break;
        case 33:
          d = D.DateTime;
          break;
        case 34:
          d = D.Duration;
          break;
        default: {
          const b = i.idBlock.isConstructed ? new D.Constructed() : new D.Primitive();
          b.idBlock = i.idBlock, b.lenBlock = i.lenBlock, b.warnings = i.warnings, i = b;
        }
      }
      break;
    case 2:
    case 3:
    case 4:
    default:
      d = i.idBlock.isConstructed ? D.Constructed : D.Primitive;
  }
  return i = cg(i, d), h = i.fromBER(o, e, m, s), i.valueBeforeDecodeView = o.subarray(n, n + i.blockLength), {
    offset: h,
    result: i
  };
}
function Oe(o, e = {}) {
  if (!o.byteLength) {
    const t = new je({}, Ze);
    return t.error = "Input buffer has zero length", {
      offset: -1,
      result: t
    };
  }
  return lf(L.toUint8Array(o).slice(), 0, o.byteLength, Ec(e));
}
function ug(o, e) {
  return o ? 1 : e;
}
class Bn extends Ze {
  constructor({ value: e = [], isIndefiniteForm: t = !1, ...s } = {}) {
    super(s), this.value = e, this.isIndefiniteForm = t;
  }
  fromBER(e, t, s, n) {
    const i = L.toUint8Array(e), a = n ?? Ec();
    if (!As(this, i, t, s))
      return -1;
    if (this.valueBeforeDecodeView = i.subarray(t, t + s), this.valueBeforeDecodeView.length === 0)
      return this.warnings.push("Zero buffer length"), t;
    let l = t;
    for (; ug(this.isIndefiniteForm, s) > 0; ) {
      const c = of(i, l, s, a);
      if (c.offset === -1)
        return this.error = c.result.error, this.warnings.concat(c.result.warnings), -1;
      if (l = c.offset, this.blockLength += c.result.blockLength, s -= c.result.blockLength, this.value.push(c.result), this.isIndefiniteForm && c.result.constructor.NAME === dc)
        break;
    }
    return this.isIndefiniteForm && (this.value[this.value.length - 1].constructor.NAME === dc ? this.value.pop() : this.warnings.push("No EndOfContent block encoded")), l;
  }
  toBER(e, t) {
    const s = t || new af();
    for (let n = 0; n < this.value.length; n++)
      this.value[n].toBER(e, s);
    return t ? qt : s.final();
  }
  toJSON() {
    const e = {
      ...super.toJSON(),
      isIndefiniteForm: this.isIndefiniteForm,
      value: []
    };
    for (const t of this.value)
      e.value.push(t.toJSON());
    return e;
  }
}
Bn.NAME = "ConstructedValueBlock";
var Sd;
class w extends je {
  constructor(e = {}) {
    super(e, Bn), this.idBlock.isConstructed = !0;
  }
  fromBER(e, t, s, n) {
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    const i = this.valueBlock.fromBER(e, t, this.lenBlock.isIndefiniteForm ? s : this.lenBlock.length, n);
    return i === -1 ? (this.error = this.valueBlock.error, i) : (this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.valueBlock.error.length || (this.blockLength += this.valueBlock.blockLength), i);
  }
  onAsciiEncoding() {
    const e = [];
    for (const s of this.valueBlock.value)
      e.push(s.toString("ascii").split(`
`).map((n) => `  ${n}`).join(`
`));
    const t = this.idBlock.tagClass === 3 ? `[${this.idBlock.tagNumber}]` : this.constructor.NAME;
    return e.length ? `${t} :
${e.join(`
`)}` : `${t} :`;
  }
}
Sd = w;
D.Constructed = Sd;
w.NAME = "CONSTRUCTED";
class Ad extends Ze {
  fromBER(e, t, s) {
    return t;
  }
  toBER(e) {
    return qt;
  }
}
Ad.override = "EndOfContentValueBlock";
var pd;
class bd extends je {
  constructor(e = {}) {
    super(e, Ad), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 0;
  }
}
pd = bd;
D.EndOfContent = pd;
bd.NAME = dc;
var kd;
class Ae extends je {
  constructor(e = {}) {
    super(e, Ze), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 5;
  }
  fromBER(e, t, s) {
    return this.lenBlock.length > 0 && this.warnings.push("Non-zero length of value block for Null type"), this.idBlock.error.length || (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length || (this.blockLength += this.lenBlock.blockLength), this.blockLength += s, t + s > e.byteLength ? (this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)", -1) : t + s;
  }
  toBER(e, t) {
    const s = new ArrayBuffer(2);
    if (!e) {
      const n = new Uint8Array(s);
      n[0] = 5, n[1] = 0;
    }
    return t && t.write(s), s;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME}`;
  }
}
kd = Ae;
D.Null = kd;
Ae.NAME = "NULL";
class Ed extends ps(Ze) {
  get value() {
    for (const e of this.valueHexView)
      if (e > 0)
        return !0;
    return !1;
  }
  set value(e) {
    this.valueHexView[0] = e ? 255 : 0;
  }
  constructor({ value: e, ...t } = {}) {
    super(t), t.valueHex ? this.valueHexView = L.toUint8Array(t.valueHex) : this.valueHexView = new Uint8Array(1), e && (this.value = e);
  }
  fromBER(e, t, s) {
    const n = L.toUint8Array(e);
    return As(this, n, t, s) ? (this.valueHexView = n.subarray(t, t + s), s > 1 && this.warnings.push("Boolean value encoded in more then 1 octet"), this.isHexOnly = !0, ld.call(this), this.blockLength = s, t + s) : -1;
  }
  toBER() {
    return this.valueHexView.slice();
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.value
    };
  }
}
Ed.NAME = "BooleanValueBlock";
var Nd;
class Ft extends je {
  getValue() {
    return this.valueBlock.value;
  }
  setValue(e) {
    this.valueBlock.value = e;
  }
  constructor(e = {}) {
    super(e, Ed), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 1;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.getValue}`;
  }
}
Nd = Ft;
D.Boolean = Nd;
Ft.NAME = "BOOLEAN";
class Cd extends ps(Bn) {
  constructor({ isConstructed: e = !1, ...t } = {}) {
    super(t), this.isConstructed = e;
  }
  fromBER(e, t, s, n) {
    let i = 0;
    if (this.isConstructed) {
      if (this.isHexOnly = !1, i = Bn.prototype.fromBER.call(this, e, t, s, n), i === -1)
        return i;
      for (let a = 0; a < this.value.length; a++) {
        const l = this.value[a].constructor.NAME;
        if (l === dc) {
          if (this.isIndefiniteForm)
            break;
          return this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only", -1;
        }
        if (l !== hd)
          return this.error = "OCTET STRING may consists of OCTET STRINGs only", -1;
      }
    } else
      this.isHexOnly = !0, i = super.fromBER(e, t, s), this.blockLength = s;
    return i;
  }
  toBER(e, t) {
    return this.isConstructed ? Bn.prototype.toBER.call(this, e, t) : e ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      isConstructed: this.isConstructed
    };
  }
}
Cd.NAME = "OctetStringValueBlock";
var cf;
class I extends je {
  constructor({ idBlock: e = {}, lenBlock: t = {}, ...s } = {}) {
    var n, i;
    (n = s.isConstructed) !== null && n !== void 0 || (s.isConstructed = !!(!((i = s.value) === null || i === void 0) && i.length)), super({
      idBlock: {
        isConstructed: s.isConstructed,
        ...e
      },
      lenBlock: {
        ...t,
        isIndefiniteForm: !!s.isIndefiniteForm
      },
      ...s
    }, Cd), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 4;
  }
  fromBER(e, t, s, n) {
    if (this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, s === 0)
      return this.idBlock.error.length === 0 && (this.blockLength += this.idBlock.blockLength), this.lenBlock.error.length === 0 && (this.blockLength += this.lenBlock.blockLength), t;
    if (!this.valueBlock.isConstructed) {
      const a = (e instanceof ArrayBuffer ? new Uint8Array(e) : e).subarray(t, t + s);
      try {
        if (a.byteLength) {
          const l = n ?? Ec(), c = of(a, 0, a.byteLength, l);
          c.offset !== -1 && c.offset === s && (this.valueBlock.value = [c.result]);
        }
      } catch {
      }
    }
    return super.fromBER(e, t, s, n);
  }
  onAsciiEncoding() {
    if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length)
      return w.prototype.onAsciiEncoding.call(this);
    const e = this.constructor.NAME, t = H.ToHex(this.valueBlock.valueHexView);
    return `${e} : ${t}`;
  }
  getValue() {
    if (!this.idBlock.isConstructed)
      return this.valueBlock.valueHexView.slice().buffer;
    const e = [];
    for (const t of this.valueBlock.value)
      t instanceof cf && e.push(t.valueBlock.valueHexView);
    return L.concat(e);
  }
}
cf = I;
D.OctetString = cf;
I.NAME = hd;
class Bd extends ps(Bn) {
  constructor({ unusedBits: e = 0, isConstructed: t = !1, ...s } = {}) {
    super(s), this.unusedBits = e, this.isConstructed = t, this.blockLength = this.valueHexView.byteLength;
  }
  fromBER(e, t, s, n) {
    if (!s)
      return t;
    let i = -1;
    if (this.isConstructed) {
      if (i = Bn.prototype.fromBER.call(this, e, t, s, n), i === -1)
        return i;
      for (const c of this.value) {
        const h = c.constructor.NAME;
        if (h === dc) {
          if (this.isIndefiniteForm)
            break;
          return this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only", -1;
        }
        if (h !== fd)
          return this.error = "BIT STRING may consists of BIT STRINGs only", -1;
        const m = c.valueBlock;
        if (this.unusedBits > 0 && m.unusedBits > 0)
          return this.error = 'Using of "unused bits" inside constructive BIT STRING allowed for least one only', -1;
        this.unusedBits = m.unusedBits;
      }
      return i;
    }
    const a = L.toUint8Array(e);
    if (!As(this, a, t, s))
      return -1;
    const l = a.subarray(t, t + s);
    if (this.unusedBits = l[0], this.unusedBits > 7)
      return this.error = "Unused bits for BitString must be in range 0-7", -1;
    if (!this.unusedBits) {
      const c = l.subarray(1);
      try {
        if (c.byteLength) {
          const h = n ?? Ec(), m = of(c, 0, c.byteLength, h);
          m.offset !== -1 && m.offset === s - 1 && (this.value = [m.result]);
        }
      } catch {
      }
    }
    return this.valueHexView = l.subarray(1), this.blockLength = l.length, t + s;
  }
  toBER(e, t) {
    if (this.isConstructed)
      return Bn.prototype.toBER.call(this, e, t);
    if (e)
      return new ArrayBuffer(this.valueHexView.byteLength + 1);
    if (!this.valueHexView.byteLength) {
      const n = new Uint8Array(1);
      return n[0] = 0, n.buffer;
    }
    const s = new Uint8Array(this.valueHexView.length + 1);
    return s[0] = this.unusedBits, s.set(this.valueHexView, 1), s.buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      unusedBits: this.unusedBits,
      isConstructed: this.isConstructed
    };
  }
}
Bd.NAME = "BitStringValueBlock";
var Id;
class G extends je {
  constructor({ idBlock: e = {}, lenBlock: t = {}, ...s } = {}) {
    var n, i;
    (n = s.isConstructed) !== null && n !== void 0 || (s.isConstructed = !!(!((i = s.value) === null || i === void 0) && i.length)), super({
      idBlock: {
        isConstructed: s.isConstructed,
        ...e
      },
      lenBlock: {
        ...t,
        isIndefiniteForm: !!s.isIndefiniteForm
      },
      ...s
    }, Bd), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 3;
  }
  fromBER(e, t, s, n) {
    return this.valueBlock.isConstructed = this.idBlock.isConstructed, this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm, super.fromBER(e, t, s, n);
  }
  onAsciiEncoding() {
    if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length)
      return w.prototype.onAsciiEncoding.call(this);
    {
      const e = [], t = this.valueBlock.valueHexView;
      for (const a of t)
        e.push(a.toString(2).padStart(8, "0"));
      const s = e.join(""), n = this.constructor.NAME, i = s.substring(0, s.length - this.valueBlock.unusedBits);
      return `${n} : ${i}`;
    }
  }
}
Id = G;
D.BitString = Id;
G.NAME = fd;
var Vd;
function hg(o, e) {
  const t = new Uint8Array([0]), s = new Uint8Array(o), n = new Uint8Array(e);
  let i = s.slice(0);
  const a = i.length - 1, l = n.slice(0), c = l.length - 1;
  let h = 0;
  const m = c < a ? a : c;
  let g = 0;
  for (let d = m; d >= 0; d--, g++) {
    switch (!0) {
      case g < l.length:
        h = i[a - g] + l[c - g] + t[0];
        break;
      default:
        h = i[a - g] + t[0];
    }
    switch (t[0] = h / 10, !0) {
      case g >= i.length:
        i = Vh(new Uint8Array([h % 10]), i);
        break;
      default:
        i[a - g] = h % 10;
    }
  }
  return t[0] > 0 && (i = Vh(t, i)), i;
}
function Pf(o) {
  if (o >= Xa.length)
    for (let e = Xa.length; e <= o; e++) {
      const t = new Uint8Array([0]);
      let s = Xa[e - 1].slice(0);
      for (let n = s.length - 1; n >= 0; n--) {
        const i = new Uint8Array([(s[n] << 1) + t[0]]);
        t[0] = i[0] / 10, s[n] = i[0] % 10;
      }
      t[0] > 0 && (s = Vh(t, s)), Xa.push(s);
    }
  return Xa[o];
}
function fg(o, e) {
  let t = 0;
  const s = new Uint8Array(o), n = new Uint8Array(e), i = s.slice(0), a = i.length - 1, l = n.slice(0), c = l.length - 1;
  let h, m = 0;
  for (let g = c; g >= 0; g--, m++)
    switch (h = i[a - m] - l[c - m] - t, !0) {
      case h < 0:
        t = 1, i[a - m] = h + 10;
        break;
      default:
        t = 0, i[a - m] = h;
    }
  if (t > 0)
    for (let g = a - c + 1; g >= 0; g--, m++)
      if (h = i[a - m] - t, h < 0)
        t = 1, i[a - m] = h + 10;
      else {
        t = 0, i[a - m] = h;
        break;
      }
  return i.slice();
}
class uf extends ps(Ze) {
  setValueHex() {
    this.valueHexView.length >= 4 ? (this.warnings.push("Too big Integer for decoding, hex only"), this.isHexOnly = !0, this._valueDec = 0) : (this.isHexOnly = !1, this.valueHexView.length > 0 && (this._valueDec = ld.call(this)));
  }
  constructor({ value: e, ...t } = {}) {
    super(t), this._valueDec = 0, t.valueHex && this.setValueHex(), e !== void 0 && (this.valueDec = e);
  }
  set valueDec(e) {
    this._valueDec = e, this.isHexOnly = !1, this.valueHexView = new Uint8Array(Jm(e));
  }
  get valueDec() {
    return this._valueDec;
  }
  fromDER(e, t, s, n = 0) {
    const i = this.fromBER(e, t, s);
    if (i === -1)
      return i;
    const a = this.valueHexView;
    return a[0] === 0 && (a[1] & 128) !== 0 ? this.valueHexView = a.subarray(1) : n !== 0 && a.length < n && (n - a.length > 1 && (n = a.length + 1), this.valueHexView = a.subarray(n - a.length)), i;
  }
  toDER(e = !1) {
    const t = this.valueHexView;
    switch (!0) {
      case (t[0] & 128) !== 0:
        {
          const s = new Uint8Array(this.valueHexView.length + 1);
          s[0] = 0, s.set(t, 1), this.valueHexView = s;
        }
        break;
      case (t[0] === 0 && (t[1] & 128) === 0):
        this.valueHexView = this.valueHexView.subarray(1);
        break;
    }
    return this.toBER(e);
  }
  fromBER(e, t, s) {
    const n = super.fromBER(e, t, s);
    return n === -1 || this.setValueHex(), n;
  }
  toBER(e) {
    return e ? new ArrayBuffer(this.valueHexView.length) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec
    };
  }
  toString() {
    const e = this.valueHexView.length * 8 - 1;
    let t = new Uint8Array(this.valueHexView.length * 8 / 3), s = 0, n;
    const i = this.valueHexView;
    let a = "", l = !1;
    for (let c = i.byteLength - 1; c >= 0; c--) {
      n = i[c];
      for (let h = 0; h < 8; h++) {
        if ((n & 1) === 1)
          switch (s) {
            case e:
              t = fg(Pf(s), t), a = "-";
              break;
            default:
              t = hg(t, Pf(s));
          }
        s++, n >>= 1;
      }
    }
    for (let c = 0; c < t.length; c++)
      t[c] && (l = !0), l && (a += Tf.charAt(t[c]));
    return l === !1 && (a += Tf.charAt(0)), a;
  }
}
Vd = uf;
uf.NAME = "IntegerValueBlock";
Object.defineProperty(Vd.prototype, "valueHex", {
  set: function(o) {
    this.valueHexView = new Uint8Array(o), this.setValueHex();
  },
  get: function() {
    return this.valueHexView.slice().buffer;
  }
});
var lc;
class S extends je {
  constructor(e = {}) {
    super(e, uf), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 2;
  }
  toBigInt() {
    return Ou(), BigInt(this.valueBlock.toString());
  }
  static fromBigInt(e) {
    Ou();
    const t = BigInt(e), s = new af(), n = t.toString(16).replace(/^-/, ""), i = new Uint8Array(H.FromHex(n));
    if (t < 0) {
      const l = new Uint8Array(i.length + (i[0] & 128 ? 1 : 0));
      l[0] |= 128;
      const h = BigInt(`0x${H.ToHex(l)}`) + t, m = L.toUint8Array(H.FromHex(h.toString(16)));
      m[0] |= 128, s.write(m);
    } else
      i[0] & 128 && s.write(new Uint8Array([0])), s.write(i);
    return new lc({ valueHex: s.final() });
  }
  convertToDER() {
    const e = new lc({ valueHex: this.valueBlock.valueHexView });
    return e.valueBlock.toDER(), e;
  }
  convertFromDER() {
    return new lc({
      valueHex: this.valueBlock.valueHexView[0] === 0 ? this.valueBlock.valueHexView.subarray(1) : this.valueBlock.valueHexView
    });
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString()}`;
  }
}
lc = S;
D.Integer = lc;
S.NAME = "INTEGER";
var xd;
class tr extends S {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 10;
  }
}
xd = tr;
D.Enumerated = xd;
tr.NAME = "ENUMERATED";
class Oh extends ps(Ze) {
  constructor({ valueDec: e = -1, isFirstSid: t = !1, ...s } = {}) {
    super(s), this.valueDec = e, this.isFirstSid = t;
  }
  fromBER(e, t, s) {
    if (!s)
      return t;
    const n = L.toUint8Array(e);
    if (!As(this, n, t, s))
      return -1;
    const i = n.subarray(t, t + s);
    this.valueHexView = new Uint8Array(s);
    for (let l = 0; l < s && (this.valueHexView[l] = i[l] & 127, this.blockLength++, (i[l] & 128) !== 0); l++)
      ;
    const a = new Uint8Array(this.blockLength);
    for (let l = 0; l < this.blockLength; l++)
      a[l] = this.valueHexView[l];
    return this.valueHexView = a, (i[this.blockLength - 1] & 128) !== 0 ? (this.error = "End of input reached before message was fully decoded", -1) : (this.valueHexView[0] === 0 && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = er(this.valueHexView, 7) : (this.isHexOnly = !0, this.warnings.push("Too big SID for decoding, hex only")), t + this.blockLength);
  }
  set valueBigInt(e) {
    Ou();
    let t = BigInt(e).toString(2);
    for (; t.length % 7; )
      t = "0" + t;
    const s = new Uint8Array(t.length / 7);
    for (let n = 0; n < s.length; n++)
      s[n] = parseInt(t.slice(n * 7, n * 7 + 7), 2) + (n + 1 < s.length ? 128 : 0);
    this.fromBER(s.buffer, 0, s.length);
  }
  toBER(e) {
    if (this.isHexOnly) {
      if (e)
        return new ArrayBuffer(this.valueHexView.byteLength);
      const n = this.valueHexView, i = new Uint8Array(this.blockLength);
      for (let a = 0; a < this.blockLength - 1; a++)
        i[a] = n[a] | 128;
      return i[this.blockLength - 1] = n[this.blockLength - 1], i.buffer;
    }
    const t = Ss(this.valueDec, 7);
    if (t.byteLength === 0)
      return this.error = "Error during encoding SID value", qt;
    const s = new Uint8Array(t.byteLength);
    if (!e) {
      const n = new Uint8Array(t), i = t.byteLength - 1;
      for (let a = 0; a < i; a++)
        s[a] = n[a] | 128;
      s[i] = n[i];
    }
    return s;
  }
  toString() {
    let e = "";
    if (this.isHexOnly)
      e = H.ToHex(this.valueHexView);
    else if (this.isFirstSid) {
      let t = this.valueDec;
      this.valueDec <= 39 ? e = "0." : this.valueDec <= 79 ? (e = "1.", t -= 40) : (e = "2.", t -= 80), e += t.toString();
    } else
      e = this.valueDec.toString();
    return e;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec,
      isFirstSid: this.isFirstSid
    };
  }
}
Oh.NAME = "sidBlock";
class Od extends Ze {
  constructor({ value: e = st, ...t } = {}) {
    super(t), this.value = [], e && this.fromString(e);
  }
  fromBER(e, t, s) {
    let n = t;
    for (; s > 0; ) {
      const i = new Oh();
      if (n = i.fromBER(e, n, s), n === -1)
        return this.blockLength = 0, this.error = i.error, n;
      this.value.length === 0 && (i.isFirstSid = !0), this.blockLength += i.blockLength, s -= i.blockLength, this.value.push(i);
    }
    return n;
  }
  toBER(e) {
    const t = [];
    for (let s = 0; s < this.value.length; s++) {
      const n = this.value[s].toBER(e);
      if (n.byteLength === 0)
        return this.error = this.value[s].error, qt;
      t.push(n);
    }
    return rf(t);
  }
  fromString(e) {
    this.value = [];
    let t = 0, s = 0, n = "", i = !1;
    do
      if (s = e.indexOf(".", t), s === -1 ? n = e.substring(t) : n = e.substring(t, s), t = s + 1, i) {
        const a = this.value[0];
        let l = 0;
        switch (a.valueDec) {
          case 0:
            break;
          case 1:
            l = 40;
            break;
          case 2:
            l = 80;
            break;
          default:
            this.value = [];
            return;
        }
        const c = parseInt(n, 10);
        if (isNaN(c))
          return;
        a.valueDec = c + l, i = !1;
      } else {
        const a = new Oh();
        if (n > Number.MAX_SAFE_INTEGER) {
          Ou();
          const l = BigInt(n);
          a.valueBigInt = l;
        } else if (a.valueDec = parseInt(n, 10), isNaN(a.valueDec))
          return;
        this.value.length || (a.isFirstSid = !0, i = !0), this.value.push(a);
      }
    while (s !== -1);
  }
  toString() {
    let e = "", t = !1;
    for (let s = 0; s < this.value.length; s++) {
      t = this.value[s].isHexOnly;
      let n = this.value[s].toString();
      s !== 0 && (e = `${e}.`), t ? (n = `{${n}}`, this.value[s].isFirstSid ? e = `2.{${n} - 80}` : e += n) : e += n;
    }
    return e;
  }
  toJSON() {
    const e = {
      ...super.toJSON(),
      value: this.toString(),
      sidArray: []
    };
    for (let t = 0; t < this.value.length; t++)
      e.sidArray.push(this.value[t].toJSON());
    return e;
  }
}
Od.NAME = "ObjectIdentifierValueBlock";
var Rd;
class T extends je {
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(e) {
    this.valueBlock.fromString(e);
  }
  constructor(e = {}) {
    super(e, Od), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 6;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.getValue()
    };
  }
}
Rd = T;
D.ObjectIdentifier = Rd;
T.NAME = "OBJECT IDENTIFIER";
class Rh extends ps(sr) {
  constructor({ valueDec: e = 0, ...t } = {}) {
    super(t), this.valueDec = e;
  }
  fromBER(e, t, s) {
    if (s === 0)
      return t;
    const n = L.toUint8Array(e);
    if (!As(this, n, t, s))
      return -1;
    const i = n.subarray(t, t + s);
    this.valueHexView = new Uint8Array(s);
    for (let l = 0; l < s && (this.valueHexView[l] = i[l] & 127, this.blockLength++, (i[l] & 128) !== 0); l++)
      ;
    const a = new Uint8Array(this.blockLength);
    for (let l = 0; l < this.blockLength; l++)
      a[l] = this.valueHexView[l];
    return this.valueHexView = a, (i[this.blockLength - 1] & 128) !== 0 ? (this.error = "End of input reached before message was fully decoded", -1) : (this.valueHexView[0] === 0 && this.warnings.push("Needlessly long format of SID encoding"), this.blockLength <= 8 ? this.valueDec = er(this.valueHexView, 7) : (this.isHexOnly = !0, this.warnings.push("Too big SID for decoding, hex only")), t + this.blockLength);
  }
  toBER(e) {
    if (this.isHexOnly) {
      if (e)
        return new ArrayBuffer(this.valueHexView.byteLength);
      const n = this.valueHexView, i = new Uint8Array(this.blockLength);
      for (let a = 0; a < this.blockLength - 1; a++)
        i[a] = n[a] | 128;
      return i[this.blockLength - 1] = n[this.blockLength - 1], i.buffer;
    }
    const t = Ss(this.valueDec, 7);
    if (t.byteLength === 0)
      return this.error = "Error during encoding SID value", qt;
    const s = new Uint8Array(t.byteLength);
    if (!e) {
      const n = new Uint8Array(t), i = t.byteLength - 1;
      for (let a = 0; a < i; a++)
        s[a] = n[a] | 128;
      s[i] = n[i];
    }
    return s.buffer;
  }
  toString() {
    let e = "";
    return this.isHexOnly ? e = H.ToHex(this.valueHexView) : e = this.valueDec.toString(), e;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec
    };
  }
}
Rh.NAME = "relativeSidBlock";
class Td extends Ze {
  constructor({ value: e = st, ...t } = {}) {
    super(t), this.value = [], e && this.fromString(e);
  }
  fromBER(e, t, s) {
    let n = t;
    for (; s > 0; ) {
      const i = new Rh();
      if (n = i.fromBER(e, n, s), n === -1)
        return this.blockLength = 0, this.error = i.error, n;
      this.blockLength += i.blockLength, s -= i.blockLength, this.value.push(i);
    }
    return n;
  }
  toBER(e, t) {
    const s = [];
    for (let n = 0; n < this.value.length; n++) {
      const i = this.value[n].toBER(e);
      if (i.byteLength === 0)
        return this.error = this.value[n].error, qt;
      s.push(i);
    }
    return rf(s);
  }
  fromString(e) {
    this.value = [];
    let t = 0, s = 0, n = "";
    do {
      s = e.indexOf(".", t), s === -1 ? n = e.substring(t) : n = e.substring(t, s), t = s + 1;
      const i = new Rh();
      if (i.valueDec = parseInt(n, 10), isNaN(i.valueDec))
        return !0;
      this.value.push(i);
    } while (s !== -1);
    return !0;
  }
  toString() {
    let e = "", t = !1;
    for (let s = 0; s < this.value.length; s++) {
      t = this.value[s].isHexOnly;
      let n = this.value[s].toString();
      s !== 0 && (e = `${e}.`), t && (n = `{${n}}`), e += n;
    }
    return e;
  }
  toJSON() {
    const e = {
      ...super.toJSON(),
      value: this.toString(),
      sidArray: []
    };
    for (let t = 0; t < this.value.length; t++)
      e.sidArray.push(this.value[t].toJSON());
    return e;
  }
}
Td.NAME = "RelativeObjectIdentifierValueBlock";
var Dd;
class Pd extends je {
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(e) {
    this.valueBlock.fromString(e);
  }
  constructor(e = {}) {
    super(e, Td), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 13;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.getValue()
    };
  }
}
Dd = Pd;
D.RelativeObjectIdentifier = Dd;
Pd.NAME = "RelativeObjectIdentifier";
var Ld;
class f extends w {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 16;
  }
}
Ld = f;
D.Sequence = Ld;
f.NAME = "SEQUENCE";
var Ud;
class pe extends w {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 17;
  }
}
Ud = pe;
D.Set = Ud;
pe.NAME = "SET";
class Hd extends ps(Ze) {
  constructor({ ...e } = {}) {
    super(e), this.isHexOnly = !0, this.value = st;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.value
    };
  }
}
Hd.NAME = "StringValueBlock";
class Md extends Hd {
}
Md.NAME = "SimpleStringValueBlock";
class ft extends wd {
  constructor({ ...e } = {}) {
    super(e, Md);
  }
  fromBuffer(e) {
    this.valueBlock.value = String.fromCharCode.apply(null, L.toUint8Array(e));
  }
  fromString(e) {
    const t = e.length, s = this.valueBlock.valueHexView = new Uint8Array(t);
    for (let n = 0; n < t; n++)
      s[n] = e.charCodeAt(n);
    this.valueBlock.value = e;
  }
}
ft.NAME = "SIMPLE STRING";
class _d extends ft {
  fromBuffer(e) {
    this.valueBlock.valueHexView = L.toUint8Array(e);
    try {
      this.valueBlock.value = H.ToUtf8String(e);
    } catch (t) {
      this.warnings.push(`Error during "decodeURIComponent": ${t}, using raw string`), this.valueBlock.value = H.ToBinary(e);
    }
  }
  fromString(e) {
    this.valueBlock.valueHexView = new Uint8Array(H.FromUtf8String(e)), this.valueBlock.value = e;
  }
}
_d.NAME = "Utf8StringValueBlock";
var $d;
class Dt extends _d {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 12;
  }
}
$d = Dt;
D.Utf8String = $d;
Dt.NAME = "UTF8String";
class Kd extends ft {
  fromBuffer(e) {
    this.valueBlock.value = H.ToUtf16String(e), this.valueBlock.valueHexView = L.toUint8Array(e);
  }
  fromString(e) {
    this.valueBlock.value = e, this.valueBlock.valueHexView = new Uint8Array(H.FromUtf16String(e));
  }
}
Kd.NAME = "BmpStringValueBlock";
var Jd;
class mc extends Kd {
  constructor({ ...e } = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 30;
  }
}
Jd = mc;
D.BmpString = Jd;
mc.NAME = "BMPString";
class jd extends ft {
  fromBuffer(e) {
    const t = ArrayBuffer.isView(e) ? e.slice().buffer : e.slice(0), s = new Uint8Array(t);
    for (let n = 0; n < s.length; n += 4)
      s[n] = s[n + 3], s[n + 1] = s[n + 2], s[n + 2] = 0, s[n + 3] = 0;
    this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(t));
  }
  fromString(e) {
    const t = e.length, s = this.valueBlock.valueHexView = new Uint8Array(t * 4);
    for (let n = 0; n < t; n++) {
      const i = Ss(e.charCodeAt(n), 8), a = new Uint8Array(i);
      if (a.length > 4)
        continue;
      const l = 4 - a.length;
      for (let c = a.length - 1; c >= 0; c--)
        s[n * 4 + c + l] = a[c];
    }
    this.valueBlock.value = e;
  }
}
jd.NAME = "UniversalStringValueBlock";
var Fd;
class gc extends jd {
  constructor({ ...e } = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 28;
  }
}
Fd = gc;
D.UniversalString = Fd;
gc.NAME = "UniversalString";
var qd;
class La extends ft {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 18;
  }
}
qd = La;
D.NumericString = qd;
La.NAME = "NumericString";
var Wd;
class Ot extends ft {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 19;
  }
}
Wd = Ot;
D.PrintableString = Wd;
Ot.NAME = "PrintableString";
var Gd;
class wc extends ft {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 20;
  }
}
Gd = wc;
D.TeletexString = Gd;
wc.NAME = "TeletexString";
var Yd;
class hf extends ft {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 21;
  }
}
Yd = hf;
D.VideotexString = Yd;
hf.NAME = "VideotexString";
var Qd;
class ju extends ft {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 22;
  }
}
Qd = ju;
D.IA5String = Qd;
ju.NAME = "IA5String";
var Xd;
class ff extends ft {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 25;
  }
}
Xd = ff;
D.GraphicString = Xd;
ff.NAME = "GraphicString";
var Zd;
class Fu extends ft {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 26;
  }
}
Zd = Fu;
D.VisibleString = Zd;
Fu.NAME = "VisibleString";
var zd;
class df extends ft {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 27;
  }
}
zd = df;
D.GeneralString = zd;
df.NAME = "GeneralString";
var em;
class mf extends ft {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 29;
  }
}
em = mf;
D.CharacterString = em;
mf.NAME = "CharacterString";
var tm;
class ja extends Fu {
  constructor({ value: e, valueDate: t, ...s } = {}) {
    if (super(s), this.year = 0, this.month = 0, this.day = 0, this.hour = 0, this.minute = 0, this.second = 0, e) {
      this.fromString(e), this.valueBlock.valueHexView = new Uint8Array(e.length);
      for (let n = 0; n < e.length; n++)
        this.valueBlock.valueHexView[n] = e.charCodeAt(n);
    }
    t && (this.fromDate(t), this.valueBlock.valueHexView = new Uint8Array(this.toBuffer())), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 23;
  }
  fromBuffer(e) {
    this.fromString(String.fromCharCode.apply(null, L.toUint8Array(e)));
  }
  toBuffer() {
    const e = this.toString(), t = new ArrayBuffer(e.length), s = new Uint8Array(t);
    for (let n = 0; n < e.length; n++)
      s[n] = e.charCodeAt(n);
    return t;
  }
  fromDate(e) {
    this.year = e.getUTCFullYear(), this.month = e.getUTCMonth() + 1, this.day = e.getUTCDate(), this.hour = e.getUTCHours(), this.minute = e.getUTCMinutes(), this.second = e.getUTCSeconds();
  }
  toDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
  }
  fromString(e) {
    const s = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig.exec(e);
    if (s === null) {
      this.error = "Wrong input string for conversion";
      return;
    }
    const n = parseInt(s[1], 10);
    n >= 50 ? this.year = 1900 + n : this.year = 2e3 + n, this.month = parseInt(s[2], 10), this.day = parseInt(s[3], 10), this.hour = parseInt(s[4], 10), this.minute = parseInt(s[5], 10), this.second = parseInt(s[6], 10);
  }
  toString(e = "iso") {
    if (e === "iso") {
      const t = new Array(7);
      return t[0] = ot(this.year < 2e3 ? this.year - 1900 : this.year - 2e3, 2), t[1] = ot(this.month, 2), t[2] = ot(this.day, 2), t[3] = ot(this.hour, 2), t[4] = ot(this.minute, 2), t[5] = ot(this.second, 2), t[6] = "Z", t.join("");
    }
    return super.toString(e);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.toDate().toISOString()}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second
    };
  }
}
tm = ja;
D.UTCTime = tm;
ja.NAME = "UTCTime";
var sm;
class ue extends ja {
  constructor(e = {}) {
    var t;
    super(e), (t = this.millisecond) !== null && t !== void 0 || (this.millisecond = 0), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 24;
  }
  fromDate(e) {
    super.fromDate(e), this.millisecond = e.getUTCMilliseconds();
  }
  toDate() {
    const e = Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond);
    return new Date(e);
  }
  fromString(e) {
    let t = !1, s = "", n = "", i = 0, a, l = 0, c = 0;
    if (e[e.length - 1] === "Z")
      s = e.substring(0, e.length - 1), t = !0;
    else {
      const g = new Number(e[e.length - 1]);
      if (isNaN(g.valueOf()))
        throw new Error("Wrong input string for conversion");
      s = e;
    }
    if (t) {
      if (s.indexOf("+") !== -1)
        throw new Error("Wrong input string for conversion");
      if (s.indexOf("-") !== -1)
        throw new Error("Wrong input string for conversion");
    } else {
      let g = 1, d = s.indexOf("+"), b = "";
      if (d === -1 && (d = s.indexOf("-"), g = -1), d !== -1) {
        if (b = s.substring(d + 1), s = s.substring(0, d), b.length !== 2 && b.length !== 4)
          throw new Error("Wrong input string for conversion");
        let A = parseInt(b.substring(0, 2), 10);
        if (isNaN(A.valueOf()))
          throw new Error("Wrong input string for conversion");
        if (l = g * A, b.length === 4) {
          if (A = parseInt(b.substring(2, 4), 10), isNaN(A.valueOf()))
            throw new Error("Wrong input string for conversion");
          c = g * A;
        }
      }
    }
    let h = s.indexOf(".");
    if (h === -1 && (h = s.indexOf(",")), h !== -1) {
      const g = new Number(`0${s.substring(h)}`);
      if (isNaN(g.valueOf()))
        throw new Error("Wrong input string for conversion");
      i = g.valueOf(), n = s.substring(0, h);
    } else
      n = s;
    switch (!0) {
      case n.length === 8:
        if (a = /(\d{4})(\d{2})(\d{2})/ig, h !== -1)
          throw new Error("Wrong input string for conversion");
        break;
      case n.length === 10:
        if (a = /(\d{4})(\d{2})(\d{2})(\d{2})/ig, h !== -1) {
          let g = 60 * i;
          this.minute = Math.floor(g), g = 60 * (g - this.minute), this.second = Math.floor(g), g = 1e3 * (g - this.second), this.millisecond = Math.floor(g);
        }
        break;
      case n.length === 12:
        if (a = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig, h !== -1) {
          let g = 60 * i;
          this.second = Math.floor(g), g = 1e3 * (g - this.second), this.millisecond = Math.floor(g);
        }
        break;
      case n.length === 14:
        if (a = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig, h !== -1) {
          const g = 1e3 * i;
          this.millisecond = Math.floor(g);
        }
        break;
      default:
        throw new Error("Wrong input string for conversion");
    }
    const m = a.exec(n);
    if (m === null)
      throw new Error("Wrong input string for conversion");
    for (let g = 1; g < m.length; g++)
      switch (g) {
        case 1:
          this.year = parseInt(m[g], 10);
          break;
        case 2:
          this.month = parseInt(m[g], 10);
          break;
        case 3:
          this.day = parseInt(m[g], 10);
          break;
        case 4:
          this.hour = parseInt(m[g], 10) + l;
          break;
        case 5:
          this.minute = parseInt(m[g], 10) + c;
          break;
        case 6:
          this.second = parseInt(m[g], 10);
          break;
        default:
          throw new Error("Wrong input string for conversion");
      }
    if (t === !1) {
      const g = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
      this.year = g.getUTCFullYear(), this.month = g.getUTCMonth(), this.day = g.getUTCDay(), this.hour = g.getUTCHours(), this.minute = g.getUTCMinutes(), this.second = g.getUTCSeconds(), this.millisecond = g.getUTCMilliseconds();
    }
  }
  toString(e = "iso") {
    if (e === "iso") {
      const t = [];
      return t.push(ot(this.year, 4)), t.push(ot(this.month, 2)), t.push(ot(this.day, 2)), t.push(ot(this.hour, 2)), t.push(ot(this.minute, 2)), t.push(ot(this.second, 2)), this.millisecond !== 0 && (t.push("."), t.push(ot(this.millisecond, 3))), t.push("Z"), t.join("");
    }
    return super.toString(e);
  }
  toJSON() {
    return {
      ...super.toJSON(),
      millisecond: this.millisecond
    };
  }
}
sm = ue;
D.GeneralizedTime = sm;
ue.NAME = "GeneralizedTime";
var nm;
let im = class extends Dt {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 31;
  }
};
nm = im;
D.DATE = nm;
im.NAME = "DATE";
var rm;
class am extends Dt {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 32;
  }
}
rm = am;
D.TimeOfDay = rm;
am.NAME = "TimeOfDay";
var om;
class lm extends Dt {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 33;
  }
}
om = lm;
D.DateTime = om;
lm.NAME = "DateTime";
var cm;
class um extends Dt {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 34;
  }
}
cm = um;
D.Duration = cm;
um.NAME = "Duration";
var hm;
class fm extends Dt {
  constructor(e = {}) {
    super(e), this.idBlock.tagClass = 1, this.idBlock.tagNumber = 14;
  }
}
hm = fm;
D.TIME = hm;
fm.NAME = "TIME";
class K {
  constructor({ name: e = st, optional: t = !1 } = {}) {
    this.name = e, this.optional = t;
  }
}
class he extends K {
  constructor({ value: e = [], ...t } = {}) {
    super(t), this.value = e;
  }
}
class J extends K {
  constructor({ value: e = new K(), local: t = !1, ...s } = {}) {
    super(s), this.value = e, this.local = t;
  }
}
class Ru {
  get data() {
    return this.dataView.slice().buffer;
  }
  set data(e) {
    this.dataView = L.toUint8Array(e);
  }
  constructor({ data: e = Ju } = {}) {
    this.dataView = L.toUint8Array(e);
  }
  fromBER(e, t, s) {
    const n = t + s;
    return this.dataView = L.toUint8Array(e).subarray(t, n), n;
  }
  toBER(e) {
    return this.dataView.slice().buffer;
  }
}
function N(o, e, t) {
  if (t instanceof he) {
    for (const i of t.value)
      if (N(o, e, i).verified)
        return {
          verified: !0,
          result: o
        };
    {
      const i = {
        verified: !1,
        result: { error: "Wrong values for Choice type" }
      };
      return t.hasOwnProperty(Xu) && (i.name = t.name), i;
    }
  }
  if (t instanceof K)
    return t.hasOwnProperty(Xu) && (o[t.name] = e), {
      verified: !0,
      result: o
    };
  if (!(o instanceof Object))
    return {
      verified: !1,
      result: { error: "Wrong root object" }
    };
  if (!(e instanceof Object))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 data" }
    };
  if (!(t instanceof Object))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (!(Wm in t))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (!(Xm in t.idBlock))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (!(Zm in t.idBlock))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  const s = t.idBlock.toBER(!1);
  if (s.byteLength === 0)
    return {
      verified: !1,
      result: { error: "Error encoding idBlock for ASN.1 schema" }
    };
  if (t.idBlock.fromBER(s, 0, s.byteLength) === -1)
    return {
      verified: !1,
      result: { error: "Error decoding idBlock for ASN.1 schema" }
    };
  if (t.idBlock.hasOwnProperty(Gm) === !1)
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (t.idBlock.tagClass !== e.idBlock.tagClass)
    return {
      verified: !1,
      result: o
    };
  if (t.idBlock.hasOwnProperty(Ym) === !1)
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (t.idBlock.tagNumber !== e.idBlock.tagNumber)
    return {
      verified: !1,
      result: o
    };
  if (t.idBlock.hasOwnProperty(Qm) === !1)
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (t.idBlock.isConstructed !== e.idBlock.isConstructed)
    return {
      verified: !1,
      result: o
    };
  if (!(qm in t.idBlock))
    return {
      verified: !1,
      result: { error: "Wrong ASN.1 schema" }
    };
  if (t.idBlock.isHexOnly !== e.idBlock.isHexOnly)
    return {
      verified: !1,
      result: o
    };
  if (t.idBlock.isHexOnly) {
    if (!(Df in t.idBlock))
      return {
        verified: !1,
        result: { error: "Wrong ASN.1 schema" }
      };
    const i = t.idBlock.valueHexView, a = e.idBlock.valueHexView;
    if (i.length !== a.length)
      return {
        verified: !1,
        result: o
      };
    for (let l = 0; l < i.length; l++)
      if (i[l] !== a[1])
        return {
          verified: !1,
          result: o
        };
  }
  if (t.name && (t.name = t.name.replace(/^\s+|\s+$/g, st), t.name && (o[t.name] = e)), t instanceof D.Constructed) {
    let i = 0, a = {
      verified: !1,
      result: { error: "Unknown error" }
    }, l = t.valueBlock.value.length;
    if (l > 0 && t.valueBlock.value[0] instanceof J && (l = e.valueBlock.value.length), l === 0)
      return {
        verified: !0,
        result: o
      };
    if (e.valueBlock.value.length === 0 && t.valueBlock.value.length !== 0) {
      let c = !0;
      for (let h = 0; h < t.valueBlock.value.length; h++)
        c = c && (t.valueBlock.value[h].optional || !1);
      return c ? {
        verified: !0,
        result: o
      } : (t.name && (t.name = t.name.replace(/^\s+|\s+$/g, st), t.name && delete o[t.name]), o.error = "Inconsistent object length", {
        verified: !1,
        result: o
      });
    }
    for (let c = 0; c < l; c++)
      if (c - i >= e.valueBlock.value.length) {
        if (t.valueBlock.value[c].optional === !1) {
          const h = {
            verified: !1,
            result: o
          };
          return o.error = "Inconsistent length between ASN.1 data and schema", t.name && (t.name = t.name.replace(/^\s+|\s+$/g, st), t.name && (delete o[t.name], h.name = t.name)), h;
        }
      } else if (t.valueBlock.value[0] instanceof J) {
        if (a = N(o, e.valueBlock.value[c], t.valueBlock.value[0].value), a.verified === !1)
          if (t.valueBlock.value[0].optional)
            i++;
          else
            return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, st), t.name && delete o[t.name]), a;
        if (Xu in t.valueBlock.value[0] && t.valueBlock.value[0].name.length > 0) {
          let h = {};
          zm in t.valueBlock.value[0] && t.valueBlock.value[0].local ? h = e : h = o, typeof h[t.valueBlock.value[0].name] > "u" && (h[t.valueBlock.value[0].name] = []), h[t.valueBlock.value[0].name].push(e.valueBlock.value[c]);
        }
      } else if (a = N(o, e.valueBlock.value[c - i], t.valueBlock.value[c]), a.verified === !1)
        if (t.valueBlock.value[c].optional)
          i++;
        else
          return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, st), t.name && delete o[t.name]), a;
    if (a.verified === !1) {
      const c = {
        verified: !1,
        result: o
      };
      return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, st), t.name && (delete o[t.name], c.name = t.name)), c;
    }
    return {
      verified: !0,
      result: o
    };
  }
  if (t.primitiveSchema && Df in e.valueBlock) {
    const i = lf(e.valueBlock.valueHexView);
    if (i.offset === -1) {
      const a = {
        verified: !1,
        result: i.result
      };
      return t.name && (t.name = t.name.replace(/^\s+|\s+$/g, st), t.name && (delete o[t.name], a.name = t.name)), a;
    }
    return N(o, i.result, t.primitiveSchema);
  }
  return {
    verified: !0,
    result: o
  };
}
class ge {
  constructor(e = {}) {
    if ("view" in e)
      this.fromUint8Array(e.view);
    else if ("buffer" in e)
      this.fromArrayBuffer(e.buffer);
    else if ("string" in e)
      this.fromString(e.string);
    else if ("hexstring" in e)
      this.fromHexString(e.hexstring);
    else if ("length" in e && e.length > 0) {
      if (this.length = e.length, e.stub)
        for (let t = 0; t < this._view.length; t++)
          this._view[t] = e.stub;
    } else
      this.length = 0;
  }
  set buffer(e) {
    this._buffer = e, this._view = new Uint8Array(this._buffer);
  }
  get buffer() {
    return this._buffer;
  }
  set view(e) {
    this._buffer = new ArrayBuffer(e.length), this._view = new Uint8Array(this._buffer), this._view.set(e);
  }
  get view() {
    return this._view;
  }
  get length() {
    return this.view.byteLength;
  }
  set length(e) {
    this._buffer = new ArrayBuffer(e), this._view = new Uint8Array(this._buffer);
  }
  clear() {
    this._buffer = new ArrayBuffer(0), this._view = new Uint8Array(this._buffer);
  }
  fromArrayBuffer(e) {
    this._buffer = e, this._view = new Uint8Array(this._buffer);
  }
  fromUint8Array(e) {
    this.fromArrayBuffer(new Uint8Array(e).buffer);
  }
  fromString(e) {
    const t = e.length;
    this.length = t;
    for (let s = 0; s < t; s++)
      this.view[s] = e.charCodeAt(s);
  }
  toString(e = 0, t = this.view.length - e) {
    let s = "";
    (e >= this.view.length || e < 0) && (e = 0), (t >= this.view.length || t < 0) && (t = this.view.length - e);
    for (let n = e; n < e + t; n++)
      s += String.fromCharCode(this.view[n]);
    return s;
  }
  fromHexString(e) {
    const t = e.length;
    this.buffer = new ArrayBuffer(t >> 1), this.view = new Uint8Array(this.buffer);
    const s = /* @__PURE__ */ new Map();
    s.set("0", 0), s.set("1", 1), s.set("2", 2), s.set("3", 3), s.set("4", 4), s.set("5", 5), s.set("6", 6), s.set("7", 7), s.set("8", 8), s.set("9", 9), s.set("A", 10), s.set("a", 10), s.set("B", 11), s.set("b", 11), s.set("C", 12), s.set("c", 12), s.set("D", 13), s.set("d", 13), s.set("E", 14), s.set("e", 14), s.set("F", 15), s.set("f", 15);
    let n = 0, i = 0;
    for (let a = 0; a < t; a++)
      a % 2 ? (i |= s.get(e.charAt(a)), this.view[n] = i, n++) : i = s.get(e.charAt(a)) << 4;
  }
  toHexString(e = 0, t = this.view.length - e) {
    let s = "";
    (e >= this.view.length || e < 0) && (e = 0), (t >= this.view.length || t < 0) && (t = this.view.length - e);
    for (let n = e; n < e + t; n++) {
      const i = this.view[n].toString(16).toUpperCase();
      s = s + (i.length == 1 ? "0" : "") + i;
    }
    return s;
  }
  copy(e = 0, t = this.length - e) {
    if (!e && !this.length)
      return new ge();
    if (e < 0 || e > this.length - 1)
      throw new Error(`Wrong start position: ${e}`);
    return new ge({
      buffer: this._buffer.slice(e, e + t)
    });
  }
  slice(e = 0, t = this.length) {
    if (!e && !this.length)
      return new ge();
    if (e < 0 || e > this.length - 1)
      throw new Error(`Wrong start position: ${e}`);
    return new ge({
      buffer: this._buffer.slice(e, t)
    });
  }
  realloc(e) {
    const t = new ArrayBuffer(e), s = new Uint8Array(t);
    e > this._view.length ? s.set(this._view) : s.set(new Uint8Array(this._buffer, 0, e)), this._buffer = t, this._view = new Uint8Array(this._buffer);
  }
  append(e) {
    const t = this.length, s = e.length, n = e._view.subarray();
    this.realloc(t + s), this._view.set(n, t);
  }
  insert(e, t = 0, s = this.length - t) {
    return t > this.length - 1 ? !1 : (s > this.length - t && (s = this.length - t), s > e.length && (s = e.length), s == e.length ? this._view.set(e._view, t) : this._view.set(e._view.subarray(0, s), t), !0);
  }
  isEqual(e) {
    if (this.length != e.length)
      return !1;
    for (let t = 0; t < e.length; t++)
      if (this.view[t] != e.view[t])
        return !1;
    return !0;
  }
  isEqualView(e) {
    if (e.length != this.view.length)
      return !1;
    for (let t = 0; t < e.length; t++)
      if (this.view[t] != e[t])
        return !1;
    return !0;
  }
  findPattern(e, t, s, n) {
    const { start: i, length: a, backward: l } = this.prepareFindParameters(t, s, n), c = e.length;
    if (c > a)
      return -1;
    const h = [];
    for (let m = 0; m < c; m++)
      h.push(e.view[m]);
    for (let m = 0; m <= a - c; m++) {
      let g = !0;
      const d = l ? i - c - m : i + m;
      for (let b = 0; b < c; b++)
        if (this.view[b + d] != h[b]) {
          g = !1;
          break;
        }
      if (g)
        return l ? i - c - m : i + c + m;
    }
    return -1;
  }
  findFirstIn(e, t, s, n) {
    const { start: i, length: a, backward: l } = this.prepareFindParameters(t, s, n), c = {
      id: -1,
      position: l ? 0 : i + a,
      length: 0
    };
    for (let h = 0; h < e.length; h++) {
      const m = this.findPattern(e[h], i, a, l);
      if (m != -1) {
        let g = !1;
        const d = e[h].length;
        l ? m - d >= c.position - c.length && (g = !0) : m - d <= c.position - c.length && (g = !0), g && (c.position = m, c.id = h, c.length = d);
      }
    }
    return c;
  }
  findAllIn(e, t, s) {
    let { start: n, length: i } = this.prepareFindParameters(t, s);
    const a = [];
    let l = {
      id: -1,
      position: n
    };
    do {
      const c = l.position;
      if (l = this.findFirstIn(e, l.position, i), l.id == -1)
        break;
      i -= l.position - c, a.push({
        id: l.id,
        position: l.position
      });
    } while (!0);
    return a;
  }
  findAllPatternIn(e, t, s) {
    const { start: n, length: i } = this.prepareFindParameters(t, s), a = [], l = e.length;
    if (l > i)
      return -1;
    const c = Array.from(e.view);
    for (let h = 0; h <= i - l; h++) {
      let m = !0;
      const g = n + h;
      for (let d = 0; d < l; d++)
        if (this.view[d + g] != c[d]) {
          m = !1;
          break;
        }
      m && (a.push(n + l + h), h += l - 1);
    }
    return a;
  }
  findFirstNotIn(e, t, s, n) {
    let { start: i, length: a, backward: l } = this.prepareFindParameters(t, s, n);
    const c = {
      left: {
        id: -1,
        position: i
      },
      right: {
        id: -1,
        position: 0
      },
      value: new ge()
    };
    let h = a;
    for (; h > 0; ) {
      if (c.right = this.findFirstIn(e, l ? i - a + h : i + a - h, h, l), c.right.id == -1) {
        a = h, l ? i -= a : i = c.left.position, c.value = new ge({
          buffer: this._buffer.slice(i, i + a)
        });
        break;
      }
      if (c.right.position != (l ? c.left.position - e[c.right.id].length : c.left.position + e[c.right.id].length)) {
        l ? (i = c.right.position + e[c.right.id].length, a = c.left.position - c.right.position - e[c.right.id].length) : (i = c.left.position, a = c.right.position - c.left.position - e[c.right.id].length), c.value = new ge({
          buffer: this._buffer.slice(i, i + a)
        });
        break;
      }
      c.left = c.right, h -= e[c.right.id].length;
    }
    if (l) {
      const m = c.right;
      c.right = c.left, c.left = m;
    }
    return c;
  }
  findAllNotIn(e, t, s) {
    let { start: n, length: i } = this.prepareFindParameters(t, s);
    const a = [];
    let l = {
      left: {
        id: -1,
        position: n
      },
      right: {
        id: -1,
        position: n
      },
      value: new ge()
    };
    do {
      const c = l.right.position;
      l = this.findFirstNotIn(e, l.right.position, i), i -= l.right.position - c, a.push({
        left: {
          id: l.left.id,
          position: l.left.position
        },
        right: {
          id: l.right.id,
          position: l.right.position
        },
        value: l.value
      });
    } while (l.right.id != -1);
    return a;
  }
  findFirstSequence(e, t, s, n) {
    let { start: i, length: a, backward: l } = this.prepareFindParameters(t, s, n);
    const c = this.skipNotPatterns(e, i, a, l);
    if (c == -1)
      return {
        position: -1,
        value: new ge()
      };
    const h = this.skipPatterns(e, c, a - (l ? i - c : c - i), l);
    l ? (i = h, a = c - h) : (i = c, a = h - c);
    const m = new ge({
      buffer: this._buffer.slice(i, i + a)
    });
    return {
      position: h,
      value: m
    };
  }
  findAllSequences(e, t, s) {
    let { start: n, length: i } = this.prepareFindParameters(t, s);
    const a = [];
    let l = {
      position: n,
      value: new ge()
    };
    do {
      const c = l.position;
      l = this.findFirstSequence(e, l.position, i), l.position != -1 && (i -= l.position - c, a.push({
        position: l.position,
        value: l.value
      }));
    } while (l.position != -1);
    return a;
  }
  findPairedPatterns(e, t, s, n) {
    const i = [];
    if (e.isEqual(t))
      return i;
    const { start: a, length: l } = this.prepareFindParameters(s, n);
    let c = 0;
    const h = this.findAllPatternIn(e, a, l);
    if (!Array.isArray(h) || h.length == 0)
      return i;
    const m = this.findAllPatternIn(t, a, l);
    if (!Array.isArray(m) || m.length == 0)
      return i;
    for (; c < h.length && m.length != 0; ) {
      if (h[0] == m[0]) {
        i.push({
          left: h[0],
          right: m[0]
        }), h.splice(0, 1), m.splice(0, 1);
        continue;
      }
      if (h[c] > m[0])
        break;
      for (; h[c] < m[0] && (c++, !(c >= h.length)); )
        ;
      i.push({
        left: h[c - 1],
        right: m[0]
      }), h.splice(c - 1, 1), m.splice(0, 1), c = 0;
    }
    return i.sort((g, d) => g.left - d.left), i;
  }
  findPairedArrays(e, t, s, n) {
    const { start: i, length: a } = this.prepareFindParameters(s, n), l = [];
    let c = 0;
    const h = this.findAllIn(e, i, a);
    if (h.length == 0)
      return l;
    const m = this.findAllIn(t, i, a);
    if (m.length == 0)
      return l;
    for (; c < h.length && m.length != 0; ) {
      if (h[0].position == m[0].position) {
        l.push({
          left: h[0],
          right: m[0]
        }), h.splice(0, 1), m.splice(0, 1);
        continue;
      }
      if (h[c].position > m[0].position)
        break;
      for (; h[c].position < m[0].position && (c++, !(c >= h.length)); )
        ;
      l.push({
        left: h[c - 1],
        right: m[0]
      }), h.splice(c - 1, 1), m.splice(0, 1), c = 0;
    }
    return l.sort((g, d) => g.left.position - d.left.position), l;
  }
  replacePattern(e, t, s, n, i = null) {
    let a = [], l;
    const c = {
      status: -1,
      searchPatternPositions: [],
      replacePatternPositions: []
    }, { start: h, length: m } = this.prepareFindParameters(s, n);
    if (i == null) {
      if (a = this.findAllIn([e], h, m), a.length == 0)
        return c;
    } else
      a = i;
    c.searchPatternPositions.push(...Array.from(a, (A) => A.position));
    const g = e.length - t.length, d = new ArrayBuffer(this.view.length - a.length * g), b = new Uint8Array(d);
    for (b.set(new Uint8Array(this.buffer, 0, h)), l = 0; l < a.length; l++) {
      const A = l == 0 ? h : a[l - 1].position;
      b.set(new Uint8Array(this.buffer, A, a[l].position - e.length - A), A - l * g), b.set(t.view, a[l].position - e.length - l * g), c.replacePatternPositions.push(a[l].position - e.length - l * g);
    }
    return l--, b.set(new Uint8Array(this.buffer, a[l].position, this.length - a[l].position), a[l].position - e.length + t.length - l * g), this.buffer = d, this.view = new Uint8Array(this.buffer), c.status = 1, c;
  }
  skipPatterns(e, t, s, n) {
    const { start: i, length: a, backward: l } = this.prepareFindParameters(t, s, n);
    let c = i;
    for (let h = 0; h < e.length; h++) {
      const m = e[h].length, g = l ? c - m : c;
      let d = !0;
      for (let b = 0; b < m; b++)
        if (this.view[b + g] != e[h].view[b]) {
          d = !1;
          break;
        }
      if (d) {
        if (h = -1, l) {
          if (c -= m, c <= 0)
            return c;
        } else if (c += m, c >= i + a)
          return c;
      }
    }
    return c;
  }
  skipNotPatterns(e, t, s, n) {
    const { start: i, length: a, backward: l } = this.prepareFindParameters(t, s, n);
    let c = -1;
    for (let h = 0; h < a; h++) {
      for (let m = 0; m < e.length; m++) {
        const g = e[m].length, d = l ? i - h - g : i + h;
        let b = !0;
        for (let A = 0; A < g; A++)
          if (this.view[A + d] != e[m].view[A]) {
            b = !1;
            break;
          }
        if (b) {
          c = l ? i - h : i + h;
          break;
        }
      }
      if (c != -1)
        break;
    }
    return c;
  }
  prepareFindParameters(e = null, t = null, s = !1) {
    return e === null && (e = s ? this.length : 0), e > this.length && (e = this.length), s ? (t === null && (t = e), t > e && (t = e)) : (t === null && (t = this.length - e), t > this.length - e && (t = this.length - e)), { start: e, length: t, backward: s };
  }
}
const dg = 16777216;
class In {
  constructor(e = {}) {
    this._stream = new ge(), this._length = 0, this._start = 0, this.backward = !1, this.appendBlock = 0, this.prevLength = 0, this.prevStart = 0, "view" in e ? this.stream = new ge({ view: e.view }) : "buffer" in e ? this.stream = new ge({ buffer: e.buffer }) : "string" in e ? this.stream = new ge({ string: e.string }) : "hexstring" in e ? this.stream = new ge({ hexstring: e.hexstring }) : "stream" in e ? this.stream = e.stream.slice() : this.stream = new ge(), "backward" in e && e.backward && (this.backward = e.backward, this._start = this.stream.length), "length" in e && e.length > 0 && (this._length = e.length), "start" in e && e.start && e.start > 0 && (this._start = e.start), "appendBlock" in e && e.appendBlock && e.appendBlock > 0 && (this.appendBlock = e.appendBlock);
  }
  set stream(e) {
    this._stream = e, this.prevLength = this._length, this._length = e.length, this.prevStart = this._start, this._start = 0;
  }
  get stream() {
    return this._stream;
  }
  set length(e) {
    this.prevLength = this._length, this._length = e;
  }
  get length() {
    return this.appendBlock ? this.start : this._length;
  }
  set start(e) {
    e > this.stream.length || (this.prevStart = this._start, this.prevLength = this._length, this._length -= this.backward ? this._start - e : e - this._start, this._start = e);
  }
  get start() {
    return this._start;
  }
  get buffer() {
    return this._stream.buffer.slice(0, this._length);
  }
  resetPosition() {
    this._start = this.prevStart, this._length = this.prevLength;
  }
  findPattern(e, t = null) {
    (t == null || t > this.length) && (t = this.length);
    const s = this.stream.findPattern(e, this.start, this.length, this.backward);
    if (s == -1)
      return s;
    if (this.backward) {
      if (s < this.start - e.length - t)
        return -1;
    } else if (s > this.start + e.length + t)
      return -1;
    return this.start = s, s;
  }
  findFirstIn(e, t = null) {
    (t == null || t > this.length) && (t = this.length);
    const s = this.stream.findFirstIn(e, this.start, this.length, this.backward);
    if (s.id == -1)
      return s;
    if (this.backward) {
      if (s.position < this.start - e[s.id].length - t)
        return {
          id: -1,
          position: this.backward ? 0 : this.start + this.length
        };
    } else if (s.position > this.start + e[s.id].length + t)
      return {
        id: -1,
        position: this.backward ? 0 : this.start + this.length
      };
    return this.start = s.position, s;
  }
  findAllIn(e) {
    const t = this.backward ? this.start - this.length : this.start;
    return this.stream.findAllIn(e, t, this.length);
  }
  findFirstNotIn(e, t = null) {
    (t == null || t > this._length) && (t = this._length);
    const s = this._stream.findFirstNotIn(e, this._start, this._length, this.backward);
    if (s.left.id == -1 && s.right.id == -1)
      return s;
    if (this.backward) {
      if (s.right.id != -1 && s.right.position < this._start - e[s.right.id].length - t)
        return {
          left: {
            id: -1,
            position: this._start
          },
          right: {
            id: -1,
            position: 0
          },
          value: new ge()
        };
    } else if (s.left.id != -1 && s.left.position > this._start + e[s.left.id].length + t)
      return {
        left: {
          id: -1,
          position: this._start
        },
        right: {
          id: -1,
          position: 0
        },
        value: new ge()
      };
    return this.backward ? s.left.id == -1 ? this.start = 0 : this.start = s.left.position : s.right.id == -1 ? this.start = this._start + this._length : this.start = s.right.position, s;
  }
  findAllNotIn(e) {
    const t = this.backward ? this._start - this._length : this._start;
    return this._stream.findAllNotIn(e, t, this._length);
  }
  findFirstSequence(e, t = null, s = null) {
    (t == null || t > this._length) && (t = this._length), (s == null || s > t) && (s = t);
    const n = this._stream.findFirstSequence(e, this._start, t, this.backward);
    if (n.value.length == 0)
      return n;
    if (this.backward) {
      if (n.position < this._start - n.value.length - s)
        return {
          position: -1,
          value: new ge()
        };
    } else if (n.position > this._start + n.value.length + s)
      return {
        position: -1,
        value: new ge()
      };
    return this.start = n.position, n;
  }
  findAllSequences(e) {
    const t = this.backward ? this.start - this.length : this.start;
    return this.stream.findAllSequences(e, t, this.length);
  }
  findPairedPatterns(e, t, s = null) {
    (s == null || s > this.length) && (s = this.length);
    const n = this.backward ? this.start - this.length : this.start, i = this.stream.findPairedPatterns(e, t, n, this.length);
    if (i.length) {
      if (this.backward) {
        if (i[0].right < this.start - t.length - s)
          return [];
      } else if (i[0].left > this.start + e.length + s)
        return [];
    }
    return i;
  }
  findPairedArrays(e, t, s = null) {
    (s == null || s > this.length) && (s = this.length);
    const n = this.backward ? this.start - this.length : this.start, i = this.stream.findPairedArrays(e, t, n, this.length);
    if (i.length) {
      if (this.backward) {
        if (i[0].right.position < this.start - t[i[0].right.id].length - s)
          return [];
      } else if (i[0].left.position > this.start + e[i[0].left.id].length + s)
        return [];
    }
    return i;
  }
  replacePattern(e, t) {
    const s = this.backward ? this.start - this.length : this.start;
    return this.stream.replacePattern(e, t, s, this.length);
  }
  skipPatterns(e) {
    const t = this.stream.skipPatterns(e, this.start, this.length, this.backward);
    return this.start = t, t;
  }
  skipNotPatterns(e) {
    const t = this.stream.skipNotPatterns(e, this.start, this.length, this.backward);
    return t == -1 ? -1 : (this.start = t, t);
  }
  append(e) {
    this.beforeAppend(e.length), this._stream.view.set(e.view, this._start), this._length += e.length * 2, this.start = this._start + e.length, this.prevLength -= e.length * 2;
  }
  appendView(e) {
    this.beforeAppend(e.length), this._stream.view.set(e, this._start), this._length += e.length * 2, this.start = this._start + e.length, this.prevLength -= e.length * 2;
  }
  appendChar(e) {
    this.beforeAppend(1), this._stream.view[this._start] = e, this._length += 2, this.start = this._start + 1, this.prevLength -= 2;
  }
  appendUint16(e) {
    this.beforeAppend(2);
    const t = new Uint16Array([e]), s = new Uint8Array(t.buffer);
    this.stream.view[this._start] = s[1], this._stream.view[this._start + 1] = s[0], this._length += 4, this.start = this._start + 2, this.prevLength -= 4;
  }
  appendUint24(e) {
    this.beforeAppend(3);
    const t = new Uint32Array([e]), s = new Uint8Array(t.buffer);
    this._stream.view[this._start] = s[2], this._stream.view[this._start + 1] = s[1], this._stream.view[this._start + 2] = s[0], this._length += 6, this.start = this._start + 3, this.prevLength -= 6;
  }
  appendUint32(e) {
    this.beforeAppend(4);
    const t = new Uint32Array([e]), s = new Uint8Array(t.buffer);
    this._stream.view[this._start] = s[3], this._stream.view[this._start + 1] = s[2], this._stream.view[this._start + 2] = s[1], this._stream.view[this._start + 3] = s[0], this._length += 8, this.start = this._start + 4, this.prevLength -= 8;
  }
  appendInt16(e) {
    this.beforeAppend(2);
    const t = new Int16Array([e]), s = new Uint8Array(t.buffer);
    this._stream.view[this._start] = s[1], this._stream.view[this._start + 1] = s[0], this._length += 4, this.start = this._start + 2, this.prevLength -= 4;
  }
  appendInt32(e) {
    this.beforeAppend(4);
    const t = new Int32Array([e]), s = new Uint8Array(t.buffer);
    this._stream.view[this._start] = s[3], this._stream.view[this._start + 1] = s[2], this._stream.view[this._start + 2] = s[1], this._stream.view[this._start + 3] = s[0], this._length += 8, this.start = this._start + 4, this.prevLength -= 8;
  }
  getBlock(e, t = !0) {
    if (this._length <= 0)
      return new Uint8Array(0);
    this._length < e && (e = this._length);
    let s;
    if (this.backward) {
      const n = this._stream.view.subarray(this._length - e, this._length);
      s = new Uint8Array(e);
      for (let i = 0; i < e; i++)
        s[e - 1 - i] = n[i];
    } else
      s = this._stream.view.subarray(this._start, this._start + e);
    return t && (this.start += this.backward ? -1 * e : e), s;
  }
  getUint16(e = !0) {
    const t = this.getBlock(2, e);
    return t.length < 2 ? 0 : t[0] << 8 | t[1];
  }
  getInt16(e = !0) {
    const t = this.getUint16(e), s = 32768;
    return t & s ? -(s - (t ^ s)) : t;
  }
  getUint24(e = !0) {
    const t = this.getBlock(4, e);
    return t.length < 3 ? 0 : t[0] << 16 | t[1] << 8 | t[2];
  }
  getUint32(e = !0) {
    const t = this.getBlock(4, e);
    return t.length < 4 ? 0 : t[0] * dg + (t[1] << 16) + (t[2] << 8) + t[3];
  }
  getInt32(e = !0) {
    const t = this.getUint32(e), s = 2147483648;
    return t & s ? -(s - (t ^ s)) : t;
  }
  beforeAppend(e) {
    this._start + e > this._stream.length && (e > this.appendBlock && (this.appendBlock = e + In.APPEND_BLOCK), this._stream.realloc(this._stream.length + this.appendBlock));
  }
}
In.APPEND_BLOCK = 1e3;
function mg(o) {
  return o instanceof Uint8Array || o != null && typeof o == "object" && o.constructor.name === "Uint8Array";
}
function dm(o, ...e) {
  if (!mg(o))
    throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(o.length))
    throw new Error(`Uint8Array expected of length ${e}, not of length=${o.length}`);
}
function Lf(o, e = !0) {
  if (o.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && o.finished)
    throw new Error("Hash#digest() has already been called");
}
function gg(o, e) {
  dm(o);
  const t = e.outputLen;
  if (o.length < t)
    throw new Error(`digestInto() expects output buffer of length at least ${t}`);
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Zu = (o) => new DataView(o.buffer, o.byteOffset, o.byteLength), Ut = (o, e) => o << 32 - e | o >>> e, zu = (o, e) => o << e | o >>> 32 - e >>> 0;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function wg(o) {
  if (typeof o != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof o}`);
  return new Uint8Array(new TextEncoder().encode(o));
}
function mm(o) {
  return typeof o == "string" && (o = wg(o)), dm(o), o;
}
class yg {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function qu(o) {
  const e = (s) => o().update(mm(s)).digest(), t = o();
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = () => o(), e;
}
function vg(o, e, t, s) {
  if (typeof o.setBigUint64 == "function")
    return o.setBigUint64(e, t, s);
  const n = BigInt(32), i = BigInt(4294967295), a = Number(t >> n & i), l = Number(t & i), c = s ? 4 : 0, h = s ? 0 : 4;
  o.setUint32(e + c, a, s), o.setUint32(e + h, l, s);
}
const gm = (o, e, t) => o & e ^ ~o & t, wm = (o, e, t) => o & e ^ o & t ^ e & t;
class gf extends yg {
  constructor(e, t, s, n) {
    super(), this.blockLen = e, this.outputLen = t, this.padOffset = s, this.isLE = n, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = Zu(this.buffer);
  }
  update(e) {
    Lf(this);
    const { view: t, buffer: s, blockLen: n } = this;
    e = mm(e);
    const i = e.length;
    for (let a = 0; a < i; ) {
      const l = Math.min(n - this.pos, i - a);
      if (l === n) {
        const c = Zu(e);
        for (; n <= i - a; a += n)
          this.process(c, a);
        continue;
      }
      s.set(e.subarray(a, a + l), this.pos), this.pos += l, a += l, this.pos === n && (this.process(t, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    Lf(this), gg(e, this), this.finished = !0;
    const { buffer: t, view: s, blockLen: n, isLE: i } = this;
    let { pos: a } = this;
    t[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > n - a && (this.process(s, 0), a = 0);
    for (let g = a; g < n; g++)
      t[g] = 0;
    vg(s, n - 8, BigInt(this.length * 8), i), this.process(s, 0);
    const l = Zu(e), c = this.outputLen;
    if (c % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = c / 4, m = this.get();
    if (h > m.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < h; g++)
      l.setUint32(4 * g, m[g], i);
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const s = e.slice(0, t);
    return this.destroy(), s;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: t, buffer: s, length: n, finished: i, destroyed: a, pos: l } = this;
    return e.length = n, e.pos = l, e.finished = i, e.destroyed = a, n % t && e.buffer.set(s), e;
  }
}
const Za = /* @__PURE__ */ new Uint32Array([
  1732584193,
  4023233417,
  2562383102,
  271733878,
  3285377520
]), Ns = /* @__PURE__ */ new Uint32Array(80);
let Sg = class extends gf {
  constructor() {
    super(64, 20, 8, !1), this.A = Za[0] | 0, this.B = Za[1] | 0, this.C = Za[2] | 0, this.D = Za[3] | 0, this.E = Za[4] | 0;
  }
  get() {
    const { A: e, B: t, C: s, D: n, E: i } = this;
    return [e, t, s, n, i];
  }
  set(e, t, s, n, i) {
    this.A = e | 0, this.B = t | 0, this.C = s | 0, this.D = n | 0, this.E = i | 0;
  }
  process(e, t) {
    for (let c = 0; c < 16; c++, t += 4)
      Ns[c] = e.getUint32(t, !1);
    for (let c = 16; c < 80; c++)
      Ns[c] = zu(Ns[c - 3] ^ Ns[c - 8] ^ Ns[c - 14] ^ Ns[c - 16], 1);
    let { A: s, B: n, C: i, D: a, E: l } = this;
    for (let c = 0; c < 80; c++) {
      let h, m;
      c < 20 ? (h = gm(n, i, a), m = 1518500249) : c < 40 ? (h = n ^ i ^ a, m = 1859775393) : c < 60 ? (h = wm(n, i, a), m = 2400959708) : (h = n ^ i ^ a, m = 3395469782);
      const g = zu(s, 5) + h + l + m + Ns[c] | 0;
      l = a, a = i, i = zu(n, 30), n = s, s = g;
    }
    s = s + this.A | 0, n = n + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, l = l + this.E | 0, this.set(s, n, i, a, l);
  }
  roundClean() {
    Ns.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const Ag = /* @__PURE__ */ qu(() => new Sg()), pg = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), Cs = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Bs = /* @__PURE__ */ new Uint32Array(64);
let bg = class extends gf {
  constructor() {
    super(64, 32, 8, !1), this.A = Cs[0] | 0, this.B = Cs[1] | 0, this.C = Cs[2] | 0, this.D = Cs[3] | 0, this.E = Cs[4] | 0, this.F = Cs[5] | 0, this.G = Cs[6] | 0, this.H = Cs[7] | 0;
  }
  get() {
    const { A: e, B: t, C: s, D: n, E: i, F: a, G: l, H: c } = this;
    return [e, t, s, n, i, a, l, c];
  }
  // prettier-ignore
  set(e, t, s, n, i, a, l, c) {
    this.A = e | 0, this.B = t | 0, this.C = s | 0, this.D = n | 0, this.E = i | 0, this.F = a | 0, this.G = l | 0, this.H = c | 0;
  }
  process(e, t) {
    for (let g = 0; g < 16; g++, t += 4)
      Bs[g] = e.getUint32(t, !1);
    for (let g = 16; g < 64; g++) {
      const d = Bs[g - 15], b = Bs[g - 2], A = Ut(d, 7) ^ Ut(d, 18) ^ d >>> 3, E = Ut(b, 17) ^ Ut(b, 19) ^ b >>> 10;
      Bs[g] = E + Bs[g - 7] + A + Bs[g - 16] | 0;
    }
    let { A: s, B: n, C: i, D: a, E: l, F: c, G: h, H: m } = this;
    for (let g = 0; g < 64; g++) {
      const d = Ut(l, 6) ^ Ut(l, 11) ^ Ut(l, 25), b = m + d + gm(l, c, h) + pg[g] + Bs[g] | 0, E = (Ut(s, 2) ^ Ut(s, 13) ^ Ut(s, 22)) + wm(s, n, i) | 0;
      m = h, h = c, c = l, l = a + b | 0, a = i, i = n, n = s, s = b + E | 0;
    }
    s = s + this.A | 0, n = n + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, l = l + this.E | 0, c = c + this.F | 0, h = h + this.G | 0, m = m + this.H | 0, this.set(s, n, i, a, l, c, h, m);
  }
  roundClean() {
    Bs.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const kg = /* @__PURE__ */ qu(() => new bg()), Cc = /* @__PURE__ */ BigInt(2 ** 32 - 1), Th = /* @__PURE__ */ BigInt(32);
function ym(o, e = !1) {
  return e ? { h: Number(o & Cc), l: Number(o >> Th & Cc) } : { h: Number(o >> Th & Cc) | 0, l: Number(o & Cc) | 0 };
}
function Eg(o, e = !1) {
  let t = new Uint32Array(o.length), s = new Uint32Array(o.length);
  for (let n = 0; n < o.length; n++) {
    const { h: i, l: a } = ym(o[n], e);
    [t[n], s[n]] = [i, a];
  }
  return [t, s];
}
const Ng = (o, e) => BigInt(o >>> 0) << Th | BigInt(e >>> 0), Cg = (o, e, t) => o >>> t, Bg = (o, e, t) => o << 32 - t | e >>> t, Ig = (o, e, t) => o >>> t | e << 32 - t, Vg = (o, e, t) => o << 32 - t | e >>> t, xg = (o, e, t) => o << 64 - t | e >>> t - 32, Og = (o, e, t) => o >>> t - 32 | e << 64 - t, Rg = (o, e) => e, Tg = (o, e) => o, Dg = (o, e, t) => o << t | e >>> 32 - t, Pg = (o, e, t) => e << t | o >>> 32 - t, Lg = (o, e, t) => e << t - 32 | o >>> 64 - t, Ug = (o, e, t) => o << t - 32 | e >>> 64 - t;
function Hg(o, e, t, s) {
  const n = (e >>> 0) + (s >>> 0);
  return { h: o + t + (n / 2 ** 32 | 0) | 0, l: n | 0 };
}
const Mg = (o, e, t) => (o >>> 0) + (e >>> 0) + (t >>> 0), _g = (o, e, t, s) => e + t + s + (o / 2 ** 32 | 0) | 0, $g = (o, e, t, s) => (o >>> 0) + (e >>> 0) + (t >>> 0) + (s >>> 0), Kg = (o, e, t, s, n) => e + t + s + n + (o / 2 ** 32 | 0) | 0, Jg = (o, e, t, s, n) => (o >>> 0) + (e >>> 0) + (t >>> 0) + (s >>> 0) + (n >>> 0), jg = (o, e, t, s, n, i) => e + t + s + n + i + (o / 2 ** 32 | 0) | 0, W = {
  fromBig: ym,
  split: Eg,
  toBig: Ng,
  shrSH: Cg,
  shrSL: Bg,
  rotrSH: Ig,
  rotrSL: Vg,
  rotrBH: xg,
  rotrBL: Og,
  rotr32H: Rg,
  rotr32L: Tg,
  rotlSH: Dg,
  rotlSL: Pg,
  rotlBH: Lg,
  rotlBL: Ug,
  add: Hg,
  add3L: Mg,
  add3H: _g,
  add4L: $g,
  add4H: Kg,
  add5H: jg,
  add5L: Jg
}, [Fg, qg] = W.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((o) => BigInt(o))), Is = /* @__PURE__ */ new Uint32Array(80), Vs = /* @__PURE__ */ new Uint32Array(80);
let vm = class extends gf {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: e, Al: t, Bh: s, Bl: n, Ch: i, Cl: a, Dh: l, Dl: c, Eh: h, El: m, Fh: g, Fl: d, Gh: b, Gl: A, Hh: E, Hl: y } = this;
    return [e, t, s, n, i, a, l, c, h, m, g, d, b, A, E, y];
  }
  // prettier-ignore
  set(e, t, s, n, i, a, l, c, h, m, g, d, b, A, E, y) {
    this.Ah = e | 0, this.Al = t | 0, this.Bh = s | 0, this.Bl = n | 0, this.Ch = i | 0, this.Cl = a | 0, this.Dh = l | 0, this.Dl = c | 0, this.Eh = h | 0, this.El = m | 0, this.Fh = g | 0, this.Fl = d | 0, this.Gh = b | 0, this.Gl = A | 0, this.Hh = E | 0, this.Hl = y | 0;
  }
  process(e, t) {
    for (let B = 0; B < 16; B++, t += 4)
      Is[B] = e.getUint32(t), Vs[B] = e.getUint32(t += 4);
    for (let B = 16; B < 80; B++) {
      const V = Is[B - 15] | 0, R = Vs[B - 15] | 0, _ = W.rotrSH(V, R, 1) ^ W.rotrSH(V, R, 8) ^ W.shrSH(V, R, 7), te = W.rotrSL(V, R, 1) ^ W.rotrSL(V, R, 8) ^ W.shrSL(V, R, 7), j = Is[B - 2] | 0, Z = Vs[B - 2] | 0, ye = W.rotrSH(j, Z, 19) ^ W.rotrBH(j, Z, 61) ^ W.shrSH(j, Z, 6), se = W.rotrSL(j, Z, 19) ^ W.rotrBL(j, Z, 61) ^ W.shrSL(j, Z, 6), ae = W.add4L(te, se, Vs[B - 7], Vs[B - 16]), Wt = W.add4H(ae, _, ye, Is[B - 7], Is[B - 16]);
      Is[B] = Wt | 0, Vs[B] = ae | 0;
    }
    let { Ah: s, Al: n, Bh: i, Bl: a, Ch: l, Cl: c, Dh: h, Dl: m, Eh: g, El: d, Fh: b, Fl: A, Gh: E, Gl: y, Hh: O, Hl: x } = this;
    for (let B = 0; B < 80; B++) {
      const V = W.rotrSH(g, d, 14) ^ W.rotrSH(g, d, 18) ^ W.rotrBH(g, d, 41), R = W.rotrSL(g, d, 14) ^ W.rotrSL(g, d, 18) ^ W.rotrBL(g, d, 41), _ = g & b ^ ~g & E, te = d & A ^ ~d & y, j = W.add5L(x, R, te, qg[B], Vs[B]), Z = W.add5H(j, O, V, _, Fg[B], Is[B]), ye = j | 0, se = W.rotrSH(s, n, 28) ^ W.rotrBH(s, n, 34) ^ W.rotrBH(s, n, 39), ae = W.rotrSL(s, n, 28) ^ W.rotrBL(s, n, 34) ^ W.rotrBL(s, n, 39), Wt = s & i ^ s & l ^ i & l, Me = n & a ^ n & c ^ a & c;
      O = E | 0, x = y | 0, E = b | 0, y = A | 0, b = g | 0, A = d | 0, { h: g, l: d } = W.add(h | 0, m | 0, Z | 0, ye | 0), h = l | 0, m = c | 0, l = i | 0, c = a | 0, i = s | 0, a = n | 0;
      const fe = W.add3L(ye, ae, Me);
      s = W.add3H(fe, Z, se, Wt), n = fe | 0;
    }
    ({ h: s, l: n } = W.add(this.Ah | 0, this.Al | 0, s | 0, n | 0)), { h: i, l: a } = W.add(this.Bh | 0, this.Bl | 0, i | 0, a | 0), { h: l, l: c } = W.add(this.Ch | 0, this.Cl | 0, l | 0, c | 0), { h, l: m } = W.add(this.Dh | 0, this.Dl | 0, h | 0, m | 0), { h: g, l: d } = W.add(this.Eh | 0, this.El | 0, g | 0, d | 0), { h: b, l: A } = W.add(this.Fh | 0, this.Fl | 0, b | 0, A | 0), { h: E, l: y } = W.add(this.Gh | 0, this.Gl | 0, E | 0, y | 0), { h: O, l: x } = W.add(this.Hh | 0, this.Hl | 0, O | 0, x | 0), this.set(s, n, i, a, l, c, h, m, g, d, b, A, E, y, O, x);
  }
  roundClean() {
    Is.fill(0), Vs.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}, Wg = class extends vm {
  constructor() {
    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48;
  }
};
const Gg = /* @__PURE__ */ qu(() => new vm()), Yg = /* @__PURE__ */ qu(() => new Wg());
/*!
 * Copyright (c) 2014, GlobalSign
 * Copyright (c) 2015-2019, Peculiar Ventures
 * All rights reserved.
 * 
 * Author 2014-2019, Yury Strozhevsky
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice, this
 *   list of conditions and the following disclaimer in the documentation and/or
 *   other materials provided with the distribution.
 * 
 * * Neither the name of the {organization} nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */
const be = new ArrayBuffer(0), u = "";
class ie extends TypeError {
  constructor() {
    super(...arguments), this.name = ie.NAME;
  }
  static isType(e, t) {
    if (typeof t == "string") {
      if (t === "Array" && Array.isArray(e))
        return !0;
      if (t === "ArrayBuffer" && e instanceof ArrayBuffer)
        return !0;
      if (t === "ArrayBufferView" && ArrayBuffer.isView(e))
        return !0;
      if (typeof e === t)
        return !0;
    } else if (e instanceof t)
      return !0;
    return !1;
  }
  static assert(e, t, ...s) {
    for (const i of s)
      if (this.isType(e, i))
        return;
    const n = s.map((i) => i instanceof Function && "name" in i ? i.name : `${i}`);
    throw new ie(`Parameter '${t}' is not of type ${n.length > 1 ? `(${n.join(" or ")})` : n[0]}`);
  }
}
ie.NAME = "ArgumentError";
class Q extends TypeError {
  static assert(...e) {
    let t = null, s, n;
    typeof e[0] == "string" ? (t = e[0], s = e[1], n = e.slice(2)) : (s = e[0], n = e.slice(1)), ie.assert(s, "parameters", "object");
    for (const i of n) {
      const a = s[i];
      if (a == null)
        throw new Q(i, t);
    }
  }
  static assertEmpty(e, t, s) {
    if (e == null)
      throw new Q(t, s);
  }
  constructor(e, t = null, s) {
    super(), this.name = Q.NAME, this.field = e, t && (this.target = t), s ? this.message = s : this.message = `Absent mandatory parameter '${e}' ${t ? ` in '${t}'` : u}`;
  }
}
Q.NAME = "ParameterError";
class p extends Error {
  static assertSchema(e, t) {
    if (!e.verified)
      throw new Error(`Object's schema was not verified against input data for ${t}`);
  }
  static assert(e, t) {
    if (e.offset === -1)
      throw new p(`Error during parsing of ASN.1 data. Data is not correct for '${t}'.`);
  }
  constructor(e) {
    super(e), this.name = "AsnError";
  }
}
class k {
  static blockName() {
    return this.CLASS_NAME;
  }
  static fromBER(e) {
    const t = Oe(e);
    p.assert(t, this.name);
    try {
      return new this({ schema: t.result });
    } catch {
      throw new p(`Cannot create '${this.CLASS_NAME}' from ASN.1 object`);
    }
  }
  static defaultValues(e) {
    throw new Error(`Invalid member name for ${this.CLASS_NAME} class: ${e}`);
  }
  static schema(e = {}) {
    throw new Error(`Method '${this.CLASS_NAME}.schema' should be overridden`);
  }
  get className() {
    return this.constructor.CLASS_NAME;
  }
  toString(e = "hex") {
    let t;
    try {
      t = this.toSchema();
    } catch {
      t = this.toSchema(!0);
    }
    return H.ToString(t.toBER(), e);
  }
}
k.CLASS_NAME = "PkiObject";
function wn(o) {
  let e = !1, t = u;
  const s = o.trim();
  for (let n = 0; n < s.length; n++)
    s.charCodeAt(n) === 32 ? e === !1 && (e = !0) : (e && (t += " ", e = !1), t += s[n]);
  return t.toLowerCase();
}
const za = "type", eh = "value";
class pn extends k {
  constructor(e = {}) {
    super(), this.type = r(e, za, pn.defaultValues(za)), this.value = r(e, eh, pn.defaultValues(eh)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case za:
        return u;
      case eh:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.type || u }),
        new K({ name: t.value || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, [
      za,
      "typeValue"
    ]);
    const t = N(e, e, pn.schema({
      names: {
        type: za,
        value: "typeValue"
      }
    }));
    p.assertSchema(t, this.className), this.type = t.result.type.valueBlock.toString(), this.value = t.result.typeValue;
  }
  toSchema() {
    return new f({
      value: [
        new T({ value: this.type }),
        this.value
      ]
    });
  }
  toJSON() {
    const e = {
      type: this.type
    };
    return Object.keys(this.value).length !== 0 ? e.value = this.value.toJSON() : e.value = this.value, e;
  }
  isEqual(e) {
    const t = [
      Dt.blockName(),
      mc.blockName(),
      gc.blockName(),
      La.blockName(),
      Ot.blockName(),
      wc.blockName(),
      hf.blockName(),
      ju.blockName(),
      ff.blockName(),
      Fu.blockName(),
      df.blockName(),
      mf.blockName()
    ];
    if (e instanceof ArrayBuffer)
      return L.isEqual(this.value.valueBeforeDecodeView, e);
    if (e.constructor.blockName() === pn.blockName()) {
      if (this.type !== e.type)
        return !1;
      const s = [!1, !1], n = this.value.constructor.blockName();
      for (const a of t)
        n === a && (s[0] = !0), e.value.constructor.blockName() === a && (s[1] = !0);
      if (s[0] !== s[1])
        return !1;
      if (s[0] && s[1]) {
        const a = wn(this.value.valueBlock.value), l = wn(e.value.valueBlock.value);
        if (a.localeCompare(l) !== 0)
          return !1;
      } else if (!L.isEqual(this.value.valueBeforeDecodeView, e.value.valueBeforeDecodeView))
        return !1;
      return !0;
    }
    return !1;
  }
}
pn.CLASS_NAME = "AttributeTypeAndValue";
const Dn = "typesAndValues", Bc = "valueBeforeDecode", Uf = "RDN";
class re extends k {
  constructor(e = {}) {
    super(), this.typesAndValues = r(e, Dn, re.defaultValues(Dn)), this.valueBeforeDecode = r(e, Bc, re.defaultValues(Bc)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Dn:
        return [];
      case Bc:
        return be;
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Dn:
        return t.length === 0;
      case Bc:
        return t.byteLength === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.repeatedSequence || u,
          value: new pe({
            value: [
              new J({
                name: t.repeatedSet || u,
                value: pn.schema(t.typeAndValue || {})
              })
            ]
          })
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, [
      Uf,
      Dn
    ]);
    const t = N(e, e, re.schema({
      names: {
        blockName: Uf,
        repeatedSet: Dn
      }
    }));
    p.assertSchema(t, this.className), Dn in t.result && (this.typesAndValues = Array.from(t.result.typesAndValues, (s) => new pn({ schema: s }))), this.valueBeforeDecode = t.result.RDN.valueBeforeDecodeView.slice().buffer;
  }
  toSchema() {
    if (this.valueBeforeDecode.byteLength === 0)
      return new f({
        value: [new pe({
          value: Array.from(this.typesAndValues, (t) => t.toSchema())
        })]
      });
    const e = Oe(this.valueBeforeDecode);
    if (p.assert(e, "RelativeDistinguishedNames"), !(e.result instanceof f))
      throw new Error("ASN.1 result should be SEQUENCE");
    return e.result;
  }
  toJSON() {
    return {
      typesAndValues: Array.from(this.typesAndValues, (e) => e.toJSON())
    };
  }
  isEqual(e) {
    if (e instanceof re) {
      if (this.typesAndValues.length !== e.typesAndValues.length)
        return !1;
      for (const [t, s] of this.typesAndValues.entries())
        if (s.isEqual(e.typesAndValues[t]) === !1)
          return !1;
      return !0;
    }
    return e instanceof ArrayBuffer ? Ka(this.valueBeforeDecode, e) : !1;
  }
}
re.CLASS_NAME = "RelativeDistinguishedNames";
const fo = "type", mo = "value";
function Qg(o = {}, e = !1) {
  const t = r(o, "names", {});
  return new f({
    optional: e,
    value: [
      new w({
        optional: !0,
        idBlock: {
          tagClass: 2,
          tagNumber: 1
        },
        name: t.country_name || u,
        value: [
          new he({
            value: [
              new La(),
              new Ot()
            ]
          })
        ]
      }),
      new w({
        optional: !0,
        idBlock: {
          tagClass: 2,
          tagNumber: 2
        },
        name: t.administration_domain_name || u,
        value: [
          new he({
            value: [
              new La(),
              new Ot()
            ]
          })
        ]
      }),
      new M({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        name: t.network_address || u,
        isHexOnly: !0
      }),
      new M({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        name: t.terminal_identifier || u,
        isHexOnly: !0
      }),
      new w({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        },
        name: t.private_domain_name || u,
        value: [
          new he({
            value: [
              new La(),
              new Ot()
            ]
          })
        ]
      }),
      new M({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 3
        },
        name: t.organization_name || u,
        isHexOnly: !0
      }),
      new M({
        optional: !0,
        name: t.numeric_user_identifier || u,
        idBlock: {
          tagClass: 3,
          tagNumber: 4
        },
        isHexOnly: !0
      }),
      new w({
        optional: !0,
        name: t.personal_name || u,
        idBlock: {
          tagClass: 3,
          tagNumber: 5
        },
        value: [
          new M({
            idBlock: {
              tagClass: 3,
              tagNumber: 0
            },
            isHexOnly: !0
          }),
          new M({
            optional: !0,
            idBlock: {
              tagClass: 3,
              tagNumber: 1
            },
            isHexOnly: !0
          }),
          new M({
            optional: !0,
            idBlock: {
              tagClass: 3,
              tagNumber: 2
            },
            isHexOnly: !0
          }),
          new M({
            optional: !0,
            idBlock: {
              tagClass: 3,
              tagNumber: 3
            },
            isHexOnly: !0
          })
        ]
      }),
      new w({
        optional: !0,
        name: t.organizational_unit_names || u,
        idBlock: {
          tagClass: 3,
          tagNumber: 6
        },
        value: [
          new J({
            value: new Ot()
          })
        ]
      })
    ]
  });
}
function Xg(o = !1) {
  return new f({
    optional: o,
    value: [
      new Ot(),
      new Ot()
    ]
  });
}
function Zg(o = !1) {
  return new pe({
    optional: o,
    value: [
      new M({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        isHexOnly: !0
      }),
      new w({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [new K()]
      })
    ]
  });
}
class X extends k {
  constructor(e = {}) {
    super(), this.type = r(e, fo, X.defaultValues(fo)), this.value = r(e, mo, X.defaultValues(mo)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case fo:
        return 9;
      case mo:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case fo:
        return t === X.defaultValues(e);
      case mo:
        return Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new he({
      value: [
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          name: t.blockName || u,
          value: [
            new T(),
            new w({
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              },
              value: [new K()]
            })
          ]
        }),
        new M({
          name: t.blockName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        }),
        new M({
          name: t.blockName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          }
        }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 3
          },
          name: t.blockName || u,
          value: [
            Qg(t.builtInStandardAttributes || {}, !1),
            Xg(!0),
            Zg(!0)
          ]
        }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 4
          },
          name: t.blockName || u,
          value: [re.schema(t.directoryName || {})]
        }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 5
          },
          name: t.blockName || u,
          value: [
            new w({
              optional: !0,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              },
              value: [
                new he({
                  value: [
                    new wc(),
                    new Ot(),
                    new gc(),
                    new Dt(),
                    new mc()
                  ]
                })
              ]
            }),
            new w({
              idBlock: {
                tagClass: 3,
                tagNumber: 1
              },
              value: [
                new he({
                  value: [
                    new wc(),
                    new Ot(),
                    new gc(),
                    new Dt(),
                    new mc()
                  ]
                })
              ]
            })
          ]
        }),
        new M({
          name: t.blockName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 6
          }
        }),
        new M({
          name: t.blockName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 7
          }
        }),
        new M({
          name: t.blockName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 8
          }
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, [
      "blockName",
      "otherName",
      "rfc822Name",
      "dNSName",
      "x400Address",
      "directoryName",
      "ediPartyName",
      "uniformResourceIdentifier",
      "iPAddress",
      "registeredID"
    ]);
    const t = N(e, e, X.schema({
      names: {
        blockName: "blockName",
        otherName: "otherName",
        rfc822Name: "rfc822Name",
        dNSName: "dNSName",
        x400Address: "x400Address",
        directoryName: {
          names: {
            blockName: "directoryName"
          }
        },
        ediPartyName: "ediPartyName",
        uniformResourceIdentifier: "uniformResourceIdentifier",
        iPAddress: "iPAddress",
        registeredID: "registeredID"
      }
    }));
    switch (p.assertSchema(t, this.className), this.type = t.result.blockName.idBlock.tagNumber, this.type) {
      case 0:
        this.value = t.result.blockName;
        break;
      case 1:
      case 2:
      case 6:
        {
          const s = t.result.blockName;
          s.idBlock.tagClass = 1, s.idBlock.tagNumber = 22;
          const n = s.toBER(!1), i = Oe(n);
          p.assert(i, "GeneralName value"), this.value = i.result.valueBlock.value;
        }
        break;
      case 3:
        this.value = t.result.blockName;
        break;
      case 4:
        this.value = new re({ schema: t.result.directoryName });
        break;
      case 5:
        this.value = t.result.ediPartyName;
        break;
      case 7:
        this.value = new I({ valueHex: t.result.blockName.valueBlock.valueHex });
        break;
      case 8:
        {
          const s = t.result.blockName;
          s.idBlock.tagClass = 1, s.idBlock.tagNumber = 6;
          const n = s.toBER(!1), i = Oe(n);
          p.assert(i, "GeneralName registeredID"), this.value = i.result.valueBlock.toString();
        }
        break;
    }
  }
  toSchema() {
    switch (this.type) {
      case 0:
      case 3:
      case 5:
        return new w({
          idBlock: {
            tagClass: 3,
            tagNumber: this.type
          },
          value: [
            this.value
          ]
        });
      case 1:
      case 2:
      case 6: {
        const e = new ju({ value: this.value });
        return e.idBlock.tagClass = 3, e.idBlock.tagNumber = this.type, e;
      }
      case 4:
        return new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 4
          },
          value: [this.value.toSchema()]
        });
      case 7: {
        const e = this.value;
        return e.idBlock.tagClass = 3, e.idBlock.tagNumber = this.type, e;
      }
      case 8: {
        const e = new T({ value: this.value });
        return e.idBlock.tagClass = 3, e.idBlock.tagNumber = this.type, e;
      }
      default:
        return X.schema();
    }
  }
  toJSON() {
    const e = {
      type: this.type,
      value: u
    };
    if (typeof this.value == "string")
      e.value = this.value;
    else
      try {
        e.value = this.value.toJSON();
      } catch {
      }
    return e;
  }
}
X.CLASS_NAME = "GeneralName";
const go = "accessMethod", wo = "accessLocation", zg = [
  go,
  wo
];
class ji extends k {
  constructor(e = {}) {
    super(), this.accessMethod = r(e, go, ji.defaultValues(go)), this.accessLocation = r(e, wo, ji.defaultValues(wo)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case go:
        return u;
      case wo:
        return new X();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.accessMethod || u }),
        X.schema(t.accessLocation || {})
      ]
    });
  }
  fromSchema(e) {
    C(e, zg);
    const t = N(e, e, ji.schema({
      names: {
        accessMethod: go,
        accessLocation: {
          names: {
            blockName: wo
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.accessMethod = t.result.accessMethod.valueBlock.toString(), this.accessLocation = new X({ schema: t.result.accessLocation });
  }
  toSchema() {
    return new f({
      value: [
        new T({ value: this.accessMethod }),
        this.accessLocation.toSchema()
      ]
    });
  }
  toJSON() {
    return {
      accessMethod: this.accessMethod,
      accessLocation: this.accessLocation.toJSON()
    };
  }
}
ji.CLASS_NAME = "AccessDescription";
const Os = "seconds", Rs = "millis", Ts = "micros";
class lt extends k {
  constructor(e = {}) {
    super(), Os in e && (this.seconds = r(e, Os, lt.defaultValues(Os))), Rs in e && (this.millis = r(e, Rs, lt.defaultValues(Rs))), Ts in e && (this.micros = r(e, Ts, lt.defaultValues(Ts))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Os:
      case Rs:
      case Ts:
        return 0;
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Os:
      case Rs:
      case Ts:
        return t === lt.defaultValues(e);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      optional: !0,
      value: [
        new S({
          optional: !0,
          name: t.seconds || u
        }),
        new M({
          name: t.millis || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          }
        }),
        new M({
          name: t.micros || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, [
      Os,
      Rs,
      Ts
    ]);
    const t = N(e, e, lt.schema({
      names: {
        seconds: Os,
        millis: Rs,
        micros: Ts
      }
    }));
    if (p.assertSchema(t, this.className), "seconds" in t.result && (this.seconds = t.result.seconds.valueBlock.valueDec), "millis" in t.result) {
      const s = new S({ valueHex: t.result.millis.valueBlock.valueHex });
      this.millis = s.valueBlock.valueDec;
    }
    if ("micros" in t.result) {
      const s = new S({ valueHex: t.result.micros.valueBlock.valueHex });
      this.micros = s.valueBlock.valueDec;
    }
  }
  toSchema() {
    const e = [];
    if (this.seconds !== void 0 && e.push(new S({ value: this.seconds })), this.millis !== void 0) {
      const t = new S({ value: this.millis });
      e.push(new M({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        valueHex: t.valueBlock.valueHexView
      }));
    }
    if (this.micros !== void 0) {
      const t = new S({ value: this.micros });
      e.push(new M({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        valueHex: t.valueBlock.valueHexView
      }));
    }
    return new f({
      value: e
    });
  }
  toJSON() {
    const e = {};
    return this.seconds !== void 0 && (e.seconds = this.seconds), this.millis !== void 0 && (e.millis = this.millis), this.micros !== void 0 && (e.micros = this.micros), e;
  }
}
lt.CLASS_NAME = "Accuracy";
const Ic = "algorithmId", eo = "algorithmParams", Sm = "algorithm", Dh = "params", ew = [
  Sm,
  Dh
];
class v extends k {
  constructor(e = {}) {
    super(), this.algorithmId = r(e, Ic, v.defaultValues(Ic)), eo in e && (this.algorithmParams = r(e, eo, v.defaultValues(eo))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ic:
        return u;
      case eo:
        return new K();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Ic:
        return t === u;
      case eo:
        return t instanceof K;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      optional: t.optional || !1,
      value: [
        new T({ name: t.algorithmIdentifier || u }),
        new K({ name: t.algorithmParams || u, optional: !0 })
      ]
    });
  }
  fromSchema(e) {
    C(e, ew);
    const t = N(e, e, v.schema({
      names: {
        algorithmIdentifier: Sm,
        algorithmParams: Dh
      }
    }));
    p.assertSchema(t, this.className), this.algorithmId = t.result.algorithm.valueBlock.toString(), Dh in t.result && (this.algorithmParams = t.result.params);
  }
  toSchema() {
    const e = [];
    return e.push(new T({ value: this.algorithmId })), this.algorithmParams && !(this.algorithmParams instanceof K) && e.push(this.algorithmParams), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      algorithmId: this.algorithmId
    };
    return this.algorithmParams && !(this.algorithmParams instanceof K) && (e.algorithmParams = this.algorithmParams.toJSON()), e;
  }
  isEqual(e) {
    return !(e instanceof v) || this.algorithmId !== e.algorithmId ? !1 : this.algorithmParams ? e.algorithmParams ? JSON.stringify(this.algorithmParams) === JSON.stringify(e.algorithmParams) : !1 : !e.algorithmParams;
  }
}
v.CLASS_NAME = "AlgorithmIdentifier";
const dr = "altNames", tw = [
  dr
];
class Fa extends k {
  constructor(e = {}) {
    super(), this.altNames = r(e, dr, Fa.defaultValues(dr)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case dr:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.altNames || u,
          value: X.schema()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, tw);
    const t = N(e, e, Fa.schema({
      names: {
        altNames: dr
      }
    }));
    p.assertSchema(t, this.className), dr in t.result && (this.altNames = Array.from(t.result.altNames, (s) => new X({ schema: s })));
  }
  toSchema() {
    return new f({
      value: Array.from(this.altNames, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      altNames: Array.from(this.altNames, (e) => e.toJSON())
    };
  }
}
Fa.CLASS_NAME = "AltName";
const mr = "type", gr = "values", sw = [
  mr,
  gr
];
class le extends k {
  constructor(e = {}) {
    super(), this.type = r(e, mr, le.defaultValues(mr)), this.values = r(e, gr, le.defaultValues(gr)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case mr:
        return u;
      case gr:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case mr:
        return t === u;
      case gr:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.type || u }),
        new pe({
          name: t.setName || u,
          value: [
            new J({
              name: t.values || u,
              value: new K()
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, sw);
    const t = N(e, e, le.schema({
      names: {
        type: mr,
        values: gr
      }
    }));
    p.assertSchema(t, this.className), this.type = t.result.type.valueBlock.toString(), this.values = t.result.values;
  }
  toSchema() {
    return new f({
      value: [
        new T({ value: this.type }),
        new pe({
          value: this.values
        })
      ]
    });
  }
  toJSON() {
    return {
      type: this.type,
      values: Array.from(this.values, (e) => e.toJSON())
    };
  }
}
le.CLASS_NAME = "Attribute";
const yo = "notBeforeTime", vo = "notAfterTime", nw = [
  yo,
  vo
];
class Rt extends k {
  constructor(e = {}) {
    super(), this.notBeforeTime = r(e, yo, Rt.defaultValues(yo)), this.notAfterTime = r(e, vo, Rt.defaultValues(vo)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case yo:
      case vo:
        return new Date(0, 0, 0);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new ue({ name: t.notBeforeTime || u }),
        new ue({ name: t.notAfterTime || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, nw);
    const t = N(e, e, Rt.schema({
      names: {
        notBeforeTime: yo,
        notAfterTime: vo
      }
    }));
    p.assertSchema(t, this.className), this.notBeforeTime = t.result.notBeforeTime.toDate(), this.notAfterTime = t.result.notAfterTime.toDate();
  }
  toSchema() {
    return new f({
      value: [
        new ue({ valueDate: this.notBeforeTime }),
        new ue({ valueDate: this.notAfterTime })
      ]
    });
  }
  toJSON() {
    return {
      notBeforeTime: this.notBeforeTime,
      notAfterTime: this.notAfterTime
    };
  }
}
Rt.CLASS_NAME = "AttCertValidityPeriod";
const to = "names", Hf = "generalNames";
class xe extends k {
  constructor(e = {}) {
    super(), this.names = r(e, to, xe.defaultValues(to)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case "names":
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}, t = !1) {
    const s = r(e, to, {});
    return new f({
      optional: t,
      name: s.blockName || u,
      value: [
        new J({
          name: s.generalNames || u,
          value: X.schema()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, [
      to,
      Hf
    ]);
    const t = N(e, e, xe.schema({
      names: {
        blockName: to,
        generalNames: Hf
      }
    }));
    p.assertSchema(t, this.className), this.names = Array.from(t.result.generalNames, (s) => new X({ schema: s }));
  }
  toSchema() {
    return new f({
      value: Array.from(this.names, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      names: Array.from(this.names, (e) => e.toJSON())
    };
  }
}
xe.CLASS_NAME = "GeneralNames";
const iw = "2.5.29.9", rw = "2.5.29.14", aw = "2.5.29.15", ow = "2.5.29.16", Am = "2.5.29.17", pm = "2.5.29.18", wf = "2.5.29.19", lw = "2.5.29.20", cw = "2.5.29.27", uw = "2.5.29.21", hw = "2.5.29.24", bm = "2.5.29.28", km = "2.5.29.29", Em = "2.5.29.30", Nm = "2.5.29.31", yf = "2.5.29.46", Cm = "2.5.29.32", gt = "2.5.29.32.0", fw = "1.3.6.1.4.1.311.21.10", Bm = "2.5.29.33", vf = "2.5.29.35", Im = "2.5.29.36", dw = "2.5.29.37", mw = "2.5.29.54", Sf = "1.3.6.1.5.5.7.1.1", gw = "1.3.6.1.5.5.7.1.11", ww = "1.3.6.1.4.1.11129.2.4.2", yw = "1.3.6.1.4.1.311.21.7", vw = "1.3.6.1.4.1.311.21.1", Sw = "1.3.6.1.5.5.7.1.3", Af = "1.2.840.113549.1.7.1", Vm = "1.2.840.113549.1.7.2", xm = "1.2.840.113549.1.7.3", Om = "1.2.840.113549.1.7.6", Aw = "1.2.840.113549.1.9.16.1.4", Mf = "1.2.840.113549.1.9.22.1", pw = "1.2.840.113549.1.9.22.2", _f = "1.2.840.113549.1.9.22.3", $f = "1.2.840.113549.1.9.23.1", bw = "1.3.6.1.5.5.7", kw = `${bw}.48`, zc = `${kw}.1.1`, Hn = "keyIdentifier", Mn = "authorityCertIssuer", _n = "authorityCertSerialNumber", Ew = [
  Hn,
  Mn,
  _n
];
class bn extends k {
  constructor(e = {}) {
    super(), Hn in e && (this.keyIdentifier = r(e, Hn, bn.defaultValues(Hn))), Mn in e && (this.authorityCertIssuer = r(e, Mn, bn.defaultValues(Mn))), _n in e && (this.authorityCertSerialNumber = r(e, _n, bn.defaultValues(_n))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Hn:
        return new I();
      case Mn:
        return [];
      case _n:
        return new S();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new M({
          name: t.keyIdentifier || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          }
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new J({
              name: t.authorityCertIssuer || u,
              value: X.schema()
            })
          ]
        }),
        new M({
          name: t.authorityCertSerialNumber || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          }
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Ew);
    const t = N(e, e, bn.schema({
      names: {
        keyIdentifier: Hn,
        authorityCertIssuer: Mn,
        authorityCertSerialNumber: _n
      }
    }));
    p.assertSchema(t, this.className), Hn in t.result && (this.keyIdentifier = new I({ valueHex: t.result.keyIdentifier.valueBlock.valueHex })), Mn in t.result && (this.authorityCertIssuer = Array.from(t.result.authorityCertIssuer, (s) => new X({ schema: s }))), _n in t.result && (this.authorityCertSerialNumber = new S({ valueHex: t.result.authorityCertSerialNumber.valueBlock.valueHex }));
  }
  toSchema() {
    const e = [];
    return this.keyIdentifier && e.push(new M({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      valueHex: this.keyIdentifier.valueBlock.valueHexView
    })), this.authorityCertIssuer && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: Array.from(this.authorityCertIssuer, (t) => t.toSchema())
    })), this.authorityCertSerialNumber && e.push(new M({
      idBlock: {
        tagClass: 3,
        tagNumber: 2
      },
      valueHex: this.authorityCertSerialNumber.valueBlock.valueHexView
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {};
    return this.keyIdentifier && (e.keyIdentifier = this.keyIdentifier.toJSON()), this.authorityCertIssuer && (e.authorityCertIssuer = Array.from(this.authorityCertIssuer, (t) => t.toJSON())), this.authorityCertSerialNumber && (e.authorityCertSerialNumber = this.authorityCertSerialNumber.toJSON()), e;
  }
}
bn.CLASS_NAME = "AuthorityKeyIdentifier";
const Pn = "pathLenConstraint", Ln = "cA";
class Fi extends k {
  constructor(e = {}) {
    super(), this.cA = r(e, Ln, !1), Pn in e && (this.pathLenConstraint = r(e, Pn, 0)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ln:
        return !1;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new Ft({
          optional: !0,
          name: t.cA || u
        }),
        new S({
          optional: !0,
          name: t.pathLenConstraint || u
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, [
      Ln,
      Pn
    ]);
    const t = N(e, e, Fi.schema({
      names: {
        cA: Ln,
        pathLenConstraint: Pn
      }
    }));
    p.assertSchema(t, this.className), Ln in t.result && (this.cA = t.result.cA.valueBlock.value), Pn in t.result && (t.result.pathLenConstraint.valueBlock.isHexOnly ? this.pathLenConstraint = t.result.pathLenConstraint : this.pathLenConstraint = t.result.pathLenConstraint.valueBlock.valueDec);
  }
  toSchema() {
    const e = [];
    return this.cA !== Fi.defaultValues(Ln) && e.push(new Ft({ value: this.cA })), Pn in this && (this.pathLenConstraint instanceof S ? e.push(this.pathLenConstraint) : e.push(new S({ value: this.pathLenConstraint }))), new f({
      value: e
    });
  }
  toJSON() {
    const e = {};
    return this.cA !== Fi.defaultValues(Ln) && (e.cA = this.cA), Pn in this && (this.pathLenConstraint instanceof S ? e.pathLenConstraint = this.pathLenConstraint.toJSON() : e.pathLenConstraint = this.pathLenConstraint), e;
  }
}
Fi.CLASS_NAME = "BasicConstraints";
const th = "certificateIndex", sh = "keyIndex";
class yc extends k {
  constructor(e = {}) {
    super(), this.certificateIndex = r(e, th, yc.defaultValues(th)), this.keyIndex = r(e, sh, yc.defaultValues(sh)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case th:
      case sh:
        return 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema() {
    return new S();
  }
  fromSchema(e) {
    if (e.constructor.blockName() !== S.blockName())
      throw new Error("Object's schema was not verified against input data for CAVersion");
    let t = e.valueBlock.valueHex.slice(0);
    const s = new Uint8Array(t);
    switch (!0) {
      case t.byteLength < 4:
        {
          const g = new ArrayBuffer(4);
          new Uint8Array(g).set(s, 4 - t.byteLength), t = g.slice(0);
        }
        break;
      case t.byteLength > 4:
        {
          const g = new ArrayBuffer(4);
          new Uint8Array(g).set(s.slice(0, 4)), t = g.slice(0);
        }
        break;
    }
    const n = t.slice(0, 2), i = new Uint8Array(n);
    let a = i[0];
    i[0] = i[1], i[1] = a;
    const l = new Uint16Array(n);
    this.keyIndex = l[0];
    const c = t.slice(2), h = new Uint8Array(c);
    a = h[0], h[0] = h[1], h[1] = a;
    const m = new Uint16Array(c);
    this.certificateIndex = m[0];
  }
  toSchema() {
    const e = new ArrayBuffer(2), t = new Uint16Array(e);
    t[0] = this.certificateIndex;
    const s = new Uint8Array(e);
    let n = s[0];
    s[0] = s[1], s[1] = n;
    const i = new ArrayBuffer(2), a = new Uint16Array(i);
    a[0] = this.keyIndex;
    const l = new Uint8Array(i);
    return n = l[0], l[0] = l[1], l[1] = n, new S({
      valueHex: Pa(i, e)
    });
  }
  toJSON() {
    return {
      certificateIndex: this.certificateIndex,
      keyIndex: this.keyIndex
    };
  }
}
yc.CLASS_NAME = "CAVersion";
const So = "policyQualifierId", Ao = "qualifier", Nw = [
  So,
  Ao
];
class qi extends k {
  constructor(e = {}) {
    super(), this.policyQualifierId = r(e, So, qi.defaultValues(So)), this.qualifier = r(e, Ao, qi.defaultValues(Ao)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case So:
        return u;
      case Ao:
        return new K();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.policyQualifierId || u }),
        new K({ name: t.qualifier || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, Nw);
    const t = N(e, e, qi.schema({
      names: {
        policyQualifierId: So,
        qualifier: Ao
      }
    }));
    p.assertSchema(t, this.className), this.policyQualifierId = t.result.policyQualifierId.valueBlock.toString(), this.qualifier = t.result.qualifier;
  }
  toSchema() {
    return new f({
      value: [
        new T({ value: this.policyQualifierId }),
        this.qualifier
      ]
    });
  }
  toJSON() {
    return {
      policyQualifierId: this.policyQualifierId,
      qualifier: this.qualifier.toJSON()
    };
  }
}
qi.CLASS_NAME = "PolicyQualifierInfo";
const po = "policyIdentifier", $n = "policyQualifiers", Cw = [
  po,
  $n
];
class Wi extends k {
  constructor(e = {}) {
    super(), this.policyIdentifier = r(e, po, Wi.defaultValues(po)), $n in e && (this.policyQualifiers = r(e, $n, Wi.defaultValues($n))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case po:
        return u;
      case $n:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.policyIdentifier || u }),
        new f({
          optional: !0,
          value: [
            new J({
              name: t.policyQualifiers || u,
              value: qi.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Cw);
    const t = N(e, e, Wi.schema({
      names: {
        policyIdentifier: po,
        policyQualifiers: $n
      }
    }));
    p.assertSchema(t, this.className), this.policyIdentifier = t.result.policyIdentifier.valueBlock.toString(), $n in t.result && (this.policyQualifiers = Array.from(t.result.policyQualifiers, (s) => new qi({ schema: s })));
  }
  toSchema() {
    const e = [];
    return e.push(new T({ value: this.policyIdentifier })), this.policyQualifiers && e.push(new f({
      value: Array.from(this.policyQualifiers, (t) => t.toSchema())
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      policyIdentifier: this.policyIdentifier
    };
    return this.policyQualifiers && (e.policyQualifiers = Array.from(this.policyQualifiers, (t) => t.toJSON())), e;
  }
}
Wi.CLASS_NAME = "PolicyInformation";
const bo = "certificatePolicies", Bw = [
  bo
];
class qa extends k {
  constructor(e = {}) {
    super(), this.certificatePolicies = r(e, bo, qa.defaultValues(bo)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case bo:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.certificatePolicies || u,
          value: Wi.schema()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Bw);
    const t = N(e, e, qa.schema({
      names: {
        certificatePolicies: bo
      }
    }));
    p.assertSchema(t, this.className), this.certificatePolicies = Array.from(t.result.certificatePolicies, (s) => new Wi({ schema: s }));
  }
  toSchema() {
    return new f({
      value: Array.from(this.certificatePolicies, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      certificatePolicies: Array.from(this.certificatePolicies, (e) => e.toJSON())
    };
  }
}
qa.CLASS_NAME = "CertificatePolicies";
const ko = "templateID", Qt = "templateMajorVersion", Xt = "templateMinorVersion", Iw = [
  ko,
  Qt,
  Xt
];
class Ta extends k {
  constructor(e = {}) {
    super(), this.templateID = r(e, ko, Ta.defaultValues(ko)), Qt in e && (this.templateMajorVersion = r(e, Qt, Ta.defaultValues(Qt))), Xt in e && (this.templateMinorVersion = r(e, Xt, Ta.defaultValues(Xt))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case ko:
        return u;
      case Qt:
      case Xt:
        return 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.templateID || u }),
        new S({
          name: t.templateMajorVersion || u,
          optional: !0
        }),
        new S({
          name: t.templateMinorVersion || u,
          optional: !0
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Iw);
    const t = N(e, e, Ta.schema({
      names: {
        templateID: ko,
        templateMajorVersion: Qt,
        templateMinorVersion: Xt
      }
    }));
    p.assertSchema(t, this.className), this.templateID = t.result.templateID.valueBlock.toString(), Qt in t.result && (this.templateMajorVersion = t.result.templateMajorVersion.valueBlock.valueDec), Xt in t.result && (this.templateMinorVersion = t.result.templateMinorVersion.valueBlock.valueDec);
  }
  toSchema() {
    const e = [];
    return e.push(new T({ value: this.templateID })), Qt in this && e.push(new S({ value: this.templateMajorVersion })), Xt in this && e.push(new S({ value: this.templateMinorVersion })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      templateID: this.templateID
    };
    return Qt in this && (e.templateMajorVersion = this.templateMajorVersion), Xt in this && (e.templateMinorVersion = this.templateMinorVersion), e;
  }
}
const Kn = "distributionPoint", Rm = "distributionPointNames", Jn = "reasons", jn = "cRLIssuer", Tm = "cRLIssuerNames", Vw = [
  Kn,
  Rm,
  Jn,
  jn,
  Tm
];
class kn extends k {
  constructor(e = {}) {
    super(), Kn in e && (this.distributionPoint = r(e, Kn, kn.defaultValues(Kn))), Jn in e && (this.reasons = r(e, Jn, kn.defaultValues(Jn))), jn in e && (this.cRLIssuer = r(e, jn, kn.defaultValues(jn))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Kn:
        return [];
      case Jn:
        return new G();
      case jn:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new he({
              value: [
                new w({
                  name: t.distributionPoint || u,
                  optional: !0,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 0
                  },
                  value: [
                    new J({
                      name: t.distributionPointNames || u,
                      value: X.schema()
                    })
                  ]
                }),
                new w({
                  name: t.distributionPoint || u,
                  optional: !0,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 1
                  },
                  value: re.schema().valueBlock.value
                })
              ]
            })
          ]
        }),
        new M({
          name: t.reasons || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        }),
        new w({
          name: t.cRLIssuer || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: [
            new J({
              name: t.cRLIssuerNames || u,
              value: X.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Vw);
    const t = N(e, e, kn.schema({
      names: {
        distributionPoint: Kn,
        distributionPointNames: Rm,
        reasons: Jn,
        cRLIssuer: jn,
        cRLIssuerNames: Tm
      }
    }));
    p.assertSchema(t, this.className), Kn in t.result && (t.result.distributionPoint.idBlock.tagNumber === 0 && (this.distributionPoint = Array.from(t.result.distributionPointNames, (s) => new X({ schema: s }))), t.result.distributionPoint.idBlock.tagNumber === 1 && (this.distributionPoint = new re({
      schema: new f({
        value: t.result.distributionPoint.valueBlock.value
      })
    }))), Jn in t.result && (this.reasons = new G({ valueHex: t.result.reasons.valueBlock.valueHex })), jn in t.result && (this.cRLIssuer = Array.from(t.result.cRLIssuerNames, (s) => new X({ schema: s })));
  }
  toSchema() {
    const e = [];
    if (this.distributionPoint) {
      let t;
      this.distributionPoint instanceof Array ? t = new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: Array.from(this.distributionPoint, (s) => s.toSchema())
      }) : t = new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [this.distributionPoint.toSchema()]
      }), e.push(new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [t]
      }));
    }
    return this.reasons && e.push(new M({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      valueHex: this.reasons.valueBlock.valueHexView
    })), this.cRLIssuer && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 2
      },
      value: Array.from(this.cRLIssuer, (t) => t.toSchema())
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {};
    return this.distributionPoint && (this.distributionPoint instanceof Array ? e.distributionPoint = Array.from(this.distributionPoint, (t) => t.toJSON()) : e.distributionPoint = this.distributionPoint.toJSON()), this.reasons && (e.reasons = this.reasons.toJSON()), this.cRLIssuer && (e.cRLIssuer = Array.from(this.cRLIssuer, (t) => t.toJSON())), e;
  }
}
kn.CLASS_NAME = "DistributionPoint";
const Eo = "distributionPoints", xw = [
  Eo
];
class Wa extends k {
  constructor(e = {}) {
    super(), this.distributionPoints = r(e, Eo, Wa.defaultValues(Eo)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Eo:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.distributionPoints || u,
          value: kn.schema()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, xw);
    const t = N(e, e, Wa.schema({
      names: {
        distributionPoints: Eo
      }
    }));
    p.assertSchema(t, this.className), this.distributionPoints = Array.from(t.result.distributionPoints, (s) => new kn({ schema: s }));
  }
  toSchema() {
    return new f({
      value: Array.from(this.distributionPoints, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      distributionPoints: Array.from(this.distributionPoints, (e) => e.toJSON())
    };
  }
}
Wa.CLASS_NAME = "CRLDistributionPoints";
const No = "keyPurposes", Ow = [
  No
];
class vc extends k {
  constructor(e = {}) {
    super(), this.keyPurposes = r(e, No, vc.defaultValues(No)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case No:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.keyPurposes || u,
          value: new T()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Ow);
    const t = N(e, e, vc.schema({
      names: {
        keyPurposes: No
      }
    }));
    p.assertSchema(t, this.className), this.keyPurposes = Array.from(t.result.keyPurposes, (s) => s.valueBlock.toString());
  }
  toSchema() {
    return new f({
      value: Array.from(this.keyPurposes, (e) => new T({ value: e }))
    });
  }
  toJSON() {
    return {
      keyPurposes: Array.from(this.keyPurposes)
    };
  }
}
vc.CLASS_NAME = "ExtKeyUsage";
const so = "accessDescriptions";
class Ga extends k {
  constructor(e = {}) {
    super(), this.accessDescriptions = r(e, so, Ga.defaultValues(so)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case so:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.accessDescriptions || u,
          value: ji.schema()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, [
      so
    ]);
    const t = N(e, e, Ga.schema({
      names: {
        accessDescriptions: so
      }
    }));
    p.assertSchema(t, this.className), this.accessDescriptions = Array.from(t.result.accessDescriptions, (s) => new ji({ schema: s }));
  }
  toSchema() {
    return new f({
      value: Array.from(this.accessDescriptions, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      accessDescriptions: Array.from(this.accessDescriptions, (e) => e.toJSON())
    };
  }
}
Ga.CLASS_NAME = "InfoAccess";
const Fn = "distributionPoint", Dm = "distributionPointNames", Ds = "onlyContainsUserCerts", Ps = "onlyContainsCACerts", Ls = "onlySomeReasons", Us = "indirectCRL", Hs = "onlyContainsAttributeCerts", Rw = [
  Fn,
  Dm,
  Ds,
  Ps,
  Ls,
  Us,
  Hs
];
class De extends k {
  constructor(e = {}) {
    super(), Fn in e && (this.distributionPoint = r(e, Fn, De.defaultValues(Fn))), this.onlyContainsUserCerts = r(e, Ds, De.defaultValues(Ds)), this.onlyContainsCACerts = r(e, Ps, De.defaultValues(Ps)), Ls in e && (this.onlySomeReasons = r(e, Ls, De.defaultValues(Ls))), this.indirectCRL = r(e, Us, De.defaultValues(Us)), this.onlyContainsAttributeCerts = r(e, Hs, De.defaultValues(Hs)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Fn:
        return [];
      case Ds:
        return !1;
      case Ps:
        return !1;
      case Ls:
        return 0;
      case Us:
        return !1;
      case Hs:
        return !1;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new he({
              value: [
                new w({
                  name: t.distributionPoint || u,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 0
                  },
                  value: [
                    new J({
                      name: t.distributionPointNames || u,
                      value: X.schema()
                    })
                  ]
                }),
                new w({
                  name: t.distributionPoint || u,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 1
                  },
                  value: re.schema().valueBlock.value
                })
              ]
            })
          ]
        }),
        new M({
          name: t.onlyContainsUserCerts || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        }),
        new M({
          name: t.onlyContainsCACerts || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          }
        }),
        new M({
          name: t.onlySomeReasons || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 3
          }
        }),
        new M({
          name: t.indirectCRL || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 4
          }
        }),
        new M({
          name: t.onlyContainsAttributeCerts || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 5
          }
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Rw);
    const t = N(e, e, De.schema({
      names: {
        distributionPoint: Fn,
        distributionPointNames: Dm,
        onlyContainsUserCerts: Ds,
        onlyContainsCACerts: Ps,
        onlySomeReasons: Ls,
        indirectCRL: Us,
        onlyContainsAttributeCerts: Hs
      }
    }));
    if (p.assertSchema(t, this.className), Fn in t.result)
      switch (!0) {
        case t.result.distributionPoint.idBlock.tagNumber === 0:
          this.distributionPoint = Array.from(t.result.distributionPointNames, (s) => new X({ schema: s }));
          break;
        case t.result.distributionPoint.idBlock.tagNumber === 1:
          this.distributionPoint = new re({
            schema: new f({
              value: t.result.distributionPoint.valueBlock.value
            })
          });
          break;
        default:
          throw new Error("Unknown tagNumber for distributionPoint: {$asn1.result.distributionPoint.idBlock.tagNumber}");
      }
    if (Ds in t.result) {
      const s = new Uint8Array(t.result.onlyContainsUserCerts.valueBlock.valueHex);
      this.onlyContainsUserCerts = s[0] !== 0;
    }
    if (Ps in t.result) {
      const s = new Uint8Array(t.result.onlyContainsCACerts.valueBlock.valueHex);
      this.onlyContainsCACerts = s[0] !== 0;
    }
    if (Ls in t.result) {
      const s = new Uint8Array(t.result.onlySomeReasons.valueBlock.valueHex);
      this.onlySomeReasons = s[0];
    }
    if (Us in t.result) {
      const s = new Uint8Array(t.result.indirectCRL.valueBlock.valueHex);
      this.indirectCRL = s[0] !== 0;
    }
    if (Hs in t.result) {
      const s = new Uint8Array(t.result.onlyContainsAttributeCerts.valueBlock.valueHex);
      this.onlyContainsAttributeCerts = s[0] !== 0;
    }
  }
  toSchema() {
    const e = [];
    if (this.distributionPoint) {
      let t;
      this.distributionPoint instanceof Array ? t = new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: Array.from(this.distributionPoint, (s) => s.toSchema())
      }) : (t = this.distributionPoint.toSchema(), t.idBlock.tagClass = 3, t.idBlock.tagNumber = 1), e.push(new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [t]
      }));
    }
    if (this.onlyContainsUserCerts !== De.defaultValues(Ds) && e.push(new M({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      valueHex: new Uint8Array([255]).buffer
    })), this.onlyContainsCACerts !== De.defaultValues(Ps) && e.push(new M({
      idBlock: {
        tagClass: 3,
        tagNumber: 2
      },
      valueHex: new Uint8Array([255]).buffer
    })), this.onlySomeReasons !== void 0) {
      const t = new ArrayBuffer(1), s = new Uint8Array(t);
      s[0] = this.onlySomeReasons, e.push(new M({
        idBlock: {
          tagClass: 3,
          tagNumber: 3
        },
        valueHex: t
      }));
    }
    return this.indirectCRL !== De.defaultValues(Us) && e.push(new M({
      idBlock: {
        tagClass: 3,
        tagNumber: 4
      },
      valueHex: new Uint8Array([255]).buffer
    })), this.onlyContainsAttributeCerts !== De.defaultValues(Hs) && e.push(new M({
      idBlock: {
        tagClass: 3,
        tagNumber: 5
      },
      valueHex: new Uint8Array([255]).buffer
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {};
    return this.distributionPoint && (this.distributionPoint instanceof Array ? e.distributionPoint = Array.from(this.distributionPoint, (t) => t.toJSON()) : e.distributionPoint = this.distributionPoint.toJSON()), this.onlyContainsUserCerts !== De.defaultValues(Ds) && (e.onlyContainsUserCerts = this.onlyContainsUserCerts), this.onlyContainsCACerts !== De.defaultValues(Ps) && (e.onlyContainsCACerts = this.onlyContainsCACerts), Ls in this && (e.onlySomeReasons = this.onlySomeReasons), this.indirectCRL !== De.defaultValues(Us) && (e.indirectCRL = this.indirectCRL), this.onlyContainsAttributeCerts !== De.defaultValues(Hs) && (e.onlyContainsAttributeCerts = this.onlyContainsAttributeCerts), e;
  }
}
De.CLASS_NAME = "IssuingDistributionPoint";
const Co = "base", wr = "minimum", Ms = "maximum", Tw = [
  Co,
  wr,
  Ms
];
class $t extends k {
  constructor(e = {}) {
    super(), this.base = r(e, Co, $t.defaultValues(Co)), this.minimum = r(e, wr, $t.defaultValues(wr)), Ms in e && (this.maximum = r(e, Ms, $t.defaultValues(Ms))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Co:
        return new X();
      case wr:
        return 0;
      case Ms:
        return 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        X.schema(t.base || {}),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new S({ name: t.minimum || u })]
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [new S({ name: t.maximum || u })]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Tw);
    const t = N(e, e, $t.schema({
      names: {
        base: {
          names: {
            blockName: Co
          }
        },
        minimum: wr,
        maximum: Ms
      }
    }));
    p.assertSchema(t, this.className), this.base = new X({ schema: t.result.base }), wr in t.result && (t.result.minimum.valueBlock.isHexOnly ? this.minimum = t.result.minimum : this.minimum = t.result.minimum.valueBlock.valueDec), Ms in t.result && (t.result.maximum.valueBlock.isHexOnly ? this.maximum = t.result.maximum : this.maximum = t.result.maximum.valueBlock.valueDec);
  }
  toSchema() {
    const e = [];
    if (e.push(this.base.toSchema()), this.minimum !== 0) {
      let t = 0;
      this.minimum instanceof S ? t = this.minimum : t = new S({ value: this.minimum }), e.push(new w({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [t]
      }));
    }
    if (Ms in this) {
      let t = 0;
      this.maximum instanceof S ? t = this.maximum : t = new S({ value: this.maximum }), e.push(new w({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [t]
      }));
    }
    return new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      base: this.base.toJSON()
    };
    return this.minimum !== 0 && (typeof this.minimum == "number" ? e.minimum = this.minimum : e.minimum = this.minimum.toJSON()), this.maximum !== void 0 && (typeof this.maximum == "number" ? e.maximum = this.maximum : e.maximum = this.maximum.toJSON()), e;
  }
}
$t.CLASS_NAME = "GeneralSubtree";
const qn = "permittedSubtrees", Wn = "excludedSubtrees", Dw = [
  qn,
  Wn
];
class Ua extends k {
  constructor(e = {}) {
    super(), qn in e && (this.permittedSubtrees = r(e, qn, Ua.defaultValues(qn))), Wn in e && (this.excludedSubtrees = r(e, Wn, Ua.defaultValues(Wn))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case qn:
      case Wn:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new J({
              name: t.permittedSubtrees || u,
              value: $t.schema()
            })
          ]
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new J({
              name: t.excludedSubtrees || u,
              value: $t.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Dw);
    const t = N(e, e, Ua.schema({
      names: {
        permittedSubtrees: qn,
        excludedSubtrees: Wn
      }
    }));
    p.assertSchema(t, this.className), qn in t.result && (this.permittedSubtrees = Array.from(t.result.permittedSubtrees, (s) => new $t({ schema: s }))), Wn in t.result && (this.excludedSubtrees = Array.from(t.result.excludedSubtrees, (s) => new $t({ schema: s })));
  }
  toSchema() {
    const e = [];
    return this.permittedSubtrees && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: Array.from(this.permittedSubtrees, (t) => t.toSchema())
    })), this.excludedSubtrees && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: Array.from(this.excludedSubtrees, (t) => t.toSchema())
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {};
    return this.permittedSubtrees && (e.permittedSubtrees = Array.from(this.permittedSubtrees, (t) => t.toJSON())), this.excludedSubtrees && (e.excludedSubtrees = Array.from(this.excludedSubtrees, (t) => t.toJSON())), e;
  }
}
Ua.CLASS_NAME = "NameConstraints";
const Zt = "requireExplicitPolicy", zt = "inhibitPolicyMapping", Pw = [
  Zt,
  zt
];
class Ha extends k {
  constructor(e = {}) {
    super(), Zt in e && (this.requireExplicitPolicy = r(e, Zt, Ha.defaultValues(Zt))), zt in e && (this.inhibitPolicyMapping = r(e, zt, Ha.defaultValues(zt))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Zt:
        return 0;
      case zt:
        return 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new M({
          name: t.requireExplicitPolicy || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          }
        }),
        new M({
          name: t.inhibitPolicyMapping || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Pw);
    const t = N(e, e, Ha.schema({
      names: {
        requireExplicitPolicy: Zt,
        inhibitPolicyMapping: zt
      }
    }));
    if (p.assertSchema(t, this.className), Zt in t.result) {
      const s = t.result.requireExplicitPolicy;
      s.idBlock.tagClass = 1, s.idBlock.tagNumber = 2;
      const n = s.toBER(!1), i = Oe(n);
      p.assert(i, "Integer"), this.requireExplicitPolicy = i.result.valueBlock.valueDec;
    }
    if (zt in t.result) {
      const s = t.result.inhibitPolicyMapping;
      s.idBlock.tagClass = 1, s.idBlock.tagNumber = 2;
      const n = s.toBER(!1), i = Oe(n);
      p.assert(i, "Integer"), this.inhibitPolicyMapping = i.result.valueBlock.valueDec;
    }
  }
  toSchema() {
    const e = [];
    if (Zt in this) {
      const t = new S({ value: this.requireExplicitPolicy });
      t.idBlock.tagClass = 3, t.idBlock.tagNumber = 0, e.push(t);
    }
    if (zt in this) {
      const t = new S({ value: this.inhibitPolicyMapping });
      t.idBlock.tagClass = 3, t.idBlock.tagNumber = 1, e.push(t);
    }
    return new f({
      value: e
    });
  }
  toJSON() {
    const e = {};
    return Zt in this && (e.requireExplicitPolicy = this.requireExplicitPolicy), zt in this && (e.inhibitPolicyMapping = this.inhibitPolicyMapping), e;
  }
}
Ha.CLASS_NAME = "PolicyConstraints";
const Bo = "issuerDomainPolicy", Io = "subjectDomainPolicy", Lw = [
  Bo,
  Io
];
class Gi extends k {
  constructor(e = {}) {
    super(), this.issuerDomainPolicy = r(e, Bo, Gi.defaultValues(Bo)), this.subjectDomainPolicy = r(e, Io, Gi.defaultValues(Io)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Bo:
        return u;
      case Io:
        return u;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.issuerDomainPolicy || u }),
        new T({ name: t.subjectDomainPolicy || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, Lw);
    const t = N(e, e, Gi.schema({
      names: {
        issuerDomainPolicy: Bo,
        subjectDomainPolicy: Io
      }
    }));
    p.assertSchema(t, this.className), this.issuerDomainPolicy = t.result.issuerDomainPolicy.valueBlock.toString(), this.subjectDomainPolicy = t.result.subjectDomainPolicy.valueBlock.toString();
  }
  toSchema() {
    return new f({
      value: [
        new T({ value: this.issuerDomainPolicy }),
        new T({ value: this.subjectDomainPolicy })
      ]
    });
  }
  toJSON() {
    return {
      issuerDomainPolicy: this.issuerDomainPolicy,
      subjectDomainPolicy: this.subjectDomainPolicy
    };
  }
}
Gi.CLASS_NAME = "PolicyMapping";
const Vo = "mappings", Uw = [
  Vo
];
class Sc extends k {
  constructor(e = {}) {
    super(), this.mappings = r(e, Vo, Sc.defaultValues(Vo)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Vo:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.mappings || u,
          value: Gi.schema()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Uw);
    const t = N(e, e, Sc.schema({
      names: {
        mappings: Vo
      }
    }));
    p.assertSchema(t, this.className), this.mappings = Array.from(t.result.mappings, (s) => new Gi({ schema: s }));
  }
  toSchema() {
    return new f({
      value: Array.from(this.mappings, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      mappings: Array.from(this.mappings, (e) => e.toJSON())
    };
  }
}
Sc.CLASS_NAME = "PolicyMappings";
const _s = "notBefore", $s = "notAfter", Hw = [
  _s,
  $s
];
class Ma extends k {
  constructor(e = {}) {
    super(), _s in e && (this.notBefore = r(e, _s, Ma.defaultValues(_s))), $s in e && (this.notAfter = r(e, $s, Ma.defaultValues($s))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case _s:
        return /* @__PURE__ */ new Date();
      case $s:
        return /* @__PURE__ */ new Date();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new M({
          name: t.notBefore || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          }
        }),
        new M({
          name: t.notAfter || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Hw);
    const t = N(e, e, Ma.schema({
      names: {
        notBefore: _s,
        notAfter: $s
      }
    }));
    if (p.assertSchema(t, this.className), _s in t.result) {
      const s = new ue();
      s.fromBuffer(t.result.notBefore.valueBlock.valueHex), this.notBefore = s.toDate();
    }
    if ($s in t.result) {
      const s = new ue({ valueHex: t.result.notAfter.valueBlock.valueHex });
      s.fromBuffer(t.result.notAfter.valueBlock.valueHex), this.notAfter = s.toDate();
    }
  }
  toSchema() {
    const e = [];
    return _s in this && e.push(new M({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      valueHex: new ue({ valueDate: this.notBefore }).valueBlock.valueHexView
    })), $s in this && e.push(new M({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      valueHex: new ue({ valueDate: this.notAfter }).valueBlock.valueHexView
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {};
    return this.notBefore && (e.notBefore = this.notBefore), this.notAfter && (e.notAfter = this.notAfter), e;
  }
}
Ma.CLASS_NAME = "PrivateKeyUsagePeriod";
const yr = "id", es = "type", vr = "values", Mw = [
  yr,
  es
], _w = [
  vr
];
class Yi extends k {
  constructor(e = {}) {
    super(), this.id = r(e, yr, Yi.defaultValues(yr)), es in e && (this.type = r(e, es, Yi.defaultValues(es))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case yr:
        return u;
      case es:
        return new Ae();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case yr:
        return t === u;
      case es:
        return t instanceof Ae;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.id || u }),
        new K({
          name: t.type || u,
          optional: !0
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Mw);
    const t = N(e, e, Yi.schema({
      names: {
        id: yr,
        type: es
      }
    }));
    p.assertSchema(t, this.className), this.id = t.result.id.valueBlock.toString(), es in t.result && (this.type = t.result.type);
  }
  toSchema() {
    const e = [
      new T({ value: this.id })
    ];
    return es in this && e.push(this.type), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      id: this.id
    };
    return this.type && (e.type = this.type.toJSON()), e;
  }
}
Yi.CLASS_NAME = "QCStatement";
class Ac extends k {
  constructor(e = {}) {
    super(), this.values = r(e, vr, Ac.defaultValues(vr)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case vr:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case vr:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.values || u,
          value: Yi.schema(t.value || {})
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, _w);
    const t = N(e, e, Ac.schema({
      names: {
        values: vr
      }
    }));
    p.assertSchema(t, this.className), this.values = Array.from(t.result.values, (s) => new Yi({ schema: s }));
  }
  toSchema() {
    return new f({
      value: Array.from(this.values, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      values: Array.from(this.values, (e) => e.toJSON())
    };
  }
}
Ac.CLASS_NAME = "QCStatements";
var Gn;
class Vn {
  static register(e, t, s) {
    this.namedCurves[e.toLowerCase()] = this.namedCurves[t] = { name: e, id: t, size: s };
  }
  static find(e) {
    return this.namedCurves[e.toLowerCase()] || null;
  }
}
Gn = Vn;
Vn.namedCurves = {};
Gn.register("P-256", "1.2.840.10045.3.1.7", 32), Gn.register("P-384", "1.3.132.0.34", 48), Gn.register("P-521", "1.3.132.0.35", 66), Gn.register("brainpoolP256r1", "1.3.36.3.3.2.8.1.1.7", 32), Gn.register("brainpoolP384r1", "1.3.36.3.3.2.8.1.1.11", 48), Gn.register("brainpoolP512r1", "1.3.36.3.3.2.8.1.1.13", 64);
const Vc = "x", xc = "y", Oc = "namedCurve";
class Ye extends k {
  constructor(e = {}) {
    super(), this.x = r(e, Vc, Ye.defaultValues(Vc)), this.y = r(e, xc, Ye.defaultValues(xc)), this.namedCurve = r(e, Oc, Ye.defaultValues(Oc)), e.json && this.fromJSON(e.json), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Vc:
      case xc:
        return be;
      case Oc:
        return u;
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Vc:
      case xc:
        return t instanceof ArrayBuffer && Ka(t, Ye.defaultValues(e));
      case Oc:
        return typeof t == "string" && t === Ye.defaultValues(e);
      default:
        return super.defaultValues(e);
    }
  }
  static schema() {
    return new Ru();
  }
  fromSchema(e) {
    const t = L.toUint8Array(e);
    if (t[0] !== 4)
      throw new Error("Object's schema was not verified against input data for ECPublicKey");
    const s = Vn.find(this.namedCurve);
    if (!s)
      throw new Error(`Incorrect curve OID: ${this.namedCurve}`);
    const n = s.size;
    if (t.byteLength !== n * 2 + 1)
      throw new Error("Object's schema was not verified against input data for ECPublicKey");
    this.namedCurve = s.name, this.x = t.slice(1, n + 1).buffer, this.y = t.slice(1 + n, n * 2 + 1).buffer;
  }
  toSchema() {
    return new Ru({
      data: Pa(new Uint8Array([4]).buffer, this.x, this.y)
    });
  }
  toJSON() {
    const e = Vn.find(this.namedCurve);
    return {
      crv: e ? e.name : this.namedCurve,
      x: xh(xu(this.x), !0, !0, !1),
      y: xh(xu(this.y), !0, !0, !1)
    };
  }
  fromJSON(e) {
    Q.assert("json", e, "crv", "x", "y");
    let t = 0;
    const s = Vn.find(e.crv);
    s && (this.namedCurve = s.id, t = s.size);
    const n = Ja(fc(e.x, !0));
    if (n.byteLength < t) {
      this.x = new ArrayBuffer(t);
      const a = new Uint8Array(this.x), l = new Uint8Array(n);
      a.set(l, 1);
    } else
      this.x = n.slice(0, t);
    const i = Ja(fc(e.y, !0));
    if (i.byteLength < t) {
      this.y = new ArrayBuffer(t);
      const a = new Uint8Array(this.y), l = new Uint8Array(i);
      a.set(l, 1);
    } else
      this.y = i.slice(0, t);
  }
}
Ye.CLASS_NAME = "ECPublicKey";
const xo = "modulus", Oo = "publicExponent", $w = [xo, Oo];
class Qi extends k {
  constructor(e = {}) {
    super(), this.modulus = r(e, xo, Qi.defaultValues(xo)), this.publicExponent = r(e, Oo, Qi.defaultValues(Oo)), e.json && this.fromJSON(e.json), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case xo:
        return new S();
      case Oo:
        return new S();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.modulus || u }),
        new S({ name: t.publicExponent || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, $w);
    const t = N(e, e, Qi.schema({
      names: {
        modulus: xo,
        publicExponent: Oo
      }
    }));
    p.assertSchema(t, this.className), this.modulus = t.result.modulus.convertFromDER(256), this.publicExponent = t.result.publicExponent;
  }
  toSchema() {
    return new f({
      value: [
        this.modulus.convertToDER(),
        this.publicExponent
      ]
    });
  }
  toJSON() {
    return {
      n: H.ToBase64Url(this.modulus.valueBlock.valueHexView),
      e: H.ToBase64Url(this.publicExponent.valueBlock.valueHexView)
    };
  }
  fromJSON(e) {
    Q.assert("json", e, "n", "e");
    const t = Ja(fc(e.n, !0));
    this.modulus = new S({ valueHex: t.slice(0, Math.pow(2, Fm(t.byteLength))) }), this.publicExponent = new S({ valueHex: Ja(fc(e.e, !0)).slice(0, 3) });
  }
}
Qi.CLASS_NAME = "RSAPublicKey";
const Ro = "algorithm", To = "subjectPublicKey", Kw = [Ro, To];
class Xe extends k {
  get parsedKey() {
    if (this._parsedKey === void 0) {
      switch (this.algorithm.algorithmId) {
        case "1.2.840.10045.2.1":
          if ("algorithmParams" in this.algorithm && this.algorithm.algorithmParams.constructor.blockName() === T.blockName())
            try {
              this._parsedKey = new Ye({
                namedCurve: this.algorithm.algorithmParams.valueBlock.toString(),
                schema: this.subjectPublicKey.valueBlock.valueHexView
              });
            } catch {
            }
          break;
        case "1.2.840.113549.1.1.1":
        case "1.2.840.113549.1.1.10":
          {
            const e = Oe(this.subjectPublicKey.valueBlock.valueHexView);
            if (e.offset !== -1)
              try {
                this._parsedKey = new Qi({ schema: e.result });
              } catch {
              }
          }
          break;
      }
      this._parsedKey || (this._parsedKey = null);
    }
    return this._parsedKey || void 0;
  }
  set parsedKey(e) {
    this._parsedKey = e;
  }
  constructor(e = {}) {
    super(), this.algorithm = r(e, Ro, Xe.defaultValues(Ro)), this.subjectPublicKey = r(e, To, Xe.defaultValues(To));
    const t = r(e, "parsedKey", null);
    t && (this.parsedKey = t), e.json && this.fromJSON(e.json), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ro:
        return new v();
      case To:
        return new G();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        v.schema(t.algorithm || {}),
        new G({ name: t.subjectPublicKey || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, Kw);
    const t = N(e, e, Xe.schema({
      names: {
        algorithm: {
          names: {
            blockName: Ro
          }
        },
        subjectPublicKey: To
      }
    }));
    p.assertSchema(t, this.className), this.algorithm = new v({ schema: t.result.algorithm }), this.subjectPublicKey = t.result.subjectPublicKey;
  }
  toSchema() {
    return new f({
      value: [
        this.algorithm.toSchema(),
        this.subjectPublicKey
      ]
    });
  }
  toJSON() {
    if (!this.parsedKey)
      return {
        algorithm: this.algorithm.toJSON(),
        subjectPublicKey: this.subjectPublicKey.toJSON()
      };
    const e = {};
    switch (this.algorithm.algorithmId) {
      case "1.2.840.10045.2.1":
        e.kty = "EC";
        break;
      case "1.2.840.113549.1.1.1":
      case "1.2.840.113549.1.1.10":
        e.kty = "RSA";
        break;
    }
    const t = this.parsedKey.toJSON();
    return Object.assign(e, t), e;
  }
  fromJSON(e) {
    if ("kty" in e) {
      switch (e.kty.toUpperCase()) {
        case "EC":
          this.parsedKey = new Ye({ json: e }), this.algorithm = new v({
            algorithmId: "1.2.840.10045.2.1",
            algorithmParams: new T({ value: this.parsedKey.namedCurve })
          });
          break;
        case "RSA":
          this.parsedKey = new Qi({ json: e }), this.algorithm = new v({
            algorithmId: "1.2.840.113549.1.1.1",
            algorithmParams: new Ae()
          });
          break;
        default:
          throw new Error(`Invalid value for "kty" parameter: ${e.kty}`);
      }
      this.subjectPublicKey = new G({ valueHex: this.parsedKey.toSchema().toBER(!1) });
    }
  }
  async importKey(e, t = F(!0)) {
    try {
      if (!e)
        throw new Error("Need to provide publicKey input parameter");
      const s = await t.exportKey("spki", e), n = Oe(s);
      try {
        this.fromSchema(n.result);
      } catch {
        throw new Error("Error during initializing object from schema");
      }
    } catch (s) {
      const n = s instanceof Error ? s.message : `${s}`;
      throw new Error(`Error during exporting public key: ${n}`);
    }
  }
}
Xe.CLASS_NAME = "PublicKeyInfo";
const Sr = "version", Ar = "privateKey", kt = "namedCurve", Ks = "publicKey", Jw = [
  Sr,
  Ar,
  kt,
  Ks
];
class wt extends k {
  constructor(e = {}) {
    super(), this.version = r(e, Sr, wt.defaultValues(Sr)), this.privateKey = r(e, Ar, wt.defaultValues(Ar)), kt in e && (this.namedCurve = r(e, kt, wt.defaultValues(kt))), Ks in e && (this.publicKey = r(e, Ks, wt.defaultValues(Ks))), e.json && this.fromJSON(e.json), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Sr:
        return 1;
      case Ar:
        return new I();
      case kt:
        return u;
      case Ks:
        return new Ye();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Sr:
        return t === wt.defaultValues(e);
      case Ar:
        return t.isEqual(wt.defaultValues(e));
      case kt:
        return t === u;
      case Ks:
        return Ye.compareWithDefault(kt, t.namedCurve) && Ye.compareWithDefault("x", t.x) && Ye.compareWithDefault("y", t.y);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || u }),
        new I({ name: t.privateKey || u }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new T({ name: t.namedCurve || u })
          ]
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new G({ name: t.publicKey || u })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Jw);
    const t = N(e, e, wt.schema({
      names: {
        version: Sr,
        privateKey: Ar,
        namedCurve: kt,
        publicKey: Ks
      }
    }));
    if (p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, this.privateKey = t.result.privateKey, kt in t.result && (this.namedCurve = t.result.namedCurve.valueBlock.toString()), Ks in t.result) {
      const s = { schema: t.result.publicKey.valueBlock.valueHex };
      kt in this && (s.namedCurve = this.namedCurve), this.publicKey = new Ye(s);
    }
  }
  toSchema() {
    const e = [
      new S({ value: this.version }),
      this.privateKey
    ];
    return this.namedCurve && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [
        new T({ value: this.namedCurve })
      ]
    })), this.publicKey && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: [
        new G({ valueHex: this.publicKey.toSchema().toBER(!1) })
      ]
    })), new f({
      value: e
    });
  }
  toJSON() {
    if (!this.namedCurve || wt.compareWithDefault(kt, this.namedCurve))
      throw new Error('Not enough information for making JSON: absent "namedCurve" value');
    const e = Vn.find(this.namedCurve), t = {
      crv: e ? e.name : this.namedCurve,
      d: H.ToBase64Url(this.privateKey.valueBlock.valueHexView)
    };
    if (this.publicKey) {
      const s = this.publicKey.toJSON();
      t.x = s.x, t.y = s.y;
    }
    return t;
  }
  fromJSON(e) {
    Q.assert("json", e, "crv", "d");
    let t = 0;
    const s = Vn.find(e.crv);
    s && (this.namedCurve = s.id, t = s.size);
    const n = H.FromBase64Url(e.d);
    if (n.byteLength < t) {
      const i = new ArrayBuffer(t), a = new Uint8Array(i), l = new Uint8Array(n);
      a.set(l, 1), this.privateKey = new I({ valueHex: i });
    } else
      this.privateKey = new I({ valueHex: n.slice(0, t) });
    e.x && e.y && (this.publicKey = new Ye({ json: e }));
  }
}
wt.CLASS_NAME = "ECPrivateKey";
const Do = "prime", Po = "exponent", Lo = "coefficient", jw = [
  Do,
  Po,
  Lo
];
class cs extends k {
  constructor(e = {}) {
    super(), this.prime = r(e, Do, cs.defaultValues(Do)), this.exponent = r(e, Po, cs.defaultValues(Po)), this.coefficient = r(e, Lo, cs.defaultValues(Lo)), e.json && this.fromJSON(e.json), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Do:
        return new S();
      case Po:
        return new S();
      case Lo:
        return new S();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.prime || u }),
        new S({ name: t.exponent || u }),
        new S({ name: t.coefficient || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, jw);
    const t = N(e, e, cs.schema({
      names: {
        prime: Do,
        exponent: Po,
        coefficient: Lo
      }
    }));
    p.assertSchema(t, this.className), this.prime = t.result.prime.convertFromDER(), this.exponent = t.result.exponent.convertFromDER(), this.coefficient = t.result.coefficient.convertFromDER();
  }
  toSchema() {
    return new f({
      value: [
        this.prime.convertToDER(),
        this.exponent.convertToDER(),
        this.coefficient.convertToDER()
      ]
    });
  }
  toJSON() {
    return {
      r: H.ToBase64Url(this.prime.valueBlock.valueHexView),
      d: H.ToBase64Url(this.exponent.valueBlock.valueHexView),
      t: H.ToBase64Url(this.coefficient.valueBlock.valueHexView)
    };
  }
  fromJSON(e) {
    Q.assert("json", e, "r", "d", "r"), this.prime = new S({ valueHex: H.FromBase64Url(e.r) }), this.exponent = new S({ valueHex: H.FromBase64Url(e.d) }), this.coefficient = new S({ valueHex: H.FromBase64Url(e.t) });
  }
}
cs.CLASS_NAME = "OtherPrimeInfo";
const Uo = "version", Ho = "modulus", Mo = "publicExponent", _o = "privateExponent", $o = "prime1", Ko = "prime2", Jo = "exponent1", jo = "exponent2", Fo = "coefficient", Yn = "otherPrimeInfos", Fw = [
  Uo,
  Ho,
  Mo,
  _o,
  $o,
  Ko,
  Jo,
  jo,
  Fo,
  Yn
];
class Fe extends k {
  constructor(e = {}) {
    super(), this.version = r(e, Uo, Fe.defaultValues(Uo)), this.modulus = r(e, Ho, Fe.defaultValues(Ho)), this.publicExponent = r(e, Mo, Fe.defaultValues(Mo)), this.privateExponent = r(e, _o, Fe.defaultValues(_o)), this.prime1 = r(e, $o, Fe.defaultValues($o)), this.prime2 = r(e, Ko, Fe.defaultValues(Ko)), this.exponent1 = r(e, Jo, Fe.defaultValues(Jo)), this.exponent2 = r(e, jo, Fe.defaultValues(jo)), this.coefficient = r(e, Fo, Fe.defaultValues(Fo)), Yn in e && (this.otherPrimeInfos = r(e, Yn, Fe.defaultValues(Yn))), e.json && this.fromJSON(e.json), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Uo:
        return 0;
      case Ho:
        return new S();
      case Mo:
        return new S();
      case _o:
        return new S();
      case $o:
        return new S();
      case Ko:
        return new S();
      case Jo:
        return new S();
      case jo:
        return new S();
      case Fo:
        return new S();
      case Yn:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || u }),
        new S({ name: t.modulus || u }),
        new S({ name: t.publicExponent || u }),
        new S({ name: t.privateExponent || u }),
        new S({ name: t.prime1 || u }),
        new S({ name: t.prime2 || u }),
        new S({ name: t.exponent1 || u }),
        new S({ name: t.exponent2 || u }),
        new S({ name: t.coefficient || u }),
        new f({
          optional: !0,
          value: [
            new J({
              name: t.otherPrimeInfosName || u,
              value: cs.schema(t.otherPrimeInfo || {})
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Fw);
    const t = N(e, e, Fe.schema({
      names: {
        version: Uo,
        modulus: Ho,
        publicExponent: Mo,
        privateExponent: _o,
        prime1: $o,
        prime2: Ko,
        exponent1: Jo,
        exponent2: jo,
        coefficient: Fo,
        otherPrimeInfo: {
          names: {
            blockName: Yn
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, this.modulus = t.result.modulus.convertFromDER(256), this.publicExponent = t.result.publicExponent, this.privateExponent = t.result.privateExponent.convertFromDER(256), this.prime1 = t.result.prime1.convertFromDER(128), this.prime2 = t.result.prime2.convertFromDER(128), this.exponent1 = t.result.exponent1.convertFromDER(128), this.exponent2 = t.result.exponent2.convertFromDER(128), this.coefficient = t.result.coefficient.convertFromDER(128), Yn in t.result && (this.otherPrimeInfos = Array.from(t.result.otherPrimeInfos, (s) => new cs({ schema: s })));
  }
  toSchema() {
    const e = [];
    return e.push(new S({ value: this.version })), e.push(this.modulus.convertToDER()), e.push(this.publicExponent), e.push(this.privateExponent.convertToDER()), e.push(this.prime1.convertToDER()), e.push(this.prime2.convertToDER()), e.push(this.exponent1.convertToDER()), e.push(this.exponent2.convertToDER()), e.push(this.coefficient.convertToDER()), this.otherPrimeInfos && e.push(new f({
      value: Array.from(this.otherPrimeInfos, (t) => t.toSchema())
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      n: H.ToBase64Url(this.modulus.valueBlock.valueHexView),
      e: H.ToBase64Url(this.publicExponent.valueBlock.valueHexView),
      d: H.ToBase64Url(this.privateExponent.valueBlock.valueHexView),
      p: H.ToBase64Url(this.prime1.valueBlock.valueHexView),
      q: H.ToBase64Url(this.prime2.valueBlock.valueHexView),
      dp: H.ToBase64Url(this.exponent1.valueBlock.valueHexView),
      dq: H.ToBase64Url(this.exponent2.valueBlock.valueHexView),
      qi: H.ToBase64Url(this.coefficient.valueBlock.valueHexView)
    };
    return this.otherPrimeInfos && (e.oth = Array.from(this.otherPrimeInfos, (t) => t.toJSON())), e;
  }
  fromJSON(e) {
    Q.assert("json", e, "n", "e", "d", "p", "q", "dp", "dq", "qi"), this.modulus = new S({ valueHex: H.FromBase64Url(e.n) }), this.publicExponent = new S({ valueHex: H.FromBase64Url(e.e) }), this.privateExponent = new S({ valueHex: H.FromBase64Url(e.d) }), this.prime1 = new S({ valueHex: H.FromBase64Url(e.p) }), this.prime2 = new S({ valueHex: H.FromBase64Url(e.q) }), this.exponent1 = new S({ valueHex: H.FromBase64Url(e.dp) }), this.exponent2 = new S({ valueHex: H.FromBase64Url(e.dq) }), this.coefficient = new S({ valueHex: H.FromBase64Url(e.qi) }), e.oth && (this.otherPrimeInfos = Array.from(e.oth, (t) => new cs({ json: t })));
  }
}
Fe.CLASS_NAME = "RSAPrivateKey";
const qo = "version", Wo = "privateKeyAlgorithm", Go = "privateKey", Qn = "attributes", Rc = "parsedKey", qw = [
  qo,
  Wo,
  Go,
  Qn
];
class vt extends k {
  constructor(e = {}) {
    super(), this.version = r(e, qo, vt.defaultValues(qo)), this.privateKeyAlgorithm = r(e, Wo, vt.defaultValues(Wo)), this.privateKey = r(e, Go, vt.defaultValues(Go)), Qn in e && (this.attributes = r(e, Qn, vt.defaultValues(Qn))), Rc in e && (this.parsedKey = r(e, Rc, vt.defaultValues(Rc))), e.json && this.fromJSON(e.json), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case qo:
        return 0;
      case Wo:
        return new v();
      case Go:
        return new I();
      case Qn:
        return [];
      case Rc:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || u }),
        v.schema(t.privateKeyAlgorithm || {}),
        new I({ name: t.privateKey || u }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new J({
              name: t.attributes || u,
              value: le.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, qw);
    const t = N(e, e, vt.schema({
      names: {
        version: qo,
        privateKeyAlgorithm: {
          names: {
            blockName: Wo
          }
        },
        privateKey: Go,
        attributes: Qn
      }
    }));
    switch (p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, this.privateKeyAlgorithm = new v({ schema: t.result.privateKeyAlgorithm }), this.privateKey = t.result.privateKey, Qn in t.result && (this.attributes = Array.from(t.result.attributes, (s) => new le({ schema: s }))), this.privateKeyAlgorithm.algorithmId) {
      case "1.2.840.113549.1.1.1":
        {
          const s = Oe(this.privateKey.valueBlock.valueHexView);
          s.offset !== -1 && (this.parsedKey = new Fe({ schema: s.result }));
        }
        break;
      case "1.2.840.10045.2.1":
        if ("algorithmParams" in this.privateKeyAlgorithm && this.privateKeyAlgorithm.algorithmParams instanceof T) {
          const s = Oe(this.privateKey.valueBlock.valueHexView);
          s.offset !== -1 && (this.parsedKey = new wt({
            namedCurve: this.privateKeyAlgorithm.algorithmParams.valueBlock.toString(),
            schema: s.result
          }));
        }
        break;
    }
  }
  toSchema() {
    const e = [
      new S({ value: this.version }),
      this.privateKeyAlgorithm.toSchema(),
      this.privateKey
    ];
    return this.attributes && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: Array.from(this.attributes, (t) => t.toSchema())
    })), new f({
      value: e
    });
  }
  toJSON() {
    if (!this.parsedKey) {
      const s = {
        version: this.version,
        privateKeyAlgorithm: this.privateKeyAlgorithm.toJSON(),
        privateKey: this.privateKey.toJSON()
      };
      return this.attributes && (s.attributes = Array.from(this.attributes, (n) => n.toJSON())), s;
    }
    const e = {};
    switch (this.privateKeyAlgorithm.algorithmId) {
      case "1.2.840.10045.2.1":
        e.kty = "EC";
        break;
      case "1.2.840.113549.1.1.1":
        e.kty = "RSA";
        break;
    }
    const t = this.parsedKey.toJSON();
    return Object.assign(e, t), e;
  }
  fromJSON(e) {
    if ("kty" in e) {
      switch (e.kty.toUpperCase()) {
        case "EC":
          this.parsedKey = new wt({ json: e }), this.privateKeyAlgorithm = new v({
            algorithmId: "1.2.840.10045.2.1",
            algorithmParams: new T({ value: this.parsedKey.namedCurve })
          });
          break;
        case "RSA":
          this.parsedKey = new Fe({ json: e }), this.privateKeyAlgorithm = new v({
            algorithmId: "1.2.840.113549.1.1.1",
            algorithmParams: new Ae()
          });
          break;
        default:
          throw new Error(`Invalid value for "kty" parameter: ${e.kty}`);
      }
      this.privateKey = new I({ valueHex: this.parsedKey.toSchema().toBER(!1) });
    }
  }
}
vt.CLASS_NAME = "PrivateKeyInfo";
const pr = "contentType", br = "contentEncryptionAlgorithm", Xn = "encryptedContent", Ww = [
  pr,
  br,
  Xn
], Kf = 1024;
class Ee extends k {
  constructor(e = {}) {
    if (super(), this.contentType = r(e, pr, Ee.defaultValues(pr)), this.contentEncryptionAlgorithm = r(e, br, Ee.defaultValues(br)), Xn in e && e.encryptedContent && (this.encryptedContent = e.encryptedContent, this.encryptedContent.idBlock.tagClass === 1 && this.encryptedContent.idBlock.tagNumber === 4 && this.encryptedContent.idBlock.isConstructed === !1 && !e.disableSplit)) {
      const t = new I({
        idBlock: { isConstructed: !0 },
        isConstructed: !0
      });
      let s = 0;
      const n = this.encryptedContent.valueBlock.valueHexView.slice().buffer;
      let i = n.byteLength;
      for (; i > 0; ) {
        const a = new Uint8Array(n, s, s + Kf > n.byteLength ? n.byteLength - s : Kf), l = new ArrayBuffer(a.length), c = new Uint8Array(l);
        for (let h = 0; h < c.length; h++)
          c[h] = a[h];
        t.valueBlock.value.push(new I({ valueHex: l })), i -= a.length, s += a.length;
      }
      this.encryptedContent = t;
    }
    e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case pr:
        return u;
      case br:
        return new v();
      case Xn:
        return new I();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case pr:
        return t === u;
      case br:
        return t.algorithmId === u && !("algorithmParams" in t);
      case Xn:
        return t.isEqual(Ee.defaultValues(Xn));
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.contentType || u }),
        v.schema(t.contentEncryptionAlgorithm || {}),
        new he({
          value: [
            new w({
              name: t.encryptedContent || u,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              },
              value: [
                new J({
                  value: new I()
                })
              ]
            }),
            new M({
              name: t.encryptedContent || u,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              }
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Ww);
    const t = N(e, e, Ee.schema({
      names: {
        contentType: pr,
        contentEncryptionAlgorithm: {
          names: {
            blockName: br
          }
        },
        encryptedContent: Xn
      }
    }));
    p.assertSchema(t, this.className), this.contentType = t.result.contentType.valueBlock.toString(), this.contentEncryptionAlgorithm = new v({ schema: t.result.contentEncryptionAlgorithm }), Xn in t.result && (this.encryptedContent = t.result.encryptedContent, this.encryptedContent.idBlock.tagClass = 1, this.encryptedContent.idBlock.tagNumber = 4);
  }
  toSchema() {
    const e = {
      isIndefiniteForm: !1
    }, t = [];
    if (t.push(new T({ value: this.contentType })), t.push(this.contentEncryptionAlgorithm.toSchema()), this.encryptedContent) {
      e.isIndefiniteForm = this.encryptedContent.idBlock.isConstructed;
      const s = this.encryptedContent;
      s.idBlock.tagClass = 3, s.idBlock.tagNumber = 0, s.lenBlock.isIndefiniteForm = this.encryptedContent.idBlock.isConstructed, t.push(s);
    }
    return new f({
      lenBlock: e,
      value: t
    });
  }
  toJSON() {
    const e = {
      contentType: this.contentType,
      contentEncryptionAlgorithm: this.contentEncryptionAlgorithm.toJSON()
    };
    return this.encryptedContent && (e.encryptedContent = this.encryptedContent.toJSON()), e;
  }
  getEncryptedContent() {
    if (!this.encryptedContent)
      throw new Error("Parameter 'encryptedContent' is undefined");
    return I.prototype.getValue.call(this.encryptedContent);
  }
}
Ee.CLASS_NAME = "EncryptedContentInfo";
const Js = "hashAlgorithm", js = "maskGenAlgorithm", Fs = "saltLength", qs = "trailerField", Gw = [
  Js,
  js,
  Fs,
  qs
];
class Pe extends k {
  constructor(e = {}) {
    super(), this.hashAlgorithm = r(e, Js, Pe.defaultValues(Js)), this.maskGenAlgorithm = r(e, js, Pe.defaultValues(js)), this.saltLength = r(e, Fs, Pe.defaultValues(Fs)), this.trailerField = r(e, qs, Pe.defaultValues(qs)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Js:
        return new v({
          algorithmId: "1.3.14.3.2.26",
          algorithmParams: new Ae()
        });
      case js:
        return new v({
          algorithmId: "1.2.840.113549.1.1.8",
          algorithmParams: new v({
            algorithmId: "1.3.14.3.2.26",
            algorithmParams: new Ae()
          }).toSchema()
        });
      case Fs:
        return 20;
      case qs:
        return 1;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          optional: !0,
          value: [v.schema(t.hashAlgorithm || {})]
        }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          optional: !0,
          value: [v.schema(t.maskGenAlgorithm || {})]
        }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          optional: !0,
          value: [new S({ name: t.saltLength || u })]
        }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 3
          },
          optional: !0,
          value: [new S({ name: t.trailerField || u })]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Gw);
    const t = N(e, e, Pe.schema({
      names: {
        hashAlgorithm: {
          names: {
            blockName: Js
          }
        },
        maskGenAlgorithm: {
          names: {
            blockName: js
          }
        },
        saltLength: Fs,
        trailerField: qs
      }
    }));
    p.assertSchema(t, this.className), Js in t.result && (this.hashAlgorithm = new v({ schema: t.result.hashAlgorithm })), js in t.result && (this.maskGenAlgorithm = new v({ schema: t.result.maskGenAlgorithm })), Fs in t.result && (this.saltLength = t.result.saltLength.valueBlock.valueDec), qs in t.result && (this.trailerField = t.result.trailerField.valueBlock.valueDec);
  }
  toSchema() {
    const e = [];
    return this.hashAlgorithm.isEqual(Pe.defaultValues(Js)) || e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [this.hashAlgorithm.toSchema()]
    })), this.maskGenAlgorithm.isEqual(Pe.defaultValues(js)) || e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: [this.maskGenAlgorithm.toSchema()]
    })), this.saltLength !== Pe.defaultValues(Fs) && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 2
      },
      value: [new S({ value: this.saltLength })]
    })), this.trailerField !== Pe.defaultValues(qs) && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 3
      },
      value: [new S({ value: this.trailerField })]
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {};
    return this.hashAlgorithm.isEqual(Pe.defaultValues(Js)) || (e.hashAlgorithm = this.hashAlgorithm.toJSON()), this.maskGenAlgorithm.isEqual(Pe.defaultValues(js)) || (e.maskGenAlgorithm = this.maskGenAlgorithm.toJSON()), this.saltLength !== Pe.defaultValues(Fs) && (e.saltLength = this.saltLength), this.trailerField !== Pe.defaultValues(qs) && (e.trailerField = this.trailerField), e;
  }
}
Pe.CLASS_NAME = "RSASSAPSSParams";
const kr = "salt", Yo = "iterationCount", Et = "keyLength", ts = "prf", Yw = [
  kr,
  Yo,
  Et,
  ts
];
class Je extends k {
  constructor(e = {}) {
    super(), this.salt = r(e, kr, Je.defaultValues(kr)), this.iterationCount = r(e, Yo, Je.defaultValues(Yo)), Et in e && (this.keyLength = r(e, Et, Je.defaultValues(Et))), ts in e && (this.prf = r(e, ts, Je.defaultValues(ts))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case kr:
        return {};
      case Yo:
        return -1;
      case Et:
        return 0;
      case ts:
        return new v({
          algorithmId: "1.3.14.3.2.26",
          algorithmParams: new Ae()
        });
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new he({
          value: [
            new I({ name: t.saltPrimitive || u }),
            v.schema(t.saltConstructed || {})
          ]
        }),
        new S({ name: t.iterationCount || u }),
        new S({
          name: t.keyLength || u,
          optional: !0
        }),
        v.schema(t.prf || {
          names: {
            optional: !0
          }
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Yw);
    const t = N(e, e, Je.schema({
      names: {
        saltPrimitive: kr,
        saltConstructed: {
          names: {
            blockName: kr
          }
        },
        iterationCount: Yo,
        keyLength: Et,
        prf: {
          names: {
            blockName: ts,
            optional: !0
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.salt = t.result.salt, this.iterationCount = t.result.iterationCount.valueBlock.valueDec, Et in t.result && (this.keyLength = t.result.keyLength.valueBlock.valueDec), ts in t.result && (this.prf = new v({ schema: t.result.prf }));
  }
  toSchema() {
    const e = [];
    return e.push(this.salt), e.push(new S({ value: this.iterationCount })), Et in this && Je.defaultValues(Et) !== this.keyLength && e.push(new S({ value: this.keyLength })), this.prf && Je.defaultValues(ts).isEqual(this.prf) === !1 && e.push(this.prf.toSchema()), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      salt: this.salt.toJSON(),
      iterationCount: this.iterationCount
    };
    return Et in this && Je.defaultValues(Et) !== this.keyLength && (e.keyLength = this.keyLength), this.prf && Je.defaultValues(ts).isEqual(this.prf) === !1 && (e.prf = this.prf.toJSON()), e;
  }
}
Je.CLASS_NAME = "PBKDF2Params";
const Qo = "keyDerivationFunc", Xo = "encryptionScheme", Qw = [
  Qo,
  Xo
];
class Xi extends k {
  constructor(e = {}) {
    super(), this.keyDerivationFunc = r(e, Qo, Xi.defaultValues(Qo)), this.encryptionScheme = r(e, Xo, Xi.defaultValues(Xo)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Qo:
        return new v();
      case Xo:
        return new v();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        v.schema(t.keyDerivationFunc || {}),
        v.schema(t.encryptionScheme || {})
      ]
    });
  }
  fromSchema(e) {
    C(e, Qw);
    const t = N(e, e, Xi.schema({
      names: {
        keyDerivationFunc: {
          names: {
            blockName: Qo
          }
        },
        encryptionScheme: {
          names: {
            blockName: Xo
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.keyDerivationFunc = new v({ schema: t.result.keyDerivationFunc }), this.encryptionScheme = new v({ schema: t.result.encryptionScheme });
  }
  toSchema() {
    return new f({
      value: [
        this.keyDerivationFunc.toSchema(),
        this.encryptionScheme.toSchema()
      ]
    });
  }
  toJSON() {
    return {
      keyDerivationFunc: this.keyDerivationFunc.toJSON(),
      encryptionScheme: this.encryptionScheme.toJSON()
    };
  }
}
Xi.CLASS_NAME = "PBES2Params";
class Xw {
  constructor(e) {
    this.crypto = e.crypto, this.subtle = "webkitSubtle" in e.crypto ? e.crypto.webkitSubtle : e.crypto.subtle, this.name = r(e, "name", u);
  }
  async encrypt(...e) {
    return this.subtle.encrypt(...e);
  }
  async decrypt(...e) {
    return this.subtle.decrypt(...e);
  }
  sign(...e) {
    return this.subtle.sign(...e);
  }
  async verify(...e) {
    return this.subtle.verify(...e);
  }
  async digest(...e) {
    return this.subtle.digest(...e);
  }
  async generateKey(...e) {
    return this.subtle.generateKey(...e);
  }
  async deriveKey(...e) {
    return this.subtle.deriveKey(...e);
  }
  async deriveBits(...e) {
    return this.subtle.deriveBits(...e);
  }
  async wrapKey(...e) {
    return this.subtle.wrapKey(...e);
  }
  async unwrapKey(...e) {
    return this.subtle.unwrapKey(...e);
  }
  exportKey(...e) {
    return this.subtle.exportKey(...e);
  }
  importKey(...e) {
    return this.subtle.importKey(...e);
  }
  getRandomValues(e) {
    if (e === null)
      throw new Error('Argument "array" must not be null');
    return this.crypto.getRandomValues(e);
  }
}
async function Jf(o, e, t, s, n) {
  let i, a, l;
  switch (o.toUpperCase()) {
    case "SHA-1":
      i = 20, a = 64, l = Ag;
      break;
    case "SHA-256":
      i = 32, a = 64, l = kg;
      break;
    case "SHA-384":
      i = 48, a = 128, l = Yg;
      break;
    case "SHA-512":
      i = 64, a = 128, l = Gg;
      break;
    default:
      throw new Error("Unsupported hashing algorithm");
  }
  const c = new Uint8Array(t);
  let h = new TextDecoder().decode(t);
  new TextEncoder().encode(h).some((V, R) => V !== c[R]) && (h = String.fromCharCode(...c));
  const g = new Uint8Array(h.length * 2 + 2), d = new DataView(g.buffer);
  for (let V = 0; V < h.length; V++)
    d.setUint16(V * 2, h.charCodeAt(V), !1);
  d.setUint16(h.length * 2, 0, !1);
  const b = new Uint8Array(a).fill(3), A = new Uint8Array(s), E = new Uint8Array(a * Math.ceil(A.length / a)).map((V, R) => A[R % A.length]), y = new Uint8Array(a * Math.ceil(g.length / a)).map((V, R) => g[R % g.length]);
  let O = new Uint8Array(E.length + y.length);
  O.set(E), O.set(y, E.length);
  const x = Math.ceil((e >> 3) / i), B = [];
  for (let V = 0; V < x; V++) {
    let R = new Uint8Array(b.length + O.length);
    R.set(b), R.set(O, b.length);
    for (let Z = 0; Z < n; Z++)
      R = l(R);
    const _ = new Uint8Array(a).map((Z, ye) => R[ye % R.length]), te = Math.ceil(A.length / a) + Math.ceil(g.length / a), j = [];
    for (let Z = 0; Z < te; Z++) {
      const ye = Array.from(O.slice(Z * a, (Z + 1) * a));
      let se = 511;
      for (let ae = _.length - 1; ae >= 0; ae--)
        se >>= 8, se += _[ae] + (ye[ae] || 0), ye[ae] = se & 255;
      j.push(...ye);
    }
    O = new Uint8Array(j), B.push(...R);
  }
  return new Uint8Array(B.slice(0, e >> 3)).buffer;
}
function Pm(o) {
  const e = typeof o == "string" ? { name: o } : o;
  return "hash" in e ? {
    ...e,
    hash: Pm(e.hash)
  } : e;
}
class pc extends Xw {
  async importKey(e, t, s, n, i) {
    var a, l, c, h, m, g;
    let d = {};
    const b = Pm(s);
    switch (e.toLowerCase()) {
      case "raw":
        return this.subtle.importKey("raw", t, s, n, i);
      case "spki":
        {
          const A = Oe(L.toArrayBuffer(t));
          p.assert(A, "keyData");
          const E = new Xe();
          try {
            E.fromSchema(A.result);
          } catch {
            throw new ie("Incorrect keyData");
          }
          switch (b.name.toUpperCase()) {
            case "RSA-PSS":
              {
                if (i = ["verify"], d.kty = "RSA", d.ext = n, d.key_ops = i, !["1.2.840.113549.1.1.1", "1.2.840.113549.1.1.10"].includes(E.algorithm.algorithmId))
                  throw new Error(`Incorrect public key algorithm: ${E.algorithm.algorithmId}`);
                if (!b.hash)
                  throw new Q("hash", "algorithm.hash", "Incorrect hash algorithm: Hash algorithm is missed");
                switch (b.hash.name.toUpperCase()) {
                  case "SHA-1":
                    d.alg = "PS1";
                    break;
                  case "SHA-256":
                    d.alg = "PS256";
                    break;
                  case "SHA-384":
                    d.alg = "PS384";
                    break;
                  case "SHA-512":
                    d.alg = "PS512";
                    break;
                  default:
                    throw new Error(`Incorrect hash algorithm: ${b.hash.name.toUpperCase()}`);
                }
                const y = E.toJSON();
                Object.assign(d, y);
              }
              break;
            case "RSASSA-PKCS1-V1_5":
              {
                if (i = ["verify"], d.kty = "RSA", d.ext = n, d.key_ops = i, E.algorithm.algorithmId !== "1.2.840.113549.1.1.1")
                  throw new Error(`Incorrect public key algorithm: ${E.algorithm.algorithmId}`);
                if (!b.hash)
                  throw new Q("hash", "algorithm.hash", "Incorrect hash algorithm: Hash algorithm is missed");
                switch (b.hash.name.toUpperCase()) {
                  case "SHA-1":
                    d.alg = "RS1";
                    break;
                  case "SHA-256":
                    d.alg = "RS256";
                    break;
                  case "SHA-384":
                    d.alg = "RS384";
                    break;
                  case "SHA-512":
                    d.alg = "RS512";
                    break;
                  default:
                    throw new Error(`Incorrect hash algorithm: ${b.hash.name.toUpperCase()}`);
                }
                const y = E.toJSON();
                Object.assign(d, y);
              }
              break;
            case "ECDSA":
              i = ["verify"];
            case "ECDH":
              {
                if (d = {
                  kty: "EC",
                  ext: n,
                  key_ops: i
                }, E.algorithm.algorithmId !== "1.2.840.10045.2.1")
                  throw new Error(`Incorrect public key algorithm: ${E.algorithm.algorithmId}`);
                const y = E.toJSON();
                Object.assign(d, y);
              }
              break;
            case "RSA-OAEP":
              {
                if (d.kty = "RSA", d.ext = n, d.key_ops = i, this.name.toLowerCase() === "safari")
                  d.alg = "RSA-OAEP";
                else {
                  if (!b.hash)
                    throw new Q("hash", "algorithm.hash", "Incorrect hash algorithm: Hash algorithm is missed");
                  switch (b.hash.name.toUpperCase()) {
                    case "SHA-1":
                      d.alg = "RSA-OAEP";
                      break;
                    case "SHA-256":
                      d.alg = "RSA-OAEP-256";
                      break;
                    case "SHA-384":
                      d.alg = "RSA-OAEP-384";
                      break;
                    case "SHA-512":
                      d.alg = "RSA-OAEP-512";
                      break;
                    default:
                      throw new Error(`Incorrect hash algorithm: ${b.hash.name.toUpperCase()}`);
                  }
                }
                const y = E.toJSON();
                Object.assign(d, y);
              }
              break;
            case "RSAES-PKCS1-V1_5":
              {
                d.kty = "RSA", d.ext = n, d.key_ops = i, d.alg = "PS1";
                const y = E.toJSON();
                Object.assign(d, y);
              }
              break;
            default:
              throw new Error(`Incorrect algorithm name: ${b.name.toUpperCase()}`);
          }
        }
        break;
      case "pkcs8":
        {
          const A = new vt(), E = Oe(L.toArrayBuffer(t));
          p.assert(E, "keyData");
          try {
            A.fromSchema(E.result);
          } catch {
            throw new Error("Incorrect keyData");
          }
          if (!A.parsedKey)
            throw new Error("Incorrect keyData");
          switch (b.name.toUpperCase()) {
            case "RSA-PSS":
              switch ((a = b.hash) === null || a === void 0 ? void 0 : a.name.toUpperCase()) {
                case "SHA-1":
                  d.alg = "PS1";
                  break;
                case "SHA-256":
                  d.alg = "PS256";
                  break;
                case "SHA-384":
                  d.alg = "PS384";
                  break;
                case "SHA-512":
                  d.alg = "PS512";
                  break;
                default:
                  throw new Error(`Incorrect hash algorithm: ${(l = b.hash) === null || l === void 0 ? void 0 : l.name.toUpperCase()}`);
              }
            case "RSASSA-PKCS1-V1_5":
              {
                if (i = ["sign"], d.kty = "RSA", d.ext = n, d.key_ops = i, A.privateKeyAlgorithm.algorithmId !== "1.2.840.113549.1.1.1")
                  throw new Error(`Incorrect private key algorithm: ${A.privateKeyAlgorithm.algorithmId}`);
                if (!("alg" in d))
                  switch ((c = b.hash) === null || c === void 0 ? void 0 : c.name.toUpperCase()) {
                    case "SHA-1":
                      d.alg = "RS1";
                      break;
                    case "SHA-256":
                      d.alg = "RS256";
                      break;
                    case "SHA-384":
                      d.alg = "RS384";
                      break;
                    case "SHA-512":
                      d.alg = "RS512";
                      break;
                    default:
                      throw new Error(`Incorrect hash algorithm: ${(h = b.hash) === null || h === void 0 ? void 0 : h.name.toUpperCase()}`);
                  }
                const y = A.toJSON();
                Object.assign(d, y);
              }
              break;
            case "ECDSA":
              i = ["sign"];
            case "ECDH":
              {
                if (d = {
                  kty: "EC",
                  ext: n,
                  key_ops: i
                }, A.privateKeyAlgorithm.algorithmId !== "1.2.840.10045.2.1")
                  throw new Error(`Incorrect algorithm: ${A.privateKeyAlgorithm.algorithmId}`);
                const y = A.toJSON();
                Object.assign(d, y);
              }
              break;
            case "RSA-OAEP":
              {
                if (d.kty = "RSA", d.ext = n, d.key_ops = i, this.name.toLowerCase() === "safari")
                  d.alg = "RSA-OAEP";
                else
                  switch ((m = b.hash) === null || m === void 0 ? void 0 : m.name.toUpperCase()) {
                    case "SHA-1":
                      d.alg = "RSA-OAEP";
                      break;
                    case "SHA-256":
                      d.alg = "RSA-OAEP-256";
                      break;
                    case "SHA-384":
                      d.alg = "RSA-OAEP-384";
                      break;
                    case "SHA-512":
                      d.alg = "RSA-OAEP-512";
                      break;
                    default:
                      throw new Error(`Incorrect hash algorithm: ${(g = b.hash) === null || g === void 0 ? void 0 : g.name.toUpperCase()}`);
                  }
                const y = A.toJSON();
                Object.assign(d, y);
              }
              break;
            case "RSAES-PKCS1-V1_5":
              {
                i = ["decrypt"], d.kty = "RSA", d.ext = n, d.key_ops = i, d.alg = "PS1";
                const y = A.toJSON();
                Object.assign(d, y);
              }
              break;
            default:
              throw new Error(`Incorrect algorithm name: ${b.name.toUpperCase()}`);
          }
        }
        break;
      case "jwk":
        d = t;
        break;
      default:
        throw new Error(`Incorrect format: ${e}`);
    }
    if (this.name.toLowerCase() === "safari")
      try {
        return this.subtle.importKey("jwk", Ja(JSON.stringify(d)), s, n, i);
      } catch {
        return this.subtle.importKey("jwk", d, s, n, i);
      }
    return this.subtle.importKey("jwk", d, s, n, i);
  }
  async exportKey(e, t) {
    let s = await this.subtle.exportKey("jwk", t);
    switch (this.name.toLowerCase() === "safari" && s instanceof ArrayBuffer && (s = JSON.parse(xu(s))), e.toLowerCase()) {
      case "raw":
        return this.subtle.exportKey("raw", t);
      case "spki": {
        const n = new Xe();
        try {
          n.fromJSON(s);
        } catch {
          throw new Error("Incorrect key data");
        }
        return n.toSchema().toBER(!1);
      }
      case "pkcs8": {
        const n = new vt();
        try {
          n.fromJSON(s);
        } catch {
          throw new Error("Incorrect key data");
        }
        return n.toSchema().toBER(!1);
      }
      case "jwk":
        return s;
      default:
        throw new Error(`Incorrect format: ${e}`);
    }
  }
  async convert(e, t, s, n, i, a) {
    if (e.toLowerCase() === t.toLowerCase())
      return s;
    const l = await this.importKey(e, s, n, i, a);
    return this.exportKey(t, l);
  }
  getAlgorithmByOID(e, t = !1, s) {
    switch (e) {
      case "1.2.840.113549.1.1.1":
        return {
          name: "RSAES-PKCS1-v1_5"
        };
      case "1.2.840.113549.1.1.5":
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: {
            name: "SHA-1"
          }
        };
      case "1.2.840.113549.1.1.11":
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: {
            name: "SHA-256"
          }
        };
      case "1.2.840.113549.1.1.12":
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: {
            name: "SHA-384"
          }
        };
      case "1.2.840.113549.1.1.13":
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: {
            name: "SHA-512"
          }
        };
      case "1.2.840.113549.1.1.10":
        return {
          name: "RSA-PSS"
        };
      case "1.2.840.113549.1.1.7":
        return {
          name: "RSA-OAEP"
        };
      case "1.2.840.10045.2.1":
      case "1.2.840.10045.4.1":
        return {
          name: "ECDSA",
          hash: {
            name: "SHA-1"
          }
        };
      case "1.2.840.10045.4.3.2":
        return {
          name: "ECDSA",
          hash: {
            name: "SHA-256"
          }
        };
      case "1.2.840.10045.4.3.3":
        return {
          name: "ECDSA",
          hash: {
            name: "SHA-384"
          }
        };
      case "1.2.840.10045.4.3.4":
        return {
          name: "ECDSA",
          hash: {
            name: "SHA-512"
          }
        };
      case "1.3.133.16.840.63.0.2":
        return {
          name: "ECDH",
          kdf: "SHA-1"
        };
      case "1.3.132.1.11.1":
        return {
          name: "ECDH",
          kdf: "SHA-256"
        };
      case "1.3.132.1.11.2":
        return {
          name: "ECDH",
          kdf: "SHA-384"
        };
      case "1.3.132.1.11.3":
        return {
          name: "ECDH",
          kdf: "SHA-512"
        };
      case "2.16.840.1.101.3.4.1.2":
        return {
          name: "AES-CBC",
          length: 128
        };
      case "2.16.840.1.101.3.4.1.22":
        return {
          name: "AES-CBC",
          length: 192
        };
      case "2.16.840.1.101.3.4.1.42":
        return {
          name: "AES-CBC",
          length: 256
        };
      case "2.16.840.1.101.3.4.1.6":
        return {
          name: "AES-GCM",
          length: 128
        };
      case "2.16.840.1.101.3.4.1.26":
        return {
          name: "AES-GCM",
          length: 192
        };
      case "2.16.840.1.101.3.4.1.46":
        return {
          name: "AES-GCM",
          length: 256
        };
      case "2.16.840.1.101.3.4.1.4":
        return {
          name: "AES-CFB",
          length: 128
        };
      case "2.16.840.1.101.3.4.1.24":
        return {
          name: "AES-CFB",
          length: 192
        };
      case "2.16.840.1.101.3.4.1.44":
        return {
          name: "AES-CFB",
          length: 256
        };
      case "2.16.840.1.101.3.4.1.5":
        return {
          name: "AES-KW",
          length: 128
        };
      case "2.16.840.1.101.3.4.1.25":
        return {
          name: "AES-KW",
          length: 192
        };
      case "2.16.840.1.101.3.4.1.45":
        return {
          name: "AES-KW",
          length: 256
        };
      case "1.2.840.113549.2.7":
        return {
          name: "HMAC",
          hash: {
            name: "SHA-1"
          }
        };
      case "1.2.840.113549.2.9":
        return {
          name: "HMAC",
          hash: {
            name: "SHA-256"
          }
        };
      case "1.2.840.113549.2.10":
        return {
          name: "HMAC",
          hash: {
            name: "SHA-384"
          }
        };
      case "1.2.840.113549.2.11":
        return {
          name: "HMAC",
          hash: {
            name: "SHA-512"
          }
        };
      case "1.2.840.113549.1.9.16.3.5":
        return {
          name: "DH"
        };
      case "1.3.14.3.2.26":
        return {
          name: "SHA-1"
        };
      case "2.16.840.1.101.3.4.2.1":
        return {
          name: "SHA-256"
        };
      case "2.16.840.1.101.3.4.2.2":
        return {
          name: "SHA-384"
        };
      case "2.16.840.1.101.3.4.2.3":
        return {
          name: "SHA-512"
        };
      case "1.2.840.113549.1.5.12":
        return {
          name: "PBKDF2"
        };
      case "1.2.840.10045.3.1.7":
        return {
          name: "P-256"
        };
      case "1.3.132.0.34":
        return {
          name: "P-384"
        };
      case "1.3.132.0.35":
        return {
          name: "P-521"
        };
    }
    if (t)
      throw new Error(`Unsupported algorithm identifier ${s ? `for ${s} ` : u}: ${e}`);
    return {};
  }
  getOIDByAlgorithm(e, t = !1, s) {
    let n = u;
    switch (e.name.toUpperCase()) {
      case "RSAES-PKCS1-V1_5":
        n = "1.2.840.113549.1.1.1";
        break;
      case "RSASSA-PKCS1-V1_5":
        switch (e.hash.name.toUpperCase()) {
          case "SHA-1":
            n = "1.2.840.113549.1.1.5";
            break;
          case "SHA-256":
            n = "1.2.840.113549.1.1.11";
            break;
          case "SHA-384":
            n = "1.2.840.113549.1.1.12";
            break;
          case "SHA-512":
            n = "1.2.840.113549.1.1.13";
            break;
        }
        break;
      case "RSA-PSS":
        n = "1.2.840.113549.1.1.10";
        break;
      case "RSA-OAEP":
        n = "1.2.840.113549.1.1.7";
        break;
      case "ECDSA":
        switch (e.hash.name.toUpperCase()) {
          case "SHA-1":
            n = "1.2.840.10045.4.1";
            break;
          case "SHA-256":
            n = "1.2.840.10045.4.3.2";
            break;
          case "SHA-384":
            n = "1.2.840.10045.4.3.3";
            break;
          case "SHA-512":
            n = "1.2.840.10045.4.3.4";
            break;
        }
        break;
      case "ECDH":
        switch (e.kdf.toUpperCase()) {
          case "SHA-1":
            n = "1.3.133.16.840.63.0.2";
            break;
          case "SHA-256":
            n = "1.3.132.1.11.1";
            break;
          case "SHA-384":
            n = "1.3.132.1.11.2";
            break;
          case "SHA-512":
            n = "1.3.132.1.11.3";
            break;
        }
        break;
      case "AES-CTR":
        break;
      case "AES-CBC":
        switch (e.length) {
          case 128:
            n = "2.16.840.1.101.3.4.1.2";
            break;
          case 192:
            n = "2.16.840.1.101.3.4.1.22";
            break;
          case 256:
            n = "2.16.840.1.101.3.4.1.42";
            break;
        }
        break;
      case "AES-CMAC":
        break;
      case "AES-GCM":
        switch (e.length) {
          case 128:
            n = "2.16.840.1.101.3.4.1.6";
            break;
          case 192:
            n = "2.16.840.1.101.3.4.1.26";
            break;
          case 256:
            n = "2.16.840.1.101.3.4.1.46";
            break;
        }
        break;
      case "AES-CFB":
        switch (e.length) {
          case 128:
            n = "2.16.840.1.101.3.4.1.4";
            break;
          case 192:
            n = "2.16.840.1.101.3.4.1.24";
            break;
          case 256:
            n = "2.16.840.1.101.3.4.1.44";
            break;
        }
        break;
      case "AES-KW":
        switch (e.length) {
          case 128:
            n = "2.16.840.1.101.3.4.1.5";
            break;
          case 192:
            n = "2.16.840.1.101.3.4.1.25";
            break;
          case 256:
            n = "2.16.840.1.101.3.4.1.45";
            break;
        }
        break;
      case "HMAC":
        switch (e.hash.name.toUpperCase()) {
          case "SHA-1":
            n = "1.2.840.113549.2.7";
            break;
          case "SHA-256":
            n = "1.2.840.113549.2.9";
            break;
          case "SHA-384":
            n = "1.2.840.113549.2.10";
            break;
          case "SHA-512":
            n = "1.2.840.113549.2.11";
            break;
        }
        break;
      case "DH":
        n = "1.2.840.113549.1.9.16.3.5";
        break;
      case "SHA-1":
        n = "1.3.14.3.2.26";
        break;
      case "SHA-256":
        n = "2.16.840.1.101.3.4.2.1";
        break;
      case "SHA-384":
        n = "2.16.840.1.101.3.4.2.2";
        break;
      case "SHA-512":
        n = "2.16.840.1.101.3.4.2.3";
        break;
      case "CONCAT":
        break;
      case "HKDF":
        break;
      case "PBKDF2":
        n = "1.2.840.113549.1.5.12";
        break;
      case "P-256":
        n = "1.2.840.10045.3.1.7";
        break;
      case "P-384":
        n = "1.3.132.0.34";
        break;
      case "P-521":
        n = "1.3.132.0.35";
        break;
    }
    if (!n && t)
      throw new Error(`Unsupported algorithm ${s ? `for ${s} ` : u}: ${e.name}`);
    return n;
  }
  getAlgorithmParameters(e, t) {
    let s = {
      algorithm: {},
      usages: []
    };
    switch (e.toUpperCase()) {
      case "RSAES-PKCS1-V1_5":
      case "RSASSA-PKCS1-V1_5":
        switch (t.toLowerCase()) {
          case "generatekey":
            s = {
              algorithm: {
                name: "RSASSA-PKCS1-v1_5",
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["sign", "verify"]
            };
            break;
          case "verify":
          case "sign":
          case "importkey":
            s = {
              algorithm: {
                name: "RSASSA-PKCS1-v1_5",
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["verify"]
            };
            break;
          case "exportkey":
          default:
            return {
              algorithm: {
                name: "RSASSA-PKCS1-v1_5"
              },
              usages: []
            };
        }
        break;
      case "RSA-PSS":
        switch (t.toLowerCase()) {
          case "sign":
          case "verify":
            s = {
              algorithm: {
                name: "RSA-PSS",
                hash: {
                  name: "SHA-1"
                },
                saltLength: 20
              },
              usages: ["sign", "verify"]
            };
            break;
          case "generatekey":
            s = {
              algorithm: {
                name: "RSA-PSS",
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: {
                  name: "SHA-1"
                }
              },
              usages: ["sign", "verify"]
            };
            break;
          case "importkey":
            s = {
              algorithm: {
                name: "RSA-PSS",
                hash: {
                  name: "SHA-1"
                }
              },
              usages: ["verify"]
            };
            break;
          case "exportkey":
          default:
            return {
              algorithm: {
                name: "RSA-PSS"
              },
              usages: []
            };
        }
        break;
      case "RSA-OAEP":
        switch (t.toLowerCase()) {
          case "encrypt":
          case "decrypt":
            s = {
              algorithm: {
                name: "RSA-OAEP"
              },
              usages: ["encrypt", "decrypt"]
            };
            break;
          case "generatekey":
            s = {
              algorithm: {
                name: "RSA-OAEP",
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          case "importkey":
            s = {
              algorithm: {
                name: "RSA-OAEP",
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["encrypt"]
            };
            break;
          case "exportkey":
          default:
            return {
              algorithm: {
                name: "RSA-OAEP"
              },
              usages: []
            };
        }
        break;
      case "ECDSA":
        switch (t.toLowerCase()) {
          case "generatekey":
            s = {
              algorithm: {
                name: "ECDSA",
                namedCurve: "P-256"
              },
              usages: ["sign", "verify"]
            };
            break;
          case "importkey":
            s = {
              algorithm: {
                name: "ECDSA",
                namedCurve: "P-256"
              },
              usages: ["verify"]
            };
            break;
          case "verify":
          case "sign":
            s = {
              algorithm: {
                name: "ECDSA",
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["sign"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "ECDSA"
              },
              usages: []
            };
        }
        break;
      case "ECDH":
        switch (t.toLowerCase()) {
          case "exportkey":
          case "importkey":
          case "generatekey":
            s = {
              algorithm: {
                name: "ECDH",
                namedCurve: "P-256"
              },
              usages: ["deriveKey", "deriveBits"]
            };
            break;
          case "derivekey":
          case "derivebits":
            s = {
              algorithm: {
                name: "ECDH",
                namedCurve: "P-256",
                public: []
              },
              usages: ["encrypt", "decrypt"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "ECDH"
              },
              usages: []
            };
        }
        break;
      case "AES-CTR":
        switch (t.toLowerCase()) {
          case "importkey":
          case "exportkey":
          case "generatekey":
            s = {
              algorithm: {
                name: "AES-CTR",
                length: 256
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          case "decrypt":
          case "encrypt":
            s = {
              algorithm: {
                name: "AES-CTR",
                counter: new Uint8Array(16),
                length: 10
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "AES-CTR"
              },
              usages: []
            };
        }
        break;
      case "AES-CBC":
        switch (t.toLowerCase()) {
          case "importkey":
          case "exportkey":
          case "generatekey":
            s = {
              algorithm: {
                name: "AES-CBC",
                length: 256
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          case "decrypt":
          case "encrypt":
            s = {
              algorithm: {
                name: "AES-CBC",
                iv: this.getRandomValues(new Uint8Array(16))
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "AES-CBC"
              },
              usages: []
            };
        }
        break;
      case "AES-GCM":
        switch (t.toLowerCase()) {
          case "importkey":
          case "exportkey":
          case "generatekey":
            s = {
              algorithm: {
                name: "AES-GCM",
                length: 256
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          case "decrypt":
          case "encrypt":
            s = {
              algorithm: {
                name: "AES-GCM",
                iv: this.getRandomValues(new Uint8Array(16))
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "AES-GCM"
              },
              usages: []
            };
        }
        break;
      case "AES-KW":
        switch (t.toLowerCase()) {
          case "importkey":
          case "exportkey":
          case "generatekey":
          case "wrapkey":
          case "unwrapkey":
            s = {
              algorithm: {
                name: "AES-KW",
                length: 256
              },
              usages: ["wrapKey", "unwrapKey"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "AES-KW"
              },
              usages: []
            };
        }
        break;
      case "HMAC":
        switch (t.toLowerCase()) {
          case "sign":
          case "verify":
            s = {
              algorithm: {
                name: "HMAC"
              },
              usages: ["sign", "verify"]
            };
            break;
          case "importkey":
          case "exportkey":
          case "generatekey":
            s = {
              algorithm: {
                name: "HMAC",
                length: 32,
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["sign", "verify"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "HMAC"
              },
              usages: []
            };
        }
        break;
      case "HKDF":
        switch (t.toLowerCase()) {
          case "derivekey":
            s = {
              algorithm: {
                name: "HKDF",
                hash: "SHA-256",
                salt: new Uint8Array([]),
                info: new Uint8Array([])
              },
              usages: ["encrypt", "decrypt"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "HKDF"
              },
              usages: []
            };
        }
        break;
      case "PBKDF2":
        switch (t.toLowerCase()) {
          case "derivekey":
            s = {
              algorithm: {
                name: "PBKDF2",
                hash: { name: "SHA-256" },
                salt: new Uint8Array([]),
                iterations: 1e4
              },
              usages: ["encrypt", "decrypt"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "PBKDF2"
              },
              usages: []
            };
        }
        break;
    }
    return s;
  }
  getHashAlgorithm(e) {
    let t = u;
    switch (e.algorithmId) {
      case "1.2.840.10045.4.1":
      case "1.2.840.113549.1.1.5":
        t = "SHA-1";
        break;
      case "1.2.840.10045.4.3.2":
      case "1.2.840.113549.1.1.11":
        t = "SHA-256";
        break;
      case "1.2.840.10045.4.3.3":
      case "1.2.840.113549.1.1.12":
        t = "SHA-384";
        break;
      case "1.2.840.10045.4.3.4":
      case "1.2.840.113549.1.1.13":
        t = "SHA-512";
        break;
      case "1.2.840.113549.1.1.10":
        try {
          const s = new Pe({ schema: e.algorithmParams });
          if (s.hashAlgorithm) {
            const n = this.getAlgorithmByOID(s.hashAlgorithm.algorithmId);
            if ("name" in n)
              t = n.name;
            else
              return u;
          } else
            t = "SHA-1";
        } catch {
        }
        break;
    }
    return t;
  }
  async encryptEncryptedContentInfo(e) {
    Q.assert(e, "password", "contentEncryptionAlgorithm", "hmacHashAlgorithm", "iterationCount", "contentToEncrypt", "contentToEncrypt", "contentType");
    const t = this.getOIDByAlgorithm(e.contentEncryptionAlgorithm, !0, "contentEncryptionAlgorithm"), s = this.getOIDByAlgorithm({
      name: "PBKDF2"
    }, !0, "PBKDF2"), n = this.getOIDByAlgorithm({
      name: "HMAC",
      hash: {
        name: e.hmacHashAlgorithm
      }
    }, !0, "hmacHashAlgorithm"), i = new ArrayBuffer(16), a = new Uint8Array(i);
    this.getRandomValues(a);
    const l = new ArrayBuffer(64), c = new Uint8Array(l);
    this.getRandomValues(c);
    const h = new Uint8Array(e.contentToEncrypt), m = new Je({
      salt: new I({ valueHex: l }),
      iterationCount: e.iterationCount,
      prf: new v({
        algorithmId: n,
        algorithmParams: new Ae()
      })
    }), g = new Uint8Array(e.password), d = await this.importKey("raw", g, "PBKDF2", !1, ["deriveKey"]), b = await this.deriveKey({
      name: "PBKDF2",
      hash: {
        name: e.hmacHashAlgorithm
      },
      salt: c,
      iterations: e.iterationCount
    }, d, e.contentEncryptionAlgorithm, !1, ["encrypt"]), A = await this.encrypt({
      name: e.contentEncryptionAlgorithm.name,
      iv: a
    }, b, h), E = new Xi({
      keyDerivationFunc: new v({
        algorithmId: s,
        algorithmParams: m.toSchema()
      }),
      encryptionScheme: new v({
        algorithmId: t,
        algorithmParams: new I({ valueHex: i })
      })
    });
    return new Ee({
      contentType: e.contentType,
      contentEncryptionAlgorithm: new v({
        algorithmId: "1.2.840.113549.1.5.13",
        algorithmParams: E.toSchema()
      }),
      encryptedContent: new I({ valueHex: A })
    });
  }
  async decryptEncryptedContentInfo(e) {
    if (Q.assert(e, "password", "encryptedContentInfo"), e.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId !== "1.2.840.113549.1.5.13")
      throw new Error(`Unknown "contentEncryptionAlgorithm": ${e.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId}`);
    let t;
    try {
      t = new Xi({ schema: e.encryptedContentInfo.contentEncryptionAlgorithm.algorithmParams });
    } catch {
      throw new Error('Incorrectly encoded "pbes2Parameters"');
    }
    let s;
    try {
      s = new Je({ schema: t.keyDerivationFunc.algorithmParams });
    } catch {
      throw new Error('Incorrectly encoded "pbkdf2Params"');
    }
    const n = this.getAlgorithmByOID(t.encryptionScheme.algorithmId, !0), i = t.encryptionScheme.algorithmParams.valueBlock.valueHex, a = new Uint8Array(i), l = s.salt.valueBlock.valueHex, c = new Uint8Array(l), h = s.iterationCount;
    let m = "SHA-1";
    s.prf && (m = this.getAlgorithmByOID(s.prf.algorithmId, !0).hash.name);
    const g = await this.importKey("raw", e.password, "PBKDF2", !1, ["deriveKey"]), d = await this.deriveKey({
      name: "PBKDF2",
      hash: {
        name: m
      },
      salt: c,
      iterations: h
    }, g, n, !1, ["decrypt"]), b = e.encryptedContentInfo.getEncryptedContent();
    return this.decrypt({
      name: n.name,
      iv: a
    }, d, b);
  }
  async stampDataWithPassword(e) {
    if (!(e instanceof Object))
      throw new Error('Parameters must have type "Object"');
    Q.assert(e, "password", "hashAlgorithm", "iterationCount", "salt", "contentToStamp");
    let t;
    switch (e.hashAlgorithm.toLowerCase()) {
      case "sha-1":
        t = 160;
        break;
      case "sha-256":
        t = 256;
        break;
      case "sha-384":
        t = 384;
        break;
      case "sha-512":
        t = 512;
        break;
      default:
        throw new Error(`Incorrect "parameters.hashAlgorithm" parameter: ${e.hashAlgorithm}`);
    }
    const s = {
      name: "HMAC",
      length: t,
      hash: {
        name: e.hashAlgorithm
      }
    }, n = await Jf(e.hashAlgorithm, t, e.password, e.salt, e.iterationCount), i = await this.importKey("raw", new Uint8Array(n), s, !1, ["sign"]);
    return this.sign(s, i, new Uint8Array(e.contentToStamp));
  }
  async verifyDataStampedWithPassword(e) {
    Q.assert(e, "password", "hashAlgorithm", "salt", "iterationCount", "contentToVerify", "signatureToVerify");
    let t = 0;
    switch (e.hashAlgorithm.toLowerCase()) {
      case "sha-1":
        t = 160;
        break;
      case "sha-256":
        t = 256;
        break;
      case "sha-384":
        t = 384;
        break;
      case "sha-512":
        t = 512;
        break;
      default:
        throw new Error(`Incorrect "parameters.hashAlgorithm" parameter: ${e.hashAlgorithm}`);
    }
    const s = {
      name: "HMAC",
      length: t,
      hash: {
        name: e.hashAlgorithm
      }
    }, n = await Jf(e.hashAlgorithm, t, e.password, e.salt, e.iterationCount), i = await this.importKey("raw", new Uint8Array(n), s, !1, ["verify"]);
    return this.verify(s, i, new Uint8Array(e.signatureToVerify), new Uint8Array(e.contentToVerify));
  }
  async getSignatureParameters(e, t = "SHA-1") {
    this.getOIDByAlgorithm({ name: t }, !0, "hashAlgorithm");
    const s = new v(), n = this.getAlgorithmParameters(e.algorithm.name, "sign");
    if (!Object.keys(n.algorithm).length)
      throw new Error("Parameter 'algorithm' is empty");
    const i = n.algorithm;
    switch ("hash" in e.algorithm && e.algorithm.hash && e.algorithm.hash.name ? i.hash.name = e.algorithm.hash.name : i.hash.name = t, e.algorithm.name.toUpperCase()) {
      case "RSASSA-PKCS1-V1_5":
      case "ECDSA":
        s.algorithmId = this.getOIDByAlgorithm(i, !0);
        break;
      case "RSA-PSS":
        {
          switch (i.hash.name.toUpperCase()) {
            case "SHA-256":
              i.saltLength = 32;
              break;
            case "SHA-384":
              i.saltLength = 48;
              break;
            case "SHA-512":
              i.saltLength = 64;
              break;
          }
          const a = {};
          if (i.hash.name.toUpperCase() !== "SHA-1") {
            const c = this.getOIDByAlgorithm({ name: i.hash.name }, !0, "hashAlgorithm");
            a.hashAlgorithm = new v({
              algorithmId: c,
              algorithmParams: new Ae()
            }), a.maskGenAlgorithm = new v({
              algorithmId: "1.2.840.113549.1.1.8",
              algorithmParams: a.hashAlgorithm.toSchema()
            });
          }
          i.saltLength !== 20 && (a.saltLength = i.saltLength);
          const l = new Pe(a);
          s.algorithmId = "1.2.840.113549.1.1.10", s.algorithmParams = l.toSchema();
        }
        break;
      default:
        throw new Error(`Unsupported signature algorithm: ${e.algorithm.name}`);
    }
    return {
      signatureAlgorithm: s,
      parameters: n
    };
  }
  async signWithPrivateKey(e, t, s) {
    const n = await this.sign(s.algorithm, t, e);
    return s.algorithm.name === "ECDSA" ? zw(n) : n;
  }
  fillPublicKeyParameters(e, t) {
    const s = {}, n = this.getHashAlgorithm(t);
    if (n === u)
      throw new Error(`Unsupported signature algorithm: ${t.algorithmId}`);
    let i;
    t.algorithmId === "1.2.840.113549.1.1.10" ? i = t.algorithmId : i = e.algorithm.algorithmId;
    const a = this.getAlgorithmByOID(i, !0);
    if (s.algorithm = this.getAlgorithmParameters(a.name, "importKey"), "hash" in s.algorithm.algorithm && (s.algorithm.algorithm.hash.name = n), a.name === "ECDSA") {
      const l = e.algorithm;
      if (!l.algorithmParams)
        throw new Error("Algorithm parameters for ECDSA public key are missed");
      const c = l.algorithmParams;
      if ("idBlock" in l.algorithmParams && !(c.idBlock.tagClass === 1 && c.idBlock.tagNumber === 6))
        throw new Error("Incorrect type for ECDSA public key parameters");
      const h = this.getAlgorithmByOID(c.valueBlock.toString(), !0);
      s.algorithm.algorithm.namedCurve = h.name;
    }
    return s;
  }
  async getPublicKey(e, t, s) {
    s || (s = this.fillPublicKeyParameters(e, t));
    const n = e.toSchema().toBER(!1);
    return this.importKey("spki", n, s.algorithm.algorithm, !0, s.algorithm.usages);
  }
  async verifyWithPublicKey(e, t, s, n, i) {
    let a;
    if (i) {
      const h = {};
      let m;
      n.algorithmId === "1.2.840.113549.1.1.10" ? m = n.algorithmId : m = s.algorithm.algorithmId;
      const g = this.getAlgorithmByOID(m, !0);
      if (h.algorithm = this.getAlgorithmParameters(g.name, "importKey"), "hash" in h.algorithm.algorithm && (h.algorithm.algorithm.hash.name = i), g.name === "ECDSA") {
        let d = !1;
        if ("algorithmParams" in s.algorithm && "idBlock" in s.algorithm.algorithmParams && s.algorithm.algorithmParams.idBlock.tagClass === 1 && s.algorithm.algorithmParams.idBlock.tagNumber === 6 && (d = !0), d === !1)
          throw new Error("Incorrect type for ECDSA public key parameters");
        const b = this.getAlgorithmByOID(s.algorithm.algorithmParams.valueBlock.toString(), !0);
        h.algorithm.algorithm.namedCurve = b.name;
      }
      a = await this.getPublicKey(s, null, h);
    } else {
      if (i = this.getHashAlgorithm(n), !i)
        throw new Error(`Unsupported signature algorithm: ${n.algorithmId}`);
      a = await this.getPublicKey(s, n);
    }
    const l = this.getAlgorithmParameters(a.algorithm.name, "verify");
    "hash" in l.algorithm && (l.algorithm.hash.name = i);
    let c = t.valueBlock.valueHexView;
    if (a.algorithm.name === "ECDSA") {
      const h = Vn.find(a.algorithm.namedCurve);
      if (!h)
        throw new Error("Unsupported named curve in use");
      const m = Oe(c);
      p.assert(m, "Signature value"), c = ey(m.result, h.size);
    }
    if (a.algorithm.name === "RSA-PSS") {
      const h = new Pe({ schema: n.algorithmParams });
      "saltLength" in h ? l.algorithm.saltLength = h.saltLength : l.algorithm.saltLength = 20;
      let m = "SHA-1";
      "hashAlgorithm" in h && (m = this.getAlgorithmByOID(h.hashAlgorithm.algorithmId, !0).name), l.algorithm.hash.name = m;
    }
    return this.verify(l.algorithm, a, c, e);
  }
}
let Lm = {
  name: "none",
  crypto: null
};
function jf(o) {
  return !!(o && typeof o == "object" && "crypto" in o);
}
function Ph(o, ...e) {
  let t = null;
  if (e.length < 2)
    e.length ? t = e[0] : t = typeof self < "u" && self.crypto ? new pc({ name: "browser", crypto: self.crypto }) : null;
  else {
    const s = e[0], n = e[1];
    jf(n) ? t = n : jf(s) ? t = s : "subtle" in s && "getRandomValues" in s && (t = new pc({
      crypto: s
    }));
  }
  if (typeof process < "u" && "pid" in process && typeof global < "u" && typeof window > "u") {
    if (typeof global[process.pid] > "u")
      global[process.pid] = {};
    else if (typeof global[process.pid] != "object")
      throw new Error(`Name global.${process.pid} already exists and it is not an object`);
    if (typeof global[process.pid].pkijs > "u")
      global[process.pid].pkijs = {};
    else if (typeof global[process.pid].pkijs != "object")
      throw new Error(`Name global.${process.pid}.pkijs already exists and it is not an object`);
    global[process.pid].pkijs.engine = {
      name: o,
      crypto: t
    };
  } else
    Lm = {
      name: o,
      crypto: t
    };
}
function Zw() {
  if (typeof process < "u" && "pid" in process && typeof global < "u" && typeof window > "u") {
    let o;
    try {
      o = global[process.pid].pkijs.engine;
    } catch {
      throw new Error("Please call 'setEngine' before call to 'getEngine'");
    }
    return o;
  }
  return Lm;
}
function F(o = !1) {
  const e = Zw();
  if (!e.crypto && o)
    throw new Error("Unable to create WebCrypto object");
  return e.crypto;
}
function zw(o) {
  if (o.byteLength % 2 !== 0)
    return be;
  const e = o.byteLength / 2, t = new ArrayBuffer(e);
  new Uint8Array(t).set(new Uint8Array(o, 0, e));
  const n = new S({ valueHex: t }), i = new ArrayBuffer(e);
  new Uint8Array(i).set(new Uint8Array(o, e, e));
  const l = new S({ valueHex: i });
  return new f({
    value: [
      n.convertToDER(),
      l.convertToDER()
    ]
  }).toBER(!1);
}
function ey(o, e) {
  if (!(o instanceof f && o.valueBlock.value.length === 2 && o.valueBlock.value[0] instanceof S && o.valueBlock.value[1] instanceof S))
    return be;
  const t = o.valueBlock.value[0].convertFromDER().valueBlock.valueHexView, s = o.valueBlock.value[1].convertFromDER().valueBlock.valueHexView, n = new Uint8Array(e * 2);
  return n.set(t, e - t.byteLength), n.set(s, 2 * e - s.byteLength), n.buffer;
}
async function ty(o, e, t, s, n) {
  switch (o.toUpperCase()) {
    case "SHA-1":
    case "SHA-256":
    case "SHA-384":
    case "SHA-512":
      break;
    default:
      throw new ie(`Unknown hash function: ${o}`);
  }
  if (ie.assert(e, "zBuffer", "ArrayBuffer"), e.byteLength === 0)
    throw new ie("'zBuffer' has zero length, error");
  if (ie.assert(s, "SharedInfo", "ArrayBuffer"), t > 255)
    throw new ie("Please set 'Counter' argument to value less or equal to 255");
  const i = new ArrayBuffer(4), a = new Uint8Array(i);
  a[0] = 0, a[1] = 0, a[2] = 0, a[3] = t;
  let l = be;
  l = Pa(l, e), l = Pa(l, i), l = Pa(l, s);
  const c = await n.digest({ name: o }, l);
  return {
    counter: t,
    result: c
  };
}
async function Ff(o, e, t, s, n = F(!0)) {
  let i = 0, a = 1;
  switch (o.toUpperCase()) {
    case "SHA-1":
      i = 160;
      break;
    case "SHA-256":
      i = 256;
      break;
    case "SHA-384":
      i = 384;
      break;
    case "SHA-512":
      i = 512;
      break;
    default:
      throw new ie(`Unknown hash function: ${o}`);
  }
  if (ie.assert(e, "Zbuffer", "ArrayBuffer"), e.byteLength === 0)
    throw new ie("'Zbuffer' has zero length, error");
  ie.assert(s, "SharedInfo", "ArrayBuffer");
  const l = t / i;
  Math.floor(l) > 0 && (a = Math.floor(l), l - a > 0 && a++);
  const c = [];
  for (let d = 1; d <= a; d++)
    c.push(await ty(o, e, d, s, n));
  let h = be, m = 1, g = !0;
  for (; g; ) {
    g = !1;
    for (const d of c)
      if (d.counter === m) {
        h = Pa(h, d.result), g = !0;
        break;
      }
    m++;
  }
  if (t >>= 3, h.byteLength > t) {
    const d = new ArrayBuffer(t), b = new Uint8Array(d), A = new Uint8Array(h);
    for (let E = 0; E < t; E++)
      b[E] = A[E];
    return d;
  }
  return h;
}
const nh = "version", ih = "logID", rh = "extensions", ah = "timestamp", oh = "hashAlgorithm", lh = "signatureAlgorithm", ch = "signature", qf = "none", Wf = "md5", Gf = "sha1", Yf = "sha224", Qf = "sha256", Xf = "sha384", Zf = "sha512", zf = "anonymous", ed = "rsa", td = "dsa", sd = "ecdsa";
class Mt extends k {
  constructor(e = {}) {
    super(), this.version = r(e, nh, Mt.defaultValues(nh)), this.logID = r(e, ih, Mt.defaultValues(ih)), this.timestamp = r(e, ah, Mt.defaultValues(ah)), this.extensions = r(e, rh, Mt.defaultValues(rh)), this.hashAlgorithm = r(e, oh, Mt.defaultValues(oh)), this.signatureAlgorithm = r(e, lh, Mt.defaultValues(lh)), this.signature = r(e, ch, Mt.defaultValues(ch)), "stream" in e && e.stream && this.fromStream(e.stream), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case nh:
        return 0;
      case ih:
      case rh:
        return be;
      case ah:
        return /* @__PURE__ */ new Date(0);
      case oh:
      case lh:
        return u;
      case ch:
        return be;
      default:
        return super.defaultValues(e);
    }
  }
  fromSchema(e) {
    if (!(e instanceof Ru))
      throw new Error("Object's schema was not verified against input data for SignedCertificateTimestamp");
    const t = new In({
      stream: new ge({
        buffer: e.data
      })
    });
    this.fromStream(t);
  }
  fromStream(e) {
    const t = e.getUint16();
    if (this.version = e.getBlock(1)[0], this.version === 0) {
      this.logID = new Uint8Array(e.getBlock(32)).buffer.slice(0), this.timestamp = new Date(er(new Uint8Array(e.getBlock(8)), 8));
      const s = e.getUint16();
      switch (this.extensions = new Uint8Array(e.getBlock(s)).buffer.slice(0), e.getBlock(1)[0]) {
        case 0:
          this.hashAlgorithm = qf;
          break;
        case 1:
          this.hashAlgorithm = Wf;
          break;
        case 2:
          this.hashAlgorithm = Gf;
          break;
        case 3:
          this.hashAlgorithm = Yf;
          break;
        case 4:
          this.hashAlgorithm = Qf;
          break;
        case 5:
          this.hashAlgorithm = Xf;
          break;
        case 6:
          this.hashAlgorithm = Zf;
          break;
        default:
          throw new Error("Object's stream was not correct for SignedCertificateTimestamp");
      }
      switch (e.getBlock(1)[0]) {
        case 0:
          this.signatureAlgorithm = zf;
          break;
        case 1:
          this.signatureAlgorithm = ed;
          break;
        case 2:
          this.signatureAlgorithm = td;
          break;
        case 3:
          this.signatureAlgorithm = sd;
          break;
        default:
          throw new Error("Object's stream was not correct for SignedCertificateTimestamp");
      }
      const n = e.getUint16();
      if (this.signature = new Uint8Array(e.getBlock(n)).buffer.slice(0), t !== 47 + s + n)
        throw new Error("Object's stream was not correct for SignedCertificateTimestamp");
    }
  }
  toSchema() {
    const e = this.toStream();
    return new Ru({ data: e.stream.buffer });
  }
  toStream() {
    const e = new In();
    e.appendUint16(47 + this.extensions.byteLength + this.signature.byteLength), e.appendChar(this.version), e.appendView(new Uint8Array(this.logID));
    const t = new ArrayBuffer(8), s = new Uint8Array(t), n = Ss(this.timestamp.valueOf(), 8);
    s.set(new Uint8Array(n), 8 - n.byteLength), e.appendView(s), e.appendUint16(this.extensions.byteLength), this.extensions.byteLength && e.appendView(new Uint8Array(this.extensions));
    let i;
    switch (this.hashAlgorithm.toLowerCase()) {
      case qf:
        i = 0;
        break;
      case Wf:
        i = 1;
        break;
      case Gf:
        i = 2;
        break;
      case Yf:
        i = 3;
        break;
      case Qf:
        i = 4;
        break;
      case Xf:
        i = 5;
        break;
      case Zf:
        i = 6;
        break;
      default:
        throw new Error(`Incorrect data for hashAlgorithm: ${this.hashAlgorithm}`);
    }
    e.appendChar(i);
    let a;
    switch (this.signatureAlgorithm.toLowerCase()) {
      case zf:
        a = 0;
        break;
      case ed:
        a = 1;
        break;
      case td:
        a = 2;
        break;
      case sd:
        a = 3;
        break;
      default:
        throw new Error(`Incorrect data for signatureAlgorithm: ${this.signatureAlgorithm}`);
    }
    return e.appendChar(a), e.appendUint16(this.signature.byteLength), e.appendView(new Uint8Array(this.signature)), e;
  }
  toJSON() {
    return {
      version: this.version,
      logID: Qu(this.logID),
      timestamp: this.timestamp,
      extensions: Qu(this.extensions),
      hashAlgorithm: this.hashAlgorithm,
      signatureAlgorithm: this.signatureAlgorithm,
      signature: Qu(this.signature)
    };
  }
  async verify(e, t, s = 0, n = F(!0)) {
    const i = xh(xu(this.logID));
    let a = null;
    const l = new In();
    for (const b of e)
      if (b.log_id === i) {
        a = b.key;
        break;
      }
    if (!a)
      throw new Error(`Public key not found for CT with logId: ${i}`);
    const c = Ja(fc(a)), h = Xe.fromBER(c);
    l.appendChar(0), l.appendChar(0);
    const m = new ArrayBuffer(8), g = new Uint8Array(m), d = Ss(this.timestamp.valueOf(), 8);
    return g.set(new Uint8Array(d), 8 - d.byteLength), l.appendView(g), l.appendUint16(s), s === 0 && l.appendUint24(t.byteLength), l.appendView(new Uint8Array(t)), l.appendUint16(this.extensions.byteLength), this.extensions.byteLength !== 0 && l.appendView(new Uint8Array(this.extensions)), n.verifyWithPublicKey(l.buffer.slice(0, l.length), new I({ valueHex: this.signature }), h, { algorithmId: u }, "SHA-256");
  }
}
Mt.CLASS_NAME = "SignedCertificateTimestamp";
const Tc = "timestamps";
class Wu extends k {
  constructor(e = {}) {
    super(), this.timestamps = r(e, Tc, Wu.defaultValues(Tc)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Tc:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Tc:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    var t;
    const s = r(e, "names", {});
    return (t = s.optional) !== null && t !== void 0 || (s.optional = !1), new I({
      name: s.blockName || "SignedCertificateTimestampList",
      optional: s.optional
    });
  }
  fromSchema(e) {
    if (!(e instanceof I))
      throw new Error("Object's schema was not verified against input data for SignedCertificateTimestampList");
    const t = new In({
      stream: new ge({
        buffer: e.valueBlock.valueHex
      })
    });
    if (t.getUint16() !== t.length)
      throw new Error("Object's schema was not verified against input data for SignedCertificateTimestampList");
    for (; t.length; )
      this.timestamps.push(new Mt({ stream: t }));
  }
  toSchema() {
    const e = new In();
    let t = 0;
    const s = [];
    for (const n of this.timestamps) {
      const i = n.toStream();
      s.push(i), t += i.stream.buffer.byteLength;
    }
    e.appendUint16(t);
    for (const n of s)
      e.appendView(n.stream.view);
    return new I({ valueHex: e.stream.buffer.slice(0) });
  }
  toJSON() {
    return {
      timestamps: Array.from(this.timestamps, (e) => e.toJSON())
    };
  }
}
Wu.CLASS_NAME = "SignedCertificateTimestampList";
const Zo = "attributes", sy = [
  Zo
];
class bc extends k {
  constructor(e = {}) {
    super(), this.attributes = r(e, Zo, bc.defaultValues(Zo)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Zo:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.attributes || u,
          value: le.schema()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, sy);
    const t = N(e, e, bc.schema({
      names: {
        attributes: Zo
      }
    }));
    p.assertSchema(t, this.className), this.attributes = Array.from(t.result.attributes, (s) => new le({ schema: s }));
  }
  toSchema() {
    return new f({
      value: Array.from(this.attributes, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      attributes: Array.from(this.attributes, (e) => e.toJSON())
    };
  }
}
bc.CLASS_NAME = "SubjectDirectoryAttributes";
class de {
  static getItems() {
    return this.types || (this.types = {}, de.register(Am, "SubjectAltName", Fa), de.register(pm, "IssuerAltName", Fa), de.register(vf, "AuthorityKeyIdentifier", bn), de.register(wf, "BasicConstraints", Fi), de.register(vw, "MicrosoftCaVersion", yc), de.register(Cm, "CertificatePolicies", qa), de.register(fw, "CertificatePoliciesMicrosoft", qa), de.register(yw, "MicrosoftCertTemplateV2", Ta), de.register(Nm, "CRLDistributionPoints", Wa), de.register(yf, "FreshestCRL", Wa), de.register(dw, "ExtKeyUsage", vc), de.register(km, "CertificateIssuer", xe), de.register(Sf, "AuthorityInfoAccess", Ga), de.register(gw, "SubjectInfoAccess", Ga), de.register(bm, "IssuingDistributionPoint", De), de.register(Em, "NameConstraints", Ua), de.register(Im, "PolicyConstraints", Ha), de.register(Bm, "PolicyMappings", Sc), de.register(ow, "PrivateKeyUsagePeriod", Ma), de.register(Sw, "QCStatements", Ac), de.register(ww, "SignedCertificateTimestampList", Wu), de.register(iw, "SubjectDirectoryAttributes", bc)), this.types;
  }
  static fromBER(e, t) {
    const s = Oe(t);
    if (s.offset === -1)
      return null;
    const n = this.find(e);
    if (n)
      try {
        return new n.type({ schema: s.result });
      } catch {
        const i = new n.type();
        return i.parsingError = `Incorrectly formatted value of extension ${n.name} (${e})`, i;
      }
    return s.result;
  }
  static find(e) {
    return this.getItems()[e] || null;
  }
  static register(e, t, s) {
    this.getItems()[e] = { name: t, type: s };
  }
}
const zo = "extnID", Ws = "critical", el = "extnValue", Dc = "parsedValue", ny = [
  zo,
  Ws,
  el
];
class Ve extends k {
  get parsedValue() {
    if (this._parsedValue === void 0) {
      const e = de.fromBER(this.extnID, this.extnValue.valueBlock.valueHexView);
      this._parsedValue = e;
    }
    return this._parsedValue || void 0;
  }
  set parsedValue(e) {
    this._parsedValue = e;
  }
  constructor(e = {}) {
    super(), this.extnID = r(e, zo, Ve.defaultValues(zo)), this.critical = r(e, Ws, Ve.defaultValues(Ws)), el in e ? this.extnValue = new I({ valueHex: e.extnValue }) : this.extnValue = Ve.defaultValues(el), Dc in e && (this.parsedValue = r(e, Dc, Ve.defaultValues(Dc))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case zo:
        return u;
      case Ws:
        return !1;
      case el:
        return new I();
      case Dc:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.extnID || u }),
        new Ft({
          name: t.critical || u,
          optional: !0
        }),
        new I({ name: t.extnValue || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, ny);
    const t = N(e, e, Ve.schema({
      names: {
        extnID: zo,
        critical: Ws,
        extnValue: el
      }
    }));
    p.assertSchema(t, this.className), this.extnID = t.result.extnID.valueBlock.toString(), Ws in t.result && (this.critical = t.result.critical.valueBlock.value), this.extnValue = t.result.extnValue;
  }
  toSchema() {
    const e = [];
    return e.push(new T({ value: this.extnID })), this.critical !== Ve.defaultValues(Ws) && e.push(new Ft({ value: this.critical })), e.push(this.extnValue), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      extnID: this.extnID,
      extnValue: this.extnValue.toJSON()
    };
    return this.critical !== Ve.defaultValues(Ws) && (e.critical = this.critical), this.parsedValue && this.parsedValue.toJSON && (e.parsedValue = this.parsedValue.toJSON()), e;
  }
}
Ve.CLASS_NAME = "Extension";
const tl = "extensions", iy = [
  tl
];
class ke extends k {
  constructor(e = {}) {
    super(), this.extensions = r(e, tl, ke.defaultValues(tl)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case tl:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}, t = !1) {
    const s = r(e, "names", {});
    return new f({
      optional: t,
      name: s.blockName || u,
      value: [
        new J({
          name: s.extensions || u,
          value: Ve.schema(s.extension || {})
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, iy);
    const t = N(e, e, ke.schema({
      names: {
        extensions: tl
      }
    }));
    p.assertSchema(t, this.className), this.extensions = Array.from(t.result.extensions, (s) => new Ve({ schema: s }));
  }
  toSchema() {
    return new f({
      value: Array.from(this.extensions, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      extensions: this.extensions.map((e) => e.toJSON())
    };
  }
}
ke.CLASS_NAME = "Extensions";
const sl = "issuer", nl = "serialNumber", Zn = "issuerUID", ry = [
  sl,
  nl,
  Zn
];
class Qe extends k {
  constructor(e = {}) {
    super(), this.issuer = r(e, sl, Qe.defaultValues(sl)), this.serialNumber = r(e, nl, Qe.defaultValues(nl)), Zn in e && (this.issuerUID = r(e, Zn, Qe.defaultValues(Zn))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case sl:
        return new xe();
      case nl:
        return new S();
      case Zn:
        return new G();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        xe.schema(t.issuer || {}),
        new S({ name: t.serialNumber || u }),
        new G({
          optional: !0,
          name: t.issuerUID || u
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, ry);
    const t = N(e, e, Qe.schema({
      names: {
        issuer: {
          names: {
            blockName: sl
          }
        },
        serialNumber: nl,
        issuerUID: Zn
      }
    }));
    p.assertSchema(t, this.className), this.issuer = new xe({ schema: t.result.issuer }), this.serialNumber = t.result.serialNumber, Zn in t.result && (this.issuerUID = t.result.issuerUID);
  }
  toSchema() {
    const e = new f({
      value: [
        this.issuer.toSchema(),
        this.serialNumber
      ]
    });
    return this.issuerUID && e.valueBlock.value.push(this.issuerUID), e;
  }
  toJSON() {
    const e = {
      issuer: this.issuer.toJSON(),
      serialNumber: this.serialNumber.toJSON()
    };
    return this.issuerUID && (e.issuerUID = this.issuerUID.toJSON()), e;
  }
}
Qe.CLASS_NAME = "IssuerSerial";
const il = "version", zn = "baseCertificateID", ei = "subjectName", rl = "issuer", al = "signature", ol = "serialNumber", ll = "attrCertValidityPeriod", cl = "attributes", ti = "issuerUniqueID", si = "extensions", ay = [
  il,
  zn,
  ei,
  rl,
  al,
  ol,
  ll,
  cl,
  ti,
  si
];
class Ke extends k {
  constructor(e = {}) {
    super(), this.version = r(e, il, Ke.defaultValues(il)), zn in e && (this.baseCertificateID = r(e, zn, Ke.defaultValues(zn))), ei in e && (this.subjectName = r(e, ei, Ke.defaultValues(ei))), this.issuer = r(e, rl, Ke.defaultValues(rl)), this.signature = r(e, al, Ke.defaultValues(al)), this.serialNumber = r(e, ol, Ke.defaultValues(ol)), this.attrCertValidityPeriod = r(e, ll, Ke.defaultValues(ll)), this.attributes = r(e, cl, Ke.defaultValues(cl)), ti in e && (this.issuerUniqueID = r(e, ti, Ke.defaultValues(ti))), si in e && (this.extensions = r(e, si, Ke.defaultValues(si))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case il:
        return 0;
      case zn:
        return new Qe();
      case ei:
        return new xe();
      case rl:
        return new xe();
      case al:
        return new v();
      case ol:
        return new S();
      case ll:
        return new Rt();
      case cl:
        return [];
      case ti:
        return new G();
      case si:
        return new ke();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || u }),
        new he({
          value: [
            new w({
              name: t.baseCertificateID || u,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              },
              value: Qe.schema().valueBlock.value
            }),
            new w({
              name: t.subjectName || u,
              idBlock: {
                tagClass: 3,
                tagNumber: 1
              },
              value: xe.schema().valueBlock.value
            })
          ]
        }),
        xe.schema({
          names: {
            blockName: t.issuer || u
          }
        }),
        v.schema(t.signature || {}),
        new S({ name: t.serialNumber || u }),
        Rt.schema(t.attrCertValidityPeriod || {}),
        new f({
          name: t.attributes || u,
          value: [
            new J({
              value: le.schema()
            })
          ]
        }),
        new G({
          optional: !0,
          name: t.issuerUniqueID || u
        }),
        ke.schema(t.extensions || {}, !0)
      ]
    });
  }
  fromSchema(e) {
    C(e, ay);
    const t = N(e, e, Ke.schema({
      names: {
        version: il,
        baseCertificateID: zn,
        subjectName: ei,
        issuer: rl,
        signature: {
          names: {
            blockName: al
          }
        },
        serialNumber: ol,
        attrCertValidityPeriod: {
          names: {
            blockName: ll
          }
        },
        attributes: cl,
        issuerUniqueID: ti,
        extensions: {
          names: {
            blockName: si
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, zn in t.result && (this.baseCertificateID = new Qe({
      schema: new f({
        value: t.result.baseCertificateID.valueBlock.value
      })
    })), ei in t.result && (this.subjectName = new xe({
      schema: new f({
        value: t.result.subjectName.valueBlock.value
      })
    })), this.issuer = t.result.issuer, this.signature = new v({ schema: t.result.signature }), this.serialNumber = t.result.serialNumber, this.attrCertValidityPeriod = new Rt({ schema: t.result.attrCertValidityPeriod }), this.attributes = Array.from(t.result.attributes.valueBlock.value, (s) => new le({ schema: s })), ti in t.result && (this.issuerUniqueID = t.result.issuerUniqueID), si in t.result && (this.extensions = new ke({ schema: t.result.extensions }));
  }
  toSchema() {
    const e = new f({
      value: [new S({ value: this.version })]
    });
    return this.baseCertificateID && e.valueBlock.value.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: this.baseCertificateID.toSchema().valueBlock.value
    })), this.subjectName && e.valueBlock.value.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: this.subjectName.toSchema().valueBlock.value
    })), e.valueBlock.value.push(this.issuer.toSchema()), e.valueBlock.value.push(this.signature.toSchema()), e.valueBlock.value.push(this.serialNumber), e.valueBlock.value.push(this.attrCertValidityPeriod.toSchema()), e.valueBlock.value.push(new f({
      value: Array.from(this.attributes, (t) => t.toSchema())
    })), this.issuerUniqueID && e.valueBlock.value.push(this.issuerUniqueID), this.extensions && e.valueBlock.value.push(this.extensions.toSchema()), e;
  }
  toJSON() {
    const e = {
      version: this.version
    };
    return this.baseCertificateID && (e.baseCertificateID = this.baseCertificateID.toJSON()), this.subjectName && (e.subjectName = this.subjectName.toJSON()), e.issuer = this.issuer.toJSON(), e.signature = this.signature.toJSON(), e.serialNumber = this.serialNumber.toJSON(), e.attrCertValidityPeriod = this.attrCertValidityPeriod.toJSON(), e.attributes = Array.from(this.attributes, (t) => t.toJSON()), this.issuerUniqueID && (e.issuerUniqueID = this.issuerUniqueID.toJSON()), this.extensions && (e.extensions = this.extensions.toJSON()), e;
  }
}
Ke.CLASS_NAME = "AttributeCertificateInfoV1";
const ul = "acinfo", hl = "signatureAlgorithm", fl = "signatureValue", oy = [
  ul,
  fl,
  hl
];
class us extends k {
  constructor(e = {}) {
    super(), this.acinfo = r(e, ul, us.defaultValues(ul)), this.signatureAlgorithm = r(e, hl, us.defaultValues(hl)), this.signatureValue = r(e, fl, us.defaultValues(fl)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case ul:
        return new Ke();
      case hl:
        return new v();
      case fl:
        return new G();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        Ke.schema(t.acinfo || {}),
        v.schema(t.signatureAlgorithm || {}),
        new G({ name: t.signatureValue || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, oy);
    const t = N(e, e, us.schema({
      names: {
        acinfo: {
          names: {
            blockName: ul
          }
        },
        signatureAlgorithm: {
          names: {
            blockName: hl
          }
        },
        signatureValue: fl
      }
    }));
    p.assertSchema(t, this.className), this.acinfo = new Ke({ schema: t.result.acinfo }), this.signatureAlgorithm = new v({ schema: t.result.signatureAlgorithm }), this.signatureValue = t.result.signatureValue;
  }
  toSchema() {
    return new f({
      value: [
        this.acinfo.toSchema(),
        this.signatureAlgorithm.toSchema(),
        this.signatureValue
      ]
    });
  }
  toJSON() {
    return {
      acinfo: this.acinfo.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
  }
}
us.CLASS_NAME = "AttributeCertificateV1";
const dl = "digestedObjectType", ni = "otherObjectTypeID", ml = "digestAlgorithm", gl = "objectDigest", ly = [
  dl,
  ni,
  ml,
  gl
];
class ut extends k {
  constructor(e = {}) {
    super(), this.digestedObjectType = r(e, dl, ut.defaultValues(dl)), ni in e && (this.otherObjectTypeID = r(e, ni, ut.defaultValues(ni))), this.digestAlgorithm = r(e, ml, ut.defaultValues(ml)), this.objectDigest = r(e, gl, ut.defaultValues(gl)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case dl:
        return new tr();
      case ni:
        return new T();
      case ml:
        return new v();
      case gl:
        return new G();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new tr({ name: t.digestedObjectType || u }),
        new T({
          optional: !0,
          name: t.otherObjectTypeID || u
        }),
        v.schema(t.digestAlgorithm || {}),
        new G({ name: t.objectDigest || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, ly);
    const t = N(e, e, ut.schema({
      names: {
        digestedObjectType: dl,
        otherObjectTypeID: ni,
        digestAlgorithm: {
          names: {
            blockName: ml
          }
        },
        objectDigest: gl
      }
    }));
    p.assertSchema(t, this.className), this.digestedObjectType = t.result.digestedObjectType, ni in t.result && (this.otherObjectTypeID = t.result.otherObjectTypeID), this.digestAlgorithm = new v({ schema: t.result.digestAlgorithm }), this.objectDigest = t.result.objectDigest;
  }
  toSchema() {
    const e = new f({
      value: [this.digestedObjectType]
    });
    return this.otherObjectTypeID && e.valueBlock.value.push(this.otherObjectTypeID), e.valueBlock.value.push(this.digestAlgorithm.toSchema()), e.valueBlock.value.push(this.objectDigest), e;
  }
  toJSON() {
    const e = {
      digestedObjectType: this.digestedObjectType.toJSON(),
      digestAlgorithm: this.digestAlgorithm.toJSON(),
      objectDigest: this.objectDigest.toJSON()
    };
    return this.otherObjectTypeID && (e.otherObjectTypeID = this.otherObjectTypeID.toJSON()), e;
  }
}
ut.CLASS_NAME = "ObjectDigestInfo";
const ii = "issuerName", ri = "baseCertificateID", ai = "objectDigestInfo", cy = [
  ii,
  ri,
  ai
];
class En extends k {
  constructor(e = {}) {
    super(), ii in e && (this.issuerName = r(e, ii, En.defaultValues(ii))), ri in e && (this.baseCertificateID = r(e, ri, En.defaultValues(ri))), ai in e && (this.objectDigestInfo = r(e, ai, En.defaultValues(ai))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case ii:
        return new xe();
      case ri:
        return new Qe();
      case ai:
        return new ut();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        xe.schema({
          names: {
            blockName: t.issuerName
          }
        }, !0),
        new w({
          optional: !0,
          name: t.baseCertificateID || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: Qe.schema().valueBlock.value
        }),
        new w({
          optional: !0,
          name: t.objectDigestInfo || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: ut.schema().valueBlock.value
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, cy);
    const t = N(e, e, En.schema({
      names: {
        issuerName: ii,
        baseCertificateID: ri,
        objectDigestInfo: ai
      }
    }));
    p.assertSchema(t, this.className), ii in t.result && (this.issuerName = new xe({ schema: t.result.issuerName })), ri in t.result && (this.baseCertificateID = new Qe({
      schema: new f({
        value: t.result.baseCertificateID.valueBlock.value
      })
    })), ai in t.result && (this.objectDigestInfo = new ut({
      schema: new f({
        value: t.result.objectDigestInfo.valueBlock.value
      })
    }));
  }
  toSchema() {
    const e = new f();
    return this.issuerName && e.valueBlock.value.push(this.issuerName.toSchema()), this.baseCertificateID && e.valueBlock.value.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: this.baseCertificateID.toSchema().valueBlock.value
    })), this.objectDigestInfo && e.valueBlock.value.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: this.objectDigestInfo.toSchema().valueBlock.value
    })), e;
  }
  toJSON() {
    const e = {};
    return this.issuerName && (e.issuerName = this.issuerName.toJSON()), this.baseCertificateID && (e.baseCertificateID = this.baseCertificateID.toJSON()), this.objectDigestInfo && (e.objectDigestInfo = this.objectDigestInfo.toJSON()), e;
  }
}
En.CLASS_NAME = "V2Form";
const oi = "baseCertificateID", li = "entityName", ci = "objectDigestInfo", uy = [
  oi,
  li,
  ci
];
class hs extends k {
  constructor(e = {}) {
    super(), oi in e && (this.baseCertificateID = r(e, oi, hs.defaultValues(oi))), li in e && (this.entityName = r(e, li, hs.defaultValues(li))), ci in e && (this.objectDigestInfo = r(e, ci, hs.defaultValues(ci))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case oi:
        return new Qe();
      case li:
        return new xe();
      case ci:
        return new ut();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new w({
          optional: !0,
          name: t.baseCertificateID || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: Qe.schema().valueBlock.value
        }),
        new w({
          optional: !0,
          name: t.entityName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: xe.schema().valueBlock.value
        }),
        new w({
          optional: !0,
          name: t.objectDigestInfo || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: ut.schema().valueBlock.value
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, uy);
    const t = N(e, e, hs.schema({
      names: {
        baseCertificateID: oi,
        entityName: li,
        objectDigestInfo: ci
      }
    }));
    p.assertSchema(t, this.className), oi in t.result && (this.baseCertificateID = new Qe({
      schema: new f({
        value: t.result.baseCertificateID.valueBlock.value
      })
    })), li in t.result && (this.entityName = new xe({
      schema: new f({
        value: t.result.entityName.valueBlock.value
      })
    })), ci in t.result && (this.objectDigestInfo = new ut({
      schema: new f({
        value: t.result.objectDigestInfo.valueBlock.value
      })
    }));
  }
  toSchema() {
    const e = new f();
    return this.baseCertificateID && e.valueBlock.value.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: this.baseCertificateID.toSchema().valueBlock.value
    })), this.entityName && e.valueBlock.value.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: this.entityName.toSchema().valueBlock.value
    })), this.objectDigestInfo && e.valueBlock.value.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 2
      },
      value: this.objectDigestInfo.toSchema().valueBlock.value
    })), e;
  }
  toJSON() {
    const e = {};
    return this.baseCertificateID && (e.baseCertificateID = this.baseCertificateID.toJSON()), this.entityName && (e.entityName = this.entityName.toJSON()), this.objectDigestInfo && (e.objectDigestInfo = this.objectDigestInfo.toJSON()), e;
  }
}
hs.CLASS_NAME = "Holder";
const wl = "version", yl = "holder", vl = "issuer", Sl = "signature", Al = "serialNumber", pl = "attrCertValidityPeriod", bl = "attributes", ui = "issuerUniqueID", hi = "extensions", hy = [
  wl,
  yl,
  vl,
  Sl,
  Al,
  pl,
  bl,
  ui,
  hi
];
class qe extends k {
  constructor(e = {}) {
    super(), this.version = r(e, wl, qe.defaultValues(wl)), this.holder = r(e, yl, qe.defaultValues(yl)), this.issuer = r(e, vl, qe.defaultValues(vl)), this.signature = r(e, Sl, qe.defaultValues(Sl)), this.serialNumber = r(e, Al, qe.defaultValues(Al)), this.attrCertValidityPeriod = r(e, pl, qe.defaultValues(pl)), this.attributes = r(e, bl, qe.defaultValues(bl)), ui in e && (this.issuerUniqueID = r(e, ui, qe.defaultValues(ui))), hi in e && (this.extensions = r(e, hi, qe.defaultValues(hi))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case wl:
        return 1;
      case yl:
        return new hs();
      case vl:
        return {};
      case Sl:
        return new v();
      case Al:
        return new S();
      case pl:
        return new Rt();
      case bl:
        return [];
      case ui:
        return new G();
      case hi:
        return new ke();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || u }),
        hs.schema(t.holder || {}),
        new he({
          value: [
            xe.schema({
              names: {
                blockName: t.issuer || u
              }
            }),
            new w({
              name: t.issuer || u,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              },
              value: En.schema().valueBlock.value
            })
          ]
        }),
        v.schema(t.signature || {}),
        new S({ name: t.serialNumber || u }),
        Rt.schema(t.attrCertValidityPeriod || {}),
        new f({
          name: t.attributes || u,
          value: [
            new J({
              value: le.schema()
            })
          ]
        }),
        new G({
          optional: !0,
          name: t.issuerUniqueID || u
        }),
        ke.schema(t.extensions || {}, !0)
      ]
    });
  }
  fromSchema(e) {
    C(e, hy);
    const t = N(e, e, qe.schema({
      names: {
        version: wl,
        holder: {
          names: {
            blockName: yl
          }
        },
        issuer: vl,
        signature: {
          names: {
            blockName: Sl
          }
        },
        serialNumber: Al,
        attrCertValidityPeriod: {
          names: {
            blockName: pl
          }
        },
        attributes: bl,
        issuerUniqueID: ui,
        extensions: {
          names: {
            blockName: hi
          }
        }
      }
    }));
    switch (p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, this.holder = new hs({ schema: t.result.holder }), t.result.issuer.idBlock.tagClass) {
      case 3:
        this.issuer = new En({
          schema: new f({
            value: t.result.issuer.valueBlock.value
          })
        });
        break;
      case 1:
      default:
        throw new Error("Incorrect value for 'issuer' in AttributeCertificateInfoV2");
    }
    this.signature = new v({ schema: t.result.signature }), this.serialNumber = t.result.serialNumber, this.attrCertValidityPeriod = new Rt({ schema: t.result.attrCertValidityPeriod }), this.attributes = Array.from(t.result.attributes.valueBlock.value, (s) => new le({ schema: s })), ui in t.result && (this.issuerUniqueID = t.result.issuerUniqueID), hi in t.result && (this.extensions = new ke({ schema: t.result.extensions }));
  }
  toSchema() {
    const e = new f({
      value: [
        new S({ value: this.version }),
        this.holder.toSchema(),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: this.issuer.toSchema().valueBlock.value
        }),
        this.signature.toSchema(),
        this.serialNumber,
        this.attrCertValidityPeriod.toSchema(),
        new f({
          value: Array.from(this.attributes, (t) => t.toSchema())
        })
      ]
    });
    return this.issuerUniqueID && e.valueBlock.value.push(this.issuerUniqueID), this.extensions && e.valueBlock.value.push(this.extensions.toSchema()), e;
  }
  toJSON() {
    const e = {
      version: this.version,
      holder: this.holder.toJSON(),
      issuer: this.issuer.toJSON(),
      signature: this.signature.toJSON(),
      serialNumber: this.serialNumber.toJSON(),
      attrCertValidityPeriod: this.attrCertValidityPeriod.toJSON(),
      attributes: Array.from(this.attributes, (t) => t.toJSON())
    };
    return this.issuerUniqueID && (e.issuerUniqueID = this.issuerUniqueID.toJSON()), this.extensions && (e.extensions = this.extensions.toJSON()), e;
  }
}
qe.CLASS_NAME = "AttributeCertificateInfoV2";
const kl = "acinfo", El = "signatureAlgorithm", Nl = "signatureValue", fy = [
  kl,
  El,
  Nl
];
class ht extends k {
  constructor(e = {}) {
    super(), this.acinfo = r(e, kl, ht.defaultValues(kl)), this.signatureAlgorithm = r(e, El, ht.defaultValues(El)), this.signatureValue = r(e, Nl, ht.defaultValues(Nl)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case kl:
        return new qe();
      case El:
        return new v();
      case Nl:
        return new G();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        qe.schema(t.acinfo || {}),
        v.schema(t.signatureAlgorithm || {}),
        new G({ name: t.signatureValue || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, fy);
    const t = N(e, e, ht.schema({
      names: {
        acinfo: {
          names: {
            blockName: kl
          }
        },
        signatureAlgorithm: {
          names: {
            blockName: El
          }
        },
        signatureValue: Nl
      }
    }));
    p.assertSchema(t, this.className), this.acinfo = new qe({ schema: t.result.acinfo }), this.signatureAlgorithm = new v({ schema: t.result.signatureAlgorithm }), this.signatureValue = t.result.signatureValue;
  }
  toSchema() {
    return new f({
      value: [
        this.acinfo.toSchema(),
        this.signatureAlgorithm.toSchema(),
        this.signatureValue
      ]
    });
  }
  toJSON() {
    return {
      acinfo: this.acinfo.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
  }
}
ht.CLASS_NAME = "AttributeCertificateV2";
const fi = "contentType", Er = "content", dy = [fi, Er];
class oe extends k {
  constructor(e = {}) {
    super(), this.contentType = r(e, fi, oe.defaultValues(fi)), this.content = r(e, Er, oe.defaultValues(Er)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case fi:
        return u;
      case Er:
        return new K();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case fi:
        return typeof t == "string" && t === this.defaultValues(fi);
      case Er:
        return t instanceof K;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return "optional" in t || (t.optional = !1), new f({
      name: t.blockName || "ContentInfo",
      optional: t.optional,
      value: [
        new T({ name: t.contentType || fi }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new K({ name: t.content || Er })]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, dy);
    const t = N(e, e, oe.schema());
    p.assertSchema(t, this.className), this.contentType = t.result.contentType.valueBlock.toString(), this.content = t.result.content;
  }
  toSchema() {
    return new f({
      value: [
        new T({ value: this.contentType }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [this.content]
        })
      ]
    });
  }
  toJSON() {
    const e = {
      contentType: this.contentType
    };
    return this.content instanceof K || (e.content = this.content.toJSON()), e;
  }
}
oe.CLASS_NAME = "ContentInfo";
oe.DATA = Af;
oe.SIGNED_DATA = Vm;
oe.ENVELOPED_DATA = xm;
oe.ENCRYPTED_DATA = Om;
const uh = "type", hh = "value", Lh = "utcTimeName", Uh = "generalTimeName", my = [Lh, Uh];
var nd;
(function(o) {
  o[o.UTCTime = 0] = "UTCTime", o[o.GeneralizedTime = 1] = "GeneralizedTime", o[o.empty = 2] = "empty";
})(nd || (nd = {}));
class Ce extends k {
  constructor(e = {}) {
    super(), this.type = r(e, uh, Ce.defaultValues(uh)), this.value = r(e, hh, Ce.defaultValues(hh)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case uh:
        return 0;
      case hh:
        return new Date(0, 0, 0);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}, t = !1) {
    const s = r(e, "names", {});
    return new he({
      optional: t,
      value: [
        new ja({ name: s.utcTimeName || u }),
        new ue({ name: s.generalTimeName || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, my);
    const t = N(e, e, Ce.schema({
      names: {
        utcTimeName: Lh,
        generalTimeName: Uh
      }
    }));
    p.assertSchema(t, this.className), Lh in t.result && (this.type = 0, this.value = t.result.utcTimeName.toDate()), Uh in t.result && (this.type = 1, this.value = t.result.generalTimeName.toDate());
  }
  toSchema() {
    return this.type === 0 ? new ja({ valueDate: this.value }) : this.type === 1 ? new ue({ valueDate: this.value }) : {};
  }
  toJSON() {
    return {
      type: this.type,
      value: this.value
    };
  }
}
Ce.CLASS_NAME = "Time";
const fh = "tbs", Gs = "version", eu = "serialNumber", tu = "signature", su = "issuer", nu = "notBefore", iu = "notAfter", ru = "subject", au = "subjectPublicKeyInfo", Cl = "issuerUniqueID", Bl = "subjectUniqueID", Il = "extensions", Vl = "signatureAlgorithm", xl = "signatureValue", dt = "tbsCertificate", Tu = `${dt}.${Gs}`, pf = `${dt}.${eu}`, bf = `${dt}.${tu}`, kf = `${dt}.${su}`, Du = `${dt}.${nu}`, Pu = `${dt}.${iu}`, Ef = `${dt}.${ru}`, Nf = `${dt}.${au}`, Lu = `${dt}.${Cl}`, Uu = `${dt}.${Bl}`, cc = `${dt}.${Il}`, gy = [
  dt,
  Tu,
  pf,
  bf,
  kf,
  Du,
  Pu,
  Ef,
  Nf,
  Lu,
  Uu,
  cc,
  Vl,
  xl
];
function wy(o = {}) {
  const e = r(o, "names", {});
  return new f({
    name: e.blockName || dt,
    value: [
      new w({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [
          new S({ name: e.tbsCertificateVersion || Tu })
        ]
      }),
      new S({ name: e.tbsCertificateSerialNumber || pf }),
      v.schema(e.signature || {
        names: {
          blockName: bf
        }
      }),
      re.schema(e.issuer || {
        names: {
          blockName: kf
        }
      }),
      new f({
        name: e.tbsCertificateValidity || "tbsCertificate.validity",
        value: [
          Ce.schema(e.notBefore || {
            names: {
              utcTimeName: Du,
              generalTimeName: Du
            }
          }),
          Ce.schema(e.notAfter || {
            names: {
              utcTimeName: Pu,
              generalTimeName: Pu
            }
          })
        ]
      }),
      re.schema(e.subject || {
        names: {
          blockName: Ef
        }
      }),
      Xe.schema(e.subjectPublicKeyInfo || {
        names: {
          blockName: Nf
        }
      }),
      new M({
        name: e.tbsCertificateIssuerUniqueID || Lu,
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        }
      }),
      new M({
        name: e.tbsCertificateSubjectUniqueID || Uu,
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        }
      }),
      new w({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 3
        },
        value: [ke.schema(e.extensions || {
          names: {
            blockName: cc
          }
        })]
      })
    ]
  });
}
class ee extends k {
  get tbs() {
    return L.toArrayBuffer(this.tbsView);
  }
  set tbs(e) {
    this.tbsView = new Uint8Array(e);
  }
  constructor(e = {}) {
    super(), this.tbsView = new Uint8Array(r(e, fh, ee.defaultValues(fh))), this.version = r(e, Gs, ee.defaultValues(Gs)), this.serialNumber = r(e, eu, ee.defaultValues(eu)), this.signature = r(e, tu, ee.defaultValues(tu)), this.issuer = r(e, su, ee.defaultValues(su)), this.notBefore = r(e, nu, ee.defaultValues(nu)), this.notAfter = r(e, iu, ee.defaultValues(iu)), this.subject = r(e, ru, ee.defaultValues(ru)), this.subjectPublicKeyInfo = r(e, au, ee.defaultValues(au)), Cl in e && (this.issuerUniqueID = r(e, Cl, ee.defaultValues(Cl))), Bl in e && (this.subjectUniqueID = r(e, Bl, ee.defaultValues(Bl))), Il in e && (this.extensions = r(e, Il, ee.defaultValues(Il))), this.signatureAlgorithm = r(e, Vl, ee.defaultValues(Vl)), this.signatureValue = r(e, xl, ee.defaultValues(xl)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case fh:
        return be;
      case Gs:
        return 0;
      case eu:
        return new S();
      case tu:
        return new v();
      case su:
        return new re();
      case nu:
        return new Ce();
      case iu:
        return new Ce();
      case ru:
        return new re();
      case au:
        return new Xe();
      case Cl:
        return be;
      case Bl:
        return be;
      case Il:
        return [];
      case Vl:
        return new v();
      case xl:
        return new G();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        wy(t.tbsCertificate),
        v.schema(t.signatureAlgorithm || {
          names: {
            blockName: Vl
          }
        }),
        new G({ name: t.signatureValue || xl })
      ]
    });
  }
  fromSchema(e) {
    C(e, gy);
    const t = N(e, e, ee.schema({
      names: {
        tbsCertificate: {
          names: {
            extensions: {
              names: {
                extensions: cc
              }
            }
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.tbsView = t.result.tbsCertificate.valueBeforeDecodeView, Tu in t.result && (this.version = t.result[Tu].valueBlock.valueDec), this.serialNumber = t.result[pf], this.signature = new v({ schema: t.result[bf] }), this.issuer = new re({ schema: t.result[kf] }), this.notBefore = new Ce({ schema: t.result[Du] }), this.notAfter = new Ce({ schema: t.result[Pu] }), this.subject = new re({ schema: t.result[Ef] }), this.subjectPublicKeyInfo = new Xe({ schema: t.result[Nf] }), Lu in t.result && (this.issuerUniqueID = t.result[Lu].valueBlock.valueHex), Uu in t.result && (this.subjectUniqueID = t.result[Uu].valueBlock.valueHex), cc in t.result && (this.extensions = Array.from(t.result[cc], (s) => new Ve({ schema: s }))), this.signatureAlgorithm = new v({ schema: t.result.signatureAlgorithm }), this.signatureValue = t.result.signatureValue;
  }
  encodeTBS() {
    const e = [];
    return Gs in this && this.version !== ee.defaultValues(Gs) && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [
        new S({ value: this.version })
      ]
    })), e.push(this.serialNumber), e.push(this.signature.toSchema()), e.push(this.issuer.toSchema()), e.push(new f({
      value: [
        this.notBefore.toSchema(),
        this.notAfter.toSchema()
      ]
    })), e.push(this.subject.toSchema()), e.push(this.subjectPublicKeyInfo.toSchema()), this.issuerUniqueID && e.push(new M({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      valueHex: this.issuerUniqueID
    })), this.subjectUniqueID && e.push(new M({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 2
      },
      valueHex: this.subjectUniqueID
    })), this.extensions && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 3
      },
      value: [new f({
        value: Array.from(this.extensions, (t) => t.toSchema())
      })]
    })), new f({
      value: e
    });
  }
  toSchema(e = !1) {
    let t;
    if (e === !1) {
      if (!this.tbsView.byteLength)
        return ee.schema().value[0];
      const s = Oe(this.tbsView);
      p.assert(s, "TBS Certificate"), t = s.result;
    } else
      t = this.encodeTBS();
    return new f({
      value: [
        t,
        this.signatureAlgorithm.toSchema(),
        this.signatureValue
      ]
    });
  }
  toJSON() {
    const e = {
      tbs: H.ToHex(this.tbsView),
      version: this.version,
      serialNumber: this.serialNumber.toJSON(),
      signature: this.signature.toJSON(),
      issuer: this.issuer.toJSON(),
      notBefore: this.notBefore.toJSON(),
      notAfter: this.notAfter.toJSON(),
      subject: this.subject.toJSON(),
      subjectPublicKeyInfo: this.subjectPublicKeyInfo.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
    return Gs in this && this.version !== ee.defaultValues(Gs) && (e.version = this.version), this.issuerUniqueID && (e.issuerUniqueID = H.ToHex(this.issuerUniqueID)), this.subjectUniqueID && (e.subjectUniqueID = H.ToHex(this.subjectUniqueID)), this.extensions && (e.extensions = Array.from(this.extensions, (t) => t.toJSON())), e;
  }
  async getPublicKey(e, t = F(!0)) {
    return t.getPublicKey(this.subjectPublicKeyInfo, this.signatureAlgorithm, e);
  }
  async getKeyHash(e = "SHA-1", t = F(!0)) {
    return t.digest({ name: e }, this.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView);
  }
  async sign(e, t = "SHA-1", s = F(!0)) {
    if (!e)
      throw new Error("Need to provide a private key for signing");
    const n = await s.getSignatureParameters(e, t), i = n.parameters;
    this.signature = n.signatureAlgorithm, this.signatureAlgorithm = n.signatureAlgorithm, this.tbsView = new Uint8Array(this.encodeTBS().toBER());
    const a = await s.signWithPrivateKey(this.tbsView, e, i);
    this.signatureValue = new G({ valueHex: a });
  }
  async verify(e, t = F(!0)) {
    let s;
    if (e ? s = e.subjectPublicKeyInfo : this.issuer.isEqual(this.subject) && (s = this.subjectPublicKeyInfo), !(s instanceof Xe))
      throw new Error("Please provide issuer certificate as a parameter");
    return t.verifyWithPublicKey(this.tbsView, this.signatureValue, s, this.signatureAlgorithm);
  }
}
ee.CLASS_NAME = "Certificate";
function Um(o, e = null) {
  if (e && o.issuer.isEqual(e.issuer) && o.serialNumber.isEqual(e.serialNumber))
    return null;
  let t = !1;
  if (o.extensions) {
    for (const s of o.extensions)
      if (s.extnID === wf && s.parsedValue instanceof Fi && s.parsedValue.cA) {
        t = !0;
        break;
      }
  }
  return t ? o : null;
}
const Nr = "certId", Cr = "certValue", ar = "parsedValue", yy = [
  Nr,
  Cr
];
class $i extends k {
  constructor(e = {}) {
    super(), this.certId = r(e, Nr, $i.defaultValues(Nr)), this.certValue = r(e, Cr, $i.defaultValues(Cr)), ar in e && (this.parsedValue = r(e, ar, $i.defaultValues(ar))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Nr:
        return u;
      case Cr:
        return new K();
      case ar:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Nr:
        return t === u;
      case Cr:
        return t instanceof K;
      case ar:
        return t instanceof Object && Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.id || "id" }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new K({ name: t.value || "value" })]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, yy);
    const t = N(e, e, $i.schema({
      names: {
        id: Nr,
        value: Cr
      }
    }));
    p.assertSchema(t, this.className), this.certId = t.result.certId.valueBlock.toString(), this.certValue = t.result.certValue;
    const s = this.certValue.valueBlock.valueHexView;
    switch (this.certId) {
      case Mf:
        try {
          this.parsedValue = ee.fromBER(s);
        } catch {
          ht.fromBER(s);
        }
        break;
      case _f:
        this.parsedValue = ht.fromBER(s);
        break;
      case pw:
      default:
        throw new Error(`Incorrect CERT_ID value in CertBag: ${this.certId}`);
    }
  }
  toSchema() {
    return ar in this && ("acinfo" in this.parsedValue ? this.certId = _f : this.certId = Mf, this.certValue = new I({ valueHex: this.parsedValue.toSchema().toBER(!1) })), new f({
      value: [
        new T({ value: this.certId }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: ["toSchema" in this.certValue ? this.certValue.toSchema() : this.certValue]
        })
      ]
    });
  }
  toJSON() {
    return {
      certId: this.certId,
      certValue: this.certValue.toJSON()
    };
  }
}
$i.CLASS_NAME = "CertBag";
const Ol = "userCertificate", Br = "revocationDate", di = "crlEntryExtensions", vy = [
  Ol,
  Br,
  di
];
class Ki extends k {
  constructor(e = {}) {
    super(), this.userCertificate = r(e, Ol, Ki.defaultValues(Ol)), this.revocationDate = r(e, Br, Ki.defaultValues(Br)), di in e && (this.crlEntryExtensions = r(e, di, Ki.defaultValues(di))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ol:
        return new S();
      case Br:
        return new Ce();
      case di:
        return new ke();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.userCertificate || Ol }),
        Ce.schema({
          names: {
            utcTimeName: t.revocationDate || Br,
            generalTimeName: t.revocationDate || Br
          }
        }),
        ke.schema({
          names: {
            blockName: t.crlEntryExtensions || di
          }
        }, !0)
      ]
    });
  }
  fromSchema(e) {
    C(e, vy);
    const t = N(e, e, Ki.schema());
    p.assertSchema(t, this.className), this.userCertificate = t.result.userCertificate, this.revocationDate = new Ce({ schema: t.result.revocationDate }), di in t.result && (this.crlEntryExtensions = new ke({ schema: t.result.crlEntryExtensions }));
  }
  toSchema() {
    const e = [
      this.userCertificate,
      this.revocationDate.toSchema()
    ];
    return this.crlEntryExtensions && e.push(this.crlEntryExtensions.toSchema()), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      userCertificate: this.userCertificate.toJSON(),
      revocationDate: this.revocationDate.toJSON()
    };
    return this.crlEntryExtensions && (e.crlEntryExtensions = this.crlEntryExtensions.toJSON()), e;
  }
}
Ki.CLASS_NAME = "RevokedCertificate";
const dh = "tbs", no = "version", mh = "signature", gh = "issuer", wh = "thisUpdate", Pc = "nextUpdate", Lc = "revokedCertificates", Uc = "crlExtensions", Rl = "signatureAlgorithm", Tl = "signatureValue", bs = "tbsCertList", Hu = `${bs}.version`, Cf = `${bs}.signature`, Bf = `${bs}.issuer`, Mu = `${bs}.thisUpdate`, kc = `${bs}.nextUpdate`, _u = `${bs}.revokedCertificates`, $u = `${bs}.extensions`, Sy = [
  bs,
  Hu,
  Cf,
  Bf,
  Mu,
  kc,
  _u,
  $u,
  Rl,
  Tl
];
function Ay(o = {}) {
  const e = r(o, "names", {});
  return new f({
    name: e.blockName || bs,
    value: [
      new S({
        optional: !0,
        name: e.tbsCertListVersion || Hu,
        value: 2
      }),
      v.schema(e.signature || {
        names: {
          blockName: Cf
        }
      }),
      re.schema(e.issuer || {
        names: {
          blockName: Bf
        }
      }),
      Ce.schema(e.tbsCertListThisUpdate || {
        names: {
          utcTimeName: Mu,
          generalTimeName: Mu
        }
      }),
      Ce.schema(e.tbsCertListNextUpdate || {
        names: {
          utcTimeName: kc,
          generalTimeName: kc
        }
      }, !0),
      new f({
        optional: !0,
        value: [
          new J({
            name: e.tbsCertListRevokedCertificates || _u,
            value: new f({
              value: [
                new S(),
                Ce.schema(),
                ke.schema({}, !0)
              ]
            })
          })
        ]
      }),
      new w({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [ke.schema(e.crlExtensions || {
          names: {
            blockName: $u
          }
        })]
      })
    ]
  });
}
const py = [
  vf,
  pm,
  lw,
  cw,
  bm,
  yf,
  Sf,
  uw,
  hw,
  km
];
class Ie extends k {
  get tbs() {
    return L.toArrayBuffer(this.tbsView);
  }
  set tbs(e) {
    this.tbsView = new Uint8Array(e);
  }
  constructor(e = {}) {
    super(), this.tbsView = new Uint8Array(r(e, dh, Ie.defaultValues(dh))), this.version = r(e, no, Ie.defaultValues(no)), this.signature = r(e, mh, Ie.defaultValues(mh)), this.issuer = r(e, gh, Ie.defaultValues(gh)), this.thisUpdate = r(e, wh, Ie.defaultValues(wh)), Pc in e && (this.nextUpdate = r(e, Pc, Ie.defaultValues(Pc))), Lc in e && (this.revokedCertificates = r(e, Lc, Ie.defaultValues(Lc))), Uc in e && (this.crlExtensions = r(e, Uc, Ie.defaultValues(Uc))), this.signatureAlgorithm = r(e, Rl, Ie.defaultValues(Rl)), this.signatureValue = r(e, Tl, Ie.defaultValues(Tl)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case dh:
        return be;
      case no:
        return 0;
      case mh:
        return new v();
      case gh:
        return new re();
      case wh:
        return new Ce();
      case Pc:
        return new Ce();
      case Lc:
        return [];
      case Uc:
        return new ke();
      case Rl:
        return new v();
      case Tl:
        return new G();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || "CertificateList",
      value: [
        Ay(e),
        v.schema(t.signatureAlgorithm || {
          names: {
            blockName: Rl
          }
        }),
        new G({ name: t.signatureValue || Tl })
      ]
    });
  }
  fromSchema(e) {
    C(e, Sy);
    const t = N(e, e, Ie.schema());
    p.assertSchema(t, this.className), this.tbsView = t.result.tbsCertList.valueBeforeDecodeView, Hu in t.result && (this.version = t.result[Hu].valueBlock.valueDec), this.signature = new v({ schema: t.result[Cf] }), this.issuer = new re({ schema: t.result[Bf] }), this.thisUpdate = new Ce({ schema: t.result[Mu] }), kc in t.result && (this.nextUpdate = new Ce({ schema: t.result[kc] })), _u in t.result && (this.revokedCertificates = Array.from(t.result[_u], (s) => new Ki({ schema: s }))), $u in t.result && (this.crlExtensions = new ke({ schema: t.result[$u] })), this.signatureAlgorithm = new v({ schema: t.result.signatureAlgorithm }), this.signatureValue = t.result.signatureValue;
  }
  encodeTBS() {
    const e = [];
    return this.version !== Ie.defaultValues(no) && e.push(new S({ value: this.version })), e.push(this.signature.toSchema()), e.push(this.issuer.toSchema()), e.push(this.thisUpdate.toSchema()), this.nextUpdate && e.push(this.nextUpdate.toSchema()), this.revokedCertificates && e.push(new f({
      value: Array.from(this.revokedCertificates, (t) => t.toSchema())
    })), this.crlExtensions && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [
        this.crlExtensions.toSchema()
      ]
    })), new f({
      value: e
    });
  }
  toSchema(e = !1) {
    let t;
    if (e)
      t = this.encodeTBS();
    else {
      if (!this.tbsView.byteLength)
        return Ie.schema();
      const s = Oe(this.tbsView);
      p.assert(s, "TBS Certificate Revocation List"), t = s.result;
    }
    return new f({
      value: [
        t,
        this.signatureAlgorithm.toSchema(),
        this.signatureValue
      ]
    });
  }
  toJSON() {
    const e = {
      tbs: H.ToHex(this.tbsView),
      version: this.version,
      signature: this.signature.toJSON(),
      issuer: this.issuer.toJSON(),
      thisUpdate: this.thisUpdate.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
    return this.version !== Ie.defaultValues(no) && (e.version = this.version), this.nextUpdate && (e.nextUpdate = this.nextUpdate.toJSON()), this.revokedCertificates && (e.revokedCertificates = Array.from(this.revokedCertificates, (t) => t.toJSON())), this.crlExtensions && (e.crlExtensions = this.crlExtensions.toJSON()), e;
  }
  isCertificateRevoked(e) {
    if (!this.issuer.isEqual(e.issuer) || !this.revokedCertificates)
      return !1;
    for (const t of this.revokedCertificates)
      if (t.userCertificate.isEqual(e.serialNumber))
        return !0;
    return !1;
  }
  async sign(e, t = "SHA-1", s = F(!0)) {
    if (!e)
      throw new Error("Need to provide a private key for signing");
    const n = await s.getSignatureParameters(e, t), { parameters: i } = n;
    this.signature = n.signatureAlgorithm, this.signatureAlgorithm = n.signatureAlgorithm, this.tbsView = new Uint8Array(this.encodeTBS().toBER());
    const a = await s.signWithPrivateKey(this.tbsView, e, i);
    this.signatureValue = new G({ valueHex: a });
  }
  async verify(e = {}, t = F(!0)) {
    let s;
    if (e.issuerCertificate && (s = e.issuerCertificate.subjectPublicKeyInfo, !this.issuer.isEqual(e.issuerCertificate.subject)))
      return !1;
    if (e.publicKeyInfo && (s = e.publicKeyInfo), !s)
      throw new Error("Issuer's certificate must be provided as an input parameter");
    if (this.crlExtensions) {
      for (const n of this.crlExtensions.extensions)
        if (n.critical && !py.includes(n.extnID))
          return !1;
    }
    return t.verifyWithPublicKey(this.tbsView, this.signatureValue, s, this.signatureAlgorithm);
  }
}
Ie.CLASS_NAME = "CertificateRevocationList";
const Ir = "crlId", Vr = "crlValue", io = "parsedValue", by = [
  Ir,
  Vr
];
class Ji extends k {
  constructor(e = {}) {
    super(), this.crlId = r(e, Ir, Ji.defaultValues(Ir)), this.crlValue = r(e, Vr, Ji.defaultValues(Vr)), io in e && (this.parsedValue = r(e, io, Ji.defaultValues(io))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ir:
        return u;
      case Vr:
        return new K();
      case io:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Ir:
        return t === u;
      case Vr:
        return t instanceof K;
      case io:
        return t instanceof Object && Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.id || "id" }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new K({ name: t.value || "value" })]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, by);
    const t = N(e, e, Ji.schema({
      names: {
        id: Ir,
        value: Vr
      }
    }));
    switch (p.assertSchema(t, this.className), this.crlId = t.result.crlId.valueBlock.toString(), this.crlValue = t.result.crlValue, this.crlId) {
      case $f:
        this.parsedValue = Ie.fromBER(this.certValue.valueBlock.valueHex);
        break;
      default:
        throw new Error(`Incorrect CRL_ID value in CRLBag: ${this.crlId}`);
    }
  }
  toSchema() {
    return this.parsedValue && (this.crlId = $f, this.crlValue = new I({ valueHex: this.parsedValue.toSchema().toBER(!1) })), new f({
      value: [
        new T({ value: this.crlId }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [this.crlValue.toSchema()]
        })
      ]
    });
  }
  toJSON() {
    return {
      crlId: this.crlId,
      crlValue: this.crlValue.toJSON()
    };
  }
}
Ji.CLASS_NAME = "CRLBag";
const xr = "version", Or = "encryptedContentInfo", Ys = "unprotectedAttrs", ky = [
  xr,
  Or,
  Ys
];
class Kt extends k {
  constructor(e = {}) {
    super(), this.version = r(e, xr, Kt.defaultValues(xr)), this.encryptedContentInfo = r(e, Or, Kt.defaultValues(Or)), Ys in e && (this.unprotectedAttrs = r(e, Ys, Kt.defaultValues(Ys))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case xr:
        return 0;
      case Or:
        return new Ee();
      case Ys:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case xr:
        return t === 0;
      case Or:
        return Ee.compareWithDefault("contentType", t.contentType) && Ee.compareWithDefault("contentEncryptionAlgorithm", t.contentEncryptionAlgorithm) && Ee.compareWithDefault("encryptedContent", t.encryptedContent);
      case Ys:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || u }),
        Ee.schema(t.encryptedContentInfo || {}),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new J({
              name: t.unprotectedAttrs || u,
              value: le.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, ky);
    const t = N(e, e, Kt.schema({
      names: {
        version: xr,
        encryptedContentInfo: {
          names: {
            blockName: Or
          }
        },
        unprotectedAttrs: Ys
      }
    }));
    p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, this.encryptedContentInfo = new Ee({ schema: t.result.encryptedContentInfo }), Ys in t.result && (this.unprotectedAttrs = Array.from(t.result.unprotectedAttrs, (s) => new le({ schema: s })));
  }
  toSchema() {
    const e = [];
    return e.push(new S({ value: this.version })), e.push(this.encryptedContentInfo.toSchema()), this.unprotectedAttrs && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: Array.from(this.unprotectedAttrs, (t) => t.toSchema())
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      version: this.version,
      encryptedContentInfo: this.encryptedContentInfo.toJSON()
    };
    return this.unprotectedAttrs && (e.unprotectedAttrs = Array.from(this.unprotectedAttrs, (t) => t.toJSON())), e;
  }
  async encrypt(e, t = F(!0)) {
    ie.assert(e, "parameters", "object");
    const s = {
      ...e,
      contentType: "1.2.840.113549.1.7.1"
    };
    this.encryptedContentInfo = await t.encryptEncryptedContentInfo(s);
  }
  async decrypt(e, t = F(!0)) {
    ie.assert(e, "parameters", "object");
    const s = {
      ...e,
      encryptedContentInfo: this.encryptedContentInfo
    };
    return t.decryptEncryptedContentInfo(s);
  }
}
Kt.CLASS_NAME = "EncryptedData";
const mi = "encryptionAlgorithm", Qs = "encryptedData", ro = "parsedValue", Ey = [
  mi,
  Qs
];
class Sn extends k {
  constructor(e = {}) {
    super(), this.encryptionAlgorithm = r(e, mi, Sn.defaultValues(mi)), this.encryptedData = r(e, Qs, Sn.defaultValues(Qs)), ro in e && (this.parsedValue = r(e, ro, Sn.defaultValues(ro))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case mi:
        return new v();
      case Qs:
        return new I();
      case ro:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case mi:
        return v.compareWithDefault("algorithmId", t.algorithmId) && !("algorithmParams" in t);
      case Qs:
        return t.isEqual(Sn.defaultValues(e));
      case ro:
        return t instanceof Object && Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        v.schema(t.encryptionAlgorithm || {
          names: {
            blockName: mi
          }
        }),
        new he({
          value: [
            new I({ name: t.encryptedData || Qs }),
            new I({
              idBlock: {
                isConstructed: !0
              },
              name: t.encryptedData || Qs
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Ey);
    const t = N(e, e, Sn.schema({
      names: {
        encryptionAlgorithm: {
          names: {
            blockName: mi
          }
        },
        encryptedData: Qs
      }
    }));
    p.assertSchema(t, this.className), this.encryptionAlgorithm = new v({ schema: t.result.encryptionAlgorithm }), this.encryptedData = t.result.encryptedData;
  }
  toSchema() {
    return new f({
      value: [
        this.encryptionAlgorithm.toSchema(),
        this.encryptedData
      ]
    });
  }
  toJSON() {
    return {
      encryptionAlgorithm: this.encryptionAlgorithm.toJSON(),
      encryptedData: this.encryptedData.toJSON()
    };
  }
  async parseInternalValues(e, t = F(!0)) {
    const n = await new Kt({
      encryptedContentInfo: new Ee({
        contentEncryptionAlgorithm: this.encryptionAlgorithm,
        encryptedContent: this.encryptedData
      })
    }).decrypt(e, t);
    this.parsedValue = vt.fromBER(n);
  }
  async makeInternalValues(e, t = F(!0)) {
    if (!this.parsedValue)
      throw new Error('Please initialize "parsedValue" first');
    const s = new Kt(), n = {
      ...e,
      contentToEncrypt: this.parsedValue.toSchema().toBER(!1)
    };
    if (await s.encrypt(n, t), !s.encryptedContentInfo.encryptedContent)
      throw new Error("The filed `encryptedContent` in EncryptedContentInfo is empty");
    this.encryptionAlgorithm = s.encryptedContentInfo.contentEncryptionAlgorithm, this.encryptedData = s.encryptedContentInfo.encryptedContent;
  }
}
Sn.CLASS_NAME = "PKCS8ShroudedKeyBag";
const Rr = "secretTypeId", Tr = "secretValue", Ny = [
  Rr,
  Tr
];
class _a extends k {
  constructor(e = {}) {
    super(), this.secretTypeId = r(e, Rr, _a.defaultValues(Rr)), this.secretValue = r(e, Tr, _a.defaultValues(Tr)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Rr:
        return u;
      case Tr:
        return new K();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Rr:
        return t === u;
      case Tr:
        return t instanceof K;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.id || "id" }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new K({ name: t.value || "value" })]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Ny);
    const t = N(e, e, _a.schema({
      names: {
        id: Rr,
        value: Tr
      }
    }));
    p.assertSchema(t, this.className), this.secretTypeId = t.result.secretTypeId.valueBlock.toString(), this.secretValue = t.result.secretValue;
  }
  toSchema() {
    return new f({
      value: [
        new T({ value: this.secretTypeId }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [this.secretValue.toSchema()]
        })
      ]
    });
  }
  toJSON() {
    return {
      secretTypeId: this.secretTypeId,
      secretValue: this.secretValue.toJSON()
    };
  }
}
_a.CLASS_NAME = "SecretBag";
class yn {
  static getItems() {
    return this.items || (this.items = {}, yn.register("1.2.840.113549.1.12.10.1.1", vt), yn.register("1.2.840.113549.1.12.10.1.2", Sn), yn.register("1.2.840.113549.1.12.10.1.3", $i), yn.register("1.2.840.113549.1.12.10.1.4", Ji), yn.register("1.2.840.113549.1.12.10.1.5", _a), yn.register("1.2.840.113549.1.12.10.1.6", fs)), this.items;
  }
  static register(e, t) {
    this.getItems()[e] = t;
  }
  static find(e) {
    return this.getItems()[e] || null;
  }
}
const gi = "bagId", wi = "bagValue", ss = "bagAttributes", Cy = [
  gi,
  wi,
  ss
];
class Nn extends k {
  constructor(e = {}) {
    super(), this.bagId = r(e, gi, Nn.defaultValues(gi)), this.bagValue = r(e, wi, Nn.defaultValues(wi)), ss in e && (this.bagAttributes = r(e, ss, Nn.defaultValues(ss))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case gi:
        return u;
      case wi:
        return new K();
      case ss:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case gi:
        return t === u;
      case wi:
        return t instanceof K;
      case ss:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.bagId || gi }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new K({ name: t.bagValue || wi })]
        }),
        new pe({
          optional: !0,
          value: [
            new J({
              name: t.bagAttributes || ss,
              value: le.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Cy);
    const t = N(e, e, Nn.schema({
      names: {
        bagId: gi,
        bagValue: wi,
        bagAttributes: ss
      }
    }));
    p.assertSchema(t, this.className), this.bagId = t.result.bagId.valueBlock.toString();
    const s = yn.find(this.bagId);
    if (!s)
      throw new Error(`Invalid BAG_ID for SafeBag: ${this.bagId}`);
    this.bagValue = new s({ schema: t.result.bagValue }), ss in t.result && (this.bagAttributes = Array.from(t.result.bagAttributes, (n) => new le({ schema: n })));
  }
  toSchema() {
    const e = [
      new T({ value: this.bagId }),
      new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [this.bagValue.toSchema()]
      })
    ];
    return this.bagAttributes && e.push(new pe({
      value: Array.from(this.bagAttributes, (t) => t.toSchema())
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      bagId: this.bagId,
      bagValue: this.bagValue.toJSON()
    };
    return this.bagAttributes && (e.bagAttributes = Array.from(this.bagAttributes, (t) => t.toJSON())), e;
  }
}
Nn.CLASS_NAME = "SafeBag";
const or = "safeBags";
class fs extends k {
  constructor(e = {}) {
    super(), this.safeBags = r(e, or, fs.defaultValues(or)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case or:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case or:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.safeBags || u,
          value: Nn.schema()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, [
      or
    ]);
    const t = N(e, e, fs.schema({
      names: {
        safeBags: or
      }
    }));
    p.assertSchema(t, this.className), this.safeBags = Array.from(t.result.safeBags, (s) => new Nn({ schema: s }));
  }
  toSchema() {
    return new f({
      value: Array.from(this.safeBags, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      safeBags: Array.from(this.safeBags, (e) => e.toJSON())
    };
  }
}
fs.CLASS_NAME = "SafeContents";
const Dl = "otherCertFormat", Pl = "otherCert", By = [
  Dl,
  Pl
];
class xn extends k {
  constructor(e = {}) {
    super(), this.otherCertFormat = r(e, Dl, xn.defaultValues(Dl)), this.otherCert = r(e, Pl, xn.defaultValues(Pl)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Dl:
        return u;
      case Pl:
        return new K();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.otherCertFormat || Dl }),
        new K({ name: t.otherCert || Pl })
      ]
    });
  }
  fromSchema(e) {
    C(e, By);
    const t = N(e, e, xn.schema());
    p.assertSchema(t, this.className), this.otherCertFormat = t.result.otherCertFormat.valueBlock.toString(), this.otherCert = t.result.otherCert;
  }
  toSchema() {
    return new f({
      value: [
        new T({ value: this.otherCertFormat }),
        this.otherCert
      ]
    });
  }
  toJSON() {
    const e = {
      otherCertFormat: this.otherCertFormat
    };
    return this.otherCert instanceof K || (e.otherCert = this.otherCert.toJSON()), e;
  }
}
const Ll = "certificates", Iy = [
  Ll
];
class Jt extends k {
  constructor(e = {}) {
    super(), this.certificates = r(e, Ll, Jt.defaultValues(Ll)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ll:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new pe({
      name: t.blockName || u,
      value: [
        new J({
          name: t.certificates || Ll,
          value: new he({
            value: [
              ee.schema(),
              new w({
                idBlock: {
                  tagClass: 3,
                  tagNumber: 0
                },
                value: [
                  new K()
                ]
              }),
              new w({
                idBlock: {
                  tagClass: 3,
                  tagNumber: 1
                },
                value: [
                  new f()
                ]
              }),
              new w({
                idBlock: {
                  tagClass: 3,
                  tagNumber: 2
                },
                value: ht.schema().valueBlock.value
              }),
              new w({
                idBlock: {
                  tagClass: 3,
                  tagNumber: 3
                },
                value: xn.schema().valueBlock.value
              })
            ]
          })
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Iy);
    const t = N(e, e, Jt.schema());
    p.assertSchema(t, this.className), this.certificates = Array.from(t.result.certificates || [], (s) => {
      const n = s.idBlock.tagNumber;
      if (s.idBlock.tagClass === 1)
        return new ee({ schema: s });
      const i = new f({
        value: s.valueBlock.value
      });
      switch (n) {
        case 1:
          return i.valueBlock.value[0].valueBlock.value[0].valueBlock.valueDec === 1 ? new ht({ schema: i }) : new us({ schema: i });
        case 2:
          return new ht({ schema: i });
        case 3:
          return new xn({ schema: i });
      }
      return s;
    });
  }
  toSchema() {
    return new pe({
      value: Array.from(this.certificates, (e) => {
        switch (!0) {
          case e instanceof ee:
            return e.toSchema();
          case e instanceof us:
            return new w({
              idBlock: {
                tagClass: 3,
                tagNumber: 1
              },
              value: e.toSchema().valueBlock.value
            });
          case e instanceof ht:
            return new w({
              idBlock: {
                tagClass: 3,
                tagNumber: 2
              },
              value: e.toSchema().valueBlock.value
            });
          case e instanceof xn:
            return new w({
              idBlock: {
                tagClass: 3,
                tagNumber: 3
              },
              value: e.toSchema().valueBlock.value
            });
        }
        return e.toSchema();
      })
    });
  }
  toJSON() {
    return {
      certificates: Array.from(this.certificates, (e) => e.toJSON())
    };
  }
}
Jt.CLASS_NAME = "CertificateSet";
const Ul = "otherRevInfoFormat", Hl = "otherRevInfo", Vy = [
  Ul,
  Hl
];
class ws extends k {
  constructor(e = {}) {
    super(), this.otherRevInfoFormat = r(e, Ul, ws.defaultValues(Ul)), this.otherRevInfo = r(e, Hl, ws.defaultValues(Hl)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ul:
        return u;
      case Hl:
        return new K();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.otherRevInfoFormat || Ul }),
        new K({ name: t.otherRevInfo || Hl })
      ]
    });
  }
  fromSchema(e) {
    C(e, Vy);
    const t = N(e, e, ws.schema());
    p.assertSchema(t, this.className), this.otherRevInfoFormat = t.result.otherRevInfoFormat.valueBlock.toString(), this.otherRevInfo = t.result.otherRevInfo;
  }
  toSchema() {
    return new f({
      value: [
        new T({ value: this.otherRevInfoFormat }),
        this.otherRevInfo
      ]
    });
  }
  toJSON() {
    const e = {
      otherRevInfoFormat: this.otherRevInfoFormat
    };
    return this.otherRevInfo instanceof K || (e.otherRevInfo = this.otherRevInfo.toJSON()), e;
  }
}
ws.CLASS_NAME = "OtherRevocationInfoFormat";
const Ml = "crls", yh = "otherRevocationInfos", xy = [
  Ml
];
class ys extends k {
  constructor(e = {}) {
    super(), this.crls = r(e, Ml, ys.defaultValues(Ml)), this.otherRevocationInfos = r(e, yh, ys.defaultValues(yh)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ml:
        return [];
      case yh:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new pe({
      name: t.blockName || u,
      value: [
        new J({
          name: t.crls || u,
          value: new he({
            value: [
              Ie.schema(),
              new w({
                idBlock: {
                  tagClass: 3,
                  tagNumber: 1
                },
                value: [
                  new T(),
                  new K()
                ]
              })
            ]
          })
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, xy);
    const t = N(e, e, ys.schema({
      names: {
        crls: Ml
      }
    }));
    if (p.assertSchema(t, this.className), t.result.crls)
      for (const s of t.result.crls)
        s.idBlock.tagClass === 1 ? this.crls.push(new Ie({ schema: s })) : this.otherRevocationInfos.push(new ws({ schema: s }));
  }
  toSchema() {
    const e = [];
    return e.push(...Array.from(this.crls, (t) => t.toSchema())), e.push(...Array.from(this.otherRevocationInfos, (t) => {
      const s = t.toSchema();
      return s.idBlock.tagClass = 3, s.idBlock.tagNumber = 1, s;
    })), new pe({
      value: e
    });
  }
  toJSON() {
    return {
      crls: Array.from(this.crls, (e) => e.toJSON()),
      otherRevocationInfos: Array.from(this.otherRevocationInfos, (e) => e.toJSON())
    };
  }
}
ys.CLASS_NAME = "RevocationInfoChoices";
const _l = "certs", yi = "crls", Oy = [
  _l,
  yi
];
class Zi extends k {
  constructor(e = {}) {
    super(), this.crls = r(e, yi, Zi.defaultValues(yi)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case _l:
        return new Jt();
      case yi:
        return new ys();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case _l:
        return t.certificates.length === 0;
      case yi:
        return t.crls.length === 0 && t.otherRevocationInfos.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new w({
          name: t.certs || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: Jt.schema().valueBlock.value
        }),
        new w({
          name: t.crls || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: ys.schema().valueBlock.value
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Oy);
    const t = N(e, e, Zi.schema({
      names: {
        certs: _l,
        crls: yi
      }
    }));
    p.assertSchema(t, this.className), _l in t.result && (this.certs = new Jt({
      schema: new pe({
        value: t.result.certs.valueBlock.value
      })
    })), yi in t.result && (this.crls = new ys({
      schema: new pe({
        value: t.result.crls.valueBlock.value
      })
    }));
  }
  toSchema() {
    const e = [];
    return this.certs && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: this.certs.toSchema().valueBlock.value
    })), this.crls && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: this.crls.toSchema().valueBlock.value
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {};
    return this.certs && (e.certs = this.certs.toJSON()), this.crls && (e.crls = this.crls.toJSON()), e;
  }
}
Zi.CLASS_NAME = "OriginatorInfo";
const $l = "issuer", Kl = "serialNumber", Ry = [
  $l,
  Kl
];
class Be extends k {
  constructor(e = {}) {
    super(), this.issuer = r(e, $l, Be.defaultValues($l)), this.serialNumber = r(e, Kl, Be.defaultValues(Kl)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case $l:
        return new re();
      case Kl:
        return new S();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        re.schema(t.issuer || {}),
        new S({ name: t.serialNumber || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, Ry);
    const t = N(e, e, Be.schema({
      names: {
        issuer: {
          names: {
            blockName: $l
          }
        },
        serialNumber: Kl
      }
    }));
    p.assertSchema(t, this.className), this.issuer = new re({ schema: t.result.issuer }), this.serialNumber = t.result.serialNumber;
  }
  toSchema() {
    return new f({
      value: [
        this.issuer.toSchema(),
        this.serialNumber
      ]
    });
  }
  toJSON() {
    return {
      issuer: this.issuer.toJSON(),
      serialNumber: this.serialNumber.toJSON()
    };
  }
}
Be.CLASS_NAME = "IssuerAndSerialNumber";
const Hc = "variant", ao = "value", Ty = [
  "blockName"
];
class $a extends k {
  constructor(e = {}) {
    super(), this.variant = r(e, Hc, $a.defaultValues(Hc)), ao in e && (this.value = r(e, ao, $a.defaultValues(ao))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Hc:
        return -1;
      case ao:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Hc:
        return t === -1;
      case ao:
        return Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new he({
      value: [
        Be.schema({
          names: {
            blockName: t.blockName || u
          }
        }),
        new M({
          name: t.blockName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          }
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Ty);
    const t = N(e, e, $a.schema({
      names: {
        blockName: "blockName"
      }
    }));
    p.assertSchema(t, this.className), t.result.blockName.idBlock.tagClass === 1 ? (this.variant = 1, this.value = new Be({ schema: t.result.blockName })) : (this.variant = 2, this.value = new I({ valueHex: t.result.blockName.valueBlock.valueHex }));
  }
  toSchema() {
    switch (this.variant) {
      case 1:
        if (!(this.value instanceof Be))
          throw new Error("Incorrect type of RecipientIdentifier.value. It should be IssuerAndSerialNumber.");
        return this.value.toSchema();
      case 2:
        if (!(this.value instanceof I))
          throw new Error("Incorrect type of RecipientIdentifier.value. It should be ASN.1 OctetString.");
        return new M({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          valueHex: this.value.valueBlock.valueHexView
        });
      default:
        return new K();
    }
  }
  toJSON() {
    const e = {
      variant: this.variant
    };
    return (this.variant === 1 || this.variant === 2) && this.value && (e.value = this.value.toJSON()), e;
  }
}
$a.CLASS_NAME = "RecipientIdentifier";
const vi = "version", Dr = "rid", Pr = "keyEncryptionAlgorithm", Lr = "encryptedKey", Mc = "recipientCertificate", Dy = [
  vi,
  Dr,
  Pr,
  Lr
];
class rt extends k {
  constructor(e = {}) {
    super(), this.version = r(e, vi, rt.defaultValues(vi)), this.rid = r(e, Dr, rt.defaultValues(Dr)), this.keyEncryptionAlgorithm = r(e, Pr, rt.defaultValues(Pr)), this.encryptedKey = r(e, Lr, rt.defaultValues(Lr)), this.recipientCertificate = r(e, Mc, rt.defaultValues(Mc)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case vi:
        return -1;
      case Dr:
        return {};
      case Pr:
        return new v();
      case Lr:
        return new I();
      case Mc:
        return new ee();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case vi:
        return t === rt.defaultValues(vi);
      case Dr:
        return Object.keys(t).length === 0;
      case Pr:
      case Lr:
        return t.isEqual(rt.defaultValues(e));
      case Mc:
        return !1;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || u }),
        $a.schema(t.rid || {}),
        v.schema(t.keyEncryptionAlgorithm || {}),
        new I({ name: t.encryptedKey || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, Dy);
    const t = N(e, e, rt.schema({
      names: {
        version: vi,
        rid: {
          names: {
            blockName: Dr
          }
        },
        keyEncryptionAlgorithm: {
          names: {
            blockName: Pr
          }
        },
        encryptedKey: Lr
      }
    }));
    p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, t.result.rid.idBlock.tagClass === 3 ? this.rid = new I({ valueHex: t.result.rid.valueBlock.valueHex }) : this.rid = new Be({ schema: t.result.rid }), this.keyEncryptionAlgorithm = new v({ schema: t.result.keyEncryptionAlgorithm }), this.encryptedKey = t.result.encryptedKey;
  }
  toSchema() {
    const e = [];
    return this.rid instanceof Be ? (this.version = 0, e.push(new S({ value: this.version })), e.push(this.rid.toSchema())) : (this.version = 2, e.push(new S({ value: this.version })), e.push(new M({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      valueHex: this.rid.valueBlock.valueHexView
    }))), e.push(this.keyEncryptionAlgorithm.toSchema()), e.push(this.encryptedKey), new f({
      value: e
    });
  }
  toJSON() {
    return {
      version: this.version,
      rid: this.rid.toJSON(),
      keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
      encryptedKey: this.encryptedKey.toJSON()
    };
  }
}
rt.CLASS_NAME = "KeyTransRecipientInfo";
const Ur = "algorithm", Hr = "publicKey", Py = [
  Ur,
  Hr
];
class ds extends k {
  constructor(e = {}) {
    super(), this.algorithm = r(e, Ur, ds.defaultValues(Ur)), this.publicKey = r(e, Hr, ds.defaultValues(Hr)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ur:
        return new v();
      case Hr:
        return new G();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Ur:
      case Hr:
        return t.isEqual(ds.defaultValues(e));
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        v.schema(t.algorithm || {}),
        new G({ name: t.publicKey || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, Py);
    const t = N(e, e, ds.schema({
      names: {
        algorithm: {
          names: {
            blockName: Ur
          }
        },
        publicKey: Hr
      }
    }));
    p.assertSchema(t, this.className), this.algorithm = new v({ schema: t.result.algorithm }), this.publicKey = t.result.publicKey;
  }
  toSchema() {
    return new f({
      value: [
        this.algorithm.toSchema(),
        this.publicKey
      ]
    });
  }
  toJSON() {
    return {
      algorithm: this.algorithm.toJSON(),
      publicKey: this.publicKey.toJSON()
    };
  }
}
ds.CLASS_NAME = "OriginatorPublicKey";
const _c = "variant", oo = "value", Ly = [
  "blockName"
];
class vs extends k {
  constructor(e = {}) {
    super(), this.variant = r(e, _c, vs.defaultValues(_c)), oo in e && (this.value = r(e, oo, vs.defaultValues(oo))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case _c:
        return -1;
      case oo:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case _c:
        return t === -1;
      case oo:
        return Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new he({
      value: [
        Be.schema({
          names: {
            blockName: t.blockName || u
          }
        }),
        new M({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          name: t.blockName || u
        }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          name: t.blockName || u,
          value: ds.schema().valueBlock.value
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Ly);
    const t = N(e, e, vs.schema({
      names: {
        blockName: "blockName"
      }
    }));
    p.assertSchema(t, this.className), t.result.blockName.idBlock.tagClass === 1 ? (this.variant = 1, this.value = new Be({ schema: t.result.blockName })) : t.result.blockName.idBlock.tagNumber === 0 ? (t.result.blockName.idBlock.tagClass = 1, t.result.blockName.idBlock.tagNumber = 4, this.variant = 2, this.value = t.result.blockName) : (this.variant = 3, this.value = new ds({
      schema: new f({
        value: t.result.blockName.valueBlock.value
      })
    }));
  }
  toSchema() {
    switch (this.variant) {
      case 1:
        return this.value.toSchema();
      case 2:
        return this.value.idBlock.tagClass = 3, this.value.idBlock.tagNumber = 0, this.value;
      case 3: {
        const e = this.value.toSchema();
        return e.idBlock.tagClass = 3, e.idBlock.tagNumber = 1, e;
      }
      default:
        return new K();
    }
  }
  toJSON() {
    const e = {
      variant: this.variant
    };
    return (this.variant === 1 || this.variant === 2 || this.variant === 3) && (e.value = this.value.toJSON()), e;
  }
}
vs.CLASS_NAME = "OriginatorIdentifierOrKey";
const Mr = "keyAttrId", Ht = "keyAttr", Uy = [
  Mr,
  Ht
];
class Tt extends k {
  constructor(e = {}) {
    super(), this.keyAttrId = r(e, Mr, Tt.defaultValues(Mr)), Ht in e && (this.keyAttr = r(e, Ht, Tt.defaultValues(Ht))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Mr:
        return u;
      case Ht:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Mr:
        return typeof t == "string" && t === u;
      case Ht:
        return Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      optional: t.optional || !0,
      name: t.blockName || u,
      value: [
        new T({ name: t.keyAttrId || u }),
        new K({
          optional: !0,
          name: t.keyAttr || u
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Uy);
    const t = N(e, e, Tt.schema({
      names: {
        keyAttrId: Mr,
        keyAttr: Ht
      }
    }));
    p.assertSchema(t, this.className), this.keyAttrId = t.result.keyAttrId.valueBlock.toString(), Ht in t.result && (this.keyAttr = t.result.keyAttr);
  }
  toSchema() {
    const e = [];
    return e.push(new T({ value: this.keyAttrId })), Ht in this && e.push(this.keyAttr), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      keyAttrId: this.keyAttrId
    };
    return Ht in this && (e.keyAttr = this.keyAttr.toJSON()), e;
  }
}
Tt.CLASS_NAME = "OtherKeyAttribute";
const Si = "subjectKeyIdentifier", Xs = "date", Zs = "other", Hy = [
  Si,
  Xs,
  Zs
];
class _t extends k {
  constructor(e = {}) {
    super(), this.subjectKeyIdentifier = r(e, Si, _t.defaultValues(Si)), Xs in e && (this.date = r(e, Xs, _t.defaultValues(Xs))), Zs in e && (this.other = r(e, Zs, _t.defaultValues(Zs))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Si:
        return new I();
      case Xs:
        return new ue();
      case Zs:
        return new Tt();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Si:
        return t.isEqual(_t.defaultValues(Si));
      case Xs:
        return t.year === 0 && t.month === 0 && t.day === 0 && t.hour === 0 && t.minute === 0 && t.second === 0 && t.millisecond === 0;
      case Zs:
        return t.keyAttrId === u && !("keyAttr" in t);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new I({ name: t.subjectKeyIdentifier || u }),
        new ue({
          optional: !0,
          name: t.date || u
        }),
        Tt.schema(t.other || {})
      ]
    });
  }
  fromSchema(e) {
    C(e, Hy);
    const t = N(e, e, _t.schema({
      names: {
        subjectKeyIdentifier: Si,
        date: Xs,
        other: {
          names: {
            blockName: Zs
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.subjectKeyIdentifier = t.result.subjectKeyIdentifier, Xs in t.result && (this.date = t.result.date), Zs in t.result && (this.other = new Tt({ schema: t.result.other }));
  }
  toSchema() {
    const e = [];
    return e.push(this.subjectKeyIdentifier), this.date && e.push(this.date), this.other && e.push(this.other.toSchema()), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      subjectKeyIdentifier: this.subjectKeyIdentifier.toJSON()
    };
    return this.date && (e.date = this.date.toJSON()), this.other && (e.other = this.other.toJSON()), e;
  }
}
_t.CLASS_NAME = "RecipientKeyIdentifier";
const $c = "variant", Kc = "value", My = [
  "blockName"
];
class jt extends k {
  constructor(e = {}) {
    super(), this.variant = r(e, $c, jt.defaultValues($c)), this.value = r(e, Kc, jt.defaultValues(Kc)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case $c:
        return -1;
      case Kc:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case $c:
        return t === -1;
      case Kc:
        return Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new he({
      value: [
        Be.schema(t.issuerAndSerialNumber || {
          names: {
            blockName: t.blockName || u
          }
        }),
        new w({
          name: t.blockName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: _t.schema(t.rKeyId || {
            names: {
              blockName: t.blockName || u
            }
          }).valueBlock.value
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, My);
    const t = N(e, e, jt.schema({
      names: {
        blockName: "blockName"
      }
    }));
    p.assertSchema(t, this.className), t.result.blockName.idBlock.tagClass === 1 ? (this.variant = 1, this.value = new Be({ schema: t.result.blockName })) : (this.variant = 2, this.value = new _t({
      schema: new f({
        value: t.result.blockName.valueBlock.value
      })
    }));
  }
  toSchema() {
    switch (this.variant) {
      case 1:
        return this.value.toSchema();
      case 2:
        return new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: this.value.toSchema().valueBlock.value
        });
      default:
        return new K();
    }
  }
  toJSON() {
    const e = {
      variant: this.variant
    };
    return (this.variant === 1 || this.variant === 2) && (e.value = this.value.toJSON()), e;
  }
}
jt.CLASS_NAME = "KeyAgreeRecipientIdentifier";
const _r = "rid", Ai = "encryptedKey", _y = [
  _r,
  Ai
];
class ms extends k {
  constructor(e = {}) {
    super(), this.rid = r(e, _r, ms.defaultValues(_r)), this.encryptedKey = r(e, Ai, ms.defaultValues(Ai)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case _r:
        return new jt();
      case Ai:
        return new I();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case _r:
        return t.variant === -1 && !("value" in t);
      case Ai:
        return t.isEqual(ms.defaultValues(Ai));
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        jt.schema(t.rid || {}),
        new I({ name: t.encryptedKey || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, _y);
    const t = N(e, e, ms.schema({
      names: {
        rid: {
          names: {
            blockName: _r
          }
        },
        encryptedKey: Ai
      }
    }));
    p.assertSchema(t, this.className), this.rid = new jt({ schema: t.result.rid }), this.encryptedKey = t.result.encryptedKey;
  }
  toSchema() {
    return new f({
      value: [
        this.rid.toSchema(),
        this.encryptedKey
      ]
    });
  }
  toJSON() {
    return {
      rid: this.rid.toJSON(),
      encryptedKey: this.encryptedKey.toJSON()
    };
  }
}
ms.CLASS_NAME = "RecipientEncryptedKey";
const Jc = "encryptedKeys", Hm = "RecipientEncryptedKeys", $y = [
  Hm
];
class On extends k {
  constructor(e = {}) {
    super(), this.encryptedKeys = r(e, Jc, On.defaultValues(Jc)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Jc:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Jc:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.RecipientEncryptedKeys || u,
          value: ms.schema()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, $y);
    const t = N(e, e, On.schema({
      names: {
        RecipientEncryptedKeys: Hm
      }
    }));
    p.assertSchema(t, this.className), this.encryptedKeys = Array.from(t.result.RecipientEncryptedKeys, (s) => new ms({ schema: s }));
  }
  toSchema() {
    return new f({
      value: Array.from(this.encryptedKeys, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      encryptedKeys: Array.from(this.encryptedKeys, (e) => e.toJSON())
    };
  }
}
On.CLASS_NAME = "RecipientEncryptedKeys";
const $r = "version", Kr = "originator", ns = "ukm", Jr = "keyEncryptionAlgorithm", jr = "recipientEncryptedKeys", jc = "recipientCertificate", Fc = "recipientPublicKey", Ky = [
  $r,
  Kr,
  ns,
  Jr,
  jr
];
class tt extends k {
  constructor(e = {}) {
    super(), this.version = r(e, $r, tt.defaultValues($r)), this.originator = r(e, Kr, tt.defaultValues(Kr)), ns in e && (this.ukm = r(e, ns, tt.defaultValues(ns))), this.keyEncryptionAlgorithm = r(e, Jr, tt.defaultValues(Jr)), this.recipientEncryptedKeys = r(e, jr, tt.defaultValues(jr)), this.recipientCertificate = r(e, jc, tt.defaultValues(jc)), this.recipientPublicKey = r(e, Fc, tt.defaultValues(Fc)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case $r:
        return 0;
      case Kr:
        return new vs();
      case ns:
        return new I();
      case Jr:
        return new v();
      case jr:
        return new On();
      case jc:
        return new ee();
      case Fc:
        return null;
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case $r:
        return t === 0;
      case Kr:
        return t.variant === -1 && !("value" in t);
      case ns:
        return t.isEqual(tt.defaultValues(ns));
      case Jr:
        return t.algorithmId === u && !("algorithmParams" in t);
      case jr:
        return t.encryptedKeys.length === 0;
      case jc:
        return !1;
      case Fc:
        return !1;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || u }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            vs.schema(t.originator || {})
          ]
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [new I({ name: t.ukm || u })]
        }),
        v.schema(t.keyEncryptionAlgorithm || {}),
        On.schema(t.recipientEncryptedKeys || {})
      ]
    });
  }
  fromSchema(e) {
    C(e, Ky);
    const t = N(e, e, tt.schema({
      names: {
        version: $r,
        originator: {
          names: {
            blockName: Kr
          }
        },
        ukm: ns,
        keyEncryptionAlgorithm: {
          names: {
            blockName: Jr
          }
        },
        recipientEncryptedKeys: {
          names: {
            blockName: jr
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, this.originator = new vs({ schema: t.result.originator }), ns in t.result && (this.ukm = t.result.ukm), this.keyEncryptionAlgorithm = new v({ schema: t.result.keyEncryptionAlgorithm }), this.recipientEncryptedKeys = new On({ schema: t.result.recipientEncryptedKeys });
  }
  toSchema() {
    const e = [];
    return e.push(new S({ value: this.version })), e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [this.originator.toSchema()]
    })), this.ukm && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: [this.ukm]
    })), e.push(this.keyEncryptionAlgorithm.toSchema()), e.push(this.recipientEncryptedKeys.toSchema()), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      version: this.version,
      originator: this.originator.toJSON(),
      keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
      recipientEncryptedKeys: this.recipientEncryptedKeys.toJSON()
    };
    return this.ukm && (e.ukm = this.ukm.toJSON()), e;
  }
}
tt.CLASS_NAME = "KeyAgreeRecipientInfo";
const pi = "keyIdentifier", zs = "date", en = "other", Jy = [
  pi,
  zs,
  en
];
class Vt extends k {
  constructor(e = {}) {
    super(), this.keyIdentifier = r(e, pi, Vt.defaultValues(pi)), zs in e && (this.date = r(e, zs, Vt.defaultValues(zs))), en in e && (this.other = r(e, en, Vt.defaultValues(en))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case pi:
        return new I();
      case zs:
        return new ue();
      case en:
        return new Tt();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case pi:
        return t.isEqual(Vt.defaultValues(pi));
      case zs:
        return t.year === 0 && t.month === 0 && t.day === 0 && t.hour === 0 && t.minute === 0 && t.second === 0 && t.millisecond === 0;
      case en:
        return t.compareWithDefault("keyAttrId", t.keyAttrId) && !("keyAttr" in t);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new I({ name: t.keyIdentifier || u }),
        new ue({
          optional: !0,
          name: t.date || u
        }),
        Tt.schema(t.other || {})
      ]
    });
  }
  fromSchema(e) {
    C(e, Jy);
    const t = N(e, e, Vt.schema({
      names: {
        keyIdentifier: pi,
        date: zs,
        other: {
          names: {
            blockName: en
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.keyIdentifier = t.result.keyIdentifier, zs in t.result && (this.date = t.result.date), en in t.result && (this.other = new Tt({ schema: t.result.other }));
  }
  toSchema() {
    const e = [];
    return e.push(this.keyIdentifier), this.date && e.push(this.date), this.other && e.push(this.other.toSchema()), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      keyIdentifier: this.keyIdentifier.toJSON()
    };
    return this.date && (e.date = this.date), this.other && (e.other = this.other.toJSON()), e;
  }
}
Vt.CLASS_NAME = "KEKIdentifier";
const Fr = "version", qr = "kekid", Wr = "keyEncryptionAlgorithm", bi = "encryptedKey", qc = "preDefinedKEK", jy = [
  Fr,
  qr,
  Wr,
  bi
];
class at extends k {
  constructor(e = {}) {
    super(), this.version = r(e, Fr, at.defaultValues(Fr)), this.kekid = r(e, qr, at.defaultValues(qr)), this.keyEncryptionAlgorithm = r(e, Wr, at.defaultValues(Wr)), this.encryptedKey = r(e, bi, at.defaultValues(bi)), this.preDefinedKEK = r(e, qc, at.defaultValues(qc)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Fr:
        return 0;
      case qr:
        return new Vt();
      case Wr:
        return new v();
      case bi:
        return new I();
      case qc:
        return be;
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case "KEKRecipientInfo":
        return t === at.defaultValues(Fr);
      case qr:
        return t.compareWithDefault("keyIdentifier", t.keyIdentifier) && !("date" in t) && !("other" in t);
      case Wr:
        return t.algorithmId === u && !("algorithmParams" in t);
      case bi:
        return t.isEqual(at.defaultValues(bi));
      case qc:
        return t.byteLength === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || u }),
        Vt.schema(t.kekid || {}),
        v.schema(t.keyEncryptionAlgorithm || {}),
        new I({ name: t.encryptedKey || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, jy);
    const t = N(e, e, at.schema({
      names: {
        version: Fr,
        kekid: {
          names: {
            blockName: qr
          }
        },
        keyEncryptionAlgorithm: {
          names: {
            blockName: Wr
          }
        },
        encryptedKey: bi
      }
    }));
    p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, this.kekid = new Vt({ schema: t.result.kekid }), this.keyEncryptionAlgorithm = new v({ schema: t.result.keyEncryptionAlgorithm }), this.encryptedKey = t.result.encryptedKey;
  }
  toSchema() {
    return new f({
      value: [
        new S({ value: this.version }),
        this.kekid.toSchema(),
        this.keyEncryptionAlgorithm.toSchema(),
        this.encryptedKey
      ]
    });
  }
  toJSON() {
    return {
      version: this.version,
      kekid: this.kekid.toJSON(),
      keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
      encryptedKey: this.encryptedKey.toJSON()
    };
  }
}
at.CLASS_NAME = "KEKRecipientInfo";
const Gr = "version", tn = "keyDerivationAlgorithm", Yr = "keyEncryptionAlgorithm", ki = "encryptedKey", Wc = "password", Fy = [
  Gr,
  tn,
  Yr,
  ki
];
class yt extends k {
  constructor(e = {}) {
    super(), this.version = r(e, Gr, yt.defaultValues(Gr)), tn in e && (this.keyDerivationAlgorithm = r(e, tn, yt.defaultValues(tn))), this.keyEncryptionAlgorithm = r(e, Yr, yt.defaultValues(Yr)), this.encryptedKey = r(e, ki, yt.defaultValues(ki)), this.password = r(e, Wc, yt.defaultValues(Wc)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Gr:
        return -1;
      case tn:
        return new v();
      case Yr:
        return new v();
      case ki:
        return new I();
      case Wc:
        return be;
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Gr:
        return t === -1;
      case tn:
      case Yr:
        return t.algorithmId === u && !("algorithmParams" in t);
      case ki:
        return t.isEqual(yt.defaultValues(ki));
      case Wc:
        return t.byteLength === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || u }),
        new w({
          name: t.keyDerivationAlgorithm || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: v.schema().valueBlock.value
        }),
        v.schema(t.keyEncryptionAlgorithm || {}),
        new I({ name: t.encryptedKey || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, Fy);
    const t = N(e, e, yt.schema({
      names: {
        version: Gr,
        keyDerivationAlgorithm: tn,
        keyEncryptionAlgorithm: {
          names: {
            blockName: Yr
          }
        },
        encryptedKey: ki
      }
    }));
    p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, tn in t.result && (this.keyDerivationAlgorithm = new v({
      schema: new f({
        value: t.result.keyDerivationAlgorithm.valueBlock.value
      })
    })), this.keyEncryptionAlgorithm = new v({ schema: t.result.keyEncryptionAlgorithm }), this.encryptedKey = t.result.encryptedKey;
  }
  toSchema() {
    const e = [];
    return e.push(new S({ value: this.version })), this.keyDerivationAlgorithm && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: this.keyDerivationAlgorithm.toSchema().valueBlock.value
    })), e.push(this.keyEncryptionAlgorithm.toSchema()), e.push(this.encryptedKey), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      version: this.version,
      keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
      encryptedKey: this.encryptedKey.toJSON()
    };
    return this.keyDerivationAlgorithm && (e.keyDerivationAlgorithm = this.keyDerivationAlgorithm.toJSON()), e;
  }
}
yt.CLASS_NAME = "PasswordRecipientInfo";
const Qr = "oriType", Ei = "oriValue", qy = [
  Qr,
  Ei
];
class Cn extends k {
  constructor(e = {}) {
    super(), this.oriType = r(e, Qr, Cn.defaultValues(Qr)), this.oriValue = r(e, Ei, Cn.defaultValues(Ei)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Qr:
        return u;
      case Ei:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Qr:
        return t === u;
      case Ei:
        return Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.oriType || u }),
        new K({ name: t.oriValue || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, qy);
    const t = N(e, e, Cn.schema({
      names: {
        oriType: Qr,
        oriValue: Ei
      }
    }));
    p.assertSchema(t, this.className), this.oriType = t.result.oriType.valueBlock.toString(), this.oriValue = t.result.oriValue;
  }
  toSchema() {
    return new f({
      value: [
        new T({ value: this.oriType }),
        this.oriValue
      ]
    });
  }
  toJSON() {
    const e = {
      oriType: this.oriType
    };
    return Cn.compareWithDefault(Ei, this.oriValue) || (e.oriValue = this.oriValue.toJSON()), e;
  }
}
Cn.CLASS_NAME = "OtherRecipientInfo";
const Gc = "variant", lo = "value", Wy = [
  "blockName"
];
class St extends k {
  constructor(e = {}) {
    super(), this.variant = r(e, Gc, St.defaultValues(Gc)), lo in e && (this.value = r(e, lo, St.defaultValues(lo))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Gc:
        return -1;
      case lo:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Gc:
        return t === St.defaultValues(e);
      case lo:
        return Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new he({
      value: [
        rt.schema({
          names: {
            blockName: t.blockName || u
          }
        }),
        new w({
          name: t.blockName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: tt.schema().valueBlock.value
        }),
        new w({
          name: t.blockName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: at.schema().valueBlock.value
        }),
        new w({
          name: t.blockName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 3
          },
          value: yt.schema().valueBlock.value
        }),
        new w({
          name: t.blockName || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 4
          },
          value: Cn.schema().valueBlock.value
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Wy);
    const t = N(e, e, St.schema({
      names: {
        blockName: "blockName"
      }
    }));
    if (p.assertSchema(t, this.className), t.result.blockName.idBlock.tagClass === 1)
      this.variant = 1, this.value = new rt({ schema: t.result.blockName });
    else {
      const s = new f({
        value: t.result.blockName.valueBlock.value
      });
      switch (t.result.blockName.idBlock.tagNumber) {
        case 1:
          this.variant = 2, this.value = new tt({ schema: s });
          break;
        case 2:
          this.variant = 3, this.value = new at({ schema: s });
          break;
        case 3:
          this.variant = 4, this.value = new yt({ schema: s });
          break;
        case 4:
          this.variant = 5, this.value = new Cn({ schema: s });
          break;
        default:
          throw new Error("Incorrect structure of RecipientInfo block");
      }
    }
  }
  toSchema() {
    Q.assertEmpty(this.value, "value", "RecipientInfo");
    const e = this.value.toSchema();
    switch (this.variant) {
      case 1:
        return e;
      case 2:
      case 3:
      case 4:
        return e.idBlock.tagClass = 3, e.idBlock.tagNumber = this.variant - 1, e;
      default:
        return new K();
    }
  }
  toJSON() {
    const e = {
      variant: this.variant
    };
    return this.value && this.variant >= 1 && this.variant <= 4 && (e.value = this.value.toJSON()), e;
  }
}
St.CLASS_NAME = "RecipientInfo";
const sn = "hashAlgorithm", nn = "maskGenAlgorithm", rn = "pSourceAlgorithm", Gy = [
  sn,
  nn,
  rn
];
class We extends k {
  constructor(e = {}) {
    super(), this.hashAlgorithm = r(e, sn, We.defaultValues(sn)), this.maskGenAlgorithm = r(e, nn, We.defaultValues(nn)), this.pSourceAlgorithm = r(e, rn, We.defaultValues(rn)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case sn:
        return new v({
          algorithmId: "1.3.14.3.2.26",
          algorithmParams: new Ae()
        });
      case nn:
        return new v({
          algorithmId: "1.2.840.113549.1.1.8",
          algorithmParams: new v({
            algorithmId: "1.3.14.3.2.26",
            algorithmParams: new Ae()
          }).toSchema()
        });
      case rn:
        return new v({
          algorithmId: "1.2.840.113549.1.1.9",
          algorithmParams: new I({ valueHex: new Uint8Array([218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]).buffer })
        });
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          optional: !0,
          value: [v.schema(t.hashAlgorithm || {})]
        }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          optional: !0,
          value: [v.schema(t.maskGenAlgorithm || {})]
        }),
        new w({
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          optional: !0,
          value: [v.schema(t.pSourceAlgorithm || {})]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Gy);
    const t = N(e, e, We.schema({
      names: {
        hashAlgorithm: {
          names: {
            blockName: sn
          }
        },
        maskGenAlgorithm: {
          names: {
            blockName: nn
          }
        },
        pSourceAlgorithm: {
          names: {
            blockName: rn
          }
        }
      }
    }));
    p.assertSchema(t, this.className), sn in t.result && (this.hashAlgorithm = new v({ schema: t.result.hashAlgorithm })), nn in t.result && (this.maskGenAlgorithm = new v({ schema: t.result.maskGenAlgorithm })), rn in t.result && (this.pSourceAlgorithm = new v({ schema: t.result.pSourceAlgorithm }));
  }
  toSchema() {
    const e = [];
    return this.hashAlgorithm.isEqual(We.defaultValues(sn)) || e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [this.hashAlgorithm.toSchema()]
    })), this.maskGenAlgorithm.isEqual(We.defaultValues(nn)) || e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: [this.maskGenAlgorithm.toSchema()]
    })), this.pSourceAlgorithm.isEqual(We.defaultValues(rn)) || e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 2
      },
      value: [this.pSourceAlgorithm.toSchema()]
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {};
    return this.hashAlgorithm.isEqual(We.defaultValues(sn)) || (e.hashAlgorithm = this.hashAlgorithm.toJSON()), this.maskGenAlgorithm.isEqual(We.defaultValues(nn)) || (e.maskGenAlgorithm = this.maskGenAlgorithm.toJSON()), this.pSourceAlgorithm.isEqual(We.defaultValues(rn)) || (e.pSourceAlgorithm = this.pSourceAlgorithm.toJSON()), e;
  }
}
We.CLASS_NAME = "RSAESOAEPParams";
const Xr = "keyInfo", an = "entityUInfo", Zr = "suppPubInfo", Yy = [
  Xr,
  an,
  Zr
];
class ls extends k {
  constructor(e = {}) {
    super(), this.keyInfo = r(e, Xr, ls.defaultValues(Xr)), an in e && (this.entityUInfo = r(e, an, ls.defaultValues(an))), this.suppPubInfo = r(e, Zr, ls.defaultValues(Zr)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Xr:
        return new v();
      case an:
        return new I();
      case Zr:
        return new I();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Xr:
      case an:
      case Zr:
        return t.isEqual(ls.defaultValues(e));
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        v.schema(t.keyInfo || {}),
        new w({
          name: t.entityUInfo || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          optional: !0,
          value: [new I()]
        }),
        new w({
          name: t.suppPubInfo || u,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: [new I()]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Yy);
    const t = N(e, e, ls.schema({
      names: {
        keyInfo: {
          names: {
            blockName: Xr
          }
        },
        entityUInfo: an,
        suppPubInfo: Zr
      }
    }));
    p.assertSchema(t, this.className), this.keyInfo = new v({ schema: t.result.keyInfo }), an in t.result && (this.entityUInfo = t.result.entityUInfo.valueBlock.value[0]), this.suppPubInfo = t.result.suppPubInfo.valueBlock.value[0];
  }
  toSchema() {
    const e = [];
    return e.push(this.keyInfo.toSchema()), this.entityUInfo && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [this.entityUInfo]
    })), e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 2
      },
      value: [this.suppPubInfo]
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      keyInfo: this.keyInfo.toJSON(),
      suppPubInfo: this.suppPubInfo.toJSON()
    };
    return this.entityUInfo && (e.entityUInfo = this.entityUInfo.toJSON()), e;
  }
}
ls.CLASS_NAME = "ECCCMSSharedInfo";
const zr = "version", on = "originatorInfo", ea = "recipientInfos", ta = "encryptedContentInfo", ln = "unprotectedAttrs", Qy = [
  zr,
  on,
  ea,
  ta,
  ln
], id = {
  kdfAlgorithm: "SHA-512",
  kekEncryptionLength: 256
}, Xy = {
  "P-256": 256,
  "P-384": 384,
  "P-521": 528
};
class Bt extends k {
  constructor(e = {}) {
    super(), this.version = r(e, zr, Bt.defaultValues(zr)), on in e && (this.originatorInfo = r(e, on, Bt.defaultValues(on))), this.recipientInfos = r(e, ea, Bt.defaultValues(ea)), this.encryptedContentInfo = r(e, ta, Bt.defaultValues(ta)), ln in e && (this.unprotectedAttrs = r(e, ln, Bt.defaultValues(ln))), this.policy = {
      disableSplit: !!e.disableSplit
    }, e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case zr:
        return 0;
      case on:
        return new Zi();
      case ea:
        return [];
      case ta:
        return new Ee();
      case ln:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case zr:
        return t === Bt.defaultValues(e);
      case on:
        return t.certs.certificates.length === 0 && t.crls.crls.length === 0;
      case ea:
      case ln:
        return t.length === 0;
      case ta:
        return Ee.compareWithDefault("contentType", t.contentType) && Ee.compareWithDefault("contentEncryptionAlgorithm", t.contentEncryptionAlgorithm) && Ee.compareWithDefault("encryptedContent", t.encryptedContent);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || u }),
        new w({
          name: t.originatorInfo || u,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: Zi.schema().valueBlock.value
        }),
        new pe({
          value: [
            new J({
              name: t.recipientInfos || u,
              value: St.schema()
            })
          ]
        }),
        Ee.schema(t.encryptedContentInfo || {}),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new J({
              name: t.unprotectedAttrs || u,
              value: le.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Qy);
    const t = N(e, e, Bt.schema({
      names: {
        version: zr,
        originatorInfo: on,
        recipientInfos: ea,
        encryptedContentInfo: {
          names: {
            blockName: ta
          }
        },
        unprotectedAttrs: ln
      }
    }));
    p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, on in t.result && (this.originatorInfo = new Zi({
      schema: new f({
        value: t.result.originatorInfo.valueBlock.value
      })
    })), this.recipientInfos = Array.from(t.result.recipientInfos, (s) => new St({ schema: s })), this.encryptedContentInfo = new Ee({ schema: t.result.encryptedContentInfo }), ln in t.result && (this.unprotectedAttrs = Array.from(t.result.unprotectedAttrs, (s) => new le({ schema: s })));
  }
  toSchema() {
    const e = [];
    return e.push(new S({ value: this.version })), this.originatorInfo && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: this.originatorInfo.toSchema().valueBlock.value
    })), e.push(new pe({
      value: Array.from(this.recipientInfos, (t) => t.toSchema())
    })), e.push(this.encryptedContentInfo.toSchema()), this.unprotectedAttrs && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: Array.from(this.unprotectedAttrs, (t) => t.toSchema())
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      version: this.version,
      recipientInfos: Array.from(this.recipientInfos, (t) => t.toJSON()),
      encryptedContentInfo: this.encryptedContentInfo.toJSON()
    };
    return this.originatorInfo && (e.originatorInfo = this.originatorInfo.toJSON()), this.unprotectedAttrs && (e.unprotectedAttrs = Array.from(this.unprotectedAttrs, (t) => t.toJSON())), e;
  }
  addRecipientByCertificate(e, t, s, n = F(!0)) {
    const i = Object.assign({ useOAEP: !0, oaepHashAlgorithm: "SHA-512" }, id, t || {});
    if (e.subjectPublicKeyInfo.algorithm.algorithmId.indexOf("1.2.840.113549") !== -1)
      s = 1;
    else if (e.subjectPublicKeyInfo.algorithm.algorithmId.indexOf("1.2.840.10045") !== -1)
      s = 2;
    else
      throw new Error(`Unknown type of certificate's public key: ${e.subjectPublicKeyInfo.algorithm.algorithmId}`);
    switch (s) {
      case 1:
        {
          let a, l;
          if (i.useOAEP === !0) {
            a = n.getOIDByAlgorithm({
              name: "RSA-OAEP"
            }, !0, "keyEncryptionAlgorithm");
            const h = n.getOIDByAlgorithm({
              name: i.oaepHashAlgorithm
            }, !0, "RSAES-OAEP-params"), m = new v({
              algorithmId: h,
              algorithmParams: new Ae()
            });
            l = new We({
              hashAlgorithm: m,
              maskGenAlgorithm: new v({
                algorithmId: "1.2.840.113549.1.1.8",
                algorithmParams: m.toSchema()
              })
            }).toSchema();
          } else {
            if (a = n.getOIDByAlgorithm({
              name: "RSAES-PKCS1-v1_5"
            }), a === u)
              throw new Error("Can not find OID for RSAES-PKCS1-v1_5");
            l = new Ae();
          }
          const c = new rt({
            version: 0,
            rid: new Be({
              issuer: e.issuer,
              serialNumber: e.serialNumber
            }),
            keyEncryptionAlgorithm: new v({
              algorithmId: a,
              algorithmParams: l
            }),
            recipientCertificate: e
          });
          this.recipientInfos.push(new St({
            variant: 1,
            value: c
          }));
        }
        break;
      case 2:
        {
          const a = new jt({
            variant: 1,
            value: new Be({
              issuer: e.issuer,
              serialNumber: e.serialNumber
            })
          });
          this._addKeyAgreeRecipientInfo(a, i, { recipientCertificate: e }, n);
        }
        break;
      default:
        throw new Error(`Unknown "variant" value: ${s}`);
    }
    return !0;
  }
  addRecipientByPreDefinedData(e, t = {}, s, n = F(!0)) {
    if (ie.assert(e, "preDefinedData", "ArrayBuffer"), !e.byteLength)
      throw new Error("Pre-defined data could have zero length");
    if (!t.keyIdentifier) {
      const i = new ArrayBuffer(16), a = new Uint8Array(i);
      n.getRandomValues(a), t.keyIdentifier = i;
    }
    switch (t.hmacHashAlgorithm || (t.hmacHashAlgorithm = "SHA-512"), t.iterationCount === void 0 && (t.iterationCount = 2048), t.keyEncryptionAlgorithm || (t.keyEncryptionAlgorithm = {
      name: "AES-KW",
      length: 256
    }), t.keyEncryptionAlgorithmParams || (t.keyEncryptionAlgorithmParams = new Ae()), s) {
      case 1:
        {
          const i = n.getOIDByAlgorithm(t.keyEncryptionAlgorithm, !0, "keyEncryptionAlgorithm"), a = new at({
            version: 4,
            kekid: new Vt({
              keyIdentifier: new I({ valueHex: t.keyIdentifier })
            }),
            keyEncryptionAlgorithm: new v({
              algorithmId: i,
              algorithmParams: t.keyEncryptionAlgorithmParams
            }),
            preDefinedKEK: e
          });
          this.recipientInfos.push(new St({
            variant: 3,
            value: a
          }));
        }
        break;
      case 2:
        {
          const i = n.getOIDByAlgorithm({ name: "PBKDF2" }, !0, "keyDerivationAlgorithm"), a = new ArrayBuffer(64), l = new Uint8Array(a);
          n.getRandomValues(l);
          const c = n.getOIDByAlgorithm({
            name: "HMAC",
            hash: {
              name: t.hmacHashAlgorithm
            }
          }, !0, "hmacHashAlgorithm"), h = new Je({
            salt: new I({ valueHex: a }),
            iterationCount: t.iterationCount,
            prf: new v({
              algorithmId: c,
              algorithmParams: new Ae()
            })
          }), m = n.getOIDByAlgorithm(t.keyEncryptionAlgorithm, !0, "keyEncryptionAlgorithm"), g = new yt({
            version: 0,
            keyDerivationAlgorithm: new v({
              algorithmId: i,
              algorithmParams: h.toSchema()
            }),
            keyEncryptionAlgorithm: new v({
              algorithmId: m,
              algorithmParams: t.keyEncryptionAlgorithmParams
            }),
            password: e
          });
          this.recipientInfos.push(new St({
            variant: 4,
            value: g
          }));
        }
        break;
      default:
        throw new Error(`Unknown value for "variant": ${s}`);
    }
  }
  addRecipientByKeyIdentifier(e, t, s, n = F(!0)) {
    const i = Object.assign({}, id, s || {}), a = new jt({
      variant: 2,
      value: new _t({
        subjectKeyIdentifier: new I({ valueHex: t })
      })
    });
    this._addKeyAgreeRecipientInfo(a, i, { recipientPublicKey: e }, n);
  }
  _addKeyAgreeRecipientInfo(e, t, s, n = F(!0)) {
    const i = new ms({
      rid: e
    }), a = n.getOIDByAlgorithm({
      name: "AES-KW",
      length: t.kekEncryptionLength
    }, !0, "keyEncryptionAlgorithm"), l = new v({
      algorithmId: a
    }), c = n.getOIDByAlgorithm({
      name: "ECDH",
      kdf: t.kdfAlgorithm
    }, !0, "KeyAgreeRecipientInfo"), h = new ArrayBuffer(64), m = new Uint8Array(h);
    n.getRandomValues(m);
    const g = {
      version: 3,
      ukm: new I({ valueHex: h }),
      keyEncryptionAlgorithm: new v({
        algorithmId: c,
        algorithmParams: l.toSchema()
      }),
      recipientEncryptedKeys: new On({
        encryptedKeys: [i]
      })
    }, d = new tt(Object.assign(g, s));
    this.recipientInfos.push(new St({
      variant: 2,
      value: d
    }));
  }
  async encrypt(e, t, s = F(!0)) {
    const n = new ArrayBuffer(16), i = new Uint8Array(n);
    s.getRandomValues(i);
    const a = new Uint8Array(t), l = s.getOIDByAlgorithm(e, !0, "contentEncryptionAlgorithm"), c = await s.generateKey(e, !0, ["encrypt"]), h = await s.encrypt({
      name: e.name,
      iv: i
    }, c, a), m = await s.exportKey("raw", c);
    this.version = 2, this.encryptedContentInfo = new Ee({
      disableSplit: this.policy.disableSplit,
      contentType: "1.2.840.113549.1.7.1",
      contentEncryptionAlgorithm: new v({
        algorithmId: l,
        algorithmParams: new I({ valueHex: n })
      }),
      encryptedContent: new I({ valueHex: h })
    });
    const g = async (y) => {
      const O = this.recipientInfos[y].value;
      let x, B;
      if (O.recipientPublicKey)
        x = O.recipientPublicKey.algorithm.namedCurve, B = O.recipientPublicKey;
      else if (O.recipientCertificate) {
        const P = O.recipientCertificate.subjectPublicKeyInfo.algorithm.algorithmParams;
        if (P.constructor.blockName() !== T.blockName())
          throw new Error(`Incorrect "recipientCertificate" for index ${y}`);
        switch (P.valueBlock.toString()) {
          case "1.2.840.10045.3.1.7":
            x = "P-256";
            break;
          case "1.3.132.0.34":
            x = "P-384";
            break;
          case "1.3.132.0.35":
            x = "P-521";
            break;
          default:
            throw new Error(`Incorrect curve OID for index ${y}`);
        }
        B = await O.recipientCertificate.getPublicKey({
          algorithm: {
            algorithm: {
              name: "ECDH",
              namedCurve: x
            },
            usages: []
          }
        }, s);
      } else
        throw new Error("Unsupported RecipientInfo");
      const V = Xy[x], R = await s.generateKey({ name: "ECDH", namedCurve: x }, !0, ["deriveBits"]), _ = await s.exportKey("spki", R.publicKey), te = await s.deriveBits({
        name: "ECDH",
        public: B
      }, R.privateKey, V), j = new v({ schema: O.keyEncryptionAlgorithm.algorithmParams }), Z = s.getAlgorithmByOID(j.algorithmId, !0, "aesKWAlgorithm");
      let ye = Z.length;
      const se = new ArrayBuffer(4), ae = new Uint8Array(se);
      for (let P = 3; P >= 0; P--)
        ae[P] = ye, ye >>= 8;
      const Me = new ls({
        keyInfo: new v({
          algorithmId: j.algorithmId
        }),
        entityUInfo: O.ukm,
        suppPubInfo: new I({ valueHex: se })
      }).toSchema().toBER(!1), fe = s.getAlgorithmByOID(O.keyEncryptionAlgorithm.algorithmId, !0, "ecdhAlgorithm"), ze = await Ff(fe.kdf, te, Z.length, Me, s), et = await s.importKey("raw", ze, { name: "AES-KW" }, !0, ["wrapKey"]), mt = await s.wrapKey("raw", c, et, { name: "AES-KW" }), we = new vs();
      return we.variant = 3, we.value = ds.fromBER(_), O.originator = we, O.recipientEncryptedKeys.encryptedKeys[0].encryptedKey = new I({ valueHex: mt }), { ecdhPrivateKey: R.privateKey };
    }, d = async (y) => {
      const O = this.recipientInfos[y].value, x = s.getAlgorithmByOID(O.keyEncryptionAlgorithm.algorithmId, !0, "keyEncryptionAlgorithm");
      if (x.name === "RSA-OAEP") {
        const B = O.keyEncryptionAlgorithm.algorithmParams, V = new We({ schema: B });
        if (x.hash = s.getAlgorithmByOID(V.hashAlgorithm.algorithmId), !("name" in x.hash))
          throw new Error(`Incorrect OID for hash algorithm: ${V.hashAlgorithm.algorithmId}`);
      }
      try {
        const B = await O.recipientCertificate.getPublicKey({
          algorithm: {
            algorithm: x,
            usages: ["encrypt", "wrapKey"]
          }
        }, s), V = await s.encrypt(B.algorithm, B, m);
        O.encryptedKey = new I({ valueHex: V });
      } catch {
      }
    }, b = async (y) => {
      const O = this.recipientInfos[y].value, x = s.getAlgorithmByOID(O.keyEncryptionAlgorithm.algorithmId, !0, "kekAlgorithm"), B = await s.importKey("raw", new Uint8Array(O.preDefinedKEK), x, !0, ["wrapKey"]), V = await s.wrapKey("raw", c, B, x);
      O.encryptedKey = new I({ valueHex: V });
    }, A = async (y) => {
      const O = this.recipientInfos[y].value;
      let x;
      if (!O.keyDerivationAlgorithm)
        throw new Error('Please append encoded "keyDerivationAlgorithm"');
      if (!O.keyDerivationAlgorithm.algorithmParams)
        throw new Error('Incorrectly encoded "keyDerivationAlgorithm"');
      try {
        x = new Je({ schema: O.keyDerivationAlgorithm.algorithmParams });
      } catch {
        throw new Error('Incorrectly encoded "keyDerivationAlgorithm"');
      }
      const B = new Uint8Array(O.password), V = await s.importKey("raw", B, "PBKDF2", !1, ["deriveKey"]), R = s.getAlgorithmByOID(O.keyEncryptionAlgorithm.algorithmId, !0, "kekAlgorithm");
      let _ = "SHA-1";
      x.prf && (_ = s.getAlgorithmByOID(x.prf.algorithmId, !0, "prfAlgorithm").hash.name);
      const te = new Uint8Array(x.salt.valueBlock.valueHex), j = x.iterationCount, Z = await s.deriveKey({
        name: "PBKDF2",
        hash: {
          name: _
        },
        salt: te,
        iterations: j
      }, V, R, !0, ["wrapKey"]), ye = await s.wrapKey("raw", c, Z, R);
      O.encryptedKey = new I({ valueHex: ye });
    }, E = [];
    for (let y = 0; y < this.recipientInfos.length; y++)
      switch (this.recipientInfos[y].variant) {
        case 1:
          E.push(await d(y));
          break;
        case 2:
          E.push(await g(y));
          break;
        case 3:
          E.push(await b(y));
          break;
        case 4:
          E.push(await A(y));
          break;
        default:
          throw new Error(`Unknown recipient type in array with index ${y}`);
      }
    return E;
  }
  async decrypt(e, t, s = F(!0)) {
    const n = t || {};
    if (e + 1 > this.recipientInfos.length)
      throw new Error(`Maximum value for "index" is: ${this.recipientInfos.length - 1}`);
    const i = async (E) => {
      const y = this.recipientInfos[E].value;
      let O, x, B;
      const V = y.originator;
      if (n.recipientCertificate) {
        const fe = n.recipientCertificate.subjectPublicKeyInfo.algorithm.algorithmParams;
        if (fe.constructor.blockName() !== T.blockName())
          throw new Error(`Incorrect "recipientCertificate" for index ${E}`);
        O = fe.valueBlock.toString();
      } else if (V.value.algorithm.algorithmParams) {
        const fe = V.value.algorithm.algorithmParams;
        if (fe.constructor.blockName() !== T.blockName())
          throw new Error(`Incorrect originator for index ${E}`);
        O = fe.valueBlock.toString();
      } else
        throw new Error('Parameter "recipientCertificate" is mandatory for "KeyAgreeRecipientInfo" if algorithm params are missing from originator');
      if (!n.recipientPrivateKey)
        throw new Error('Parameter "recipientPrivateKey" is mandatory for "KeyAgreeRecipientInfo"');
      switch (O) {
        case "1.2.840.10045.3.1.7":
          x = "P-256", B = 256;
          break;
        case "1.3.132.0.34":
          x = "P-384", B = 384;
          break;
        case "1.3.132.0.35":
          x = "P-521", B = 528;
          break;
        default:
          throw new Error(`Incorrect curve OID for index ${E}`);
      }
      let R, _ = s;
      L.isBufferSource(n.recipientPrivateKey) ? R = await s.importKey("pkcs8", n.recipientPrivateKey, {
        name: "ECDH",
        namedCurve: x
      }, !0, ["deriveBits"]) : (R = n.recipientPrivateKey, "crypto" in n && n.crypto && (_ = n.crypto.subtle)), "algorithmParams" in V.value.algorithm || (V.value.algorithm.algorithmParams = new T({ value: O }));
      const te = V.value.toSchema().toBER(!1), j = await s.importKey("spki", te, {
        name: "ECDH",
        namedCurve: x
      }, !0, []), Z = await _.deriveBits({
        name: "ECDH",
        public: j
      }, R, B);
      async function ye(fe) {
        fe = fe || !1;
        const ze = new v({ schema: y.keyEncryptionAlgorithm.algorithmParams }), et = s.getAlgorithmByOID(ze.algorithmId, !0, "kwAlgorithm");
        let mt = et.length;
        const we = new ArrayBuffer(4), P = new Uint8Array(we);
        for (let Te = 3; Te >= 0; Te--)
          P[Te] = mt, mt >>= 8;
        const q = {
          algorithmId: ze.algorithmId
        };
        fe && (q.algorithmParams = new Ae());
        const Y = new ls({
          keyInfo: new v(q),
          entityUInfo: y.ukm,
          suppPubInfo: new I({ valueHex: we })
        }).toSchema().toBER(!1), ne = s.getAlgorithmByOID(y.keyEncryptionAlgorithm.algorithmId, !0, "ecdhAlgorithm");
        if (!ne.name)
          throw new Error(`Incorrect OID for key encryption algorithm: ${y.keyEncryptionAlgorithm.algorithmId}`);
        return Ff(ne.kdf, Z, et.length, Y, s);
      }
      const se = await ye(), ae = async (fe) => s.importKey("raw", fe, { name: "AES-KW" }, !0, ["unwrapKey"]), Wt = await ae(se), Me = async (fe) => {
        const ze = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId, et = s.getAlgorithmByOID(ze, !0, "contentEncryptionAlgorithm");
        return s.unwrapKey("raw", y.recipientEncryptedKeys.encryptedKeys[0].encryptedKey.valueBlock.valueHexView, fe, { name: "AES-KW" }, et, !0, ["decrypt"]);
      };
      try {
        return await Me(Wt);
      } catch {
        const fe = await ye(!0), ze = await ae(fe);
        return Me(ze);
      }
    }, a = async (E) => {
      const y = this.recipientInfos[E].value;
      if (!n.recipientPrivateKey)
        throw new Error('Parameter "recipientPrivateKey" is mandatory for "KeyTransRecipientInfo"');
      const O = s.getAlgorithmByOID(y.keyEncryptionAlgorithm.algorithmId, !0, "keyEncryptionAlgorithm");
      if (O.name === "RSA-OAEP") {
        const te = y.keyEncryptionAlgorithm.algorithmParams, j = new We({ schema: te });
        if (O.hash = s.getAlgorithmByOID(j.hashAlgorithm.algorithmId), !("name" in O.hash))
          throw new Error(`Incorrect OID for hash algorithm: ${j.hashAlgorithm.algorithmId}`);
      }
      let x, B = s;
      L.isBufferSource(n.recipientPrivateKey) ? x = await s.importKey("pkcs8", n.recipientPrivateKey, O, !0, ["decrypt"]) : (x = n.recipientPrivateKey, "crypto" in n && n.crypto && (B = n.crypto.subtle));
      const V = await B.decrypt(x.algorithm, x, y.encryptedKey.valueBlock.valueHexView), R = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId, _ = s.getAlgorithmByOID(R, !0, "contentEncryptionAlgorithm");
      if (!("name" in _))
        throw new Error(`Incorrect "contentEncryptionAlgorithm": ${R}`);
      return s.importKey("raw", V, _, !0, ["decrypt"]);
    }, l = async (E) => {
      const y = this.recipientInfos[E].value;
      if (!n.preDefinedData)
        throw new Error('Parameter "preDefinedData" is mandatory for "KEKRecipientInfo"');
      const O = s.getAlgorithmByOID(y.keyEncryptionAlgorithm.algorithmId, !0, "kekAlgorithm"), x = await s.importKey("raw", n.preDefinedData, O, !0, ["unwrapKey"]), B = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId, V = s.getAlgorithmByOID(B, !0, "contentEncryptionAlgorithm");
      if (!V.name)
        throw new Error(`Incorrect "contentEncryptionAlgorithm": ${B}`);
      return s.unwrapKey("raw", y.encryptedKey.valueBlock.valueHexView, x, O, V, !0, ["decrypt"]);
    }, c = async (E) => {
      const y = this.recipientInfos[E].value;
      let O;
      if (!n.preDefinedData)
        throw new Error('Parameter "preDefinedData" is mandatory for "KEKRecipientInfo"');
      if (!y.keyDerivationAlgorithm)
        throw new Error('Please append encoded "keyDerivationAlgorithm"');
      if (!y.keyDerivationAlgorithm.algorithmParams)
        throw new Error('Incorrectly encoded "keyDerivationAlgorithm"');
      try {
        O = new Je({ schema: y.keyDerivationAlgorithm.algorithmParams });
      } catch {
        throw new Error('Incorrectly encoded "keyDerivationAlgorithm"');
      }
      const x = await s.importKey("raw", n.preDefinedData, "PBKDF2", !1, ["deriveKey"]), B = s.getAlgorithmByOID(y.keyEncryptionAlgorithm.algorithmId, !0, "keyEncryptionAlgorithm"), V = O.prf ? s.getAlgorithmByOID(O.prf.algorithmId, !0, "prfAlgorithm").hash.name : "SHA-1", R = new Uint8Array(O.salt.valueBlock.valueHex), _ = O.iterationCount, te = await s.deriveKey({
        name: "PBKDF2",
        hash: {
          name: V
        },
        salt: R,
        iterations: _
      }, x, B, !0, ["unwrapKey"]), j = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId, Z = s.getAlgorithmByOID(j, !0, "contentEncryptionAlgorithm");
      return s.unwrapKey("raw", y.encryptedKey.valueBlock.valueHexView, te, B, Z, !0, ["decrypt"]);
    };
    let h;
    switch (this.recipientInfos[e].variant) {
      case 1:
        h = await a(e);
        break;
      case 2:
        h = await i(e);
        break;
      case 3:
        h = await l(e);
        break;
      case 4:
        h = await c(e);
        break;
      default:
        throw new Error(`Unknown recipient type in array with index ${e}`);
    }
    const m = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId, g = s.getAlgorithmByOID(m, !0, "contentEncryptionAlgorithm"), d = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmParams.valueBlock.valueHex, b = new Uint8Array(d);
    if (!this.encryptedContentInfo.encryptedContent)
      throw new Error("Required property `encryptedContent` is empty");
    const A = this.encryptedContentInfo.getEncryptedContent();
    return s.decrypt({
      name: g.name,
      iv: b
    }, h, A);
  }
}
Bt.CLASS_NAME = "EnvelopedData";
const lr = "safeContents", co = "parsedValue", rd = "contentInfos";
class zi extends k {
  constructor(e = {}) {
    super(), this.safeContents = r(e, lr, zi.defaultValues(lr)), co in e && (this.parsedValue = r(e, co, zi.defaultValues(co))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case lr:
        return [];
      case co:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case lr:
        return t.length === 0;
      case co:
        return t instanceof Object && Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new J({
          name: t.contentInfos || u,
          value: oe.schema()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, [
      rd
    ]);
    const t = N(e, e, zi.schema({
      names: {
        contentInfos: rd
      }
    }));
    p.assertSchema(t, this.className), this.safeContents = Array.from(t.result.contentInfos, (s) => new oe({ schema: s }));
  }
  toSchema() {
    return new f({
      value: Array.from(this.safeContents, (e) => e.toSchema())
    });
  }
  toJSON() {
    return {
      safeContents: Array.from(this.safeContents, (e) => e.toJSON())
    };
  }
  async parseInternalValues(e, t = F(!0)) {
    if (Q.assert(e, lr), ie.assert(e.safeContents, lr, "Array"), e.safeContents.length !== this.safeContents.length)
      throw new ie('Length of "parameters.safeContents" must be equal to "this.safeContents.length"');
    this.parsedValue = {
      safeContents: []
    };
    for (const [s, n] of this.safeContents.entries()) {
      const i = e.safeContents[s], a = `parameters.safeContents[${s}]`;
      switch (n.contentType) {
        case Af:
          {
            ie.assert(n.content, "this.safeContents[j].content", I);
            const l = n.content.getValue();
            this.parsedValue.safeContents.push({
              privacyMode: 0,
              value: fs.fromBER(l)
            });
          }
          break;
        case xm:
          {
            const l = new Bt({ schema: n.content });
            Q.assert(a, i, "recipientCertificate", "recipientKey");
            const c = i, h = c.recipientCertificate, m = c.recipientKey, g = await l.decrypt(0, {
              recipientCertificate: h,
              recipientPrivateKey: m
            }, t);
            this.parsedValue.safeContents.push({
              privacyMode: 2,
              value: fs.fromBER(g)
            });
          }
          break;
        case Om:
          {
            const l = new Kt({ schema: n.content });
            Q.assert(a, i, "password");
            const c = i.password, h = await l.decrypt({
              password: c
            }, t);
            this.parsedValue.safeContents.push({
              privacyMode: 1,
              value: fs.fromBER(h)
            });
          }
          break;
        default:
          throw new Error(`Unknown "contentType" for AuthenticatedSafe: " ${n.contentType}`);
      }
    }
  }
  async makeInternalValues(e, t = F(!0)) {
    if (!this.parsedValue)
      throw new Error('Please run "parseValues" first or add "parsedValue" manually');
    if (ie.assert(this.parsedValue, "this.parsedValue", "object"), ie.assert(this.parsedValue.safeContents, "this.parsedValue.safeContents", "Array"), ie.assert(e, "parameters", "object"), Q.assert(e, "safeContents"), ie.assert(e.safeContents, "parameters.safeContents", "Array"), e.safeContents.length !== this.parsedValue.safeContents.length)
      throw new ie('Length of "parameters.safeContents" must be equal to "this.parsedValue.safeContents"');
    this.safeContents = [];
    for (const [s, n] of this.parsedValue.safeContents.entries())
      switch (Q.assert("content", n, "privacyMode", "value"), ie.assert(n.value, "content.value", fs), n.privacyMode) {
        case 0:
          {
            const i = n.value.toSchema().toBER(!1);
            this.safeContents.push(new oe({
              contentType: "1.2.840.113549.1.7.1",
              content: new I({ valueHex: i })
            }));
          }
          break;
        case 1:
          {
            const i = new Kt(), a = e.safeContents[s];
            a.contentToEncrypt = n.value.toSchema().toBER(!1), await i.encrypt(a, t), this.safeContents.push(new oe({
              contentType: "1.2.840.113549.1.7.6",
              content: i.toSchema()
            }));
          }
          break;
        case 2:
          {
            const i = new Bt(), a = n.value.toSchema().toBER(!1), l = e.safeContents[s];
            switch (Q.assert(`parameters.safeContents[${s}]`, l, "encryptingCertificate", "encryptionAlgorithm"), !0) {
              case l.encryptionAlgorithm.name.toLowerCase() === "aes-cbc":
              case l.encryptionAlgorithm.name.toLowerCase() === "aes-gcm":
                break;
              default:
                throw new Error(`Incorrect parameter "encryptionAlgorithm" in "parameters.safeContents[i]": ${l.encryptionAlgorithm}`);
            }
            switch (!0) {
              case l.encryptionAlgorithm.length === 128:
              case l.encryptionAlgorithm.length === 192:
              case l.encryptionAlgorithm.length === 256:
                break;
              default:
                throw new Error(`Incorrect parameter "encryptionAlgorithm.length" in "parameters.safeContents[i]": ${l.encryptionAlgorithm.length}`);
            }
            const c = l.encryptionAlgorithm;
            i.addRecipientByCertificate(l.encryptingCertificate, {}, void 0, t), await i.encrypt(c, a, t), this.safeContents.push(new oe({
              contentType: "1.2.840.113549.1.7.3",
              content: i.toSchema()
            }));
          }
          break;
        default:
          throw new Error(`Incorrect value for "content.privacyMode": ${n.privacyMode}`);
      }
    return this;
  }
}
zi.CLASS_NAME = "AuthenticatedSafe";
const Ni = "hashAlgorithm", sa = "issuerNameHash", na = "issuerKeyHash", Ci = "serialNumber", Zy = [
  Ni,
  sa,
  na,
  Ci
];
class Ne extends k {
  static async create(e, t, s = F(!0)) {
    const n = new Ne();
    return await n.createForCertificate(e, t, s), n;
  }
  constructor(e = {}) {
    super(), this.hashAlgorithm = r(e, Ni, Ne.defaultValues(Ni)), this.issuerNameHash = r(e, sa, Ne.defaultValues(sa)), this.issuerKeyHash = r(e, na, Ne.defaultValues(na)), this.serialNumber = r(e, Ci, Ne.defaultValues(Ci)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ni:
        return new v();
      case sa:
      case na:
        return new I();
      case Ci:
        return new S();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Ni:
        return t.algorithmId === u && !("algorithmParams" in t);
      case sa:
      case na:
      case Ci:
        return t.isEqual(Ne.defaultValues(Ci));
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        v.schema(t.hashAlgorithmObject || {
          names: {
            blockName: t.hashAlgorithm || u
          }
        }),
        new I({ name: t.issuerNameHash || u }),
        new I({ name: t.issuerKeyHash || u }),
        new S({ name: t.serialNumber || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, Zy);
    const t = N(e, e, Ne.schema({
      names: {
        hashAlgorithm: Ni,
        issuerNameHash: sa,
        issuerKeyHash: na,
        serialNumber: Ci
      }
    }));
    p.assertSchema(t, this.className), this.hashAlgorithm = new v({ schema: t.result.hashAlgorithm }), this.issuerNameHash = t.result.issuerNameHash, this.issuerKeyHash = t.result.issuerKeyHash, this.serialNumber = t.result.serialNumber;
  }
  toSchema() {
    return new f({
      value: [
        this.hashAlgorithm.toSchema(),
        this.issuerNameHash,
        this.issuerKeyHash,
        this.serialNumber
      ]
    });
  }
  toJSON() {
    return {
      hashAlgorithm: this.hashAlgorithm.toJSON(),
      issuerNameHash: this.issuerNameHash.toJSON(),
      issuerKeyHash: this.issuerKeyHash.toJSON(),
      serialNumber: this.serialNumber.toJSON()
    };
  }
  isEqual(e) {
    return !(this.hashAlgorithm.algorithmId !== e.hashAlgorithm.algorithmId || !L.isEqual(this.issuerNameHash.valueBlock.valueHexView, e.issuerNameHash.valueBlock.valueHexView) || !L.isEqual(this.issuerKeyHash.valueBlock.valueHexView, e.issuerKeyHash.valueBlock.valueHexView) || !this.serialNumber.isEqual(e.serialNumber));
  }
  async createForCertificate(e, t, s = F(!0)) {
    Q.assert(t, Ni, "issuerCertificate");
    const n = s.getOIDByAlgorithm({ name: t.hashAlgorithm }, !0, "hashAlgorithm");
    this.hashAlgorithm = new v({
      algorithmId: n,
      algorithmParams: new Ae()
    });
    const i = t.issuerCertificate;
    this.serialNumber = e.serialNumber;
    const a = await s.digest({ name: t.hashAlgorithm }, i.subject.toSchema().toBER(!1));
    this.issuerNameHash = new I({ valueHex: a });
    const l = i.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView, c = await s.digest({ name: t.hashAlgorithm }, l);
    this.issuerKeyHash = new I({ valueHex: c });
  }
}
Ne.CLASS_NAME = "CertID";
const ia = "certID", ra = "certStatus", aa = "thisUpdate", cn = "nextUpdate", Bi = "singleExtensions", zy = [
  ia,
  ra,
  aa,
  cn,
  Bi
];
class It extends k {
  constructor(e = {}) {
    super(), this.certID = r(e, ia, It.defaultValues(ia)), this.certStatus = r(e, ra, It.defaultValues(ra)), this.thisUpdate = r(e, aa, It.defaultValues(aa)), cn in e && (this.nextUpdate = r(e, cn, It.defaultValues(cn))), Bi in e && (this.singleExtensions = r(e, Bi, It.defaultValues(Bi))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case ia:
        return new Ne();
      case ra:
        return {};
      case aa:
      case cn:
        return new Date(0, 0, 0);
      case Bi:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case ia:
        return Ne.compareWithDefault("hashAlgorithm", t.hashAlgorithm) && Ne.compareWithDefault("issuerNameHash", t.issuerNameHash) && Ne.compareWithDefault("issuerKeyHash", t.issuerKeyHash) && Ne.compareWithDefault("serialNumber", t.serialNumber);
      case ra:
        return Object.keys(t).length === 0;
      case aa:
      case cn:
        return t === It.defaultValues(e);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        Ne.schema(t.certID || {}),
        new he({
          value: [
            new M({
              name: t.certStatus || u,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              }
            }),
            new w({
              name: t.certStatus || u,
              idBlock: {
                tagClass: 3,
                tagNumber: 1
              },
              value: [
                new ue(),
                new w({
                  optional: !0,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 0
                  },
                  value: [new tr()]
                })
              ]
            }),
            new M({
              name: t.certStatus || u,
              idBlock: {
                tagClass: 3,
                tagNumber: 2
              },
              lenBlock: { length: 1 }
            })
          ]
        }),
        new ue({ name: t.thisUpdate || u }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new ue({ name: t.nextUpdate || u })]
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [ke.schema(t.singleExtensions || {})]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, zy);
    const t = N(e, e, It.schema({
      names: {
        certID: {
          names: {
            blockName: ia
          }
        },
        certStatus: ra,
        thisUpdate: aa,
        nextUpdate: cn,
        singleExtensions: {
          names: {
            blockName: Bi
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.certID = new Ne({ schema: t.result.certID }), this.certStatus = t.result.certStatus, this.thisUpdate = t.result.thisUpdate.toDate(), cn in t.result && (this.nextUpdate = t.result.nextUpdate.toDate()), Bi in t.result && (this.singleExtensions = Array.from(t.result.singleExtensions.valueBlock.value, (s) => new Ve({ schema: s })));
  }
  toSchema() {
    const e = [];
    return e.push(this.certID.toSchema()), e.push(this.certStatus), e.push(new ue({ valueDate: this.thisUpdate })), this.nextUpdate && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [new ue({ valueDate: this.nextUpdate })]
    })), this.singleExtensions && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: [new f({ value: Array.from(this.singleExtensions, (t) => t.toSchema()) })]
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      certID: this.certID.toJSON(),
      certStatus: this.certStatus.toJSON(),
      thisUpdate: this.thisUpdate
    };
    return this.nextUpdate && (e.nextUpdate = this.nextUpdate), this.singleExtensions && (e.singleExtensions = Array.from(this.singleExtensions, (t) => t.toJSON())), e;
  }
}
It.CLASS_NAME = "SingleResponse";
const Yc = "tbs", Ii = "version", Jl = "responderID", jl = "producedAt", Fl = "responses", oa = "responseExtensions", nr = "ResponseData", ou = `${nr}.${Ii}`, la = `${nr}.${Jl}`, Hh = `${nr}.${jl}`, Mh = `${nr}.${Fl}`, lu = `${nr}.${oa}`, ev = [
  nr,
  ou,
  la,
  Hh,
  Mh,
  lu
];
class Re extends k {
  get tbs() {
    return L.toArrayBuffer(this.tbsView);
  }
  set tbs(e) {
    this.tbsView = new Uint8Array(e);
  }
  constructor(e = {}) {
    super(), this.tbsView = new Uint8Array(r(e, Yc, Re.defaultValues(Yc))), Ii in e && (this.version = r(e, Ii, Re.defaultValues(Ii))), this.responderID = r(e, Jl, Re.defaultValues(Jl)), this.producedAt = r(e, jl, Re.defaultValues(jl)), this.responses = r(e, Fl, Re.defaultValues(Fl)), oa in e && (this.responseExtensions = r(e, oa, Re.defaultValues(oa))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ii:
        return 0;
      case Yc:
        return be;
      case Jl:
        return {};
      case jl:
        return new Date(0, 0, 0);
      case Fl:
      case oa:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Yc:
        return t.byteLength === 0;
      case Jl:
        return Object.keys(t).length === 0;
      case jl:
        return t === Re.defaultValues(e);
      case Fl:
      case oa:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || nr,
      value: [
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new S({ name: t.version || ou })]
        }),
        new he({
          value: [
            new w({
              name: t.responderID || la,
              idBlock: {
                tagClass: 3,
                tagNumber: 1
              },
              value: [re.schema(t.ResponseDataByName || {
                names: {
                  blockName: "ResponseData.byName"
                }
              })]
            }),
            new w({
              name: t.responderID || la,
              idBlock: {
                tagClass: 3,
                tagNumber: 2
              },
              value: [new I({ name: t.ResponseDataByKey || "ResponseData.byKey" })]
            })
          ]
        }),
        new ue({ name: t.producedAt || Hh }),
        new f({
          value: [
            new J({
              name: Mh,
              value: It.schema(t.response || {})
            })
          ]
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [ke.schema(t.extensions || {
            names: {
              blockName: lu
            }
          })]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, ev);
    const t = N(e, e, Re.schema());
    p.assertSchema(t, this.className), this.tbsView = t.result.ResponseData.valueBeforeDecodeView, ou in t.result && (this.version = t.result[ou].valueBlock.valueDec), t.result[la].idBlock.tagNumber === 1 ? this.responderID = new re({ schema: t.result[la].valueBlock.value[0] }) : this.responderID = t.result[la].valueBlock.value[0], this.producedAt = t.result[Hh].toDate(), this.responses = Array.from(t.result[Mh], (s) => new It({ schema: s })), lu in t.result && (this.responseExtensions = Array.from(t.result[lu].valueBlock.value, (s) => new Ve({ schema: s })));
  }
  toSchema(e = !1) {
    let t;
    if (e === !1) {
      if (!this.tbsView.byteLength)
        return Re.schema();
      const s = Oe(this.tbsView);
      p.assert(s, "TBS Response Data"), t = s.result;
    } else {
      const s = [];
      Ii in this && s.push(new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [new S({ value: this.version })]
      })), this.responderID instanceof re ? s.push(new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [this.responderID.toSchema()]
      })) : s.push(new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        },
        value: [this.responderID]
      })), s.push(new ue({ valueDate: this.producedAt })), s.push(new f({
        value: Array.from(this.responses, (n) => n.toSchema())
      })), this.responseExtensions && s.push(new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [new f({
          value: Array.from(this.responseExtensions, (n) => n.toSchema())
        })]
      })), t = new f({
        value: s
      });
    }
    return t;
  }
  toJSON() {
    const e = {};
    return Ii in this && (e.version = this.version), this.responderID && (e.responderID = this.responderID), this.producedAt && (e.producedAt = this.producedAt), this.responses && (e.responses = Array.from(this.responses, (t) => t.toJSON())), this.responseExtensions && (e.responseExtensions = Array.from(this.responseExtensions, (t) => t.toJSON())), e;
  }
}
Re.CLASS_NAME = "ResponseData";
const vh = "trustedCerts", Sh = "certs", Ah = "crls", ph = "ocsps", bh = "checkDate", kh = "findOrigin", Eh = "findIssuer";
var Hi;
(function(o) {
  o[o.unknown = -1] = "unknown", o[o.success = 0] = "success", o[o.noRevocation = 11] = "noRevocation", o[o.noPath = 60] = "noPath", o[o.noValidPath = 97] = "noValidPath";
})(Hi || (Hi = {}));
class An extends Error {
  constructor(e, t) {
    super(t), this.name = An.NAME, this.code = e, this.message = t;
  }
}
An.NAME = "ChainValidationError";
function tv(o, e) {
  for (let t = 0; t < e.length; t++)
    if (L.isEqual(o.tbsView, e[t].tbsView))
      return !0;
  return !1;
}
class Gu {
  constructor(e = {}) {
    this.trustedCerts = r(e, vh, this.defaultValues(vh)), this.certs = r(e, Sh, this.defaultValues(Sh)), this.crls = r(e, Ah, this.defaultValues(Ah)), this.ocsps = r(e, ph, this.defaultValues(ph)), this.checkDate = r(e, bh, this.defaultValues(bh)), this.findOrigin = r(e, kh, this.defaultValues(kh)), this.findIssuer = r(e, Eh, this.defaultValues(Eh));
  }
  static defaultFindOrigin(e, t) {
    e.tbsView.byteLength === 0 && (e.tbsView = new Uint8Array(e.encodeTBS().toBER()));
    for (const s of t.certs)
      if (s.tbsView.byteLength === 0 && (s.tbsView = new Uint8Array(s.encodeTBS().toBER())), L.isEqual(e.tbsView, s.tbsView))
        return "Intermediate Certificates";
    for (const s of t.trustedCerts)
      if (s.tbsView.byteLength === 0 && (s.tbsView = new Uint8Array(s.encodeTBS().toBER())), L.isEqual(e.tbsView, s.tbsView))
        return "Trusted Certificates";
    return "Unknown";
  }
  async defaultFindIssuer(e, t, s = F(!0)) {
    const n = [];
    let i = null, a = null, l = null;
    if (e.subject.isEqual(e.issuer))
      try {
        if (await e.verify(void 0, s))
          return [e];
      } catch {
      }
    if (e.extensions) {
      for (const h of e.extensions)
        if (h.extnID === vf && h.parsedValue instanceof bn) {
          h.parsedValue.keyIdentifier ? i = h.parsedValue.keyIdentifier : (h.parsedValue.authorityCertIssuer && (a = h.parsedValue.authorityCertIssuer), h.parsedValue.authorityCertSerialNumber && (l = h.parsedValue.authorityCertSerialNumber));
          break;
        }
    }
    function c(h) {
      if (i !== null && h.extensions) {
        let g = !1;
        for (const d of h.extensions)
          if (d.extnID === rw && d.parsedValue) {
            g = !0, L.isEqual(d.parsedValue.valueBlock.valueHex, i.valueBlock.valueHexView) && n.push(h);
            break;
          }
        if (g)
          return;
      }
      let m = !1;
      l !== null && (m = h.serialNumber.isEqual(l)), a !== null ? h.subject.isEqual(a) && m && n.push(h) : e.issuer.isEqual(h.subject) && n.push(h);
    }
    for (const h of t.trustedCerts)
      c(h);
    for (const h of t.certs)
      c(h);
    for (let h = n.length - 1; h >= 0; h--)
      try {
        await e.verify(n[h], s) === !1 && n.splice(h, 1);
      } catch {
        n.splice(h, 1);
      }
    return n;
  }
  defaultValues(e) {
    switch (e) {
      case vh:
        return [];
      case Sh:
        return [];
      case Ah:
        return [];
      case ph:
        return [];
      case bh:
        return /* @__PURE__ */ new Date();
      case kh:
        return Gu.defaultFindOrigin;
      case Eh:
        return this.defaultFindIssuer;
      default:
        throw new Error(`Invalid member name for CertificateChainValidationEngine class: ${e}`);
    }
  }
  async sort(e = !1, t = F(!0)) {
    const s = [], n = async (A, E) => {
      const y = [];
      function O(B) {
        let V = !0;
        for (let R = 0; R < B.length; R++) {
          for (let _ = 0; _ < B.length; _++)
            if (_ !== R && B[R] === B[_]) {
              V = !1;
              break;
            }
          if (!V)
            break;
        }
        return V;
      }
      if (tv(A, this.trustedCerts))
        return [[A]];
      const x = await this.findIssuer(A, this, E);
      if (x.length === 0)
        throw new Error("No valid certificate paths found");
      for (let B = 0; B < x.length; B++) {
        if (L.isEqual(x[B].tbsView, A.tbsView)) {
          y.push([x[B]]);
          continue;
        }
        const V = await n(x[B], E);
        for (let R = 0; R < V.length; R++) {
          const _ = V[R].slice();
          _.splice(0, 0, x[B]), O(_) ? y.push(_) : y.push(V[R]);
        }
      }
      return y;
    }, i = async (A) => {
      const E = [], y = [], O = [];
      if (E.push(...s.filter((x) => A.issuer.isEqual(x.subject))), E.length === 0)
        return {
          status: 1,
          statusMessage: "No certificate's issuers"
        };
      if (y.push(...this.crls.filter((x) => x.issuer.isEqual(A.issuer))), y.length === 0)
        return {
          status: 2,
          statusMessage: "No CRLs for specific certificate issuer"
        };
      for (let x = 0; x < y.length; x++) {
        const B = y[x];
        if (!(B.nextUpdate && B.nextUpdate.value < this.checkDate))
          for (let V = 0; V < E.length; V++)
            try {
              if (await y[x].verify({ issuerCertificate: E[V] }, t)) {
                O.push({
                  crl: y[x],
                  certificate: E[V]
                });
                break;
              }
            } catch {
            }
      }
      return O.length ? {
        status: 0,
        statusMessage: u,
        result: O
      } : {
        status: 3,
        statusMessage: "No valid CRLs found"
      };
    }, a = async (A, E) => {
      const y = t.getAlgorithmByOID(A.signatureAlgorithm.algorithmId);
      if (!y.name || !y.hash)
        return 1;
      for (let O = 0; O < this.ocsps.length; O++) {
        const B = await this.ocsps[O].getCertificateStatus(A, E, t);
        if (B.isForCertificate)
          return B.status === 0 ? 0 : 1;
      }
      return 2;
    };
    async function l(A, E = !1) {
      let y = !1, O = !1, x = !1, B = !1;
      if (A.extensions) {
        for (let V = 0; V < A.extensions.length; V++) {
          const R = A.extensions[V];
          if (R.critical && !R.parsedValue)
            return {
              result: !1,
              resultCode: 6,
              resultMessage: `Unable to parse critical certificate extension: ${R.extnID}`
            };
          if (R.extnID === aw) {
            x = !0;
            const _ = new Uint8Array(R.parsedValue.valueBlock.valueHex);
            (_[0] & 4) === 4 && (O = !0), (_[0] & 2) === 2 && (B = !0);
          }
          R.extnID === wf && "cA" in R.parsedValue && R.parsedValue.cA === !0 && (y = !0);
        }
        if (O === !0 && y === !1)
          return {
            result: !1,
            resultCode: 3,
            resultMessage: 'Unable to build certificate chain - using "keyCertSign" flag set without BasicConstraints'
          };
        if (x === !0 && y === !0 && O === !1)
          return {
            result: !1,
            resultCode: 4,
            resultMessage: 'Unable to build certificate chain - "keyCertSign" flag was not set'
          };
        if (y === !0 && x === !0 && E && B === !1)
          return {
            result: !1,
            resultCode: 5,
            resultMessage: 'Unable to build certificate chain - intermediate certificate must have "cRLSign" key usage flag'
          };
      }
      return y === !1 ? {
        result: !1,
        resultCode: 7,
        resultMessage: "Unable to build certificate chain - more than one possible end-user certificate"
      } : {
        result: !0,
        resultCode: 0,
        resultMessage: u
      };
    }
    const c = async (A, E) => {
      for (let y = 0; y < A.length; y++)
        if (A[y].notBefore.value > E || A[y].notAfter.value < E)
          return {
            result: !1,
            resultCode: 8,
            resultMessage: "The certificate is either not yet valid or expired"
          };
      if (A.length < 2)
        return {
          result: !1,
          resultCode: 9,
          resultMessage: "Too short certificate path"
        };
      for (let y = A.length - 2; y >= 0; y--)
        if (A[y].issuer.isEqual(A[y].subject) === !1 && A[y].issuer.isEqual(A[y + 1].subject) === !1)
          return {
            result: !1,
            resultCode: 10,
            resultMessage: "Incorrect name chaining"
          };
      if (this.crls.length !== 0 || this.ocsps.length !== 0)
        for (let y = 0; y < A.length - 1; y++) {
          let O = 2, x = {
            status: 0,
            statusMessage: u
          };
          if (this.ocsps.length !== 0)
            switch (O = await a(A[y], A[y + 1]), O) {
              case 0:
                continue;
              case 1:
                return {
                  result: !1,
                  resultCode: 12,
                  resultMessage: "One of certificates was revoked via OCSP response"
                };
            }
          if (this.crls.length !== 0) {
            if (x = await i(A[y]), x.status === 0 && x.result)
              for (let B = 0; B < x.result.length; B++) {
                if (x.result[B].crl.isCertificateRevoked(A[y]))
                  return {
                    result: !1,
                    resultCode: 12,
                    resultMessage: "One of certificates had been revoked"
                  };
                if ((await l(x.result[B].certificate, !0)).result === !1)
                  return {
                    result: !1,
                    resultCode: 13,
                    resultMessage: "CRL issuer certificate is not a CA certificate or does not have crlSign flag"
                  };
              }
            else if (e === !1)
              throw new An(Hi.noRevocation, `No revocation values found for one of certificates: ${x.statusMessage}`);
          } else if (O === 2)
            return {
              result: !1,
              resultCode: 11,
              resultMessage: "No revocation values found for one of certificates"
            };
          if (O === 2 && x.status === 2 && e) {
            const B = A[y + 1];
            let V = !1;
            if (B.extensions)
              for (const R of B.extensions)
                switch (R.extnID) {
                  case Nm:
                  case yf:
                  case Sf:
                    V = !0;
                    break;
                }
            if (V)
              throw new An(Hi.noRevocation, `No revocation values found for one of certificates: ${x.statusMessage}`);
          }
        }
      for (const [y, O] of A.entries()) {
        if (!y)
          continue;
        if (!(await l(O)).result)
          return {
            result: !1,
            resultCode: 14,
            resultMessage: "One of intermediate certificates is not a CA certificate"
          };
      }
      return {
        result: !0
      };
    };
    s.push(...this.trustedCerts), s.push(...this.certs);
    for (let A = 0; A < s.length; A++)
      for (let E = 0; E < s.length; E++)
        if (A !== E && L.isEqual(s[A].tbsView, s[E].tbsView)) {
          s.splice(E, 1), A = 0;
          break;
        }
    const h = s[s.length - 1];
    let m;
    const g = [h];
    if (m = await n(h, t), m.length === 0)
      throw new An(Hi.noPath, "Unable to find certificate path");
    for (let A = m.length - 1; A >= 0; A--) {
      let E = !1;
      for (let y = 0; y < m[A].length; y++) {
        const O = m[A][y];
        for (let x = 0; x < this.trustedCerts.length; x++)
          if (L.isEqual(O.tbsView, this.trustedCerts[x].tbsView)) {
            E = !0;
            break;
          }
        if (E)
          break;
      }
      E || m.splice(A, 1);
    }
    if (m.length === 0)
      throw new An(Hi.noValidPath, "No valid certificate paths found");
    let d = m[0].length, b = 0;
    for (let A = 0; A < m.length; A++)
      m[A].length < d && (d = m[A].length, b = A);
    for (let A = 0; A < m[b].length; A++)
      g.push(m[b][A]);
    if (m = await c(g, this.checkDate), m.result === !1)
      throw m;
    return g;
  }
  async verify(e = {}, t = F(!0)) {
    function s(c, h) {
      const m = wn(c), g = wn(h), d = m.split("."), b = g.split("."), A = d.length, E = b.length;
      if (A === 0 || E === 0 || A < E)
        return !1;
      for (let y = 0; y < A; y++)
        if (d[y].length === 0)
          return !1;
      for (let y = 0; y < E; y++)
        if (b[y].length === 0) {
          if (y === 0) {
            if (E === 1)
              return !1;
            continue;
          }
          return !1;
        }
      for (let y = 0; y < E; y++)
        if (b[E - 1 - y].length !== 0 && d[A - 1 - y].localeCompare(b[E - 1 - y]) !== 0)
          return !1;
      return !0;
    }
    function n(c, h) {
      const m = wn(c), g = wn(h), d = m.split("@"), b = g.split("@");
      if (d.length === 0 || b.length === 0 || d.length < b.length)
        return !1;
      if (b.length === 1) {
        if (s(d[1], b[0])) {
          const E = d[1].split("."), y = b[0].split(".");
          return y[0].length === 0 ? !0 : E.length === y.length;
        }
        return !1;
      }
      return m.localeCompare(g) === 0;
    }
    function i(c, h) {
      let m = wn(c);
      const g = wn(h), d = m.split("/");
      if (g.split("/").length > 1)
        return !1;
      if (d.length > 1) {
        for (let E = 0; E < d.length; E++)
          if (d[E].length > 0 && d[E].charAt(d[E].length - 1) !== ":") {
            m = d[E].split(":")[0];
            break;
          }
      }
      if (s(m, g)) {
        const E = m.split("."), y = g.split(".");
        return y[0].length === 0 ? !0 : E.length === y.length;
      }
      return !1;
    }
    function a(c, h) {
      const m = c.valueBlock.valueHexView, g = h.valueBlock.valueHexView;
      if (m.length === 4 && g.length === 8) {
        for (let d = 0; d < 4; d++)
          if ((m[d] ^ g[d]) & g[d + 4])
            return !1;
        return !0;
      }
      if (m.length === 16 && g.length === 32) {
        for (let d = 0; d < 16; d++)
          if ((m[d] ^ g[d]) & g[d + 16])
            return !1;
        return !0;
      }
      return !1;
    }
    function l(c, h) {
      if (c.typesAndValues.length === 0 || h.typesAndValues.length === 0)
        return !0;
      if (c.typesAndValues.length < h.typesAndValues.length)
        return !1;
      let m = !0, g = 0;
      for (let d = 0; d < h.typesAndValues.length; d++) {
        let b = !1;
        for (let A = g; A < c.typesAndValues.length; A++)
          if (b = c.typesAndValues[A].isEqual(h.typesAndValues[d]), c.typesAndValues[A].type === h.typesAndValues[d].type && (m = m && b), b === !0)
            if (g === 0 || g === A) {
              g = A + 1;
              break;
            } else
              return !1;
        if (b === !1)
          return !1;
      }
      return g === 0 ? !1 : m;
    }
    try {
      if (this.certs.length === 0)
        throw new Error("Empty certificate array");
      const c = e.passedWhenNotRevValues || !1, h = e.initialPolicySet || [gt], m = e.initialExplicitPolicy || !1, g = e.initialPolicyMappingInhibit || !1, d = e.initialInhibitPolicy || !1, b = e.initialPermittedSubtreesSet || [], A = e.initialExcludedSubtreesSet || [], E = e.initialRequiredNameForms || [];
      let y = m, O = g, x = d;
      const B = [
        !1,
        !1,
        !1
      ];
      let V = 0, R = 0, _ = 0, te = b, j = A;
      const Z = E;
      let ye = 1;
      this.certs = await this.sort(c, t);
      const se = [];
      se.push(gt);
      const ae = [], Wt = new Array(this.certs.length - 1);
      for (let P = 0; P < this.certs.length - 1; P++)
        Wt[P] = !0;
      ae.push(Wt);
      const Me = new Array(this.certs.length - 1), fe = new Array(this.certs.length - 1);
      let ze = y ? this.certs.length - 1 : -1;
      for (let P = this.certs.length - 2; P >= 0; P--, ye++) {
        const q = this.certs[P];
        if (q.extensions) {
          for (let U = 0; U < q.extensions.length; U++) {
            const Y = q.extensions[U];
            if (Y.extnID === Cm) {
              fe[P] = Y.parsedValue;
              for (let ne = 0; ne < se.length; ne++)
                if (se[ne] === gt) {
                  delete ae[ne][P];
                  break;
                }
              for (let ne = 0; ne < Y.parsedValue.certificatePolicies.length; ne++) {
                let Te = -1;
                const Gt = Y.parsedValue.certificatePolicies[ne].policyIdentifier;
                for (let ve = 0; ve < se.length; ve++)
                  if (Gt === se[ve]) {
                    Te = ve;
                    break;
                  }
                if (Te === -1) {
                  se.push(Gt);
                  const ve = new Array(this.certs.length - 1);
                  ve[P] = !0, ae.push(ve);
                } else
                  ae[Te][P] = !0;
              }
            }
            if (Y.extnID === Bm) {
              if (O)
                return {
                  result: !1,
                  resultCode: 98,
                  resultMessage: "Policy mapping prohibited"
                };
              Me[P] = Y.parsedValue;
            }
            Y.extnID === Im && y === !1 && (Y.parsedValue.requireExplicitPolicy === 0 ? (y = !0, ze = P) : B[0] === !1 ? (B[0] = !0, V = Y.parsedValue.requireExplicitPolicy) : V = V > Y.parsedValue.requireExplicitPolicy ? Y.parsedValue.requireExplicitPolicy : V, Y.parsedValue.inhibitPolicyMapping === 0 ? O = !0 : B[1] === !1 ? (B[1] = !0, R = Y.parsedValue.inhibitPolicyMapping + 1) : R = R > Y.parsedValue.inhibitPolicyMapping + 1 ? Y.parsedValue.inhibitPolicyMapping + 1 : R), Y.extnID === mw && x === !1 && (Y.parsedValue.valueBlock.valueDec === 0 ? x = !0 : B[2] === !1 ? (B[2] = !0, _ = Y.parsedValue.valueBlock.valueDec) : _ = _ > Y.parsedValue.valueBlock.valueDec ? Y.parsedValue.valueBlock.valueDec : _);
          }
          if (x === !0) {
            let U = -1;
            for (let Y = 0; Y < se.length; Y++)
              if (se[Y] === gt) {
                U = Y;
                break;
              }
            U !== -1 && delete ae[0][P];
          }
          y === !1 && B[0] === !0 && (V--, V === 0 && (y = !0, ze = P, B[0] = !1)), O === !1 && B[1] === !0 && (R--, R === 0 && (O = !0, B[1] = !1)), x === !1 && B[2] === !0 && (_--, _ === 0 && (x = !0, B[2] = !1));
        }
      }
      for (let P = 0; P < this.certs.length - 1; P++)
        if (P < this.certs.length - 2 && typeof Me[P + 1] < "u")
          for (let q = 0; q < Me[P + 1].mappings.length; q++) {
            if (Me[P + 1].mappings[q].issuerDomainPolicy === gt || Me[P + 1].mappings[q].subjectDomainPolicy === gt)
              return {
                result: !1,
                resultCode: 99,
                resultMessage: 'The "anyPolicy" should not be a part of policy mapping scheme'
              };
            let U = -1, Y = -1;
            for (let ne = 0; ne < se.length; ne++)
              se[ne] === Me[P + 1].mappings[q].issuerDomainPolicy && (U = ne), se[ne] === Me[P + 1].mappings[q].subjectDomainPolicy && (Y = ne);
            typeof ae[U][P] < "u" && delete ae[U][P];
            for (let ne = 0; ne < fe[P].certificatePolicies.length; ne++)
              if (Me[P + 1].mappings[q].subjectDomainPolicy === fe[P].certificatePolicies[ne].policyIdentifier && U !== -1 && Y !== -1)
                for (let Te = 0; Te <= P; Te++)
                  typeof ae[Y][Te] < "u" && (ae[U][Te] = !0, delete ae[Y][Te]);
          }
      for (let P = 0; P < se.length; P++)
        if (se[P] === gt)
          for (let q = 0; q < ze; q++)
            delete ae[P][q];
      const et = [];
      for (let P = 0; P < ae.length; P++) {
        let q = !0;
        for (let U = 0; U < this.certs.length - 1; U++) {
          let Y = !1;
          if (U < ze && se[P] === gt && se.length > 1) {
            q = !1;
            break;
          }
          if (typeof ae[P][U] > "u") {
            if (U >= ze) {
              for (let ne = 0; ne < se.length; ne++)
                if (se[ne] === gt) {
                  ae[ne][U] === !0 && (Y = !0);
                  break;
                }
            }
            if (!Y) {
              q = !1;
              break;
            }
          }
        }
        q === !0 && et.push(se[P]);
      }
      let mt = [];
      if (h.length === 1 && h[0] === gt && y === !1)
        mt = h;
      else if (et.length === 1 && et[0] === gt)
        mt = h;
      else
        for (let P = 0; P < et.length; P++)
          for (let q = 0; q < h.length; q++)
            if (h[q] === et[P] || h[q] === gt) {
              mt.push(et[P]);
              break;
            }
      const we = {
        result: mt.length > 0,
        resultCode: 0,
        resultMessage: mt.length > 0 ? u : 'Zero "userConstrPolicies" array, no intersections with "authConstrPolicies"',
        authConstrPolicies: et,
        userConstrPolicies: mt,
        explicitPolicyIndicator: y,
        policyMappings: Me,
        certificatePath: this.certs
      };
      if (mt.length === 0 || we.result === !1)
        return we;
      ye = 1;
      for (let P = this.certs.length - 2; P >= 0; P--, ye++) {
        const q = this.certs[P];
        let U = [], Y = [], ne = [];
        if (q.extensions)
          for (let z = 0; z < q.extensions.length; z++) {
            const $ = q.extensions[z];
            $.extnID === Em && ("permittedSubtrees" in $.parsedValue && (Y = Y.concat($.parsedValue.permittedSubtrees)), "excludedSubtrees" in $.parsedValue && (ne = ne.concat($.parsedValue.excludedSubtrees))), $.extnID === Am && (U = U.concat($.parsedValue.altNames));
          }
        let Te = Z.length <= 0;
        for (let z = 0; z < Z.length; z++)
          switch (Z[z].base.type) {
            case 4:
              {
                if (Z[z].base.value.typesAndValues.length !== q.subject.typesAndValues.length)
                  continue;
                Te = !0;
                for (let $ = 0; $ < q.subject.typesAndValues.length; $++)
                  if (q.subject.typesAndValues[$].type !== Z[z].base.value.typesAndValues[$].type) {
                    Te = !1;
                    break;
                  }
                if (Te === !0)
                  break;
              }
              break;
            default:
          }
        if (Te === !1)
          throw we.result = !1, we.resultCode = 21, we.resultMessage = "No necessary name form found", we;
        const Gt = [
          [],
          [],
          [],
          [],
          []
        ];
        for (let z = 0; z < te.length; z++)
          switch (te[z].base.type) {
            case 1:
              Gt[0].push(te[z]);
              break;
            case 2:
              Gt[1].push(te[z]);
              break;
            case 4:
              Gt[2].push(te[z]);
              break;
            case 6:
              Gt[3].push(te[z]);
              break;
            case 7:
              Gt[4].push(te[z]);
              break;
            default:
          }
        for (let z = 0; z < 5; z++) {
          let $ = !1, Tn = !1;
          const ks = Gt[z];
          for (let Es = 0; Es < ks.length; Es++) {
            switch (z) {
              case 0:
                if (U.length > 0)
                  for (let ce = 0; ce < U.length; ce++)
                    U[ce].type === 1 && (Tn = !0, $ = $ || n(U[ce].value, ks[Es].base.value));
                else
                  for (let ce = 0; ce < q.subject.typesAndValues.length; ce++)
                    (q.subject.typesAndValues[ce].type === "1.2.840.113549.1.9.1" || q.subject.typesAndValues[ce].type === "0.9.2342.19200300.100.1.3") && (Tn = !0, $ = $ || n(q.subject.typesAndValues[ce].value.valueBlock.value, ks[Es].base.value));
                break;
              case 1:
                if (U.length > 0)
                  for (let ce = 0; ce < U.length; ce++)
                    U[ce].type === 2 && (Tn = !0, $ = $ || s(U[ce].value, ks[Es].base.value));
                break;
              case 2:
                Tn = !0, $ = l(q.subject, ks[Es].base.value);
                break;
              case 3:
                if (U.length > 0)
                  for (let ce = 0; ce < U.length; ce++)
                    U[ce].type === 6 && (Tn = !0, $ = $ || i(U[ce].value, ks[Es].base.value));
                break;
              case 4:
                if (U.length > 0)
                  for (let ce = 0; ce < U.length; ce++)
                    U[ce].type === 7 && (Tn = !0, $ = $ || a(U[ce].value, ks[Es].base.value));
                break;
              default:
            }
            if ($)
              break;
          }
          if ($ === !1 && ks.length > 0 && Tn)
            throw we.result = !1, we.resultCode = 41, we.resultMessage = 'Failed to meet "permitted sub-trees" name constraint', we;
        }
        let ve = !1;
        for (let z = 0; z < j.length; z++) {
          switch (j[z].base.type) {
            case 1:
              if (U.length >= 0)
                for (let $ = 0; $ < U.length; $++)
                  U[$].type === 1 && (ve = ve || n(U[$].value, j[z].base.value));
              else
                for (let $ = 0; $ < q.subject.typesAndValues.length; $++)
                  (q.subject.typesAndValues[$].type === "1.2.840.113549.1.9.1" || q.subject.typesAndValues[$].type === "0.9.2342.19200300.100.1.3") && (ve = ve || n(q.subject.typesAndValues[$].value.valueBlock.value, j[z].base.value));
              break;
            case 2:
              if (U.length > 0)
                for (let $ = 0; $ < U.length; $++)
                  U[$].type === 2 && (ve = ve || s(U[$].value, j[z].base.value));
              break;
            case 4:
              ve = ve || l(q.subject, j[z].base.value);
              break;
            case 6:
              if (U.length > 0)
                for (let $ = 0; $ < U.length; $++)
                  U[$].type === 6 && (ve = ve || i(U[$].value, j[z].base.value));
              break;
            case 7:
              if (U.length > 0)
                for (let $ = 0; $ < U.length; $++)
                  U[$].type === 7 && (ve = ve || a(U[$].value, j[z].base.value));
              break;
            default:
          }
          if (ve)
            break;
        }
        if (ve === !0)
          throw we.result = !1, we.resultCode = 42, we.resultMessage = 'Failed to meet "excluded sub-trees" name constraint', we;
        te = te.concat(Y), j = j.concat(ne);
      }
      return we;
    } catch (c) {
      return c instanceof Error ? c instanceof An ? {
        result: !1,
        resultCode: c.code,
        resultMessage: c.message,
        error: c
      } : {
        result: !1,
        resultCode: Hi.unknown,
        resultMessage: c.message,
        error: c
      } : c && typeof c == "object" && "resultMessage" in c ? c : {
        result: !1,
        resultCode: -1,
        resultMessage: `${c}`
      };
    }
  }
}
const cu = "tbsResponseData", ql = "signatureAlgorithm", Wl = "signature", ca = "certs", Nc = "BasicOCSPResponse", _h = `${Nc}.${cu}`, $h = `${Nc}.${ql}`, Kh = `${Nc}.${Wl}`, uu = `${Nc}.${ca}`, sv = [
  _h,
  $h,
  Kh,
  uu
];
class At extends k {
  constructor(e = {}) {
    super(), this.tbsResponseData = r(e, cu, At.defaultValues(cu)), this.signatureAlgorithm = r(e, ql, At.defaultValues(ql)), this.signature = r(e, Wl, At.defaultValues(Wl)), ca in e && (this.certs = r(e, ca, At.defaultValues(ca))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case cu:
        return new Re();
      case ql:
        return new v();
      case Wl:
        return new G();
      case ca:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case "type": {
        let s = Re.compareWithDefault("tbs", t.tbs) && Re.compareWithDefault("responderID", t.responderID) && Re.compareWithDefault("producedAt", t.producedAt) && Re.compareWithDefault("responses", t.responses);
        return "responseExtensions" in t && (s = s && Re.compareWithDefault("responseExtensions", t.responseExtensions)), s;
      }
      case ql:
        return t.algorithmId === u && !("algorithmParams" in t);
      case Wl:
        return t.isEqual(At.defaultValues(e));
      case ca:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || Nc,
      value: [
        Re.schema(t.tbsResponseData || {
          names: {
            blockName: _h
          }
        }),
        v.schema(t.signatureAlgorithm || {
          names: {
            blockName: $h
          }
        }),
        new G({ name: t.signature || Kh }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new f({
              value: [new J({
                name: uu,
                value: ee.schema(t.certs || {})
              })]
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, sv);
    const t = N(e, e, At.schema());
    p.assertSchema(t, this.className), this.tbsResponseData = new Re({ schema: t.result[_h] }), this.signatureAlgorithm = new v({ schema: t.result[$h] }), this.signature = t.result[Kh], uu in t.result && (this.certs = Array.from(t.result[uu], (s) => new ee({ schema: s })));
  }
  toSchema() {
    const e = [];
    return e.push(this.tbsResponseData.toSchema()), e.push(this.signatureAlgorithm.toSchema()), e.push(this.signature), this.certs && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [
        new f({
          value: Array.from(this.certs, (t) => t.toSchema())
        })
      ]
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      tbsResponseData: this.tbsResponseData.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signature: this.signature.toJSON()
    };
    return this.certs && (e.certs = Array.from(this.certs, (t) => t.toJSON())), e;
  }
  async getCertificateStatus(e, t, s = F(!0)) {
    const n = {
      isForCertificate: !1,
      status: 2
    }, i = {}, a = [];
    for (const l of this.tbsResponseData.responses) {
      const c = s.getAlgorithmByOID(l.certID.hashAlgorithm.algorithmId, !0, "CertID.hashAlgorithm");
      if (!i[c.name]) {
        i[c.name] = 1;
        const h = new Ne();
        a.push(h), await h.createForCertificate(e, {
          hashAlgorithm: c.name,
          issuerCertificate: t
        }, s);
      }
    }
    for (const l of this.tbsResponseData.responses)
      for (const c of a)
        if (l.certID.isEqual(c)) {
          n.isForCertificate = !0;
          try {
            switch (l.certStatus.idBlock.isConstructed) {
              case !0:
                l.certStatus.idBlock.tagNumber === 1 && (n.status = 1);
                break;
              case !1:
                switch (l.certStatus.idBlock.tagNumber) {
                  case 0:
                    n.status = 0;
                    break;
                  case 2:
                    n.status = 2;
                    break;
                  default:
                }
                break;
              default:
            }
          } catch {
          }
          return n;
        }
    return n;
  }
  async sign(e, t = "SHA-1", s = F(!0)) {
    if (!e)
      throw new Error("Need to provide a private key for signing");
    const n = await s.getSignatureParameters(e, t), i = n.parameters.algorithm;
    if (!("name" in i))
      throw new Error("Empty algorithm");
    this.signatureAlgorithm = n.signatureAlgorithm, this.tbsResponseData.tbsView = new Uint8Array(this.tbsResponseData.toSchema(!0).toBER());
    const a = await s.signWithPrivateKey(this.tbsResponseData.tbsView, e, { algorithm: i });
    this.signature = new G({ valueHex: a });
  }
  async verify(e = {}, t = F(!0)) {
    let s = null, n = -1;
    const i = e.trustedCerts || [];
    if (!this.certs)
      throw new Error("No certificates attached to the BasicOCSPResponse");
    switch (!0) {
      case this.tbsResponseData.responderID instanceof re:
        for (const [h, m] of this.certs.entries())
          if (m.subject.isEqual(this.tbsResponseData.responderID)) {
            n = h;
            break;
          }
        break;
      case this.tbsResponseData.responderID instanceof I:
        for (const [h, m] of this.certs.entries()) {
          const g = await t.digest({ name: "sha-1" }, m.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView);
          if (Ka(g, this.tbsResponseData.responderID.valueBlock.valueHex)) {
            n = h;
            break;
          }
        }
        break;
      default:
        throw new Error("Wrong value for responderID");
    }
    if (n === -1)
      throw new Error("Correct certificate was not found in OCSP response");
    s = this.certs[n];
    const a = [s];
    for (const h of this.certs) {
      const m = await Um(h, s);
      m && a.push(m);
    }
    if (!(await new Gu({
      certs: a,
      trustedCerts: i
    }).verify({}, t)).result)
      throw new Error("Validation of signer's certificate failed");
    return t.verifyWithPublicKey(this.tbsResponseData.tbsView, this.signature, this.certs[n].subjectPublicKeyInfo, this.signatureAlgorithm);
  }
}
At.CLASS_NAME = "BasicOCSPResponse";
const Nh = "tbs", Ch = "version", Bh = "subject", Ih = "subjectPublicKeyInfo", cr = "attributes", Gl = "signatureAlgorithm", Yl = "signatureValue", Ya = "CertificationRequestInfo", If = `${Ya}.version`, Vf = `${Ya}.subject`, xf = `${Ya}.subjectPublicKeyInfo`, Ku = `${Ya}.attributes`, nv = [
  Ya,
  If,
  Vf,
  xf,
  Ku,
  Gl,
  Yl
];
function iv(o = {}) {
  const e = r(o, "names", {});
  return new f({
    name: e.CertificationRequestInfo || Ya,
    value: [
      new S({ name: e.CertificationRequestInfoVersion || If }),
      re.schema(e.subject || {
        names: {
          blockName: Vf
        }
      }),
      Xe.schema({
        names: {
          blockName: xf
        }
      }),
      new w({
        optional: !0,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [
          new J({
            optional: !0,
            name: e.CertificationRequestInfoAttributes || Ku,
            value: le.schema(e.attributes || {})
          })
        ]
      })
    ]
  });
}
class Ct extends k {
  get tbs() {
    return L.toArrayBuffer(this.tbsView);
  }
  set tbs(e) {
    this.tbsView = new Uint8Array(e);
  }
  constructor(e = {}) {
    super(), this.tbsView = new Uint8Array(r(e, Nh, Ct.defaultValues(Nh))), this.version = r(e, Ch, Ct.defaultValues(Ch)), this.subject = r(e, Bh, Ct.defaultValues(Bh)), this.subjectPublicKeyInfo = r(e, Ih, Ct.defaultValues(Ih)), cr in e && (this.attributes = r(e, cr, Ct.defaultValues(cr))), this.signatureAlgorithm = r(e, Gl, Ct.defaultValues(Gl)), this.signatureValue = r(e, Yl, Ct.defaultValues(Yl)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Nh:
        return be;
      case Ch:
        return 0;
      case Bh:
        return new re();
      case Ih:
        return new Xe();
      case cr:
        return [];
      case Gl:
        return new v();
      case Yl:
        return new G();
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      value: [
        iv(t.certificationRequestInfo || {}),
        new f({
          name: t.signatureAlgorithm || Gl,
          value: [
            new T(),
            new K({ optional: !0 })
          ]
        }),
        new G({ name: t.signatureValue || Yl })
      ]
    });
  }
  fromSchema(e) {
    C(e, nv);
    const t = N(e, e, Ct.schema());
    p.assertSchema(t, this.className), this.tbsView = t.result.CertificationRequestInfo.valueBeforeDecodeView, this.version = t.result[If].valueBlock.valueDec, this.subject = new re({ schema: t.result[Vf] }), this.subjectPublicKeyInfo = new Xe({ schema: t.result[xf] }), Ku in t.result && (this.attributes = Array.from(t.result[Ku], (s) => new le({ schema: s }))), this.signatureAlgorithm = new v({ schema: t.result.signatureAlgorithm }), this.signatureValue = t.result.signatureValue;
  }
  encodeTBS() {
    const e = [
      new S({ value: this.version }),
      this.subject.toSchema(),
      this.subjectPublicKeyInfo.toSchema()
    ];
    return cr in this && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: Array.from(this.attributes || [], (t) => t.toSchema())
    })), new f({
      value: e
    });
  }
  toSchema(e = !1) {
    let t;
    if (e === !1) {
      if (this.tbsView.byteLength === 0)
        return Ct.schema();
      const s = Oe(this.tbsView);
      p.assert(s, "PKCS#10 Certificate Request"), t = s.result;
    } else
      t = this.encodeTBS();
    return new f({
      value: [
        t,
        this.signatureAlgorithm.toSchema(),
        this.signatureValue
      ]
    });
  }
  toJSON() {
    const e = {
      tbs: H.ToHex(this.tbsView),
      version: this.version,
      subject: this.subject.toJSON(),
      subjectPublicKeyInfo: this.subjectPublicKeyInfo.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
    return cr in this && (e.attributes = Array.from(this.attributes || [], (t) => t.toJSON())), e;
  }
  async sign(e, t = "SHA-1", s = F(!0)) {
    if (!e)
      throw new Error("Need to provide a private key for signing");
    const n = await s.getSignatureParameters(e, t), i = n.parameters;
    this.signatureAlgorithm = n.signatureAlgorithm, this.tbsView = new Uint8Array(this.encodeTBS().toBER());
    const a = await s.signWithPrivateKey(this.tbsView, e, i);
    this.signatureValue = new G({ valueHex: a });
  }
  async verify(e = F(!0)) {
    return e.verifyWithPublicKey(this.tbsView, this.signatureValue, this.subjectPublicKeyInfo, this.signatureAlgorithm);
  }
  async getPublicKey(e, t = F(!0)) {
    return t.getPublicKey(this.subjectPublicKeyInfo, this.signatureAlgorithm, e);
  }
}
Ct.CLASS_NAME = "CertificationRequest";
const Vi = "digestAlgorithm", xi = "digest", rv = [
  Vi,
  xi
];
class bt extends k {
  constructor(e = {}) {
    super(), this.digestAlgorithm = r(e, Vi, bt.defaultValues(Vi)), this.digest = r(e, xi, bt.defaultValues(xi)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Vi:
        return new v();
      case xi:
        return new I();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Vi:
        return v.compareWithDefault("algorithmId", t.algorithmId) && !("algorithmParams" in t);
      case xi:
        return t.isEqual(bt.defaultValues(e));
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        v.schema(t.digestAlgorithm || {
          names: {
            blockName: Vi
          }
        }),
        new I({ name: t.digest || xi })
      ]
    });
  }
  fromSchema(e) {
    C(e, rv);
    const t = N(e, e, bt.schema({
      names: {
        digestAlgorithm: {
          names: {
            blockName: Vi
          }
        },
        digest: xi
      }
    }));
    p.assertSchema(t, this.className), this.digestAlgorithm = new v({ schema: t.result.digestAlgorithm }), this.digest = t.result.digest;
  }
  toSchema() {
    return new f({
      value: [
        this.digestAlgorithm.toSchema(),
        this.digest
      ]
    });
  }
  toJSON() {
    return {
      digestAlgorithm: this.digestAlgorithm.toJSON(),
      digest: this.digest.toJSON()
    };
  }
}
bt.CLASS_NAME = "DigestInfo";
const ua = "eContentType", Nt = "eContent", av = [
  ua,
  Nt
];
class nt extends k {
  constructor(e = {}) {
    if (super(), this.eContentType = r(e, ua, nt.defaultValues(ua)), Nt in e && (this.eContent = r(e, Nt, nt.defaultValues(Nt)), this.eContent.idBlock.tagClass === 1 && this.eContent.idBlock.tagNumber === 4 && this.eContent.idBlock.isConstructed === !1)) {
      const t = new I({
        idBlock: { isConstructed: !0 },
        isConstructed: !0
      });
      let s = 0;
      const n = this.eContent.valueBlock.valueHexView.slice().buffer;
      let i = n.byteLength;
      for (; i > 0; ) {
        const a = new Uint8Array(n, s, s + 65536 > n.byteLength ? n.byteLength - s : 65536), l = new ArrayBuffer(a.length), c = new Uint8Array(l);
        for (let h = 0; h < c.length; h++)
          c[h] = a[h];
        t.valueBlock.value.push(new I({ valueHex: l })), i -= a.length, s += a.length;
      }
      this.eContent = t;
    }
    e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case ua:
        return u;
      case Nt:
        return new I();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case ua:
        return t === u;
      case Nt:
        return t.idBlock.tagClass === 1 && t.idBlock.tagNumber === 4 ? t.isEqual(nt.defaultValues(Nt)) : !1;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.eContentType || u }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new K({ name: t.eContent || u })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, av);
    const t = N(e, e, nt.schema({
      names: {
        eContentType: ua,
        eContent: Nt
      }
    }));
    p.assertSchema(t, this.className), this.eContentType = t.result.eContentType.valueBlock.toString(), Nt in t.result && (this.eContent = t.result.eContent);
  }
  toSchema() {
    const e = [];
    return e.push(new T({ value: this.eContentType })), this.eContent && nt.compareWithDefault(Nt, this.eContent) === !1 && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [this.eContent]
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      eContentType: this.eContentType
    };
    return this.eContent && nt.compareWithDefault(Nt, this.eContent) === !1 && (e.eContent = this.eContent.toJSON()), e;
  }
}
nt.CLASS_NAME = "EncapsulatedContentInfo";
const Oi = "mac", Ri = "macSalt", is = "iterations", ov = [
  Oi,
  Ri,
  is
];
class Ge extends k {
  constructor(e = {}) {
    super(), this.mac = r(e, Oi, Ge.defaultValues(Oi)), this.macSalt = r(e, Ri, Ge.defaultValues(Ri)), is in e && (this.iterations = r(e, is, Ge.defaultValues(is))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Oi:
        return new bt();
      case Ri:
        return new I();
      case is:
        return 1;
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Oi:
        return bt.compareWithDefault("digestAlgorithm", t.digestAlgorithm) && bt.compareWithDefault("digest", t.digest);
      case Ri:
        return t.isEqual(Ge.defaultValues(e));
      case is:
        return t === Ge.defaultValues(e);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      optional: t.optional || !0,
      value: [
        bt.schema(t.mac || {
          names: {
            blockName: Oi
          }
        }),
        new I({ name: t.macSalt || Ri }),
        new S({
          optional: !0,
          name: t.iterations || is
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, ov);
    const t = N(e, e, Ge.schema({
      names: {
        mac: {
          names: {
            blockName: Oi
          }
        },
        macSalt: Ri,
        iterations: is
      }
    }));
    p.assertSchema(t, this.className), this.mac = new bt({ schema: t.result.mac }), this.macSalt = t.result.macSalt, is in t.result && (this.iterations = t.result.iterations.valueBlock.valueDec);
  }
  toSchema() {
    const e = [
      this.mac.toSchema(),
      this.macSalt
    ];
    return this.iterations !== void 0 && e.push(new S({ value: this.iterations })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      mac: this.mac.toJSON(),
      macSalt: this.macSalt.toJSON()
    };
    return this.iterations !== void 0 && (e.iterations = this.iterations), e;
  }
}
Ge.CLASS_NAME = "MacData";
const Mi = "hashAlgorithm", _i = "hashedMessage", lv = [
  Mi,
  _i
];
class He extends k {
  static async create(e, t, s = F(!0)) {
    const n = s.getOIDByAlgorithm({ name: e }, !0, "hashAlgorithm"), i = await s.digest(e, t);
    return new He({
      hashAlgorithm: new v({
        algorithmId: n,
        algorithmParams: new Ae()
      }),
      hashedMessage: new I({ valueHex: i })
    });
  }
  constructor(e = {}) {
    super(), this.hashAlgorithm = r(e, Mi, He.defaultValues(Mi)), this.hashedMessage = r(e, _i, He.defaultValues(_i)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Mi:
        return new v();
      case _i:
        return new I();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Mi:
        return t.algorithmId === u && !("algorithmParams" in t);
      case _i:
        return t.isEqual(He.defaultValues(e)) === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        v.schema(t.hashAlgorithm || {}),
        new I({ name: t.hashedMessage || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, lv);
    const t = N(e, e, He.schema({
      names: {
        hashAlgorithm: {
          names: {
            blockName: Mi
          }
        },
        hashedMessage: _i
      }
    }));
    p.assertSchema(t, this.className), this.hashAlgorithm = new v({ schema: t.result.hashAlgorithm }), this.hashedMessage = t.result.hashedMessage;
  }
  toSchema() {
    return new f({
      value: [
        this.hashAlgorithm.toSchema(),
        this.hashedMessage
      ]
    });
  }
  toJSON() {
    return {
      hashAlgorithm: this.hashAlgorithm.toJSON(),
      hashedMessage: this.hashedMessage.toJSON()
    };
  }
}
He.CLASS_NAME = "MessageImprint";
const ha = "reqCert", un = "singleRequestExtensions", cv = [
  ha,
  un
];
class gs extends k {
  constructor(e = {}) {
    super(), this.reqCert = r(e, ha, gs.defaultValues(ha)), un in e && (this.singleRequestExtensions = r(e, un, gs.defaultValues(un))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case ha:
        return new Ne();
      case un:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case ha:
        return t.isEqual(gs.defaultValues(e));
      case un:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        Ne.schema(t.reqCert || {}),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [ke.schema(t.extensions || {
            names: {
              blockName: t.singleRequestExtensions || u
            }
          })]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, cv);
    const t = N(e, e, gs.schema({
      names: {
        reqCert: {
          names: {
            blockName: ha
          }
        },
        extensions: {
          names: {
            blockName: un
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.reqCert = new Ne({ schema: t.result.reqCert }), un in t.result && (this.singleRequestExtensions = Array.from(t.result.singleRequestExtensions.valueBlock.value, (s) => new Ve({ schema: s })));
  }
  toSchema() {
    const e = [];
    return e.push(this.reqCert.toSchema()), this.singleRequestExtensions && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [
        new f({
          value: Array.from(this.singleRequestExtensions, (t) => t.toSchema())
        })
      ]
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      reqCert: this.reqCert.toJSON()
    };
    return this.singleRequestExtensions && (e.singleRequestExtensions = Array.from(this.singleRequestExtensions, (t) => t.toJSON())), e;
  }
}
gs.CLASS_NAME = "Request";
const Qc = "tbs", fa = "version", da = "requestorName", Xc = "requestList", ma = "requestExtensions", Qa = "TBSRequest", hu = `${Qa}.${fa}`, fu = `${Qa}.${da}`, Jh = `${Qa}.requests`, du = `${Qa}.${ma}`, uv = [
  Qa,
  hu,
  fu,
  Jh,
  du
];
class Le extends k {
  get tbs() {
    return L.toArrayBuffer(this.tbsView);
  }
  set tbs(e) {
    this.tbsView = new Uint8Array(e);
  }
  constructor(e = {}) {
    super(), this.tbsView = new Uint8Array(r(e, Qc, Le.defaultValues(Qc))), fa in e && (this.version = r(e, fa, Le.defaultValues(fa))), da in e && (this.requestorName = r(e, da, Le.defaultValues(da))), this.requestList = r(e, Xc, Le.defaultValues(Xc)), ma in e && (this.requestExtensions = r(e, ma, Le.defaultValues(ma))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Qc:
        return be;
      case fa:
        return 0;
      case da:
        return new X();
      case Xc:
      case ma:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Qc:
        return t.byteLength === 0;
      case fa:
        return t === Le.defaultValues(e);
      case da:
        return t.type === X.defaultValues("type") && Object.keys(t.value).length === 0;
      case Xc:
      case ma:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || Qa,
      value: [
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new S({ name: t.TBSRequestVersion || hu })]
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [X.schema(t.requestorName || {
            names: {
              blockName: fu
            }
          })]
        }),
        new f({
          name: t.requestList || "TBSRequest.requestList",
          value: [
            new J({
              name: t.requests || Jh,
              value: gs.schema(t.requestNames || {})
            })
          ]
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: [ke.schema(t.extensions || {
            names: {
              blockName: t.requestExtensions || du
            }
          })]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, uv);
    const t = N(e, e, Le.schema());
    p.assertSchema(t, this.className), this.tbsView = t.result.TBSRequest.valueBeforeDecodeView, hu in t.result && (this.version = t.result[hu].valueBlock.valueDec), fu in t.result && (this.requestorName = new X({ schema: t.result[fu] })), this.requestList = Array.from(t.result[Jh], (s) => new gs({ schema: s })), du in t.result && (this.requestExtensions = Array.from(t.result[du].valueBlock.value, (s) => new Ve({ schema: s })));
  }
  toSchema(e = !1) {
    let t;
    if (e === !1) {
      if (this.tbsView.byteLength === 0)
        return Le.schema();
      const s = Oe(this.tbsView);
      if (p.assert(s, "TBS Request"), !(s.result instanceof f))
        throw new Error("ASN.1 result should be SEQUENCE");
      t = s.result;
    } else {
      const s = [];
      this.version !== void 0 && s.push(new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [new S({ value: this.version })]
      })), this.requestorName && s.push(new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [this.requestorName.toSchema()]
      })), s.push(new f({
        value: Array.from(this.requestList, (n) => n.toSchema())
      })), this.requestExtensions && s.push(new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        },
        value: [
          new f({
            value: Array.from(this.requestExtensions, (n) => n.toSchema())
          })
        ]
      })), t = new f({
        value: s
      });
    }
    return t;
  }
  toJSON() {
    const e = {};
    return this.version != null && (e.version = this.version), this.requestorName && (e.requestorName = this.requestorName.toJSON()), e.requestList = Array.from(this.requestList, (t) => t.toJSON()), this.requestExtensions && (e.requestExtensions = Array.from(this.requestExtensions, (t) => t.toJSON())), e;
  }
}
Le.CLASS_NAME = "TBSRequest";
const ur = "signatureAlgorithm", hr = "signature", xs = "certs";
class ct extends k {
  constructor(e = {}) {
    super(), this.signatureAlgorithm = r(e, ur, ct.defaultValues(ur)), this.signature = r(e, hr, ct.defaultValues(hr)), xs in e && (this.certs = r(e, xs, ct.defaultValues(xs))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case ur:
        return new v();
      case hr:
        return new G();
      case xs:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case ur:
        return t.algorithmId === u && !("algorithmParams" in t);
      case hr:
        return t.isEqual(ct.defaultValues(e));
      case xs:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        v.schema(t.signatureAlgorithm || {}),
        new G({ name: t.signature || u }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new f({
              value: [new J({
                name: t.certs || u,
                value: ee.schema({})
              })]
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, [
      ur,
      hr,
      xs
    ]);
    const t = N(e, e, ct.schema({
      names: {
        signatureAlgorithm: {
          names: {
            blockName: ur
          }
        },
        signature: hr,
        certs: xs
      }
    }));
    p.assertSchema(t, this.className), this.signatureAlgorithm = new v({ schema: t.result.signatureAlgorithm }), this.signature = t.result.signature, xs in t.result && (this.certs = Array.from(t.result.certs, (s) => new ee({ schema: s })));
  }
  toSchema() {
    const e = [];
    return e.push(this.signatureAlgorithm.toSchema()), e.push(this.signature), this.certs && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [
        new f({
          value: Array.from(this.certs, (t) => t.toSchema())
        })
      ]
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signature: this.signature.toJSON()
    };
    return this.certs && (e.certs = Array.from(this.certs, (t) => t.toJSON())), e;
  }
}
ct.CLASS_NAME = "Signature";
const ga = "tbsRequest", hn = "optionalSignature", hv = [
  ga,
  hn
];
class uc extends k {
  constructor(e = {}) {
    super(), this.tbsRequest = r(e, ga, uc.defaultValues(ga)), hn in e && (this.optionalSignature = r(e, hn, uc.defaultValues(hn))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case ga:
        return new Le();
      case hn:
        return new ct();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case ga:
        return Le.compareWithDefault("tbs", t.tbs) && Le.compareWithDefault("version", t.version) && Le.compareWithDefault("requestorName", t.requestorName) && Le.compareWithDefault("requestList", t.requestList) && Le.compareWithDefault("requestExtensions", t.requestExtensions);
      case hn:
        return ct.compareWithDefault("signatureAlgorithm", t.signatureAlgorithm) && ct.compareWithDefault("signature", t.signature) && ct.compareWithDefault("certs", t.certs);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || "OCSPRequest",
      value: [
        Le.schema(t.tbsRequest || {
          names: {
            blockName: ga
          }
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            ct.schema(t.optionalSignature || {
              names: {
                blockName: hn
              }
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, hv);
    const t = N(e, e, uc.schema());
    p.assertSchema(t, this.className), this.tbsRequest = new Le({ schema: t.result.tbsRequest }), hn in t.result && (this.optionalSignature = new ct({ schema: t.result.optionalSignature }));
  }
  toSchema(e = !1) {
    const t = [];
    return t.push(this.tbsRequest.toSchema(e)), this.optionalSignature && t.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [
        this.optionalSignature.toSchema()
      ]
    })), new f({
      value: t
    });
  }
  toJSON() {
    const e = {
      tbsRequest: this.tbsRequest.toJSON()
    };
    return this.optionalSignature && (e.optionalSignature = this.optionalSignature.toJSON()), e;
  }
  async createForCertificate(e, t, s = F(!0)) {
    const n = new Ne();
    await n.createForCertificate(e, t, s), this.tbsRequest.requestList.push(new gs({
      reqCert: n
    }));
  }
  async sign(e, t = "SHA-1", s = F(!0)) {
    if (Q.assertEmpty(e, "privateKey", "OCSPRequest.sign method"), !this.optionalSignature)
      throw new Error('Need to create "optionalSignature" field before signing');
    const n = await s.getSignatureParameters(e, t), i = n.parameters;
    this.optionalSignature.signatureAlgorithm = n.signatureAlgorithm;
    const a = this.tbsRequest.toSchema(!0).toBER(!1), l = await s.signWithPrivateKey(a, e, i);
    this.optionalSignature.signature = new G({ valueHex: l });
  }
  verify() {
  }
}
uc.CLASS_NAME = "OCSPRequest";
const wa = "responseType", ya = "response", fv = [
  wa,
  ya
];
class xt extends k {
  constructor(e = {}) {
    super(), this.responseType = r(e, wa, xt.defaultValues(wa)), this.response = r(e, ya, xt.defaultValues(ya)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case wa:
        return u;
      case ya:
        return new I();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case wa:
        return t === u;
      case ya:
        return t.isEqual(xt.defaultValues(e));
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new T({ name: t.responseType || u }),
        new I({ name: t.response || u })
      ]
    });
  }
  fromSchema(e) {
    C(e, fv);
    const t = N(e, e, xt.schema({
      names: {
        responseType: wa,
        response: ya
      }
    }));
    p.assertSchema(t, this.className), this.responseType = t.result.responseType.valueBlock.toString(), this.response = t.result.response;
  }
  toSchema() {
    return new f({
      value: [
        new T({ value: this.responseType }),
        this.response
      ]
    });
  }
  toJSON() {
    return {
      responseType: this.responseType,
      response: this.response.toJSON()
    };
  }
}
xt.CLASS_NAME = "ResponseBytes";
const fr = "responseStatus", Yt = "responseBytes";
class Da extends k {
  constructor(e = {}) {
    super(), this.responseStatus = r(e, fr, Da.defaultValues(fr)), Yt in e && (this.responseBytes = r(e, Yt, Da.defaultValues(Yt))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case fr:
        return new tr();
      case Yt:
        return new xt();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case fr:
        return t.isEqual(Da.defaultValues(e));
      case Yt:
        return xt.compareWithDefault("responseType", t.responseType) && xt.compareWithDefault("response", t.response);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || "OCSPResponse",
      value: [
        new tr({ name: t.responseStatus || fr }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            xt.schema(t.responseBytes || {
              names: {
                blockName: Yt
              }
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, [
      fr,
      Yt
    ]);
    const t = N(e, e, Da.schema());
    p.assertSchema(t, this.className), this.responseStatus = t.result.responseStatus, Yt in t.result && (this.responseBytes = new xt({ schema: t.result.responseBytes }));
  }
  toSchema() {
    const e = [];
    return e.push(this.responseStatus), this.responseBytes && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [this.responseBytes.toSchema()]
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      responseStatus: this.responseStatus.toJSON()
    };
    return this.responseBytes && (e.responseBytes = this.responseBytes.toJSON()), e;
  }
  async getCertificateStatus(e, t, s = F(!0)) {
    let n;
    const i = {
      isForCertificate: !1,
      status: 2
    };
    if (!this.responseBytes || this.responseBytes.responseType !== zc)
      return i;
    try {
      const a = Oe(this.responseBytes.response.valueBlock.valueHexView);
      p.assert(a, "Basic OCSP response"), n = new At({ schema: a.result });
    } catch {
      return i;
    }
    return n.getCertificateStatus(e, t, s);
  }
  async sign(e, t, s = F(!0)) {
    var n;
    if (this.responseBytes && this.responseBytes.responseType === zc)
      return At.fromBER(this.responseBytes.response.valueBlock.valueHexView).sign(e, t, s);
    throw new Error(`Unknown ResponseBytes type: ${((n = this.responseBytes) === null || n === void 0 ? void 0 : n.responseType) || "Unknown"}`);
  }
  async verify(e = null, t = F(!0)) {
    var s;
    if (!(Yt in this))
      throw new Error("Empty ResponseBytes field");
    if (this.responseBytes && this.responseBytes.responseType === zc) {
      const n = At.fromBER(this.responseBytes.response.valueBlock.valueHexView);
      return e !== null && (n.certs || (n.certs = []), n.certs.push(e)), n.verify({}, t);
    }
    throw new Error(`Unknown ResponseBytes type: ${((s = this.responseBytes) === null || s === void 0 ? void 0 : s.responseType) || "Unknown"}`);
  }
}
Da.CLASS_NAME = "OCSPResponse";
const Un = "type", rs = "attributes", Zc = "encodedValue", dv = [
  rs
];
class me extends k {
  constructor(e = {}) {
    super(), this.type = r(e, Un, me.defaultValues(Un)), this.attributes = r(e, rs, me.defaultValues(rs)), this.encodedValue = r(e, Zc, me.defaultValues(Zc)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Un:
        return -1;
      case rs:
        return [];
      case Zc:
        return be;
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Un:
        return t === me.defaultValues(Un);
      case rs:
        return t.length === 0;
      case Zc:
        return t.byteLength === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new w({
      name: t.blockName || u,
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: t.tagNumber || 0
      },
      value: [
        new J({
          name: t.attributes || u,
          value: le.schema()
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, dv);
    const t = N(e, e, me.schema({
      names: {
        tagNumber: this.type,
        attributes: rs
      }
    }));
    p.assertSchema(t, this.className), this.type = t.result.idBlock.tagNumber, this.encodedValue = L.toArrayBuffer(t.result.valueBeforeDecodeView);
    const s = new Uint8Array(this.encodedValue);
    if (s[0] = 49, !(rs in t.result)) {
      if (this.type === 0)
        throw new Error("Wrong structure of SignedUnsignedAttributes");
      return;
    }
    this.attributes = Array.from(t.result.attributes, (n) => new le({ schema: n }));
  }
  toSchema() {
    if (me.compareWithDefault(Un, this.type) || me.compareWithDefault(rs, this.attributes))
      throw new Error('Incorrectly initialized "SignedAndUnsignedAttributes" class');
    return new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: this.type
      },
      value: Array.from(this.attributes, (e) => e.toSchema())
    });
  }
  toJSON() {
    if (me.compareWithDefault(Un, this.type) || me.compareWithDefault(rs, this.attributes))
      throw new Error('Incorrectly initialized "SignedAndUnsignedAttributes" class');
    return {
      type: this.type,
      attributes: Array.from(this.attributes, (e) => e.toJSON())
    };
  }
}
me.CLASS_NAME = "SignedAndUnsignedAttributes";
const va = "version", Ti = "sid", Sa = "digestAlgorithm", fn = "signedAttrs", Aa = "signatureAlgorithm", Ql = "signature", dn = "unsignedAttrs", Rn = "SignerInfo", jh = `${Rn}.${va}`, Xl = `${Rn}.${Ti}`, Fh = `${Rn}.${Sa}`, mu = `${Rn}.${fn}`, qh = `${Rn}.${Aa}`, Wh = `${Rn}.${Ql}`, gu = `${Rn}.${dn}`, mv = [
  jh,
  Xl,
  Fh,
  mu,
  qh,
  Wh,
  gu
];
class Se extends k {
  constructor(e = {}) {
    super(), this.version = r(e, va, Se.defaultValues(va)), this.sid = r(e, Ti, Se.defaultValues(Ti)), this.digestAlgorithm = r(e, Sa, Se.defaultValues(Sa)), fn in e && (this.signedAttrs = r(e, fn, Se.defaultValues(fn))), this.signatureAlgorithm = r(e, Aa, Se.defaultValues(Aa)), this.signature = r(e, Ql, Se.defaultValues(Ql)), dn in e && (this.unsignedAttrs = r(e, dn, Se.defaultValues(dn))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case va:
        return 0;
      case Ti:
        return new K();
      case Sa:
        return new v();
      case fn:
        return new me({ type: 0 });
      case Aa:
        return new v();
      case Ql:
        return new I();
      case dn:
        return new me({ type: 1 });
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case va:
        return Se.defaultValues(va) === t;
      case Ti:
        return t instanceof K;
      case Sa:
        return t instanceof v ? t.isEqual(Se.defaultValues(Sa)) : !1;
      case fn:
        return me.compareWithDefault("type", t.type) && me.compareWithDefault("attributes", t.attributes) && me.compareWithDefault("encodedValue", t.encodedValue);
      case Aa:
        return t instanceof v ? t.isEqual(Se.defaultValues(Aa)) : !1;
      case Ql:
      case dn:
        return me.compareWithDefault("type", t.type) && me.compareWithDefault("attributes", t.attributes) && me.compareWithDefault("encodedValue", t.encodedValue);
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: Rn,
      value: [
        new S({ name: t.version || jh }),
        new he({
          value: [
            Be.schema(t.sidSchema || {
              names: {
                blockName: Xl
              }
            }),
            new he({
              value: [
                new w({
                  optional: !0,
                  name: t.sid || Xl,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 0
                  },
                  value: [new I()]
                }),
                new M({
                  optional: !0,
                  name: t.sid || Xl,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 0
                  }
                })
              ]
            })
          ]
        }),
        v.schema(t.digestAlgorithm || {
          names: {
            blockName: Fh
          }
        }),
        me.schema(t.signedAttrs || {
          names: {
            blockName: mu,
            tagNumber: 0
          }
        }),
        v.schema(t.signatureAlgorithm || {
          names: {
            blockName: qh
          }
        }),
        new I({ name: t.signature || Wh }),
        me.schema(t.unsignedAttrs || {
          names: {
            blockName: gu,
            tagNumber: 1
          }
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, mv);
    const t = N(e, e, Se.schema());
    p.assertSchema(t, this.className), this.version = t.result[jh].valueBlock.valueDec;
    const s = t.result[Xl];
    s.idBlock.tagClass === 1 ? this.sid = new Be({ schema: s }) : this.sid = s, this.digestAlgorithm = new v({ schema: t.result[Fh] }), mu in t.result && (this.signedAttrs = new me({ type: 0, schema: t.result[mu] })), this.signatureAlgorithm = new v({ schema: t.result[qh] }), this.signature = t.result[Wh], gu in t.result && (this.unsignedAttrs = new me({ type: 1, schema: t.result[gu] }));
  }
  toSchema() {
    if (Se.compareWithDefault(Ti, this.sid))
      throw new Error('Incorrectly initialized "SignerInfo" class');
    const e = [];
    return e.push(new S({ value: this.version })), this.sid instanceof Be ? e.push(this.sid.toSchema()) : e.push(this.sid), e.push(this.digestAlgorithm.toSchema()), this.signedAttrs && Se.compareWithDefault(fn, this.signedAttrs) === !1 && e.push(this.signedAttrs.toSchema()), e.push(this.signatureAlgorithm.toSchema()), e.push(this.signature), this.unsignedAttrs && Se.compareWithDefault(dn, this.unsignedAttrs) === !1 && e.push(this.unsignedAttrs.toSchema()), new f({
      value: e
    });
  }
  toJSON() {
    if (Se.compareWithDefault(Ti, this.sid))
      throw new Error('Incorrectly initialized "SignerInfo" class');
    const e = {
      version: this.version,
      digestAlgorithm: this.digestAlgorithm.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signature: this.signature.toJSON()
    };
    return this.sid instanceof K || (e.sid = this.sid.toJSON()), this.signedAttrs && Se.compareWithDefault(fn, this.signedAttrs) === !1 && (e.signedAttrs = this.signedAttrs.toJSON()), this.unsignedAttrs && Se.compareWithDefault(dn, this.unsignedAttrs) === !1 && (e.unsignedAttrs = this.unsignedAttrs.toJSON()), e;
  }
}
Se.CLASS_NAME = "SignerInfo";
const Zl = "version", zl = "policy", ec = "messageImprint", tc = "serialNumber", sc = "genTime", Di = "ordering", Pi = "nonce", pa = "accuracy", ba = "tsa", ka = "extensions", Pt = "TSTInfo", Gh = `${Pt}.${Zl}`, Yh = `${Pt}.${zl}`, Qh = `${Pt}.${ec}`, Xh = `${Pt}.${tc}`, Zh = `${Pt}.${sc}`, wu = `${Pt}.${pa}`, yu = `${Pt}.${Di}`, vu = `${Pt}.${Pi}`, Su = `${Pt}.${ba}`, Au = `${Pt}.${ka}`, gv = [
  Gh,
  Yh,
  Qh,
  Xh,
  Zh,
  wu,
  yu,
  vu,
  Su,
  Au
];
class $e extends k {
  constructor(e = {}) {
    super(), this.version = r(e, Zl, $e.defaultValues(Zl)), this.policy = r(e, zl, $e.defaultValues(zl)), this.messageImprint = r(e, ec, $e.defaultValues(ec)), this.serialNumber = r(e, tc, $e.defaultValues(tc)), this.genTime = r(e, sc, $e.defaultValues(sc)), pa in e && (this.accuracy = r(e, pa, $e.defaultValues(pa))), Di in e && (this.ordering = r(e, Di, $e.defaultValues(Di))), Pi in e && (this.nonce = r(e, Pi, $e.defaultValues(Pi))), ba in e && (this.tsa = r(e, ba, $e.defaultValues(ba))), ka in e && (this.extensions = r(e, ka, $e.defaultValues(ka))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Zl:
        return 0;
      case zl:
        return u;
      case ec:
        return new He();
      case tc:
        return new S();
      case sc:
        return new Date(0, 0, 0);
      case pa:
        return new lt();
      case Di:
        return !1;
      case Pi:
        return new S();
      case ba:
        return new X();
      case ka:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Zl:
      case zl:
      case sc:
      case Di:
        return t === $e.defaultValues(Di);
      case ec:
        return He.compareWithDefault(Mi, t.hashAlgorithm) && He.compareWithDefault(_i, t.hashedMessage);
      case tc:
      case Pi:
        return t.isEqual($e.defaultValues(Pi));
      case pa:
        return lt.compareWithDefault(Os, t.seconds) && lt.compareWithDefault(Rs, t.millis) && lt.compareWithDefault(Ts, t.micros);
      case ba:
        return X.compareWithDefault(fo, t.type) && X.compareWithDefault(mo, t.value);
      case ka:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || Pt,
      value: [
        new S({ name: t.version || Gh }),
        new T({ name: t.policy || Yh }),
        He.schema(t.messageImprint || {
          names: {
            blockName: Qh
          }
        }),
        new S({ name: t.serialNumber || Xh }),
        new ue({ name: t.genTime || Zh }),
        lt.schema(t.accuracy || {
          names: {
            blockName: wu
          }
        }),
        new Ft({
          name: t.ordering || yu,
          optional: !0
        }),
        new S({
          name: t.nonce || vu,
          optional: !0
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [X.schema(t.tsa || {
            names: {
              blockName: Su
            }
          })]
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new J({
              name: t.extensions || Au,
              value: Ve.schema(t.extension || {})
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, gv);
    const t = N(e, e, $e.schema());
    p.assertSchema(t, this.className), this.version = t.result[Gh].valueBlock.valueDec, this.policy = t.result[Yh].valueBlock.toString(), this.messageImprint = new He({ schema: t.result[Qh] }), this.serialNumber = t.result[Xh], this.genTime = t.result[Zh].toDate(), wu in t.result && (this.accuracy = new lt({ schema: t.result[wu] })), yu in t.result && (this.ordering = t.result[yu].valueBlock.value), vu in t.result && (this.nonce = t.result[vu]), Su in t.result && (this.tsa = new X({ schema: t.result[Su] })), Au in t.result && (this.extensions = Array.from(t.result[Au], (s) => new Ve({ schema: s })));
  }
  toSchema() {
    const e = [];
    return e.push(new S({ value: this.version })), e.push(new T({ value: this.policy })), e.push(this.messageImprint.toSchema()), e.push(this.serialNumber), e.push(new ue({ valueDate: this.genTime })), this.accuracy && e.push(this.accuracy.toSchema()), this.ordering !== void 0 && e.push(new Ft({ value: this.ordering })), this.nonce && e.push(this.nonce), this.tsa && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [this.tsa.toSchema()]
    })), this.extensions && e.push(new w({
      optional: !0,
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: Array.from(this.extensions, (t) => t.toSchema())
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      version: this.version,
      policy: this.policy,
      messageImprint: this.messageImprint.toJSON(),
      serialNumber: this.serialNumber.toJSON(),
      genTime: this.genTime
    };
    return this.accuracy && (e.accuracy = this.accuracy.toJSON()), this.ordering !== void 0 && (e.ordering = this.ordering), this.nonce && (e.nonce = this.nonce.toJSON()), this.tsa && (e.tsa = this.tsa.toJSON()), this.extensions && (e.extensions = Array.from(this.extensions, (t) => t.toJSON())), e;
  }
  async verify(e, t = F(!0)) {
    if (!e.data)
      throw new Error('"data" is a mandatory attribute for TST_INFO verification');
    const s = e.data;
    if (e.notBefore && this.genTime < e.notBefore)
      throw new Error("Generation time for TSTInfo object is less than notBefore value");
    if (e.notAfter && this.genTime > e.notAfter)
      throw new Error("Generation time for TSTInfo object is more than notAfter value");
    const n = t.getAlgorithmByOID(this.messageImprint.hashAlgorithm.algorithmId, !0, "MessageImprint.hashAlgorithm"), i = await t.digest(n.name, new Uint8Array(s));
    return L.isEqual(i, this.messageImprint.hashedMessage.valueBlock.valueHexView);
  }
}
$e.CLASS_NAME = "TSTInfo";
const Ea = "version", nc = "digestAlgorithms", ic = "encapContentInfo", Na = "certificates", Ca = "crls", rc = "signerInfos", uo = "ocsps", ir = "SignedData", zh = `${ir}.${Ea}`, pu = `${ir}.${nc}`, ef = `${ir}.${ic}`, bu = `${ir}.${Na}`, ku = `${ir}.${Ca}`, Eu = `${ir}.${rc}`, wv = [
  zh,
  pu,
  ef,
  bu,
  ku,
  Eu
];
class _e extends Error {
  constructor({ message: e, code: t = 0, date: s = /* @__PURE__ */ new Date(), signatureVerified: n = null, signerCertificate: i = null, signerCertificateVerified: a = null, timestampSerial: l = null, certificatePath: c = [] }) {
    super(e), this.name = "SignedDataVerifyError", this.date = s, this.code = t, this.timestampSerial = l, this.signatureVerified = n, this.signerCertificate = i, this.signerCertificateVerified = a, this.certificatePath = c;
  }
}
class Ue extends k {
  constructor(e = {}) {
    super(), this.version = r(e, Ea, Ue.defaultValues(Ea)), this.digestAlgorithms = r(e, nc, Ue.defaultValues(nc)), this.encapContentInfo = r(e, ic, Ue.defaultValues(ic)), Na in e && (this.certificates = r(e, Na, Ue.defaultValues(Na))), Ca in e && (this.crls = r(e, Ca, Ue.defaultValues(Ca))), uo in e && (this.ocsps = r(e, uo, Ue.defaultValues(uo))), this.signerInfos = r(e, rc, Ue.defaultValues(rc)), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ea:
        return 0;
      case nc:
        return [];
      case ic:
        return new nt();
      case Na:
        return [];
      case Ca:
        return [];
      case uo:
        return [];
      case rc:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Ea:
        return t === Ue.defaultValues(Ea);
      case ic:
        return nt.compareWithDefault("eContentType", t.eContentType) && nt.compareWithDefault("eContent", t.eContent);
      case nc:
      case Na:
      case Ca:
      case uo:
      case rc:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return t.optional === void 0 && (t.optional = !1), new f({
      name: t.blockName || ir,
      optional: t.optional,
      value: [
        new S({ name: t.version || zh }),
        new pe({
          value: [
            new J({
              name: t.digestAlgorithms || pu,
              value: v.schema()
            })
          ]
        }),
        nt.schema(t.encapContentInfo || {
          names: {
            blockName: ef
          }
        }),
        new w({
          name: t.certificates || bu,
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: Jt.schema().valueBlock.value
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: ys.schema(t.crls || {
            names: {
              crls: ku
            }
          }).valueBlock.value
        }),
        new pe({
          value: [
            new J({
              name: t.signerInfos || Eu,
              value: Se.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, wv);
    const t = N(e, e, Ue.schema());
    if (p.assertSchema(t, this.className), this.version = t.result[zh].valueBlock.valueDec, pu in t.result && (this.digestAlgorithms = Array.from(t.result[pu], (s) => new v({ schema: s }))), this.encapContentInfo = new nt({ schema: t.result[ef] }), bu in t.result) {
      const s = new Jt({
        schema: new pe({
          value: t.result[bu].valueBlock.value
        })
      });
      this.certificates = s.certificates.slice(0);
    }
    ku in t.result && (this.crls = Array.from(t.result[ku], (s) => s.idBlock.tagClass === 1 ? new Ie({ schema: s }) : (s.idBlock.tagClass = 1, s.idBlock.tagNumber = 16, new ws({ schema: s })))), Eu in t.result && (this.signerInfos = Array.from(t.result[Eu], (s) => new Se({ schema: s })));
  }
  toSchema(e = !1) {
    const t = [];
    if (this.certificates && this.certificates.length && this.certificates.some((s) => s instanceof xn) || this.crls && this.crls.length && this.crls.some((s) => s instanceof ws) ? this.version = 5 : this.certificates && this.certificates.length && this.certificates.some((s) => s instanceof ht) ? this.version = 4 : this.certificates && this.certificates.length && this.certificates.some((s) => s instanceof us) || this.signerInfos.some((s) => s.version === 3) || this.encapContentInfo.eContentType !== Ue.ID_DATA ? this.version = 3 : this.version = 1, t.push(new S({ value: this.version })), t.push(new pe({
      value: Array.from(this.digestAlgorithms, (s) => s.toSchema())
    })), t.push(this.encapContentInfo.toSchema()), this.certificates) {
      const n = new Jt({ certificates: this.certificates }).toSchema();
      t.push(new w({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: n.valueBlock.value
      }));
    }
    return this.crls && t.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 1
      },
      value: Array.from(this.crls, (s) => {
        if (s instanceof ws) {
          const n = s.toSchema();
          return n.idBlock.tagClass = 3, n.idBlock.tagNumber = 1, n;
        }
        return s.toSchema(e);
      })
    })), t.push(new pe({
      value: Array.from(this.signerInfos, (s) => s.toSchema())
    })), new f({
      value: t
    });
  }
  toJSON() {
    const e = {
      version: this.version,
      digestAlgorithms: Array.from(this.digestAlgorithms, (t) => t.toJSON()),
      encapContentInfo: this.encapContentInfo.toJSON(),
      signerInfos: Array.from(this.signerInfos, (t) => t.toJSON())
    };
    return this.certificates && (e.certificates = Array.from(this.certificates, (t) => t.toJSON())), this.crls && (e.crls = Array.from(this.crls, (t) => t.toJSON())), e;
  }
  async verify({ signer: e = -1, data: t = be, trustedCerts: s = [], checkDate: n = /* @__PURE__ */ new Date(), checkChain: i = !1, passedWhenNotRevValues: a = !1, extendedMode: l = !1, findOrigin: c = null, findIssuer: h = null } = {}, m = F(!0)) {
    let g = null, d = null;
    try {
      let b = be, A = u, E = [];
      const y = this.signerInfos[e];
      if (!y)
        throw new _e({
          date: n,
          code: 1,
          message: "Unable to get signer by supplied index"
        });
      if (!this.certificates)
        throw new _e({
          date: n,
          code: 2,
          message: "No certificates attached to this signed data"
        });
      if (y.sid instanceof Be) {
        for (const V of this.certificates)
          if (V instanceof ee && V.issuer.isEqual(y.sid.issuer) && V.serialNumber.isEqual(y.sid.serialNumber)) {
            g = V;
            break;
          }
      } else {
        const V = y.sid, R = V.idBlock.isConstructed ? V.valueBlock.value[0].valueBlock.valueHex : V.valueBlock.valueHex;
        for (const _ of this.certificates) {
          if (!(_ instanceof ee))
            continue;
          const te = await m.digest({ name: "sha-1" }, _.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView);
          if (Ka(te, R)) {
            g = _;
            break;
          }
        }
      }
      if (!g)
        throw new _e({
          date: n,
          code: 3,
          message: "Unable to find signer certificate"
        });
      if (this.encapContentInfo.eContentType === Aw) {
        if (!this.encapContentInfo.eContent)
          throw new _e({
            date: n,
            code: 15,
            message: "Error during verification: TSTInfo eContent is empty",
            signatureVerified: null,
            signerCertificate: g,
            timestampSerial: d,
            signerCertificateVerified: !0
          });
        let V;
        try {
          V = $e.fromBER(this.encapContentInfo.eContent.valueBlock.valueHexView);
        } catch {
          throw new _e({
            date: n,
            code: 15,
            message: "Error during verification: TSTInfo wrong ASN.1 schema ",
            signatureVerified: null,
            signerCertificate: g,
            timestampSerial: d,
            signerCertificateVerified: !0
          });
        }
        if (n = V.genTime, d = V.serialNumber.valueBlock.valueHexView.slice().buffer, t.byteLength === 0)
          throw new _e({
            date: n,
            code: 4,
            message: "Missed detached data input array"
          });
        if (!await V.verify({ data: t }, m))
          throw new _e({
            date: n,
            code: 15,
            message: "Error during verification: TSTInfo verification is failed",
            signatureVerified: !1,
            signerCertificate: g,
            timestampSerial: d,
            signerCertificateVerified: !0
          });
      }
      if (i) {
        const V = this.certificates.filter((j) => j instanceof ee && !!Um(j, g)), R = {
          checkDate: n,
          certs: V,
          trustedCerts: s
        };
        h && (R.findIssuer = h), c && (R.findOrigin = c);
        const _ = new Gu(R);
        if (_.certs.push(g), this.crls)
          for (const j of this.crls)
            "thisUpdate" in j ? _.crls.push(j) : j.otherRevInfoFormat === zc && _.ocsps.push(new At({ schema: j.otherRevInfo }));
        this.ocsps && _.ocsps.push(...this.ocsps);
        const te = await _.verify({ passedWhenNotRevValues: a }, m).catch((j) => {
          throw new _e({
            date: n,
            code: 5,
            message: `Validation of signer's certificate failed with error: ${j instanceof Object ? j.resultMessage : j}`,
            signerCertificate: g,
            signerCertificateVerified: !1
          });
        });
        if (te.certificatePath && (E = te.certificatePath), !te.result)
          throw new _e({
            date: n,
            code: 5,
            message: `Validation of signer's certificate failed: ${te.resultMessage}`,
            signerCertificate: g,
            signerCertificateVerified: !1
          });
      }
      const O = m.getAlgorithmByOID(y.digestAlgorithm.algorithmId);
      if (!("name" in O))
        throw new _e({
          date: n,
          code: 7,
          message: `Unsupported signature algorithm: ${y.digestAlgorithm.algorithmId}`,
          signerCertificate: g,
          signerCertificateVerified: !0
        });
      A = O.name;
      const x = this.encapContentInfo.eContent;
      if (x)
        x.idBlock.tagClass === 1 && x.idBlock.tagNumber === 4 ? t = x.getValue() : t = x.valueBlock.valueBeforeDecodeView.slice().buffer;
      else if (t.byteLength === 0)
        throw new _e({
          date: n,
          code: 8,
          message: "Missed detached data input array",
          signerCertificate: g,
          signerCertificateVerified: !0
        });
      if (y.signedAttrs) {
        let V = !1, R = !1;
        for (const _ of y.signedAttrs.attributes)
          if (_.type === "1.2.840.113549.1.9.3" && (V = !0), _.type === "1.2.840.113549.1.9.4" && (R = !0, b = _.values[0].valueBlock.valueHex), V && R)
            break;
        if (V === !1)
          throw new _e({
            date: n,
            code: 9,
            message: 'Attribute "content-type" is a mandatory attribute for "signed attributes"',
            signerCertificate: g,
            signerCertificateVerified: !0
          });
        if (R === !1)
          throw new _e({
            date: n,
            code: 10,
            message: 'Attribute "message-digest" is a mandatory attribute for "signed attributes"',
            signatureVerified: null,
            signerCertificate: g,
            signerCertificateVerified: !0
          });
      }
      if (y.signedAttrs) {
        const V = await m.digest(A, new Uint8Array(t));
        if (!Ka(V, b))
          throw new _e({
            date: n,
            code: 15,
            message: "Error during verification: Message digest doesn't match",
            signatureVerified: null,
            signerCertificate: g,
            timestampSerial: d,
            signerCertificateVerified: !0
          });
        t = y.signedAttrs.encodedValue;
      }
      const B = y.signatureAlgorithm.algorithmId === "1.2.840.113549.1.1.1" ? await m.verifyWithPublicKey(t, y.signature, g.subjectPublicKeyInfo, y.signatureAlgorithm, A) : await m.verifyWithPublicKey(t, y.signature, g.subjectPublicKeyInfo, y.signatureAlgorithm);
      return l ? {
        date: n,
        code: 14,
        message: u,
        signatureVerified: B,
        signerCertificate: g,
        timestampSerial: d,
        signerCertificateVerified: !0,
        certificatePath: E
      } : B;
    } catch (b) {
      throw b instanceof _e ? b : new _e({
        date: n,
        code: 15,
        message: `Error during verification: ${b instanceof Error ? b.message : b}`,
        signatureVerified: null,
        signerCertificate: g,
        timestampSerial: d,
        signerCertificateVerified: !0
      });
    }
  }
  async sign(e, t, s = "SHA-1", n = be, i = F(!0)) {
    var a;
    if (!e)
      throw new Error("Need to provide a private key for signing");
    const l = this.signerInfos[t];
    if (!l)
      throw new RangeError("SignerInfo index is out of range");
    !(!((a = l.signedAttrs) === null || a === void 0) && a.attributes.length) && "hash" in e.algorithm && "hash" in e.algorithm && e.algorithm.hash && (s = e.algorithm.hash.name);
    const c = i.getOIDByAlgorithm({ name: s }, !0, "hashAlgorithm");
    this.digestAlgorithms.filter((d) => d.algorithmId === c).length === 0 && this.digestAlgorithms.push(new v({
      algorithmId: c,
      algorithmParams: new Ae()
    })), l.digestAlgorithm = new v({
      algorithmId: c,
      algorithmParams: new Ae()
    });
    const h = await i.getSignatureParameters(e, s), m = h.parameters;
    if (l.signatureAlgorithm = h.signatureAlgorithm, l.signedAttrs)
      if (l.signedAttrs.encodedValue.byteLength !== 0)
        n = l.signedAttrs.encodedValue;
      else {
        n = l.signedAttrs.toSchema().toBER();
        const d = L.toUint8Array(n);
        d[0] = 49;
      }
    else {
      const d = this.encapContentInfo.eContent;
      if (d)
        d.idBlock.tagClass === 1 && d.idBlock.tagNumber === 4 ? n = d.getValue() : n = d.valueBlock.valueBeforeDecodeView.slice().buffer;
      else if (n.byteLength === 0)
        throw new Error("Missed detached data input array");
    }
    const g = await i.signWithPrivateKey(n, e, m);
    l.signature = new I({ valueHex: g });
  }
}
Ue.CLASS_NAME = "SignedData";
Ue.ID_DATA = Af;
const Li = "version", Ui = "authSafe", as = "macData", ho = "parsedValue", yv = [
  Li,
  Ui,
  as
];
class vn extends k {
  constructor(e = {}) {
    super(), this.version = r(e, Li, vn.defaultValues(Li)), this.authSafe = r(e, Ui, vn.defaultValues(Ui)), as in e && (this.macData = r(e, as, vn.defaultValues(as))), ho in e && (this.parsedValue = r(e, ho, vn.defaultValues(ho))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Li:
        return 3;
      case Ui:
        return new oe();
      case as:
        return new Ge();
      case ho:
        return {};
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Li:
        return t === vn.defaultValues(e);
      case Ui:
        return oe.compareWithDefault("contentType", t.contentType) && oe.compareWithDefault("content", t.content);
      case as:
        return Ge.compareWithDefault("mac", t.mac) && Ge.compareWithDefault("macSalt", t.macSalt) && Ge.compareWithDefault("iterations", t.iterations);
      case ho:
        return t instanceof Object && Object.keys(t).length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.version || Li }),
        oe.schema(t.authSafe || {
          names: {
            blockName: Ui
          }
        }),
        Ge.schema(t.macData || {
          names: {
            blockName: as,
            optional: !0
          }
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, yv);
    const t = N(e, e, vn.schema({
      names: {
        version: Li,
        authSafe: {
          names: {
            blockName: Ui
          }
        },
        macData: {
          names: {
            blockName: as
          }
        }
      }
    }));
    p.assertSchema(t, this.className), this.version = t.result.version.valueBlock.valueDec, this.authSafe = new oe({ schema: t.result.authSafe }), as in t.result && (this.macData = new Ge({ schema: t.result.macData }));
  }
  toSchema() {
    const e = [
      new S({ value: this.version }),
      this.authSafe.toSchema()
    ];
    return this.macData && e.push(this.macData.toSchema()), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      version: this.version,
      authSafe: this.authSafe.toJSON()
    };
    return this.macData && (e.macData = this.macData.toJSON()), e;
  }
  async makeInternalValues(e = {}, t = F(!0)) {
    if (ie.assert(e, "parameters", "object"), !this.parsedValue)
      throw new Error('Please call "parseValues" function first in order to make "parsedValue" data');
    switch (Q.assertEmpty(this.parsedValue.integrityMode, "integrityMode", "parsedValue"), Q.assertEmpty(this.parsedValue.authenticatedSafe, "authenticatedSafe", "parsedValue"), this.parsedValue.integrityMode) {
      case 0:
        {
          if (!("iterations" in e))
            throw new Q("iterations");
          Q.assertEmpty(e.pbkdf2HashAlgorithm, "pbkdf2HashAlgorithm"), Q.assertEmpty(e.hmacHashAlgorithm, "hmacHashAlgorithm"), Q.assertEmpty(e.password, "password");
          const s = new ArrayBuffer(64), n = new Uint8Array(s);
          t.getRandomValues(n);
          const i = this.parsedValue.authenticatedSafe.toSchema().toBER(!1);
          this.authSafe = new oe({
            contentType: oe.DATA,
            content: new I({ valueHex: i })
          });
          const a = await t.stampDataWithPassword({
            password: e.password,
            hashAlgorithm: e.hmacHashAlgorithm,
            salt: s,
            iterationCount: e.iterations,
            contentToStamp: i
          });
          this.macData = new Ge({
            mac: new bt({
              digestAlgorithm: new v({
                algorithmId: t.getOIDByAlgorithm({ name: e.hmacHashAlgorithm }, !0, "hmacHashAlgorithm")
              }),
              digest: new I({ valueHex: a })
            }),
            macSalt: new I({ valueHex: s }),
            iterations: e.iterations
          });
        }
        break;
      case 1:
        {
          if (!("signingCertificate" in e))
            throw new Q("signingCertificate");
          Q.assertEmpty(e.privateKey, "privateKey"), Q.assertEmpty(e.hashAlgorithm, "hashAlgorithm");
          const s = this.parsedValue.authenticatedSafe.toSchema().toBER(!1), n = new Ue({
            version: 1,
            encapContentInfo: new nt({
              eContentType: "1.2.840.113549.1.7.1",
              eContent: new I({ valueHex: s })
            }),
            certificates: [e.signingCertificate]
          }), i = await t.digest({ name: e.hashAlgorithm }, new Uint8Array(s)), a = [];
          a.push(new le({
            type: "1.2.840.113549.1.9.3",
            values: [
              new T({ value: "1.2.840.113549.1.7.1" })
            ]
          })), a.push(new le({
            type: "1.2.840.113549.1.9.5",
            values: [
              new ja({ valueDate: /* @__PURE__ */ new Date() })
            ]
          })), a.push(new le({
            type: "1.2.840.113549.1.9.4",
            values: [
              new I({ valueHex: i })
            ]
          })), n.signerInfos.push(new Se({
            version: 1,
            sid: new Be({
              issuer: e.signingCertificate.issuer,
              serialNumber: e.signingCertificate.serialNumber
            }),
            signedAttrs: new me({
              type: 0,
              attributes: a
            })
          })), await n.sign(e.privateKey, 0, e.hashAlgorithm, void 0, t), this.authSafe = new oe({
            contentType: "1.2.840.113549.1.7.2",
            content: n.toSchema(!0)
          });
        }
        break;
      default:
        throw new Error(`Parameter "integrityMode" has unknown value: ${this.parsedValue.integrityMode}`);
    }
  }
  async parseInternalValues(e, t = F(!0)) {
    switch (ie.assert(e, "parameters", "object"), e.checkIntegrity === void 0 && (e.checkIntegrity = !0), this.parsedValue = {}, this.authSafe.contentType) {
      case oe.DATA:
        {
          Q.assertEmpty(e.password, "password"), this.parsedValue.integrityMode = 0, ie.assert(this.authSafe.content, "authSafe.content", I);
          const s = this.authSafe.content.getValue();
          if (this.parsedValue.authenticatedSafe = zi.fromBER(s), e.checkIntegrity) {
            if (!this.macData)
              throw new Error('Absent "macData" value, can not check PKCS#12 data integrity');
            const n = t.getAlgorithmByOID(this.macData.mac.digestAlgorithm.algorithmId, !0, "digestAlgorithm");
            if (!await t.verifyDataStampedWithPassword({
              password: e.password,
              hashAlgorithm: n.name,
              salt: L.toArrayBuffer(this.macData.macSalt.valueBlock.valueHexView),
              iterationCount: this.macData.iterations || 1,
              contentToVerify: s,
              signatureToVerify: L.toArrayBuffer(this.macData.mac.digest.valueBlock.valueHexView)
            }))
              throw new Error("Integrity for the PKCS#12 data is broken!");
          }
        }
        break;
      case oe.SIGNED_DATA:
        {
          this.parsedValue.integrityMode = 1;
          const s = new Ue({ schema: this.authSafe.content }), n = s.encapContentInfo.eContent;
          Q.assert(n, "eContent", "cmsSigned.encapContentInfo"), ie.assert(n, "eContent", I);
          const i = n.getValue();
          if (this.parsedValue.authenticatedSafe = zi.fromBER(i), !await s.verify({ signer: 0, checkChain: !1 }, t))
            throw new Error("Integrity for the PKCS#12 data is broken!");
        }
        break;
      default:
        throw new Error(`Incorrect value for "this.authSafe.contentType": ${this.authSafe.contentType}`);
    }
  }
}
vn.CLASS_NAME = "PFX";
const Ba = "status", mn = "statusStrings", gn = "failInfo", vv = [
  Ba,
  mn,
  gn
];
var ad;
(function(o) {
  o[o.granted = 0] = "granted", o[o.grantedWithMods = 1] = "grantedWithMods", o[o.rejection = 2] = "rejection", o[o.waiting = 3] = "waiting", o[o.revocationWarning = 4] = "revocationWarning", o[o.revocationNotification = 5] = "revocationNotification";
})(ad || (ad = {}));
class pt extends k {
  constructor(e = {}) {
    super(), this.status = r(e, Ba, pt.defaultValues(Ba)), mn in e && (this.statusStrings = r(e, mn, pt.defaultValues(mn))), gn in e && (this.failInfo = r(e, gn, pt.defaultValues(gn))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Ba:
        return 2;
      case mn:
        return [];
      case gn:
        return new G();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Ba:
        return t === pt.defaultValues(e);
      case mn:
        return t.length === 0;
      case gn:
        return t.isEqual(pt.defaultValues(e));
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || u,
      value: [
        new S({ name: t.status || u }),
        new f({
          optional: !0,
          value: [
            new J({
              name: t.statusStrings || u,
              value: new Dt()
            })
          ]
        }),
        new G({
          name: t.failInfo || u,
          optional: !0
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, vv);
    const t = N(e, e, pt.schema({
      names: {
        status: Ba,
        statusStrings: mn,
        failInfo: gn
      }
    }));
    p.assertSchema(t, this.className);
    const s = t.result.status;
    if (s.valueBlock.isHexOnly === !0 || s.valueBlock.valueDec < 0 || s.valueBlock.valueDec > 5)
      throw new Error('PKIStatusInfo "status" has invalid value');
    this.status = s.valueBlock.valueDec, mn in t.result && (this.statusStrings = t.result.statusStrings), gn in t.result && (this.failInfo = t.result.failInfo);
  }
  toSchema() {
    const e = [];
    return e.push(new S({ value: this.status })), this.statusStrings && e.push(new f({
      optional: !0,
      value: this.statusStrings
    })), this.failInfo && e.push(this.failInfo), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      status: this.status
    };
    return this.statusStrings && (e.statusStrings = Array.from(this.statusStrings, (t) => t.toJSON())), this.failInfo && (e.failInfo = this.failInfo.toJSON()), e;
  }
}
pt.CLASS_NAME = "PKIStatusInfo";
const ac = "version", oc = "messageImprint", Ia = "reqPolicy", Va = "nonce", os = "certReq", xa = "extensions", rr = "TimeStampReq", tf = `${rr}.${ac}`, sf = `${rr}.${oc}`, Nu = `${rr}.${Ia}`, Cu = `${rr}.${Va}`, Bu = `${rr}.${os}`, Iu = `${rr}.${xa}`, Sv = [
  tf,
  sf,
  Nu,
  Cu,
  Bu,
  Iu
];
class it extends k {
  constructor(e = {}) {
    super(), this.version = r(e, ac, it.defaultValues(ac)), this.messageImprint = r(e, oc, it.defaultValues(oc)), Ia in e && (this.reqPolicy = r(e, Ia, it.defaultValues(Ia))), Va in e && (this.nonce = r(e, Va, it.defaultValues(Va))), os in e && (this.certReq = r(e, os, it.defaultValues(os))), xa in e && (this.extensions = r(e, xa, it.defaultValues(xa))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case ac:
        return 0;
      case oc:
        return new He();
      case Ia:
        return u;
      case Va:
        return new S();
      case os:
        return !1;
      case xa:
        return [];
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case ac:
      case Ia:
      case os:
        return t === it.defaultValues(e);
      case oc:
        return He.compareWithDefault("hashAlgorithm", t.hashAlgorithm) && He.compareWithDefault("hashedMessage", t.hashedMessage);
      case Va:
        return t.isEqual(it.defaultValues(e));
      case xa:
        return t.length === 0;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || rr,
      value: [
        new S({ name: t.version || tf }),
        He.schema(t.messageImprint || {
          names: {
            blockName: sf
          }
        }),
        new T({
          name: t.reqPolicy || Nu,
          optional: !0
        }),
        new S({
          name: t.nonce || Cu,
          optional: !0
        }),
        new Ft({
          name: t.certReq || Bu,
          optional: !0
        }),
        new w({
          optional: !0,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new J({
            name: t.extensions || Iu,
            value: Ve.schema()
          })]
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Sv);
    const t = N(e, e, it.schema());
    p.assertSchema(t, this.className), this.version = t.result[tf].valueBlock.valueDec, this.messageImprint = new He({ schema: t.result[sf] }), Nu in t.result && (this.reqPolicy = t.result[Nu].valueBlock.toString()), Cu in t.result && (this.nonce = t.result[Cu]), Bu in t.result && (this.certReq = t.result[Bu].valueBlock.value), Iu in t.result && (this.extensions = Array.from(t.result[Iu], (s) => new Ve({ schema: s })));
  }
  toSchema() {
    const e = [];
    return e.push(new S({ value: this.version })), e.push(this.messageImprint.toSchema()), this.reqPolicy && e.push(new T({ value: this.reqPolicy })), this.nonce && e.push(this.nonce), os in this && it.compareWithDefault(os, this.certReq) === !1 && e.push(new Ft({ value: this.certReq })), this.extensions && e.push(new w({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: Array.from(this.extensions, (t) => t.toSchema())
    })), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      version: this.version,
      messageImprint: this.messageImprint.toJSON()
    };
    return this.reqPolicy !== void 0 && (e.reqPolicy = this.reqPolicy), this.nonce !== void 0 && (e.nonce = this.nonce.toJSON()), this.certReq !== void 0 && it.compareWithDefault(os, this.certReq) === !1 && (e.certReq = this.certReq), this.extensions && (e.extensions = Array.from(this.extensions, (t) => t.toJSON())), e;
  }
}
it.CLASS_NAME = "TimeStampReq";
const Oa = "status", Ra = "timeStampToken", Of = "TimeStampResp", nf = `${Of}.${Oa}`, Vu = `${Of}.${Ra}`, Av = [
  nf,
  Vu
];
class hc extends k {
  constructor(e = {}) {
    super(), this.status = r(e, Oa, hc.defaultValues(Oa)), Ra in e && (this.timeStampToken = r(e, Ra, hc.defaultValues(Ra))), e.schema && this.fromSchema(e.schema);
  }
  static defaultValues(e) {
    switch (e) {
      case Oa:
        return new pt();
      case Ra:
        return new oe();
      default:
        return super.defaultValues(e);
    }
  }
  static compareWithDefault(e, t) {
    switch (e) {
      case Oa:
        return pt.compareWithDefault(Oa, t.status) && !("statusStrings" in t) && !("failInfo" in t);
      case Ra:
        return t.contentType === u && t.content instanceof K;
      default:
        return super.defaultValues(e);
    }
  }
  static schema(e = {}) {
    const t = r(e, "names", {});
    return new f({
      name: t.blockName || Of,
      value: [
        pt.schema(t.status || {
          names: {
            blockName: nf
          }
        }),
        oe.schema(t.timeStampToken || {
          names: {
            blockName: Vu,
            optional: !0
          }
        })
      ]
    });
  }
  fromSchema(e) {
    C(e, Av);
    const t = N(e, e, hc.schema());
    p.assertSchema(t, this.className), this.status = new pt({ schema: t.result[nf] }), Vu in t.result && (this.timeStampToken = new oe({ schema: t.result[Vu] }));
  }
  toSchema() {
    const e = [];
    return e.push(this.status.toSchema()), this.timeStampToken && e.push(this.timeStampToken.toSchema()), new f({
      value: e
    });
  }
  toJSON() {
    const e = {
      status: this.status.toJSON()
    };
    return this.timeStampToken && (e.timeStampToken = this.timeStampToken.toJSON()), e;
  }
  async sign(e, t, s = F(!0)) {
    return this.assertContentType(), new Ue({ schema: this.timeStampToken.content }).sign(e, 0, t, void 0, s);
  }
  async verify(e = { signer: 0, trustedCerts: [], data: be }, t = F(!0)) {
    return this.assertContentType(), new Ue({ schema: this.timeStampToken.content }).verify(e, t);
  }
  assertContentType() {
    if (!this.timeStampToken)
      throw new Error("timeStampToken is absent in TSP response");
    if (this.timeStampToken.contentType !== Vm)
      throw new Error(`Wrong format of timeStampToken: ${this.timeStampToken.contentType}`);
  }
}
hc.CLASS_NAME = "TimeStampResp";
function pv() {
  if (typeof globalThis < "u" && "crypto" in globalThis) {
    let o = "webcrypto";
    "webkitSubtle" in globalThis.crypto && (o = "safari"), Ph(o, new pc({ name: o, crypto: globalThis.crypto }));
  } else if (typeof crypto < "u" && "webcrypto" in crypto) {
    const o = "NodeJS ^15", e = crypto.webcrypto;
    Ph(o, new pc({ name: o, crypto: e }));
  }
}
pv();
let od = !1;
function bv() {
  if (!od && (od = !0, !F())) {
    const o = globalThis.crypto;
    if (!o?.subtle)
      throw new Error("@embedpdf/core-signature needs WebCrypto (globalThis.crypto.subtle)");
    Ph("embedpdf", new pc({ name: "embedpdf", crypto: o }));
  }
  return F(!0);
}
function kv(o) {
  const e = new Uint8Array(o.byteLength);
  return e.set(o), e.buffer;
}
function Ev(o, e) {
  if (o.byteLength !== e.byteLength) return !1;
  for (let t = 0; t < o.byteLength; t++) if (o[t] !== e[t]) return !1;
  return !0;
}
const Ov = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bytesEqual: Ev,
  ensureEngine: bv,
  toArrayBuffer: kv
}, Symbol.toStringTag, { value: "Module" }));
export {
  pn as A,
  Fi as B,
  ee as C,
  Ve as E,
  ue as G,
  S as I,
  He as M,
  Ae as N,
  I as O,
  Pe as R,
  Ue as S,
  $e as T,
  Dt as U,
  G as a,
  oe as b,
  ja as c,
  f as d,
  bv as e,
  Oe as f,
  T as g,
  Be as h,
  Ev as i,
  le as j,
  Qe as k,
  xe as l,
  X as m,
  v as n,
  Se as o,
  me as p,
  pe as q,
  nt as r,
  zw as s,
  kv as t,
  Gu as u,
  Ov as v
};
//# sourceMappingURL=engine-CcsIvE98.js.map
