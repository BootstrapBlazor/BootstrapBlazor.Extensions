import { C as l } from "./error-CbfoSMwv.js";
function S(n, t, r) {
  const o = () => new l("malformed", "CMS is not valid BER");
  let e = t;
  if (e >= r) throw o();
  const s = n[e++];
  if ((s & 31) === 31) {
    for (; e < r && (n[e] & 128) !== 0; ) e++;
    e++;
  }
  const d = e;
  if (e >= r) throw o();
  const c = n[e++];
  if (c === 128) {
    const i = e;
    for (; !(n[e] === 0 && n[e + 1] === 0); )
      if (e = S(n, e, r).end, e + 1 >= r) throw o();
    return {
      start: t,
      lengthStart: d,
      contentStart: i,
      contentEnd: e,
      end: e + 2,
      tag: s,
      indefinite: !0
    };
  }
  let a = c;
  if (c > 128) {
    const i = c & 127;
    if (i > 6 || e + i > r) throw o();
    a = 0;
    for (let g = 0; g < i; g++) a = a * 256 + n[e++];
  }
  if (e + a > r) throw o();
  return {
    start: t,
    lengthStart: d,
    contentStart: e,
    contentEnd: e + a,
    end: e + a,
    tag: s,
    indefinite: !1
  };
}
function h(n, t) {
  const r = [];
  for (let o = t.contentStart; o < t.contentEnd; ) {
    const e = S(n, o, t.contentEnd);
    r.push(e), o = e.end;
  }
  return r;
}
function U(n) {
  if (n < 128) return new Uint8Array([n]);
  const t = [];
  for (let r = n; r > 0; r = Math.floor(r / 256)) t.unshift(r % 256);
  return new Uint8Array([128 | t.length, ...t]);
}
function u(...n) {
  const t = new Uint8Array(n.reduce((o, e) => o + e.byteLength, 0));
  let r = 0;
  for (const o of n)
    t.set(o, r), r += o.byteLength;
  return t;
}
function I(n, t) {
  return u(new Uint8Array([n]), U(t.byteLength), t);
}
function y(n, t, r) {
  const o = n.subarray(t.start, t.lengthStart);
  return t.indefinite ? u(o, new Uint8Array([128]), r, new Uint8Array([0, 0])) : u(o, U(r.byteLength), r);
}
function w(n, t, r, o) {
  return y(
    n,
    t,
    u(
      n.subarray(t.contentStart, r.start),
      o,
      n.subarray(r.end, t.contentEnd)
    )
  );
}
function O(n, t) {
  const r = Math.min(n.byteLength, t.byteLength);
  for (let o = 0; o < r; o++)
    if (n[o] !== t[o]) return n[o] - t[o];
  return n.byteLength - t.byteLength;
}
function v(n, t) {
  const r = (f) => new l("malformed", `CMS has no ${f}`), o = S(n, 0, n.byteLength), e = h(n, o).find((f) => f.tag === 160);
  if (!e) throw r("content");
  const s = h(n, e)[0];
  if (!s || s.tag !== 48) throw r("SignedData");
  const d = h(n, s).at(-1);
  if (!d || d.tag !== 49) throw r("signers");
  const c = h(n, d);
  if (c.length !== 1 || c[0].tag !== 48)
    throw new l("unsupported", `CMS has ${c.length} signers; exactly one is expected`);
  const a = c[0], i = h(n, a).find((f) => f.tag === 161);
  let g;
  if (i) {
    const b = h(n, i).find(
      (A) => O(n.subarray(A.start, A.end), t) >= 0
    ), C = b ? b.start : i.contentEnd, D = y(
      n,
      i,
      u(
        n.subarray(i.contentStart, C),
        t,
        n.subarray(C, i.contentEnd)
      )
    );
    g = w(n, a, i, D);
  } else
    g = y(
      n,
      a,
      u(
        n.subarray(a.contentStart, a.contentEnd),
        I(161, t)
      )
    );
  const p = w(n, d, a, g), x = w(n, s, d, p), M = w(n, e, s, x), E = w(n, o, e, M), L = n.subarray(o.end);
  return L.some((f) => f !== 0) ? u(E, L) : E;
}
export {
  v as a,
  h as c,
  O as d,
  I as e,
  S as r
};
//# sourceMappingURL=splice-DZQMGiQI.js.map
