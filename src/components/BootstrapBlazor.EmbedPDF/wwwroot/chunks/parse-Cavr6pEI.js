import { aS as S, t as $, f as q, b1 as j, aW as l, b2 as G, b3 as F, O as N, b4 as L, b5 as W, b6 as P, b7 as Y, b8 as M, b9 as z } from "./wasm-url-asset-C3FjD8P-.js";
import { C as a } from "./error-CbfoSMwv.js";
function oe(e) {
  return K(e).parsed;
}
function K(e, t = "detached", o = {}) {
  const i = Q(e, t, o), n = J(i);
  if (!n)
    throw new a("malformed", "the signer certificate is not carried by the CMS");
  return n;
}
function J(e) {
  const t = e.signerCertificate;
  return t ? {
    ...e,
    signerCertificate: t,
    parsed: {
      digestAlgorithm: e.digestAlgorithm,
      messageDigest: e.messageDigest,
      signingTime: e.signingTime,
      signerCertificate: H(t),
      certificates: e.certificates.map(H),
      signatureAlgorithm: e.signerInfo.signatureAlgorithm.algorithmId,
      signingCertificateV2: e.bindings.some((o) => o.version === 2),
      timestampToken: e.timestampTokens[0] ?? null
    }
  } : null;
}
function Q(e, t = "detached", o = {}) {
  if (e.byteLength === 0) throw new a("malformed", "empty CMS");
  const i = q($(e));
  if (i.offset === -1) throw new a("malformed", "CMS is not valid BER");
  let n, s, f;
  try {
    if (n = new j({ schema: i.result }), n.contentType !== l.signedData)
      throw new a(
        "unsupported",
        `CMS content type ${n.contentType} is not SignedData`
      );
    f = X(n.content), s = new G({ schema: n.content });
  } catch (r) {
    throw r instanceof a ? r : new a(
      "malformed",
      `CMS does not parse as SignedData: ${r.message}`
    );
  }
  const c = s.encapContentInfo, g = t === "tst-info" ? l.tstInfo : l.data;
  let d = null;
  if (t === "detached") {
    if (c.eContent)
      throw new a(
        "unsupported",
        "CMS carries encapsulated content; a PDF signature is detached"
      );
  } else {
    if (c.eContentType !== l.tstInfo || !c.eContent)
      throw new a("malformed", "a timestamp token must carry a TSTInfo");
    d = new Uint8Array(c.eContent.getValue());
  }
  if (s.signerInfos.length !== 1)
    throw new a(
      "unsupported",
      `CMS has ${s.signerInfos.length} signers; exactly one is expected`
    );
  const u = s.signerInfos[0], w = F[u.digestAlgorithm.algorithmId];
  if (!w)
    throw new a("unsupported", `digest algorithm ${u.digestAlgorithm.algorithmId}`);
  ee(n, s);
  const B = (s.certificates ?? []).filter(
    (r) => r instanceof S
  ), v = O(u, B) ?? O(u, o.certificates ?? []), T = u.signedAttrs?.attributes ?? [];
  if (T.length === 0)
    throw new a(
      "unsupported",
      "CMS has no signed attributes; a PDF signature needs message-digest"
    );
  const m = (r) => T.find((A) => A.type === r), D = m(l.contentType);
  if (D) {
    const r = D.values[0];
    if (!r || r.valueBlock.toString() !== g)
      throw new a(
        "unsupported",
        `CMS content-type attribute is not ${t === "tst-info" ? "id-ct-TSTInfo" : "id-data"}`
      );
  }
  const b = m(l.messageDigest)?.values[0];
  if (!b || !(b instanceof N))
    throw new a("malformed", "CMS has no message-digest attribute");
  const _ = new Uint8Array(b.valueBlock.valueHexView);
  let V = null;
  const y = m(l.signingTime)?.values[0];
  (y instanceof L || y instanceof W) && (V = y.toDate().toISOString());
  const k = [], x = m(l.signingCertificateV2);
  x && k.push(U(x, 2));
  const R = m(l.signingCertificate);
  R && k.push(U(R, 1));
  const E = [];
  for (const r of u.unsignedAttrs?.attributes ?? [])
    if (r.type === l.timestampToken)
      for (const A of r.values) E.push(p(A));
  return {
    signedData: s,
    signerInfo: u,
    digestAlgorithm: w,
    messageDigest: _,
    signingTime: V,
    signerCertificate: v,
    certificates: v ? [v, ...B.filter((r) => r !== v)] : B,
    bindings: k,
    timestampTokens: E,
    eContent: d,
    revocation: Z(f, m(l.revocationInfoArchival))
  };
}
const C = (e, t) => e.idBlock.tagClass === 3 && e.idBlock.tagNumber === t, h = (e) => e?.valueBlock?.value ?? [];
function X(e) {
  const t = { ocspResponses: [], crls: [] }, o = h(e).find((i) => C(i, 1));
  for (const i of h(o)) {
    if (i.idBlock.tagClass === 1) {
      t.crls.push(p(i));
      continue;
    }
    if (!C(i, 1)) continue;
    const [n, s] = h(i);
    n instanceof P && n.valueBlock.toString() === l.ocspResponseInfo && s && t.ocspResponses.push(p(s));
  }
  return t;
}
function Z(e, t) {
  const o = {
    ocspResponses: [...e.ocspResponses],
    crls: [...e.crls]
  };
  for (const i of h(t?.values[0])) {
    const n = h(h(i)[0]);
    if (C(i, 0)) for (const s of n) o.crls.push(p(s));
    if (C(i, 1)) for (const s of n) o.ocspResponses.push(p(s));
  }
  return o;
}
function U(e, t) {
  const o = t === 2 ? "signing-certificate-v2" : "signing-certificate", f = e.values[0]?.valueBlock?.value?.[0]?.valueBlock?.value?.[0]?.valueBlock?.value ?? [];
  let c = t === 2 ? "sha256" : "sha1", g = 0;
  const d = f[0];
  if (t === 2 && d instanceof z && d.valueBlock.value[0] instanceof P) {
    const w = d.valueBlock.value[0].valueBlock.toString();
    c = F[w] ?? null, g = 1;
  }
  const u = f[g];
  if (!(u instanceof N))
    throw new a("malformed", `${o} carries no certHash`);
  return { version: t, algorithm: c, certHash: new Uint8Array(u.valueBlock.valueHexView) };
}
function p(e) {
  const t = e.valueBeforeDecodeView;
  return t.byteLength > 0 ? new Uint8Array(t) : new Uint8Array(e.toBER(!1));
}
const I = /* @__PURE__ */ new WeakMap();
function ee(e, t) {
  const n = (e.content.valueBlock?.value ?? []).find(
    (s) => s.idBlock.tagClass === 3 && s.idBlock.tagNumber === 0
  )?.valueBlock?.value ?? [];
  (t.certificates ?? []).forEach((s, f) => {
    const c = n[f];
    s instanceof S && c && I.set(s, p(c));
  });
}
function H(e) {
  return I.get(e) ?? new Uint8Array(e.toSchema(!0).toBER(!1));
}
function re(e) {
  const t = S.fromBER($(e));
  return I.set(t, e), t;
}
function O(e, t) {
  const o = e.sid;
  if (o instanceof Y) {
    for (const n of t)
      if (n.issuer.isEqual(o.issuer) && M(
        new Uint8Array(n.serialNumber.valueBlock.valueHexView),
        new Uint8Array(o.serialNumber.valueBlock.valueHexView)
      ))
        return n;
    return null;
  }
  const i = o?.valueBlock?.valueHexView;
  if (!i) return null;
  for (const n of t) {
    const s = n.extensions?.find((g) => g.extnID === l.subjectKeyIdentifier), f = s ? q(s.extnValue.valueBlock.valueHexView) : null, c = f && f.offset !== -1 ? f.result : null;
    if (c && M(new Uint8Array(c.valueBlock.valueHexView), new Uint8Array(i)))
      return n;
  }
  return null;
}
export {
  a as CmsError,
  H as certDer,
  re as certificateFromDer,
  K as parseCmsInternal,
  oe as parseDetachedCms,
  Q as readCmsParts,
  J as withSignerCertificate
};
//# sourceMappingURL=parse-Cavr6pEI.js.map
