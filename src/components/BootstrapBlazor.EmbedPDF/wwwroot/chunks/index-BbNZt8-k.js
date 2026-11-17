var Te = Object.defineProperty;
var Se = (e, t, n) => t in e ? Te(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var j = (e, t, n) => Se(e, typeof t != "symbol" ? t + "" : t, n);
import { readCmsParts as ne, withSignerCertificate as Ie, parseCmsInternal as K, certDer as C, certificateFromDer as D } from "./parse-Cavr6pEI.js";
import { parseDetachedCms as Xt } from "./parse-Cavr6pEI.js";
import { r as Re, c as xe, v as De, a as se, b as Ee } from "./timestamp-BV9RUAmN.js";
import { aR as x, b0 as _, t as E, b8 as R, by as I, bz as $e, aW as v, bA as k, bB as b, f as M, bC as Oe, bD as Pe, bE as Be, b5 as Ve, bF as Ne, bG as Ue, O as je, bH as Fe, b1 as Me, b2 as Le, aS as qe } from "./wasm-url-asset-C3FjD8P-.js";
import { bI as Zt, bJ as Jt, bK as Qt, bL as en, bM as tn, bN as nn, bO as sn, bP as rn, bQ as an, bR as on, bS as cn } from "./wasm-url-asset-C3FjD8P-.js";
import { C as P } from "./error-CbfoSMwv.js";
import { certificateCommonName as U } from "./self-signed-DW1GYTMc.js";
import { selfSignedCertificate as dn } from "./self-signed-DW1GYTMc.js";
import { a as _e, e as X, r as ze, c as Ke } from "./splice-DZQMGiQI.js";
function H(e) {
  return new Uint8Array(e.signature.getValue());
}
async function $(e) {
  const t = x();
  let n, s;
  try {
    n = ne(e.token, "tst-info", { certificates: e.certificates }), s = Re(n.eContent);
  } catch (h) {
    return { verdict: "unsupported", problem: "unreadable", detail: h instanceof P ? h.message : String(h), info: null, token: null };
  }
  const r = Ie(n), i = (h, l, u) => ({ verdict: h, problem: l, detail: u, info: s, token: r }), { stamped: a } = e;
  if (a.kind === "digest" && s.imprintAlgorithm !== a.algorithm)
    return i(
      "invalid",
      "imprint-algorithm",
      `the token stamps a ${s.imprintAlgorithm} digest, not the ${a.algorithm} digest it was given`
    );
  const c = a.kind === "digest" ? a.digest : a.kind === "digest-with" ? await a.digest(s.imprintAlgorithm) : new Uint8Array(
    await t.digest(
      _[s.imprintAlgorithm],
      E(a.bytes)
    )
  );
  if (!R(s.imprint, c))
    return i("invalid", "imprint", "the token's message imprint is not the stamped digest");
  const d = new Uint8Array(
    await t.digest(_[n.digestAlgorithm], E(n.eContent))
  );
  if (!R(d, n.messageDigest))
    return i(
      "invalid",
      "message-digest",
      "the token's message digest does not cover its TSTInfo"
    );
  if (!r)
    return i(
      "unsupported",
      "no-certificate",
      "the token's authority certificate is not carried by the token or by the signature it is in"
    );
  const o = await xe(r);
  if (o === "invalid")
    return i(
      "invalid",
      "binding",
      "the token's certificate binding names another certificate than the one that signed it"
    );
  const f = await De(r);
  return f === "invalid" ? i("invalid", "signature", "the token signature does not verify") : f === "unsupported" ? i(
    "unsupported",
    "unsupported-algorithm",
    "the token's signature algorithm is not supported"
  ) : o === "absent" ? i(
    "unsupported",
    "no-binding",
    "the token does not bind its authority's certificate, which RFC 3161 requires"
  ) : o === "unsupported" ? i(
    "unsupported",
    "unsupported-algorithm",
    "the token's certificate binding uses a hash that is not supported"
  ) : { verdict: "valid", problem: null, detail: null, info: s, token: r };
}
const Y = 4096, He = 4 * 1024 * 1024;
async function We(e) {
  const { cms: t, prepared: n, profile: s } = e;
  if (t.byteLength > n.contentsSizeBytes)
    return {
      ok: !1,
      reason: "too-large",
      detail: `the signature is ${t.byteLength} bytes and ${n.contentsSizeBytes} were reserved: ${Ge(t.byteLength)}`
    };
  if (s === "timestamp") return Xe(t, n);
  let r;
  try {
    r = K(t);
  } catch (d) {
    return {
      ok: !1,
      reason: "malformed",
      detail: d instanceof P ? d.message : String(d)
    };
  }
  const i = r.parsed;
  if (i.digestAlgorithm !== n.algorithm)
    return {
      ok: !1,
      reason: "algorithm-mismatch",
      detail: `the CMS digests with ${i.digestAlgorithm}, the document was prepared with ${n.algorithm}`
    };
  if (!R(i.messageDigest, n.digest))
    return {
      ok: !1,
      reason: "digest-mismatch",
      detail: "the CMS message digest is not the prepared digest"
    };
  if (s === "cades-b") {
    if (!i.signingCertificateV2)
      return {
        ok: !1,
        reason: "profile-violation",
        detail: "CAdES requires the ESS signing-certificate-v2 attribute"
      };
    if (i.signingTime)
      return {
        ok: !1,
        reason: "profile-violation",
        detail: "PAdES forbids the CMS signing-time attribute"
      };
  }
  const a = await se(r);
  if (a !== "valid")
    return {
      ok: !1,
      reason: "signature-invalid",
      detail: a === "unsupported" ? "the signature or its certificate binding uses an algorithm that is not supported" : "the signature does not verify"
    };
  const c = H(r.signerInfo);
  for (const d of r.timestampTokens) {
    const o = await $({
      token: d,
      stamped: { kind: "bytes", bytes: c },
      certificates: r.certificates
    });
    if (o.verdict === "invalid")
      return {
        ok: !1,
        reason: o.problem === "imprint" ? "digest-mismatch" : "signature-invalid",
        detail: `the signature's timestamp does not belong to it: ${o.detail}`
      };
  }
  return { ok: !0 };
}
function Ge(e) {
  const t = Math.ceil(e / Y) * Y;
  return t > He ? "that is more than a signature may reserve" : `pass \`contentsSizeBytes: ${t}\``;
}
async function Xe(e, t) {
  const n = await $({
    token: e,
    stamped: { kind: "digest", digest: t.digest, algorithm: t.algorithm }
  });
  if (n.verdict === "valid") return { ok: !0 };
  switch (n.problem) {
    case "unreadable":
      return { ok: !1, reason: "malformed", detail: n.detail };
    case "no-certificate":
      return {
        ok: !1,
        reason: "malformed",
        detail: "the token does not carry its authority's certificate"
      };
    case "imprint-algorithm":
      return {
        ok: !1,
        reason: "algorithm-mismatch",
        detail: `the token stamps a ${n.info.imprintAlgorithm} digest, the document was prepared with ${t.algorithm}`
      };
    case "imprint":
      return {
        ok: !1,
        reason: "digest-mismatch",
        detail: "the token's message imprint is not the prepared digest"
      };
    default:
      return { ok: !1, reason: "signature-invalid", detail: n.detail };
  }
}
async function Lt(e, t, n = { kind: "now" }) {
  return ie(e, t, n, []);
}
async function ie(e, t, n, s) {
  if (!t) return { status: "unknown", reason: "no trust anchors configured" };
  const r = await t.anchors();
  if (r.length === 0) return { status: "unknown", reason: "no trust anchors configured" };
  x();
  let i;
  try {
    i = e instanceof Uint8Array ? K(e) : e;
  } catch (a) {
    return { status: "untrusted", reason: a.message };
  }
  return oe({
    target: i.signerCertificate,
    candidates: [...i.certificates, ...s],
    anchors: r,
    at: V(n)
  });
}
async function re(e) {
  const { token: t, trust: n, genTime: s } = e;
  if (!n) return { status: "unknown", reason: "no trust anchors configured" };
  const r = n.timestampAnchors ? await n.timestampAnchors() : await n.anchors();
  if (r.length === 0)
    return {
      status: "unknown",
      reason: n.timestampAnchors ? "no timestamp anchors configured" : "no trust anchors configured"
    };
  x();
  const i = t.signerCertificate, a = Ze(i);
  if (a) return { status: "untrusted", reason: a };
  if (!Z(i, s))
    return {
      status: "untrusted",
      reason: "the token is dated outside its authority certificate's validity"
    };
  const c = V(e.at ?? { kind: "now" }), d = C(i);
  return r.some((o) => R(o, d)) ? Z(i, c) ? { status: "trusted", path: [d] } : {
    status: "untrusted",
    reason: "the authority's certificate is not valid at the time it is judged"
  } : oe({
    target: i,
    candidates: [...t.certificates, ...e.certificates ?? []],
    anchors: r,
    at: c
  });
}
function V(e) {
  return e.kind === "now" ? /* @__PURE__ */ new Date() : new Date(ae(e));
}
function Ye(e) {
  if (e.kind === "now") return { kind: "now" };
  const t = ae(e);
  return { kind: "timestamp", stampedAt: t, genTime: t, tokenVerified: !0 };
}
function ae(e) {
  return e.stampedAt === void 0 ? e.genTime : e.stampedAt;
}
function Z(e, t) {
  return e.notBefore.value <= t && t <= e.notAfter.value;
}
function Ze(e) {
  const t = e.extensions?.find(
    (s) => s.extnID === v.extendedKeyUsage
  );
  if (!t)
    return "the authority's certificate has no extended key usage, so it is not made for timestamping";
  const n = t.parsedValue?.keyPurposes ?? [];
  return n.includes(v.timeStamping) ? n.length > 1 ? "the authority's certificate allows other uses besides timestamping" : t.critical ? null : "the authority's certificate does not mark its timestamping purpose as critical" : "the authority's certificate does not allow timestamping";
}
async function oe(e) {
  const { target: t, at: n } = e, s = C(t), r = (d) => R(d, s), i = /* @__PURE__ */ new Map();
  for (const d of e.candidates) {
    const o = C(d), f = I(o);
    !r(o) && !i.has(f) && i.set(f, d);
  }
  const a = [...i.values()], c = e.anchors.some(r);
  try {
    const d = e.anchors.filter((l) => !r(l)).map(D), f = await new $e({
      certs: c ? [t] : [...a, t],
      trustedCerts: c ? [...d, t] : d,
      checkDate: n
    }).verify();
    if (!f.result) {
      const l = Je(t, [...a, ...d]);
      return {
        status: "untrusted",
        reason: l ? `no certificate was found that issued "${Qe(l)}"` : f.resultMessage || `chain validation code ${f.resultCode}`,
        ...l ? { withoutIssuer: C(l) } : {}
      };
    }
    const h = f.certificatePath ?? [];
    return h.length === 0 || !r(C(h[0])) ? {
      status: "untrusted",
      reason: "the validated path does not begin with the certificate that signed"
    } : { status: "trusted", path: h.map(C) };
  } catch (d) {
    return { status: "untrusted", reason: d.message };
  }
}
function Je(e, t) {
  const n = /* @__PURE__ */ new Set();
  let s = e;
  for (; !n.has(s); ) {
    if (n.add(s), s.issuer.isEqual(s.subject)) return null;
    const r = t.find((i) => i.subject.isEqual(s.issuer));
    if (!r) return s;
    s = r;
  }
  return null;
}
function Qe(e) {
  return U(C(e)) ?? "a certificate without a common name";
}
function N(e, t) {
  return new k(
    b.SignatureRefused,
    `signing refused (${e}): ${t}`,
    { details: { reason: e } }
  );
}
const et = new Uint8Array([
  6,
  11,
  42,
  134,
  72,
  134,
  247,
  13,
  1,
  9,
  16,
  2,
  14
]);
async function tt(e) {
  const { cms: t, authority: n } = e;
  let s;
  try {
    s = ne(t);
  } catch (d) {
    throw N("malformed", d instanceof P ? d.message : String(d));
  }
  if (s.timestampTokens.length > 0)
    throw new k(
      b.InvalidArg,
      "the signature already carries a timestamp, from the service that signed it; leave out `timestampAuthority`",
      { details: { field: "timestampAuthority" } }
    );
  const r = n.hash ?? "sha256", i = new Uint8Array(
    await x().digest(
      _[r],
      E(H(s.signerInfo))
    )
  ), a = await n.sign({ digest: i, algorithm: r, subFilter: "ETSI.RFC3161" }), c = await $({
    token: a,
    stamped: { kind: "digest", digest: i, algorithm: r },
    certificates: s.certificates
  });
  if (c.verdict !== "valid")
    throw N(st(c.problem), `the timestamp: ${it(c)}`);
  e.trust && await ce(c, e.trust, s.certificates);
  try {
    return _e(t, nt(a));
  } catch (d) {
    throw N("malformed", d instanceof P ? d.message : String(d));
  }
}
async function ce(e, t, n = []) {
  const s = await re({
    token: e.token,
    certificates: n,
    trust: t,
    genTime: e.info.genTime
  });
  if (s.status === "trusted") return;
  const r = U(e.token.parsed.signerCertificate);
  throw new k(
    b.SignatureRefused,
    `the timestamp's authority${r ? ` ("${r}")` : ""} isn't trusted: ${s.reason ?? "no path to a timestamp anchor"}. Add its root to \`timestampAnchors\``,
    { details: { trust: s.status, trustReason: s.reason ?? null } }
  );
}
function nt(e) {
  return X(
    48,
    new Uint8Array([...et, ...X(49, e)])
  );
}
function st(e) {
  switch (e) {
    case "unreadable":
      return "malformed";
    case "imprint":
      return "digest-mismatch";
    case "imprint-algorithm":
      return "algorithm-mismatch";
    default:
      return "signature-invalid";
  }
}
function it(e) {
  return e.problem === "unreadable" ? `\`timestampAuthority\` didn't return an RFC 3161 token (${e.detail}): is it a signing service?` : e.detail;
}
const rt = 16384;
function ue(e) {
  switch (e) {
    case "adbe.pkcs7.detached":
      return "pkcs7";
    case "ETSI.CAdES.detached":
      return "cades-b";
    case "ETSI.RFC3161":
      return "timestamp";
    default:
      throw new k(
        b.InvalidArg,
        `unknown subFilter '${String(e)}'`,
        {
          details: { field: "subFilter" }
        }
      );
  }
}
async function qt(e, t) {
  const { key: n, timestampAuthority: s, timestampTrust: r, ...i } = t, a = i.kind === "timestamp";
  if (a && n.kind !== "cms")
    throw new k(
      b.InvalidArg,
      "a document timestamp needs a timestamp authority: a CMS key that returns an RFC 3161 token",
      { details: { field: "key" } }
    );
  de(a, s, r);
  const c = a ? "ETSI.RFC3161" : i.subFilter ?? "ETSI.CAdES.detached", d = ue(c), o = await e.signatures.prepare({
    ...i,
    ...a ? {} : { subFilter: c },
    digest: i.digest ?? n.hash ?? "sha256",
    // A token is commonly 1.5 to 6 KB: the default reserve would fail late, after the key signed.
    ...s && i.contentsSizeBytes === void 0 ? { contentsSizeBytes: rt } : {}
  });
  try {
    const f = await at(n, o, c, d);
    return await le(e, { prepared: o, cms: f, timestampAuthority: s, timestampTrust: r });
  } catch (f) {
    throw await e.signatures.cancel(o.signingId).catch(() => {
    }), f;
  }
}
async function _t(e, t) {
  de(
    t.prepared.subFilter === "ETSI.RFC3161",
    t.timestampAuthority,
    t.timestampTrust
  );
  try {
    return await le(e, t);
  } catch (n) {
    throw k.is(n, b.SignatureRefused) ? new k(
      b.SignatureRefused,
      `${n.message}. The signing stays prepared, and this CMS will be refused again: cancel it and prepare again`,
      { details: n.details, cause: n }
    ) : n;
  }
}
function de(e, t, n) {
  if (e && t)
    throw new k(
      b.InvalidArg,
      "a document timestamp is already a timestamp; leave out `timestampAuthority`",
      { details: { field: "timestampAuthority" } }
    );
  if (n && !t && !e)
    throw new k(
      b.InvalidArg,
      "`timestampTrust` judges a timestamp's authority; pass `timestampAuthority` too",
      { details: { field: "timestampTrust" } }
    );
}
async function le(e, t) {
  const { prepared: n, timestampAuthority: s } = t, r = ue(n.subFilter), i = async (c) => {
    const d = await We({ cms: c, prepared: n, profile: r });
    if (!d.ok) throw N(d.reason, d.detail);
  };
  let a = t.cms;
  if (await i(a), r === "timestamp" && t.timestampTrust) {
    const c = await $({
      token: a,
      stamped: { kind: "digest", digest: n.digest, algorithm: n.algorithm }
    });
    if (c.verdict !== "valid") throw N("malformed", "the timestamp token");
    await ce(c, t.timestampTrust);
  }
  return s && (a = await tt({
    cms: a,
    authority: s,
    trust: t.timestampTrust
  }), await i(a)), e.signatures.complete({
    signingId: n.signingId,
    cms: a,
    expectedVersion: n.expectedVersion
  });
}
async function at(e, t, n, s) {
  if (e.kind === "cms")
    return e.sign({ digest: t.digest, algorithm: t.algorithm, subFilter: n });
  if (s === "timestamp")
    throw new k(b.InvalidArg, "a raw key cannot make a timestamp token");
  return Ee({
    digest: t.digest,
    hash: t.algorithm,
    profile: s,
    signer: e,
    signingTime: s === "pkcs7" ? (/* @__PURE__ */ new Date()).toISOString() : void 0
  });
}
const ot = 6;
function J(e) {
  const t = { ocsp: [], crl: [], issuer: [] }, n = (i) => e.extensions?.find((a) => a.extnID === i)?.parsedValue, s = n(v.authorityInfoAccess);
  for (const i of s?.accessDescriptions ?? []) {
    const a = Q(i.accessLocation);
    a && (i.accessMethod === v.accessOcsp && t.ocsp.push(a), i.accessMethod === v.accessIssuers && t.issuer.push(a));
  }
  const r = n(v.crlDistributionPoints);
  for (const i of r?.distributionPoints ?? []) {
    if (i.reasons || i.cRLIssuer) continue;
    const a = Array.isArray(i.distributionPoint) ? i.distributionPoint : [];
    for (const c of a) {
      const d = Q(c);
      d && t.crl.push(d);
    }
  }
  return t;
}
function ct(e) {
  const t = (i) => e.extensions?.find((a) => a.extnID === i);
  if (t(v.basicConstraints)?.parsedValue?.cA) return !1;
  if (t(v.validityAssuredShortTerm)) return !0;
  if (!t(v.noRevAvail)) return !1;
  const s = t(v.authorityInfoAccess)?.parsedValue;
  return !(t(v.crlDistributionPoints) !== void 0 || t(v.freshestCrl) !== void 0 || (s?.accessDescriptions ?? []).some(
    (i) => i.accessMethod === v.accessOcsp
  ));
}
function Q(e) {
  return e.type !== ot || typeof e.value != "string" ? null : /^https?:\/\//i.test(e.value) ? e.value : null;
}
const fe = {
  0: "unspecified",
  1: "key-compromise",
  2: "ca-compromise",
  3: "affiliation-changed",
  4: "superseded",
  5: "cessation-of-operation",
  6: "certificate-hold",
  8: "remove-from-crl",
  9: "privilege-withdrawn",
  10: "aa-compromise"
};
async function me(e) {
  x();
  const { answer: t, certificate: n, issuer: s } = e, r = (i, a) => ({
    says: "nothing",
    kind: t.kind,
    problem: i,
    detail: a
  });
  if (!n.issuer.isEqual(s.subject))
    return r("other-certificate", "the certificate was not issued by the issuer given");
  try {
    return t.kind === "ocsp" ? await dt(t.der, n, s, r) : await ht(t.der, n, s, r);
  } catch (i) {
    return r("unreadable", i.message);
  }
}
const ut = {
  1: "malformed request",
  2: "internal error",
  3: "try later",
  5: "a signed request is required",
  6: "unauthorized"
};
async function dt(e, t, n, s) {
  const r = x(), i = M(E(e));
  if (i.offset === -1) return s("unreadable", "the OCSP response is not valid DER");
  const a = new Oe({ schema: i.result }), c = a.responseStatus.valueBlock.valueDec;
  if (c !== 0)
    return s(
      "not-successful",
      `the responder answered "${ut[c] ?? `status ${c}`}"`
    );
  const d = a.responseBytes;
  if (!d) return s("unreadable", "the OCSP response carries no answer");
  if (d.responseType !== v.ocspBasic)
    return s("unsupported", `OCSP response type ${d.responseType}`);
  const o = M(d.response.valueBlock.valueHexView);
  if (o.offset === -1) return s("unreadable", "the OCSP answer is not valid DER");
  const f = new Pe({ schema: o.result }), h = f.tbsResponseData;
  let l = null, u = null;
  for (const w of h.responses) {
    const A = r.getAlgorithmByOID(w.certID.hashAlgorithm.algorithmId, !1);
    if (!("name" in A) || typeof A.name != "string") {
      u = w.certID.hashAlgorithm.algorithmId;
      continue;
    }
    const S = new Be();
    if (await S.createForCertificate(t, {
      hashAlgorithm: A.name,
      issuerCertificate: n
    }), w.certID.isEqual(S)) {
      l = w;
      break;
    }
  }
  if (!l)
    return u ? s("unsupported", `the answer identifies its certificate with hash ${u}`) : s("other-certificate", "the OCSP response is about another certificate");
  const m = await lt(h.responderID, [n, ...f.certs ?? []]);
  if (!m)
    return s("wrong-signer", "the responder's certificate is not in the response");
  const g = ft(m, n);
  if (!g) {
    const w = await mt(m, n, h.producedAt);
    if (w) return s("wrong-signer", w);
  }
  const p = await he(
    h.tbsView,
    f.signature,
    m.subjectPublicKeyInfo,
    f.signatureAlgorithm
  );
  if (p === "unsupported")
    return s(
      "unsupported",
      `signature algorithm ${f.signatureAlgorithm.algorithmId} of the OCSP response`
    );
  if (p === "invalid")
    return s("signature", "the OCSP response's signature does not verify");
  const y = {
    kind: "ocsp",
    thisUpdate: l.thisUpdate,
    nextUpdate: l.nextUpdate ?? null,
    responder: g ? null : C(m)
  }, T = l.certStatus;
  switch (T.idBlock.tagNumber) {
    case 0:
      return { says: "good", ...y };
    case 1: {
      const [w, A] = T.valueBlock.value;
      if (!(w instanceof Ve))
        return s("unreadable", "the OCSP response names no revocation time");
      const S = A?.valueBlock.value[0]?.valueBlock.valueDec;
      return {
        says: "revoked",
        revokedAt: w.toDate(),
        reason: S === void 0 ? null : fe[S] ?? null,
        ...y
      };
    }
    default:
      return s("unknown-status", "the responder does not know the certificate");
  }
}
async function lt(e, t) {
  const n = x();
  for (const s of t)
    if (e instanceof Ue) {
      if (s.subject.isEqual(e)) return s;
    } else if (e instanceof je) {
      const r = s.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView, i = new Uint8Array(await n.digest("SHA-1", E(r)));
      if (R(i, new Uint8Array(e.valueBlock.valueHexView))) return s;
    }
  return null;
}
function ft(e, t) {
  return R(C(e), C(t));
}
async function mt(e, t, n) {
  if (!e.issuer.isEqual(t.subject))
    return "the responder's certificate was not issued by the certificate's issuer";
  let s = !1;
  try {
    s = await e.verify(t);
  } catch {
    s = !1;
  }
  return s ? (e.extensions?.find(
    (a) => a.extnID === v.extendedKeyUsage
  )?.parsedValue?.keyPurposes ?? []).includes(v.ocspSigning) ? n < e.notBefore.value || n > e.notAfter.value ? "the responder's certificate was outside its dates when it answered" : null : "the responder's certificate is not made for answering about certificates" : "the responder's certificate is not signed by the certificate's issuer";
}
async function ht(e, t, n, s) {
  const r = M(E(e));
  if (r.offset === -1) return s("unreadable", "the CRL is not valid DER");
  const i = new Ne({ schema: r.result });
  if (!i.issuer.isEqual(n.subject))
    return s("other-certificate", "the CRL is not from the certificate's issuer");
  for (const l of i.crlExtensions?.extensions ?? []) {
    if (l.extnID === v.deltaCrlIndicator)
      return s("delta-crl", "the CRL lists only what changed since another list");
    if (l.extnID === v.issuingDistributionPoint) {
      const u = l.parsedValue;
      if (!u) return s("unreadable", "the CRL's scope cannot be read");
      if (u.indirectCRL)
        return s("indirect-crl", "the CRL lists certificates of other issuers");
      const m = pt(t);
      if (u.onlyContainsAttributeCerts || u.onlyContainsUserCerts && m || u.onlyContainsCACerts && !m || u.onlySomeReasons !== void 0)
        return s("out-of-scope", "the CRL does not cover this kind of certificate");
    } else if (l.critical && !gt.has(l.extnID))
      return s("unsupported", `critical CRL extension ${l.extnID}`);
  }
  if (!wt(n))
    return s("wrong-signer", "the issuer's certificate is not made for signing CRLs");
  const a = await he(
    i.tbsView,
    i.signatureValue,
    n.subjectPublicKeyInfo,
    i.signatureAlgorithm
  );
  if (a === "unsupported")
    return s("unsupported", `signature algorithm ${i.signatureAlgorithm.algorithmId}`);
  if (a === "invalid") return s("signature", "the CRL's signature does not verify");
  const c = {
    kind: "crl",
    thisUpdate: i.thisUpdate.value,
    nextUpdate: i.nextUpdate?.value ?? null,
    responder: null
  }, d = ee(t.serialNumber), o = (i.revokedCertificates ?? []).find(
    (l) => R(ee(l.userCertificate), d)
  );
  if (!o) return { says: "good", ...c };
  const h = o.crlEntryExtensions?.extensions.find(
    (l) => l.extnID === v.crlReason
  )?.parsedValue?.valueBlock.valueDec;
  return {
    says: "revoked",
    revokedAt: o.revocationDate.value,
    reason: h === void 0 ? null : fe[h] ?? null,
    ...c
  };
}
const gt = /* @__PURE__ */ new Set([
  v.crlNumber,
  v.authorityKeyIdentifier,
  v.authorityInfoAccess,
  v.freshestCrl
]);
function pt(e) {
  return e.extensions?.find(
    (n) => n.extnID === v.basicConstraints
  )?.parsedValue?.cA === !0;
}
function wt(e) {
  const t = e.extensions?.find((s) => s.extnID === v.keyUsage);
  if (!t) return !0;
  const n = t.parsedValue?.valueBlock.valueHexView;
  return n !== void 0 && n.length > 0 && (n[0] & 2) !== 0;
}
function ee(e) {
  const t = new Uint8Array(e.valueBlock.valueHexView);
  let n = 0;
  for (; n < t.length - 1 && t[n] === 0; ) n++;
  return t.subarray(n);
}
async function he(e, t, n, s) {
  try {
    return await x().verifyWithPublicKey(
      E(e),
      t,
      n,
      s
    ) ? "valid" : "invalid";
  } catch (r) {
    const i = r.message ?? "";
    return /unsupported|unknown|not supported|not implemented|incorrect/i.test(i) ? "unsupported" : "invalid";
  }
}
const vt = 300 * 1e3;
function yt(e, t) {
  const n = t.getTime();
  let s = null, r = null;
  for (const i of e) {
    if (i.says === "nothing") continue;
    if (i.says === "revoked") {
      i.revokedAt.getTime() <= n ? (!r || i.revokedAt < r.revokedAt) && (r = i) : s ?? (s = i);
      continue;
    }
    const a = i.thisUpdate.getTime(), c = i.nextUpdate ? i.nextUpdate.getTime() : a + vt;
    (a >= n || n <= c) && (s ?? (s = i));
  }
  return r ? { status: "revoked", answer: r } : s ? { status: "good", answer: s } : { status: "unknown", answer: null };
}
class ge {
  constructor() {
    j(this, "certificateByDer", /* @__PURE__ */ new Map());
    j(this, "answerByDer", /* @__PURE__ */ new Map());
    /** What each answer says about one certificate, in the order the answers were offered. */
    j(this, "checked", /* @__PURE__ */ new Map());
  }
  /** Every certificate offered, each once. */
  get certificates() {
    return [...this.certificateByDer.values()].map((t) => t.certificate);
  }
  /**
   * Offer a certificate. Bytes that are not a certificate are left out, and false comes back.
   * `inFile` is false for one that came from outside the file.
   */
  addCertificate(t, n = !0) {
    try {
      const s = t instanceof Uint8Array ? t : C(t), r = I(s);
      return this.certificateByDer.has(r) || this.certificateByDer.set(r, {
        certificate: t instanceof Uint8Array ? D(t) : t,
        inFile: n
      }), !0;
    } catch {
      return !1;
    }
  }
  /**
   * Offer an answer as it was stored or sent. It is checked when it is asked about a
   * certificate. `inFile` is false for one that came from outside the file.
   */
  addAnswer(t, n, s = !0) {
    const r = `${t}:${I(n)}`;
    let i = this.answerByDer.get(r);
    return i || (i = { kind: t, der: n, inFile: s }, this.answerByDer.set(r, i)), i;
  }
  /** Offer what a CMS carries itself: its certificates and its answers. */
  addCarried(t, n) {
    for (const s of t) this.addCertificate(s);
    for (const s of n.ocspResponses) this.addAnswer("ocsp", s);
    for (const s of n.crls) this.addAnswer("crl", s);
  }
  /**
   * What each answer says about `certificate`, which `issuer` issued. Each answer is checked
   * once, also when more answers are offered between two calls.
   */
  async checksFor(t, n) {
    const s = `${I(C(t))}:${I(C(n))}`, r = [...this.answerByDer.values()], i = this.checked.get(s) ?? [];
    for (let c = i.length; c < r.length; c++)
      i.push(me({ answer: r[c], certificate: t, issuer: n }));
    this.checked.set(s, i);
    const a = await Promise.all(i);
    return r.map((c, d) => ({ answer: c, check: a[d] }));
  }
}
async function pe(e) {
  const t = new ge();
  if (typeof e.signatures?.getValidationInfo != "function") return t;
  try {
    const n = await e.signatures.getValidationInfo();
    for (const s of n.certificates) t.addCertificate(s);
    for (const s of n.ocspResponses) t.addAnswer("ocsp", s);
    for (const s of n.crls) t.addAnswer("crl", s);
  } catch (n) {
    if (!k.is(n, b.NotImplemented)) throw n;
  }
  return t;
}
async function O(e, t, n, s = "anywhere") {
  const r = t.filter((c, d) => d === 0 || !R(c, t[d - 1])), i = r.map(D), a = [];
  for (let c = 0; c + 1 < i.length; c++) {
    if (ct(i[c])) continue;
    const d = (await e.checksFor(i[c], i[c + 1])).filter(
      (f) => s === "anywhere" || f.answer.inFile
    ), o = yt(
      d.map((f) => f.check),
      n
    );
    a.push({
      certificate: r[c],
      name: U(r[c]),
      issuer: r[c + 1],
      evidence: d.find((f) => f.check === o.answer)?.answer ?? null,
      ...o
    });
  }
  return a;
}
function we(e, t) {
  const n = (i) => `"${i.name ?? "a certificate without a name"}"`, s = e.find((i) => i.status === "revoked");
  if (s) {
    const i = s.answer, a = i?.says === "revoked" ? ` on ${i.revokedAt.toISOString()}` : "", c = i?.says === "revoked" && i.reason ? ` (${i.reason})` : "";
    return { status: "revoked", reason: `${n(s)} was withdrawn${a}${c}` };
  }
  const r = e.find((i) => i.status === "unknown");
  return r ? { status: "unknown", reason: `no answer about ${n(r)} speaks for ${t}` } : { status: "good", reason: null };
}
const F = { kind: "now" }, B = { kind: "earliest-timestamp" };
async function L(e, t, n, s) {
  const r = s.kind === "earliest-timestamp", i = [], a = (o) => !r || o === null ? null : i.filter((f) => f.revisionIndex > o).reduce(
    (f, h) => !f || h.genTime < f.genTime ? h : f,
    null
  ), c = /* @__PURE__ */ new Map(), d = e.filter((o) => o.kind === "timestamp").sort((o, f) => (f.signature.revisionIndex ?? -1) - (o.signature.revisionIndex ?? -1));
  for (const o of d) {
    const f = a(o.signature.revisionIndex), h = f ? q(f.genTime) : F, l = o.token ? await z(o.token, t, h, n) : null, u = l?.verdict ?? null, m = o.signature.revisionIndex, g = l && o.integrity === "valid" ? te(l) : null;
    g && m !== null && i.push({ ...g, revisionIndex: m }), c.set(o, {
      trust: u?.trust ?? "unknown",
      trustReason: u?.trustReason ?? void 0,
      validationTime: h,
      path: l?.path ?? null,
      revocation: u?.revocation ?? "unknown",
      revocationReason: u?.revocationReason ?? void 0,
      timestamp: u,
      reliesOn: g,
      // A sound token over these bytes whose authority isn't trusted proves no time to you.
      withoutTime: u && o.integrity === "valid" && u.cryptography === "valid" ? "untrusted" : "no-timestamp",
      timestampPath: null,
      withoutIssuer: l?.withoutIssuer ? [l.withoutIssuer] : []
    });
  }
  for (const o of e) {
    if (o.kind === "timestamp") continue;
    const f = a(o.signature.revisionIndex), h = [];
    for (const w of o.tokens)
      h.push(
        await z(
          w,
          t,
          f ? q(f.genTime) : F,
          n,
          o.internal?.certificates
        )
      );
    const l = Ct(h), u = (l ?? h[0])?.verdict ?? null, m = l ? te(l) : null, g = r ? m && f ? m.genTime <= f.genTime ? m : f : m ?? f : null, p = r ? g ? q(g.genTime) : F : Ye(s), y = o.internal ? await ie(o.internal, t, p, n.certificates) : {
      status: "unknown",
      reason: void 0,
      path: void 0,
      withoutIssuer: void 0
    }, T = y.status === "trusted" && y.path ? we(await O(n, y.path, V(p)), ye(p)) : { status: "unknown", reason: kt };
    c.set(o, {
      trust: y.status,
      trustReason: y.reason,
      validationTime: p,
      path: y.status === "trusted" ? y.path ?? null : null,
      revocation: T.status,
      revocationReason: T.reason ?? void 0,
      timestamp: u,
      reliesOn: g,
      withoutTime: "no-timestamp",
      timestampPath: (l ?? h[0])?.path ?? null,
      withoutIssuer: [
        ...y.withoutIssuer ? [y.withoutIssuer] : [],
        ...h.flatMap((w) => w.withoutIssuer ? [w.withoutIssuer] : [])
      ]
    });
  }
  return { judgements: c, documentTimestamps: i };
}
const kt = "the signer is not trusted, so there is no issuer to check an answer against";
function ve(e, t, n, s, r) {
  return {
    kind: e.kind,
    revisionIndex: e.signature.revisionIndex,
    subject: e.cms ? U(e.cms.signerCertificate) : null,
    reliesOn: t.reliesOn,
    withoutTime: t.withoutTime,
    signer: { trusted: t.trust === "trusted", path: t.path },
    documentTimestamps: n,
    pool: s,
    answersFrom: r
  };
}
function ye(e) {
  return e.kind === "now" ? "now" : e.stampedAt;
}
function te(e) {
  const { verdict: t, path: n } = e;
  return t.summary !== "valid" || !n ? null : { genTime: t.stampedAt, path: n, authorityCertificate: t.authorityCertificate };
}
async function ke(e, t, n, s) {
  const r = {
    signature: n,
    kind: n.kind,
    integrity: "indeterminate",
    cryptography: "unsupported",
    internal: null,
    cms: null,
    tokens: [],
    token: null
  };
  if (!t.chainValid || n.coverage === "malformed")
    return r.integrity = t.chainValid ? "invalid" : "indeterminate", r;
  const i = n.kind === "timestamp" ? await At(e, n, r) : await bt(e, n, r);
  i.internal && s.addCarried(i.internal.certificates, i.internal.revocation);
  for (const a of [...i.tokens, ...i.token ? [i.token] : []])
    a.token && s.addCarried(a.token.certificates, a.token.revocation);
  return i;
}
async function bt(e, t, n) {
  let s;
  try {
    const i = await e.signatures.getContents(t.field);
    s = K(i), n.cms = s.parsed;
    const a = await e.signatures.getDigest(t.field, s.digestAlgorithm), c = R(a, s.messageDigest);
    n.integrity = t.coverage === "whole-revision" && c ? "valid" : "invalid";
  } catch (i) {
    return n.integrity = i instanceof P && i.reason === "unsupported" ? "indeterminate" : "invalid", i instanceof P || (n.integrity = "indeterminate"), n;
  }
  n.internal = s, n.cryptography = await se(s);
  const r = H(s.signerInfo);
  for (const i of s.timestampTokens)
    n.tokens.push(
      await $({
        token: i,
        stamped: { kind: "bytes", bytes: r },
        certificates: s.certificates
      })
    );
  return n;
}
async function At(e, t, n) {
  let s;
  try {
    s = await e.signatures.getContents(t.field);
  } catch {
    return n;
  }
  const r = await $({
    token: s,
    stamped: {
      kind: "digest-with",
      digest: (a) => e.signatures.getDigest(t.field, a)
    }
  }).catch(() => null);
  if (!r || (n.token = r, n.cms = r.token?.parsed ?? null, r.problem === "unreadable")) return n;
  const i = r.problem !== "imprint";
  return n.integrity = t.coverage === "whole-revision" && i ? "valid" : "invalid", n.cryptography = i ? r.verdict : (await $({
    token: s,
    stamped: {
      kind: "digest",
      digest: r.info.imprint,
      algorithm: r.info.imprintAlgorithm
    }
  })).verdict, n;
}
async function z(e, t, n, s, r = []) {
  const i = e.info ? e.info.genTime.toISOString() : null, a = e.token ? e.token.parsed.signerCertificate : null;
  let c = "unknown", d = e.detail, o = null, f = null;
  if (e.token && e.info) {
    const m = await re({
      token: e.token,
      certificates: [...r, ...s.certificates],
      trust: t,
      at: n,
      genTime: e.info.genTime
    });
    c = m.status, d = m.reason ?? null, o = m.status === "trusted" ? m.path ?? null : null, f = m.withoutIssuer ?? null;
  }
  const h = o ? we(await O(s, o, V(n)), ye(n)) : {
    status: "unknown",
    reason: "the authority is not trusted, so there is no issuer to check an answer against"
  }, l = {
    cryptography: e.verdict,
    trust: c,
    trustReason: d,
    validationTime: n,
    revocation: h.status,
    revocationReason: h.reason,
    authorityName: a ? U(a) : null
  }, u = c === "trusted" && h.status === "revoked";
  return e.verdict === "valid" && !u && i !== null && a !== null ? {
    verdict: {
      ...l,
      summary: c === "trusted" ? "valid" : "valid-untrusted",
      stampedAt: i,
      authorityCertificate: a
    },
    path: o,
    withoutIssuer: f
  } : {
    verdict: {
      ...l,
      summary: e.verdict === "invalid" || u ? "invalid" : "indeterminate",
      stampedAt: i,
      authorityCertificate: a
    },
    path: o,
    withoutIssuer: f
  };
}
function q(e) {
  return { kind: "timestamp", stampedAt: e, genTime: e, tokenVerified: !0 };
}
function Ct(e) {
  let t = null;
  for (const n of e)
    n.verdict.summary === "valid" && (!t || n.verdict.stampedAt < t.verdict.stampedAt) && (t = n);
  return t;
}
async function Tt(e) {
  return (await be(e)).verdict;
}
async function be(e) {
  const t = e.revisionIndex === null ? [] : e.documentTimestamps.filter((l) => l.revisionIndex > e.revisionIndex), n = (l) => l.reduce(
    (u, m) => !u || m.genTime > u.genTime ? m : u,
    null
  ), s = n(t)?.genTime ?? null, r = (l, u, m = []) => ({
    verdict: {
      enabled: !1,
      provenAt: l,
      expiresAt: null,
      documentTimestampedAt: s,
      missing: u.map(({ certificate: g, reason: p }) => ({ certificate: g, reason: p }))
    },
    rows: m,
    gaps: u
  }), i = e.reliesOn;
  if (!i)
    return r(null, [{ certificate: e.subject, reason: e.withoutTime, der: null }]);
  if (e.kind === "signature" && (!e.signer.trusted || !e.signer.path))
    return r(i.genTime, [
      { certificate: e.subject, reason: "untrusted", der: null }
    ]);
  const a = new Date(i.genTime), c = [
    ...e.kind === "signature" ? await O(e.pool, e.signer.path, a, e.answersFrom) : [],
    ...await O(e.pool, i.path, a, e.answersFrom)
  ], d = /* @__PURE__ */ new Set(), o = c.filter((l) => {
    const u = I(l.certificate);
    return d.has(u) ? !1 : (d.add(u), !0);
  }), f = o.filter((l) => l.status !== "good").map((l) => ({
    certificate: l.name,
    reason: l.status === "revoked" ? "revoked" : "no-answer",
    der: l.certificate
  }));
  if (f.length > 0) return r(i.genTime, f, o);
  const h = n([i, ...t]);
  return {
    verdict: {
      enabled: !0,
      provenAt: i.genTime,
      expiresAt: D(h.authorityCertificate).notAfter.value.toISOString(),
      documentTimestampedAt: s,
      missing: []
    },
    rows: o,
    gaps: []
  };
}
async function St(e, t) {
  x();
  const n = new Fe();
  return await n.createForCertificate(e, {
    hashAlgorithm: "SHA-1",
    issuerCertificate: t
  }), new Uint8Array(n.toSchema(!0).toBER(!1));
}
const Ae = 1024 * 1024, It = 8;
async function Ce(e) {
  const { readings: t, trust: n, pool: s, source: r, maxCrlBytes: i } = e, a = /* @__PURE__ */ new Map();
  if (!n) return a;
  const c = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set(), o = async (l, u) => {
    try {
      return await r.fetch(l);
    } catch (m) {
      const g = k.is(m, b.Network);
      return u({
        detail: m.message,
        // No answer came. Whoever reports it needs the address that was asked.
        network: g ? new k(b.Network, m.message, {
          details: { ...m.details, source: l.url },
          cause: m
        }) : k.is(m) ? null : new k(
          b.Network,
          `${l.url} did not answer: ${m.message}`,
          { details: { source: l.url }, cause: m }
        )
      }), null;
    }
  }, f = async (l) => {
    const u = I(l.certificate);
    if (c.has(u)) return !1;
    if (c.add(u), !r)
      return a.set(u, { detail: "no `revocation` source was given to ask with", network: null }), !1;
    const m = D(l.certificate), g = D(l.issuer), p = J(m);
    let y = null;
    const T = (A) => {
      y?.network || (y = A);
    }, w = [];
    for (const A of p.ocsp)
      w.push({ kind: "ocsp", url: A, body: await St(m, g) });
    for (const A of p.crl) w.push({ kind: "crl", url: A });
    if (w.length === 0)
      return a.set(u, { detail: "the certificate names no address to ask at", network: null }), !1;
    for (const A of w) {
      const S = await o(A, T);
      if (!S) continue;
      if (A.kind === "crl" && S.byteLength > i) {
        T({
          detail: `the list at ${A.url} is ${S.byteLength} bytes, over maxCrlBytes (${i})`,
          network: null
        });
        continue;
      }
      const W = A.kind === "ocsp" ? "ocsp" : "crl", G = await me({ answer: { kind: W, der: S }, certificate: m, issuer: g });
      if (G.says === "nothing") {
        T({
          detail: `the answer from ${A.url} says nothing: ${G.detail}`,
          network: null
        });
        continue;
      }
      return s.addAnswer(W, S, !1), a.delete(u), !0;
    }
    return y && a.set(u, y), !1;
  }, h = async (l) => {
    const u = I(l);
    if (d.has(u) || !r) return !1;
    d.add(u);
    const m = s.certificates.length;
    for (const g of J(D(l)).issuer) {
      const p = await o({ kind: "issuer", url: g }, () => {
      });
      if (p) {
        for (const y of xt(p)) s.addCertificate(y, !1);
        if (s.certificates.length > m) return !0;
      }
    }
    return !1;
  };
  for (let l = 0; l < It; l++) {
    let u = !1;
    for (const m of e.times) {
      const g = await L(t, n, s, m);
      for (const p of t) {
        if (e.wanted && !e.wanted(p)) continue;
        const y = g.judgements.get(p);
        for (const w of y.withoutIssuer)
          await h(w) && (u = !0);
        const T = await Rt(
          p,
          y,
          s,
          m.kind === "earliest-timestamp"
        );
        for (const w of T)
          w.status === "unknown" && await f(w) && (u = !0);
      }
    }
    if (!u) break;
  }
  return a;
}
async function Rt(e, t, n, s) {
  const r = [];
  if (t.path && r.push(...await O(n, t.path, V(t.validationTime))), e.kind === "signature" && t.timestampPath && t.timestamp && r.push(
    ...await O(
      n,
      t.timestampPath,
      V(t.timestamp.validationTime)
    )
  ), s && t.reliesOn) {
    const i = t.reliesOn;
    r.push(...await O(n, i.path, new Date(i.genTime)));
  }
  return r;
}
function xt(e) {
  try {
    return [D(e)];
  } catch {
  }
  try {
    const t = M(E(e));
    if (t.offset === -1) return [];
    const n = new Me({ schema: t.result });
    return (new Le({ schema: n.content }).certificates ?? []).filter(
      (r) => r instanceof qe
    );
  } catch {
    return [];
  }
}
async function Dt(e, t = {}) {
  if (!e.signatures) throw new Error("this engine does not implement signatures");
  const n = await e.signatures.list(), s = t.trust ?? null, r = await pe(e), i = [];
  for (const f of n.signatures)
    f.signed && i.push(await ke(e, n, f, r));
  const a = t.validationTime ?? B;
  t.revocation && s && await Ce({
    readings: i,
    trust: s,
    pool: r,
    source: t.revocation,
    maxCrlBytes: Ae,
    times: a.kind === "earliest-timestamp" ? [B] : [B, a]
  });
  const c = await L(i, s, r, B), d = a.kind === "earliest-timestamp" ? c : await L(i, s, r, a), o = [];
  for (const f of i) {
    const h = d.judgements.get(f), l = c.judgements.get(f), u = await Et(
      e,
      n,
      f.signature,
      t.until ?? "persisted"
    ), m = h.trust === "trusted" && h.revocation === "revoked";
    let g;
    f.integrity === "invalid" || f.cryptography === "invalid" || u.verdict === "forbidden" ? g = "invalid" : f.integrity === "indeterminate" || f.cryptography === "unsupported" || u.verdict === "indeterminate" ? g = "indeterminate" : m ? g = "invalid" : g = h.trust === "trusted" ? "valid" : "valid-untrusted", o.push({
      signature: f.signature,
      integrity: f.integrity,
      cryptography: f.cryptography,
      trust: h.trust,
      trustReason: h.trustReason,
      validationTime: h.validationTime,
      revocation: h.revocation,
      ...h.revocationReason ? { revocationReason: h.revocationReason } : {},
      modifications: u,
      summary: g,
      cms: f.cms,
      timestamp: h.timestamp,
      longTerm: await Tt(
        // What the file holds: an answer that was only asked for is not in it.
        ve(f, l, c.documentTimestamps, r, "file")
      )
    });
  }
  return o;
}
async function zt(e) {
  const t = await $({
    token: e.token,
    stamped: { kind: "digest", digest: e.digest, algorithm: e.algorithm }
  }), n = new ge();
  return t.token && n.addCarried(t.token.certificates, t.token.revocation), (await z(t, e.trust ?? null, F, n)).verdict;
}
async function Et(e, t, n, s) {
  if (n.revisionIndex === null)
    return {
      verdict: "indeterminate",
      detail: "the signature seals no whole revision",
      basis: "persisted"
    };
  if (s === "persisted" && n.revisionIndex === t.revisions.length - 1)
    return { verdict: "unchanged", basis: "persisted" };
  try {
    const r = await e.signatures.analyze({
      since: { signatureIndex: n.index },
      until: s
    }), i = r.current.primary, a = i && i.verdict === "forbidden" ? `object ${i.objectNumber}, ${i.rule}${i.detail ? `: ${i.detail}` : ""}` : i && i.verdict === "incomplete" ? `object ${i.objectNumber}: ${i.detail ?? "incomplete evidence"}` : void 0;
    return {
      verdict: r.current.verdict,
      detail: a,
      basis: r.basis.source,
      ...r.later.revisionCount > 0 ? { laterRevisions: r.later.revisionCount } : {},
      ...r.later.undoneObjectNumbers.length > 0 ? { undone: !0 } : {}
    };
  } catch (r) {
    return {
      verdict: "indeterminate",
      detail: `analysis failed: ${r.message}`,
      basis: "persisted"
    };
  }
}
const $t = { "P-256": 32, "P-384": 48, "P-521": 66 };
function Kt(e, t) {
  const n = $t[t], s = (a) => new k(b.InvalidArg, `not a DER ECDSA signature: ${a}`, {
    details: { field: "der" }
  });
  let r;
  try {
    const a = ze(e, 0, e.byteLength);
    if (a.tag !== 48) throw s("it is not a sequence");
    r = Ke(e, a);
  } catch (a) {
    throw a instanceof P ? s("it does not parse") : a;
  }
  if (r.length !== 2 || r.some((a) => a.tag !== 2))
    throw s("it does not hold two integers");
  const i = new Uint8Array(n * 2);
  return r.forEach((a, c) => {
    let d = a.contentStart;
    for (; d < a.contentEnd - 1 && e[d] === 0; ) d++;
    const o = a.contentEnd - d;
    if (o > n) throw s(`a number is ${o} bytes, ${t} takes ${n}`);
    i.set(e.subarray(d, a.contentEnd), (c + 1) * n - o);
  }), i;
}
async function Ht(e, t) {
  if (!e.signatures) throw new Error("this engine does not implement signatures");
  if (!t?.trust)
    throw new k(
      b.InvalidArg,
      "addValidationInfo() needs `trust`: the answers kept are the ones for paths you trust",
      { details: { field: "trust" } }
    );
  const { trust: n } = t;
  await e.signatures.addValidationInfo({});
  const s = await e.signatures.list(), r = await pe(e), i = [];
  for (const u of s.signatures)
    u.signed && i.push(await ke(e, s, u, r));
  const a = Ot(i, t.fields);
  for (const u of t.known?.certificates ?? []) r.addCertificate(u, !1);
  for (const u of t.known?.ocspResponses ?? []) r.addAnswer("ocsp", u, !1);
  for (const u of t.known?.crls ?? []) r.addAnswer("crl", u, !1);
  const c = await Ce({
    readings: i,
    wanted: (u) => a.has(u),
    trust: n,
    pool: r,
    source: t.revocation ?? null,
    maxCrlBytes: t.maxCrlBytes ?? Ae,
    times: [B]
  }), d = await L(i, n, r, B), o = {
    certificates: /* @__PURE__ */ new Map(),
    ocspResponses: /* @__PURE__ */ new Map(),
    crls: /* @__PURE__ */ new Map()
  }, f = (u, m) => u.set(I(m), m);
  for (const u of i) {
    if (!a.has(u)) continue;
    const m = d.judgements.get(u), g = await be(
      // With what is about to be stored: what a reader will find afterwards.
      ve(u, m, d.documentTimestamps, r, "anywhere")
    );
    if (!g.verdict.enabled && !t.partial)
      throw Pt(u, g, c);
    for (const p of [m.path, m.reliesOn?.path])
      for (const y of p ?? []) f(o.certificates, y);
    for (const p of g.rows)
      p.evidence && !p.evidence.inFile && f(p.evidence.kind === "ocsp" ? o.ocspResponses : o.crls, p.evidence.der), p.answer && p.answer.says !== "nothing" && p.answer.responder && f(o.certificates, p.answer.responder);
  }
  let h = { certificates: 0, ocspResponses: 0, crls: 0 };
  o.certificates.size + o.ocspResponses.size + o.crls.size > 0 && (h = (await e.signatures.addValidationInfo({
    certificates: [...o.certificates.values()],
    ocspResponses: [...o.ocspResponses.values()],
    crls: [...o.crls.values()]
  })).added);
  const l = await Dt(e, { trust: n });
  if (!t.partial)
    for (const u of i) {
      if (!a.has(u)) continue;
      const m = l.find((g) => g.signature.index === u.signature.index);
      if (!m?.longTerm.enabled)
        throw new k(
          b.Unknown,
          `the validation data was stored, and the signature in "${u.signature.fieldName}" still does not read as complete`,
          { details: { field: u.signature.fieldName, missing: m?.longTerm.missing } }
        );
    }
  return { added: h, verdicts: l };
}
function Ot(e, t) {
  if (!t) return new Set(e);
  const n = /* @__PURE__ */ new Set();
  for (const s of t) {
    const r = e.find(
      ({ signature: i }) => s.kind === "fqn" ? i.fieldName === s.name : i.field.kind === "objectNumber" && i.field.objectNumber === s.objectNumber
    );
    if (!r)
      throw new k(
        b.NotFound,
        `no signature in field ${s.kind === "fqn" ? `"${s.name}"` : `object ${s.objectNumber}`}`,
        { details: { field: "fields" } }
      );
    n.add(r);
  }
  return n;
}
function Pt(e, t, n) {
  const s = t.gaps[0], r = e.signature.fieldName, i = s.der ? n.get(I(s.der)) : void 0;
  if (s.reason === "no-answer" && i?.network) return i.network;
  const a = s.certificate ? `"${s.certificate}"` : "a certificate", c = {
    "no-timestamp": `the signature in "${r}" has no timestamp you trust, so no time is proven to judge its certificates at`,
    untrusted: `${a} does not lead to a certificate in \`trust\``,
    revoked: `${a} was withdrawn by the time of the signature's timestamp`,
    "no-answer": `no answer that checks out says ${a} was good at the signature's timestamp${i ? `: ${i.detail}` : ""}`
  };
  return new k(
    b.SignatureRefused,
    `validation data not added: ${c[s.reason]}`,
    { details: { reason: s.reason, certificate: s.certificate, field: r } }
  );
}
export {
  P as CmsError,
  Ht as addValidationInfo,
  tt as attachSignatureTimestamp,
  Ee as buildDetachedCms,
  U as certificateCommonName,
  _t as completeSignature,
  Zt as createTestCertificateAuthority,
  Jt as createTestSigner,
  Qt as createTestTimestampAuthority,
  Kt as ecdsaRawFromDer,
  en as generateSigningKeyPair,
  tn as httpRevocationSource,
  nn as httpTimestampAuthority,
  sn as indexedDbKeyStore,
  rn as memoryKeyStore,
  Xt as parseDetachedCms,
  an as personalSigner,
  ue as profileFor,
  on as remoteSigner,
  dn as selfSignedCertificate,
  qt as sign,
  Lt as validateChain,
  Dt as validateSignatures,
  se as verifyCmsSignature,
  We as verifyForCompletion,
  zt as verifyTimestampToken,
  cn as webCryptoSigner
};
//# sourceMappingURL=index-BbNZt8-k.js.map
